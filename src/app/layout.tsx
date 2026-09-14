import type { Metadata } from 'next';
import './globals.css';
import { Header, Footer } from '@/components/site';
export const metadata: Metadata = {title:{default:'IPPTech — Công nghệ kiến tạo tương lai',template:'%s | IPPTech'},description:'Giải pháp AI, Robotics và giáo dục công nghệ cho trường học và doanh nghiệp Việt Nam. Khám phá hệ sinh thái UBTECH cùng IPPTech.'};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="vi" data-scroll-behavior="smooth"><body><a className="skip-link" href="#main">Đi tới nội dung</a><Header/>{children}<Footer/></body></html>}

import './content.css';

