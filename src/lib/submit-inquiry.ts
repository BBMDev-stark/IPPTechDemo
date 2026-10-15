export async function submitInquiry(form:HTMLFormElement,kind:string,requestId:string){
 const data=new FormData(form),fields:Record<string,string|string[]>={};
 for(const [key,value] of data){if(typeof value!=='string')continue;if(key==='legal_documents'){fields[key]=data.getAll(key).map(String)}else fields[key]=value}
 const files=data.getAll('attachments').filter((v):v is File=>v instanceof File&&v.size>0);
 if(files.length>3||files.reduce((n,f)=>n+f.size,0)>20*1024*1024)throw new Error('Chọn tối đa 3 tệp, tổng dung lượng không quá 20 MB.');
 const attachments=await Promise.all(files.map(file=>new Promise<{name:string;data:string}>((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve({name:file.name,data:String(reader.result).split(',')[1]});reader.onerror=()=>reject(new Error('Không đọc được tệp đính kèm.'));reader.readAsDataURL(file)})));
 const response=await fetch('/api/inquiries/',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({kind,requestId,fields,attachments})});
 const result=await response.json().catch(()=>({error:'Hệ thống tiếp nhận chưa sẵn sàng. Vui lòng thử lại sau.'}));
 if(!response.ok)throw new Error(result.error||'Chưa gửi được yêu cầu. Vui lòng thử lại.');
 return result as {reference:string;receivedAt:string;duplicate:boolean};
}
