import {ImageResponse} from 'next/og';
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import {pageFor} from '@/lib/content';
import {catalog} from '@/lib/catalog';
import {socialAssets} from '@/lib/social-assets';
export const runtime='nodejs';
export async function GET(_:Request,{params}:{params:Promise<{slug:string[]}>}){
 const {slug:parts}=await params;const slug=parts.join('/')==='home'?'':parts.join('/');const page=pageFor(slug);
 if(!page)return new Response('Not found',{status:404});
 const product=catalog.find(p=>slug==='thuong-hieu/ubtech/'+p.slug);
 const src=product?.image||(slug.includes('doanh-nghiep')||slug.includes('cong-nghe')?socialAssets.cruzrMuseum.src:slug.includes('fpt-schools')?'/images/refined/fpt-partnership.webp':slug.includes('trung-tam-ai')?'/images/refined/aic-launch.webp':socialAssets.robogProgramming.src);
 const raw=await fs.readFile(path.join(process.cwd(),'public',src));
 const photo=await sharp(raw).resize(510,510,{fit:product?'contain':'cover',background:'#edf6fa'}).png().toBuffer();
 const title=(slug?page.title:'Thiết bị STEM & robot cho Việt Nam').split(/\s+/).slice(0,8).join(' ');
 const rendered=new ImageResponse(<div style={{display:'flex',width:'100%',height:'100%',background:'#f1f7fa',color:'#133c51',padding:'48px',fontFamily:'sans-serif'}}><div style={{display:'flex',flexDirection:'column',width:'58%',paddingRight:38}}><div style={{display:'flex',alignItems:'center',gap:16}}><span style={{fontSize:61,fontWeight:700,color:'#129dc5'}}>ipp</span><span style={{fontSize:32,fontWeight:700}}>TECH</span></div><div style={{display:'flex',fontSize:15,letterSpacing:3,color:'#3f839e',marginTop:16}}>TECHNOLOGY & EDUCATION</div><div style={{display:'flex',fontSize:51,lineHeight:1.15,fontWeight:700,marginTop:60}}>{title}</div><div style={{display:'flex',marginTop:'auto',fontSize:21,color:'#41849c'}}>STEM · AI · ROBOTICS</div></div><div style={{display:'flex',width:'42%',height:'100%',overflow:'hidden',borderRadius:20,background:'#e3f0f5'}}><img src={'data:image/png;base64,'+photo.toString('base64')} alt="" style={{width:'100%',height:'100%',objectFit:product?'contain':'cover'}}/></div></div>,{width:1200,height:630});
 const jpeg=await sharp(Buffer.from(await rendered.arrayBuffer())).jpeg({quality:85,mozjpeg:true}).toBuffer();
 return new Response(new Uint8Array(jpeg),{headers:{'Content-Type':'image/jpeg','Cache-Control':'public, max-age=86400'}});
}
