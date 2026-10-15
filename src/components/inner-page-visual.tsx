import Link from 'next/link';
import {ArrowUpRight,BookOpen,Boxes,Code2,GraduationCap,Settings2} from 'lucide-react';
import {catalog} from '@/lib/catalog';
import {HeroVisual} from './visual-content';
import media from '@/lib/product-media.json';

const industry:Record<string,[string,string,string,string]>={
 'ngan-hang-ban-le':['Đón tiếp & hướng dẫn','Chào đón khách','Tìm hiểu nhu cầu','Kết nối nhân viên'],
 'bat-dong-san-showroom':['Trải nghiệm tại showroom','Chào đón','Giới thiệu không gian','Dẫn tham quan'],
 'hanh-chinh-cong-y-te':['Thông tin & điều phối','Tiếp nhận nhu cầu','Hướng dẫn khu vực','Chuyển nhân viên hỗ trợ'],
};
export function InnerPageVisual({slug}:{slug:string}){
 const key=slug.split('/').at(-1)!;
 if(key==='bat-dong-san-showroom'||key==='ngan-hang-ban-le'||slug==='giai-phap/doanh-nghiep'){
  const photo=media.find(p=>p.src.includes(key==='bat-dong-san-showroom'?'cruzr-1s-greeting':'cruzr-1s-scenarios'))!;
  return <figure className="social-photo"><img src={photo.src} alt={photo.alt} width={photo.width} height={photo.height}/><figcaption><span>{photo.caption}</span><a href={photo.sourceUrl} target="_blank" rel="noopener noreferrer">Tư liệu ứng dụng từ UBTECH <ArrowUpRight size={12}/></a></figcaption></figure>;
 }
 if(industry[key]){const [title,...steps]=industry[key];return <div className="scenario-visual"><span className="eyebrow">KỊCH BẢN THAM KHẢO</span><h2>{title}</h2><div className="scenario-stage"><img src="/images/ubtech-cruzr-img-1.jpg" alt="Cruzr 1S — ảnh sản phẩm tham khảo từ UBTECH"/><ol>{steps.map((s,i)=><li key={s}><span>0{i+1}</span>{s}</li>)}</ol></div><p>Ảnh sản phẩm Cruzr 1S. Kịch bản và phiên bản triển khai được xác nhận theo nhu cầu.</p></div>}
 if(key==='phong-thuc-hanh-stem')return <div className="lab-plan"><span className="eyebrow">TỔ CHỨC KHÔNG GIAN HỌC TẬP</span><h2>Từ ý tưởng đến thực hành</h2><div className="lab-zones">{[[BookOpen,'Học & thảo luận'],[Boxes,'Lắp ráp mô hình'],[Code2,'Lập trình & thử nghiệm'],[Settings2,'Lưu trữ & bảo quản']].map(([Icon,title],i)=>{const I=Icon as typeof BookOpen;return <div key={i}><I size={26}/><span>0{i+1}</span><strong>{title as string}</strong></div>})}</div><p>Sơ đồ chức năng minh họa. Bố trí cụ thể được khảo sát theo diện tích và thiết bị.</p></div>;
 if(key==='tap-huan-giao-vien'||slug==='ve-ipptech/nang-luc/dao-tao')return <div className="training-visual"><GraduationCap size={32}/><span className="eyebrow">ĐÀO TẠO & CHUYỂN GIAO</span><h2>Tự tin hướng dẫn.<br/>Chủ động vận hành.</h2><ol>{['Làm quen thiết bị','Thực hành theo tình huống','Chuẩn bị hoạt động mẫu'].map((t,i)=><li key={t}><span>0{i+1}</span>{t}</li>)}</ol><a href="https://ubtech.ailab.vn" target="_blank" rel="noopener noreferrer">Khám phá học liệu AI Lab <ArrowUpRight size={16}/></a></div>;
 if(slug==='thuong-hieu/ubtech/giao-duc'||slug==='thuong-hieu/ubtech/cong-nghe'||slug==='thuong-hieu/ubtech')return <div className="collection-visual"><span className="eyebrow">UBTECH / {slug.endsWith('cong-nghe')?'ROBOT DỊCH VỤ':'AI & ROBOTICS'}</span><div>{catalog.filter(p=>slug.endsWith('cong-nghe')?p.category==='tech':['ugot-full-kit','yanshee','ukit-ai'].includes(p.slug)).map(p=><Link href={'/thuong-hieu/ubtech/'+p.slug+'/'} key={p.slug}><img src={p.image} alt={p.imageNote||p.name}/><strong>{p.name}</strong></Link>)}</div><p>Khám phá từng thiết bị để lựa chọn theo mục tiêu sử dụng.</p></div>;
 return <HeroVisual slug={slug}/>;
}

export function ContextAction({action}:{action:[string,string,string]}){return <aside className="context-action container"><div><span className="eyebrow">IPPTECH ĐỒNG HÀNH</span><h2>{action[0]}</h2></div><Link className="button" href={action[2]} {...(action[2].startsWith('http')?{target:'_blank',rel:'noopener noreferrer'}:{})}>{action[1]}<ArrowUpRight size={18}/></Link></aside>}
