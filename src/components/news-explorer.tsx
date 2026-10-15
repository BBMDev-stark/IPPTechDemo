'use client';

import Link from 'next/link';
import {useEffect,useState} from 'react';
import {ArrowUpRight,FileText} from 'lucide-react';

type Entry={group:string;label:string;title:string;date?:string;image?:string;href:string;description:string;related:string;brand?:string;line?:string};
function publishedOrder(date?:string){if(!date)return 0;const parts=date.split('/');return parts.length===3?Number(parts[2])*10000+Number(parts[1])*100+Number(parts[0]):Number(date)*10000||0;}
const groups=[['all','Tất cả'],['company','Tin công ty'],['brand','Thương hiệu & sản phẩm'],['policy','Chính sách giáo dục'],['event','Sự kiện']];
export function NewsExplorer({entries,category}:{entries:Entry[];category?:string}){
 const [filters,setFilters]=useState({group:category||'all',brand:'all',line:'all'});
 useEffect(()=>{const sync=()=>{const q=new URLSearchParams(location.search);setFilters({group:category||q.get('nhom-tin')||'all',brand:q.get('hang')||'all',line:q.get('dong')||'all'})};sync();window.addEventListener('popstate',sync);return()=>window.removeEventListener('popstate',sync)},[category]);
 function change(key:keyof typeof filters,value:string){setFilters(old=>({...old,[key]:value,...(key==='group'?{brand:'all',line:'all'}:{})}));const url=new URL(location.href),param={group:'nhom-tin',brand:'hang',line:'dong'}[key];if(key==='group'){url.searchParams.delete('hang');url.searchParams.delete('dong')}if(value==='all')url.searchParams.delete(param);else url.searchParams.set(param,value);history.pushState(null,'',url.pathname+url.search+url.hash)}
 function reset(){setFilters({group:category||'all',brand:'all',line:'all'});const url=new URL(location.href);['nhom-tin','hang','dong'].forEach(k=>url.searchParams.delete(k));history.pushState(null,'',url.pathname+url.search+url.hash)}
 const results=entries.filter(n=>(filters.group==='all'||n.group===filters.group)&&(filters.brand==='all'||n.brand===filters.brand)&&(filters.line==='all'||n.line===filters.line)).sort((a,b)=>publishedOrder(b.date)-publishedOrder(a.date));
 return <div className="news-explorer">
  {!category&&<div className="gallery-filters" aria-label="Chủ đề tin tức">{groups.map(([value,label])=><button key={value} type="button" className={filters.group===value?'active':''} aria-pressed={filters.group===value} onClick={()=>change('group',value)}>{label}</button>)}</div>}
  {(category==='brand'||filters.group==='brand')&&<div className="brief-filters"><label>Thương hiệu<select value={filters.brand} onChange={e=>change('brand',e.target.value)}><option value="all">Tất cả</option><option value="ubtech">UBTECH</option></select></label><label>Dòng sản phẩm<select value={filters.line} onChange={e=>change('line',e.target.value)}><option value="all">Tất cả</option><option value="edu">EDU · Giáo dục</option><option value="tech">TECH · Robot dịch vụ</option></select></label></div>}
  <p className="filter-result" role="status">{results.length} nội dung phù hợp <button type="button" className="text-link" onClick={reset}>Xóa bộ lọc</button></p>
  <div className="news-editorial">{results.map((n,index)=><article className={'news-story'+(index===0?' news-story-featured':'')} key={n.title}>
   <a className="news-story-media" href={n.href} aria-label={n.title} {...(n.href.startsWith('http')?{target:'_blank',rel:'noopener noreferrer'}:{})}>{n.image?<img src={n.image} alt={n.title} loading="lazy"/>:<div className="news-document"><FileText size={42}/><span>Chính sách giáo dục</span></div>}</a>
   <div className="news-story-copy"><div className="news-story-meta"><span>{n.label}</span><small>{n.date||'Thông tin tham khảo'}</small></div><h3><a href={n.href} {...(n.href.startsWith('http')?{target:'_blank',rel:'noopener noreferrer'}:{})}>{n.title}</a></h3><p>{n.description}</p><div className="news-story-links"><a className="source-link" href={n.href} {...(n.href.startsWith('http')?{target:'_blank',rel:'noopener noreferrer'}:{})}>{n.href.startsWith('http')?'Xem nguồn công bố':'Xem chuyên mục'} <ArrowUpRight size={14}/></a><Link className="news-category" href={n.related}>Nội dung liên quan <ArrowUpRight size={15}/></Link></div></div>
  </article>)}</div>
  {!results.length&&<p className="empty-state">Chưa có nội dung công bố phù hợp với bộ lọc này.</p>}
 </div>;
}
