import Link from 'next/link';
import {notFound} from 'next/navigation';
import type {Metadata} from 'next';
import {ChevronRight} from 'lucide-react';
import {pages,pageFor,titleFor,aliases,archivedRoutes,canonicalSlug} from '@/lib/content';
import {catalog} from '@/lib/catalog';
import {Button} from '@/components/site';
import {presentPage,pageKind} from '@/lib/page-presentation';
import {EditorialLayout} from '@/components/editorial-layout';
import {pageMetadata,siteUrl} from '@/lib/seo';

export function generateStaticParams(){return [...pages.map(p=>p.slug),...Object.keys(aliases),...archivedRoutes].map(slug=>({slug:slug.split('/')}));}
export const dynamicParams=false;
export async function generateMetadata({params}:{params:Promise<{slug:string[]}>}):Promise<Metadata>{const{slug}=await params;return pageMetadata(slug.join('/'));}
export default async function ContentPage({params}:{params:Promise<{slug:string[]}>}){
 const{slug:parts}=await params;const requested=parts.join('/');
 if(archivedRoutes.includes(requested))return <main id="main" className="container archive-page"><span className="eyebrow">DANH MỤC SẢN PHẨM</span><h1>Khám phá danh mục UBTECH</h1><p>Sản phẩm tại đường dẫn này chưa nằm trong danh mục giới thiệu hiện tại. Xem các học cụ giáo dục và robot dịch vụ đang được IPPTech tư vấn.</p><div className="document-actions"><Button href="/thuong-hieu/ubtech/giao-duc/">Sản phẩm giáo dục</Button><Button href="/thuong-hieu/ubtech/cong-nghe/">Robot dịch vụ</Button></div></main>;
 const sourcePage=pageFor(requested);if(!sourcePage)notFound();
 const page=presentPage(sourcePage),slug=canonicalSlug(requested),segments=slug.split('/');
 const product=catalog.find(p=>slug==='thuong-hieu/ubtech/'+p.slug);
 const crumbs=[{name:'Trang chủ',href:'/'},...segments.map((_,i)=>{const path=segments.slice(0,i+1).join('/');return {name:titleFor(path),href:'/'+path+'/'};})];
 const breadcrumb={'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:crumbs.map((c,i)=>({'@type':'ListItem',position:i+1,name:c.name,item:new URL(c.href,siteUrl).href}))};
 return <main id="main" className={'document-page editorial-site page-'+pageKind(slug,!!product)+' '+(product?'document-product':'')} data-page={slug}>
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(breadcrumb).replace(/</g,'\\u003c')}}/>
  <nav className="container breadcrumbs" aria-label="Đường dẫn">{crumbs.map((c,i)=><span className="breadcrumb-item" key={c.href}>{i>0&&<ChevronRight size={12}/>} {i===crumbs.length-1?<span aria-current="page">{c.name}</span>:<Link href={c.href}>{c.name}</Link>}</span>)}</nav>
  <EditorialLayout page={page} product={product}/>
  {(product||slug==='thuong-hieu/ubtech/giao-duc')&&<div className="mobile-product-cta"><Button href={"/lien-he/yeu-cau-bao-gia/"+(product?"?san-pham="+encodeURIComponent(product.name):"")}>Nhận cấu hình & báo giá</Button></div>}
 </main>;
}
