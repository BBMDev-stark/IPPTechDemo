import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve('out');
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)])}
const files=walk(root).filter(p=>p.endsWith('.html'));const errors=[];
for(const file of files){const text=fs.readFileSync(file,'utf8');for(const match of text.matchAll(/(?:href|src)="([^"#]+)"/g)){const link=match[1];if(!link.startsWith('/')||link.startsWith('//'))continue;let target=path.join(root,decodeURIComponent(link.split(/[?#]/)[0]));if(fs.existsSync(target)&&fs.statSync(target).isDirectory())target=path.join(target,'index.html');if(!fs.existsSync(target))errors.push({page:path.relative(root,file),link})}}
if(errors.length){console.error(JSON.stringify(errors,null,2));process.exitCode=1}else console.log(`PASS: ${files.length} exported HTML pages; no missing internal link or asset targets.`);
