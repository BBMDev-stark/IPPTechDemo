import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import {randomUUID} from 'node:crypto';
import {saveInquiry,validateInquiry} from './inquiry-store.mjs';
const base=()=>({requestId:randomUUID(),kind:'resources',fields:{organization:'Test organization',full_name:'Test user',email:'test@example.invalid',resource_audience:'Giáo dục',consent:'yes'}});
test('validations reject missing consent, invalid email, unknown kind and file payloads',()=>{
 const p=base();delete p.fields.consent;assert.throws(()=>validateInquiry(p));
 const q=base();q.fields.email='bad';assert.throws(()=>validateInquiry(q));
 assert.throws(()=>validateInquiry({...base(),kind:'__proto__'}));
 assert.throws(()=>validateInquiry({...base(),attachments:[{name:'bad.html',data:Buffer.from('<script>x</script>').toString('base64')}]}));
});
test('inbox writes privately, replays idempotently, rejects changed retry and routes partnerships',async()=>{
 const root=path.resolve('.tmp/inquiry-tests-'+randomUUID());
 try{
  const p=base();const first=await saveInquiry(p,root),second=await saveInquiry(p,root);
  assert.equal(first.reference,second.reference);assert.equal(second.duplicate,true);
  assert.equal((await fs.readdir(root)).length,1);
  const record=JSON.parse(await fs.readFile(path.join(root,p.requestId,'request.json'),'utf8'));
  assert.equal(record.department,'documents');assert.equal(record.fields.email,'test@example.invalid');
  await assert.rejects(()=>saveInquiry({...p,fields:{...p.fields,full_name:'Changed'}},root));
  for(const [type,department] of [['Thương hiệu đối tác','brand-partnerships'],['Đại lý / Nhà thầu','dealer-network'],['Trường học hợp tác','education-partnerships']]){
   const partner={...base(),kind:'partner',fields:{...base().fields,phone:'0900000000',partnership_type:type,business_field:'test',service_area:'test',timeline:'test',notes:'test'}};
   await saveInquiry(partner,root);const stored=JSON.parse(await fs.readFile(path.join(root,partner.requestId,'request.json'),'utf8'));assert.equal(stored.department,department);
  }
 }finally{assert.ok(root.startsWith(path.resolve('.tmp')+path.sep));await fs.rm(root,{recursive:true,force:true})}
});
test('support attachments accept supported binary and reject invalid/past demo dates',()=>{
 const p={...base(),kind:'support',fields:{...base().fields,phone:'0900000000',product_version:'Test',serial_number:'TEST',purchase_date:'2020-01-01',notes:'Test'},attachments:[{name:'../../image.png',data:Buffer.from([137,80,78,71,13,10,26,10,1]).toString('base64')}]};
 const result=validateInquiry(p);assert.equal(result.files[0].filename,'attachment-1.png');assert.ok(!result.files[0].name.includes('/'));
 assert.throws(()=>validateInquiry({...p,attachments:[{name:'x.svg',data:Buffer.from('<svg/>').toString('base64')}]}));
 const demo={...base(),kind:'demo',fields:{...base().fields,phone:'0900000000',experience_type:'Tại đơn vị',product_interest:'Cruzr',preferred_date:'2000-01-01',attendees:'2',venue:'Test'}};assert.throws(()=>validateInquiry(demo));
});
