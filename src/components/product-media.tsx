import media from '@/lib/product-media.json';
import {MediaGallery} from './media-gallery';
export function ProductMedia({slug}:{slug:string}){
 const photos=media.filter(p=>p.productSlug===slug);
 if(!photos.length)return null;
 return <section className="container product-media-section" aria-label="Hình ảnh chi tiết sản phẩm"><span className="eyebrow">CẬN CẢNH THIẾT BỊ</span><h2>Khám phá qua hình ảnh</h2><MediaGallery photos={photos} filters={false}/></section>;
}
