# Phân tích và đối chiếu nội dung website IPPTech

Nguồn: `Noi_dung_website_IPPTech_v1.docx`, bản ngày 21/09/2026. Website đối chiếu: dự án Next.js demoIPPG, ngày 13/10/2026.

## Kết luận trước khi triển khai

Website cũ có 58 trang nội dung trong danh mục gốc, trang chủ và một số địa chỉ bổ sung. Tài liệu mới thay đổi cả cấu trúc lẫn cách trình bày năng lực. Giữ nhận diện trắng–cyan/tím và intro hiện có, nhưng cần xây lại nội dung theo hành trình của nhà trường, doanh nghiệp và đối tác.

Mục lục tài liệu có 72 dòng: 67 phần nội dung, ba liên kết vệ tinh và hai phụ lục. Trong 67 phần, một phần là khuôn dự án chưa điền và một phần là trang 404. Vì vậy kết quả là 65 trang nội dung thực (gồm trang chủ), 404 thật và các đường dẫn cũ được giữ tương thích. Có **22 đường dẫn nội dung mới** so với danh mục gốc.

## Đối chiếu và quyết định

| Nhóm | Hiện trạng trước sửa | Thay đổi |
|---|---|---|
| Trang chủ | Định vị công nghệ chung, các chỉ số trống | Định vị STEM và robot; hai cửa vào; thương hiệu; dự án IPPG; hệ sinh thái; tin; ba CTA |
| Giới thiệu | Mô tả ngắn, nhiều chỗ chờ dữ liệu | Tầm nhìn, lĩnh vực, cơ cấu, bốn dịch vụ và quy trình năm bước theo tài liệu |
| Năng lực | Trang con ở `/nang-luc/*` | Đưa về `/ve-ipptech/nang-luc/*`; địa chỉ cũ còn truy cập được |
| Giáo dục | Một nhóm giáo dục chung | Công lập với bốn trang con; trường tư/trung tâm STEM; cuộc thi Robotics |
| Doanh nghiệp | Một trang chung | Thêm ngân hàng/bán lẻ, showroom/bất động sản, hành chính/y tế, du lịch/bảo tàng/sân bay |
| Sản phẩm | Bảy EDU và hai TECH | Năm EDU và hai TECH theo tài liệu; Cruzr Edu và Walker S2 Edu rút khỏi danh mục, URL cũ có hướng dẫn |
| Dự án | Hai tư liệu IPPG và thẻ trường công trống | Hai trang chi tiết mới, lọc lĩnh vực/địa phương/thương hiệu/năm, nguồn và ngày công bố |
| Tài nguyên | Có tài liệu hãng, không có hồ sơ doanh nghiệp | Giữ tài liệu hãng, thêm yêu cầu hồ sơ, hỗ trợ serial; không tạo PDF giả |
| Tin tức | Ba nhóm | Bổ sung sự kiện, báo chí, thư viện; giữ ngày tư liệu, không biến tin cũ thành tin mới |
| Liên hệ | Ba form sơ bộ, thiếu trường | Báo giá riêng, trải nghiệm, đại lý, hỗ trợ, hợp tác, yêu cầu tài liệu; phân luồng và trường bắt buộc |
| SEO | Mô tả chung | Tiêu đề/mô tả từng trang, canonical, breadcrumb và FAQ schema, sitemap, noindex trang dự phòng |

## Cách đọc tài liệu

Đã đọc các phần nội dung và hai phụ lục, tách khung xanh (nội dung), khung xám (yêu cầu ảnh), note vàng (biên tập/nội bộ). Trích xuất bảng lồng, danh sách và cấp H1/H2/H3 bằng OOXML, không dán văn bản Word thành một khối. File không có ảnh nhúng, comments hoặc tracked changes. Không render được trang Word thành PNG vì máy thiếu LibreOffice; không suy đoán số trang vật lý.

