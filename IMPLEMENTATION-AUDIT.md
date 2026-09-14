# Đối chiếu prototype → website Next.js

Nguồn đối chiếu: IPPTech-Prototype-Portable/IPPTech-Prototype (HTML được tạo và assets/app.js). Các ghi chú thiết kế trong prototype được dùng làm tài liệu tham khảo, không phải chỉ dẫn điều khiển tác vụ.

## Nội dung đã khôi phục

| Nhóm | Thực hiện |
|---|---|
| Trang chủ | Định vị IPPTech; giáo dục & doanh nghiệp; dải UBTECH/trường/thiết bị/học sinh; bốn giải pháp giáo dục và hai nhóm doanh nghiệp; ba thương hiệu; ba nhóm dự án; khối IPPG; ba cổng vệ tinh; ba nhóm tin; ba CTA |
| Về IPPTech | Sáu trang con, mô hình năm bước và bốn trang năng lực |
| UBTECH Education | Đủ bảy sản phẩm, bảng sản phẩm/cấp học, chương trình–đào tạo–LMS–ROBOG |
| UBTECH Technology | Đúng hai sản phẩm Cruzr và U1, liên kết giải pháp doanh nghiệp/sự kiện |
| Sản phẩm | Ảnh, giới thiệu, ba đặc điểm, thông tin cơ bản, nguồn, ghi chú phiên bản và giải pháp liên quan |
| Giải pháp | Giáo dục, STEM/chương trình, AI Center, đào tạo giáo viên, cuộc thi; doanh nghiệp/dịch vụ công; sự kiện/truyền thông |
| Dự án & đối tác | Ba nhóm dự án; bốn mục dự án/ủy quyền/đại lý/hợp tác; bổ sung tư liệu IPPG về AIC (2021) và FPT (2022) |
| Tài nguyên | Thư viện nội bộ tổ chức Education/Technology, nguồn PDF/web thật, hồ sơ năng lực, FAQ và hỗ trợ |
| Tin tức | Tin công ty, thương hiệu/sản phẩm, chính sách giáo dục. Tư liệu cũ ghi thời điểm, không gắn nhãn tin mới |
| Liên hệ | Địa chỉ theo prototype, link bản đồ, ba luồng biểu mẫu riêng |
| Trang hỗ trợ | Sơ đồ site, 404, chính sách/điều khoản có trạng thái chờ nội dung |

## Tính năng

- Mega-menu có độ trễ mở/đóng, nút mở bằng bàn phím, đóng bằng Escape hoặc bấm ngoài; thương hiệu chia tab.
- Menu điện thoại đi sâu từng danh mục, có Quay lại và Xem tất cả, khóa cuộn nền, giữ focus trong hộp thoại.
- Tìm kiếm bỏ dấu tiếng Việt và chuyển đ → d, Enter mở kết quả đầu, có trạng thái rỗng.
- Bộ lọc danh mục hoạt động: tất cả 9 / giáo dục 7 / công nghệ 2.
- Thư viện lọc Education/Technology, tìm tài liệu không dấu, liên kết PDF hoặc website nguồn.
- Biểu mẫu giữ các trường gốc: thông tin chung; báo giá có giải pháp/tỉnh thành; trải nghiệm có sản phẩm/hình thức/ngày; đại lý có khu vực/lĩnh vực; ghi chú từng form.
- Hash #yeu-cau-bao-gia mở tab báo giá, kể cả bấm lại liên kết trong cùng trang.
- Kiểm tra bắt buộc/email/điện thoại bằng trình duyệt; phản hồi rõ chưa gửi. Bản gốc cũng chưa có backend.
- FAQ mở/đóng, breadcrumb đầy đủ, sitemap, responsive cho bảng và thẻ nội dung.

## Phần cần dữ liệu thật

Chưa có endpoint/email tiếp nhận, bản tiếng Anh, hồ sơ năng lực IPPTech PDF, hồ sơ pháp lý/ủy quyền, danh sách đội ngũ, hotline/email xác nhận, số liệu trường/thiết bị/học sinh, dự án trường công cụ thể và thương hiệu 02/03.

Cruzr Edu và Walker S2 Edu chưa tìm được hồ sơ hãng riêng cho gói giáo dục. U1 trong danh mục chưa xác nhận cùng cấu hình U1 PRO. Website giữ đúng tên, dùng ảnh dòng tham khảo có chú thích, không áp dụng thông số thương mại sang gói Edu. Phân cấp AI Super Engineer khác nhau giữa catalogue quốc tế và chương trình FPT Việt Nam nên cần đối chiếu theo chương trình.

## Kiểm tra

- Next.js production build và TypeScript.
- Kiểm tra liên kết/ảnh của toàn bộ HTML đã xuất bằng scripts/check-links.mjs.
- Trình duyệt: trang chủ desktop 1440px và mobile 390px; menu thương hiệu, menu mobile bốn cấp/quay lại; tìm “dao tao” và Enter; lọc sản phẩm 7/2; thư viện tìm không dấu và lọc; biểu mẫu ba loại và báo giá hợp lệ; trang sản phẩm 1024px.

Các nguồn tham khảo được đặt ngay trên trang tương ứng và trong ASSETS.md. Không sửa thư mục prototype gốc.
