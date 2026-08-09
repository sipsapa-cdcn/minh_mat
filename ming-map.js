const MAP_FRAME_ID = 'ming-dynasty-map-frame';
const LAMP_ID = 'ming-map-lamp';
const STORAGE_PREFIX = 'ming-map:';

// Sửa đổi số phiên bản này mỗi khi cập nhật nội dung bản đồ (Nếu đổi thành v1.1, v1.2), Để có thể kích hoạt lại thông báo chấm đỏ trên giao diện người chơi
const MING_MAP_VERSION = 'v1.0'; 

// ==========================================
// Các hằng số và ánh xạ dữ liệu cốt lõi của bản đồ
// ==========================================
const GEO_NAME_DISPLAY = {
    'Sơn Đông Bố chính sứ ty': 'Sơn Đông', 'Sơn Tây Bố chính sứ ty': 'Sơn Tây', 'Hà Nam Bố chính sứ ty': 'Hà Nam',
    'Thiểm Tây Bố chính sứ ty': 'Thiểm Tây', 'Thiểm Tây Hành đô ty': 'Thiểm Tây',
    'Tứ Xuyên Bố chính sứ ty': 'Tứ Xuyên', 'Giang Tây Bố chính sứ ty': 'Giang Tây', 'Chiết Giang Bố chính sứ ty': 'Chiết Giang',
    'Phúc Kiến Bố chính sứ ty': 'Phúc Kiến', 'Quảng Đông Bố chính sứ ty': 'Quảng Đông', 'Quảng Tây Bố chính sứ ty': 'Quảng Tây',
    'Vân Nam Bố chính sứ ty': 'Vân Nam', 'Quý Châu Bố chính sứ ty': 'Quý Châu',
    'Hồ Quảng Bố chính sứ ty (Bắc)': 'Hồ Quảng', 'Hồ Quảng Bố chính sứ ty (Nam)': 'Hồ Quảng',
    'Nam Trực Lệ (Giang Nam)': 'Nam Trực Lệ', 'Nam Trực Lệ (Giang Bắc)': 'Nam Trực Lệ',
    'Liêu Đông Đô ty': 'Liêu Đông', 'Ninh Hạ Vệ': 'Ninh Hạ', 'Đế quốc Mughal': 'Mughal',
    'Vương triều Ayutthaya (Xiêm La)': 'Xiêm La', 'Bhutan Drukpa': 'Bhutan',
    'Vương triều Malla Nepal': 'Nepal', 'Philippines thuộc Tây Ban Nha': 'Luzon',
    'Vương quốc Hồi giáo Mataram': 'Java',
    'Tạng Ba Hãn': 'Ô Tư Tạng', 'Khang Khu thổ ty': 'Ô Tư Tạng', 'Hãn quốc Yarkent': 'Tây Vực', 'Bộ Hòa Thạc Đặc': 'Thanh Hải',
    'Kiến Châu Nữ Chân (Hậu Kim)': 'Hậu Kim', 'Các bộ Dã Nhân Nữ Chân': 'Dã Nhân Nữ Chân',
    'Bộ Sát Cáp Nhĩ Mông Cổ': 'Sát Cáp Nhĩ', 'Bộ Thổ Mặc Đặc Mông Cổ': 'Thổ Mặc Đặc',
    'Đóa Nhan Tam Vệ': 'Đóa Nhan Tam Vệ', 'Khách Nhĩ Khách Mông Cổ (Khalkha)': 'Khách Nhĩ Khách (Khalkha)',
    'Hậu Lê triều - Chúa Trịnh': 'Chúa Trịnh', 'Chúa Nguyễn (Quảng Nam)': 'Quảng Nam',
    'Úc (Thổ dân)': 'Úc',
    'Lạn Thương - Chân Lạp': 'Lạn Thương'
};

const modernToMingProvince = {
    'Thành phố Bắc Kinh':'Bắc Trực Lệ','Thành phố Thiên Tân':'Bắc Trực Lệ','Tỉnh Hà Bắc':'Bắc Trực Lệ','Tỉnh Giang Tô':'Nam Trực Lệ','Tỉnh An Huy':'Nam Trực Lệ','Thành phố Thượng Hải':'Nam Trực Lệ',
    'Tỉnh Sơn Đông':'Sơn Đông','Tỉnh Sơn Tây':'Sơn Tây','Tỉnh Hà Nam':'Hà Nam','Tỉnh Thiểm Tây':'Thiểm Tây','Tỉnh Cam Túc':'Thiểm Tây',
    'Tỉnh Hồ Bắc':'Hồ Quảng','Tỉnh Hồ Nam':'Hồ Quảng','Tỉnh Giang Tây':'Giang Tây','Tỉnh Chiết Giang':'Chiết Giang','Tỉnh Phúc Kiến':'Phúc Kiến','Tỉnh Quảng Đông':'Quảng Đông',
    'Khu tự trị dân tộc Choang Quảng Tây':'Quảng Tây','Tỉnh Vân Nam':'Vân Nam','Tỉnh Quý Châu':'Quý Châu','Tỉnh Tứ Xuyên':'Tứ Xuyên','Thành phố Trùng Khánh':'Tứ Xuyên',
    'Tỉnh Liêu Ninh':'Liêu Đông','Khu tự trị dân tộc Hồi Ninh Hạ':'Ninh Hạ', 'Tỉnh Đài Loan':'Đông Phiên', 'Tỉnh Hải Nam':'Quảng Đông', 'Đặc khu hành chính Hồng Kông':'Quảng Đông','Đặc khu hành chính Ma Cao':'Quảng Đông','Tỉnh Cát Lâm':'Hậu Kim', 'Tỉnh Hắc Long Giang':'Dã Nhân Nữ Chân', 'Khu tự trị Nội Mông Cổ':'Sát Cáp Nhĩ', 'Tỉnh Thanh Hải':'Thanh Hải', 'Khu tự trị dân tộc Duy Ngô Nhĩ Tân Cương':'Tây Vực', 'Khu tự trị Tây Tạng':'Ô Tư Tạng'
};

const PROVINCE_ADCODE = {
    'Thành phố Bắc Kinh':'110000', 'Thành phố Thiên Tân':'120000', 'Tỉnh Hà Bắc':'130000', 'Tỉnh Sơn Tây':'140000',
    'Tỉnh Liêu Ninh':'210000', 'Thành phố Thượng Hải':'310000', 'Tỉnh Giang Tô':'320000', 'Tỉnh Chiết Giang':'330000',
    'Tỉnh An Huy':'340000', 'Tỉnh Phúc Kiến':'350000', 'Tỉnh Giang Tây':'360000', 'Tỉnh Sơn Đông':'370000',
    'Tỉnh Hà Nam':'410000', 'Tỉnh Hồ Bắc':'420000', 'Tỉnh Hồ Nam':'430000', 'Tỉnh Quảng Đông':'440000',
    'Khu tự trị dân tộc Choang Quảng Tây':'450000', 'Tỉnh Hải Nam':'460000', 'Thành phố Trùng Khánh':'500000', 'Tỉnh Tứ Xuyên':'510000',
    'Tỉnh Quý Châu':'520000', 'Tỉnh Vân Nam':'530000', 'Tỉnh Thiểm Tây':'610000', 'Tỉnh Cam Túc':'620000', 'Khu tự trị dân tộc Hồi Ninh Hạ':'640000',
    'Đặc khu hành chính Hồng Kông':'810000', 'Đặc khu hành chính Ma Cao':'820000', 'Khu tự trị Nội Mông Cổ':'150000', 'Tỉnh Cát Lâm':'220000', 'Tỉnh Hắc Long Giang':'230000',
    'Khu tự trị Tây Tạng':'540000', 'Tỉnh Thanh Hải':'630000', 'Khu tự trị dân tộc Duy Ngô Nhĩ Tân Cương':'650000', 'Tỉnh Đài Loan':'710000'
};

// ==========================================
// Mới: Các đô đạo phủ huyện của Nhật Bản hiện đại -> Mapping Lệnh chế quốc thời Edo
// ==========================================
const japanToEdoMap = {
    'Đông Kinh': 'Musashi', 'Kanagawa': 'Sagami', 'Saitama': 'Musashi', 'Chiba': 'Shimosa', 'Ibaraki': 'Hitachi', 'Tochigi': 'Shimotsuke', 'Gunma': 'Kozuke',
    'Kyoto': 'Yamashiro', 'Osaka': 'Settsu', 'Hyogo': 'Harima', 'Nara': 'Yamato', 'Shiga': 'Omi', 'Wakayama': 'Kii',
    'Aichi': 'Owari', 'Shizuoka': 'Suruga', 'Gifu': 'Mino', 'Mie': 'Ise',
    'Hokkaido': 'Ezo', 'Aomori': 'Mutsu', 'Iwate': 'Mutsu', 'Miyagi': 'Mutsu', 'Akita': 'Dewa', 'Yamagata': 'Dewa', 'Fukushima': 'Mutsu',
    'Niigata': 'Echigo', 'Toyama': 'Etchu', 'Ishikawa': 'Kaga', 'Fukui': 'Echizen', 'Yamanashi': 'Kai', 'Nagano': 'Shinano',
    'Tottori': 'Inaba', 'Shimane': 'Izumo', 'Okayama': 'Bizen', 'Hiroshima': 'Aki', 'Yamaguchi': 'Nagato',
    'Tokushima': 'Awa', 'Kagawa': 'Sanuki', 'Ehime': 'Iyo', 'Kochi': 'Tosa',
    'Fukuoka': 'Chikuzen', 'Saga': 'Hizen', 'Nagasaki': 'Hizen', 'Kumamoto': 'Higo', 'Oita': 'Bungo', 'Miyazaki': 'Hyuga', 'Kagoshima': 'Satsuma', 'Okinawa': 'Lưu Cầu'
};

const edoToRegionMap = {
    'Yamashiro': 'Kinai', 'Yamato': 'Kinai', 'Settsu': 'Kinai', 'Hà Nội': 'Kinai', 'Izumi': 'Kinai',
    'Iga': 'Tokaido', 'Ise': 'Tokaido', 'Shima': 'Tokaido', 'Owari': 'Tokaido', 'Mikawa': 'Tokaido', 'Totomi': 'Tokaido', 'Suruga': 'Tokaido', 'Izu': 'Tokaido', 'Kai': 'Tokaido', 'Sagami': 'Tokaido', 'Musashi': 'Tokaido', 'Awa': 'Tokaido', 'Kazusa': 'Tokaido', 'Shimosa': 'Tokaido', 'Hitachi': 'Tokaido',
    'Omi': 'Tosando', 'Mino': 'Tosando', 'Hida': 'Tosando', 'Shinano': 'Tosando', 'Kozuke': 'Tosando', 'Shimotsuke': 'Tosando', 'Mutsu': 'Tosando', 'Dewa': 'Tosando',
    'Wakasa': 'Hokurikudo', 'Echizen': 'Hokurikudo', 'Kaga': 'Hokurikudo', 'Noto': 'Hokurikudo', 'Etchu': 'Hokurikudo', 'Echigo': 'Hokurikudo', 'Sado': 'Hokurikudo',
    'Tamba': 'San’indo', 'Tango': 'San’indo', 'Tajima': 'San’indo', 'Inaba': 'San’indo', 'Hoki': 'San’indo', 'Izumo': 'San’indo', 'Iwami': 'San’indo', 'Oki': 'San’indo',
    'Harima': 'San’yodo', 'Mimasaka': 'San’yodo', 'Bizen': 'San’yodo', 'Bitchu': 'San’yodo', 'Bingo': 'San’yodo', 'Aki': 'San’yodo', 'Suo': 'Sanyodo', 'Nagato': 'Sanyodo',
    'Kii': 'Nankaido', 'Awaji': 'Nankaido', 'Awa': 'Nankaido', 'Sanuki': 'Nankaido', 'Iyo': 'Nankaido', 'Tosa': 'Nankaido',
    'Chikuzen': 'Saikaido', 'Chikugo': 'Saikaido', 'Buzen': 'Saikaido', 'Bungo': 'Saikaido', 'Hizen': 'Saikaido', 'Higo': 'Saikaido', 'Hyuga': 'Saikaido', 'Osumi': 'Saikaido', 'Satsuma': 'Saikaido', 'Iki': 'Saikaido', 'Tsushima': 'Saikaido',
    'Ezo': 'Ezo', 'Lưu Cầu': 'Lưu Cầu'
};

// ==========================================
// Thêm mới: Các đạo Triều Tiên - Hàn Quốc hiện đại/Thị -> 1634 Ánh xạ Bát đạo Triều Tiên năm
// ==========================================
const koreaToJoseonMap = {
    'P\'yŏngyang': 'Pyongan-do', 'P\'yŏngan-namdo': 'Pyongan-do', 'P\'yŏngan-bukto': 'Pyongan-do', 'Namp\'o': 'Pyongan-do', 'Chagang-do': 'Pyongan-do',
    'Hamgyŏng-namdo': 'Hamgyong-do', 'Hamgyŏng-bukto': 'Hamgyong-do', 'Rasŏn': 'Hamgyong-do', 'Ryanggang': 'Hamgyong-do',
    'Hwanghae-namdo': 'Hwanghae-do', 'Hwanghae-bukto': 'Hwanghae-do', 'Kaesŏng': 'Gyeonggi-do', 'Kangwŏn-do': 'Gangwon-do',
    'Seoul': 'Gyeonggi-do', 'Incheon': 'Gyeonggi-do', 'Gyeonggi-do': 'Gyeonggi-do', 'Gangwon-do': 'Gangwon-do',
    'Daejeon': 'Chungcheong-do', 'Sejong': 'Chungcheong-do', 'Chungcheongnam-do': 'Chungcheong-do', 'Chungcheongbuk-do': 'Chungcheong-do',
    'Busan': 'Gyeongsang-do', 'Daegu': 'Gyeongsang-do', 'Ulsan': 'Gyeongsang-do', 'Gyeongsangnam-do': 'Gyeongsang-do', 'Gyeongsangbuk-do': 'Gyeongsang-do',
    'Gwangju': 'Jeolla-do', 'Jeollanam-do': 'Jeolla-do', 'Jeollabuk-do': 'Jeolla-do', 'Jeju-do': 'Jeolla-do'
};

// 1634 Bát đạo Triều Tiên: Tuân thủ nghiêm ngặt hệ thống hành chính lịch sử chân thực, loại bỏ các tên giả cổ hiện đại, phối hợp với nguyên tắc lân cận để đảm bảo không có vùng lãnh thổ tách rời.
const joseonCountyMap = {
    // Gyeonggi
    'Seoul':'Phủ Hán Thành', 'Kaesong':'Phủ Kaesong', 'Kaesŏng':'Phủ Kaesong',
    'Incheon':'Incheon Đô hộ phủ', 'Gimpo':'Quận Gimpo', 'Bucheon':'Bupyeong Đô hộ phủ', 'Gwangmyeong':'Huyện Geumcheon', 
    'Siheung':'Quận Ansan', 'Ansan':'Quận Ansan', 'Anyang':'Huyện Gwacheon', 'Gwacheon':'Huyện Gwacheon', 'Gunpo':'Huyện Gwacheon', 'Uiwang':'Huyện Gwacheon', 
    'Suwon':'Suwon Đô hộ phủ', 'Osan':'Suwon Đô hộ phủ', 'Hwaseong':'Namyang Đô hộ phủ', 
    'Seongnam':'Phủ Gwangju', 'Gwangju':'Phủ Gwangju', 'Hanam':'Phủ Gwangju', 
    'Yongin':'Huyện Yongin', 'Icheon':'Icheon Đô hộ phủ', 'Anseong':'Quận Anseong', 'Pyeongtaek':'Huyện Jinwi',
    'Goyang':'Quận Goyang', 'Paju':'Mục Paju', 'Yangju':'Mục Yangju', 'Dongducheon':'Mục Yangju', 'Uijeongbu':'Mục Yangju', 
    'Guri':'Mục Yangju', 'Namyangju':'Mục Yangju', 'Gapyeong':'Quận Gapyeong', 'Yeoju':'Mục Yeoju', 'Yangpyeong':'Quận Yanggeun', 
    'Pocheon':'Quận Pocheon', 'Yeoncheon':'Huyện Yeoncheon', 'Ganghwa':'Ganghwa Đô hộ phủ', 'Ongjin':'Ganghwa Đô hộ phủ',

    // Gangwon
    'Chuncheon':'Chuncheon Đô hộ phủ', 'Hwacheon':'Huyện Hwacheon', 'Yanggu':'Huyện Yanggu', 'Inje':'Huyện Inje', 
    'Wonju':'Phủ Wonju', 'Hoengseong':'Huyện Hoengseong', 'Pyeongchang':'Quận Pyeongchang', 'Yeongwol':'Quận Yeongwol', 'Jeongseon':'Quận Jeongseon', 
    'Gangneung':'Gangneung Đại đô hộ phủ', 'Donghae':'Samcheok Đô hộ phủ', 'Taebaek':'Samcheok Đô hộ phủ', 'Samcheok':'Samcheok Đô hộ phủ', 
    'Sokcho':'Yangyang Đô hộ phủ', 'Yangyang':'Yangyang Đô hộ phủ', 'Goseong':'Quận Ganseong', 'Kosong':'Quận Ganseong', 'Kosŏng':'Quận Ganseong',
    'Hongcheon':'Huyện Hongcheon', 'Cheolwon':'Cheorwon Đô hộ phủ', 'Chorwon':'Cheorwon Đô hộ phủ', 'Ch\'ŏrwŏn':'Cheorwon Đô hộ phủ',
    'Wonsan':'Đô hộ phủ Anbyeon', 'Wŏnsan':'Đô hộ phủ Anbyeon', 'Anbyon':'Đô hộ phủ Anbyeon', 'Anbyŏn':'Đô hộ phủ Anbyeon',
    'Pyeonggang':'Huyện Pyeonggang', 'Pyonggang':'Huyện Pyeonggang', 'P\'yŏnggang':'Huyện Pyeonggang', 
    'Tongchon':'Quận Tongcheon', 'T\'ongch\'ŏn':'Quận Tongcheon', 
    'Ichon':'Quận Icheon', 'Ich\'ŏn':'Quận Icheon', 'Pangyo':'Quận Icheon',
    'Hoeyang':'Đô hộ phủ Hoeyang', 'Sepo':'Đô hộ phủ Hoeyang', 'Kosan':'Đô hộ phủ Hoeyang', 'Gimhwa':'Huyện Gimhwa', 'Kimhwa':'Huyện Gimhwa',

    // Chungcheong
    'Cheongju':'Phủ Cheongju', 'Chungju':'Phủ Chungju', 'Jecheon':'Huyện Jecheon', 'Danyang':'Quận Danyang', 'Cheonan':'Đô hộ phủ Cheonan', 
    'Gongju':'Phủ Gongju', 'Gyeryong':'Phủ Gongju', 'Boryeong':'Huyện Boryeong', 'Asan':'Huyện Asan', 'Seosan':'Quận Seosan', 'Taean':'Quận Taean', 
    'Nonsan':'Huyện Nisan', 'Dangjin':'Huyện Dangjin', 'Geumsan':'Quận Geumsan', 'Buyeo':'Huyện Buyeo', 'Seocheon':'Quận Seocheon', 
    'Cheongyang':'Huyện Thanh Dương', 'Hongseong':'Phủ Hongju', 'Yesan':'Huyện Yesan', 'Daejeon':'Huyện Hoedeok', 'Sejong':'Huyện Yeongi', 
    'Boeun':'Huyện Boeun', 'Okcheon':'Quận Okcheon', 'Yeongdong':'Huyện Yeongdong', 'Jincheon':'Huyện Jincheon', 'Goesan':'Quận Goesan', 'Eumseong':'Huyện Eumseong', 'Jeungpyeong':'Mục Cheongju',

    // Gyeongsang 
    'Daegu':'Đô hộ phủ Daegu', 'Gyeongsan':'Huyện Gyeongsan', 'Chilgok':'Đô hộ phủ Chilgok',
    'Busan':'Đô hộ phủ Dongnae', 'Gimhae':'Đô hộ phủ Gimhae', 'Yangsan':'Quận Yangsan', 'Gijang':'Huyện Gijang',
    'Ulsan':'Đô hộ phủ Ulsan', 'Pohang':'Huyện Yeongil', 'Gyeongju':'Phủ Gyeongju', 
    'Gimcheon':'Quận Geumsan', 'Andong':'Andong Đại đô hộ phủ', 'Gumi':'Đô hộ phủ Seonsan', 'Yeongju':'Quận Yeongcheon', 'Yeongcheon':'Quận Yeongcheon', 
    'Sangju':'Mục Sangju', 'Mungyeong':'Huyện Mungyeong', 'Gunwi':'Huyện Gunwi', 'Uiseong':'Huyện Uiseong', 
    'Cheongsong':'Đô hộ phủ Cheongsong', 'Yeongyang':'Huyện Yeongyang', 'Yeongdeok':'Huyện Yeongdeok', 'Cheongdo':'Quận Cheongdo', 'Goryeong':'Huyện Goryeong', 
    'Seongju':'Mục Seongju', 'Yecheon':'Quận Yecheon', 'Bonghwa':'Huyện Bonghwa', 'Uljin':'Huyện Uljin', 'Ulleung':'Quận Pyeonghae', 
    'Changwon':'Đô hộ phủ Changwon', 'Jinju':'Mục Jinju', 'Tongyeong':'Huyện Goseong', 'Goseong':'Huyện Goseong', 'Sacheon':'Huyện Sacheon', 
    'Miryang':'Đô hộ phủ Miryang', 'Geoje':'Huyện Geoje', 'Uiryeong':'Huyện Uiryeong', 'Haman':'Quận Haman', 'Changnyeong':'Huyện Xương Ninh', 
    'Namhae':'Huyện Namhae', 'Hadong':'Huyện Hadong', 'Sancheong':'Huyện Sơn Âm', 'Hamyang':'Quận Hamyang', 'Geochang':'Huyện Geochang', 'Hapcheon':'Huyện Hapcheon',

    // Jeolla
    'Jeonju':'Phủ Jeonju', 'Wanju':'Phủ Jeonju', 'Gunsan':'Huyện Impi', 'Iksan':'Huyện Iksan', 'Jeongeup':'Huyện Jeongeup', 'Namwon':'Đô hộ phủ Namwon', 
    'Gimje':'Huyện Gimje', 'Jinan':'Huyện Trấn An', 'Muju':'Phủ Muju', 'Jangsu':'Huyện Jangsu', 'Imsil':'Huyện Imsil', 
    'Sunchang':'Huyện Sunchang', 'Gochang':'Huyện Gochang', 'Buan':'Huyện Buan', 
    'Gwangju':'Mục Gwangju', 'Mokpo':'Huyện Muan', 'Muan':'Huyện Muan', 'Sinan':'Huyện Muan', 
    'Yeosu':'Đô hộ phủ Suncheon', 'Suncheon':'Đô hộ phủ Suncheon', 'Gwangyang':'Huyện Gwangyang', 
    'Naju':'Mục Naju', 'Damyang':'Đô hộ phủ Damyang', 'Damnyang':'Đô hộ phủ Damyang', 'Gokseong':'Huyện Cốc Thành', 'Gurye':'Huyện Gurye', 'Goheung':'Huyện Heungyang', 
    'Boseong':'Huyện Boseong', 'Hwasun':'Huyện Hòa Thuận', 'Jangheung':'Đô hộ phủ Jangheung', 'Gangjin':'Huyện Gangjin', 'Wando':'Huyện Gangjin', 
    'Haenam':'Huyện Haenam', 'Yeongam':'Huyện Yeongam', 'Hampyeong':'Huyện Hampyeong', 'Yeonggwang':'Huyện Yeonggwang', 'Jangseong':'Đô hộ phủ Jangseong', 
    'Jindo':'Huyện Jindo', 'Jeju-do':'Mục Jeju', 'Jeju':'Mục Jeju', 'Seogwipo':'Huyện Daejeong',

    // Pyeongan 
    'Pyongyang':'Phủ Bình Nhưỡng', 'P\'yŏngyang':'Phủ Bình Nhưỡng', 'Nampo':'Huyện Giang Tây', 'Namp\'o':'Huyện Giang Tây', 'Kangnam':'Phủ Bình Nhưỡng', 'Chunghwa':'Phủ Bình Nhưỡng', 'Sangwon':'Phủ Bình Nhưỡng',
    'Anju':'Mục Anju', 'Mundok':'Mục Anju', 'Mundŏk':'Mục Anju', 'Sukchon':'Đô hộ phủ Sukcheon', 'Sukch\'ŏn':'Đô hộ phủ Sukcheon', 
    'Pyongwon':'Huyện Yeongyu', 'P\'yŏngwŏn':'Huyện Yeongyu', 'Chungsan':'Huyện Jeungsan', 'Chŭngsan':'Huyện Jeungsan', 
    'Sinuiju':'Phủ Uiju', 'Sinŭiju':'Phủ Uiju', 'Uiju':'Phủ Uiju', 'Pihyon':'Phủ Uiju', 'Pihyŏn':'Phủ Uiju',
    'Yangdok':'Huyện Yangdeok', 'Yangdŏk':'Huyện Yangdeok', 'Sinyang':'Huyện Yangdeok', 'Hoechang':'Huyện Yangdeok', 'Hoech\'ang':'Huyện Yangdeok',
    'Sunchon':'Quận Suncheon', 'Sunch\'ŏn':'Quận Suncheon', 'Pyongsong':'Quận Suncheon', 'P\'yŏngsŏng':'Quận Suncheon', 
    'Songchon':'Đô hộ phủ Seongcheon', 'Sŏngch\'ŏn':'Đô hộ phủ Seongcheon', 'Unsan':'Huyện Eunsan', 'Ŭnsan':'Huyện Eunsan', 
    'Pukchang':'Quận Bukchang', 'Pukch\'ang':'Quận Bukchang', 'Taedong':'Quận Daedong',
    'Changsong':'Đô hộ phủ Changseong', 'Ch\'angsŏng':'Đô hộ phủ Changseong', 'Tongchang':'Đô hộ phủ Changseong', 'Tongch\'ang':'Đô hộ phủ Changseong', 
    'Pyoktong':'Quận Byeoktong', 'Pyŏktong':'Quận Byeoktong', 'Taechon':'Huyện Taecheon', 'T\'aech\'ŏn':'Huyện Taecheon',
    'Pakchon':'Quận Bakcheon', 'Pakch\'ŏn':'Quận Bakcheon', 'Kujang':'Quận Bakcheon', 'Hyangsan':'Quận Bakcheon', 'Unsan-gun':'Quận Unsan', 
    'Nyongbyon':'Yeongbyeon Đại đô hộ phủ', 'Yongbyon':'Yeongbyeon Đại đô hộ phủ', 'Nyŏngbyŏn':'Yeongbyeon Đại đô hộ phủ', 'Yŏngbyŏn':'Yeongbyeon Đại đô hộ phủ',
    'Kusong':'Đô hộ phủ Guseong', 'Kusŏng':'Đô hộ phủ Guseong', 'Taegwan':'Đô hộ phủ Guseong', 'Chonma':'Đô hộ phủ Guseong', 'Ch\'ŏnma':'Đô hộ phủ Guseong',
    'Ryongchon':'Quận Yongcheon', 'Ryongch\'ŏn':'Quận Yongcheon', 'Yomju':'Huyện Yongcheon', 'Yŏmju':'Huyện Yongcheon', 'Sindo':'Huyện Yongcheon',
    'Cholsan':'Đô hộ phủ Cheolsan', 'Ch\'ŏlsan':'Đô hộ phủ Cheolsan', 'Tongrim':'Đô hộ phủ Cheolsan', 
    'Chongju':'Mục Jeongju', 'Chŏngju':'Mục Jeongju', 'Kwaksan':'Huyện Gwaksan', 'Sonchon':'Huyện Seoncheon', 'Sŏnch\'ŏn':'Huyện Seoncheon',
    'Kanggye':'Đô hộ phủ Ganggye', 'Changgang':'Đô hộ phủ Ganggye', 'Nangrim':'Đô hộ phủ Ganggye', 'Rangrim':'Đô hộ phủ Ganggye',
    'Chasong':'Huyện Jaseong', 'Chasŏng':'Huyện Jaseong', 'Chunggang':'Huyện Jaseong', 'Hwapyong':'Huyện Huchang', 'Hwap\'yŏng':'Huyện Huchang',
    'Manpo':'Huyện Isan', 'Manp\'o':'Huyện Isan', 'Sijung':'Huyện Isan',
    'Wiwon':'Huyện Wiwon', 'Wiwŏn':'Huyện Wiwon', 'Chonchon':'Huyện Wiwon', 'Chŏnch\'ŏn':'Huyện Wiwon', 'Ryongnim':'Huyện Wiwon', 
    'Chosan':'Huyện Chosan', 'Ch\'osan':'Huyện Chosan', 'Kopung':'Huyện Chosan', 'Kop\'ung':'Huyện Chosan', 'Usan':'Huyện Chosan', 
    'Huichon':'Huyện Huicheon', 'Hŭich\'ŏn':'Huyện Huicheon', 'Songwon':'Huyện Huicheon', 'Songwŏn':'Huyện Huicheon', 'Tongsin':'Huyện Huicheon',
    'Taehung':'Huyện Yeongwon', 'Taehŭng':'Huyện Yeongwon', 'Nyongwon':'Huyện Yeongwon', 'Nyŏngwŏn':'Huyện Yeongwon', 'Maengsan':'Huyện Maengsan', 
    'Kaechon':'Huyện Gaecheon', 'Kaech\'ŏn':'Huyện Gaecheon', 'Tokchon':'Huyện Deokcheon', 'Tŏkch\'ŏn':'Huyện Deokcheon',

    // Hamgyeong 
    'Chongjin':'Đô hộ phủ Gyeongseong', 'Ch\'ŏngjin':'Đô hộ phủ Gyeongseong', 'Kyongsong':'Đô hộ phủ Gyeongseong', 'Kyŏngsŏng':'Đô hộ phủ Gyeongseong', 'Orang':'Đô hộ phủ Gyeongseong', 
    'Puryong':'Đô hộ phủ Buryeong', 'Puryŏng':'Đô hộ phủ Buryeong',
    'Musan':'Phủ Musan', 'Taehongdan':'Phủ Musan', 'Yonsa':'Phủ Musan', 'Yŏnsa':'Phủ Musan', 'Samjiyon':'Phủ Musan', 'Samjiyŏn':'Phủ Musan',
    'Hoeryong':'Đô hộ phủ Hoeryeong', 'Hoeryŏng':'Đô hộ phủ Hoeryeong',
    'Onsong':'Đô hộ phủ Onseong', 'Onsŏng':'Đô hộ phủ Onseong', 'Chongsong':'Đô hộ phủ Jongseong',
    'Kyongwon':'Đô hộ phủ Gyeongwon', 'Kyŏngwŏn':'Đô hộ phủ Gyeongwon', 'Undok':'Đô hộ phủ Gyeongwon', 'Ŭndŏk':'Đô hộ phủ Gyeongwon', 'Saebyol':'Đô hộ phủ Jongseong', 'Saeppyŏl':'Đô hộ phủ Jongseong',
    'Kyonghung':'Đô hộ phủ Gyeongheung', 'Kyŏnghŭng':'Đô hộ phủ Gyeongheung', 'Rason':'Đô hộ phủ Gyeongheung', 'Rasŏn':'Đô hộ phủ Gyeongheung', 'Sonbong':'Đô hộ phủ Gyeongheung',
    'Myongchon':'Đô hộ phủ Myeongcheon', 'Myŏngch\'ŏn':'Đô hộ phủ Myeongcheon', 'Hwadae':'Đô hộ phủ Myeongcheon', 'Myonggan':'Đô hộ phủ Myeongcheon', 'Myŏnggan':'Đô hộ phủ Myeongcheon', 
    'Kilchu':'Mục Gilju', 'Kimchaek':'Mục Gilju', 'Kimch\'aek':'Mục Gilju', 'Paegam':'Mục Gilju', 
    'Tanchon':'Quận Dancheon', 'Tanch\'ŏn':'Quận Dancheon', 'Hochon':'Quận Dancheon', 'Hŏch\'ŏn':'Quận Dancheon',
    'Kapsan':'Đô hộ phủ Gapsan', 'Hyesan':'Đô hộ phủ Gapsan', 'Pochon':'Đô hộ phủ Gapsan', 'Poch\'ŏn':'Đô hộ phủ Gapsan', 'Unhung':'Đô hộ phủ Gapsan', 'Unhŭng':'Đô hộ phủ Gapsan',
    'Pungsan':'Đô hộ phủ Gapsan', 'P\'ungsan':'Đô hộ phủ Gapsan', 'Kimhyonggwon':'Phủ đô hộ Gapsan', 'Kimhyŏnggwŏn':'Phủ đô hộ Gapsan', 'Pungso':'Phủ đô hộ Gapsan', 'P\'ungsŏ':'Phủ đô hộ Gapsan',
    'Samsu':'Phủ đô hộ Samsu', 'Kimhyongjik':'Phủ đô hộ Samsu', 'Kimhyŏngjik':'Phủ đô hộ Samsu', 'Kimjongsuk':'Phủ đô hộ Samsu', 'Kimjŏngsuk':'Phủ đô hộ Samsu', 'Huchang':'Phủ đô hộ Samsu',
    'Hamhung':'Phủ Hamheung', 'Hamhŭng':'Phủ Hamheung', 'Hungnam':'Phủ Hamheung', 'Hŭngnam':'Phủ Hamheung', 'Rakwon':'Phủ Hamheung', 'Rakwŏn':'Phủ Hamheung', 'Sinhung':'Phủ Hamheung', 'Sinhŭng':'Phủ Hamheung', 'Pujon':'Phủ Hamheung', 'Pujŏn':'Phủ Hamheung', 'Hamju':'Phủ Hamheung',
    'Hongwon':'Quận Hongwon', 'Hongwŏn':'Quận Hongwon',
    'Chongpyong':'Phủ đô hộ Jeongpyeong', 'Chŏngp\'yŏng':'Phủ đô hộ Jeongpyeong', 'Yonggwang':'Phủ đô hộ Jeongpyeong', 'Yŏnggwang':'Phủ đô hộ Jeongpyeong',
    'Yonghung':'Yeongheung Đại đô hộ phủ', 'Kumya':'Yeongheung Đại đô hộ phủ', 'Kŭmya':'Yeongheung Đại đô hộ phủ', 'Kowon':'Yeongheung Đại đô hộ phủ', 'Kowŏn':'Yeongheung Đại đô hộ phủ', 'Yodok':'Yeongheung Đại đô hộ phủ', 'Yodŏk':'Yeongheung Đại đô hộ phủ', 'Sudok':'Yeongheung Đại đô hộ phủ', 'Sudŏk':'Yeongheung Đại đô hộ phủ',
    'Pukchong':'Phủ đô hộ Bukcheong', 'Pukch\'ŏng':'Phủ đô hộ Bukcheong', 'Sinpo':'Phủ đô hộ Bukcheong', 'Sinp\'o':'Phủ đô hộ Bukcheong', 'Pukchon':'Phủ đô hộ Bukcheong', 'Pukch\'ŏn':'Phủ đô hộ Bukcheong', 'Toksong':'Phủ đô hộ Bukcheong', 'Tŏksŏng':'Phủ đô hộ Bukcheong',
    'Changjin':'Quận Jangjin', 

    // Hwanghae 
    'Haeju':'Mục Haeju', 'Sariwon':'Quận Bongsan', 'Sariwŏn':'Quận Bongsan', 'Songnim':'Mục Hwangju', 'Ongjin':'Phủ đô hộ Ongjin', 'Yonan':'Phủ đô hộ Yeonan', 'Yŏnan':'Phủ đô hộ Yeonan',
    'Kangryong':'Huyện Gangnyeong', 'Kangryŏng':'Huyện Gangnyeong', 'Pyoksong':'Mục Haeju', 'Pyŏksŏng':'Mục Haeju', 'Taetan':'Huyện Jangyeon', 'T\'aet\'an':'Huyện Jangyeon', 'Ryongyon':'Huyện Jangyeon', 'Ryongyŏn':'Huyện Jangyeon', 'Changyon':'Huyện Jangyeon', 'Changyŏn':'Huyện Jangyeon',
    'Samchon':'Quận Anak', 'Samch\'ŏn':'Quận Anak', 'Songhwa':'Huyện Songhwa', 'Ullyul':'Huyện Eullyul', 'Ŭllyul':'Huyện Eullyul', 'Unchon':'Phủ đô hộ Pungcheon', 'Ŭnch\'ŏn':'Phủ đô hộ Pungcheon', 'Anak':'Quận Anak',
    'Sinchon':'Quận Sinchon', 'Sinch\'ŏn':'Quận Sinchon', 'Chaeryong':'Quận Jaeryeong', 'Chaeryŏng':'Quận Jaeryeong', 'Sinchang':'Quận Suan', 'Sinch\'ang':'Quận Suan', 'Hwangju':'Mok Hwangju', 'Chunghwa':'Phủ đô hộ Junghwa',
    'Yontan':'Mok Hwangju', 'Yŏntan':'Mok Hwangju', 'Suan':'Quận Suan', 'Koksan':'Phủ đô hộ Goksan', 'Sinpyong':'Phủ đô hộ Goksan', 'Sinp\'yŏng':'Phủ đô hộ Goksan',
    'Pyongsan':'Phủ đô hộ Pyeongsan', 'P\'yŏngsan':'Phủ đô hộ Pyeongsan', 'Kumchon':'Quận Geumcheon', 'Kŭmch\'ŏn':'Quận Geumcheon', 'Tosan':'Phủ đô hộ Pyeongsan', 'T\'osan':'Phủ đô hộ Pyeongsan', 'Sinchyong':'Huyện Singye', 'Singye':'Huyện Singye', 'Pongsan':'Quận Bongsan',
    'Rinsan':'Phủ đô hộ Pyeongsan', 'Paehyon':'Quận Baecheon', 'Paehyŏn':'Quận Baecheon', 'Paechon':'Quận Baecheon', 'Paech\'ŏn':'Quận Baecheon'
};
// ==========================================
// Thêm mới: Khách Nhĩ Khách (Khalkha), Nepal, Bhutan hiện đại->1634 Ánh xạ (Phiên bản nâng cao khớp mờ đa ngôn ngữ)
// ==========================================
const khalkhaToCountyMap = {
    'Ulaanbaatar': 'Khüree', 'Ulaanbaatar': 'Khüree', 'Ulan Bator': 'Khüree',
    'Töv': 'Tusheet Khan Trung bộ', 'Töv': 'Tusheet Khan Trung bộ', 'Tov': 'Tusheet Khan Trung bộ',
    'Selenge': 'Tusheet Khan Bắc bộ', 'Selenge': 'Tusheet Khan Bắc bộ', 'Darkhan': 'Tusheet Khan Bắc bộ', 'Darkhan': 'Tusheet Khan Bắc bộ', 'Darhan': 'Tusheet Khan Bắc bộ',
    'Dundgovi': 'Tusheet Khan Nam bộ', 'Dundgovi': 'Tusheet Khan Nam bộ', 
    'Ömnögovi': 'Các bộ Qua Bích', 'Ömnögovi': 'Các bộ Qua Bích', 'Omnogovi': 'Các bộ Qua Bích',
    'Khentii': 'Setsen Khan Trung bộ', 'Khentii': 'Setsen Khan Trung bộ', 'Hentiy': 'Setsen Khan Trung bộ', 'Govisümber': 'Setsen Khan Trung bộ', 'Govisümber': 'Setsen Khan Trung bộ',
    'Dornod': 'Setsen Khan Đông bộ', 'Dornod': 'Setsen Khan Đông bộ', 
    'Sukhbaatar': 'Setsen Khan Nam bộ', 'Sükhbaatar': 'Setsen Khan Nam bộ', 'Sühbaatar': 'Setsen Khan Nam bộ',
    'Dornogovi': 'Setsen Khan Tây Nam bộ', 'Dornogovi': 'Setsen Khan Tây Nam bộ',
    'Arkhangai': 'Sain Noyon Khan', 'Arkhangai': 'Sain Noyon Khan', 'Arhangay': 'Sain Noyon Khan',
    'Övörkhangai': 'Sain Noyon Khan', 'Övörkhangai': 'Sain Noyon Khan', 'Ovorkhangai': 'Sain Noyon Khan', 'Övörhangay': 'Sain Noyon Khan',
    'Bayankhongor': 'Zasagt Khan Nam bộ', 'Bayankhongor': 'Zasagt Khan Nam bộ', 'Bayanhongor': 'Zasagt Khan Nam bộ',
    'Zavkhan': 'Zasagt Khan Trung bộ', 'Zavkhan': 'Zasagt Khan Trung bộ', 'Dzavhan': 'Zasagt Khan Trung bộ',
    'Govi-Altai': 'Zasagt Khan Tây bộ', 'Govi-Altai': 'Zasagt Khan Tây bộ', 'Govi Altai': 'Zasagt Khan Tây bộ', 'Govi-Altay': 'Zasagt Khan Tây bộ',
    'Khövsgöl': 'Tannu Uriankhai', 'Khövsgöl': 'Tannu Uriankhai', 'Khovsgol': 'Tannu Uriankhai', 'Hövsgöl': 'Tannu Uriankhai',
    'Bulgan': 'Tusheet Khan Tây bộ', 'Bulgan': 'Tusheet Khan Tây bộ', 'Orkhon': 'Tusheet Khan Tây bộ', 'Orkhon': 'Tusheet Khan Tây bộ', 'Orhon': 'Tusheet Khan Tây bộ',
    'Khovd': 'Khovd', 'Khovd': 'Khovd', 'Hovd': 'Khovd',
    'Uvs': 'Đỗ Nhĩ Bá Đặc', 'Uvs': 'Đỗ Nhĩ Bá Đặc', 
    'Bayan-Ölgii': 'Altai Uriankhai', 'Bayan-Ölgii': 'Altai Uriankhai', 'Bayan-Olgii': 'Altai Uriankhai', 'Bayan-Ölgiy': 'Altai Uriankhai'
};
const khalkhaCountyToFuMap = {
    'Khüree': 'Tusheet Khan bộ', 'Tusheet Khan Trung bộ': 'Tusheet Khan bộ', 'Tusheet Khan Bắc bộ': 'Tusheet Khan bộ', 'Tusheet Khan Nam bộ': 'Tusheet Khan bộ', 'Các bộ Qua Bích': 'Tusheet Khan bộ', 'Tusheet Khan Tây bộ': 'Tusheet Khan bộ',
    'Setsen Khan Trung bộ': 'Setsen Khan bộ', 'Setsen Khan Đông bộ': 'Setsen Khan bộ', 'Setsen Khan Nam bộ': 'Setsen Khan bộ', 'Setsen Khan Tây Nam bộ': 'Xa Thần Hãn bộ',
    'Zasagt Khan Trung bộ': 'Zasagt Khan bộ', 'Zasagt Khan Nam bộ': 'Zasagt Khan bộ', 'Zasagt Khan Tây bộ': 'Zasagt Khan bộ', 'Sain Noyon Khan': 'Zasagt Khan bộ', 
    'Tannu Uriankhai': 'Bộ Khotogoid', 'Khovd': 'Bộ Khotogoid', 'Đỗ Nhĩ Bá Đặc': 'Bộ Khotogoid', 'Altai Uriankhai': 'Bộ Khotogoid'
};

const nepalToCountyMap = {
    'Sudurpashchim': 'Vương quốc Doti', 'Viễn Tây': 'Vương quốc Doti', 'Far-Western': 'Vương quốc Doti', 
    'Karnali': 'Vương quốc Jumla', 'Karnali': 'Vương quốc Jumla', 'Mid-Western': 'Vương quốc Jumla', 
    'Lumbini': 'Vương quốc Palpa', 'Lumbini': 'Vương quốc Palpa', 
    'Gandaki': 'Vương quốc Kaski', 'Gandaki': 'Vương quốc Kaski', 'Western': 'Vương quốc Kaski', 
    'Bagmati': 'Kantipur', 'Bagmati': 'Kantipur', 'Central': 'Kantipur', 
    'Madhesh': 'Makwanpur', 'Madhesh': 'Makwanpur', 'Janakpur': 'Makwanpur',
    'Koshi': 'Vijayapur', 'Koshi': 'Vijayapur', 'Eastern': 'Vijayapur',
    'P1': 'Vijayapur', 'P2': 'Makwanpur', 'P3': 'Kantipur', 'P4': 'Vương quốc Kaski', 'P5': 'Vương quốc Palpa', 'P6': 'Vương quốc Jumla', 'P7': 'Vương quốc Doti',
    'Province 1': 'Vijayapur', 'Province 2': 'Makwanpur', 'Province 3': 'Kantipur', 'Province 4': 'Vương quốc Kaski', 'Province 5': 'Vương quốc Palpa', 'Province 6': 'Vương quốc Jumla', 'Province 7': 'Vương quốc Doti',
    'Seti': 'Vương quốc Doti', 'Mahakali': 'Vương quốc Doti', 'Bheri': 'Vương quốc Jumla', 'Rapti': 'Vương quốc Jumla', 'Dhawalagiri': 'Vương quốc Palpa', 'Narayani': 'Kantipur', 'Sagarmatha': 'Vijayapur', 'Mechi': 'Vijayapur'
};
const nepalCountyToFuMap = {
    'Vương quốc Doti': 'Các tiểu quốc Baise', 'Vương quốc Jumla': 'Các tiểu quốc Baise', 'Vương quốc Palpa': 'Các phiên quốc Chaubisi', 'Vương quốc Kaski': 'Các phiên quốc Chaubisi',
    'Kantipur': 'Vương triều Malla', 'Makwanpur': 'Vương triều Sen', 'Vijayapur': 'Vương triều Sen'
};

const bhutanToCountyMap = {
    'Paro': 'Paro Dzong', 'Paro': 'Paro Dzong', 'Haa': 'Haa Dzong', 'Haa': 'Haa Dzong', 'Ha': 'Haa Dzong',
    'Samtse': 'Samtse', 'Samtse': 'Samtse', 'Samchi': 'Samtse',
    'Chukha': 'Chukha', 'Chukha': 'Chukha', 'Chhukha': 'Chukha',
    'Thimphu': 'Thimphu Dzong', 'Thimphu': 'Thimphu Dzong', 'Gasa': 'Gasa Dzong', 'Gasa': 'Gasa Dzong',
    'Punakha': 'Punakha Dzong', 'Punakha': 'Punakha Dzong', 'Wangdue Phodrang': 'Wangdue Phodrang', 'Wangdue Phodrang': 'Wangdue Phodrang', 'Wangdi Phodrang': 'Wangdue Phodrang',
    'Dagana': 'Dagana', 'Dagana': 'Dagana', 'Daga': 'Dagana',
    'Tsirang': 'Tsirang', 'Tsirang': 'Tsirang', 'Chirang': 'Tsirang',
    'Trongsa': 'Trongsa Dzong', 'Trongsa': 'Trongsa Dzong', 'Bumthang': 'Bumthang', 'Bumthang': 'Bumthang', 
    'Zhemgang': 'Zhemgang', 'Zhemgang': 'Zhemgang', 'Sarpang': 'Sarpang', 'Sarpang': 'Sarpang',
    'Mongar': 'Mongar', 'Mongar': 'Mongar', 'Trashigang': 'Trashigang Dzong', 'Trashigang': 'Trashigang Dzong', 
    'Lhuntse': 'Lhuntse', 'Lhuntse': 'Lhuntse', 'Lhuntshi': 'Lhuntse',
    'Trashiyangtse': 'Trashiyangtse', 'Trashiyangtse': 'Trashiyangtse', 'Trashiyangtsi': 'Trashiyangtse',
    'Pemagatshel': 'Pemagatshel', 'Pemagatshel': 'Pemagatshel', 'Pemagatsel': 'Pemagatshel',
    'Samdrup Jongkhar': 'Samdrup Jongkhar', 'Samdrup Jongkhar': 'Samdrup Jongkhar'
};
const bhutanCountyToFuMap = {
    'Paro Dzong': 'Tây Bhutan', 'Haa Dzong': 'Tây Bhutan', 'Samtse': 'Tây Bhutan', 'Chukha': 'Tây Bhutan',
    'Thimphu Dzong': 'Trung Bhutan', 'Gasa Dzong': 'Trung Bhutan', 'Punakha Dzong': 'Trung Bhutan', 'Wangdue Phodrang': 'Trung Bhutan', 'Dagana': 'Trung Bhutan', 'Tsirang': 'Trung Bhutan',
    'Trongsa Dzong': 'Đông Bhutan', 'Bumthang': 'Đông Bhutan', 'Zhemgang': 'Đông Bhutan', 'Sarpang': 'Đông Bhutan',
    'Mongar': 'Đông Bhutan', 'Trashigang Dzong': 'Đông Bhutan', 'Lhuntse': 'Đông Bhutan', 'Trashiyangtse': 'Đông Bhutan', 'Pemagatshel': 'Đông Bhutan', 'Samdrup Jongkhar': 'Đông Bhutan'
};
// ==========================================
// Mới: Lạn Thương, Xiêm La, Việt Nam, Mughal hiện đại->1634 Ánh xạ
// ==========================================
const lancangToCountyMap = {
    'Vientiane': 'Viêng Chăn', 'Viêng Chăn': 'Viêng Chăn', 'Viangchan': 'Viêng Chăn', 'Xaisomboun': 'Xaisomboun', 'Xaisomboun': 'Xaisomboun',
    'Luang Prabang': 'Luông Pha Băng', 'Luông Pha Băng': 'Luông Pha Băng', 'Louangphabang': 'Luông Pha Băng', 'Oudomxay': 'Oudomxay', 'Oudomxay': 'Oudomxay', 'Phongsaly': 'Phongsaly', 'Phongsaly': 'Phongsaly', 'Luang Namtha': 'Luông Nam Tha', 'Luông Nam Tha': 'Luông Nam Tha', 'Bokeo': 'Bokeo', 'Bokeo': 'Bokeo', 'Xayabury': 'Sainyabuli', 'Sainyabuli': 'Sainyabuli',
    'Xiangkhouang': 'Xiêng Khoảng', 'Xiêng Khoảng': 'Xiêng Khoảng', 'Houaphanh': 'Hủa Phăn', 'Hủa Phăn': 'Hủa Phăn',
    'Champasak': 'Chăm Pa Sắc', 'Chăm Pa Sắc': 'Chăm Pa Sắc', 'Savannakhet': 'Savannakhet', 'Savannakhet': 'Savannakhet', 'Khammouane': 'Khammouane', 'Khammouane': 'Khammouane', 'Saravane': 'Salavan', 'Salavan': 'Salavan', 'Sekong': 'Sekong', 'Sekong': 'Sekong', 'Attapeu': 'Attapeu', 'Attapeu': 'Attapeu', 'Borikhamxay': 'Bolikhamsai', 'Bolikhamsai': 'Bolikhamsai'
};
const lancangCountyToFuMap = {
    'Viêng Chăn': 'Viêng Chăn', 'Xaisomboun': 'Viêng Chăn', 'Luông Pha Băng': 'Luông Pha Băng', 'Oudomxay': 'Luông Pha Băng', 'Phongsaly': 'Luông Pha Băng', 'Luông Nam Tha': 'Luông Pha Băng', 'Bokeo': 'Luông Pha Băng', 'Sainyabuli': 'Luông Pha Băng',
    'Xiêng Khoảng': 'Muang Phuan', 'Hủa Phăn': 'Muang Phuan', 'Chăm Pa Sắc': 'Chăm Pa Sắc', 'Savannakhet': 'Chăm Pa Sắc', 'Khammouane': 'Chăm Pa Sắc', 'Salavan': 'Chăm Pa Sắc', 'Sekong': 'Chăm Pa Sắc', 'Attapeu': 'Chăm Pa Sắc', 'Bolikhamsai': 'Viêng Chăn'
};

const siamToCountyMap = {
    'Bangkok': 'Ayutthaya', 'Bangkok': 'Ayutthaya', 'Ayutthaya': 'Ayutthaya', 'Ayutthaya': 'Ayutthaya', 'Nonthaburi': 'Ayutthaya', 'Pathum Thani': 'Ayutthaya', 'Samut': 'Ayutthaya', 'Nakhon Pathom': 'Ayutthaya', 'Suphan Buri': 'Ayutthaya', 'Saraburi': 'Ayutthaya', 'Lop Buri': 'Ayutthaya', 'Ang Thong': 'Ayutthaya', 'Sing Buri': 'Ayutthaya', 'Chai Nat': 'Ayutthaya',
    'Chiang Mai': 'Chiang Mai', 'Chiang Mai': 'Chiang Mai', 'Chiang Rai': 'Chiang Mai', 'Chiang Rai': 'Chiang Mai', 'Mae Hong Son': 'Chiang Mai', 'Lampang': 'Chiang Mai', 'Lampang': 'Chiang Mai', 'Lamphun': 'Chiang Mai', 'Lamphun': 'Chiang Mai', 'Phrae': 'Chiang Mai', 'Phrae': 'Chiang Mai', 'Nan': 'Chiang Mai', 'Nan': 'Chiang Mai', 'Phayao': 'Chiang Mai', 'Phayao': 'Chiang Mai',
    'Nakhon Ratchasima': 'Nakhon Ratchasima (Khorat)', 'Nakhon Ratchasima (Khorat)': 'Nakhon Ratchasima (Khorat)', 'Khon Kaen': 'Nakhon Ratchasima (Khorat)', 'Khon Kaen': 'Nakhon Ratchasima (Khorat)', 'Udon Thani': 'Nakhon Ratchasima (Khorat)', 'Udon Thani': 'Nakhon Ratchasima (Khorat)', 'Ubon Ratchathani': 'Nakhon Ratchasima (Khorat)', 'Ubon Ratchathani': 'Nakhon Ratchasima (Khorat)', 'Nong Khai': 'Nakhon Ratchasima (Khorat)', 'Nong Khai': 'Nakhon Ratchasima (Khorat)', 'Surin': 'Nakhon Ratchasima (Khorat)', 'Surin': 'Nakhon Ratchasima (Khorat)', 'Buri Ram': 'Nakhon Ratchasima (Khorat)', 'Buriram': 'Nakhon Ratchasima (Khorat)', 'Chaiyaphum': 'Nakhon Ratchasima (Khorat)', 'Sakon Nakhon': 'Nakhon Ratchasima (Khorat)', 'Roi Et': 'Nakhon Ratchasima (Khorat)', 'Maha Sarakham': 'Nakhon Ratchasima (Khorat)', 'Loei': 'Nakhon Ratchasima (Khorat)', 'Nong Bua Lam Phu': 'Nakhon Ratchasima (Khorat)', 'Amnat Charoen': 'Nakhon Ratchasima (Khorat)', 'Si Sa Ket': 'Nakhon Ratchasima (Khorat)', 'Yasothon': 'Nakhon Ratchasima (Khorat)', 'Mukdahan': 'Nakhon Ratchasima (Khorat)', 'Kalasin': 'Nakhon Ratchasima (Khorat)', 'Bueng Kan': 'Nakhon Ratchasima (Khorat)',
    'Phitsanulok': 'Phitsanulok', 'Phitsanulok': 'Phitsanulok', 'Sukhothai': 'Phitsanulok', 'Sukhothai': 'Phitsanulok', 'Phetchabun': 'Phitsanulok', 'Phetchabun': 'Phitsanulok', 'Tak': 'Phitsanulok', 'Tak': 'Phitsanulok', 'Kamphaeng Phet': 'Phitsanulok', 'Kamphaeng Phet': 'Phitsanulok', 'Uttaradit': 'Phitsanulok', 'Uttaradit': 'Phitsanulok', 'Nakhon Sawan': 'Phitsanulok', 'Nakhon Sawan': 'Phitsanulok', 'Uthai Thani': 'Phitsanulok', 'Phichit': 'Phitsanulok',
    'Nakhon Si Thammarat': 'Nakhon Si Thammarat', 'Nakhon Si Thammarat': 'Nakhon Si Thammarat', 'Surat Thani': 'Nakhon Si Thammarat', 'Surat Thani': 'Nakhon Si Thammarat', 'Phuket': 'Nakhon Si Thammarat', 'Phuket': 'Nakhon Si Thammarat', 'Krabi': 'Nakhon Si Thammarat', 'Krabi': 'Nakhon Si Thammarat', 'Songkhla': 'Nakhon Si Thammarat', 'Songkhla': 'Nakhon Si Thammarat', 'Chumphon': 'Nakhon Si Thammarat', 'Chumphon': 'Nakhon Si Thammarat', 'Phang Nga': 'Nakhon Si Thammarat', 'Phang Nga': 'Nakhon Si Thammarat', 'Phatthalung': 'Nakhon Si Thammarat', 'Phatthalung': 'Nakhon Si Thammarat', 'Trang': 'Nakhon Si Thammarat', 'Trang': 'Nakhon Si Thammarat', 'Ranong': 'Nakhon Si Thammarat',
    'Pattani': 'Pattani', 'Pattani': 'Pattani', 'Yala': 'Pattani', 'Yala': 'Pattani', 'Narathiwat': 'Pattani', 'Narathiwat': 'Pattani', 'Satun': 'Pattani',
    'Chon Buri': 'Chanthaburi', 'Chonburi': 'Chanthaburi', 'Rayong': 'Chanthaburi', 'Rayong': 'Chanthaburi', 'Chanthaburi': 'Chanthaburi', 'Chanthaburi': 'Chanthaburi', 'Trat': 'Chanthaburi', 'Trat': 'Chanthaburi', 'Prachin Buri': 'Chanthaburi', 'Prachinburi': 'Chanthaburi', 'Sa Kaeo': 'Chanthaburi', 'Chachoengsao': 'Chanthaburi', 'Nakhon Nayok': 'Chanthaburi',
    'Kanchanaburi': 'Ratchaburi', 'Kanchanaburi': 'Ratchaburi', 'Ratchaburi': 'Ratchaburi', 'Ratchaburi': 'Ratchaburi', 'Phetchaburi': 'Ratchaburi', 'Phetchaburi': 'Ratchaburi', 'Prachuap Khiri Khan': 'Ratchaburi', 'Prachuap Khiri Khan': 'Ratchaburi'
};
const siamCountyToFuMap = {
    'Chiang Mai': 'Lanna', 'Phitsanulok': 'Phitsanulok', 'Ayutthaya': 'Trung tâm miền Trung', 'Ratchaburi': 'Trung tâm miền Trung', 'Chanthaburi': 'Trung tâm miền Trung', 'Nakhon Ratchasima (Khorat)': 'Vùng Isan', 'Nakhon Si Thammarat': 'Bán đảo Mã Lai', 'Pattani': 'Bán đảo Mã Lai'
};

const vietnamToCountyMap = {
    'Hanoi': 'Thăng Long', 'Hà Nội': 'Thăng Long', 'Hai Phong': 'Thăng Long', 'Hải Phòng': 'Thăng Long', 'Bac Ninh': 'Thăng Long', 'Bắc Ninh': 'Thăng Long', 'Nam Dinh': 'Sơn Nam', 'Nam Định': 'Sơn Nam', 'Ninh Binh': 'Sơn Nam', 'Ninh Bình': 'Sơn Nam', 'Thai Binh': 'Sơn Nam', 'Thái Bình': 'Sơn Nam', 'Vinh Phuc': 'Sơn Nam', 'Vĩnh Phúc': 'Sơn Nam', 'Hung Yen': 'Sơn Nam', 'Hưng Yên': 'Sơn Nam', 'Hai Duong': 'Hải Dương', 'Hải Dương': 'Hải Dương', 'Ha Nam': 'Sơn Nam', 'Hà Nam': 'Sơn Nam',
    'Quang Ninh': 'Hải Dương', 'Quảng Ninh': 'Hải Dương', 'Lang Son': 'Hải Dương', 'Lạng Sơn': 'Hải Dương', 'Bac Giang': 'Hải Dương', 'Bắc Giang': 'Hải Dương', 'Thai Nguyen': 'Hải Dương', 'Thái Nguyên': 'Hải Dương', 'Cao Bang': 'Hải Dương', 'Cao Bằng': 'Hải Dương', 'Bac Kan': 'Hải Dương', 'Bắc Kạn': 'Hải Dương',
    'Phu Tho': 'Sơn Tây', 'Phú Thọ': 'Sơn Tây', 'Tuyen Quang': 'Sơn Tây', 'Tuyên Quang': 'Sơn Tây', 'Ha Giang': 'Sơn Tây', 'Hà Giang': 'Sơn Tây', 'Yen Bai': 'Sơn Tây', 'Yên Bái': 'Sơn Tây', 'Lao Cai': 'Sơn Tây', 'Lào Cai': 'Sơn Tây',
    'Hoa Binh': 'Hưng Hóa', 'Hòa Bình': 'Hưng Hóa', 'Son La': 'Hưng Hóa', 'Sơn La': 'Hưng Hóa', 'Dien Bien': 'Hưng Hóa', 'Điện Biên': 'Hưng Hóa', 'Lai Chau': 'Hưng Hóa', 'Lai Châu': 'Hưng Hóa',
    'Thanh Hoa': 'Thanh Hóa', 'Thanh Hóa': 'Thanh Hóa', 'Nghe An': 'Nghệ An', 'Nghệ An': 'Nghệ An', 'Ha Tinh': 'Nghệ An', 'Hà Tĩnh': 'Nghệ An',
    'Quang Binh': 'Thuận Hóa', 'Quảng Bình': 'Thuận Hóa', 'Quang Tri': 'Thuận Hóa', 'Quảng Trị': 'Thuận Hóa', 'Thua Thien Hue': 'Thuận Hóa', 'Thừa Thiên Huế': 'Thuận Hóa',
    'Da Nang': 'Quảng Nam', 'Đà Nẵng': 'Quảng Nam', 'Quang Nam': 'Quảng Nam', 'Quảng Nam': 'Quảng Nam', 'Quang Ngai': 'Quảng Nam', 'Quảng Ngãi': 'Quảng Nam',
    'Binh Dinh': 'Quy Nhơn', 'Bình Định': 'Quy Nhơn', 'Phu Yen': 'Quy Nhơn', 'Phú Yên': 'Quy Nhơn', 'Khanh Hoa': 'Quy Nhơn', 'Khánh Hòa': 'Quy Nhơn', 'Kon Tum': 'Quy Nhơn', 'Kon Tum': 'Quy Nhơn', 'Gia Lai': 'Quy Nhơn', 'Gia Lai': 'Quy Nhơn', 'Dak Lak': 'Quy Nhơn', 'Đắk Lắk': 'Quy Nhơn',
    'Ninh Thuan': 'Panduranga', 'Ninh Thuận': 'Panduranga', 'Binh Thuan': 'Panduranga', 'Bình Thuận': 'Panduranga', 'Lam Dong': 'Panduranga', 'Lâm Đồng': 'Panduranga', 'Dak Nong': 'Panduranga', 'Đắk Nông': 'Panduranga',
    'Ho Chi Minh': 'Thủy Chân Lạp', 'Hồ Chí Minh': 'Thủy Chân Lạp', 'Dong Nai': 'Thủy Chân Lạp', 'Đồng Nai': 'Thủy Chân Lạp', 'Binh Duong': 'Thủy Chân Lạp', 'Bình Dương': 'Thủy Chân Lạp', 'Ba Ria-Vung Tau': 'Thủy Chân Lạp', 'Bà Rịa - Vũng Tàu': 'Thủy Chân Lạp', 'Tay Ninh': 'Thủy Chân Lạp', 'Tây Ninh': 'Thủy Chân Lạp', 'Binh Phuoc': 'Thủy Chân Lạp', 'Bình Phước': 'Thủy Chân Lạp', 'Long An': 'Thủy Chân Lạp', 'Long An': 'Thủy Chân Lạp', 'Tien Giang': 'Thủy Chân Lạp', 'Tiền Giang': 'Thủy Chân Lạp', 'Ben Tre': 'Thủy Chân Lạp', 'Bến Tre': 'Thủy Chân Lạp', 'Dong Thap': 'Thủy Chân Lạp', 'Đồng Tháp': 'Thủy Chân Lạp', 'Vinh Long': 'Thủy Chân Lạp', 'Vĩnh Long': 'Thủy Chân Lạp', 'Tra Vinh': 'Thủy Chân Lạp', 'Trà Vinh': 'Thủy Chân Lạp', 'Can Tho': 'Thủy Chân Lạp', 'Cần Thơ': 'Thủy Chân Lạp', 'Hau Giang': 'Thủy Chân Lạp', 'Hậu Giang': 'Thủy Chân Lạp', 'An Giang': 'Thủy Chân Lạp', 'An Giang': 'Thủy Chân Lạp', 'Kien Giang': 'Thủy Chân Lạp', 'Kiên Giang': 'Thủy Chân Lạp', 'Soc Trang': 'Thủy Chân Lạp', 'Sóc Trăng': 'Thủy Chân Lạp', 'Bac Lieu': 'Thủy Chân Lạp', 'Bạc Liêu': 'Thủy Chân Lạp', 'Ca Mau': 'Thủy Chân Lạp', 'Cà Mau': 'Thủy Chân Lạp'
};
const vietnamCountyToFuMap = {
    'Thăng Long': 'Giao Chỉ', 'Sơn Nam': 'Giao Chỉ', 'Hải Dương': 'Giao Chỉ', 'Sơn Tây': 'Giao Chỉ', 'Hưng Hóa': 'Giao Chỉ', 'Thanh Hóa': 'Thanh Hoa', 'Nghệ An': 'Thanh Hoa', // Lãnh thổ Chúa Trịnh
    'Thuận Hóa': 'Thuận Hóa', 'Quảng Nam': 'Quảng Nam', 'Quy Nhơn': 'Chiêm Thành', 'Panduranga': 'Chiêm Thành', 'Thủy Chân Lạp': 'Thủy Chân Lạp' // Lãnh thổ Quảng Nam
};

const mughalToCountyMap = {
    'Dhaka': 'Đông Bengal', 'Dhaka': 'Đông Bengal', 'Chittagong': 'Đông Bengal', 'Chittagong': 'Đông Bengal', 'Sylhet': 'Đông Bengal', 'Rajshahi': 'Đông Bengal', 'Khulna': 'Đông Bengal', 'Barisal': 'Đông Bengal', 'Rangpur': 'Đông Bengal', 'Mymensingh': 'Đông Bengal',
    'Punjab': 'Punjab', 'Punjab': 'Punjab', 'Islamabad': 'Punjab', 'Islamabad': 'Punjab', 'Himachal': 'Punjab', 'Himachal Pradesh': 'Punjab',
    'Sindh': 'Sindh', 'Sindh': 'Sindh', 'Balochistan': 'Balochistan', 'Balochistan': 'Balochistan', 'Khyber': 'Khyber', 'Khyber': 'Khyber', 'FATA': 'Khyber',
    'Delhi': 'Delhi', 'Delhi': 'Delhi', 'Haryana': 'Delhi', 'Haryana': 'Delhi', 'Chandigarh': 'Delhi', 'Chandigarh': 'Delhi',
    'Uttar Pradesh': 'Awadh', 'Uttar Pradesh': 'Awadh', 'Uttarakhand': 'Awadh', 'Uttarakhand': 'Awadh',
    'Bihar': 'Bihar', 'Bihar': 'Bihar', 'Jharkhand': 'Bihar', 'Jharkhand': 'Bihar',
    // [Điểm sửa đổi]: Đã loại bỏ Tripura(Tripura) và Meghalaya(Meghalaya), Đảm bảo Tây Bengal tuyệt đối chỉ nằm ở phía tây
    'West Bengal': 'Tây Bengal', 'Tây Bengal': 'Tây Bengal', 
    // [Điểm sửa đổi]: Sáp nhập chúng vào Assam, về mặt địa lý chúng vừa vặn tạo thành mảng Đông Bắc Ấn Độ liên tục, loại bỏ hoàn hảo các vùng đất bị bao quanh.
    'Assam': 'Assam', 'Assam': 'Assam', 'Arunachal': 'Assam', 'Arunachal Pradesh': 'Assam', 'Nagaland': 'Assam', 'Nagaland': 'Assam', 'Manipur': 'Assam', 'Manipur': 'Assam', 'Mizoram': 'Assam', 'Mizoram': 'Assam', 'Tripura': 'Assam', 'Tripura': 'Assam', 'Meghalaya': 'Assam', 'Meghalaya': 'Assam',
    'Odisha': 'Odisha', 'Odisha': 'Odisha', 'Orissa': 'Odisha',
    'Madhya Pradesh': 'Madhya Pradesh', 'Madhya Pradesh': 'Madhya Pradesh', 'Chhattisgarh': 'Madhya Pradesh', 'Chhattisgarh': 'Madhya Pradesh',
    'Rajasthan': 'Rajasthan', 'Rajasthan': 'Rajasthan',
    'Gujarat': 'Gujarat', 'Gujarat': 'Gujarat', 'Daman': 'Gujarat', 'Daman': 'Gujarat', 'Dadra': 'Gujarat', 'Dadra': 'Gujarat',
    'Maharashtra': 'Maharashtra', 'Maharashtra': 'Maharashtra', 'Goa': 'Maharashtra', 'Goa': 'Maharashtra',
    'Telangana': 'Telangana', 'Telangana': 'Telangana', 'Andhra Pradesh': 'Telangana', 'Andhra Pradesh': 'Telangana',
    'Karnataka': 'Karnataka', 'Karnataka': 'Karnataka',
    'Tamil Nadu': 'Madurai', 'Tamil Nadu': 'Madurai', 'Kerala': 'Madurai', 'Kerala': 'Madurai', 'Puducherry': 'Madurai', 'Puducherry': 'Madurai', 'Lakshadweep': 'Madurai',
    'Jammu': 'Kashmir', 'Jammu': 'Kashmir', 'Kashmir': 'Kashmir', 'Kashmir': 'Kashmir', 'Ladakh': 'Kashmir', 'Ladakh': 'Kashmir', 'Gilgit': 'Kashmir', 'Azad Kashmir': 'Kashmir'
};

const mughalCountyToFuMap = {
    'Punjab': 'Lahore', 'Sindh': 'Multan', 'Balochistan': 'Multan', 'Khyber': 'Kabul', 'Kashmir': 'Kabul',
    'Delhi': 'Delhi', 'Awadh': 'Delhi', 'Rajasthan': 'Ajmer', 'Gujarat': 'Gujarat', 'Madhya Pradesh': 'Malwa',
    'Bihar': 'Bihar', 'Odisha': 'Bihar', 'Tây Bengal': 'Bengal', 'Đông Bengal': 'Bengal', 'Assam': 'Assam',
    'Maharashtra': 'Deccan', 'Telangana': 'Deccan', 'Karnataka': 'Deccan', 'Madurai': 'Nam Ấn Độ'
};


const mingProvinceColors = {
    'Bắc Trực Lệ':'#c0392b','Nam Trực Lệ':'#d4a017','Sơn Đông':'#e67e22','Sơn Tây':'#8e6b3e','Hà Nam':'#b8860b',
    'Thiểm Tây':'#a0522d','Hồ Quảng':'#2e7d32','Giang Tây':'#558b2f','Chiết Giang':'#00796b','Phúc Kiến':'#1565c0',
    'Quảng Đông':'#6a1b9a','Quảng Tây':'#4a148c','Vân Nam':'#c62828','Quý Châu':'#ad1457','Tứ Xuyên':'#d84315',
    'Liêu Đông':'#5d4037','Ninh Hạ':'#8d6e63', 'Hậu Kim':'#4a6fa5', 'Dã Nhân Nữ Chân':'#78909c',
    'Sát Cáp Nhĩ':'#b8953a', 'Thổ Mặc Đặc':'#b8953a', 'Đóa Nhan Tam Vệ':'#b8953a', 'Khách Nhĩ Khách (Khalkha)':'#8d6e63',
    'Tây Vực':'#9e9e9e','Ô Tư Tạng':'#795548','Thanh Hải':'#a1887f','Đông Phiên':'#546e7a',
    'Nhật Bản':'#6a4c52', 'Lưu Cầu':'#2e8b57', 'Triều Tiên':'#666666', 'An Nam':'#445544', 'Mughal':'#554433', // Nhật Bản đổi thành màu đỏ sẫm cổ điển
    'Xiêm La':'#556644', 'Bhutan':'#665544', 'Nepal':'#554455', 'Luzon':'#445566',
    'Java':'#444455', 'Úc':'#444444', 'Lạn Thương':'#555544'
};

const mingLegendNames = [
    'Bắc Trực Lệ','Nam Trực Lệ','Sơn Đông','Sơn Tây','Hà Nam','Thiểm Tây','Hồ Quảng','Giang Tây','Chiết Giang','Phúc Kiến',
    'Quảng Đông','Quảng Tây','Vân Nam','Quý Châu','Tứ Xuyên','Liêu Đông','Ninh Hạ','Hậu Kim','Dã Nhân Nữ Chân',
    'Sát Cáp Nhĩ', 'Thổ Mặc Đặc', 'Đóa Nhan Tam Vệ', 'Khách Nhĩ Khách', 'Tây Vực','Ô Tư Tạng','Thanh Hải','Đông Phiên', 'Lưu Cầu' // Chú giải thêm Lưu Cầu
];

const mingProvinceCenters = {
    'Bắc Trực Lệ':[116.40,39.90], 'Nam Trực Lệ':[118.78,32.04], 'Sơn Đông':[117.00,36.65],
    'Sơn Tây':[112.55,37.87], 'Hà Nam':[114.30,34.80], 'Thiểm Tây':[108.94,34.26],
    'Hồ Quảng':[112.94,28.23], 'Giang Tây':[115.86,28.68], 'Chiết Giang':[120.15,30.28],
    'Phúc Kiến':[119.30,26.08], 'Quảng Đông':[113.26,23.13], 'Quảng Tây':[108.33,22.82],
    'Vân Nam':[102.68,25.04], 'Quý Châu':[106.63,26.65], 'Tứ Xuyên':[104.07,30.57],
    'Liêu Đông':[123.00,41.50], 'Ninh Hạ':[106.27,38.47], 'Hậu Kim':[125.00,43.00],
    'Dã Nhân Nữ Chân':[130.00,46.00], 'Sát Cáp Nhĩ':[115.00,43.00], 'Thổ Mặc Đặc':[111.00,41.00],
    'Đóa Nhan Tam Vệ':[120.00,41.00], 'Khách Nhĩ Khách (Khalkha)':[105.00,46.00], 'Tây Vực':[85.00,40.00],
    'Ô Tư Tạng':[90.00,30.00], 'Thanh Hải':[95.00,35.00], 'Đông Phiên':[121.00,23.50],
    'Nhật Bản':[138.00,36.00], 'Lưu Cầu':[127.67, 26.21], 'Triều Tiên':[127.00,39.00], 'An Nam':[105.00,19.00], // Thêm tâm điểm Lưu Cầu
    'Mughal':[78.00,22.00], 'Xiêm La':[100.00,15.00], 'Bhutan':[90.00,27.50],
    'Nepal':[84.00,28.00], 'Luzon':[121.00,15.00], 'Java':[110.00,-7.00],
    'Úc':[133.00,-25.00], 'Lạn Thương':[102.00,18.00]
};


const mingFuZhouCenters = {
    'Nam Trực Lệ':[{name:'Ứng Thiên phủ',lng:118.78,lat:32.04},{name:'Phượng Dương phủ',lng:117.57,lat:32.86},{name:'Hoài An phủ',lng:119.02,lat:33.61},{name:'Dương Châu phủ',lng:119.42,lat:32.39},{name:'Tô Châu phủ',lng:120.58,lat:31.30},{name:'Tùng Giang phủ',lng:121.24,lat:31.03},{name:'Thường Châu phủ',lng:119.97,lat:31.81},{name:'Trấn Giang phủ',lng:119.44,lat:32.20},{name:'Lư Châu phủ',lng:117.23,lat:31.82},{name:'An Khánh phủ',lng:117.06,lat:30.53},{name:'Thái Bình phủ',lng:118.51,lat:31.57},{name:'Trì Châu phủ',lng:117.49,lat:30.66},{name:'Ninh Quốc phủ',lng:118.75,lat:30.94},{name:'Huy Châu phủ',lng:118.34,lat:29.72},{name:'Từ Châu',lng:117.28,lat:34.26},{name:'Trừ Châu',lng:118.33,lat:32.30},{name:'Hòa Châu',lng:118.37,lat:31.74},{name:'Quảng Đức châu',lng:119.42,lat:30.89}],
    'Bắc Trực Lệ':[{name:'Thuận Thiên phủ',lng:116.40,lat:39.90},{name:'Bảo Định phủ',lng:115.48,lat:38.87},{name:'Hà Gian phủ',lng:116.09,lat:38.44},{name:'Chân Định phủ',lng:114.50,lat:38.14},{name:'Thuận Đức phủ',lng:114.50,lat:37.07},{name:'Quảng Bình phủ',lng:114.50,lat:36.60},{name:'Đại Danh phủ',lng:115.15,lat:36.28},{name:'Vĩnh Bình phủ',lng:118.68,lat:39.89},{name:'Diên Khánh châu',lng:115.97,lat:40.47},{name:'Bảo An châu',lng:115.30,lat:40.35}],
    'Hồ Quảng':[{name:'Vũ Xương phủ',lng:114.30,lat:30.57},{name:'Hán Dương phủ',lng:114.15,lat:30.52},{name:'Hoàng Châu phủ',lng:114.87,lat:30.45},{name:'Thừa Thiên phủ',lng:112.58,lat:31.17},{name:'Đức An phủ',lng:113.69,lat:31.26},{name:'Kinh Châu phủ',lng:112.24,lat:30.33},{name:'Tương Dương phủ',lng:112.14,lat:32.02},{name:'Trường Sa phủ',lng:112.94,lat:28.23},{name:'Hành Châu phủ',lng:112.57,lat:26.89},{name:'Vĩnh Châu phủ',lng:111.61,lat:26.42},{name:'Bảo Khánh phủ',lng:111.47,lat:27.24},{name:'Thường Đức phủ',lng:111.70,lat:29.03},{name:'Thần Châu Phủ',lng:110.39,lat:28.46},{name:'Vẫn Dương Phủ',lng:110.80,lat:32.63},{name:'Nhạc Châu Phủ',lng:113.09,lat:29.37},{name:'Thi Châu Vệ',lng:109.48,lat:30.27},{name:'Đại Dung Vệ',lng:110.48,lat:29.13}, {name:'Tĩnh Châu',lng:109.68,lat:26.57}, {name:'Sâm Châu',lng:113.02,lat:25.79}],
    'Tứ Xuyên':[{name:'Thành Đô Phủ',lng:104.07,lat:30.57},{name:'Trùng Khánh Phủ',lng:106.55,lat:29.57},{name:'Tuân Nghĩa Phủ',lng:106.90,lat:27.70},{name:'Bảo Ninh Phủ',lng:105.97,lat:31.58},{name:'Thuận Khánh Phủ',lng:106.08,lat:30.80},{name:'Tự Châu Phủ',lng:104.63,lat:28.77},{name:'Quỳ Châu Phủ',lng:109.50,lat:31.05},{name:'Tùng Phan Vệ',lng:103.60,lat:32.65},{name:'Kiến Xương Vệ',lng:102.18,lat:27.90},{name:'Long An Phủ',lng:104.53,lat:32.40},{name:'Mã Hồ Phủ',lng:104.16,lat:28.64},{name:'Đồng Xuyên Châu',lng:105.09,lat:31.09},{name:'Gia Định Châu',lng:103.76,lat:29.58},{name:'Nhã Châu',lng:102.99,lat:29.97},{name:'Lô Châu',lng:105.44,lat:28.88}, {name:'Ô Mông Phủ',lng:103.71,lat:27.33}, {name:'Ô Tát Vệ',lng:104.28,lat:26.85}, {name:'Đông Xuyên Phủ',lng:103.30,lat:26.41}, {name:'Trấn Hùng Phủ',lng:104.87,lat:27.43}, {name:'Mi Châu',lng:103.83,lat:30.04}, {name:'Cùng Châu',lng:103.46,lat:30.41}, {name:'Mdo Kham(Tứ Xuyên)',lng:100.00,lat:31.00}],
    'Giang Tây':[{name:'Nam Xương Phủ',lng:115.86,lat:28.68},{name:'Cửu Giang Phủ',lng:115.99,lat:29.71},{name:'Cám Châu Phủ',lng:114.94,lat:25.83},{name:'Cát An Phủ',lng:114.99,lat:27.11},{name:'Phủ Châu Phủ',lng:116.35,lat:27.95},{name:'Kiến Xương Phủ',lng:116.63,lat:27.56},{name:'Quảng Tín Phủ',lng:117.94,lat:28.45}, {name:'Nhiêu Châu Phủ',lng:116.68,lat:28.99}, {name:'Thụy Châu Phủ',lng:115.37,lat:28.41},{name:'Viên Châu Phủ',lng:114.38,lat:27.80}, {name:'Lâm Giang Phủ',lng:115.54,lat:28.05}, {name:'Nam Khang Phủ',lng:116.04,lat:29.44},{name:'Nam An Phủ',lng:114.36,lat:25.39}],
    'Chiết Giang':[{name:'Hàng Châu Phủ',lng:120.15,lat:30.28},{name:'Gia Hưng Phủ',lng:120.75,lat:30.76},{name:'Hồ Châu Phủ',lng:120.09,lat:30.87},{name:'Ninh Ba Phủ',lng:121.55,lat:29.87},{name:'Thiệu Hưng Phủ',lng:120.58,lat:30.03},{name:'Phủ Ôn Châu',lng:120.70,lat:28.00},{name:'Phủ Kim Hoa',lng:119.65,lat:29.08},{name:'Phủ Cù Châu',lng:118.87,lat:28.93}, {name:'Phủ Nghiêm Châu',lng:119.28,lat:29.47},{name:'Phủ Thai Châu',lng:121.12,lat:28.85}, {name:'Phủ Xử Châu',lng:119.92,lat:28.46}],
    'Phúc Kiến':[{name:'Phủ Phúc Châu',lng:119.30,lat:26.08},{name:'Phủ Tuyền Châu',lng:118.58,lat:24.90},{name:'Phủ Chương Châu',lng:117.65,lat:24.51},{name:'Phủ Kiến Ninh',lng:118.18,lat:27.03},{name:'Phủ Đinh Châu',lng:116.35,lat:25.83},{name:'Phủ Diên Bình',lng:118.17,lat:26.63},{name:'Phủ Thiệu Vũ',lng:117.49,lat:27.34},{name:'Phủ Hưng Hóa',lng:119.00,lat:25.43}, {name:'Châu Phúc Ninh',lng:120.00,lat:26.88}],
    'Quảng Đông':[{name:'Phủ Quảng Châu',lng:113.26,lat:23.13},{name:'Phủ Triều Châu',lng:116.63,lat:23.66},{name:'Phủ Huệ Châu',lng:114.42,lat:23.08},{name:'Phủ Triệu Khánh',lng:112.46,lat:23.05},{name:'Phủ Cao Châu',lng:110.85,lat:21.92},{name:'Phủ Quỳnh Châu',lng:110.35,lat:20.02},{name:'Phủ Thiều Châu',lng:113.59,lat:24.80}, {name:'Phủ Nam Hùng',lng:114.30,lat:25.11},{name:'Phủ Lôi Châu',lng:110.09,lat:20.91},{name:'Phủ Liêm Châu',lng:109.20,lat:21.66},{name:'Châu La Định',lng:111.56,lat:22.77}],
    'Quảng Tây':[{name:'Phủ Quế Lâm',lng:110.28,lat:25.27},{name:'Phủ Nam Ninh',lng:108.33,lat:22.82},{name:'Phủ Liễu Châu',lng:109.40,lat:24.33},{name:'Phủ Ngô Châu',lng:111.34,lat:23.48}, {name:'Phủ Tầm Châu',lng:110.08,lat:23.39}, {name:'Phủ Thái Bình',lng:107.35,lat:22.40}, {name:'Phủ Trấn An',lng:106.62,lat:23.32}, {name:'Phủ Tư Minh',lng:107.07,lat:22.13}, {name:'Phủ Bình Lạc',lng:110.64,lat:24.63}, {name:'Phủ Khánh Viễn',lng:108.64,lat:24.48}, {name:'Phủ Tư Ân',lng:108.16,lat:23.43}, {name:'Châu Tứ Thành',lng:106.62,lat:24.34}],
    'Vân Nam':[{name:'Phủ Vân Nam',lng:102.68,lat:25.04},{name:'Phủ Đại Lý',lng:100.23,lat:25.61},{name:'Lâm An phủ',lng:102.82,lat:23.62},{name:'Vĩnh Xương phủ',lng:99.18,lat:25.11},{name:'Quảng Nam phủ',lng:105.05,lat:24.05},{name:'Thuận Ninh phủ',lng:99.92,lat:24.60},{name:'Xa Lý Tuyên úy ty',lng:100.80,lat:22.00}, {name:'Khúc Tĩnh phủ',lng:103.79,lat:25.49}, {name:'Trừng Giang phủ',lng:102.91,lat:24.67}, {name:'Vũ Định phủ',lng:102.40,lat:25.53}, {name:'Quảng Tây phủ',lng:103.76,lat:24.52}, {name:'Nguyên Giang phủ',lng:101.99,lat:23.59}, {name:'Sở Hùng phủ',lng:101.54,lat:25.04}, {name:'Diêu An phủ',lng:101.24,lat:25.50}, {name:'Hạc Khánh phủ',lng:100.17,lat:26.55}, {name:'Lệ Giang phủ',lng:100.23,lat:26.88}, {name:'Cảnh Đông phủ',lng:100.83,lat:24.45}, {name:'Trấn Nguyên phủ',lng:100.89,lat:24.00}, {name:'Mông Hóa phủ',lng:100.30,lat:25.23}],
    'Quý Châu':[{name:'Quý Dương phủ',lng:106.63,lat:26.65},{name:'An Thuận phủ',lng:105.95,lat:26.25},{name:'Tư Nam phủ',lng:108.25,lat:27.94},{name:'Lê Bình phủ',lng:109.18,lat:26.23},{name:'Đô Quân phủ',lng:107.52,lat:26.26}, {name:'Bình Việt phủ',lng:107.51,lat:26.70}, {name:'Tư Châu phủ',lng:108.73,lat:27.18}, {name:'Đồng Nhân phủ',lng:109.19,lat:27.71}, {name:'Thạch Thiên phủ',lng:108.22,lat:27.52}, {name:'Trấn Viễn phủ',lng:108.42,lat:27.05}, {name:'Thủy Tây Tuyên úy ty',lng:105.61,lat:27.05}, {name:'Phổ An châu',lng:104.90,lat:25.09}],
    'Sơn Tây':[{name:'Thái Nguyên phủ',lng:112.55,lat:37.87},{name:'Đại Đồng phủ',lng:113.30,lat:40.08},{name:'Bình Dương phủ',lng:111.50,lat:36.08},{name:'Lộ An phủ',lng:113.12,lat:36.20},{name:'Phần Châu phủ',lng:111.77,lat:37.17}, {name:'Trạch Châu',lng:112.85,lat:35.49}, {name:'Liêu Châu',lng:113.37,lat:37.08}, {name:'Thấm Châu',lng:112.69,lat:36.75}],
    'Thiểm Tây':[{name:'Tây An phủ',lng:108.94,lat:34.26},{name:'Phượng Tường phủ',lng:107.38,lat:34.52},{name:'Hán Trung phủ',lng:107.03,lat:33.07},{name:'Diên An phủ',lng:109.47,lat:36.60},{name:'Khánh Dương phủ',lng:107.64,lat:35.73},{name:'Bình Lương phủ',lng:106.68,lat:35.54},{name:'Củng Xương phủ',lng:104.63,lat:35.00},{name:'Lâm Thao phủ',lng:103.86,lat:35.38},{name:'Hưng Yên Châu',lng:109.02,lat:32.68},{name:'Túc Châu Vệ',lng:98.50,lat:39.73}, {name:'Cam Châu Vệ',lng:100.45,lat:38.93}, {name:'Lương Châu Vệ',lng:102.63,lat:37.93}, {name:'Lan Châu',lng:103.82,lat:36.05}, {name:'Thao Châu Vệ',lng:103.53,lat:34.69}, {name:'Tây Ninh Vệ',lng:101.78,lat:36.62}],
    'Ninh Hạ':[{name:'Ninh Hạ Vệ',lng:106.27,lat:38.47}],
    'Sơn Đông':[{name:'Tế Nam Phủ',lng:117.00,lat:36.65},{name:'Duyện Châu Phủ',lng:116.83,lat:35.55},{name:'Đông Xương Phủ',lng:115.97,lat:36.45},{name:'Thanh Châu Phủ',lng:118.48,lat:36.68},{name:'Lai Châu Phủ',lng:119.94,lat:37.18},{name:'Đăng Châu Phủ',lng:121.00,lat:37.80}],
    'Hà Nam':[{name:'Khai Phong Phủ',lng:114.30,lat:34.80},{name:'Hà Nam Phủ',lng:112.44,lat:34.66},{name:'Quy Đức Phủ',lng:115.65,lat:34.42},{name:'Nhữ Ninh Phủ',lng:114.03,lat:32.98},{name:'Nam Dương Phủ',lng:112.53,lat:33.00},{name:'Chương Đức Phủ',lng:114.35,lat:36.10},{name:'Vệ Huy Phủ',lng:114.06,lat:35.40},{name:'Hoài Khánh Phủ',lng:113.08,lat:35.10}, {name:'Nhữ Châu',lng:112.84,lat:34.16}],
    'Liêu Đông':[{name:'Thẩm Dương Trung Vệ',lng:123.43,lat:41.80},{name:'Liêu Dương Vệ',lng:123.17,lat:41.27},{name:'Kim Châu Vệ',lng:121.71,lat:39.10},{name:'Phục Châu Vệ',lng:122.00,lat:39.62},{name:'Hải Châu Vệ',lng:122.75,lat:40.88},{name:'Quảng Ninh Vệ',lng:121.13,lat:41.53},{name:'Quảng Ninh Trung đồn vệ',lng:121.13,lat:41.10},{name:'Thiết Lĩnh Vệ',lng:123.83,lat:42.28},{name:'Ninh Viễn Vệ',lng:120.71,lat:40.75},{name:'Quảng Ninh Hậu đồn vệ',lng:121.65,lat:42.01},{name:'Doanh Châu Vệ',lng:120.45,lat:41.57},{name:'Cái Châu Vệ',lng:122.35,lat:40.40},{name:'Phủ Thuận Thiên hộ sở',lng:123.97,lat:41.87},{name:'Phượng Hoàng Bảo',lng:124.06,lat:40.45},{name:'Trấn Giang Bảo',lng:124.37,lat:40.13},{name:'Nghĩa Châu Vệ',lng:121.24,lat:41.53},{name:'Quảng Ninh Hữu đồn vệ',lng:121.36,lat:41.17},{name:'Khai Nguyên Vệ',lng:124.03,lat:42.53},{name:'Quảng Ninh Tiền đồn vệ',lng:120.33,lat:40.35}],
    'Hậu Kim': [
        {name:'Hách Đồ A Lạp',lng:124.82,lat:41.74}, {name:'Bộ Trường Bạch Sơn',lng:128.18,lat:41.93}, 
        {name:'Bộ Ngõa Nhĩ Khách',lng:129.50,lat:42.90}, {name:'Ninh Cổ Tháp',lng:129.60,lat:44.35}, 
        {name:'Ô Lạp Thành',lng:126.55,lat:44.08}, {name:'Y Thông Bảo',lng:125.32,lat:43.88}, 
        {name:'Diệp Hách Thành',lng:124.28,lat:43.32}, {name:'Haa Đạt Thành',lng:125.14,lat:42.90}
    ],
    'Dã Nhân Nữ Chân': [
        {name:'A Lặc Sở Khách',lng:126.98,lat:45.54}, {name:'Sách Luân Bộ',lng:123.95,lat:47.33}, 
        {name:'Đỗ Nhĩ Bá Đặc bộ',lng:124.66,lat:46.50}, {name:'Hô Lan bộ',lng:126.98,lat:46.63}, 
        {name:'Bộ Hốt Nhĩ Cáp',lng:130.36,lat:46.80}, {name:'Mục Lăng bộ',lng:130.96,lat:45.30}, 
        {name:'Hách Triết bộ',lng:130.27,lat:47.33}, {name:'Sử Khuyển bộ',lng:131.15,lat:46.64}, 
        {name:'Bộ Khố Nhĩ Khách',lng:130.86,lat:45.77}, {name:'Bộ Tát Cáp Liên',lng:128.89,lat:47.72}, 
        {name:'Bộ Phi Nha Khách',lng:127.53,lat:50.24}, {name:'Sử Lộc bộ',lng:124.11,lat:52.33}, 
        {name:'Bộ Đạt Oát Nhĩ',lng:119.76,lat:49.21}
    ],
    'Sát Cáp Nhĩ': [
        {name:'Bộ Sát Cáp Nhĩ',lng:113.11,lat:41.03}, {name:'Bộ Tô Ni Đặc',lng:116.09,lat:43.93}
    ],
    'Thổ Mặc Đặc': [
        {name:'Bộ Thổ Mặc Đặc',lng:109.84,lat:40.65}, {name:'Ngạc Nhĩ Đa Tư bộ',lng:109.99,lat:39.81}, 
        {name:'Quy Hóa thành',lng:111.67,lat:40.82}, {name:'Bộ Ô Lạp Đặc',lng:107.41,lat:40.75}
    ],
    'Đóa Nhan Tam Vệ': [
        {name:'Doyan vệ',lng:118.95,lat:42.26}, {name:'Thái Ninh vệ',lng:122.25,lat:43.61}, 
        {name:'Phúc Dư vệ',lng:122.05,lat:46.07}, {name:'Bộ Khoa Nhĩ Thấm',lng:122.00,lat:44.00}
    ],
    'Thanh Hải': [{name:'Bộ Hòa Thạc Đặc',lng:101.00,lat:38.00}, {name:'Tất Lý vệ',lng:99.00,lat:35.00}, {name:'Mdo Kham(Thanh Hải)',lng:96.00,lat:33.00}],
    'Tây Vực': [{name:'Oirat',lng:85.00,lat:44.00}, {name:'Yarkent',lng:77.00,lat:38.00}, {name:'Turpan',lng:89.00,lat:42.00}, {name:'Hami vệ',lng:93.00,lat:42.00}],
    'Ô Tư Tạng': [{name:'Ô Tư Tạng',lng:91.00,lat:29.00}, {name:'Tạng Ba Hãn',lng:88.00,lat:29.00}, {name:'Mdo Kham',lng:97.00,lat:31.00}, {name:'Cổ Cách',lng:79.00,lat:31.00}],
    'Đông Phiên': [
        {name:'Kê Lung(Tây Bồ)',lng:121.74,lat:25.13}, 
        {name:'Đại Viên(Hà Lan)',lng:120.16,lat:23.00}, 
        {name:'Các bộ Đông Phiên',lng:121.00,lat:23.50}, 
        {name:'Bành Hồ Tuần kiểm ty',lng:119.56,lat:23.56}
    ],
    'Lưu Cầu': [{name:'Lưu Cầu quốc', lng: 127.67, lat: 26.21}], // Thêm thuộc tính cấp phủ độc lập của Lưu Cầu
    'Nhật Bản': [
        {name:'Kinai', lng: 135.50, lat: 34.69}, {name:'Tokaido', lng: 138.00, lat: 35.00},
        {name:'Tosando', lng: 139.00, lat: 36.50}, {name:'Hokurikudo', lng: 136.50, lat: 36.50},
        {name:'Sanindo', lng: 133.00, lat: 35.30}, {name:'Sanyodo', lng: 133.50, lat: 34.50},
        {name:'Nankaido', lng: 133.50, lat: 33.50}, {name:'Saikaido', lng: 130.50, lat: 33.00},
        {name:'Ezo', lng: 141.34, lat: 43.06} // Đã xóa Lưu Cầu ban đầu
    ],
        'Triều Tiên': [
        {name:'Gyeonggi-do', lng: 126.97, lat: 37.56},
        {name:'Pyongan-do', lng: 125.75, lat: 39.03},
        {name:'Hamgyong-do', lng: 127.53, lat: 39.91},
        {name:'Hwanghae-do', lng: 125.71, lat: 38.03},
        {name:'Gangwon-do', lng: 128.87, lat: 37.75},
        {name:'Chungcheong-do', lng: 127.12, lat: 36.45},
        {name:'Gyeongsang-do', lng: 128.60, lat: 35.85},
        {name:'Jeolla-do', lng: 126.95, lat: 35.16}
    ],
        'Khách Nhĩ Khách (Khalkha)': [
        {name:'Tusheet Hãn bộ', lng:106.90, lat:47.92}, 
        {name:'Bộ Xa Thần Hãn', lng:114.50, lat:48.07}, 
        {name:'Bộ Zasagt Khan', lng:96.84, lat:47.74}, 
        {name:'Hòa Thác Huy Đặc bộ', lng:92.00, lat:49.00}
    ],
    'Nepal': [
        {name:'Vương triều Malla', lng:85.32, lat:27.71}, 
        {name:'Kiều Tỉ Tây chư quốc', lng:83.98, lat:28.21}, 
        {name:'Các quốc gia Baisé', lng:82.00, lat:29.00}, 
        {name:'Vương triều Sen', lng:87.28, lat:26.81}
    ],
    'Bhutan': [
        {name:'Tây Bhutan', lng:89.41, lat:27.43}, 
        {name:'Trung Bhutan', lng:89.87, lat:27.58}, 
        {name:'Đông Bhutan', lng:90.50, lat:27.50}
    ],
        'Lạn Thương': [{name:'Luông Pha Băng', lng:102.14, lat:19.89}, {name:'Viêng Chăn', lng:102.60, lat:17.96}, {name:'Chăm Pa Sắc', lng:105.88, lat:15.11}, {name:'Mãnh Phan', lng:103.20, lat:19.30}],
    'Xiêm La': [{name:'Bắc Bộ', lng:99.00, lat:18.80}, {name:'Vùng lõi trung tâm', lng:100.50, lat:14.30}, {name:'Vùng Isan', lng:102.80, lat:16.00}, {name:'Bán đảo Mã Lai', lng:99.80, lat:8.40}],
    'Chúa Trịnh': [{name:'Giao Chỉ', lng:105.85, lat:21.02}, {name:'Thanh Hóa', lng:105.60, lat:19.30}],
    'Quảng Nam': [{name:'Thuận Hóa', lng:107.59, lat:16.46}, {name:'Quảng Nam', lng:108.20, lat:15.90}, {name:'Chiêm Thành', lng:109.10, lat:12.00}, {name:'Thủy Chân Lạp', lng:106.60, lat:10.80}],
    'Mughal': [{name:'Delhi', lng:77.20, lat:28.60}, {name:'Lahore', lng:74.30, lat:31.50}, {name:'Kabul', lng:69.10, lat:34.50}, {name:'Bengal', lng:90.40, lat:23.80}, {name:'Gujarat', lng:72.50, lat:22.30}, {name:'Malwa', lng:77.40, lat:23.20}, {name:'Deccan', lng:75.30, lat:19.80}, {name:'Bihar', lng:85.10, lat:25.60}, {name:'Ajmer', lng:74.60, lat:26.40}, {name:'Multan', lng:71.40, lat:30.20}, {name:'Assam', lng:92.90, lat:26.10}, {name:'Nam Ấn Độ', lng:78.10, lat:10.80}],
};


const modernCityToMingFu = {
    'Thành phố Nam Kinh':'Ứng Thiên Phủ','Thành phố Vô Tích':'Thường Châu Phủ','Thành phố Từ Châu':'Từ Châu','Thành phố Thường Châu':'Thường Châu Phủ','Thành phố Tô Châu':'Tô Châu Phủ',
    'Thành phố Nam Thông':'Dương Châu Phủ','Thành phố Liên Vân Cảng':'Hoài An Phủ','Thành phố Hoài An':'Hoài An Phủ','Thành phố Diêm Thành':'Hoài An Phủ','Thành phố Dương Châu':'Dương Châu Phủ',
    'Thành phố Trấn Giang':'Trấn Giang Phủ','Thành phố Thái Châu':'Dương Châu Phủ','Thành phố Túc Thiên':'Hoài An Phủ','Thành phố Hợp Phì':'Lư Châu Phủ','Thành phố Vu Hồ':'Thái Bình Phủ',
    'Thành phố Bạng Phụ':'Phượng Dương Phủ','Thành phố Hoài Nam':'Phượng Dương Phủ','Thành phố Mã An Sơn':'Thái Bình Phủ','Thành phố Hoài Bắc':'Phượng Dương Phủ','Thành phố Đồng Lăng':'Trì Châu Phủ',
    'Thành phố An Khánh':'An Khánh Phủ','Thành phố Hoàng Sơn':'Huy Châu Phủ','Thành phố Trừ Châu':'Trừ Châu','Thành phố Phụ Dương':'Phượng Dương Phủ','Thành phố Túc Châu':'Phượng Dương Phủ',
    'Thành phố Lục An':'Lư Châu Phủ','Thành phố Bạc Châu':'Phượng Dương Phủ','Thành phố Trì Châu':'Trì Châu Phủ','Thành phố Tuyên Thành':'Ninh Quốc Phủ',
    'Thành phố Thạch Gia Trang':'Chân Định Phủ','Thành phố Đường Sơn':'Vĩnh Bình Phủ','Thành phố Tần Hoàng Đảo':'Vĩnh Bình Phủ','Thành phố Hàm Đan':'Quảng Bình Phủ','Thành phố Hình Đài':'Thuận Đức Phủ',
    'Thành phố Bảo Định':'Bảo Định Phủ','Thành phố Trương Gia Khẩu':'Bảo An Châu','Thành phố Thừa Đức':'Doyan Vệ','Thành phố Lang Phường':'Thuận Thiên Phủ','Thành phố Hành Thủy':'Hà Gian Phủ','Thành phố Thương Châu':'Hà Gian Phủ',
    'Thành phố Hoàng Thạch':'Vũ Xương Phủ','Thành phố Thập Yển':'Vẫn Dương Phủ','Thành phố Nghi Xương':'Kinh Châu Phủ','Thành phố Tương Dương':'Tương Dương Phủ',
    'Thành phố Ngạc Châu':'Vũ Xương Phủ','Thành phố Kinh Môn':'Thừa Thiên Phủ','Thành phố Hiếu Cảm':'Đức An Phủ','Thành phố Kinh Châu':'Kinh Châu Phủ','Thành phố Hoàng Cương':'Hoàng Châu Phủ',
    'Thành phố Hàm Ninh':'Vũ Xương Phủ','Thành phố Tùy Châu':'Đức An Phủ','Thành phố Tiên Đào':'Thừa Thiên Phủ','Thành phố Thiên Môn':'Thừa Thiên Phủ','Thành phố Tiềm Giang':'Thừa Thiên Phủ','Lâm khu Thần Nông Giá':'Vẫn Dương Phủ',
    'Châu tự trị dân tộc Thổ Gia, Miêu Ân Thi':'Thi Châu Vệ','Thành phố Trường Sa':'Trường Sa Phủ','Thành phố Chu Châu':'Trường Sa Phủ','Thành phố Tương Đàm':'Trường Sa Phủ','Thành phố Hành Dương':'Hành Châu Phủ','Thành phố Thiệu Dương':'Bảo Khánh Phủ',
    'Thành phố Nhạc Dương':'Nhạc Châu Phủ','Thành phố Thường Đức':'Thường Đức Phủ','Thành phố Ích Dương':'Trường Sa Phủ','Thành phố Sâm Châu':'Sâm Châu','Thành phố Vĩnh Châu':'Vĩnh Châu Phủ',
    'Thành phố Hoài Hóa':'Thần Châu Phủ','Thành phố Lâu Để':'Bảo Khánh Phủ','Châu tự trị dân tộc Thổ Gia, Miêu Tương Tây':'Thần Châu Phủ','Thành phố Trương Gia Giới':'Đại Dung Vệ',
    'Thành phố Tế Nam':'Tế Nam Phủ','Thành phố Thanh Đảo':'Lai Châu Phủ','Thành phố Truy Bác':'Thanh Châu Phủ','Thành phố Tảo Trang':'Duyện Châu Phủ','Thành phố Đông Dinh':'Thanh Châu Phủ',
    'Thành phố Yên Đài':'Đăng Châu Phủ','Thành phố Duy Phường':'Thanh Châu Phủ','Thành phố Tế Ninh':'Duyện Châu Phủ','Thành phố Thái An':'Tế Nam Phủ','Thành phố Uy Hải':'Đăng Châu Phủ',
    'Thành phố Nhật Chiếu':'Thanh Châu Phủ','Thành phố Lâm Nghi':'Duyện Châu Phủ','Thành phố Đức Châu':'Tế Nam Phủ','Thành phố Liêu Thành':'Đông Xương Phủ','Thành phố Tân Châu':'Tế Nam Phủ','Thành phố Hà Trạch':'Duyện Châu Phủ',
    'Thành phố Trịnh Châu':'Khai Phong Phủ','Thành phố Khai Phong':'Khai Phong Phủ','Thành phố Lạc Dương':'Hà Nam Phủ','Thành phố Bình Đỉnh Sơn':'Nhữ Châu','Thành phố An Dương':'Chương Đức Phủ',
    'Thành phố Hạc Bích':'Vệ Huy Phủ','Thành phố Tân Hương':'Vệ Huy Phủ','Thành phố Tiêu Tác':'Hoài Khánh Phủ','Thành phố Bộc Dương':'Đại Danh Phủ','Thành phố Hứa Xương':'Khai Phong Phủ',
    'Thành phố Tháp Hà':'Khai Phong Phủ','Thành phố Tam Môn Hiệp':'Hà Nam Phủ','Thành phố Nam Dương':'Nam Dương Phủ','Thành phố Thương Khâu':'Quy Đức Phủ','Thành phố Tín Dương':'Nhữ Ninh Phủ',
    'Thành phố Chu Khẩu':'Khai Phong Phủ','Thành phố Trú Mã Điếm':'Nhữ Ninh Phủ','Thành phố Tế Nguyên':'Hoài Khánh Phủ',
    'Thành phố Tây An':'Tây An Phủ','Thành phố Đồng Xuyên':'Tây An Phủ','Thành phố Bảo Kê':'Phượng Tường Phủ','Thành phố Hàm Dương':'Tây An Phủ','Thành phố Vị Nam':'Tây An Phủ',
    'Thành phố Diên An':'Diên An Phủ','Thành phố Hán Trung':'Hán Trung Phủ','Thành phố Du Lâm':'Diên An Phủ','Thành phố An Khang':'Hưng Yên Châu','Thành phố Thương Lạc':'Tây An Phủ',
    'Thành phố Lan Châu':'Lâm Thao Phủ','Thành phố Thiên Thủy':'Củng Xương Phủ','Thành phố Bình Lương':'Bình Lương Phủ','Thành phố Khánh Dương':'Khánh Dương Phủ','Thành phố Định Tây':'Củng Xương Phủ',
    'Thành phố Lũng Nam':'Củng Xương phủ','Châu tự trị dân tộc Hồi Lâm Hạ':'Lâm Thao phủ','Châu tự trị dân tộc Tạng Cam Nam':'Thao Châu vệ','Thành phố Gia Dục Quan':'Túc Châu vệ',
    'Thành phố Kim Xương':'Lương Châu vệ','Thành phố Bạch Ngân':'Lan Châu','Thành phố Vũ Uy':'Lương Châu vệ','Thành phố Trương Dịch':'Cam Châu vệ','Thành phố Tửu Tuyền':'Túc Châu vệ',
    'Thành phố Ngân Xuyên':'Ninh Hạ Vệ','Thành phố Thạch Chủy Sơn':'Ninh Hạ Vệ','Thành phố Ngô Trung':'Ninh Hạ Vệ','Thành phố Cố Nguyên':'Bình Lương phủ','Thành phố Trung Vệ':'Ninh Hạ Vệ',
    'Thành phố Thành Đô':'Thành Đô phủ','Thành phố Tự Cống':'Tự Châu phủ','Thành phố Lư Châu':'Lô Châu','Thành phố Đức Dương':'Thành Đô phủ','Thành phố Miên Dương':'Thành Đô phủ',
    'Thành phố Quảng Nguyên':'Bảo Ninh phủ','Thành phố Toại Ninh':'Đồng Xuyên châu','Thành phố Nội Giang':'Thành Đô phủ','Thành phố Lạc Sơn':'Gia Định châu','Thành phố Nam Sung':'Thuận Khánh phủ',
    'Thành phố Mi Sơn':'Mi Châu','Thành phố Nghi Tân':'Tự Châu phủ','Thành phố Quảng An':'Thuận Khánh phủ','Thành phố Đạt Châu':'Quỳ Châu phủ','Thành phố Nhã An':'Nhã Châu',
    'Thành phố Ba Trung':'Bảo Ninh phủ','Thành phố Tư Dương':'Thành Đô phủ','Châu tự trị dân tộc Tạng, Khương A Bá':'Tùng Phan vệ','Châu tự trị dân tộc Tạng Cam Tư':'Mdo Kham(Tứ Xuyên)','Châu tự trị dân tộc Di Lương Sơn':'Kiến Xương vệ',
    'Thành phố Phàn Chi Hoa':'Kiến Xương vệ', 
    'Thành phố Nam Xương':'Nam Xương phủ','Thành phố Cảnh Đức Trấn':'Nhiêu Châu phủ','Thành phố Bằng Hương':'Viên Châu phủ','Thành phố Cửu Giang':'Cửu Giang phủ',
    'Thành phố Tân Dư':'Lâm Giang phủ','Thành phố Ưng Đàm':'Quảng Tín phủ','Thành phố Cám Châu':'Cám Châu phủ','Thành phố Cát An':'Cát An phủ','Thành phố Nghi Xuân':'Viên Châu phủ',
    'Thành phố Phủ Châu':'Phủ Châu phủ','Thành phố Thượng Nhiêu':'Quảng Tín phủ',
    'Thành phố Hàng Châu':'Hàng Châu phủ','Thành phố Ninh Ba':'Ninh Ba phủ','Thành phố Ôn Châu':'Ôn Châu phủ','Thành phố Gia Hưng':'Gia Hưng phủ','Thành phố Hồ Châu':'Hồ Châu phủ',
    'Thành phố Thiệu Hưng':'Thiệu Hưng phủ','Thành phố Kim Hoa':'Kim Hoa phủ','Thành phố Cù Châu':'Cù Châu phủ','Thành phố Chu Sơn':'Ninh Ba phủ','Thành phố Thai Châu':'Thai Châu phủ','Thành phố Lệ Thủy':'Xử Châu phủ',
    'Thành phố Phúc Châu':'Phúc Châu phủ','Thành phố Hạ Môn':'Tuyền Châu phủ','Thành phố Bồ Điền':'Hưng Hóa phủ','Thành phố Tam Minh':'Diên Bình phủ','Thành phố Tuyền Châu':'Tuyền Châu phủ',
    'Thành phố Chương Châu':'Chương Châu phủ','Thành phố Nam Bình':'Kiến Ninh phủ','Thành phố Long Nham':'Đinh Châu phủ','Thành phố Ninh Đức':'Phúc Ninh châu',
    'Thành phố Quảng Châu':'Quảng Châu phủ','Thành phố Thiều Quan':'Thiều Châu phủ','Thành phố Thâm Quyến':'Quảng Châu phủ','Thành phố Châu Hải':'Quảng Châu phủ','Thành phố Sán Đầu':'Triều Châu phủ',
    'Thành phố Phật Sơn':'Quảng Châu phủ','Thành phố Giang Môn':'Quảng Châu phủ','Thành phố Trạm Giang':'Cao Châu phủ','Thành phố Mậu Danh':'Cao Châu phủ','Thành phố Triệu Khánh':'Triệu Khánh phủ',
    'Thành phố Huệ Châu':'Huệ Châu phủ','Thành phố Mai Châu':'Triều Châu phủ','Thành phố Sán Vĩ':'Huệ Châu phủ','Thành phố Hà Nguyên':'Huệ Châu phủ','Thành phố Dương Giang':'Triệu Khánh phủ',
    'Thành phố Thanh Viễn':'Quảng Châu phủ','Thành phố Đông Quản':'Quảng Châu phủ','Thành phố Trung Sơn':'Quảng Châu phủ','Thành phố Triều Châu':'Triều Châu phủ','Thành phố Yết Dương':'Triều Châu phủ','Thành phố Vân Phù':'La Định châu',
    'Thành phố Nam Ninh':'Nam Ninh phủ','Thành phố Liễu Châu':'Liễu Châu phủ','Thành phố Quế Lâm':'Quế Lâm phủ','Thành phố Ngô Châu':'Ngô Châu phủ','Thành phố Bắc Hải':'Liêm Châu phủ',
    'Thành phố Phòng Thành Cảng':'Liêm Châu phủ','Thành phố Khâm Châu':'Liêm Châu phủ','Thành phố Quý Cảng':'Tầm Châu phủ','Thành phố Ngọc Lâm':'Ngô Châu phủ','Thành phố Bách Sắc':'Tứ Thành châu', 
    'Thành phố Hạ Châu':'Bình Lạc phủ','Thành phố Hà Trì':'Khánh Viễn phủ','Thành phố Lai Tân':'Liễu Châu phủ','Thành phố Sùng Tả':'Nam Ninh phủ',
    'Thành phố Côn Minh':'Vân Nam phủ','Thành phố Khúc Tĩnh':'Khúc Tĩnh phủ','Thành phố Ngọc Khê':'Trừng Giang phủ','Thành phố Bảo Sơn':'Vĩnh Xương phủ','Thành phố Chiêu Thông':'Ô Mông phủ',
    'Thành phố Lệ Giang':'Lệ Giang phủ','Thành phố Phổ Nhĩ':'Xa Lý Tuyên úy ty','Thành phố Lâm Thương':'Thuận Ninh phủ','Châu tự trị dân tộc Choang, Miêu Văn Sơn':'Quảng Nam phủ',
    'Châu tự trị dân tộc Cáp Nê, Di Hồng Hà':'Lâm An phủ','Châu tự trị dân tộc Thái Tây Song Bản Nạp':'Xa Lý Tuyên úy ty','Châu tự trị dân tộc Di Sở Hùng':'Sở Hùng phủ',
    'Châu tự trị dân tộc Bạch Đại Lý':'Đại Lý phủ','Châu tự trị dân tộc Thái, Cảnh Pha Đức Hoành':'Vĩnh Xương phủ','Châu tự trị dân tộc Lật Túc Nộ Giang':'Vĩnh Xương phủ','Châu tự trị dân tộc Tạng Địch Khánh':'Lệ Giang phủ',
    'Thành phố Quý Dương':'Quý Dương phủ','Thành phố Lục Bàn Thủy':'An Thuận phủ','Thành phố Tuân Nghĩa':'Tuân Nghĩa phủ','Thành phố An Thuận':'An Thuận phủ','Thành phố Tất Tiết':'Thủy Tây Tuyên úy ty',
    'Thành phố Đồng Nhân':'Tư Nam phủ','Châu tự trị dân tộc Bố Y, Miêu Kiềm Tây Nam':'Phổ An châu','Châu tự trị dân tộc Miêu, Đồng Kiềm Đông Nam':'Lê Bình phủ','Châu tự trị dân tộc Bố Y, Miêu Kiềm Nam':'Đô Quân phủ',
    'Thành phố Thái Nguyên':'Thái Nguyên phủ','Thành phố Đại Đồng':'Đại Đồng phủ','Thành phố Dương Tuyền':'Thái Nguyên phủ','Thành phố Trường Trị':'Lộ An phủ','Thành phố Tấn Thành':'Trạch Châu',
    'Thành phố Sóc Châu':'Đại Đồng phủ','Thành phố Tấn Trung':'Thái Nguyên phủ','Thành phố Vận Thành':'Bình Dương phủ','Thành phố Hãn Châu':'Thái Nguyên phủ','Thành phố Lâm Phần':'Bình Dương phủ','Thành phố Lữ Lương':'Phần Châu phủ',
    'Thành phố Thẩm Dương':'Thẩm Dương Trung Vệ','Thành phố Đại Liên':'Kim Châu vệ','Thành phố An Sơn':'Liêu Dương vệ','Thành phố Phủ Thuận':'Phủ Thuận Thiên hộ sở',
    'Thành phố Bản Khê':'Liêu Dương vệ','Thành phố Đan Đông':'Trấn Giang bảo','Thành phố Cẩm Châu':'Quảng Ninh Trung đồn vệ','Thành phố Dinh Khẩu':'Cái Châu vệ',
    'Thành phố Phụ Tân':'Quảng Ninh Hậu đồn vệ','Thành phố Liêu Dương':'Liêu Dương vệ','Thành phố Bàn Cẩm':'Quảng Ninh vệ','Thành phố Thiết Lĩnh':'Thiết Lĩnh vệ',
    'Thành phố Triều Dương':'Doanh Châu vệ','Thành phố Hồ Lô Đảo':'Ninh Viễn vệ',
    'Thành phố Trường Xuân':'Y Thông bảo', 'Thành phố Cát Lâm':'Ô Lạp thành', 'Thành phố Tứ Bình':'Diệp Hách thành', 'Thành phố Liêu Nguyên':'Haa Đạt thành',
    'Thành phố Thông Hóa':'Hách Đồ A Lạp', 'Thành phố Bạch Sơn':'Bộ Trường Bạch Sơn', 'Thành phố Tùng Nguyên':'Bộ Khoa Nhĩ Thấm', 'Thành phố Bạch Thành':'Thái Ninh vệ', 'Châu tự trị dân tộc Triều Tiên Diên Biên':'Bộ Ngõa Nhĩ Khách',
    'Thành phố Cáp Nhĩ Tân':'A Lặc Sở Khách', 'Thành phố Mẫu Đơn Giang':'Ninh Cổ Tháp', 'Thành phố Tề Tề Cáp Nhĩ':'Tác Luân bộ',
    'Thành phố Đại Khánh':'Đỗ Nhĩ Bá Đặc bộ', 'Thành phố Tuy Hóa':'Hô Lan bộ', 'Thành phố Giai Mộc Tư':'Bộ Hốt Nhĩ Haa',
    'Thành phố Kê Tây':'Mục Lăng bộ', 'Thành phố Hạc Cương':'Hách Triết bộ', 'Thành phố Song Áp Sơn':'Sử Khuyển bộ',
    'Thành phố Thất Đài Hà':'Bộ Khố Nhĩ Khách', 'Thành phố Y Xuân':'Bộ Tát Haa Liên', 'Thành phố Hắc Hà':'Bộ Phi Nha Khách',
    'Địa khu Đại Hưng An Lĩnh':'Sử Lộc bộ', 'Thành phố Hô Luân Bối Nhĩ':'Bộ Đạt Oát Nhĩ', 'Minh Hưng An':'Phúc Dư vệ',
    'Thành phố Hô Hòa Hạo Đặc':'Quy Hóa thành', 'Thành phố Bao Đầu':'Bộ Thổ Mặc Đặc', 'Thành phố Ngạc Nhĩ Đa Tư':'Ngạc Nhĩ Đa Tư bộ', 'Thành phố Ba Ngạn Náo Nhĩ':'Bộ Ô Lạp Đặc',
    'Thành phố Ô Lan Sát Bố':'Bộ Sát Cáp Nhĩ', 'Minh Tích Lâm Quách Lặc':'Bộ Tô Ni Đặc',
    'Thành phố Xích Phong':'Doyan vệ', 'Thành phố Thông Liêu':'Thái Ninh vệ', 'Minh A Lạp Thiện':'Ninh Hạ Vệ', 'Thành phố Ô Hải':'Ninh Hạ Vệ',
    'Thành phố Ô Lỗ Mộc Tề':'Oirat', 'Thành phố Khắc Lạp Mã Y':'Oirat', 'Thành phố Thổ Lỗ Phồn':'Thổ Lỗ Phiên', 'Thành phố Cáp Mật':'Haa Mật vệ', 'Châu tự trị dân tộc Hồi Xương Cát':'Oirat', 'Châu tự trị dân tộc Mông Cổ Bác Nhĩ Tháp Lạp':'Oirat', 'Châu tự trị dân tộc Mông Cổ Ba Âm Quách Lăng':'Yarkent', 'Địa khu A Khắc Tô':'Yarkent', 'Châu tự trị dân tộc Kyrgyz Khắc Tư Lặc Tô':'Yarkent', 'Địa khu Khách Thập':'Yarkent', 'Địa khu Hòa Điền':'Yarkent', 'Châu tự trị dân tộc Kazakh Y Lê':'Oirat', 'Địa khu Tháp Thành':'Oirat', 'Địa khu A勒 Thái':'Oirat',
    'Thành phố Lhasa (Lạp Tát)':'Ô Tư Tạng', 'Thành phố Nhật Khách Tắc':'Tạng Ba Hãn', 'Thành phố Xương Đô':'Mdo Kham', 'Thành phố Lâm Chi':'Ô Tư Tạng', 'Thành phố Sơn Nam':'Ô Tư Tạng', 'Thành phố Na Khúc':'Ô Tư Tạng', 'Địa khu A Lý':'Cổ Cách',
    'Thành phố Tây Ninh':'Tây Ninh Vệ', 'Thành phố Hải Đông':'Tây Ninh Vệ', 'Châu tự trị dân tộc Tạng Hải Bắc':'Bộ Hòa Thạc Đặc', 'Châu tự trị dân tộc Tạng Hoàng Nam':'Tất Lý Vệ', 'Châu tự trị dân tộc Tạng Hải Nam':'Tất Lý Vệ', 'Châu tự trị dân tộc Tạng Quả Lạc':'Mdo Kham(Thanh Hải)', 'Châu tự trị dân tộc Tạng Ngọc Thụ':'Mdo Kham(Thanh Hải)', 'Châu tự trị dân tộc Mông Cổ, Tạng Hải Tây':'Bộ Hòa Thạc Đặc', 'Thị trấn Đường Cổ Lạp Sơn':'Mdo Kham(Thanh Hải)',
    'Thành phố Đài Bắc':'Kê Lung(Tây Bồ)', 'Thành phố Đài Bắc':'Kê Lung(Tây Bồ)', 'Thành phố Tân Bắc':'Kê Lung(Tây Bồ)', 'Thành phố Cơ Long':'Kê Lung(Tây Bồ)', 'Thành phố Đào Viên':'Kê Lung(Tây Bồ)', 'Thành phố Đào Viên':'Kê Lung(Tây Bồ)', 'Huyện Nghi Lan':'Kê Lung(Tây Bồ)', 'Huyện Nghi Lan':'Kê Lung(Tây Bồ)',
    'Thành phố Đài Nam':'Đại Viên(Hà Lan)', 'Thành phố Đài Nam':'Đại Viên(Hà Lan)', 'Thành phố Cao Hùng':'Đại Viên(Hà Lan)', 'Thành phố Gia Nghĩa':'Đại Viên(Hà Lan)', 'Thành phố Gia Nghĩa':'Đại Viên(Hà Lan)', 'Huyện Gia Nghĩa':'Đại Viên(Hà Lan)', 'Huyện Gia Nghĩa':'Đại Viên(Hà Lan)', 'Huyện Bình Đông':'Đại Viên(Hà Lan)', 'Huyện Bình Đông':'Đại Viên(Hà Lan)',
    'Huyện Bành Hồ':'Bành Hồ Tuần kiểm ty', 'Huyện Bành Hồ':'Bành Hồ Tuần kiểm ty',
    'Thành phố Đài Trung':'Các bộ Đông Phiên', 'Thành phố Đài Trung':'Các bộ Đông Phiên', 'Thành phố Tân Trúc':'Các bộ Đông Phiên', 'Huyện Tân Trúc':'Các bộ Đông Phiên', 'Huyện Tân Trúc':'Các bộ Đông Phiên', 'Huyện Miêu Lật':'Các bộ Đông Phiên', 'Huyện Miêu Lật':'Các bộ Đông Phiên', 'Huyện Chương Hóa':'Các bộ Đông Phiên', 'Huyện Chương Hóa':'Các bộ Đông Phiên', 'Huyện Nam Đầu':'Các bộ Đông Phiên', 'Huyện Nam Đầu':'Các bộ Đông Phiên', 'Huyện Vân Lâm':'Các bộ Đông Phiên', 'Huyện Vân Lâm':'Các bộ Đông Phiên', 'Huyện Hoa Liên':'Các bộ Đông Phiên', 'Huyện Hoa Liên':'Các bộ Đông Phiên', 'Huyện Đài Đông':'Các bộ Đông Phiên', 'Huyện Đài Đông':'Các bộ Đông Phiên'
};



// ==========================================
// Mapping phân chia chi tiết thành phố cấp địa khu (Giải quyết trường hợp một thành phố hiện đại bao gồm nhiều phủ thời Minh)
// ==========================================
const citySplitConfig = {
    'Thành phố Bắc Kinh': { adcode: '110000', mapping: {'Quận Diên Khánh':'Diên Khánh Châu', 'default':'Thuận Thiên Phủ'} },
    'Thành phố Thượng Hải': { adcode: '310000', mapping: {'Quận Gia Định':'Tô Châu Phủ', 'Quận Bảo Sơn':'Tô Châu Phủ', 'Quận Sùng Minh':'Tô Châu Phủ', 'default':'Tùng Giang Phủ'} },
    'Thành phố Túc Châu': { adcode: '341300', mapping: {'Huyện Tiêu':'Từ Châu', 'Huyện Nãng Sơn':'Từ Châu', 'default':'Phượng Dương Phủ'} },
    'Thành phố Hoài An': { adcode: '320800', mapping: {'Huyện Hu Dị': 'Phượng Dương Phủ', 'default': 'Hoài An Phủ'} },
    'Thành phố Túc Thiên': { adcode: '321300', mapping: {'Huyện Tứ Hồng':'Phượng Dương Phủ', 'default':'Hoài An Phủ'} },
    'Châu tự trị dân tộc Mông Cổ, Tạng Hải Tây': { adcode: '632800', mapping: {'Thị trấn Đường Cổ Lạp Sơn':'Mdo Kham(Thanh Hải)', 'default':'Bộ Hòa Thạc Đặc'} },
    'Thành phố Vũ Hán': { adcode: '420100', mapping: {'Quận Vũ Xương':'Vũ Xương Phủ','Quận Thanh Sơn':'Vũ Xương Phủ','Quận Hồng Sơn':'Vũ Xương Phủ','Quận Giang Hạ':'Vũ Xương Phủ','Quận Hán Dương':'Hán Dương Phủ','Quận Thái Điền':'Hán Dương Phủ','Quận Đông Tây Hồ':'Hán Dương Phủ','Quận Hán Nam':'Hán Dương Phủ','Quận Giang Ngạn':'Hán Dương Phủ','Quận Giang Hán':'Hán Dương Phủ','Quận Kiều Khẩu':'Hán Dương Phủ','Quận Hoàng Bi':'Hoàng Châu Phủ','Quận Tân Châu':'Hoàng Châu Phủ', 'default':'Vũ Xương Phủ'} },
    'Thành phố Trùng Khánh': { adcode: '500000', mapping: {'Quận Vạn Châu':'Quỳ Châu Phủ','Huyện Phụng Tiết':'Quỳ Châu Phủ','Huyện Vu Sơn':'Quỳ Châu Phủ','Huyện Vu Khê':'Phủ Quỳ Châu','Huyện Vân Dương':'Phủ Quỳ Châu','Quận Khai Châu':'Phủ Quỳ Châu','Huyện Thành Khẩu':'Phủ Quỳ Châu', 'default': 'Phủ Trùng Khánh'} },
    'Thành phố Cửu Giang': { adcode: '360400', mapping: {'Thành phố Lư Sơn':'Phủ Nam Khang', 'Huyện Đô Xương':'Phủ Nam Khang', 'Huyện Vĩnh Tu':'Phủ Nam Khang', 'default':'Phủ Cửu Giang'} },
    'Thành phố Nghi Xuân': { adcode: '360900', mapping: {'Thành phố Cao An':'Phủ Thụy Châu', 'Huyện Thượng Cao':'Phủ Thụy Châu', 'Huyện Nghi Phong':'Phủ Thụy Châu', 'Thành phố Chương Thụ':'Phủ Lâm Giang', 'Thành phố Phong Thành':'Phủ Nam Xương', 'Huyện Tĩnh An':'Phủ Nam Xương', 'Huyện Phụng Tân':'Phủ Nam Xương', 'Huyện Đồng Cổ':'Phủ Nam Xương', 'default':'Phủ Viên Châu'} },
    'Thành phố Tân Dư': { adcode: '360500', mapping: {'Huyện Phân Nghi':'Phủ Viên Châu', 'default':'Phủ Lâm Giang'} },
    'Thành phố Cám Châu': { adcode: '360700', mapping: {'Huyện Đại Dư':'Phủ Nam An', 'Quận Nam Khang':'Phủ Nam An', 'Huyện Thượng Do':'Phủ Nam An', 'Huyện Sùng Nghĩa':'Phủ Nam An', 'default':'Phủ Cám Châu'} },
    'Thành phố Hàng Châu': { adcode: '330100', mapping: {'Thành phố Kiến Đức':'Phủ Nghiêm Châu', 'Huyện Thuần An':'Phủ Nghiêm Châu', 'Huyện Đồng Lư':'Phủ Nghiêm Châu', 'default':'Phủ Hàng Châu'} },
    'Thành phố Nam Xương': { adcode: '360100', mapping: {'Huyện An Nghĩa':'Phủ Nam Khang', 'default':'Phủ Nam Xương'} },
    'Thành phố Ưng Đàm': { adcode: '360600', mapping: {'Quận Dư Giang':'Phủ Nhiêu Châu', 'default':'Phủ Quảng Tín'} },
    'Thành phố Phủ Châu': { adcode: '361000', mapping: {'Huyện Nam Thành':'Phủ Kiến Xương', 'Huyện Lê Xuyên':'Phủ Kiến Xương', 'Huyện Nam Phong':'Phủ Kiến Xương', 'Huyện Tư Khê':'Phủ Kiến Xương', 'Huyện Quảng Xương':'Phủ Kiến Xương', 'default':'Phủ Phủ Châu'} },
    'Thành phố Thiều Quan': { adcode: '440200', mapping: {'Thành phố Nam Hùng':'Phủ Nam Hùng', 'Huyện Thủy Hưng':'Nam Hùng Phủ', 'default':'Thiều Châu Phủ'} },
    'Thành phố Trạm Giang': { adcode: '440800', mapping: {'Thành phố Lôi Châu':'Lôi Châu Phủ', 'Huyện Từ Văn':'Lôi Châu Phủ', 'Huyện Toại Khê':'Lôi Châu Phủ', 'Quận Ma Chương':'Lôi Châu Phủ', 'Quận Xích Khảm':'Lôi Châu Phủ', 'Quận Hà Sơn':'Lôi Châu Phủ', 'default':'Cao Châu Phủ'} },
    'Thành phố Nam Bình': { adcode: '350700', mapping: {'Thành phố Thiệu Vũ':'Thiệu Vũ Phủ', 'Huyện Quang Trạch':'Thiệu Vũ Phủ', 'Quận Diên Bình':'Diên Bình Phủ', 'Huyện Thuận Xương':'Diên Bình Phủ', 'default':'Kiến Ninh Phủ'} },
    'Thành phố Tam Minh': { adcode: '350400', mapping: {'Huyện Thái Ninh':'Thiệu Vũ Phủ', 'Huyện Kiến Ninh':'Thiệu Vũ Phủ', 'Huyện Ninh Hóa':'Đinh Châu Phủ', 'Huyện Thanh Lưu':'Đinh Châu Phủ', 'Huyện Minh Khê':'Đinh Châu Phủ', 'default':'Diên Bình Phủ'} },
    'Thành phố Ninh Đức': { adcode: '350900', mapping: {'Huyện Cổ Điền':'Phúc Châu Phủ', 'Huyện Bình Nam':'Phúc Châu Phủ', 'Huyện Thọ Ninh':'Kiến Ninh Phủ', 'default':'Phúc Ninh Châu'} },
    'Thành phố Miên Dương': { adcode: '510700', mapping: {'Huyện Bình Vũ':'Long An Phủ', 'Huyện tự trị dân tộc Khương Bắc Xuyên':'Long An Phủ', 'Huyện Tam Đài':'Đồng Xuyên Châu', 'default':'Thành Đô Phủ'} },
    'Thành phố Nghi Tân': { adcode: '511500', mapping: {'Huyện Bình Sơn':'Mã Hồ Phủ', 'default':'Tự Châu Phủ'} },
    'Châu tự trị dân tộc Di Lương Sơn': { adcode: '513400', mapping: {'Huyện Lôi Ba':'Mã Hồ Phủ', 'Thành phố Hội Lý':'Kiến Xương Vệ', 'Huyện Hội Đông':'Kiến Xương Vệ', 'Huyện Ninh Nam':'Kiến Xương Vệ', 'default':'Kiến Xương Vệ'} },
    'Thành phố Phàn Chi Hoa': { adcode: '510400', mapping: {'Quận Nhân Hòa':'Diêu An Phủ', 'default':'Kiến Xương Vệ'} },
    'Châu tự trị dân tộc Tạng, Khương A Bá': { adcode: '513200', mapping: {'Huyện Mân Xuyên':'Thành Đô Phủ', 'Huyện Lý':'Thành Đô Phủ', 'Huyện Mậu':'Thành Đô Phủ', 'default':'Tùng Phan Vệ'} },

    'Thành phố Mã An Sơn': { adcode: '340500', mapping: {'Huyện Hòa':'Hòa Châu', 'Huyện Hàm Sơn':'Hòa Châu', 'default':'Thái Bình Phủ'} },
    'Thành phố Tuyên Thành': { adcode: '341800', mapping: {'Thành phố Quảng Đức':'Quảng Đức Châu', 'Huyện Lang Khê':'Quảng Đức Châu', 'Huyện Tích Khê':'Huy Châu Phủ', 'default':'Ninh Quốc Phủ'} },
    
    'Thành phố Hàm Đan': { adcode: '130400', mapping: {'Huyện Đại Danh':'Đại Danh Phủ', 'Huyện Ngụy':'Đại Danh Phủ', 'Huyện Quán Đào':'Đại Danh Phủ', 'Quận Đại Danh':'Đại Danh Phủ', 'Khu mỏ Phong Phong':'Chương Đức Phủ', 'Huyện Từ':'Chương Đức Phủ', 'Huyện Thiệp':'Chương Đức Phủ', 'default':'Quảng Bình Phủ'} },
    'Thành phố Hình Đài': { adcode: '130500', mapping: {'Huyện Thanh Hà':'Quảng Bình Phủ', 'Thành phố Nam Cung':'Chân Định Phủ', 'Huyện Tân Hà':'Chân Định Phủ', 'Huyện Lâm Tây':'Đông Xương Phủ', 'default':'Thuận Đức Phủ'} },
    'Thành phố Bình Đỉnh Sơn': { adcode: '410400', mapping: {'Huyện Diệp':'Nam Dương Phủ', 'Thành phố Vũ Cương':'Nam Dương Phủ', 'default':'Nhữ Châu'} },
    'Thành phố Trương Gia Khẩu': { adcode: '130700', mapping: {'Huyện Trương Bắc':'Bộ Sát Cáp Nhĩ', 'Huyện Khang Bảo':'Bộ Sát Cáp Nhĩ', 'Huyện Cô Nguyên':'Bộ Sát Cáp Nhĩ', 'Huyện Thượng Nghĩa':'Bộ Sát Cáp Nhĩ', 'default':'Bảo An Châu'} },
    'Thành phố Thừa Đức': { adcode: '130800', mapping: {'Huyện tự trị dân tộc Mãn Phong Ninh':'Bộ Sát Cáp Nhĩ', 'Huyện tự trị dân tộc Mãn, Mông Cổ Vi Trường':'Doyan Vệ', 'Huyện Long Hóa':'Doyan Vệ', 'Thành phố Bình Tuyền':'Doyan Vệ', 'Huyện Loan Bình':'Doyan Vệ', 'default':'Doyan Vệ'} },
    
    'Thành phố Tấn Trung': { adcode: '140700', mapping: {'Huyện Tả Quyền':'Liêu Châu', 'Huyện Hòa Thuận':'Liêu Châu', 'Huyện Du Xã':'Liêu Châu', 'Thành phố Giới Hưu':'Phần Châu Phủ', 'Huyện Bình Dao':'Phần Châu Phủ', 'Huyện Linh Thạch':'Phần Châu Phủ', 'default':'Thái Nguyên Phủ'} },
    'Thành phố Trường Trị': { adcode: '140400', mapping: {'Huyện Thấm':'Thấm Châu', 'Huyện Vũ Hương':'Thấm Châu', 'Huyện Thấm Nguyên':'Thấm Châu', 'default':'Lộ An Phủ'} },
    'Thành phố Lữ Lương': { adcode: '141100', mapping: {'Huyện Giao Thành':'Thái Nguyên Phủ', 'Huyện Văn Thủy':'Thái Nguyên Phủ', 'Huyện Hưng':'Thái Nguyên Phủ', 'Huyện Lâm':'Thái Nguyên Phủ', 'Huyện Lam':'Thái Nguyên Phủ', 'Huyện Giao Khẩu':'Bình Dương Phủ', 'default':'Phần Châu Phủ'} },
    
    'Thành phố Đức Dương': { adcode: '510600', mapping: {'Huyện Trung Giang':'Đồng Xuyên Châu', 'Quận La Giang':'Thành Đô phủ', 'default':'Thành Đô phủ'} },
    'Thành phố Tư Dương': { adcode: '512000', mapping: {'Huyện An Nhạc':'Đồng Xuyên châu', 'Huyện Nhạc Chí':'Đồng Xuyên châu', 'default':'Thành Đô phủ'} },
    'Thành phố Tất Tiết': { adcode: '520500', mapping: {'Huyện tự trị dân tộc Di, Hồi, Miêu Uy Ninh':'Ô Tát vệ', 'Huyện Hách Chương':'Ô Tát vệ', 'Huyện Chức Kim':'Thủy Tây Tuyên úy ty', 'default':'Thủy Tây Tuyên úy ty'} },
    'Thành phố Côn Minh': { adcode: '530100', mapping: {'Quận Đông Xuyên':'Đông Xuyên phủ', 'Huyện tự trị dân tộc Di, Miêu Lộc Khuyến':'Vũ Định phủ', 'Huyện tự trị dân tộc Hồi, Di Tầm Điện':'Vân Nam phủ', 'default':'Vân Nam phủ'} },
    'Thành phố Chiêu Thông': { adcode: '530600', mapping: {'Huyện Trấn Hùng':'Trấn Hùng phủ', 'Huyện Uy Tín':'Trấn Hùng phủ', 'Huyện Xảo Gia':'Đông Xuyên phủ', 'Thành phố Thủy Phú':'Tự Châu phủ', 'default':'Ô Mông phủ'} },
    'Thành phố Lục Bàn Thủy': { adcode: '520200', mapping: {'Thành phố Bàn Châu':'Phổ An châu', 'Quận Chung Sơn':'Thủy Tây Tuyên úy ty', 'Quận Thủy Thành':'Thủy Tây Tuyên úy ty', 'default':'An Thuận phủ'} },
    
    'Thành phố Hoài Hóa': { adcode: '431200', mapping: {'Huyện tự trị dân tộc Miêu, Đồng Tĩnh Châu':'Tĩnh Châu', 'Huyện tự trị dân tộc Đồng Thông Đạo':'Tĩnh Châu', 'Huyện Hội Đồng':'Tĩnh Châu', 'Huyện tự trị dân tộc Đồng Tân Hoảng':'Thần Châu phủ', 'default':'Thần Châu phủ'} },
    'Thành phố Lâu Để': { adcode: '431300', mapping: {'Huyện Tân Hóa':'Bảo Khánh phủ', 'Thành phố Lãnh Thủy Giang':'Bảo Khánh phủ', 'default':'Trường Sa phủ'} },
    
    'Thành phố Sùng Tả': { adcode: '451400', mapping: {'Huyện Ninh Minh':'Tư Minh phủ', 'Thành phố Bằng Tường':'Tư Minh phủ', 'Huyện Phù Tuy':'Nam Ninh phủ', 'default':'Thái Bình phủ'} },
    'Thành phố Bách Sắc': { adcode: '451000', mapping: {'Huyện Đức Bảo':'Trấn An phủ', 'Huyện Na Pha':'Trấn An phủ', 'Thành phố Tĩnh Tây':'Trấn An phủ', 'Thành phố Bình Quả':'Tư Ân phủ', 'default':'Tứ Thành châu'} },
    'Thành phố Phòng Thành Cảng': { adcode: '450600', mapping: {'Huyện Thượng Tư':'Nam Ninh phủ', 'default':'Liêm Châu phủ'} },
    
    'Châu tự trị dân tộc Di Sở Hùng': { adcode: '532300', mapping: {'Huyện Vũ Định':'Vũ Định phủ', 'Huyện Nguyên Mưu':'Vũ Định phủ', 'Thành phố Lộc Phong':'Vân Nam phủ', 'Huyện Diêu An':'Diêu An phủ', 'Huyện Đại Diêu':'Diêu An phủ', 'Huyện Vĩnh Nhân':'Diêu An phủ', 'default':'Phủ Sở Hùng'} },
    'Thành phố Ngọc Khê': { adcode: '530400', mapping: {'Huyện tự trị dân tộc Cáp Nê, Di, Thái Nguyên Giang':'Phủ Nguyên Giang', 'Huyện tự trị dân tộc Di, Thái Tân Bình':'Phủ Nguyên Giang', 'Huyện Dịch Môn':'Phủ Vân Nam', 'default':'Phủ Trừng Giang'} },
    'Châu tự trị dân tộc Cáp Nê, Di Hồng Hà': { adcode: '532500', mapping: {'Huyện Lư Tây':'Phủ Quảng Tây', 'Thành phố Di Lặc':'Phủ Quảng Tây', 'default':'Phủ Lâm An'} },
    'Châu tự trị dân tộc Bạch Đại Lý': { adcode: '532900', mapping: {'Huyện Hạc Khánh':'Phủ Hạc Khánh', 'Huyện Kiếm Xuyên':'Phủ Hạc Khánh', 'Huyện tự trị dân tộc Di, Hồi Nguy Sơn':'Phủ Mông Hóa', 'Huyện tự trị dân tộc Di Nam Giản':'Phủ Mông Hóa', 'Huyện tự trị dân tộc Di Dạng Tị':'Phủ Mông Hóa', 'Huyện Tân Xuyên':'Phủ Đại Lý', 'Huyện Tường Vân':'Phủ Đại Lý', 'default':'Phủ Đại Lý'} },
    'Thành phố Phổ Nhĩ': { adcode: '530800', mapping: {'Huyện tự trị dân tộc Di Cảnh Đông':'Phủ Cảnh Đông', 'Huyện tự trị dân tộc Di, Cáp Nê, Lạp Hỗ Trấn Nguyên':'Phủ Trấn Nguyên', 'Huyện tự trị dân tộc Cáp Nê Mặc Giang':'Phủ Nguyên Giang', 'Huyện tự trị dân tộc Thái, Di Cảnh Cốc':'Phủ Trấn Nguyên', 'default':'Xa Lý Tuyên úy ty'} },

    'Thành phố Đại Liên': { adcode: '210200', mapping: {'Quận Phổ Lan Điếm':'Vệ Phục Châu', 'Thành phố Ngõa Phòng Điếm':'Vệ Phục Châu', 'Thành phố Trang Hà':'Bảo Phượng Hoàng', 'default':'Vệ Kim Châu'} },
    'Thành phố An Sơn': { adcode: '210300', mapping: {'Huyện Thai An':'Vệ Quảng Ninh', 'Huyện tự trị dân tộc Mãn Tụ Nham':'Bảo Phượng Hoàng', 'Thành phố Hải Thành':'Vệ Hải Châu', 'default':'Vệ Liêu Dương'} },
    'Thành phố Cẩm Châu': { adcode: '210700', mapping: {'Huyện Hắc Sơn':'Vệ Quảng Ninh', 'Huyện Nghĩa':'Vệ Nghĩa Châu', 'Thành phố Lăng Hải':'Quảng Ninh Hữu đồn vệ', 'Thành phố Bắc Trấn':'Vệ Quảng Ninh', 'default':'Quảng Ninh Trung đồn vệ'} },
    'Thành phố Dinh Khẩu': { adcode: '210800', mapping: {'Thành phố Đại Thạch Kiều':'Vệ Hải Châu', 'default':'Vệ Cái Châu'} },
    'Thành phố Thiết Lĩnh': { adcode: '211200', mapping: {'Thành phố Khai Nguyên':'Vệ Khai Nguyên', 'default':'Vệ Thiết Lĩnh'} },
    'Thành phố Hồ Lô Đảo': { adcode: '211400', mapping: {'Huyện Tuy Trung':'Quảng Ninh Tiền đồn vệ', 'Huyện Kiến Xương':'Vệ Doanh Châu', 'default':'Vệ Ninh Viễn'} },
    'Thành phố Thượng Nhiêu': { adcode: '361100', mapping: {'Huyện Vụ Nguyên':'Phủ Huy Châu', 'Huyện Bà Dương':'Phủ Nhiêu Châu', 'Huyện Dư Can':'Phủ Nhiêu Châu', 'Huyện Vạn Niên':'Phủ Nhiêu Châu', 'Thành phố Đức Hưng':'Phủ Nhiêu Châu', 'default':'Phủ Quảng Tín'} },
    'Thành phố Cảnh Đức Trấn': { adcode: '360200', mapping: {'Huyện Phù Lương':'Phủ Nhiêu Châu', 'Quận Châu Sơn':'Phủ Nhiêu Châu', 'Quận Xương Giang':'Phủ Nhiêu Châu', 'Thành phố Nhạc Bình':'Phủ Nhiêu Châu', 'default':'Phủ Nhiêu Châu'} },
    'Thành phố Bộc Dương': { adcode: '410900', mapping: {'Huyện Phạm':'Phủ Duyện Châu', 'Huyện Đài Tiền':'Phủ Duyện Châu', 'default':'Phủ Đại Danh'} },
    'Thành phố Tân Hương': { adcode: '410700', mapping: {'Thành phố Trường Viên':'Phủ Đại Danh', 'Huyện Nguyên Dương':'Phủ Khai Phong', 'Huyện Diên Tân':'Phủ Khai Phong', 'Huyện Phong Khâu':'Phủ Khai Phong', 'default':'Phủ Vệ Huy'} },
    'Thành phố Hạc Bích': { adcode: '410600', mapping: {'Huyện Tuấn':'Phủ Đại Danh', 'default':'Phủ Vệ Huy'} },
    'Thành phố An Dương': { adcode: '410500', mapping: {'Huyện Hoạt':'Phủ Đại Danh', 'Huyện Nội Hoàng':'Phủ Đại Danh', 'default':'Phủ Chương Đức'} },
    'Thành phố Hà Trạch': { adcode: '371700', mapping: {'Huyện Đông Minh':'Phủ Đại Danh', 'default':'Phủ Duyện Châu'} },
    'Thành phố Triệu Khánh': { adcode: '441200', mapping: {'Huyện Hoài Tập':'Phủ Ngô Châu', 'default':'Phủ Triệu Khánh'} },
    'Thành phố Đường Sơn': { adcode: '130200', mapping: {'Thành phố Tuân Hóa':'Phủ Thuận Thiên', 'Huyện Ngọc Điền':'Phủ Thuận Thiên', 'Quận Phong Nhuận':'Phủ Thuận Thiên', 'Quận Phong Nam':'Phủ Thuận Thiên', 'default':'Phủ Vĩnh Bình'} },
    'Thành phố Bảo Định': { adcode: '130600', mapping: {'Thành phố Trác Châu':'Phủ Thuận Thiên', 'Thành phố Định Châu':'Phủ Chân Định', 'Huyện Khúc Dương':'Phủ Chân Định', 'Thành phố An Quốc':'Phủ Chân Định', 'Huyện Bác Dã':'Phủ Chân Định', 'Huyện Lễ':'Phủ Chân Định', 'default':'Phủ Bảo Định'} },
    'Thành phố Hành Thủy': { adcode: '131100', mapping: {'Huyện Cảnh':'Phủ Hà Gian', 'Huyện Phụ Thành':'Phủ Hà Gian', 'Huyện Cố Thành':'Phủ Hà Gian', 'Huyện Ngô Kiều':'Phủ Hà Gian', 'default':'Phủ Chân Định'} },
    
    'Thành phố Đồng Lăng': { adcode: '340700', mapping: {'Huyện Tung Dương':'Phủ An Khánh', 'default':'Phủ Trì Châu'} },
    'Thành phố Vu Hồ': { adcode: '340200', mapping: {'Thành phố Vô Vi':'Phủ Lư Châu', 'default':'Phủ Thái Bình'} },
    'Thành phố Trấn Giang': { adcode: '321100', mapping: {'Thành phố Cú Dung':'Phủ Ứng Thiên', 'default':'Phủ Trấn Giang'} },
    'Thành phố Từ Châu': { adcode: '320300', mapping: {'Thành phố Tân Nghi':'Phủ Hoài An', 'Thành phố Phi Châu':'Phủ Hoài An', 'Huyện Tuy Ninh':'Phủ Hoài An', 'default':'Từ Châu'} },
    'Thành phố Hoàng Sơn': { adcode: '341000', mapping: {'Quận Hoàng Sơn':'Phủ Ninh Quốc', 'default':'Phủ Huy Châu'} },
    'Thành phố Lục An': { adcode: '341500', mapping: {'Huyện Hoắc Khâu':'Phủ Phượng Dương', 'Quận Diệp Tập':'Phủ Phượng Dương', 'default':'Phủ Lư Châu'} },
    
    'Thành phố Tế Nam': { adcode: '370100', mapping: {'Huyện Bình Âm':'Phủ Duyện Châu', 'default':'Phủ Tế Nam'} },
    'Thành phố Thái An': { adcode: '370900', mapping: {'Huyện Đông Bình':'Phủ Duyện Châu', 'Huyện Ninh Dương':'Phủ Duyện Châu', 'default':'Phủ Tế Nam'} },
    'Thành phố Lâm Nghi': { adcode: '371300', mapping: {'Huyện Nghi Thủy':'Phủ Thanh Châu', 'Huyện Nghi Nam':'Phủ Thanh Châu', 'Huyện Cử Nam':'Phủ Thanh Châu', 'default':'Phủ Duyện Châu'} },
    'Thành phố Truy Bác': { adcode: '370300', mapping: {'Quận Trương Điếm':'Phủ Tế Nam', 'Quận Truy Xuyên':'Phủ Tế Nam', 'Quận Chu Thôn':'Phủ Tế Nam', 'Huyện Hoàn Đài':'Phủ Tế Nam', 'Huyện Cao Thanh':'Phủ Tế Nam', 'default':'Phủ Thanh Châu'} },
    'Thành phố Yên Đài': { adcode: '370600', mapping: {'Thành phố Lai Châu':'Phủ Lai Châu', 'Thành phố Lai Dương':'Phủ Lai Châu', 'Thành phố Hải Dương':'Phủ Lai Châu', 'default':'Phủ Đăng Châu'} },
    'Thành phố Duy Phường': { adcode: '370700', mapping: {'Quận Duy Thành':'Phủ Lai Châu', 'Quận Hàn Đình':'Phủ Lai Châu', 'Quận Phường Tử':'Phủ Lai Châu', 'Quận Khuê Văn':'Phủ Lai Châu', 'Thành phố Xương Ấp':'Phủ Lai Châu', 'Thành phố Cao Mật':'Phủ Lai Châu', 'default':'Phủ Thanh Châu'} },
    
    'Châu tự trị dân tộc Bố Y, Miêu Kiềm Nam': { adcode: '522700', mapping: {'Huyện Lệ Ba':'Phủ Khánh Viễn', 'Huyện Úng An':'Phủ Bình Việt', 'Huyện Quý Định':'Phủ Bình Việt', 'Thành phố Phúc Tuyền':'Phủ Bình Việt', 'default':'Phủ Đô Quân'} },
    'Thành phố Quế Lâm': { adcode: '450300', mapping: {'Huyện Toàn Châu':'Phủ Vĩnh Châu', 'Huyện Tư Nguyên':'Phủ Vĩnh Châu', 'Huyện Quán Dương':'Phủ Vĩnh Châu', 'default':'Phủ Quế Lâm'} },
    'Châu tự trị dân tộc Miêu, Đồng Kiềm Đông Nam': { adcode: '522600', mapping: {'Huyện Trấn Viễn':'Phủ Trấn Viễn', 'Huyện Thi Bỉnh':'Phủ Trấn Viễn', 'Huyện Kiếm Hà':'Phủ Trấn Viễn', 'Huyện Thai Giang':'Phủ Trấn Viễn', 'Huyện Tam Tuệ':'Phủ Trấn Viễn', 'Huyện Sầm Củng':'Phủ Tư Châu', 'Huyện Hoàng Bình':'Phủ Bình Việt', 'Thành phố Khải Lý':'Phủ Bình Việt', 'Huyện Ma Giang':'Phủ Bình Việt', 'Huyện Lôi Sơn':'Phủ Đô Quân', 'Huyện Đan Trại':'Phủ Đô Quân', 'Huyện Thiên Trụ':'Tĩnh Châu', 'Huyện Cẩm Bình':'Tĩnh Châu', 'default':'Phủ Lê Bình'} },
    'Thành phố Tuân Nghĩa': { adcode: '520300', mapping: {'Huyện tự trị dân tộc Cờ Lao, Miêu Vụ Xuyên':'Phủ Tư Nam', 'Huyện Phượng Cương':'Phủ Thạch Thiên', 'Huyện Dư Khánh':'Phủ Bình Việt', 'default':'Phủ Tuân Nghĩa'} },
    'Thành phố Đồng Nhân': { adcode: '520600', mapping: {'Quận Bích Giang':'Phủ Đồng Nhân', 'Quận Vạn Sơn':'Phủ Đồng Nhân', 'Huyện Giang Khẩu':'Phủ Đồng Nhân', 'Huyện tự trị dân tộc Đồng Ngọc Bình':'Phủ Đồng Nhân', 'Huyện tự trị dân tộc Miêu Tùng Đào':'Phủ Đồng Nhân', 'Huyện Thạch Thiên':'Phủ Thạch Thiên', 'default':'Phủ Tư Nam'} },
    'Châu tự trị dân tộc Thổ Gia, Miêu Ân Thi': { adcode: '422800', mapping: {'Huyện Ba Đông':'Phủ Kinh Châu', 'default':'Vệ Thi Châu'} },
    'Thành phố Bảo Kê': { adcode: '610300', mapping: {'Huyện Phượng':'Phủ Hán Trung', 'Huyện Thái Bạch':'Phủ Hán Trung', 'default':'Phủ Phượng Tường'} },
    'Thành phố Định Tây': { adcode: '621100', mapping: {'Huyện Lâm Thao':'Phủ Lâm Thao', 'Huyện Vị Nguyên':'Phủ Lâm Thao', 'default':'Phủ Củng Xương'} },
    'Châu tự trị dân tộc Tạng Cam Nam': { adcode: '623000', mapping: {'Huyện Chu Khúc':'Phủ Củng Xương', 'Huyện Hạ Hà':'Phủ Lâm Thao', 'default':'Vệ Thao Châu'} },
    'Thành phố Lâm Thương': { adcode: '530900', mapping: {'Huyện Trấn Khang':'Phủ Vĩnh Xương', 'Huyện Vĩnh Đức':'Phủ Vĩnh Xương', 'default':'Phủ Thuận Ninh'} },
    'Châu tự trị dân tộc Choang, Miêu Văn Sơn': { adcode: '532600', mapping: {'Thành phố Văn Sơn':'Phủ Lâm An', 'Huyện Mã Quan':'Phủ Lâm An', 'Huyện Tây Trù':'Phủ Lâm An', 'Huyện Ma Lật Pha':'Phủ Lâm An', 'default':'Phủ Quảng Nam'} },
    'Thành phố Đức Châu': { adcode: '371400', mapping: {'Huyện Khánh Vân':'Phủ Hà Gian', 'Huyện Ninh Tân':'Phủ Hà Gian', 'default':'Phủ Tế Nam'} }
};




const modernCountyToMingCounty = {
  // ================== Thành phố Bắc Kinh ==================
  // Thời Minh thuộc phủ Thuận Thiên, Bắc Trực Lệ
  'Quận Đông Thành': 'Huyện Đại Hưng', 'Quận Tây Thành': 'Huyện Uyển Bình',
  'Quận Triều Dương': 'Huyện Đại Hưng', 'Quận Phong Đài': 'Huyện Uyển Bình',
  'Quận Thạch Cảnh Sơn': 'Huyện Uyển Bình', 'Quận Hải Điến': 'Huyện Uyển Bình',
  'Quận Môn Đầu Câu': 'Huyện Uyển Bình', 'Quận Phòng Sơn': 'Huyện Phòng Sơn',
  'Quận Thông Châu': 'Thông Châu', 'Quận Thuận Nghĩa': 'Huyện Thuận Nghĩa',
  'Quận Xương Bình': 'Châu Xương Bình', 'Quận Đại Hưng': 'Huyện Đại Hưng',
  'Quận Hoài Nhu': 'Huyện Hoài Nhu', 'Quận Bình Cốc': 'Huyện Bình Cốc',
  'Quận Mật Vân': 'Huyện Mật Vân', 'Quận Diên Khánh': 'Châu Diên Khánh',

  // ================== Thành phố Thiên Tân ==================
  // Thời Minh thuộc phủ Hà Gian, phủ Thuận Thiên, Bắc Trực Lệ
  'Quận Hòa Bình': 'Huyện Tĩnh Hải', 'Quận Hà Đông': 'Huyện Tĩnh Hải', 'Quận Hà Tây': 'Huyện Tĩnh Hải',
  'Quận Nam Khai': 'Huyện Tĩnh Hải', 'Quận Hà Bắc': 'Huyện Tĩnh Hải', 'Quận Hồng Kiều': 'Huyện Tĩnh Hải',
  'Quận Đông Lệ': 'Huyện Tĩnh Hải', 'Quận Tây Thanh': 'Huyện Tĩnh Hải', 'Quận Tân Nam': 'Huyện Tĩnh Hải',
  'Quận Bắc Thần': 'Huyện Vũ Thanh', 'Quận Vũ Thanh': 'Huyện Vũ Thanh', 'Quận Bảo Trì': 'Huyện Bảo Để',
  'Khu mới Tân Hải': 'Huyện Tĩnh Hải', 'Quận Ninh Hà': 'Huyện Bảo Để', 'Quận Tĩnh Hải': 'Huyện Tĩnh Hải',
  'Quận Kế Châu': 'Kế Châu',

  // ================== Tỉnh Hà Bắc ==================
  'Thành phố Thạch Gia Trang': 'Huyện Chân Định', 'Khu mỏ Tỉnh Hình': 'Huyện Tỉnh Hình', 'Quận Dụ Hoa': 'Huyện Chân Định',
  'Huyện Tỉnh Hình': 'Huyện Tỉnh Hình', 'Huyện Chính Định': 'Huyện Chân Định', 'Quận Loan Thành': 'Huyện Loan Thành',
  'Quận Lộc Tuyền': 'Huyện Hoạch Lộc', 'Quận Cảo Thành': 'Huyện Cảo Thành',
  'Huyện Hành Đường': 'Huyện Hành Đường', 'Huyện Linh Thọ': 'Huyện Linh Thọ', 'Huyện Cao Ấp': 'Huyện Cao Ấp',
  'Huyện Thâm Trạch': 'Huyện Thâm Trạch', 'Huyện Tán Hoàng': 'Huyện Tán Hoàng', 'Huyện Vô Cực': 'Huyện Vô Cực',
  'Huyện Bình Sơn': 'Huyện Bình Sơn', 'Huyện Nguyên Thị': 'Huyện Nguyên Thị', 'Huyện Triệu': 'Triệu Châu',
  'Thành phố Tân Tập': 'Huyện Thúc Lộc', 'Thành phố Tấn Châu': 'Tấn Châu', 'Thành phố Tân Nhạc': 'Huyện Tân Lạc',
  'Thành phố Đường Sơn': 'Loan Châu', 'Quận Lộ Nam': 'Loan Châu', 'Quận Lộ Bắc': 'Loan Châu', 'Quận Cổ Dã': 'Loan Châu',
  'Quận Khai Bình': 'Loan Châu', 'Quận Phong Nam': 'Huyện Phong Nhuận', 'Quận Phong Nhuận': 'Huyện Phong Nhuận',
  'Quận Tào Phi Điện': 'Loan Châu', 'Thành phố Loan Châu': 'Loan Châu', 'Huyện Loan Nam': 'Loan Châu',
  'Huyện Lạc Đình': 'Huyện Lạc Đình', 'Huyện Thiên Tây': 'Huyện Thiên An', 'Huyện Ngọc Điền': 'Huyện Ngọc Điền',
  'Thành phố Tuân Hóa': 'Châu Tuân Hóa', 'Thành phố Thiên An': 'Huyện Thiên An',
  'Thành phố Tần Hoàng Đảo': 'Phủ Vĩnh Bình', 'Quận Hải Cảng': 'Huyện Lư Long', 'Quận Sơn Hải Quan': 'Vệ Sơn Hải',
  'Quận Bắc Đới Hà': 'Huyện Phủ Ninh', 'Quận Phủ Ninh': 'Huyện Phủ Ninh', 'Huyện tự trị dân tộc Mãn Thanh Long': 'Huyện Phủ Ninh',
  'Huyện Xương Lê': 'Huyện Xương Lê', 'Huyện Lư Long': 'Huyện Lư Long',
  'Thành phố Hàm Đan': 'Huyện Hàm Đan', 'Quận Hàm Sơn': 'Huyện Hàm Đan', 'Quận Tùng Đài': 'Huyện Hàm Đan',
  'Quận Phục Hưng': 'Huyện Hàm Đan', 'Khu mỏ Phong Phong': 'Từ Châu', 'Quận Phì Hương': 'Huyện Phì Hương',
  'Quận Vĩnh Niên': 'Huyện Vĩnh Niên', 'Huyện Lâm Chương': 'Huyện Lâm Chương', 'Huyện Thành An': 'Huyện Thành An',
  'Huyện Đại Danh': 'Huyện Đại Danh', 'Huyện Thiệp': 'Huyện Thiệp', 'Huyện Từ': 'Từ Châu',
  'Huyện Khâu': 'Huyện Khâu', 'Huyện Kê Trạch': 'Huyện Kê Trạch', 'Huyện Quảng Bình': 'Huyện Quảng Bình',
  'Huyện Quán Đào': 'Huyện Quán Đào', 'Huyện Ngụy': 'Huyện Ngụy', 'Huyện Khúc Chu': 'Huyện Khúc Chu',
  'Thành phố Vũ An': 'Huyện Vũ An',
  'Thành phố Hình Đài': 'Huyện Hình Đài', 'Quận Tương Đô': 'Huyện Hình Đài', 'Quận Tín Đô': 'Huyện Hình Đài',
  'Quận Nhâm Trạch': 'Huyện Nhâm', 'Quận Nam Hòa': 'Huyện Nam Hòa', 'Huyện Lâm Thành': 'Huyện Lâm Thành',
  'Huyện Nội Khâu': 'Huyện Nội Khâu', 'Huyện Bách Hương': 'Huyện Bách Hương', 'Huyện Long Nghiêu': 'Huyện Long Bình',
  'Huyện Ninh Tấn': 'Huyện Ninh Tấn', 'Huyện Cự Lộc': 'Huyện Cự Lộc', 'Huyện Tân Hà': 'Huyện Tân Hà',
  'Huyện Quảng Tông': 'Huyện Quảng Tông', 'Huyện Bình Hương': 'Huyện Bình Hương', 'Huyện Uy': 'Huyện Uy',
  'Huyện Thanh Hà': 'Huyện Thanh Hà', 'Huyện Lâm Tây': 'Châu Lâm Thanh', // Huyện Lâm Tây thời Minh thuộc châu Lâm Thanh, Sơn Đông, tại đây đã được gộp lại
  'Thành phố Nam Cung': 'Huyện Nam Cung', 'Thành phố Sa Hà': 'Huyện Sa Hà',
  'Thành phố Bảo Định': 'Huyện Thanh Uyển', 'Quận Cạnh Tú': 'Huyện Thanh Uyển', 'Quận Liên Trì': 'Huyện Thanh Uyển',
  'Quận Mãn Thành': 'Huyện Mãn Thành', 'Quận Thanh Uyển': 'Huyện Thanh Uyển', 'Quận Từ Thủy': 'Huyện An Túc',
  'Huyện Lai Thủy': 'Huyện Lai Thủy', 'Huyện Phụ Bình': 'Huyện Phụ Bình', 'Huyện Định Hưng': 'Huyện Định Hưng',
  'Huyện Đường': 'Huyện Đường', 'Huyện Cao Dương': 'Huyện Cao Dương', 'Huyện Dung Thành': 'Huyện Dung Thành',
  'Huyện Lai Nguyên': 'Huyện Quảng Xương', 'Huyện Vọng Đô': 'Huyện Khánh Đô', 'Huyện An Tân': 'Huyện Tân An',
  'Huyện Dịch': 'Dịch Châu', 'Huyện Khúc Dương': 'Huyện Khúc Dương', 'Huyện Lễ': 'Huyện Lễ',
  'Huyện Thuận Bình': 'Huyện Hoàn', 'Huyện Bác Dã': 'Huyện Bác Dã', 'Huyện Hùng': 'Huyện Hùng',
  'Thành phố Trác Châu': 'Trác Châu', 'Thành phố Định Châu': 'Định Châu', 'Thành phố An Quốc': 'Kỳ Châu',
  'Thành phố Cao Bi Điếm': 'Huyện Tân Thành',
  'Thành phố Trương Gia Khẩu': 'Trấn Tuyên Phủ', 'Quận Kiều Đông': 'Trấn Tuyên Phủ', 'Quận Kiều Tây': 'Trấn Tuyên Phủ',
  'Quận Tuyên Hóa': 'Trấn Tuyên Phủ', 'Quận Hạ Hoa Viên': 'Trấn Tuyên Phủ', 'Quận Vạn Toàn': 'Vạn Toàn Hữu Vệ',
  'Quận Sùng Lễ': 'Trấn Tuyên Phủ', 'Huyện Trương Bắc': 'Doanh Hưng Hòa', 'Huyện Khang Bảo': 'Doanh Khang Bảo',
  'Huyện Cô Nguyên': 'Doanh Cô Nguyên', 'Huyện Thượng Nghĩa': 'Doanh Thượng Nghĩa', 'Huyện Uất': 'Uất Châu',
  'Huyện Dương Nguyên': 'Uất Châu', 'Huyện Hoài An': 'Vệ Hoài An', 'Huyện Hoài Lai': 'Vệ Hoài Lai',
  'Huyện Trác Lộc': 'Châu Bảo An', 'Huyện Xích Thành': 'Vệ Long Môn',
  'Thành phố Thừa Đức': 'Đóa Nhan Tam Vệ', 
  'Quận Song Kiều': 'Trung doanh Doyan', 'Quận Song Loan': 'Tây doanh Doyan', 'Khu mỏ Ưng Thủ Doanh Tử': 'Khoáng doanh Doyan',
  'Huyện Thừa Đức': 'Đại doanh Doyan', 'Huyện Hưng Long': 'Bảo Hưng Long', 'Huyện Loan Bình': 'Bảo Loan Bình',
  'Huyện Long Hóa': 'Bảo Long Hóa', 'Huyện tự trị dân tộc Mãn Phong Ninh': 'Doanh Phong Ninh', 'Huyện tự trị dân tộc Mãn Khoan Thành': 'Bảo Khoan Thành',
  'Huyện tự trị dân tộc Mãn, Mông Cổ Vi Trường': 'Doanh Vi Trường', 'Thành phố Bình Tuyền': 'Doanh Bình Tuyền',
  'Thành phố Thương Châu': 'Thương Châu', 'Quận Tân Hoa': 'Thương Châu', 'Quận Vận Hà': 'Thương Châu',
  'Huyện Thương': 'Thương Châu', 'Huyện Thanh': 'Huyện Thanh', 'Huyện Đông Quang': 'Huyện Đông Quang',
  'Huyện Hải Hưng': 'Huyện Diêm Sơn', 'Huyện Diêm Sơn': 'Huyện Diêm Sơn', 'Huyện Túc Ninh': 'Huyện Túc Ninh',
  'Huyện Nam Bì': 'Huyện Nam Bì', 'Huyện Ngô Kiều': 'Huyện Ngô Kiều', 'Huyện Hiến': 'Huyện Hiến',
  'Huyện tự trị dân tộc Hồi Mạnh Thôn': 'Thương Châu', 'Thành phố Bạc Đầu': 'Huyện Giao Hà', 'Thành phố Nhâm Khâu': 'Huyện Nhậm Khâu',
  'Thành phố Hoàng Hoa': 'Huyện Diêm Sơn', 'Thành phố Hà Gian': 'Huyện Hà Gian',
  'Thành phố Lang Phường': 'Phủ Thuận Thiên', 'Quận An Thứ': 'Huyện Đông An', 'Quận Quảng Dương': 'Huyện Đông An',
  'Huyện Cố An': 'Huyện Cố An', 'Huyện Vĩnh Thanh': 'Huyện Vĩnh Thanh', 'Huyện Hương Hà': 'Huyện Hương Hà',
  'Huyện Đại Thành': 'Huyện Đại Thành', 'Huyện Văn An': 'Huyện Văn An', 'Huyện tự trị dân tộc Hồi Đại Xưởng': 'Huyện Tam Hà',
  'Thành phố Bá Châu': 'Bá Châu', 'Thành phố Tam Hà': 'Huyện Tam Hà',
  'Thành phố Hành Thủy': 'Ký Châu', 'Quận Đào Thành': 'Huyện Hành Thủy', 'Quận Ký Châu': 'Ký Châu',
  'Huyện Tảo Cường': 'Huyện Tảo Cường', 'Huyện Vũ Ấp': 'Huyện Vũ Ấp', 'Huyện Vũ Cường': 'Huyện Vũ Cường',
  'Huyện Nhiêu Dương': 'Huyện Nhiêu Dương', 'Huyện An Bình': 'Huyện An Bình', 'Huyện Cố Thành': 'Huyện Cố Thành',
  'Huyện Cảnh': 'Cảnh Châu', 'Huyện Phụ Thành': 'Huyện Phụ Thành', 'Thành phố Thâm Châu': 'Thâm Châu',

  // ================== Tỉnh Sơn Tây ==================
  'Thành phố Thái Nguyên': 'Huyện Dương Khúc', 'Quận Tiểu Điếm': 'Huyện Dương Khúc', 'Quận Nghênh Trạch': 'Huyện Dương Khúc',
  'Quận Hạnh Hoa Lĩnh': 'Huyện Dương Khúc', 'Quận Tiêm Thảo Bình': 'Huyện Dương Khúc', 'Quận Vạn Bách Lâm': 'Huyện Dương Khúc',
  'Quận Tấn Nguyên': 'Huyện Thái Nguyên', 'Huyện Thanh Từ': 'Huyện Thanh Nguyên', 'Huyện Dương Khúc': 'Huyện Dương Khúc',
  'Huyện Lâu Phiền': 'Huyện Tĩnh Nhạc', 'Thành phố Cổ Giao': 'Huyện Giao Thành',
  'Thành phố Đại Đồng': 'Huyện Đại Đồng', 'Quận Bình Thành': 'Huyện Đại Đồng', 'Quận Vân Cương': 'Huyện Đại Đồng',
  'Quận Tân Vinh': 'Huyện Đại Đồng', 'Quận Vân Châu': 'Huyện Đại Đồng', 'Huyện Dương Cao': 'Vệ Dương Hòa',
  'Huyện Thiên Trấn': 'Vệ Thiên Thành', 'Huyện Quảng Linh': 'Huyện Quảng Linh', 'Huyện Linh Khâu': 'Huyện Linh Khâu',
  'Huyện Hồn Nguyên': 'Châu Hồn Nguyên', 'Huyện Tả Vân': 'Tả Vệ', 'Huyện Hữu Ngọc': 'Hữu Vệ',
  'Thành phố Dương Tuyền': 'Châu Bình Định', 'Quận Thành': 'Châu Bình Định', 'Khu mỏ': 'Châu Bình Định', 'Quận Ngoại ô': 'Châu Bình Định',
  'Huyện Bình Định': 'Châu Bình Định', 'Huyện Vu': 'Huyện Vu',
  'Thành phố Trường Trị': 'Huyện Trường Trị', 'Quận Lộ Châu': 'Huyện Trường Trị', 'Quận Thượng Đảng': 'Huyện Trường Trị',
  'Quận Đồn Lưu': 'Huyện Đồn Lưu', 'Quận Lộ Thành': 'Huyện Lộ Thành', 'Huyện Tương Viên': 'Huyện Tương Viên',
  'Huyện Bình Thuận': 'Huyện Bình Thuận', 'Huyện Lê Thành': 'Huyện Lê Thành', 'Huyện Hồ Quan': 'Huyện Hồ Quan',
  'Huyện Trưởng Tử': 'Huyện Trưởng Tử', 'Huyện Vũ Hương': 'Huyện Vũ Hương', 'Huyện Thấm': 'Thấm Châu',
  'Huyện Thấm Nguyên': 'Huyện Thấm Nguyên',
  'Thành phố Tấn Thành': 'Trạch Châu', 'Quận Thành': 'Trạch Châu', 'Huyện Thấm Thủy': 'Huyện Thấm Thủy',
  'Huyện Dương Thành': 'Huyện Dương Thành', 'Huyện Lăng Xuyên': 'Huyện Lăng Xuyên', 'Huyện Trạch Châu': 'Trạch Châu',
  'Thành phố Cao Bình': 'Huyện Cao Bằng',
  'Thành phố Sóc Châu': 'Sóc Châu', 'Quận Sóc Thành': 'Sóc Châu', 'Quận Bình Lỗ': 'Vệ Bình Lỗ',
  'Huyện Sơn Âm': 'Huyện Sơn Âm', 'Huyện Ứng': 'Ứng Châu', 'Huyện Hữu Ngọc': 'Hữu Vệ',
  'Thành phố Hoài Nhân': 'Huyện Hoài Nhân',
  'Thành phố Tấn Trung': 'Huyện Du Thứ', 'Quận Du Thứ': 'Huyện Du Thứ', 'Quận Thái Cốc': 'Huyện Thái Cốc',
  'Huyện Du Xã': 'Huyện Du Xã', 'Huyện Tả Quyền': 'Liêu Châu', 'Huyện Hòa Thuận': 'Huyện Hòa Thuận',
  'Huyện Tích Dương': 'Huyện Lạc Bình', 'Huyện Thọ Dương': 'Huyện Thọ Dương', 'Huyện Kỳ': 'Huyện Kỳ',
  'Huyện Bình Dao': 'Huyện Bình Dao', 'Huyện Linh Thạch': 'Huyện Linh Thạch', 'Thành phố Giới Hưu': 'Huyện Giới Hưu',
  'Thành phố Vận Thành': 'Huyện An Ấp', 'Quận Diêm Hồ': 'Huyện An Ấp', 'Huyện Lâm Y': 'Huyện Lâm Tấn',
  'Huyện Vạn Vinh': 'Huyện Vạn Tuyền', 'Huyện Văn Hỷ': 'Huyện Văn Hỷ', 'Huyện Tắc Sơn': 'Huyện Tắc Sơn',
  'Huyện Tân Giáng': 'Giáng Châu', 'Huyện Giáng': 'Huyện Giáng', 'Huyện Viên Khúc': 'Huyện Viên Khúc',
  'Huyện Hạ': 'Huyện Hạ', 'Huyện Bình Lục': 'Huyện Bình Lục', 'Huyện Nhuế Thành': 'Huyện Nhuế Thành',
  'Thành phố Vĩnh Tế': 'Bồ Châu', 'Thành phố Hà Tân': 'Huyện Hà Tân',
  'Thành phố Hãn Châu': 'Hân Châu', 'Quận Hãn Phủ': 'Hân Châu', 'Huyện Định Tương': 'Huyện Định Tương',
  'Huyện Ngũ Đài': 'Huyện Ngũ Đài', 'Huyện Đại': 'Đại Châu', 'Huyện Phồn Trĩ': 'Huyện Phồn Trĩ',
  'Huyện Ninh Vũ': 'Ninh Vũ Quan', 'Huyện Tĩnh Nhạc': 'Huyện Tĩnh Nhạc', 'Huyện Thần Trì': 'Thần Trì Bảo',
  'Huyện Ngũ Trại': 'Ngũ Trại Bảo', 'Huyện Khả Lam': 'Khả Lam Châu', 'Huyện Hà Khúc': 'Huyện Hà Khúc',
  'Huyện Bảo Đức': 'Bảo Đức Châu', 'Huyện Thiên Quan': 'Thiên Quan Sở', 'Thành phố Nguyên Bình': 'Huyện Quách',
  'Thành phố Lâm Phần': 'Huyện Lâm Phần', 'Quận Nghiêu Đô': 'Huyện Lâm Phần', 'Huyện Khúc Ốc': 'Huyện Khúc Ốc',
  'Huyện Dực Thành': 'Huyện Dực Thành', 'Huyện Tương Phần': 'Huyện Thái Bình', 'Huyện Hồng Đồng': 'Huyện Hồng Đồng',
  'Huyện Cổ': 'Huyện Nhạc Dương', 'Huyện An Trạch': 'Huyện Nhạc Dương', 'Huyện Phù Sơn': 'Huyện Phù Sơn',
  'Huyện Cát': 'Cát Châu', 'Huyện Hương Ninh': 'Huyện Hương Ninh', 'Huyện Đại Ninh': 'Huyện Đại Ninh',
  'Huyện Thấp': 'Thấp Châu', 'Huyện Vĩnh Hòa': 'Huyện Vĩnh Hòa', 'Huyện Bồ': 'Huyện Bồ',
  'Huyện Phần Tây': 'Huyện Phần Tây', 'Thành phố Hầu Mã': 'Huyện Khúc Ốc', 'Thành phố Hoắc Châu': 'Hoắc Châu',
  'Thành phố Lữ Lương': 'Vĩnh Ninh Châu', 'Quận Ly Thạch': 'Vĩnh Ninh Châu', 'Huyện Văn Thủy': 'Huyện Văn Thủy',
  'Huyện Giao Thành': 'Huyện Giao Thành', 'Huyện Hưng': 'Huyện Hưng', 'Huyện Lâm': 'Huyện Lâm',
  'Huyện Liễu Lâm': 'Vĩnh Ninh Châu', 'Huyện Thạch Lâu': 'Huyện Thạch Lâu', 'Huyện Lam': 'Huyện Lam',
  'Huyện Phương Sơn': 'Vĩnh Ninh Châu', 'Huyện Trung Dương': 'Huyện Ninh Hương', 'Huyện Giao Khẩu': 'Thấp Châu',
  'Thành phố Hiếu Nghĩa': 'Huyện Hiếu Nghĩa', 'Thành phố Phần Dương': 'Phần Châu',

   // ================== Khu tự trị Nội Mông Cổ ==================
  'Thành phố Hô Hòa Hạo Đặc': 'Quy Hóa Thành', 'Quận Hồi Dân': 'Tây doanh Quy Hóa', 'Quận Ngọc Tuyền': 'Nam doanh Quy Hóa',
  'Quận Tái Hãn': 'Đông doanh Quy Hóa', 'Kỳ Thổ Mặc Đặc Tả': 'Thổ Mặc Đặc Tả dực',
  'Huyện Thác Khắc Thác': 'Đông Thắng Hữu Vệ', 'Huyện Hòa Lâm Cách Nhĩ': 'Vân Xuyên Vệ', 'Huyện Thanh Thủy Hà': 'Đông Thắng Tả Vệ',
  'Huyện Vũ Xuyên': 'Vũ Xuyên Bảo',
  
  'Thành phố Bao Đầu': 'Bộ Thổ Mặc Đặc', 'Quận Đông Hà': 'Bao Khắc Đồ Đông doanh', 'Quận Côn Đô Luân': 'Bao Khắc Đồ Tây doanh',
  'Quận Thanh Sơn': 'Thanh Sơn Doanh', 'Quận Thạch Quải': 'Hỉ Quế Đồ', 'Khu mỏ Bạch Vân Ngạc Bác': 'Bạch Vân Ngạc Bác',
  'Quận Cửu Nguyên': 'Bao Khắc Đồ', 'Kỳ Thổ Mặc Đặc Hữu': 'Thổ Mặc Đặc Hữu dực',
  'Huyện Cố Dương': 'Cố Dương Bảo', 'Kỳ Liên hợp Đạt Nhĩ Hãn Mậu Minh An': 'Bộ Mậu Minh An',
  
  'Thành phố Ô Hải': 'Ninh Hạ Vệ', 'Quận Hải Bột Loan': 'Ninh Hạ Trung hậu vệ', 'Quận Hải Nam': 'Ninh Hạ Trung Vệ', 'Quận Ô Đạt': 'Ninh Hạ Tiền Vệ',
  
  'Thành phố Xích Phong': 'Doyan Vệ', 'Quận Hồng Sơn': 'Ô Lan Haa Đạt', 'Quận Nguyên Bảo Sơn': 'Nguyên Bảo Sơn',
  'Quận Tùng Sơn': 'Ông Ngưu Đặc Tả dực', 'Kỳ A Lỗ Khoa Nhĩ Thấm': 'Bộ A Lỗ Khoa Nhĩ Thấm', 'Kỳ Ba Lâm Tả': 'Ba Lâm Tả Dực',
  'Kỳ Ba Lâm Hữu': 'Ba Lâm Hữu Dực', 'Huyện Lâm Tây': 'Lâm Tây Bảo', 'Kỳ Khắc Thập Khắc Đằng': 'Khắc Thập Khắc Đằng bộ',
  'Kỳ Ông Ngưu Đặc': 'Ông Ngưu Đặc Hữu Dực', 'Kỳ Khách Lạt Thấm': 'Bộ Khách Lạt Thấm', 'Huyện Ninh Thành': 'Đại Ninh Vệ',
  'Kỳ Ngao Hán': 'Ngao Hán Bộ',
  
  'Thành phố Thông Liêu': 'Thái Ninh Vệ', 'Quận Khoa Nhĩ Thấm': 'Chủ Doanh Khoa Nhĩ Thấm', 'Kỳ Khoa Nhĩ Thấm Tả Dực Trung': 'Khoa Nhĩ Thấm Tả dực Trung doanh',
  'Kỳ Khoa Nhĩ Thấm Tả Dực Hậu': 'Khoa Nhĩ Thấm Tả dực Hậu doanh', 'Huyện Khai Lỗ': 'Khai Lỗ Bảo', 'Kỳ Khố Luân': 'Khüree Bộ',
  'Kỳ Nại Mạn': 'Nại Mạn Bộ', 'Kỳ Trát Lỗ Đặc': 'Bộ Trát Lỗ Đặc', 'Thành phố Hoắc Lâm Quách Lặc': 'Hoắc Lâm Hà',
  
  'Thành phố Ngạc Nhĩ Đa Tư': 'Bộ Ngạc Nhĩ Đa Tư', 'Quận Đông Thắng': 'Đông Thắng Vệ', 'Quận Khang Ba Thập': 'Chủ doanh Ngạc Nhĩ Đa Tư',
  'Kỳ Đạt Lạp Đặc': 'Bộ Đạt Lạt Đặc', 'Kỳ Chuẩn Cách Nhĩ': 'Bộ Chuẩn Cát Nhĩ', 'Kỳ Ngạc Thác Khắc Tiền': 'Tiền Doanh Ngạc Thác Khắc',
  'Kỳ Ngạc Thác Khắc': 'Hậu Doanh Ngạc Thác Khắc', 'Kỳ Hàng Cẩm': 'Hàng Cẩm Bộ', 'Kỳ Ô Thẩm': 'Ô Thẩm Bộ',
  'Kỳ Y Kim Hoắc Lạc': 'Y Kim Hoắc Lạc',
  
  'Thành phố Hô Luân Bối Nhĩ': 'Bộ Đạt Oát Nhĩ', 'Quận Hải Lạp Nhĩ': 'Hải Lạp Nhĩ', 'Quận Trát Lãi Nặc Nhĩ': 'Trát Lãi Nặc Nhĩ',
  'Kỳ A Vinh': 'A Vinh Bộ', 'Kỳ tự trị dân tộc Daur Mạc Lực Đạt Ngõa': 'Chủ Doanh Đạt Oát Nhĩ', 'Kỳ tự trị Oroqen': 'Bộ Ngạc Luân Xuân',
  'Kỳ tự trị dân tộc Ewenki': 'Bộ Ngạc Ôn Khắc', 'Kỳ Trần Ba Nhĩ Hổ': 'Trần Ba Nhĩ Hổ', 'Kỳ Tân Ba Nhĩ Hổ Tả': 'Tả dực Tân Ba Nhĩ Hổ',
  'Kỳ Tân Ba Nhĩ Hổ Hữu': 'Hữu dực Tân Ba Nhĩ Hổ', 'Thành phố Mãn Châu Lý': 'Hoắc Lặc Kim', 'Thành phố Nha Khắc Thạch': 'Nha Khắc Thạch',
  'Thành phố Trát Lan Đồn': 'Nhã Lỗ Vệ', 'Thành phố Ngạch Nhĩ Cổ Nạp': 'Vệ Ngạch Nhĩ Cổ Nạp', 'Thành phố Căn Hà': 'Căn Hà Bảo',
  
  'Thành phố Ba Ngạn Náo Nhĩ': 'Bộ Ô Lạt Đặc', 'Quận Lâm Hà': 'Lâm Hà Bảo', 'Huyện Ngũ Nguyên': 'Ngũ Nguyên Bảo',
  'Huyện Đặng Khẩu': 'Đặng Khẩu Bảo', 'Kỳ Ô Lạp Đặc Tiền': 'Tiền Doanh Ô Lạp Đặc', 'Kỳ Ô Lạp Đặc Trung': 'Trung Doanh Ô Lạp Đặc',
  'Kỳ Ô Lạp Đặc Hậu': 'Hậu Doanh Ô Lạp Đặc', 'Kỳ Hàng Cẩm Hậu': 'Hậu doanh Hàng Cẩm',
  
  'Thành phố Ô Lan Sát Bố': 'Bộ Sát Cáp Nhĩ', 'Quận Tập Ninh': 'Tập Ninh Bảo', 'Huyện Trác Tư': 'Trác Tư Sơn',
  'Huyện Hóa Đức': 'Hóa Đức Bảo', 'Huyện Thương Đô': 'Thương Đô Bảo', 'Huyện Hưng Hòa': 'Hưng Hòa Thủ ngự Thiên hộ sở',
  'Huyện Lương Thành': 'Lương Thành Bảo', 'Kỳ Sát Cáp Nhĩ Hữu Dực Tiền': 'Sát Cáp Nhĩ hữu tiền doanh', 'Kỳ Sát Cáp Nhĩ Hữu Dực Trung': 'Sát Cáp Nhĩ hữu trung doanh',
  'Kỳ Sát Cáp Nhĩ Hữu Dực Hậu': 'Sát Cáp Nhĩ hữu hậu doanh', 'Kỳ Tứ Tử Vương': 'Tứ Tử Bộ Lạc', 'Thành phố Phong Trấn': 'Phong Trấn Bảo',
  
  'Minh Hưng An': 'Phúc Dư Vệ', 'Thành phố Ô Lan Hạo Đặc': 'Vương Gia Miếu', 'Thành phố A Nhĩ Sơn': 'A Nhĩ Sơn',
  'Kỳ Khoa Nhĩ Thấm Hữu Dực Tiền': 'Khoa Hữu Tiền doanh', 'Kỳ Khoa Nhĩ Thấm Hữu Dực Trung': 'Khoa Hữu Trung doanh', 'Kỳ Trát Lãi Đặc': 'Trát Lãi Đặc bộ',
  'Huyện Đột Tuyền': 'Lễ Tuyền Bảo',
  
  'Minh Tích Lâm Quách Lặc': 'Tô Ni Đặc bộ', 'Thành phố Nhị Liên Hạo Đặc': 'Y Liên Bảo', 'Thành phố Tích Lâm Hạo Đặc': 'A Ba Cát Tả Dực',
  'Kỳ A Ba Dát': 'A Ba Dát bộ', 'Kỳ Tô Ni Đặc Tả': 'Tô Ni Đặc Tả Dực', 'Kỳ Tô Ni Đặc Hữu': 'Tô Ni Đặc Hữu Dực',
  'Kỳ Đông Ô Châu Mục Thấm': 'Đông Ô Châu Mục Thấm', 'Kỳ Tây Ô Châu Mục Thấm': 'Tây Ô Châu Mục Thấm', 'Kỳ Thái Bộc Tự': 'Thái Bộc Tự',
  'Kỳ Tương Hoàng': 'Kỳ Tương Hoàng doanh', 'Kỳ Chính Tương Bạch': 'Doanh Kỳ Chính Tương Bạch', 'Kỳ Chính Lam': 'Kỳ Chính Lam doanh',
  'Huyện Đa Luân': 'Đa Luân Nặc Nhĩ',
  
  'Minh A Lạp Thiện': 'Ninh Hạ Vệ', 'Kỳ A Lạp Thiện Tả': 'Ninh Hạ Vệ',
  'Kỳ A Lạp Thiện Hữu': 'Ninh Hạ Vệ', 'Kỳ Ngạch Tế Nạp': 'Ninh Hạ Vệ',

  // ================== Tỉnh Liêu Ninh ==================
  // Thời Minh thuộc Liêu Đông Đô ty
  'Thành phố Thẩm Dương': 'Thẩm Dương Trung vệ', 'Quận Hòa Bình': 'Thẩm Dương Trung vệ', 'Quận Thẩm Hà': 'Thẩm Dương Trung vệ',
  'Quận Đại Đông': 'Thẩm Dương Trung vệ', 'Quận Hoàng Cô': 'Thẩm Dương Trung vệ', 'Quận Thiết Tây': 'Thẩm Dương Trung vệ',
  'Quận Tô Gia Đồn': 'Thẩm Dương Trung vệ', 'Quận Hồn Nam': 'Thẩm Dương Trung vệ', 'Khu mới Thẩm Bắc': 'Thẩm Dương Trung vệ',
  'Quận Vu Hồng': 'Thẩm Dương Trung vệ', 'Quận Liêu Trung': 'Huyện Liêu Trung', 'Huyện Khang Bình': 'Liêu Hải Vệ',
  'Huyện Pháp Khố': 'Thẩm Dương Trung vệ', 'Thành phố Tân Dân': 'Thẩm Dương Trung vệ',
  'Thành phố Đại Liên': 'Kim Châu Vệ', 'Quận Trung Sơn': 'Kim Châu Vệ', 'Quận Tây Cương': 'Kim Châu Vệ',
  'Quận Sa Hà Khẩu': 'Kim Châu Vệ', 'Quận Cam Tỉnh Tử': 'Kim Châu Vệ', 'Quận Lữ Thuận Khẩu': 'Kim Châu Vệ',
  'Quận Kim Châu': 'Kim Châu Vệ', 'Quận Phổ Lan Điếm': 'Phục Châu Vệ', 'Huyện Trường Hải': 'Kim Châu Vệ',
  'Thành phố Ngõa Phòng Điếm': 'Phục Châu Vệ', 'Thành phố Trang Hà': 'Phượng Hoàng Bảo',
  'Thành phố An Sơn': 'Liêu Dương Vệ', 'Quận Thiết Đông': 'Liêu Dương Vệ', 'Quận Thiết Tây': 'Liêu Dương Vệ',
  'Quận Lập Sơn': 'Liêu Dương Vệ', 'Quận Thiên Sơn': 'Liêu Dương Vệ', 'Huyện Thai An': 'Quảng Ninh Vệ',
  'Huyện tự trị dân tộc Mãn Tụ Nham': 'Phượng Hoàng Bảo', 'Thành phố Hải Thành': 'Hải Châu Vệ',
  'Thành phố Phủ Thuận': 'Thiên Hộ Sở Phủ Thuận', 'Quận Tân Phủ': 'Thiên Hộ Sở Phủ Thuận', 'Quận Đông Châu': 'Thiên Hộ Sở Phủ Thuận',
  'Quận Vọng Hoa': 'Thiên Hộ Sở Phủ Thuận', 'Quận Thuận Thành': 'Thiên Hộ Sở Phủ Thuận', 'Huyện Phủ Thuận': 'Thiên Hộ Sở Phủ Thuận',
  'Huyện tự trị dân tộc Mãn Tân Tân': 'Kiến Châu Vệ (Hậu Kim)', 'Huyện tự trị dân tộc Mãn Thanh Nguyên': 'Thiên Hộ Sở Phủ Thuận',
  'Thành phố Bản Khê': 'Nội Biên Tường Liêu Đông', 'Quận Bình Sơn': 'Liêu Dương Vệ', 'Quận Khê Hồ': 'Liêu Dương Vệ',
  'Quận Minh Sơn': 'Liêu Dương Vệ', 'Quận Nam Phân': 'Liêu Dương Vệ', 'Huyện tự trị dân tộc Mãn Bản Khê': 'Liêu Dương Vệ',
  'Huyện tự trị dân tộc Mãn Hoàn Nhân': 'Kiến Châu Vệ',
  'Thành phố Đan Đông': 'Trấn Giang Bảo', 'Quận Nguyên Bảo': 'Trấn Giang Bảo', 'Quận Chấn Hưng': 'Trấn Giang Bảo',
  'Quận Chấn An': 'Trấn Giang Bảo', 'Huyện tự trị dân tộc Mãn Khoan Điện': 'Khoan Điện Bảo', 'Thành phố Đông Cảng': 'Trấn Giang Bảo',
  'Thành phố Phượng Thành': 'Phượng Hoàng Bảo',
  'Thành phố Cẩm Châu': 'Trung Đồn Vệ Quảng Ninh', 'Quận Cổ Tháp': 'Cẩm Châu', 'Quận Lăng Hà': 'Cẩm Châu',
  'Quận Thái Hòa': 'Cẩm Châu', 'Huyện Hắc Sơn': 'Quảng Ninh Vệ', 'Huyện Nghĩa': 'Nghĩa Châu Vệ',
  'Thành phố Lăng Hải': 'Hữu Đồn Vệ Quảng Ninh', 'Thành phố Bắc Trấn': 'Quảng Ninh Vệ',
  'Thành phố Dinh Khẩu': 'Cái Châu Vệ', 'Quận Trạm Tiền': 'Cái Châu Vệ', 'Quận Tây Thị': 'Cái Châu Vệ',
  'Quận Bạt Ngư Khuyên': 'Cái Châu Vệ', 'Quận Lão Biên': 'Cái Châu Vệ', 'Thành phố Cái Châu': 'Cái Châu Vệ',
  'Thành phố Đại Thạch Kiều': 'Hải Châu Vệ',
  'Thành phố Phụ Tân': 'Hậu Đồn Vệ Quảng Ninh', 'Quận Hải Châu': 'Hậu Đồn Vệ Quảng Ninh', 'Quận Tân Khâu': 'Hậu Đồn Vệ Quảng Ninh',
  'Quận Thái Bình': 'Hậu Đồn Vệ Quảng Ninh', 'Quận Thanh Hà Môn': 'Hậu Đồn Vệ Quảng Ninh', 'Quận Tế Hà': 'Hậu Đồn Vệ Quảng Ninh',
  'Huyện tự trị dân tộc Mông Cổ Phụ Tân': 'Hậu Đồn Vệ Quảng Ninh', 'Huyện Chương Vũ': 'Hậu Đồn Vệ Quảng Ninh',
  'Thành phố Liêu Dương': 'Liêu Đông Đô ty/Liêu Dương Vệ', 'Quận Bạch Tháp': 'Liêu Dương Vệ', 'Quận Văn Thánh': 'Liêu Dương Vệ',
  'Quận Hoành Vĩ': 'Liêu Dương Vệ', 'Quận Cung Trường Lĩnh': 'Liêu Dương Vệ', 'Quận Thái Tử Hà': 'Liêu Dương Vệ',
  'Huyện Liêu Dương': 'Liêu Dương Vệ', 'Thành phố Đăng Tháp': 'Liêu Dương Vệ',
  'Thành phố Bàn Cẩm': 'Quảng Ninh Vệ', 'Quận Song Đài Tử': 'Quảng Ninh Vệ', 'Quận Hưng Long Đài': 'Quảng Ninh Vệ',
  'Quận Đại Oa': 'Quảng Ninh Vệ', 'Huyện Bàn Sơn': 'Quảng Ninh Vệ',
  'Thành phố Thiết Lĩnh': 'Thiết Lĩnh Vệ', 'Quận Ngân Châu': 'Thiết Lĩnh Vệ', 'Quận Thanh Hà': 'Thiết Lĩnh Vệ',
  'Huyện Thiết Lĩnh': 'Thiết Lĩnh Vệ', 'Huyện Tây Phong': 'Thiết Lĩnh Vệ', 'Huyện Xương Đồ': 'Thiết Lĩnh Vệ',
  'Thành phố Điếu Binh Sơn': 'Thiết Lĩnh Vệ', 'Thành phố Khai Nguyên': 'Khai Nguyên Vệ',
  'Thành phố Triều Dương': 'Doanh Châu Vệ', 'Quận Song Tháp': 'Doanh Châu Vệ (Phế)', 'Quận Long Thành': 'Doanh Châu Vệ',
  'Huyện Triều Dương': 'Doanh Châu Vệ', 'Huyện Kiến Bình': 'Doanh Châu Vệ', 'Huyện tự trị dân tộc Mông Cổ Khách Lạt Thấm Tả Dực': 'Doanh Châu Vệ',
  'Thành phố Bắc Phiếu': 'Doanh Châu Vệ', 'Thành phố Lăng Nguyên': 'Doanh Châu Vệ',
  'Thành phố Hồ Lô Đảo': 'Ninh Viễn Vệ', 'Quận Liên Sơn': 'Ninh Viễn Vệ', 'Quận Long Cảng': 'Ninh Viễn Vệ',
  'Quận Nam Phiếu': 'Ninh Viễn Vệ', 'Huyện Tuy Trung': 'Tiền Đồn Vệ Quảng Ninh', 'Huyện Kiến Xương': 'Dinh Châu Vệ',
  'Thành phố Hưng Thành': 'Ninh Viễn Vệ',

  // ================== Tỉnh Cát Lâm ==================
  'Thành phố Trường Xuân': 'Y Thông Bảo', 'Quận Nam Quan': 'Nam Quan Bảo', 'Quận Khoan Thành': 'Khoan Thành Bảo',
  'Quận Nhị Đạo': 'Y Thông Hà vệ', 'Quận Lục Viên': 'Tây Doanh',
  'Quận Song Dương': 'Tô Ngõa Diên bộ', 'Quận Cửu Đài': 'Cửu Đài Bảo', 'Huyện Nông An': 'Hoàng Long Thành',
  'Thành phố Du Thụ': 'Cô Du Thụ', 'Thành phố Đức Huệ': 'Mộc Dương Vệ', 'Thành phố Công Chúa Lĩnh': 'Bộ Quách Nhĩ La Tư',
  'Thành phố Cát Lâm': 'Ô Lạp Thành', 'Quận Xương Ấp': 'Ô Lạp Tả doanh', 'Quận Long Đàm': 'Long Đàm Sơn thành',
  'Quận Thuyền Doanh': 'Thuyền Xưởng', 'Quận Phong Mãn': 'Tùng Hoa Giang vệ', 'Huyện Vĩnh Cát': 'Vĩnh Cát Châu',
  'Thành phố Giao Hà': 'Ngạch Mục Hách bộ', 'Thành phố Hoa Điện': 'Huy Phát Thành', 'Thành phố Thư Lan': 'Thư Lan Bảo',
  'Thành phố Bàn Thạch': 'A Thập Khách Đạt',
  'Thành phố Tứ Bình': 'Diệp Hách Thành', 'Quận Thiết Tây': 'Diệp Hách Tây thành', 'Quận Thiết Đông': 'Diệp Hách Đông thành', 
  'Huyện Lê Thụ': 'Thiên Kiểm Thành', 'Huyện tự trị dân tộc Mãn Y Thông': 'Y Thông Bảo', 'Thành phố Song Liêu': 'Đả Sinh Ô Lạp',
  'Thành phố Liêu Nguyên': 'Haa Đạt Thành', 'Quận Long Sơn': 'Cáp Đạt Tây doanh', 'Huyện Đông Phong': 'Đại Nhĩ Hỗ bộ', 'Huyện Đông Liêu': 'Tiểu Nhĩ Hỗ bộ',
  'Thành phố Thông Hóa': 'Hách Đồ A Lạt', 'Quận Đông Xương': 'Đồng Giai Bộ', 'Quận Nhị Đạo Giang': 'Hồn Giang Vệ',
  'Huyện Thông Hóa': 'Kiến Châu Hữu vệ', 'Huyện Huy Nam': 'Huy Phát Nam doanh', 'Huyện Liễu Hà': 'Liễu Điều Biên',
  'Thành phố Mai Hà Khẩu': 'Hải Long Bảo', 'Thành phố Tập An': 'Đổng Ngạc Bộ',
  'Thành phố Bạch Sơn': 'Trường Bạch Sơn bộ', 'Quận Hồn Giang': 'Áp Lục Giang bộ', 
  'Huyện Phủ Tùng': 'Nột Ân Bộ', 'Huyện Tĩnh Vũ': 'Châu Xá Lý bộ', 'Huyện tự trị dân tộc Triều Tiên Trường Bạch': 'Bộ Trường Bạch Sơn',
  'Thành phố Lâm Giang': 'Mậu Liên Vệ',
  'Thành phố Tùng Nguyên': 'Bộ Khoa Nhĩ Thấm', 'Quận Ninh Giang': 'Bá Đô Nột', 'Huyện tự trị dân tộc Mông Cổ Tiền Quách Nhĩ La Tư': 'Quách Nhĩ La Tư tiền doanh',
  'Huyện Trường Lĩnh': 'Trường Lĩnh Bảo', 'Huyện Càn An': 'Càn An Bảo', 'Thành phố Phù Dư': 'Phù Dư Vệ',
  'Thành phố Bạch Thành': 'Bộ Khoa Nhĩ Thấm', 'Quận Thao Bắc': 'Thái Ninh Tả Dực', 'Huyện Trấn Lãi': 'Trấn Lãi Bảo',
  'Huyện Thông Du': 'Bộ Trát Tát Khắc', 'Thành phố Thao Nam': 'Thao Nam Bảo', 'Thành phố Đại An': 'Đại An Bảo',
  'Châu tự trị dân tộc Triều Tiên Diên Biên': 'Bộ Ngõa Nhĩ Khách', 'Thành phố Diên Cát': 'Cục Tử Nhai', 'Thành phố Đồ Môn': 'Khôi Mạc Đông',
  'Thành phố Đôn Hóa': 'Bộ A Khắc Đôn', 'Thành phố Hồn Xuân': 'Ôn Xuân Bộ', 'Thành phố Long Tỉnh': 'Lục Đạo Câu',
  'Thành phố Hòa Long': 'Hòa Long Vệ', 'Huyện Uông Thanh': 'Bách Thảo Câu', 'Huyện An Đồ': 'An Đồ Bảo',

 // ================== Tỉnh Hắc Long Giang ==================
  'Thành phố Cáp Nhĩ Tân': 'A Lặc Sở Khách', 'Quận Đạo Lý': 'Nam Doanh Tùng Hoa Giang', 'Quận Nam Cương': 'Mã Gia Câu',
  'Quận Đạo Ngoại': 'Tân Giang Bảo', 'Quận Bình Phường': 'Bình Phòng Bảo', 'Quận Tùng Bắc': 'Tùng Giang Doanh',
  'Quận Hương Phường': 'Hương Phường Bảo', 'Quận Hô Lan': 'Hô Lan Vệ', 'Quận A Thành': 'A Lặc Sở Khách',
  'Quận Song Thành': 'Lạp Lâm Bộ', 'Huyện Y Lan': 'Tam Tính Thành', 'Huyện Phương Chính': 'Phương Chính Bảo',
  'Huyện Tân': 'Tân Châu Bảo', 'Huyện Ba Ngạn': 'Ba Ngạn Tô Tô', 'Huyện Mộc Lan': 'Mộc Lan Bảo',
  'Huyện Thông Hà': 'Hồng Khẳng Bộ', 'Huyện Diên Thọ': 'Trường Thọ Bảo', 'Thành phố Thượng Chí': 'Châu Hà',
  'Thành phố Ngũ Thường': 'Ngũ Thường Bảo',
  'Thành phố Tề Tề Cáp Nhĩ': 'Tác Luân Bộ', 'Quận Long Sa': 'Vệ Bặc Lỗ Đan', 'Quận Kiến Hoa': 'Giả Trần Vệ',
  'Quận Thiết Phong': 'Vệ Mộc Hốt Hà', 'Quận Ngang Ngang Khê': 'Ngang Ngang Khê', 'Quận Phú Lạp Nhĩ Cơ': 'Phất Đề Vệ',
  'Quận Niễn Tử Sơn': 'Niễn Tử Sơn', 'Quận dân tộc Daur Mai Lý Tư': 'Nam Doanh Đạt Oát Nhĩ', 'Huyện Long Giang': 'Long Giang Bảo',
  'Huyện Y An': 'Y An Bảo', 'Huyện Thái Lai': 'Tháp Tử Thành', 'Huyện Cam Nam': 'Cam Nam Bảo',
  'Huyện Phú Dụ': 'Phú Dụ Bảo', 'Huyện Khắc Sơn': 'Khắc Sơn Bảo', 'Huyện Khắc Đông': 'Khắc Đông Bảo',
  'Huyện Bái Tuyền': 'Ba Bái Bảo', 'Thành phố Nột Hà': 'Nột Hà Vệ',
  'Thành phố Kê Tây': 'Mục Lăng Bộ', 'Quận Kê Quan': 'Mục Lăng Tả Dinh', 'Quận Hằng Sơn': 'Mục Lăng Hữu Dinh',
  'Quận Tích Đạo': 'Tích Đạo', 'Quận Lê Thụ': 'Lê Thụ Câu', 'Quận Thành Tử Hà': 'Thành Tử Hà',
  'Quận Ma Sơn': 'Ma Sơn', 'Huyện Kê Đông': 'Kê Đông Bảo', 'Thành phố Hổ Lâm': 'Hốt Lâm Vệ',
  'Thành phố Mật Sơn': 'Mục Lăng Bộ',
  'Thành phố Hạc Cương': 'Hách Triết Bộ', 'Huyện La Bắc': 'La Bắc Bảo', 'Huyện Tuy Tân': 'Tuy Tân Bảo', 
  'Quận Công Nông': 'Hách Triết Tả Dinh', 'Quận Hưng An': 'Hách Triết Hữu Dinh', 'Quận Đông Sơn': 'Hạc Cương Đông Dinh', 'Quận Hưng Sơn': 'Hạc Cương Tây Dinh',
  'Thành phố Song Áp Sơn': 'Sử Khuyển Bộ', 'Huyện Tập Hiền': 'Tập Hiền Bảo', 'Huyện Hữu Nghị': 'Hữu Nghị Bảo',
  'Huyện Bảo Thanh': 'Bảo Thanh Bảo', 'Huyện Nhiêu Hà': 'Nhiêu Hà Vệ', 'Quận Tiêm Sơn': 'Tiêm Sơn Bảo', 'Quận Lĩnh Đông': 'Lĩnh Đông Bảo', 'Quận Tứ Phương Đài': 'Tứ Phương Đài',
  'Thành phố Đại Khánh': 'Đỗ Nhĩ Bá Đặc', 'Quận Tát Nhĩ Đồ': 'Tát Nhĩ Đồ', 'Quận Long Phượng': 'Long Phượng Bảo',
  'Quận Nhượng Hồ Lộ': 'Nhượng Hồ Lộ', 'Quận Hồng Cương': 'Hồng Cương', 'Quận Đại Đồng': 'Đại Đồng Bảo',
  'Huyện Triệu Châu': 'Triệu Châu Bảo', 'Huyện Triệu Nguyên': 'Triệu Nguyên Bảo', 'Huyện Lâm Điện': 'Lâm Điện Bảo',
  'Huyện tự trị dân tộc Mông Cổ Đỗ Nhĩ Bá Đặc': 'Đỗ Nhĩ Bá Đặc',
  'Thành phố Y Xuân': 'Bộ Tát Cáp Liên', 'Quận Y Mỹ': 'Y Xuân Bảo', 'Quận Ô Thúy': 'Ô Thúy Bảo',
  'Quận Hữu Hảo': 'Hữu Hảo Bảo', 'Huyện Gia Ấm': 'Gia Ấm Bảo', 'Huyện Thang Vượng': 'Vệ Thang Vượng Hà',
  'Huyện Phong Lâm': 'Phong Lâm Bảo', 'Huyện Đại Tinh Sơn': 'Đại Tinh Sơn', 'Huyện Nam Xoát': 'Nam Xoa',
  'Quận Kim Lâm': 'Kim Lâm Bảo', 'Thành phố Thiết Lực': 'Thiết Ly Vệ',
  'Thành phố Giai Mộc Tư': 'Bộ Hốt Nhĩ Cáp', 'Quận Tiền Tiến': 'Hợp Giang Tả Dinh',
  'Quận Đông Phong': 'Hợp Giang Hữu Dinh', 'Huyện Hoa Nam': 'Hoa Nam Bảo',
  'Huyện Hoa Xuyên': 'Vệ Hốt Nhĩ Cáp', 'Huyện Thang Nguyên': 'Thang Nguyên Bảo', 'Thành phố Đồng Giang': 'Lạp Cáp Tô Tô',
  'Thành phố Phú Cẩm': 'Phú Khắc Cẩm', 'Thành phố Phủ Viễn': 'Y Lực Ca',
  'Thành phố Thất Đài Hà': 'Bộ Khố Nhĩ Khách', 'Quận Đào Sơn': 'Đào Sơn Bảo',
  'Quận Gia Tử Hà': 'Gia Tử Hà', 'Huyện Bột Lợi': 'Bột Lợi Bảo',
  'Thành phố Mẫu Đơn Giang': 'Ninh Cổ Tháp', 'Quận Ái Dân': 'Bắc doanh Ninh Cổ Tháp', 'Huyện Lâm Khẩu': 'Lâm Khẩu Bảo', 'Quận Dương Minh': 'Đông doanh Ninh Cổ Tháp',
  'Thành phố Tuy Phân Hà': 'Tuy Phân Bộ', 'Thành phố Hải Lâm': 'Hải Lan Phao', 'Thành phố Ninh An': 'Ninh Cổ Tháp',
  'Thành phố Mục Lăng': 'Mục Lăng Vệ', 'Thành phố Đông Ninh': 'Tam Xoa Khẩu',
  'Thành phố Hắc Hà': 'Bộ Phi Nha Khách', 'Quận Ái Huy': 'Vệ Hốt Lỗ Mục', 'Huyện Tốn Khắc': 'Tốn Khắc Bảo',
  'Huyện Tôn Ngô': 'Tôn Ngô Bảo', 'Thành phố Bắc An': 'Long Trấn', 'Thành phố Ngũ Đại Liên Trì': 'Mặc Nhĩ Căn',
  'Thành phố Non Giang': 'Nộn Giang Vệ',
  'Thành phố Tuy Hóa': 'Hô Lan Bộ', 'Quận Bắc Lâm': 'Hô Lan Bắc Dinh', 'Huyện Vọng Khuê': 'Vọng Khuê Bảo',
  'Huyện Lan Tây': 'Hô Lan Tây Dinh', 'Huyện Thanh Cương': 'Thanh Cương Bảo', 'Huyện Khánh An': 'Khánh An Bảo',
  'Huyện Minh Thủy': 'Minh Thủy Bảo', 'Huyện Tuy Lăng': 'Tuy Lăng Bảo', 'Thành phố An Đạt': 'An Đạt Bảo',
  'Thành phố Triệu Đông': 'Triệu Đông Bảo', 'Thành phố Hải Luân': 'Hải Luân Bảo',
  'Địa khu Đại Hưng An Lĩnh': 'Sử Lộc Bộ', 'Thành phố Mạc Hà': 'Mạc Hà Bảo', 'Huyện Hô Mã': 'Vệ Hô Mã Nhĩ',
  'Huyện Tháp Hà': 'Tháp Hà Bảo',

  // ================== Thành phố Thượng Hải ==================
  // Thời Minh thuộc phủ Tùng Giang, Nam Trực Lệ
  'Quận Hoàng Phố': 'Huyện Thượng Hải', 'Quận Từ Hối': 'Huyện Thượng Hải', 'Quận Trường Ninh': 'Huyện Thượng Hải',
  'Quận Tĩnh An': 'Huyện Thượng Hải', 'Quận Phổ Đà': 'Huyện Thượng Hải', 'Quận Hồng Khẩu': 'Huyện Thượng Hải',
  'Quận Dương Phố': 'Huyện Thượng Hải', 'Quận Mẫn Hành': 'Huyện Thượng Hải', 'Quận Bảo Sơn': 'Huyện Gia Định',
  'Quận Gia Định': 'Huyện Gia Định', 'Khu mới Phố Đông': 'Huyện Thượng Hải', 'Quận Kim Sơn': 'Huyện Hoa Đình',
  'Quận Tùng Giang': 'Huyện Hoa Đình', 'Quận Thanh Phố': 'Huyện Thanh Phố', 'Quận Phụng Hiền': 'Huyện Hoa Đình',
  'Quận Sùng Minh': 'Huyện Sùng Minh',

  // ================== Tỉnh Giang Tô ==================
  'Thành phố Nam Kinh': 'Huyện Thượng Nguyên', 'Quận Huyền Vũ': 'Huyện Thượng Nguyên', 'Quận Tần Hoài': 'Huyện Giang Ninh',
  'Quận Kiến Nghiệp': 'Huyện Giang Ninh', 'Quận Cổ Lâu': 'Huyện Thượng Nguyên', 'Quận Phố Khẩu': 'Huyện Giang Phố',
  'Quận Thê Hà': 'Huyện Thượng Nguyên', 'Quận Vũ Hoa Đài': 'Huyện Giang Ninh', 'Quận Giang Ninh': 'Huyện Giang Ninh',
  'Quận Lục Hợp': 'Huyện Lục Hợp', 'Quận Lật Thủy': 'Huyện Lật Thủy', 'Quận Cao Thuần': 'Huyện Cao Thuần',
  'Thành phố Vô Tích': 'Huyện Vô Tích', 'Quận Tích Sơn': 'Huyện Vô Tích', 'Quận Huệ Sơn': 'Huyện Vô Tích',
  'Quận Tân Hồ': 'Huyện Vô Tích', 'Quận Lương Khê': 'Huyện Vô Tích', 'Quận Tân Ngô': 'Huyện Vô Tích',
  'Thành phố Giang Âm': 'Huyện Giang Âm', 'Thành phố Nghi Hưng': 'Huyện Nghi Hưng',
  'Thành phố Từ Châu': 'Từ Châu', 'Quận Cổ Lâu': 'Từ Châu', 'Quận Vân Long': 'Từ Châu',
  'Quận Giả Uông': 'Từ Châu', 'Quận Tuyền Sơn': 'Từ Châu', 'Quận Đồng Sơn': 'Từ Châu',
  'Huyện Phong': 'Huyện Phong', 'Huyện Bái': 'Huyện Bái', 'Huyện Tuy Ninh': 'Huyện Tuy Ninh',
  'Thành phố Tân Nghi': 'Phi Châu', 'Thành phố Phi Châu': 'Phi Châu',
  'Thành phố Thường Châu': 'Huyện Vũ Tiến', 'Quận Thiên Ninh': 'Huyện Vũ Tiến', 'Quận Chung Lâu': 'Huyện Vũ Tiến',
  'Quận Tân Bắc': 'Huyện Vũ Tiến', 'Quận Vũ Tiến': 'Huyện Vũ Tiến', 'Quận Kim Đàn': 'Huyện Kim Đàn',
  'Thành phố Lật Dương': 'Huyện Lật Dương',
  'Thành phố Tô Châu': 'Huyện Ngô', 'Quận Hổ Khâu': 'Huyện Ngô', 'Quận Ngô Trung': 'Huyện Ngô',
  'Quận Tương Thành': 'Huyện Ngô', 'Quận Cô Tô': 'Huyện Ngô', 'Quận Ngô Giang': 'Huyện Ngô Giang',
  'Thành phố Thường Thục': 'Huyện Thường Thục', 'Thành phố Trương Gia Cảng': 'Huyện Thường Thục', 'Thành phố Côn Sơn': 'Huyện Côn Sơn',
  'Thành phố Thái Thương': 'Châu Thái Thương',
  'Thành phố Nam Thông': 'Thông Châu', 'Quận Sùng Xuyên': 'Thông Châu', 'Quận Thông Châu': 'Thông Châu',
  'Thành phố Hải An': 'Huyện Như Cao', 'Huyện Như Đông': 'Huyện Như Cao', 'Thành phố Khải Đông': 'Thông Châu',
  'Thành phố Như Cao': 'Huyện Như Cao', 'Quận Hải Môn': 'Huyện Hải Môn',
  'Thành phố Liên Vân Cảng': 'Hải Châu', 'Quận Liên Vân': 'Hải Châu', 'Quận Hải Châu': 'Hải Châu',
  'Quận Cám Du': 'Huyện Cống Du', 'Huyện Đông Hải': 'Hải Châu', 'Huyện Quán Vân': 'Hải Châu',
  'Huyện Quán Nam': 'Huyện An Đông', // Phủ Hoài An thời Minh
  'Thành phố Hoài An': 'Huyện Sơn Dương', 'Quận Hoài An': 'Huyện Sơn Dương', 'Quận Hoài Âm': 'Huyện Thanh Hà',
  'Quận Thanh Giang Phố': 'Huyện Sơn Dương', 'Quận Hồng Trạch': 'Huyện Sơn Dương', 'Huyện Liên Thủy': 'Huyện An Đông',
  'Huyện Hu Dị': 'Huyện Hu Dị', 'Huyện Kim Hồ': 'Huyện Bảo Ứng',
  'Thành phố Diêm Thành': 'Huyện Diêm Thành', 'Quận Đình Hồ': 'Huyện Diêm Thành', 'Quận Diêm Đô': 'Huyện Diêm Thành',
  'Quận Đại Phong': 'Huyện Hưng Hóa', 'Huyện Hưởng Thủy': 'Huyện Sơn Dương', 'Huyện Tân Hải': 'Huyện Sơn Dương',
  'Huyện Phụ Ninh': 'Huyện Sơn Dương', 'Huyện Xạ Dương': 'Huyện Diêm Thành', 'Huyện Kiến Hồ': 'Huyện Diêm Thành',
  'Thành phố Đông Đài': 'Huyện Hưng Hóa',
  'Thành phố Dương Châu': 'Huyện Giang Đô', 'Quận Quảng Lăng': 'Huyện Giang Đô', 'Quận Hàn Giang': 'Huyện Giang Đô',
  'Quận Giang Đô': 'Huyện Giang Đô', 'Huyện Bảo Ứng': 'Huyện Bảo Ứng', 'Thành phố Nghi Trưng': 'Huyện Nghi Chân',
  'Thành phố Cao Bưu': 'Châu Cao Bưu',
  'Thành phố Trấn Giang': 'Huyện Đan Đồ', 'Quận Kinh Khẩu': 'Huyện Đan Đồ', 'Quận Nhuận Châu': 'Huyện Đan Đồ',
  'Quận Đan Đồ': 'Huyện Đan Đồ', 'Thành phố Đan Dương': 'Huyện Đan Dương', 'Thành phố Dương Trung': 'Châu Thái Bình (Thuộc Đan Đồ)',
  'Thành phố Cú Dung': 'Huyện Câu Dung',
  'Thành phố Thái Châu': 'Thái Châu', 'Quận Hải Lăng': 'Thái Châu', 'Quận Cao Cảng': 'Thái Châu',
  'Quận Khương Yển': 'Thái Châu', 'Thành phố Hưng Hóa': 'Huyện Hưng Hóa', 'Thành phố Tĩnh Giang': 'Huyện Tĩnh Giang',
  'Thành phố Thái Hưng': 'Huyện Thái Hưng',
  'Thành phố Túc Thiên': 'Huyện Túc Thiên', 'Quận Túc Thành': 'Huyện Túc Thiên', 'Quận Túc Dự': 'Huyện Túc Thiên',
  'Huyện Thuật Dương': 'Huyện Thuật Dương', 'Huyện Tứ Dương': 'Huyện Đào Nguyên', 'Huyện Tứ Hồng': 'Tứ Châu',

  // ================== Tỉnh Chiết Giang ==================
  'Thành phố Hàng Châu': 'Huyện Tiền Đường', 'Quận Thượng Thành': 'Huyện Tiền Đường', 'Quận Củng Thự': 'Huyện Nhân Hòa',
  'Quận Tây Hồ': 'Huyện Tiền Đường', 'Quận Tân Giang': 'Huyện Nhân Hòa', 'Quận Tiêu Sơn': 'Huyện Tiêu Sơn',
  'Quận Dư Hàng': 'Huyện Dư Hàng', 'Quận Phú Dương': 'Huyện Phú Dương', 'Quận Lâm An': 'Huyện Lâm An',
  'Huyện Đồng Lư': 'Huyện Đồng Lư', 'Huyện Thuần An': 'Huyện Thuần An', 'Thành phố Kiến Đức': 'Huyện Kiến Đức',
  'Thành phố Ninh Ba': 'Huyện Ngân', 'Quận Hải Thự': 'Huyện Ngân', 'Quận Giang Bắc': 'Huyện Ngân',
  'Quận Bắc Luân': 'Huyện Định Hải', 'Quận Trấn Hải': 'Huyện Định Hải', 'Quận Ngân Châu': 'Huyện Ngân',
  'Quận Phụng Hóa': 'Huyện Phụng Hóa', 'Huyện Tượng Sơn': 'Huyện Tượng Sơn', 'Huyện Ninh Hải': 'Huyện Ninh Hải',
  'Thành phố Dư Diêu': 'Huyện Dư Diêu', 'Thành phố Từ Khê': 'Huyện Từ Khê',
  'Thành phố Ôn Châu': 'Huyện Vĩnh Gia', 'Quận Lộc Thành': 'Huyện Vĩnh Gia', 'Quận Long Loan': 'Huyện Vĩnh Gia',
  'Quận Âu Hải': 'Huyện Vĩnh Gia', 'Quận Động Đầu': 'Huyện Vĩnh Gia', 'Huyện Vĩnh Gia': 'Huyện Vĩnh Gia',
  'Huyện Bình Dương': 'Huyện Bình Dương', 'Huyện Thương Nam': 'Huyện Bình Dương', 'Huyện Văn Thành': 'Huyện Thụy An',
  'Huyện Thái Thuận': 'Huyện Thụy An', 'Thành phố Thụy An': 'Huyện Thụy An', 'Thành phố Nhạc Thanh': 'Huyện Nhạc Thanh',
  'Thành phố Gia Hưng': 'Huyện Gia Hưng', 'Quận Nam Hồ': 'Huyện Gia Hưng', 'Quận Tú Châu': 'Huyện Tú Thủy',
  'Huyện Gia Thiện': 'Huyện Gia Thiện', 'Huyện Hải Diêm': 'Huyện Hải Diêm', 'Thành phố Hải Ninh': 'Huyện Hải Ninh',
  'Thành phố Bình Hồ': 'Huyện Bình Hồ', 'Thành phố Đồng Hương': 'Huyện Sùng Đức',
  'Thành phố Hồ Châu': 'Huyện Ô Trình', 'Quận Ngô Hưng': 'Huyện Ô Trình', 'Quận Nam Tầm': 'Huyện Ô Trình',
  'Huyện Đức Thanh': 'Huyện Đức Thanh', 'Huyện Trường Hưng': 'Huyện Trường Hưng', 'Huyện An Cát': 'Châu An Cát',
  'Thành phố Thiệu Hưng': 'Huyện Sơn Âm', 'Quận Việt Thành': 'Huyện Sơn Âm', 'Quận Kha Kiều': 'Huyện Hội Kê',
  'Quận Thượng Ngu': 'Huyện Thượng Ngu', 'Huyện Tân Xương': 'Huyện Tân Xương', 'Thành phố Chư Kỵ': 'Huyện Chư Kỵ',
  'Thành phố Thặng Châu': 'Huyện Thặng',
  'Thành phố Kim Hoa': 'Huyện Kim Hoa', 'Quận Vụ Thành': 'Huyện Kim Hoa', 'Quận Kim Đông': 'Huyện Kim Hoa',
  'Huyện Vũ Nghĩa': 'Huyện Vũ Nghĩa', 'Huyện Phố Giang': 'Huyện Phố Giang', 'Huyện Bàn An': 'Huyện Đông Dương',
  'Thành phố Lan Khê': 'Huyện Lan Khê', 'Thành phố Nghĩa Ô': 'Huyện Nghĩa Ô', 'Thành phố Đông Dương': 'Huyện Đông Dương',
  'Thành phố Vĩnh Khang': 'Huyện Vĩnh Khang',
  'Thành phố Cù Châu': 'Huyện Tây An', 'Quận Kha Thành': 'Huyện Tây An', 'Quận Cù Giang': 'Huyện Tây An',
  'Huyện Thường Sơn': 'Huyện Thường Sơn', 'Huyện Khai Hóa': 'Huyện Khai Hóa', 'Huyện Long Du': 'Huyện Long Du',
  'Thành phố Giang Sơn': 'Huyện Giang Sơn',
  'Thành phố Chu Sơn': 'Huyện Ngân', 'Quận Định Hải': 'Huyện Ngân', 'Quận Phổ Đà': 'Huyện Ngân',
  'Huyện Đại Sơn': 'Huyện Ngân', 'Huyện Thặng Tứ': 'Huyện Ngân',
  'Thành phố Thai Châu': 'Huyện Lâm Hải', 'Quận Tiêu Giang': 'Huyện Lâm Hải', 'Quận Hoàng Nham': 'Huyện Hoàng Nham',
  'Quận Lộ Kiều': 'Huyện Hoàng Nham', 'Huyện Tam Môn': 'Huyện Ninh Hải', 'Huyện Thiên Thai': 'Huyện Thiên Thai',
  'Huyện Tiên Cư': 'Huyện Tiên Cư', 'Thành phố Ôn Lĩnh': 'Huyện Thái Bình', 'Thành phố Lâm Hải': 'Huyện Lâm Hải',
  'Thành phố Ngọc Hoàn': 'Huyện Thái Bình',
  'Thành phố Lệ Thủy': 'Huyện Lệ Thủy', 'Quận Liên Đô': 'Huyện Lệ Thủy', 'Huyện Thanh Điền': 'Huyện Thanh Điền',
  'Huyện Tấn Vân': 'Huyện Tấn Vân', 'Huyện Toại Xương': 'Huyện Toại Xương', 'Huyện Tùng Dương': 'Huyện Tùng Dương',
  'Huyện Vân Hòa': 'Huyện Vân Hòa', 'Huyện Khánh Nguyên': 'Huyện Khánh Nguyên', 'Huyện tự trị dân tộc Xa Cảnh Ninh': 'Huyện Cảnh Ninh',
  'Thành phố Long Tuyền': 'Huyện Long Tuyền',

  // ================== Tỉnh An Huy ==================
  'Thành phố Hợp Phì': 'Huyện Hợp Phì', 'Quận Dao Hải': 'Huyện Hợp Phì', 'Quận Lư Dương': 'Huyện Hợp Phì',
  'Quận Thục Sơn': 'Huyện Hợp Phì', 'Quận Bao Hà': 'Huyện Hợp Phì', 'Huyện Trường Phong': 'Huyện Hợp Phì',
  'Huyện Phì Đông': 'Huyện Hợp Phì', 'Huyện Phì Tây': 'Huyện Hợp Phì', 'Huyện Lư Giang': 'Huyện Lư Giang',
  'Thành phố Sào Hồ': 'Huyện Sào',
  'Thành phố Vu Hồ': 'Huyện Vu Hồ', 'Quận Kính Hồ': 'Huyện Vu Hồ', 'Quận Cưu Giang': 'Huyện Vu Hồ',
  'Quận Dặc Giang': 'Huyện Vu Hồ', 'Quận Loan Chỉ': 'Huyện Vu Hồ', 'Quận Phồn Xương': 'Huyện Phồn Xương',
  'Huyện Nam Lăng': 'Huyện Nam Lăng', 'Thành phố Vô Vi': 'Châu Vô Vi',
  'Thành phố Bạng Phụ': 'Huyện Phượng Dương', 'Quận Long Tử Hồ': 'Huyện Phượng Dương', 'Quận Bạng Sơn': 'Huyện Phượng Dương',
  'Quận Vũ Hội': 'Huyện Phượng Dương', 'Quận Hoài Thượng': 'Huyện Phượng Dương', 'Huyện Hoài Viễn': 'Huyện Hoài Viễn',
  'Huyện Ngũ Hà': 'Huyện Ngũ Hà', 'Huyện Cố Trấn': 'Huyện Linh Bích',
  'Thành phố Hoài Nam': 'Thọ Châu', 'Quận Đại Thông': 'Thọ Châu', 'Quận Điền Gia Am': 'Thọ Châu',
  'Quận Tạ Gia Tập': 'Thọ Châu', 'Quận Bát Công Sơn': 'Thọ Châu', 'Quận Phan Tập': 'Thọ Châu',
  'Huyện Phượng Đài': 'Thọ Châu', 'Huyện Thọ': 'Thọ Châu',
  'Thành phố Mã An Sơn': 'Huyện Đương Đồ', 'Quận Hoa Sơn': 'Huyện Đương Đồ', 'Quận Vũ Sơn': 'Huyện Đương Đồ',
  'Quận Bác Vọng': 'Huyện Đương Đồ', 'Huyện Đương Đồ': 'Huyện Đương Đồ', 'Huyện Hàm Sơn': 'Huyện Hàm Sơn',
  'Huyện Hòa': 'Hòa Châu',
  'Thành phố Hoài Bắc': 'Túc Châu', 'Quận Đỗ Tập': 'Túc Châu', 'Quận Tương Sơn': 'Túc Châu',
  'Quận Liệt Sơn': 'Túc Châu', 'Huyện Tuy Khê': 'Túc Châu',
  'Thành phố Đồng Lăng': 'Huyện Đồng Lăng', 'Quận Đồng Quan': 'Huyện Đồng Lăng', 'Quận Nghĩa An': 'Huyện Đồng Lăng',
  'Quận Ngoại ô': 'Huyện Đồng Lăng', 'Huyện Tung Dương': 'Huyện Đồng Thành',
  'Thành phố An Khánh': 'Huyện Hoài Ninh', 'Quận Nghênh Giang': 'Huyện Hoài Ninh', 'Quận Đại Quan': 'Huyện Hoài Ninh',
  'Quận Nghi Tú': 'Huyện Hoài Ninh', 'Thành phố Đồng Thành': 'Huyện Đồng Thành', 'Huyện Hoài Ninh': 'Huyện Hoài Ninh',
  'Thành phố Tiềm Sơn': 'Huyện Tiềm Sơn', 'Huyện Thái Hồ': 'Huyện Thái Hồ', 'Huyện Túc Tùng': 'Huyện Túc Tùng',
  'Huyện Vọng Giang': 'Huyện Vọng Giang', 'Huyện Nhạc Tây': 'Huyện Tiềm Sơn',
  'Thành phố Hoàng Sơn': 'Huyện Hấp', 'Quận Đồn Khê': 'Huyện Hưu Ninh', 'Quận Hoàng Sơn': 'Huyện Thái Bình',
  'Quận Huy Châu': 'Huyện Hấp', 'Huyện Hấp': 'Huyện Hấp', 'Huyện Hưu Ninh': 'Huyện Hưu Ninh',
  'Huyện Y': 'Huyện Y', 'Huyện Kỳ Môn': 'Huyện Kỳ Môn',
  'Thành phố Trừ Châu': 'Trừ Châu', 'Quận Lang Nha': 'Trừ Châu', 'Quận Nam Tiều': 'Trừ Châu',
  'Huyện Lai An': 'Huyện Lai An', 'Huyện Toàn Tiêu': 'Huyện Toàn Tiêu', 'Huyện Định Viễn': 'Huyện Định Viễn',
  'Huyện Phượng Dương': 'Huyện Phượng Dương', 'Thành phố Thiên Trường': 'Huyện Thiên Trường', 'Thành phố Minh Quang': 'Huyện Hu Dị',
  'Thành phố Phụ Dương': 'Dĩnh Châu', 'Quận Dĩnh Châu': 'Dĩnh Châu', 'Quận Dĩnh Đông': 'Dĩnh Châu',
  'Quận Dĩnh Tuyền': 'Dĩnh Châu', 'Huyện Lâm Tuyền': 'Dĩnh Châu', 'Huyện Thái Hòa': 'Huyện Thái Hòa',
  'Huyện Phụ Nam': 'Dĩnh Châu', 'Huyện Dĩnh Thượng': 'Huyện Dĩnh Thượng', 'Thành phố Giới Thủ': 'Huyện Thái Hòa',
  'Thành phố Túc Châu': 'Túc Châu', 'Quận Dũng Kiều': 'Túc Châu', 'Huyện Nãng Sơn': 'Huyện Nãng Sơn',
  'Huyện Tiêu': 'Huyện Tiêu', 'Huyện Linh Bích': 'Huyện Linh Bích', 'Huyện Tứ': 'Tứ Châu',
  'Thành phố Lục An': 'Châu Lục An', 'Quận Kim An': 'Châu Lục An', 'Quận Dụ An': 'Châu Lục An',
  'Quận Diệp Tập': 'Huyện Hoắc Khâu', 'Huyện Hoắc Khâu': 'Huyện Hoắc Khâu', 'Huyện Thư Thành': 'Huyện Thư Thành',
  'Huyện Kim Trại': 'Châu Lục An', 'Huyện Hoắc Sơn': 'Huyện Hoắc Sơn',
  'Thành phố Bạc Châu': 'Bạc Châu', 'Quận Tiều Thành': 'Bạc Châu', 'Huyện Oa Dương': 'Bạc Châu',
  'Huyện Mông Thành': 'Huyện Mông Thành', 'Huyện Lợi Tân': 'Bạc Châu',
  'Thành phố Trì Châu': 'Huyện Quý Trì', 'Quận Quý Trì': 'Huyện Quý Trì', 'Huyện Đông Chí': 'Huyện Kiến Đức',
  'Huyện Thạch Đài': 'Huyện Thạch Đãi', 'Huyện Thanh Dương': 'Huyện Thanh Dương',
  'Thành phố Tuyên Thành': 'Huyện Tuyên Thành', 'Quận Tuyên Châu': 'Huyện Tuyên Thành', 'Huyện Lang Khê': 'Huyện Kiến Bình',
  'Thành phố Quảng Đức': 'Châu Quảng Đức', 'Huyện Kính': 'Huyện Kính', 'Huyện Tích Khê': 'Huyện Tích Khê',
  'Huyện Tinh Đức': 'Huyện Tinh Đức', 'Thành phố Ninh Quốc': 'Huyện Ninh Quốc',

  // ================== Tỉnh Phúc Kiến ==================
  'Thành phố Phúc Châu': 'Huyện Mân', 'Quận Cổ Lâu': 'Huyện Mân', 'Quận Thai Giang': 'Huyện Hầu Quan',
  'Quận Thương Sơn': 'Huyện Mân', 'Quận Mã Vĩ': 'Huyện Mân', 'Quận Tấn An': 'Huyện Hầu Quan',
  'Quận Trường Lạc': 'Huyện Trường Lạc', 'Huyện Mân Hầu': 'Huyện Hầu Quan', 'Huyện Liên Giang': 'Huyện Liên Giang',
  'Huyện La Nguyên': 'Huyện La Nguyên', 'Huyện Mân Thanh': 'Huyện Mân Thanh', 'Huyện Vĩnh Thái': 'Huyện Vĩnh Phúc',
  'Huyện Bình Đàm': 'Huyện Phúc Thanh', 'Thành phố Phúc Thanh': 'Huyện Phúc Thanh',
  'Thành phố Hạ Môn': 'Huyện Đồng An', 'Quận Tư Minh': 'Huyện Đồng An', 'Quận Hải Thương': 'Huyện Đồng An',
  'Quận Hồ Lý': 'Huyện Đồng An', 'Quận Tập Mỹ': 'Huyện Đồng An', 'Quận Đồng An': 'Huyện Đồng An',
  'Quận Tường An': 'Huyện Đồng An',
  'Thành phố Bồ Điền': 'Huyện Bồ Điền', 'Quận Thành Sương': 'Huyện Bồ Điền', 'Quận Hàm Giang': 'Huyện Bồ Điền',
  'Quận Lệ Thành': 'Huyện Bồ Điền', 'Quận Tú Dữ': 'Huyện Bồ Điền', 'Huyện Tiên Du': 'Huyện Tiên Du',
  'Thành phố Tam Minh': 'Huyện Sa', 'Quận Tam Nguyên': 'Huyện Sa', 'Quận Sa Huyện': 'Huyện Sa',
  'Huyện Minh Khê': 'Huyện Quy Hóa', 'Huyện Thanh Lưu': 'Huyện Thanh Lưu', 'Huyện Ninh Hóa': 'Huyện Ninh Hóa',
  'Huyện Đại Điền': 'Huyện Đại Điền', 'Huyện Vưu Khê': 'Huyện Vưu Khê', 'Huyện Tương Nhạc': 'Huyện Tương Nhạc',
  'Huyện Thái Ninh': 'Huyện Thái Ninh', 'Huyện Kiến Ninh': 'Huyện Kiến Ninh', 'Thành phố Vĩnh An': 'Huyện Vĩnh An',
  'Thành phố Tuyền Châu': 'Huyện Tấn Giang', 'Quận Lý Thành': 'Huyện Tấn Giang', 'Quận Phong Trạch': 'Huyện Tấn Giang',
  'Quận Lạc Giang': 'Huyện Tấn Giang', 'Quận Tuyền Cảng': 'Huyện Tấn Giang', 'Huyện Huệ An': 'Huyện Huệ An',
  'Huyện An Khê': 'Huyện An Khê', 'Huyện Vĩnh Xuân': 'Huyện Vĩnh Xuân', 'Huyện Đức Hóa': 'Huyện Đức Hóa',
  'Huyện Kim Môn': 'Kim Môn Thủ ngự Thiên hộ sở', 'Thành phố Thạch Sư': 'Huyện Tấn Giang', 'Thành phố Tấn Giang': 'Huyện Tấn Giang',
  'Thành phố Nam An': 'Huyện Nam An',
  'Thành phố Chương Châu': 'Huyện Long Khê', 'Quận Hương Thành': 'Huyện Long Khê', 'Quận Long Văn': 'Huyện Long Khê',
  'Huyện Vân Tiêu': 'Huyện Chương Phố', 'Huyện Chương Phố': 'Huyện Chương Phố', 'Huyện Chiếu An': 'Huyện Chiếu An',
  'Huyện Trường Thái': 'Huyện Trường Thái', 'Huyện Đông Sơn': 'Huyện Chiếu An', 'Huyện Nam Tĩnh': 'Huyện Nam Tĩnh',
  'Huyện Bình Hòa': 'Huyện Bình Hòa', 'Huyện Hoa An': 'Huyện Long Khê', 'Quận Long Hải': 'Huyện Long Khê',
  'Thành phố Nam Bình': 'Huyện Kiến An', 'Quận Diên Bình': 'Huyện Nam Bình', 'Quận Kiến Dương': 'Huyện Kiến Dương',
  'Huyện Thuận Xương': 'Huyện Thuận Xương', 'Huyện Phố Thành': 'Huyện Phố Thành', 'Huyện Quang Trạch': 'Huyện Quang Trạch',
  'Huyện Tùng Khê': 'Huyện Tùng Khê', 'Huyện Chính Hòa': 'Huyện Chính Hòa', 'Thành phố Thiệu Vũ': 'Huyện Thiệu Vũ',
  'Thành phố Vũ Di Sơn': 'Huyện Sùng An', 'Thành phố Kiến Âu': 'Huyện Kiến An',
  'Thành phố Long Nham': 'Huyện Long Nham', 'Quận Tân La': 'Huyện Long Nham', 'Quận Vĩnh Định': 'Huyện Vĩnh Định',
  'Huyện Trường Đinh': 'Huyện Trường Đinh', 'Huyện Thượng Hàng': 'Huyện Thượng Hàng', 'Huyện Vũ Bình': 'Huyện Vũ Bình',
  'Huyện Liên Thành': 'Huyện Liên Thành', 'Thành phố Chương Bình': 'Huyện Chương Bình',
  'Thành phố Ninh Đức': 'Huyện Ninh Đức', 'Quận Tiêu Thành': 'Huyện Ninh Đức', 'Huyện Hà Phố': 'Huyện Hà Phố',
  'Huyện Cổ Điền': 'Huyện Cổ Điền', 'Huyện Bình Nam': 'Huyện Cổ Điền', 'Huyện Thọ Ninh': 'Huyện Thọ Ninh',
  'Huyện Chu Ninh': 'Huyện Ninh Đức', 'Huyện Giá Vinh': 'Huyện Phúc An', 'Thành phố Phúc An': 'Huyện Phúc An',
  'Thành phố Phúc Đỉnh': 'Châu Phúc Ninh',

  // ================== Tỉnh Giang Tây ==================
  'Thành phố Nam Xương': 'Huyện Nam Xương', 'Quận Đông Hồ': 'Huyện Nam Xương', 'Quận Tây Hồ': 'Huyện Tân Kiến',
  'Quận Thanh Vân Phổ': 'Huyện Nam Xương', 'Quận Thanh Sơn Hồ': 'Huyện Tân Kiến', 'Quận Tân Kiến': 'Huyện Tân Kiến',
  'Quận Hồng Cốc Than': 'Huyện Tân Kiến', 'Huyện Nam Xương': 'Huyện Nam Xương', 'Huyện An Nghĩa': 'Huyện An Nghĩa',
  'Huyện Tiến Hiền': 'Huyện Tiến Hiền',
  'Thành phố Cảnh Đức Trấn': 'Huyện Phù Lương', 'Quận Xương Giang': 'Huyện Phù Lương', 'Quận Châu Sơn': 'Huyện Phù Lương',
  'Huyện Phù Lương': 'Huyện Phù Lương', 'Thành phố Nhạc Bình': 'Huyện Lạc Bình',
  'Thành phố Bằng Hương': 'Huyện Bình Hương', 'Quận An Nguyên': 'Huyện Bình Hương', 'Quận Tương Đông': 'Huyện Bình Hương',
  'Huyện Liên Hoa': 'Huyện Vĩnh Tân', 'Huyện Thượng Lật': 'Huyện Bình Hương', 'Huyện Lô Khê': 'Huyện Bình Hương',
  'Thành phố Cửu Giang': 'Huyện Đức Hóa', 'Quận Liêm Khê': 'Huyện Đức Hóa', 'Quận Tầm Dương': 'Huyện Đức Hóa',
  'Quận Sài Tang': 'Huyện Đức Hóa', 'Huyện Vũ Ninh': 'Huyện Vũ Ninh', 'Huyện Tu Thủy': 'Ninh Châu',
  'Huyện Vĩnh Tu': 'Huyện Kiến Xương', 'Huyện Đức An': 'Huyện Đức An', 'Huyện Đô Xương': 'Huyện Đô Xương',
  'Huyện Hồ Khẩu': 'Huyện Hồ Khẩu', 'Huyện Bành Trạch': 'Huyện Bành Trạch', 'Thành phố Thụy Xương': 'Huyện Thụy Xương',
  'Thành phố Cộng Thanh Thành': 'Huyện Đức An', 'Thành phố Lư Sơn': 'Huyện Tinh Tử',
  'Thành phố Tân Dư': 'Huyện Tân Dụ', 'Quận Du Thủy': 'Huyện Tân Dụ', 'Huyện Phân Nghi': 'Huyện Phân Nghi',
  'Thành phố Ưng Đàm': 'Huyện Quý Khê', 'Quận Nguyệt Hồ': 'Huyện Quý Khê', 'Quận Dư Giang': 'Huyện An Nhân',
  'Thành phố Quý Khê': 'Huyện Quý Khê',
  'Thành phố Cám Châu': 'Huyện Cống', 'Quận Chương Cống': 'Huyện Cống', 'Quận Nam Khang': 'Huyện Nam Khang',
  'Quận Cám Huyện': 'Huyện Cống', 'Huyện Tín Phong': 'Huyện Tín Phong', 'Huyện Đại Dư': 'Huyện Đại Dữu',
  'Huyện Thượng Do': 'Huyện Thượng Do', 'Huyện Sùng Nghĩa': 'Huyện Sùng Nghĩa', 'Huyện An Viễn': 'Huyện An Viễn',
  'Huyện Định Nam': 'Huyện Định Nam', 'Huyện Toàn Nam': 'Huyện Long Nam', 'Huyện Ninh Đô': 'Huyện Ninh Đô',
  'Huyện Vu Đô': 'Huyện Vu Đô', 'Huyện Hưng Quốc': 'Huyện Hưng Quốc', 'Huyện Hội Xương': 'Huyện Hội Xương',
  'Huyện Tầm Ô': 'Huyện Trường Ninh', 'Huyện Thạch Thành': 'Huyện Thạch Thành', 'Thành phố Thụy Kim': 'Huyện Thụy Kim',
  'Thành phố Long Nam': 'Huyện Long Nam',
  'Thành phố Cát An': 'Huyện Lư Lăng', 'Quận Cát Châu': 'Huyện Lư Lăng', 'Quận Thanh Nguyên': 'Huyện Lư Lăng',
  'Huyện Cát An': 'Huyện Lư Lăng', 'Huyện Cát Thủy': 'Huyện Cát Thủy', 'Huyện Hiệp Giang': 'Huyện Hiệp Giang',
  'Huyện Tân Cán': 'Huyện Tân Cám', 'Huyện Vĩnh Phong': 'Huyện Vĩnh Phong', 'Huyện Thái Hòa': 'Huyện Thái Hòa',
  'Huyện Toại Xuyên': 'Huyện Long Tuyền', 'Huyện Vạn An': 'Huyện Vạn An', 'Huyện An Phúc': 'Huyện An Phúc',
  'Huyện Vĩnh Tân': 'Huyện Vĩnh Tân', 'Thành phố Tỉnh Cương Sơn': 'Huyện Vĩnh Ninh',
  'Thành phố Nghi Xuân': 'Huyện Nghi Xuân', 'Quận Viên Châu': 'Huyện Nghi Xuân', 'Huyện Phụng Tân': 'Huyện Phụng Tân',
  'Huyện Vạn Tải': 'Huyện Vạn Tải', 'Huyện Thượng Cao': 'Huyện Thượng Cao', 'Huyện Nghi Phong': 'Huyện Tân Xương',
  'Huyện Tĩnh An': 'Huyện Tĩnh An', 'Huyện Đồng Cổ': 'Ninh Châu', 'Thành phố Phong Thành': 'Huyện Phong Thành',
  'Thành phố Chương Thụ': 'Huyện Thanh Giang', 'Thành phố Cao An': 'Phủ Thụy Châu',
  'Thành phố Phủ Châu': 'Huyện Lâm Xuyên', 'Quận Lâm Xuyên': 'Huyện Lâm Xuyên', 'Quận Đông Hương': 'Huyện Đông Hương',
  'Huyện Nam Thành': 'Huyện Nam Thành', 'Huyện Lê Xuyên': 'Huyện Tân Thành', 'Huyện Nam Phong': 'Huyện Nam Phong',
  'Huyện Sùng Nhân': 'Huyện Sùng Nhân', 'Huyện Nhạc An': 'Huyện Nhạc An', 'Huyện Nghi Hoàng': 'Huyện Nghi Hoàng',
  'Huyện Kim Khê': 'Huyện Kim Khê', 'Huyện Tư Khê': 'Huyện Lô Khê', 'Huyện Quảng Xương': 'Huyện Quảng Xương',
  'Thành phố Thượng Nhiêu': 'Huyện Thượng Nhiêu', 'Quận Tín Châu': 'Huyện Thượng Nhiêu', 'Quận Quảng Phong': 'Huyện Vĩnh Phong',
  'Quận Quảng Tín': 'Huyện Thượng Nhiêu', 'Huyện Ngọc Sơn': 'Huyện Ngọc Sơn', 'Huyện Duyên Sơn': 'Huyện Duyên Sơn',
  'Huyện Hoành Phong': 'Huyện Hưng An', 'Huyện Dặc Dương': 'Huyện Dặc Dương', 'Huyện Dư Can': 'Huyện Dư Can',
  'Huyện Bà Dương': 'Huyện Bà Dương', 'Huyện Vạn Niên': 'Huyện Vạn Niên', 'Huyện Vụ Nguyên': 'Huyện Vụ Nguyên',
  'Thành phố Đức Hưng': 'Huyện Đức Hưng',

  // ================== Tỉnh Sơn Đông ==================
  'Thành phố Tế Nam': 'Huyện Lịch Thành', 'Quận Lịch Hạ': 'Huyện Lịch Thành', 'Quận Thị Trung': 'Huyện Lịch Thành',
  'Quận Hòe Ấm': 'Huyện Lịch Thành', 'Quận Thiên Kiều': 'Huyện Lịch Thành', 'Quận Lịch Thành': 'Huyện Lịch Thành',
  'Quận Trường Thanh': 'Huyện Trường Thanh', 'Quận Chương Khâu': 'Huyện Chương Khâu', 'Quận Tế Dương': 'Huyện Tế Dương',
  'Quận Lai Vu': 'Huyện Lai Vu', 'Quận Cương Thành': 'Huyện Lai Vu', 'Huyện Bình Âm': 'Huyện Bình Âm',
  'Huyện Thương Hà': 'Huyện Thương Hà',
  'Thành phố Thanh Đảo': 'Huyện Tức Mặc', 'Quận Thị Nam': 'Huyện Tức Mặc', 'Quận Thị Bắc': 'Huyện Tức Mặc',
  'Quận Hoàng Đảo': 'Giao Châu', 'Quận Lao Sơn': 'Huyện Tức Mặc', 'Quận Lý Thương': 'Huyện Tức Mặc',
  'Quận Thành Dương': 'Huyện Tức Mặc', 'Quận Tức Mặc': 'Huyện Tức Mặc', 'Thành phố Giao Châu': 'Giao Châu',
  'Thành phố Bình Độ': 'Châu Bình Độ', 'Thành phố Lai Tây': 'Huyện Lai Dương',
  'Thành phố Truy Bác': 'Huyện Truy Xuyên', 'Quận Truy Xuyên': 'Huyện Truy Xuyên', 'Quận Trương Điếm': 'Huyện Trường Sơn',
  'Quận Bác Sơn': 'Huyện Ích Đô', 'Quận Lâm Tri': 'Huyện Lâm Truy', 'Quận Chu Thôn': 'Huyện Trường Sơn',
  'Huyện Hoàn Đài': 'Huyện Tân Thành', 'Huyện Cao Thanh': 'Huyện Cao Uyển', 'Huyện Nghi Nguyên': 'Huyện Nghi Thủy',
  'Thành phố Tảo Trang': 'Huyện Dịch', 'Quận Thị Trung': 'Huyện Dịch', 'Quận Tiết Thành': 'Huyện Đằng',
  'Quận Dịch Thành': 'Huyện Dịch', 'Quận Đài Nhi Trang': 'Huyện Dịch', 'Quận Sơn Đình': 'Huyện Đằng',
  'Thành phố Đằng Châu': 'Huyện Đằng',
  'Thành phố Đông Dinh': 'Huyện Nhạc An', 'Quận Đông Dinh': 'Huyện Nhạc An', 'Quận Hà Khẩu': 'Huyện Lợi Tân',
  'Quận Khẩn Lợi': 'Huyện Lợi Tân', 'Huyện Lợi Tân': 'Huyện Lợi Tân', 'Huyện Quảng Nhiêu': 'Huyện Nhạc An',
  'Thành phố Yên Đài': 'Huyện Phúc Sơn', 'Quận Chi Phù': 'Huyện Phúc Sơn', 'Quận Phúc Sơn': 'Huyện Phúc Sơn',
  'Quận Mâu Bình': 'Châu Ninh Hải', 'Quận Lai Sơn': 'Châu Ninh Hải', 'Quận Bồng Lai': 'Huyện Bồng Lai',
  'Thành phố Long Khẩu': 'Huyện Hoàng', 'Thành phố Lai Dương': 'Huyện Lai Dương', 'Thành phố Lai Châu': 'Huyện Dịch',
  'Thành phố Chiêu Viễn': 'Huyện Chiêu Viễn', 'Thành phố Thê Hà': 'Huyện Thê Hà', 'Thành phố Hải Dương': 'Huyện Lai Dương',
  'Thành phố Duy Phường': 'Huyện Duy', 'Quận Duy Thành': 'Huyện Duy', 'Quận Hàn Đình': 'Huyện Duy',
  'Quận Phường Tử': 'Huyện Duy', 'Quận Khuê Văn': 'Huyện Duy', 'Huyện Lâm Cù': 'Huyện Lâm Cù',
  'Huyện Xương Nhạc': 'Huyện Xương Nhạc', 'Thành phố Thanh Châu': 'Huyện Ích Đô', 'Thành phố Chư Thành': 'Huyện Chư Thành',
  'Thành phố Thọ Quang': 'Huyện Thọ Quang', 'Thành phố An Khâu': 'Huyện An Khâu', 'Thành phố Cao Mật': 'Huyện Cao Mật',
  'Thành phố Xương Ấp': 'Huyện Xương Ấp',
  'Thành phố Tế Ninh': 'Châu Tế Ninh', 'Quận Nhậm Thành': 'Châu Tế Ninh', 'Quận Duyện Châu': 'Phủ Yển Châu huyện Tư Dương',
  'Huyện Vi Sơn': 'Huyện Ngư Đài', 'Huyện Ngư Đài': 'Huyện Ngư Đài', 'Huyện Kim Hương': 'Huyện Kim Hương',
  'Huyện Gia Tường': 'Huyện Gia Tường', 'Huyện Vấn Thượng': 'Huyện Vấn Thượng', 'Huyện Tứ Thủy': 'Huyện Tứ Thủy',
  'Huyện Lương Sơn': 'Châu Đông Bình', 'Thành phố Khúc Phụ': 'Huyện Khúc Phụ', 'Thành phố Trâu Thành': 'Huyện Trâu',
  'Thành phố Thái An': 'Châu Thái An', 'Quận Thái Sơn': 'Châu Thái An', 'Quận Đại Nhạc': 'Châu Thái An',
  'Huyện Ninh Dương': 'Huyện Ninh Dương', 'Huyện Đông Bình': 'Châu Đông Bình', 'Thành phố Tân Thái': 'Huyện Tân Thái',
  'Thành phố Phì Thành': 'Huyện Phì Thành',
  'Thành phố Uy Hải': 'Huyện Văn Đăng', 'Quận Hoàn Thúy': 'Huyện Văn Đăng', 'Quận Văn Đăng': 'Huyện Văn Đăng',
  'Thành phố Vinh Thành': 'Vệ Thành Sơn', 'Thành phố Nhũ Sơn': 'Châu Ninh Hải',
  'Thành phố Nhật Chiếu': 'Huyện Nhật Chiếu', 'Quận Đông Cảng': 'Huyện Nhật Chiếu', 'Quận Lam Sơn': 'Huyện Nhật Chiếu',
  'Huyện Ngũ Liên': 'Huyện Chư Thành', 'Huyện Cử': 'Cử Châu',
  'Thành phố Lâm Nghi': 'Nghi Châu', 'Quận Lan Sơn': 'Nghi Châu', 'Quận La Trang': 'Nghi Châu',
  'Quận Hà Đông': 'Nghi Châu', 'Huyện Nghi Nam': 'Huyện Nghi Thủy', 'Huyện Đàm Thành': 'Huyện Đàm Thành',
  'Huyện Nghi Thủy': 'Huyện Nghi Thủy', 'Huyện Lan Lăng': 'Nghi Châu', 'Huyện Phí': 'Huyện Phí',
  'Huyện Bình Ấp': 'Huyện Phí', 'Huyện Cử Nam': 'Cử Châu', 'Huyện Mông Âm': 'Huyện Mông Âm',
  'Huyện Lâm Thuật': 'Nghi Châu',
  'Thành phố Đức Châu': 'Đức Châu', 'Quận Đức Thành': 'Đức Châu', 'Quận Lăng Thành': 'Đức Châu',
  'Huyện Ninh Tân': 'Huyện Ninh Tân', 'Huyện Khánh Vân': 'Huyện Khánh Vân', 'Huyện Lâm Ấp': 'Huyện Lâm Ấp',
  'Huyện Tề Hà': 'Huyện Tề Hà', 'Huyện Bình Nguyên': 'Huyện Bình Nguyên', 'Huyện Hạ Tân': 'Huyện Hạ Tân',
  'Huyện Vũ Thành': 'Huyện Vũ Thành', 'Thành phố Nhạc Lăng': 'Huyện Lạc Lăng', 'Thành phố Vũ Thành': 'Huyện Vũ Thành',
  'Thành phố Liêu Thành': 'Huyện Liêu Thành', 'Quận Đông Xương Phủ': 'Huyện Liêu Thành', 'Quận Trì Bình': 'Huyện Trì Bình',
  'Huyện Dương Cốc': 'Huyện Dương Cốc', 'Huyện Sân': 'Huyện Sân', 'Huyện Đông A': 'Huyện Đông A',
  'Huyện Quan': 'Huyện Quan', 'Huyện Cao Đường': 'Châu Cao Đường', 'Thành phố Lâm Thanh': 'Châu Lâm Thanh',
  'Thành phố Tân Châu': 'Tân Châu', 'Quận Tân Thành': 'Tân Châu', 'Quận Triêm Hóa': 'Huyện Triêm Hóa',
  'Huyện Huệ Dân': 'Châu Vũ Định', 'Huyện Dương Tín': 'Huyện Dương Tín', 'Huyện Vô Lệ': 'Huyện Hải Phong',
  'Huyện Bác Hưng': 'Huyện Bác Hưng', 'Thành phố Trâu Bình': 'Huyện Trâu Bình',
  'Thành phố Hà Trạch': 'Tào Châu', 'Quận Mẫu Đơn': 'Tào Châu', 'Quận Định Đào': 'Huyện Định Đào',
  'Huyện Tào': 'Huyện Tào', 'Huyện Đan': 'Huyện Đan', 'Huyện Thành Vũ': 'Huyện Thành Vũ',
  'Huyện Cự Dã': 'Huyện Cự Dã', 'Huyện Vận Thành': 'Huyện Vận Thành', 'Huyện Quyên Thành': 'Huyện Quyên Thành',
  'Huyện Đông Minh': 'Huyện Đông Minh',

  // ================== Tỉnh Hà Nam ==================
  'Thành phố Trịnh Châu': 'Trịnh Châu', 'Quận Trung Nguyên': 'Trịnh Châu', 'Quận Nhị Thất': 'Trịnh Châu',
  'Quận Hồi tộc Quản Thành': 'Trịnh Châu', 'Quận Kim Thủy': 'Trịnh Châu', 'Quận Thượng Nhai': 'Trịnh Châu',
  'Quận Huệ Tế': 'Trịnh Châu', 'Huyện Trung Mâu': 'Huyện Trung Mâu', 'Thành phố Củng Nghĩa': 'Huyện Củng',
  'Thành phố Huỳnh Dương': 'Huyện Huỳnh Dương', 'Thành phố Tân Mật': 'Huyện Mật', 'Thành phố Tân Trịnh': 'Huyện Tân Trịnh',
  'Thành phố Đăng Phong': 'Huyện Đăng Phong',
  'Thành phố Khai Phong': 'Huyện Tường Phù', 'Quận Long Đình': 'Huyện Tường Phù', 'Quận Hồi tộc Thuận Hà': 'Huyện Tường Phù',
  'Quận Cổ Lâu': 'Huyện Tường Phù', 'Quận Vũ Vương Đài': 'Huyện Tường Phù', 'Quận Tường Phù': 'Huyện Tường Phù',
  'Huyện Khởi': 'Huyện Khởi', 'Huyện Thông Hứa': 'Huyện Thông Hứa', 'Huyện Úy Thị': 'Huyện Úy Thị',
  'Huyện Lan Khảo': 'Huyện Lan Dương',
  'Thành phố Lạc Dương': 'Huyện Lạc Dương', 'Quận Lão Thành': 'Huyện Lạc Dương', 'Quận Tây Công': 'Huyện Lạc Dương',
  'Quận Hồi tộc Triền Hà': 'Huyện Lạc Dương', 'Quận Giản Tây': 'Huyện Lạc Dương', 'Quận Yển Sư': 'Huyện Yển Sư',
  'Quận Mạnh Tân': 'Huyện Mạnh Tân', 'Quận Lạc Long': 'Huyện Lạc Dương', 'Huyện Tân An': 'Huyện Tân An',
  'Huyện Loan Xuyên': 'Huyện Lư Thị', 'Huyện Tung': 'Huyện Tung', 'Huyện Nhữ Dương': 'Huyện Y Dương',
  'Huyện Nghi Dương': 'Huyện Nghi Dương', 'Huyện Lạc Ninh': 'Huyện Vĩnh Ninh', 'Huyện Y Xuyên': 'Huyện Y Dương',
  'Thành phố Bình Đỉnh Sơn': 'Nhữ Châu', 'Quận Tân Hoa': 'Nhữ Châu', 'Quận Vệ Đông': 'Nhữ Châu',
  'Quận Thạch Long': 'Nhữ Châu', 'Quận Trạm Hà': 'Nhữ Châu', 'Huyện Bảo Phong': 'Huyện Bảo Phong',
  'Huyện Diệp': 'Huyện Diệp', 'Huyện Lỗ Sơn': 'Huyện Lỗ Sơn', 'Huyện Giáp': 'Huyện Giáp',
  'Thành phố Vũ Cương': 'Huyện Vũ Dương', 'Thành phố Nhữ Châu': 'Nhữ Châu',
  'Thành phố An Dương': 'Huyện An Dương', 'Quận Văn Phong': 'Huyện An Dương', 'Quận Bắc Quan': 'Huyện An Dương',
  'Quận Ân Đô': 'Huyện An Dương', 'Quận Long An': 'Huyện An Dương', 'Huyện An Dương': 'Huyện An Dương',
  'Huyện Thang Âm': 'Huyện Thang Âm', 'Huyện Hoạt': 'Huyện Hoạt', 'Huyện Nội Hoàng': 'Huyện Nội Hoàng',
  'Thành phố Lâm Châu': 'Huyện Lâm',
  'Thành phố Hạc Bích': 'Huyện Tuấn', 'Quận Hạc Sơn': 'Huyện Thang Âm', 'Quận Sơn Thành': 'Huyện Thang Âm',
  'Quận Kỳ Tân': 'Huyện Thang Âm', 'Huyện Tuấn': 'Huyện Tuấn', 'Huyện Kỳ': 'Huyện Kỳ',
  'Thành phố Tân Hương': 'Huyện Tân Hương', 'Quận Hồng Kỳ': 'Huyện Tân Hương', 'Quận Vệ Tân': 'Huyện Tân Hương',
  'Quận Phượng Tuyền': 'Huyện Tân Hương', 'Quận Mục Dã': 'Huyện Tân Hương', 'Huyện Tân Hương': 'Huyện Tân Hương',
  'Huyện Hoạch Gia': 'Huyện Hoạch Gia', 'Huyện Nguyên Dương': 'Huyện Nguyên Vũ', 'Huyện Diên Tân': 'Huyện Diên Tân',
  'Huyện Phong Khâu': 'Huyện Phong Khâu', 'Thành phố Vệ Huy': 'Huyện Cấp', 'Thành phố Huy Huyện': 'Huyện Huy',
  'Thành phố Trường Viên': 'Huyện Trường Viên',
  'Thành phố Tiêu Tác': 'Huyện Hà Nội', 'Quận Giải Phóng': 'Huyện Hà Nội', 'Quận Trung Trạm': 'Huyện Hà Nội',
  'Quận Mã Thôn': 'Huyện Hà Nội', 'Quận Sơn Dương': 'Huyện Hà Nội', 'Huyện Tu Vũ': 'Huyện Tu Vũ',
  'Huyện Bác Ái': 'Huyện Hà Nội', 'Huyện Vũ Trắc': 'Huyện Vũ Trắc', 'Huyện Ôn': 'Huyện Ôn',
  'Thành phố Thấm Dương': 'Huyện Hà Nội', 'Thành phố Mạnh Châu': 'Huyện Mạnh',
  'Thành phố Bộc Dương': 'Khai Châu', 'Quận Hoa Long': 'Khai Châu', 'Huyện Thanh Phong': 'Huyện Thanh Phong',
  'Huyện Nam Nhạc': 'Huyện Nam Nhạc', 'Huyện Phạm': 'Huyện Phạm', 'Huyện Đài Tiền': 'Huyện Thọ Trương',
  'Huyện Bộc Dương': 'Khai Châu',
  'Thành phố Hứa Xương': 'Hứa Châu', 'Quận Ngụy Đô': 'Hứa Châu', 'Quận Kiến An': 'Hứa Châu',
  'Huyện Yên Lăng': 'Huyện Yên Lăng', 'Huyện Tương Thành': 'Huyện Tương Thành', 'Thành phố Vũ Châu': 'Vũ Châu',
  'Thành phố Trường Cát': 'Huyện Trường Cát',
  'Thành phố Tháp Hà': 'Huyện Yển Thành', 'Quận Nguyên Hối': 'Huyện Yển Thành', 'Quận Yển Thành': 'Huyện Yển Thành',
  'Quận Triệu Lăng': 'Huyện Yển Thành', 'Huyện Vũ Dương': 'Huyện Vũ Dương', 'Huyện Lâm Dĩnh': 'Huyện Lâm Dĩnh',
  'Thành phố Tam Môn Hiệp': 'Thiểm Châu', 'Quận Hồ Tân': 'Thiểm Châu', 'Quận Thiểm Châu': 'Thiểm Châu',
  'Huyện Thằng Trì': 'Huyện Thằng Trì', 'Huyện Lư Thị': 'Huyện Lư Thị', 'Thành phố Nghĩa Mã': 'Huyện Thằng Trì',
  'Thành phố Linh Bảo': 'Huyện Linh Bảo',
  'Thành phố Nam Dương': 'Huyện Nam Dương', 'Quận Uyển Thành': 'Huyện Nam Dương', 'Quận Ngọa Long': 'Huyện Nam Dương',
  'Huyện Nam Triệu': 'Huyện Nam Triệu', 'Huyện Phương Thành': 'Dụ Châu', 'Huyện Tây Hiệp': 'Huyện Nội Hương',
  'Huyện Trấn Bình': 'Huyện Trấn Bình', 'Huyện Nội Hương': 'Huyện Nội Hương', 'Huyện Tích Xuyên': 'Huyện Tích Xuyên',
  'Huyện Xã Kỳ': 'Huyện Nam Dương', 'Huyện Đường Hà': 'Huyện Đường', 'Huyện Tân Dã': 'Huyện Tân Dã',
  'Huyện Đồng Bách': 'Huyện Đồng Bách', 'Thành phố Đặng Châu': 'Đặng Châu',
  'Thành phố Thương Khâu': 'Huyện Thương Khâu', 'Quận Lương Viên': 'Huyện Thương Khâu', 'Quận Tuy Dương': 'Huyện Thương Khâu',
  'Huyện Dân Quyền': 'Tuy Châu', 'Huyện Tuy': 'Tuy Châu', 'Huyện Ninh Lăng': 'Huyện Ninh Lăng',
  'Huyện Giá Thành': 'Huyện Giá Thành', 'Huyện Ngu Thành': 'Huyện Ngu Thành', 'Huyện Hạ Ấp': 'Huyện Hạ Ấp',
  'Thành phố Vĩnh Thành': 'Huyện Vĩnh Thành',
  'Thành phố Tín Dương': 'Châu Tín Dương', 'Quận Sư Hà': 'Châu Tín Dương', 'Quận Bình Kiều': 'Châu Tín Dương',
  'Huyện La Sơn': 'Huyện La Sơn', 'Huyện Quang Sơn': 'Huyện Quang Sơn', 'Huyện Tân': 'Huyện Quang Sơn',
  'Huyện Thương Thành': 'Huyện Thương Thành', 'Huyện Cố Thủy': 'Huyện Cố Thủy', 'Huyện Hoàng Xuyên': 'Gwangju',
  'Huyện Hoài Tân': 'Gwangju', 'Huyện Tức': 'Huyện Tức',
  'Thành phố Chu Khẩu': 'Huyện Thương Thủy', 'Quận Xuyên Hối': 'Huyện Thương Thủy', 'Quận Hoài Dương': 'Trần Châu',
  'Huyện Phù Câu': 'Huyện Phù Câu', 'Huyện Tây Hoa': 'Huyện Tây Hoa', 'Huyện Thương Thủy': 'Huyện Thương Thủy',
  'Huyện Thẩm Khâu': 'Huyện Thẩm Khâu', 'Huyện Đan Thành': 'Huyện Lộc Ấp', 'Huyện Thái Khang': 'Huyện Thái Khang',
  'Huyện Lộc Ấp': 'Huyện Lộc Ấp', 'Thành phố Hạng Thành': 'Huyện Hạng Thành',
  'Thành phố Trú Mã Điếm': 'Huyện Nhữ Dương', 'Quận Dịch Thành': 'Huyện Nhữ Dương', 'Huyện Tây Bình': 'Huyện Tây Bình',
  'Huyện Thượng Thái': 'Huyện Thượng Thái', 'Huyện Bình Dư': 'Huyện Nhữ Dương', 'Huyện Chính Dương': 'Huyện Chân Dương',
  'Huyện Xác Sơn': 'Huyện Xác Sơn', 'Huyện Bí Dương': 'Huyện Bí Dương', 'Huyện Nhữ Nam': 'Huyện Nhữ Dương',
  'Huyện Toại Bình': 'Huyện Toại Bình', 'Huyện Tân Thái': 'Huyện Tân Thái',
  'Thành phố Tế Nguyên': 'Huyện Tế Nguyên',

  // ================== Tỉnh Hồ Bắc ==================
  'Thành phố Vũ Hán': 'Huyện Giang Hạ', 'Quận Giang Ngạn': 'Huyện Hán Dương', 'Quận Giang Hán': 'Huyện Hán Dương',
  'Quận Kiều Khẩu': 'Huyện Hán Dương', 'Quận Hán Dương': 'Huyện Hán Dương', 'Quận Vũ Xương': 'Huyện Giang Hạ',
  'Quận Thanh Sơn': 'Huyện Giang Hạ', 'Quận Hồng Sơn': 'Huyện Giang Hạ', 'Quận Đông Tây Hồ': 'Huyện Hán Dương',
  'Quận Hán Nam': 'Huyện Hán Dương', 'Quận Thái Điền': 'Huyện Hán Dương', 'Quận Giang Hạ': 'Huyện Giang Hạ',
  'Quận Hoàng Bi': 'Huyện Hoàng Bì', 'Quận Tân Châu': 'Huyện Hoàng Cương',
  'Thành phố Hoàng Thạch': 'Huyện Đại Dã', 'Quận Hoàng Thạch Cảng': 'Huyện Đại Dã', 'Quận Tây Tắc Sơn': 'Huyện Đại Dã',
  'Quận Hạ Lục': 'Huyện Đại Dã', 'Quận Thiết Sơn': 'Huyện Đại Dã', 'Huyện Dương Tân': 'Châu Hưng Quốc',
  'Thành phố Đại Dã': 'Huyện Đại Dã',
  'Thành phố Thập Yển': 'Phủ Vẫn Dương', 'Quận Mao Tiễn': 'Huyện Vẫn', 'Quận Trương Loan': 'Huyện Vẫn',
  'Quận Vẫn Dương': 'Huyện Vẫn', 'Huyện Vẫn Tây': 'Huyện Vẫn Tây', 'Huyện Trúc Sơn': 'Huyện Trúc Sơn',
  'Huyện Trúc Khê': 'Huyện Trúc Khê', 'Huyện Phòng': 'Huyện Phòng', 'Thành phố Đan Giang Khẩu': 'Quân Châu',
  'Thành phố Nghi Xương': 'Châu Di Lăng', 'Quận Tây Lăng': 'Châu Di Lăng', 'Quận Ngũ Gia Cương': 'Châu Di Lăng',
  'Quận Điểm Quân': 'Châu Di Lăng', 'Quận Hao Đình': 'Châu Di Lăng', 'Quận Di Lăng': 'Châu Di Lăng',
  'Huyện Viễn An': 'Huyện Viễn An', 'Huyện Hưng Sơn': 'Huyện Hưng Sơn', 'Huyện Tỷ Quy': 'Quy Châu',
  'Huyện tự trị dân tộc Thổ Gia Trường Dương': 'Huyện Trường Dương', 'Huyện tự trị dân tộc Thổ Gia Ngũ Phong': 'Huyện Trường Dương',
  'Thành phố Nghi Đô': 'Huyện Nghi Đô', 'Thành phố Đương Dương': 'Huyện Đương Dương', 'Thành phố Chi Giang': 'Huyện Chi Giang',
  'Thành phố Tương Dương': 'Huyện Tương Dương', 'Quận Tương Thành': 'Huyện Tương Dương', 'Quận Phàn Thành': 'Huyện Tương Dương',
  'Quận Tương Châu': 'Huyện Tương Dương', 'Huyện Nam Chương': 'Huyện Nam Chương', 'Huyện Cốc Thành': 'Huyện Cốc Thành',
  'Huyện Bảo Khang': 'Huyện Bảo Khang', 'Thành phố Lão Hà Khẩu': 'Huyện Quang Hóa', 'Thành phố Tảo Dương': 'Huyện Tảo Dương',
  'Thành phố Nghi Thành': 'Huyện Nghi Thành',
  'Thành phố Ngạc Châu': 'Huyện Vũ Xương', 'Quận Lương Tử Hồ': 'Huyện Vũ Xương', 'Quận Hoa Dung': 'Huyện Vũ Xương',
  'Quận Ngạc Thành': 'Huyện Vũ Xương',
  'Thành phố Kinh Môn': 'Châu Kinh Môn', 'Quận Đông Bảo': 'Châu Kinh Môn', 'Quận Xuyết Đao': 'Châu Kinh Môn',
  'Huyện Sa Dương': 'Châu Kinh Môn', 'Thành phố Chung Tường': 'Huyện Chung Tường', 'Thành phố Kinh Sơn': 'Huyện Kinh Sơn',
  'Thành phố Hiếu Cảm': 'Huyện Hiếu Cảm', 'Quận Hiếu Nam': 'Huyện Hiếu Cảm', 'Huyện Hiếu Xương': 'Huyện Hiếu Cảm',
  'Huyện Đại Ngộ': 'Huyện Hiếu Cảm', 'Huyện Vân Mộng': 'Huyện Vân Mộng', 'Thành phố Ứng Thành': 'Huyện Ứng Thành',
  'Thành phố An Lục': 'Huyện An Lục', 'Thành phố Hán Xuyên': 'Huyện Hán Xuyên',
  'Thành phố Kinh Châu': 'Huyện Giang Lăng', 'Quận Sa Thị': 'Huyện Giang Lăng', 'Quận Kinh Châu': 'Huyện Giang Lăng',
  'Huyện Công An': 'Huyện Công An', 'Thành phố Giám Lợi': 'Huyện Giám Lợi', 'Huyện Giang Lăng': 'Huyện Giang Lăng',
  'Thành phố Thạch Thủ': 'Huyện Thạch Thủ', 'Thành phố Hồng Hồ': 'Châu Miện Dương', 'Thành phố Tùng Tư': 'Huyện Tùng Tư',
  'Thành phố Hoàng Cương': 'Huyện Hoàng Cương', 'Quận Hoàng Châu': 'Huyện Hoàng Cương', 'Huyện Đoàn Phong': 'Huyện Hoàng Cương',
  'Huyện Hồng An': 'Huyện Hoàng An', 'Huyện La Điền': 'Huyện La Điền', 'Huyện Anh Sơn': 'Huyện Anh Sơn',
  'Huyện Hy Thủy': 'Huyện Kỳ Thủy', 'Huyện Kỳ Xuân': 'Kỳ Châu', 'Huyện Hoàng Mai': 'Huyện Hoàng Mai',
  'Thành phố Ma Thành': 'Huyện Ma Thành', 'Thành phố Vũ Huyệt': 'Huyện Quảng Tế',
  'Thành phố Hàm Ninh': 'Huyện Hàm Ninh', 'Quận Hàm An': 'Huyện Hàm Ninh', 'Huyện Gia Ngư': 'Huyện Gia Ngư',
  'Huyện Thông Thành': 'Huyện Thông Thành', 'Huyện Sùng Dương': 'Huyện Sùng Dương', 'Huyện Thông Sơn': 'Huyện Thông Sơn',
  'Thành phố Xích Bích': 'Huyện Bồ Kỳ',
  'Thành phố Tùy Châu': 'Tùy Châu', 'Quận Tằng Đô': 'Tùy Châu', 'Huyện Tùy': 'Tùy Châu',
  'Thành phố Quảng Thủy': 'Huyện Ứng Sơn',
  'Châu tự trị dân tộc Thổ Gia, Miêu Ân Thi': 'Thi Châu Vệ', 'Thành phố Ân Thi': 'Thi Châu Vệ', 'Thành phố Lợi Xuyên': 'Thi Châu Vệ',
  'Huyện Kiến Thủy': 'Thi Châu Vệ', 'Huyện Ba Đông': 'Quy Châu', 'Huyện Tuyên Ân': 'Thi Châu Vệ',
  'Huyện Hàm Phong': 'Thi Châu Vệ', 'Huyện Lai Phượng': 'Thi Châu Vệ', 'Huyện Hạc Phong': 'Thi Châu Vệ',
  'Thành phố Tiên Đào': 'Châu Miện Dương', 'Thành phố Tiềm Giang': 'Huyện Tiềm Giang', 'Thành phố Thiên Môn': 'Huyện Cảnh Lăng',
  'Lâm khu Thần Nông Giá': 'Huyện Phòng',

  // ================== Tỉnh Hồ Nam ==================
  'Thành phố Trường Sa': 'Huyện Trường Sa', 'Quận Phù Dung': 'Huyện Trường Sa', 'Quận Thiên Tâm': 'Huyện Trường Sa',
  'Quận Nhạc Lộc': 'Huyện Thiện Hóa', 'Quận Khai Phúc': 'Huyện Trường Sa', 'Quận Vũ Hoa': 'Huyện Thiện Hóa',
  'Quận Vọng Thành': 'Huyện Trường Sa', 'Huyện Trường Sa': 'Huyện Trường Sa', 'Thành phố Lưu Dương': 'Huyện Lưu Dương',
  'Thành phố Ninh Hương': 'Huyện Ninh Hương',
  'Thành phố Chu Châu': 'Huyện Tương Đàm', 'Quận Hà Đường': 'Huyện Tương Đàm', 'Quận Lô Tùng': 'Huyện Tương Đàm',
  'Quận Thạch Phong': 'Huyện Tương Đàm', 'Quận Thiên Nguyên': 'Huyện Tương Đàm', 'Quận Lộc Khẩu': 'Huyện Tương Đàm',
  'Huyện Du': 'Huyện Du', 'Huyện Trà Lăng': 'Châu Trà Lăng', 'Huyện Viêm Lăng': 'Huyện Linh',
  'Thành phố Lễ Lăng': 'Huyện Lễ Lăng',
  'Thành phố Tương Đàm': 'Huyện Tương Đàm', 'Quận Vũ Hồ': 'Huyện Tương Đàm', 'Quận Nhạc Đường': 'Huyện Tương Đàm',
  'Huyện Tương Đàm': 'Huyện Tương Đàm', 'Thành phố Tương Hương': 'Huyện Tương Hương', 'Thành phố Thiều Sơn': 'Huyện Tương Đàm',
  'Thành phố Hành Dương': 'Huyện Hành Dương', 'Quận Châu Huy': 'Huyện Hành Dương', 'Quận Nhạn Phong': 'Huyện Hành Dương',
  'Quận Thạch Cổ': 'Huyện Hành Dương', 'Quận Chưng Tương': 'Huyện Hành Dương', 'Quận Nam Nhạc': 'Huyện Hành Sơn',
  'Huyện Hành Dương': 'Huyện Hành Dương', 'Huyện Hành Nam': 'Huyện Hành Dương', 'Huyện Hành Sơn': 'Huyện Hành Sơn',
  'Huyện Hành Đông': 'Huyện Hành Sơn', 'Huyện Kỳ Đông': 'Huyện Kỳ Dương', 'Thành phố Lỗi Dương': 'Huyện Lỗi Dương',
  'Thành phố Thường Ninh': 'Huyện Thường Ninh',
  'Thành phố Thiệu Dương': 'Huyện Thiệu Dương', 'Quận Song Thanh': 'Huyện Thiệu Dương', 'Quận Đại Tường': 'Huyện Thiệu Dương',
  'Quận Bắc Tháp': 'Huyện Thiệu Dương', 'Huyện Tân Thiệu': 'Huyện Thiệu Dương', 'Huyện Thiệu Dương': 'Huyện Thiệu Dương',
  'Huyện Long Hồi': 'Huyện Thiệu Dương', 'Huyện Động Khẩu': 'Châu Vũ Cương', 'Huyện Tuy Ninh': 'Huyện Tuy Ninh',
  'Huyện Tân Ninh': 'Huyện Tân Ninh', 'Huyện tự trị dân tộc Miêu Thành Bộ': 'Huyện Thành Bộ', 'Thành phố Vũ Cương': 'Châu Vũ Cương',
  'Thành phố Thiệu Đông': 'Huyện Thiệu Dương',
  'Thành phố Nhạc Dương': 'Huyện Ba Lăng', 'Quận Nhạc Dương Lâu': 'Huyện Ba Lăng', 'Quận Vân Khê': 'Huyện Ba Lăng',
  'Quận Quân Sơn': 'Huyện Ba Lăng', 'Huyện Nhạc Dương': 'Huyện Ba Lăng', 'Huyện Hoa Dung': 'Huyện Hoa Dung',
  'Huyện Tương Âm': 'Huyện Tương Âm', 'Huyện Bình Giang': 'Huyện Bình Giang', 'Thành phố Mịch La': 'Huyện Tương Âm',
  'Thành phố Lâm Tương': 'Huyện Lâm Tương',
  'Thành phố Thường Đức': 'Huyện Vũ Lăng', 'Quận Vũ Lăng': 'Huyện Vũ Lăng', 'Quận Đỉnh Thành': 'Huyện Vũ Lăng',
  'Huyện An Hương': 'Huyện An Hương', 'Huyện Hán Thọ': 'Huyện Long Dương', 'Huyện Lễ': 'Lễ Châu',
  'Huyện Lâm Lễ': 'Lễ Châu', 'Huyện Đào Nguyên': 'Huyện Đào Nguyên', 'Huyện Thạch Môn': 'Huyện Thạch Môn',
  'Thành phố Tân Thị': 'Lễ Châu',
  'Thành phố Trương Gia Giới': 'Đại Dung Vệ', 'Quận Vĩnh Định': 'Đại Dung Vệ', 'Quận Vũ Lăng Nguyên': 'Đại Dung Vệ',
  'Huyện Từ Lợi': 'Huyện Từ Lợi', 'Huyện Tang Thực': 'An phủ ty Tang Thực',
  'Thành phố Ích Dương': 'Huyện Ích Dương', 'Quận Tư Dương': 'Huyện Ích Dương', 'Quận Hách Sơn': 'Huyện Ích Dương',
  'Huyện Nam': 'Huyện Hoa Dung', 'Huyện Đào Giang': 'Huyện Ích Dương', 'Huyện An Hóa': 'Huyện An Hóa',
  'Thành phố Nguyên Giang': 'Huyện Nguyên Giang',
  'Thành phố Sâm Châu': 'Sâm Châu', 'Quận Bắc Hồ': 'Sâm Châu', 'Quận Tô Tiên': 'Sâm Châu',
  'Huyện Quế Dương': 'Châu Quế Dương', 'Huyện Nghi Chương': 'Huyện Nghi Chương', 'Huyện Vĩnh Hưng': 'Huyện Vĩnh Hưng',
  'Huyện Gia Hòa': 'Huyện Gia Hòa', 'Huyện Lâm Vũ': 'Huyện Lâm Vũ', 'Huyện Nhữ Thành': 'Huyện Quế Dương',
  'Huyện Quế Đông': 'Huyện Quế Đông', 'Huyện An Nhân': 'Huyện An Nhân', 'Thành phố Tư Hưng': 'Huyện Hưng Ninh',
  'Thành phố Vĩnh Châu': 'Huyện Linh Lăng', 'Quận Linh Lăng': 'Huyện Linh Lăng', 'Quận Lãnh Thủy Than': 'Huyện Linh Lăng',
  'Thành phố Kỳ Dương': 'Huyện Kỳ Dương', 'Huyện Đông An': 'Huyện Đông An', 'Huyện Song Bài': 'Huyện Linh Lăng',
  'Huyện Đạo': 'Đạo Châu', 'Huyện Giang Vĩnh': 'Huyện Vĩnh Minh', 'Huyện Ninh Viễn': 'Huyện Ninh Viễn',
  'Huyện Lam Sơn': 'Huyện Lam Sơn', 'Huyện Tân Điền': 'Huyện Tân Điền', 'Huyện tự trị dân tộc Dao Giang Hoa': 'Huyện Giang Hoa',
  'Thành phố Hoài Hóa': 'Nguyên Châu', 'Quận Hạc Thành': 'Nguyên Châu', 'Huyện Trung Phương': 'Nguyên Châu',
  'Huyện Nguyên Lăng': 'Huyện Nguyên Lăng', 'Huyện Thần Khê': 'Huyện Thần Khê', 'Huyện Tự Phố': 'Huyện Tự Phố',
  'Huyện Hội Đồng': 'Huyện Hội Đồng', 'Huyện tự trị dân tộc Miêu Ma Dương': 'Huyện Ma Dương', 'Huyện tự trị dân tộc Đồng Tân Hoảng': 'Hoảng Châu',
  'Huyện tự trị dân tộc Đồng Chỉ Giang': 'Nguyên Châu', 'Huyện tự trị dân tộc Miêu, Đồng Tĩnh Châu': 'Tĩnh Châu', 'Huyện tự trị dân tộc Đồng Thông Đạo': 'Tĩnh Châu',
  'Thành phố Hồng Giang': 'Huyện Kiềm Dương',
  'Thành phố Lâu Để': 'Huyện Tương Hương', 'Quận Lâu Tinh': 'Huyện Tương Hương', 'Huyện Song Phong': 'Huyện Tương Hương',
  'Huyện Tân Hóa': 'Huyện Tân Hóa', 'Thành phố Lãnh Thủy Giang': 'Huyện Tân Hóa', 'Thành phố Liên Nguyên': 'Huyện Tương Hương',
  'Châu tự trị dân tộc Thổ Gia, Miêu Tương Tây': 'Tuyên úy ty Vĩnh Thuận', 'Thành phố Cát Thủ': 'Thiên hộ sở Trấn Khê',
  'Huyện Lô Khê': 'Huyện Thần Khê', 'Huyện Phượng Hoàng': 'Trưởng quan ty Ngũ Trại', 'Huyện Hoa Viên': 'Bảo Tĩnh châu Tuyên úy ty',
  'Huyện Bảo Tĩnh': 'Bảo Tĩnh châu Tuyên úy ty', 'Huyện Cổ Trượng': 'Tuyên úy ty Vĩnh Thuận', 'Huyện Vĩnh Thuận': 'Tuyên úy ty Vĩnh Thuận',
  'Huyện Long Sơn': 'Tuyên úy ty Vĩnh Thuận',

  // ================== Tỉnh Quảng Đông ==================
  'Thành phố Quảng Châu': 'Huyện Nam Hải', 'Quận Lệ Loan': 'Huyện Nam Hải', 'Quận Việt Tú': 'Huyện Phiên Ngung',
  'Quận Hải Châu': 'Huyện Phiên Ngung', 'Quận Thiên Hà': 'Huyện Phiên Ngung', 'Quận Bạch Vân': 'Huyện Phiên Ngung',
  'Quận Hoàng Phố': 'Huyện Phiên Ngung', 'Quận Phiên Ngung': 'Huyện Phiên Ngung', 'Quận Hoa Đô': 'Huyện Phiên Ngung',
  'Quận Nam Sa': 'Huyện Đông Quản', 'Quận Tùng Hóa': 'Huyện Tùng Hóa', 'Quận Tăng Thành': 'Huyện Tăng Thành',
  'Thành phố Thiều Quan': 'Huyện Khúc Giang', 'Quận Vũ Giang': 'Huyện Khúc Giang', 'Quận Trinh Giang': 'Huyện Khúc Giang',
  'Quận Khúc Giang': 'Huyện Khúc Giang', 'Huyện Thủy Hưng': 'Huyện Thủy Hưng', 'Huyện Nhân Hóa': 'Huyện Nhân Hóa',
  'Huyện Ông Nguyên': 'Huyện Ông Nguyên', 'Huyện tự trị dân tộc Dao Nhũ Nguyên': 'Huyện Nhũ Nguyên', 'Huyện Tân Phong': 'Huyện Trường Ninh',
  'Thành phố Nhạc Xương': 'Huyện Lạc Xương', 'Thành phố Nam Hùng': 'Huyện Bảo Xương',
  'Thành phố Thâm Quyến': 'Huyện Tân An', 'Quận La Hồ': 'Huyện Tân An', 'Quận Phúc Điền': 'Huyện Tân An',
  'Quận Nam Sơn': 'Huyện Tân An', 'Quận Bảo An': 'Huyện Tân An', 'Quận Long Cương': 'Huyện Tân An',
  'Quận Diêm Điền': 'Huyện Tân An', 'Quận Long Hoa': 'Huyện Tân An', 'Quận Bình Sơn': 'Huyện Tân An',
  'Quận Quang Minh': 'Huyện Tân An',
  'Thành phố Châu Hải': 'Huyện Hương Sơn', 'Quận Hương Châu': 'Huyện Hương Sơn', 'Quận Đẩu Môn': 'Huyện Tân Hội',
  'Quận Kim Loan': 'Huyện Hương Sơn',
  'Thành phố Sán Đầu': 'Huyện Trừng Hải', 'Quận Long Hồ': 'Huyện Trừng Hải', 'Quận Kim Bình': 'Huyện Trừng Hải',
  'Quận Hào Giang': 'Huyện Triều Dương', 'Quận Triều Dương': 'Huyện Triều Dương', 'Quận Triều Nam': 'Huyện Triều Dương',
  'Quận Trừng Hải': 'Huyện Trừng Hải', 'Huyện Nam Áo': 'Huyện Nhiêu Bình',
  'Thành phố Phật Sơn': 'Huyện Nam Hải', 'Quận Thiền Thành': 'Huyện Nam Hải', 'Quận Nam Hải': 'Huyện Nam Hải',
  'Quận Thuận Đức': 'Huyện Thuận Đức', 'Quận Tam Thủy': 'Huyện Tam Thủy', 'Quận Cao Minh': 'Huyện Cao Minh',
  'Thành phố Giang Môn': 'Huyện Tân Hội', 'Quận Bồng Giang': 'Huyện Tân Hội', 'Quận Giang Hải': 'Huyện Tân Hội',
  'Quận Tân Hội': 'Huyện Tân Hội', 'Thành phố Đài Sơn': 'Huyện Tân Ninh', 'Thành phố Khai Bình': 'Huyện Ân Bình',
  'Thành phố Hạc Sơn': 'Huyện Tân Hội', 'Thành phố Ân Bình': 'Huyện Ân Bình',
  'Thành phố Trạm Giang': 'Huyện Toại Khê', 'Quận Xích Khảm': 'Huyện Toại Khê', 'Quận Hà Sơn': 'Huyện Toại Khê',
  'Quận Pha Đầu': 'Huyện Ngô Xuyên', 'Quận Ma Chương': 'Huyện Toại Khê', 'Huyện Toại Khê': 'Huyện Toại Khê',
  'Huyện Từ Văn': 'Huyện Từ Văn', 'Thành phố Liêm Giang': 'Huyện Thạch Thành', 'Thành phố Lôi Châu': 'Huyện Hải Khang',
  'Thành phố Ngô Xuyên': 'Huyện Ngô Xuyên',
  'Thành phố Mậu Danh': 'Huyện Mậu Danh', 'Quận Mậu Nam': 'Huyện Mậu Danh', 'Quận Điện Bạch': 'Huyện Điện Bạch',
  'Thành phố Cao Châu': 'Huyện Mậu Danh', 'Thành phố Hóa Châu': 'Hóa Châu', 'Thành phố Tín Nghi': 'Huyện Tín Nghi',
  'Thành phố Triệu Khánh': 'Huyện Cao Yếu', 'Quận Đoan Châu': 'Huyện Cao Yếu', 'Quận Đỉnh Hồ': 'Huyện Cao Yếu',
  'Quận Cao Yếu': 'Huyện Cao Yếu', 'Huyện Quảng Ninh': 'Huyện Quảng Ninh', 'Huyện Hoài Tập': 'Huyện Hoài Tập',
  'Huyện Phong Khai': 'Huyện Phong Xuyên', 'Huyện Đức Khánh': 'Châu Đức Khánh', 'Thành phố Tứ Hội': 'Huyện Tứ Hội',
  'Thành phố Huệ Châu': 'Huyện Quy Thiện', 'Quận Huệ Thành': 'Huyện Quy Thiện', 'Quận Huệ Dương': 'Huyện Quy Thiện',
  'Huyện Bác La': 'Huyện Bác La', 'Huyện Huệ Đông': 'Huyện Quy Thiện', 'Huyện Long Môn': 'Huyện Long Môn',
  'Thành phố Mai Châu': 'Huyện Trình Hương', 'Quận Mai Giang': 'Huyện Trình Hương', 'Quận Mai Huyện': 'Huyện Trình Hương',
  'Huyện Đại Bộ': 'Huyện Đại Bộ', 'Huyện Phong Thuận': 'Huyện Hải Dương', 'Huyện Ngũ Hoa': 'Huyện Trường Lạc',
  'Huyện Bình Viễn': 'Huyện Bình Viễn', 'Huyện Tiêu Lĩnh': 'Huyện Trấn Bình', 'Thành phố Hưng Ninh': 'Huyện Hưng Ninh',
  'Thành phố Sán Vĩ': 'Huyện Hải Phong', 'Quận Thành': 'Huyện Hải Phong', 'Huyện Hải Phong': 'Huyện Hải Phong',
  'Huyện Lục Hà': 'Huyện Hải Phong', 'Thành phố Lục Phong': 'Huyện Hải Phong',
  'Thành phố Hà Nguyên': 'Huyện Hà Nguyên', 'Quận Nguyên Thành': 'Huyện Hà Nguyên', 'Huyện Tử Kim': 'Huyện Vĩnh An',
  'Huyện Long Xuyên': 'Huyện Long Xuyên', 'Huyện Liên Bình': 'Châu Liên Bình', 'Huyện Hòa Bình': 'Huyện Hòa Bình',
  'Huyện Đông Nguyên': 'Huyện Hà Nguyên',
  'Thành phố Dương Giang': 'Huyện Dương Giang', 'Quận Giang Thành': 'Huyện Dương Giang', 'Quận Dương Đông': 'Huyện Dương Giang',
  'Huyện Dương Tây': 'Huyện Dương Giang', 'Thành phố Dương Xuân': 'Huyện Dương Xuân',
  'Thành phố Thanh Viễn': 'Huyện Thanh Viễn', 'Quận Thanh Thành': 'Huyện Thanh Viễn', 'Quận Thanh Tân': 'Huyện Thanh Viễn',
  'Huyện Phật Cương': 'Huyện Thanh Viễn', 'Huyện Dương Sơn': 'Huyện Dương Sơn', 'Huyện tự trị dân tộc Choang, Dao Liên Sơn': 'Huyện Liên Sơn',
  'Huyện tự trị dân tộc Dao Liên Nam': 'Liên Châu', 'Thành phố Anh Đức': 'Huyện Anh Đức', 'Thành phố Liên Châu': 'Liên Châu',
  'Thành phố Đông Quản': 'Huyện Đông Quản', 'Thành phố Trung Sơn': 'Huyện Hương Sơn', 'Thành phố Triều Châu': 'Huyện Hải Dương',
  'Quận Tương Kiều': 'Huyện Hải Dương', 'Quận Triều An': 'Huyện Hải Dương', 'Huyện Nhiêu Bình': 'Huyện Nhiêu Bình',
  'Thành phố Yết Dương': 'Huyện Yết Dương', 'Quận Dung Thành': 'Huyện Yết Dương', 'Quận Yết Đông': 'Huyện Yết Dương',
  'Huyện Yết Tây': 'Huyện Yết Dương', 'Huyện Huệ Lai': 'Huyện Huệ Lai', 'Thành phố Phổ Ninh': 'Huyện Phổ Ninh',
  'Thành phố Vân Phù': 'Huyện Đông An', 'Quận Vân Thành': 'Huyện Đông An', 'Quận Vân An': 'Huyện Đông An',
  'Huyện Tân Hưng': 'Huyện Tân Hưng', 'Huyện Úc Nam': 'Huyện Tây Ninh', 'Thành phố La Định': 'Châu La Định',

  // ================== Khu tự trị dân tộc Choang Quảng Tây ==================
  'Thành phố Nam Ninh': 'Huyện Tuyên Hóa', 'Quận Hưng Ninh': 'Huyện Tuyên Hóa', 'Quận Thanh Tú': 'Huyện Tuyên Hóa',
  'Quận Giang Nam': 'Huyện Tuyên Hóa', 'Quận Tây Hương Đường': 'Huyện Tuyên Hóa', 'Quận Lương Khánh': 'Huyện Tuyên Hóa',
  'Quận Ung Ninh': 'Huyện Tuyên Hóa', 'Quận Vũ Minh': 'Huyện Vũ Duyên', 'Huyện Long An': 'Huyện Long An',
  'Huyện Mã Sơn': 'Tư Ân', 'Huyện Thượng Lâm': 'Huyện Thượng Lâm', 'Huyện Tân Dương': 'Tân Châu',
  'Thành phố Hoành Châu': 'Hoành Châu',
  'Thành phố Liễu Châu': 'Huyện Mã Bình', 'Quận Thành Trung': 'Huyện Mã Bình', 'Quận Ngư Phong': 'Huyện Mã Bình',
  'Quận Liễu Nam': 'Huyện Mã Bình', 'Quận Liễu Bắc': 'Huyện Mã Bình', 'Quận Liễu Giang': 'Huyện Mã Bình',
  'Huyện Liễu Thành': 'Huyện Liễu Thành', 'Huyện Lộc Trại': 'Huyện Lạc Dung', 'Huyện Dung An': 'Huyện Dung',
  'Huyện tự trị dân tộc Miêu Dung Thủy': 'Huyện Dung', 'Huyện tự trị dân tộc Đồng Tam Giang': 'Huyện Hoài Viễn',
  'Thành phố Quế Lâm': 'Huyện Lâm Quế', 'Quận Tú Phong': 'Huyện Lâm Quế', 'Quận Điệp Thải': 'Huyện Lâm Quế',
  'Quận Tượng Sơn': 'Huyện Lâm Quế', 'Quận Thất Tinh': 'Huyện Lâm Quế', 'Quận Nhạn Sơn': 'Huyện Lâm Quế',
  'Quận Lâm Quế': 'Huyện Lâm Quế', 'Huyện Dương Sóc': 'Huyện Dương Sóc', 'Huyện Linh Xuyên': 'Huyện Linh Xuyên',
  'Huyện Toàn Châu': 'Toàn Châu', 'Huyện Hưng An': 'Huyện Hưng An', 'Huyện Vĩnh Phúc': 'Huyện Vĩnh Phúc',
  'Huyện Quán Dương': 'Huyện Quán Dương', 'Huyện tự trị các dân tộc Long Thắng': 'Huyện Nghĩa Ninh', 'Huyện Tư Nguyên': 'Toàn Châu',
  'Huyện Bình Nhạc': 'Huyện Bình Nhạc', 'Thành phố Lệ Phố': 'Huyện Lệ Phố', 'Huyện tự trị dân tộc Dao Cung Thành': 'Huyện Cung Thành',
  'Thành phố Ngô Châu': 'Huyện Thương Ngô', 'Quận Vạn Tú': 'Huyện Thương Ngô', 'Quận Trường Châu': 'Huyện Thương Ngô',
  'Quận Long Vu': 'Huyện Thương Ngô', 'Huyện Thương Ngô': 'Huyện Thương Ngô', 'Huyện Đằng': 'Huyện Đằng',
  'Huyện Mông Sơn': 'Châu Vĩnh An', 'Thành phố Sầm Khê': 'Huyện Sầm Khê',
  'Thành phố Bắc Hải': 'Huyện Hợp Phố', 'Quận Hải Thành': 'Huyện Hợp Phố', 'Quận Ngân Hải': 'Huyện Hợp Phố',
  'Quận Thiết Sơn Cảng': 'Huyện Hợp Phố', 'Huyện Hợp Phố': 'Huyện Hợp Phố',
  'Thành phố Phòng Thành Cảng': 'Khâm Châu', 'Quận Cảng Khẩu': 'Khâm Châu', 'Quận Phòng Thành': 'Khâm Châu',
  'Huyện Thượng Tư': 'Châu Thượng Tư', 'Thành phố Đông Hưng': 'Khâm Châu',
  'Thành phố Khâm Châu': 'Khâm Châu', 'Quận Khâm Nam': 'Khâm Châu', 'Quận Khâm Bắc': 'Khâm Châu',
  'Huyện Linh Sơn': 'Huyện Linh Sơn', 'Huyện Phố Bắc': 'Huyện Hợp Phố',
  'Thành phố Quý Cảng': 'Huyện Quý', 'Quận Cảng Bắc': 'Huyện Quý', 'Quận Cảng Nam': 'Huyện Quý',
  'Quận Đàm Đường': 'Huyện Quý', 'Huyện Bình Nam': 'Huyện Bình Nam', 'Thành phố Quế Bình': 'Huyện Quế Bình',
  'Thành phố Ngọc Lâm': 'Châu Uất Lâm', 'Quận Ngọc Châu': 'Châu Uất Lâm', 'Quận Phúc Miên': 'Châu Uất Lâm',
  'Huyện Dung': 'Huyện Dung', 'Huyện Lục Xuyên': 'Huyện Lục Xuyên', 'Huyện Bác Bạch': 'Huyện Bác Bạch',
  'Huyện Hưng Nghiệp': 'Huyện Hưng Nghiệp', 'Thành phố Bắc Lưu': 'Huyện Bắc Lưu',
  'Thành phố Bách Sắc': 'Điền Châu', 'Quận Hữu Giang': 'Điền Châu', 'Quận Điền Dương': 'Điền Châu',
  'Huyện Điền Đông': 'Điền Châu', 'Huyện Đức Bảo': 'Trấn An', 'Huyện Na Pha': 'Tiểu Trấn An',
  'Huyện Lăng Vân': 'Tứ Thành', 'Huyện Nhạc Nghiệp': 'Tứ Thành', 'Huyện Điền Lâm': 'Tứ Thành',
  'Huyện Tây Lâm': 'Trưởng quan ty Thượng Lâm', 'Huyện tự trị các dân tộc Long Lâm': 'Trưởng quan ty An Long',
  'Thành phố Tĩnh Tây': 'Châu Quy Thuận', 'Thành phố Bình Quả': 'Tư Ân',
  'Thành phố Hạ Châu': 'Huyện Hạ', 'Quận Bát Bộ': 'Huyện Hạ', 'Quận Bình Quế': 'Huyện Hạ',
  'Huyện Chiêu Bình': 'Huyện Chiêu Bình', 'Huyện Chung Sơn': 'Huyện Phú Xuyên', 'Huyện tự trị dân tộc Dao Phú Xuyên': 'Huyện Phú Xuyên',
  'Thành phố Hà Trì': 'Châu Hà Trì', 'Quận Kim Thành Giang': 'Châu Hà Trì', 'Quận Nghi Châu': 'Huyện Nghi Sơn',
  'Huyện Nam Đan': 'Châu Nam Đan', 'Huyện Thiên Nga': 'Châu Na Địa', 'Huyện Phượng Sơn': 'Châu Đông Lan',
  'Huyện Đông Lan': 'Châu Đông Lan', 'Huyện tự trị dân tộc Mục Lão La Thành': 'Huyện Thiên Hà', 'Huyện tự trị dân tộc Mao Nam Hoàn Giang': 'Huyện Tư Ân',
  'Huyện tự trị dân tộc Dao Ba Mã': 'Châu Đông Lan', 'Huyện tự trị dân tộc Dao Đô An': 'Phủ Tư Ân',
  'Huyện tự trị dân tộc Dao Đại Hóa': 'Phủ Tư Ân',
  'Thành phố Lai Tân': 'Huyện Lai Tân', 'Quận Hưng Tân': 'Huyện Lai Tân', 'Huyện Hân Thành': 'Huyện Hân Thành',
  'Huyện Tượng Châu': 'Tượng Châu', 'Huyện Vũ Tuyên': 'Huyện Vũ Tuyên', 'Huyện tự trị dân tộc Dao Kim Tú': 'Tượng Châu',
  'Thành phố Hợp Sơn': 'Huyện Thiên Giang',
  'Thành phố Sùng Tả': 'Huyện Sùng Thiện', 'Quận Giang Châu': 'Huyện Sùng Thiện', 'Huyện Phù Tuy': 'Châu Tân Ninh',
  'Huyện Ninh Minh': 'Tư Minh', 'Huyện Long Châu': 'Long Châu', 'Huyện Đại Tân': 'Châu Dưỡng Lợi',
  'Huyện Thiên Đẳng': 'Châu Hướng Vũ', 'Thành phố Bằng Tường': 'Châu Bằng Tường',

  // ================== Tỉnh Hải Nam ==================
  'Thành phố Hải Khẩu': 'Huyện Quỳnh Sơn', 'Quận Tú Anh': 'Huyện Quỳnh Sơn', 'Quận Long Hoa': 'Huyện Quỳnh Sơn',
  'Quận Quỳnh Sơn': 'Huyện Quỳnh Sơn', 'Quận Mỹ Lan': 'Huyện Quỳnh Sơn', 'Thành phố Tam Á': 'Nhai Châu',
  'Quận Hải Đường': 'Nhai Châu', 'Quận Cát Dương': 'Nhai Châu', 'Quận Thiên Nhai': 'Nhai Châu', 'Quận Nhai Châu': 'Nhai Châu',
  'Thành phố Tam Sa': 'Vạn Châu', 'Thành phố Đam Châu': 'Đam Châu', 'Thành phố Ngũ Chỉ Sơn': 'Nhai Châu',
  'Thành phố Quỳnh Hải': 'Huyện Hội Đồng', 'Thành phố Văn Xương': 'Huyện Văn Xương', 'Thành phố Vạn Ninh': 'Vạn Châu',
  'Thành phố Đông Phương': 'Huyện Cảm Ân', 'Huyện Định An': 'Huyện Định An', 'Huyện Đồn Xương': 'Huyện Định An',
  'Huyện Trừng Mại': 'Huyện Trừng Mại', 'Huyện Lâm Cao': 'Huyện Lâm Cao', 'Huyện tự trị dân tộc Lê Bạch Sa': 'Đam Châu',
  'Huyện tự trị dân tộc Lê Xương Giang': 'Huyện Xương Hóa', 'Huyện tự trị dân tộc Lê Nhạc Đông': 'Nhai Châu',
  'Huyện tự trị dân tộc Lê Lăng Thủy': 'Huyện Lăng Thủy', 'Huyện tự trị dân tộc Lê, Miêu Bảo Đình': 'Huyện Lăng Thủy',
  'Huyện tự trị dân tộc Lê, Miêu Quỳnh Trung': 'Huyện Định An',

  // ================== Thành phố Trùng Khánh ==================
  'Quận Du Trung': 'Huyện Ba', 'Quận Vạn Châu': 'Huyện Vạn', 'Quận Phù Lăng': 'Phù Châu',
  'Quận Đại Độ Khẩu': 'Huyện Ba', 'Quận Giang Bắc': 'Huyện Ba', 'Quận Sa Bình Bá': 'Huyện Ba',
  'Quận Cửu Long Pha': 'Huyện Ba', 'Quận Nam Ngạn': 'Huyện Ba', 'Quận Bắc Bội': 'Huyện Ba',
  'Quận Kỳ Giang': 'Huyện Kỳ Giang', 'Quận Đại Túc': 'Huyện Đại Túc', 'Quận Du Bắc': 'Huyện Ba',
  'Quận Ba Nam': 'Huyện Ba', 'Quận Kiềm Giang': 'Huyện Kiềm Giang', 'Quận Trường Thọ': 'Huyện Trường Thọ',
  'Quận Giang Tân': 'Huyện Giang Tân', 'Quận Hợp Xuyên': 'Hợp Châu', 'Quận Vĩnh Xuyên': 'Huyện Vĩnh Xuyên',
  'Quận Nam Xuyên': 'Huyện Nam Xuyên', 'Quận Bích Sơn': 'Huyện Bích Sơn', 'Quận Đồng Lương': 'Huyện Đồng Lương',
  'Quận Đồng Nam': 'Huyện Toại Ninh', 'Quận Vinh Xương': 'Huyện Vinh Xương', 'Quận Khai Châu': 'Huyện Khai',
  'Quận Lương Bình': 'Huyện Lương Sơn', 'Quận Vũ Long': 'Phù Châu', 'Huyện Thành Khẩu': 'Huyện Thái Bình, Đạt Châu',
  'Huyện Phong Đô': 'Huyện Phong Đô', 'Huyện Điếm Giang': 'Huyện Điếm Giang', 'Huyện Trung': 'Trung Châu',
  'Huyện Vân Dương': 'Huyện Vân Dương', 'Huyện Phụng Tiết': 'Huyện Phụng Tiết', 'Huyện Vu Sơn': 'Huyện Vu Sơn',
  'Huyện Vu Khê': 'Huyện Đại Ninh', 'Huyện tự trị dân tộc Thổ Gia Thạch Trụ': 'Tuyên phủ ty Thạch Trụ',
  'Huyện tự trị dân tộc Thổ Gia, Miêu Tú Sơn': 'Tuyên úy ty Dậu Dương', 'Huyện tự trị dân tộc Thổ Gia, Miêu Dậu Dương': 'Tuyên úy ty Dậu Dương',
  'Huyện tự trị dân tộc Miêu, Thổ Gia Bành Thủy': 'Huyện Bành Thủy',

  // ================== Tỉnh Tứ Xuyên ==================
  'Thành phố Thành Đô': 'Huyện Thành Đô', 'Quận Cẩm Giang': 'Huyện Thành Đô', 'Quận Thanh Dương': 'Huyện Thành Đô',
  'Quận Kim Ngưu': 'Huyện Thành Đô', 'Quận Vũ Hầu': 'Huyện Thành Đô', 'Quận Thành Hoa': 'Huyện Thành Đô',
  'Quận Long Tuyền Dịch': 'Giản Châu', 'Quận Thanh Bạch Giang': 'Huyện Tân Đô', 'Quận Tân Đô': 'Huyện Tân Đô',
  'Quận Ôn Giang': 'Huyện Ôn Giang', 'Quận Song Lưu': 'Huyện Song Lưu', 'Quận Tỳ Đô': 'Huyện Bì',
  'Quận Tân Tân': 'Huyện Tân Tân', 'Huyện Kim Đường': 'Huyện Kim Đường', 'Huyện Đại Ấp': 'Huyện Đại Ấp',
  'Huyện Bồ Giang': 'Huyện Bồ Giang', 'Thành phố Đô Giang Yển': 'Huyện Quán', 'Thành phố Bành Châu': 'Huyện Bành',
  'Thành phố Cùng Lai': 'Cùng Châu', 'Thành phố Sùng Châu': 'Châu Sùng Khánh', 'Thành phố Giản Dương': 'Giản Châu',
  'Thành phố Tự Cống': 'Huyện Phú Thuận', 'Quận Tự Lưu Tỉnh': 'Huyện Phú Thuận', 'Quận Cống Tỉnh': 'Huyện Vinh',
  'Quận Đại An': 'Huyện Phú Thuận', 'Quận Duyên Than': 'Huyện Phú Thuận', 'Huyện Vinh': 'Huyện Vinh',
  'Huyện Phú Thuận': 'Huyện Phú Thuận',
  'Thành phố Phàn Chi Hoa': 'Hội Xuyên Vệ', 'Quận Đông': 'Hội Xuyên Vệ', 'Quận Tây': 'Hội Xuyên Vệ',
  'Quận Nhân Hòa': 'Huyện Đại Diêu', 'Huyện Mễ Dịch': 'Hội Xuyên Vệ', 'Huyện Diêm Biên': 'Huyện Diêm Nguyên',
  'Thành phố Lư Châu': 'Lô Châu', 'Quận Giang Dương': 'Lô Châu', 'Quận Nạp Khê': 'Huyện Nạp Khê',
  'Quận Long Mã Đàm': 'Lô Châu', 'Huyện Lư': 'Lô Châu', 'Huyện Hợp Giang': 'Huyện Hợp Giang',
  'Huyện Tự Vĩnh': 'Tuyên phủ ty Vĩnh Ninh', 'Huyện Cổ Lận': 'Tuyên phủ ty Vĩnh Ninh',
  'Thành phố Đức Dương': 'Huyện Đức Dương', 'Quận Tinh Dương': 'Huyện Đức Dương', 'Quận La Giang': 'Huyện La Giang',
  'Huyện Trung Giang': 'Huyện Trung Giang', 'Thành phố Quảng Hán': 'Hán Châu', 'Thành phố Thập Phương': 'Huyện Thập Phương',
  'Thành phố Miên Trúc': 'Huyện Miên Trúc',
  'Thành phố Miên Dương': 'Miên Châu', 'Quận Phù Thành': 'Miên Châu', 'Quận Du Tiên': 'Miên Châu',
  'Quận An Châu': 'Huyện An', 'Huyện Tam Đài': 'Châu Đồng Xuyên', 'Huyện Diêm Đình': 'Huyện Diêm Đình',
  'Huyện Tử Đồng': 'Huyện Tử Đồng', 'Huyện tự trị dân tộc Khương Bắc Xuyên': 'Huyện Thạch Tuyền', 'Huyện Bình Vũ': 'Huyện Bình Vũ',
  'Thành phố Giang Du': 'Huyện Giang Du',
  'Thành phố Quảng Nguyên': 'Huyện Quảng Nguyên', 'Quận Lợi Châu': 'Huyện Quảng Nguyên', 'Quận Chiêu Hóa': 'Huyện Chiêu Hóa',
  'Quận Triều Thiên': 'Huyện Quảng Nguyên', 'Huyện Vượng Thương': 'Huyện Quảng Nguyên', 'Huyện Thanh Xuyên': 'Thanh Xuyên Thủ ngự Thiên hộ sở',
  'Huyện Kiếm Các': 'Kiếm Châu', 'Huyện Thương Khê': 'Huyện Thương Khê',
  'Thành phố Toại Ninh': 'Huyện Toại Ninh', 'Quận Thuyền Sơn': 'Huyện Toại Ninh', 'Quận An Cư': 'Huyện Toại Ninh',
  'Huyện Bồng Khê': 'Huyện Bồng Khê', 'Thành phố Xạ Hồng': 'Huyện Xạ Hồng', 'Huyện Đại Anh': 'Huyện Toại Ninh',
  'Thành phố Nội Giang': 'Huyện Nội Giang', 'Quận Thị Trung': 'Huyện Nội Giang', 'Quận Đông Hưng': 'Huyện Nội Giang',
  'Huyện Uy Viễn': 'Huyện Uy Viễn', 'Huyện Tư Trung': 'Huyện Tư', 'Thành phố Long Xương': 'Huyện Long Xương',
  'Thành phố Lạc Sơn': 'Huyện Lạc Sơn', 'Quận Thị Trung': 'Huyện Lạc Sơn', 'Quận Sa Loan': 'Huyện Lạc Sơn',
  'Quận Ngũ Thông Kiều': 'Huyện Kiền Vi', 'Quận Kim Khẩu Hà': 'Huyện Nga Biên', 'Huyện Kiền Vi': 'Huyện Kiền Vi',
  'Huyện Tỉnh Nghiên': 'Huyện Tỉnh Nghiên', 'Huyện Giáp Giang': 'Huyện Giáp Giang', 'Huyện Mộc Xuyên': 'Trưởng quan ty Mộc Xuyên',
  'Huyện tự trị dân tộc Di Nga Biên': 'Huyện Nga Biên', 'Huyện tự trị dân tộc Di Mã Biên': 'Huyện Mã Biên',
  'Thành phố Nga Mi Sơn': 'Huyện Nga Mi',
  'Thành phố Nam Sung': 'Huyện Nam Sung', 'Quận Thuận Khánh': 'Huyện Nam Sung', 'Quận Cao Bình': 'Huyện Nam Sung',
  'Quận Gia Lăng': 'Huyện Nam Sung', 'Huyện Nam Bộ': 'Huyện Nam Bộ', 'Huyện Doanh Sơn': 'Huyện Doanh Sơn',
  'Huyện Bồng An': 'Bồng Châu', 'Huyện Nghi Lũng': 'Huyện Nghi Lũng', 'Huyện Tây Sung': 'Huyện Tây Sung',
  'Thành phố Lãng Trung': 'Huyện Lãng Trung',
  'Thành phố Mi Sơn': 'Mi Châu', 'Quận Đông Pha': 'Mi Châu', 'Quận Bành Sơn': 'Huyện Bành Sơn',
  'Huyện Nhân Thọ': 'Huyện Nhân Thọ', 'Huyện Hồng Nhã': 'Huyện Hồng Nhã', 'Huyện Đan Lăng': 'Huyện Đan Lăng',
  'Huyện Thanh Thần': 'Huyện Thanh Thần',
  'Thành phố Nghi Tân': 'Huyện Nghi Tân', 'Quận Thúy Bình': 'Huyện Nghi Tân', 'Quận Nam Khê': 'Huyện Nam Khê',
  'Quận Tự Châu': 'Huyện Nghi Tân', 'Huyện Giang An': 'Huyện Giang An', 'Huyện Trường Ninh': 'Huyện Trường Ninh',
  'Huyện Cao': 'Huyện Cao', 'Huyện Củng': 'Huyện Củng', 'Huyện Quân Liên': 'Huyện Quân Liên',
  'Huyện Hưng Văn': 'Huyện Hưng Văn', 'Huyện Bình Sơn': 'Phủ Mã Hồ',
  'Thành phố Quảng An': 'Châu Quảng An', 'Quận Quảng An': 'Châu Quảng An', 'Quận Tiền Phong': 'Châu Quảng An',
  'Huyện Nhạc Trì': 'Huyện Nhạc Trì', 'Huyện Vũ Thắng': 'Huyện Định Viễn', 'Huyện Lân Thủy': 'Huyện Lân Thủy',
  'Thành phố Hoa Oánh': 'Châu Quảng An',
  'Thành phố Đạt Châu': 'Đạt Châu', 'Quận Thông Xuyên': 'Đạt Châu', 'Quận Đạt Xuyên': 'Đạt Châu',
  'Huyện Tuyên Hán': 'Huyện Đông Hương', 'Huyện Khai Giang': 'Huyện Tân Ninh', 'Huyện Đại Trúc': 'Huyện Đại Trúc',
  'Huyện Cừ': 'Huyện Cừ', 'Thành phố Vạn Nguyên': 'Huyện Thái Bình',
  'Thành phố Nhã An': 'Nhã Châu', 'Quận Vũ Thành': 'Nhã Châu', 'Quận Danh Sơn': 'Huyện Danh Sơn',
  'Huyện Huỳnh Kinh': 'Huyện Huỳnh Kinh', 'Huyện Hán Nguyên': 'Lê Châu Thủ ngự Thiên hộ sở', 'Huyện Thạch Miên': 'Lê Châu',
  'Huyện Thiên Toàn': 'Thiên Toàn Lục Phiên Chiêu thảo ty', 'Huyện Lô Sơn': 'Huyện Lô Sơn', 'Huyện Bảo Hưng': 'Thiên Toàn',
  'Thành phố Ba Trung': 'Ba Châu', 'Quận Ba Châu': 'Ba Châu', 'Quận Ân Dương': 'Ba Châu',
  'Huyện Thông Giang': 'Huyện Thông Giang', 'Huyện Nam Giang': 'Huyện Nam Giang', 'Huyện Bình Xương': 'Ba Châu',
  'Thành phố Tư Dương': 'Huyện Tư Dương', 'Quận Nhạn Giang': 'Huyện Tư Dương', 'Huyện An Nhạc': 'Huyện An Nhạc',
  'Huyện Nhạc Chí': 'Huyện Nhạc Chí',
  'Châu tự trị dân tộc Tạng, Khương A Bá': 'Vệ Tùng Phan', 'Thành phố Mã Nhĩ Khang': 'Vệ Tùng Phan', 'Huyện Mân Xuyên': 'Uy Châu',
  'Huyện Lý': 'Bảo Huyện', 'Huyện Mậu': 'Mậu Châu', 'Huyện Tùng Phan': 'Vệ Tùng Phan',
  'Huyện Cửu Trại Câu': 'Vệ Tùng Phan', 'Huyện Kim Xuyên': 'Kim Xuyên Tự', 'Huyện Tiểu Kim': 'Kim Xuyên Tự',
  'Huyện Hắc Thủy': 'Vệ Tùng Phan', 'Huyện Nhưỡng Đường': 'Vệ Tùng Phan', 'Huyện A Bá': 'Vệ Tùng Phan',
  'Huyện Nhược Nhĩ Cái': 'Vệ Tùng Phan', 'Huyện Hồng Nguyên': 'Vệ Tùng Phan',
  'Châu tự trị dân tộc Tạng Cam Tư': 'Mdo Kham(Tứ Xuyên)', 'Thành phố Khang Định': 'Mdo Kham(Tứ Xuyên)', 'Huyện Lô Định': 'Mdo Kham(Tứ Xuyên)',
  'Huyện Đan Ba': 'Mdo Kham(Tứ Xuyên)', 'Huyện Cửu Long': 'Mdo Kham(Tứ Xuyên)', 'Huyện Nhã Giang': 'Mdo Kham(Tứ Xuyên)',
  'Huyện Đạo Phu': 'Mdo Kham(Tứ Xuyên)', 'Huyện Lư Hoắc': 'Mdo Kham(Tứ Xuyên)', 'Huyện Cam Tư': 'Mdo Kham(Tứ Xuyên)',
  'Huyện Tân Long': 'Mdo Kham(Tứ Xuyên)', 'Huyện Đức Cách': 'Mdo Kham(Tứ Xuyên)', 'Huyện Bạch Ngọc': 'Mdo Kham(Tứ Xuyên)',
  'Huyện Thạch Cừ': 'Mdo Kham(Tứ Xuyên)', 'Huyện Sắc Đạt': 'Mdo Kham(Tứ Xuyên)', 'Huyện Lý Đường': 'Mdo Kham(Tứ Xuyên)',
  'Huyện Ba Đường': 'Mdo Kham(Tứ Xuyên)', 'Huyện Hương Thành': 'Mdo Kham(Tứ Xuyên)', 'Huyện Đạo Thành': 'Mdo Kham(Tứ Xuyên)',
  'Huyện Đắc Vinh': 'Mdo Kham(Tứ Xuyên)',
  'Châu tự trị dân tộc Di Lương Sơn': 'Vệ Kiến Xương', 'Thành phố Tây Xương': 'Vệ Kiến Xương', 'Thành phố Hội Lý': 'Vệ Hội Xuyên',
  'Huyện tự trị dân tộc Tạng Mộc Lý': 'Vệ Diêm Tỉnh', 'Huyện Diêm Nguyên': 'Vệ Diêm Tỉnh', 'Huyện Đức Xương': 'Vệ Kiến Xương',
  'Huyện Hội Đông': 'Vệ Hội Xuyên', 'Huyện Ninh Nam': 'Vệ Hội Xuyên', 'Huyện Phổ Cách': 'Vệ Kiến Xương',
  'Huyện Bố Tha': 'Vệ Kiến Xương', 'Huyện Kim Dương': 'Phủ Ô Mông', 'Huyện Chiêu Giác': 'Vệ Kiến Xương',
  'Huyện Hỷ Đức': 'Vệ Kiến Xương', 'Huyện Miện Ninh': 'Vệ Ninh Phiên', 'Huyện Việt Tây': 'Vệ Việt Huề',
  'Huyện Cam Lạc': 'Vệ Việt Huề', 'Huyện Mỹ Cô': 'Vệ Kiến Xương', 'Huyện Lôi Ba': 'Phủ Mã Hồ',

  // ================== Tỉnh Quý Châu ==================
  'Thành phố Quý Dương': 'Huyện Tân Quý', 'Quận Nam Minh': 'Huyện Tân Quý', 'Quận Vân Nham': 'Huyện Tân Quý',
  'Quận Hoa Khê': 'Huyện Tân Quý', 'Quận Ô Đương': 'Huyện Tân Quý', 'Quận Bạch Vân': 'Huyện Tân Quý',
  'Quận Quan Sơn Hồ': 'Huyện Tân Quý', 'Huyện Khai Dương': 'Khai Châu', 'Huyện Tức Phong': 'Vệ Phu Dũng',
  'Huyện Tu Văn': 'Vệ Phu Dũng', 'Thành phố Thanh Trấn': 'Vệ Trấn Tây',
  'Thành phố Lục Bàn Thủy': 'Thủy Tây', 'Quận Chung Sơn': 'Thủy Tây', 'Đặc khu Lục Chi': 'Vệ Phổ Định',
  'Quận Thủy Thành': 'Thủy Tây', 'Thành phố Bàn Châu': 'Châu Phổ An',
  'Thành phố Tuân Nghĩa': 'Huyện Tuân Nghĩa', 'Quận Hồng Hoa Cương': 'Huyện Tuân Nghĩa', 'Quận Hối Xuyên': 'Huyện Tuân Nghĩa',
  'Quận Bá Châu': 'Huyện Tuân Nghĩa', 'Huyện Đồng Tử': 'Huyện Đồng Tử', 'Huyện Tuy Dương': 'Huyện Tuy Dương',
  'Huyện Chính An': 'Châu Chân An', 'Huyện tự trị dân tộc Ngật Lão, Miêu Đạo Chân': 'Châu Chân An',
  'Huyện tự trị dân tộc Cờ Lao, Miêu Vụ Xuyên': 'Huyện Vụ Xuyên', 'Huyện Phượng Cương': 'Huyện Long Tuyền',
  'Huyện Mi Đàm': 'Huyện Mi Đàm', 'Huyện Dư Khánh': 'Huyện Dư Khánh', 'Huyện Tập Thủy': 'Huyện Nhân Hoài',
  'Thành phố Xích Thủy': 'Huyện Nhân Hoài', 'Thành phố Nhân Hoài': 'Huyện Nhân Hoài',
  'Thành phố An Thuận': 'Vệ Phổ Định', 'Quận Tây Tú': 'Vệ Phổ Định', 'Quận Bình Bá': 'Vệ Bình Bá',
  'Huyện Phổ Định': 'Vệ Phổ Định', 'Huyện tự trị dân tộc Bố Y, Miêu Trấn Ninh': 'Châu Trấn Ninh',
  'Huyện tự trị dân tộc Bố Y, Miêu Quan Lĩnh': 'Châu Vĩnh Ninh', 'Huyện tự trị dân tộc Miêu, Bố Y Tử Vân': 'Trưởng quan ty Khang Tá',
  'Thành phố Tất Tiết': 'Vệ Tất Tiết', 'Quận Thất Tinh Quan': 'Vệ Tất Tiết', 'Huyện Đại Phương': 'Thủy Tây',
  'Huyện Kim Sa': 'Huyện Tuân Nghĩa', 'Huyện Chức Kim': 'Thủy Tây', 'Huyện Nạp Ung': 'Thủy Tây',
  'Huyện tự trị dân tộc Di, Hồi, Miêu Uy Ninh': 'Vệ Ô Tát', 'Huyện Hách Chương': 'Vệ Ô Tát',
  'Thành phố Đồng Nhân': 'Huyện Đồng Nhân', 'Quận Bích Giang': 'Huyện Đồng Nhân', 'Quận Vạn Sơn': 'Huyện Đồng Nhân',
  'Huyện Giang Khẩu': 'Huyện Đồng Nhân', 'Huyện tự trị dân tộc Đồng Ngọc Bình': 'Vệ Bình Khê', 'Huyện Thạch Thiên': 'Thạch Thiên',
  'Huyện Tư Nam': 'Huyện An Hóa', 'Huyện tự trị dân tộc Thổ Gia, Miêu Ấn Giang': 'Trưởng quan ty Ấn Giang',
  'Huyện Đức Giang': 'Huyện An Hóa', 'Huyện tự trị dân tộc Thổ Gia Duyên Hà': 'Ty Duyên Hà',
  'Huyện tự trị dân tộc Miêu Tùng Đào': 'Trưởng quan ty Ô La',
  'Châu tự trị dân tộc Bố Y, Miêu Kiềm Tây Nam': 'Thiên hộ sở An Lung', 'Thành phố Hưng Nghĩa': 'Châu Phổ An',
  'Thành phố Hưng Nhân': 'Thiên hộ sở Tân Thành', 'Huyện Phổ An': 'Sở Tân Hưng', 'Huyện Tình Long': 'Vệ An Nam',
  'Huyện Trinh Phong': 'Châu Phổ An', 'Huyện Vọng Mô': 'Châu Tứ Thành', 'Huyện Sách Hanh': 'Châu Tứ Thành',
  'Huyện An Long': 'Sở An Lũng',
  'Châu tự trị dân tộc Miêu, Đồng Kiềm Đông Nam': 'An phủ ty Khải Lý', 'Thành phố Khải Lý': 'Vệ Thanh Bình',
  'Huyện Hoàng Bình': 'Châu Hoàng Bình', 'Huyện Thi Bỉnh': 'Vệ Thiên Kiều', 'Huyện Tam Tuệ': 'Ty Cùng Thủy',
  'Huyện Trấn Viễn': 'Huyện Trấn Viễn', 'Huyện Sầm Củng': 'Tư Châu', 'Huyện Thiên Trụ': 'Huyện Thiên Trụ',
  'Huyện Cẩm Bình': 'Đồng Cổ Vệ', 'Huyện Kiếm Hà': 'Huyện Trấn Viễn', 'Huyện Thai Giang': 'Huyện Trấn Viễn',
  'Huyện Lê Bình': 'Ngũ Khai Vệ', 'Huyện Dung Giang': 'Cổ Châu Man Di Trưởng quan ty', 'Huyện Tùng Giang': 'Huyện Vĩnh Tòng',
  'Huyện Lôi Sơn': 'Đô Quân Vệ', 'Huyện Ma Giang': 'Châu Ma Haa', 'Huyện Đan Trại': 'Trưởng quan ty Bát Trại',
  'Châu tự trị dân tộc Bố Y, Miêu Kiềm Nam': 'Đô Quân Vệ', 'Thành phố Đô Quân': 'Đô Quân Vệ', 'Thành phố Phúc Tuyền': 'Bình Việt Vệ',
  'Huyện Lệ Ba': 'Huyện Lệ Ba', 'Huyện Quý Định': 'Tân Thiêm Vệ', 'Huyện Úng An': 'Huyện Úng An',
  'Huyện Độc Sơn': 'Châu Độc Sơn', 'Huyện Bình Đường': 'Bình Chu Tư', 'Huyện La Điện': 'Trưởng quan ty La Hộc',
  'Huyện Trường Thuận': 'Châu Quảng Thuận', 'Huyện Long Lý': 'Long Lý Vệ', 'Huyện Huệ Thủy': 'Châu Định Phiên',
  'Huyện tự trị dân tộc Thủy Tam Đô': 'Đô Quân Vệ',

  // ================== Tỉnh Vân Nam ==================
  'Thành phố Côn Minh': 'Huyện Côn Minh', 'Quận Ngũ Hoa': 'Huyện Côn Minh', 'Quận Bàn Long': 'Huyện Côn Minh',
  'Quận Quan Độ': 'Huyện Côn Minh', 'Quận Tây Sơn': 'Huyện Côn Minh', 'Quận Đông Xuyên': 'Đông Xuyên',
  'Quận Trình Cống': 'Huyện Trình Cống', 'Quận Tấn Ninh': 'Châu Tấn Ninh', 'Huyện Phú Dân': 'Huyện Phú Dân',
  'Huyện Nghi Lương': 'Huyện Nghi Lương', 'Huyện tự trị dân tộc Di Thạch Lâm': 'Châu Lộ Nam',
  'Huyện Tung Minh': 'Châu Tung Minh', 'Huyện tự trị dân tộc Di, Miêu Lộc Khuyến': 'Châu Lộc Khuyến',
  'Huyện tự trị dân tộc Hồi, Di Tầm Điện': 'Tầm Điện', 'Thành phố An Ninh': 'Châu An Ninh',
  'Thành phố Khúc Tĩnh': 'Huyện Nam Ninh', 'Quận Kỳ Lân': 'Huyện Nam Ninh', 'Quận Triêm Ích': 'Châu Triêm Ích',
  'Quận Mã Long': 'Châu Mã Long', 'Huyện Lục Lương': 'Châu Lục Lương', 'Huyện Sư Tông': 'Châu Sư Tông',
  'Huyện La Bình': 'Châu La Bình', 'Huyện Phú Nguyên': 'Vệ Bình Di', 'Huyện Hội Trạch': 'Phủ Đông Xuyên',
  'Thành phố Tuyên Uy': 'Châu Triêm Ích',
  'Thành phố Ngọc Khê': 'Châu Tân Hưng', 'Quận Hồng Tháp': 'Châu Tân Hưng', 'Quận Giang Xuyên': 'Huyện Giang Xuyên',
  'Huyện Thông Hải': 'Huyện Thông Hải', 'Huyện Hoa Ninh': 'Ninh Châu', 'Huyện Dịch Môn': 'Huyện Dịch Môn',
  'Huyện tự trị dân tộc Di Nga Sơn': 'Huyện Tập Nga', 'Huyện tự trị dân tộc Di, Thái Tân Bình': 'Huyện Tân Bình',
  'Huyện tự trị dân tộc Cáp Nê, Di, Thái Nguyên Giang': 'Nguyên Giang', 'Thành phố Trừng Giang': 'Huyện Hà Dương',
  'Thành phố Bảo Sơn': 'Huyện Bảo Sơn', 'Quận Long Dương': 'Huyện Bảo Sơn', 'Huyện Thi Điện': 'Trưởng quan ty Thi Điện',
  'Huyện Long Lăng': 'Châu Đằng Việt', 'Huyện Xương Ninh': 'Phủ Thuận Ninh', 'Thành phố Đằng Xung': 'Châu Đằng Việt',
  'Thành phố Chiêu Thông': 'Phủ Ô Mông', 'Quận Chiêu Dương': 'Phủ Ô Mông', 'Huyện Lỗ Điện': 'Phủ Ô Mông',
  'Huyện Xảo Gia': 'Phủ Đông Xuyên', 'Huyện Diêm Tân': 'Phủ Ô Mông', 'Huyện Đại Quan': 'Phủ Ô Mông',
  'Huyện Vĩnh Thiện': 'Phủ Ô Mông', 'Huyện Tuy Giang': 'Phủ Ô Mông', 'Huyện Trấn Hùng': 'Phủ Trấn Hùng',
  'Huyện Di Lương': 'Phủ Ô Mông', 'Huyện Uy Tín': 'Phủ Trấn Hùng', 'Thành phố Thủy Phú': 'Huyện Nghi Tân',
  'Thành phố Lệ Giang': 'Lệ Giang', 'Quận Cổ Thành': 'Lệ Giang', 'Huyện tự trị dân tộc Nạp Tây Ngọc Long': 'Lệ Giang',
  'Huyện Vĩnh Thắng': 'Châu Bắc Thắng', 'Huyện Hoa Bình': 'Châu Bắc Thắng', 'Huyện tự trị dân tộc Di Ninh Lãng': 'Vĩnh Ninh',
  'Thành phố Phổ Nhĩ': 'Tuyên úy ty Xa Lý', 'Quận Tư Mao': 'Xa Lý', 'Huyện tự trị dân tộc Cáp Nê, Di Ninh Nhĩ': 'Xa Lý',
  'Huyện tự trị dân tộc Cáp Nê Mặc Giang': 'Nguyên Giang', 'Huyện tự trị dân tộc Di Cảnh Đông': 'Cảnh Đông',
  'Huyện tự trị dân tộc Thái, Di Cảnh Cốc': 'Châu Uy Viễn', 'Huyện tự trị dân tộc Di, Cáp Nê, Lạp Hỗ Trấn Nguyên': 'Trấn Nguyên',
  'Huyện tự trị dân tộc Cáp Nê, Di Giang Thành': 'Xa Lý', 'Huyện tự trị dân tộc Thái, Lạp Hỗ, Ngõa Mạnh Liên': 'Trưởng quan ty Mạnh Liên',
  'Huyện tự trị dân tộc Lạp Hỗ Lạn Thương': 'Trưởng quan ty Mạnh Liên', 'Huyện tự trị dân tộc Ngõa Tây Minh': 'Trưởng quan ty Mạnh Liên',
  'Thành phố Lâm Thương': 'Thuận Ninh', 'Quận Lâm Tường': 'Thuận Ninh', 'Huyện Phượng Khánh': 'Huyện Thuận Ninh',
  'Huyện Vân': 'Vân Châu', 'Huyện Vĩnh Đức': 'Châu Trấn Khang', 'Huyện Trấn Khang': 'Châu Trấn Khang',
  'Huyện tự trị dân tộc Lạp Hỗ, Ngõa, Bố Lãng, Thái Song Giang': 'Trưởng quan ty Mãnh Miến',
  'Huyện tự trị dân tộc Thái, Ngõa Cảnh Mã': 'An phủ ty Cảnh Mã', 'Huyện tự trị dân tộc Ngõa Thương Nguyên': 'An phủ ty Cảnh Mã',
  'Châu tự trị dân tộc Di Sở Hùng': 'Huyện Sở Hùng', 'Thành phố Sở Hùng': 'Huyện Sở Hùng', 'Thành phố Lộc Phong': 'Huyện Lộc Phong',
  'Huyện Song Bách': 'Châu Nam An', 'Huyện Mâu Định': 'Huyện Định Viễn', 'Huyện Nam Hoa': 'Châu Trấn Nam',
  'Huyện Diêu An': 'Diêu Châu', 'Huyện Đại Diêu': 'Huyện Đại Diêu', 'Huyện Vĩnh Nhân': 'Diêu Châu',
  'Huyện Nguyên Mưu': 'Huyện Nguyên Mưu', 'Huyện Vũ Định': 'Phủ Vũ Định',
  'Châu tự trị dân tộc Cáp Nê, Di Hồng Hà': 'Châu Kiến Thủy', 'Thành phố Mông Tự': 'Huyện Mông Tự', 'Thành phố Cá Cựu': 'Huyện Mông Tự',
  'Thành phố Khai Viễn': 'Châu A Mê', 'Huyện Kiến Thủy': 'Châu Kiến Thủy', 'Huyện Thạch Bình': 'Châu Thạch Bình',
  'Thành phố Di Lặc': 'Châu Di Lặc', 'Huyện Lư Tây': 'Phủ Quảng Tây', 'Huyện Nguyên Dương': 'Trưởng quan ty Nạp Lâu',
  'Huyện Hồng Hà': 'Khuy Dung Điện Trưởng quan ty', 'Huyện Lục Xuân': 'Nạp Lâu', 'Huyện tự trị dân tộc Miêu Bình Biên': 'Châu Kiến Thủy',
  'Huyện tự trị dân tộc Miêu, Dao, Thái Kim Bình': 'Nạp Lâu', 'Huyện tự trị dân tộc Dao Hà Khẩu': 'Châu Kiến Thủy',
  'Châu tự trị dân tộc Choang, Miêu Văn Sơn': 'Quảng Nam', 'Thành phố Văn Sơn': 'Giáo Hóa Tam Bộ Trưởng quan ty',
  'Huyện Nghiên Sơn': 'Châu Duy Ma', 'Huyện Tây Trù': 'Giáo Hóa Tam Bộ', 'Huyện Ma Lật Pha': 'Giáo Hóa Tam Bộ',
  'Huyện Mã Quan': 'Trưởng quan ty Bát Trại', 'Huyện Khâu Bắc': 'Châu Duy Ma', 'Huyện Quảng Nam': 'Quảng Nam',
  'Huyện Phú Ninh': 'Phú Châu',
  'Châu tự trị dân tộc Thái Tây Song Bản Nạp': 'Tuyên úy ty Xa Lý', 'Thành phố Cảnh Hồng': 'Xa Lý', 'Huyện Mãnh Hải': 'Xa Lý',
  'Huyện Mãnh Lạp': 'Xa Lý',
  'Châu tự trị dân tộc Bạch Đại Lý': 'Huyện Thái Hòa', 'Thành phố Đại Lý': 'Huyện Thái Hòa', 'Huyện tự trị dân tộc Di Dạng Tị': 'Phủ Mông Hóa',
  'Huyện Tường Vân': 'Huyện Vân Nam', 'Huyện Tân Xuyên': 'Châu Tân Xuyên', 'Huyện Di Độ': 'Triệu Châu',
  'Huyện tự trị dân tộc Di Nam Giản': 'Huyện Định Biên', 'Huyện tự trị dân tộc Di, Hồi Nguy Sơn': 'Phủ Mông Hóa',
  'Huyện Vĩnh Bình': 'Huyện Vĩnh Bình', 'Huyện Vân Long': 'Châu Vân Long', 'Huyện Nhĩ Nguyên': 'Châu Đặng Xuyên',
  'Huyện Kiếm Xuyên': 'Châu Kiếm Xuyên', 'Huyện Hạc Khánh': 'Phủ Hạc Khánh',
  'Châu tự trị dân tộc Thái, Cảnh Pha Đức Hoành': 'Lộc Xuyên Cố Địa/Tuyên phủ ty Lũng Xuyên', 'Thành phố Mang': 'Thành phố Mang Ngự Di Trưởng quan ty',
  'Thành phố Thụy Lệ': 'Lộc Xuyên', 'Huyện Lương Hà': 'Tuyên phủ ty Nam Điện', 'Huyện Doanh Giang': 'Can Nhai tuyên phủ ty',
  'Huyện Lũng Xuyên': 'Lũng Xuyên tuyên phủ ty',
  'Châu tự trị dân tộc Lật Túc Nộ Giang': 'Ngoại biên phủ Vĩnh Xương', 'Thành phố Lô Thủy': 'Thổ ty Đăng Cảnh',
  'Huyện Phúc Cống': 'Thượng Phạ', 'Huyện tự trị dân tộc Độc Long, Nộ Cống Sơn': 'Xương Bồ Thống',
  'Huyện tự trị dân tộc Bạch, Phổ Mễ Lan Bình': 'Lệ Giang phủ Lan Châu',
  'Châu tự trị dân tộc Tạng Địch Khánh': 'Trung Điện', 'Thành phố Shangri-La': 'Trung Điện',
  'Huyện Đức Khâm': 'A Đôn Tử', 'Huyện tự trị dân tộc Lật Túc Duy Tây': 'Lệ Giang',

  // ================== Khu tự trị Tây Tạng ==================
  // Tây Tạng thời Minh là Đô ty Ô Tư Tạng, Đô ty Mdo Kham cùng nhiều nơi khác
  'Thành phố Lhasa (Lạp Tát)': 'Ô Tư Tạng (Lhasa)', 'Quận Thành Quan': 'Lhasa',
  'Quận Đôi Long Đức Khánh': 'Ô Tư Tạng', 'Quận Đạt Tư': 'Ô Tư Tạng',
  'Huyện Lâm Chu': 'Ô Tư Tạng', 'Huyện Đương Hùng': 'Ô Tư Tạng', 'Huyện Ni Mộc': 'Ô Tư Tạng',
  'Huyện Khúc Thủy': 'Ô Tư Tạng', 'Huyện Mặc Trúc Công Thẻ': 'Ô Tư Tạng',
  'Thành phố Nhật Khách Tắc': 'Tạng Ba Hãn (Nhật Khách Tắc)', 'Quận Tang Châu Tư': 'Nhật Khách Tắc',
  'Huyện Nam Mộc Lâm': 'Tạng Ba Hãn', 'Huyện Giang Tư': 'Giang Tư', 'Huyện Định Nhật': 'Tạng Ba Hãn',
  'Huyện Tát Ca': 'Tát Ca', 'Huyện Lạp Tư': 'Tạng Ba Hãn', 'Huyện Ngang Nhân': 'Tạng Ba Hãn',
  'Huyện Tạ Thông Môn': 'Tạng Ba Hãn', 'Huyện Bạch Lãng': 'Tạng Ba Hãn', 'Huyện Nhân Bố': 'Tạng Ba Hãn',
  'Huyện Khang Mã': 'Tạng Ba Hãn', 'Huyện Định Kết': 'Tạng Ba Hãn', 'Huyện Trọng Ba': 'Tạng Ba Hãn',
  'Huyện Á Đông': 'Tạng Ba Hãn', 'Huyện Cát Long': 'Tạng Ba Hãn', 'Huyện Nhiếp Lạp Mộc': 'Tạng Ba Hãn',
  'Huyện Tát Dát': 'Tạng Ba Hãn', 'Huyện Cương Ba': 'Tạng Ba Hãn',
  'Thành phố Xương Đô': 'Đô ty Mdo Kham', 'Quận Tạp Nhược': 'Mdo Kham', 'Huyện Giang Đạt': 'Mdo Kham',
  'Huyện Cống Giác': 'Mdo Kham', 'Huyện Loại Ô Tề': 'Mdo Kham', 'Huyện Đinh Thanh': 'Mdo Kham',
  'Huyện Sát Nhã': 'Mdo Kham', 'Huyện Bát Túc': 'Mdo Kham', 'Huyện Tả Cống': 'Mdo Kham',
  'Huyện Mang Khang': 'Mdo Kham', 'Huyện Lạc Long': 'Mdo Kham', 'Huyện Biên Bá': 'Mdo Kham',
  'Thành phố Lâm Chi': 'Khu vực Công Bố', 'Quận Ba Nghi': 'Công Bố', 'Huyện Mễ Lâm': 'Công Bố',
  'Huyện Mặc Thoát': 'Lạc Du', 'Huyện Sát Ngung': 'Tạp Du', 'Huyện Ba Mật': 'Ba Mật',
  'Huyện Lãng': 'Công Bố', 'Huyện Công Bố Giang Đạt': 'Công Bố',
  'Thành phố Sơn Nam': 'Ô Tư Tạng', 'Quận Nãi Đông': 'Trạch Đương', 'Huyện Trát Nang': 'Ô Tư Tạng',
  'Huyện Cống Dát': 'Ô Tư Tạng', 'Huyện Tang Nhật': 'Ô Tư Tạng', 'Huyện Quỳnh Kết': 'Ô Tư Tạng',
  'Huyện Khúc Tùng': 'Ô Tư Tạng', 'Huyện Thố Mỹ': 'Ô Tư Tạng', 'Huyện Lạc Trát': 'Ô Tư Tạng',
  'Huyện Gia Tra': 'Ô Tư Tạng', 'Huyện Long Tử': 'Ô Tư Tạng', 'Huyện Thác Na': 'Ô Tư Tạng',
  'Huyện Lãng Thẻ Tử': 'Ô Tư Tạng',
  'Thành phố Na Khúc': 'Ô Tư Tạng', 'Quận Sắc Ni': 'Ô Tư Tạng',
  'Huyện Gia Lê': 'Ô Tư Tạng', 'Huyện Tỉ Như': 'Ô Tư Tạng', 'Huyện Nhiếp Vinh': 'Ô Tư Tạng',
  'Huyện An Đa': 'Ô Tư Tạng', 'Huyện Thân Trát': 'Ô Tư Tạng', 'Huyện Tác': 'Ô Tư Tạng',
  'Huyện Ban Qua': 'Ô Tư Tạng', 'Huyện Ba Thanh': 'Ô Tư Tạng', 'Huyện Ni Mã': 'Ô Tư Tạng',
  'Địa khu A Lý': 'Cổ Cách', 'Huyện Phổ Lan': 'Cổ Cách', 'Huyện Trát Đạt': 'Cổ Cách',
  'Huyện Cát Nhĩ': 'Cổ Cách', 'Huyện Nhật Thổ': 'Cổ Cách', 'Huyện Cách Cát': 'Cổ Cách',
  'Huyện Cải Tắc': 'Cổ Cách', 'Huyện Thố Cần': 'Cổ Cách', 'Thị trấn Đường Cổ Lạp Sơn': 'Mdo Kham(Thanh Hải)',

  // ================== Tỉnh Thiểm Tây ==================
  'Thành phố Tây An': 'Huyện Trường An', 'Quận Tân Thành': 'Huyện Trường An', 'Quận Bia Lâm': 'Huyện Hàm Ninh',
  'Quận Liên Hồ': 'Huyện Trường An', 'Quận Bá Kiều': 'Huyện Hàm Ninh', 'Quận Vị Ương': 'Huyện Trường An',
  'Quận Nhạn Tháp': 'Huyện Hàm Ninh', 'Quận Diêm Lương': 'Huyện Lâm Đồng', 'Quận Lâm Đồng': 'Huyện Lâm Đồng',
  'Quận Trường An': 'Huyện Trường An', 'Quận Cao Lăng': 'Huyện Cao Lăng', 'Quận Hộ Ấp': 'Huyện Hỗ',
  'Huyện Lam Điền': 'Huyện Lam Điền', 'Huyện Chu Chí': 'Huyện Chu Trất',
  'Thành phố Đồng Xuyên': 'Huyện Đồng Quan', 'Quận Vương Ích': 'Huyện Đồng Quan', 'Quận Ấn Đài': 'Huyện Đồng Quan',
  'Quận Diệu Châu': 'Diệu Châu', 'Huyện Nghi Quân': 'Huyện Nghi Quân',
  'Thành phố Bảo Kê': 'Huyện Bảo Kê', 'Quận Vị Tân': 'Huyện Bảo Kê', 'Quận Kim Đài': 'Huyện Bảo Kê',
  'Quận Trần Thương': 'Huyện Bảo Kê', 'Quận Phượng Tường': 'Huyện Phượng Tường', 'Huyện Kỳ Sơn': 'Huyện Kỳ Sơn',
  'Huyện Phù Phong': 'Huyện Phù Phong', 'Huyện Mi': 'Huyện Mi', 'Huyện Lũng': 'Lũng Châu',
  'Huyện Thiên Dương': 'Huyện Khiên Dương', 'Huyện Lân Du': 'Huyện Lân Du', 'Huyện Phượng': 'Huyện Phượng',
  'Huyện Thái Bạch': 'Huyện Phượng Tường',
  'Thành phố Hàm Dương': 'Huyện Hàm Dương', 'Quận Tần Đô': 'Huyện Hàm Dương', 'Quận Dương Lăng': 'Huyện Vũ Công',
  'Quận Vị Thành': 'Huyện Hàm Dương', 'Huyện Tam Nguyên': 'Huyện Tam Nguyên', 'Huyện Kính Dương': 'Huyện Kính Dương',
  'Huyện Càn': 'Càn Châu', 'Huyện Lễ Tuyền': 'Huyện Lễ Tuyền', 'Huyện Vĩnh Thọ': 'Huyện Vĩnh Thọ',
  'Huyện Trường Vũ': 'Huyện Trường Vũ', 'Huyện Tuần Ấp': 'Huyện Tam Thủy', 'Huyện Thuần Hóa': 'Huyện Thuần Hóa',
  'Huyện Vũ Công': 'Huyện Vũ Công', 'Thành phố Hưng Bình': 'Huyện Hưng Bình', 'Thành phố Bân Châu': 'Bân Châu',
  'Thành phố Vị Nam': 'Huyện Vị Nam', 'Quận Lâm Vị': 'Huyện Vị Nam', 'Quận Hoa Châu': 'Hoa Châu',
  'Huyện Đồng Quan': 'Vệ Đồng Quan', 'Huyện Đại Lệ': 'Huyện Đại Lệ', 'Huyện Hợp Dương': 'Huyện Hợp Dương',
  'Huyện Trừng Thành': 'Huyện Trừng Thành', 'Huyện Bồ Thành': 'Huyện Bồ Thành', 'Huyện Bạch Thủy': 'Huyện Bạch Thủy',
  'Huyện Phú Bình': 'Huyện Phú Bình', 'Thành phố Hàn Thành': 'Huyện Hàn Thành', 'Thành phố Hoa Âm': 'Huyện Hoa Âm',
  'Thành phố Diên An': 'Huyện Phu Thi', 'Quận Bảo Tháp': 'Huyện Phu Thi', 'Quận An Tắc': 'Huyện An Tắc',
  'Huyện Diên Trường': 'Huyện Diên Trường', 'Huyện Diên Xuyên': 'Huyện Diên Xuyên', 'Huyện Chí Đan': 'Huyện Bảo An',
  'Huyện Ngô Khởi': 'Huyện Bảo An', 'Huyện Cam Tuyền': 'Huyện Cam Tuyền', 'Huyện Phú': 'Phu Châu',
  'Huyện Lạc Xuyên': 'Huyện Lạc Xuyên', 'Huyện Nghi Xuyên': 'Huyện Nghi Xuyên', 'Huyện Hoàng Long': 'Huyện Nghi Xuyên',
  'Huyện Hoàng Lăng': 'Huyện Trung Bộ', 'Thành phố Tử Trường': 'Huyện An Định',
  'Thành phố Hán Trung': 'Huyện Nam Trịnh', 'Quận Hán Đài': 'Huyện Nam Trịnh', 'Quận Nam Trịnh': 'Huyện Nam Trịnh',
  'Huyện Thành Cố': 'Huyện Thành Cố', 'Huyện Dương': 'Huyện Dương', 'Huyện Tây Hương': 'Huyện Tây Hương',
  'Huyện Miễn': 'Huyện Miễn', 'Huyện Ninh Cường': 'Châu Ninh Khương', 'Huyện Lược Dương': 'Huyện Lược Dương',
  'Huyện Trấn Ba': 'Huyện Tây Hương', 'Huyện Lưu Bá': 'Huyện Phượng', 'Huyện Phật Bình': 'Huyện Châu Trật',
  'Thành phố Du Lâm': 'Vệ Du Lâm', 'Quận Du Dương': 'Vệ Du Lâm', 'Quận Hoành Sơn': 'Bảo Hoài Viễn',
  'Huyện Phủ Cốc': 'Huyện Phủ Cốc', 'Huyện Tĩnh Biên': 'Doanh Tĩnh Biên', 'Huyện Định Biên': 'Doanh Định Biên',
  'Huyện Tuy Đức': 'Châu Tuy Đức', 'Huyện Mễ Chi': 'Huyện Mễ Chi', 'Huyện Giai': 'Gia Châu',
  'Huyện Ngô Bảo': 'Huyện Ngô Bảo', 'Huyện Thanh Giản': 'Huyện Thanh Giản', 'Huyện Tử Châu': 'Châu Tuy Đức',
  'Thành phố Thần Mộc': 'Huyện Thần Mộc',
  'Thành phố An Khang': 'Châu Hưng Yên', 'Quận Hán Tân': 'Châu Hưng Yên', 'Huyện Hán Âm': 'Huyện Hán Âm',
  'Huyện Thạch Tuyền': 'Huyện Thạch Tuyền', 'Huyện Ninh Thiểm': 'Châu Hưng Yên', 'Huyện Tử Dương': 'Huyện Tử Dương',
  'Huyện Lam Cao': 'Châu Hưng Yên', 'Huyện Bình Lợi': 'Huyện Bình Lợi', 'Huyện Trấn Bình': 'Huyện Bình Lợi',
  'Thành phố Tuần Dương': 'Huyện Tuân Dương', 'Huyện Bạch Hà': 'Huyện Bạch Hà',
  'Thành phố Thương Lạc': 'Thương Châu', 'Quận Thương Châu': 'Thương Châu', 'Huyện Lạc Nam': 'Huyện Lạc Nam',
  'Huyện Đan Phượng': 'Thương Châu', 'Huyện Thương Nam': 'Huyện Thương Nam', 'Huyện Sơn Dương': 'Huyện Sơn Dương',
  'Huyện Trấn An': 'Huyện Trấn An', 'Huyện Trá Thủy': 'Huyện Trấn An',

  // ================== Tỉnh Cam Túc ==================
  'Thành phố Lan Châu': 'Lan Châu', 'Quận Thành Quan': 'Lan Châu', 'Quận Thất Lý Hà': 'Lan Châu',
  'Quận Tây Cố': 'Lan Châu', 'Quận An Ninh': 'Lan Châu', 'Quận Hồng Cổ': 'Lan Châu',
  'Huyện Vĩnh Đăng': 'Trang Lãng Vệ', 'Huyện Cáo Lan': 'Lan Châu', 'Huyện Du Trung': 'Huyện Kim',
  'Thành phố Gia Dục Quan': 'Gia Dục Quan (Túc Châu Vệ)',
  'Thành phố Kim Xương': 'Vĩnh Xương Vệ', 'Quận Kim Xuyên': 'Vĩnh Xương Vệ', 'Huyện Vĩnh Xương': 'Vĩnh Xương Vệ',
  'Thành phố Bạch Ngân': 'Tĩnh Lỗ Vệ', 'Quận Bạch Ngân': 'Tĩnh Lỗ Vệ', 'Quận Bình Xuyên': 'Tĩnh Lỗ Vệ',
  'Huyện Tĩnh Viễn': 'Tĩnh Lỗ Vệ', 'Huyện Hội Ninh': 'Huyện Hội Ninh', 'Huyện Cảnh Thái': 'Ninh Hạ Vệ',
  'Thành phố Thiên Thủy': 'Tần Châu', 'Quận Tần Châu': 'Tần Châu', 'Quận Mạch Tích': 'Tần Châu',
  'Huyện Thanh Thủy': 'Huyện Thanh Thủy', 'Huyện Tần An': 'Huyện Tần An', 'Huyện Cam Cốc': 'Huyện Phục Khương',
  'Huyện Vũ Sơn': 'Huyện Ninh Viễn', 'Huyện tự trị dân tộc Hồi Trương Gia Xuyên': 'Tần Châu',
  'Thành phố Vũ Uy': 'Lương Châu Vệ', 'Quận Lương Châu': 'Lương Châu Vệ', 'Huyện Dân Cần': 'Vệ Trấn Phiên',
  'Huyện Cổ Lãng': 'Cổ Lãng Thủ ngự Thiên hộ sở', 'Huyện tự trị dân tộc Tạng Thiên Chúc': 'Vệ Trang Lãng',
  'Thành phố Trương Dịch': 'Vệ Cam Châu', 'Quận Cam Châu': 'Vệ Cam Châu', 'Huyện tự trị dân tộc Dụ Cố Túc Nam': 'Vệ Cam Châu',
  'Huyện Dân Nhạc': 'Vệ Cam Châu', 'Huyện Lâm Trạch': 'Vệ Cam Châu', 'Huyện Cao Đài': 'Cao Đài Thủ ngự Thiên hộ sở',
  'Huyện Sơn Đan': 'Vệ Sơn Đan',
  'Thành phố Bình Lương': 'Huyện Bình Lương', 'Quận Không Động': 'Huyện Bình Lương', 'Huyện Kính Xuyên': 'Kính Châu',
  'Huyện Linh Đài': 'Huyện Linh Đài', 'Huyện Sùng Tín': 'Huyện Sùng Tín', 'Thành phố Hoa Đình': 'Huyện Hoa Đình',
  'Huyện Trang Lãng': 'Châu Tĩnh Ninh', 'Huyện Tĩnh Ninh': 'Châu Tĩnh Ninh',
  'Thành phố Tửu Tuyền': 'Vệ Túc Châu', 'Quận Túc Châu': 'Vệ Túc Châu', 'Huyện Kim Tháp': 'Trấn Di Thủ ngự Thiên hộ sở',
  'Huyện Qua Châu': 'Vệ An Tây', 'Huyện tự trị dân tộc Mông Cổ Túc Bắc': 'Vệ Hãn Đông',
  'Huyện tự trị dân tộc Kazakh A Khắc Tắc': 'Vệ Hãn Đông', 'Thành phố Ngọc Môn': 'Xích Cân Mông Cổ vệ',
  'Thành phố Đôn Hoàng': 'Vệ Sa Châu',
  'Thành phố Khánh Dương': 'Huyện An Hóa', 'Quận Tây Phong': 'Huyện An Hóa', 'Huyện Khánh Thành': 'Huyện An Hóa',
  'Huyện Hoàn': 'Huyện Hoàn', 'Huyện Hoa Trì': 'Huyện An Hóa', 'Huyện Hợp Thủy': 'Huyện Hợp Thủy',
  'Huyện Chính Ninh': 'Huyện Chính Ninh', 'Huyện Ninh': 'Ninh Châu', 'Huyện Trấn Nguyên': 'Huyện Trấn Nguyên',
  'Thành phố Định Tây': 'Huyện An Định', 'Quận An Định': 'Huyện An Định', 'Huyện Thông Vị': 'Huyện Thông Vị',
  'Huyện Lũng Tây': 'Phủ Củng Xương Huyện Lũng Tây', 'Huyện Vị Nguyên': 'Huyện Vị Nguyên', 'Huyện Lâm Thao': 'Huyện Địch Đạo',
  'Huyện Chương': 'Huyện Chương', 'Huyện Mân': 'Mân Châu',
  'Thành phố Lũng Nam': 'Giai Châu', 'Quận Vũ Đô': 'Giai Châu', 'Huyện Thành': 'Huyện Thành',
  'Huyện Văn': 'Huyện Văn', 'Huyện Đãng Xương': 'Tây Cố thủ ngự thiên hộ sở', 'Huyện Khang': 'Giai Châu',
  'Huyện Tây Hòa': 'Huyện Tây Hòa', 'Huyện Lễ': 'Huyện Lễ', 'Huyện Huy': 'Huy Châu',
  'Huyện Lưỡng Đương': 'Huyện Lưỡng Đương',
  'Châu tự trị dân tộc Hồi Lâm Hạ': 'Hà Châu', 'Thành phố Lâm Hạ': 'Hà Châu', 'Huyện Lâm Hạ': 'Hà Châu',
  'Huyện Khang Nhạc': 'Hà Châu', 'Huyện Vĩnh Tĩnh': 'Hà Châu', 'Huyện Quảng Hà': 'Hà Châu',
  'Huyện Hòa Chính': 'Hà Châu', 'Huyện tự trị dân tộc Đông Hương': 'Hà Châu',
  'Huyện tự trị dân tộc Bảo An, Đông Hương, Tát Lạp Tích Thạch Sơn': 'Hà Châu',
  'Châu tự trị dân tộc Tạng Cam Nam': 'Vệ Thao Châu', 'Thành phố Hợp Tác': 'Thao Châu', 'Huyện Lâm Đàm': 'Vệ Thao Châu',
  'Huyện Trác Ni': 'Thao Châu', 'Huyện Chu Khúc': 'Giai Châu', 'Huyện Điệt Bộ': 'Thao Châu',
  'Huyện Mã Khúc': 'Thao Châu', 'Huyện Lục Khúc': 'Thao Châu', 'Huyện Hạ Hà': 'Hà Châu',

  // ================== Tỉnh Thanh Hải ==================
  'Thành phố Tây Ninh': 'Vệ Tây Ninh', 'Quận Thành Đông': 'Vệ Tây Ninh', 'Quận Thành Trung': 'Tây Ninh Vệ',
  'Quận Thành Tây': 'Tây Ninh Vệ', 'Quận Thành Bắc': 'Tây Ninh Vệ', 'Quận Hoàng Trung': 'Tây Ninh Vệ',
  'Huyện tự trị dân tộc Hồi, Thổ Đại Thông': 'Tây Ninh Vệ', 'Huyện Hoàng Nguyên': 'Tây Ninh Vệ',
  'Thành phố Hải Đông': 'Niễn Bá thủ ngự thiên hộ sở', 'Quận Nhạc Đô': 'Niễn Bá Sở', 'Quận Bình An': 'Tây Ninh Vệ',
  'Huyện tự trị dân tộc Hồi, Thổ Dân Hòa': 'Niễn Bá Sở', 'Huyện tự trị dân tộc Thổ Hỗ Trợ': 'Tây Ninh Vệ',
  'Huyện tự trị dân tộc Hồi Hóa Long': 'Tây Ninh Vệ', 'Huyện tự trị dân tộc Tát Lạp Tuần Hóa': 'Hà Châu',
  'Châu tự trị dân tộc Tạng Hải Bắc': 'Bộ Hòa Thạc Đặc Mông Cổ', 'Huyện tự trị dân tộc Hồi Môn Nguyên': 'Bộ Hòa Thạc Đặc',
  'Huyện Kỳ Liên': 'Bộ Hòa Thạc Đặc', 'Huyện Hải Yến': 'Bộ Hòa Thạc Đặc', 'Huyện Cương Sát': 'Bộ Hòa Thạc Đặc',
  'Châu tự trị dân tộc Tạng Hoàng Nam': 'Tất Lý Vệ', 'Thành phố Đồng Nhân': 'Tất Lý Vệ', 'Huyện Tiêm Trát': 'Tất Lý Vệ',
  'Huyện Trạch Khố': 'Tất Lý Vệ', 'Huyện tự trị dân tộc Mông Cổ Hà Nam': 'Bộ Hòa Thạc Đặc',
  'Châu tự trị dân tộc Tạng Hải Nam': 'Tất Lý Vệ/Bộ Hòa Thạc Đặc', 'Huyện Cộng Hòa': 'Bộ Hòa Thạc Đặc',
  'Huyện Đồng Đức': 'Tất Lý Vệ', 'Huyện Quý Đức': 'Quy Đức thủ ngự thiên hộ sở', 'Huyện Hưng Hải': 'Tất Lý Vệ',
  'Huyện Quý Nam': 'Tất Lý Vệ',
  'Châu tự trị dân tộc Tạng Quả Lạc': 'Mdo Kham(Thanh Hải)', 'Huyện Mã Thấm': 'Mdo Kham(Thanh Hải)',
  'Huyện Ban Mã': 'Mdo Kham(Thanh Hải)', 'Huyện Cam Đức': 'Mdo Kham(Thanh Hải)', 'Huyện Đạt Nhật': 'Mdo Kham(Thanh Hải)',
  'Huyện Cửu Trị': 'Mdo Kham(Thanh Hải)', 'Huyện Mã Đa': 'Mdo Kham(Thanh Hải)',
  'Châu tự trị dân tộc Tạng Ngọc Thụ': 'Mdo Kham(Thanh Hải)', 'Thành phố Ngọc Thụ': 'Mdo Kham(Thanh Hải)', 'Huyện Tạp Đa': 'Mdo Kham(Thanh Hải)',
  'Huyện Xưng Đa': 'Mdo Kham(Thanh Hải)', 'Huyện Trị Đa': 'Mdo Kham(Thanh Hải)', 'Huyện Nang Khiêm': 'Mdo Kham(Thanh Hải)',
  'Huyện Khúc Ma Lai': 'Mdo Kham(Thanh Hải)',
  'Châu tự trị dân tộc Mông Cổ, Tạng Hải Tây': 'Bộ Hòa Thạc Đặc', 'Thành phố Cách Nhĩ Mộc': 'Bộ Hòa Thạc Đặc',
  'Thành phố Đức Lệnh Hà': 'Bộ Hòa Thạc Đặc', 'Thành phố Mang Nhai': 'Bộ Hòa Thạc Đặc', 'Huyện Ô Lan': 'Bộ Hòa Thạc Đặc',
  'Huyện Đô Lan': 'Bộ Hòa Thạc Đặc', 'Huyện Thiên Tuấn': 'Bộ Hòa Thạc Đặc',

  // ================== Khu tự trị dân tộc Hồi Ninh Hạ ==================
  'Thành phố Ngân Xuyên': 'Ninh Hạ Vệ', 'Quận Hưng Khánh': 'Ninh Hạ Vệ', 'Quận Tây Hạ': 'Ninh Hạ Vệ',
  'Quận Kim Phượng': 'Ninh Hạ Vệ', 'Huyện Vĩnh Ninh': 'Ninh Hạ Vệ', 'Huyện Hạ Lan': 'Ninh Hạ Vệ',
  'Thành phố Linh Vũ': 'Linh Châu thủ ngự thiên hộ sở',
  'Thành phố Thạch Chủy Sơn': 'Bình Lỗ thủ ngự thiên hộ sở', 'Quận Đại Vũ Khẩu': 'Bình Lỗ Sở',
  'Quận Huệ Nông': 'Bình Lỗ Sở', 'Huyện Bình La': 'Bình Lỗ Sở',
  'Thành phố Ngô Trung': 'Ninh Hạ Vệ/Linh Châu', 'Quận Lợi Thông': 'Linh Châu', 'Quận Hồng Tự Bảo': 'Ninh Hạ Vệ',
  'Huyện Diêm Trì': 'Hoa Mã Trì Thủ ngự Thiên hộ sở', 'Huyện Đồng Tâm': 'Ninh Hạ Vệ',
  'Thành phố Thanh Đồng Hiệp': 'Ninh Hạ Vệ',
  'Thành phố Cố Nguyên': 'Cố Nguyên Vệ', 'Quận Nguyên Châu': 'Cố Nguyên Vệ', 'Huyện Tây Cát': 'Cố Nguyên Vệ',
  'Huyện Long Đức': 'Huyện Long Đức', 'Huyện Kính Nguyên': 'Cố Nguyên Vệ', 'Huyện Bành Dương': 'Cố Nguyên Vệ',
  'Thành phố Trung Vệ': 'Ninh Hạ Trung Vệ', 'Quận Sa Pha Đầu': 'Ninh Hạ Trung Vệ', 'Huyện Trung Ninh': 'Ninh Hạ Trung Vệ',
  'Huyện Hải Nguyên': 'Hải Nguyên Bảo',

  // ================== Khu tự trị dân tộc Duy Ngô Nhĩ Tân Cương ==================
  // Tân Cương thời Minh thuộc Hãn quốc Đông Chagatai/Hãn quốc Yarkent, phía đông là các vệ Haa Mật
  'Thành phố Ô Lỗ Mộc Tề': 'Oirat (Oirat)', 'Quận Thiên Sơn': 'Oirat',
  'Quận Sa Y Ba Khắc': 'Oirat', 'Quận Tân Thị': 'Oirat', 'Quận Thủy Ma Câu': 'Oirat',
  'Quận Đầu Đồn Hà': 'Oirat', 'Quận Đạt Phản Thành': 'Oirat', 'Quận Mễ Đông': 'Oirat',
  'Huyện Ô Lỗ Mộc Tề': 'Oirat',
  'Thành phố Khắc Lạp Mã Y': 'Oirat', 'Quận Độc Sơn Tử': 'Oirat', 'Quận Khắc Lạp Mã Y': 'Oirat',
  'Quận Bạch Kiềm Than': 'Oirat', 'Quận Ô Nhĩ Hòa': 'Oirat',
  'Thành phố Thổ Lỗ Phồn': 'Thổ Lỗ Phiên (Đông Sát Hợp Đài)', 'Quận Cao Xương': 'Thổ Lỗ Phiên',
  'Huyện Thiện Thiện': 'Thổ Lỗ Phiên', 'Huyện Thác Khắc Tốn': 'Thổ Lỗ Phiên',
  'Thành phố Cáp Mật': 'Cáp Mật Vệ', 'Quận Y Châu': 'Cáp Mật Vệ', 'Huyện tự trị dân tộc Kazakh Ba Lý Khôn': 'Cáp Mật Vệ',
  'Huyện Y Ngô': 'Cáp Mật Vệ',
  'Châu tự trị dân tộc Hồi Xương Cát': 'Oirat/Đông Sát Hợp Đài', 'Thành phố Xương Cát': 'Oirat',
  'Thành phố Phụ Khang': 'Oirat', 'Huyện Hô Đồ Bích': 'Oirat', 'Huyện Mã Nạp Tư': 'Oirat',
  'Huyện Kỳ Đài': 'Oirat', 'Huyện Cát Mộc Tát Nhĩ': 'Oirat', 'Huyện tự trị dân tộc Kazakh Mộc Lũy': 'Oirat',
  'Châu tự trị dân tộc Mông Cổ Bác Nhĩ Tháp Lạp': 'Oirat', 'Thành phố Bác Nhạc': 'Oirat', 'Thành phố A Lạp Sơn Khẩu': 'Oirat',
  'Huyện Tinh Hà': 'Oirat', 'Huyện Ôn Tuyền': 'Oirat',
  'Châu tự trị dân tộc Mông Cổ Ba Âm Quách Lăng': 'Hãn quốc Yarkent/Oirat', 'Thành phố Khố Nhĩ Lặc': 'Yarkent',
  'Huyện Luân Đài': 'Yarkent', 'Huyện Úy Lê': 'Yarkent', 'Huyện Nhược Khương': 'Yarkent',
  'Huyện Thả Mạt': 'Yarkent', 'Huyện tự trị dân tộc Hồi Yên Kỳ': 'Yarkent', 'Huyện Hòa Tĩnh': 'Oirat',
  'Huyện Hòa Thạc': 'Oirat', 'Huyện Bác Hồ': 'Yarkent',
  'Địa khu A Khắc Tô': 'Hãn quốc Yarkent', 'Thành phố A Khắc Tô': 'A Khắc Tô', 'Thành phố Khố Xa': 'Khố Xa',
  'Huyện Ôn Túc': 'A Khắc Tô', 'Huyện Sa Nhã': 'Khố Xa', 'Huyện Tân Hòa': 'Khố Xa',
  'Huyện Bái Thành': 'Bái Thành', 'Huyện Ô Thập': 'Ô Thập', 'Huyện A Ngõa Đề': 'A Khắc Tô',
  'Huyện Kha Bình': 'A Khắc Tô',
  'Châu tự trị dân tộc Kyrgyz Khắc Tư Lặc Tô': 'Hãn quốc Yarkent', 'Thành phố A Đồ Thập': 'Yarkent',
  'Huyện A Khắc Đào': 'Yarkent', 'Huyện A Hợp Kỳ': 'Yarkent', 'Huyện Ô Kháp': 'Yarkent',
  'Địa khu Khách Thập': 'Hãn quốc Yarkent (Khách Thập Cát Nhĩ)', 'Thành phố Khách Thập': 'Khách Thập Cát Nhĩ',
  'Huyện Sơ Phụ': 'Khách Thập Cát Nhĩ', 'Huyện Sơ Lặc': 'Khách Thập Cát Nhĩ', 'Huyện Anh Cát Sa': 'Anh Cát Sa Nhĩ',
  'Huyện Trạch Phổ': 'Yarkent', 'Huyện Sa Xa': 'Yarkent', 'Huyện Diệp Thành': 'Yarkent',
  'Huyện Mạch Cái Đề': 'Yarkent', 'Huyện Nhạc Phổ Hồ': 'Yarkent', 'Huyện Già Sư': 'Khách Thập Cát Nhĩ',
  'Huyện Ba Sở': 'Yarkent', 'Huyện tự trị dân tộc Tajik Tháp Thập Khố Nhĩ Can': 'Sắc Lặc Khố Nhĩ',
  'Địa khu Hòa Điền': 'Hãn quốc Yarkent (Vu Điền)', 'Thành phố Hòa Điền': 'Vu Điền',
  'Huyện Hòa Điền': 'Vu Điền', 'Huyện Mặc Ngọc': 'Vu Điền', 'Huyện Bì Sơn': 'Vu Điền',
  'Huyện Lạc Phố': 'Vu Điền', 'Huyện Sách Lặc': 'Vu Điền', 'Huyện Vu Điền': 'Vu Điền',
  'Huyện Dân Phong': 'Vu Điền',
  'Châu tự trị dân tộc Kazakh Y Lê': 'Oirat/Yarkent', 'Thành phố Y Ninh': 'Oirat',
  'Thành phố Khuê Đồn': 'Oirat', 'Thành phố Hoắc Nhĩ Quả Tư': 'Oirat', 'Huyện Y Ninh': 'Oirat',
  'Huyện tự trị dân tộc Tích Bá Sát Bố Tra Nhĩ': 'Oirat', 'Huyện Hoắc Thành': 'Oirat',
  'Huyện Củng Lưu': 'Oirat', 'Huyện Tân Nguyên': 'Oirat', 'Huyện Chiêu Tô': 'Oirat',
  'Huyện Đặc Khắc Tư': 'Oirat', 'Huyện Ni Lặc Khắc': 'Oirat',
  'Địa khu Tháp Thành': 'Oirat', 'Thành phố Tháp Thành': 'Oirat', 'Thành phố Ô Tô': 'Oirat',
  'Huyện Ngạch Mẫn': 'Oirat', 'Thành phố Sa Loan': 'Oirat', 'Huyện Thác Lý': 'Oirat',
  'Huyện Dụ Dân': 'Oirat', 'Huyện tự trị dân tộc Mông Cổ Hòa Bố Khắc Tái Nhĩ': 'Oirat',
  'Địa khu A Lặc Thái': 'Oirat', 'Thành phố A Lạp Thái': 'Oirat', 'Huyện Bố Nhĩ Tân': 'Oirat',
  'Huyện Phú Uẩn': 'Oirat', 'Huyện Phúc Hải': 'Oirat', 'Huyện Cáp Ba Hà': 'Oirat',
  'Huyện Thanh Hà': 'Oirat', 'Huyện Cát Mộc Nãi': 'Oirat',

  // ================== Tỉnh Đài Loan ==================
  // 1634 Thời nhà Minh gọi là Đông Phiên, phân thuộc thuộc địa của Tây Ban Nha - Bồ Đào Nha, Hà Lan, Vương quốc Đại Đỗ và các bộ lạc bản địa khác.
  'Thành phố Đài Bắc': 'Đạm Thủy', 'Thành phố Đài Bắc': 'Đạm Thủy', 'Thành phố Tân Bắc': 'Tam Điêu', 'Thành phố Cơ Long': 'Kê Lung', 'Thành phố Đào Viên': 'Nam Khảm', 'Thành phố Đào Viên': 'Nam Khảm', 'Huyện Nghi Lan': 'Cát Mã Lan', 'Huyện Nghi Lan': 'Cát Mã Lan',
  'Thành phố Đài Nam': 'Xích Khảm', 'Thành phố Đài Nam': 'Xích Khảm', 'Thành phố Cao Hùng': 'Đả Cẩu', 'Thành phố Gia Nghĩa': 'Chư La Sơn', 'Thành phố Gia Nghĩa': 'Chư La Sơn', 'Huyện Gia Nghĩa': 'Chư La Sơn', 'Huyện Gia Nghĩa': 'Chư La Sơn', 'Huyện Bình Đông': 'A Hầu', 'Huyện Bình Đông': 'A Hầu',
  'Huyện Bành Hồ': 'Bành Hồ tuần kiểm ty', 'Huyện Bành Hồ': 'Bành Hồ tuần kiểm ty',
  'Thành phố Tân Trúc': 'Trúc Tiệm', 'Huyện Tân Trúc': 'Trúc Tiệm', 'Huyện Tân Trúc': 'Trúc Tiệm', 'Huyện Miêu Lật': 'Thôn Tiêu', 'Huyện Miêu Lật': 'Thôn Tiêu', 'Thành phố Đài Trung': 'Đại Đỗ', 'Thành phố Đài Trung': 'Đại Đỗ', 'Huyện Chương Hóa': 'Bán Tuyến', 'Huyện Chương Hóa': 'Bán Tuyến', 'Huyện Nam Đầu': 'Thủy Sa Liên', 'Huyện Nam Đầu': 'Thủy Sa Liên', 'Huyện Vân Lâm': 'Bôn Cảng', 'Huyện Vân Lâm': 'Bôn Cảng', 'Huyện Hoa Liên': 'Kỳ Lai', 'Huyện Hoa Liên': 'Kỳ Lai', 'Huyện Đài Đông': 'Ty Nam', 'Huyện Đài Đông': 'Ty Nam',

  // ================== Đặc khu hành chính Hồng Kông ==================
  'Quận Trung Tây': 'Huyện Tân An', 'Quận Loan Tử': 'Huyện Tân An', 'Quận Đông': 'Huyện Tân An',
  'Quận Nam': 'Huyện Tân An', 'Quận Du Tiêm Vượng': 'Huyện Tân An', 'Quận Thâm Thủy Bộ': 'Huyện Tân An',
  'Quận Cửu Long Thành': 'Huyện Tân An', 'Quận Hoàng Đại Tiên': 'Huyện Tân An', 'Quận Quan Đường': 'Huyện Tân An',
  'Quận Thuyên Loan': 'Huyện Tân An', 'Quận Đồn Môn': 'Huyện Tân An', 'Quận Nguyên Lãng': 'Huyện Tân An',
  'Quận Bắc': 'Huyện Tân An', 'Quận Đại Bộ': 'Huyện Tân An', 'Quận Tây Cống': 'Huyện Tân An',
  'Quận Sa Điền': 'Huyện Tân An', 'Quận Quỳ Thanh': 'Huyện Tân An', 'Quận Ly Đảo': 'Huyện Tân An',

  // ================== Đặc khu hành chính Ma Cao ==================
  'Phường Hoa Địa Mã': 'Huyện Hương Sơn', 'Giáo xứ Thánh An Đa Ni': 'Huyện Hương Sơn',
  'Giáo xứ Đại Đường': 'Huyện Hương Sơn', 'Giáo xứ Vọng Đức': 'Huyện Hương Sơn',
  'Giáo xứ Phong Thuận': 'Huyện Hương Sơn', 'Giáo xứ Gia Mô (Đãng Tử)': 'Huyện Hương Sơn',
  'Giáo xứ Thánh Phương Tế Các (Lộ Hoàn)': 'Huyện Hương Sơn'
};


const modernProvinceDefaultFu = {
    'Tỉnh Hà Bắc':'Phủ Chân Định','Tỉnh Giang Tô':'Phủ Ứng Thiên','Tỉnh An Huy':'Phủ Lư Châu','Tỉnh Chiết Giang':'Phủ Hàng Châu','Tỉnh Phúc Kiến':'Phủ Phúc Châu',
    'Tỉnh Giang Tây':'Phủ Nam Xương','Tỉnh Sơn Đông':'Phủ Tế Nam','Tỉnh Hà Nam':'Phủ Khai Phong','Tỉnh Hồ Bắc':'Phủ Vũ Xương','Tỉnh Hồ Nam':'Phủ Trường Sa',
    'Tỉnh Quảng Đông':'Phủ Quảng Châu','Khu tự trị dân tộc Choang Quảng Tây':'Phủ Quế Lâm','Tỉnh Hải Nam':'Phủ Quỳnh Châu','Tỉnh Tứ Xuyên':'Phủ Thành Đô','Tỉnh Quý Châu':'Phủ Quý Dương',
    'Tỉnh Vân Nam':'Phủ Vân Nam','Tỉnh Thiểm Tây':'Phủ Tây An','Tỉnh Cam Túc':'Phủ Lâm Thao','Khu tự trị dân tộc Hồi Ninh Hạ':'Ninh Hạ Vệ','Tỉnh Sơn Tây':'Phủ Thái Nguyên',
    'Đặc khu hành chính Hồng Kông':'Phủ Quảng Châu', 'Đặc khu hành chính Ma Cao':'Phủ Quảng Châu','Tỉnh Cát Lâm':'Thành Ô Lạp', 'Tỉnh Hắc Long Giang':'Bộ Khố Nhĩ Khách', 'Khu tự trị Nội Mông Cổ':'Bộ Sát Cáp Nhĩ',
    'Tỉnh Thanh Hải':'Bộ Hòa Thạc Đặc', 'Khu tự trị Tây Tạng':'Ô Tư Tạng', 'Khu tự trị dân tộc Duy Ngô Nhĩ Tân Cương':'Yarkent', 'Tỉnh Đài Loan':'Các bộ Đông Phiên'
};



// ==========================================
// Đánh dấu địa điểm đặc biệt tùy chỉnh (Kinh vĩ độ)
// Bản đồ chi tiết cấp phủ châu tương ứng cũng sẽ hiển thị chính xác
// ==========================================
const customProvincePoints = {
    'Nam Trực Lệ': [
        { name: 'Đồng Thành', value: [116.95, 31.05], fu: 'Phủ An Khánh' } // Tăng fu Thuộc tính dùng để lọc lớp thứ 3
    ]
};

// ==========================================
// Bộ nhớ đệm yêu cầu dữ liệu và quản lý trạng thái
// ==========================================
const geoJsonCache = {};
const geoJsonPromises = {}; // Tăng Promise Khóa, ngăn chặn yêu cầu đồng thời cùng một tệp trong chớp mắt

async function fetchGeoJSON(adcode) {
    if (geoJsonCache[adcode]) return geoJsonCache[adcode];
    
    // Nếu yêu cầu đó đang được tiến hành, trực tiếp đợi nó hoàn thành, không tạo yêu cầu mới.
    if (geoJsonPromises[adcode]) return geoJsonPromises[adcode];
    
    geoJsonPromises[adcode] = (async () => {
        try {
            let url;
            if (adcode === '100000') {
                url = 'https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json';
            } else if (adcode === '710000') {
                url = 'https://cdn.jsdelivr.net/gh/fairta/map@main/map/tw.json'; 
            } else if (adcode === 'JPN_1') {
                url = 'https://cdn.jsdelivr.net/gh/fairta/map@main/map/japan/JPN_1.json'; // Nhật Bản cấp 1
            } else if (adcode === 'JPN_2') {
                url = 'https://cdn.jsdelivr.net/gh/fairta/map@main/map/japan/JPN_2.json'; // Nhật Bản cấp 2
            } else if (adcode === 'KOR_1') {
                url = 'https://cdn.jsdelivr.net/gh/fairta/map@main/map/Korea/KOR_1.json'; // Nam Hàn cấp 1
            } else if (adcode === 'PRK_1') {
                url = 'https://cdn.jsdelivr.net/gh/fairta/map@main/map/Korea/PRK_1.json'; // Bắc Hàn cấp 1
            } else if (adcode === 'KOR_2') {
                url = 'https://cdn.jsdelivr.net/gh/fairta/map@main/map/Korea/KOR_2.json'; // Nam Hàn cấp 2
            } else if (adcode === 'PRK_2') {
                url = 'https://cdn.jsdelivr.net/gh/fairta/map@main/map/Korea/PRK_2.json'; // Bắc Hàn cấp 2
            } else {
                // ================= Mới: Khớp với liên kết tải xuống trực tiếp thực tế của các nước láng giềng mà bạn cung cấp =================
                const foreignUrls = {
                    'MNG_1': 'https://cdn.jsdelivr.net/gh/fairta/map@main/map/Mongolia-Khalkha/MNG_1.json',
                    'MNG_2': 'https://cdn.jsdelivr.net/gh/fairta/map@main/map/Mongolia-Khalkha/MNG_2.json',
                    'NPL_1': 'https://cdn.jsdelivr.net/gh/fairta/map@main/map/Nepal/NPL_1.json',
                    'NPL_2': 'https://cdn.jsdelivr.net/gh/fairta/map@main/map/Nepal/NPL_2.json',
                    'BTN_1': 'https://cdn.jsdelivr.net/gh/fairta/map@main/map/Bhutan/BTN_1.json',
                    'BTN_2': 'https://cdn.jsdelivr.net/gh/fairta/map@main/map/Bhutan/BTN_2.json',
                    'LAO_1': 'https://cdn.jsdelivr.net/gh/fairta/map@main/map/Laos-Lancang/LAO_1.json',
                    'LAO_2': 'https://cdn.jsdelivr.net/gh/fairta/map@main/map/Laos-Lancang/LAO_2.json',
                    'THA_1': 'https://cdn.jsdelivr.net/gh/fairta/map@main/map/Thailand-Siam/THA_1.json',
                    'THA_2': 'https://cdn.jsdelivr.net/gh/fairta/map@main/map/Thailand-Siam/THA_2.json',
                    'VNM_1': 'https://cdn.jsdelivr.net/gh/fairta/map@main/map/Vietnam-Zhengzhu-Guangnan/VNM_1.json',
                    'VNM_2': 'https://cdn.jsdelivr.net/gh/fairta/map@main/map/Vietnam-Zhengzhu-Guangnan/VNM_2.json',
                    'BGD_1': 'https://cdn.jsdelivr.net/gh/fairta/map@main/map/Mughal/BGD_1.json',
                    'BGD_2': 'https://cdn.jsdelivr.net/gh/fairta/map@main/map/Mughal/BGD_2.json',
                    'IND_1': 'https://cdn.jsdelivr.net/gh/fairta/map@main/map/Mughal/IND_1.json',
                    'IND_2': 'https://cdn.jsdelivr.net/gh/fairta/map@main/map/Mughal/IND_2.json',
                    'PAK_1': 'https://cdn.jsdelivr.net/gh/fairta/map@main/map/Mughal/PAK_1.json',
                    'PAK_2': 'https://cdn.jsdelivr.net/gh/fairta/map@main/map/Mughal/PAK_2.json'
                };
                
                if (foreignUrls[adcode]) {
                    url = foreignUrls[adcode];
                } else {
                    // Trong nước vẫn đi qua route mặc định của Aliyun
                    url = `https://geo.datav.aliyun.com/areas_v3/bound/${adcode}_full.json`;
                }
            }


            const resp = await fetch(url);
            if (!resp.ok) return null;
            const data = await resp.json();
            
            // Kiểm tra nghiêm ngặt features Ngăn dữ liệu rác gây crash
            if (!data || !Array.isArray(data.features)) return null; 

            // --- Sửa lỗi cốt lõi: Ở giai đoạn đánh chặn mạng tầng dưới, phân tách hoàn hảo vùng đất tách rời Thị trấn Đường Cổ Lạp Sơn. ---
            let newFeatures = [];
            data.features.forEach(f => {
                const name = f.properties.name || '';
                // Chặn Châu Hải Tây và Golmud, sử dụng đệ quy để tách ra chính xác
                if ((name.includes('Hải Tây') || name.includes('Cát Nhĩ Mộc')) && f.geometry && f.geometry.type === 'MultiPolygon') {
                    const mainCoords = [];
                    const enclaveCoords = [];
                    
                    f.geometry.coordinates.forEach(p => {
                        let isEnclave = false;
                        // Chỉ cần vĩ độ của bất kỳ điểm nào trên vòng ngoài thấp hơn 35.5, chắc chắn đó là vùng đất tách rời của Thị trấn Đường Cổ Lạp Sơn ở phía nam.
                        const checkLat = (arr) => {
                            if (isEnclave) return;
                            if (typeof arr[0] === 'number') {
                                if (arr[1] < 35.5) isEnclave = true;
                            } else {
                                for (let i = 0; i < arr.length; i++) checkLat(arr[i]);
                            }
                        };
                        checkLat(p);
                        
                        if (isEnclave) enclaveCoords.push(p);
                        else mainCoords.push(p);
                    });
                    
                    if (mainCoords.length > 0) {
                        let mainF = JSON.parse(JSON.stringify(f));
                        mainF.geometry.type = mainCoords.length === 1 ? 'Polygon' : 'MultiPolygon';
                        mainF.geometry.coordinates = mainCoords.length === 1 ? mainCoords[0] : mainCoords;
                        newFeatures.push(mainF);
                    }
                    if (enclaveCoords.length > 0) {
                        let enclaveF = JSON.parse(JSON.stringify(f));
                        enclaveF.properties.name = 'Thị trấn Đường Cổ Lạp Sơn';
                        delete enclaveF.properties.adcode; // Tách rời triệt để adcode Ngăn chặn vòng lặp vô hạn khi đi sâu
                        enclaveF.geometry.type = enclaveCoords.length === 1 ? 'Polygon' : 'MultiPolygon';
                        enclaveF.geometry.coordinates = enclaveCoords.length === 1 ? enclaveCoords[0] : enclaveCoords;
                        newFeatures.push(enclaveF);
                    }
                } else {
                    newFeatures.push(f);
                }
            });
            data.features = newFeatures;
            // ----------------------------------------------------

            geoJsonCache[adcode] = data;
            return data;
        } catch(e) { 
            return null; 
        } finally {
            delete geoJsonPromises[adcode]; // Yêu cầu kết thúc, giải phóng khóa
        }
    })();
    
    return geoJsonPromises[adcode];
}



let mingMapFrame, mingMapLamp, mingMapFrameDocument;
let mingMapIsOpen = false;
let mingMapDragState = null;
let mingMapLampDragMoved = false;
let mingMapLampDragJustEnded = false;

let mingMapChartInstance = null;
let mingMapEchartsReady = false;

// Ghi nhớ lớp và trạng thái viewport
let mingMapCurrentLevel = 'nation'; 
let mingMapCurrentProvince = null;
let mingMapCurrentPrefecture = null;
let mingMapNationGeoJSON = null; 
let mingMapGeoState = null; 
let mingMapPrefectureGeoState = null; 
let mingMapSearchTarget = null; 

// ==========================================
// Trạng thái vị trí nhân vật chính
// ==========================================
let mingMapHeroLocation = null; 
let mingMapLastRawLocation = null;
let mingMapSyncTimer = null;
const mingCountyCenterCache = {}; 


function getFeatureCenter(feature) {
    if (!feature || !feature.geometry) return null;
    
    try {
        // Sửa lỗi cốt lõi: Tính toán lại toàn bộ hình học của[Điểm chính giữa tuyệt đối(Bounding Box Center)]
        // Tránh trường hợp khi các quận huyện thời Minh được hợp nhất từ nhiều quận huyện hiện đại, chấm đỏ sẽ kế thừa trực tiếp trung tâm của các mảnh vỡ rìa. (Gây ra lỗi lệch vị trí xuống góc dưới bên phải v.v.)
        let minLng = 180, maxLng = -180, minLat = 90, maxLat = -90;
        
        // Duyệt đệ quy qua ranh giới tọa độ của tất cả các đa giác, tìm kiếm các ranh giới cực đoan nhất ở trên, dưới, trái, phải.
        const findBounds = (coords) => {
            if (typeof coords[0] === 'number') {
                if (coords[0] < minLng) minLng = coords[0];
                if (coords[0] > maxLng) maxLng = coords[0];
                if (coords[1] < minLat) minLat = coords[1];
                if (coords[1] > maxLat) maxLat = coords[1];
            } else {
                for (let i = 0; i < coords.length; i++) {
                    findBounds(coords[i]);
                }
            }
        };
        
        findBounds(feature.geometry.coordinates);
        
        if (minLng !== 180 && maxLng !== -180) {
            // Lấy giá trị chính giữa ranh giới để đảm bảo canh giữa tuyệt đối về mặt thị giác
            return [(minLng + maxLng) / 2, (minLat + maxLat) / 2];
        }
    } catch(e) {}

    // Nếu hình học không tồn tại hoặc tính toán thất bại, quay về thuộc tính có sẵn của dữ liệu
    if (feature.properties && feature.properties.center) return feature.properties.center;
    if (feature.properties && feature.properties.centroid) return feature.properties.centroid;
    return null;
}

function parseHeroLocation(locStr) {
    if (!locStr) return null;
    if (!mingCountySearchIndex) buildCountyIndex(); 

    let matchedProv = null, matchedFu = null, matchedCounty = null;
    let lng = null, lat = null;

    for (let county in mingCountySearchIndex) {
        let info = mingCountySearchIndex[county][0];
        let cleanCounty = county.replace(/[县州卫堡所]$/, ''); 
        if (locStr.includes(county) || (cleanCounty.length >= 2 && locStr.includes(cleanCounty))) {
            matchedCounty = county;
            matchedProv = info.prov;
            matchedFu = info.fu;
            break;
        }
    }

    if (!matchedFu) {
        for (let prov in mingFuZhouCenters) {
            for (let fu of mingFuZhouCenters[prov]) {
                let cleanFu = fu.name.replace(/[府州卫]$/, '');
                if (locStr.includes(fu.name) || (cleanFu.length >= 2 && locStr.includes(cleanFu))) {
                    matchedFu = fu.name;
                    matchedProv = prov;
                    lng = fu.lng;
                    lat = fu.lat;
                    break;
                }
            }
            if (matchedFu) break;
        }
    } else {
        let fuList = mingFuZhouCenters[matchedProv] || [];
        let fuObj = fuList.find(f => f.name === matchedFu);
        if (fuObj) { lng = fuObj.lng; lat = fuObj.lat; } 
        else {
            let pCenter = mingProvinceCenters[matchedProv];
            if (pCenter) { lng = pCenter[0]; lat = pCenter[1]; }
        }
    }

    if (!matchedProv) {
        for (let prov of Object.keys(mingProvinceColors)) {
            if (locStr.includes(prov)) {
                matchedProv = prov;
                let center = mingProvinceCenters[prov];
                if (center) { lng = center[0]; lat = center[1]; }
                break;
            }
        }
    }

    if (lng && lat) {
        return { raw: locStr, prov: matchedProv, fu: matchedFu, county: matchedCounty, coord: [lng, lat] };
    }
    return null;
}

async function mingMapSyncHeroLocation() {
    // [Sửa chữa cốt lõi]: Tận dụng bộ hẹn giờ 2.5 giây hiện có, để phát hiện trạng thái bộ đệm chấm đỏ theo thời gian thực.
    // Như vậy chỉ cần bảng điều khiển đang mở, chấm đỏ có thể làm mới theo thời gian thực xuyên suốt các trang, không cần phải bật tắt lại bản đồ.
    if (mingMapFrameDocument) {
        const lastSeenVersion = loadMingStorage('last_seen_version', '');
        const updateRedDot = mingMapFrameDocument.getElementById('update-red-dot');
        if (updateRedDot) {
            updateRedDot.style.display = (lastSeenVersion !== MING_MAP_VERSION) ? 'block' : 'none';
        }
    }

    const parentWindow = window.parent ?? window;
    const mvu = parentWindow.Mvu ?? globalThis.Mvu;
    if (!mvu?.getMvuData) return;
    try {
        const latest = mvu.getMvuData({ type: 'message', message_id: 'latest' });
        const loc = latest?.stat_data?.['Thế giới vận hành']?.['Địa điểm hiện tại'];
        if (loc && loc !== mingMapLastRawLocation) {
            mingMapLastRawLocation = loc;
            let tempLoc = parseHeroLocation(loc);
            if (tempLoc) {
                // Tính toán trước tọa độ trung tâm huyện chính xác nhất ở chế độ nền để dùng chung cho bản đồ ba lớp
                if (tempLoc.county) {
                    if (mingCountyCenterCache[tempLoc.county]) {
                        tempLoc.coord = mingCountyCenterCache[tempLoc.county];
                    } else {
                        try {
                            const geoJSON = await buildMingCountyGeoJSON(tempLoc.prov, tempLoc.fu);
                            if (geoJSON && geoJSON.features) {
                                let targetFeature = geoJSON.features.find(x => x.properties.name === tempLoc.county);
                                let exactCenter = getFeatureCenter(targetFeature);
                                if (exactCenter) {
                                    tempLoc.coord = exactCenter;
                                    mingCountyCenterCache[tempLoc.county] = exactCenter;
                                }
                            }
                        } catch(e) {}
                    }
                }
                mingMapHeroLocation = tempLoc;
                if (mingMapIsOpen && mingMapChartInstance) {
                    if (mingMapCurrentLevel === 'nation') renderMingNationMap();
                    else if (mingMapCurrentLevel === 'province') renderMingPrefectureMap(mingMapCurrentProvince);
                    else if (mingMapCurrentLevel === 'prefecture') renderMingCountyMap(mingMapCurrentProvince, mingMapCurrentPrefecture);
                }
            } else {
                mingMapHeroLocation = null;
            }
        }
    } catch(e) {}
}

window.updateMingMapHeroLocation = function(locStr) {
    mingMapLastRawLocation = null; 
    mingMapSyncHeroLocation();
};




// ==========================================
// UI Xây dựng (Iframe Nội bộ)
// ==========================================
function mingMapStyleText() {
    return `
    :root {
        --bg: #0a0e17; --panel-bg: #111827; --border: #1e2d45; --text: #c8d6e5;
        --text-secondary: #8899aa; --accent: #c9a96e; --highlight: #d4af37;
        --btn-bg: #1a2740; --btn-hover: #243550; --shadow: 0 4px 24px rgba(0,0,0,0.5); --radius: 10px;
    }
    * { margin:0; padding:0; box-sizing:border-box; }
    body {
        background: var(--bg); font-family: 'Noto Serif SC', serif;
        overflow: hidden; height: 100vh; width: 100vw; user-select: none;
        touch-action: none;
    }
    #app-container { position:relative; width:100%; height:100%; display:flex; flex-direction:column; }
    
    #header {
        position:absolute; top:0; left:0; right:0; z-index:100; display:flex; 
        align-items:center; justify-content:space-between; padding:14px 24px; pointer-events:none;
    }
    .header-actions { pointer-events:auto; display:flex; gap: 10px; flex-shrink: 0; }
    
    /* Đồng nhất chiều cao các nút ở trên cùng, nút quay lại có dạng hình viên nang */
    .header-btn {
        background:var(--btn-bg); border:1px solid var(--border); color:var(--text); 
        height: 36px; padding: 0 14px; border-radius: 18px; cursor:pointer; font-size:0.9rem; 
        transition:all 0.25s; box-shadow:var(--shadow); display:flex; align-items:center; justify-content:center;
    }
    .header-btn:hover { background:var(--btn-hover); color:#e8d5a3; border-color:var(--accent); }
    /* Ép nút đóng thành hình tròn hoàn hảo */
    .header-btn.icon-btn { width: 36px; padding: 0; border-radius: 50%; font-size: 1.1rem; }
    
    /* Cảnh báo chấm đỏ ở nút nhật ký */
    .log-btn-wrapper { position: relative; display: inline-flex; align-items: center; }
    .red-dot {
        position: absolute; top: -2px; right: -8px; width: 8px; height: 8px;
        background-color: #e74c3c; border-radius: 50%; display: none;
        box-shadow: 0 0 6px rgba(231, 76, 60, 0.8);
    }

    /* Điều hướng breadcrumb và tối ưu chống xuống dòng trên thiết bị di động */
    #breadcrumb-wrapper {
        display:flex; align-items:center; gap:8px;
        background:rgba(17, 24, 39, 0.85); border:1px solid var(--border);
        border-radius: 20px; padding: 8px 16px; box-shadow:var(--shadow); font-size:0.9rem;
        pointer-events:auto; backdrop-filter: blur(4px);
        max-width: calc(100vw - 150px);
        overflow-x: auto; scrollbar-width: none; -ms-overflow-style: none;
    }
    #breadcrumb-wrapper::-webkit-scrollbar { display: none; }
    #breadcrumb { display:flex; align-items:center; gap:8px; flex-wrap: nowrap; white-space: nowrap; }
    .crumb { color:var(--accent); cursor:pointer; flex-shrink: 0; }
    .crumb.current { color:#e8d5a3; font-weight:bold; cursor:default; }
    .separator { flex-shrink: 0; }

    /* Kết hợp hộp tìm kiếm và danh sách thả xuống */
    #top-bar {
        position:absolute; top:66px; left:24px; right:24px; z-index:100;
        display:flex; justify-content:flex-end; align-items:flex-start;
        pointer-events:none;
    }
    #search-wrapper { position: relative; margin-left: auto; pointer-events: auto; }
    
    /* Chiều cao hộp tìm kiếm bằng với nút đóng（36px），Chiều rộng khi thu gọn cũng là 36px Hình tròn đều */
    #search-box {
        display:flex; align-items:center; background:rgba(17, 24, 39, 0.85); 
        border:1px solid var(--border); border-radius: 18px; height: 36px; padding: 0 6px;
        box-shadow:var(--shadow); backdrop-filter: blur(4px);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        overflow: hidden; cursor: pointer;
    }
    #search-box:hover, #search-box:focus-within { border-color: var(--highlight); }
    #search-box:hover #map-search-btn { color: var(--highlight); }

    #search-box.expanded { padding: 0 14px; cursor: default; background:rgba(17, 24, 39, 0.95); }
    #map-search-input {
        background:transparent; border:none; color:var(--text); outline:none; 
        font-family:inherit; width: 0; opacity: 0; font-size:0.85rem;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        padding: 0; margin: 0; pointer-events: none;
    }
    #map-search-input::placeholder { color: #5a6b82; }
    #search-box.expanded #map-search-input { width: 140px; opacity: 1; margin-right: 6px; pointer-events: auto; }
    
    #map-search-btn {
        background:transparent; border:none; color:var(--accent); cursor:pointer; 
        font-size:1.1rem; outline: none; transition: transform 0.2s;
        display: flex; align-items: center; justify-content: center;
        width: 24px; height: 24px; flex-shrink: 0;
    }
    #map-search-btn:active { transform: scale(0.85); }
    
    #search-suggestions {
        position: absolute; top: calc(100% + 8px); right: 0; width: max-content; 
        min-width: 180px; max-width: 60vw; max-height: 280px; overflow-y: auto; 
        background: rgba(17, 24, 39, 0.95); border: 1px solid var(--border); 
        border-radius: 12px; box-shadow: 0 8px 32px rgba(0,0,0,0.8);
        backdrop-filter: blur(8px); list-style: none; padding: 6px 0; margin: 0;
        z-index: 200; display: none; flex-direction: column;
        touch-action: pan-y; overscroll-behavior: contain;
    }
    #search-suggestions li {
        padding: 10px 16px; font-size: 0.85rem; color: var(--text);
        cursor: pointer; transition: background 0.2s;
        border-bottom: 1px solid rgba(255,255,255,0.05);
        display: flex; flex-direction: column;
    }
    #search-suggestions li:last-child { border-bottom: none; }
    #search-suggestions li:hover, #search-suggestions li:active { background: rgba(212, 175, 55, 0.15); }
    .sugg-title { font-weight: bold; color: #e8d5a3; font-size: 0.9rem; }
    .sugg-desc { font-size: 0.7rem; color: #8899aa; margin-top: 4px; }

    #map-controls { position: absolute; right: 24px; top: 110px; z-index: 100; display: flex; flex-direction: column; gap: 10px; pointer-events: none; }
    .ctrl-btn {
        width: 36px; height: 36px; background: rgba(17, 24, 39, 0.85);
        border: 1px solid var(--border); border-radius: 50%; color: var(--text);
        display: flex; align-items: center; justify-content: center;
        font-size: 1.2rem; cursor: pointer; box-shadow: var(--shadow);
        pointer-events: auto; backdrop-filter: blur(4px); transition: all 0.2s;
    }
    .ctrl-btn:active { transform: scale(0.9); background: var(--btn-hover); }
    .ctrl-btn:hover { color: var(--highlight); border-color: var(--highlight); }
    .ctrl-btn.locate-btn { margin-top: 10px; color: #e74c3c; font-size: 1.3rem; }

    #map-container { flex:1; width:100%; height:100%; }
    #map-chart { width:100%; height:100%; }
    
    #legend-panel {
        position:absolute; bottom:24px; left:24px; z-index:100;
        background: rgba(17, 24, 39, 0.95); border: 1px solid #1e2d45; border-radius: 12px; 
        box-shadow: 0 6px 28px rgba(0,0,0,0.6); max-height: 300px; min-width: 150px; backdrop-filter: blur(4px);
        display: flex; flex-direction: column; overflow: hidden; transition: max-height 0.3s ease;
    }
    #legend-panel.collapsed { max-height: 46px; }
    #legend-header { padding: 12px 16px; display: flex; justify-content: space-between; align-items: center; cursor: pointer; border-bottom: 2px solid transparent; }
    #legend-panel:not(.collapsed) #legend-header { border-bottom-color: #d4af37; }
    #legend-header h4 { font-size: 0.95rem; font-weight: bold; color: #ffffff; margin: 0; letter-spacing: 2px; }
    #legend-toggle-icon { color: #d4af37; font-size: 0.8rem; transition: transform 0.3s ease; }
    #legend-panel:not(.collapsed) #legend-toggle-icon { transform: rotate(180deg); }
    #legend-list-wrapper { padding: 10px 16px 16px 16px; overflow-y: auto; flex: 1; touch-action: pan-y; overscroll-behavior: contain; }
    #legend-list-wrapper::-webkit-scrollbar { width: 6px; }
    #legend-list-wrapper::-webkit-scrollbar-track { background: transparent; }
    #legend-list-wrapper::-webkit-scrollbar-thumb { background: #3a5070; border-radius: 3px; }
    #legend-list-wrapper::-webkit-scrollbar-thumb:hover { background: #d4af37; }
    #legend-list { list-style: none; display: flex; flex-direction: column; gap: 6px; }
    #legend-list li { display: flex; align-items: center; gap: 8px; font-size: 0.8rem; color: #ffffff; padding: 4px 8px; border-radius: 5px; cursor: pointer; }
    #legend-list li:hover { background: rgba(212, 175, 55, 0.15); }
    .legend-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; border: 1px solid rgba(255,255,255,0.4); }

    /* Cập nhật giao diện cửa sổ nhật ký */
    #update-modal {
        display: none; position: absolute; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.6); z-index: 300; justify-content: center; align-items: center;
        pointer-events: auto; backdrop-filter: blur(2px);
    }
    .update-panel {
        background: var(--panel-bg); border: 1px solid var(--highlight); border-radius: 12px;
        width: 85%; max-width: 450px; padding: 20px; box-shadow: var(--shadow); position: relative;
        display: flex; flex-direction: column;
    }
    .update-panel h3 { color: var(--highlight); margin-bottom: 15px; text-align: center; font-size: 1.1rem; }
    .update-content { color: var(--text); font-size: 0.9rem; line-height: 1.6; max-height: 50vh; overflow-y: auto; padding-right: 8px; }
    .update-content::-webkit-scrollbar { width: 4px; }
    .update-content::-webkit-scrollbar-thumb { background: #3a5070; border-radius: 2px; }

    /* Tương thích căn chỉnh hoàn hảo trên di động */
    @media (max-width: 768px) {
        #header { padding: 10px 12px; }
        #breadcrumb-wrapper { padding: 6px 12px; font-size: 0.8rem; max-width: calc(100vw - 130px); }
        #breadcrumb { gap: 4px; }
        .header-actions { gap: 8px; }
        
        /* Giao diện di động đồng loạt hạ xuống mức 34px Hình tròn */
        .header-btn { height: 34px; padding: 0 12px; font-size: 0.85rem; border-radius: 17px; }
        .header-btn.icon-btn { width: 34px; font-size: 1rem; border-radius: 50%; }
        
        #top-bar { top: 56px; left: 12px; right: 12px; }
        #search-box { height: 34px; padding: 0 5px; border-radius: 17px; }
        #search-box.expanded { padding: 0 12px; }
        #search-box.expanded #map-search-input { width: 120px; }
        #map-search-btn { width: 24px; height: 24px; font-size: 1rem; }
        
        #map-controls { right: 12px; top: 100px; gap: 8px; }
        .ctrl-btn { width: 34px; height: 34px; font-size: 1.1rem; border-radius: 50%; }
        
        #legend-panel { bottom: 16px; left: 12px; min-width: 130px; }
    }
    `;
}




function renderMingMapPanelHTML() {
    return `
    <div id="app-container">
        <div id="header">
            <div id="breadcrumb-wrapper">
                <span class="log-btn-wrapper" style="margin-right:4px;">
                    <span class="crumb" data-action="show-update" title="Xem nhật ký cập nhật" style="cursor:pointer; color:var(--highlight);">Nhật ký</span>
                    <span class="red-dot" id="update-red-dot"></span>
                </span>
                <span class="separator" style="color:var(--text-secondary); margin-right:4px;">|</span>
                <div id="breadcrumb"><span class="crumb current" data-action="back-nation">🌏 Thiên hạ</span></div>
            </div>
            <div class="header-actions">
                <button class="header-btn" id="back-btn" data-action="back-nation" style="display:none;" title="Trở về cấp trên">← Quay lại</button>
                <!-- Ở đây đã thêm icon-btn Bắt buộc hình tròn hoàn hảo -->
                <button class="header-btn icon-btn" data-action="close" title="Thu gọn bản đồ">✖</button>
            </div>
        </div>
        <div id="top-bar">
            <div id="search-wrapper">
                <div id="search-box">
                    <input type="text" id="map-search-input" placeholder="Tìm tỉnh/Phủ Châu/Quận Huyện..." autocomplete="off">
                    <button id="map-search-btn" data-action="search" data-mode="search" title="Tìm kiếm">🔍</button>
                </div>
                <ul id="search-suggestions"></ul>
            </div>
        </div>
        
        <div id="map-controls">
            <div class="ctrl-btn" data-action="zoom-in" title="Phóng to">＋</div>
            <div class="ctrl-btn" data-action="reset" title="Đặt lại tầm nhìn">↺</div>
            <div class="ctrl-btn" data-action="zoom-out" title="Thu nhỏ">－</div>
            <div class="ctrl-btn locate-btn" data-action="locate-hero" title="Định vị nhân vật chính">🎯</div>
            <div class="ctrl-btn" id="mode-toggle-btn" data-action="toggle-mode" title="Chuyển đổi chế độ(Hiện tại:Lớp đơn)" style="margin-top:10px; font-size:1.1rem; color:#8899aa;">🗺️</div>
        </div>
        
        <div id="map-container"><div id="map-chart"></div></div>
        <div id="legend-panel" class="collapsed">
            <div id="legend-header" data-action="toggle-legend">
                <h4>📜 Chú giải</h4>
                <span id="legend-toggle-icon">▲</span>
            </div>
            <div id="legend-list-wrapper"><ul id="legend-list"></ul></div>
        </div>
        
        <!-- Cửa sổ nhật ký cập nhật -->
        <div id="update-modal">
            <div class="update-panel">
                <button class="header-btn icon-btn" data-action="close-update" style="position:absolute; top:12px; right:12px;">✖</button>
                <h3>📢 Nhật ký cập nhật</h3>
                <div class="update-content">
                    <!-- ================================== -->
                    <!-- 👇Bạn có thể sửa nội dung nhật ký cập nhật tại đây👇 -->
                    <p><b>[7.24 Cập nhật] ：</b></p>
                    <p>1、Thêm bản đồ toàn cảnh, chuyển đổi bằng nút bên phải, lần sử dụng đầu tiên sẽ mất một chút thời gian tải, nhấp đúp vào khu vực để quay lại.</p>
                    <p>2、Thêm bản đồ nước ngoài</p>
                    <p>3、Bản đồ mới của lão Thái Thạch tạm thời chưa tương thích<img src="https://cdn.jsdelivr.net/gh/fairta/pic@main/img/2026/07/20260724203844218-39c93f.webp" alt="" width="20" height="20"></p>

                    <p><b>[7.22 Cập nhật] ：</b></p>
                    <p>1、Bản đồ trực tuyến trên đám mây, sau này không cần tải lại để cập nhật</p>
                    <p>2、Thêm bản đồ Nhật Bản, Triều Tiên, trong đó bản đồ Triều Tiên chỉ mang tính tham khảo do có sai lệch lớn so với hiện tại.</p>

                    <p><b>[7.20 Cập nhật] ：</b></p>
                    <p>1、Tối ưu hóa việc sử dụng trên thiết bị di động</p>
                    <p>2、Thêm dữ liệu lớp thứ hai, lớp thứ ba của một số khu vực</p>
                    <p>3、Sửa tên thành phố và các lỗi đã biết bug</p>
                    <p>4、Tối ưu hóa chức năng tìm kiếm</p>  

                    <p><b>[7.18 Cập nhật] ：</b></p>
                    <p>1、Thêm vị trí nhân vật chính</p>
                    <p>2、Tối ưu chức năng tìm kiếm, thêm tính năng gập chú giải</p>
                    <p>3、Xóa tên thành phố bị trùng lặp</p>
                    <p>4、Bản đồ 3 cấp: cấp 1 tỉnh, cấp 2 châu phủ vệ, cấp 3 huyện. Bản đồ chỉ mang tính chất tham khảo, được chỉnh sửa từ bản đồ hiện đại nên sẽ có sai lệch so với bản đồ cuối thời Minh thực tế.。</p>

                    <!-- ================================== -->
                </div>
            </div>
        </div>
    </div>`;
}





function writeMingMapFrameDocument() {
    mingMapFrameDocument.open();
    mingMapFrameDocument.write(`<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><style>${mingMapStyleText()}</style></head><body>${renderMingMapPanelHTML()}</body></html>`);
    mingMapFrameDocument.close();
}


// ==========================================
// [Bản vá lỗi xung đột trùng tên]: Ưu tiên xử lý các khu vực nội thành bị chồng lấp
// ==========================================
const preciseCountyMap = {
    'Thành phố Thạch Gia Trang': { 'Quận Trường An': 'Huyện Chân Định', 'Quận Tân Hoa': 'Huyện Chân Định', 'Quận Kiều Tây': 'Huyện Chân Định' },
    'Thành phố Tế Nam': { 'Quận Thị Trung': 'Huyện Lịch Thành' }, 'Thành phố Tảo Trang': { 'Quận Thị Trung': 'Huyện Dịch', 'Quận Tiết Thành': 'Huyện Đằng' },
    'Thành phố Tế Ninh': { 'Quận Thị Trung': 'Châu Tế Ninh' }, 'Thành phố Nội Giang': { 'Quận Thị Trung': 'Huyện Nội Giang' }, 'Thành phố Lạc Sơn': { 'Quận Thị Trung': 'Huyện Lạc Sơn' },
    'Thành phố Thiên Tân': { 'Quận Hòa Bình': 'Huyện Tĩnh Hải' }, 'Thành phố Thẩm Dương': { 'Quận Hòa Bình': 'Thẩm Dương Trung Vệ', 'Quận Thiết Tây': 'Thẩm Dương Trung Vệ' },
    'Thành phố Bắc Kinh': { 'Quận Triều Dương': 'Huyện Đại Hưng' }, 'Thành phố Trường Xuân': { 'Quận Triều Dương': 'Khoan Thành Tây Doanh' },
    'Thành phố An Sơn': { 'Quận Thiết Tây': 'Liêu Dương Vệ', 'Quận Thiết Đông': 'Liêu Dương Vệ' }, 'Thành phố Tứ Bình': { 'Quận Thiết Tây': 'Diệp Hách Tây Thành', 'Quận Thiết Đông': 'Diệp Hách Đông Thành' },
    'Thành phố Hô Hòa Hạo Đặc': { 'Quận Tân Thành': 'Quy Hóa Bắc Doanh' }, 'Thành phố Tây An': { 'Quận Tân Thành': 'Huyện Trường An', 'Quận Trường An': 'Huyện Trường An' },
    'Thành phố Lan Châu': { 'Quận Thành Quan': 'Lan Châu' }, 'Thành phố Lhasa (Lạp Tát)': { 'Quận Thành Quan': 'Lạp Tát' },
    'Thành phố Nam Kinh': { 'Quận Cổ Lâu': 'Huyện Thượng Nguyên' }, 'Thành phố Từ Châu': { 'Quận Cổ Lâu': 'Từ Châu' },
    'Thành phố Khai Phong': { 'Quận Cổ Lâu': 'Huyện Tường Phù' }, 'Thành phố Phúc Châu': { 'Quận Cổ Lâu': 'Huyện Mân' },
    'Thành phố Quảng Châu': { 'Quận Bạch Vân': 'Huyện Phiên Ngung', 'Quận Nam Sa': 'Huyện Đông Quản' }, 'Thành phố Quý Dương': { 'Quận Bạch Vân': 'Huyện Tân Quý' },
    'Thành phố Tam Sa': { 'Quận Nam Sa': 'Vạn Châu', 'Quận Tây Sa': 'Vạn Châu' }, 'Thành phố Đại Liên': { 'Quận Trung Sơn': 'Kim Châu Vệ' },
    'Thành phố Thâm Quyến': { 'Quận Nam Sơn': 'Huyện Tân An', 'Quận Long Hoa': 'Huyện Tân An' }, 'Thành phố Hạc Cương': { 'Quận Nam Sơn': 'Hạc Cương Nam Doanh', 'Quận Hướng Dương': 'Hướng Dương Bảo' },
    'Thành phố Giai Mộc Tư': { 'Quận Hướng Dương': 'Hợp Giang Trung Doanh', 'Quận Ngoại ô': 'Giai Mộc Tư Bảo' }, 'Thành phố Hải Khẩu': { 'Quận Long Hoa': 'Huyện Quỳnh Sơn' },
    'Thành phố Dương Tuyền': { 'Quận Thành': 'Châu Bình Định', 'Khu mỏ': 'Châu Bình Định', 'Quận Ngoại ô': 'Châu Bình Định' },
    'Thành phố Tấn Thành': { 'Quận Thành': 'Trạch Châu' }, 'Thành phố Sán Vĩ': { 'Quận Thành': 'Huyện Hải Phong' }, 'Thành phố Đồng Lăng': { 'Quận Ngoại ô': 'Huyện Đồng Lăng' },
    'Thành phố Liên Vân Cảng': { 'Quận Hải Châu': 'Hải Châu', 'Quận Liên Vân': 'Hải Châu' }, 'Thành phố Phụ Tân': { 'Quận Hải Châu': 'Quảng Ninh hậu đồn vệ' },
    'Thành phố Thượng Hải': { 'Quận Bảo Sơn': 'Huyện Gia Định', 'Quận Phổ Đà': 'Huyện Thượng Hải' }, 'Thành phố Song Áp Sơn': { 'Quận Bảo Sơn': 'Bảo Bảo Sơn' },
    'Thành phố Chu Sơn': { 'Quận Phổ Đà': 'Huyện Định Hải' }, 'Thành phố Liêu Nguyên': { 'Quận Tây An': 'Cáp Đạt Đông Doanh' },
    'Thành phố Mẫu Đơn Giang': { 'Quận Tây An': 'Ninh Cổ Tháp nam doanh', 'Quận Đông An': 'Ninh Cổ Tháp tây doanh' },
    'Thành phố Thương Châu': { 'Quận Tân Hoa': 'Thương Châu' }, 'Thành phố Bình Đỉnh Sơn': { 'Quận Tân Hoa': 'Nhữ Châu' }, 'Thành phố An Dương': { 'Quận Văn Phong': 'Huyện An Dương' },
    'Thành phố Cát Lâm': { 'Quận Long Đàm': 'Long Đàm Yamashiro' }, 'Thành phố Tề Tề Cáp Nhĩ': { 'Quận Kiến Hoa': 'Vệ Giả Trần' }, 'Thành phố Thất Đài Hà': { 'Quận Tân Hưng': 'Bảo Tân Hưng' },
    'Thành phố Thiết Lĩnh': { 'Quận Thanh Hà': 'Vệ Thiết Lĩnh' }, 'Thành phố Trương Gia Khẩu': { 'Quận Kiều Đông': 'Trấn Tuyên Phủ', 'Quận Kiều Tây': 'Trấn Tuyên Phủ' },
    'Thành phố Toại Ninh': { 'Quận Thuyền Sơn': 'Huyện Toại Ninh', 'Quận An Cư': 'Huyện Toại Ninh' }, 'Thành phố Bạch Sơn': { 'Quận Giang Nguyên': 'Trường Bạch Sơn Bộ' },
    'Thành phố Hứa Xương': { 'Quận Kiến An': 'Hứa Châu' }, 'Thành phố Nam Ninh': { 'Quận Thanh Tú': 'Huyện Tuyên Hóa' }, 'Thành phố Bách Sắc': { 'Quận Hữu Giang': 'Điền Châu' },
    'Thành phố Hà Nguyên': { 'Quận Nguyên Thành': 'Huyện Hà Nguyên' }, 'Thành phố Mã An Sơn': { 'Quận Vũ Sơn': 'Huyện Đương Đồ' },
    'Thành phố Liễu Châu': { 'Quận Thành Trung': 'Huyện Mã Bình' }, 'Thành phố Tây Ninh': { 'Quận Thành Đông': 'Vệ Tây Ninh', 'Quận Thành Trung': 'Vệ Tây Ninh', 'Quận Thành Tây': 'Vệ Tây Ninh', 'Quận Thành Bắc': 'Vệ Tây Ninh' }
};




// ==========================================
// Logic tìm kiếm (Bao gồm chỉ mục suy luận tự động khi đi sâu ba cấp)
// ==========================================
let mingCountySearchIndex = null;

// Hàm tìm kiếm an toàn có tiền tố cấp thành phố, đồng thời thêm xác minh cuối cùng để chống lỗi sai lệch dữ liệu
function getMingCountyName(modernCity, modernCounty, currentMingProv, currentMingFu) {
    // 1. Ưu tiên sử dụng mapping phân chia chi tiết (Giải quyết các quận huyện trùng tên, chẳng hạn như nhiều thành phố có "Quận Trường An",“Quận Tân Hoa”)
    if (preciseCountyMap[modernCity] && preciseCountyMap[modernCity][modernCounty]) {
        return preciseCountyMap[modernCity][modernCounty];
    }
    
    // 2. Tra cứu từ điển mapping chung toàn cục
    let mappedName = modernCountyToMingCounty[modernCounty];
    if (mappedName) {
        // Loại bỏ kiểm tra chống chéo đài vốn có thể gây lỗi nhầm, chỉ cần có trong từ điển là dùng ngay, đảm bảo là địa danh thời Minh.
        return mappedName; 
    }
    
    // 3. [Biện pháp dự phòng chống rò rỉ cuối cùng]
    // Đối với bất kỳ quận huyện hiện đại nào chưa được ghi trong từ điển (Hoặc khu vực mới được phân chia),
    // Tuyệt đối không trả về tên hiện đại gốc (Như xx khu, Thành phố Thâm Quyến, v.v.), Mà là buộc hạ cấp và gộp vào phủ hiện tại/Khu vực trực thuộc châu.
    // Điều này sẽ ngăn chặn 100% từ vựng thành phố hiện đại xuất hiện trên bản đồ.
    return currentMingFu; 
}



// Hàm phụ trợ: Tra cứu ngược tên tỉnh từ tên phủ
function getMingProvOfFu(fuName) {
    for (let p in mingFuZhouCenters) {
        if (mingFuZhouCenters[p].some(f => f.name === fuName)) return p;
    }
    return null;
}

// Xây dựng động chỉ mục ngược của lớp thứ ba (quận huyện) (Phiên bản nâng cao độ chuẩn xác + Hỗ trợ tìm kiếm tiếng Nhật, Hàn, Lưu Cầu, Trung)
function buildCountyIndex() {
    if (mingCountySearchIndex) return;
    mingCountySearchIndex = {};
    
    // Quan trọng: Trước khi xây dựng chỉ mục, loại bỏ các khóa cấp quận huyện trùng tên trong từ điển gốc dễ dẫn đến bay loạn và chéo đài.
    const duplicateKeys = ['Quận Thị Trung','Quận Hòa Bình','Quận Triều Dương','Quận Thiết Tây','Quận Thiết Đông','Quận Tân Thành','Quận Thành Quan','Quận Cổ Lâu','Quận Bạch Vân','Quận Nam Sơn','Quận Nam Sa','Quận Long Hoa','Quận Thành','Khu mỏ','Quận Ngoại ô','Quận Hải Châu','Quận Bảo Sơn','Quận Phổ Đà','Quận Tây An','Quận Hướng Dương','Quận Tân Hoa','Quận Kiều Đông','Quận Kiều Tây','Quận Văn Phong','Quận Kiến Hoa','Quận Tân Hưng','Quận Thanh Hà','Quận Long Đàm','Quận Trường An','Quận Đông An','Quận Giang Nguyên','Quận Liên Vân','Quận Kiến An','Quận Thuyền Sơn','Quận An Cư','Quận Nguyên Thành','Quận Hữu Giang','Quận Thanh Tú','Quận Vũ Sơn', 'Quận Thành Trung', 'Quận Thành Đông', 'Quận Thành Tây', 'Quận Thành Bắc'];
    duplicateKeys.forEach(k => delete modernCountyToMingCounty[k]);
    
    let currentProv = null;
    let currentFu = null;

    const anchorMap = {
        'Quận Đông Thành': { prov: 'Bắc Trực Lệ', fu: 'Thuận Thiên Phủ' }, 'Quận Hòa Bình': { prov: 'Bắc Trực Lệ', fu: 'Hà Gian Phủ' },
        'Quận Bắc Thần': { prov: 'Bắc Trực Lệ', fu: 'Thuận Thiên Phủ' }, 'Khu mới Tân Hải': { prov: 'Bắc Trực Lệ', fu: 'Hà Gian Phủ' }, 
        'Quận Ninh Hà': { prov: 'Bắc Trực Lệ', fu: 'Thuận Thiên Phủ' }, 'Quận Tĩnh Hải': { prov: 'Bắc Trực Lệ', fu: 'Hà Gian Phủ' }, 
        'Quận Kế Châu': { prov: 'Bắc Trực Lệ', fu: 'Thuận Thiên Phủ' },
        'Thành phố Thạch Gia Trang': { prov: 'Bắc Trực Lệ', fu: 'Chân Định Phủ' }, 'Thành phố Thái Nguyên': { prov: 'Sơn Tây', fu: 'Phủ Thái Nguyên' },
        'Thành phố Thẩm Dương': { prov: 'Liêu Đông', fu: 'Thẩm Dương Trung Vệ' }, 'Quận Hoàng Phố': { prov: 'Nam Trực Lệ', fu: 'Phủ Tùng Giang' },
        'Thành phố Nam Kinh': { prov: 'Nam Trực Lệ', fu: 'Phủ Ứng Thiên' }, 'Thành phố Hàng Châu': { prov: 'Chiết Giang', fu: 'Phủ Hàng Châu' },
        'Thành phố Hợp Phì': { prov: 'Nam Trực Lệ', fu: 'Phủ Lư Châu' }, 'Thành phố Phúc Châu': { prov: 'Phúc Kiến', fu: 'Phủ Phúc Châu' },
        'Thành phố Nam Xương': { prov: 'Giang Tây', fu: 'Phủ Nam Xương' }, 'Thành phố Tế Nam': { prov: 'Sơn Đông', fu: 'Phủ Tế Nam' },
        'Thành phố Trịnh Châu': { prov: 'Hà Nam', fu: 'Phủ Khai Phong' }, 'Thành phố Vũ Hán': { prov: 'Hồ Quảng', fu: 'Phủ Vũ Xương' },
        'Thành phố Trường Sa': { prov: 'Hồ Quảng', fu: 'Phủ Trường Sa' }, 'Thành phố Quảng Châu': { prov: 'Quảng Đông', fu: 'Phủ Quảng Châu' },
        'Thành phố Nam Ninh': { prov: 'Quảng Tây', fu: 'Phủ Nam Ninh' }, 'Thành phố Hải Khẩu': { prov: 'Quảng Đông', fu: 'Phủ Quỳnh Châu' },
        'Quận Du Trung': { prov: 'Tứ Xuyên', fu: 'Phủ Trùng Khánh' }, 'Thành phố Thành Đô': { prov: 'Tứ Xuyên', fu: 'Phủ Thành Đô' },
        'Thành phố Quý Dương': { prov: 'Quý Châu', fu: 'Phủ Quý Dương' }, 'Thành phố Côn Minh': { prov: 'Vân Nam', fu: 'Phủ Vân Nam' },
        'Thành phố Lhasa (Lạp Tát)': { prov: 'Ô Tư Tạng', fu: 'Ô Tư Tạng' }, 'Thành phố Tây An': { prov: 'Thiểm Tây', fu: 'Phủ Tây An' },
        'Thành phố Lan Châu': { prov: 'Thiểm Tây', fu: 'Phủ Lâm Thao' }, 'Thành phố Tây Ninh': { prov: 'Thiểm Tây', fu: 'Tây Ninh Vệ' },
        'Thành phố Ngân Xuyên': { prov: 'Ninh Hạ', fu: 'Ninh Hạ Vệ' }, 'Quận Trung Tây': { prov: 'Quảng Đông', fu: 'Phủ Quảng Châu' },
        'Phường Hoa Địa Mã': { prov: 'Quảng Đông', fu: 'Phủ Quảng Châu' }
    };

    for (let modernName in modernCountyToMingCounty) {
        let mingCountyName = modernCountyToMingCounty[modernName];

        if (anchorMap[modernName]) {
            currentProv = anchorMap[modernName].prov;
            currentFu = anchorMap[modernName].fu;
        } else if (modernCityToMingFu[modernName]) {
            currentFu = modernCityToMingFu[modernName];
            currentProv = getMingProvOfFu(currentFu);
        }

        let overriddenFu = null;
        for (let city in citySplitConfig) {
            if (citySplitConfig[city].mapping[modernName]) {
                overriddenFu = citySplitConfig[city].mapping[modernName];
                break;
            }
        }
        
        let actualFu = overriddenFu || currentFu;
        let actualProv = overriddenFu ? getMingProvOfFu(overriddenFu) : currentProv;

        if (actualProv && actualFu) {
            if (!mingCountySearchIndex[mingCountyName]) mingCountySearchIndex[mingCountyName] = [];
            if (!mingCountySearchIndex[mingCountyName].some(item => item.prov === actualProv && item.fu === actualFu)) {
                mingCountySearchIndex[mingCountyName].push({ prov: actualProv, fu: actualFu });
            }
        }
    }
    
    // Cơ chế bù đắp: Trực tiếp bù đắp lại các quận huyện chính xác đã loại bỏ vào chỉ mục tìm kiếm, đảm bảo sự hoàn hảo không bị thiếu sót.
    for (let city in preciseCountyMap) {
        let fuName = modernCityToMingFu[city] || modernProvinceDefaultFu[modernToMingProvince[city]];
        for (let modernName in preciseCountyMap[city]) {
            let overrideFu = citySplitConfig[city]?.mapping[modernName] || null;
            let actualFu = overrideFu || fuName;
            let actualProv = overrideFu ? getMingProvOfFu(actualFu) : getMingProvOfFu(fuName);
            if (!actualProv) {
                for (let p in modernProvinceDefaultFu) {
                    if (modernProvinceDefaultFu[p] === actualFu) actualProv = modernToMingProvince[p];
                }
            }
            let mCounty = preciseCountyMap[city][modernName];
            if (actualProv && actualFu) {
                if (!mingCountySearchIndex[mCounty]) mingCountySearchIndex[mCounty] = [];
                if (!mingCountySearchIndex[mCounty].some(item => item.prov === actualProv && item.fu === actualFu)) {
                    mingCountySearchIndex[mCounty].push({ prov: actualProv, fu: actualFu });
                }
            }
        }
    }

    // ==============================================================
    // [Bổ sung cốt lõi: Mạnh mẽ thêm vào tìm kiếm tiếng Trung hiện đại các địa danh lịch sử Nhật Bản, Hàn Quốc, Lưu Cầu.]
    // Khắc phục sự cố không thể định vị bản đồ nước ngoài qua tìm kiếm bằng tiếng Trung
    // ==============================================================
    const eastAsiaSearchData = [
        // Lệnh chế quốc trong lịch sử Nhật Bản
        { prov: 'Nhật Bản', fu: 'Kinai', counties: ['Yamashiro', 'Yamato', 'Settsu', 'Hà Nội', 'Izumi'] },
        { prov: 'Nhật Bản', fu: 'Tokaido', counties: ['Iga', 'Ise', 'Shima', 'Owari', 'Mikawa', 'Totomi', 'Suruga', 'Izu', 'Kai', 'Sagami', 'Musashi', 'Awa', 'Kazusa', 'Shimosa', 'Hitachi'] },
        { prov: 'Nhật Bản', fu: 'Tosando', counties: ['Omi', 'Mino', 'Hida', 'Shinano', 'Kozuke', 'Shimotsuke', 'Mutsu', 'Dewa'] },
        { prov: 'Nhật Bản', fu: 'Hokurikudo', counties: ['Wakasa', 'Echizen', 'Kaga', 'Noto', 'Etchu', 'Echigo', 'Sado'] },
        { prov: 'Nhật Bản', fu: 'Sanindo', counties: ['Tamba', 'Tango', 'Tajima', 'Inaba', 'Hoki', 'Izumo', 'Iwami', 'Oki'] },
        { prov: 'Nhật Bản', fu: 'Sanyodo', counties: ['Harima', 'Mimasaka', 'Bizen', 'Bitchu', 'Bingo', 'Aki', 'Suo', 'Nagato'] },
        { prov: 'Nhật Bản', fu: 'Nankaido', counties: ['Kii', 'Awaji', 'Awa', 'Sanuki', 'Iyo', 'Tosa'] },
        { prov: 'Nhật Bản', fu: 'Saikaido', counties: ['Chikuzen', 'Chikugo', 'Buzen', 'Bungo', 'Hizen', 'Higo', 'Hyuga', 'Osumi', 'Satsuma', 'Iki', 'Tsushima'] },
        { prov: 'Nhật Bản', fu: 'Ezo', counties: ['Ezo'] },
        
        // Các đại đô hộ phủ, mục, quận của Triều Tiên Bát Đạo
        { prov: 'Triều Tiên', fu: 'Gyeonggi-do', counties: ['Phủ Hán Thành', 'Phủ Kaesong', 'Đô hộ phủ Incheon', 'Gimpo-gun', 'Đô hộ phủ Bupyeong', 'Huyện Geumcheon', 'Huyện Ansan', 'Huyện Gwacheon', 'Đô hộ phủ Suwon', 'Đô hộ phủ Namyang', 'Phủ Gwangju', 'Huyện Yongin', 'Đô hộ phủ Icheon', 'Huyện Anseong', 'Huyện Jinwi', 'Huyện Goyang', 'Mục Paju', 'Mục Yangju', 'Huyện Gapyeong', 'Mục Yeoju', 'Huyện Yanggeun', 'Huyện Pocheon', 'Huyện Yeoncheon', 'Đô hộ phủ Ganghwa'] },
        { prov: 'Triều Tiên', fu: 'Gangwon-do', counties: ['Đô hộ phủ Chuncheon', 'Huyện Hwacheon', 'Huyện Yanggu', 'Huyện Inje', 'Mục Wonju', 'Huyện Hoengseong', 'Huyện Pyeongchang', 'Huyện Yeongwol', 'Huyện Jeongseon', 'Đại đô hộ phủ Gangneung', 'Đô hộ phủ Samcheok', 'Đô hộ phủ Yangyang', 'Huyện Ganseong', 'Huyện Hongcheon', 'Đô hộ phủ Cheorwon', 'Đô hộ phủ Anbyeon', 'Huyện Pyeonggang', 'Huyện Tongcheon', 'Huyện Goseong', 'Huyện Icheon', 'Đô hộ phủ Hoeyang', 'Huyện Gimhwa'] },
        { prov: 'Triều Tiên', fu: 'Chungcheong-do', counties: ['Mục Cheongju', 'Mục Chungju', 'Huyện Jecheon', 'Huyện Danyang', 'Đô hộ phủ Cheonan', 'Mục Gongju', 'Huyện Boryeong', 'Huyện Asan', 'Huyện Seosan', 'Quận Taean', 'Huyện Nisan', 'Huyện Dangjin', 'Quận Geumsan', 'Huyện Buyeo', 'Quận Seocheon', 'Huyện Thanh Dương', 'Mục Hongju', 'Huyện Yesan', 'Huyện Hoedeok', 'Huyện Yeongi', 'Huyện Boeun', 'Quận Okcheon', 'Huyện Yeongdong', 'Huyện Jincheon', 'Quận Goesan', 'Huyện Eumseong'] },
        { prov: 'Triều Tiên', fu: 'Gyeongsang-do', counties: ['Đô hộ phủ Daegu', 'Huyện Gyeongsan', 'Đô hộ phủ Chilgok', 'Đô hộ phủ Dongnae', 'Đô hộ phủ Gimhae', 'Quận Yangsan', 'Huyện Gijang', 'Đô hộ phủ Ulsan', 'Huyện Yeongil', 'Phủ Gyeongju', 'Quận Geumsan', 'Đại đô hộ phủ Andong', 'Đô hộ phủ Seonsan', 'Quận Yeongcheon', 'Quận Yeongcheon', 'Mục Sangju', 'Huyện Mungyeong', 'Huyện Gunwi', 'Huyện Uiseong', 'Đô hộ phủ Cheongsong', 'Huyện Yeongyang', 'Huyện Yeongdeok', 'Quận Cheongdo', 'Huyện Goryeong', 'Mục Seongju', 'Quận Yecheon', 'Huyện Bonghwa', 'Huyện Uljin', 'Quận Pyeonghae', 'Đô hộ phủ Changwon', 'Mục Jinju', 'Huyện Goseong', 'Huyện Sacheon', 'Đô hộ phủ Miryang', 'Huyện Geoje', 'Huyện Uiryeong', 'Quận Haman', 'Huyện Xương Ninh', 'Huyện Namhae', 'Huyện Hadong', 'Huyện Sơn Âm', 'Quận Hamyang', 'Quận Geochang', 'Quận Hapcheon'] },
        { prov: 'Triều Tiên', fu: 'Jeolla-do', counties: ['Phủ Jeonju', 'Huyện Impi', 'Quận Iksan', 'Huyện Jeongeup', 'Đô hộ phủ Namwon', 'Quận Gimje', 'Huyện Trấn An', 'Phủ Muju', 'Huyện Jangsu', 'Huyện Imsil', 'Quận Sunchang', 'Huyện Gochang', 'Huyện Buan', 'Mục Gwangju', 'Huyện Muan', 'Đô hộ phủ Suncheon', 'Huyện Gwangyang', 'Mục Naju', 'Đô hộ phủ Damyang', 'Huyện Cốc Thành', 'Huyện Gurye', 'Huyện Heungyang', 'Quận Boseong', 'Huyện Hòa Thuận', 'Đô hộ phủ Jangheung', 'Huyện Gangjin', 'Huyện Haenam', 'Quận Yeongam', 'Huyện Hampyeong', 'Quận Yeonggwang', 'Đô hộ phủ Jangseong', 'Quận Jindo', 'Mục Jeju', 'Huyện Daejeong'] },
        { prov: 'Triều Tiên', fu: 'Pyongan-do', counties: ['Phủ Bình Nhưỡng', 'Huyện Giang Tây', 'Mục Anju', 'Đô hộ phủ Sukcheon', 'Huyện Yeongyu', 'Huyện Jeungsan', 'Phủ Uiju', 'Huyện Yangdeok', 'Huyện Suncheon', 'Đô hộ phủ Seongcheon', 'Huyện Eunsan', 'Huyện Bukchang', 'Huyện Daedong', 'Đô hộ phủ Changseong', 'Huyện Byeokdong', 'Huyện Taecheon', 'Huyện Bakcheon', 'Huyện Gujang', 'Huyện Hyangsan', 'Huyện Unsan', 'Đại đô hộ phủ Yeongbyeon', 'Đô hộ phủ Guseong', 'Huyện Daegwan', 'Huyện Cheonma', 'Huyện Bihyeon', 'Huyện Yeomju', 'Huyện Yongcheon', 'Huyện Sindo', 'Huyện Dongnim', 'Đô hộ phủ Cheolsan', 'Mục Jeongju', 'Huyện Gwaksan', 'Huyện Seoncheon', 'Đô hộ phủ Ganggye', 'Huyện Janggang', 'Huyện Jaseong', 'Huyện Huchang', 'Huyện Isan', 'Huyện Sijung', 'Huyện Wiwon', 'Huyện Jeoncheon', 'Huyện Yongnim', 'Huyện Chosan', 'Huyện Gopung', 'Usan-gun', 'Huicheon-gun', 'Songwon-gun', 'Dongsin-gun', 'Nangnim-gun', 'Yeongwon-gun', 'Maengsan-hyeon', 'Gaecheon-gun', 'Deokcheon-gun'] },
        { prov: 'Triều Tiên', fu: 'Hamgyong-do', counties: ['Đô hộ phủ Gyeongseong', 'Eorang-gun', 'Đô hộ phủ Buryeong', 'Musan-bu', 'Đô hộ phủ Hoeryeong', 'Đô hộ phủ Onseong', 'Đô hộ phủ Jongseong', 'Đô hộ phủ Gyeongwon', 'Đô hộ phủ Gyeongheung', 'Đô hộ phủ Myeongcheon', 'Gilju-mok', 'Dancheon-gun', 'Đô hộ phủ Gapsan', 'Đô hộ phủ Samsu', 'Hamheung-bu', 'Hongwon-gun', 'Đô hộ phủ Jeongpyeong', 'Đại đô hộ phủ Yeongheung', 'Đô hộ phủ Bukcheong', 'Jangjin-gun'] },
        { prov: 'Triều Tiên', fu: 'Hwanghae-do', counties: ['Haeju-mok', 'Bongsan-gun', 'Hwangju-mok', 'Đô hộ phủ Ongjin', 'Đô hộ phủ Yeonan', 'Gangnyeong-hyeon', 'Jangyeon-hyeon', 'Anak-gun', 'Songhwa-hyeon', 'Eunyul-hyeon', 'Đô hộ phủ Pungcheon', 'Sincheon-gun', 'Jaeryeong-gun', 'Suan-gun', 'Đô hộ phủ Junghwa', 'Đô hộ phủ Goksan', 'Đô hộ phủ Pyeongsan', 'Geumcheon-gun', 'Singye-hyeon', 'Baekcheon-gun'] },
        
        // Lưu Cầu
        { prov: 'Lưu Cầu', fu: 'Lưu Cầu Quốc', counties: ['Trung Sơn'] },
        
        // Khách Nhĩ Khách (Khalkha)
        { prov: 'Khách Nhĩ Khách (Khalkha)', fu: 'Tusheet Khan bộ', counties: ['Khüree', 'Tusheet Khan Trung bộ', 'Tusheet Khan Bắc bộ', 'Tusheet Khan Nam bộ', 'Các bộ Qua Bích', 'Tusheet Khan Tây bộ'] },
        { prov: 'Khách Nhĩ Khách (Khalkha)', fu: 'Xa Thần Hãn Bộ', counties: ['Setsen Khan Trung bộ', 'Setsen Khan Đông bộ', 'Setsen Khan Nam bộ', 'Setsen Khan Tây Nam bộ'] },
        { prov: 'Khách Nhĩ Khách (Khalkha)', fu: 'Bộ Zasagt Khan', counties: ['Zasagt Khan Trung bộ', 'Zasagt Khan Nam bộ', 'Zasagt Khan Tây bộ', 'Sain Noyon Khan'] },
        { prov: 'Khách Nhĩ Khách (Khalkha)', fu: 'Bộ Khotogoid', counties: ['Tannu Uriankhai', 'Khovd', 'Bộ Đỗ Nhĩ Bá Đặc', 'Altai Uriankhai'] },
        
        // Nepal
        { prov: 'Nepal', fu: 'Các nước Bái Tắc', counties: ['Vương quốc Doti', 'Vương quốc Jumla'] },
        { prov: 'Nepal', fu: 'Các nước Chaubisi', counties: ['Vương quốc Palpa', 'Vương quốc Kaski'] },
        { prov: 'Nepal', fu: 'Vương triều Malla', counties: ['Kantipur'] },
        { prov: 'Nepal', fu: 'Vương triều Sen', counties: ['Makwanpur', 'Vijayapur'] },
        
        // Bhutan
        { prov: 'Bhutan', fu: 'Tây Bhutan', counties: ['Paro Dzong', 'Haa Dzong', 'Samtse', 'Chukha'] },
        { prov: 'Bhutan', fu: 'Trung Bhutan', counties: ['Thimphu Dzong', 'Gasa Dzong', 'Punakha Dzong', 'Wangdue Phodrang', 'Dagana', 'Tsirang'] },
        { prov: 'Bhutan', fu: 'Đông Bhutan', counties: ['Trongsa Dzong', 'Bumthang', 'Zhemgang', 'Sarpang', 'Mongar', 'Trashigang Dzong', 'Lhuntse', 'Trashiyangtse', 'Pemagatshel', 'Samdrup Jongkhar'] },

        // Lạn Thương
        { prov: 'Lạn Thương', fu: 'Viêng Chăn', counties: ['Viêng Chăn', 'Xaisomboun', 'Bolikhamsai'] },
        { prov: 'Lạn Thương', fu: 'Luông Pha Băng', counties: ['Luông Pha Băng', 'Oudomxay', 'Phongsaly', 'Luông Nam Tha', 'Bokeo', 'Sainyabuli'] },
        { prov: 'Lạn Thương', fu: 'Mường Phăn', counties: ['Xiêng Khoảng', 'Hủa Phăn'] },
        { prov: 'Lạn Thương', fu: 'Chăm Pa Sắc', counties: ['Chăm Pa Sắc', 'Savannakhet', 'Khammouane', 'Salavan', 'Sekong', 'Attapeu'] },

        // Xiêm La
        { prov: 'Xiêm La', fu: 'Vùng lõi trung tâm', counties: ['Ayutthaya', 'Ratchaburi', 'Chanthaburi'] },
        { prov: 'Xiêm La', fu: 'Lanna', counties: ['Chiang Mai'] },
        { prov: 'Xiêm La', fu: 'Phitsanulok', counties: ['Phitsanulok'] },
        { prov: 'Xiêm La', fu: 'Vùng Isan', counties: ['Nakhon Ratchasima (Khorat)'] },
        { prov: 'Xiêm La', fu: 'Bán đảo Mã Lai', counties: ['Nakhon Si Thammarat', 'Pattani'] },

        // Chúa Trịnh (Bắc Việt)
        { prov: 'Chúa Trịnh', fu: 'Giao Chỉ', counties: ['Thăng Long', 'Sơn Nam', 'Hải Dương', 'Sơn Tây', 'Hưng Hóa'] },
        { prov: 'Chúa Trịnh', fu: 'Thanh Hoa', counties: ['Thanh Hóa', 'Nghệ An'] },

        // Quảng Nam (Nam Việt)
        { prov: 'Quảng Nam', fu: 'Thuận Hóa', counties: ['Thuận Hóa'] },
        { prov: 'Quảng Nam', fu: 'Quảng Nam', counties: ['Quảng Nam'] },
        { prov: 'Quảng Nam', fu: 'Chiêm Thành', counties: ['Quy Nhơn', 'Panduranga'] },
        { prov: 'Quảng Nam', fu: 'Thủy Chân Lạp', counties: ['Thủy Chân Lạp'] },

        // Mughal
        { prov: 'Mughal', fu: 'Lahore', counties: ['Punjab'] },
        { prov: 'Mughal', fu: 'Multan', counties: ['Sindh', 'Balochistan'] },
        { prov: 'Mughal', fu: 'Kabul', counties: ['Khyber', 'Kashmir'] },
        { prov: 'Mughal', fu: 'Delhi', counties: ['Delhi', 'Awadh'] },
        { prov: 'Mughal', fu: 'Ajmer', counties: ['Rajasthan'] },
        { prov: 'Mughal', fu: 'Gujarat', counties: ['Gujarat'] },
        { prov: 'Mughal', fu: 'Malwa', counties: ['Madhya Pradesh'] },
        { prov: 'Mughal', fu: 'Bihar', counties: ['Bihar', 'Odisha'] },
        { prov: 'Mughal', fu: 'Bengal', counties: ['Đông Bengal', 'Tây Bengal'] },
        { prov: 'Mughal', fu: 'Assam', counties: ['Assam'] },
        { prov: 'Mughal', fu: 'Deccan', counties: ['Maharashtra', 'Telangana', 'Karnataka'] },
        { prov: 'Mughal', fu: 'Nam Ấn Độ', counties: ['Madurai'] }
    ];

    // Chính thức ghi các địa danh lịch sử nước ngoài vào từ điển tìm kiếm Đại Minh
    eastAsiaSearchData.forEach(item => {
        item.counties.forEach(county => {
            if (!mingCountySearchIndex[county]) mingCountySearchIndex[county] = [];
            if (!mingCountySearchIndex[county].some(i => i.prov === item.prov && i.fu === item.fu)) {
                mingCountySearchIndex[county].push({ prov: item.prov, fu: item.fu });
            }
        });
    });

    // Cung cấp tính năng tìm kiếm trực tiếp tên Nhật Bản và Hàn Quốc hiện đại tiện lợi cho người chơi
    // Khi người chơi tìm kiếm "Seoul", hệ thống ngầm tự động khớp với "Hán Thành phủ", trải nghiệm định vị đào sâu giống hệt như trong nước.!
    const modernAsianTranslations = {
        'Seoul':'Hán Thành Phủ', 'Hán Thành':'Hán Thành Phủ', 'Busan':'Dongnae Đô hộ phủ', 'Daegu':'Daegu Đô hộ phủ', 'Incheon':'Incheon Đô hộ phủ', 'Gwangju':'Gwangju Mục', 'Daejeon':'Hoedeok Huyện', 'Ulsan':'Ulsan Đô hộ phủ', 'Sejong':'Yeongi Huyện', 'Bình Nhưỡng':'Bình Nhưỡng Phủ', 'Nampho':'Giang Tây Huyện', 'Kaesong':'Kaesong Phủ', 'Rason':'Gyeongheung Đô hộ phủ', 'Jeju':'Jeju Mục', 'Suwon':'Suwon Đô hộ phủ', 'Đảo Jeju':'Jeju Mục',
        'Tokyo':'Musashi', 'Osaka':'Settsu', 'Kyoto':'Yamashiro', 'Hokkaido':'Ezo', 'Yokohama':'Sagami', 'Nagoya':'Owari', 'Kobe':'Harima', 'Fukuoka':'Chikuzen', 'Hiroshima':'Aki', 'Sapporo':'Ezo', 'Kagoshima':'Satsuma', 'Nagasaki':'Hizen', 'Okinawa':'Nakayama'
    };
    for (let modernName in modernAsianTranslations) {
        modernCountyToMingCounty[modernName] = modernAsianTranslations[modernName];
    }
}


// ==========================================
// Logic tìm kiếm mờ và gợi ý thả xuống
// ==========================================
function handleSearchInput(e) {
    const kw = e.target.value.trim();
    const suggEl = mingMapFrameDocument.getElementById('search-suggestions');
    const btn = mingMapFrameDocument.getElementById('map-search-btn');

    btn.dataset.mode = 'search'; btn.innerText = '🔍'; btn.title = 'Tìm kiếm';

    if (!kw) {
        suggEl.style.display = 'none';
        return;
    }

    buildCountyIndex(); 
    const results = [];
    const seen = new Set(); 

    // 1. Khớp đại khu và tỉnh thành
    Object.keys(mingProvinceColors).forEach(prov => {
        if (prov.includes(kw)) {
            results.push({ type: 'nation', name: prov, desc: 'Tỉnh / Khu vực', matchIdx: prov.indexOf(kw) });
            seen.add('nation:' + prov);
        }
    });

    // 2. Khớp phủ châu
    for (let prov in mingFuZhouCenters) {
        mingFuZhouCenters[prov].forEach(fu => {
            if (fu.name.includes(kw)) {
                results.push({ type: 'province', name: fu.name, prov: prov, desc: `${prov} · Phủ châu`, lng: fu.lng, lat: fu.lat, matchIdx: fu.name.indexOf(kw) });
                seen.add('fu:' + fu.name);
            }
        });
    }

    // 3. Khớp quận huyện
    // Đã xóa phần bổ sung ban đầu modernName Hậu tố, giữ nguyên hiển thị địa danh thời Minh thuần túy
    const addCountyResult = (mingCounty, info, matchStr) => {
        const key = 'county:' + mingCounty + '_' + info.prov;
        if (!seen.has(key)) {
            results.push({ type: 'prefecture', name: mingCounty, prov: info.prov, fu: info.fu, desc: `${info.prov} · ${info.fu}`, matchIdx: matchStr.indexOf(kw) });
            seen.add(key);
        }
    };

    for (let mingCounty in mingCountySearchIndex) {
        if (mingCounty.includes(kw)) {
            addCountyResult(mingCounty, mingCountySearchIndex[mingCounty][0], mingCounty);
        }
    }
    for (let modernName in modernCountyToMingCounty) {
        if (modernName.includes(kw)) {
            let mingCounty = modernCountyToMingCounty[modernName];
            if (mingCountySearchIndex[mingCounty]) {
                addCountyResult(mingCounty, mingCountySearchIndex[mingCounty][0], modernName);
            }
        }
    }
    for (let city in preciseCountyMap) {
        for (let modernName in preciseCountyMap[city]) {
            if (modernName.includes(kw)) {
                let mingCounty = preciseCountyMap[city][modernName];
                if (mingCountySearchIndex[mingCounty]) {
                    addCountyResult(mingCounty, mingCountySearchIndex[mingCounty][0], modernName);
                }
            }
        }
    }

    // Ưu tiên sắp xếp: Từ khóa ở đầu ưu tiên trước, tên ngắn ưu tiên trước
    results.sort((a, b) => {
        if (a.matchIdx !== b.matchIdx) return a.matchIdx - b.matchIdx;
        return a.name.length - b.name.length;
    });

    const topResults = results.slice(0, 15);
    if (topResults.length === 0) {
        suggEl.style.display = 'none';
        return;
    }

    // Hiển thị danh sách thả xuống
    suggEl.innerHTML = topResults.map(r => {
        const dataStr = encodeURIComponent(JSON.stringify(r));
        return `<li data-sugg="${dataStr}"><span class="sugg-title">${r.name}</span><span class="sugg-desc">${r.desc}</span></li>`;
    }).join('');
    suggEl.style.display = 'flex';
}


function jumpToSuggestion(dataObj) {
    const btn = mingMapFrameDocument.getElementById('map-search-btn');
    const suggEl = mingMapFrameDocument.getElementById('search-suggestions');
    const input = mingMapFrameDocument.getElementById('map-search-input');
    
    suggEl.style.display = 'none';
    setSearchBtnToClear(btn);
    input.value = dataObj.name; // Tự động điền tên đã chọn vào hộp nhập liệu

    if (dataObj.type === 'nation') {
        mingMapSearchTarget = { level: 'nation', province: dataObj.name };
        if (mingMapCurrentLevel !== 'nation') {
            renderMingNationMap();
        } else {
            const center = mingProvinceCenters[dataObj.name] || [108,34];
            mingMapChartInstance.setOption({ geo: { center: center, zoom: 3.5 } });
        }
    } else if (dataObj.type === 'province') {
        if (mingMapCurrentLevel === 'nation' && mingMapChartInstance) {
            const opt = mingMapChartInstance.getOption();
            if (opt && opt.geo && opt.geo[0]) mingMapGeoState = { center: opt.geo[0].center, zoom: opt.geo[0].zoom };
        }
        mingMapSearchTarget = { level: 'province', province: dataObj.prov, fu: dataObj.name, lng: dataObj.lng, lat: dataObj.lat };
        renderMingPrefectureMap(dataObj.prov);
    } else if (dataObj.type === 'prefecture') {
        if (mingMapCurrentLevel === 'nation' && mingMapChartInstance) {
            const opt = mingMapChartInstance.getOption();
            if (opt && opt.geo && opt.geo[0]) mingMapGeoState = { center: opt.geo[0].center, zoom: opt.geo[0].zoom };
        } else if (mingMapCurrentLevel === 'province' && mingMapChartInstance) {
            const opt = mingMapChartInstance.getOption();
            if (opt && opt.geo && opt.geo[0]) mingMapPrefectureGeoState = { center: opt.geo[0].center, zoom: opt.geo[0].zoom };
        }
        // [Thêm chuyển tiếp county]: Ghi lại tên quận huyện, giao cho hàm vẽ để tìm tọa độ trung tâm
        mingMapSearchTarget = { level: 'prefecture', county: dataObj.name };
        renderMingCountyMap(dataObj.prov, dataObj.fu);
    }
}


function doMingMapSearch(isKeyboardEnter = false) {
    const input = mingMapFrameDocument.getElementById('map-search-input');
    const btn = mingMapFrameDocument.getElementById('map-search-btn');
    const suggEl = mingMapFrameDocument.getElementById('search-suggestions');
    const box = mingMapFrameDocument.getElementById('search-box');
    if(!input || !btn || !box) return;

    // 1. Nếu hộp tìm kiếm đang thu gọn, khi nhấp vào sẽ mở rộng và tự động trỏ chuột vào
    if (!box.classList.contains('expanded')) {
        box.classList.add('expanded');
        // Trì hoãn lấy tiêu điểm, đợi đến khi hoạt ảnh mở rộng gần xong mới hiển thị bàn phím, mang lại trải nghiệm tốt hơn.
        setTimeout(() => input.focus(), 250); 
        return;
    }

    // 2. Nếu hiện tại là chế độ "Xóa"
    if (btn.dataset.mode === 'clear') {
        // [Sửa chữa]: Nếu được kích hoạt bằng phím Enter, đừng return gián đoạn, mà sẽ bỏ qua bước dọn dẹp để mã tiếp tục chạy
        if (!isKeyboardEnter) {
            input.value = '';
            btn.dataset.mode = 'search';
            btn.innerText = '🔍';
            btn.title = 'Tìm kiếm';
            if (suggEl) suggEl.style.display = 'none';
            input.focus(); // Tiếp tục duy trì lấy nét sau khi xóa
            return;
        }
    }

    // 3. Thực hiện tìm kiếm thực sự
    const kw = input.value.trim();
    if (!kw) {
        // Nếu ô nhập liệu trống mà lại nhấp vào kính lúp một lần nữa, thì trực tiếp gập thu gọn lại ô tìm kiếm.
        box.classList.remove('expanded');
        return;
    }

    // [Sửa lỗi quan trọng]: Nếu danh sách đã bị ẩn sau khi tìm kiếm trước đó, việc nhấn Enter lần nữa sẽ buộc tải lại danh sách khớp một lần, đảm bảo có mục tiêu để chuyển đến.
    if (suggEl.style.display === 'none' || !suggEl.querySelector('li[data-sugg]')) {
        handleSearchInput({ target: input });
    }

    // 4. Khi nhấn Enter hoặc nhấp vào nút tìm kiếm, trực tiếp đọc tùy chọn đầu tiên trong danh sách thả xuống và chuyển hướng.
    const firstSugg = suggEl?.querySelector('li[data-sugg]');
    if (firstSugg && suggEl.style.display !== 'none') {
        const data = JSON.parse(decodeURIComponent(firstSugg.dataset.sugg));
        jumpToSuggestion(data);
    } else {
        const oldText = btn.innerText;
        btn.innerText = '❌';
        setTimeout(()=> { 
            if (btn.dataset.mode !== 'clear') { btn.innerText = '🔍'; } else { btn.innerText = '✖'; }
        }, 1000);
    }
}




function setSearchBtnToClear(btn) {
    btn.dataset.mode = 'clear'; btn.innerText = '✖'; btn.title = 'Xóa';
}



// ==========================================
// Logic trích xuất dữ liệu bản đồ (Cấu trúc ba lớp)
// ==========================================
function buildEastAsiaGeo() {
    const W = mingMapFrame.contentWindow?.WORLD_1629;
    if (!W || !W.features) return { type: 'FeatureCollection', features: [] };
    const TARGETS = new Set([
        'Bắc Trực Lệ', 'Sơn Đông Bố chính sứ ty', 'Sơn Tây Bố chính sứ ty', 'Hà Nam Bố chính sứ ty',
        'Thiểm Tây Bố chính sứ ty', 'Thiểm Tây Hành đô ty', 'Tứ Xuyên Bố chính sứ ty', 'Giang Tây Bố chính sứ ty',
        'Chiết Giang Bố chính sứ ty', 'Phúc Kiến Bố chính sứ ty', 'Quảng Đông Bố chính sứ ty', 'Quảng Tây Bố chính sứ ty',
        'Vân Nam Bố chính sứ ty', 'Quý Châu Bố chính sứ ty',
        'Liêu Đông Đô ty', 'Ninh Hạ Vệ',
        'Đế quốc Mughal', 'Vương triều Ayutthaya(Xiêm La)',
        'Bhutan Drukpa', 'Vương triều Malla Nepal', 'Philippines thuộc Tây Ban Nha', 'Vương quốc Hồi giáo Mataram',
        'Tạng Ba Hãn', 'Hãn quốc Yarkent', 'Bộ Hòa Thạc Đặc', 'Khang Khu thổ ty', 'Lạn Thương·Chân Lạp',
        'Kiến Châu Nữ Chân(Hậu Kim)', 'Các bộ Dã Nhân Nữ Chân',
        'Bộ Sát Cáp Nhĩ Mông Cổ', 'Bộ Thổ Mặc Đặc Mông Cổ', 'Đóa Nhan Tam Vệ',
        'Khách Nhĩ Khách Mông Cổ (Khalkha)',
        'Nam Trực Lệ(Giang Nam)', 'Nam Trực Lệ(Giang Bắc)',
        'Hồ Quảng Bố chính sứ ty(Bắc)', 'Hồ Quảng Bố chính sứ ty(Nam)',
        'Nhà Hậu Lê·Chúa Trịnh', 'Chúa Nguyễn(Quảng Nam)',
        'Úc(Thổ dân)',
    ]);

    let features = W.features.filter(f => TARGETS.has(f.properties.name)).map(f => {
        const display = GEO_NAME_DISPLAY[f.properties.name];
        if (display) return { ...f, properties: { ...f.properties, name: display } };
        return f;
    });


    const tokugawa = W.features.find(f => f.properties.name === 'Mạc phủ Tokugawa');
    if (tokugawa && tokugawa.geometry.type === 'MultiPolygon') {
        const coords = tokugawa.geometry.coordinates;
        let japanCoords = [];
        let ryukyuCoords = [];
        let joseonCoords = []; // Thêm mới: Dùng để lưu trữ các mảnh của bán đảo Triều Tiên và Đảo Jeju

        coords.forEach((polygon, i) => {
            // Tính toán trung tâm hình học của từng mảnh theo thời gian thực
            let minLng = 180, maxLng = -180, minLat = 90, maxLat = -90;
            const findBounds = (arr) => {
                if (typeof arr[0] === 'number') {
                    if (arr[0] < minLng) minLng = arr[0];
                    if (arr[0] > maxLng) maxLng = arr[0];
                    if (arr[1] < minLat) minLat = arr[1];
                    if (arr[1] > maxLat) maxLat = arr[1];
                } else {
                    for (let j = 0; j < arr.length; j++) findBounds(arr[j]);
                }
            };
            findBounds(polygon);
            let centerLng = (minLng + maxLng) / 2;
            let centerLat = (minLat + maxLat) / 2;

            if (i === 1) {
                // Nhận diện phần chính của bán đảo Triều Tiên được hardcode trong mã gốc
                joseonCoords.push(polygon);
            } else if (i === 18) {
                // Nhận lãnh Đông Phiên
                features.push({ type: 'Feature', properties: { name: 'Đông Phiên' }, geometry: { type: 'MultiPolygon', coordinates: [polygon] } });
            } else if (centerLat < 29.0) {
                // Phía nam vĩ tuyến 29 độ Bắc thuộc về Lưu Cầu
                ryukyuCoords.push(polygon);
            } else if (centerLng < 128.5 && centerLat > 31.0 && centerLat < 35.0) {
                // [Sửa lỗi cốt lõi]: Radar chặn Đảo Jeju và các đảo xa phía nam Hàn Quốc
                // Đảo Jeju ở (126.5E, 33.3N), Điều kiện này bao quát chính xác nó, đồng thời tránh đảo Tsushima của Nhật Bản(129.2E) và Quần đảo Gotō(128.8E)
                joseonCoords.push(polygon);
            } else {
                // Phần còn lại sau khi lọc mới là lãnh thổ Nhật Bản thực sự
                japanCoords.push(polygon);
            }
        });

        // Hợp nhất lại Triều Tiên (Bao gồm phần chính của bán đảo và Đảo Jeju đã thu hồi)
        if (joseonCoords.length > 0) {
            features.push({ type: 'Feature', properties: { name: 'Triều Tiên' }, geometry: { type: 'MultiPolygon', coordinates: joseonCoords } });
        }

        // Trích xuất và lưu vào bộ nhớ đệm đa giác Lưu Cầu để tái sử dụng khi thu phóng xuống lớp 2 và lớp 3
        if (ryukyuCoords.length > 0) {
            const ryukyuFeature = { type: 'Feature', properties: { name: 'Lưu Cầu' }, geometry: { type: 'MultiPolygon', coordinates: ryukyuCoords } };
            features.push(ryukyuFeature);
            window._cachedRyukyuFeature = ryukyuFeature; 
        }
        
        // Tạo bản Nhật Bản thuần túy
        if (japanCoords.length > 0) {
            features.push({ type: 'Feature', properties: { name: 'Nhật Bản' }, geometry: { type: 'MultiPolygon', coordinates: japanCoords } });
        }
    }

    return { type: 'FeatureCollection', features };
}


function getMingProvinceName(m) { return modernToMingProvince[m] || m; }
// --- Thêm mới: Cắt bỏ châu Hải Tây/Vùng lãnh thổ tách rời của Thị trấn Đường Cổ Lạp Sơn thuộc Thành phố Cách Nhĩ Mộc ---
function removeTanggulaEnclave(feature) {
    if (!feature || !feature.geometry) return feature;
    // Nhận dạng Châu Hải Tây hoặc Golmud, và đó là tập hợp đa giác
    if ((feature.properties.name === 'Châu tự trị dân tộc Mông Cổ, Tạng Hải Tây' || feature.properties.name === 'Thành phố Cách Nhĩ Mộc') && feature.geometry.type === 'MultiPolygon') {
        // Thị trấn Đường Cổ Lạp Sơn nằm ở khoảng vĩ độ 33 độ Bắc, phần chính nằm trên 36 độ Bắc, trực tiếp cắt bỏ đa giác ở phía nam.
        feature.geometry.coordinates = feature.geometry.coordinates.filter(p => p[0][0][1] > 34);
        if (feature.geometry.coordinates.length === 1) {
            feature.geometry.type = 'Polygon';
            feature.geometry.coordinates = feature.geometry.coordinates[0];
        }
    }
    return feature;
}
// --- Thêm mới: Cắt bỏ các đảo xa trên Thái Bình Dương của Nhật Bản (Ngăn chặn lệch góc nhìn Tokaido, Saikaido) ---
function removeJapanIslands(feature) {
    if (!feature || !feature.geometry) return feature;
    let prefName = feature.properties.NL_NAME_1 || feature.properties.NAME_1 || '';

    // Xử lý Tokyo (Musashi): Cắt bỏ quần đảo Izu và quần đảo Ogasawara ở phía nam vĩ độ 35 độ Bắc.
    if (prefName.includes('Đông Kinh') || feature.properties.name === 'Musashi') {
        if (feature.geometry.type === 'MultiPolygon') {
            feature.geometry.coordinates = feature.geometry.coordinates.filter(p => {
                // Lấy vĩ độ của điểm đầu tiên trên vòng ngoài đa giác làm đại diện
                let lat = p[0][0][1];
                return lat > 35.0; 
            });
            if (feature.geometry.coordinates.length === 1) {
                feature.geometry.type = 'Polygon';
                feature.geometry.coordinates = feature.geometry.coordinates[0];
            }
        }
    }
    
    // Xử lý Kagoshima (Satsuma): Cắt bỏ các đảo xa như đảo Amami Oshima ở phía nam vĩ độ 30.5 độ Bắc.
    if (prefName.includes('Kagoshima') || feature.properties.name === 'Satsuma') {
        if (feature.geometry.type === 'MultiPolygon') {
            feature.geometry.coordinates = feature.geometry.coordinates.filter(p => {
                let lat = p[0][0][1];
                return lat > 30.5;
            });
            if (feature.geometry.coordinates.length === 1) {
                feature.geometry.type = 'Polygon';
                feature.geometry.coordinates = feature.geometry.coordinates[0];
            }
        }
    }
    return feature;
}


// ==========================================
// Hàm hỗ trợ gộp khu vực bản đồ (Bản nâng cao: Loại bỏ triệt để các đường đứt nét bên trong/Đường nét đứt)
// ==========================================
async function mergeFeaturesWithTurf(feats, name) {
    if (feats.length === 1) {
        const f = JSON.parse(JSON.stringify(feats[0]));
        f.properties.name = name;
        return f;
    }

    if (!window.turf) {
        await new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/@turf/turf@6/turf.min.js';
            script.onload = resolve;
            document.head.appendChild(script);
        });
    }

    try {
        let merged = JSON.parse(JSON.stringify(feats[0]));
        for (let i = 1; i < feats.length; i++) {
            merged = window.turf.union(merged, feats[i]);
        }
        
        // [Sửa lỗi cốt lõi]: Xóa các đa giác“Vòng trong (Lỗ hổng) ”
        // Xóa các mảnh vỡ bên trong sinh ra do những khoảng trống cực nhỏ khi hợp nhất, nhằm tránh Echarts Kết xuất đường nét đứt bên trong
        if (merged && merged.geometry) {
            if (merged.geometry.type === 'Polygon') {
                // GeoJSON Của Polygon Cấu trúc là [Đường viền ngoài, Lỗ hổng bên trong 1, Lỗ hổng bên trong 2...]
                // Chúng tôi chỉ giữ lại [0] Đường viền ngoài, loại bỏ tất cả các lỗ hổng bên trong
                merged.geometry.coordinates = [merged.geometry.coordinates[0]];
            } else if (merged.geometry.type === 'MultiPolygon') {
                // Lặp qua từng đa giác con, chỉ giữ lại đường bao bên ngoài
                merged.geometry.coordinates = merged.geometry.coordinates.map(poly => [poly[0]]);
            }
        }
        
        merged.properties.name = name;
        return merged;
    } catch (e) {
        // Nếu gộp thất bại thì quay lại ghép nối đơn giản
        const base = JSON.parse(JSON.stringify(feats[0]));
        base.properties.name = name;
        const all = [];
        feats.forEach(f => {
            if (f.geometry.type === 'Polygon') all.push(f.geometry.coordinates);
            else if (f.geometry.type === 'MultiPolygon') f.geometry.coordinates.forEach(c => all.push(c));
        });
        base.geometry = all.length === 1 ? { type: 'Polygon', coordinates: all[0] } : { type: 'MultiPolygon', coordinates: all };
        return base;
    }
}


// Lấy lớp thứ 2: Ranh giới Phủ/Châu
async function buildMingPrefectureGeoJSON(mingName) {

    // ================= Mới: Xử lý độc lập dữ liệu Lưu Cầu =================
    if (mingName === 'Lưu Cầu') {
        if (window._cachedRyukyuFeature) {
            let f = JSON.parse(JSON.stringify(window._cachedRyukyuFeature));
            f.properties.name = 'Nước Lưu Cầu'; // Tên lớp thứ hai
            return { type: 'FeatureCollection', features: [f] };
        }
        return null;
    }
    // =========================================================

    // ================= Thống nhất ánh xạ dữ liệu cấp cao của các nước láng giềng (Kết xuất Level 1) =================
    const customForeignMap = {
        'Nhật Bản': { 
            codes: ['JPN'], 
            processFeature: (f) => {
                let newF = removeJapanIslands(f);
                if (!newF) return null;
                let rawName = newF.properties.NL_NAME_1 || newF.properties.NAME_1 || '';
                let cleanName = rawName.replace(/[都道府県]$/, '');
                if (cleanName === 'Okinawa') return null;
                let edoName = japanToEdoMap[cleanName] || cleanName;
                newF.properties.name = edoToRegionMap[edoName] || edoName;
                return newF;
            }
        },
        'Triều Tiên': { 
            codes: ['KOR', 'PRK'], 
            processFeature: (f) => {
                let rawName = f.properties.NAME_1 || f.properties.NL_NAME_1 || '';
                f.properties.name = koreaToJoseonMap[rawName] || 'Gyeonggi-do';
                return f;
            }
        },
        'Khách Nhĩ Khách (Khalkha)': { codes: ['MNG'], map1: khalkhaToCountyMap, map2: khalkhaCountyToFuMap },
        'Nepal': { codes: ['NPL'], map1: nepalToCountyMap, map2: nepalCountyToFuMap },
        'Bhutan': { codes: ['BTN'], map1: bhutanToCountyMap, map2: bhutanCountyToFuMap },
        'Lạn Thương': { codes: ['LAO'], map1: lancangToCountyMap, map2: lancangCountyToFuMap },
        'Xiêm La': { codes: ['THA'], map1: siamToCountyMap, map2: siamCountyToFuMap },
        'Chúa Trịnh': { codes: ['VNM'], map1: vietnamToCountyMap, map2: vietnamCountyToFuMap, validFus: ['Giao Chỉ', 'Thanh Hóa'] },
        'Quảng Nam': { codes: ['VNM'], map1: vietnamToCountyMap, map2: vietnamCountyToFuMap, validFus: ['Thuận Hóa', 'Quảng Nam', 'Chiêm Thành', 'Thủy Chân Lạp'] },
        'Mughal': { codes: ['IND', 'PAK', 'BGD'], map1: mughalToCountyMap, map2: mughalCountyToFuMap }
    };

    if (customForeignMap[mingName]) {
        const conf = customForeignMap[mingName];
        const fuMap = {};

        for (let code of conf.codes) {
            const geoData = await fetchGeoJSON(`${code}_1`);
            if (!geoData || !geoData.features) continue;

            let currentFeatures = JSON.parse(JSON.stringify(geoData.features));

            if (mingName === 'Chúa Trịnh') {
                currentFeatures = currentFeatures.filter(f => { let c = getFeatureCenter(f); return c && c[1] >= 17.5; });
            } else if (mingName === 'Quảng Nam') {
                currentFeatures = currentFeatures.filter(f => { let c = getFeatureCenter(f); return c && c[1] < 17.5; });
            }

            let mappedFeatures = [];
            let unmappedFeatures = [];

            if (conf.processFeature) {
                // Thực thi ánh xạ chính xác của các hàm chuyên biệt như Nhật Bản, Hàn Quốc
                currentFeatures.forEach(f => {
                    let newF = conf.processFeature(f);
                    if (newF && newF.properties.name) mappedFeatures.push(newF);
                });
            } else {
                // Thực thi ánh xạ văn bản mờ cho các nước ngoài khác
                let sortedKeys = Object.keys(conf.map1).sort((a, b) => b.length - a.length);
                currentFeatures.forEach(f => {
                    f.properties = f.properties || {}; 
                    let allProps = Object.values(f.properties).filter(v => typeof v === 'string')
                                    .join('|').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f\s\-_]/g, "");
                    let countyName = null;
                    for (let k of sortedKeys) {
                        let cleanK = k.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f\s\-_]/g, "");
                        if (cleanK.length >= 2 && allProps.includes(cleanK)) { countyName = conf.map1[k]; break; }
                    }
                    f.properties._center = getFeatureCenter(f) || [0, 0];
                    if (countyName) {
                        let fuName = conf.map2[countyName] || countyName;
                        if (conf.validFus && !conf.validFus.includes(fuName)) {
                            fuName = mingName === 'Chúa Trịnh' ? 'Thanh Hóa' : (mingName === 'Quảng Nam' ? 'Thuận Hóa' : conf.validFus[0]);
                        }
                        f.properties.name = fuName;
                        mappedFeatures.push(f);
                    } else {
                        unmappedFeatures.push(f);
                    }
                });

                // Hút dính vật lý mảnh vỡ
                unmappedFeatures.forEach(uf => {
                    if (mappedFeatures.length > 0) {
                        let closestFu = mappedFeatures[0].properties.name;
                        let minD = Infinity;
                        mappedFeatures.forEach(mf => {
                            let dx = uf.properties._center[0] - mf.properties._center[0];
                            let dy = uf.properties._center[1] - mf.properties._center[1];
                            let d = dx*dx + dy*dy;
                            if (d < minD) { minD = d; closestFu = mf.properties.name; }
                        });
                        uf.properties.name = closestFu;
                    } else {
                        uf.properties.name = conf.validFus ? conf.validFus[0] : Object.values(conf.map2)[0];
                    }
                    mappedFeatures.push(uf);
                });
            }

            mappedFeatures.forEach(f => {
                let fuName = f.properties.name;
                if (!fuMap[fuName]) fuMap[fuName] = [];
                fuMap[fuName].push(f);
            });
        }

        const features = [];
        // Tại đây sẽ tự động gọi bản nâng cao Turf.js Hợp nhất logic và loại bỏ các lỗ hổng nét đứt
        for (const fu of Object.keys(fuMap)) {
            const mergedFeat = await mergeFeaturesWithTurf(fuMap[fu], fu);
            features.push(mergedFeat);
        }
        return { type: 'FeatureCollection', features };
    }


    // 2. Quốc gia nước ngoài thông thường (Đã xóa Chúa Trịnh và Quảng Nam bị lặp lại ở đây, tránh xung đột logic)
    const genericForeignCodes = {
        'Mughal': ['IND', 'PAK', 'BGD'], 
        'Lạn Thương': ['LAO'], 'Xiêm La': ['THA']
    };

    if (genericForeignCodes[mingName]) {
        const codes = genericForeignCodes[mingName];
        let features = [];
        for (let code of codes) {
            const geoData = await fetchGeoJSON(`${code}_1`); 
            if (geoData && geoData.features) {
                geoData.features.forEach(f => {
                    let newF = JSON.parse(JSON.stringify(f));
                    let prefName = newF.properties.NL_NAME_1 || newF.properties.NAME_1 || 'Khu vực không xác định';
                    newF.properties.name = prefName;
                    features.push(newF);
                });
            }
        }
        return { type: 'FeatureCollection', features: features };
    }
    // =============================================================



    if (!mingMapNationGeoJSON) {
        // [Sửa lỗi cốt lõi]: Xóa lớp bên trong showLoading Và hideLoading
        // Kiên quyết ngăn lớp bên trong đóng sớm lớp phủ lớn bên ngoài, để lớp phủ chắn ngang màn hình một cách ổn định cho đến khi dữ liệu được xử lý xong.
        // Bằng cách này người chơi sẽ không hiểu lầm là bị lag chưa bấm được mà bấm thêm lần nữa
        mingMapNationGeoJSON = await fetchGeoJSON('100000');
        if (!mingMapNationGeoJSON) return null;
    }
    
    let modernProvs = Object.keys(modernToMingProvince).filter(k => modernToMingProvince[k] === mingName);
    
    if (['Sát Cáp Nhĩ', 'Thổ Mặc Đặc', 'Đóa Nhan Tam Vệ'].includes(mingName)) {
        if (!modernProvs.includes('Khu tự trị Nội Mông Cổ')) modernProvs.push('Khu tự trị Nội Mông Cổ');
        if (!modernProvs.includes('Tỉnh Hà Bắc')) modernProvs.push('Tỉnh Hà Bắc');
        if (mingName === 'Đóa Nhan Tam Vệ' && !modernProvs.includes('Tỉnh Liêu Ninh')) modernProvs.push('Tỉnh Liêu Ninh');
    }
    if (mingName === 'Thanh Hải' && !modernProvs.includes('Khu tự trị Nội Mông Cổ')) modernProvs.push('Khu tự trị Nội Mông Cổ');
    
    // Kéo dữ liệu liên tỉnh Tây Nam và Lưỡng Quảng:
    if (mingName === 'Tứ Xuyên') {
        if (!modernProvs.includes('Tỉnh Quý Châu')) modernProvs.push('Tỉnh Quý Châu');
        if (!modernProvs.includes('Tỉnh Vân Nam')) modernProvs.push('Tỉnh Vân Nam');
    }
    if (mingName === 'Quý Châu') {
        if (!modernProvs.includes('Tỉnh Tứ Xuyên')) modernProvs.push('Tỉnh Tứ Xuyên');
        if (!modernProvs.includes('Khu tự trị dân tộc Choang Quảng Tây')) modernProvs.push('Khu tự trị dân tộc Choang Quảng Tây');
        if (!modernProvs.includes('Tỉnh Hồ Nam')) modernProvs.push('Tỉnh Hồ Nam');
    }
    if (mingName === 'Vân Nam' && !modernProvs.includes('Tỉnh Tứ Xuyên')) modernProvs.push('Tỉnh Tứ Xuyên');
    if (mingName === 'Quảng Đông' && !modernProvs.includes('Khu tự trị dân tộc Choang Quảng Tây')) modernProvs.push('Khu tự trị dân tộc Choang Quảng Tây');
    if (mingName === 'Quảng Tây') {
        if (!modernProvs.includes('Tỉnh Quảng Đông')) modernProvs.push('Tỉnh Quảng Đông');
        if (!modernProvs.includes('Tỉnh Quý Châu')) modernProvs.push('Tỉnh Quý Châu');
        if (!modernProvs.includes('Tỉnh Hồ Nam')) modernProvs.push('Tỉnh Hồ Nam');
    }
    if (mingName === 'Hồ Quảng') {
        if (!modernProvs.includes('Khu tự trị dân tộc Choang Quảng Tây')) modernProvs.push('Khu tự trị dân tộc Choang Quảng Tây');
        if (!modernProvs.includes('Tỉnh Quý Châu')) modernProvs.push('Tỉnh Quý Châu');
    }
    
    // Hoa Đông/Lấy dữ liệu vùng lãnh thổ tách rời liên tỉnh ở Trung Nguyên:
    if (mingName === 'Nam Trực Lệ' && !modernProvs.includes('Tỉnh Giang Tây')) modernProvs.push('Tỉnh Giang Tây');
    if (mingName === 'Bắc Trực Lệ') {
        if (!modernProvs.includes('Tỉnh Hà Nam')) modernProvs.push('Tỉnh Hà Nam');
        if (!modernProvs.includes('Tỉnh Sơn Đông')) modernProvs.push('Tỉnh Sơn Đông');
    }
    if (mingName === 'Hà Nam' && !modernProvs.includes('Tỉnh Hà Bắc')) modernProvs.push('Tỉnh Hà Bắc');
    if (mingName === 'Sơn Đông') {
        if (!modernProvs.includes('Tỉnh Hà Bắc')) modernProvs.push('Tỉnh Hà Bắc');
        if (!modernProvs.includes('Tỉnh Hà Nam')) modernProvs.push('Tỉnh Hà Nam');
    }

    // Tây Bắc và Đông Bắc/Kéo liên tỉnh vùng biên giới:
    if (mingName === 'Thiểm Tây') {
        if (!modernProvs.includes('Tỉnh Thanh Hải')) modernProvs.push('Tỉnh Thanh Hải');
        if (!modernProvs.includes('Khu tự trị dân tộc Hồi Ninh Hạ')) modernProvs.push('Khu tự trị dân tộc Hồi Ninh Hạ');
    }
    if (mingName === 'Đóa Nhan Tam Vệ' && !modernProvs.includes('Tỉnh Cát Lâm')) modernProvs.push('Tỉnh Cát Lâm');
    if (mingName === 'Dã Nhân Nữ Chân' && !modernProvs.includes('Khu tự trị Nội Mông Cổ')) modernProvs.push('Khu tự trị Nội Mông Cổ');

        if (mingName === 'Ninh Hạ') {
        if (!modernProvs.includes('Khu tự trị Nội Mông Cổ')) modernProvs.push('Khu tự trị Nội Mông Cổ');
        if (!modernProvs.includes('Tỉnh Cam Túc')) modernProvs.push('Tỉnh Cam Túc');
    }

    
    if (!modernProvs.length) return null;
    
    const fuMap = {};
    function getProvOfFu(fu) {
        for (let p in mingFuZhouCenters) {
            if (mingFuZhouCenters[p] && mingFuZhouCenters[p].some(f => f.name === fu)) return p;
        }
        return null;
    }

    for (let mpName of modernProvs) {
        if (mpName === 'Thành phố Bắc Kinh' || mpName === 'Thành phố Thiên Tân') { 
            if (mingName === 'Bắc Trực Lệ') {
                const adcode = mpName === 'Thành phố Bắc Kinh' ? '110000' : '120000';
                const distGeo = await fetchGeoJSON(adcode);
                if (distGeo && distGeo.features) {
                    if (!mingCountySearchIndex) buildCountyIndex();
                    distGeo.features.forEach(d => {
                        let modernName = d.properties.name;
                        let mCounty = (preciseCountyMap[mpName] && preciseCountyMap[mpName][modernName]) || modernCountyToMingCounty[modernName];
                        let targetFu = 'Phủ Thuận Thiên'; 
                        if (mCounty && mingCountySearchIndex && mingCountySearchIndex[mCounty]) {
                            targetFu = mingCountySearchIndex[mCounty][0].fu;
                        }
                        if (getProvOfFu(targetFu) === mingName) {
                            if (!fuMap[targetFu]) fuMap[targetFu] = [];
                            fuMap[targetFu].push(d);
                        }
                    });
                }
            }
            continue; 
        }
        if (mpName === 'Thành phố Thượng Hải') { 
            if (mingName === 'Nam Trực Lệ') {
                const distGeo = await fetchGeoJSON('310000');
                if (distGeo && distGeo.features) {
                    if (!mingCountySearchIndex) buildCountyIndex();
                    distGeo.features.forEach(d => {
                        let modernName = d.properties.name;
                        let mCounty = (preciseCountyMap[mpName] && preciseCountyMap[mpName][modernName]) || modernCountyToMingCounty[modernName];
                        let targetFu = 'Phủ Tùng Giang'; 
                        if (mCounty && mingCountySearchIndex && mingCountySearchIndex[mCounty]) {
                            targetFu = mingCountySearchIndex[mCounty][0].fu;
                        }
                        if (getProvOfFu(targetFu) === mingName) {
                            if (!fuMap[targetFu]) fuMap[targetFu] = [];
                            fuMap[targetFu].push(d);
                        }
                    });
                }
            }
            continue; 
        }
        if (mpName === 'Thành phố Trùng Khánh') {
            const districts = await fetchGeoJSON('500000');
            if (districts) {
                districts.features.forEach(d => {
                    const distName = d.properties.name;
                    const mapping = citySplitConfig['Thành phố Trùng Khánh'].mapping;
                    const fu = mapping[distName] || mapping['default'];
                    const targetProv = getProvOfFu(fu) || modernToMingProvince[mpName];
                    if (targetProv === mingName) {
                        if (!fuMap[fu]) fuMap[fu] = [];
                        fuMap[fu].push(d);
                    }
                });
            }
            continue;
        }
        
        const adcode = PROVINCE_ADCODE[mpName];
        if (!adcode) continue;
        const cityGeo = await fetchGeoJSON(adcode);
        if (!cityGeo) continue;
        
        const defaultFu = modernProvinceDefaultFu[mpName] || modernToMingProvince[mpName];
        for (let cityFeat of cityGeo.features) {
            cityFeat = removeTanggulaEnclave(cityFeat); // <-- Chặn và cắt bỏ lãnh thổ tách rời
            const cityName = cityFeat.properties.name;

            
            if (citySplitConfig[cityName]) {
                const cityAdcode = citySplitConfig[cityName].adcode;
                const whDistricts = await fetchGeoJSON(cityAdcode);
                if (whDistricts) {
                    whDistricts.features.forEach(d => {
                        const distName = d.properties.name;
                        const mapping = citySplitConfig[cityName].mapping;
                        const fu = mapping[distName] || mapping['default'] || modernCityToMingFu[cityName] || defaultFu;
                        
                        const targetProv = getProvOfFu(fu) || modernToMingProvince[mpName];
                        if (targetProv === mingName) {
                            if (!fuMap[fu]) fuMap[fu] = [];
                            fuMap[fu].push(d);
                        }
                    });
                    continue;
                }
            }
            
            const fu = modernCityToMingFu[cityName] || defaultFu;
            const targetProv = getProvOfFu(fu) || modernToMingProvince[mpName];
            if (targetProv === mingName) {
                if (!fuMap[fu]) fuMap[fu] = [];
                fuMap[fu].push(cityFeat);
            }
        }
    }
    
    if (!Object.keys(fuMap).length) return null;
    
    const features = [];
    // Thay bằng for...of Vòng lặp không đồng bộ, gọi Turf Tiến hành hợp nhất xóa khe hở hoàn hảo
    for (const fu of Object.keys(fuMap)) {
        const mergedFeat = await mergeFeaturesWithTurf(fuMap[fu], fu);
        features.push(mergedFeat);
    }
    return {type:'FeatureCollection',features};
}

// Lấy lớp thứ 3: Ranh giới quận huyện, sau đó chuyển đổi và hợp nhất thành lãnh thổ cấp huyện thời Minh
// Thay thế mã
async function buildMingCountyGeoJSON(mingProv, mingFu) {

    // ================= Mới: Xử lý độc lập dữ liệu quận huyện Lưu Cầu =================
    if (mingProv === 'Lưu Cầu') {
        if (window._cachedRyukyuFeature) {
            let f = JSON.parse(JSON.stringify(window._cachedRyukyuFeature));
            f.properties.name = 'Trung Sơn'; // Tên lớp thứ ba (Phủ Trung Sơn, thủ phủ vương quốc Lưu Cầu)
            return { type: 'FeatureCollection', features: [f] };
        }
        return null;
    }
    // ================= Thống nhất dữ liệu quận huyện cấp cao của các nước láng giềng (Kết xuất Level 2) =================
    const customForeignMapCounty = {
        'Nhật Bản': { 
            codes: ['JPN'], 
            fetchLevel: 1, // Lớp thứ 3 của Nhật Bản vẫn sử dụng Level 1 Phân chia
            processFeature: (f, targetFu) => {
                let newF = removeJapanIslands(f);
                if (!newF) return null;
                let name = newF.properties.NL_NAME_1 || newF.properties.NAME_1 || '';
                let clean = name.replace(/[都道府県]$/, '');
                if (clean === 'Okinawa') return null;
                let edo = japanToEdoMap[clean] || clean;
                let region = edoToRegionMap[edo] || edo;
                if (region === targetFu) {
                    newF.properties._fu = region;
                    newF.properties.name = edo;
                    return newF;
                }
                return null;
            }
        },
        'Triều Tiên': { 
            codes: ['KOR', 'PRK'], 
            fetchLevel: 2, 
            processFeature: (f, targetFu) => {
                let provName = f.properties.NAME_1 || f.properties.NL_NAME_1 || '';
                let paldoName = koreaToJoseonMap[provName] || 'Gyeonggi-do';
                if (paldoName === targetFu) {
                    let modernCounty = f.properties.NAME_2 || f.properties.NL_NAME_2 || '';
                    let cleanCounty = modernCounty.replace(/[- ]?(si|gun|gu|do|shi|city|county)$/i, '').replace(/[市郡구군시]$/, '');
                    const directCities = ['Seoul', 'Busan', 'Daegu', 'Incheon', 'Gwangju', 'Daejeon', 'Ulsan', 'Sejong', 'P\'yŏngyang', 'Namp\'o', 'Rasŏn', 'Kaesŏng', 'Jeju-do'];
                    let joseonName;
                    if (directCities.includes(provName)) {
                        joseonName = joseonCountyMap[provName];
                    } else {
                        joseonName = joseonCountyMap[cleanCounty] || joseonCountyMap[modernCounty];
                    }
                    f.properties._fu = paldoName;
                    f.properties.name = joseonName; // Cho phép là undefined, Hút dính vật lý tiếp theo
                    return f;
                }
                return null;
            }
        },
        'Khách Nhĩ Khách (Khalkha)': { codes: ['MNG'], map1: khalkhaToCountyMap, map2: khalkhaCountyToFuMap },
        'Nepal': { codes: ['NPL'], map1: nepalToCountyMap, map2: nepalCountyToFuMap },
        'Bhutan': { codes: ['BTN'], map1: bhutanToCountyMap, map2: bhutanCountyToFuMap },
        'Lạn Thương': { codes: ['LAO'], map1: lancangToCountyMap, map2: lancangCountyToFuMap },
        'Xiêm La': { codes: ['THA'], map1: siamToCountyMap, map2: siamCountyToFuMap },
        'Chúa Trịnh': { codes: ['VNM'], map1: vietnamToCountyMap, map2: vietnamCountyToFuMap, validFus: ['Giao Chỉ', 'Thanh Hóa'] },
        'Quảng Nam': { codes: ['VNM'], map1: vietnamToCountyMap, map2: vietnamCountyToFuMap, validFus: ['Thuận Hóa', 'Quảng Nam', 'Chiêm Thành', 'Thủy Chân Lạp'] },
        'Mughal': { codes: ['IND', 'PAK', 'BGD'], map1: mughalToCountyMap, map2: mughalCountyToFuMap }
    };

    if (customForeignMapCounty[mingProv]) {
        const conf = customForeignMapCounty[mingProv];
        const countyMap = {};
        let sortedKeys = conf.map1 ? Object.keys(conf.map1).sort((a, b) => b.length - a.length) : [];
        
        for (let code of conf.codes) {
            const geoData = await fetchGeoJSON(`${code}_${conf.fetchLevel || 1}`);
            if (!geoData || !geoData.features) continue;

            let currentFeatures = JSON.parse(JSON.stringify(geoData.features));

            if (mingProv === 'Chúa Trịnh') {
                currentFeatures = currentFeatures.filter(f => { let c = getFeatureCenter(f); return c && c[1] >= 17.5; });
            } else if (mingProv === 'Quảng Nam') {
                currentFeatures = currentFeatures.filter(f => { let c = getFeatureCenter(f); return c && c[1] < 17.5; });
            }

            let mappedFeatures = [];
            let unmappedFeatures = [];

            currentFeatures.forEach(f => {
                f.properties = f.properties || {}; 
                f.properties._center = getFeatureCenter(f) || [0, 0];

                if (conf.processFeature) {
                    let newF = conf.processFeature(f, mingFu);
                    if (newF) {
                        if (newF.properties.name) mappedFeatures.push(newF);
                        else unmappedFeatures.push(newF);
                    }
                } else {
                    let allProps = Object.values(f.properties).filter(v => typeof v === 'string')
                                    .join('|').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f\s\-_]/g, "");
                    let countyName = null;
                    for (let k of sortedKeys) {
                        let cleanK = k.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f\s\-_]/g, "");
                        if (cleanK.length >= 2 && allProps.includes(cleanK)) { countyName = conf.map1[k]; break; }
                    }
                    if (countyName) {
                        let fuName = conf.map2[countyName] || countyName;
                        if (conf.validFus && !conf.validFus.includes(fuName)) {
                            fuName = mingProv === 'Chúa Trịnh' ? 'Thanh Hóa' : (mingProv === 'Quảng Nam' ? 'Thuận Hóa' : conf.validFus[0]);
                            countyName = mingProv === 'Chúa Trịnh' ? 'Nghệ An' : (mingProv === 'Quảng Nam' ? 'Quảng Bình' : Object.keys(conf.map2).find(k => conf.map2[k] === fuName) || countyName);
                        }
                        let newF = JSON.parse(JSON.stringify(f));
                        newF.properties._fu = fuName;
                        newF.properties.name = countyName;
                        mappedFeatures.push(newF);
                    } else {
                        unmappedFeatures.push(JSON.parse(JSON.stringify(f)));
                    }
                }
            });

            // Hấp phụ vật lý (Xử lý liền mạch các đảo xa hoặc khu vực chưa khớp)
            unmappedFeatures.forEach(uf => {
                if (mappedFeatures.length > 0) {
                    let closestF = mappedFeatures[0];
                    let minD = Infinity;
                    mappedFeatures.forEach(mf => {
                        let dx = uf.properties._center[0] - mf.properties._center[0];
                        let dy = uf.properties._center[1] - mf.properties._center[1];
                        let d = dx*dx + dy*dy;
                        if (d < minD) { minD = d; closestF = mf; }
                    });
                    uf.properties._fu = closestF.properties._fu;
                    uf.properties.name = closestF.properties.name;
                } else {
                    uf.properties._fu = mingFu;
                    let fallbackCounty;
                    if (conf.map2) {
                        fallbackCounty = Object.keys(conf.map2).find(k => conf.map2[k] === mingFu) || Object.keys(conf.map1)[0];
                    } else {
                        const safeDaoFallback = {
                            'Gyeonggi-do': 'Phủ Hán Thành', 'Pyongan-do': 'Phủ Bình Nhưỡng', 'Hamgyong-do': 'Phủ Hamheung', 'Hwanghae-do': 'Mục Haeju',
                            'Gangwon-do': 'Phủ Đại đô hộ Gangneung', 'Chungcheong-do': 'Mục Gongju', 'Gyeongsang-do': 'Phủ Gyeongju', 'Jeolla-do': 'Phủ Jeonju'
                        };
                        fallbackCounty = safeDaoFallback[mingFu] || 'Khu vực không xác định';
                    }
                    uf.properties.name = fallbackCounty;
                }
                mappedFeatures.push(uf);
            });

            // Cuối cùng lắp ráp các khối bản đồ theo phủ mục tiêu được truyền vào
            mappedFeatures.forEach(f => {
                if (f.properties._fu === mingFu) {
                    let cName = f.properties.name;
                    if (!countyMap[cName]) countyMap[cName] = [];
                    countyMap[cName].push(f);
                }
            });
        }

        const features = [];
        // Gọi phiên bản tăng cường Turf Gộp logic, loại bỏ các lỗ hổng ranh giới quận huyện bên trong còn sót lại
        for (const cName of Object.keys(countyMap)) {
            const mergedFeat = await mergeFeaturesWithTurf(countyMap[cName], cName);
            features.push(mergedFeat);
        }
        return { type: 'FeatureCollection', features };
    }


    const genericForeignCodesCounty = {
        'Mughal': ['IND', 'PAK', 'BGD'], 
        'Lạn Thương': ['LAO'], 'Xiêm La': ['THA']
    };

    if (genericForeignCodesCounty[mingProv]) {
        const codes = genericForeignCodesCounty[mingProv];
        let features = [];
        for (let code of codes) {
            const geoData = await fetchGeoJSON(`${code}_2`); 
            if (geoData && geoData.features) {
                geoData.features.forEach(f => {
                    let prefName = f.properties.NL_NAME_1 || f.properties.NAME_1 || 'Khu vực không xác định';
                    if (prefName === mingFu) {
                        let newF = JSON.parse(JSON.stringify(f));
                        let countyName = newF.properties.NL_NAME_2 || newF.properties.NAME_2 || newF.properties.NAME_1;
                        newF.properties.name = countyName;
                        features.push(newF);
                    }
                });
            }
        }
        return { type: 'FeatureCollection', features: features };
    }
    // =============================================================



    if (!mingCountySearchIndex) buildCountyIndex();
    let modernProvs = Object.keys(modernToMingProvince).filter(k => modernToMingProvince[k] === mingProv);

    
    // ==== Bắt đầu logic trích xuất vùng lãnh thổ tách rời liên tỉnh ====
    if (['Sát Cáp Nhĩ', 'Thổ Mặc Đặc', 'Đóa Nhan Tam Vệ'].includes(mingProv)) {
        if (!modernProvs.includes('Khu tự trị Nội Mông Cổ')) modernProvs.push('Khu tự trị Nội Mông Cổ');
        if (!modernProvs.includes('Tỉnh Hà Bắc')) modernProvs.push('Tỉnh Hà Bắc');
        if (mingProv === 'Đóa Nhan Tam Vệ' && !modernProvs.includes('Tỉnh Liêu Ninh')) modernProvs.push('Tỉnh Liêu Ninh');
    }
    if (mingProv === 'Thanh Hải' && !modernProvs.includes('Khu tự trị Nội Mông Cổ')) modernProvs.push('Khu tự trị Nội Mông Cổ');

    // Kéo dữ liệu liên tỉnh Tây Nam và Lưỡng Quảng:
    if (mingProv === 'Tứ Xuyên') {
        if (!modernProvs.includes('Tỉnh Quý Châu')) modernProvs.push('Tỉnh Quý Châu');
        if (!modernProvs.includes('Tỉnh Vân Nam')) modernProvs.push('Tỉnh Vân Nam');
    }
    if (mingProv === 'Quý Châu') {
        if (!modernProvs.includes('Tỉnh Tứ Xuyên')) modernProvs.push('Tỉnh Tứ Xuyên');
        if (!modernProvs.includes('Khu tự trị dân tộc Choang Quảng Tây')) modernProvs.push('Khu tự trị dân tộc Choang Quảng Tây');
        if (!modernProvs.includes('Tỉnh Hồ Nam')) modernProvs.push('Tỉnh Hồ Nam');
    }
    if (mingProv === 'Vân Nam' && !modernProvs.includes('Tỉnh Tứ Xuyên')) modernProvs.push('Tỉnh Tứ Xuyên');
    if (mingProv === 'Quảng Đông' && !modernProvs.includes('Khu tự trị dân tộc Choang Quảng Tây')) modernProvs.push('Khu tự trị dân tộc Choang Quảng Tây');
    if (mingProv === 'Quảng Tây') {
        if (!modernProvs.includes('Tỉnh Quảng Đông')) modernProvs.push('Tỉnh Quảng Đông');
        if (!modernProvs.includes('Tỉnh Quý Châu')) modernProvs.push('Tỉnh Quý Châu');
        if (!modernProvs.includes('Tỉnh Hồ Nam')) modernProvs.push('Tỉnh Hồ Nam');
    }
    if (mingProv === 'Hồ Quảng') {
        if (!modernProvs.includes('Khu tự trị dân tộc Choang Quảng Tây')) modernProvs.push('Khu tự trị dân tộc Choang Quảng Tây');
        if (!modernProvs.includes('Tỉnh Quý Châu')) modernProvs.push('Tỉnh Quý Châu');
    }
    
    // Hoa Đông/Lấy dữ liệu vùng lãnh thổ tách rời liên tỉnh ở Trung Nguyên:
    if (mingProv === 'Nam Trực Lệ' && !modernProvs.includes('Tỉnh Giang Tây')) modernProvs.push('Tỉnh Giang Tây');
    if (mingProv === 'Bắc Trực Lệ') {
        if (!modernProvs.includes('Tỉnh Hà Nam')) modernProvs.push('Tỉnh Hà Nam');
        if (!modernProvs.includes('Tỉnh Sơn Đông')) modernProvs.push('Tỉnh Sơn Đông');
    }
    if (mingProv === 'Hà Nam' && !modernProvs.includes('Tỉnh Hà Bắc')) modernProvs.push('Tỉnh Hà Bắc');
    if (mingProv === 'Sơn Đông') {
        if (!modernProvs.includes('Tỉnh Hà Bắc')) modernProvs.push('Tỉnh Hà Bắc');
        if (!modernProvs.includes('Tỉnh Hà Nam')) modernProvs.push('Tỉnh Hà Nam');
    }
    
    // Tây Bắc và Đông Bắc/Kéo liên tỉnh vùng biên giới:
    if (mingProv === 'Thiểm Tây') {
        if (!modernProvs.includes('Tỉnh Thanh Hải')) modernProvs.push('Tỉnh Thanh Hải');
        if (!modernProvs.includes('Khu tự trị dân tộc Hồi Ninh Hạ')) modernProvs.push('Khu tự trị dân tộc Hồi Ninh Hạ');
    }
    if (mingProv === 'Đóa Nhan Tam Vệ' && !modernProvs.includes('Tỉnh Cát Lâm')) modernProvs.push('Tỉnh Cát Lâm');
    if (mingProv === 'Dã Nhân Nữ Chân' && !modernProvs.includes('Khu tự trị Nội Mông Cổ')) modernProvs.push('Khu tự trị Nội Mông Cổ');


    
    // Sửa lỗi: Đảm bảo lớp thứ ba của Ninh Hạ có thể lấy dữ liệu Nội Mông (A Lạp Thiện)
    if (mingProv === 'Ninh Hạ') {
        if (!modernProvs.includes('Khu tự trị Nội Mông Cổ')) modernProvs.push('Khu tự trị Nội Mông Cổ');
        if (!modernProvs.includes('Tỉnh Cam Túc')) modernProvs.push('Tỉnh Cam Túc');
    }
    // ==== Kết thúc logic trích xuất vùng lãnh thổ tách rời liên tỉnh ====

    let rawFeatures = [];

    for (let mp of modernProvs) {
        if (mp === 'Thành phố Bắc Kinh' || mp === 'Thành phố Thiên Tân') {
            const adcode = mp === 'Thành phố Bắc Kinh' ? '110000' : '120000';
            const geo = await fetchGeoJSON(adcode);
            if (geo && geo.features) {
                geo.features.forEach(f => {
                    let modernName = f.properties.name;
                    let mCounty = (preciseCountyMap[mp] && preciseCountyMap[mp][modernName]) || modernCountyToMingCounty[modernName];
                    let targetFu = null;
                    if (mCounty && mingCountySearchIndex && mingCountySearchIndex[mCounty]) {
                        targetFu = mingCountySearchIndex[mCounty][0].fu;
                    }
                    if (targetFu === mingFu) {
                        let newF = JSON.parse(JSON.stringify(f));
                        newF.properties._parentCity = mp;
                        rawFeatures.push(newF);
                    }
                });
            }
            continue;
        }

        if (mp === 'Thành phố Thượng Hải') {
            const geo = await fetchGeoJSON('310000');
            if (geo && geo.features) {
                geo.features.forEach(f => {
                    let modernName = f.properties.name;
                    let mCounty = (preciseCountyMap[mp] && preciseCountyMap[mp][modernName]) || modernCountyToMingCounty[modernName];
                    let targetFu = null;
                    if (mCounty && mingCountySearchIndex && mingCountySearchIndex[mCounty]) {
                        targetFu = mingCountySearchIndex[mCounty][0].fu;
                    }
                    if (targetFu === mingFu) {
                        let newF = JSON.parse(JSON.stringify(f));
                        newF.properties._parentCity = mp;
                        rawFeatures.push(newF);
                    }
                });
            }
            continue;
        }
        if (mp === 'Thành phố Trùng Khánh') {
            const geo = await fetchGeoJSON('500000');
            if (geo && geo.features) {
                geo.features.forEach(f => {
                    const mapping = citySplitConfig['Thành phố Trùng Khánh'].mapping;
                    const fu = mapping[f.properties.name] || mapping['default'];
                    if (fu === mingFu) {
                        let newF = JSON.parse(JSON.stringify(f));
                        newF.properties._parentCity = mp;
                        rawFeatures.push(newF);
                    }
                });
            }
            continue;
        }
        
        const provAdcode = PROVINCE_ADCODE[mp];
        if (!provAdcode) continue;
        const provGeo = await fetchGeoJSON(provAdcode);
        if (!provGeo || !provGeo.features) continue;
        
        for (let cityFeat of provGeo.features) {
            const cityName = cityFeat.properties.name;
            const cityAdcode = cityFeat.properties.adcode;
            
            if (citySplitConfig[cityName]) {
                const mapping = citySplitConfig[cityName].mapping;
                const possibleFus = new Set([...Object.values(mapping), modernCityToMingFu[cityName], modernProvinceDefaultFu[mp], mingProv]);
                
                if (possibleFus.has(mingFu)) {
                    if (cityAdcode) {
                        const cityGeo = await fetchGeoJSON(cityAdcode);
                        if (cityGeo && cityGeo.features && cityGeo.features.length > 0) {
                            cityGeo.features.forEach(f => {
                                const mappedTo = mapping[f.properties.name] || mapping['default'] || modernCityToMingFu[cityName] || modernProvinceDefaultFu[mp] || mingProv;
                                if (mappedTo === mingFu) {
                                    let newF = JSON.parse(JSON.stringify(f));
                                    newF.properties._parentCity = cityName;
                                    rawFeatures.push(newF);
                                }
                            });
                        } else {
                            // Xử lý dự phòng: Nếu không có dữ liệu quận huyện con (Như phân chia thành phố đặc biệt)
                            const mappedTo = mapping['default'] || modernCityToMingFu[cityName] || modernProvinceDefaultFu[mp] || mingProv;
                            if (mappedTo === mingFu) {
                                let newF = JSON.parse(JSON.stringify(cityFeat));
                                newF.properties._parentCity = cityName;
                                rawFeatures.push(newF);
                            }
                        }
                    } else {
                        const mappedTo = mapping['default'] || modernCityToMingFu[cityName] || modernProvinceDefaultFu[mp] || mingProv;
                        if (mappedTo === mingFu) {
                            let newF = JSON.parse(JSON.stringify(cityFeat));
                            newF.properties._parentCity = cityName;
                            rawFeatures.push(newF);
                        }
                    }
                }
                continue;
            }
            
            const mappedFu = modernCityToMingFu[cityName] || modernProvinceDefaultFu[mp] || mingProv;
            if (mappedFu === mingFu) {
                if (cityAdcode) {
                    const cityGeo = await fetchGeoJSON(cityAdcode);
                    if (cityGeo && cityGeo.features && cityGeo.features.length > 0) {
                        cityGeo.features.forEach(f => {
                            let newF = JSON.parse(JSON.stringify(f));
                            newF.properties._parentCity = cityName;
                            rawFeatures.push(newF);
                        });
                    } else {
                        // Xử lý lùi lại sửa lỗi cốt lõi: Ứng phó với các thành phố cấp tỉnh không có đường viền cấp dưới như các thành phố và huyện của Tỉnh Hải Nam, Đông Quản, Trung Sơn, v.v.
                        let newF = JSON.parse(JSON.stringify(cityFeat));
                        newF.properties._parentCity = cityName;
                        rawFeatures.push(newF);
                    }
                } else {
                    let newF = JSON.parse(JSON.stringify(cityFeat));
                    newF.properties._parentCity = cityName;
                    rawFeatures.push(newF);
                }
            }
        }
    }
    
    if (!rawFeatures.length) return null;

    const countyMap = {};
    for (let f of rawFeatures) {
        if (!f.geometry) continue;
        const modernName = f.properties.name;
        const mingCountyName = getMingCountyName(f.properties._parentCity, modernName, mingProv, mingFu);
        if (!countyMap[mingCountyName]) countyMap[mingCountyName] = [];
        countyMap[mingCountyName].push(f);
    }

    const mergedFeatures = [];
    // Thay thế bằng for...of Vòng lặp không đồng bộ, gọi Turf Và xóa các lỗ hổng
    for (const cName of Object.keys(countyMap)) {
        const mergedFeat = await mergeFeaturesWithTurf(countyMap[cName], cName);
        mergedFeatures.push(mergedFeat);
    }

    return { type: 'FeatureCollection', features: mergedFeatures };
}


// ==========================================
// Logic xây dựng nền tảng của Bản đồ Toàn cảnh Phủ Châu
// ==========================================
let globalNationalPrefectureGeoJSON = null;
async function getNationalPrefectureGeoJSON(chartInstance) {
    if (globalNationalPrefectureGeoJSON) return globalNationalPrefectureGeoJSON;
    
    if (chartInstance) {
        chartInstance.showLoading({text:'Đang ghép bản đồ toàn cảnh phủ châu thiên hạ, tải lần đầu sẽ mất vài giây...', color:'#d4af37', maskColor:'rgba(10,14,23,0.8)'});
    }
    
    const allProvs = Object.keys(mingProvinceColors);
    const features = [];
    
    // Tải đồng thời theo đợt để tránh làm treo luồng chính
    for (let i = 0; i < allProvs.length; i += 5) {
        const chunk = allProvs.slice(i, i + 5);
        const results = await Promise.all(chunk.map(async p => {
            const geo = await buildMingPrefectureGeoJSON(p);
            if (geo && geo.features) {
                // Gắn thẻ tỉnh trực thuộc cho mỗi phủ châu để tô màu sau này
                geo.features.forEach(f => f.properties._prov = p);
            }
            return geo;
        }));
        for (let geo of results) {
            if (geo && geo.features) features.push(...geo.features);
        }
        await new Promise(r => setTimeout(r, 15)); // Tạm nghỉ để nhường luồng xử lý
    }
    
    globalNationalPrefectureGeoJSON = { type: 'FeatureCollection', features };
    if (chartInstance) chartInstance.hideLoading();
    return globalNationalPrefectureGeoJSON;
}

// ==========================================
// Kiểm soát kết xuất bản đồ
// ==========================================
function renderMingNationMap() {
    const win = mingMapFrame.contentWindow;
    if (!win.WORLD_1629 || !mingMapChartInstance || !win.echarts) return;
    
    const echarts = win.echarts;
    const mingGeo = buildEastAsiaGeo();
    
    if (!echarts.getMap('ming_nation')) {
        echarts.registerMap('ming_nation', mingGeo);
    }
    
    let targetZoom = mingMapGeoState?.zoom || 1.15;
    let targetCenter = mingMapGeoState?.center || [108,34];
    
    if (mingMapSearchTarget && mingMapSearchTarget.level === 'nation') {
        targetCenter = mingProvinceCenters[mingMapSearchTarget.province] || targetCenter;
        targetZoom = 3.5;
        mingMapSearchTarget = null;
    }
    
    let option = {
        backgroundColor:'#0a0e17',
        tooltip:{trigger:'item',backgroundColor:'rgba(20,25,38,0.95)',borderColor:'#8b7355',textStyle:{color:'#e8d5a3'}},
        geo:{
            map:'ming_nation',
            roam:true,
            zoom: targetZoom,
            center: targetCenter,
            scaleLimit:{min:0.7,max:6},
            label:{show:true,color:'#ffffff',fontSize:11},emphasis:{label:{color:'#ffffff'}},
            itemStyle:{areaColor:'#1a2740',borderColor:'#2a3d5c',borderWidth:1},
            regions: mingGeo.features.map(f=>({
                name: f.properties.name,
                itemStyle: {areaColor: mingProvinceColors[f.properties.name]||'#666'}
            }))
        },
        series:[{type:'map',map:'ming_nation',geoIndex:0,silent:true}]
    };

    if (mingMapHeroLocation) {
        option.series.push({
            type: 'scatter', coordinateSystem: 'geo', zlevel: 5, silent: true,
            // Loại bỏ cài đặt thời gian hiệu ứng thừa, chuyển sang quản lý toàn cục
            data: [{ name: 'Vị trí nhân vật chính', value: mingMapHeroLocation.coord, rawLoc: mingMapHeroLocation.raw }],
            symbolSize: 12, itemStyle: { color: '#e74c3c', borderColor: '#fff', borderWidth: 1.5, shadowBlur: 3, shadowColor: 'rgba(0,0,0,0.8)' },
            label: { show: true, formatter: 'Vị trí nhân vật chính', position: 'right', color: '#fff', fontSize: 12, textBorderColor: '#000', textBorderWidth: 2 },
            tooltip: { show: false } 
        });
    }

    // [Sửa lỗi cốt lõi]: Tắt hoạt ảnh phiên bản toàn cục, để chấm đỏ luôn bám chặt vào bản đồ nền, xóa bỏ mọi hiện tượng kéo thả bị đứt đoạn và phân cấp bay loạn.
    option.animation = false;
    mingMapChartInstance.setOption(option, true);

    
    mingMapCurrentLevel = 'nation'; 
    mingMapCurrentProvince = null;
    mingMapCurrentPrefecture = null;
    mingMapPrefectureGeoState = null;
    mingMapFrameDocument.getElementById('breadcrumb').innerHTML = '<span class="crumb current" data-action="back-nation">🌏 Thiên hạ</span>';
    mingMapFrameDocument.getElementById('breadcrumb-wrapper').style.display = 'flex';
    mingMapFrameDocument.getElementById('back-btn').style.display = 'none';
    updateMingLegendNation();
}


let mingMapOpenedFus = []; // Mới: Lưu tất cả các phủ châu được mở rộng cùng lúc, hỗ trợ xem khi chọn nhiều
let mingMapDisplayMode = 'single'; // Mới: Kiểm soát chế độ lớp đơn hiện tại(single) Hay chế độ toàn cảnh(panorama), Mặc định một lớp

async function renderMingPrefectureMap(mingName) {
    if (!mingMapChartInstance || !mingMapFrame.contentWindow.echarts) return;
    const echarts = mingMapFrame.contentWindow.echarts;

    let geoJSON;
    let mapName;
    
    // ================== Nhánh lấy dữ liệu ==================
    if (mingMapDisplayMode === 'panorama') {
        geoJSON = await getNationalPrefectureGeoJSON(mingMapChartInstance);
        if (!geoJSON || !geoJSON.features.length) return;
        mapName = 'ming_fu_all';
    } else {
        // Chế độ lớp đơn khôi phục cách lấy dữ liệu nguyên bản nhất
        mingMapChartInstance.showLoading({text:'Tải phủ châu...',color:'#d4af37', maskColor:'rgba(10,14,23,0.8)'});
        geoJSON = await buildMingPrefectureGeoJSON(mingName);
        mingMapChartInstance.hideLoading();
        if (!geoJSON || !geoJSON.features.length) {
            mingMapChartInstance.setOption({title:{text:'Tạm thời không có ranh giới Phủ Châu',left:'center',top:'center',textStyle:{color:'#e8d5a3', fontSize: 16}},backgroundColor:'#0a0e17'});
            setTimeout(() => { if (mingMapChartInstance) mingMapChartInstance.setOption({title:{text:''}}); }, 1500);
            return;
        }
        mapName = 'ming_fu_' + mingName;
    }
    
    if (!echarts.getMap(mapName)) {
        echarts.registerMap(mapName, geoJSON);
    }
    
    // ================== Tính toán thu phóng và tâm điểm ==================
    let currentOpt = mingMapChartInstance.getOption();
    let currentZoom = (currentOpt && currentOpt.geo && currentOpt.geo.length) ? currentOpt.geo[0].zoom : 1.15;
    let currentCenter = (currentOpt && currentOpt.geo && currentOpt.geo.length) ? currentOpt.geo[0].center : [108, 34];
    
    let targetZoom = mingMapPrefectureGeoState?.zoom || Math.max(currentZoom, 1.8);
    let targetCenter = mingMapPrefectureGeoState?.center || mingProvinceCenters[mingName] || currentCenter; 

    // Nếu là chế độ đơn tầng, khôi phục tỷ lệ ban đầu và thuật toán căn giữa mặc định, không bắt buộc gắn với tọa độ toàn cảnh.
    if (mingMapDisplayMode === 'single') {
        targetZoom = mingMapPrefectureGeoState?.zoom || 1.2;
        targetCenter = mingMapPrefectureGeoState?.center || null;
    }

    let highlightRegions = []; 

    // ================== Nhánh phân bổ kiểu ==================
    if (mingMapDisplayMode === 'panorama') {
        geoJSON.features.forEach(f => {
            let provName = f.properties._prov;
            let provColor = mingProvinceColors[provName] || '#1e2d45';
            highlightRegions.push({
                name: f.properties.name,
                itemStyle: { 
                    areaColor: provColor, 
                    borderColor: provName === mingName ? '#e8d5a3' : '#111827', 
                    borderWidth: provName === mingName ? 1.5 : 0.8
                },
                label: { 
                    show: true, hideOverlap: true,
                    color: provName === mingName ? '#ffffff' : 'rgba(255,255,255,0.4)', 
                    fontSize: provName === mingName ? (isMingMobile() ? 12 : 14) : (isMingMobile() ? 8 : 10)
                }
            });
        });
    }

    // Chặn định vị tìm kiếm
    if (mingMapSearchTarget && mingMapSearchTarget.province === mingName) {
        targetCenter = [mingMapSearchTarget.lng, mingMapSearchTarget.lat];
        // Ở chế độ toàn cảnh, bắt buộc phải sử dụng loại khổng lồ zoom giá trị mới có thể phóng to và lấy nét vào một phủ
        targetZoom = mingMapDisplayMode === 'panorama' ? 15 : 3.5; 
        if (mingMapSearchTarget.fu) {
            highlightRegions.push({
                name: mingMapSearchTarget.fu,
                itemStyle: { areaColor: 'rgba(212, 175, 55, 0.6)', borderColor: '#fff', borderWidth: 2 },
                label: { show: true, color: '#ffffff', fontSize: 14, fontWeight: 'bold' } 
            });
        }
        mingMapSearchTarget = null;
    }

    let seriesData = [ {type:'map', map:mapName, geoIndex:0, silent:false} ]; 

    // Ở chế độ toàn cảnh, nhân vật chính luôn được hiển thị dù ở đâu; ở chế độ đơn tầng, chỉ hiển thị trong tỉnh đang được tiêu điểm hiện tại.
    const showHero = mingMapHeroLocation && (mingMapDisplayMode === 'panorama' || mingMapHeroLocation.prov === mingName);

    if (showHero) {
        seriesData.push({
            type: 'scatter', coordinateSystem: 'geo', zlevel: 5, silent: true, 
            data: [{ name: 'Vị trí nhân vật chính', value: mingMapHeroLocation.coord, rawLoc: mingMapHeroLocation.raw }],
            symbolSize: 14, itemStyle: { color: '#e74c3c', borderColor: '#fff', borderWidth: 1.5, shadowBlur: 3, shadowColor: 'rgba(0,0,0,0.8)' },
            label: { show: true, formatter: 'Vị trí nhân vật chính', position: 'right', color: '#fff', fontSize: 13, textBorderColor: '#000', textBorderWidth: 2 },
            tooltip: { show: false }
        });
    }

    // ================== Echarts Tạo cấu hình kết xuất ==================
    let geoConfig = {
        map:mapName, roam:true, zoom: targetZoom, center: targetCenter,
        scaleLimit:{min:0.5, max: isMingMobile() ? 60 : 40}, 
        emphasis:{label:{color:'#ffffff'}, itemStyle:{areaColor: 'rgba(212, 175, 55, 0.4)'}},
        regions: highlightRegions 
    };

    if (mingMapDisplayMode === 'panorama') {
        geoConfig.label = { show: true, hideOverlap: true, fontSize: isMingMobile() ? 9 : 11, color: 'rgba(255,255,255,0.4)' };
    } else {
        // Chế độ lớp đơn khôi phục màu nền mặc định ban đầu
        geoConfig.itemStyle = {areaColor:'#1e2d45',borderColor:'#3a5070',borderWidth:1.2};
        geoConfig.label = { show: true, hideOverlap: true, color: '#ffffff', fontSize: isMingMobile() ? 12 : 14 };
    }

    mingMapChartInstance.setOption({
        animation: false, // [Sửa lỗi cốt lõi]: Tắt hiệu ứng toàn cục, loại bỏ cảm giác trễ khi kéo thả
        backgroundColor:'#0a0e17',
        tooltip:{trigger:'item',backgroundColor:'rgba(20,25,38,0.95)',borderColor:'#d4af37',textStyle:{color:'#e8d5a3'}},
        geo: geoConfig,
        series: seriesData
    }, true);
    
    mingMapCurrentLevel = 'province'; 
    mingMapCurrentProvince = mingName;
    mingMapCurrentPrefecture = null;
    mingMapOpenedFus = []; // Đặt lại bản ghi phủ châu đã mở rộng khi vào lớp tỉnh
    
    mingMapFrameDocument.getElementById('breadcrumb').innerHTML = `<span class="crumb" data-action="back-nation">🌏 Thiên hạ</span><span class="separator" style="color:var(--text-secondary)">›</span><span class="crumb current">📍 ${mingName}</span>`;
    mingMapFrameDocument.getElementById('breadcrumb-wrapper').style.display = 'flex';
    
    const backBtn = mingMapFrameDocument.getElementById('back-btn');
    backBtn.style.display = 'flex';
    backBtn.dataset.action = 'back-nation';
    updateMingLegendProvince(mingName);
}

// ==========================================
// Logic điều khiển bảng bên phải bản đồ (Thu phóng/Định vị)
// ==========================================
function handleMapControlBtn(action) {
    // Đánh chặn sự kiện click chuyển đổi chế độ
    if (action === 'toggle-mode') {
        mingMapDisplayMode = mingMapDisplayMode === 'single' ? 'panorama' : 'single';
        const btn = mingMapFrameDocument.getElementById('mode-toggle-btn');
        if (btn) {
            btn.title = `Chuyển đổi chế độ(Hiện tại:${mingMapDisplayMode === 'single' ? 'Một lớp' : 'Toàn cảnh'})`;
            btn.innerText = mingMapDisplayMode === 'single' ? '🗺️' : '🌐';
            btn.style.color = mingMapDisplayMode === 'single' ? '#8899aa' : '#d4af37';
        }
        
        // Làm mới giao diện hiện tại ngay lập tức để áp dụng chế độ mới
        if (mingMapCurrentLevel === 'province' && mingMapCurrentProvince) {
            renderMingPrefectureMap(mingMapCurrentProvince);
        } else if (mingMapCurrentLevel === 'prefecture' && mingMapCurrentProvince && mingMapCurrentPrefecture) {
            // Khi chuyển từ toàn cảnh về một lớp, xóa phần chọn nhiều, chỉ giữ lại phủ đang tập trung
            if (mingMapDisplayMode === 'single' && mingMapOpenedFus.length > 1) {
                mingMapOpenedFus = [{ prov: mingMapCurrentProvince, fu: mingMapCurrentPrefecture }];
            }
            renderMingCountyMap(mingMapCurrentProvince, mingMapCurrentPrefecture, 'refresh');
        }
        return;
    }

    if (!mingMapChartInstance) return;
    const opt = mingMapChartInstance.getOption();
    if (!opt || !opt.geo || !opt.geo[0]) return;
    
    let currentZoom = opt.geo[0].zoom || 1;
    
    if (action === 'zoom-in') {
        // Sửa đổi: Buộc thời gian hiệu ứng bằng 0, thu phóng tức thì, không bị trôi
        mingMapChartInstance.setOption({ animationDurationUpdate: 0, geo: { zoom: currentZoom * 1.5 } });
    } else if (action === 'zoom-out') {
        // Sửa đổi: Buộc thời gian hiệu ứng là 0
        mingMapChartInstance.setOption({ animationDurationUpdate: 0, geo: { zoom: currentZoom / 1.5 } });
    } else if (action === 'reset') {
        mingMapChartInstance.setOption({ animationDurationUpdate: 0 }); 
        mingMapChartInstance.dispatchAction({ type: 'restore' }); 
    } else if (action === 'locate-hero') {
        if (!mingMapHeroLocation) return; 
        
        const isNation = mingMapCurrentLevel === 'nation';
        const isProv = mingMapCurrentLevel === 'province' && mingMapCurrentProvince === mingMapHeroLocation.prov;
        const isCounty = mingMapCurrentLevel === 'prefecture' && mingMapCurrentProvince === mingMapHeroLocation.prov && mingMapCurrentPrefecture === mingMapHeroLocation.fu;
        
        if (isNation || isProv || isCounty) {
            // Ở chế độ toàn cảnh, bản đồ nền rất lớn, cần tỷ lệ phóng to cực cao mới có thể kéo lại gần; ở chế độ đơn tầng, bản đồ nền nhỏ, chỉ cần giữ nguyên mức 4x là đủ.
            let heroZoom = mingMapDisplayMode === 'panorama' ? 25 : 4;
            mingMapChartInstance.setOption({ 
                animationDurationUpdate: 0, 
                geo: { center: mingMapHeroLocation.coord, zoom: heroZoom } 
            });
        } else {
            mingMapSearchTarget = { level: 'prefecture', county: mingMapHeroLocation.county };
            renderMingCountyMap(mingMapHeroLocation.prov, mingMapHeroLocation.fu);
        }
    }
}




// Lớp thứ 3: Render bản đồ cấp quận/huyện
async function renderMingCountyMap(mingProv, mingFu, action = 'open') {
    if (!mingMapChartInstance || !mingMapFrame.contentWindow.echarts) return;
    const echarts = mingMapFrame.contentWindow.echarts;

    if (action === 'open') {
        const existingIdx = mingMapOpenedFus.findIndex(item => item.prov === mingProv && item.fu === mingFu);
        if (existingIdx < 0) {
            // Chế độ đơn tầng không hỗ trợ chọn nhiều, trước khi mở phủ mới sẽ tự động xóa các bản ghi trước đó.
            if (mingMapDisplayMode === 'single') mingMapOpenedFus = [];
            mingMapOpenedFus.push({ prov: mingProv, fu: mingFu });
        }
    }

    if (mingMapOpenedFus.length === 0) {
        renderMingPrefectureMap(mingMapCurrentProvince || mingProv);
        return;
    }

    mingMapChartInstance.showLoading({text:`Tải dữ liệu quận huyện...`,color:'#d4af37', maskColor:'rgba(10,14,23,0.8)'});
    
    let countyFeatures = [];
    for (let item of mingMapOpenedFus) {
        const cGeo = await buildMingCountyGeoJSON(item.prov, item.fu);
        if (cGeo && cGeo.features) {
            cGeo.features.forEach(f => f.properties._prov = item.prov);
            countyFeatures.push(...cGeo.features);
        }
    }
    
    let combinedGeoJSON;
    let bgFeatures = [];
    
    // ================== Nhánh hợp nhất dữ liệu ==================
    if (mingMapDisplayMode === 'panorama') {
        const nationalPrefGeoJSON = await getNationalPrefectureGeoJSON(null);
        bgFeatures = nationalPrefGeoJSON.features.filter(f => {
            return !mingMapOpenedFus.some(item => item.fu === f.properties.name && item.prov === f.properties._prov);
        });
        combinedGeoJSON = { type: 'FeatureCollection', features: [...bgFeatures, ...countyFeatures] };
    } else {
        // Chế độ một lớp: Bỏ hoàn toàn lớp nền dưới, chỉ giữ lại phủ huyện đang mở rộng
        if (!countyFeatures.length) {
            mingMapChartInstance.hideLoading();
            mingMapChartInstance.setOption({title:{text:'Hiện chưa có dữ liệu quận/huyện của phủ này',left:'center',top:'center',textStyle:{color:'#e8d5a3', fontSize: 16}},backgroundColor:'#0a0e17'});
            setTimeout(() => { if (mingMapChartInstance) mingMapChartInstance.setOption({title:{text:''}}); }, 1500);
            return;
        }
        combinedGeoJSON = { type: 'FeatureCollection', features: countyFeatures };
    }

    mingMapChartInstance.hideLoading();

    const mapName = `ming_county_ctx_${Date.now()}`;
    echarts.registerMap(mapName, combinedGeoJSON);

    let currentOpt = mingMapChartInstance.getOption();
    let currentZoom = (currentOpt && currentOpt.geo && currentOpt.geo.length) ? currentOpt.geo[0].zoom : 1.8;
    let currentCenter = (currentOpt && currentOpt.geo && currentOpt.geo.length) ? currentOpt.geo[0].center : [108, 34];

    let targetZoom = Math.max(currentZoom, 2.5); 
    let targetCenter = currentCenter; 

    let highlightRegions = [];

    // ================== Nhánh phân bổ kiểu ==================
    if (mingMapDisplayMode === 'panorama') {
        bgFeatures.forEach(f => {
            let provName = f.properties._prov;
            let provColor = mingProvinceColors[provName] || '#1e2d45';
            let isSameProv = mingMapOpenedFus.some(item => item.prov === provName);
            highlightRegions.push({
                name: f.properties.name,
                itemStyle: { 
                    areaColor: provColor, opacity: isSameProv ? 0.9 : 0.6, 
                    borderColor: '#111827', borderWidth: 0.8
                },
                label: { show: true, hideOverlap: true, color: 'rgba(255,255,255,0.3)', fontSize: isMingMobile() ? 8 : 10 }
            });
        });
        countyFeatures.forEach(f => {
            let provColor = mingProvinceColors[f.properties._prov] || '#1e2d45';
            highlightRegions.push({
                name: f.properties.name,
                itemStyle: { areaColor: provColor, borderColor: '#e8d5a3', borderWidth: 1.5 },
                label: { show: true, hideOverlap: true, color: '#ffffff', fontSize: isMingMobile() ? 10 : 14 } 
            });
        });
    }

    if (mingMapSearchTarget && mingMapSearchTarget.level === 'prefecture') {
        const targetCounty = mingMapSearchTarget.county;
        if (targetCounty) {
            let exactCenter = null;
            let targetFeature = countyFeatures.find(x => x.properties.name === targetCounty);
            if (targetFeature) {
                exactCenter = getFeatureCenter(targetFeature);
            }
            if (!exactCenter) {
                // Nếu không tính được trung tâm của huyện, hãy sử dụng trung tâm của phủ đó làm dự phòng, để tránh việc lấy nét bị lệch.
                let fuList = mingFuZhouCenters[mingProv] || [];
                let fuObj = fuList.find(f => f.name === mingFu);
                if (fuObj) exactCenter = [fuObj.lng, fuObj.lat];
            }
            
            if (exactCenter) targetCenter = exactCenter;
            
            // Trong chế độ toàn cảnh, cần mức độ cao của zoom Mới có thể phóng to và lấy nét vào một quận huyện nhỏ bé
            targetZoom = mingMapDisplayMode === 'panorama' ? 30 : 5.0; 
            highlightRegions.push({
                name: targetCounty,
                itemStyle: { areaColor: 'rgba(212, 175, 55, 0.6)', borderColor: '#fff', borderWidth: 2 },
                label: { show: true, hideOverlap: true, color: '#ffffff', fontSize: isMingMobile() ? 13 : 16, fontWeight: 'bold' }
            });
        }
        mingMapSearchTarget = null; 
    } else if (action === 'open') {
        if (mingMapDisplayMode === 'panorama') {
            const nationalPrefGeoJSON = await getNationalPrefectureGeoJSON(null);
            let targetPrefFeature = nationalPrefGeoJSON.features.find(f => f.properties.name === mingFu && f.properties._prov === mingProv);
            if (targetPrefFeature) {
                let prefCenter = getFeatureCenter(targetPrefFeature);
                if (prefCenter) {
                    targetCenter = prefCenter;
                    // Nhân tiện nâng cấp ở chế độ toàn cảnh: ngay cả khi chỉ nhấp bình thường vào danh sách để vào phủ, vẫn có thể trải nghiệm hiệu ứng tự động kéo góc nhìn lại gần.
                    if (targetZoom < 12) targetZoom = 12;
                }
            }
        } else {
            // Chế độ đơn tầng: Không cần phải cố định tọa độ toàn cảnh, trực tiếp quay lại phiên bản 1.2 mặc định căn giữa hiển thị toàn bộ phủ đơn.
            targetCenter = null;
            targetZoom = 1.2;
        }
    }

    let seriesData = [ {type:'map', map:mapName, geoIndex:0, silent:false} ];

    // Ở chế độ toàn cảnh, nhân vật chính luôn được hiển thị dù ở đâu; ở chế độ đơn tầng, nhân vật chính chỉ hiển thị khi ở trong phủ châu đang mở hiện tại.
    const showHero = mingMapHeroLocation && (
        mingMapDisplayMode === 'panorama' || 
        mingMapOpenedFus.some(item => item.prov === mingMapHeroLocation.prov && item.fu === mingMapHeroLocation.fu)
    );

    if (showHero) {
        seriesData.push({
            type: 'scatter', coordinateSystem: 'geo', zlevel: 5, silent: true, 
            data: [{ name: 'Vị trí nhân vật chính', value: mingMapHeroLocation.coord, rawLoc: mingMapHeroLocation.raw }],
            symbolSize: 16, itemStyle: { color: '#e74c3c', borderColor: '#fff', borderWidth: 2, shadowBlur: 3, shadowColor: 'rgba(0,0,0,0.8)' },
            label: { show: true, formatter: 'Vị trí nhân vật chính', position: 'top', color: '#fff', fontSize: 14, textBorderColor: '#000', textBorderWidth: 2 },
            tooltip: { show: false }
        });
    }

    // ================== Echarts Tạo cấu hình kết xuất ==================
    let geoConfig = {
        map:mapName, roam:true, zoom: targetZoom, center: targetCenter,
        scaleLimit:{min:0.5, max: isMingMobile() ? 80 : 35}, 
        emphasis:{label:{color:'#ffffff'}, itemStyle:{areaColor: 'rgba(212, 175, 55, 0.4)'}},
        regions: highlightRegions 
    };

    if (mingMapDisplayMode === 'panorama') {
        geoConfig.label = { show: true, hideOverlap: true, fontSize: isMingMobile() ? 9 : 12, color: 'rgba(255,255,255,0.6)' };
    } else {
        // Chế độ lớp đơn khôi phục màu nền mặc định ban đầu
        geoConfig.itemStyle = {areaColor:'#1a2740',borderColor:'#3a5070',borderWidth:1};
        geoConfig.label = { show: true, hideOverlap: true, color: '#ffffff', fontSize: isMingMobile() ? 12 : 15 };
    }

    mingMapChartInstance.setOption({
        animation: false, // [Sửa lỗi cốt lõi]: Tắt hiệu ứng toàn cục, giải pháp cốt lõi để giải quyết tình trạng bị trôi khi kéo thả các điểm
        backgroundColor:'#0a0e17',
        tooltip:{trigger:'item',backgroundColor:'rgba(20,25,38,0.95)',borderColor:'#d4af37',textStyle:{color:'#e8d5a3'}},
        geo: geoConfig,
        series: seriesData
    }, true);

    mingMapCurrentLevel = 'prefecture'; 
    mingMapCurrentProvince = mingProv; 
    mingMapCurrentPrefecture = mingFu; 
    
    mingMapFrameDocument.getElementById('breadcrumb-wrapper').style.display = 'flex';
    let titleStr = mingMapOpenedFus.length > 1 ? `Đã mở rộng ${mingMapOpenedFus.length} Phủ` : mingFu;
    
    mingMapFrameDocument.getElementById('breadcrumb').innerHTML = `<span class="crumb" data-action="back-nation">🌏 Thiên hạ</span><span class="separator" style="color:var(--text-secondary)">›</span><span class="crumb" data-action="back-province">📍 ${mingProv}</span><span class="separator" style="color:var(--text-secondary)">›</span><span class="crumb current">🏘️ ${titleStr}</span>`;
    
    const backBtn = mingMapFrameDocument.getElementById('back-btn');
    backBtn.style.display = 'flex';
    backBtn.dataset.action = 'back-province';
}


function updateMingLegendNation() {
    const legendListEl = mingMapFrameDocument.getElementById('legend-list');
    let html = '';
    mingLegendNames.forEach(p => {
        if (mingProvinceColors[p]) html += `<li data-ming="${p}"><span class="legend-dot" style="background:${mingProvinceColors[p]};"></span>${p}</li>`;
    });
    legendListEl.innerHTML = html;
}

function updateMingLegendProvince(name) {
    const legendListEl = mingMapFrameDocument.getElementById('legend-list');
    const list = mingFuZhouCenters[name]||[];
    let html = '';
    list.forEach(f => html += `<li data-ming-fu="${f.name}">● ${f.name}</li>`);
    legendListEl.innerHTML = html;
}

// ==========================================
// Vòng đời và sự kiện
// ==========================================
async function initMingEChartsMap() {
    const win = mingMapFrame.contentWindow;
    if (!win || !win.echarts) return;
    
    const mapChartEl = mingMapFrameDocument.getElementById('map-chart');
    if (!mapChartEl) return;
    
    if (mingMapChartInstance) {
        mingMapChartInstance.resize();
        return;
    }

    mingMapChartInstance = win.echarts.init(mapChartEl);
    
    // Xóa các sự kiện có thể bị bind trùng lặp
    mingMapChartInstance.off('click');
    mingMapChartInstance.off('dblclick');

    // Ghi lại thời gian và khu vực nhấp chuột, dùng để phán đoán nhấp đúp thủ công (Tương thích với thiết bị di động)
    let lastClickTime = 0;
    let lastClickName = '';

    // Hợp nhất sự kiện nhấp và nhấp đúp: dùng độ trễ thời gian để xử lý chính xác
    mingMapChartInstance.on('click', (params) => {
        if (!params.name || params.name === 'Vị trí nhân vật chính') return;
        
        const currentTime = new Date().getTime();
        // Nếu khoảng cách giữa hai lần nhấp chuột dưới 400 mili-giây và nhấp vào cùng một vị trí, sẽ được tính là nhấp đúp.
        const isDoubleClick = (currentTime - lastClickTime < 400) && (lastClickName === params.name);
        lastClickTime = currentTime;
        lastClickName = params.name;

        const isProvinceName = !!mingProvinceColors[params.name];
        let targetFu = null;
        let targetProv = getMingProvOfFu(params.name);
        
        if (targetProv) {
            targetFu = params.name;
        } else if (!isProvinceName) {
            if (!mingCountySearchIndex) buildCountyIndex();
            if (mingCountySearchIndex && mingCountySearchIndex[params.name]) {
                targetProv = mingCountySearchIndex[params.name][0].prov;
                targetFu = mingCountySearchIndex[params.name][0].fu;
            }
        }

        // ==============================
        // 1. Xử lý thao tác nhấp đúp (Chỉ thực thi logic thu gọn)
        // ==============================
        if (isDoubleClick) {
            if (isProvinceName) return; 
            
            if (mingMapCurrentLevel === 'prefecture' && targetProv && targetFu) {
                const existingIdx = mingMapOpenedFus.findIndex(item => item.prov === targetProv && item.fu === targetFu);
                if (existingIdx >= 0) {
                    // Cốt lõi: Loại bỏ khỏi mảng và kích hoạt chế độ làm mới (Không thay đổi góc nhìn)
                    mingMapOpenedFus.splice(existingIdx, 1);
                    renderMingCountyMap(mingMapCurrentProvince || targetProv, '', 'refresh');
                }
            }
            return; // Xử lý nhấp đúp hoàn tất, chấm dứt ngay, không thực thi logic nhấp chuột duy nhất bên dưới
        }

        // ==============================
        // 2. Xử lý thao tác nhấp chuột (Mở, chuyển hướng, xóa highlight)
        // ==============================
        if (mingMapCurrentLevel === 'nation') {
            if (isProvinceName) {
                const opt = mingMapChartInstance.getOption();
                if (opt && opt.geo && opt.geo[0]) mingMapGeoState = { center: opt.geo[0].center, zoom: opt.geo[0].zoom };
                renderMingPrefectureMap(params.name);
            }
            return;
        }
        
        if (mingMapCurrentLevel === 'province' || mingMapCurrentLevel === 'prefecture') {
            if (isProvinceName && !targetFu) {
                renderMingPrefectureMap(params.name);
                return;
            }
            
            if (targetProv && targetFu && targetFu !== 'Nước Lưu Cầu') {
                const isOpen = mingMapOpenedFus.some(item => item.prov === targetProv && item.fu === targetFu);
                if (!isOpen) {
                    if (mingMapCurrentLevel === 'province') {
                        const opt = mingMapChartInstance.getOption();
                        if (opt && opt.geo && opt.geo[0]) mingMapPrefectureGeoState = { center: opt.geo[0].center, zoom: opt.geo[0].zoom };
                    }
                    // Nhấp chuột kích hoạt mở
                    renderMingCountyMap(targetProv, targetFu, 'open');
                } else {
                    // Những nơi đã mở, khi nhấp chuột trái chỉ xóa vùng sáng tìm kiếm màu vàng kim, không tự động thu gọn.
                    const opt = mingMapChartInstance.getOption();
                    if (opt && opt.geo && opt.geo[0]) {
                        let currentRegions = opt.geo[0].regions || [];
                        currentRegions = currentRegions.filter(r => !r.itemStyle || r.itemStyle.areaColor !== 'rgba(212, 175, 55, 0.6)');
                        mingMapChartInstance.setOption({ geo: { regions: currentRegions } });
                    }
                }
            } else {
                // Vùng vô chủ, hủy highlight tìm kiếm
                const opt = mingMapChartInstance.getOption();
                if (opt && opt.geo && opt.geo[0]) {
                    let currentRegions = opt.geo[0].regions || [];
                    currentRegions = currentRegions.filter(r => !r.itemStyle || r.itemStyle.areaColor !== 'rgba(212, 175, 55, 0.6)');
                    mingMapChartInstance.setOption({ geo: { regions: currentRegions } });
                }
            }
        }
    });


    
    if (win.WORLD_1629) {
        if (mingMapCurrentLevel === 'prefecture' && mingMapCurrentPrefecture) {
            renderMingCountyMap(mingMapCurrentProvince, mingMapCurrentPrefecture);
        } else if (mingMapCurrentLevel === 'province' && mingMapCurrentProvince) {
            renderMingPrefectureMap(mingMapCurrentProvince);
        } else {
            renderMingNationMap();
        }
    }
}


function loadMingIframeScripts() {
    const win = mingMapFrame.contentWindow;
    if (!win || win._mingMapScriptsLoaded) return;
    win._mingMapScriptsLoaded = true;

    const doc = mingMapFrameDocument;
    const scriptEcharts = doc.createElement('script');
    scriptEcharts.src = 'https://cdn.jsdelivr.net/npm/echarts@5.5.0/dist/echarts.min.js';
    scriptEcharts.onload = () => {
        const scriptWorld = doc.createElement('script');
        scriptWorld.src = 'https://cdn.jsdelivr.net/gh/fairta/map@main/map/world_1629.js';
        scriptWorld.onload = () => {
            mingMapEchartsReady = true;
            if (mingMapIsOpen) initMingEChartsMap();
        };
        scriptWorld.onerror = () => { win._mingMapScriptsLoaded = false; };
        doc.head.appendChild(scriptWorld);
    };
    scriptEcharts.onerror = () => { win._mingMapScriptsLoaded = false; };
    doc.head.appendChild(scriptEcharts);
}

function bindMingFrameEvents() {
    const body = mingMapFrameDocument.body;
    if (body._clickHandler) body.removeEventListener('click', body._clickHandler);
    if (body._keyHandler) body.removeEventListener('keydown', body._keyHandler);
    if (body._inputHandler) body.removeEventListener('input', body._inputHandler);
    
    const clickHandler = (event) => {
        const target = event.target;
        
        // 1. Xử lý click tùy chọn gợi ý thả xuống
        const suggLi = target.closest('li[data-sugg]');
        if (suggLi) {
            const data = JSON.parse(decodeURIComponent(suggLi.dataset.sugg));
            jumpToSuggestion(data);
            return;
        }
        
        // 2. Khi nhấp vào khu vực không phải tìm kiếm, hãy ẩn danh sách thả xuống và thu gọn ô tìm kiếm khi ô nhập liệu trống.
        const suggEl = mingMapFrameDocument.getElementById('search-suggestions');
        const searchBox = mingMapFrameDocument.getElementById('search-box');
        const searchInput = mingMapFrameDocument.getElementById('map-search-input');
        
        if (!target.closest('#search-wrapper')) {
            if (suggEl) suggEl.style.display = 'none';
            // Nếu nhấp ra bên ngoài và không có chữ nào trong ô tìm kiếm, sẽ tự động gập thu gọn lại.
            if (searchBox && searchBox.classList.contains('expanded') && searchInput && !searchInput.value.trim()) {
                searchBox.classList.remove('expanded');
            }
        }


        // ================= Bắt đầu thêm mới =================
        // 3. Xử lý click nút điều khiển bản đồ
        const ctrlBtn = target.closest('.ctrl-btn');
        if (ctrlBtn && ctrlBtn.dataset.action) {
            handleMapControlBtn(ctrlBtn.dataset.action);
            return;
        }
        // ================= Kết thúc thêm mới =================

        if (target.closest('[data-action="search"]')) {
            doMingMapSearch();
            return;
        }
        
        if (target.closest('[data-action="close"]')) {
            mingMapIsOpen = false;
            applyMingFrameLayout();
            return;
        }
        if (target.closest('[data-action="toggle-legend"]')) {
            const panel = mingMapFrameDocument.getElementById('legend-panel');
            if (panel) panel.classList.toggle('collapsed');
            return;
        }

        // Xử lý logic cửa sổ nhật ký (Nhấp vào nút để mở / Nhấn nút đóng hoặc viền đen lớp phủ để đóng)
        if (target.closest('[data-action="show-update"]')) {
            const modal = mingMapFrameDocument.getElementById('update-modal');
            if (modal) modal.style.display = 'flex';
            
            // Xóa chấm đỏ sau khi nhấp và ghi lại số phiên bản hiện tại vào bộ nhớ đệm cục bộ
            saveMingStorage('last_seen_version', MING_MAP_VERSION);
            const dot = mingMapFrameDocument.getElementById('update-red-dot');
            if (dot) dot.style.display = 'none';
            return;
        }
        if (target.closest('[data-action="close-update"]') || target.id === 'update-modal') {
            const modal = mingMapFrameDocument.getElementById('update-modal');
            if (modal) modal.style.display = 'none';
            return;
        }

        // Breadcrumb/Nút quay lại: Logic quay lui
        if (target.closest('[data-action="back-nation"]')) {
            renderMingNationMap();
            return;
        }
        if (target.closest('[data-action="back-province"]')) {
            renderMingPrefectureMap(mingMapCurrentProvince);
            return;
        }

        // Nhấp vào chú giải để xem chi tiết
        const legendLi = target.closest('li[data-ming]');
        if (legendLi) {
            if (mingMapCurrentLevel === 'nation' && mingMapChartInstance) {
                const opt = mingMapChartInstance.getOption();
                if (opt && opt.geo && opt.geo[0]) mingMapGeoState = { center: opt.geo[0].center, zoom: opt.geo[0].zoom };
            }
            renderMingPrefectureMap(legendLi.dataset.ming);
            return;
        }
        
        const legendFuLi = target.closest('li[data-ming-fu]');
        if (legendFuLi) {
            if (mingMapCurrentLevel === 'province' && mingMapChartInstance) {
                const opt = mingMapChartInstance.getOption();
                if (opt && opt.geo && opt.geo[0]) mingMapPrefectureGeoState = { center: opt.geo[0].center, zoom: opt.geo[0].zoom };
            }
            renderMingCountyMap(mingMapCurrentProvince, legendFuLi.dataset.mingFu);
            return;
        }
    };

    const keyHandler = (event) => {
        // Nhập vào true Xác định đây là do phím Enter kích hoạt
        if (event.key === 'Enter' && event.target.id === 'map-search-input') doMingMapSearch(true);
    };

    const inputHandler = (event) => {
        if (event.target.id === 'map-search-input') {
            handleSearchInput(event);
        }
    };

    body._clickHandler = clickHandler;
    body._keyHandler = keyHandler;
    body._inputHandler = inputHandler;
    body.addEventListener('click', clickHandler);
    body.addEventListener('keydown', keyHandler);
    body.addEventListener('input', inputHandler);
}


// ==========================================
// Cửa sổ nổi (Lamp) Và Iframe Logic vùng chứa
// ==========================================
function mingViewport() {
    const parent = window.parent || window;
    return { width: parent.innerWidth || 1280, height: parent.innerHeight || 720 };
}

function isMingMobile() { return mingViewport().width <= 768; }
function loadMingStorage(key, fallback) { try { return (window.parent?.localStorage ?? localStorage).getItem(`${STORAGE_PREFIX}${key}`) ?? fallback; } catch { return fallback; } }
function saveMingStorage(key, value) { try { (window.parent?.localStorage ?? localStorage).setItem(`${STORAGE_PREFIX}${key}`, value); } catch {} }

function applyMingLampLayout() {
    if (!mingMapLamp) return;
    const parentWindow = window.parent || window;
    const size = isMingMobile() ? 40 : 48;
    const savedPos = loadMingStorage('lamp_pos');
    const saved = savedPos ? JSON.parse(savedPos) : null;
    const left = saved?.left ?? parentWindow.innerWidth - size - 24;
    const top = saved?.top ?? Math.round((parentWindow.innerHeight - size) / 3); 
    
    Object.assign(mingMapLamp.style, {
        width: `${size}px`, height: `${size}px`,
        left: `${Math.max(8, Math.min(left, parentWindow.innerWidth - size - 8))}px`,
        top: `${Math.max(8, Math.min(top, parentWindow.innerHeight - size - 8))}px`,
    });
}

function applyMingFrameLayout() {
    if (!mingMapFrame || !mingMapLamp) return;
    const parentWindow = window.parent || window;
    const { width, height } = mingViewport();
    
    mingMapFrame.style.position = 'fixed'; mingMapFrame.style.border = '0';
    mingMapFrame.style.background = 'transparent'; mingMapFrame.style.zIndex = '99999';
    mingMapFrame.style.colorScheme = 'normal'; mingMapFrame.style.borderRadius = '16px';
    mingMapFrame.style.boxShadow = '0 10px 40px rgba(0,0,0,0.8)';
    
    if (mingMapIsOpen) {
        const panelWidth = Math.round(width * (isMingMobile() ? 0.98 : 0.85));
        const panelHeight = Math.round(height * (isMingMobile() ? 0.92 : 0.85));
        mingMapFrame.style.width = `${panelWidth}px`;
        mingMapFrame.style.height = `${panelHeight}px`;
        mingMapFrame.style.left = `${Math.max(8, Math.round((width - panelWidth) / 2))}px`;
        mingMapFrame.style.top = `${Math.max(8, Math.round((height - panelHeight) / 2))}px`;
        mingMapFrame.style.display = 'block';
        mingMapLamp.style.display = 'none';

        if (mingMapEchartsReady && !mingMapChartInstance) {
            setTimeout(initMingEChartsMap, 50);
        } else if (mingMapChartInstance) {
            setTimeout(() => mingMapChartInstance.resize(), 50);
        }
    } else {
        mingMapFrame.style.display = 'none';
        mingMapLamp.style.display = 'grid';
    }
}

function onMingLampDown(event) {
    if (mingMapIsOpen) return;
    const clientX = event.touches ? event.touches[0].clientX : event.clientX;
    const clientY = event.touches ? event.touches[0].clientY : event.clientY;
    const rect = mingMapLamp.getBoundingClientRect();
    mingMapDragState = { startX: clientX, startY: clientY, left: rect.left, top: rect.top, moved: false };
    mingMapLampDragMoved = false;
    mingMapLamp.style.transition = 'none';
    if (event.cancelable && !event.touches) event.preventDefault();
}

function onMingLampMove(event) {
    if (!mingMapDragState || mingMapIsOpen) return;
    const clientX = event.touches ? event.touches[0].clientX : event.clientX;
    const clientY = event.touches ? event.touches[0].clientY : event.clientY;
    const dx = clientX - mingMapDragState.startX;
    const dy = clientY - mingMapDragState.startY;
    if (Math.hypot(dx, dy) > 5) {
        mingMapDragState.moved = true;
        mingMapLampDragMoved = true;
    }
    const parentWindow = window.parent || window;
    const maxLeft = parentWindow.innerWidth - mingMapLamp.offsetWidth - 8;
    const maxTop = parentWindow.innerHeight - mingMapLamp.offsetHeight - 8;
    const newLeft = Math.min(maxLeft, Math.max(8, mingMapDragState.left + dx));
    const newTop = Math.min(maxTop, Math.max(8, mingMapDragState.top + dy));
    mingMapLamp.style.left = `${newLeft}px`;
    mingMapLamp.style.top = `${newTop}px`;
    if (event.cancelable) event.preventDefault();
}

function onMingLampUp(_event) {
    if (!mingMapDragState) return;
    mingMapLamp.style.transition = '';
    if (mingMapDragState.moved) {
        clampMingLampToViewport();
        saveMingStorage('lamp_pos', JSON.stringify({ left: Number.parseInt(mingMapLamp.style.left, 10), top: Number.parseInt(mingMapLamp.style.top, 10) }));
        mingMapLampDragJustEnded = true;
        setTimeout(() => { mingMapLampDragJustEnded = false; }, 150);
    }
    mingMapDragState = null;
}

function clampMingLampToViewport() {
    const parentWindow = window.parent || window;
    const rect = mingMapLamp.getBoundingClientRect();
    const margin = 8;
    let newLeft = rect.left;
    let newTop = rect.top;
    if (rect.right > parentWindow.innerWidth - margin) newLeft = parentWindow.innerWidth - mingMapLamp.offsetWidth - margin;
    if (rect.left < margin) newLeft = margin;
    if (rect.bottom > parentWindow.innerHeight - margin) newTop = parentWindow.innerHeight - mingMapLamp.offsetHeight - margin;
    if (rect.top < margin) newTop = margin;
    if (newLeft !== rect.left) mingMapLamp.style.left = `${newLeft}px`;
    if (newTop !== rect.top) mingMapLamp.style.top = `${newTop}px`;
}

function cleanupMingMap() {
    if (mingMapSyncTimer) clearInterval(mingMapSyncTimer); // [Thêm mới: Xóa bộ hẹn giờ] 
    if (mingMapChartInstance) {
        try { mingMapChartInstance.dispose(); } catch(e) {}
        mingMapChartInstance = null;
    }
    mingMapFrame?.remove();
    mingMapLamp?.remove();
    const parentDocument = window.parent?.document ?? document;
    parentDocument.getElementById(MAP_FRAME_ID)?.remove();
    parentDocument.getElementById(LAMP_ID)?.remove();
    parentDocument.getElementById(LAMP_ID+'-style')?.remove();
    if (window._mingMapOnResize && window._mingMapParentWindow) {
        window._mingMapParentWindow.removeEventListener('resize', window._mingMapOnResize);
    }
}

function bootstrapMingMap() {
    const parentDocument = window.parent?.document ?? document;
    const parentWindow = window.parent ?? window;
    cleanupMingMap();

    mingMapLamp = parentDocument.createElement('div');
    mingMapLamp.id = LAMP_ID;
    mingMapLamp.title = 'Bản đồ Đại Minh';
    mingMapLamp.innerHTML = '<span class="ming-map-char">Bản đồ</span>';
    Object.assign(mingMapLamp.style, {
        position: 'fixed', border: '1.5px solid #d4af37', borderRadius: '50%',
        background: 'radial-gradient(circle, #2a3d5c 0%, #0a0e17 100%)',
        boxShadow: '0 4px 16px rgba(0,0,0,0.8), 0 0 8px rgba(212,175,55,0.4)',
        cursor: 'grab', display: 'grid', placeItems: 'center',
        padding: '0', zIndex: '100000', touchAction: 'none', userSelect: 'none'
    });
    parentDocument.body.append(mingMapLamp);

    const lampStyle = parentDocument.createElement('style');
    lampStyle.id = LAMP_ID+'-style';
    lampStyle.textContent = `
        #${LAMP_ID} .ming-map-char {
            font-family: 'Noto Serif SC', serif; font-size: 20px; font-weight: bold;
            color: #e8d5a3; text-shadow: 0 0 4px rgba(212,175,55,0.6);
            line-height: 1; position: relative; z-index: 1;
        }
        #${LAMP_ID}::before {
            content: ""; position: absolute; inset: 2px;
            border: 1px solid rgba(212,175,55,0.3); border-radius: 50%;
            pointer-events: none; z-index: 0;
        }
        #${LAMP_ID}:active { cursor: grabbing; }
        #${LAMP_ID}:hover { transform: scale(1.05); transition: transform 0.2s; }
    `;
    parentDocument.head.append(lampStyle);

    mingMapFrame = parentDocument.createElement('iframe');
    mingMapFrame.id = MAP_FRAME_ID;
    mingMapFrame.style.display = 'none';
    parentDocument.body.append(mingMapFrame);
    mingMapFrameDocument = mingMapFrame.contentDocument;
    
    writeMingMapFrameDocument();
    loadMingIframeScripts();
    bindMingFrameEvents();
    applyMingLampLayout();

    mingMapLamp.addEventListener('pointerdown', onMingLampDown);
    mingMapLamp.addEventListener('touchstart', onMingLampDown, { passive: false });
    parentWindow.addEventListener('pointermove', onMingLampMove);
    parentWindow.addEventListener('touchmove', onMingLampMove, { passive: false });
    parentWindow.addEventListener('pointerup', onMingLampUp);
    parentWindow.addEventListener('touchend', onMingLampUp);

    mingMapLamp.addEventListener('click', () => {
        if (mingMapLampDragJustEnded) return;
        if (!mingMapLampDragMoved) {
            mingMapLampDragMoved = false;
            mingMapIsOpen = true;
            applyMingFrameLayout();
            mingMapSyncHeroLocation(); // Tự động lấy vị trí một lần khi mở bản đồ
        }
        mingMapLampDragMoved = false;
    });

    const onResize = () => {
        applyMingLampLayout();
        if (mingMapIsOpen) applyMingFrameLayout();
    };
    parentWindow.addEventListener('resize', onResize);
    window._mingMapOnResize = onResize;
    window._mingMapParentWindow = parentWindow;
    
    window.addEventListener('pagehide', cleanupMingMap, { once: true });

    // [Thêm mới]Bắt đầu tự động lấy MVU bộ hẹn giờ vị trí (Kiểm tra xem Địa điểm hiện tại có thay đổi không sau mỗi 2.5 giây)
    mingMapSyncTimer = setInterval(mingMapSyncHeroLocation, 2500);
    setTimeout(mingMapSyncHeroLocation, 500);
}

export function bootMap() {
    // Dọn dẹp các phiên bản và bộ đếm thời gian cũ có thể còn sót lại do cập nhật trực tuyến
    if (window._mingMapActiveCleanup) {
        window._mingMapActiveCleanup();
    }
    
    // Khởi động bản đồ
    bootstrapMingMap();
    
    // Hiển thị hàm dọn dẹp ra toàn cục để sử dụng cho lần cập nhật tiếp theo
    window._mingMapActiveCleanup = cleanupMingMap;
}
