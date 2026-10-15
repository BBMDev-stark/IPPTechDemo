import Link from 'next/link';
import {ArrowDown,ArrowUpRight} from 'lucide-react';
import {Nodes,FAQContent} from './document-content';
import type {ContentBlock,ContentNode,WebsitePage} from '@/lib/content';
import {catalog,sources,type Product} from '@/lib/catalog';
import {pageAction} from '@/lib/page-presentation';
import {editorialPlans} from '@/lib/editorial-page-plans';
import {pagePhotos,productPhotos} from '@/lib/editorial-media';
import {MediaGallery,type GalleryPhoto} from './media-gallery';
import {ProductStudio} from './product-studio';
import {navigation} from '@/lib/navigation';
import {Newsletter} from './newsletter';

export function EditorialPhoto({photo,priority=false}:{photo:GalleryPhoto;priority?:boolean}){
 return <figure className="editorial-photo"><img src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} loading={priority?'eager':'lazy'}/><figcaption><span>{photo.caption}</span><a href={photo.sourceUrl} target="_blank" rel="noopener noreferrer">{photo.sourceLabel}<ArrowUpRight size={11}/></a></figcaption></figure>;
}

function BlockCopy({block,slug}:{block:ContentBlock;slug:string}){
 let nodes=block.nodes;
 if(slug==='ve-ipptech/nang-luc/dao-tao'){
  const teacher=nodes.find(n=>n.type==='cta'&&n.href?.includes('tap-huan-giao-vien'));
  const enterprise=nodes.findIndex(n=>n.type==='h3'&&n.text==='Cho doanh nghiệp');
  if(teacher&&enterprise>=0){nodes=nodes.filter(n=>n!==teacher);nodes.splice(enterprise,0,teacher)}
 }
 const start=nodes.findIndex(n=>n.type==='h3');
 if(start<0||nodes.filter(n=>n.type==='h3').length<2)return <Nodes nodes={nodes}/>;
 const groups:ContentNode[][]=[];
 nodes.slice(start).forEach(n=>{if(n.type==='h3')groups.push([]);groups.at(-1)!.push(n)});
 return <><Nodes nodes={nodes.slice(0,start)}/><div className={'editorial-subsections '+(groups.length>3?'subsections-long':'')}>{groups.map((group,i)=><div key={i}><Nodes nodes={group}/></div>)}</div></>;
}

function ProductRelated({product}:{product:Product}){
 const relevance:Record<string,string[]>={'yanshee':['ukit-ai','ugot-full-kit'],'ugot-full-kit':['ukit-ai','yanshee'],'ai-fantasy-zoo':['ai-super-engineer','ukit-ai'],'ai-super-engineer':['ai-fantasy-zoo','ugot-full-kit'],'ukit-ai':['ugot-full-kit','yanshee'],'cruzr':['u1'],'u1':['cruzr']};
 return <section className="editorial-related container"><div className="editorial-section-title"><h2>Thiết bị liên quan</h2><Link href={'/thuong-hieu/ubtech/'+(product.category==='edu'?'giao-duc':'cong-nghe')+'/'}>Xem danh mục <ArrowUpRight size={16}/></Link></div><div className="editorial-related-products">{(relevance[product.slug]||[]).map(slug=>{const p=catalog.find(p=>p.slug===slug)!;return <Link key={slug} href={'/thuong-hieu/ubtech/'+slug+'/'}><img src={p.image} alt={p.imageNote||p.name} loading="lazy"/><div><span>{p.tag}</span><h3>{p.name}</h3><p>{p.text}</p><b>Xem sản phẩm <ArrowUpRight size={15}/></b></div></Link>})}</div></section>;
}

function NearbyPages({slug}:{slug:string}){
 const top=navigation.find(n=>n.href==='/'+slug.split('/')[0]+'/');
 const siblings=top?.children?.filter(n=>n.href!=='/'+slug+'/').slice(0,6)||[];
 if(!siblings.length)return null;
 return <aside className="editorial-nearby"><span className="editorial-small-label">CÙNG CHUYÊN MỤC</span>{siblings.map(n=><Link href={n.href} key={n.href}>{n.label}<ArrowUpRight size={13}/></Link>)}</aside>;
}

