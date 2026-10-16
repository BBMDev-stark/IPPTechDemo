import {IntroExperience} from '@/components/intro-experience';
import './intro.css';
import type { Metadata } from 'next';
import './globals.css';
import {siteUrl} from '@/lib/seo';
import { Header, Footer } from '@/components/site';
export const metadata: Metadata = {metadataBase:new URL(siteUrl),title:{default:'IPPTech — Công nghệ kiến tạo tương lai',template:'%s | IPPTech'},description:'Giải pháp AI, Robotics và giáo dục công nghệ cho trường học và doanh nghiệp Việt Nam. Khám phá hệ sinh thái UBTECH cùng IPPTech.'};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="vi" data-scroll-behavior="smooth"><body><IntroExperience><a className="skip-link" href="#main">Đi tới nội dung</a><Header/>{children}<Footer/></IntroExperience></body></html>}

import './content.css';



import './document.css';

import "./enhancements.css";
import "./ux.css";
import "./robot-showcase.css";

import './interaction-refresh.css';
import './document-refresh.css';

import './editorial.css';
import './image-quality.css';
import './project-layout.css';
