import type {Metadata} from 'next';
import {pageFor,aliases,archivedRoutes,canonicalSlug} from './content';
import {catalog} from './catalog';

// Set the real origin before a production export; do not infer a domain.
export const siteUrl=process.env.NEXT_PUBLIC_SITE_URL||'http://127.0.0.1:3000';
export const isIndexable=(slug:string)=>!slug.includes('brand-0')&&!['chinh-sach-bao-mat','dieu-khoan-su-dung','so-do-website'].includes(slug);
export function pageMetadata(slug:string):Metadata{
 const page=pageFor(slug);
 if(!page)return {title:'Danh mục sản phẩm UBTECH',robots:{index:false,follow:true},alternates:{canonical:'/thuong-hieu/ubtech/'}};
 const path=page.slug?'/'+page.slug+'/':'/';
 const product=catalog.find(p=>canonicalSlug(slug)==='thuong-hieu/ubtech/'+p.slug);
 const title=page.seoTitle,description=page.description;
 return {title:{absolute:title},description,alternates:{canonical:path},robots:{index:isIndexable(slug)&&!aliases[slug]&&!archivedRoutes.includes(slug),follow:true},
  openGraph:{title,description,url:path,siteName:'IPPTech',locale:'vi_VN',type:'website',images:[{url:'/og/'+(page.slug||'home')+'/',width:1200,height:630,alt:product?.name||page.title}]},
  twitter:{card:'summary_large_image',title,description,images:['/og/'+(page.slug||'home')+'/']}
 };
}
