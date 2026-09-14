import {pages,nav} from './content';
import {catalog,educationSolutions,enterpriseSolutions,projectSections,satellites} from './catalog';
export type NavNode={label:string;href:string;children?:NavNode[]};
export const hrefFor=(route:string)=>route.startsWith('http')?route:'/'+route.replace('#','/#')+(route.includes('#')?'':'/');
const nodes=(items:string[][]):NavNode[]=>items.map(([label,route])=>({label,href:hrefFor(route)}));
export const navigation:NavNode[]=nav.map(([label,slug])=>{
 let children:NavNode[]=pages.filter(p=>p.slug.startsWith(slug+'/')&&p.slug.split('/').length===2).map(p=>({label:p.title,href:hrefFor(p.slug)}));
 if(slug==='thuong-hieu')children=[{label:'UBTECH',href:'/thuong-hieu/ubtech/',children:[{label:'Giáo dục',href:'/thuong-hieu/ubtech/giao-duc/',children:catalog.filter(p=>p.category==='edu').map(p=>({label:p.name,href:hrefFor('thuong-hieu/ubtech/'+p.slug)}))},{label:'Robot dịch vụ & Công nghệ',href:'/thuong-hieu/ubtech/cong-nghe/',children:catalog.filter(p=>p.category==='tech').map(p=>({label:p.name,href:hrefFor('thuong-hieu/ubtech/'+p.slug)}))},{label:'Bảo hành & Dịch vụ ủy quyền',href:'/thuong-hieu/ubtech/bao-hanh-dich-vu-uy-quyen/'},{label:'Tài liệu kỹ thuật',href:'/tai-nguyen/tai-lieu-ky-thuat/'}]},{label:'Thương hiệu tiếp theo 02',href:'/thuong-hieu/brand-02/'},{label:'Thương hiệu tiếp theo 03',href:'/thuong-hieu/brand-03/'}];
 if(slug==='giai-phap')children=[{label:'Giải pháp Giáo dục',href:'/giai-phap/giao-duc/',children:nodes(educationSolutions)},{label:'Giải pháp Doanh nghiệp',href:'/giai-phap/doanh-nghiep/',children:nodes(enterpriseSolutions)}];
 if(slug==='du-an-doi-tac')children=nodes(projectSections);
 if(slug==='tai-nguyen')children=[...children,...satellites.slice(1).map(([label,,href])=>({label,href}))];
 if(slug==='lien-he')children=[{label:'Liên hệ chung & bản đồ',href:'/lien-he/'},{label:'Yêu cầu báo giá',href:'/lien-he/#yeu-cau-bao-gia'},{label:'Đăng ký trải nghiệm robot',href:'/lien-he/dang-ky-trai-nghiem/'},{label:'Đăng ký làm đại lý',href:'/lien-he/dang-ky-dai-ly/'}];
 return {label,href:hrefFor(slug),children};
});
