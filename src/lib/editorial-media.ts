import newMedia from './editorial-assets.json';
import productMedia from './product-media.json';
import {socialAssets,robogGallery,commercialGallery} from './social-assets';
import {catalog,type Product} from './catalog';
import {projectData} from './projects';
import type {GalleryPhoto} from '@/components/media-gallery';

type EditorialPhoto=GalleryPhoto&{id?:string;topics?:string[];tags?:string[];topic?:string;productSlug?:string};
const fresh=newMedia as EditorialPhoto[];
const topics=(...keys:string[])=>fresh.filter(p=>keys.some(k=>p.topics?.includes(k)||p.tags?.includes(k)||p.topic===k||p.id?.includes(k)));
const product=(...keys:string[])=>productMedia.filter(p=>keys.includes(p.productSlug));
const unique=(photos:GalleryPhoto[])=>photos.filter((p,i)=>photos.findIndex(x=>x.src===p.src)===i);
const projectPhotos=projectData.map(p=>({src:p.image,alt:p.title,caption:p.title+' · '+p.date,sourceLabel:'IPPG',sourceUrl:p.source,category:'Hệ sinh thái IPPG'}));

export function productPhotos(p:Product):GalleryPhoto[]{
 const source={src:p.image,alt:p.imageNote||p.name+' — UBTECH',caption:p.imageNote||p.name+' — ảnh thiết bị từ UBTECH',sourceUrl:p.source,sourceLabel:p.sourceName,category:'Sản phẩm'};
 const found=unique([...product(p.slug),...topics(p.slug),source]);
 if(p.slug==='yanshee')return unique([found.find(x=>x.src.includes('coding'))||source,...found]);
 return unique([source,...found]);
}

export function pagePhotos(slug:string):GalleryPhoto[]{
 const key=slug.split('/').at(-1)!;
 const byId=(...ids:string[])=>ids.flatMap(id=>fresh.filter(p=>p.id===id));
 const edu=byId('education-case-3','ai-lab','lab-overview','education-case-2');
 const training=byId('training-workshop','education-case-2','training-online','teacher-program');
 const aic=byId('aic-exhibition','aic-classroom','aic-robots'),fpt=topics('fpt'),ugot=byId('ugot-learning','ucode-screen','python-screen');
 const lookup:Record<string,GalleryPhoto[]>={
  've-ipptech':[...aic,...edu,...training,socialAssets.robogProgramming,...projectPhotos],
  'gioi-thieu':[...edu,...aic,...training,socialAssets.robogProgramming],
  'ipp-group':[...projectPhotos,...aic,...fpt],
  'nang-luc':[...training,...aic,...product('ugot-full-kit'),...edu],
  'phan-phoi':[...product('ugot-full-kit','ukit-ai'),...ugot],
  'trien-khai':[...aic,...edu,...product('ugot-full-kit')],
  'bao-hanh':[...product('yanshee','ukit-ai')],
  'dao-tao':[...training,...edu,...product('yanshee')],
  'doi-ngu':[...aic],
  'tuyen-dung':[...aic],
  'thuong-hieu':[...edu,...product('cruzr'),...ugot],
  'ubtech':[...edu,...product('cruzr','yanshee'),...ugot],
  'giao-duc':[...edu,...ugot,...training,socialAssets.robogProgramming],
  'cong-nghe':[...product('cruzr'),...commercialGallery],
  'giai-phap':[...edu,...product('cruzr'),...training],
  'giao-duc-cong-lap':[...edu,...aic,...training,...ugot],
  'phong-thuc-hanh-stem':[...byId('ai-lab','lab-overview','aic-classroom','education-case-3'),...product('ugot-full-kit'),...byId('ucode-screen')],
  'cau-hinh-theo-cap-hoc':[...edu,...topics('zoo','engineer'),...product('ugot-full-kit','yanshee')],
  'de-an-cap-tinh':[...aic,...edu,...training],
  'tap-huan-giao-vien':[...training,...edu,...product('ugot-full-kit')],
  'truong-tu-trung-tam':[...edu,...topics('ai-lab'),...ugot,...training],
  'doanh-nghiep':[...product('cruzr'),...commercialGallery],
  'ngan-hang-ban-le':[...product('cruzr').filter(p=>p.src.includes('scenarios')),...product('cruzr').filter(p=>p.src.includes('greeting'))],
  'bat-dong-san-showroom':[...product('cruzr').filter(p=>p.src.includes('greeting')),...product('cruzr').filter(p=>p.src.includes('scenarios'))],
  'hanh-chinh-cong-y-te':[],
  'du-lich-bao-tang':[socialAssets.cruzrMuseum,...product('cruzr').filter(p=>p.src.includes('guidance')),socialAssets.cruzrAirport],
  'su-kien-truyen-thong':[socialAssets.robogPodium,...product('cruzr'),socialAssets.robogAwards],
  'cuoc-thi-robotics':[socialAssets.robogArena,socialAssets.robogProgramming,socialAssets.robogTeam,socialAssets.robogAwards,...topics('competition')],
  'du-an-doi-tac':[...projectPhotos,...aic,...fpt],
  'du-an-tieu-bieu':[...projectPhotos,...aic,...fpt],
  'trung-tam-ai-dhqg-tphcm':[...aic,projectPhotos[0]],
  'fpt-schools-ai-robotics':[projectPhotos[1],...fpt],
  'con-so':[...aic,...training],
  'doi-tac-thuong-hieu':[...product('ugot-full-kit','cruzr')],
  'mang-luoi-dai-ly':[...product('cruzr','ugot-full-kit')],
  'hop-tac':[...edu,...product('cruzr')],
  'tai-nguyen':[...product('yanshee','ukit-ai'),...edu],
  'ho-so-nang-luc':[...product('ugot-full-kit')],
  'ho-tro':[...product('yanshee').filter(p=>p.src.includes('hardware')),...product('ukit-ai')],
  'tin-tuc':[socialAssets.robogArena,...projectPhotos],
  'tin-cong-ty':[projectPhotos[1],...fpt],
  'su-kien':[...robogGallery,...topics('competition')],
  'bao-chi':[...projectPhotos,...product('yanshee')],
  'thu-vien':[...robogGallery,...fresh,...commercialGallery,...projectPhotos],
  'lien-he':[...product('yanshee')],
  'dang-ky-trai-nghiem':[...product('cruzr'),...ugot],
  'dang-ky-dai-ly':[...product('ugot-full-kit','cruzr')],
  'yeu-cau-bao-gia':[...product('ugot-full-kit')],
 };
 if(key==='hanh-chinh-cong-y-te'){const p=catalog.find(p=>p.slug==='cruzr')!;return [{src:p.image,alt:p.imageNote!,caption:'Cruzr 1S — ảnh thiết bị tham khảo, không phải ảnh triển khai tại cơ sở y tế.',sourceUrl:p.source,sourceLabel:'UBTECH',category:'Sản phẩm'}]}
 return unique(lookup[slug]||lookup[key]||[]);
}
