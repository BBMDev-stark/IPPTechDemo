# Quy ước tên ảnh IPPTech

Tất cả ảnh thay thế đặt tại **public/images/**. Mẫu: **ten-trang-img-so-thu-tu.phan-mo-rong**, chữ thường, không dấu, nối bằng dấu gạch ngang. Trang chủ dùng home; trang con dùng đường dẫn ghép bằng dấu gạch ngang; sản phẩm dùng ubtech-ten-san-pham. Logo dùng chung là ngoại lệ: common-logo-ten-thuong-hieu.png.

- Đánh số từ 1 theo vị trí nội dung từ trên xuống. Logo và icon trang trí không tính vào số ảnh. Số đã gán được giữ cố định, không đánh lại khi sắp xếp giao diện.
- Ảnh mới bổ sung lấy số tiếp theo chưa dùng. Không tạo ảnh cho mọi vùng chữ hoặc mọi trang nếu bố cục không cần ảnh.
- Thay ảnh đang có: ghi đè đúng tên **và định dạng** trong bảng, sau đó build lại / làm mới trình duyệt. Không đổi đuôi PNG thành JPG bằng cách sửa tên: phải xuất đúng định dạng.
- Vị trí chờ ảnh: bỏ file đúng tên vào public/images rồi chạy npm run build (hoặc khởi động lại npm run dev). Website tự hiển thị thay vị trí trống; khi chưa có file vẫn giữ bố cục dự phòng, không hiện ảnh lỗi.
- Home có bản ảnh riêng. Ví dụ home-img-4.jpg và du-an-img-1.jpg ban đầu cùng hình, nhưng thay một file không thay file kia.
- Thẻ sản phẩm dùng chung ảnh chính của sản phẩm trên mọi trang danh mục. Thay ubtech-yanshee-img-1.png sẽ cập nhật cả trang Yanshee và các thẻ Yanshee.
- Các thẻ dự án ngoài Home dùng chung du-an-img-1/2/3. Logo common dùng chung toàn site.
- Khi thay bằng ảnh khác nội dung, cần chỉnh cả alt/chú thích/nguồn cho đúng ảnh mới. Kích thước dưới đây là gợi ý; giữ tỷ lệ và khoảng trống quanh chủ thể để không bị cắt.
- public/media là bản ảnh nguồn cũ giữ để đối chiếu; website đã chuyển sang public/images. Nguồn gốc chi tiết của ảnh cũ ở ASSETS.md.

## Danh sách vị trí

| Tên file | Trang / nơi dùng | Vị trí | Kích thước gợi ý | Trạng thái | Ảnh nguồn cũ |
|---|---|---|---|---|---|
| common-logo-ubtech.png | Toàn website | Logo UBTECH | PNG nền trong suốt | Đang dùng | ubtech-logo.png |
| common-logo-ippg.png | Toàn website | Logo IPPG | PNG nền trong suốt | Đang dùng | ippg-logo.png |
| common-logo-brand-02.png | Home / Thương hiệu | Logo thương hiệu 02 | PNG nền trong suốt | Chờ ảnh — đã nối vị trí | Chưa có |
| common-logo-brand-03.png | Home / Thương hiệu | Logo thương hiệu 03 | PNG nền trong suốt | Chờ ảnh — đã nối vị trí | Chưa có |
| home-img-1.png | / | Robot hero | PNG trong suốt, khoảng 1200 × 1200 | Đang dùng | walker.png |
| home-img-2.png | / | Giải pháp giáo dục | 1200 × 600 | Đang dùng | education.png |
| home-img-3.jpg | / | Giải pháp doanh nghiệp | 1200 × 600 | Đang dùng | cruzr.png |
| home-img-4.jpg | / | Thẻ dự án AI Center | 1200 × 750 | Đang dùng | ai-center.jpeg |
| home-img-5.jpg | / | Thẻ dự án FPT | 1200 × 750 | Đang dùng | fpt-partnership.jpeg |
| home-img-6.jpg | / | Thẻ dự án trường công | 1200 × 750 | Chờ ảnh — đã nối vị trí | Chưa có |
| home-img-7.jpg | / | Tin công ty | 1200 × 800 | Đang dùng | fpt-partnership.jpeg |
| home-img-8.png | / | Tin thương hiệu | 1000 × 1000 | Đang dùng | ugot.png |
| home-img-9.jpg | / | Tin chính sách giáo dục | 1200 × 800 | Chờ ảnh — đã nối vị trí | Chưa có |
| ubtech-ugot-full-kit-img-1.png | /thuong-hieu/ubtech/ugot-full-kit/ | Ảnh chính và thẻ sản phẩm dùng chung | 1000 × 1000; ảnh robot đủ hình | Đang dùng | ugot.png |
| ubtech-ai-fantasy-zoo-img-1.jpg | /thuong-hieu/ubtech/ai-fantasy-zoo/ | Ảnh chính và thẻ sản phẩm dùng chung | 1000 × 1000; ảnh robot đủ hình | Đang dùng | ai-fantasy-zoo.jpg |
| ubtech-ai-super-engineer-img-1.webp | /thuong-hieu/ubtech/ai-super-engineer/ | Ảnh chính và thẻ sản phẩm dùng chung | 1000 × 1000; ảnh robot đủ hình | Đang dùng | ai-super-engineer.webp |
| ubtech-yanshee-img-1.png | /thuong-hieu/ubtech/yanshee/ | Ảnh chính và thẻ sản phẩm dùng chung | 1000 × 1000; ảnh robot đủ hình | Đang dùng | yanshee.png |
| ubtech-ukit-ai-img-1.png | /thuong-hieu/ubtech/ukit-ai/ | Ảnh chính và thẻ sản phẩm dùng chung | 1000 × 1000; ảnh robot đủ hình | Đang dùng | ukit-ai.png |
| ubtech-cruzr-edu-img-1.jpg | /thuong-hieu/ubtech/cruzr-edu/ | Ảnh chính và thẻ sản phẩm dùng chung | 1000 × 1000; ảnh robot đủ hình | Đang dùng | cruzr.png |
| ubtech-walker-s2-edu-img-1.jpg | /thuong-hieu/ubtech/walker-s2-edu/ | Ảnh chính và thẻ sản phẩm dùng chung | 1000 × 1000; ảnh robot đủ hình | Đang dùng | walker-s2.jpg |
| ubtech-cruzr-img-1.jpg | /thuong-hieu/ubtech/cruzr/ | Ảnh chính và thẻ sản phẩm dùng chung | 1000 × 1000; ảnh robot đủ hình | Đang dùng | cruzr.png |
| ubtech-u1-img-1.jpg | /thuong-hieu/ubtech/u1/ | Ảnh chính và thẻ sản phẩm dùng chung | 1000 × 1000; ảnh robot đủ hình | Đang dùng | u1.jpg |
| giai-phap-giao-duc-phong-thuc-hanh-stem-img-1.png | /giai-phap/giao-duc/phong-thuc-hanh-stem/ | Ảnh nội dung chính | 1200 × 800 | Đang dùng | education.png |
| giai-phap-giao-duc-ai-center-img-1.jpeg | /giai-phap/giao-duc/ai-center/ | Ảnh nội dung chính | 1200 × 800 | Đang dùng | ai-center.jpeg |
| giai-phap-doanh-nghiep-img-1.jpg | /giai-phap/doanh-nghiep/ | Ảnh nội dung chính | 1200 × 800 | Đang dùng | cruzr.png |
| giai-phap-su-kien-truyen-thong-img-1.jpg | /giai-phap/su-kien-truyen-thong/ | Ảnh nội dung chính | 1200 × 800 | Đang dùng | cruzr.png |
| du-an-doi-tac-ai-center-dai-hoc-quoc-gia-img-1.jpeg | /du-an-doi-tac/ai-center-dai-hoc-quoc-gia/ | Ảnh nội dung chính | 1200 × 800 | Đang dùng | aic-launch.jpeg |
| du-an-doi-tac-fpt-school-img-1.jpeg | /du-an-doi-tac/fpt-school/ | Ảnh nội dung chính | 1200 × 800 | Đang dùng | fpt-partnership.jpeg |
| du-an-img-1.jpg | Dự án / Tin công ty | Thẻ dự án AI Center | 1200 × 800 | Đang dùng | ai-center.jpeg |
| du-an-img-2.jpg | Dự án / Tin công ty | Thẻ dự án FPT | 1200 × 800 | Đang dùng | fpt-partnership.jpeg |
| du-an-img-3.jpg | Dự án / Tin công ty | Thẻ dự án trường công | 1200 × 750 | Chờ ảnh — đã nối vị trí | Chưa có |
| tin-tuc-img-1.jpg | /tin-tuc/ | Tin công ty | 1200 × 800 | Đang dùng | fpt-partnership.jpeg |
| tin-tuc-img-2.png | /tin-tuc/ | Tin thương hiệu | 1000 × 1000 | Đang dùng | ugot.png |
| tin-tuc-img-3.jpg | /tin-tuc/ | Tin chính sách | 1200 × 800 | Chờ ảnh — đã nối vị trí | Chưa có |
| ve-ipptech-doi-ngu-img-1.jpg | /ve-ipptech/doi-ngu/ | Ảnh giới thiệu nội dung | 1200 × 800 | Chờ ảnh — đã nối vị trí | Chưa có |
| ve-ipptech-ho-so-phap-ly-img-1.jpg | /ve-ipptech/ho-so-phap-ly/ | Ảnh giới thiệu nội dung | 1200 × 800 | Chờ ảnh — đã nối vị trí | Chưa có |
| ve-ipptech-gioi-thieu-img-1.jpg | /ve-ipptech/gioi-thieu/ | Ảnh giới thiệu nội dung | 1200 × 800 | Chờ ảnh — đã nối vị trí | Chưa có |
| ve-ipptech-tuyen-dung-img-1.jpg | /ve-ipptech/tuyen-dung/ | Ảnh giới thiệu nội dung | 1200 × 800 | Chờ ảnh — đã nối vị trí | Chưa có |
| giai-phap-giao-duc-tap-huan-giao-vien-img-1.jpg | /giai-phap/giao-duc/tap-huan-giao-vien/ | Ảnh giới thiệu nội dung | 1200 × 800 | Chờ ảnh — đã nối vị trí | Chưa có |
| giai-phap-giao-duc-cuoc-thi-robotics-img-1.jpg | /giai-phap/giao-duc/cuoc-thi-robotics/ | Ảnh giới thiệu nội dung | 1200 × 800 | Chờ ảnh — đã nối vị trí | Chưa có |
| du-an-doi-tac-du-an-truong-cong-img-1.jpg | /du-an-doi-tac/du-an-truong-cong/ | Ảnh giới thiệu nội dung | 1200 × 800 | Chờ ảnh — đã nối vị trí | Chưa có |
| du-an-doi-tac-doi-tac-thuong-hieu-img-1.jpg | /du-an-doi-tac/doi-tac-thuong-hieu/ | Ảnh giới thiệu nội dung | 1200 × 800 | Chờ ảnh — đã nối vị trí | Chưa có |
| du-an-doi-tac-mang-luoi-dai-ly-img-1.jpg | /du-an-doi-tac/mang-luoi-dai-ly/ | Ảnh giới thiệu nội dung | 1200 × 800 | Chờ ảnh — đã nối vị trí | Chưa có |
| du-an-doi-tac-hop-tac-img-1.jpg | /du-an-doi-tac/hop-tac/ | Ảnh giới thiệu nội dung | 1200 × 800 | Chờ ảnh — đã nối vị trí | Chưa có |
| nang-luc-phan-phoi-img-1.jpg | /nang-luc/phan-phoi/ | Ảnh giới thiệu nội dung | 1200 × 800 | Chờ ảnh — đã nối vị trí | Chưa có |
| nang-luc-trien-khai-img-1.jpg | /nang-luc/trien-khai/ | Ảnh giới thiệu nội dung | 1200 × 800 | Chờ ảnh — đã nối vị trí | Chưa có |
| nang-luc-dao-tao-img-1.jpg | /nang-luc/dao-tao/ | Ảnh giới thiệu nội dung | 1200 × 800 | Chờ ảnh — đã nối vị trí | Chưa có |

## Media mở đầu website

- public/images/intro-img-1.jpg: ảnh chờ tải video intro.
- public/videos/intro-video-1.mp4: video intro, phát một lượt đến hết.
- Logo dùng common-logo-ubtech.png. Cánh tay là model 3D trong code, hướng dẫn tại INTRO-GUIDE.md.
