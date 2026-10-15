import type {WebsitePage} from './content';

// Presentation order is separate from the document copy. No document block is discarded.
export function presentPage(page:WebsitePage):WebsitePage {
 const blocks=[...page.blocks];
 const promote=(test:(b:WebsitePage['blocks'][number])=>boolean,position=1)=>{
  const index=blocks.findIndex((b,i)=>i>0&&test(b));
  if(index>0){const [block]=blocks.splice(index,1);blocks.splice(position,0,block);}
 };
 if(page.slug==='lien-he')promote(b=>b.nodes.some(n=>n.name==='contact-routing'));
 if(page.slug==='tai-nguyen/ho-so-nang-luc')promote(b=>b.nodes.some(n=>n.name==='resources'));
 if(page.slug==='lien-he/dang-ky-trai-nghiem')promote(b=>b.nodes.some(n=>n.name==='demo-form'),2);
 if(page.slug.startsWith('tin-tuc')&&page.slug!=='tin-tuc/su-kien')promote(b=>b.nodes.some(n=>n.name?.startsWith('news')));
 return {...page,blocks};
}

export function pageKind(slug:string,product=false){
 if(product)return 'product';
 if(slug.startsWith('lien-he')||slug.endsWith('/ho-tro')||slug.endsWith('/hop-tac'))return 'contact';
 if(slug.startsWith('tai-nguyen')||slug.endsWith('ho-so-phap-ly')||slug.endsWith('chinh-sach-giao-duc')||slug.endsWith('bao-chi'))return 'resource';
 if(slug.startsWith('thuong-hieu'))return 'catalog';
 if(slug.startsWith('giai-phap'))return 'solution';
 if(slug.startsWith('tin-tuc'))return 'editorial';
 if(slug.startsWith('du-an-doi-tac'))return 'project';
 return 'company';
}

export function compactHero(slug:string){
 return slug.startsWith('lien-he')||slug.startsWith('tai-nguyen')||slug==='tin-tuc'||
 ['ho-so-phap-ly','doi-ngu','tuyen-dung','con-so','mang-luoi-dai-ly','doi-tac-thuong-hieu','hop-tac','chinh-sach-giao-duc','bao-chi','tin-cong-ty','thuong-hieu','thu-vien'].some(x=>slug.endsWith('/'+x));
}

export function pageAction(slug:string):[string,string,string]{
 if(slug.includes('bao-hanh')||slug.endsWith('/ho-tro'))return ['Bạn cần hỗ trợ thiết bị?','Gửi yêu cầu hỗ trợ','/tai-nguyen/ho-tro/'];
 if(slug.includes('tuyen-dung'))return ['Tìm hiểu cơ hội tại IPP GROUP','Khám phá cơ hội nghề nghiệp','https://ippgroup.vn/'];
 if(slug.startsWith('tai-nguyen')||slug.endsWith('ho-so-phap-ly')||slug.endsWith('bao-chi'))return ['Cần thêm thông tin hoặc tài liệu?','Trao đổi với IPPTech','/lien-he/'];
 if(slug.includes('dai-ly')||slug.includes('doi-tac'))return ['Cùng phát triển một hướng hợp tác','Kết nối hợp tác','/du-an-doi-tac/hop-tac/'];
 if(slug.startsWith('tin-tuc'))return ['Khám phá công nghệ trong thực tế','Đăng ký trải nghiệm','/lien-he/dang-ky-trai-nghiem/'];
 return ['Cấu hình phù hợp bắt đầu từ nhu cầu của bạn','Trao đổi nhu cầu','/lien-he/yeu-cau-bao-gia/'];
}
