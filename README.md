# IPPTech — Website Next.js

Website tiếng Việt dùng Next.js 16.3.5, React và TypeScript; chạy trên Node.js với trang nội dung được dựng sẵn và API tiếp nhận yêu cầu. Nội dung đã đối chiếu `Noi_dung_website_IPPTech_v1.docx` (21/09/2026): 65 trang nội dung, 22 đường dẫn mới và các địa chỉ cũ được giữ tương thích.

## Chạy và kiểm tra

```powershell
npm install
npm run dev
```

Mở http://127.0.0.1:3000. Nếu đã có dev server của dự án, sử dụng server đó.

```powershell
npm run build
node scripts/check-links.mjs
node scripts/check-content.mjs
npm run test:inquiries
```

`npm start` phục vụ bản build trên cổng 3000 khi cổng này đang trống. Đặt `NEXT_PUBLIC_SITE_URL` theo `.env.example` trước khi xuất bản lên tên miền chính thức.

## Nội dung và chức năng

- Bảy nhóm điều hướng; trang chủ định vị STEM và robotics; giải pháp theo trường công lập, trường tư, doanh nghiệp, sự kiện và cuộc thi.
- Năm sản phẩm EDU và hai TECH theo tài liệu. Cruzr Edu, Walker S2 Edu và Walker X không nằm trong danh mục hiện hành; đường dẫn cũ hướng người đọc tới danh mục mới.
- Hai dự án có nguồn IPPG, bộ lọc lĩnh vực/địa phương/thương hiệu/năm, ngày công bố rõ ràng.
- Menu nhiều cấp trên điện thoại, tìm kiếm không dấu, bảng sản phẩm/cấp học, tài nguyên hãng, FAQ, sitemap, breadcrumb và metadata từng trang.
- Sáu biểu mẫu: báo giá, trải nghiệm, đại lý, hỗ trợ, hợp tác và yêu cầu tài liệu. Có kiểm tra trường bắt buộc và trường điều kiện theo nhu cầu.
- Biểu mẫu kiểm tra trên trình duyệt và máy chủ, lưu dữ liệu vào `.private/inquiries/`, trả mã tiếp nhận và chống ghi trùng cùng yêu cầu. Hỗ trợ tối đa 3 ảnh/video, tổng 20 MB. Có thêm đăng ký nhận tin. Chưa kết nối email/CRM bên ngoài.
- Giữ nhận diện cyan/tím và intro đang có. Hero sử dụng UGOT; ảnh hoạt động IPPG có nguồn, không dùng ảnh hãng làm bằng chứng triển khai.

## Cấu trúc chỉnh sửa

| Tệp | Vai trò |
|---|---|
| `src/app/page.tsx` | Trang chủ |
| `src/app/[...slug]/page.tsx` | Trang nội dung, sản phẩm, dự án và địa chỉ cũ |
| `src/lib/website-content.json` | Nội dung công khai được biên tập từ Word |
| `scripts/import-website-document.py` | Đọc OOXML, bảng lồng, tách ghi chú và biên tập nội dung |
| `src/components/document-content.tsx` | Bảng, nhóm nội dung, FAQ, tin, thư viện và cổng vệ tinh |
| `src/components/brief-interactions.tsx` | Sáu form và bộ lọc thương hiệu/dự án |
| `src/components/navigation.tsx`, `src/lib/navigation.ts` | Menu và tìm kiếm |
| `src/lib/catalog.ts`, `src/lib/projects.ts` | Sản phẩm, ảnh, dự án và nguồn |
| `src/lib/seo.ts`, `src/app/sitemap.ts`, `src/app/robots.ts` | SEO và lập chỉ mục |
| `src/app/document.css` | Giao diện nội dung và responsive |
| `docs/CONTENT-DOCUMENT-AUDIT.md` | Phân tích, quyết định biên tập và bảng đối chiếu 65 trang |
| `docs/DATA-REQUIRED.md` | Dữ liệu còn thiếu để vận hành chính thức |

Để nhập lại tài liệu, cần Python và lxml:

```powershell
python scripts/import-website-document.py "C:\Users\binhb\Downloads\Noi_dung_website_IPPTech_v1.docx"
```

Các ghi chú nội bộ nằm trong `docs/website-document-source.json`, không được import vào website. Chỉnh quy tắc trong script trước khi nhập lại để bảo toàn quyết định biên tập.

## Ảnh và intro

Xem `ASSETS.md`, `IMAGE-NAMING.md`, `INTRO-GUIDE.md` để truy nguồn ảnh và chỉnh intro. Các báo cáo prototype trước đây được giữ để tham khảo lịch sử; báo cáo hiện hành là `docs/CONTENT-DOCUMENT-AUDIT.md`. Bản EN, dữ liệu pháp lý, PDF riêng IPPTech, hồ sơ nhân sự, KPI, ảnh nội bộ, tên miền và đầu mối email/CRM vẫn cần dữ liệu chính thức. Xem `docs/IMPLEMENTATION-2026-10-13.txt` để biết thay đổi mới và giới hạn vận hành.

## Tiếp nhận yêu cầu và triển khai

API `/api/inquiries/` ghi yêu cầu vào `.private/inquiries/<UUID>/request.json`; tệp đính kèm được lưu cùng thư mục, không có URL tải công khai. Luồng hợp tác được phân loại thành thương hiệu, đại lý hoặc trường học. Bản hiện tại lưu tại máy chủ, chưa gửi email/CRM.

Đặt `INQUIRY_DATA_DIR` tới thư mục dữ liệu bền vững ngoài `public`, `out`, `.next` khi triển khai. Không đưa thư mục này vào Git hoặc gói web tĩnh. Với nhiều máy chủ, cần thay kho file bằng cơ sở dữ liệu/object storage và giới hạn tần suất tại proxy. `npm start` chạy Next.js production; `scripts/serve.mjs` chỉ là máy chủ tĩnh của bản cũ và không hỗ trợ API mới.

Nội dung: `src/lib/website-content.json`. Nguồn ảnh: `docs/social-asset-provenance.json`. Tư liệu đang chờ: `docs/DATA-REQUIRED.md`. Không chạy lại script nhập Word trực tiếp lên bản này nếu chưa đối chiếu các bổ sung mới.
