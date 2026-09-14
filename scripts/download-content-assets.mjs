import fs from 'node:fs';
const assets={
 'yanshee.png':'https://owebsite-cdn.ubtrobot.com/en/uploadfiles/products/Eyanshee/EyansheeAbout.png',
 'ukit-ai.png':'https://owebsite-cdn.ubtrobot.com/resources/image/2024/04/24/539904453468229.png',
 'walker-s2.jpg':'https://owebsite-cdn.ubtrobot.com/resources/image/2025/07/17/698770322690117.jpg',
 'u1.jpg':'https://owebsite-cdn.ubtrobot.com/resources/image/2026/09/07/846369878921285.jpg',
 'ai-fantasy-zoo.jpg':'https://bizweb.dktcdn.net/thumb/1024x1024/100/419/068/products/ukit-fantasy-zoo-01.jpg?v=1631007359683',
 'ai-super-engineer.webp':'https://www.muzix.eu/img/20634/UBT-UKIT-AI-SUPER-ENG/UBT-UKIT-AI-SUPER-ENG.webp',
 'fpt-partnership.jpeg':'https://ippgroup.vn/website/var/tmp/image-thumbnails/0/7476/thumb__auto_7e7e0dad23d3cca166d67825e3368bc6/IPPG-bo-sach-AI.jpeg',
 'ai-center.jpeg':'https://ippgroup.vn/website/var/tmp/image-thumbnails/0/6645/thumb__auto_7e7e0dad23d3cca166d67825e3368bc6/AIC1.jpeg',
 'aic-launch.jpeg':'https://ippgroup.vn/website/var/tmp/image-thumbnails/0/6649/thumb__auto_7e7e0dad23d3cca166d67825e3368bc6/Khai-truong-AIC.jpeg',
 'ippg-logo.png':'https://ippgroup.vn/website/static/images/logo.png',
};
fs.mkdirSync('.research',{recursive:true});
fs.mkdirSync('public/media',{recursive:true});
await Promise.all(Object.entries(assets).map(async([name,url])=>{try{const res=await fetch(url,{signal:AbortSignal.timeout(25000)});if(!res.ok)throw new Error(String(res.status));const bytes=Buffer.from(await res.arrayBuffer());if(!res.headers.get('content-type')?.startsWith('image/'))throw new Error('Not an image');fs.writeFileSync('public/media/'+name,bytes);console.log(name,bytes.length)}catch(e){console.log('FAILED',name,e.message)}}));
fs.writeFileSync('.research/asset-sources.json',JSON.stringify(assets,null,2));

