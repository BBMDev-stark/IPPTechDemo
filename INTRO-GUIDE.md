# Intro logo → video → tay robot kéo màn

## Trải nghiệm

- Khi tải mới website: logo UBTECH xuất hiện trên nền trắng ánh cyan; thời lượng 2,4 giây.
- Tiếp theo phát video toàn màn hình. Website phía dưới bị inert và khóa cuộn; không có menu hay liên kết website trên lớp video.
- Video kết thúc hoặc bấm Bỏ qua/Escape đều dùng chung chuyển cảnh: tay robot vươn vào, co ngón nắm mép trái, kéo màn che sang phải và để lộ website.
- Không tự lặp intro khi chuyển trang bằng các liên kết trong website. Tải lại trang sẽ phát lại; nút Xem lại intro ở footer cũng phát lại.
- Video mặc định tắt tiếng để hỗ trợ autoplay; có nút bật/tắt âm thanh. Nếu trình duyệt chặn tự phát, hiện nút Phát video. Nếu file không tải được, có Thử phát lại và Bỏ qua.
- Thiết bị không hỗ trợ WebGL dùng hình tay vector dự phòng. Người dùng bật giảm chuyển động được chuyển bằng fade nhẹ. Không có JavaScript thì bỏ lớp intro để vẫn xem được website.

## Thay media / thời lượng

| File | Công dụng |
|---|---|
| public/videos/intro-video-1.mp4 | Video intro; thay đúng tên này bằng MP4 H.264 phù hợp web, ưu tiên 1080p khoảng 8–20 giây |
| public/images/intro-img-1.jpg | Poster trong lúc tải video |
| public/images/common-logo-ubtech.png | Logo UBTECH dùng chung, gồm màn intro |
| src/lib/intro-config.ts | Đường dẫn và thời lượng logo/vươn tay/nắm/kéo |
| src/lib/intro-arm.ts | Mô hình 3D dựng bằng Three.js, các đốt ngón tay và vật liệu |
| src/components/intro-experience.tsx | Luồng phát, skip, lỗi video, focus, khóa cuộn và vector dự phòng |
| src/app/intro.css | Giao diện intro và responsive |

Sau khi thay file, chạy lại npm run build; npm start mở bản build. Khi dùng npm run dev, làm mới trình duyệt. Nếu chỉ thay video, không phải chỉnh thời lượng trong code: chuyển cảnh được kích hoạt bởi sự kiện ended của video mới.

Model tay là tài sản minh họa dựng bằng hình học 3D trong code, tham chiếu hình công khai của dòng Walker: vỏ sáng, khớp tối, bàn tay nhiều đốt. Không phải model CAD/GLB do UBTECH phát hành và không cam kết khớp thông số cơ khí thực tế. Chưa có file model OEM được cung cấp trong dự án.

## Nguồn tham khảo

- UBTECH Walker / cánh tay: https://www.ubtrobot.com/en/humanoid/products/walker
- UBTECH Walker S2 / hình thiết bị và video: https://www.ubtrobot.com/en/humanoid/products/walker-s2
- Video mẫu đang dùng, trích từ phần “Bend Free and Work Faster” trên trang hãng: https://owebsite-cdn.ubtrobot.com/resources/video/2025/07/22/700528073982021.mp4
- Phát video muted/playsinline và xử lý autoplay: https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Autoplay
- Mô hình/rendering: https://threejs.org/docs/

Video là tư liệu quảng bá mẫu của hãng, không phải phim riêng của IPPTech. Thay bằng video của khách hàng khi nhận được tư liệu chính thức.

## Kiểm tra thực tế

Đã thử trên Chromium desktop và viewport điện thoại 390 × 844: autoplay muted, bật âm thanh, bỏ qua, phát lại, kết thúc tự động, khóa cuộn/inert và giải phóng sau intro. Đã thử cố ý thiếu file video: hiện thông báo và vẫn bỏ qua được. Server tĩnh trả HTTP 206 đúng byte range cho MP4. Chưa kiểm thử trên thiết bị iPhone/Safari thật.
Nút **Tạm dừng / Tiếp tục** cạnh nút âm thanh cho phép dừng video và phát tiếp tại đúng thời điểm đang xem. Khi tạm dừng, màn intro vẫn khóa cuộn; nút **Bỏ qua** vẫn chạy hiệu ứng mở website.
