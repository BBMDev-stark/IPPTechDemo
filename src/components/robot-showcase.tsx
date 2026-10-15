'use client';

import {useEffect,useRef,useState} from 'react';
import {ArrowUpRight,ChevronLeft,ChevronRight,Expand,ScanLine,X} from 'lucide-react';
import {socialAssets} from '@/lib/social-assets';

const photos=[socialAssets.robogProgramming,socialAssets.robogArena,socialAssets.robogAwards,socialAssets.robogTeam];
const labels=['Lập trình & sáng tạo','Thử thách robotics','Công nghệ kết nối','Cùng nhau khám phá'];
const codes=['CREATIVE LEARNING','ROBOTICS IN ACTION','CONNECTED FUTURE','NEXT GENERATION'];

export function RobotShowcase(){
 const [open,setOpen]=useState(false),[pinned,setPinned]=useState(false),[selected,setSelected]=useState<number|null>(null);
 const dialog=useRef<HTMLDialogElement>(null),lastPhoto=useRef<HTMLButtonElement|null>(null),robot=useRef<HTMLButtonElement>(null);
 const [eye,setEye]=useState({x:374,y:110});
 useEffect(()=>{
  const button=robot.current,stage=button?.closest<HTMLElement>('.robot-stage');
  if(!button||!stage)return;
  function locateEye(){
   if(!button||!stage)return;
   // Anchor to the front eye visor in the actual, object-fit:contain product image.
   const width=button.offsetWidth,height=button.offsetHeight;
   const imageWidth=Math.min(width,height*763/860),imageHeight=imageWidth*860/763;
   const x=(width-imageWidth)/2+imageWidth*.38,y=(height-imageHeight)/2+imageHeight*.14;
   button.style.setProperty('--eye-local-x',`${x}px`);
   button.style.setProperty('--eye-local-y',`${y}px`);
   setEye({x:(button.offsetLeft+x)/stage.clientWidth*800,y:(button.offsetTop+y)/stage.clientHeight*620});
  }
  const observer=new ResizeObserver(locateEye);
  observer.observe(stage);observer.observe(button);locateEye();
  return()=>observer.disconnect();
 },[]);
 const active=selected===null?null:photos[selected];
 useEffect(()=>{
  if(selected===null)return;
  dialog.current?.showModal();
  const previous=document.body.style.overflow;document.body.style.overflow='hidden';
  return()=>{document.body.style.overflow=previous};
 },[selected]);
 function closePhoto(){dialog.current?.close();setSelected(null);setOpen(true);lastPhoto.current?.focus()}
 function move(by:number){setSelected(i=>i===null?null:(i+by+photos.length)%photos.length)}
 return <div className="robot-experience">
  <div className="robot-stage-heading"><span><i/> GIÁO DỤC · AI · ROBOTICS</span><span>UBTECH / YANSHEE</span></div>
  <div className={'robot-stage '+(open?'is-expanded':'')} onPointerMove={e=>{if(e.pointerType!=='mouse')return;const r=e.currentTarget.getBoundingClientRect();e.currentTarget.style.setProperty('--mx',`${(e.clientX-r.left)/r.width-.5}`);e.currentTarget.style.setProperty('--my',`${(e.clientY-r.top)/r.height-.5}`)}} onPointerLeave={e=>{e.currentTarget.style.setProperty('--mx','0');e.currentTarget.style.setProperty('--my','0');if(!pinned&&selected===null)setOpen(false)}} onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget)&&!pinned&&selected===null)setOpen(false)}} onKeyDown={e=>{if(e.key==='Escape'&&selected===null){setOpen(false);setPinned(false);robot.current?.focus()}}}>
   <div className="robot-grid" aria-hidden="true"/>
   <div className="holo-coordinate" aria-hidden="true">AI / ROBOTICS<br/>EXPLORE THE POSSIBILITIES</div>
   <div className="robot-orbit orbit-a" aria-hidden="true"/><div className="robot-orbit orbit-b" aria-hidden="true"/>
   <div className="holo-reticle" aria-hidden="true"><span/><span/><span/></div>
   <div className="holo-world">
    <svg className="robot-beams" viewBox="0 0 800 620" preserveAspectRatio="none" aria-hidden="true"><defs><radialGradient id="ipp-projection"><stop stopColor="#b8ffff" stopOpacity=".5"/><stop offset="1" stopColor="#48e8ff" stopOpacity="0"/></radialGradient></defs><path className="beam-volume" d={`M${eye.x} ${eye.y} L15 60 L260 60 Z M${eye.x} ${eye.y} L560 100 L790 100 Z M${eye.x} ${eye.y} L15 450 L255 540 Z M${eye.x} ${eye.y} L560 390 L790 510 Z`} fill="url(#ipp-projection)"/><g className="beam-traces"><path d={`M${eye.x} ${eye.y} L305 185 H235 M${eye.x} ${eye.y} L510 195 H570 M${eye.x} ${eye.y} L290 445 H240 M${eye.x} ${eye.y} L530 450 H575`}/><circle cx="305" cy="185" r="3"/><circle cx="510" cy="195" r="3"/><circle cx="290" cy="445" r="3"/><circle cx="530" cy="450" r="3"/></g></svg>
    <button ref={robot} type="button" className="robot-activate" aria-expanded={open} aria-controls="robot-technology-panel" aria-label={open?'Ghim hoặc thu gọn hologram Yanshee':'Khám phá hologram Yanshee'} onPointerEnter={e=>{if(e.pointerType==='mouse')setOpen(true)}} onClick={()=>{setPinned(!pinned);setOpen(!pinned)}}>
     <img src="/images/ubtech-yanshee-img-1.png" alt="Robot giáo dục Yanshee của UBTECH" width="763" height="860" fetchPriority="high"/>
     <span className="robot-scan" aria-hidden="true"/><span className="robot-hotspot" aria-hidden="true"/>
    </button>
    <div className="holo-emitter" style={{left:`${eye.x/8}%`,top:`${eye.y/6.2}%`}} aria-hidden="true"/>
    <section id="robot-technology-panel" className="technology-panel" inert={!open} aria-hidden={!open} aria-label="Bốn khung ảnh hologram">
     {photos.map((photo,i)=><button key={photo.src} type="button" className={`holo-card holo-card-${i+1}`} aria-label={'Phóng to ảnh: '+photo.alt} onClick={e=>{lastPhoto.current=e.currentTarget;setSelected(i)}}>
      <span className="holo-card-top"><span>0{i+1} / {codes[i]}</span><i/></span>
      <span className="holo-image"><img src={photo.src} alt={photo.alt} width={photo.width} height={photo.height}/><span className="holo-crosshair" aria-hidden="true"/></span>
      <span className="holo-card-caption"><b>{labels[i]}</b><Expand size={14}/></span>
      <span className="holo-card-data" aria-hidden="true"><span>UBTECH EDUCATION</span><span>ROBOG 2026</span></span>
     </button>)}
    </section>
   </div>
   <div className="robot-platform" aria-hidden="true"><i/><i/></div>
   <div className="robot-identity"><span>UBTECH ROBOTICS</span><strong>Yanshee</strong><span>Nền tảng mở cho khám phá AI</span></div>
   <div className="holo-status" aria-live="polite"><i/>{open?'Chọn một khung ảnh để xem lớn':'Rê chuột vào robot để mở không gian ảnh'}</div>
  </div>
  <div className="robot-stage-footer"><button type="button" aria-expanded={open} aria-controls="robot-technology-panel" onClick={()=>{setOpen(!open);setPinned(!open)}}><ScanLine size={17}/>{open?'Thu gọn hologram':'Chạm để khám phá hologram'}<span>04 ẢNH</span></button><a href="/thuong-hieu/ubtech/yanshee/">Tìm hiểu Yanshee <ArrowUpRight size={16}/></a></div>
  <dialog ref={dialog} className="photo-dialog robot-photo-dialog" aria-label="Ảnh hoạt động công nghệ" onCancel={e=>{e.preventDefault();closePhoto()}} onClick={e=>{if(e.target===e.currentTarget)closePhoto()}} onKeyDown={e=>{if(e.key==='ArrowLeft'){e.preventDefault();move(-1)}if(e.key==='ArrowRight'){e.preventDefault();move(1)}}}>
   {active&&<><button className="photo-close" aria-label="Đóng ảnh" autoFocus onClick={closePhoto}><X/></button><img src={active.src} alt={active.alt}/><div className="photo-dialog-caption"><button aria-label="Ảnh trước" onClick={()=>move(-1)}><ChevronLeft/></button><div><p>{active.caption}</p><a href={active.sourceUrl} target="_blank" rel="noopener noreferrer">{active.sourceLabel} ↗</a><small>{selected!+1} / {photos.length}</small></div><button aria-label="Ảnh tiếp theo" onClick={()=>move(1)}><ChevronRight/></button></div></>}
  </dialog>
 </div>;
}
