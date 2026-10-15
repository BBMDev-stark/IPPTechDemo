import Link from 'next/link';
import {ArrowUpRight,MoveDown,PackageCheck,Wrench,BookOpen,Headphones} from 'lucide-react';
import {pageFor} from '@/lib/content';
import {socialAssets} from '@/lib/social-assets';
import {Nodes,Gateways,EditorialNews} from './document-content';
import {Products} from './interactions';
import {ProjectExplorer} from './brief-interactions';
import {SocialPhoto,RoboticsGallery} from './visual-content';
import {RobotShowcase} from './robot-showcase';

/** Use the same content blocks as the document pages; layout must not drop copy. */
export function DocumentHome(){
 const blocks=pageFor('')!.blocks;
 const nodes=(id:string)=>blocks.find(b=>b.id===id)!.nodes;
 const hero=nodes('section-1');
 const heroTitle=hero.find(n=>n.type==='h1')!.text!;
 const titleBreak=heroTitle.indexOf(' cho ');
 const audience=nodes('section-3');
 const secondAudience=audience.findIndex((n,i)=>i>1&&n.type==='h3');
 const brands=nodes('section-4');
 const futureBrand=brands.findIndex(n=>n.type==='h3'&&n.text==='Thương hiệu tiếp theo');
 return <main id="main" className="content-complete-home">
  <section className="hero home-faithful document-home"><div className="container hero-grid"><div className="hero-copy">
   <span className="eyebrow">{hero[0].text}</span>
   <h1>{heroTitle.slice(0,titleBreak)}<span>{heroTitle.slice(titleBreak)}</span></h1>
   <div className="hero-original-copy"><Nodes nodes={hero.slice(2).filter(n=>n.type!=='cta')}/></div>
   <Nodes nodes={hero.slice(2).filter(n=>n.type==='cta')}/>
  </div><RobotShowcase/></div>
   <div className="container hero-bottom"><span>CÔNG NGHỆ TOÀN CẦU. GIÁ TRỊ VIỆT NAM.</span><a href="#solutions">Tìm giải pháp của bạn <MoveDown size={15}/></a><span>STEM / AI / ROBOTICS</span></div>
  </section>
  <section className="service-strip" aria-label="Đồng hành từ cung cấp đến vận hành"><div className="container">{[[PackageCheck,'Thiết bị chính hãng','Nguồn gốc và cấu hình rõ ràng'],[Wrench,'Triển khai tại đơn vị','Khảo sát, lắp đặt, bàn giao'],[BookOpen,'Đào tạo & chuyển giao','Giáo viên và nhân sự vận hành'],[Headphones,'Bảo hành & hỗ trợ','Đồng hành sau bàn giao']].map(([Icon,title,description])=>{const I=Icon as typeof Wrench;return <div key={String(title)}><I size={26} strokeWidth={1.5}/><span><strong>{String(title)}</strong><small>{String(description)}</small></span></div>})}</div></section>
  <section className="home-distribution container"><Nodes nodes={nodes('section-2')}/><div className="hero-partner"><img src="/images/refined/ubtech-logo.svg" alt="UBTECH Robotics"/><span>Giáo dục AI & Robotics<br/><b>Robot dịch vụ & Công nghệ</b></span></div></section>
  <section className="section container" id="solutions"><span className="eyebrow">BẮT ĐẦU TỪ NHU CẦU</span><Nodes nodes={audience.slice(0,1)}/><div className="audience-grid">
   <article className="audience-panel"><Nodes nodes={audience.slice(1,secondAudience)}/><Link className="audience-extra" href="/giai-phap/truong-tu-trung-tam/">Trường tư & Trung tâm STEM <ArrowUpRight size={16}/></Link><SocialPhoto photo={socialAssets.robogArena}/></article>
   <article className="audience-panel enterprise"><Nodes nodes={audience.slice(secondAudience)}/><Link className="audience-extra" href="/giai-phap/su-kien-truyen-thong/">Robot cho sự kiện & truyền thông <ArrowUpRight size={16}/></Link><SocialPhoto photo={socialAssets.cruzrMuseum}/></article>
  </div></section>
  <section className="section products-section"><div className="container"><span className="eyebrow">THƯƠNG HIỆU & SẢN PHẨM</span><Nodes nodes={brands.slice(0,1)}/><div className="home-brand-intro"><img src="/images/refined/ubtech-logo.svg" alt="Logo UBTECH"/><div><Nodes nodes={brands.slice(1,futureBrand)}/></div></div><Products/><aside className="home-partnership-note"><Nodes nodes={brands.slice(futureBrand)}/></aside></div></section>
  <section className="section service-journey"><div className="container"><span className="eyebrow">TỪ NHU CẦU ĐẾN VẬN HÀNH</span><h2>Một lộ trình, một đầu mối đồng hành.</h2><ol className="journey-steps">{[['Khảo sát','Hiểu mục tiêu và điều kiện tại đơn vị.'],['Chọn cấu hình','Thống nhất học cụ, robot và phạm vi triển khai.'],['Lắp đặt','Cấu hình, chạy thử và kiểm tra thiết bị.'],['Chuyển giao','Hướng dẫn người dùng và bàn giao tài liệu.'],['Hỗ trợ','Tiếp nhận yêu cầu sau bàn giao.']].map(([title,copy],i)=><li key={title}><span>0{i+1}</span><h3>{title}</h3><p>{copy}</p></li>)}</ol><Link className="text-link" href="/ve-ipptech/nang-luc/">Tìm hiểu dịch vụ <ArrowUpRight size={16}/></Link></div></section>
  <section className="section container"><span className="eyebrow">TƯ LIỆU TRONG HỆ SINH THÁI IPPG</span><Nodes nodes={nodes('section-5')}/><ProjectExplorer filters={false}/></section>
  <section className="section container home-gallery"><span className="eyebrow">HỌC QUA THỰC HÀNH</span><h2>Những khoảnh khắc AI & Robotics.</h2><p className="section-lead">Học sinh cùng lập trình, thử nghiệm và thi đấu tại ROBOG miền Bắc 2026. Tư liệu công khai từ UBTECH Education.</p><RoboticsGallery compact/><Link className="text-link" href="/tin-tuc/thu-vien/">Mở thư viện ảnh <ArrowUpRight size={16}/></Link></section>
  <section className="group-section"><div className="container group-inner"><div className="group-brand"><img src="/images/common-logo-ippg.png" alt="Tập đoàn IPPG"/><span>IPPG → IPPTech</span></div><div><Nodes nodes={nodes('section-6')}/></div></div></section>
  <section className="section container"><Nodes nodes={nodes('section-7')}/><Gateways/></section>
  <section className="section news-home"><div className="container"><Nodes nodes={nodes('section-8')}/><EditorialNews/></div></section>
  <section className="contact-band"><div className="container"><div><Nodes nodes={nodes('section-9')}/></div></div></section>
 </main>;
}
