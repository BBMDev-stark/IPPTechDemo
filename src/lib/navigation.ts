import {nav,pages} from './content';
import {catalog,satellites} from './catalog';
export type NavNode={label:string;href:string;children?:NavNode[]};
export const hrefFor=(route:string)=>route.startsWith('http')?route:'/'+route.replace(/^\/+|\/+$/g,'')+'/';
const childrenOf=(parent:string):NavNode[]=>pages.filter(p=>p.slug.startsWith(parent+'/')&&p.slug.split('/').length===parent.split('/').length+1).map(p=>({label:p.title,href:hrefFor(p.slug),children:childrenOf(p.slug)}));
export const navigation:NavNode[]=nav.map(([label,slug])=>({label,href:hrefFor(slug),children:childrenOf(slug)}));
navigation[1].children=[{label:'UBTECH',href:'/thuong-hieu/ubtech/',children:[
 {label:'Giáo dục',href:'/thuong-hieu/ubtech/giao-duc/',children:catalog.filter(p=>p.category==='edu').map(p=>({label:p.name,href:hrefFor('thuong-hieu/ubtech/'+p.slug)}))},
 {label:'Robot dịch vụ & Công nghệ',href:'/thuong-hieu/ubtech/cong-nghe/',children:catalog.filter(p=>p.category==='tech').map(p=>({label:p.name,href:hrefFor('thuong-hieu/ubtech/'+p.slug)}))},
 {label:'Bảo hành & Hỗ trợ',href:'/tai-nguyen/ho-tro/'},
 {label:'Tài liệu kỹ thuật ↗',href:'https://ubtechvietnam.edu.vn'}]},
 {label:'Hợp tác thương hiệu',href:'/du-an-doi-tac/doi-tac-thuong-hieu/'}];
navigation[4].children=[...childrenOf('tai-nguyen'),...satellites.map(([label,,href])=>({label,href}))];
navigation[6].children=[{label:'Liên hệ chung & bản đồ',href:'/lien-he/'},...childrenOf('lien-he')];
