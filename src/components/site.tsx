"use client";
import Link from "next/link";
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
export function Header() {
  const [open, setOpen] = useState(false),
    [search, setSearch] = useState(false),
    [query, setQuery] = useState("");
  return (
    <>
      <div className="topbar">
        <div className="container">
          <span>
            Thành viên hệ sinh thái{" "}
            <a href="https://ippgroup.vn" target="_blank" rel="noreferrer">
              IPP GROUP <ArrowUpRight size={12} />
            </a>
          </span>
          <span>
            Technology for a better tomorrow <span className="top-divider" />{" "}
            <b>VI</b>
          </span>
        </div>
      </div>
      <header>
        <div className="container header-inner">
          <Brand />
          <nav aria-label="Điều hướng chính">
            {nav.map(([name, slug]) => (
              <Link key={slug} href={"/" + slug + "/"}>
                {name}
                {["thuong-hieu", "giai-phap"].includes(slug) && (
                  <ChevronDown size={12} />
                )}
              </Link>
            ))}
          </nav>
          <div className="header-tools">
            <button aria-label="Tìm kiếm" onClick={() => setSearch(true)}>
              <Search size={19} />
            </button>
            <Link className="button small" href="/lien-he/#yeu-cau-bao-gia">
              Tư vấn <ArrowUpRight size={15} />
            </Link>
            <button
              className="mobile-toggle"
              aria-label={open ? "Đóng menu" : "Mở menu"}
              aria-expanded={open}
              onClick={() => setOpen(!open)}
            >
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {open && (
          <nav className="mobile-nav">
            {nav.map(([name, slug]) => (
              <Link
                key={slug}
                onClick={() => setOpen(false)}
                href={"/" + slug + "/"}
              >
                {name}
                <ArrowUpRight size={18} />
              </Link>
            ))}
          </nav>
        )}
      </header>
      {search && (
        <div className="modal-backdrop" onClick={() => setSearch(false)}>
          <section
            className="search-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Tìm kiếm website"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-title">
              <h2>Bạn đang tìm gì?</h2>
              <button
                aria-label="Đóng tìm kiếm"
                onClick={() => setSearch(false)}
              >
                <X />
              </button>
            </div>
            <input
              autoFocus
              placeholder="Sản phẩm, giải pháp, tài liệu…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <div className="search-results">
              {pages
                .filter((p) =>
                  p.title
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .toLowerCase()
                    .includes(
                      query
                        .normalize("NFD")
                        .replace(/[\u0300-\u036f]/g, "")
                        .toLowerCase(),
                    ),
                )
                .slice(0, 10)
                .map((p) => (
                  <Link
                    key={p.slug}
                    onClick={() => setSearch(false)}
                    href={"/" + p.slug + "/"}
                  >
                    {p.title}
                    <ArrowUpRight size={16} />
                  </Link>
                ))}
              {!pages.some((p) =>
                p.title.toLowerCase().includes(query.toLowerCase()),
              ) &&
                query && <p>Thử tên sản phẩm hoặc từ khóa ngắn hơn.</p>}
            </div>
          </section>
        </div>
      )}
    </>
  );
}
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
export function Products() {
  const [filter, setFilter] = useState("all");
  return (
    <>
      <div className="product-tabs" aria-label="Lọc sản phẩm">
        {[
          ["all", "Tất cả sản phẩm"],
          ["edu", "Giáo dục"],
          ["tech", "Robot dịch vụ & Công nghệ"],
        ].map(([id, label]) => (
          <button
            key={id}
            className={filter === id ? "active" : ""}
            onClick={() => setFilter(id)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="product-grid">
        {products
          .filter(
            (p) =>
              filter === "all" ||
              (filter === "edu"
                ? p.slug === "ugot-full-kit"
                : p.slug !== "ugot-full-kit"),
          )
          .map((p, i) => (
            <Link
              className="product-card"
              href={productHref(p.slug)}
              key={p.slug}
            >
              <div className="product-image">
                <span className="product-number">
                  0{products.indexOf(p) + 1} / UBTECH
                </span>
                <img
                  src={"/media/" + p.image + ".png"}
                  alt={"Robot UBTECH " + p.name}
                />
                <span className="circle-arrow">
                  <ArrowUpRight size={21} />
                </span>
              </div>
              <div className="product-info">
                <span className="eyebrow">{p.tag}</span>
                <h3>{p.name}</h3>
                <p>{p.text}</p>
              </div>
            </Link>
          ))}
      </div>
    </>
  );
}
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
          <Button href="/lien-he/#yeu-cau-bao-gia">Kết nối với IPPTech</Button>
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
          <Link href="/tin-tuc/">Tin tức & Sự kiện</Link>
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
          <Link className="text-link" href="/lien-he/">
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
export function InquiryForm({ kind = "quote" }: { kind?: string }) {
  const [done, setDone] = useState(false);
  return (
    <form
      className="inquiry-form"
      id="yeu-cau-bao-gia"
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const data = Object.fromEntries(new FormData(form));
        const blob = new Blob(
          [JSON.stringify({ ...data, type: kind }, null, 2)],
          { type: "application/json" },
        );
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "ipptech-yeu-cau-tu-van.json";
        a.click();
        URL.revokeObjectURL(url);
        setDone(true);
      }}
    >
      <span className="eyebrow">BẮT ĐẦU CUỘC TRÒ CHUYỆN</span>
      <h2>
        {kind === "demo"
          ? "Đăng ký trải nghiệm robot"
          : kind === "dealer"
            ? "Kết nối đối tác"
            : "Bạn cần IPPTech tư vấn điều gì?"}
      </h2>
      <div className="form-grid">
        <label>
          Họ và tên *
          <input
            name="name"
            autoComplete="name"
            required
            placeholder="Nguyễn Văn A"
          />
        </label>
        <label>
          Tên cơ quan / đơn vị *
          <input
            name="organization"
            required
            placeholder="Trường học / doanh nghiệp"
          />
        </label>
        <label>
          Email *
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="email@donvi.vn"
          />
        </label>
        <label>
          Số điện thoại *
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            pattern="[+0-9 ()-]{8,20}"
            placeholder="Số điện thoại liên hệ"
          />
        </label>
        <label>
          Giải pháp quan tâm
          <select name="solution">
            <option>Giáo dục AI & Robotics</option>
            <option>Robot dịch vụ</option>
            <option>Phòng thực hành STEM</option>
            <option>Hợp tác & Phân phối</option>
          </select>
        </label>
        <label>
          Tỉnh / Thành phố *
          <input
            name="location"
            required
            placeholder="Nơi triển khai dự kiến"
          />
        </label>
      </div>
      <label>
        Thông tin thêm
        <textarea
          name="notes"
          rows={4}
          placeholder="Chia sẻ nhu cầu, quy mô hoặc thời gian dự kiến…"
        />
      </label>
      <p className="form-note">
        Biểu mẫu hiện hỗ trợ tải nội dung yêu cầu về máy để bạn kiểm tra. Chưa
        gửi thông tin đến IPPTech.
      </p>
      <button className="button" type="submit">
        Tạo bản yêu cầu tư vấn <Download size={18} />
      </button>
      {done && (
        <p className="form-success" role="status">
          <Check size={18} /> Đã tạo bản yêu cầu. Bạn có thể lưu và gửi cho đầu
          mối IPPTech của mình.
        </p>
      )}
    </form>
  );
}

