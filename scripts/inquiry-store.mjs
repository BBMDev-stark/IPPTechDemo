import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';

const required={quote:['organization_type','level_or_industry','product_interest','scale','timeline'],demo:['experience_type','product_interest','preferred_date','attendees'],dealer:['registration_number','service_area','experience','customer_group'],support:['product_version','serial_number','purchase_date','notes'],partner:['partnership_type','business_field','service_area','timeline','notes'],resources:['resource_audience'],newsletter:[]};
const routes={quote:'sales',demo:'experience',dealer:'dealer-network',support:'technical-support',partner:'partnerships',resources:'documents',newsletter:'newsletter'};
export class InquiryError extends Error{constructor(message,status=400){super(message);this.status=status}}
const fail=(message,status=400)=>{throw new InquiryError(message,status)};
const string=(value)=>typeof value==='string'?value.trim():'';
export function validateInquiry(payload){
 if(!payload||typeof payload!=='object'||Array.isArray(payload))fail('Yêu cầu không hợp lệ.');
 const {kind,requestId}=payload, fields=payload.fields;
 if(!Object.hasOwn(required,kind)||!fields||typeof fields!=='object'||Array.isArray(fields))fail('Loại yêu cầu không hợp lệ.');
 if(!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(requestId))fail('Mã gửi không hợp lệ. Vui lòng tải lại trang.');
 if(string(fields.website))fail('Không thể tiếp nhận yêu cầu này.');
 if(fields.consent!=='yes')fail('Vui lòng xác nhận đồng ý cung cấp thông tin.');
 const base=kind==='newsletter'?['email']:['organization','full_name','email',...(kind==='resources'?[]:['phone'])];
 for(const key of [...base,...required[kind]])if(!string(fields[key]))fail('Vui lòng điền đầy đủ các trường bắt buộc.');
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(string(fields.email)))fail('Email chưa hợp lệ.');
 if(kind!=='newsletter'&&kind!=='resources'&&!/^[+0-9 ()-]{8,20}$/.test(string(fields.phone)))fail('Số điện thoại chưa hợp lệ.');
 const clean={};
 if(Object.keys(fields).length>35)fail('Yêu cầu có quá nhiều trường.');
 for(const [key,value] of Object.entries(fields)){
  if(!/^[a-z_]{1,40}$/.test(key)||['website','__proto__','constructor','prototype'].includes(key))continue;
  if(Array.isArray(value)){if(value.length>8||value.some(x=>typeof x!=='string'||x.length>100))fail('Lựa chọn chưa hợp lệ.');clean[key]=value.map(x=>x.trim());}
  else{if(typeof value!=='string'||value.length>5000)fail('Nội dung quá dài hoặc không hợp lệ.');clean[key]=value.trim();}
 }
 const today=new Date().toLocaleDateString('en-CA',{timeZone:'Asia/Ho_Chi_Minh'});
 const validDate=d=>/^\d{4}-\d{2}-\d{2}$/.test(d)&&Number.isFinite(Date.parse(d))&&new Date(d).toISOString().slice(0,10)===d;
 if(kind==='demo'){
  if(!validDate(clean.preferred_date)||clean.preferred_date<today)fail('Vui lòng chọn ngày từ hôm nay.');
  if(!/^\d+$/.test(clean.attendees)||Number(clean.attendees)<1||Number(clean.attendees)>100000)fail('Số người tham dự chưa hợp lệ.');
  if(!['Tại văn phòng IPPTech','Tại đơn vị','Tại sự kiện'].includes(clean.experience_type))fail('Hình thức trải nghiệm chưa hợp lệ.');
  if(clean.experience_type!=='Tại văn phòng IPPTech'&&!clean.venue)fail('Vui lòng nhập địa điểm.');
  if(clean.experience_type==='Tại sự kiện'&&!clean.event_format)fail('Vui lòng chọn hình thức sử dụng robot.');
 }
 if(kind==='support'&&(!validDate(clean.purchase_date)||clean.purchase_date>today))fail('Ngày mua hoặc bàn giao chưa hợp lệ.');
 let department=routes[kind];
 if(kind==='partner'){
  const routing={'Thương hiệu đối tác':'brand-partnerships','Đại lý / Nhà thầu':'dealer-network','Trường học hợp tác':'education-partnerships'};
  if(!routing[clean.partnership_type])fail('Vui lòng chọn một luồng hợp tác.');department=routing[clean.partnership_type];
 }
 const attachments=payload.attachments??[];
 if(!Array.isArray(attachments)||attachments.length>3||(attachments.length&&kind!=='support'))fail('Chỉ hỗ trợ tối đa 3 tệp cho yêu cầu kỹ thuật.');
 let size=0;
 const files=attachments.map((file,index)=>{
  if(!file||typeof file.name!=='string'||typeof file.data!=='string'||!/^[A-Za-z0-9+/]*={0,2}$/.test(file.data))fail('Tệp đính kèm không hợp lệ.');
  const bytes=Buffer.from(file.data,'base64');size+=bytes.length;
  let ext='';
  if(bytes.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])))ext='png';
  else if(bytes[0]===255&&bytes[1]===216&&bytes[2]===255)ext='jpg';
  else if(bytes.subarray(0,4).toString()==='RIFF'&&bytes.subarray(8,12).toString()==='WEBP')ext='webp';
  else if(bytes.subarray(4,8).toString()==='ftyp')ext='mp4';
  else if(bytes.subarray(0,4).equals(Buffer.from([26,69,223,163])))ext='webm';
  if(!ext||!bytes.length||size>20*1024*1024)fail('Dùng ảnh JPG/PNG/WebP hoặc video MP4/WebM, tổng tối đa 20 MB.');
  return {name:file.name.replace(/[<>:"/\\|?*\x00-\x1f]/g,'_').slice(0,120),filename:`attachment-${index+1}.${ext}`,size:bytes.length,bytes};
 });
 return {requestId,kind,fields:clean,department,files};
}
export async function saveInquiry(payload,directory){
 const value=validateInquiry(payload);
 const root=path.resolve(/* turbopackIgnore: true */ directory||process.env.INQUIRY_DATA_DIR||'.private/inquiries');
 const comparedRoot=process.platform==='win32'?root.toLowerCase():root;
 for(const name of ['public','out','.next']){const resolved=path.resolve(/* turbopackIgnore: true */ name);const forbidden=process.platform==='win32'?resolved.toLowerCase():resolved;if(comparedRoot===forbidden||comparedRoot.startsWith(forbidden+path.sep))fail('Kho tiếp nhận chưa được cấu hình riêng tư.',503)}
 const fingerprint=createHash('sha256').update(JSON.stringify({kind:value.kind,fields:value.fields,files:value.files.map(x=>({name:x.name,hash:createHash('sha256').update(x.bytes).digest('hex')}))})).digest('hex');
 const folder=path.join(/* turbopackIgnore: true */ root,value.requestId);await fs.mkdir(root,{recursive:true,mode:0o700});
 const receipt={reference:'IPP-'+value.requestId.toUpperCase(),receivedAt:new Date().toISOString()};
 try{await fs.mkdir(folder,{mode:0o700})}catch(error){
  if(error.code!=='EEXIST')throw error;
  let previous;
  try{previous=JSON.parse(await fs.readFile(path.join(folder,'request.json'),'utf8'))}catch{fail('Yêu cầu đang được ghi nhận. Vui lòng thử lại sau vài giây.',409)}
  if(previous.fingerprint!==fingerprint)fail('Thông tin đã thay đổi. Vui lòng gửi lại yêu cầu mới.',409);
  return {reference:previous.reference,receivedAt:previous.receivedAt,duplicate:true};
 }
 try{
  for(const file of value.files)await fs.writeFile(path.join(/* turbopackIgnore: true */ folder,file.filename),file.bytes,{flag:'wx',mode:0o600});
  const record={...receipt,kind:value.kind,department:value.department,status:'received',fields:value.fields,attachments:value.files.map(({bytes,...info})=>info),fingerprint};
  await fs.writeFile(path.join(folder,'request.json'),JSON.stringify(record,null,2),{flag:'wx',mode:0o600});
 }catch(error){await fs.rm(folder,{recursive:true,force:true});throw error}
 return {...receipt,duplicate:false};
}

