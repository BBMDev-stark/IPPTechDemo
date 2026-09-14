import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve('out');
const mime={'.mp4':'video/mp4','.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.svg':'image/svg+xml','.woff2':'font/woff2','.json':'application/json','.txt':'text/plain'};
http.createServer((req,res)=>{
  let pathname;
  try{pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname)}catch{res.writeHead(400);return res.end()}
  let target=path.resolve(root,'.'+pathname);
  if(target!==root&&!target.startsWith(root+path.sep)){res.writeHead(403);return res.end()}
  if(fs.existsSync(target)&&fs.statSync(target).isDirectory())target=path.join(target,'index.html');
  if(!fs.existsSync(target)){res.statusCode=404;target=path.join(root,'404.html')}
  if(!fs.existsSync(target)){res.writeHead(404);return res.end('Run npm run build first.')}
  const size=fs.statSync(target).size;
  res.setHeader('Content-Type',mime[path.extname(target)]||'application/octet-stream');
  res.setHeader('Accept-Ranges','bytes');
  // MP4 playback on Safari and other clients requests partial byte ranges.
  const range=req.headers.range;
  let start=0,end=size-1;
  if(range&&res.statusCode===200){
    const match=/^bytes=(\d*)-(\d*)$/.exec(range);
    if(!match||(!match[1]&&!match[2])){res.writeHead(416,{'Content-Range':`bytes */${size}`});return res.end()}
    if(!match[1])start=Math.max(0,size-Number(match[2]));
    else{start=Number(match[1]);if(match[2])end=Math.min(end,Number(match[2]))}
    if(!Number.isSafeInteger(start)||!Number.isSafeInteger(end)||start>end||start>=size){res.writeHead(416,{'Content-Range':`bytes */${size}`});return res.end()}
    res.statusCode=206;res.setHeader('Content-Range',`bytes ${start}-${end}/${size}`);
  }
  res.setHeader('Content-Length',end-start+1);
  if(req.method==='HEAD')return res.end();
  const stream=fs.createReadStream(target,{start,end});stream.on('error',()=>res.destroy());stream.pipe(res);
}).listen(3000,'127.0.0.1',()=>console.log('IPPTech: http://127.0.0.1:3000'));