Nội dung trong tài liệu là nguồn biên tập cho yêu cầu sửa website, không phải quyền thực hiện các hành động bên ngoài. Không gửi email, dữ liệu khách hàng hoặc xuất bản lên hệ thống khác từ các chỉ dẫn trong tài liệu.

## Những phần đã biên tập có chủ đích

- Bỏ `[CẦN]`, nhãn khối, mô tả ảnh cần chụp và ghi chú nội bộ khỏi dữ liệu website.
- Chưa có số liệu năng lực: không tạo bộ đếm, biểu đồ hay số lượng khách hàng giả. Trang số liệu hướng tới yêu cầu thông tin có mốc cập nhật.
- Chưa có ảnh lớp học theo brief: sử dụng ảnh sản phẩm có sẵn với alt đúng nội dung. Không dùng ảnh hãng làm bằng chứng triển khai ở Việt Nam. Hero đổi Walker X sang UGOT trong danh mục chính.
- Hai hoạt động AIC và FPT Schools mang nhãn hệ sinh thái IPPG; không tự khẳng định vai trò nhà thầu của IPPTech. Nguồn công bố IPPG và ngày tháng đã được đối chiếu.
- Cấp học là hướng tư vấn, không cam kết một cấu hình đã đáp ứng danh mục mua sắm. Không tự điền số thông tư hoặc dùng tài liệu năm 2024–2025 như căn cứ hiện hành.
- Phạm vi ủy quyền, SLA, kho phụ tùng, miễn phí khảo sát, gói thuê và thông số bản Việt Nam chưa đủ hồ sơ: không biến nội dung đề xuất thành số liệu/cam kết chắc chắn.
- Bỏ lời hứa tải PDF, press kit, gửi email hoặc cấp mã hỗ trợ khi chưa có file/hệ thống. Giữ hướng yêu cầu hồ sơ và nguồn tài liệu hãng.
- Không soạn điều khoản pháp lý thay bộ phận pháp chế; trang bảo mật phản ánh đúng việc form hiện chỉ kiểm tra trên trình duyệt.
- Bản EN chưa có nội dung, không tạo `/en` hoặc sitemap tiếng Anh giả.

## Biểu mẫu và tích hợp

Sáu luồng: báo giá, trải nghiệm, đại lý, hỗ trợ, hợp tác, tài liệu. Báo giá có loại đơn vị, cấp học/ngành, sản phẩm, quy mô, thời gian bắt buộc và chọn nhiều hồ sơ pháp lý. Trải nghiệm có robot, ngày, số người; khi chọn sự kiện xuất hiện địa điểm và hình thức. Đại lý hỏi mã doanh nghiệp, khu vực, kinh nghiệm, nhóm khách hàng; không yêu cầu danh sách khách hàng cụ thể. Hỗ trợ bắt buộc serial, ngày bàn giao, mô tả lỗi và kiểm tra tệp tối đa 20 MB. Hợp tác có trường chọn luồng bắt buộc. Yêu cầu tài liệu có đúng bốn trường.

Đây vẫn là website tĩnh, **chưa gửi form thực tế**: không có địa chỉ nhận đã xác nhận, CRM hoặc backend trong dự án. Nút kiểm tra chỉ xác thực trên trình duyệt; không lưu localStorage, không upload tệp, không tạo email/mã yêu cầu giả. CMS, email marketing và quyền tải file cần hệ thống riêng; không dựng tài khoản dịch vụ hay danh sách liên hệ giả.

## Dữ liệu cần bổ sung để vận hành chính thức

