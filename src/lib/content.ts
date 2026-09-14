import originalPages from './source-pages.json';
export const nav = [['Về IPPTech','ve-ipptech'],['Thương hiệu & Sản phẩm','thuong-hieu'],['Giải pháp','giai-phap'],['Dự án & Đối tác','du-an-doi-tac'],['Tài nguyên','tai-nguyen'],['Tin tức','tin-tuc'],['Liên hệ','lien-he']];
export const pages = [...originalPages,{slug:'nang-luc',title:'Năng lực triển khai'}];
export const products = [
 {name:'UGOT Full Kit',slug:'ugot-full-kit',tag:'ROBOT LẬP TRÌNH',text:'Khơi mở tư duy sáng tạo qua lắp ráp, lập trình và khám phá robot.',image:'ugot'},
 {name:'Walker X',slug:'walker-x',tag:'HUMANOID ROBOT',text:'Khám phá sự giao thoa giữa trí tuệ nhân tạo và chuyển động của robot hình người.',image:'walker'},
 {name:'Cruzr',slug:'cruzr',tag:'ROBOT DỊCH VỤ',text:'Một cách kết nối mới trong không gian dịch vụ, đón tiếp và trải nghiệm.',image:'cruzr'},
];
export const descriptions: Record<string,string> = {
 'lien-he':'Chia sẻ nhu cầu của bạn. IPPTech cùng bạn tìm giải pháp công nghệ, giáo dục và robot phù hợp với đơn vị.',
 've-ipptech':'Kết nối công nghệ toàn cầu với nhu cầu Việt Nam. IPPTech phát triển hệ sinh thái giải pháp giáo dục, trí tuệ nhân tạo và robot trong hệ sinh thái IPP Group.',
 'thuong-hieu':'Khám phá hệ sinh thái UBTECH. Từ robot giáo dục đến robot dịch vụ, đưa công nghệ đến gần hơn với con người.',
 'giai-phap':'Bắt đầu từ nhu cầu thực tế. Tìm giải pháp phù hợp cho trường học, doanh nghiệp và không gian dịch vụ.',
 'du-an-doi-tac':'Kết nối nhà trường, doanh nghiệp và đối tác công nghệ để cùng phát triển các ứng dụng AI & Robotics tại Việt Nam.',
 'tai-nguyen':'Kết nối với đội ngũ IPPTech để nhận hồ sơ năng lực, tài liệu sản phẩm và hướng dẫn kỹ thuật phù hợp với nhu cầu.',
 'tin-tuc':'Khám phá những chuyển động mới của công nghệ robot, hệ sinh thái UBTECH và giáo dục AI.',
 'giai-phap/giao-duc':'Xây dựng môi trường học tập nơi học sinh được khám phá, thử nghiệm và sáng tạo cùng AI & Robotics.',
 'giai-phap/doanh-nghiep':'Khám phá robot trong đón tiếp, giới thiệu sản phẩm và các trải nghiệm tương tác tại doanh nghiệp.',
 'giai-phap/giao-duc/phong-thuc-hanh-stem':'Kết nối không gian, thiết bị robot và hoạt động thực hành thành một trải nghiệm học tập STEM liền mạch.',
};
export function titleFor(slug:string){return nav.find(n=>n[1]===slug)?.[0] || pages.find(p=>p.slug===slug)?.title || (slug.endsWith('walker-x')?'Walker X':'IPPTech');}
export function descriptionFor(slug:string){return descriptions[slug] || (slug.startsWith('thuong-hieu/ubtech/') ? 'Khám phá sản phẩm và ứng dụng trong hệ sinh thái UBTECH. Đội ngũ IPPTech đồng hành lựa chọn cấu hình, tư vấn triển khai và hỗ trợ kỹ thuật.' : descriptions[slug.split('/')[0]] || descriptions['ve-ipptech']);}
export const productHref=(slug:string)=>'/thuong-hieu/ubtech/'+slug+'/';
