"""Extract only blue publication panels from the approved content brief.

Usage: bundled-python scripts/import-website-document.py path/to/brief.docx
Notes, image briefs and missing-data requests stay in docs/, outside the app.
Editorial corrections for unavailable assets/services are explicit below.
"""
import json
import re
import sys
from pathlib import Path
from zipfile import ZipFile
from lxml import etree

NS = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
ROOT = Path(__file__).resolve().parents[1]

def txt(n):
    return ''.join(n.xpath('.//w:t/text()', namespaces=NS)).strip()

def elements(cell):
    result = []
    for n in cell:
        if n.tag.endswith('}p') and txt(n):
            result.append({'text': txt(n), 'list': bool(n.xpath('./w:pPr/w:numPr|./w:pPr/w:pStyle[@w:val="ListParagraph"]', namespaces=NS))})
        elif n.tag.endswith('}tbl'):
            result.append({'table': [[txt(c) for c in r.xpath('./w:tc', namespaces=NS)] for r in n.xpath('./w:tr', namespaces=NS)]})
    return result

with ZipFile(sys.argv[1]) as z:
    root = etree.fromstring(z.read('word/document.xml'))
pages = []
page = None
for n in root.xpath('//w:body/*', namespaces=NS):
    if n.xpath('./w:pPr/w:pStyle[@w:val="Heading1"]', namespaces=NS):
        page = {'title': txt(n), 'url': '', 'seo': {}, 'blocks': [], 'notes': [], 'images': []}
        pages.append(page)
    elif page is not None:
        if n.tag.endswith('}p') and txt(n).startswith('URL:'):
            page['url'] = txt(n)[4:].strip()
        elif n.tag.endswith('}tbl'):
            fills = n.xpath('./w:tr/w:tc/w:tcPr/w:shd/@w:fill', namespaces=NS)
            cells = n.xpath('./w:tr/w:tc', namespaces=NS)
            if 'E8F0FE' in fills:
                page['blocks'].append([item for c in cells for item in elements(c)])
            elif 'FFF2CC' in fills:
                page['notes'].append(txt(n))
            elif 'F1F3F4' in fills:
                page['images'].append([txt(p) for p in n.xpath('.//w:p', namespaces=NS)])
            elif any(txt(c) == 'Từ khóa chính' for c in cells):
                for row in n.xpath('./w:tr', namespaces=NS):
                    cs = row.xpath('./w:tc', namespaces=NS)
                    if len(cs) == 2:
                        page['seo'][txt(cs[0])] = '\n'.join(txt(p) for p in cs[1].xpath('.//w:p', namespaces=NS))

(ROOT / 'docs').mkdir(exist_ok=True)
(ROOT / 'docs/website-document-source.json').write_text(json.dumps(pages, ensure_ascii=False, indent=2), encoding='utf-8')

def P(text): return {'text': text}
def block(heading, *body): return [P('H2  ' + heading), *[P(t) for t in body]]