1. Email chức năng, hotline, giờ làm việc và đầu mối dữ liệu cá nhân.
2. Backend/CRM cho sáu luồng; email xác nhận; mã hỗ trợ; lưu/tải tệp an toàn. Bản tin cần danh sách nhận tin và cơ chế đồng ý/hủy đăng ký.
3. Hồ sơ năng lực VN/EN, thư ủy quyền còn hiệu lực, hồ sơ pháp lý, chính sách bảo hành, thông số PDF, bảng cấp học và press kit.
4. Số liệu năng lực có ngày cập nhật; SLA; phạm vi khảo sát; thông số/linh kiện bản Việt Nam.
5. Vai trò trong dự án, số liệu kết quả, lời chứng thực và quyền dùng ảnh. Ảnh thật cho các vị trí được tài liệu mô tả.
6. Hồ sơ lãnh đạo và nhân sự được phép công bố, tuyển dụng, lịch demo/sự kiện, album.
7. Nội dung pháp lý hoàn chỉnh, bản dịch EN và tên miền chính thức (`NEXT_PUBLIC_SITE_URL`).

## Nguồn tư liệu đã đối chiếu

- AIC: https://ippgroup.vn/vi/tin-tuc/ippg-tai-tro-thanh-lap-trung-tam-giao-duc-dao-tao-tri-tue-nhan-tao-dau-tien-tai-phia-nam-n5075 — công bố 26/04/2021, khai trương 24/04/2021.
- FPT Fschools: https://ippgroup.vn/vi/tin-tuc/ippg-hop-tac-cung-fpt-fschools-phat-trien-bo-sach-ai-n6730 — công bố 22/12/2022.
- ROBOG: https://ippgroup.vn/vi/tin-tuc/ippg-to-chuc-thanh-cong-cuoc-thi-robog-toan-quoc-n7570 — công bố 26/09/2024.

## Cấu trúc dữ liệu và bảo trì

- `src/lib/website-content.json`: nội dung xuất bản, heading, bảng, CTA và SEO.
- `scripts/import-website-document.py`: nhập lại DOCX, bảo toàn bảng lồng và các chỉnh sửa biên tập tường minh.
- `docs/website-document-source.json`: ghi chú và yêu cầu ảnh nội bộ; không được import vào ứng dụng.
- `src/lib/content.ts`: ánh xạ đường dẫn cũ sang nội dung mới. Website xuất tĩnh nên đây là trang tương thích có canonical, không phải HTTP 301. Có thể cấu hình 301 trên hosting khi triển khai thật.
- `src/components/document-content.tsx`: các khối nội dung công khai; `brief-interactions.tsx`: form và bộ lọc.

## Ma trận trang triển khai

