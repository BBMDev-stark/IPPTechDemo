'use client';

import Link from 'next/link';
import {useEffect,useState,useRef,useCallback,Suspense,type RefObject} from 'react';
import {useSearchParams} from 'next/navigation';
import {ArrowUpRight,Check,Search,SlidersHorizontal} from 'lucide-react';
import {projectData} from '@/lib/projects';
import {submitInquiry} from '@/lib/submit-inquiry';
import {pages} from '@/lib/content';

export type InquiryKind='quote'|'demo'|'dealer'|'support'|'partner'|'resources';
const formTitles:Record<InquiryKind,string>={quote:'Thông tin cần cho báo giá',demo:'Đặt lịch trải nghiệm robot',dealer:'Thông tin đăng ký đại lý',support:'Yêu cầu hỗ trợ hoặc bảo hành',partner:'Đề xuất hợp tác',resources:'Yêu cầu tài liệu'};
const formNotices:Record<InquiryKind,string>={
 quote:'Chia sẻ nhu cầu để IPPTech trao đổi cấu hình, hồ sơ và báo giá phù hợp. Gửi biểu mẫu chưa phải xác nhận đặt hàng.',
 demo:'Chọn robot, địa điểm và thời gian mong muốn. Lịch trải nghiệm sẽ được xác nhận riêng sau khi tiếp nhận.',
 dealer:'Giới thiệu doanh nghiệp và khu vực hoạt động. Điều kiện hợp tác sẽ được trao đổi riêng sau khi tiếp nhận.',
 support:'Cung cấp thông tin thiết bị và tình trạng gặp phải để tiếp nhận hỗ trợ. Phạm vi bảo hành được xác nhận sau khi đối chiếu hồ sơ.',
 partner:'Chọn hướng hợp tác và chia sẻ đề xuất. IPPTech sẽ trao đổi phạm vi, đầu việc và các bước tiếp theo khi tiếp nhận.',
 resources:'Nêu tài liệu cần nhận và mục đích sử dụng. Phiên bản và phạm vi cung cấp được xác nhận sau khi tiếp nhận.'
};

