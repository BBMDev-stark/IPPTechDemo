import {PublicGallery} from './visual-content';
import {pagePhotos} from '@/lib/editorial-media';
import {socialAssets} from '@/lib/social-assets';
import {ResourcePackets} from './resource-packets';
import {NewsExplorer} from './news-explorer';
import {contentUrl} from '@/lib/content-url';
import {projectData} from '@/lib/projects';
import Link from 'next/link';
import {ArrowUpRight,ChevronRight,GraduationCap,Building2,FileText,Layers3,MoveHorizontal,Bot,School,Presentation,Trophy,Handshake,Wrench,MapPin,CalendarDays,BriefcaseBusiness,Landmark} from 'lucide-react';
import {Products,ResourceLibrary} from './interactions';
import {BriefForm,BrandExplorer,ProjectExplorer} from './brief-interactions';
import {sources,satellites,catalog} from '@/lib/catalog';
import {navigation,type NavNode} from '@/lib/navigation';
import {type ContentNode,type WebsitePage} from '@/lib/content';

export function ContentLink({href,children}:{href:string;children:React.ReactNode}){
 const external=href.startsWith('https://');
 const target=contentUrl(href);
 return <Link className="button" href={target} {...(external?{target:'_blank',rel:'noopener noreferrer'}:{})}>{children}<ArrowUpRight size={17}/></Link>;
}
export function Table({rows,caption}:{rows:string[][];caption?:string}){
 if(!rows.length)return null;
 return <div className="document-table-wrap"><p className="table-scroll-hint"><MoveHorizontal size={16} aria-hidden="true"/>Vuốt ngang để xem đầy đủ bảng. Với bàn phím, chọn bảng và dùng phím mũi tên.</p><div className="table-scroll" role="region" aria-label={caption||'Bảng thông tin — có thể cuộn ngang'} tabIndex={0}><table className="content-table">{caption&&<caption>{caption}</caption>}<thead><tr>{rows[0].map((c,i)=><th key={i} scope="col">{c}</th>)}</tr></thead><tbody>{rows.slice(1).map((row,i)=><tr key={i}>{row.map((c,j)=>j===0?<th key={j} scope="row">{c}</th>:<td key={j}>{c}</td>)}</tr>)}</tbody></table></div></div>;
}
export function LevelTable({matrix=false}:{matrix?:boolean}){
 return <div className="matrix-section"><h2>{matrix?'Chọn học cụ theo mục tiêu học tập':'Cấu hình theo cấp học'}</h2><p>Các lựa chọn dưới đây là gợi ý để trao đổi cấu hình. IPPTech cùng nhà trường xác nhận học cụ, học liệu và mức độ phù hợp trước khi triển khai.</p><Table rows={matrix?[
 ['Sản phẩm','Tiểu học','THCS','THPT / nâng cao','Nội dung thực hành'],
 ['AI Fantasy Zoo','Gợi ý','Theo chương trình','Theo chương trình','Mô hình động vật, cảm biến và tư duy logic'],
 ['AI Super Engineer','Cần đối chiếu','Gợi ý theo chương trình','Cần đối chiếu','Thiết kế, lắp ráp và điều khiển'],
 ['UKit AI','Theo cấu hình','Gợi ý','Gợi ý','Thị giác máy tính, giọng nói và IoT'],
 ['UGOT Full Kit','Theo chương trình','Gợi ý','Gợi ý','Robot mô-đun và dự án lập trình'],
 ['Yanshee','Cần đối chiếu','Theo chương trình','Gợi ý nâng cao','Lập trình văn bản và thử nghiệm AI']
 ]:[['Cấp học','Mục tiêu','Học cụ gợi ý'],['Tiểu học','Lắp ráp, cảm biến, tư duy logic','AI Fantasy Zoo'],['THCS','Lập trình, kỹ thuật, dự án nhóm','AI Super Engineer, UKit AI, UGOT Full Kit'],['THPT','AI, lập trình nâng cao, nghiên cứu','UGOT Full Kit, UKit AI, Yanshee']]}/><p className="content-note">Cấp học là hướng tư vấn; thành phần bộ thiết bị và chương trình áp dụng được xác nhận theo nhu cầu của từng trường.</p><ContentLink href="/lien-he/yeu-cau-bao-gia">Nhận cấu hình cho trường</ContentLink></div>;
}
const needs=[['Trang bị phòng thực hành STEM','giai-phap/giao-duc-cong-lap/phong-thuc-hanh-stem'],['Xây dựng đề án cấp tỉnh / thành phố','giai-phap/giao-duc-cong-lap/de-an-cap-tinh'],['Tập huấn giáo viên','giai-phap/giao-duc-cong-lap/tap-huan-giao-vien'],['Robot cho quầy đón tiếp','giai-phap/doanh-nghiep'],['Robot cho sự kiện','giai-phap/su-kien-truyen-thong'],['Sân chơi robotics cho học sinh','giai-phap/cuoc-thi-robotics']];
function routePresentation(slug:string){
 const product=catalog.find(p=>slug==='thuong-hieu/ubtech/'+p.slug);
 if(product)return {Icon:Bot,image:product.image,alt:product.name,caption:product.imageNote||product.name,product:true};
 if(slug==='giai-phap/cuoc-thi-robotics')return {Icon:Trophy,image:socialAssets.robogArena.src,alt:socialAssets.robogArena.alt,caption:'ROBOG miền Bắc 2026 · UBTECH Education',product:false};
 if(slug==='giai-phap/doanh-nghiep/du-lich-bao-tang')return {Icon:MapPin,image:socialAssets.cruzrMuseum.src,alt:socialAssets.cruzrMuseum.alt,caption:'Tư liệu ứng dụng quốc tế · UBTECH',product:false};
 const photo=/^(giai-phap\/|ve-ipptech\/nang-luc\/|du-an-doi-tac\/du-an-tieu-bieu\/)/.test(slug)?pagePhotos(slug)[0]:undefined;
 if(photo)return {Icon:Layers3,image:photo.src,alt:photo.alt,caption:photo.sourceLabel+' · '+photo.caption,product:false};
 const Icon=slug.includes('tap-huan')||slug.includes('dao-tao')?Presentation:slug.includes('bao-hanh')||slug.includes('ho-tro')?Wrench:slug.includes('de-an')||slug.includes('hanh-chinh')?Landmark:slug.includes('phong-thuc-hanh')?School:slug.includes('giao-duc')||slug.includes('truong-tu')?GraduationCap:slug.includes('dai-ly')||slug.includes('hop-tac')||slug.includes('doi-tac')?Handshake:slug.includes('su-kien')||slug.includes('trai-nghiem')?CalendarDays:slug.includes('tuyen-dung')?BriefcaseBusiness:slug.includes('doanh-nghiep')?Building2:slug.includes('bao-gia')||slug.includes('tai-nguyen')||slug.includes('bao-chi')?FileText:Layers3;
 return {Icon,image:undefined,alt:undefined,caption:undefined,product:false};
}
export function RouteCards({items}:{items:string[][]}){return <div className="route-cards">{items.map(([title,slug,desc],i)=>{
 const {Icon,image,alt,caption,product}=routePresentation(slug);
 return <Link key={slug} href={'/'+slug+'/'}>{image&&<div className={'route-card-media'+(product?' route-card-media--product':'')}><img src={image} alt={alt} loading="lazy"/><span className="route-card-caption">{caption}</span></div>}<span className="route-index"><span className="route-card-icon"><Icon size={23} aria-hidden="true"/><span>{String(i+1).padStart(2,'0')}</span></span><ArrowUpRight size={19} aria-hidden="true"/></span><h3>{title}</h3>{desc&&<p>{desc}</p>}<span className="text-link">Tìm hiểu thêm <ChevronRight size={16} aria-hidden="true"/></span></Link>;
 })}</div>}
