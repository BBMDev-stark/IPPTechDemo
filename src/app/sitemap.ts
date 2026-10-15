import type {MetadataRoute} from 'next';
import {websitePages} from '@/lib/content';
import {siteUrl,isIndexable} from '@/lib/seo';
export const dynamic='force-static';
export default function sitemap():MetadataRoute.Sitemap{
 return websitePages.filter(p=>isIndexable(p.slug)).map(p=>({url:new URL(p.slug?'/'+p.slug+'/':'/',siteUrl).href}));
}
