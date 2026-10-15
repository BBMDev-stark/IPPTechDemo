import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
const root='public/images/refined';fs.mkdirSync(root,{recursive:true});
const replacements=[];
async function install(old,input,name,processing,sourceUrl){
 const dest=path.join(root,name),bytes=fs.readFileSync(input);
 if(name.endsWith('.svg'))fs.writeFileSync(dest,bytes.toString().replaceAll('#FFFFFF','#00A0DF'));
 else await sharp(bytes).webp({quality:95,alphaQuality:100,effort:6}).toFile(dest);
 const m=await sharp(dest).metadata();
 replacements.push({old,src:'/images/refined/'+name,width:m.width,height:m.height,processing,sourceUrl,input,bytes:fs.statSync(dest).size});
}
const sourced=[
 ['/images/du-an-doi-tac-ai-center-dai-hoc-quoc-gia-img-1.jpeg','aic-launch.jpg','aic-launch.webp','https://ippgroup.vn/network/news/2021/T4/Khai-truong-AIC.jpg'],
 ['/images/du-an-doi-tac-fpt-school-img-1.jpeg','fpt-partnership.jpg','fpt-partnership.webp','https://ippgroup.vn/network/news/2022/T12/IPPG-bo-sach-AI.jpeg'],
 ['/images/editorial/aic-exhibition.webp','aic-exhibition-original.jpg','aic-exhibition.webp','https://ippgroup.vn/network/news/2021/T4/AIC1.jpeg'],
 ['/images/editorial/aic-classroom.webp','aic-robots-original.jpg','aic-classroom.webp','https://ippgroup.vn/network/news/2021/T4/AIC2.jpeg'],
 ['/images/editorial/aic-robots.webp','aic-classroom-original.jpg','aic-robots.webp','https://ippgroup.vn/network/news/2021/T4/AIC3.jpeg'],
 ['/images/editorial/fpt-speech.webp','fpt-speech-original.jpg','fpt-speech.webp','https://ippgroup.vn/network/news/2022/T12/Johnathan-Hanh-Nguyen-Dau-tu-AI.jpeg'],
 ['/images/editorial/lab-overview.webp','lab-overview.jpg','lab-overview.webp','https://owebsite-cdn.ubtrobot.com/en/uploadfiles/zwimg255.jpg'],
 ['/images/audit-refresh/ugot-components.webp','ugot-modules-large.png','ugot-components.webp','https://owebsite-cdn.ubtrobot.com/resources/image/2025/12/29/757160608763973.png'],
 ['/images/common-logo-ubtech.png','ubtech-logo.svg','ubtech-logo.svg','https://owebsite-cdn.ubtrobot.com/en/uploadfiles/logo.svg'],
];
for(const [old,file,name,url] of sourced)await install(old,'.research/high-resolution/'+file,name,'official-higher-resolution',url);
const ugot=replacements.find(p=>p.old.includes('ugot-components'));
replacements.push({...ugot,old:'/images/ubtech-ugot-full-kit-img-1.png'});
for(const p of JSON.parse(fs.readFileSync('.research/high-resolution/generated-final.json','utf8'))){
 const prefix=p.id.startsWith('ukit-')?'audit-refresh':'editorial';
 await install('/images/'+prefix+'/'+p.id+'.webp',p.path,p.id+'-ai.webp','ai-recreated-illustration');
}
for(const f of fs.readdirSync('src',{recursive:true})){
 const full=path.join('src',f);if(!fs.statSync(full).isFile()||! /\.(tsx?|css|json)$/.test(f))continue;
 let s=fs.readFileSync(full,'utf8'),before=s;
 for(const p of replacements)s=s.replaceAll(p.old,p.src);
 if(s!==before)fs.writeFileSync(full,s);
}
const labels={
 'training-workshop':'Minh họa tập huấn sử dụng robot — tái tạo bằng AI từ tư liệu UBTECH.',
 'training-online':'Minh họa giáo viên sử dụng học liệu và robot — tái tạo bằng AI từ tư liệu UBTECH.',
 'ai-lab':'Minh họa phòng thực hành AI & Robotics — tái tạo bằng AI từ tư liệu UBTECH.',
 'education-case-2':'Minh họa lớp thực hành lập trình robot — tái tạo bằng AI từ tư liệu UBTECH.',
 'education-case-3':'Minh họa hoạt động robotics trong lớp học — tái tạo bằng AI từ tư liệu UBTECH.',
 'ukit-ai-mobile-model':'Minh họa mô hình uKit AI di chuyển — tái tạo bằng AI từ ảnh UBTECH.',
 'ukit-ai-sorting-model':'Minh họa mô hình uKit AI phân loại — tái tạo bằng AI từ ảnh UBTECH.'
};
for(const f of ['src/lib/editorial-assets.json','src/lib/product-media.json']){
 const rows=JSON.parse(fs.readFileSync(f,'utf8'));
 for(const row of rows){const p=replacements.find(p=>p.src===row.src);if(!p)continue;row.width=p.width;row.height=p.height;
  if(p.processing==='ai-recreated-illustration'){const id=path.basename(p.old,'.webp');row.caption=labels[id];row.alt=labels[id];row.sourceLabel='Tư liệu gốc · UBTECH';row.processing=p.processing;}
 }
 fs.writeFileSync(f,JSON.stringify(rows,null,2)+'\n');
}
fs.writeFileSync('docs/verification-2026-10-14/refined-image-manifest.json',JSON.stringify(replacements,null,2)+'\n');
console.log(replacements.map(p=>({old:p.old,src:p.src,size:p.width+'x'+p.height,processing:p.processing})));