# Blocks that need a real file, data, an integration, or a verified claim get
# useful publication copy instead of exposing the editorial placeholders.
replacements = {
    (4, 5): block('Trao đổi với đội ngũ kỹ thuật', '[Nút: Liên hệ tư vấn → /lien-he]'),
    (1, 4): block('Hồ sơ năng lực công ty', 'Trao đổi với IPPTech để nhận hồ sơ phù hợp với mục đích thẩm định hoặc hợp tác.', '[Nút: Xem tài liệu và yêu cầu hồ sơ → /tai-nguyen/ho-so-nang-luc]'),
    (3, 3): block('Nền tảng từ tập đoàn', 'IPPTech kết nối kinh nghiệm về chuỗi cung ứng, quan hệ đối tác quốc tế và vận hành của IPPG với lĩnh vực công nghệ và giáo dục.'),
    (9, 0): [P('H1  Đội ngũ IPPTech'), P('Đội ngũ IPPTech trực tiếp tư vấn, khảo sát, lắp đặt, tập huấn và hỗ trợ vận hành cho nhà trường và doanh nghiệp.')],
    (9, 4): block('Kết nối với đội ngũ', '[Nút: Cơ hội nghề nghiệp → /ve-ipptech/tuyen-dung]', '[Nút: Liên hệ IPPTech → /lien-he]'),
    (10, 0): [P('H1  Hồ sơ pháp lý và chứng nhận'), P('Tìm hiểu các hồ sơ phục vụ thẩm định nhà cung cấp và chuẩn bị hồ sơ mua sắm. Bản có dấu, thời hạn và phạm vi áp dụng được đối chiếu theo yêu cầu của từng đơn vị.')],
    (10, 1): block('Danh mục hồ sơ theo yêu cầu', 'Giấy chứng nhận đăng ký doanh nghiệp; thư ủy quyền còn hiệu lực; chứng nhận xuất xứ và chất lượng theo lô hàng; chính sách bảo hành; hồ sơ năng lực công ty.', 'Liên hệ để xác nhận phiên bản, phạm vi và khả năng cung cấp từng tài liệu.', '[Nút: Yêu cầu hồ sơ thầu → /lien-he/yeu-cau-bao-gia]'),
    (10, 2): block('Cách sử dụng hồ sơ', 'Đối chiếu tên pháp nhân, thời hạn hiệu lực, phạm vi sản phẩm và lô hàng trong từng hồ sơ. Bản sao y, bản có dấu hoặc bản dịch được trao đổi theo yêu cầu của bên mời thầu.'),
    (10, 3): None,
    (11, 2): block('Cơ hội ứng tuyển', 'Các vị trí tuyển dụng được cập nhật khi có thông báo chính thức.', '[Nút: Theo dõi tuyển dụng IPP Group ↗ → https://ippgroup.vn]'),
    (11, 4): block('Tìm hiểu cơ hội nghề nghiệp', 'Theo dõi thông báo tuyển dụng để biết yêu cầu công việc, cách gửi hồ sơ và quy trình phỏng vấn.', '[Nút: Theo dõi IPP Group ↗ → https://ippgroup.vn]'),
    (12, 0): [P('H1  Thương hiệu robot giáo dục và robot dịch vụ'), P('IPPTech phát triển danh mục thương hiệu công nghệ giáo dục và robot, kết hợp phân phối, triển khai và dịch vụ sau bán hàng tại Việt Nam. Khám phá các sản phẩm UBTECH hiện có và cơ hội hợp tác thương hiệu mới.')],
    (13, 4): block('Từ thiết bị đến ứng dụng', 'Danh mục UBTECH kết nối học cụ lắp ráp, lập trình và robot hình người với những mục tiêu học tập khác nhau. Phần mềm và học liệu được lựa chọn theo từng sản phẩm.', 'IPPTech đồng hành khảo sát tại chỗ, thiết kế nội dung tương tác, tập huấn và hỗ trợ vận hành trong nước.'),
    (20, 3): block('Lựa chọn cấu hình vận hành', 'Thời lượng pin, ngôn ngữ hỗ trợ và nền tảng quản trị được xác nhận trên phiên bản đề xuất cho từng dự án. Quý đơn vị có thể kiểm tra các yêu cầu này trong buổi trải nghiệm.'),
    (23, 1): block('Quy trình trở thành thương hiệu đối tác', 'Trao đổi về sản phẩm và thị trường mục tiêu; đánh giá nhu cầu tại Việt Nam; thống nhất phạm vi phân phối; chuẩn bị nội dung và đào tạo trước khi ra mắt.'),
    (24, 2): block('Đối tác robot mới nhận được gì', 'IPPTech kết nối phân phối với khảo sát, xây dựng kịch bản, đào tạo người vận hành và hỗ trợ kỹ thuật tại Việt Nam.', '[Nút: Đề xuất hợp tác → /du-an-doi-tac/hop-tac]'),
    (26, 0): [P('H1  Thiết bị STEM cho trường học công lập'), P('IPPTech tư vấn phòng thực hành STEM, cấu hình theo cấp học và tập huấn giáo viên. Hồ sơ kỹ thuật được chuẩn bị để quý đơn vị đối chiếu với yêu cầu của từng dự án mua sắm.'), P('[Nút: Nhận dự toán chi tiết → /lien-he/yeu-cau-bao-gia]')],
    (26, 1): block('Đối chiếu yêu cầu của từng dự án', 'Việc lựa chọn thiết bị cần căn cứ mục tiêu học tập, danh mục áp dụng và hồ sơ mua sắm của quý đơn vị. IPPTech trao đổi các yêu cầu này trước khi đề xuất cấu hình.', '[Nút: Trao đổi về hồ sơ kỹ thuật → /lien-he/yeu-cau-bao-gia]'),
    (26, 4): block('Hồ sơ hỗ trợ lập đề án', 'Trao đổi nhu cầu về thuyết minh đề án, danh mục kỹ thuật, kế hoạch tập huấn và dự toán. Phạm vi tài liệu được xác nhận theo từng yêu cầu; dự toán trao đổi riêng với đơn vị.', '[Nút: Tìm hiểu hỗ trợ đề án → /giai-phap/giao-duc-cong-lap/de-an-cap-tinh]'),
    (32, 2): block('Từ bài toán đến kịch bản robot', 'Khách cần hướng dẫn: robot chào đón, tiếp nhận nhu cầu và chỉ đường.', 'Câu hỏi lặp lại: robot hỏi đáp theo nội dung do đơn vị thống nhất.', 'Khách quốc tế: lựa chọn khả năng ngôn ngữ theo phiên bản robot.', 'Chỉ số đánh giá được thống nhất trước khi thử nghiệm và đo trong điều kiện vận hành thực tế.'),
    (37, 2): block('Quy mô dịch vụ theo sự kiện', 'Phương án được xây dựng từ số ngày, số robot, địa điểm, nội dung trình diễn và nhu cầu kỹ thuật viên tại chỗ. Hạng mục cung cấp và chi phí được xác nhận trong báo giá riêng.', '[Nút: Nhận báo giá gói sự kiện → /lien-he/yeu-cau-bao-gia]'),
    (37, 3): block('Tư liệu và trải nghiệm', '[Nút: Xem thư viện tư liệu → /tin-tuc/thu-vien]'),
    (38, 4): block('Thể lệ và đăng ký ROBOG', '[Nút: Theo dõi thông tin mùa thi trên ROBOG ↗ → https://robog.edu.vn]'),
    (39, 0): [P('H1  Dự án và hệ sinh thái hợp tác'), P('Khám phá các hoạt động AI & Robotics đã được IPPG công bố và các hướng hợp tác với IPPTech dành cho thương hiệu, đại lý và nhà trường.')],
    (39, 1): block('Tìm hiểu năng lực IPPTech', 'Trao đổi về phạm vi triển khai và thông tin năng lực phục vụ hồ sơ của quý đơn vị.', '[Nút: Thông tin về số liệu năng lực → /du-an-doi-tac/con-so]'),
    (40, 0): [P('H1  Dự án AI & Robotics trong hệ sinh thái IPPG'), P('Tham khảo Trung tâm Giáo dục đào tạo AI tại ĐHQG TP.HCM và chương trình hợp tác cùng FPT Schools. Mỗi dự án dẫn tới nguồn công bố và mốc thời gian để quý đơn vị đối chiếu.')],
    (40, 3): block('Tìm hướng triển khai phù hợp', 'Bắt đầu từ bối cảnh, mục tiêu, điều kiện mặt bằng và năng lực vận hành của đơn vị. Đội ngũ IPPTech cùng quý vị trao đổi cấu hình, kế hoạch đào tạo và tiêu chí đánh giá.'),
    (42, 0): [P('H1  Trung tâm AI ĐHQG TP.HCM'), P('Dự án trong hệ sinh thái IPPG · TP.HCM · 2021'), P('Trung tâm Giáo dục đào tạo AI đặt tại Khu công nghệ phần mềm, ĐHQG TP.HCM, khai trương ngày 24/04/2021.')],
    (43, 3): block('Tìm hiểu chương trình tương tự', '[Nút: Yêu cầu tư vấn → /lien-he/yeu-cau-bao-gia]'),
    (44, 0): [P('H1  IPPTech qua những con số'), P('Số liệu năng lực được cung cấp cùng mốc cập nhật và phạm vi thống kê. Quý đơn vị có thể yêu cầu bộ thông tin phù hợp với hồ sơ thẩm định hoặc đề xuất hợp tác.')],
    (44, 1): block('Thông tin năng lực theo yêu cầu', 'Bộ số liệu tổng hợp chưa được công bố tại đây. Để đối chiếu thông tin về trường học, địa phương, thiết bị và hoạt động đào tạo, vui lòng trao đổi với IPPTech.', '[Nút: Yêu cầu thông tin năng lực → /lien-he/yeu-cau-bao-gia]'),
    (44, 2): None,
    (44, 4): block('Trích dẫn có mốc thời gian', 'Khi sử dụng số liệu, vui lòng giữ nguyên nguồn, thời điểm cập nhật và phạm vi thống kê trong hồ sơ được cung cấp.', '[Nút: Thông tin dành cho báo chí → /tin-tuc/bao-chi]'),
    (45, 0): [P('H1  Đối tác thương hiệu và hồ sơ ủy quyền'), P('IPPTech kết nối sản phẩm UBTECH với dịch vụ tư vấn, triển khai, đào tạo và hỗ trợ tại Việt Nam. Phạm vi ủy quyền và thời hạn hiệu lực được đối chiếu trên hồ sơ hiện hành.')],
    (45, 1): block('UBTECH Robotics', 'Giáo dục AI & Robotics và robot dịch vụ là hai nhóm sản phẩm trong danh mục. Liên hệ để đối chiếu hồ sơ phù hợp với nhu cầu của quý đơn vị.', '[Nút: Hồ sơ pháp lý và chứng nhận → /ve-ipptech/ho-so-phap-ly]'),
    (45, 3): block('Cách đối chiếu hồ sơ phân phối', 'Yêu cầu thư ủy quyền còn hiệu lực, kiểm tra tên pháp nhân và phạm vi sản phẩm, sau đó đối chiếu chứng từ nguồn gốc của lô hàng cụ thể.'),
    (47, 2): block('Quy trình trao đổi', 'Chuẩn bị đề xuất và chọn nhóm hợp tác phù hợp. Hai bên trao đổi mục tiêu, năng lực và phạm vi trước khi thống nhất bước tiếp theo.'),
    (49, 0): [P('H1  Hồ sơ năng lực IPPTech và catalogue'), P('Tìm tài liệu giới thiệu sản phẩm, hồ sơ phục vụ thẩm định và thông tin kỹ thuật. Các tài liệu riêng của IPPTech được cung cấp theo phạm vi và phiên bản phù hợp với yêu cầu của quý đơn vị.')],
    (49, 1): block('Tài liệu cần trao đổi với IPPTech', 'Hồ sơ năng lực tiếng Việt/tiếng Anh, catalogue tiếng Việt, bảng thông số theo cấu hình cung cấp, bảng đối chiếu cấp học và bộ số liệu năng lực hiện chưa có bản tải công khai tại đây.'),
    (49, 2): block('Chọn đúng loại tài liệu', 'Hồ sơ năng lực: phục vụ thẩm định nhà cung cấp và đề xuất hợp tác.', 'Catalogue: tìm hiểu sản phẩm và mục tiêu sử dụng.', 'Thông số và bảng đối chiếu: trao đổi để xây dựng danh mục kỹ thuật theo yêu cầu của đơn vị.'),
    (50, 0): [P('H1  Hỗ trợ kỹ thuật robot và bảo hành'), P('Chuẩn bị thông tin thiết bị và mô tả sự cố để trao đổi với đội ngũ kỹ thuật. Quý vị có thể tra hướng dẫn sản phẩm tại cổng tài liệu UBTECH Việt Nam.')],
    (50, 1): None,
    (50, 3): block('Các bước xử lý kỹ thuật', 'Tiếp nhận thông tin thiết bị và mô tả sự cố.', 'Chẩn đoán từ xa, hướng dẫn kiểm tra theo phiên bản.', 'Thống nhất phương án sửa chữa tại chỗ hoặc gửi thiết bị.', 'Kiểm tra lại hoạt động và ghi nhận kết quả xử lý.'),
    (52, 1): None,
    (52, 3): block('Lịch trải nghiệm', 'Đặt lịch để trao đổi về robot và thời gian trải nghiệm phù hợp với đơn vị.', '[Nút: Đăng ký trải nghiệm → /lien-he/dang-ky-trai-nghiem]'),
    (52, 4): block('Bản tin và báo chí', '[Nút: Thông tin dành cho báo chí → /tin-tuc/bao-chi]'),
    (55, 2): block('Tra cứu nguồn chính thức', 'Khi lập kế hoạch, quý đơn vị cần đối chiếu số hiệu văn bản, thời điểm hiệu lực và phạm vi áp dụng tại nguồn ban hành.', '[Nút: Cổng thông tin Bộ GD&ĐT ↗ → https://moet.gov.vn]', '[Nút: Cổng thông tin Chính phủ ↗ → https://chinhphu.vn]'),
    (55, 4): block('Tư vấn hồ sơ kỹ thuật', 'Trao đổi về mục tiêu học tập, điều kiện phòng học và yêu cầu hồ sơ của đề án.', '[Nút: Hỗ trợ xây dựng đề án → /giai-phap/giao-duc-cong-lap/de-an-cap-tinh]'),
    (56, 1): block('Đặt lịch trải nghiệm', 'Lịch và địa điểm được trao đổi theo nhu cầu của đơn vị.', '[Nút: Đăng ký trải nghiệm → /lien-he/dang-ky-trai-nghiem]'),
    (57, 0): [P('H1  Báo chí và thông tin IPPTech'), P('Thông tin dành cho nhà báo, đơn vị truyền thông và đối tác. Liên hệ để nhận nội dung giới thiệu công ty và tư liệu phù hợp với mục đích sử dụng.')],
    (57, 2): block('Yêu cầu tư liệu truyền thông', 'Trao đổi với IPPTech về logo, hình ảnh và nội dung giới thiệu cần sử dụng. Bộ press kit hiện chưa có file tải công khai.', '[Nút: Liên hệ truyền thông → /lien-he]'),
    (57, 5): block('Sử dụng tư liệu', 'Vui lòng trao đổi về nguồn và phạm vi sử dụng trước khi đăng lại hình ảnh, logo hoặc tư liệu truyền thông.'),
    (58, 0): [P('H1  Thư viện hình ảnh và video'), P('Tham khảo tư liệu về hoạt động AI & Robotics trong hệ sinh thái IPPG. Thông tin nguồn và thời điểm công bố được giữ cùng hình ảnh.')],
    (58, 1): None,
    (58, 3): None,
    (58, 4): block('Trải nghiệm trực tiếp', 'Đặt lịch xem robot và trao đổi với kỹ thuật viên về tình huống sử dụng của đơn vị.', '[Nút: Đăng ký trải nghiệm → /lien-he/dang-ky-trai-nghiem]'),
    (60, 0): [P('H1  Yêu cầu báo giá thiết bị STEM và hồ sơ thầu'), P('Chuẩn bị thông tin về đơn vị, cấp học hoặc ngành, sản phẩm, quy mô và mốc thời gian để trao đổi cấu hình và hồ sơ phù hợp.')],
    (60, 4): block('Thông tin cần thống nhất', 'Cấu hình, danh mục hồ sơ đi kèm, kế hoạch triển khai và thời hạn hiệu lực được xác nhận trong báo giá riêng.'),
    (63, 0): [P('H1  Sơ đồ website IPPTech'), P('Khám phá các trang nội dung theo bảy chuyên mục chính và ba cổng vệ tinh của IPPTech.')],
    (64, 0): [P('H1  Thông tin về dữ liệu trên bản xem thử'), P('Biểu mẫu hiện chỉ kiểm tra thông tin trong trình duyệt. Thông tin chưa được gửi đến IPPTech, chưa lưu vào CRM và không được công khai trên website.'), P('Chính sách bảo mật đầy đủ và đầu mối xử lý yêu cầu dữ liệu sẽ được cung cấp trước khi hệ thống tiếp nhận thông tin được đưa vào sử dụng.')],
    (65, 0): [P('H1  Thông tin sử dụng website'), P('Thông tin sản phẩm dùng để tham khảo. Phiên bản, cấu hình và phạm vi dịch vụ cuối cùng được xác nhận trong hồ sơ cung cấp.'), P('Nhãn hiệu và tư liệu sản phẩm thuộc các chủ sở hữu tương ứng. Vui lòng trao đổi về quyền sử dụng trước khi đăng lại.'), P('Điều khoản sử dụng đầy đủ sẽ được công bố khi hoàn tất nội dung chính thức.')],
}

