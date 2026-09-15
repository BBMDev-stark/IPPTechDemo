'use client';

import {useCallback,useEffect,useRef,useState} from 'react';
import {ArrowRight,Pause,Play,RotateCcw,Volume2,VolumeX} from 'lucide-react';
import {introConfig} from '@/lib/intro-config';
import type {createIntroArm} from '@/lib/intro-arm';

type Stage='logo'|'video'|'reveal'|'done';
const smooth=(v:number)=>{const x=Math.max(0,Math.min(1,v));return x*x*(3-2*x)};

function ArmFallback(){return <svg viewBox="0 0 1050 310" role="presentation"><defs><linearGradient id="arm-metal" x2="0" y2="1"><stop stopColor="#fff"/><stop offset=".38" stopColor="#e3eaf0"/><stop offset=".7" stopColor="#91a2af"/><stop offset="1" stopColor="#d9e2e8"/></linearGradient><linearGradient id="arm-dark" x2="0" y2="1"><stop stopColor="#596976"/><stop offset="1" stopColor="#0d1824"/></linearGradient></defs><g stroke="#708491" strokeWidth="2"><path d="M1030 71L604 87Q570 90 565 145L577 224L1040 250Z" fill="url(#arm-metal)"/><ellipse cx="585" cy="154" rx="70" ry="80" fill="url(#arm-dark)"/><ellipse cx="585" cy="154" rx="44" ry="53" fill="url(#arm-metal)"/><ellipse cx="585" cy="154" rx="23" ry="30" fill="#102337"/><path d="M542 100L281 86Q244 87 242 121L237 196Q242 221 271 224L548 218Q579 168 542 100Z" fill="url(#arm-metal)"/><path d="M311 111L501 119L518 164L306 159Z" fill="url(#arm-dark)"/><path d="M328 125L482 130" stroke="#0ecbfa" strokeWidth="5"/><rect x="208" y="115" width="46" height="80" rx="15" fill="url(#arm-dark)"/><rect x="118" y="96" width="105" height="114" rx="24" fill="url(#arm-metal)"/>{[0,1,2,3].map(i=><g key={i} transform={'translate(0 '+i*29+')'}><rect x="57" y="96" width="81" height="24" rx="10" fill="url(#arm-dark)"/><rect x="44" y="96" width="62" height="22" rx="8" fill="url(#arm-metal)"/><rect x="32" y="100" width="25" height="29" rx="9" fill="url(#arm-metal)"/></g>)}<path d="M190 196Q161 252 121 238L95 209Q99 194 112 199L132 214L147 193Z" fill="url(#arm-metal)"/><path d="M152 121H192" stroke="#0ecbfa" strokeWidth="4"/></g></svg>}

