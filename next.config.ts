import type { NextConfig } from 'next';
import {aliases} from './src/lib/content';
// Node hosting supports the private inquiry inbox; content pages remain prerendered.
const config: NextConfig = { trailingSlash: true, images: { unoptimized: true }, async redirects(){return Object.entries(aliases).map(([from,to])=>({source:'/'+from+'/',destination:'/'+to+'/',permanent:true}))} };
export default config;