# These panels are replaced by interactive React components at the same place.
widgets = {(12,1):'brands', (14,1):'education', (14,2):'products-edu', (20,1):'products-tech',
 (25,2):'needs', (26,2):'levels', (39,2):'projects', (40,1):'project-filter', (40,2):None,
 (48,1):'gateways', (49,3):'resources-form', (50,2):'support-form',
 (53,3):'news-company', (54,1):None, (54,3):'news-brand', (56,5):'news-event',
 (59,2):'contact-routing', (60,1):'quote-form', (61,4):'demo-form', (62,2):'dealer-form'}

def clean_nodes(raw):
    result=[]
    for item in raw:
        if 'table' in item:
            rows=item['table']
            rows=[rows[0]] + [r for r in rows[1:] if not any('[CẦN:' in c for c in r)]
            if len(rows)>1: result.append({'type':'table','rows':rows})
            continue
        text=item['text'].strip()
        if not text or re.match(r'^(HERO|KHỐI|NHÓM|ĐẦU TRANG|NỘI DUNG$|EDU$|TECH$)',text): continue
        if '[CẦN:' in text or (text.startswith('[') and not text.startswith('[Nút:')): continue
        # Promises involving unavailable downloadable files or integrations.
        if any(t in text for t in ['gương mặt dưới đây','Biểu đồ số trường','Cây liên kết','/en/sitemap','Lọc theo:', 'Tab:', 'Thương hiệu: Tất cả','Dòng: Giáo dục', 'cùng khuôn với UBTECH','mega-menu','cấu trúc website','Chúng tôi cũng thông báo các thay đổi quan trọng qua email','Đăng ký bản tin để']): continue
        text=text.replace('khảo sát miễn phí','khảo sát hiện trạng').replace('Khảo sát hiện trạng miễn phí','Khảo sát hiện trạng').replace('khảo sát phòng STEM miễn phí','khảo sát phòng STEM')
        text=text.replace('Thuê dài hạn: chi phí đều theo tháng, bao gồm bảo trì.','Thuê dài hạn: thời gian, phạm vi bảo trì và chi phí được thống nhất theo hợp đồng.')
        text=text.replace('Mỗi phòng được đối chiếu với danh mục thiết bị dạy học hiện hành để thuận lợi cho hồ sơ mua sắm công.','Danh mục thiết bị được trao đổi và đối chiếu theo yêu cầu cụ thể của từng hồ sơ mua sắm.')
        text=text.replace('Có. Mỗi cấu hình được đối chiếu với quy định hiện hành. Xem trang Giáo dục công lập.','Việc đối chiếu cần căn cứ danh mục và yêu cầu của dự án. Trao đổi với IPPTech để xác nhận hồ sơ phù hợp.')
        text=text.replace('Tải hồ sơ năng lực','Xem hồ sơ năng lực').replace('Tải bảng đối chiếu (PDF)','Yêu cầu bảng đối chiếu').replace('Tải thông số (PDF)','Yêu cầu bảng thông số').replace('Tải chính sách bảo hành (PDF)','Yêu cầu chính sách bảo hành')
        text=text.replace('Thông tin công ty chuẩn (boilerplate)','Thông tin giới thiệu công ty')
        text=text.replace('Quý trường cần phòng thực hành STEM đúng danh mục, giáo viên được tập huấn và hồ sơ đủ cho quy trình mua sắm công. IPPTech chuẩn bị cả ba.','IPPTech tư vấn phòng thực hành STEM, tập huấn giáo viên và chuẩn bị hồ sơ theo yêu cầu cụ thể của nhà trường.')
        m=re.match(r'^H([123])\s+(.+)',text)
        if m: result.append({'type':'h'+m[1],'text':m[2]}); continue
        m=re.match(r'^\[Nút:\s*(.*?)\s*→\s*(.*?)\]$',text)
        if m:
            label,url=m.groups()
            if not url.startswith(('/', 'https://')): continue
            result.append({'type':'cta','text':label.replace(' ↗',''),'href':url.replace('<brand-','brand-').replace('>','')});continue
        result.append({'type':'li' if item.get('list') else 'p','text':text})
    return result