export function IntroExperience({children}:{children:React.ReactNode}){
 const [stage,setStage]=useState<Stage>('logo');
 const [mounted,setMounted]=useState(false),[muted,setMuted]=useState(true),[blocked,setBlocked]=useState(false),[failed,setFailed]=useState(false),[playing,setPlaying]=useState(false),[paused,setPaused]=useState(false),[webgl,setWebgl]=useState(false);
 const video=useRef<HTMLVideoElement>(null),gate=useRef<HTMLDivElement>(null),canvas=useRef<HTMLCanvasElement>(null),skip=useRef<HTMLButtonElement>(null),progress=useRef<HTMLDivElement>(null);
 const engine=useRef<ReturnType<typeof createIntroArm>|null>(null),stageRef=useRef<Stage>('logo');
 const reduced=useRef(false);
 const active=stage!=='done';
 const finish=useCallback(()=>{stageRef.current='done';setStage('done')},[]);
 const reveal=useCallback(()=>{
   if(stageRef.current==='reveal'||stageRef.current==='done')return;
   video.current?.pause();stageRef.current='reveal';setStage('reveal');
 },[]);
 useEffect(()=>{setMounted(true);reduced.current=matchMedia('(prefers-reduced-motion: reduce)').matches;
   const replay=()=>{if(stageRef.current!=='done')return;stageRef.current='logo';setMuted(true);setPlaying(false);setPaused(false);setBlocked(false);setFailed(false);setStage('logo')};
   window.addEventListener('ipptech:replay-intro',replay);return()=>window.removeEventListener('ipptech:replay-intro',replay);
 },[]);
 useEffect(()=>{
   if(!active)return;
   const bodyOverflow=document.body.style.overflow,htmlOverflow=document.documentElement.style.overflow;
   const previous=document.activeElement as HTMLElement|null;
   document.body.style.overflow='hidden';document.documentElement.style.overflow='hidden';
   skip.current?.focus({preventScroll:true});
   const key=(e:KeyboardEvent)=>{if(e.key==='Escape'){e.preventDefault();reveal()}
     if(e.key==='Tab'){const buttons=Array.from(gate.current?.querySelectorAll<HTMLButtonElement>('button:not([disabled])')||[]).filter(b=>b.getClientRects().length);const first=buttons[0],last=buttons.at(-1);if(!first){e.preventDefault();return}if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}
   };document.addEventListener('keydown',key);
   return()=>{document.body.style.overflow=bodyOverflow;document.documentElement.style.overflow=htmlOverflow;document.removeEventListener('keydown',key);if(previous&&previous!==document.body&&previous.isConnected)previous.focus({preventScroll:true});else{const main=document.getElementById('main');main?.setAttribute('tabindex','-1');main?.focus({preventScroll:true});}};
 },[active,reveal]);
 useEffect(()=>{if(stage!=='logo')return;const timer=setTimeout(()=>{stageRef.current='video';setStage('video')},reduced.current?300:introConfig.logoDurationMs);return()=>clearTimeout(timer)},[stage]);
 useEffect(()=>{
   if(stage!=='video')return;let cancelled=false;
   video.current?.play().catch(()=>{if(!cancelled)setBlocked(true)});
   const timer=setTimeout(()=>{if(!cancelled&&video.current?.readyState===0)setFailed(true)},12000);
   return()=>{cancelled=true;clearTimeout(timer)};
 },[stage]);
 useEffect(()=>{
   if(!active||reduced.current)return;let disposed=false;setWebgl(false);
   import('@/lib/intro-arm').then(({createIntroArm})=>{
     if(disposed||!canvas.current)return;
     try{engine.current=createIntroArm(canvas.current);engine.current.render(0,0,0);setWebgl(true)}catch{setWebgl(false)}
   }).catch(()=>setWebgl(false));
   return()=>{disposed=true;engine.current?.dispose();engine.current=null};
 },[active]);
 useEffect(()=>{
   if(stage!=='reveal')return;
   let frame=0;const start=performance.now();
   const reachMs=introConfig.reachDurationMs,gripMs=introConfig.gripDurationMs,pullMs=introConfig.pullDurationMs;
   const duration=reduced.current?400:reachMs+gripMs+pullMs;
   const tick=(now:number)=>{
     const elapsed=now-start;
     const reach=smooth(elapsed/reachMs),grip=smooth((elapsed-reachMs)/gripMs);
     const pull=reduced.current?0:smooth((elapsed-reachMs-gripMs)/pullMs);
     const edge=pull*(window.innerWidth+30);
     gate.current?.style.setProperty('--curtain-x',edge+'px');
     gate.current?.style.setProperty('--grip',String(grip));
     if(reduced.current)gate.current?.style.setProperty('opacity',String(1-smooth(elapsed/duration)));
     else{
       gate.current?.style.setProperty('--fallback-x',(edge+(1-reach)*(window.innerWidth+300)-30)+'px');
       engine.current?.render(edge,reach,grip);
     }
     if(elapsed>=duration){finish();return}frame=requestAnimationFrame(tick);
   };
   frame=requestAnimationFrame(tick);
   // Background tabs or disabled animation cannot leave the website permanently covered.
   const watchdog=setTimeout(finish,duration+900);
   return()=>{cancelAnimationFrame(frame);clearTimeout(watchdog)};
 },[stage,finish]);
 const retry=()=>{setBlocked(false);setFailed(false);const el=video.current;if(el){if(el.error)el.load();el.play().catch(()=>setBlocked(true))}};
 return <><div className="intro-site" inert={mounted&&active} aria-hidden={mounted&&active?true:undefined}>{children}</div>{active&&<div ref={gate} className={'intro-gate stage-'+stage} role="dialog" aria-modal="true" aria-label="Giới thiệu IPPTech" data-stage={stage}>
   <div className="intro-curtain">
     <div className="intro-film"><video ref={video} src={introConfig.video} poster={introConfig.poster} muted={muted} playsInline preload="auto" disablePictureInPicture controlsList="nodownload noplaybackrate" onEnded={reveal} onPause={()=>setPaused(true)} onPlaying={()=>{setPaused(false);setPlaying(true);setBlocked(false);setFailed(false)}} onError={()=>setFailed(true)} onTimeUpdate={()=>{const el=video.current;if(el&&progress.current&&Number.isFinite(el.duration))progress.current.style.transform='scaleX('+el.currentTime/el.duration+')'}} aria-label="Video giới thiệu robot UBTECH"/><div className="intro-vignette"/></div>
     <div className="intro-chrome"><div className="intro-signature"><span className="intro-monogram">ipp<span>TECH</span></span><span className="intro-signature-line"/><span>TECHNOLOGY<br/>& EDUCATION</span></div><span className="intro-edition">A NEW WORLD OF POSSIBILITIES</span></div>
     <div className="intro-logo-stage"><div className="intro-halo halo-one"/><div className="intro-halo halo-two"/><div className="intro-axis axis-one"/><div className="intro-axis axis-two"/><div className="intro-logo-core"><span className="intro-kicker">IPPTECH PRESENTS</span><div className="intro-logo-window"><img src={introConfig.logo} alt="UBTECH"/><span className="intro-scan"/></div><div className="intro-logo-caption"><span/>INTELLIGENCE IN MOTION<span/></div><p>Technology. Education. Human possibility.</p></div><div className="intro-calibration"><span>01 / CONNECTING THE FUTURE</span><span>IPPG × UBTECH</span></div></div>
     {stage==='video'&&(blocked||failed)&&<div className="intro-play-prompt"><button onClick={retry}><Play size={22}/>{failed?'Thử phát lại video':'Phát video'}</button><p role="status">{failed?'Video chưa tải được. Bạn có thể thử lại hoặc bỏ qua.':'Chạm để bắt đầu trải nghiệm.'}</p></div>}
     <div className="intro-bottom"><div className="intro-caption"><span className="intro-live-dot"/><span>{stage==='logo'?'KHỞI TẠO TRẢI NGHIỆM':stage==='reveal'?'CHÀO MỪNG ĐẾN IPPTECH':paused?'VIDEO ĐÃ TẠM DỪNG':playing?'UBTECH / ROBOTICS IN MOTION':'ĐANG CHUẨN BỊ VIDEO'}</span></div><div className="intro-actions">{stage==='video'&&<button className="intro-playback" disabled={!playing||blocked||failed} onClick={()=>{const el=video.current;if(!el)return;if(el.paused)retry();else el.pause()}}>{paused?<Play size={17}/>:<Pause size={17}/>}<span>{paused?'Tiếp tục':'Tạm dừng'}</span></button>}{stage==='video'&&<button className="intro-sound" aria-label={muted?'Bật âm thanh':'Tắt âm thanh'} onClick={()=>setMuted(!muted)}>{muted?<VolumeX size={18}/>:<Volume2 size={18}/>}</button>}<button ref={skip} className="intro-skip" onClick={reveal} disabled={stage==='reveal'}>Bỏ qua <ArrowRight size={17}/></button></div></div>
     <div className="intro-progress"><div ref={progress}/></div><div className="intro-grab-edge"/>
   </div>
   <canvas ref={canvas} className={'intro-arm-canvas '+(webgl?'is-ready':'')} aria-hidden="true"/>
   {!webgl&&<div className="intro-arm-fallback" aria-hidden="true"><ArmFallback/></div>}
 </div>}<noscript><style>{'.intro-gate{display:none!important}html,body{overflow:auto!important}'}</style></noscript></>;
}

export function ReplayIntro(){return <button className="intro-replay" onClick={()=>window.dispatchEvent(new Event('ipptech:replay-intro'))}><RotateCcw size={14}/> Xem lại intro</button>}


