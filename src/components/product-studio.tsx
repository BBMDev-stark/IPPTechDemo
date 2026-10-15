'use client';
import {useEffect,useRef,useState} from 'react';
import {ArrowUpRight,ChevronLeft,ChevronRight,Expand,X} from 'lucide-react';
import type {GalleryPhoto} from './media-gallery';

export function ProductStudio({photos,name}:{photos:GalleryPhoto[];name:string}){
 const [active,setActive]=useState(0),[open,setOpen]=useState(false);
 const dialog=useRef<HTMLDialogElement>(null),opener=useRef<HTMLButtonElement>(null);
 const photo=photos[active];
 useEffect(()=>{if(open){dialog.current?.showModal();const before=document.body.style.overflow;document.body.style.overflow='hidden';return()=>{document.body.style.overflow=before}}else if(dialog.current?.open){dialog.current.close();opener.current?.focus()}},[open]);
 const move=(direction:number)=>setActive(i=>(i+direction+photos.length)%photos.length);
 return <div className="product-studio"><div className="studio-stage"><button ref={opener} className="studio-enlarge" onClick={()=>setOpen(true)} aria-label={'Phóng to '+name}><img src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} fetchPriority="high"/><span><Expand size={18}/> Xem ảnh lớn</span></button><span className="studio-count" aria-live="polite">{String(active+1).padStart(2,'0')} / {String(photos.length).padStart(2,'0')}</span></div><div className="studio-thumbnails" aria-label={'Chọn ảnh '+name}>{photos.map((p,i)=><button key={p.src} className={i===active?'selected':''} aria-pressed={i===active} aria-label={'Ảnh '+(i+1)+': '+p.caption} onClick={()=>setActive(i)}><img src={p.src} alt="" loading="lazy"/></button>)}</div><div className="studio-caption"><span>{photo.caption}</span><a href={photo.sourceUrl} target="_blank" rel="noopener noreferrer">{photo.sourceLabel}<ArrowUpRight size={12}/></a></div><dialog className="studio-dialog" ref={dialog} aria-label={'Ảnh '+name} onCancel={()=>setOpen(false)} onClick={e=>{if(e.target===e.currentTarget)setOpen(false)}} onKeyDown={e=>{if(e.key==='ArrowLeft')move(-1);if(e.key==='ArrowRight')move(1)}}>{open&&<><button className="studio-close" autoFocus aria-label="Đóng ảnh" onClick={()=>setOpen(false)}><X/></button><img src={photo.src} alt={photo.alt}/><div className="studio-dialog-bottom"><button aria-label="Ảnh trước" onClick={()=>move(-1)}><ChevronLeft/></button><p>{photo.caption}</p><button aria-label="Ảnh tiếp theo" onClick={()=>move(1)}><ChevronRight/></button></div></>}</dialog></div>;
}