output=[]
for index,p in enumerate(pages[:67]):
    if index in (41,66): continue
    blocks=[]
    for bi,b in enumerate(p['blocks']):
        if (index,bi) in widgets:
            widget=widgets[index,bi]
            if widget: blocks.append({'id':f'section-{bi+1}','nodes':[{'type':'widget','name':widget}]})
            continue
        b=replacements.get((index,bi),b)
        if b is None: continue
        nodes=clean_nodes(b)
        if not any(n['type'] not in ('h2','h3') for n in nodes): continue
        blocks.append({'id':f'section-{bi+1}','nodes':nodes})
    if index==47: blocks.append({'id':'proposition','nodes':[{'type':'widget','name':'partner-form'}]})
    if index==49: blocks.insert(1,{'id':'catalogues','nodes':[{'type':'widget','name':'resources'}]})
    if index==52: blocks.insert(1,{'id':'actualites','nodes':[{'type':'widget','name':'news'}]})
    if index==57:
        for b in blocks:
            for ni,n in enumerate(b['nodes']):
                if n.get('text')=='English': b['nodes']=b['nodes'][:ni];break
    if index==58: blocks.insert(1,{'id':'photos','nodes':[{'type':'widget','name':'gallery'}]})
    if index==63: blocks.append({'id':'arborescence','nodes':[{'type':'widget','name':'sitemap'}]})
    seo=p['seo']
    output.append({'slug':p['url'].strip('/').replace('<','').replace('>',''), 'title':p['title'].replace(' [khe trống]',''),
       'seoTitle':next((v for k,v in seo.items() if k.startswith('SEO title')),p['title']),
       'description':next((v for k,v in seo.items() if k.startswith('Meta description')),''),
       'keyword':seo.get('Từ khóa chính',''), 'blocks':blocks})

