import fs from 'node:fs';
import path from 'node:path';

// Optional files are checked during rendering/static export, never requested if absent.
export function assetExists(src?: string): boolean {
  if (!src?.startsWith('/images/')) return false;
  return fs.existsSync(path.join(process.cwd(), 'public', src));
}

export function AssetSlot({src, alt, children}: {
  src: string;
  alt: string;
  children: React.ReactNode;
}) {
  return assetExists(src) ? <img src={src} alt={alt} loading="lazy"/> : <>{children}</>;
}
