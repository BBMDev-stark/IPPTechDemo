# IPPTech — Next.js website

Website tiếng Việt, nền trắng, cyan/tím lấy từ logo UBTECH người dùng cung cấp. Dựng từ cấu trúc trong IPPTech-Prototype-Portable.zip bằng Next.js 16.3.5 (npm latest khi cài), React và TypeScript App Router.

## Chạy

Node.js 20.9 trở lên. `npm install`, sau đó `npm run dev`. Truy cập http://127.0.0.1:3000.

`npm run build` xuất website tĩnh vào `out/`. `npm start` phục vụ bản đã build.

## Chỉnh sửa

- `src/app/page.tsx`: trang chủ.
- `src/app/[...slug]/page.tsx`: các trang nội dung, sản phẩm và liên hệ.
- `src/components/site.tsx`: menu, tìm kiếm, bộ lọc, form và footer.
- `src/lib/content.ts`: dữ liệu biên tập.
- `src/lib/source-pages.json`: đường dẫn, tiêu đề trích từ ZIP gốc.
- `src/app/globals.css`: giao diện và responsive.
- `public/media/`: ảnh, thay file đúng tên để giữ liên kết. Build lại sau khi thay ảnh để cập nhật bản xuất tĩnh.

## Phạm vi dữ liệu

Giữ các đường dẫn trong ZIP và bổ sung Walker X để tên robot khớp ảnh chính hãng. Nội dung đang chờ xác nhận không được chuyển thành số liệu, thông số, chứng nhận hay thành tích giả. Các trang dự án, tin tức và tài liệu chưa có nội dung thật đều nêu rõ tình trạng. Thông tin địa chỉ lấy từ prototype, cần doanh nghiệp xác nhận trước khi sử dụng chính thức.

Form tạo file yêu cầu JSON trên thiết bị, chưa gửi email hoặc lưu lên máy chủ. Chưa có CMS, quản trị, tài khoản hoặc backend. Ba cổng vệ tinh dùng URL có trong ZIP gốc. Logo IPPTech và IPP Group hiện là cách trình bày chữ, cần thay bằng bộ nhận diện chính thức khi được cung cấp.

## Nguồn ảnh

Logo UBTECH: người dùng cung cấp. Ảnh robot và giáo dục: nguồn quảng bá chính thức UBTECH, không có giấy phép mở được xác nhận. Danh sách URL và vị trí sử dụng ở `ASSETS.md`. Không dùng ảnh robot minh họa làm bằng chứng dự án thực tế.