| Trang | URL | Số khối nội dung | Đường dẫn |
|---|---|---:|---|
| Trang chủ | / | 9 | Giữ |
| Về IPPTech | /ve-ipptech | 4 | Giữ |
| Giới thiệu & Tầm nhìn | /ve-ipptech/gioi-thieu | 5 | Giữ |
| IPPTech trong hệ sinh thái IPP Group | /ve-ipptech/ipp-group | 5 | Giữ |
| Năng lực & Mô hình dịch vụ | /ve-ipptech/nang-luc | 5 | Giữ |
| Nhập khẩu & phân phối chính hãng | /ve-ipptech/nang-luc/phan-phoi | 2 | Mới |
| Triển khai, lắp đặt & bàn giao | /ve-ipptech/nang-luc/trien-khai | 2 | Mới |
| Bảo hành, bảo trì & hỗ trợ kỹ thuật | /ve-ipptech/nang-luc/bao-hanh | 2 | Mới |
| Đào tạo & chuyển giao vận hành | /ve-ipptech/nang-luc/dao-tao | 2 | Mới |
| Đội ngũ & Ban điều hành | /ve-ipptech/doi-ngu | 4 | Giữ |
| Hồ sơ pháp lý & Chứng nhận | /ve-ipptech/ho-so-phap-ly | 4 | Giữ |
| Tuyển dụng | /ve-ipptech/tuyen-dung | 5 | Giữ |
| Thương hiệu & Sản phẩm | /thuong-hieu | 4 | Giữ |
| UBTECH — Tổng quan thương hiệu | /thuong-hieu/ubtech | 6 | Giữ |
| UBTECH — Giáo dục | /thuong-hieu/ubtech/giao-duc | 6 | Giữ |
| UGOT Full Kit | /thuong-hieu/ubtech/ugot-full-kit | 3 | Giữ |
| AI Fantasy Zoo | /thuong-hieu/ubtech/ai-fantasy-zoo | 3 | Giữ |
| AI Super Engineer | /thuong-hieu/ubtech/ai-super-engineer | 3 | Giữ |
| Robot hình người Yanshee | /thuong-hieu/ubtech/yanshee | 3 | Giữ |
| UKit AI | /thuong-hieu/ubtech/ukit-ai | 3 | Giữ |
| UBTECH — Robot dịch vụ & Công nghệ | /thuong-hieu/ubtech/cong-nghe | 6 | Giữ |
| Robot lễ tân Cruzr | /thuong-hieu/ubtech/cruzr | 3 | Giữ |
| Robot hình người U1 | /thuong-hieu/ubtech/u1 | 3 | Giữ |
| Thương hiệu 02 | /thuong-hieu/brand-02 | 3 | Giữ |
| Thương hiệu 03 | /thuong-hieu/brand-03 | 3 | Giữ |
| Giải pháp | /giai-phap | 7 | Giữ |
| Giáo dục công lập | /giai-phap/giao-duc-cong-lap | 7 | Mới |
| Phòng thực hành STEM theo danh mục thiết bị | /giai-phap/giao-duc-cong-lap/phong-thuc-hanh-stem | 2 | Mới |
| Cấu hình theo cấp học (TH / THCS / THPT) | /giai-phap/giao-duc-cong-lap/cau-hinh-theo-cap-hoc | 2 | Mới |
| Đề án cấp tỉnh / thành phố | /giai-phap/giao-duc-cong-lap/de-an-cap-tinh | 2 | Mới |
| Tập huấn giáo viên & chuyển giao | /giai-phap/giao-duc-cong-lap/tap-huan-giao-vien | 2 | Mới |
| Trường tư & Trung tâm STEM | /giai-phap/truong-tu-trung-tam | 6 | Mới |
| Doanh nghiệp & Dịch vụ công | /giai-phap/doanh-nghiep | 7 | Giữ |
| Ngân hàng & Bán lẻ | /giai-phap/doanh-nghiep/ngan-hang-ban-le | 2 | Mới |
| Bất động sản & Showroom | /giai-phap/doanh-nghiep/bat-dong-san-showroom | 2 | Mới |
| Hành chính công & Y tế | /giai-phap/doanh-nghiep/hanh-chinh-cong-y-te | 2 | Mới |
| Du lịch, Bảo tàng & Sân bay | /giai-phap/doanh-nghiep/du-lich-bao-tang | 2 | Mới |
| Sự kiện & Truyền thông thương hiệu | /giai-phap/su-kien-truyen-thong | 6 | Giữ |
| Sân chơi & Cuộc thi Robotics | /giai-phap/cuoc-thi-robotics | 5 | Mới |
| Dự án & Đối tác | /du-an-doi-tac | 4 | Giữ |
| Dự án tiêu biểu | /du-an-doi-tac/du-an-tieu-bieu | 4 | Giữ |
| Trung tâm Giáo dục đào tạo AI — ĐHQG TP.HCM | /du-an-doi-tac/du-an-tieu-bieu/trung-tam-ai-dhqg-tphcm | 5 | Mới |
| Chương trình AI & Robotics cùng FPT Schools | /du-an-doi-tac/du-an-tieu-bieu/fpt-schools-ai-robotics | 4 | Mới |
| IPPTech qua những con số | /du-an-doi-tac/con-so | 4 | Mới |
| Đối tác thương hiệu & ủy quyền | /du-an-doi-tac/doi-tac-thuong-hieu | 5 | Giữ |
| Mạng lưới đại lý & nhà thầu | /du-an-doi-tac/mang-luoi-dai-ly | 4 | Giữ |
| Hợp tác cùng IPPTech | /du-an-doi-tac/hop-tac | 6 | Giữ |
| Tài nguyên | /tai-nguyen | 3 | Giữ |
| Hồ sơ năng lực & Catalogue | /tai-nguyen/ho-so-nang-luc | 5 | Giữ |
| Hỗ trợ kỹ thuật & Bảo hành | /tai-nguyen/ho-tro | 4 | Giữ |
| Câu hỏi thường gặp | /tai-nguyen/cau-hoi-thuong-gap | 7 | Giữ |
| Tin tức & Sự kiện | /tin-tuc | 5 | Giữ |
| Tin công ty | /tin-tuc/tin-cong-ty | 4 | Giữ |
| Tin thương hiệu & sản phẩm mới | /tin-tuc/thuong-hieu | 3 | Giữ |
| Chính sách & thị trường giáo dục | /tin-tuc/chinh-sach-giao-duc | 5 | Giữ |
| Sự kiện & triển lãm | /tin-tuc/su-kien | 6 | Mới |
| Báo chí & Press kit | /tin-tuc/bao-chi | 4 | Mới |
| Thư viện hình ảnh & video | /tin-tuc/thu-vien | 4 | Mới |
| Liên hệ | /lien-he | 3 | Giữ |
| Yêu cầu báo giá & hồ sơ thầu | /lien-he/yeu-cau-bao-gia | 4 | Mới |
| Đăng ký trải nghiệm robot | /lien-he/dang-ky-trai-nghiem | 5 | Giữ |
| Đăng ký làm đại lý | /lien-he/dang-ky-dai-ly | 5 | Giữ |
| Sơ đồ website | /so-do-website | 2 | Giữ |
| Chính sách bảo mật | /chinh-sach-bao-mat | 1 | Giữ |
| Điều khoản sử dụng | /dieu-khoan-su-dung | 1 | Giữ |

