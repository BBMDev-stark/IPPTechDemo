import fs from 'node:fs';
import sharp from 'sharp';
const dir='.research/high-resolution';fs.mkdirSync(dir,{recursive:true});
const urls=[
 ['aic-launch','https://ippgroup.vn/network/news/2021/T4/Khai-truong-AIC.jpg'],
 ['fpt-partnership','https://ippgroup.vn/network/news/2022/T12/IPPG-bo-sach-AI.jpeg'],
 ['ugot-modules-large','https://owebsite-cdn.ubtrobot.com/resources/image/2025/12/29/757160608763973.png'],
 ['ugot-hero','https://owebsite-cdn.ubtrobot.com/resources/image/2025/12/24/755380743364677.png'],
 ['ubtech-logo','https://owebsite-cdn.ubtrobot.com/en/uploadfiles/logo.svg'],
];
for(const file of ['docs/editorial-assets.json','docs/product-assets-refresh.json'])for(const p of JSON.parse(fs.readFileSync(file,'utf8')))urls.push([p.id||p.src.split('/').at(-1).split('.')[0],p.originalImageUrl]);
const results=[];
for(let i=0;i<urls.length;i+=5)await Promise.all(urls.slice(i,i+5).map(async([key,url])=>{try{const r=await fetch(url,{signal:AbortSignal.timeout(25000)});if(!r.ok)throw new Error('HTTP '+r.status);const b=Buffer.from(await r.arrayBuffer()),m=await sharp(b).metadata();const out=dir+'/'+key+'.'+(m.format==='jpeg'?'jpg':m.format);fs.writeFileSync(out,b);results.push({key,url,path:out,width:m.width,height:m.height,bytes:b.length});console.log(key,m.width,m.height)}catch(e){results.push({key,url,error:e.message});console.log(key,e.message)}}));
fs.writeFileSync(dir+'/sources.json',JSON.stringify(results,null,2));
