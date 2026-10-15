import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve('.next/server/app');
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)])}
const files=walk(root).filter(p=>p.endsWith('.html'));const errors=[];
for(const file of files){const text=fs.readFileSync(file,'utf8');for(const match of text.matchAll(/(?:href|src)="([^"#]+)"/g)){
 const link=match[1];if(!link.startsWith('/')||link.startsWith('//'))continue;
 const url=decodeURIComponent(link.split(/[?#]/)[0]);
 const candidates=url.startsWith('/_next/')?[path.resolve('.next',url.slice(7))]:[path.resolve('public','.'+url),path.join(root,url.replace(/^\//,'').replace(/\/$/,'')+'.html'),path.join(root,url.replace(/^\//,'')+'.body')];
 if(url==='/')candidates.push(path.join(root,'index.html'));
 if(!candidates.some(p=>fs.existsSync(p)&&fs.statSync(p).isFile()))errors.push({page:path.relative(root,file),link});
}}
if(errors.length){console.error(JSON.stringify(errors,null,2));process.exitCode=1}else console.log(`PASS: ${files.length} prerendered HTML pages; no missing internal link or asset targets.`);
