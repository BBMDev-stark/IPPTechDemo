import {articles} from './articles';
import originalPages from './source-pages.json';
export const nav = [['Về IPPTech','ve-ipptech'],['Thương hiệu & Sản phẩm','thuong-hieu'],['Giải pháp','giai-phap'],['Dự án & Đối tác','du-an-doi-tac'],['Tài nguyên','tai-nguyen'],['Tin tức & Sự kiện','tin-tuc'],['Liên hệ','lien-he']];
export const pages = [...originalPages,{slug:'nang-luc',title:'Năng lực triển khai'}];
export { catalog as products } from './catalog';
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
const titleOverrides:Record<string,string>={'thuong-hieu/brand-02':'Thương hiệu tiếp theo 02','thuong-hieu/brand-03':'Thương hiệu tiếp theo 03','giai-phap/giao-duc':'Giải pháp cho trường học & cơ sở giáo dục','giai-phap/doanh-nghiep':'Doanh nghiệp & Dịch vụ công'};
export function titleFor(slug:string){return titleOverrides[slug] || nav.find(n=>n[1]===slug)?.[0] || pages.find(p=>p.slug===slug)?.title || (slug.endsWith('walker-x')?'Walker X':'IPPTech');}
export function descriptionFor(slug:string){return articles[slug]?.paragraphs[0] || descriptions[slug] || (slug.startsWith('thuong-hieu/ubtech/') ? 'Khám phá sản phẩm và ứng dụng trong hệ sinh thái UBTECH. Đội ngũ IPPTech đồng hành lựa chọn cấu hình, tư vấn triển khai và hỗ trợ kỹ thuật.' : descriptions[slug.split('/')[0]] || descriptions['ve-ipptech']);}
export const productHref=(slug:string)=>'/thuong-hieu/ubtech/'+slug+'/';


