# IPPTech — Next.js website

Website tiếng Việt, nền trắng với cyan/tím theo logo UBTECH. Next.js 16.3.5, React, TypeScript và App Router. Nội dung đối chiếu thư mục IPPTech-Prototype-Portable/IPPTech-Prototype, giữ 58 đường dẫn nội dung của bản gốc.

## Chạy trên máy

```powershell
npm install
npm run dev
```

Mở http://127.0.0.1:3000. Nếu Next báo một dev server của cùng thư mục đã chạy, mở địa chỉ server có sẵn; không chạy thêm lần thứ hai. Để khởi động lại, nhấn Ctrl+C trong terminal đang chạy rồi chạy lại npm run dev.

```powershell
npm run build
node scripts/check-links.mjs
npm start
```

Lệnh build xuất website tĩnh vào out/. npm start phục vụ bản build trên cổng 3000, chỉ dùng khi cổng đó không có dev server.

## Nội dung & chức năng

- Trang chủ theo thứ tự và thông tin gốc: định vị IPPTech, dải xác thực, hai nhóm nhu cầu, UBTECH và hai thương hiệu dự phòng, ba nhóm dự án, IPPG, ba cổng vệ tinh, ba nhóm tin và CTA.
- 9 sản phẩm: UGOT Full Kit, AI Fantasy Zoo, AI Super Engineer, Yanshee, UKit AI, Cruzr Edu, Walker S2 Edu, Cruzr, U1. Mỗi trang có ảnh, mô tả, đặc điểm, thông tin cơ bản, nguồn và giải pháp liên quan.
- Mega-menu, menu điện thoại nhiều cấp, tìm kiếm không dấu, lọc sản phẩm, bảng cấp học, thư viện có tìm kiếm/lọc, FAQ, breadcrumb, sơ đồ website.
- Ba biểu mẫu riêng: trải nghiệm, báo giá và đại lý. Kiểm tra dữ liệu trên trình duyệt; chưa kết nối email, CRM hay backend. Không tạo file JSON và không thông báo gửi thành công giả.
- EN, hồ sơ pháp lý, số liệu triển khai, hồ sơ năng lực PDF và hai thương hiệu mới còn chờ dữ liệu. Các trang này được giữ với trạng thái rõ ràng.

## Nơi chỉnh sửa

| File | Nội dung |
|---|---|
| src/app/page.tsx | Trang chủ |
| src/app/[...slug]/page.tsx | Các mẫu trang nội dung |
| src/components/navigation.tsx | Menu desktop/mobile, tìm kiếm |
| src/components/interactions.tsx | Lọc, thư viện, bảng cấp học, biểu mẫu |
| src/components/content-sections.tsx | Thương hiệu, dự án, tin, quy trình |
| src/components/site.tsx | Nhận diện, CTA, footer |
| src/lib/catalog.ts | Sản phẩm, ảnh, thông tin cơ bản và nguồn |
| src/lib/articles.ts | Nội dung giải pháp, dự án, giới thiệu |
| src/lib/navigation.ts | Cây điều hướng |
| src/lib/source-pages.json | Đường dẫn và tiêu đề gốc |
| src/app/globals.css, src/app/content.css | Giao diện và responsive |
| public/images/ | Ảnh dùng trên website theo IMAGE-NAMING.md |

Xem IMPLEMENTATION-AUDIT.md để đối chiếu với prototype. Xem ASSETS.md để thay ảnh đúng tên và truy nguồn. Ảnh sản phẩm không được coi là bằng chứng triển khai thực tế. Ảnh Walker X trên hero là minh họa hệ sinh thái, khác Walker S2 Edu trong danh mục. Logo IPPTech đang trình bày bằng chữ; logo UBTECH do người dùng cung cấp, logo IPPG lấy từ website tập đoàn.

## Thay ảnh theo tên quy ước

Ảnh đang sử dụng ở public/images/. Xem IMAGE-NAMING.md để biết tên file cho từng vị trí và ảnh còn thiếu; image-manifest.json là danh sách tương ứng. Ảnh nguồn cũ ở public/media/ chỉ giữ để đối chiếu.


## Intro mở đầu

Logo → video toàn màn hình → tay robot kéo màn sang phải. Thay public/videos/intro-video-1.mp4 bằng video của bạn. Nút Bỏ qua dùng cùng hiệu ứng chuyển cảnh; Xem lại intro nằm ở footer. Xem INTRO-GUIDE.md để chỉnh media, thời lượng và nguồn tham khảo.
