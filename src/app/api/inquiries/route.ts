import {saveInquiry,InquiryError} from '../../../../scripts/inquiry-store.mjs';
export const runtime='nodejs';
const buckets=new Map<string,{count:number;expires:number}>();
export async function POST(request:Request){
 const origin=request.headers.get('origin');
 let sameOrigin=false;
 try{const source=new URL(origin||'');sameOrigin=['http:','https:'].includes(source.protocol)&&source.host.toLowerCase()===request.headers.get('host')?.toLowerCase()}catch{}
 if(!sameOrigin)return Response.json({error:'Nguồn gửi không hợp lệ.'},{status:403});
 if(!request.headers.get('content-type')?.startsWith('application/json'))return Response.json({error:'Định dạng chưa được hỗ trợ.'},{status:415});
 // Coarse per-process budget; deploy behind a trusted proxy with its own rate limit.
 const now=Date.now();for(const [key,b] of buckets)if(b.expires<now)buckets.delete(key);
 const key='inquiries';const b=buckets.get(key)||{count:0,expires:now+60000};
 if(b.count>=60)return Response.json({error:'Hệ thống đang nhận nhiều yêu cầu. Vui lòng thử lại sau một phút.'},{status:429,headers:{'Retry-After':'60'}});
 b.count++;buckets.set(key,b);
 const limit=29*1024*1024;
 if(Number(request.headers.get('content-length'))>limit)return Response.json({error:'Tổng tệp đính kèm vượt 20 MB.'},{status:413});
 try{
  const reader=request.body?.getReader();if(!reader)throw new InquiryError('Yêu cầu trống.');
  let size=0;const chunks:Uint8Array[]=[];
  while(true){const {done,value}=await reader.read();if(done)break;size+=value.length;if(size>limit){await reader.cancel();throw new InquiryError('Tổng tệp đính kèm vượt 20 MB.',413)}chunks.push(value)}
  const payload=JSON.parse(Buffer.concat(chunks).toString('utf8'));
  const receipt=await saveInquiry(payload);
  return Response.json(receipt,{status:receipt.duplicate?200:201,headers:{'Cache-Control':'no-store'}});
 }catch(error){
  if(error instanceof InquiryError)return Response.json({error:error.message},{status:error.status});
  if(error instanceof SyntaxError)return Response.json({error:'Dữ liệu chưa hợp lệ.'},{status:400});
  return Response.json({error:'Chưa thể lưu yêu cầu. Vui lòng thử lại; thông tin của bạn vẫn được giữ trên biểu mẫu.'},{status:503});
 }
}
