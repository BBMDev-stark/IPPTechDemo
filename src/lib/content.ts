import document from './website-content.json';
export const nav = [['Về IPPTech','ve-ipptech'],['Thương hiệu & Sản phẩm','thuong-hieu'],['Giải pháp','giai-phap'],['Dự án & Đối tác','du-an-doi-tac'],['Tài nguyên','tai-nguyen'],['Tin tức & Sự kiện','tin-tuc'],['Liên hệ','lien-he']];
export type ContentNode = {type:string;text?:string;href?:string;rows?:string[][];name?:string};
export type ContentBlock = {id:string;nodes:ContentNode[]};
export type WebsitePage = {slug:string;title:string;seoTitle:string;description:string;keyword:string;blocks:ContentBlock[]};
export const websitePages = document as WebsitePage[];
export const pages = websitePages.filter(p=>p.slug).map(({slug,title})=>({slug,title}));
export const aliases:Record<string,string> = {
 'nang-luc':'ve-ipptech/nang-luc',
 'nang-luc/phan-phoi':'ve-ipptech/nang-luc/phan-phoi',
 'nang-luc/trien-khai':'ve-ipptech/nang-luc/trien-khai',
 'nang-luc/bao-hanh':'ve-ipptech/nang-luc/bao-hanh',
 'nang-luc/dao-tao':'ve-ipptech/nang-luc/dao-tao',
 'giai-phap/giao-duc':'giai-phap/giao-duc-cong-lap',
 'giai-phap/giao-duc/phong-thuc-hanh-stem':'giai-phap/giao-duc-cong-lap/phong-thuc-hanh-stem',
 'giai-phap/giao-duc/tap-huan-giao-vien':'giai-phap/giao-duc-cong-lap/tap-huan-giao-vien',
 'giai-phap/giao-duc/cuoc-thi-robotics':'giai-phap/cuoc-thi-robotics',
 'giai-phap/giao-duc/ai-center':'giai-phap/truong-tu-trung-tam',
 'du-an-doi-tac/ai-center-dai-hoc-quoc-gia':'du-an-doi-tac/du-an-tieu-bieu/trung-tam-ai-dhqg-tphcm',
 'du-an-doi-tac/fpt-school':'du-an-doi-tac/du-an-tieu-bieu/fpt-schools-ai-robotics',
 'du-an-doi-tac/du-an-truong-cong':'giai-phap/giao-duc-cong-lap',
 'thuong-hieu/ubtech/bao-hanh-dich-vu-uy-quyen':'tai-nguyen/ho-tro',
 'tai-nguyen/tai-lieu-ky-thuat':'tai-nguyen',
};
export const archivedRoutes=['thuong-hieu/ubtech/cruzr-edu','thuong-hieu/ubtech/walker-s2-edu','thuong-hieu/ubtech/walker-x'];
export const canonicalSlug=(slug:string)=>aliases[slug]||slug;
export const pageFor=(slug:string)=>websitePages.find(p=>p.slug===canonicalSlug(slug));
export function titleFor(slug:string){return pageFor(slug)?.title || 'Thông tin sản phẩm';}
export function descriptionFor(slug:string){return pageFor(slug)?.description || 'Khám phá thiết bị STEM và robot cùng IPPTech.';}
export const productHref=(slug:string)=>'/thuong-hieu/ubtech/'+slug+'/';
export {catalog as products} from './catalog';