export function EditorialLayout({page,product}:{page:WebsitePage;product?:Product}){
 const slug=page.slug,plan=editorialPlans[slug];
 const h1=page.blocks[0].nodes.find(n=>n.type==='h1')?.text||page.title;
 const intro=page.blocks[0].nodes.filter(n=>n.type!=='h1');
 const photos=product?productPhotos(product):pagePhotos(slug);
 const kind=product?'product':plan?.layout||'resource';
 const isTask=kind==='contact'||kind==='resource';
 const isProject=slug.includes('/du-an-tieu-bieu/');
 const noHeroPhoto=['tin-tuc','tin-tuc/tin-cong-ty','tin-tuc/thuong-hieu','tin-tuc/chinh-sach-giao-duc','tin-tuc/thu-vien','du-an-doi-tac/du-an-tieu-bieu','thuong-hieu','lien-he'].includes(slug)||isTask;
 const hasForm=page.blocks.some(b=>b.nodes.some(n=>n.name?.endsWith('-form')));
 const sections=page.blocks.slice(1);
 const toc=sections.filter(b=>b.nodes.some(n=>n.type==='h2')).map(b=>({id:b.id,title:b.nodes.find(n=>n.type==='h2')?.text}));
 const supplements=plan?.sections||[];
 const action=pageAction(slug);
 let photoCursor=product?1:noHeroPhoto?0:1;
 const used=new Set<string>(!noHeroPhoto&&photos[0]?[photos[0].src]:[]);
 const nextPhoto=()=>{const photo=photos.slice(photoCursor).find(p=>!used.has(p.src));if(photo){used.add(photo.src);photoCursor=photos.indexOf(photo)+1}return photo};
 const supplement=(s:typeof supplements[number],index:number)=>{
  const photo=s.image&&s.source?{src:s.image,alt:s.caption||s.title,caption:s.caption||s.title,sourceUrl:s.source,sourceLabel:'Nguồn sản phẩm',category:'Sản phẩm'}:nextPhoto();
  if(photo)used.add(photo.src);
  return <section key={'extra-'+index} className={'editorial-story '+(photo?'has-photo':'copy-only')+' '+(index%2?'reversed':'')}><div className="editorial-copy"><h2>{s.title}</h2><p>{s.body}</p>{s.source&&<a className="editorial-source" href={s.source} target="_blank" rel="noopener noreferrer">Nguồn tham khảo <ArrowUpRight size={12}/></a>}</div>{photo&&<EditorialPhoto photo={photo}/>}</section>;
 };
 const renderBlock=(block:ContentBlock,i:number)=>{
  const full=block.nodes.some(n=>n.type==='widget'||n.type==='table')||block.nodes.filter(n=>n.type==='h3').length>3;
  const shortCTA=block.nodes.filter(n=>n.type==='p'||n.type==='li').length===0;
  const photo=!isTask&&!full&&!shortCTA&&photos.length>1&&(i%2===0)&&sections.length>2?nextPhoto():undefined;
  const extra=supplements.filter(s=>s.after===block.id);
  return <div key={block.id}><section id={block.id} className={'document-section editorial-story '+(full?'full-width ':photo?'has-photo ':'copy-only ')+(i%2?'reversed ':'')+(shortCTA?'compact-section':'')}><div className="editorial-copy"><BlockCopy block={block} slug={slug}/></div>{photo&&<EditorialPhoto photo={photo}/>}</section>{extra.map((s,j)=>supplement(s,i+j))}</div>;
 };
 return <div className={'editorial-layout editorial-'+kind}>
  <header className={'editorial-header container '+(product?'editorial-product-header':noHeroPhoto?'editorial-text-header':'editorial-image-header')}>
   {product&&<ProductStudio photos={photos} name={product.name}/>}
   <div className="editorial-lead"><span className="editorial-small-label">{product?product.category==='edu'?'UBTECH / GIÁO DỤC':'UBTECH / ROBOT DỊCH VỤ':plan?.kicker||page.title}</span><h1>{h1}</h1><div className="editorial-intro"><Nodes nodes={intro}/></div>{product?<div className="editorial-primary-action"><Link className="button" href={'/lien-he/yeu-cau-bao-gia/?san-pham='+encodeURIComponent(product.name)}>Yêu cầu báo giá <ArrowUpRight size={16}/></Link><a href="#explore">Thông tin chi tiết <ArrowDown size={15}/></a></div>:hasForm?<a className="editorial-direct-link" href="#request-form">Điền thông tin yêu cầu <ArrowDown size={16}/></a>:null}</div>
   {!product&&!noHeroPhoto&&photos[0]&&<EditorialPhoto photo={photos[0]} priority/>}
  </header>
  {slug==='ve-ipptech/ipp-group'&&<div className="editorial-relationship container" aria-label="IPPTech là thành viên Tập đoàn IPPG"><img src="/images/common-logo-ippg.png" alt="Tập đoàn IPPG"/><span className="relationship-line" aria-hidden="true"/><div><strong>IPPTech</strong><span>Thành viên Tập đoàn Liên Thái Bình Dương</span></div><p>Giáo dục STEM · AI & Robotics<br/>Robot dịch vụ & Công nghệ</p></div>}
  {toc.length>2&&!isTask&&kind!=='collection'&&<nav className="editorial-toc container" aria-label="Nội dung trên trang">{toc.map(t=><a key={t.id} href={'#'+t.id}>{t.title}</a>)}</nav>}
  <div className={'editorial-content container '+(isTask?'editorial-task-content':'')} id="explore"><div className="editorial-main-content">
   {slug==='tai-nguyen/cau-hoi-thuong-gap'?<FAQContent page={page}/>:sections.map(renderBlock)}
   {supplements.filter(s=>!sections.some(b=>b.id===s.after)).map(supplement)}
   {product&&<aside className="editorial-product-source"><strong>Thông tin phiên bản và cấu hình</strong><p>{product.note||'Thông tin và hình ảnh tham khảo từ UBTECH. Model, phụ kiện, học liệu và cấu hình cung cấp được xác nhận theo nhu cầu của đơn vị.'}</p><a href={product.source} target="_blank" rel="noopener noreferrer">{product.sourceName} <ArrowUpRight size={13}/></a></aside>}
   {isProject&&<aside className="editorial-project-source"><strong>Nguồn công bố trong hệ sinh thái IPPG</strong><p>{slug.endsWith('trung-tam-ai-dhqg-tphcm')?'IPPG công bố ngày 26/04/2021; trung tâm khai trương ngày 24/04/2021.':'IPPG công bố ngày 22/12/2022; lễ ký kết diễn ra ngày 15/12/2022.'}</p><a href={slug.endsWith('trung-tam-ai-dhqg-tphcm')?sources.aic:sources.fpt} target="_blank" rel="noopener noreferrer">Đọc bài công bố <ArrowUpRight size={13}/></a></aside>}
   {slug==='lien-he'&&<section className="editorial-office"><div><h2>Văn phòng IPPTech</h2><p>Tầng 3 Centec Tower<br/>72–74 Nguyễn Thị Minh Khai<br/>TP. Hồ Chí Minh, Việt Nam</p><a href="https://www.google.com/maps/search/?api=1&query=Centec+Tower+72-74+Nguyen+Thi+Minh+Khai+Ho+Chi+Minh" target="_blank" rel="noopener noreferrer">Chỉ đường đến văn phòng <ArrowUpRight size={15}/></a></div><iframe title="Văn phòng IPPTech tại Centec Tower" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src="https://maps.google.com/maps?q=Centec%20Tower%2072-74%20Nguyen%20Thi%20Minh%20Khai%20Ho%20Chi%20Minh&t=&z=16&ie=UTF8&iwloc=&output=embed"/></section>}
  </div>{isTask&&slug!=='lien-he'&&<aside className="editorial-side"><NearbyPages slug={slug}/>{photos[0]&&<EditorialPhoto photo={photos[0]}/>}</aside>}</div>
  {slug==='tin-tuc'&&<section className="editorial-newsletter container"><Newsletter/></section>}
  {!isTask&&!['tin-tuc','thuong-hieu','tin-tuc/thu-vien','du-an-doi-tac/du-an-tieu-bieu'].includes(slug)&&photos.filter(p=>!used.has(p.src)).length>0&&<section className="editorial-album container"><div className="editorial-section-title"><h2>{product?'Chi tiết thiết bị':isProject?'Hình ảnh từ hoạt động':'Hình ảnh & tư liệu liên quan'}</h2><span>Chọn ảnh để xem lớn</span></div><MediaGallery photos={photos.filter(p=>!used.has(p.src)).slice(0,6)} filters={false}/></section>}
  {product?<ProductRelated product={product}/>:!['chinh-sach-bao-mat','dieu-khoan-su-dung','so-do-website'].includes(slug)&&!isTask&&<footer className="editorial-next container"><h2>{action[0]}</h2><Link href={action[2]} {...(action[2].startsWith('http')?{target:'_blank',rel:'noopener noreferrer'}:{})}>{action[1]}<ArrowUpRight size={20}/></Link></footer>}
 </div>;
}
