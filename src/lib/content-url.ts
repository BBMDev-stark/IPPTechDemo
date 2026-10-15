/** Normalize the pathname without moving the slash into a query or fragment. */
export function contentUrl(href:string){
 if(!href.startsWith('/'))return href;
 const index=href.search(/[?#]/);
 const pathname=index<0?href:href.slice(0,index);
 return pathname.replace(/\/$/,'')+'/'+(index<0?'':href.slice(index));
}
