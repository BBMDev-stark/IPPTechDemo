"use client";
import Link from "next/link";
import {ReplayIntro} from './intro-experience';
import { useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  Menu,
  X,
  Search,
  ChevronDown,
  MoveUpRight,
  Cpu,
  GraduationCap,
  Building2,
  Check,
  Download,
} from "lucide-react";
import { nav, pages, products, productHref, titleFor } from "@/lib/content";
export function Brand() {
  return (
    <Link className="brand" href="/" aria-label="IPPTech trang chủ">
      <span className="brand-mark">
        i<span>p</span>p
      </span>
      <span className="brand-type">
        TECH<small>TECHNOLOGY & EDUCATION</small>
      </span>
    </Link>
  );
}
export { Header } from './navigation';
export function Button({
  href,
  children,
  light = false,
}: {
  href: string;
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <Link className={"button " + (light ? "outline" : "")} href={href}>
      {children}
      <ArrowUpRight size={18} />
    </Link>
  );
}
export function SectionHeading({
  eyebrow,
  title,
  href,
  label = "Khám phá thêm",
}: {
  eyebrow: string;
  title: string;
  href?: string;
  label?: string;
}) {
  return (
    <div className="section-heading">
      <div>
        <span className="eyebrow">
          <span />
          {eyebrow}
        </span>
        <h2>{title}</h2>
      </div>
      {href && (
        <Link className="text-link" href={href}>
          {label}
          <ArrowUpRight size={18} />
        </Link>
      )}
    </div>
  );
}
export { Products, InquiryForm } from './interactions';
export function ContactBand() {
  return (
    <section className="contact-band">
      <div className="container">
        <div>
          <span className="eyebrow">CÙNG KIẾN TẠO ĐIỀU TIẾP THEO</span>
          <h2>
            Sẵn sàng đưa công nghệ
            <br />
            vào thực tiễn?
          </h2>
        </div>
        <div>
          <p>
            Chia sẻ nhu cầu của bạn.
            <br />
            IPPTech cùng bạn tìm lời giải phù hợp.
          </p>
          <Button href="/lien-he/yeu-cau-bao-gia/">Kết nối với IPPTech</Button>
        </div>
        <span className="band-orbit" />
      </div>
    </section>
  );
}
export function Footer() {
  return (
    <footer>
      <div className="container footer-grid">
        <div>
          <Brand />
          <p>
            Công nghệ mở ra khả năng.
            <br />
            Con người kiến tạo tương lai.
          </p>
          <a
            className="footer-ipg"
            href="https://ippgroup.vn"
            target="_blank"
            rel="noreferrer"
          >
            THÀNH VIÊN IPP GROUP <ArrowUpRight size={15} />
          </a>
        </div>
        <div>
          <h4>Khám phá IPPTech</h4>
          {nav.slice(0, 4).map(([n, s]) => (
            <Link key={s} href={"/" + s + "/"}>
              {n}
            </Link>
          ))}
        </div>
        <div>
          <h4>Đồng hành cùng bạn</h4>
          <Link href="/tai-nguyen/">Tài nguyên & Hỗ trợ</Link>
          <Link href="/lien-he/dang-ky-trai-nghiem/">Trải nghiệm robot</Link>
          <Link href="/lien-he/dang-ky-dai-ly/">Trở thành đối tác</Link>
          <Link href="/tin-tuc/">Tin tức & Sự kiện</Link><ReplayIntro/>
        </div>
        <div>
          <h4>Văn phòng IPPTech</h4>
          <p>
            Tầng 3, Centec Tower
            <br />
            72–74 Nguyễn Thị Minh Khai
            <br />
            TP. Hồ Chí Minh, Việt Nam
          </p>
          <a className="footer-map-link" href="https://www.google.com/maps/search/?api=1&query=Centec+Tower+72-74+Nguyen+Thi+Minh+Khai+Ho+Chi+Minh" target="_blank" rel="noopener noreferrer">Chỉ đường đến văn phòng <ArrowUpRight size={15}/></a><Link className="text-link" href="/lien-he/">
            Liên hệ với chúng tôi <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} IPPTech. All rights reserved.</span>
        <div>
          <Link href="/chinh-sach-bao-mat/">Chính sách bảo mật</Link>
          <Link href="/dieu-khoan-su-dung/">Điều khoản sử dụng</Link>
          <Link href="/so-do-website/">Sơ đồ website</Link>
        </div>
      </div>
    </footer>
  );
}