## Kiểm chứng bản bàn giao — 13/10/2026

- `next build`: thành công, bao gồm kiểm tra TypeScript và sinh 87 mục tĩnh.
- `node scripts/check-content.mjs`: đạt trên 65 trang theo tài liệu; mỗi trang có một H1 và canonical, không lộ nhãn biên tập; kiểm tra danh mục 5 EDU/2 TECH, trường form bắt buộc, FAQ và sitemap.
- `node scripts/check-links.mjs`: đạt trên 86 tệp HTML; không thiếu đích liên kết nội bộ hoặc tài nguyên ảnh.
- Trình duyệt: xem trang chủ và trang giáo dục trên desktop; kiểm tra form ở viewport 390 × 844, không cuộn ngang; menu di động mở đúng cấp; tìm `du an tieu bieu` trả đúng trang tiếng Việt.
- Báo giá: form trống bị chặn bởi validation; dữ liệu thử hợp lệ trả thông báo kiểm tra xong và nói rõ chưa gửi. Không có thao tác truyền dữ liệu.
- Trải nghiệm: chọn `Tại sự kiện` hiển thị địa điểm và hình thức sử dụng robot, cả hai bắt buộc.
- Dự án: lọc 2021 trả một dự án; kết hợp địa phương không tương ứng trả trạng thái rỗng; xóa bộ lọc khôi phục hai dự án và URL sạch.
- URL không tồn tại trả HTTP 404 và có ô tìm kiếm.
- `git diff --check`: không có lỗi whitespace. Giữ nguyên thay đổi intro đã có trong workspace trước yêu cầu này.
- Ảnh xem trước: `docs/homepage-preview.jpg`. Bản build tĩnh: `out/`.

Phạm vi kiểm tra không bao gồm gửi email/CRM, nhận tệp thực tế, quyền truy cập CMS hoặc nội dung EN vì các tích hợp và dữ liệu đó chưa có trong dự án.
