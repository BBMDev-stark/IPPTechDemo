import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';

const content=JSON.parse(fs.readFileSync('src/lib/website-content.json','utf8'));
const read=slug=>fs.readFileSync(path.join('.next/server/app',(slug||'index')+'.html'),'utf8');
const main=html=>html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1]||'';
for(const page of content){
 const html=read(page.slug),body=main(html);
 assert.ok(body,`Missing main: ${page.slug}`);
 assert.equal((body.match(/<h1\b/g)||[]).length,1,`Expected one H1: ${page.slug}`);
 assert.ok(/<link rel="canonical"/.test(html),`Missing canonical: ${page.slug}`);
 assert.ok(!/\[CẦN:|\[Nút:|\[Tên đơn vị\]|KHỐI \d|theo brief|gửi form|boilerplate/.test(body),`Editorial text leaked: ${page.slug}`);
 assert.ok(!/<a[^>]*href="#"/.test(body),`Dead action: ${page.slug}`);
}
const edu=main(read('thuong-hieu/ubtech/giao-duc'));
assert.equal((edu.match(/class="catalog-card"/g)||[]).length,5,'Education must show five products');
assert.ok(!/Cruzr Edu|Walker S2 Edu/.test(edu),'Unconfirmed Edu products are not in the catalogue');
const tech=main(read('thuong-hieu/ubtech/cong-nghe'));
assert.equal((tech.match(/class="catalog-card"/g)||[]).length,2,'Technology must show two products');
const quote=main(read('lien-he/yeu-cau-bao-gia'));
for(const name of ['organization_type','level_or_industry','product_interest','scale','timeline']){
 assert.ok(new RegExp(`<(?:input|select)[^>]*(?:name="${name}"[^>]*required|(?:required[^>]*name="${name}"))`).test(quote),`Quote field must be required: ${name}`);
}
assert.ok(/type="checkbox"[^>]*name="legal_documents"/.test(quote),'Legal document multi-select missing');
assert.ok(/name="serial_number"/.test(main(read('tai-nguyen/ho-tro'))),'Support serial field missing');
assert.ok(/name="partnership_type"/.test(main(read('du-an-doi-tac/hop-tac'))),'Partnership routing missing');
const faq=main(read('tai-nguyen/cau-hoi-thuong-gap'));
assert.equal((faq.match(/<details>/g)||[]).length,9,'FAQ must contain nine questions');
assert.ok(faq.includes('FAQPage'),'FAQ schema missing');
const sitemap=fs.readFileSync('.next/server/app/sitemap.xml.body','utf8');
assert.ok(!/brand-02|brand-03|cruzr-edu|walker-s2-edu|slug-du-an/.test(sitemap),'Sitemap contains unpublished content');
assert.ok(sitemap.includes('/giai-phap/giao-duc-cong-lap/'),'Sitemap omits the new education route');
assert.ok(main(fs.readFileSync('.next/server/app/_not-found.html','utf8')).includes('Tìm trang hoặc sản phẩm'),'404 search missing');
console.log(`PASS: ${content.length} document routes, headings, publication copy, catalogue, required forms, FAQ and sitemap.`);