function Field({label,name,required=true,type='text',placeholder,autoComplete}:{label:string;name:string;required?:boolean;type?:string;placeholder?:string;autoComplete?:string}){
 return <label>{label}{required?' *':''}<input name={name} type={type} required={required} placeholder={placeholder} autoComplete={autoComplete} {...(type==='tel'?{pattern:'[+0-9\\s\\(\\)\\-]{8,20}',title:'Nhập số điện thoại từ 8 đến 20 ký tự.'}:{})}/></label>;
}
function Select({label,name,options,onChange}:{label:string;name:string;options:string[];onChange?:(value:string)=>void}){
 return <label htmlFor={name}>{label} *<select id={name} aria-label={label+' *'} name={name} required defaultValue="" onChange={e=>onChange?.(e.target.value)}><option value="">Vui lòng chọn</option>{options.map(o=><option key={o}>{o}</option>)}</select></label>;
}
function FormPrefill({formRef,onPrefill,onExperience}:{formRef:RefObject<HTMLFormElement|null>;onPrefill:()=>void;onExperience:(value:string)=>void}){
 const query=useSearchParams();
 useEffect(()=>{for(const [key,name] of [['san-pham','product_interest'],['tai-lieu','resource_interest'],['cap-hoc','level_or_industry'],['hinh-thuc','experience_type'],['hop-tac','partnership_type']]){const value=query.get(key),input=formRef.current?.elements.namedItem(name);if(!value)continue;if(input instanceof HTMLInputElement){input.value=value.slice(0,500);onPrefill()}else if(input instanceof HTMLSelectElement&&Array.from(input.options).some(o=>o.value===value)){input.value=value;if(name==='experience_type')onExperience(value);onPrefill()}}},[query,formRef,onPrefill,onExperience]);
 return null;
}
export function BriefForm({kind}:{kind:InquiryKind}){
 const[receipt,setReceipt]=useState(''),[busy,setBusy]=useState(false),[submitError,setSubmitError]=useState('');const requestId=useRef('');
 const[experience,setExperience]=useState(''),[fileError,setFileError]=useState('');
 const[today,setToday]=useState('');
 const formRef=useRef<HTMLFormElement>(null);
 const clearResult=useCallback(()=>{setReceipt('');setSubmitError('');requestId.current=''},[]);
 useEffect(()=>{const now=new Date();setToday(`${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`)},[]);
 const event=experience==='Tại sự kiện';
 return <form className="inquiry-form brief-form" id="request-form" ref={formRef} onChange={()=>{setReceipt('');setSubmitError('');requestId.current=''}} onSubmit={async e=>{e.preventDefault();if(fileError||busy)return;const form=e.currentTarget;setBusy(true);setSubmitError('');requestId.current ||= crypto.randomUUID();try{const result=await submitInquiry(form,kind,requestId.current);setReceipt(result.reference)}catch(error){setSubmitError(error instanceof Error?error.message:'Chưa thể gửi yêu cầu.')}finally{setBusy(false)}}}>
  <Suspense fallback={null}><FormPrefill formRef={formRef} onPrefill={clearResult} onExperience={setExperience}/></Suspense>
  <header className="form-context"><span className="eyebrow">KẾT NỐI VỚI IPPTECH</span><h2>{formTitles[kind]}</h2>
  <p className="form-intro">Các trường có dấu * là bắt buộc.</p>
  <p className="form-note" id={`form-status-${kind}`}>{formNotices[kind]}</p></header>
  <fieldset className="form-group"><legend>01 · Thông tin liên hệ</legend><div className="form-grid">
   <Field label={kind==='dealer'?'Tên công ty':'Tên đơn vị'} name="organization" autoComplete="organization"/>
   <Field label="Họ và tên người liên hệ" name="full_name" autoComplete="name"/>
   <Field label="Email" name="email" type="email" autoComplete="email"/>
   {kind!=='resources'&&<Field label="Số điện thoại" name="phone" type="tel" autoComplete="tel"/>}
  </div></fieldset><fieldset className="form-group"><legend>02 · Nhu cầu của quý đơn vị</legend><div className="form-grid">
   {kind==='quote'&&<>
    <Select label="Loại đơn vị" name="organization_type" options={['Trường học','Phòng/Sở GD&ĐT','Nhà thầu','Doanh nghiệp','Cơ quan quản lý giáo dục khác']}/>
    <Field label="Cấp học hoặc ngành" name="level_or_industry" placeholder="Tiểu học, THCS, THPT, ngân hàng…"/>
    <Field label="Sản phẩm quan tâm" name="product_interest" placeholder="Tên sản phẩm hoặc Cần tư vấn"/>
    <Field label="Quy mô dự kiến" name="scale" placeholder="Số phòng, số lớp, sĩ số hoặc số robot"/>
    <Field label="Mốc thời gian dự kiến" name="timeline" placeholder="Tháng/năm hoặc hạn cần nhận báo giá"/>
    <Field label="Chức vụ" name="job_title" required={false} autoComplete="organization-title"/>
    <Field label="Địa điểm triển khai" name="deployment_location" required={false}/>
    <Field label="Diện tích phòng (nếu có)" name="room_area" required={false}/>
   </>}
   {kind==='demo'&&<>
    <Select label="Hình thức trải nghiệm" name="experience_type" options={['Tại văn phòng IPPTech','Tại đơn vị','Tại sự kiện']} onChange={setExperience}/>
    <Select label="Robot muốn trải nghiệm" name="product_interest" options={['Cruzr','U1','Yanshee','Học cụ giáo dục','Cần tư vấn lựa chọn']}/>
    <label>{event?'Ngày sự kiện':'Ngày mong muốn'} *<input name="preferred_date" type="date" required min={today}/></label>
    <label>{event?'Số khách dự kiến':'Số người tham dự'} *<input name="attendees" type="number" min="1" step="1" required/></label>
    {experience&&experience!=='Tại văn phòng IPPTech'&&<Field label="Địa điểm" name="venue"/>}
    {event&&<Select label="Hình thức sử dụng robot" name="event_format" options={['Đón khách','Trình diễn','Tương tác cùng MC','Chụp ảnh thương hiệu','Cần tư vấn kịch bản']}/>}
   </>}
   {kind==='dealer'&&<>
    <Field label="Mã số doanh nghiệp" name="registration_number"/>
    <Field label="Khu vực hoạt động" name="service_area"/>
    <Field label="Kinh nghiệm trong ngành thiết bị giáo dục" name="experience" placeholder="Lĩnh vực, số năm hoặc dự án tương tự"/>
    <Select label="Nhóm khách hàng hiện có" name="customer_group" options={['Trường học','Cơ quan quản lý giáo dục','Doanh nghiệp','Nhiều nhóm khách hàng']}/>
   </>}
   {kind==='support'&&<>
    <Field label="Tên sản phẩm và phiên bản" name="product_version"/>
    <Field label="Số serial" name="serial_number"/>
    <label>Ngày mua hoặc bàn giao *<input name="purchase_date" type="date" required max={today}/></label>
    <label>Ảnh/video minh họa (tối đa 3 tệp, tổng 20 MB)<input type="file" name="attachments" multiple accept="image/jpeg,image/png,image/webp,video/mp4,video/webm" aria-describedby="attachment-error" onChange={e=>{const tooLarge=Array.from(e.target.files||[]).reduce((total,f)=>total+f.size,0)>20*1024*1024||(e.target.files?.length||0)>3;setFileError(tooLarge?'Chọn tối đa 3 tệp, tổng dung lượng không quá 20 MB.':'');e.target.setCustomValidity(tooLarge?'Tối đa 3 tệp, tổng 20 MB.':'')}}/></label>
   </>}
   {kind==='partner'&&<>
    <Select label="Luồng hợp tác" name="partnership_type" options={['Thương hiệu đối tác','Đại lý / Nhà thầu','Trường học hợp tác']}/>
    <Field label="Lĩnh vực hoạt động" name="business_field"/>
    <Field label="Phạm vi địa lý" name="service_area"/>
    <Field label="Mốc thời gian mong muốn" name="timeline"/>
   </>}
   {kind==='resources'&&<Field label="Tài liệu cần nhận" name="resource_interest" required={false} placeholder="Hồ sơ năng lực, catalogue, bảng thông số…"/>}
   {kind==='resources'&&<Select label="Nhu cầu" name="resource_audience" options={['Giáo dục','Doanh nghiệp','Đại lý','Báo chí']}/>}
  </div></fieldset>
  {kind==='quote'&&<fieldset className="form-checklist"><legend>Hồ sơ pháp lý cần kèm theo</legend>{['Đăng ký doanh nghiệp','Thư ủy quyền','CO/CQ','Chính sách bảo hành'].map(x=><label key={x}><input type="checkbox" name="legal_documents" value={x}/>{x}</label>)}</fieldset>}
  {kind!=='resources'&&<label>{kind==='support'?'Mô tả lỗi *':kind==='partner'?'Nội dung đề xuất *':'Nhu cầu / ghi chú'}<textarea name="notes" required={kind==='support'||kind==='partner'} rows={5}/></label>}
  {fileError&&<p id="attachment-error" role="alert" className="form-error">{fileError}</p>}
  <label className="form-consent"><input type="checkbox" name="consent" value="yes" required/><span>Tôi đồng ý cung cấp thông tin để xử lý yêu cầu theo <Link href="/chinh-sach-bao-mat/">thông tin bảo mật</Link>.</span></label>
  <label className="form-honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off"/></label>
  {submitError&&<p role="alert" className="form-error" tabIndex={-1} ref={el=>{if(el)el.focus()}}>{submitError}</p>}
  <button className="button" type="submit" disabled={busy||!!receipt} aria-describedby={`form-status-${kind}`}>{busy?'Đang gửi…':'Gửi yêu cầu'} <ArrowUpRight size={18}/></button>
  {receipt&&<div className="form-success" role="status"><Check size={20}/><span>Đã ghi nhận yêu cầu tại hệ thống website. Mã của bạn: <strong>{receipt}</strong>. Vui lòng lưu mã này để đối chiếu. {formNotices[kind]}</span></div>}
 </form>;
}