# Keep search snippets consistent with files and evidence actually available.
seo_overrides={
 've-ipptech/doi-ngu':('Đội ngũ và các bộ phận IPPTech','Tìm hiểu các nhóm phụ trách tư vấn giải pháp, triển khai kỹ thuật, đào tạo và hỗ trợ tại IPPTech. Hồ sơ nhân sự được cập nhật khi có thông tin công bố.'),
 've-ipptech/tuyen-dung':('Cơ hội nghề nghiệp tại IPPTech','Tìm hiểu định hướng làm việc trong lĩnh vực AI, robotics và giáo dục cùng IPPTech. Liên hệ để trao đổi về cơ hội phù hợp.'),
 'giai-phap':('Giải pháp STEM và robot cho trường học, doanh nghiệp','Giải pháp STEM và robot cho trường công lập, trường tư, trung tâm STEM, doanh nghiệp, sự kiện và cuộc thi robotics. Trao đổi nhu cầu triển khai.'),
 'giai-phap/giao-duc-cong-lap/phong-thuc-hanh-stem':('Phòng thực hành STEM cho trường công lập | IPPTech','Tư vấn cấu hình phòng STEM theo cấp học, sĩ số và diện tích. Hồ sơ, lắp đặt, tập huấn và bảo hành được xác nhận theo từng dự án.'),
 'du-an-doi-tac':('Dự án trong hệ sinh thái IPPG và hợp tác IPPTech','Tham khảo hoạt động AI và Robotics trong hệ sinh thái IPPG; tìm hiểu cơ hội hợp tác cùng IPPTech dành cho thương hiệu, đại lý và nhà trường.'),
 'du-an-doi-tac/du-an-tieu-bieu':('Dự án AI và Robotics trong hệ sinh thái IPPG','Tham khảo Trung tâm AI tại ĐHQG TP.HCM và chương trình cùng FPT Schools, kèm nguồn và ngày công bố. Lọc dự án theo lĩnh vực, địa phương, hãng và năm.'),
 'du-an-doi-tac/con-so':('Thông tin năng lực triển khai IPPTech','Trao đổi nhu cầu đối chiếu năng lực triển khai, quy mô và phạm vi dự án với IPPTech. Số liệu chỉ công bố khi có nguồn và mốc cập nhật xác nhận.'),
 'du-an-doi-tac/hop-tac':('Hợp tác cùng IPPTech – Hãng, đại lý, nhà trường','Tìm hiểu ba hướng hợp tác cùng IPPTech và chuẩn bị đề xuất theo lĩnh vực, địa bàn, mục tiêu của thương hiệu, đại lý hoặc nhà trường.'),
 'tai-nguyen/ho-tro':('Hỗ trợ kỹ thuật robot và bảo hành | IPPTech','Chuẩn bị thông tin sản phẩm, số serial, ngày mua và mô tả lỗi để trao đổi hỗ trợ kỹ thuật. Phạm vi bảo hành được xác nhận theo thiết bị và hồ sơ.'),
 'tin-tuc':('Tin tức giáo dục STEM, sự kiện và hoạt động IPPTech','Tìm hiểu hoạt động trong hệ sinh thái IPPG, sản phẩm UBTECH, giáo dục STEM và trải nghiệm robot. Thông tin có nguồn công bố để đối chiếu.'),
 'tin-tuc/thuong-hieu':('Thông tin sản phẩm UBTECH | IPPTech','Khám phá thông tin sản phẩm UBTECH và các liên kết tới danh mục robot giáo dục, robot dịch vụ do IPPTech tư vấn.'),
 'tin-tuc/su-kien':('Sự kiện và trải nghiệm robot | IPPTech','Tham khảo tư liệu sự kiện robotics và trao đổi nhu cầu trải nghiệm robot cùng IPPTech. Lịch hẹn cụ thể được xác nhận sau khi liên hệ.'),
 'tin-tuc/bao-chi':('Thông tin báo chí và truyền thông IPPTech','Thông tin giới thiệu IPPTech dành cho báo chí và đơn vị truyền thông. Trao đổi nhu cầu sử dụng logo, hình ảnh và tài liệu chính thức.'),
 'tin-tuc/thu-vien':('Thư viện hình ảnh hoạt động AI và Robotics | IPPTech','Tư liệu hình ảnh hoạt động AI và Robotics trong hệ sinh thái IPPG, kèm liên kết tới dự án và nguồn công bố tương ứng.'),
 'lien-he/yeu-cau-bao-gia':('Yêu cầu báo giá thiết bị STEM, robot và hồ sơ thầu','Chuẩn bị nhu cầu thiết bị STEM, robot và hồ sơ thầu: loại đơn vị, quy mô, sản phẩm và thời gian. Biểu mẫu hiện ở chế độ kiểm tra thông tin.'),
 'so-do-website':('Sơ đồ website IPPTech theo chuyên mục','Các trang tiếng Việt theo bảy chuyên mục: Về IPPTech, Thương hiệu, Giải pháp, Dự án, Tài nguyên, Tin tức và Liên hệ.'),
 'chinh-sach-bao-mat':('Thông tin dữ liệu và bảo mật website | IPPTech','Thông tin về chế độ xem thử của biểu mẫu website IPPTech. Chính sách đầy đủ cần được công bố trước khi bật hệ thống tiếp nhận dữ liệu.'),
 'dieu-khoan-su-dung':('Thông tin sử dụng website IPPTech','Thông tin tham khảo về sản phẩm, cấu hình và quyền sử dụng nhãn hiệu, hình ảnh trên website IPPTech.'),
 've-ipptech/ho-so-phap-ly':('Hồ sơ pháp lý và chứng nhận IPPTech','Tìm hiểu các nhóm hồ sơ pháp lý, ủy quyền phân phối, nguồn gốc thiết bị và bảo hành. Liên hệ để xác nhận hồ sơ theo sản phẩm và dự án.'),
 'giai-phap/giao-duc-cong-lap':('Giải pháp thiết bị STEM cho trường học công lập','Tư vấn phòng STEM, học cụ AI và Robotics, tập huấn giáo viên và hồ sơ triển khai theo yêu cầu của trường học công lập.'),
 'tai-nguyen':('Tài nguyên giáo dục STEM và robot | IPPTech','Tài liệu tham khảo từ hãng, yêu cầu hồ sơ năng lực, cổng học liệu giáo viên, hỗ trợ kỹ thuật và câu hỏi thường gặp.'),
 'tai-nguyen/ho-so-nang-luc':('Hồ sơ năng lực và catalogue IPPTech','Tham khảo tài liệu UBTECH và chuẩn bị yêu cầu hồ sơ năng lực, catalogue, bảng thông số phù hợp với nhu cầu của đơn vị.'),
 'tin-tuc/chinh-sach-giao-duc':('Chính sách giáo dục STEM và thiết bị dạy học','Trao đổi về nguồn văn bản và hồ sơ cần đối chiếu cho dự án giáo dục STEM. Căn cứ áp dụng được xác nhận theo từng yêu cầu cụ thể.'),
}
for page in output:
    if page['slug'] in seo_overrides:
        page['seoTitle'],page['description']=seo_overrides[page['slug']]
(ROOT/'src/lib/website-content.json').write_text(json.dumps(output,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(f'Extracted {len(pages)} sections; published content for {len(output)} routes. Source notes remain in docs/.')