const news=[
 {group:'company',label:'HOẠT ĐỘNG IPPG',title:'IPPG hợp tác cùng FPT Fschools phát triển bộ sách AI',date:'22/12/2022',image:'/images/refined/fpt-partnership.webp',href:sources.fpt,description:'Tư liệu hợp tác giáo dục trong hệ sinh thái IPPG.',related:'/du-an-doi-tac/du-an-tieu-bieu/fpt-schools-ai-robotics/'},
 {group:'event',label:'SỰ KIỆN ROBOG',title:'ROBOG miền Bắc 2026: học sinh cùng thử sức với AI & Robotics',date:'2026',image:socialAssets.robogArena.src,href:socialAssets.robogArena.sourceUrl,description:'Những khoảnh khắc lập trình và thi đấu UGOT được UBTECH Education công bố.',related:'/giai-phap/cuoc-thi-robotics/'},
 {group:'policy',label:'CHÍNH SÁCH GIÁO DỤC',title:'Tra cứu chính sách và thị trường giáo dục STEM',href:'/tin-tuc/chinh-sach-giao-duc/',description:'Đối chiếu thông tin tại nguồn ban hành trước khi xây dựng kế hoạch.',related:'/giai-phap/giao-duc-cong-lap/de-an-cap-tinh/'},
 {group:'brand',brand:'ubtech',line:'edu',label:'SẢN PHẨM UBTECH',title:'UGOT: lắp ráp và lập trình nhiều hình thái robot',image:'/images/refined/ugot-components.webp',href:'https://www.ubtrobot.com/en/ai-education/products/ugot/',description:'Thông tin sản phẩm tại nguồn hãng; cấu hình cung cấp được tư vấn riêng.',related:'/thuong-hieu/ubtech/ugot-full-kit/'},
 {group:'brand',brand:'ubtech',line:'tech',label:'ỨNG DỤNG ROBOT DỊCH VỤ',title:'Cruzr tại bảo tàng: tham khảo kịch bản hướng dẫn khách',image:socialAssets.cruzrMuseum.src,href:socialAssets.cruzrMuseum.sourceUrl,description:'Ứng dụng quốc tế do UBTECH công bố. Phiên bản, ngôn ngữ và phạm vi triển khai tại Việt Nam cần được xác nhận riêng.',related:'/thuong-hieu/ubtech/cruzr/'}
];
export function EditorialNews({category,interactive=false}:{category?:string;interactive?:boolean}){
 if(interactive)return <NewsExplorer entries={news} category={category}/>;
 const entries=category?news.filter(n=>n.group===category):[news[1],news[0],news[3]];
 return <div className="news-cards">{entries.map(n=><article key={n.title}><span className="eyebrow">{n.label}</span>{n.image?<img src={n.image} alt={n.title} loading="lazy"/>:<div className="news-document"><FileText size={42}/><span>{n.group==='event'?'ROBOG / AI / ROBOTICS':'STEM / EDUCATION'}</span></div>}<small>{n.date?'TƯ LIỆU · '+n.date:'THÔNG TIN THAM KHẢO'}</small><h3>{n.title}</h3><p>{n.description}</p><a className="source-link" href={n.href} {...(n.href.startsWith('http')?{target:'_blank',rel:'noopener noreferrer'}:{})}>{n.href.startsWith('http')?'Xem nguồn công bố':'Xem chuyên mục'} <ArrowUpRight size={14}/></a><Link className="news-category" href={n.related}>Nội dung liên quan <ArrowUpRight size={15}/></Link></article>)}</div>;
}
export function Gateways(){return <div className="ecosystem-grid">{satellites.map(([title,,href],i)=><a href={href} key={title} target="_blank" rel="noopener noreferrer"><span className="eyebrow">{['TÀI LIỆU KỸ THUẬT','HỌC LIỆU GIÁO VIÊN','CUỘC THI AI ROBOTICS'][i]}</span><h3>{title}</h3><p>{['Hướng dẫn sản phẩm cho giáo viên và kỹ thuật viên.','Bài giảng và học liệu theo chủ đề, dành cho giáo viên có tài khoản.','Thể lệ, lịch thi và đăng ký cho học sinh, phụ huynh, giáo viên.'][i]}</p><span className="gateway-domain">{href.replace('https://','')}</span><ArrowUpRight size={20}/></a>)}</div>}
function Tree({nodes}:{nodes:NavNode[]}){return <ul>{nodes.map(n=><li key={n.href}><Link href={n.href} {...(n.href.startsWith('http')?{target:'_blank',rel:'noopener noreferrer'}:{})}>{n.label}</Link>{!!n.children?.length&&<Tree nodes={n.children}/>}</li>)}</ul>}
function SiteMap(){return <div className="document-sitemap">{navigation.map(n=><section key={n.href}><h2><Link href={n.href}>{n.label}</Link></h2>{n.children&&<Tree nodes={n.children}/>}</section>)}</div>}
function Gallery(){return <PublicGallery/>}
function Widget({name}:{name:string}){
 switch(name){
  case 'resource-packets':return <ResourcePackets/>;
  case 'brands':return <BrandExplorer/>;
  case 'education':return <LevelTable matrix/>;
  case 'levels':return <LevelTable/>;
  case 'products-edu':return <><h2>Năm sản phẩm robot giáo dục</h2><Products category="edu" filters={false}/></>;
  case 'products-tech':return <><h2>Robot dịch vụ và công nghệ</h2><Products category="tech" filters={false}/></>;
  case 'projects':return <><h2>Dự án trong hệ sinh thái IPPG</h2><ProjectExplorer filters={false}/></>;
  case 'project-filter':return <ProjectExplorer/>;
  case 'needs':return <><h2>Quý đơn vị đang cần gì?</h2><RouteCards items={needs}/></>;
  case 'resources':return <><h2>Tài liệu tham khảo từ UBTECH</h2><ResourceLibrary/></>;
  case 'gateways':return <><h2>Ba cổng chuyên sâu</h2><Gateways/></>;
  case 'sitemap':return <SiteMap/>;
  case 'gallery':return <Gallery/>;
  case 'news':return <EditorialNews interactive/>;
  case 'news-company':return <EditorialNews category="company" interactive/>;
  case 'news-brand':return <EditorialNews category="brand" interactive/>;
  case 'news-event':return <EditorialNews category="event" interactive/>;
  case 'contact-routing':return <><h2>Chọn đúng nhu cầu</h2><RouteCards items={[
   ['Mua thiết bị & Hồ sơ thầu','lien-he/yeu-cau-bao-gia','Chuẩn bị cấu hình, quy mô, thời gian và hồ sơ cần kèm.'],
   ['Thuê robot & Trải nghiệm','lien-he/dang-ky-trai-nghiem','Chọn robot, hình thức và ngày mong muốn.'],
   ['Đăng ký làm đại lý','lien-he/dang-ky-dai-ly','Giới thiệu doanh nghiệp, khu vực và kinh nghiệm.'],
   ['Báo chí & Truyền thông','tin-tuc/bao-chi','Thông tin công ty và yêu cầu tư liệu.'],
   ['Tuyển dụng','ve-ipptech/tuyen-dung','Tìm hiểu cơ hội nghề nghiệp tại IPPTech.'],
   ['Hỗ trợ kỹ thuật','tai-nguyen/ho-tro','Chuẩn bị số serial, phiên bản và mô tả sự cố.']
  ]}/></>;
  default:if(name.endsWith('-form'))return <BriefForm kind={name.replace('-form','') as Parameters<typeof BriefForm>[0]['kind']}/>;return null;
 }
}
function Inline({text}:{text:string}){
 const pattern=/(https:\/\/[^\s)]+|ubtechvietnam\.edu\.vn|ubtech\.ailab\.vn|robog\.edu\.vn|ubtrobot\.com)/g;
 return <>{text.split(pattern).map((part,i)=>/^(https:\/\/|(?:ubtechvietnam\.edu|ubtech\.ailab|robog\.edu|ubtrobot)\.vn|ubtrobot\.com)/.test(part)?<a className="inline-link" href={part.startsWith('https://')?part:'https://'+part} target="_blank" rel="noopener noreferrer" key={i}>{part}</a>:part)}</>;
}
export function Nodes({nodes}:{nodes:ContentNode[]}){
 const output:React.ReactNode[]=[];
 for(let i=0;i<nodes.length;i++){
  const node=nodes[i],key=i;
  if(node.type==='li'){const items=[];while(i<nodes.length&&nodes[i].type==='li'){items.push(nodes[i].text);i++}i--;output.push(<ul className="document-list" key={key}>{items.map((text,j)=><li key={j}><Inline text={text||''}/></li>)}</ul>);continue}
  if(node.type==='cta'){const items=[];while(i<nodes.length&&nodes[i].type==='cta'){items.push(nodes[i]);i++}i--;output.push(<div className="document-actions" key={key}>{items.map((n,j)=><ContentLink key={j} href={n.href!}>{n.text}</ContentLink>)}</div>);continue}
  if(node.type==='h1')continue;
  if(node.type==='h2')output.push(<h2 key={key}>{node.text}</h2>);
  if(node.type==='h3')output.push(<h3 key={key}>{node.text}</h3>);
  if(node.type==='p')output.push(<p key={key}><Inline text={node.text||''}/></p>);
  if(node.type==='table')output.push(<Table key={key} rows={node.rows!}/>);
  if(node.type==='widget')output.push(<Widget key={key} name={node.name!}/>);
 }
 return <>{output}</>;
}
function SectionNodes({nodes}:{nodes:ContentNode[]}){
 const start=nodes.findIndex(n=>n.type==='h3');
 if(nodes.filter(n=>n.type==='h3').length<2)return <Nodes nodes={nodes}/>;
 const groups:ContentNode[][]=[];
 nodes.slice(start).forEach(n=>{if(n.type==='h3')groups.push([]);groups.at(-1)!.push(n)});
 return <><Nodes nodes={nodes.slice(0,start)}/><div className="document-card-grid">{groups.map((group,i)=><article key={i}><span className="document-card-number">{String(i+1).padStart(2,'0')}</span><Nodes nodes={group}/></article>)}</div></>;
}
export function FAQContent({page}:{page:WebsitePage}){
 let questionIndex=0;
 const topics=page.blocks.slice(1).map(block=>{
  const introduction:ContentNode[]=[];
  const questions:{question:string;nodes:ContentNode[];index:number}[]=[];
  for(const node of block.nodes){
   if(node.type==='h3')questions.push({question:node.text||'',nodes:[],index:questionIndex++});
   else if(questions.length)questions.at(-1)!.nodes.push(node);
   else introduction.push(node);
  }
  return {id:block.id,introduction,questions};
 });
 const links=['/ve-ipptech/ho-so-phap-ly/','/giai-phap/giao-duc-cong-lap/','/lien-he/yeu-cau-bao-gia/','/giai-phap/giao-duc-cong-lap/phong-thuc-hanh-stem/','https://ubtechvietnam.edu.vn','/tai-nguyen/ho-tro/','/giai-phap/giao-duc-cong-lap/tap-huan-giao-vien/','/giai-phap/doanh-nghiep/','/lien-he/dang-ky-trai-nghiem/'];
 const schema={'@context':'https://schema.org','@type':'FAQPage',mainEntity:topics.flatMap(topic=>topic.questions).map(e=>({'@type':'Question',name:e.question,acceptedAnswer:{'@type':'Answer',text:e.nodes.map(n=>n.text||n.rows?.map(row=>row.join(' — ')).join(' ')).filter(Boolean).join(' ')}}))};
 return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,'\\u003c')}}/><div className="faq-groups">{topics.map(topic=><section id={topic.id} key={topic.id} className="document-section faq-topic"><div className="faq-topic-heading"><Nodes nodes={topic.introduction}/></div>{topic.questions.length>0&&<div className="faq-list">{topic.questions.map(question=><details key={question.question}><summary>{question.question}<ChevronRight size={20} aria-hidden="true"/></summary><div className="faq-answer"><Nodes nodes={question.nodes}/>{links[question.index]&&<Link className="text-link" href={links[question.index]} {...(links[question.index].startsWith('http')?{target:'_blank',rel:'noopener noreferrer'}:{})}>Xem nội dung chi tiết <ArrowUpRight size={16}/></Link>}</div></details>)}</div>}</section>)}</div></>;
}
function trainingNodes(nodes:ContentNode[]){
 const teacherCTA=nodes.find(n=>n.type==='cta'&&n.href?.includes('/tap-huan-giao-vien'));
 const schoolHeading=nodes.findIndex(n=>n.type==='h3'&&n.text==='Cho nhà trường');
 if(!teacherCTA||schoolHeading<0)return nodes;
 const arranged=nodes.filter(n=>n!==teacherCTA);
 const nextHeading=arranged.findIndex((n,i)=>i>schoolHeading&&n.type==='h3');
 arranged.splice(nextHeading<0?arranged.length:nextHeading,0,teacherCTA);
 return arranged;
}
export function DocumentBody({page}:{page:WebsitePage}){
 if(page.slug==='tai-nguyen/cau-hoi-thuong-gap')return <FAQContent page={page}/>;
 return <>{page.blocks.slice(1).map(b=><section key={b.id} id={b.id} className="document-section"><SectionNodes nodes={page.slug==='ve-ipptech/nang-luc/dao-tao'?trainingNodes(b.nodes):b.nodes}/></section>)}</>;
}
export function PageMotif({slug}:{slug:string}){
 const education=slug.includes('giao-duc')||slug.includes('truong-tu');
 const Icon=education?GraduationCap:slug.startsWith('giai-phap')?Building2:Layers3;
 return <div className="brief-motif" aria-hidden="true"><Icon size={74} strokeWidth={1}/><span>{education?'LEARN · BUILD · CREATE':'TECHNOLOGY · EDUCATION'}</span><strong>{education?'STEM & AI':'IPPTech'}</strong><div><i/><i/><i/></div></div>;
}