function useFilters(defaults:Record<string,string>){
 const[filters,setFilters]=useState(defaults);
 useEffect(()=>{const sync=()=>{const params=new URLSearchParams(location.search);setFilters(previous=>Object.fromEntries(Object.keys(previous).map(k=>[k,params.get(k)||'all'])))};sync();window.addEventListener('popstate',sync);return()=>window.removeEventListener('popstate',sync)},[]);
 function change(key:string,value:string){setFilters(previous=>({...previous,[key]:value}));const url=new URL(location.href);if(value==='all')url.searchParams.delete(key);else url.searchParams.set(key,value);history.replaceState(null,'',url.pathname+url.search+url.hash)}
 return {filters,change};
}

export function BrandExplorer(){
 const{filters,change}=useFilters({'linh-vuc':'all'});
 const active=filters['linh-vuc'];
 return <><h2>Thương hiệu IPPTech phân phối</h2><div className="product-tabs">{[['all','Tất cả'],['giao-duc','Giáo dục'],['cong-nghe','Công nghệ']].map(([value,label])=><button key={value} aria-pressed={active===value} className={active===value?'active':''} onClick={()=>change('linh-vuc',value)}>{label}</button>)}</div><div className="brand-editorial"><Link className="brand-intro" href="/thuong-hieu/ubtech/"><img src="/images/refined/ubtech-logo.svg" alt="UBTECH Robotics"/><h3>UBTECH Robotics</h3><p>Giáo dục · Robot dịch vụ & Công nghệ</p><span className="text-link">Tìm hiểu thương hiệu <ArrowUpRight size={18}/></span></Link><div className="brand-categories">{[['giao-duc','Học cụ & robot giáo dục','/images/refined/ugot-components.webp','5 sản phẩm giáo dục AI & Robotics. Lắp ráp, lập trình và học qua dự án.'],['cong-nghe','Robot dịch vụ','/images/ubtech-cruzr-img-1.jpg','Robot lễ tân Cruzr và robot hình người U1. Đón tiếp, hướng dẫn và tương tác.']].filter(([key])=>active==='all'||active===key).map(([key,title,image,description])=><Link className="brand-category-row" href={'/thuong-hieu/ubtech/'+key+'/'} key={key}><div className="brand-category-image"><img src={image} alt={key==='giao-duc'?'UGOT — UBTECH':'Cruzr 1S — UBTECH'} loading="lazy"/></div><div><h3>{title}</h3><p>{description}</p><span className="text-link">Xem danh mục <ArrowUpRight size={17}/></span></div></Link>)}</div></div></>;
}

export function ProjectExplorer({filters:showFilters=true}:{filters?:boolean}){
 const{filters,change}=useFilters({'linh-vuc':'all','dia-phuong':'all','thuong-hieu':'all','nam':'all'});
 const results=projectData.filter(p=>(filters['linh-vuc']==='all'||filters['linh-vuc']==='giao-duc')&&(filters['dia-phuong']==='all'||p.location===filters['dia-phuong'])&&(filters['thuong-hieu']==='all'||p.brand===filters['thuong-hieu'])&&(filters.nam==='all'||p.year===filters.nam));
 const controls=[['linh-vuc','Lĩnh vực',[['giao-duc','Giáo dục']]],['dia-phuong','Địa phương',[['tphcm','TP.HCM'],['chua-cong-bo','Không nêu địa phương']]],['thuong-hieu','Thương hiệu',[['ubtech','UBTECH']]],['nam','Năm',[['2021','2021'],['2022','2022']]]] as const;
 return <>{showFilters&&<><h2>Dự án có nguồn công bố</h2><details className="project-filter-panel"><summary><SlidersHorizontal size={17}/><span>Lọc theo lĩnh vực, địa phương, thương hiệu và năm</span><small>{Object.values(filters).some(value=>value!=='all')?'Đang áp dụng bộ lọc':'Mở bộ lọc'}</small></summary><div className="brief-filters">{controls.map(([key,label,options])=><label key={key}>{label}<select value={filters[key]} onChange={e=>change(key,e.target.value)}><option value="all">Tất cả</option>{options.map(([value,label])=><option value={value} key={value}>{label}</option>)}</select></label>)}</div></details><p className="filter-result" role="status">{results.length} dự án trong hệ sinh thái IPPG</p></>}<div className="project-stories">{(showFilters?results:projectData).map(p=><article className="project-story" key={p.slug}><Link className="project-story-image" href={`/du-an-doi-tac/du-an-tieu-bieu/${p.slug}/`}><img src={p.image} alt={p.title+' — tư liệu IPPG'} loading="lazy"/></Link><div className="project-story-copy"><span className="project-story-date">{p.date} · GIÁO DỤC</span><h3><Link href={`/du-an-doi-tac/du-an-tieu-bieu/${p.slug}/`}>{p.title}</Link></h3><p>{p.text}</p><Link className="text-link" href={`/du-an-doi-tac/du-an-tieu-bieu/${p.slug}/`}>Xem dự án <ArrowUpRight size={16}/></Link><a className="source-link" href={p.source} target="_blank" rel="noopener noreferrer">Nguồn công bố IPPG <ArrowUpRight size={14}/></a></div></article>)}</div>{showFilters&&!results.length&&<p className="empty-state">Chưa có dự án phù hợp bộ lọc này. <button onClick={()=>{Object.keys(filters).forEach(k=>change(k,'all'))}}>Xóa bộ lọc</button></p>}</>;
}

export function SiteSearch(){
 const[query,setQuery]=useState('');
 const normalize=(s:string)=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/gi,'d').toLowerCase();
 const results=query.trim()?pages.filter(p=>normalize(p.title+' '+p.slug).includes(normalize(query))).slice(0,8):[];
 return <div className="inline-search"><label><Search size={18}/> Tìm trang hoặc sản phẩm<input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Ví dụ: báo giá, STEM, Cruzr…"/></label>{query&&<div className="search-results" aria-live="polite">{results.length?results.map(p=><Link href={'/'+p.slug+'/'} key={p.slug}>{p.title}<ArrowUpRight size={16}/></Link>):<p>Không có kết quả phù hợp.</p>}</div>}</div>;
}

