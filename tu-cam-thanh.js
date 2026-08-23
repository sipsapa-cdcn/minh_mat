(async () => {
    // ==========================================
    // 1. Cô lập môi trường và lấy giao diện (Thích ứng hệ thống MVU)
    // ==========================================
    const win = (() => { try { return window.parent && window.parent !== window ? window.parent : window } catch { return window } })();
    const doc = win.document ?? document;

    const LAMP_ID = 'zjc-map-lamp';
    const MODAL_ID = 'zjc-map-modal';
    const STYLE_ID = 'zjc-map-style';
    const POS_KEY = 'zjc-map-lamp-pos';
    const TAB_KEY = 'zjc-map-last-tab';

    function cleanupZjcMap() {
        try {
            doc.getElementById(LAMP_ID)?.remove();
            doc.getElementById(MODAL_ID)?.remove();
            doc.getElementById(STYLE_ID)?.remove();
            doc.querySelector('.zjc-toast')?.remove();
        } catch (e) { }
    }

    if (doc.getElementById(LAMP_ID)) { cleanupZjcMap(); return; }
    cleanupZjcMap();

    function getST(key) { return globalThis[key] ?? win[key] ?? window[key]; }

    function getMvuData() {
        const Mvu = getST('Mvu');
        if (!Mvu) { console.warn("[Tử Cấm Thành] Chưa tìm thấy đối tượng plugin MVU, không thể đọc dữ liệu!"); return null; }
        const data = Mvu.getMvuData({ type: 'message', message_id: 'latest' }) || {};
        return data.stat_data || {};
    }

    async function saveMvuData(statData) {
        const Mvu = getST('Mvu');
        if (!Mvu) return;
        const fullData = Mvu.getMvuData({ type: 'message', message_id: 'latest' }) || {};
        fullData.stat_data = statData;
        await Mvu.replaceMvuData(fullData, { type: 'message', message_id: 'latest' });
    }

    // ==========================================
    // 2. Công cụ cốt lõi Tàn Minh Dư Tẫn & Thuật toán quân vụ
    // ==========================================
    let statData = {};
    let modalState = null;

    const PERSON_LORE = {
        "Chu Hoàng hậu": { title: "Chu Hoàng hậu (1611–1644)", desc: "Năm 1611: Sinh tại phủ Tô Châu, phụ thân là Chu Khuê. Thuở nhỏ thông tuệ, biết thi thư, hiểu lễ nghĩa.\nNăm 1626: Được tuyển làm Vương phi của Tín vương Chu Do Kiểm, khi ấy mười sáu tuổi. Sau khi thành thân tình cảm với Tín vương rất sâu đậm, nổi tiếng tằn tiện cần kiệm giữ nhà.\nNăm 1627: Chu Do Kiểm tức vị, lập làm Hoàng hậu, mười bảy tuổi chính vị trung cung. Sau khi nhập chủ Khôn Ninh cung, cắt giảm các khoản chi tiêu dư thừa trong cung.\nNăm 1629: Sinh trưởng tử Chu Từ Lãng, năm sau lập làm Hoàng thái tử, củng cố địa vị trung cung.\nĐầu thập niên 1630: Hoàng trưởng tử yểu mệnh, nhị tử Chu Từ Lãng dần lớn, Chu Hoàng hậu đích thân đốc thúc việc đọc sách tập viết. Đồng thời thống nhiếp lục cung, hậu cung không có chuyện tranh sủng.\nNăm 1634 (Sùng Trinh năm thứ bảy): Kề cận chăm sóc sinh hoạt của Sùng Trinh đế, giúp ngài quản lý sổ sách may y phục, đến một giọt dầu đèn cũng tính toán chi li. Bình thường bà không nói nhiều, nhưng mỗi lời đều rất thực tế.\nNăm 1644: Lý Tự Thành phá kinh sư, Chu Hoàng hậu tự ải tuẫn quốc tại Khôn Ninh cung, di ngôn: “Thiếp hầu hạ Bệ hạ mười tám năm, rốt cuộc không thể báo đáp được một phần vạn.”" },
        "Trương Yên": { title: "Trương Yên (1606–1644)", desc: "Ý An Hoàng hậu · Di sương của Minh Hy Tông\nNăm 1606: Người Tường Phù, Hà Nam, năm Thiên Khởi nguyên niên được tuyển làm Hoàng hậu của Minh Hy Tông, mười lăm tuổi nhập chủ trung cung, nổi tiếng hiền đức.\nNăm 1621–1627: Nhiều lần khuyên can Hy Tông xa lánh Ngụy Trung Hiền, thân cận hiền thần.\nNăm 1627: Hy Tông băng hà, không có con. Trương Yên quả quyết ủng hộ Tín vương Chu Do Kiểm kế thừa đại thống, giúp ngài thuận lợi tức vị. Được tôn làm “Ý An Hoàng hậu”, lui về Từ Khánh cung.\nNăm 1628–1630: Sống ẩn dật ít ra ngoài, không can dự triều chính, nhưng vẫn giữ quan hệ qua lại với Chu Hoàng hậu.\nNăm 1634 (Sùng Trinh năm thứ bảy): Cư ngụ tại Từ Khánh cung, ngày ngày nghe tiếng gió, ngắm bóng hòe, trầm mặc ít nói. Bà chưa từng chủ động mở lời hỏi quốc sự, nhưng nếu Sùng Trinh đế giá lâm, lời của bà luôn điểm đúng trọng tâm.\nNăm 1644: Lý Tự Thành phá Bắc Kinh, Trương Yên tự ải tuẫn quốc tại Từ Khánh cung, hưởng thọ ba mươi tám tuổi." },
        "Chu Huy Đề": { title: "Chu Huy Đề (Năm sinh chưa rõ–1644)", desc: "Con gái của Minh Quang Tông, tỷ muội khác mẹ của Sùng Trinh đế.\nThập niên 1620: Cư ngụ tại Thập Vương phủ trong Tử Cấm Thành, ít qua lại với phái Tín vương phủ. Sau khi Chu Do Kiểm tức vị, nhớ tình thủ túc, có phần chiếu cố.\nNăm 1634 (Sùng Trinh năm thứ bảy): Sống tại Thập Vương phủ, nhìn bức tường đỏ suốt hai mươi năm, tâm sớm đã lạnh. Thỉnh thoảng nghe tin có người xuất cung xuất giá, cũng không động dung. Qua lại với hậu cung cực ít, lời nói cũng cực ít, gần như trở thành cái bóng trong cung cấm.\nNăm 1644: Lý Tự Thành phá Bắc Kinh, Chu Huy Đề tự tận tuẫn quốc." },
        "Chu Từ Lãng": { title: "Chu Từ Lãng (1629–?)", desc: "Hoàng thái tử\nNăm 1629: Sinh tại Khôn Ninh cung, là trưởng tử của Sùng Trinh đế, sinh mẫu là Chu Hoàng hậu. Khi sinh ra Sùng Trinh đế đại hỉ, chiếu cáo thiên hạ.\nNăm 1630: Vừa tròn một tuổi đã được sách lập làm Hoàng thái tử, là Hoàng trữ chính thức duy nhất của triều Sùng Trinh.\nNăm 1634 (Sùng Trinh năm thứ bảy): Vừa sáu tuổi, đang học chữ đọc sách, thường nghe phụ hoàng thở dài, liền mong mình mau chóng lớn lên, để thay phụ hoàng phân ưu.\nNăm 1644: Khi Lý Tự Thành phá Bắc Kinh, Chu Từ Lãng bị bắt, sau đó thất tung trong loạn quân, không rõ tung tích." },
        "Ôn Thể Nhân": { title: "Ôn Thể Nhân (1573–1639)", desc: "Nội Các Thủ phụ\nNăm 1573: Người Ô Trình, phủ Hồ Châu, Chiết Giang.\nNăm 1630: Nhập các, nhậm chức Lễ bộ Thượng thư, Đông các Đại học sĩ. Ở trong triều minh tranh ám đấu với đảng nhân Đông Lâm, giỏi bề suy đoán tâm lý Sùng Trinh đế.\nNăm 1633: Bài xích Chu Diên Nho, độc lãm đại quyền Nội Các.\nNăm 1634 (Sùng Trinh năm thứ bảy): Nhậm chức Nội Các Thủ phụ, quyền khuynh triều dã. Ông chưa từng trực ngôn can gián, phàm chuyện gì cũng thuận theo thánh ý. Nhưng lén lút, ông rõ ràng quốc khố sớm đã trống rỗng, biên sự thối nát không thể vãn hồi.\nNăm 1638: Cuối cùng vì đảng tranh quá độ mà bị bãi quan về quê.\nNăm 1639: Bệnh thệ tại quê nhà." },
        "Dương Tự Xương": { title: "Dương Tự Xương (1588–1641)", desc: "Binh bộ Hữu Thị lang\nNăm 1588: Người Vũ Lăng, Hồ Quảng, Tiến sĩ năm Vạn Lịch thứ ba mươi tám.\nNăm 1633: Thăng nhậm Binh bộ Hữu Thị lang, chính thức bước vào tầng lớp quyết sách trung khu. Lấy sự tinh thông tính toán, giỏi bề thống trù mà được Sùng Trinh đế tán thưởng.\nNăm 1634 (Sùng Trinh năm thứ bảy): Đưa ra sách lược “Tứ chính lục ngung” mười mặt giăng lưới nổi tiếng, chủ trương vây chết lưu khấu tại khu vực ranh giới ba tỉnh. Cùng năm phụng mệnh Đốc sư xuất kinh.\nNăm 1641: Trương Hiến Trung phá Tương Dương, giết Tương vương Chu Dực Minh, Dương Tự Xương trong thời gian Đốc sư tại Kinh Châu lo sợ đan xen, bệnh thệ trong quân." },
        "Tôn Truyền Đình": { title: "Tôn Truyền Đình (1593–1643)", desc: "Nguyên Lại bộ Khảo huân Lang trung\nNăm 1593: Người Đại Châu, Sơn Tây.\nThập niên 1620: Trải qua các chức quan địa phương, nổi tiếng cương trực không a dua, sau bị bãi quan nhàn rỗi.\nNăm 1634 (Sùng Trinh năm thứ bảy): Lúc này đang rảnh rỗi ở nhà, nhưng tâm lo quốc sự, ngày ngày nghiên cứu phương lược luyện binh và tiễu tặc. Ông chiêu mộ tráng đinh ở hương thôn thử luyện tân trận, chuẩn bị cho ngày được khởi dụng trở lại.\nNăm 1636: Tại Hắc Thủy Dục bắt giết Cao Nghênh Tường, công trạng hiển hách, Tổng đốc quân vụ Thiểm Tây.\nNăm 1643: Trong trận Giáp Huyện quyết chiến với chủ lực Lý Tự Thành, binh bại tuẫn quốc. Đánh dấu điểm quân sự cuối cùng của Minh triều tại Thiểm Tây sụp đổ." },
        "Hồng Thừa Trù": { title: "Hồng Thừa Trù (1593–1665)", desc: "Thiểm Tây Tam biên Tổng đốc\nNăm 1631: Nhậm chức Thiểm Tây Tam biên Tổng đốc, chủ trì vây tiễu lưu khấu Thiểm Tây. Tính tình trầm ổn, dụng binh coi trọng “ổn trát ổn đả”.\nNăm 1634 (Sùng Trinh năm thứ bảy): Suất lĩnh Tần binh đồn trú Quan Trung, phòng ngự nghiêm ngặt lưu khấu trốn sang phía tây. Cực lực chủ trương toàn tiễu chủ lực lưu khấu tại Xa Tương Hạp.\nNăm 1639: Điều nhậm Kế Liêu Tổng đốc, chủ trì phòng vụ chống Thanh.\nNăm 1642: Binh bại bị bắt trong trận Tùng Cẩm, hàng Thanh.\nNăm 1665: Bệnh thệ tại Bắc Kinh, Minh đình liệt vào danh sách “Nhị thần”." },
        "Lư Tượng Thăng": { title: "Lư Tượng Thăng (1600–1638)", desc: "Hữu Thiêm Đô Ngự sử · Thống soái Thiên Hùng quân\nNăm 1628: Nhậm chức Tri phủ phủ Đại Danh, mộ luyện hương dũng, tổ kiến “Thiên Hùng quân”.\nNăm 1633: Thăng nhậm Hữu Thiêm Đô Ngự sử, suất lĩnh Thiên Hùng quân nhiều lần đại bại lưu khấu, danh tiếng vang dội.\nNăm 1634 (Sùng Trinh năm thứ bảy): Suất quân kịch chiến với lưu khấu, lấy ít thắng nhiều, nhờ công gia phong Binh bộ Thị lang. Sự trung thành của ông với Sùng Trinh đế gần như cố chấp.\nNăm 1638: Thanh quân đại cử nhập tắc, kịch chiến với Thanh quân tại Cự Lộc Giả Trang. Do binh lực chênh lệch, viện quân không tới, trúng bốn mũi tên ba nhát chém, chiến tử trước trận." },
        "Tào Văn Chiếu": { title: "Tào Văn Chiếu (?–1635)", desc: "Lâm Thao Tổng binh\nMột trong những tướng lĩnh hãn dũng nhất cuối Minh, người đương thời xưng là “Vạn nhân địch”.\nNăm 1630: Theo Hồng Thừa Trù vào Thiểm, trướng hạ có năm ngàn thiết kỵ Quan Trung, tung hoành vô địch.\nNăm 1634 (Sùng Trinh năm thứ bảy): Suất lĩnh thiết kỵ truy tiễu bộ Cao Nghênh Tường, mấy lần dồn vào tuyệt cảnh, nhưng do lương hướng không nối tiếp nên rốt cuộc chưa thể một trận thành công. Thường than thở: “Triều đình cấp đủ lương, ba ngày là san bằng bọn chúng!”\nNăm 1635: Hãm trong trùng vây ở trận Tưu Đầu Trấn, lực kiệt tự vẫn tuẫn quốc. Tin chết truyền ra, lưu khấu “tương hạ tam nhật” (chúc mừng nhau ba ngày)." },
        "Tần Lương Ngọc": { title: "Tần Lương Ngọc (1574–1648)", desc: "Tứ Xuyên Tổng binh · Thạch Trụ Tuyên ủy sứ\nNăm 1620: Suất Bạch Can binh vào Liêu Đông tác chiến với Hậu Kim, tuy bại nhưng vinh.\nNăm 1630: Kinh sư giới nghiêm, suất binh trì viện, Sùng Trinh đế ban thơ bao tưởng.\nNăm 1634 (Sùng Trinh năm thứ bảy): Qua tuổi sáu tuần, vẫn đồn trú Thạch Trụ, năm ngàn Bạch Can binh tùy thời đãi mệnh. Sùng Trinh đế đối với bà cực kỳ tín nhiệm, hễ Tây Nam có sự tất điều Bạch Can binh.\nNăm 1648: Bệnh thệ tại Thạch Trụ. Nữ tướng duy nhất cuối Minh lấy quân công ghi vào chính sử." },
        "Tổ Đại Thọ": { title: "Tổ Đại Thọ (1579–1656)", desc: "Liêu Đông Tổng binh\nTướng môn thế tập Liêu Đông, từ nhỏ tòng quân.\nNăm 1634 (Sùng Trinh năm thứ bảy): Thống suất tám vạn Quan Ninh quân đồn trú Cẩm Châu, là tiền tuyến kháng cự Hậu Kim mạnh nhất của Minh triều. Thái độ của ông với triều đình rất phức tạp, bắt buộc phải bảo vệ quân đội, bảo vệ địa bàn, bảo vệ gia tộc. Sùng Trinh đế đối với ông vừa ỷ lại vừa nghi kỵ.\nNăm 1642: Binh bại trong trận Tùng Cẩm, hàng Thanh.\nNăm 1656: Bệnh thệ tại Bắc Kinh. Được xưng là “điển hình của biên tướng cuối Minh ủng binh tự trọng”." },
        "Vương Thừa Ân": { title: "Vương Thừa Ân (?–1644)", desc: "Ti Lễ Giám Bỉnh bút Thái giám\nNgười cũ của Tín vương phủ Sùng Trinh đế. Lấy việc “chịu nói lời thật” mà độc thụ nhất xí trong hàng ngũ thái giám.\nNăm 1634 (Sùng Trinh năm thứ bảy): Được Sùng Trinh tín nhiệm sâu sắc. Thường khuyên nhủ Hoàng đế. Ở trong cung ông chưa từng kết đảng, cũng không nhận lễ của ngoại thần, thường bồi bạn phê duyệt tấu chương đến tận đêm khuya.\nNăm 1644: Lý Tự Thành phá Bắc Kinh, theo Sùng Trinh đế lên Môi Sơn, tự ải tuẫn táng. Thanh Thuận Trị đế khen ngợi sự trung thành, ban thụy “Trung tiết”." },
        "Tào Hóa Thuần": { title: "Tào Hóa Thuần (?–?)", desc: "Ti Lễ Giám Bỉnh bút Thái giám\nSau khi Sùng Trinh đế tức vị, nhậm Ti Lễ Giám Bỉnh bút Thái giám. Chưởng quản Đông Xưởng và nội vụ trong cung, là tai mắt trọng yếu giám sát ngoại triều.\nNăm 1634 (Sùng Trinh năm thứ bảy): Phụ trách nội vụ Tử Cấm Thành và tình báo Đông Xưởng. Hồi báo mật báo của xưởng vệ vô cùng ngắn gọn, chưa từng thêm mắm dặm muối, được tín nhiệm sâu sắc.\nNăm 1644: Lý Tự Thành binh lâm dưới thành Bắc Kinh, mở cổng thành nghênh hàng, sự hậu bị liệt vào danh sách những kẻ “tòng nghịch”." },
        "Vương Đức Hóa": { title: "Vương Đức Hóa (?–1644)", desc: "Ti Lễ Giám Chưởng ấn Thái giám · Đề đốc Đông Xưởng\nThập niên 1630: Thống lĩnh Cẩm Y Vệ, Đông Xưởng hai đại đặc vụ cơ cấu. Đại diện cho thế lực nội đình, giữ khoảng cách với tập đoàn văn quan ngoại triều.\nNăm 1634 (Sùng Trinh năm thứ bảy): Quyền lực cực lớn. Tính tình cương ngạnh, văn quan lén xưng là “Nội tướng”.\nNăm 1644: Khi Lý Tự Thành binh lâm Bắc Kinh, suất nội thị thủ thành, sau khi thành phá tự tận tuẫn quốc." },
        "Lạc Dưỡng Tính": { title: "Lạc Dưỡng Tính (?–?)", desc: "Cẩm Y Vệ Chỉ huy sứ\nXuất thân Cẩm Y Vệ thế tập, sau khi Sùng Trinh đế tức vị thăng nhậm Cẩm Y Vệ Chỉ huy sứ.\nNăm 1634 (Sùng Trinh năm thứ bảy): Chưởng quản Cẩm Y Vệ, hiệu úy dưới trướng tứ xứ đâm thọc động hướng. Mỗi tháng ông mật tấu một lần, thừa hiểu những tình báo này chưa chắc có thể trị tội, nhưng đủ để Hoàng thượng an tâm.\nNăm 1644: Phá thành xong hàng Thuận, sau đó hàng Thanh." },
        "Tả Lương Ngọc": { title: "Tả Lương Ngọc (1599–1645)", desc: "Viện tiễu Phó tướng\nNăm 1634 (Sùng Trinh năm thứ bảy): Suất một vạn năm ngàn doanh binh Hà Nam vây tiễu lưu khấu. Tác chiến dũng mãnh nhưng cực kỳ ái tích quân đội của mình. Khi triều đình khất nợ lương hướng, liền túng binh ở địa phương “tự trù”.\nSau năm 1636: Binh lực bành trướng tới hai mươi mấy vạn, trở thành một trong những quân phiệt lớn nhất cuối Minh.\nNăm 1645: Lấy danh nghĩa “Thanh quân trắc” khởi binh đông hạ đối kháng Nam Minh, bệnh tử tại Cửu Giang. Con trai lập tức hàng Thanh." },
        "Trịnh Chi Long": { title: "Trịnh Chi Long (1604–1661)", desc: "Phúc Kiến Phó Tổng binh · Hải thương cự đầu\nNăm 1633: Trong hải chiến Liệu La Loan đại bại hạm đội Hà Lan, củng cố hải thượng bá quyền Đông Á. Khống chế tuyến mậu dịch, thu lợi mấy trăm vạn lượng.\nNăm 1634 (Sùng Trinh năm thứ bảy): Nhậm Phúc Kiến Phó Tổng binh. Danh nghĩa là tướng lĩnh Minh triều, thực tế là chúa tể vương quốc hải thượng độc lập. Triều đình chỉ có thể “lấy quan tước ky mi (ràng buộc)”.\nNăm 1646: Sau khi chính quyền Long Vũ phúc diệt liền hàng Thanh.\nNăm 1661: Bị Thanh đình xử tử tại Bắc Kinh." },
        "Trần Kỳ Du": { title: "Trần Kỳ Du (?–?)", desc: "Ngũ tỉnh Tổng đốc\nNăm 1634 (Sùng Trinh năm thứ bảy): Thống hạt quân vụ năm tỉnh. Đem chủ lực Cao Nghênh Tường, Lý Tự Thành vây khốn tại Xa Tương Hạp. Lưu khấu sai sứ thỉnh hàng, Trần Kỳ Du tin là thật tiếp nhận đầu hàng, kết quả lưu khấu dạ độn đột vây. Xa Tương Hạp chi bại trở thành bước ngoặt của sự nghiệp tiễu tặc.\nNăm 1635: Vì thất bại ở Xa Tương Hạp bị đàn hặc, bãi quan về quê." },
        "Trương Tông Hành": { title: "Trương Tông Hành (?–?)", desc: "Tuyên Đại Tổng đốc\nNăm 1634 (Sùng Trinh năm thứ bảy): Hoàng Thái Cực vây công Tuyên Phủ, Trương Tông Hành suất biên binh tử thủ. Ông ngày đêm lên thành đốc chiến, liên phát cấp tấu: “Thần đương dữ Tuyên Phủ cộng tồn vong.” Mùa thu Hậu Kim thối lui, giữ được Tuyên Phủ thành, nhưng nguyên khí biên trấn đại thương. Vô lực cấp phát đủ lương hướng, biên binh sĩ khí đê lạc." },
        "Lưu Trạch Thanh": { title: "Lưu Trạch Thanh (?–1649)", desc: "Sơn Đông Phó tướng\nNăm 1634 (Sùng Trinh năm thứ bảy): Đồn trú Sơn Đông, binh bị phế thỉ. Ông có triết lý sinh tồn: “Triều đình cấp bổng lộc không đủ, lão tử không tự nghĩ cách, huynh đệ ai bán mạng cho?” Sức chiến đấu quân đội không cao, nhưng năng lực họa hại bách tính rất mạnh.\nNăm 1644: Nam đào y phụ Nam Minh.\nNăm 1645: Hàng Thanh. Năm 1649 bị Thanh đình xử tử." },
        "Hoàng Thái Cực": { title: "Hoàng Thái Cực (1592–1643)", desc: "Hậu Kim Đại Hãn\nNăm 1626: Kế vị làm Hậu Kim Đại Hãn. Cải cách chế độ Bát Kỳ, thu phục Mông Cổ.\nNăm 1629: Vòng qua Mông Cổ phá biên nhập tắc, thi thiển phản gián kế dẫn đến Sùng Trinh đế xử tử Viên Sùng Hoán.\nNăm 1634 (Sùng Trinh năm thứ bảy): Tháng bảy, thân suất chủ lực Bát Kỳ vây công Tuyên Phủ, Đại Đồng. Ý đồ thông qua nhiều lần nhập tắc lược đoạt tiêu hao quốc lực Minh triều.\nNăm 1636: Xưng đế tại Thịnh Kinh, đổi quốc hiệu “Đại Thanh”.\nNăm 1643: Bệnh thệ. Người đặt nền móng khai quốc thực tế của Thanh triều." },
        "Cao Nghênh Tường": { title: "Cao Nghênh Tường (?–1636)", desc: "Thủ lĩnh Lưu khấu · Sấm Vương\nNăm 1631: Do tư lịch sâu, uy vọng cao, được suy tôn làm minh chủ, hiệu “Sấm Vương”.\nNăm 1634 (Sùng Trinh năm thứ bảy): Bị khốn tại Xa Tương Hạp, ngụy hàng rồi đột vây, tiếp tục lưu động tác chiến. Lực chiến đấu cực mạnh.\nNăm 1636: Bị Tôn Truyền Đình đánh bại bắt sống tại Hắc Thủy Dục, áp giải Bắc Kinh xử tử. Bộ chúng suy tôn Lý Tự Thành kế nhiệm “Sấm Vương”." },
        "Trương Hiến Trung": { title: "Trương Hiến Trung (1606–1647)", desc: "Thủ lĩnh Lưu khấu · Bát Đại Vương\nNăm 1630: Khởi sự tại Thiểm Tây. Nổi tiếng giảo hoạt tàn bạo, dụng binh linh hoạt.\nNăm 1634 (Sùng Trinh năm thứ bảy): Lưu động tác chiến tại giao giới Hà Nam, Hồ Quảng. Hỗ tương sách ứng với các bộ, khiến quan quân cố thử thất bỉ (chiếu cố bên này thì mất bên kia).\nNăm 1644: Xưng đế tại Thành Đô, quốc hiệu Đại Tây.\nNăm 1647: Trúng tên bỏ mạng khi tác chiến với Thanh quân tại Tây Sung Phượng Hoàng Sơn." },
        "Lý Tự Thành": { title: "Lý Tự Thành (1606–1645)", desc: "Thủ lĩnh Lưu khấu · Sấm Tướng → Sấm Vương\nNăm 1629: Đầu bôn bộ Cao Nghênh Tường, hiệu là “Sấm Tướng”. Nổi tiếng vì “giỏi đánh ngạnh trượng, chịu được đói khát, cùng sĩ tốt đồng cam cộng khổ”.\nNăm 1634 (Sùng Trinh năm thứ bảy): Theo Cao Nghênh Tường bị khốn ở Xa Tương Hạp. Trong lúc đột vây thể hiện ý chí cầu sinh cực mạnh, danh vọng bức cận Cao Nghênh Tường.\nNăm 1636: Được suy tôn làm “Sấm Vương”.\nNăm 1644: Công phá Bắc Kinh, kiến lập chính quyền Đại Thuận. Cùng năm bị Thanh quân đánh bại thoái xuất Bắc Kinh.\nNăm 1645: Bị sát hại tại huyện Thông Sơn, Hồ Bắc." },
        "Mã Vân Trình": { title: "Mã Vân Trình (?–1644)", desc: "Đề đốc Kinh doanh Thái giám\nNăm sinh chưa rõ: Người Bắc Trực Lệ, sớm nhập cung làm thái giám, niên hiệu Sùng Trinh thăng tới Đề đốc Kinh doanh.\nNăm 1634 (Sùng Trinh năm thứ bảy): Nhậm Đề đốc Kinh doanh Thái giám, thống hạt tám vạn quan binh kinh doanh, đồn trú kinh sư. Kinh doanh thời Sùng Trinh sớm đã danh tồn thực vong, binh viên trống khuyết cực nhiều, giáp trượng hủ phôi, huấn luyện phế thỉ. Mã Vân Trình thân là tối cao trưởng quan nội đình phái trú, thực tế chỉ có thể miễn cưỡng duy trì biên chế doanh ngũ, án thời lập sổ lĩnh lương, nhưng vô lực chỉnh đốn quân kỷ.\nĐầu thập niên 1640: Kinh doanh nhiều lần bị điều đi bố phòng ngoại vi kinh kỳ, nhưng chưa từng trải qua đại quy mô tác chiến chân chính. Mã Vân Trình danh nghĩa tiết chế kinh doanh, thực chất quyền điều động bị giằng co qua lại giữa Binh bộ và Nội Các.\nNăm 1644: Lý Tự Thành vây công Bắc Kinh, Mã Vân Trình suất kinh doanh thủ thành. Sau khi thành phá, thất tung, một thuyết nói chiến tử, một thuyết nói hàng Thuận sau bị giết." },
        "Trương Quốc Duy": { title: "Trương Quốc Duy (1595–1646)", desc: "Ứng Thiên Tuần phủ\nNăm 1595: Người Đông Dương, Chiết Giang, Tiến sĩ năm Thiên Khởi thứ hai (1622).\nThập niên 1620: Trải qua các chức Tri huyện, Ngự sử, lấy việc dám nói thẳng mà nổi danh, từng nhiều lần thượng sớ đàn hặc yêm đảng.\nNăm 1634 (Sùng Trinh năm thứ bảy): Nhậm Ứng Thiên Tuần phủ, trú tiết Nam Kinh, hạt quản các phủ huyện duyên giang Nam Trực Lệ. Trong thời gian nhậm chức, ông chỉnh đốn Trường Giang giang phòng, tu thiện chiến thuyền thủy sư, huấn luyện doanh binh, gia cố thành phòng các trọng địa duyên giang như An Khánh, Nam Kinh.\nNăm 1640: Thăng nhậm Binh bộ Thị lang, vẫn kiêm Tuần phủ Ứng Thiên, gia hàm Tổng đốc lương hướng. Sùng Trinh đế đối với ông khá tín nhiệm, nhiều lần hạ chỉ bao tưởng.\nNăm 1644: Sau khi Sùng Trinh đế tuẫn quốc, Trương Quốc Duy ủng lập Hoằng Quang đế tại Nam Kinh, nhậm Binh bộ Thượng thư, tiếp tục tổng lãm giang phòng.\nNăm 1645: Thanh quân nam hạ, Nam Kinh hãm lạc, Trương Quốc Duy suất bộ thoái thủ Chiết Giang, ủng lập Lỗ vương Chu Dĩ Hải tại Thiệu Hưng, nhậm Đốc sư, tiếp tục kháng Thanh.\nNăm 1646: Thanh quân tiến công Chiết Đông, Trương Quốc Duy binh bại, gieo mình xuống nước tuẫn quốc, hưởng thọ năm mươi mốt tuổi. Nam Minh truy tặng Thái bảo, thụy “Trung Mẫn”." },
        "Trần Hồng Phạm": { title: "Trần Hồng Phạm (?–1645)", desc: "Tổng binh quan · Trấn thủ Đăng Lai\nNăm sinh chưa rõ: Người Liêu Đông, sớm tòng quân, tích công thăng tới Tổng binh quan.\nThập niên 1630: Phụng mệnh đồn trú dải Đăng Châu, Lai Châu, thống suất hải phòng quân Đăng Lai ước chừng bốn ngàn người. Thủy sư Đăng Lai sau phản loạn Khổng Hữu Đức, Cảnh Trọng Minh năm Sùng Trinh thứ năm tổn thất thảm trọng, khi Trần Hồng Phạm tiếp thủ chỉ còn lại vài chiếc chiến thuyền, tàn binh mấy ngàn.\nNăm 1634 (Sùng Trinh năm thứ bảy): Nhậm Đăng Lai Tổng binh, phụ trách phòng vụ duyên hải Sơn Đông. Đăng Lai địa xử hải phòng yếu xung, bắc tiếp Liêu Đông, đông giáp Bột Hải, nhưng triều đình cấp phát lương hướng cực ít, thủy sư Đăng Lai thủy chung ở trạng thái bán cơ bán bão (nửa đói nửa no).\nNăm 1644: Sau khi Sùng Trinh đế tuẫn quốc, Trần Hồng Phạm suất bộ quy phụ chính quyền Nam Minh Hoằng Quang.\nNăm 1645: Hoằng Quang đế phái Trần Hồng Phạm bắc thượng nghị hòa với Thanh quân, Trần Hồng Phạm thấy Thanh quân thế lớn, ám trung đầu hàng, đồng thời dụ hàng các tướng lĩnh Nam Minh khác. Sau khi Thanh quân nam hạ, Trần Hồng Phạm theo Thanh quân hành động, không lâu bệnh tử trên đường, danh tiếng vì thế mà bại hoại." },
        "Vưu Thế Uy": { title: "Vưu Thế Uy (?–1644)", desc: "Kế Trấn Tổng binh\nNăm sinh chưa rõ: Người Du Lâm, Thiểm Tây, xuất thân tướng môn, sớm tòng quân, tích công tới Tổng binh quan.\nThập niên 1630: Trải qua các chức Xương Bình, Kế Châu Tổng binh, thống suất bốn vạn biên binh Kế trấn, phụ trách phòng vụ Trường Thành phía bắc kinh sư. Kế trấn là trọng trấn đứng đầu Cửu Biên, phụ trách củng vệ kinh sư, Vưu Thế Uy đồn trú tại đây nhiều năm, tu trúc đài phong, chỉnh sức biên bị.\nNăm 1634 (Sùng Trinh năm thứ bảy): Biên binh Kế trấn vì lương hướng không đủ nên sĩ khí đê lạc, Vưu Thế Uy nhiều lần thượng sớ thỉnh cầu cấp ngân, nhưng Hộ bộ không có tiền. Ông chỉ có thể lấy “quân pháp” ép bộ hạ, miễn cưỡng duy trì.\nNăm 1640: Thanh quân nhiều lần nhập tắc, Vưu Thế Uy suất bộ bôn ba bố phòng giữa các yếu khẩu, nhưng binh lực phân tán, xứ xứ thiết phòng xứ xứ hư.\nNăm 1644: Sau khi Lý Tự Thành công phá Bắc Kinh, Vưu Thế Uy suất tàn bộ thoái thủ Du Lâm, giao chiến với bộ Lý Tự Thành, thành phá bị bắt. Lý Tự Thành khuyên hàng, Vưu Thế Uy không theo, bị giết tuẫn quốc. Nam Minh truy tặng Thái tử Thái phó." },
        "Triệu Chi Long": { title: "Triệu Chi Long (?–1647)", desc: "Hãn Thành Bá · Đề đốc Nam Kinh quân vụ\nNăm sinh chưa rõ: Người Phượng Dương, An Huy, hậu duệ của công thần đầu Minh Triệu Di, thế tập Hãn Thành Bá tước vị.\nNiên hiệu Sùng Trinh: Tập tước Hãn Thành Bá, nhậm Đề đốc Nam Kinh quân vụ, thống hạt sáu vạn kinh doanh Nam Kinh. Kinh doanh Nam Kinh danh nghĩa binh lực hùng hậu, thực chất trống khuyết quá nửa, quân kỷ phế thỉ, Triệu Chi Long tọa trấn Nam Kinh, chỉ cầu an hưởng thái bình, không màng chỉnh đốn.\nNăm 1634 (Sùng Trinh năm thứ bảy): Thống suất kinh doanh Nam Kinh, đồn trú Lưu đô. Nam Kinh là lưu đô của Minh triều, thiết lập nguyên một bộ cơ cấu hành chính và quân sự, nhưng loại huân quý võ tướng như Triệu Chi Long đại đa số chỉ cầu nhận lương an tọa, chưa từng luyện binh tu thành.\nNăm 1644: Sau khi Sùng Trinh đế tuẫn quốc, Triệu Chi Long ủng lập Hoằng Quang đế tại Nam Kinh, vẫn nhậm Đề đốc quân vụ.\nNăm 1645: Thanh quân nam hạ, binh lâm Nam Kinh. Triệu Chi Long với tư cách là một trong những trưởng quan quân sự cao nhất Nam Kinh, suất bộ mở thành nghênh hàng, sau khi hàng Thanh bị biên nhập Hán Quân Kỳ.\nNăm 1647: Bệnh tử tại Bắc Kinh. Sự kiện Triệu Chi Long hàng Thanh bị Nam Minh xích mạ là “mại quốc”, tước vị Hãn Thành Bá của ông bị tước đoạt." },
        "Thang Nhược Vọng": { title: "Thang Nhược Vọng (1592–1666)", desc: "Khâm Thiên Giám Giám chính · Truyền giáo sĩ Dòng Tên\nNăm 1592: Sinh tại Cologne, Đức, tên gốc là Johann Adam Schall von Bell, sớm gia nhập Dòng Tên, tu tập thiên văn lịch toán.\nNăm 1618 (Vạn Lịch năm thứ bốn mươi sáu): Theo Nicolas Trigault đông độ, năm 1622 đến Ma Cao, năm sau tới Bắc Kinh, lấy Hán danh Thang Nhược Vọng, dùng sở học thiên văn giao du sĩ lâm.\nNăm 1634 (Sùng Trinh năm thứ bảy): Phụng chỉ nhập Lịch cục, cùng Từ Quang Khải v.v. biên soạn «Sùng Trinh Lịch Thư», lại đốc tạo hơn hai mươi khẩu tây dương hỏa pháo, tinh lương vượt xa thức cũ.\nĐầu thập niên 1640: Nhiều lần được triệu đối trong cung, giảng thụ thiên văn nghi khí, kiêm chế tạo kính viễn vọng, nhiên tây dương lịch pháp nhiều lần bị bảo thủ quan viên công kích.\nNăm 1644: Lý Tự Thành phá kinh, lưu cư chưa đi; sau khi Thanh quân nhập thành, nhờ năng lực lịch toán và hỏa khí mà được Thanh đình bảo hộ, thụ chức Khâm Thiên Giám.\nNăm 1645 (Thuận Trị năm thứ hai): Thanh đình chọn dùng «Thời Hiến Lịch» do ông biên soạn, ban hành thiên hạ, thăng Giám chính, Thuận Trị đế tôn xưng “Mã Pháp”, lũy gia Thông Chính Sứ hàm.\nNăm 1666 (Khang Hy năm thứ năm): Bị Dương Quang Tiên đàn hặc hạ ngục, sau nhờ địa chấn mà hoạch xá, nhưng tuổi cao bệnh tốt tại Bắc Kinh, hưởng thọ bảy mươi bốn tuổi." },
        "Bạc Giác": { title: "Bạc Giác (?–?)", desc: "Bố y tạo pháo sư · Quang học nghi khí tượng nhân\nNăm sinh năm mất chưa rõ: Người Tô Châu, Nam Trực Lệ, xuất thân hàn vi, tinh thông toán thuật và vật lý, lấy việc chế tạo tinh mật nghi khí mà văn danh, cả đời chưa từng làm quan.\nThập niên 1620 (Niên hiệu Thiên Khởi): Tại Tô Châu thử chế thiên lý kính (kính viễn vọng), mài thủy tinh làm thấu kính, có thể viễn quan nhân vật ngoài thành như cận tại nhãn tiền.\nNăm 1634 (Sùng Trinh năm thứ bảy): Chế tạo hỏa khí và thiên lý kính tại địa phương, kỹ nghệ siêu phàm, nhưng do thân phận bố y, kỹ thuật chưa được triều đình quảng tuấn ứng dụng.\nSau đó không rõ hành tung." }
    };

    const ORG_DATA = [
        {
            group: '⓵ Văn quan thể hệ·Nội đình & Trung khu (Đại não hoàng quyền)',
            items: [
                { name: 'Thái sư / Thái phó / Thái bảo', rank: 'Chính nhất phẩm', desc: '【Tam Công】Vinh dự tối cao của văn thần, thường là chức hàm hư phong, không có thực quyền.' },
                { name: 'Nội Các Thủ phụ', rank: 'Thực quyền tể tướng (Bản quan Chính ngũ phẩm đến Chính nhị phẩm)', desc: '【Phiếu nghĩ đại quyền】Đứng đầu Nội Các, chủ trì xử lý quốc chính, nhưng cần Hoàng đế "Phê hồng" mới có hiệu lực.' },
                { name: 'Đại học sĩ (Quần thần Nội Các)', rank: 'Chính ngũ phẩm (Thường gia Thượng thư hàm)', desc: '【Trợ thủ Hoàng đế】Tham dự cơ mật, khởi thảo chiếu thư, hỗ trợ xử lý chính vụ.' },
                { name: 'Lục khoa Cấp Sự trung', rank: 'Chính thất phẩm', desc: '【Ngôn quan gián thần】Phẩm trật thấp nhưng quyền lực cực lớn, có quyền phong bác (trả lại) chiếu chỉ của Hoàng đế và tấu chương của các bộ.' }
            ]
        },
        {
            group: '⓶ Văn quan thể hệ·Ngoại triều (Lục Bộ & Đô Sát Viện)',
            items: [
                { name: 'Thượng thư (Lục Bộ)', rank: 'Chính nhị phẩm (Thường gia hàm Vinh Lộc Đại phu)', desc: '【Cửu khanh】Trưởng quan tối cao của các bộ (Lại, Hộ, Lễ, Binh, Hình, Công), thực quyền rất nặng.' },
                { name: 'Thị lang (Lục Bộ)', rank: 'Chính tam phẩm', desc: '【Phó trưởng quan】Phụ tá Thượng thư xử lý sự vụ của bộ.' },
                { name: 'Đô Ngự sử (Đô Sát Viện)', rank: 'Chính nhị phẩm', desc: '【Tổng hiến】Trưởng quan Đô Sát Viện, chưởng quản công tác giám sát, đàn hặc toàn quốc.' },
                { name: 'Lang trung (Lục Bộ ty quan)', rank: 'Chính ngũ phẩm', desc: '【Thực quyền ty trưởng】Chủ quản sự vụ cụ thể của một ty trong bộ, là lực lượng trung kiên xử lý công vụ.' }
            ]
        },
        {
            group: '⓷ Văn quan thể hệ·Địa phương (Từ Tỉnh đến Huyện)',
            items: [
                { name: 'Tuần phủ', rank: 'Sai khiển (Thường mang hàm Hữu Phó Đô Ngự sử, Tòng nhị phẩm)', desc: '【Phong cương đại lại】Trưởng quan quân chính một tỉnh, vốn là sai khiển trung ương, cuối Minh thực thể hóa.' },
                { name: 'Tổng đốc', rank: 'Sai khiển (Thường mang hàm Binh bộ Thượng thư, Chính nhị phẩm)', desc: '【Quản hạt nhiều tỉnh】Tiết chế quân dân nhiều tỉnh, chuyên lo bình định phản loạn hoặc biên phòng.' },
                { name: 'Thừa Tuyên Bố Chính Sứ ti', rank: 'Bố Chính sứ (Tòng nhị phẩm)', desc: '【Thừa Tuyên Bố Chính】Trưởng quan hành chính cao nhất một tỉnh, chưởng quản dân chính, hộ tịch, phú thuế, tiền cốc toàn tỉnh, xưng là “Phiên ti”.' },
                { name: 'Đề Hình Án Sát Sứ ti', rank: 'Án Sát sứ (Chính tam phẩm)', desc: '【Đề Hình Án Sát】Trưởng quan tư pháp và giám sát một tỉnh, chưởng quản hình danh, hặc quan, dịch truyền, xưng là “Niết ti”.' },
                { name: 'Phủ', rank: 'Tri phủ (Chính tứ phẩm, tản giai Trung Hiến Đại phu)', desc: '【Thừa thượng khải hạ】Lĩnh một phủ gồm nhiều huyện, tổng dân chính, phú thuế, tố tụng, thống quản châu huyện trực thuộc.' },
                { name: 'Huyện', rank: 'Tri huyện (Chính thất phẩm, tản giai Văn Lâm lang)', desc: '【Phụ mẫu quan】Thân lý ngục tụng, thôi khoa, giáo hóa, là người đứng đầu chính vụ một huyện, quyền tuy không trọng, nhưng gần dân nhất.' }
            ]
        },
        {
            group: '⓸ Võ tướng thể hệ·Trấn thú sai khiển (Thống binh thực tế)',
            items: [
                { name: 'Tổng binh quan', rank: 'Sai khiển (Không định phẩm, bản quan thường mang hàm Đô đốc Chính nhất đến Chính nhị phẩm)', desc: '【Trấn thủ nhất phương】Chủ soái một trấn, thống binh 1 vạn～3 vạn người. Chịu sự tiết chế của Tổng đốc, Tuần phủ, văn quý võ tiện, tự xưng “Mạt tướng”.' },
                { name: 'Phó tướng', rank: 'Sai khiển (Bản quan thường mang hàm Đô đốc Thiêm sự v.v. Chính nhị phẩm)', desc: '【Hiệp thủ phó soái】Hỗ trợ Tổng binh, phân phòng yếu địa, thống binh 5 ngàn～1 vạn người.' },
                { name: 'Tham tướng', rank: 'Sai khiển (Bản quan thường mang hàm Đô Chỉ huy sứ v.v. Chính tam phẩm)', desc: '【Phân thủ nhất doanh】Thống binh 3 ngàn～5 ngàn người, là chủ tướng doanh ngũ, thường đồn trú một thành một bảo.' },
                { name: 'Du kích tướng quân', rank: 'Sai khiển (Bản quan thường mang hàm Vệ Chỉ huy sứ v.v. Chính tam phẩm)', desc: '【Du động tác chiến】Thống binh 1 ngàn～3 ngàn người, cơ động sách ứng, cũng phải phục tùng văn quan điều độ.' },
                { name: 'Đô ti / Thủ bị', rank: 'Sai khiển (Bản quan thường mang hàm Thiên hộ v.v. Chính ngũ phẩm)', desc: '【Phân phòng đồn trú】Đô ti thống binh 5 trăm～1 ngàn người, Thủ bị chưởng quản phòng vụ một thành, binh ngạch ước chừng 5 trăm người.' }
            ]
        },
        {
            group: '⓹ Võ tướng thể hệ·Vệ sở bản quan (Hư hàm định phẩm)',
            items: [
                { name: 'Tả Đô đốc / Hữu Đô đốc', rank: 'Chính nhất phẩm', desc: '【Cực phẩm hư hàm】Vãn Minh lạm thưởng, thường thụ dư cho Tổng binh quan lập chiến công, khiến phẩm cấp hư cao, nhưng không có thực quyền binh.' },
                { name: 'Đô đốc Đồng tri', rank: 'Tòng nhất phẩm', desc: '【Phó Đô đốc】Phẩm cấp gần với Đô đốc, thường dùng làm gia hàm, nâng cao địa vị võ tướng, vẫn không trực tiếp lĩnh binh.' },
                { name: 'Đô đốc Thiêm sự / Đô Chỉ huy sứ', rank: 'Chính nhị phẩm', desc: '【Đô ti trưởng】Vốn là trưởng quan cao nhất của vệ sở, cuối Minh luân thành hư hàm, chỉ định phẩm cấp và bổng lộc.' },
                { name: 'Vệ Chỉ huy sứ', rank: 'Chính tam phẩm', desc: '【Vệ sở trưởng quan】Chức vị thế tập, thống binh năm ngàn sáu trăm người (chế độ Vệ sở). Cuối Minh sức chiến đấu đã mất, chỉ dùng làm tiêu chuẩn võ giai.' },
                { name: 'Chính Thiên hộ', rank: 'Chính ngũ phẩm', desc: '【Thiên hộ sở trưởng quan】Thế tập, thống binh một ngàn một trăm hai mươi người (Thiên hộ sở), đã luân thành vinh dự hàm.' },
                { name: 'Bách hộ', rank: 'Chính lục phẩm', desc: '【Bách hộ sở trưởng quan】Thế tập, thống binh một trăm mười hai người, là cấp võ quan vệ sở thấp nhất.' }
            ]
        },
        {
            group: '⓺ Võ tướng thể hệ·Võ giai tản quan (Vinh dự tản giai)',
            items: [
                { name: 'Đặc Tiến Vinh Lộc Đại phu', rank: 'Chính nhất phẩm', desc: '【Võ thần tối cao tản giai】Không có thực quyền, chỉ gia tặng võ tướng có công huân, nâng cao ân điển triều đình.' },
                { name: 'Phiêu Kỵ Tướng quân', rank: 'Chính nhị phẩm', desc: '【Võ tản giai】Thường thụ Đô đốc trở lên, biểu dương quân công, nhưng không trực tiếp lĩnh binh.' },
                { name: 'Chiêu Dũng Tướng quân', rank: 'Chính tam phẩm', desc: '【Võ tản giai】Thụ Vệ Chỉ huy sứ hoặc cao cấp doanh quan, vinh dự lớn hơn thực quyền.' },
                { name: 'Minh Uy Tướng quân', rank: 'Chính tứ phẩm', desc: '【Võ tản giai】Thụ Thiên hộ hoặc trung cấp võ quan, để tỏ ân vinh.' },
                { name: 'Võ Lược Tướng quân', rank: 'Chính ngũ phẩm', desc: '【Võ tản giai】Thụ Bách hộ hoặc hạ tầng võ quan, là bậc cuối cùng của võ giai.' }
            ]
        }
    ];

    function renderOrgTree() {
        const container = doc.getElementById('zjc-org-container');
        if (!container) return;

        let htmlStr = `<div class="zjc-org-root">Đại Minh Hoàng đế<br><span style="font-size:12px;font-weight:normal;color:var(--muted);">Chí cao hoàng quyền</span></div>`;
        htmlStr += `<div class="zjc-org-tree">`;

        ORG_DATA.forEach(group => {
            htmlStr += `<div class="zjc-org-group-title">${group.group}</div>`;
            group.items.forEach(item => {
                htmlStr += `
                <div class="zjc-org-node">
                    <div class="zjc-org-item">
                        <div class="zjc-org-title">
                            <span>${item.name}</span>
                            <span class="zjc-org-rank">${item.rank}</span>
                        </div>
                        <div class="zjc-org-desc">${item.desc}</div>
                    </div>
                </div>`;
            });
        });

        htmlStr += `</div>`;
        container.innerHTML = htmlStr;
    }

    function loreButton(name) {
        if (!PERSON_LORE[name]) return '';
        return `<button class="lore" data-action="view-lore" data-lore-name="${html(name)}">Hồ sơ</button>`;
    }

    const EQUIPMENT_TIERS = ['Tàn phá', 'Giản lậu', 'Phổ thông', 'Tinh lương', 'Tinh nhuệ'];
    const EQUIPMENT_TIER_COST = { 'Tàn phá': 0.03, 'Giản lậu': 0.12, 'Phổ thông': 0.36, 'Tinh lương': 0.8, 'Tinh nhuệ': 1.5 };
    const EQUIPMENT_TIER_DAYS = { 'Tàn phá': 3, 'Giản lậu': 7, 'Phổ thông': 12, 'Tinh lương': 25, 'Tinh nhuệ': 45 };
    const EQUIPMENT_LOADOUTS = ['Bộ tốt chế thức', 'Hỏa khí chế thức', 'Kỵ quân chế thức', 'Thủy sư chế thức'];
    const NON_HUMAN_GRAIN_KEYS = ['Thảo liệu', 'Mã liệu', 'Tự liệu', 'Đậu bính'];
    const ARMY_GRAIN_KEYS = ['Quân lương', 'Lương thực', 'Mễ', 'Đạo mễ', 'Cốc vật', 'Mạch', 'Túc', 'Tạp lương', 'Hoàng đậu'];

    function html(value) { return String(value ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;'); }
    function get(source, path, fallback = '') { const value = String(path).split('.').filter(Boolean).reduce((current, key) => (current == null ? undefined : current[key]), source); return value == null || value === '' ? fallback : value; }
    function entries(value) { if (!value || typeof value !== 'object' || Array.isArray(value)) return []; return Object.entries(value); }
    function number(value, fallback = 0) { const parsed = Number(value); return Number.isFinite(parsed) ? parsed : fallback; }
    function clamp(value, min, max) { return Math.min(max, Math.max(min, value)); }
    function ensureObject(parent, key) { if (!parent[key] || typeof parent[key] !== 'object') parent[key] = {}; return parent[key]; }
    function roundMarketNumber(value, digits = 3) { const factor = 10 ** digits; return Math.round((number(value, 0) + Number.EPSILON) * factor) / factor; }

    function meta(label, value) { return `<div class="cm-meta"><span>${html(label)}</span><b>${html(value)}</b></div>`; }
    function emptyLine(text) { return `<p class="cm-empty" style="color:var(--faint); padding:16px; text-align:center; font-style:italic;">${html(text)}</p>`; }

    function getPortraitData() {
        const lib = getST('CanmingPortraitLibrary');
        if (!lib || !lib.entries) return {};
        const data = {};
        for (const [name, entry] of Object.entries(lib.entries)) {
            if (entry?.enabled === false) continue;
            if (!entry?.portraits || typeof entry.portraits !== 'object') continue;
            const portraits = Object.fromEntries(Object.entries(entry.portraits).filter(([, source]) => typeof source === 'string' && source.startsWith('http')));
            if (!Object.keys(portraits).length) continue;
            data[name] = portraits;
            for (const alias of entry.aliases || []) {
                if (alias && !data[alias]) data[alias] = data[name];
            }
        }
        return data;
    }

    function getAllPortraitData() {
        const lib = getST('CanmingPortraitLibrary');
        if (!lib || !lib.entries) return {};
        const data = {};
        for (const [name, entry] of Object.entries(lib.entries)) {
            if (!entry?.portraits || typeof entry.portraits !== 'object') continue;
            const portraits = Object.fromEntries(Object.entries(entry.portraits).filter(([, source]) => typeof source === 'string' && source.startsWith('http')));
            if (!Object.keys(portraits).length) continue;
            data[name] = portraits;
            for (const alias of entry.aliases || []) {
                if (alias && !data[alias]) data[alias] = data[name];
            }
        }
        return data;
    }

    function avatarImage(name) {
        const imgs = getPortraitData()[name];
        if (imgs && (imgs['Nhật thường'] || Object.values(imgs)[0])) {
            return `<img class="zjc-avatar" src="${html(imgs['Nhật thường'] || Object.values(imgs)[0])}" alt="${html(name)}">`;
        }
        return ``;
    }

    function portraitButton(name) {
        if (!getPortraitData()[name]) return '';
        return `<button class="primary" data-action="view-portrait" data-portrait-name="${html(name)}">Chân dung</button>`;
    }

    function inferEquipmentLayout(camp, preset = '') {
        const text = `${preset} ${camp?.['Binh chủng'] || ''} ${camp?.['Trang bị'] || ''}`;
        if (preset === 'Kỵ quân chế thức' || /[Kỵ mã lạc đà]/.test(text)) return { 'Chủ chiến binh khí': 'Mã đao', 'Viễn xạ binh khí': 'Kỵ cung', 'Phòng cụ': 'Khinh giáp', 'Hỏa khí': 'Không', 'Tọa kỵ': 'Chiến mã', 'Tề bị suất': 55, 'Hoàn hảo suất': 70 };
        if (preset === 'Hỏa khí chế thức' || /[Hỏa khí điểu súng súng pháo xa doanh]/.test(text)) return { 'Chủ chiến binh khí': 'Yêu đao', 'Viễn xạ binh khí': 'Điểu súng', 'Phòng cụ': 'Miên giáp', 'Hỏa khí': 'Điểu súng', 'Tọa kỵ': 'Không', 'Tề bị suất': 50, 'Hoàn hảo suất': 65 };
        if (preset === 'Thủy sư chế thức' || /[Thủy sư thuyền chu]/.test(text)) return { 'Chủ chiến binh khí': 'Yêu đao', 'Viễn xạ binh khí': 'Cung nỗ', 'Phòng cụ': 'Miên giáp', 'Hỏa khí': 'Hỏa súng', 'Tọa kỵ': 'Chiến thuyền', 'Tề bị suất': 55, 'Hoàn hảo suất': 65 };
        return { 'Chủ chiến binh khí': 'Trường thương', 'Viễn xạ binh khí': 'Cung tiễn', 'Phòng cụ': 'Miên giáp', 'Hỏa khí': 'Không', 'Tọa kỵ': 'Không', 'Tề bị suất': 45, 'Hoàn hảo suất': 70 };
    }

    function ensureCampOperations(camp) {
        if (!camp || typeof camp !== 'object') return camp;
        if (!camp['Trang bị biên chế'] || typeof camp['Trang bị biên chế'] !== 'object') camp['Trang bị biên chế'] = inferEquipmentLayout(camp);
        const layout = camp['Trang bị biên chế']; const inferred = inferEquipmentLayout(camp);
        for (const [key, value] of Object.entries(inferred)) if (layout[key] == null) layout[key] = value;
        if (!['Đãi mệnh', 'Hành quân', 'Tác chiến', 'Huấn luyện', 'Hoán trang', 'Hưu chỉnh', 'Thiếu lương', 'Huyên náo'].includes(camp['Trạng thái'])) camp['Trạng thái'] = 'Đãi mệnh';
        camp['Bì lao'] = Math.round(clamp(number(camp['Bì lao'], 0), 0, 100));
        camp['Thương binh'] = Math.round(clamp(number(camp['Thương binh'], 0), 0, Math.max(0, number(camp['Nhân số'], 0))));
        camp['Số tháng khiếm nợ'] = Math.max(0, Math.round(number(camp['Số tháng khiếm nợ'], 0)));
        camp['Số ngày thiếu lương'] = Math.max(0, Math.round(number(camp['Số ngày thiếu lương'], 0)));
        if (!camp['Ghi chép quân vụ'] || typeof camp['Ghi chép quân vụ'] !== 'object') camp['Ghi chép quân vụ'] = {};
        if (camp['Ghi chép quân vụ']['Lần khao thưởng trước'] == null) camp['Ghi chép quân vụ']['Lần khao thưởng trước'] = '';
        if (camp['Ghi chép quân vụ']['Tháng khao thưởng'] == null) camp['Ghi chép quân vụ']['Tháng khao thưởng'] = '';
        camp['Ghi chép quân vụ']['Số lần khao thưởng tháng này'] = Math.max(0, Math.round(number(camp['Ghi chép quân vụ']['Số lần khao thưởng tháng này'], 0)));
        return camp;
    }

    function classifyCampType(camp) {
        const text = `${camp?.['Binh chủng'] || ''} ${camp?.['Đẳng cấp'] || ''} ${camp?.['Trang bị'] || ''}`;
        if (/[Gia đinh thân binh nội đinh]/.test(text)) return 'retinue';
        if (/[Kỵ mã la đà]/.test(text)) return 'cavalry';
        if (/[Thủy sư thuyền chu]/.test(text)) return 'navy';
        if (/[Hỏa khí điểu súng súng pháo xa doanh]/.test(text)) return 'firearm';
        if (/[Dân tráng hương dũng đoàn luyện]/.test(text)) return 'militia';
        return 'infantry';
    }

    function campLevelFactor(level, kind = 'money') {
        const moneyFactors = { 'Ô hợp': 0.5, 'Tân mộ': 0.7, 'Khả dụng': 0.85, 'Lương hảo': 1, 'Tinh nhuệ': 1.25, 'Danh quân': 1.5 };
        const grainFactors = { 'Ô hợp': 0.9, 'Tân mộ': 0.95, 'Khả dụng': 1, 'Lương hảo': 1.05, 'Tinh nhuệ': 1.1, 'Danh quân': 1.15 };
        const factors = kind === 'grain' ? grainFactors : moneyFactors;
        return factors[level] ?? 1;
    }

    function estimateCampMonthlyCost(camp) {
        const people = Math.max(0, Math.round(number(camp?.['Nhân số'], 0))); if (!people) return 0;
        const rates = { militia: 0.35, infantry: 0.75, firearm: 0.95, navy: 1, cavalry: 1.4, retinue: 1.8 };
        return Math.round(people * rates[classifyCampType(camp)] * campLevelFactor(camp?.['Đẳng cấp'], 'money'));
    }

    function estimateCampMonthlyGrain(camp) {
        const people = Math.max(0, Math.round(number(camp?.['Nhân số'], 0))); if (!people) return 0;
        const rates = { militia: 0.25, infantry: 0.35, firearm: 0.38, navy: 0.38, cavalry: 0.4, retinue: 0.42 };
        return Math.ceil(people * rates[classifyCampType(camp)] * campLevelFactor(camp?.['Đẳng cấp'], 'grain'));
    }

    function estimateArmyMonthlySupply(data) {
        const camps = entries(get(data, 'Quân sự.Các doanh', {}));
        let cost = 0, grain = 0, people = 0;
        for (const [, camp] of camps) {
            cost += estimateCampMonthlyCost(camp);
            grain += estimateCampMonthlyGrain(camp);
            people += Math.max(0, Math.round(number(camp?.['Nhân số'], 0)));
        }
        return { cost, grain, people };
    }

    function appendGrainTransaction(data, dir, amount, options = {}) {
        const economy = ensureObject(data, 'Kinh tế');
        const ledger = ensureObject(economy, 'Lưu thủy');
        const list = ensureObject(ledger, dir === 'in' ? 'Nguyệt nhập' : 'Nguyệt xuất');
        const baseKey = options.label || (dir === 'in' ? 'Nhập kho' : 'Xuất kho');
        let key = baseKey; let idx = 1; while (list[key]) key = `${baseKey} ${++idx}`;
        list[key] = { 'Ngân lượng': roundMarketNumber(amount), 'Thuyết minh': options.description || '' };
    }

    function grainStorageEntries(storageData) {
        return entries(storageData).filter(([name, item]) => {
            const unit = String(item?.['Đơn vị'] || ''); const itemName = String(name);
            if (NON_HUMAN_GRAIN_KEYS.some(key => itemName.includes(key))) return false;
            return unit === 'Thạch' || ARMY_GRAIN_KEYS.some(key => itemName.includes(key));
        }).sort(([a], [b]) => {
            const score = name => ARMY_GRAIN_KEYS.findIndex(key => String(name).includes(key));
            const sa = score(a); const sb = score(b); return (sa < 0 ? 99 : sa) - (sb < 0 ? 99 : sb);
        });
    }

    function availableArmyGrain(data) {
        return roundMarketNumber(grainStorageEntries(get(data, 'Kinh tế.Thương trữ', {})).reduce((sum, [, item]) => sum + Math.max(0, number(item?.['Số lượng'], 0)), 0));
    }

    function consumeStoredArmyGrain(data, required, options = {}) {
        const need = roundMarketNumber(Math.max(0, number(required, 0))); if (!(need > 0)) return 0;
        if (availableArmyGrain(data) + 1e-9 < need) throw new Error(`Quân lương không đủ, cần ${need} thạch`);
        let remaining = need; const storage = ensureObject(ensureObject(data, 'Kinh tế'), 'Thương trữ');
        for (const [, item] of grainStorageEntries(storage)) {
            if (remaining <= 1e-9) break;
            const available = Math.max(0, number(item['Số lượng'], 0)); const used = Math.min(available, remaining);
            item['Số lượng'] = roundMarketNumber(available - used); remaining = roundMarketNumber(remaining - used);
        }
        appendGrainTransaction(data, 'out', need, options); return need;
    }

    function activeMilitaryOrders(data) { return entries(get(data, 'Quân sự.Quân lệnh', {})).filter(([, order]) => order?.['Trạng thái'] === 'Đang tiến hành'); }
    function militaryOrderState(type) { if (type === 'Chỉnh doanh hoán trang') return 'Hoán trang'; if (type === 'Hưu chỉnh thương binh') return 'Hưu chỉnh'; return 'Huấn luyện'; }
    function campSupplyQuote(camp) { return { money: estimateCampMonthlyCost(camp), grain: estimateCampMonthlyGrain(camp) }; }
    function adjustTrainingGain(current, proposed, type) { let gain = Math.max(0, Math.round(proposed)); if (current >= 80) gain = type === 'Trường kỳ chỉnh huấn' ? Math.min(1, gain) : 0; else if (current >= 60) gain = Math.ceil(gain / 2); return gain; }

    function extractYearMonth(dateStr) {
        if (!dateStr) return null; const s = String(dateStr).trim();
        const m = s.match(/(.+?năm)\s*(nhuận?\S{1,3}?tháng)/); if (m) return m[1] + m[2];
        const m2 = s.match(/(\d{3,4})\s*[năm/-]\s*(\d{1,2})\s*tháng/); if (m2) return m2[1] + 'năm' + m2[2] + 'tháng';
        return null;
    }

    function buildMilitaryCommandQuote(data, campName, actionId, options = {}) {
        const camp = get(data, `Quân sự.Các doanh.${campName}`); if (!camp) throw new Error('Không tìm thấy doanh ngũ đã chọn');
        ensureCampOperations(camp); const people = Math.max(0, Math.round(number(camp['Nhân số'], 0))); if (!people) throw new Error('Doanh này không còn binh viên khả dụng');
        const supply = campSupplyQuote(camp); const generalName = options.general || camp['Tướng lĩnh'] || '';
        const general = get(data, `Quân sự.Tướng lĩnh.${generalName}`, {}); const command = clamp(number(general['Thống suất'], 35), 0, 100); const politics = clamp(number(general['Chính trị'], 30), 0, 100);
        const month = extractYearMonth(get(data, 'Thế giới vận hành.Ngày hiện tại', '')) || ''; const record = camp['Ghi chép quân vụ'];
        const rewardCount = record['Tháng khao thưởng'] === month ? Math.max(0, number(record['Số lần khao thưởng tháng này'], 0)) : 0;
        const base = { id: actionId, campName, generalName, kind: 'immediate', days: 0, silver: 0, grain: 0, effect: {}, note: '' };

        if (actionId === 'reward') {
            const moraleBase = Math.max(1, Math.round(8 * (1 - clamp(number(camp['Sĩ khí'], 50), 0, 100) / 115)));
            const morale = Math.max(1, Math.floor((moraleBase * (camp['Số tháng khiếm nợ'] ? 0.55 : 1)) / (1 + rewardCount * 0.65)));
            return { ...base, label: 'Khao thưởng sĩ tốt', silver: Math.ceil(people * 0.15 * (1 + rewardCount * 0.25)), effect: { 'Sĩ khí': morale }, note: `Lần thứ ${rewardCount + 1} trong tháng, liên tục khao thưởng hiệu quả giảm dần` };
        }
        if (actionId === 'pay-arrears') {
            const months = Math.max(0, number(camp['Số tháng khiếm nợ'], 0)); if (!months) throw new Error('Doanh này hiện không khiếm nợ lương');
            return { ...base, label: 'Bổ phát khiếm nợ', silver: Math.ceil(supply.money * months), effect: { 'Sĩ khí': Math.min(8, 2 + months * 2), 'Số tháng khiếm nợ': -months }, note: `Thanh toán ${months} tháng khiếm nợ` };
        }
        if (actionId === 'feast') { return { ...base, label: 'Gia xan khao quân', grain: Math.max(1, Math.ceil(supply.grain * 0.2)), effect: { 'Sĩ khí': 3, 'Bì lao': -6 }, note: 'Tiêu hao thương trữ quân lương, sĩ khí cao vẫn chịu ràng buộc giới hạn' }; }
        if (actionId === 'resupply') { return { ...base, label: 'Bổ tề doanh vụ', silver: Math.ceil(supply.money * 0.15), grain: Math.max(1, Math.ceil(supply.grain * 0.25)), effect: { 'Hậu cần': 7, 'Số ngày thiếu lương': -10 }, note: 'Bổ sung doanh cụ, dược liệu và mười ngày lương thảo khẩn cấp' }; }
        if (actionId === 'train-short' || actionId === 'train-standard' || actionId === 'train-long') {
            const table = { 'train-short': { label: 'Đoản kỳ thao luyện', days: 5, silver: 0.12, grain: 5 / 30, gain: 1, fatigue: 5 }, 'train-standard': { label: 'Thường quy chỉnh huấn', days: 15, silver: 0.35, grain: 15 / 30, gain: 2, fatigue: 10 }, 'train-long': { label: 'Trường kỳ chỉnh huấn', days: 40, silver: 0.8, grain: 40 / 30, gain: 4, fatigue: 16 } }[actionId];
            const gain = adjustTrainingGain(number(camp['Huấn luyện'], 0), table.gain + Math.floor(command / 60), table.label);
            if (gain <= 0) throw new Error('Huấn luyện của doanh này đã thành thục, đoản kỳ thao luyện không thể tiếp tục đề thăng; vui lòng chuyển sang trường kỳ chỉnh huấn hoặc an bài thực chiến lịch luyện.');
            return { ...base, kind: 'order', label: table.label, days: table.days, silver: Math.ceil(supply.money * table.silver), grain: Math.max(1, Math.ceil(supply.grain * table.grain)), effect: { 'Huấn luyện': gain, 'Sĩ khí': gain ? 1 : 0, 'Bì lao': table.fatigue }, note: gain ? `Do ${generalName || 'tướng lĩnh chưa xưng tên'} chủ trì, thống suất ${command}` : 'Huấn luyện hiện tại đã đạt giới hạn của phương thức này' };
        }
        if (actionId === 'rest') {
            const wounded = Math.max(0, Math.round(number(camp['Thương binh'], 0))); const recovery = Math.min(wounded, Math.max(1, Math.ceil(wounded * (0.25 + politics / 500))));
            return { ...base, kind: 'order', label: 'Hưu chỉnh thương binh', days: 7, silver: Math.ceil(supply.money * 0.08 + wounded * 0.03), grain: Math.max(1, Math.ceil(supply.grain * (7 / 30))), effect: { 'Hậu cần': 2, 'Bì lao': -30, 'Khôi phục thương binh': recovery }, note: `Dự tính khôi phục ${recovery} thương binh, bì lao giảm mạnh` };
        }
        if (actionId === 'refit') {
            const targetTier = EQUIPMENT_TIERS.includes(options.targetTier) ? options.targetTier : 'Phổ thông'; const loadout = EQUIPMENT_LOADOUTS.includes(options.loadout) ? options.loadout : 'Bộ tốt chế thức';
            const currentRate = EQUIPMENT_TIER_COST[camp['Trang bị']] ?? EQUIPMENT_TIER_COST['Giản lậu']; const targetRate = EQUIPMENT_TIER_COST[targetTier];
            const marketIndex = clamp(number(get(data, 'Kinh tế.Thị trường.Chỉ số giá cả.Quân nhu', 100), 100), 50, 500) / 100; const rate = Math.max(0.08, targetRate - currentRate * 0.45);
            return { ...base, kind: 'order', label: 'Chỉnh doanh hoán trang', days: EQUIPMENT_TIER_DAYS[targetTier], silver: Math.ceil(people * rate * marketIndex), grain: 0, effect: { 'Hậu cần': 3, 'Bì lao': 4 }, targetTier, loadout, note: `${loadout}·${targetTier}, án theo quân nhu thị giá ${Math.round(marketIndex * 100)}% tính giá` };
        }
        throw new Error('Chưa rõ thao tác quân vụ');
    }

    function militaryCommandPreview(quote) {
        const costs = [quote.silver ? `Bạch ngân ${quote.silver} lượng` : '', quote.grain ? `Quân lương ${quote.grain} thạch` : ''].filter(Boolean).join('、') || 'Không chi tiêu thêm';
        const effects = Object.entries(quote.effect || {}).filter(([, value]) => value).map(([key, value]) => `${key}${value > 0 ? '+' : ''}${value}`).join('、') || 'Án theo hoàn thành trạng thái kết toán';
        return `${quote.campName}·${quote.label}\nChi xuất: ${costs}\nHao thời: ${quote.days ? `${quote.days} ngày` : 'Lập tức'}\nDự tính: ${effects}\n${quote.note || ''}`;
    }

    function appendMilitaryLog(data, entry) {
        const military = ensureObject(data, 'Quân sự'); if (!Array.isArray(military['Ghi chép quân lệnh'])) military['Ghi chép quân lệnh'] = [];
        military['Ghi chép quân lệnh'].push({ 'Ngày tháng': entry.date || get(data, 'Thế giới vận hành.Ngày hiện tại', ''), 'Loại hình': entry.type || '', 'Mục tiêu doanh': entry.campName || '', 'Thực thi tướng lĩnh': entry.generalName || '', 'Ngân lượng': number(entry.silver, 0), 'Lương thực': number(entry.grain, 0), 'Kết quả': entry.result || '' });
        if (military['Ghi chép quân lệnh'].length > 80) military['Ghi chép quân lệnh'].splice(0, military['Ghi chép quân lệnh'].length - 80);
    }

    function applyImmediateMilitaryCommand(data, camp, quote) {
        const effect = quote.effect || {};
        camp['Sĩ khí'] = Math.round(clamp(number(camp['Sĩ khí'], 50) + number(effect['Sĩ khí'], 0), 0, 100)); camp['Hậu cần'] = Math.round(clamp(number(camp['Hậu cần'], 50) + number(effect['Hậu cần'], 0), 0, 100)); camp['Bì lao'] = Math.round(clamp(number(camp['Bì lao'], 0) + number(effect['Bì lao'], 0), 0, 100));
        if (effect['Số tháng khiếm nợ']) camp['Số tháng khiếm nợ'] = Math.max(0, number(camp['Số tháng khiếm nợ'], 0) + effect['Số tháng khiếm nợ']); if (effect['Số ngày thiếu lương']) camp['Số ngày thiếu lương'] = Math.max(0, number(camp['Số ngày thiếu lương'], 0) + effect['Số ngày thiếu lương']);
        if (quote.id === 'reward') {
            const month = extractYearMonth(get(data, 'Thế giới vận hành.Ngày hiện tại', '')) || '';
            if (camp['Ghi chép quân vụ']['Tháng khao thưởng'] !== month) camp['Ghi chép quân vụ']['Số lần khao thưởng tháng này'] = 0;
            camp['Ghi chép quân vụ']['Tháng khao thưởng'] = month; camp['Ghi chép quân vụ']['Số lần khao thưởng tháng này'] += 1; camp['Ghi chép quân vụ']['Lần khao thưởng trước'] = get(data, 'Thế giới vận hành.Ngày hiện tại', '');
        }
        if (camp['Số ngày thiếu lương'] <= 0 && camp['Trạng thái'] === 'Thiếu lương') camp['Trạng thái'] = 'Đãi mệnh';
    }

    function createMilitaryOrder(data, camp, quote) {
        const military = ensureObject(data, 'Quân sự'); const orders = ensureObject(military, 'Quân lệnh'); const currentDay = Math.max(0, Math.round(number(get(data, 'Thế giới vận hành.Số ngày vận hành', 0), 0)));
        const idBase = `${quote.campName}·${quote.label}·${Date.now().toString(36)}`; let id = idBase; let suffix = 2; while (orders[id]) id = `${idBase}·${suffix++}`;
        orders[id] = { 'Loại hình': quote.label, 'Mục tiêu doanh': quote.campName, 'Thực thi tướng lĩnh': quote.generalName, 'Ngày bắt đầu': get(data, 'Thế giới vận hành.Ngày hiện tại', ''), 'Số ngày bắt đầu': currentDay, 'Số ngày cần thiết': quote.days, 'Số ngày đã tiến hành': 0, 'Ngân lượng dự toán': quote.silver, 'Lương thực dự toán': quote.grain, 'Trạng thái': 'Đang tiến hành', 'Hiệu quả dự kiến': militaryCommandPreview(quote), 'Ghi chú': quote.note, 'Mục tiêu trang bị': quote.targetTier, 'Cấu hình hoán trang': quote.loadout };
        camp['Trạng thái'] = militaryOrderState(quote.label);
        return id;
    }

    async function executeMilitaryCommand(freshQuote) {
        try {
            statData = getMvuData() || {};
            const camp = get(statData, `Quân sự.Các doanh.${freshQuote.campName}`); if (!camp) throw new Error('Doanh ngũ không tồn tại');
            const active = activeMilitaryOrders(statData);
            if (freshQuote.kind === 'order' && active.some(([, order]) => order['Mục tiêu doanh'] === freshQuote.campName)) throw new Error('Doanh này đang chấp hành quân lệnh khác');
            if (freshQuote.kind === 'order' && freshQuote.generalName && active.some(([, order]) => order['Thực thi tướng lĩnh'] === freshQuote.generalName)) throw new Error(`${freshQuote.generalName} đã đang chủ trì quân lệnh khác`);
            const coins = ensureObject(ensureObject(ensureObject(statData, 'Nhân vật chính'), 'Tư khố'), 'Kim ngân đồng'); const silver = number(coins['Bạch ngân'], 0);
            if (silver + 1e-9 < freshQuote.silver) throw new Error(`Bạch ngân không đủ, cần ${freshQuote.silver} lượng`);
            if (availableArmyGrain(statData) + 1e-9 < freshQuote.grain) throw new Error(`Quân lương không đủ, cần ${freshQuote.grain} thạch`);

            coins['Bạch ngân'] = roundMarketNumber(silver - freshQuote.silver);
            if (freshQuote.grain > 0) consumeStoredArmyGrain(statData, freshQuote.grain, { label: `${freshQuote.campName}·${freshQuote.label}`, description: freshQuote.note });

            let result;
            if (freshQuote.kind === 'order') {
                const id = createMilitaryOrder(statData, camp, freshQuote); result = `Quân lệnh đã lập, kết toán sau ${freshQuote.days} ngày (${id})`;
            } else {
                applyImmediateMilitaryCommand(statData, camp, freshQuote); result = `Đã thực thi: ${freshQuote.note}`;
            }
            appendMilitaryLog(statData, { type: freshQuote.label, campName: freshQuote.campName, generalName: freshQuote.generalName, silver: freshQuote.silver, grain: freshQuote.grain, result });
            await saveMvuData(statData);
            modalState = null;
            renderMilitary(); renderZjcModal();
            showToast(`✓ ${freshQuote.campName}·${freshQuote.label} ${freshQuote.kind === 'order' ? 'đã hạ lệnh' : 'đã kết toán'}`);
        } catch (error) {
            showToast(`✗ Quân lệnh chưa thực thi: ${error?.message || 'Lỗi chưa rõ'}`);
        }
    }

    async function cancelMilitaryOrder(orderId) {
        try {
            statData = getMvuData() || {};
            const order = get(statData, `Quân sự.Quân lệnh.${orderId}`);
            if (!order || order['Trạng thái'] !== 'Đang tiến hành') throw new Error('Quân lệnh không còn hiệu lực');
            order['Trạng thái'] = 'Đã đình chỉ'; order['Hoàn thành kết quả'] = 'Đình chỉ bởi nhân vật chính, ngân lương đã khấu trừ không hoàn lại';
            const camp = get(statData, `Quân sự.Các doanh.${order['Mục tiêu doanh']}`);
            if (camp && militaryOrderState(order['Loại hình']) === camp['Trạng thái']) camp['Trạng thái'] = camp['Số ngày thiếu lương'] > 0 ? 'Thiếu lương' : 'Đãi mệnh';
            appendMilitaryLog(statData, { type: `${order['Loại hình']} đình chỉ`, campName: order['Mục tiêu doanh'], generalName: order['Thực thi tướng lĩnh'], result: order['Hoàn thành kết quả'] });
            await saveMvuData(statData);
            modalState = null;
            renderMilitary(); renderZjcModal();
            showToast('✓ Quân lệnh đã đình chỉ');
        } catch (error) {
            showToast(`✗ Đình chỉ thất bại: ${error?.message || 'Lỗi chưa rõ'}`);
        }
    }

    // ==========================================
    // 3. Định nghĩa Style màn hình rộng & chế độ tối
    // ==========================================
    const CSS = `
        :root {
            --paper: #17130f; --paper-raised: #1d1813; --paper-deep: #100d0a;
            --ink: #ead9ba; --ink-bright: #fff0d2; --muted: #ad9a7b; --faint: #746653;
            --line: rgba(205, 170, 111, 0.2); --line-strong: rgba(205, 170, 111, 0.38);
            --cinnabar: #b54d39; --cinnabar-bright: #db7258; --gold: #c79b5d; --jade: #4e8a75;
            --shadow: rgba(0, 0, 0, 0.62);
        }

        #${LAMP_ID} {
            position: fixed; z-index: 2147483647; 
            background: rgba(16, 13, 10, 0.92);
            border: 1px solid rgba(199, 155, 93, 0.6); 
            color: var(--gold); font-weight: bold; font-family: 'Noto Serif SC', serif;
            display: flex; align-items: center; justify-content: center; cursor: grab;
            box-shadow: 0 8px 20px var(--shadow), inset 0 0 0 4px rgba(199, 155, 93, 0.05);
            user-select: none; touch-action: none; transition: all 0.3s ease; 
            backdrop-filter: blur(4px);
        }
        #${LAMP_ID}::before { 
            content: ""; position: absolute; inset: 4px; 
            border: 1px solid rgba(199, 155, 93, 0.2); 
            border-radius: 50%; pointer-events: none; 
            background: radial-gradient(circle, rgba(199, 155, 93, 0.1) 0%, transparent 70%);
        }
        #${LAMP_ID}:active { cursor: grabbing; transform: scale(0.92); box-shadow: 0 4px 10px var(--shadow); }
        #${LAMP_ID}:hover { 
            transform: scale(1.05) translateY(-2px); 
            border-color: var(--gold); 
            color: var(--ink-bright);
            box-shadow: 0 10px 24px rgba(0,0,0,0.9), 0 0 12px rgba(199, 155, 93, 0.3), inset 0 0 10px rgba(199, 155, 93, 0.15); 
        }

        #zjc-map-modal {
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; height: 100dvh;
            z-index: 2147483647; background: transparent; 
            display: none; align-items: center; justify-content: center; padding: 2vh 2vw; box-sizing: border-box;
            pointer-events: none; 
        }
        #zjc-map-modal.active { display: flex; }

        .cwe-panel {
            pointer-events: auto; 
            position: relative; display: flex; flex-direction: column; 
            width: 82vw; height: 82vh; max-width: 1240px; max-height: 820px; min-width: 320px;
            overflow: hidden; border: 1px solid var(--line-strong); border-radius: 20px; 
            background-color: var(--paper); 
            color: var(--ink);
            background-image: radial-gradient(rgba(205, 170, 111, 0.04) 1px, transparent 1px); background-size: 4px 4px;
            box-shadow: 0 28px 90px var(--shadow), inset 0 0 0 4px rgba(205, 170, 111, 0.035);
            font-family: 'Microsoft YaHei', 'PingFang SC', system-ui, sans-serif;
        }

        .cwe-header {
            position: relative; z-index: 20; display: flex; min-height: 60px; align-items: center; justify-content: space-between;
            padding: 12px 20px; border-bottom: 1px solid var(--line); background: rgba(13, 10, 8, 0.95); box-shadow: 0 10px 28px rgba(0, 0, 0, 0.16);
        }
        .cwe-brand { display: flex; align-items: center; gap: 10px; }
        .cwe-brand-mark {
            display: grid; width: 38px; height: 38px; place-items: center; border: 1px solid rgba(199, 155, 93, 0.62); border-radius: 50%; color: var(--gold); background: rgba(16, 13, 10, 0.9); box-shadow: inset 0 0 0 4px rgba(199, 155, 93, 0.05);
            font-family: 'Noto Serif SC', serif; font-size: 18px; font-weight: bold;
        }
        .cwe-brand h1 { margin: 0; color: var(--ink-bright); font-family: 'Noto Serif SC', serif; font-size: 20px; font-weight: 700; letter-spacing: 0.1em; }
        .cwe-brand p { margin: 3px 0 0 0; color: var(--muted); font-size: 11px; }
        .cwe-header-actions { display: flex; gap: 8px;}
        .cwe-header-actions button { border: 1px solid var(--line); border-radius: 999px; padding: 6px 14px; color: var(--ink); background: rgba(16, 13, 10, 0.9); cursor: pointer; font-size: 12px; transition: 0.2s; }
        .cwe-header-actions button:hover { border-color: var(--cinnabar-bright); color: var(--ink-bright); }

        .cwe-shell { position: relative; z-index: 1; display: flex; flex: 1; min-height: 0; flex-direction: row; }
        
        .cwe-map-sidebar {
            flex: 0 0 35%; max-width: 400px; min-width: 280px; border-right: 1px solid var(--line-strong); 
            background: var(--paper-deep); 
            display: flex; flex-direction: column; align-items: center; justify-content: flex-start; padding: 12px; position: relative; overflow: hidden;
        }
        .cwe-map-header { display: none; justify-content: space-between; align-items: center; width: 100%; padding: 10px 15px; background: rgba(0,0,0,0.5); color: var(--gold); font-size: 14px; cursor: pointer; box-sizing: border-box; }
        
        .zjc-map-tabs { display: flex; width: 100%; border-bottom: 1px solid var(--line-strong); background: rgba(0,0,0,0.2); border-radius: 8px 8px 0 0; overflow: hidden; margin-bottom: 12px; flex-shrink: 0; }
        .zjc-map-tabs button { flex: 1; background: transparent; border: none; color: var(--muted); padding: 8px 0; cursor: pointer; font-size: 13px; font-family: 'Noto Serif SC', serif; transition: 0.2s; border-bottom: 2px solid transparent; }
        .zjc-map-tabs button:hover { color: var(--gold); }
        .zjc-map-tabs button.active { color: var(--ink-bright); border-bottom: 2px solid var(--gold); background: rgba(199, 155, 93, 0.1); }
        
        .zjc-canvas-container, .zjc-org-container { display: none; width: 100%; border-radius: 12px; border: 1px solid var(--line); overflow: hidden; background: #1f1109; box-shadow: inset 0 0 30px rgba(0,0,0,0.8); }
        .zjc-canvas-container.active, .zjc-org-container.active { display: block; }
        .zjc-canvas-container { aspect-ratio: 800 / 1100; position: relative; flex-shrink: 0; }
        .zjc-canvas-container canvas { display: block; width: 100%; height: 100%; cursor: grab; transform-origin: 0 0; touch-action: none; }
        
        .zjc-org-container, .cwe-content, .cm-modal-body, .cm-confirm-modal-body, .cm-command-log {
            overflow-x: hidden !important;
            overflow-y: auto !important;
            -webkit-overflow-scrolling: touch !important; 
            overscroll-behavior-y: contain !important; 
            touch-action: pan-y !important; 
        }

        .zjc-org-container { flex: 1; padding: 12px; box-sizing: border-box; scrollbar-width: thin; scrollbar-color: rgba(199, 155, 93, 0.4) transparent; }
        .zjc-org-container::-webkit-scrollbar { width: 6px; }
        .zjc-org-container::-webkit-scrollbar-thumb { border-radius: 8px; background: rgba(199, 155, 93, 0.3); }

        .zjc-org-tree { font-size: 12px; color: var(--ink); line-height: 1.5; }
        .zjc-org-node { position: relative; padding-left: 16px; margin-bottom: 8px; }
        .zjc-org-node::before { content: ''; position: absolute; top: -8px; bottom: 0; left: 4px; width: 1px; background: var(--line-strong); }
        .zjc-org-node:last-child::before { bottom: auto; height: 24px; }
        .zjc-org-node::after { content: ''; position: absolute; top: 15px; left: 4px; width: 10px; height: 1px; background: var(--line-strong); }
        .zjc-org-item { border: 1px solid var(--line); background: rgba(0,0,0,0.3); border-radius: 6px; padding: 6px 10px; display: inline-block; width: 100%; box-sizing: border-box; }
        .zjc-org-title { color: var(--gold); font-weight: bold; font-size: 13px; margin-bottom: 4px; display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; }
        .zjc-org-rank { font-size: 10px; color: var(--cinnabar-bright); background: rgba(181, 77, 57, 0.1); padding: 2px 5px; border-radius: 4px; font-weight: normal; white-space: nowrap; }
        .zjc-org-desc { color: var(--muted); font-size: 11px; }
        .zjc-org-root { text-align: center; font-weight: bold; font-size: 16px; color: var(--ink-bright); border: 2px solid var(--gold); background: rgba(199, 155, 93, 0.15); padding: 8px; border-radius: 8px; margin-bottom: 12px; }
        .zjc-org-group-title { font-size: 14px; color: var(--ink-bright); margin: 12px 0 6px 0; padding-left: 18px; position: relative; font-weight: bold; }
        .zjc-org-group-title::before { content: '■'; position: absolute; left: 2px; top: 2px; font-size: 10px; color: var(--jade); }
        .zjc-canvas-container canvas:active { cursor: grabbing; }
        .zjc-btn-reset { position: absolute; left: 8px; bottom: 8px; z-index: 10; background: rgba(16,13,10,0.9); border: 1px solid var(--gold); color: var(--ink); padding: 4px 8px; border-radius: 4px; font-size: 11px; cursor: pointer; backdrop-filter: blur(4px); }
        .zjc-btn-reset:hover { background: var(--gold); color: #fff; }

        .cwe-main-content { flex: 1; display: flex; flex-direction: column; min-width: 0; min-height: 0; background: var(--paper); }
        
        .cwe-command-bar { display: flex; align-items: center; gap: 14px; padding: 10px 18px; border-bottom: 1px solid var(--line-strong); background: rgba(12, 9, 7, 0.88); box-shadow: 0 6px 20px rgba(0, 0, 0, 0.18); z-index: 5; overflow-x: auto; scrollbar-width: none; }
        .cwe-command-bar::-webkit-scrollbar { display: none; }
        .cwe-command-bar nav { display: flex; align-items: center; border: 1px solid var(--line); border-radius: 8px; overflow: hidden; flex-shrink: 0; }
        .cwe-command-bar nav button { border: 0; border-right: 1px solid var(--line); padding: 6px 14px; color: var(--muted); background: transparent; cursor: pointer; font-size: 13px; letter-spacing: 0.05em; transition: 0.2s; font-family: 'Noto Serif SC', serif; white-space: nowrap;}
        .cwe-command-bar nav button:last-child { border-right: 0; }
        .cwe-command-bar nav button:hover { color: var(--ink-bright); background: rgba(199, 155, 93, 0.08); }
        .cwe-command-bar nav button.active { color: #fff; background: var(--cinnabar); box-shadow: inset 0 0 10px rgba(0,0,0,0.5); }
        
        .cwe-content { flex: 1; overflow-y: auto; padding: 0 24px 18px; scrollbar-color: rgba(199, 155, 93, 0.3) transparent; min-height: 0; }
        .cwe-content::-webkit-scrollbar { width: 6px; }
        .cwe-content::-webkit-scrollbar-thumb { border-radius: 8px; background: rgba(199, 155, 93, 0.24); }

        @keyframes panelFadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .zjc-panel { display: none; flex-direction: column; animation: panelFadeIn 0.3s ease-out; padding-top: 20px; }
        .zjc-panel.active { display: flex; }

        .cwe-section-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 16px; padding-bottom: 10px; border-bottom: 1px solid var(--line-strong); margin-bottom: 14px; }
        .cwe-section-head p { margin: 0; color: var(--gold); font-size: 11px; letter-spacing: 0.12em; font-weight: bold; }
        .cwe-section-head h2 { margin: 2px 0 0 0; color: var(--ink-bright); font-family: 'Noto Serif SC', serif; font-size: 22px; }

        .cwe-event-row { display: grid; min-width: 0; gap: 14px; grid-template-columns: 70px minmax(0, 1fr) auto; padding: 12px 14px; border: 1px solid var(--line); border-radius: 12px; background: rgba(255,255,255,0.02); margin-bottom: 10px; align-items: center; transition: transform 0.2s, box-shadow 0.2s; }
        .cwe-event-row:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(0,0,0,0.15); border-color: var(--gold); }
        .cwe-event-when { position: relative; padding-left: 20px; }
        .cwe-event-when i { position: absolute; z-index: 1; top: 3px; left: 0; width: 9px; height: 9px; border: 2px solid var(--paper); border-radius: 50%; background: var(--jade); box-shadow: 0 0 0 1px var(--jade); }
        .cwe-event-when strong { display: block; color: var(--gold); font-size: 12px; font-weight: 600; margin-bottom: 2px; }
        .cwe-event-when span { color: var(--muted); font-size: 11px; }
        .cwe-event-story { min-width: 0; }
        .cwe-event-story h4 { margin: 0 0 4px 0; color: var(--ink-bright); font-size: 15px; font-family: 'Noto Serif SC', serif; }
        .cwe-event-story p { margin: 0; color: var(--muted); font-size: 13px; line-height: 1.6; }

        .cwe-command-actions { display: flex; gap: 6px; }
        .cwe-command-actions button { border: 1px solid var(--line); border-radius: 999px; padding: 5px 12px; color: var(--ink); background: rgba(16, 13, 10, 0.9); cursor: pointer; font-size: 12px; transition: 0.2s;}
        .cwe-command-actions button:hover { border-color: var(--gold); }
        .cwe-command-actions button.primary { border-color: var(--jade); color: #fff2df; background: rgba(78, 138, 117, 0.4); }
        .cwe-command-actions button.primary:hover { background: var(--jade); }
        .cwe-command-actions button.danger { border-color: rgba(219, 114, 88, 0.5); color: var(--cinnabar-bright); background: rgba(181, 77, 57, 0.1); }
        .cwe-command-actions button.danger:hover { background: var(--cinnabar); color: #fff; }
        .cwe-command-actions button.lore { border-color: rgba(199, 155, 93, 0.6); color: var(--gold); background: rgba(199, 155, 93, 0.1); }
        .cwe-command-actions button.lore:hover { background: var(--gold); color: #111; }

        .cwe-archive-grid { display: grid; gap: 14px; grid-template-columns: repeat(2, minmax(0, 1fr)); margin-top: 8px; }
        .cwe-ledger-column { padding: 14px 18px; border: 1px solid var(--line-strong); border-radius: 12px; background: rgba(0,0,0,0.25); box-shadow: inset 0 2px 10px rgba(0,0,0,0.2); }
        .cwe-ledger-column header { display: flex; justify-content: space-between; margin-bottom: 10px; border-bottom: 1px solid var(--line); padding-bottom: 8px; }
        .cwe-ledger-column header span { color: var(--gold); font-size: 11px; letter-spacing: 0.1em; font-weight: bold; }
        .cwe-record { display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px dashed var(--line); }
        .cwe-record:last-child { border-bottom: none; }
        .cwe-record p { margin: 0; color: var(--muted); font-size: 13px; }
        .cwe-record h3 { margin: 0; color: var(--ink-bright); font-size: 14px; font-family: 'Noto Serif SC', serif;}

        #zjc-tooltip { position: absolute; background: rgba(13, 10, 8, 0.95); border: 1px solid var(--gold); border-radius: 8px; padding: 10px 14px; color: var(--ink); pointer-events: none; display: none; z-index: 100; width: 200px; box-shadow: 0 8px 20px var(--shadow); transform: translate(-50%, -110%); backdrop-filter: blur(4px); }
        #zjc-tooltip h4 { color: var(--gold); font-size: 14px; margin: 0 0 4px 0; border-bottom: 1px solid var(--line); padding-bottom: 4px; font-family: 'Noto Serif SC', serif; }
        #zjc-tooltip p { margin: 0; font-size: 12px; line-height: 1.5; color: var(--muted); }
        .zjc-toast { position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%); background: rgba(29, 24, 19, 0.98); color: var(--ink-bright); padding: 12px 24px; border: 1px solid var(--gold); border-radius: 12px; z-index: 2147483647; font-family: 'Noto Serif SC', serif; font-size: 14px; box-shadow: 0 8px 24px var(--shadow); animation: fadeIn 0.3s; pointer-events: none; }

        /* ===== THIẾT KẾ THẺ QUÂN SỰ HOÀNG GIA (IMPERIAL ARMY UI) ===== */
        .cm-army-card {
            border: 1px solid var(--line-strong);
            border-radius: 14px;
            background: rgba(26, 20, 15, 0.85);
            padding: 14px 16px;
            margin-bottom: 14px;
            box-shadow: 0 4px 16px rgba(0,0,0,0.35);
            transition: transform 0.2s, border-color 0.2s, box-shadow 0.2s;
        }
        .cm-army-card:hover {
            transform: translateY(-2px);
            border-color: rgba(199, 155, 93, 0.6);
            box-shadow: 0 8px 24px rgba(0,0,0,0.6);
        }

        .cm-army-head {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            padding-bottom: 10px;
            border-bottom: 1px solid var(--line);
            flex-wrap: wrap;
        }
        .cm-army-left {
            display: flex;
            align-items: center;
            gap: 12px;
            min-width: 0;
            flex: 1;
        }
        .cm-army-seal {
            width: 44px;
            height: 44px;
            border-radius: 10px;
            background: linear-gradient(135deg, rgba(42, 30, 22, 0.95), rgba(20, 15, 11, 0.95));
            border: 1px solid var(--gold);
            color: var(--gold);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-family: 'Noto Serif SC', serif;
            font-weight: bold;
            font-size: 12px;
            line-height: 1.1;
            flex-shrink: 0;
            box-shadow: inset 0 0 8px rgba(199, 155, 93, 0.2);
        }
        .cm-army-info {
            display: flex;
            flex-direction: column;
            gap: 4px;
            min-width: 0;
        }
        .cm-army-title {
            display: flex;
            align-items: center;
            gap: 8px;
            flex-wrap: wrap;
        }
        .cm-army-name {
            font-size: 16px;
            font-weight: 700;
            font-family: 'Noto Serif SC', serif;
            color: var(--ink-bright);
        }
        .cm-army-badge {
            font-size: 10px;
            padding: 2px 7px;
            border-radius: 999px;
            font-weight: 600;
            border: 1px solid transparent;
            display: inline-flex;
            align-items: center;
            gap: 4px;
        }
        .cm-army-badge.ready {
            color: #79d4b0;
            background: rgba(78, 138, 117, 0.2);
            border-color: rgba(78, 138, 117, 0.5);
        }
        .cm-army-badge.danger {
            color: var(--cinnabar-bright);
            background: rgba(181, 77, 57, 0.2);
            border-color: rgba(181, 77, 57, 0.5);
        }
        .cm-army-subline {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 12px;
            color: var(--muted);
            flex-wrap: wrap;
        }
        .cm-army-subline b {
            color: var(--gold);
            font-weight: 600;
        }
        .cm-army-subline .sep {
            color: var(--faint);
        }

        /* Khối 4 Thanh Mini */
        .cm-army-bars {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 12px;
            padding: 10px 14px;
            margin: 10px 0;
            border-radius: 10px;
            background: rgba(10, 8, 6, 0.45);
            border: 1px solid rgba(205, 170, 111, 0.12);
        }
        .cm-army-bar-col {
            display: flex;
            flex-direction: column;
            gap: 4px;
        }
        .cm-army-bar-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 11px;
        }
        .cm-army-bar-header span {
            color: var(--muted);
        }
        .cm-army-bar-header b {
            color: var(--ink-bright);
            font-size: 11px;
            font-family: monospace;
        }
        .cm-army-track {
            height: 6px;
            border-radius: 3px;
            background: rgba(0, 0, 0, 0.6);
            overflow: hidden;
            border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .cm-army-fill {
            height: 100%;
            border-radius: 3px;
            transition: width 0.3s ease;
        }
        .cm-army-fill.high { background: var(--jade); }
        .cm-army-fill.mid { background: var(--gold); }
        .cm-army-fill.low { background: var(--cinnabar-bright); }

        /* Khối Chân Thẻ: Trang Bị & Quân Tình */
        .cm-army-foot {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 10px;
            font-size: 11px;
            color: var(--muted);
            flex-wrap: wrap;
        }
        .cm-army-tags {
            display: flex;
            align-items: center;
            gap: 5px;
            flex-wrap: wrap;
        }
        .cm-army-pill {
            padding: 2px 7px;
            border-radius: 5px;
            background: rgba(0,0,0,0.35);
            border: 1px solid var(--line);
            color: var(--ink);
            font-size: 11px;
        }
        .cm-army-pill.warn {
            color: var(--cinnabar-bright);
            border-color: rgba(181, 77, 57, 0.4);
            background: rgba(181, 77, 57, 0.1);
        }
        .cm-army-pill.good {
            color: #79d4b0;
            border-color: rgba(78, 138, 117, 0.4);
            background: rgba(78, 138, 117, 0.1);
        }

        /* Banner 3 Cột Kinh Tế Quân Sự */
        .cm-stat-triad {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
            margin-bottom: 16px;
        }
        .cm-stat-box {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 12px 16px;
            border-radius: 12px;
            background: rgba(20, 15, 11, 0.85);
            border: 1px solid var(--line-strong);
            box-shadow: inset 0 0 12px rgba(0,0,0,0.4);
        }
        .cm-stat-box p {
            margin: 0;
            font-size: 11px;
            color: var(--muted);
        }
        .cm-stat-box b {
            font-size: 17px;
            color: var(--ink-bright);
            font-family: 'Noto Serif SC', serif;
            display: block;
            margin-top: 2px;
        }
        .cm-stat-icon {
            width: 36px;
            height: 36px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            background: rgba(199, 155, 93, 0.1);
            border: 1px solid rgba(199, 155, 93, 0.2);
            color: var(--gold);
        }

        /* Giao diện Modal chung */
        .zjc-modal-mask { position:fixed; top:0; left:0; right:0; bottom:0; width:100vw; height:100vh; height:100dvh; z-index:2147483647; background:rgba(0,0,0,0.65); display:flex; align-items:center; justify-content:center; padding:16px; box-sizing:border-box; backdrop-filter:blur(3px); pointer-events:auto; }
        .cm-command-modal { position:relative; width:100%; max-width:720px; max-height:85vh; max-height:85dvh; background:var(--paper); border:1px solid var(--gold); border-radius:12px; display:flex; flex-direction:column; box-shadow:0 16px 50px rgba(0,0,0,0.9); overflow:hidden; }
        .cm-command-modal header { display:flex; justify-content:space-between; align-items:center; padding:14px 20px; border-bottom:1px solid var(--line-strong); background:rgba(0,0,0,0.4); flex-shrink:0; }
        .cm-command-modal header p { margin:0; color:var(--gold); font-size:11px; font-weight:bold; letter-spacing:1px; }
        .cm-command-modal header h2 { margin:4px 0 0; color:var(--ink-bright); font-size:20px; font-family:'Noto Serif SC', serif; }
        .cm-command-modal header button { background:transparent; border:none; color:var(--muted); font-size:24px; cursor:pointer; line-height:1; padding:0; display:flex; align-items:center; justify-content:center; width:32px; height:32px; border-radius:8px; transition:0.2s; }
        .cm-command-modal header button:hover { color:var(--cinnabar-bright); background:rgba(255,255,255,0.05); }
        .cm-command-modal .cm-modal-body { padding:20px; overflow-y:auto; flex:1 1 auto; min-height:0; -webkit-overflow-scrolling:touch; scrollbar-width:thin; scrollbar-color:rgba(199, 155, 93, 0.4) transparent; }
        .cm-command-modal .cm-modal-body::-webkit-scrollbar { width:6px; }
        .cm-command-modal .cm-modal-body::-webkit-scrollbar-thumb { border-radius:8px; background:rgba(199, 155, 93, 0.3); }
        
        .cm-command-banner { display:grid; grid-template-columns:repeat(4,1fr); gap:1px; margin-bottom:15px; border:1px solid var(--line); border-radius:12px; background:var(--line); overflow:hidden; }
        .cm-command-banner span { padding:10px; background:rgba(20,15,10,0.9); text-align:center; }
        .cm-command-banner small { display:block; color:var(--muted); font-size:9px; }
        .cm-command-banner b { font-size:14px; color:var(--ink-bright); }
        
        .cm-command-blocked { padding:12px; border:1px solid var(--cinnabar-bright); border-radius:8px; color:var(--cinnabar-bright); background:rgba(181, 77, 57, 0.1); margin-bottom:15px; font-size:13px; }
        
        .cm-command-general { display:flex; align-items:center; gap:10px; margin-bottom:15px; padding:10px 12px; border-left:3px solid var(--gold); background:rgba(199, 155, 93, 0.1); }
        .cm-command-general label { color:var(--muted); font-size:12px; }
        .cm-command-general select, .cm-refit-line select { border:1px solid var(--line); border-radius:6px; background:rgba(0,0,0,0.5); color:var(--ink-bright); padding:6px 10px; outline:none; }
        
        .cm-command-section { margin-top:16px; }
        .cm-command-section > h3 { margin:0 0 10px; font-size:15px; color:var(--gold); border-bottom:1px solid var(--line); padding-bottom:5px; font-family:'Noto Serif SC', serif;}
        .cm-command-options { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:10px; }
        
        .cm-command-choice { display:flex; align-items:center; justify-content:space-between; gap:12px; padding:12px; border:1px solid var(--line); border-radius:10px; background:rgba(255,255,255,0.03); color:var(--ink); text-align:left; cursor:pointer; transition:all 0.2s; }
        .cm-command-choice:hover { border-color:var(--gold); background:rgba(199, 155, 93, 0.1); transform:translateY(-2px); }
        .cm-command-choice span { min-width:0; }
        .cm-command-choice b { display:block; color:var(--ink-bright); font-size:14px; }
        .cm-command-choice small { display:block; margin-top:4px; color:var(--muted); font-size:11px; line-height:1.4; }
        .cm-command-choice em { color:var(--gold); font-size:11px; font-style:normal; white-space:nowrap; }
        .cm-command-choice:disabled { opacity:0.5; cursor:not-allowed; border-color:var(--line); transform:none; background:rgba(0,0,0,0.2); }
        
        .cm-refit-line { display:grid; grid-template-columns:1fr 1fr auto; gap:10px; }
        .cm-refit-line button { border:1px solid var(--gold); border-radius:6px; background:var(--gold); color:#111; padding:6px 14px; cursor:pointer; font-weight:bold; }
        .cm-refit-line button:hover { filter:brightness(1.1); }

        .cm-confirm-modal { position:relative; width:100%; max-width:400px; max-height:85vh; max-height:85dvh; background:var(--paper); border:1px solid var(--gold); border-radius:12px; padding:24px; box-shadow:0 16px 50px rgba(0,0,0,0.9); text-align:center; display:flex; flex-direction:column; }
        .cm-confirm-modal-body { overflow-y:auto; flex:1 1 auto; min-height:0; scrollbar-width:thin; scrollbar-color:rgba(199, 155, 93, 0.4) transparent; margin-bottom: 20px;}
        .cm-confirm-modal-body::-webkit-scrollbar { width:6px; }
        .cm-confirm-modal-body::-webkit-scrollbar-thumb { border-radius:8px; background:rgba(199, 155, 93, 0.3); }
        .cm-confirm-modal h2 { margin:0 0 16px; color:var(--ink-bright); font-family:'Noto Serif SC', serif;}
        .cm-confirm-modal p { margin:0; color:var(--muted); font-size:14px; line-height:1.6; white-space:pre-line; }
        .cm-confirm-modal .btns { display:flex; justify-content:center; gap:16px; flex-shrink:0; }
        .cm-confirm-modal button { padding:10px 28px; border-radius:6px; cursor:pointer; font-weight:bold; font-size:14px; transition:0.2s;}
        .cm-confirm-modal .btn-cancel { border:1px solid var(--line); background:rgba(0,0,0,0.3); color:var(--muted); }
        .cm-confirm-modal .btn-cancel:hover { color:var(--ink-bright); border-color:var(--gold); }
        .cm-confirm-modal .btn-confirm { border:1px solid var(--gold); background:var(--gold); color:#111; }
        .cm-confirm-modal .btn-confirm:hover { filter:brightness(1.1); }

        .cm-tag { display:inline-block; padding:2px 6px; border:1px solid var(--line); border-radius:4px; font-size:11px; color:var(--gold); background:rgba(0,0,0,0.3); }
        .cm-meta { display:flex; justify-content:space-between; font-size:12px; border-bottom:1px dashed var(--line); padding-bottom:4px; margin-bottom:4px; }
        .cm-meta span { color:var(--muted); }
        .cm-meta b { color:var(--ink-bright); font-weight:normal; text-align: right; max-width: 60%; }

        .cm-modal-power { width:min(760px,96%); }
        .cm-info-grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:6px 16px; margin:10px 0 16px; }
        .cm-list { display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:12px; margin-bottom:16px; }
        .cm-item { border:1px solid var(--line); border-radius:12px; background:rgba(0,0,0,0.2); padding:12px; transition:transform 0.2s; }
        .cm-item:hover { border-color:var(--gold); transform:translateY(-2px); }
        .cm-item-title { display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; border-bottom:1px solid var(--line-strong); padding-bottom:6px; }
        .cm-item-title b { color:var(--gold); font-size:15px; font-family:'Noto Serif SC', serif;}

        .cm-fold { border:1px solid var(--line); border-radius:12px; background:rgba(20,15,10,0.6); margin:0 0 12px; overflow:hidden; }
        .cm-fold summary { list-style:none; cursor:pointer; padding:12px 16px; color:var(--gold); font-size:14px; font-weight:700; display:flex; align-items:center; justify-content:space-between; outline:none; font-family:'Noto Serif SC', serif;}
        .cm-fold summary::-webkit-details-marker { display:none; }
        .cm-fold summary:after { content:'▼'; font-size:12px; color:var(--muted); transition: transform 0.2s ease; }
        .cm-fold[open] summary { border-bottom:1px solid var(--line); background:rgba(255,255,255,0.02); }
        .cm-fold[open] summary:after { transform: rotate(180deg); }
        .cm-fold-body { padding:12px; }
        .cm-order-stack { display:grid; gap:8px; }
        .cm-order-slip { position:relative; display:grid; grid-template-columns:42px minmax(0,1fr) auto; gap:11px; align-items:center; padding:12px; border:1px solid var(--line); border-radius:12px; background:linear-gradient(105deg, rgba(25,20,15,0.9), rgba(10,8,6,0.9)); box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
        .cm-order-seal { display:grid; width:38px; height:38px; place-items:center; border:2px solid var(--gold); color:var(--gold); font-weight:900; transform:rotate(-5deg); font-size:16px; font-family:'Noto Serif SC', serif;}
        .cm-order-copy { min-width:0; }
        .cm-order-copy > p, .cm-order-copy > small { margin:4px 0 0 0; color:var(--muted); font-size:11px; }
        .cm-order-progress { position:relative; height:15px; overflow:hidden; margin-top:7px; border-radius:3px; background:rgba(0,0,0,0.5); }
        .cm-order-progress i { display:block; height:100%; background:linear-gradient(90deg, var(--jade), var(--gold)); }
        .cm-order-progress span { position:absolute; inset:0; display:grid; place-items:center; color:#fff; font-size:9px; text-shadow: 0 0 2px #000; }
        .cm-order-cancel { border:1px solid var(--line); border-radius:8px; background:transparent; color:var(--muted); padding:6px 9px; cursor:pointer; transition: 0.2s; }
        .cm-order-cancel:hover { border-color: var(--cinnabar-bright); color: var(--cinnabar-bright); }
        .cm-command-log { display:grid; border: 1px solid var(--line); border-radius: 12px; background: rgba(0,0,0,0.2); padding: 10px; max-height:240px; overflow-y:auto; }
        .cm-command-log article { display:grid; grid-template-columns:90px minmax(0,1fr) auto; gap:10px; padding:9px 4px; border-bottom:1px dashed var(--line); align-items: center;}
        .cm-command-log article:last-child { border-bottom: 0; }
        .cm-command-log time, .cm-command-log span { color:var(--muted); font-size:10px; }
        .cm-command-log b { font-size:13px; color:var(--ink-bright); display:block; margin-bottom:4px; }
        .cm-command-log p { margin:0; color:var(--muted); font-size:12px; line-height: 1.4; }
        
        .zjc-avatar { width:44px; height:44px; border-radius:50%; object-fit:cover; border:2px solid var(--gold); margin-bottom: 6px; box-shadow:0 4px 10px rgba(0,0,0,0.5); display:block; }

        @media(max-width:760px){
            .cm-stat-triad { grid-template-columns: 1fr; }
            .cm-army-bars { grid-template-columns: 1fr 1fr; }
            .cm-army-head { flex-direction: column; align-items: flex-start; }
            .cm-command-log article { grid-template-columns: 72px minmax(0,1fr); }
            .cm-command-log span { grid-column: 2; text-align: left !important; margin-top:4px;}
            .cm-order-slip { grid-template-columns: 36px minmax(0,1fr); }
            .cm-order-cancel { grid-column: 2; justify-self: end; }
            .zjc-modal-mask { padding: 12px; }
            .cm-command-modal { width: 90vw; max-height: 84vh; max-height: 84dvh; }
            .cm-modal-power { width: 90vw !important; }
            .cm-confirm-modal { width: 85vw; max-height: 84vh; max-height: 84dvh; padding: 18px; }
            .cm-command-modal header { padding: 12px 14px; }
            .cm-command-modal .cm-modal-body { padding: 14px; }
            .cwe-panel { width: 96vw; height: 90vh; height: 90dvh; margin-top: auto; margin-bottom: auto; } 
            .cwe-shell { flex-direction: column; overflow: hidden; } 
            .cwe-map-sidebar { flex: none; width: 100%; max-width: 100%; border-right: none; border-bottom: 1px solid var(--line-strong); height: auto; padding: 0; }
            .cwe-map-header { display: flex; }
            .cwe-map-sidebar .zjc-map-tabs { display: none; border-radius: 0; margin-bottom: 0; }
            .cwe-map-sidebar.expanded .zjc-map-tabs { display: flex; }
            .zjc-canvas-container.active, .zjc-org-container.active { display: none; }
            .cwe-map-sidebar.expanded .zjc-canvas-container.active { display: block; width: auto; height: auto; max-width: calc(100% - 24px); max-height: 40vh; aspect-ratio: 800/1100; margin: 12px auto; }
            .cwe-map-sidebar.expanded .zjc-org-container.active { display: block !important; width: calc(100% - 24px) !important; height: 40vh !important; max-height: 350px !important; margin: 12px auto !important; }
            .cwe-archive-grid { grid-template-columns: 1fr; }
            .cm-command-options { grid-template-columns: 1fr; }
            .cm-refit-line { grid-template-columns: 1fr; }
            .cm-command-general { flex-direction: column; align-items: stretch; }
        }

        /* Chân dung hệ thống */
        .cm-portrait-overlay { position:absolute; inset:0; z-index:2147483647; background:rgba(18,12,8,0.94); display:flex; flex-direction:column; align-items:center; justify-content:center; cursor:pointer; animation:panelFadeIn 0.35s ease; user-select:none; touch-action:manipulation; pointer-events:auto;}
        .cm-portrait-frame { display:flex; flex-direction:column; align-items:center; max-width:95%; max-height:92vh; }
        .cm-portrait-stage { display:flex; align-items:center; gap:8px; }
        .cm-portrait-view { display:flex; flex-direction:column; align-items:center; }
        .cm-portrait-view img { max-width:100%; max-height:76vh; object-fit:contain; border:3px solid rgba(180,130,100,0.35); border-radius:2px; box-shadow:0 0 60px rgba(0,0,0,0.6); background:var(--paper-deep); padding:4px; }
        .cm-portrait-caption { display:flex; flex-direction:column; align-items:center; margin-top:6px; }
        .cm-portrait-name { color:#e8d8c0; font-size:18px; font-weight:700; letter-spacing:0.12em; text-shadow:0 0 12px rgba(0,0,0,0.5); }
        .cm-portrait-cat { font-size:13px; color:rgba(200,180,155,0.65); margin-top:2px; letter-spacing:0.12em; }
        .cm-portrait-arrow { background:none; border:1px solid rgba(180,150,120,0.25); color:rgba(210,190,160,0.55); font-size:24px; width:38px; height:38px; border-radius:50%; cursor:pointer; flex-shrink:0; display:flex; align-items:center; justify-content:center; transition:all 0.25s; }
        .cm-portrait-arrow:hover { background:rgba(180,70,45,0.35); color:#e8d8c0; border-color:rgba(200,120,80,0.5); }
        .cm-portrait-dots { display:flex; gap:10px; margin-top:10px; }
        .cm-portrait-dot { width:6px; height:6px; border-radius:50%; background:rgba(180,150,120,0.3); transition:all 0.25s; }
        .cm-portrait-dot.active { background:rgba(210,170,120,0.8); box-shadow:0 0 8px rgba(200,150,100,0.5); }
        .cm-portrait-hint { position:absolute; bottom:14px; left:0; right:0; text-align:center; color:rgba(180,160,140,0.4); font-size:12px; letter-spacing:2px; }

        /* Chế độ ban ngày */
        .zjc-light-theme {
            --paper: #ece5d8; --paper-raised: #f3efe5; --paper-deep: #e0d7c6;
            --ink: #544436; --ink-bright: #33251c; --muted: #8c7761; --faint: #b3a390;
            --line: rgba(120, 85, 55, 0.2); --line-strong: rgba(120, 85, 55, 0.35);
            --cinnabar: #aa4034; --cinnabar-bright: #c44e40; --gold: #a67c40; --jade: #457864;
            --shadow: rgba(80, 50, 20, 0.12);
        }
        .zjc-light-theme.cwe-panel, .zjc-light-theme .cwe-panel { background-color: var(--paper); background-image: radial-gradient(rgba(120, 85, 55, 0.06) 1px, transparent 1px); }
        .zjc-light-theme .cwe-header { background: rgba(236, 229, 216, 0.95); box-shadow: 0 6px 20px rgba(80, 50, 20, 0.08); }
        .zjc-light-theme .cwe-brand-mark { background: rgba(243, 239, 229, 0.9); }
        .zjc-light-theme .cwe-header-actions button, .zjc-light-theme .cwe-command-actions button:not(.primary):not(.danger):not(.lore) { background: rgba(243, 239, 229, 0.9); }
        .zjc-light-theme .cwe-command-bar { background: rgba(230, 222, 206, 0.88); box-shadow: 0 4px 15px rgba(80, 50, 20, 0.06); }
        .zjc-light-theme .cwe-map-sidebar { background: var(--paper-deep); }
        .zjc-light-theme .cwe-map-header { background: rgba(255, 255, 255, 0.4); color: var(--ink-bright); border-bottom: 1px solid var(--line); }
        .zjc-light-theme .zjc-map-tabs { background: rgba(255,255,255,0.4); }
        .zjc-light-theme .zjc-map-tabs button.active { background: rgba(255,255,255,0.6); }
        .zjc-light-theme .zjc-canvas-container, .zjc-light-theme .zjc-org-container { background: var(--paper-raised); box-shadow: inset 0 0 20px rgba(120, 85, 55, 0.08); }
        .zjc-light-theme .zjc-org-item { background: rgba(255,255,255,0.5); }
        .zjc-light-theme .zjc-btn-reset { background: rgba(236, 229, 216, 0.85); border-color: rgba(166, 124, 64, 0.5); color: var(--ink-bright); box-shadow: 0 2px 6px rgba(80,50,20,0.1); }
        .zjc-light-theme .zjc-btn-reset:hover { background: rgba(220, 210, 190, 0.95); }
        .zjc-light-theme .cwe-event-row, .zjc-light-theme .cm-command-choice, .zjc-light-theme .cm-item, .zjc-light-theme .cm-army-card { background: rgba(255,255,255,0.5); }
        .zjc-light-theme .cm-stat-box { background: rgba(255,255,255,0.6); }
        .zjc-light-theme .cm-army-bars { background: rgba(0,0,0,0.05); border-color: rgba(120, 85, 55, 0.15); }
        .zjc-light-theme .cm-army-seal { background: rgba(243, 239, 229, 0.9); }
        .zjc-light-theme .cm-army-track { background: rgba(0,0,0,0.15); }
        .zjc-light-theme .cwe-ledger-column { background: rgba(255,255,255,0.3); }
        .zjc-light-theme .cm-fold { background: rgba(255,255,255,0.5); }
        .zjc-light-theme .cm-fold[open] summary { background: rgba(0,0,0,0.03); }
        .zjc-light-theme .cm-command-modal header { background: rgba(225, 215, 198, 0.9); }
        .zjc-light-theme .cm-command-general select, .zjc-light-theme .cm-refit-line select, .zjc-light-theme .zjc-sort, .zjc-light-theme .zjc-search { background: rgba(255,255,255,0.6) !important; }
        .zjc-light-theme .cm-command-banner span, .zjc-light-theme .cm-tag { background: rgba(255,255,255,0.5); }
        .zjc-light-theme #zjc-tooltip { background: rgba(243, 239, 229, 0.95); }
        .zjc-light-theme .cm-confirm-modal { background: var(--paper); }
        .zjc-light-theme .cm-order-slip { background: linear-gradient(105deg, rgba(240, 233, 220, 0.9), rgba(248, 243, 233, 0.9)); }
        #zjc-map-lamp.zjc-light-theme { background: rgba(236, 229, 216, 0.95); box-shadow: 0 8px 20px rgba(80, 50, 20, 0.15), inset 0 0 0 4px rgba(166, 124, 64, 0.1); color: var(--gold); }
        .zjc-light-theme .cm-portrait-overlay { background: rgba(236, 229, 216, 0.94); }
        .zjc-light-theme .cm-portrait-name { color: var(--ink-bright); text-shadow: 0 0 12px rgba(255,255,255,0.6); }
        .zjc-light-theme .cm-portrait-cat { color: var(--muted); }
        .zjc-light-theme .cm-portrait-hint { color: var(--faint); }
        .zjc-light-theme .cm-portrait-view img { background: var(--paper-raised); border-color: rgba(120, 85, 55, 0.3); box-shadow: 0 0 40px rgba(80,50,20,0.15); }
        .zjc-light-theme .cm-portrait-arrow { color: var(--muted); border-color: rgba(120, 85, 55, 0.25); }
        .zjc-light-theme .cm-portrait-arrow:hover { background: rgba(170, 64, 52, 0.1); color: var(--cinnabar-bright); border-color: var(--cinnabar); }
        .zjc-light-theme .cwe-command-bar nav button.active { color: #fff !important; background: var(--cinnabar) !important; }
        .zjc-light-theme span[style*="background:var(--cinnabar); color:#fff;"] { color: #fff !important; background: var(--cinnabar) !important; }
        .zjc-light-theme .cm-order-progress span { color: #fff !important; text-shadow: 0 0 2px rgba(0,0,0,0.8); }
    `;

    const styleEl = doc.createElement('style'); styleEl.id = STYLE_ID; styleEl.textContent = CSS; doc.head.appendChild(styleEl);

    // ==========================================
    // 4. Khung cấu trúc DOM
    // ==========================================
    const lamp = doc.createElement('div'); lamp.id = LAMP_ID; lamp.innerHTML = '🏯'; doc.body.appendChild(lamp);

    const modal = doc.createElement('div'); modal.id = MODAL_ID;
    modal.innerHTML = `
        <div class="cwe-panel">
            <header class="cwe-header">
                <div class="cwe-brand"><div class="cwe-brand-mark">🀢</div><div><h1>Đại Minh Hoàng Cực Đồ Chí</h1><p>Sùng Trinh triều · Tử Cấm Thành Thực Lục</p></div></div>
                <div class="cwe-header-actions">
                    <button id="zjc-btn-theme">🌙 Đêm tối</button>
                    <button id="zjc-btn-close">Đóng</button>
                </div>
            </header>
            
            <div class="cwe-shell">
                <div class="cwe-map-sidebar" id="zjc-map-sidebar">
                    <div class="cwe-map-header" id="zjc-map-toggle">
                        <span>📍 Tử Cấm Thành & Đại Minh Quan chế</span>
                        <span id="zjc-map-toggle-icon">▼ Nhấn để mở</span>
                    </div>
                    <div class="zjc-map-tabs">
                        <button class="active" data-view="map">Bản đồ Tử Cấm Thành</button>
                        <button data-view="org">Kiến trúc Quyền lực</button>
                    </div>
                    <div class="zjc-canvas-container active" id="zjc-canvas-container">
                        <button class="zjc-btn-reset" id="zjc-btn-reset">↺ Quy vị</button>
                        <canvas id="zjc-map-canvas"></canvas>
                        <div id="zjc-tooltip"><h4 id="zjc-tt-title">Tên điện</h4><p id="zjc-tt-desc">Mô tả</p></div>
                    </div>
                    <div class="zjc-org-container" id="zjc-org-container"></div>
                </div>
                <div class="cwe-main-content">
                    <div class="cwe-command-bar">
                        <nav class="zjc-nav">
                            <button data-tab="overview" class="active">Tổng lãm</button>
                            <button data-tab="government">Triều chính</button>
                            <button data-tab="assets">Tài sản</button>
                            <button data-tab="tech">Khoa kỹ</button>
                            <button data-tab="factions">Thế lực</button>
                            <button data-tab="military">Quân sự</button>
                            <button data-tab="officials">Quan viên</button>
                            <button data-tab="enemies">Cừu địch</button>
                            <button data-tab="harem">Hậu cung</button>
                            <button data-tab="royal">Tông thất</button>
                        </nav>
                    </div>
                    <div class="cwe-content">
                        <div class="zjc-panel active" id="panel-overview"></div>
                        <div class="zjc-panel" id="panel-government"></div>
                        <div class="zjc-panel" id="panel-assets"></div>
                        <div class="zjc-panel" id="panel-tech"></div>
                        <div class="zjc-panel" id="panel-factions"></div>
                        <div class="zjc-panel" id="panel-military"></div>
                        <div class="zjc-panel" id="panel-officials"></div>
                        <div class="zjc-panel" id="panel-enemies"></div>
                        <div class="zjc-panel" id="panel-harem"></div>
                        <div class="zjc-panel" id="panel-royal"></div>
                    </div>
                </div>
            </div>
        </div>
        <div id="zjc-modal-container"></div>
    `;
    doc.body.appendChild(modal);

    const scrollableSelectors = ['.zjc-org-container', '.cwe-content', '.cm-modal-body', '.cm-confirm-modal-body', '.cm-command-log'];
    ['touchstart', 'touchmove', 'touchend', 'wheel'].forEach(evt => {
        modal.addEventListener(evt, (e) => {
            if (e.target.closest(scrollableSelectors.join(', '))) {
                e.stopPropagation();
            }
        }, { passive: true });
    });

    // ==========================================
    // 5. Hệ thống nghiệp vụ & UI Render (MVU Data)
    // ==========================================
    function showToast(text) {
        const existing = doc.querySelector('.zjc-toast'); if (existing) existing.remove();
        const toast = doc.createElement('div'); toast.className = 'zjc-toast'; toast.textContent = text;
        doc.body.appendChild(toast); setTimeout(() => toast.remove(), 3500);
    }

    const HISTORY_KEY = 'zjc-voice-history';
    let voiceChangeSet = new Set();
    let lastNetworkStr = '';

    function extractVoices(data) {
        const voices = {};
        const categories = ['Hạ thuộc và mạc liêu', 'Cừu địch', 'Tư duy', 'Thân thuộc'];
        for (const cat of categories) {
            const list = get(data, `Mạng lưới quan hệ.${cat}`, {});
            for (const [name, info] of Object.entries(list)) {
                if (info && info['Tiếng lòng nhân vật']) {
                    voices[name] = info['Tiếng lòng nhân vật'];
                }
            }
        }
        return voices;
    }

    function initVoiceChanges(data) {
        const networkData = get(data, 'Mạng lưới quan hệ', {});
        const currentNetworkStr = JSON.stringify(networkData);
        if (currentNetworkStr === lastNetworkStr) return;

        try {
            const stored = win.localStorage.getItem(HISTORY_KEY);
            let history = stored ? JSON.parse(stored) : [];
            if (!Array.isArray(history)) history = [];

            const currentVoices = extractVoices(data);
            const currentStr = JSON.stringify(currentVoices);

            let matchIndex = -1;
            for (let i = history.length - 1; i >= 0; i--) {
                if (JSON.stringify(history[i]) === currentStr) {
                    matchIndex = i;
                    break;
                }
            }

            let baseVoices = {};
            if (matchIndex !== -1) {
                history = history.slice(0, matchIndex + 1);
                baseVoices = matchIndex > 0 ? history[matchIndex - 1] : {};
            } else {
                baseVoices = history.length > 0 ? history[history.length - 1] : {};
                history.push(currentVoices);
                if (history.length > 30) history.shift();
            }

            voiceChangeSet.clear();
            for (const [name, voice] of Object.entries(currentVoices)) {
                if (Object.hasOwn(baseVoices, name) && baseVoices[name] !== voice) {
                    voiceChangeSet.add(name);
                }
            }

            win.localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
            lastNetworkStr = currentNetworkStr;
        } catch (e) { }
    }

    // --- Cừu địch ---
    function renderEnemies() {
        const panel = doc.getElementById('panel-enemies');
        if (!panel) return;
        if (!panel.querySelector('.cwe-toolbar')) {
            panel.innerHTML = `
                <div class="cwe-section-head"><div><h2>Ân oán cừu thù</h2></div><div class="zjc-count" style="color:var(--faint); font-size:12px;"></div></div>
                <div class="cwe-toolbar" style="display:flex; gap:10px; margin-bottom:15px;">
                    <input type="text" class="zjc-search" data-type="enemies" placeholder="Tìm kiếm tên/thân phận..." style="flex:1; padding:6px 10px; border:1px solid var(--line); border-radius:6px; background:rgba(0,0,0,0.3); color:var(--ink-bright); outline:none;" />
                    <select class="zjc-sort" data-type="enemies" style="padding:6px 10px; border:1px solid var(--line); border-radius:6px; background:rgba(0,0,0,0.3); color:var(--ink-bright); outline:none;"><option value="default">Sắp xếp mặc định</option><option value="voice">Tiếng lòng ưu tiên</option></select>
                </div>
                <div class="cwe-list-container" id="list-enemies"></div>
            `;
        }

        const data = getMvuData() || {};
        initVoiceChanges(data);
        const enemies = get(data, 'Mạng lưới quan hệ.Cừu địch', {});
        const generals = get(data, 'Quân sự.Tướng lĩnh', {});
        const searchInput = panel.querySelector('.zjc-search').value.toLowerCase();
        const sortMode = panel.querySelector('.zjc-sort').value;

        let arr = Object.entries(enemies).map(([name, info]) => ({ name, info }));
        if (searchInput) {
            arr = arr.filter(item => item.name.toLowerCase().includes(searchInput) || (item.info['Thân phận'] || '').toLowerCase().includes(searchInput));
        }

        if (sortMode === 'voice') {
            arr.sort((a, b) => {
                const aChange = voiceChangeSet.has(a.name) ? 1 : 0;
                const bChange = voiceChangeSet.has(b.name) ? 1 : 0;
                if (aChange !== bChange) return bChange - aChange;
                return (b.info['Cừu hận độ'] ?? 0) - (a.info['Cừu hận độ'] ?? 0);
            });
        }

        panel.querySelector('.zjc-count').innerText = `Tại danh sách ${Object.keys(enemies).length} người | Tìm được ${arr.length} người`;

        let output = '';
        if (arr.length === 0) {
            output += `<p class="cm-empty">Tạm không có ghi chép.</p>`;
        } else {
            for (const { name, info } of arr) {
                if (!info || typeof info !== 'object') continue;
                const hasChanged = (sortMode === 'voice') && voiceChangeSet.has(name);
                const voiceStyle = hasChanged ? 'color:var(--cinnabar-bright); font-weight:bold;' : 'color:var(--cinnabar-bright); font-style:italic;';
                const changeTag = hasChanged ? `<span style="font-size:10px; background:var(--cinnabar); color:#fff; padding:1px 4px; border-radius:3px; margin-left:6px;">Tiếng lòng thay đổi</span>` : '';
                const presenceTag = `<span style="font-size:10px; border:1px solid ${info['Có mặt hay không'] ? 'var(--jade)' : 'var(--line)'}; color:${info['Có mặt hay không'] ? 'var(--jade)' : 'var(--muted)'}; border-radius:3px; padding:1px 4px; display:inline-block; margin-left: 8px;">${info['Có mặt hay không'] ? 'Có mặt' : 'Không có mặt'}</span>`;
                
                const g = generals[name];
                const statsHtml = g ? `<div style="margin: 4px 0; font-size: 11px; color: var(--cinnabar-bright); border: 1px dashed rgba(181, 77, 57, 0.4); padding: 3px 6px; border-radius: 4px; display: inline-block; background: rgba(0,0,0,0.2);">Thống suất ${g['Thống suất'] ?? 0} | Võ lực ${g['Võ lực'] ?? 0} | Trí mưu ${g['Trí mưu'] ?? 0} | Chính trị ${g['Chính trị'] ?? 0} | Uy vọng ${g['Uy vọng'] ?? 0}</div>` : '';

                let avatarStr = avatarImage(name);
                if (avatarStr) avatarStr = avatarStr.replace('class="zjc-avatar"', 'class="zjc-avatar" style="margin: 0 10px 0 0;"');

                output += `
                <div class="cwe-event-row" style="border-left: 3px solid var(--cinnabar-bright); display: flex; flex-direction: column; align-items: flex-start; gap: 8px; padding: 12px 16px;">
                    <div style="display: flex; justify-content: space-between; width: 100%; align-items: center;">
                        <div class="cwe-event-when" style="padding-left: 14px; position: relative; display: flex; align-items: center;">
                            <i style="background: var(--cinnabar-bright); box-shadow: 0 0 0 1px var(--cinnabar-bright); position: absolute; left: 0; top: 50%; transform: translateY(-50%); margin: 0;"></i>
                            ${avatarStr}
                            <strong style="font-size: 15px; color:var(--cinnabar-bright); display: inline-block; margin: 0 8px 0 0;">${html(name)}</strong>
                            <span class="cm-tag" style="color: var(--muted); margin: 0;">${html(info['Thân phận'] || 'Chưa rõ')}</span>
                            ${presenceTag}
                        </div>
                        <div class="cwe-command-actions">
                            ${portraitButton(name)}
                            ${loreButton(name)}
                            <button class="danger" data-action="delete-item" data-path="Mạng lưới quan hệ.Cừu địch" data-key="${html(name)}">Lãng quên</button>
                        </div>
                    </div>
                    <div class="cwe-event-story" style="width: 100%; padding-top: 6px; border-top: 1px dashed var(--line-strong);">
                        <h4 style="font-size: 14px; margin: 0 0 6px 0; color: var(--ink-bright);">Cừu hận độ: <span style="color:var(--cinnabar-bright);">${info['Cừu hận độ'] ?? 0}</span></h4>
                        ${statsHtml}
                        <p style="${voiceStyle} margin: 0; line-height: 1.6; font-size: 13px;">"${html(info['Tiếng lòng nhân vật'] || '...')}" ${changeTag}</p>
                    </div>
                </div>`;
            }
        }
        doc.getElementById('list-enemies').innerHTML = output;
    }

    // --- Thế lực ---
    function renderFactions() {
        const panel = doc.getElementById('panel-factions');
        if (!panel) return;
        if (!panel.querySelector('.cwe-toolbar')) {
            panel.innerHTML = `
                <div class="cwe-section-head"><div><h2>Thiên hạ thế lực</h2></div><div class="zjc-count" style="color:var(--faint); font-size:12px;"></div></div>
                <div class="cwe-toolbar" style="display:flex; gap:10px; margin-bottom:15px;">
                    <input type="text" class="zjc-search" data-type="factions" placeholder="Tìm kiếm tên/trạng thái/binh chủng..." style="flex:1; padding:6px 10px; border:1px solid var(--line); border-radius:6px; background:rgba(0,0,0,0.3); color:var(--ink-bright); outline:none;" />
                </div>
                <div class="cwe-list-container" id="list-factions"></div>
            `;
        }

        const data = getMvuData() || {};
        const powers = get(data, 'Thời cục và nhiệm vụ.Quan hệ thế lực', {});
        const searchInput = panel.querySelector('.zjc-search').value.toLowerCase();

        let arr = Object.entries(powers).map(([name, power]) => ({ name, power }));
        if (searchInput) {
            arr = arr.filter(item => {
                const p = item.power;
                return item.name.toLowerCase().includes(searchInput) ||
                    (p['Trạng thái'] || '').toLowerCase().includes(searchInput) ||
                    (get(p, 'Quân sự.Binh chủng chủ lực', '') || '').toLowerCase().includes(searchInput);
            });
        }

        panel.querySelector('.zjc-count').innerText = `Ghi nhận ${Object.keys(powers).length} phương | Tìm được ${arr.length} phương`;

        let output = '';
        if (arr.length === 0) {
            output += `<p class="cm-empty">Tạm không có hồ sơ thế lực.</p>`;
        } else {
            for (const { name, power } of arr) {
                if (!power || typeof power !== 'object') continue;
                const fav = number(power['Hảo cảm độ'], 0);
                const troops = number(get(power, 'Quân sự.Tổng binh lực', 0), 0);
                const type = get(power, 'Quân sự.Binh chủng chủ lực', '');
                const tone = fav < 0 ? 'var(--cinnabar-bright)' : (fav > 30 ? 'var(--jade)' : 'var(--gold)');

                output += `
                <div class="cwe-event-row" data-power-name="${html(name)}" style="cursor: pointer; border-left: 3px solid ${tone}; display: flex; flex-direction: column; align-items: flex-start; gap: 8px; padding: 12px 16px;">
                    <div style="display: flex; justify-content: space-between; width: 100%; align-items: center;">
                        <div class="cwe-event-when" style="padding-left: 14px; position: relative; display: flex; align-items: center;">
                            <i style="background: ${tone}; box-shadow: 0 0 0 1px ${tone}; position: absolute; left: 0; top: 50%; transform: translateY(-50%); margin: 0;"></i>
                            <strong style="font-size: 15px; color: var(--gold); display: inline-block; margin: 0 8px 0 0;">${html(name)}</strong>
                            <span class="cm-tag" style="border-color: ${tone}; color: ${tone}; margin: 0;">${html(power['Trạng thái'] || 'Chưa tiếp xúc')}</span>
                        </div>
                    </div>
                    <div class="cwe-event-story" style="width: 100%; padding-top: 6px; border-top: 1px dashed var(--line-strong);">
                        <h4 style="font-size: 14px; margin: 0 0 6px 0; color: var(--ink-bright);">Hảo cảm: <span style="color:${tone};">${fav > 0 ? '+' : ''}${fav}</span> | Binh lực: ${troops > 0 ? troops.toLocaleString() : 'Chưa rõ'}</h4>
                        <p style="margin: 0; color: var(--muted); line-height: 1.6; font-size: 13px;">Binh chủng chủ lực: ${html(type || 'Quân tình chưa rõ')}</p>
                    </div>
                </div>`;
            }
        }
        doc.getElementById('list-factions').innerHTML = output;
    }

    // --- Quan viên ---
    function renderOfficials() {
        const panel = doc.getElementById('panel-officials');
        if (!panel.querySelector('.cwe-toolbar')) {
            panel.innerHTML = `
                <div class="cwe-section-head"><div><h2>Quan viên quyển tông</h2></div><div class="zjc-count" style="color:var(--faint); font-size:12px;"></div></div>
                <div class="cwe-toolbar" style="display:flex; gap:10px; margin-bottom:15px;">
                    <input type="text" class="zjc-search" data-type="officials" placeholder="Tìm kiếm tên/thân phận..." style="flex:1; padding:6px 10px; border:1px solid var(--line); border-radius:6px; background:rgba(0,0,0,0.3); color:var(--ink-bright); outline:none;" />
                    <select class="zjc-sort" data-type="officials" style="padding:6px 10px; border:1px solid var(--line); border-radius:6px; background:rgba(0,0,0,0.3); color:var(--ink-bright); outline:none;"><option value="default">Sắp xếp mặc định</option><option value="voice">Tiếng lòng ưu tiên</option></select>
                </div>
                <div class="cwe-list-container" id="list-officials"></div>
            `;
        }

        const data = getMvuData() || {};
        initVoiceChanges(data);
        const subordinates = data['Mạng lưới quan hệ']?.['Hạ thuộc và mạc liêu'] || {};
        const generals = data['Quân sự']?.['Tướng lĩnh'] || {};
        const searchInput = panel.querySelector('.zjc-search').value.toLowerCase();
        const sortMode = panel.querySelector('.zjc-sort').value;

        let arr = Object.entries(subordinates).map(([name, info]) => ({ name, info }));
        if (searchInput) {
            arr = arr.filter(item => item.name.toLowerCase().includes(searchInput) || (item.info['Thân phận'] || '').toLowerCase().includes(searchInput));
        }

        if (sortMode === 'voice') {
            arr.sort((a, b) => {
                const aChange = voiceChangeSet.has(a.name) ? 1 : 0;
                const bChange = voiceChangeSet.has(b.name) ? 1 : 0;
                if (aChange !== bChange) return bChange - aChange;
                return (b.info['Hảo cảm độ'] ?? 0) - (a.info['Hảo cảm độ'] ?? 0);
            });
        }

        panel.querySelector('.zjc-count').innerText = `Tại danh sách ${Object.keys(subordinates).length} người | Tìm được ${arr.length} người`;

        let htmlStr = '';
        for (const { name, info } of arr) {
            const hasChanged = (sortMode === 'voice') && voiceChangeSet.has(name);
            const voiceStyle = hasChanged ? 'color:var(--cinnabar-bright); font-weight:bold;' : 'color:var(--gold); font-style:italic;';
            const changeTag = hasChanged ? `<span style="font-size:10px; background:var(--cinnabar); color:#fff; padding:1px 4px; border-radius:3px; margin-left:6px; flex-shrink: 0;">Tiếng lòng thay đổi</span>` : '';
            const presenceTag = `<span style="font-size:10px; border:1px solid ${info['Có mặt hay không'] ? 'var(--jade)' : 'var(--line)'}; color:${info['Có mặt hay không'] ? 'var(--jade)' : 'var(--muted)'}; border-radius:3px; padding:1px 4px; display:inline-block;">${info['Có mặt hay không'] ? 'Có mặt' : 'Không có mặt'}</span>`;
            
            const g = generals[name];
            const statsHtml = g ? `<div style="font-size: 11px; color: var(--gold); border: 1px dashed rgba(199, 155, 93, 0.4); padding: 3px 6px; border-radius: 4px; display: inline-block; background: rgba(0,0,0,0.2); margin: 0;">Thống suất ${g['Thống suất'] ?? 0} | Võ lực ${g['Võ lực'] ?? 0} | Trí mưu ${g['Trí mưu'] ?? 0} | Chính trị ${g['Chính trị'] ?? 0} | Uy vọng ${g['Uy vọng'] ?? 0}</div>` : '';

            let avatarStr = avatarImage(name);
            if (avatarStr) avatarStr = avatarStr.replace('class="zjc-avatar"', 'class="zjc-avatar" style="margin: 0; flex-shrink: 0;"');

            htmlStr += `<div class="cwe-event-row" style="border-left: 3px solid var(--gold); display: flex; flex-direction: column; align-items: flex-start; gap: 8px; padding: 10px 14px;">
                <div style="display: flex; justify-content: space-between; width: 100%; align-items: flex-start; gap: 10px;">
                    <div style="display: flex; align-items: flex-start; gap: 8px; flex: 1; min-width: 0;">
                        <i style="background: var(--gold); box-shadow: 0 0 0 1px var(--gold); width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; margin-top: 6px;"></i>
                        ${avatarStr}
                        <strong style="font-size: 15px; color: var(--gold); margin: 0; flex-shrink: 0; white-space: nowrap; line-height: 1.3;">${html(name)}</strong>
                        <span class="cm-tag" style="color: var(--muted); margin: 0; text-align: left; white-space: normal; overflow-wrap: anywhere; word-break: break-word; line-height: 1.3; min-width: 0;">${html(info['Thân phận'] || 'Vô chức')}</span>
                        <span style="flex-shrink: 0; white-space: nowrap; line-height: 1.3; margin-top: 0;">${presenceTag}</span>
                    </div>
                    <div class="cwe-command-actions" style="flex-shrink: 0; display: flex; align-items: center; gap: 6px; white-space: nowrap; margin-top: 0;">
                        ${portraitButton(name)}
                        ${loreButton(name)}
                        <button class="danger" data-action="delete-item" data-path="Mạng lưới quan hệ.Hạ thuộc và mạc liêu" data-key="${html(name)}">Lãng quên</button>
                    </div>
                </div>
                <div class="cwe-event-story" style="width: 100%; padding-top: 8px; border-top: 1px dashed var(--line-strong);">
                    <div style="display: flex; align-items: center; flex-wrap: wrap; gap: 10px; margin-bottom: 6px;">
                        <h4 style="font-size: 14px; margin: 0; color: var(--ink-bright);">Trung tâm: <span style="color:var(--gold);">${info['Trung tâm'] ?? 0}</span> | Hảo cảm: <span style="color:var(--gold);">${info['Hảo cảm độ'] ?? 0}</span></h4>
                        ${statsHtml}
                    </div>
                    <p style="${voiceStyle} margin: 0; line-height: 1.6; font-size: 13px;">"${html(info['Tiếng lòng nhân vật'] || 'Bạn quân như bạn hổ...')}" ${changeTag}</p>
                </div>
            </div>`;
        }
        if (arr.length === 0) htmlStr += emptyLine('Tạm không có ghi chép.');
        doc.getElementById('list-officials').innerHTML = htmlStr;
    }

    // --- Thời cục và nhiệm vụ ---
    function renderGovernment() {
        const panel = doc.getElementById('panel-government');
        if (!panel.querySelector('.cwe-toolbar')) {
            panel.innerHTML = `
                <div class="cwe-section-head"><div><h2>Thời cục và Nhiệm vụ</h2></div><div class="zjc-count" style="color:var(--faint); font-size:12px;"></div></div>
                <div class="cwe-toolbar" style="display:flex; gap:10px; margin-bottom:15px;">
                    <input type="text" class="zjc-search" data-type="government" placeholder="Tìm kiếm nhiệm vụ/loại hình..." style="flex:1; padding:6px 10px; border:1px solid var(--line); border-radius:6px; background:rgba(0,0,0,0.3); color:var(--ink-bright); outline:none;" />
                </div>
                <div id="list-government" style="margin-bottom:20px;"></div>
            `;
        }
        const tasks = getMvuData()?.['Thời cục và nhiệm vụ']?.['Nhiệm vụ hiện tại'] || {};
        const searchInput = panel.querySelector('.zjc-search').value.toLowerCase();
        let arr = Object.entries(tasks).map(([key, task]) => ({ key, task }));
        if (searchInput) {
            arr = arr.filter(item => item.key.toLowerCase().includes(searchInput) || (item.task['Loại hình'] || '').toLowerCase().includes(searchInput));
        }

        panel.querySelector('.zjc-count').innerText = `Đang tiến hành ${Object.keys(tasks).length} kiện | Tìm được ${arr.length} kiện`;

        let htmlStr = '';
        for (const { key, task } of arr) {
            let borderColor = 'var(--cinnabar-bright)';
            if (task['Tiến độ'] && (task['Tiến độ'].includes('Hoàn thành') || task['Tiến độ'].includes('Giải quyết'))) borderColor = 'var(--jade)';
            
            htmlStr += `<div class="cwe-event-row" style="border-left: 3px solid ${borderColor}; display: flex; flex-direction: column; align-items: flex-start; gap: 8px; padding: 12px 16px;">
                <div style="display: flex; justify-content: space-between; width: 100%; align-items: center;">
                    <div class="cwe-event-when" style="padding-left: 14px; position: relative; display: flex; align-items: center;">
                        <i style="background:${borderColor}; box-shadow: 0 0 0 1px ${borderColor}; position: absolute; left: 0; top: 50%; transform: translateY(-50%); margin: 0;"></i>
                        <strong style="font-size: 15px; color: var(--gold); display: inline-block; margin: 0 8px 0 0;">${html(key)}</strong>
                        <span class="cm-tag" style="border-color: ${borderColor}; color: ${borderColor}; margin: 0;">${html(task['Loại hình'] || 'Đại chính')}</span>
                    </div>
                    <div class="cwe-command-actions">
                        <button class="danger" data-action="delete-item" data-path="Thời cục và nhiệm vụ.Nhiệm vụ hiện tại" data-key="${html(key)}">Xóa</button>
                    </div>
                </div>
                <div class="cwe-event-story" style="width: 100%; padding-top: 6px; border-top: 1px dashed var(--line-strong);">
                    <h4 style="font-size: 14px; margin: 0 0 6px 0; color: var(--ink-bright);">Tiến độ: <span style="color: ${borderColor};">${html(task['Tiến độ'] || 'Chưa rõ')}</span></h4>
                    <p style="margin: 0; color: var(--muted); line-height: 1.6; font-size: 13px;">${html(task['Thuyết minh'] || 'Chưa có thuyết minh')}</p>
                </div>
            </div>`;
        }
        if (arr.length === 0) htmlStr += emptyLine('Tạm không có ghi chép.');
        doc.getElementById('list-government').innerHTML = htmlStr;
    }

    // --- Tài sản và Hậu cần ---
    function renderAssets() {
        const panel = doc.getElementById('panel-assets');
        let activeView = 'industry';
        const existingTabs = panel.querySelector('#zjc-assets-tabs');
        if (existingTabs) {
            const activeBtn = existingTabs.querySelector('button.active');
            if (activeBtn) activeView = activeBtn.getAttribute('data-view');
        }

        if (!panel.querySelector('#zjc-assets-tabs')) {
            panel.innerHTML = `
                <div class="cwe-section-head">
                    <div><h2>Tài sản và Hậu cần</h2></div>
                    <div class="zjc-count" style="color:var(--faint); font-size:12px; text-align:right;"></div>
                </div>
                <div class="zjc-map-tabs" id="zjc-assets-tabs" style="display: flex !important; margin-bottom: 12px; border-radius: 8px;">
                    <button class="${activeView === 'industry' ? 'active' : ''}" data-view="industry">Sản nghiệp</button>
                    <button class="${activeView === 'grain' ? 'active' : ''}" data-view="grain">Lương thảo</button>
                </div>
                <div class="cwe-toolbar" style="display:flex; gap:10px; margin-bottom:15px;">
                    <input type="text" class="zjc-search" data-type="assets" placeholder="Tìm kiếm tên/thuyết minh..." style="flex:1; padding:6px 10px; border:1px solid var(--line); border-radius:6px; background:rgba(0,0,0,0.3); color:var(--ink-bright); outline:none;" />
                </div>
                <div id="view-industry" class="zjc-assets-view" style="display: ${activeView === 'industry' ? 'block' : 'none'};">
                    <div id="zjc-industry-summary"></div>
                    <div id="list-assets"></div>
                </div>
                <div id="view-grain" class="zjc-assets-view" style="display: ${activeView === 'grain' ? 'block' : 'none'};">
                    <div id="zjc-grain-summary"></div>
                    <div id="list-grain"></div>
                </div>
            `;
        }

        const data = getMvuData();
        const assets = data?.['Kinh tế']?.['Tài sản'] || {};
        const grainLedger = data?.['Kinh tế']?.['Lưu thủy'] || {};
        const searchInput = panel.querySelector('.zjc-search').value.toLowerCase();

        // 1. Sản nghiệp
        let arr = Object.entries(assets).map(([key, item]) => ({ key, item }));
        if (searchInput) {
            arr = arr.filter(item => item.key.toLowerCase().includes(searchInput) || (item.item['Thuyết minh'] || '').toLowerCase().includes(searchInput));
        }

        let totalIncome = 0, totalOutcome = 0;
        for (let key in assets) {
            const val = assets[key]['Nguyệt nhập'] || 0;
            if (val > 0) totalIncome += val; else totalOutcome += Math.abs(val);
        }
        const industryBalance = totalIncome - totalOutcome;

        doc.getElementById('zjc-industry-summary').innerHTML = `
            <div class="cm-command-banner" style="margin-bottom:15px; grid-template-columns:repeat(3,1fr);">
                <span><small>Tháng này kết dư</small><b style="color:${industryBalance >= 0 ? 'var(--jade)' : 'var(--cinnabar-bright)'};">${industryBalance > 0 ? '+' : ''}${industryBalance.toLocaleString()} lượng</b></span>
                <span><small>Nguyệt nhập</small><b style="color:var(--jade);">+${totalIncome.toLocaleString()}</b></span>
                <span><small>Nguyệt xuất</small><b style="color:var(--cinnabar-bright);">${totalOutcome > 0 ? '-' : ''}${totalOutcome.toLocaleString()}</b></span>
            </div>
        `;

        let htmlStr = '';
        for (const { key, item } of arr) {
            const val = item['Nguyệt nhập'] || 0;
            let valColor = val > 0 ? 'var(--jade)' : (val < 0 ? 'var(--cinnabar-bright)' : 'var(--muted)');
            let valText = val > 0 ? `+${val.toLocaleString()}` : val.toLocaleString();

            htmlStr += `<div class="cwe-event-row" style="border-left: 3px solid ${valColor}; display: flex; flex-direction: column; align-items: flex-start; gap: 8px; padding: 12px 16px;">
                <div style="display: flex; justify-content: space-between; width: 100%; align-items: center;">
                    <div class="cwe-event-when" style="padding-left: 14px; position: relative; display: flex; align-items: center;">
                        <i style="background:${valColor}; box-shadow: 0 0 0 1px ${valColor}; position: absolute; left: 0; top: 50%; transform: translateY(-50%); margin: 0;"></i>
                        <strong style="font-size: 15px; color: var(--gold); display: inline-block; margin: 0 8px 0 0;">${html(key)}</strong>
                        <span class="cm-tag" style="color: var(--muted); margin: 0;">Tài vụ</span>
                    </div>
                    <div class="cwe-command-actions">
                        <button class="danger" data-action="delete-item" data-path="Kinh tế.Tài sản" data-key="${html(key)}">Xóa</button>
                    </div>
                </div>
                <div class="cwe-event-story" style="width: 100%; padding-top: 6px; border-top: 1px dashed var(--line-strong);">
                    <h4 style="font-size: 14px; margin: 0 0 6px 0; color: var(--ink-bright);">Hạn ngạch tháng: <span style="color: ${valColor};">${html(valText)} lượng</span></h4>
                    <p style="margin: 0; color: var(--muted); line-height: 1.6; font-size: 13px;">${html(item['Thuyết minh'] || 'Chưa có thuyết minh')}</p>
                </div>
            </div>`;
        }
        if (arr.length === 0) htmlStr += emptyLine('Tạm không có ghi chép tài sản.');
        doc.getElementById('list-assets').innerHTML = htmlStr;

        // 2. Lương thảo
        const grainIn = Object.entries(grainLedger['Nguyệt nhập'] || {}).map(([key, item]) => ({ key, item, dir: 'in' }));
        const grainOut = Object.entries(grainLedger['Nguyệt xuất'] || {}).map(([key, item]) => ({ key, item, dir: 'out' }));
        let grainArr = [...grainIn, ...grainOut];

        if (searchInput) {
            grainArr = grainArr.filter(g => g.key.toLowerCase().includes(searchInput) || (g.item['Thuyết minh'] || '').toLowerCase().includes(searchInput) || (g.item['Loại hình'] || '').toLowerCase().includes(searchInput));
        }

        let totalGrainIn = 0;
        for (let key in grainLedger['Nguyệt nhập']) totalGrainIn += number(grainLedger['Nguyệt nhập'][key]['Ngân lượng'], 0);
        let totalGrainOut = 0;
        for (let key in grainLedger['Nguyệt xuất']) totalGrainOut += number(grainLedger['Nguyệt xuất'][key]['Ngân lượng'], 0);

        const availableGrain = availableArmyGrain(data);
        const armySupply = estimateArmyMonthlySupply(data);
        const monthlyConsumption = armySupply.grain > 0 ? armySupply.grain : (totalGrainOut > 0 ? totalGrainOut : 1);
        const runway = availableGrain > 0 ? roundMarketNumber(availableGrain / monthlyConsumption, 1) : 0;

        doc.getElementById('zjc-grain-summary').innerHTML = `
            <div class="cm-command-banner" style="margin-bottom:15px;">
                <span><small>Quân lương có thể ăn</small><b style="color:var(--gold);">${availableGrain.toLocaleString()} thạch</b></span>
                <span><small>Tháng này nhập</small><b style="color:var(--jade);">+${totalGrainIn.toLocaleString()}</b></span>
                <span><small>Tháng này xuất</small><b style="color:var(--cinnabar-bright);">${totalGrainOut > 0 ? '-' : ''}${totalGrainOut.toLocaleString()}</b></span>
                <span><small>Có thể cầm cự</small><b style="color:var(--ink-bright);">${runway} tháng</b></span>
            </div>
        `;

        let grainHtml = '';
        for (const { key, item, dir } of grainArr) {
            const val = item['Ngân lượng'] || 0;
            const unit = item['Đơn vị'] || 'thạch';
            let valColor = dir === 'in' ? 'var(--jade)' : 'var(--cinnabar-bright)';
            let valText = dir === 'in' ? `+${val.toLocaleString()}` : `-${val.toLocaleString()}`;
            let path = dir === 'in' ? 'Kinh tế.Lưu thủy.Nguyệt nhập' : 'Kinh tế.Lưu thủy.Nguyệt xuất';

            grainHtml += `<div class="cwe-event-row" style="border-left: 3px solid ${valColor}; display: flex; flex-direction: column; align-items: flex-start; gap: 8px; padding: 12px 16px;">
                <div style="display: flex; justify-content: space-between; width: 100%; align-items: center;">
                    <div class="cwe-event-when" style="padding-left: 14px; position: relative; display: flex; align-items: center;">
                        <i style="background:${valColor}; box-shadow: 0 0 0 1px ${valColor}; position: absolute; left: 0; top: 50%; transform: translateY(-50%); margin: 0;"></i>
                        <strong style="font-size: 15px; color: var(--gold); display: inline-block; margin: 0 8px 0 0;">${html(key)}</strong>
                        <span class="cm-tag" style="color: var(--muted); margin: 0;">${html(item['Ngày tháng'] || 'Chưa rõ')}</span>
                    </div>
                    <div class="cwe-command-actions">
                        <button class="danger" data-action="delete-item" data-path="${path}" data-key="${html(key)}">Xóa</button>
                    </div>
                </div>
                <div class="cwe-event-story" style="width: 100%; padding-top: 6px; border-top: 1px dashed var(--line-strong);">
                    <h4 style="font-size: 14px; margin: 0 0 6px 0; color: var(--ink-bright);">${html(item['Loại hình'] || 'Lương thảo')}: <span style="color: ${valColor};">${html(valText)} ${html(unit)}</span></h4>
                    <p style="margin: 0; color: var(--muted); line-height: 1.6; font-size: 13px;">${html(item['Thuyết minh'] || 'Chưa có thuyết minh')}</p>
                </div>
            </div>`;
        }
        if (grainArr.length === 0) grainHtml += emptyLine('Tạm không có ghi chép lưu thủy lương thảo.');
        doc.getElementById('list-grain').innerHTML = grainHtml;

        if (activeView === 'industry') {
            panel.querySelector('.zjc-count').innerHTML = `Kết dư: <span style="color:${industryBalance >= 0 ? 'var(--jade)' : 'var(--cinnabar-bright)'};">${industryBalance > 0 ? '+' : ''}${industryBalance.toLocaleString()} lượng</span> | Tìm được ${arr.length} hạng`;
        } else {
            const grainBalance = grainLedger['Kết dư tháng này'] || 0;
            let grainBalanceColor = grainBalance > 0 ? 'var(--jade)' : (grainBalance < 0 ? 'var(--cinnabar-bright)' : 'var(--muted)');
            let grainBalanceText = grainBalance > 0 ? `+${grainBalance.toLocaleString()}` : grainBalance.toLocaleString();
            panel.querySelector('.zjc-count').innerHTML = `Kết dư: <span style="color:${grainBalanceColor}">${grainBalanceText} thạch</span> | Tìm được ${grainArr.length} hạng`;
        }
    }

    // --- Khoa kỹ ---
    function renderTech() {
        const panel = doc.getElementById('panel-tech');
        if (!panel.querySelector('.cwe-toolbar')) {
            panel.innerHTML = `
                <div class="cwe-section-head"><div><h2>Cách vật và Bách công</h2></div><div class="zjc-count" style="color:var(--faint); font-size:12px;"></div></div>
                <div class="cwe-toolbar" style="display:flex; gap:10px; margin-bottom:15px;">
                    <input type="text" class="zjc-search" data-type="tech" placeholder="Tìm kiếm khoa kỹ/miêu tả..." style="flex:1; padding:6px 10px; border:1px solid var(--line); border-radius:6px; background:rgba(0,0,0,0.3); color:var(--ink-bright); outline:none;" />
                </div>
                <div id="list-tech" style="margin-bottom:20px;"></div>
            `;
        }
        const data = getMvuData();
        const tech = data?.['Khoa kỹ'] || {};
        const searchInput = panel.querySelector('.zjc-search').value.toLowerCase();
        let arr = Object.entries(tech).map(([key, item]) => ({ key, item }));

        if (searchInput) {
            arr = arr.filter(item => item.key.toLowerCase().includes(searchInput) || (item.item['Miêu tả'] || '').toLowerCase().includes(searchInput) || (item.item['Tiến độ'] || '').toLowerCase().includes(searchInput));
        }

        panel.querySelector('.zjc-count').innerText = `Tại danh sách ${Object.keys(tech).length} hạng | Tìm được ${arr.length} hạng`;

        let htmlStr = '';
        for (const { key, item } of arr) {
            let borderColor = 'var(--gold)';
            if (item['Tiến độ'] && (item['Tiến độ'].includes('Đã phổ biến') || item['Tiến độ'].includes('Hoàn thành'))) borderColor = 'var(--jade)';
            else if (item['Tiến độ'] && item['Tiến độ'].includes('Đang thử nghiệm')) borderColor = 'var(--cinnabar-bright)';

            htmlStr += `<div class="cwe-event-row" style="border-left: 3px solid ${borderColor}; display: flex; flex-direction: column; align-items: flex-start; gap: 8px; padding: 12px 16px;">
                <div style="display: flex; justify-content: space-between; width: 100%; align-items: center;">
                    <div class="cwe-event-when" style="padding-left: 14px; position: relative; display: flex; align-items: center;">
                        <i style="background:${borderColor}; box-shadow: 0 0 0 1px ${borderColor}; position: absolute; left: 0; top: 50%; transform: translateY(-50%); margin: 0;"></i>
                        <strong style="font-size: 15px; color: ${borderColor}; display: inline-block; margin: 0 8px 0 0;">${html(key)}</strong>
                        <span class="cm-tag" style="color: var(--muted); margin: 0;">Cách vật</span>
                    </div>
                    <div class="cwe-command-actions">
                        <button class="danger" data-action="delete-item" data-path="Khoa kỹ" data-key="${html(key)}">Xóa</button>
                    </div>
                </div>
                <div class="cwe-event-story" style="width: 100%; padding-top: 6px; border-top: 1px dashed var(--line-strong);">
                    <h4 style="font-size: 14px; margin: 0 0 6px 0; color: var(--ink-bright);">Tiến độ: <span style="color: ${borderColor};">${html(item['Tiến độ'] || 'Chưa rõ')}</span></h4>
                    <p style="margin: 0; color: var(--muted); line-height: 1.6; font-size: 13px;">${html(item['Miêu tả'] || 'Chưa có miêu tả')}</p>
                </div>
            </div>`;
        }
        if (arr.length === 0) htmlStr += emptyLine('Tạm không có ghi chép.');
        doc.getElementById('list-tech').innerHTML = htmlStr;
    }

    // --- Hậu cung ---
    function renderHarem() {
        const panel = doc.getElementById('panel-harem');
        if (!panel.querySelector('.cwe-toolbar')) {
            panel.innerHTML = `
                <div class="cwe-section-head"><div><h2>Hậu cung Đồng sử</h2></div><div class="zjc-count" style="color:var(--faint); font-size:12px;"></div></div>
                <div class="cwe-toolbar" style="display:flex; gap:10px; margin-bottom:15px;">
                    <input type="text" class="zjc-search" data-type="harem" placeholder="Tìm kiếm tên/thân phận/quan hệ..." style="flex:1; padding:6px 10px; border:1px solid var(--line); border-radius:6px; background:rgba(0,0,0,0.3); color:var(--ink-bright); outline:none;" />
                    <select class="zjc-sort" data-type="harem" style="padding:6px 10px; border:1px solid var(--line); border-radius:6px; background:rgba(0,0,0,0.3); color:var(--ink-bright); outline:none;"><option value="default">Sắp xếp mặc định</option><option value="voice">Tiếng lòng ưu tiên</option></select>
                </div>
                <div class="cwe-list-container" id="list-harem"></div>
            `;
        }

        const data = getMvuData() || {};
        initVoiceChanges(data);
        const harem = data['Mạng lưới quan hệ']?.['Tư duy'] || {};
        const searchInput = panel.querySelector('.zjc-search').value.toLowerCase();
        const sortMode = panel.querySelector('.zjc-sort').value;

        let arr = Object.entries(harem).map(([name, info]) => ({ name, info }));
        if (searchInput) {
            arr = arr.filter(item => item.name.toLowerCase().includes(searchInput) || (item.info['Thân phận'] || '').toLowerCase().includes(searchInput) || (item.info['Quan hệ'] || '').toLowerCase().includes(searchInput));
        }

        if (sortMode === 'voice') {
            arr.sort((a, b) => {
                const aChange = voiceChangeSet.has(a.name) ? 1 : 0;
                const bChange = voiceChangeSet.has(b.name) ? 1 : 0;
                if (aChange !== bChange) return bChange - aChange;
                return (b.info['Hảo cảm độ'] ?? 0) - (a.info['Hảo cảm độ'] ?? 0);
            });
        }

        panel.querySelector('.zjc-count').innerText = `Tại danh sách ${Object.keys(harem).length} người | Tìm được ${arr.length} người`;

        let htmlStr = '';
        for (const { name, info } of arr) {
            const hasChanged = (sortMode === 'voice') && voiceChangeSet.has(name);
            const voiceStyle = hasChanged ? 'color:#e885a1; font-weight:bold;' : 'color:#d46a8a; font-style:italic;';
            const changeTag = hasChanged ? `<span style="font-size:10px; background:#d46a8a; color:#fff; padding:1px 4px; border-radius:3px; margin-left:6px;">Tiếng lòng thay đổi</span>` : '';

            let avatarStr = avatarImage(name);
            if (avatarStr) avatarStr = avatarStr.replace('class="zjc-avatar"', 'class="zjc-avatar" style="margin: 0 10px 0 0;"');

            htmlStr += `<div class="cwe-event-row" data-private-name="${html(name)}" style="cursor: pointer; border-left: 3px solid #d46a8a; display: flex; flex-direction: column; align-items: flex-start; gap: 8px; padding: 12px 16px;">
                <div style="display: flex; justify-content: space-between; width: 100%; align-items: center;">
                    <div class="cwe-event-when" style="padding-left: 14px; position: relative; display: flex; align-items: center;">
                        <i style="background: #d46a8a; box-shadow: 0 0 0 1px #d46a8a; position: absolute; left: 0; top: 50%; transform: translateY(-50%); margin: 0;"></i>
                        ${avatarStr}
                        <strong style="font-size: 15px; color: #d46a8a; display: inline-block; margin: 0 8px 0 0;">${html(name)}</strong>
                        <span class="cm-tag" style="color: var(--muted); margin: 0;">${html(info['Quan hệ'] || 'Phi tần')}</span>
                    </div>
                    <div class="cwe-command-actions">
                        ${portraitButton(name)}
                        ${loreButton(name)}
                    </div>
                </div>
                <div class="cwe-event-story" style="width: 100%; padding-top: 6px; border-top: 1px dashed var(--line-strong);">
                    <h4 style="font-size: 14px; margin: 0 0 6px 0; color: var(--ink-bright);">Hảo cảm: <span style="color:#d46a8a;">${info['Hảo cảm độ'] ?? 0}</span> | Thai sản: <span style="color:#d46a8a;">${info['Sinh dục']?.['Trạng thái'] || 'Chưa rõ'}</span></h4>
                    <p style="${voiceStyle} margin: 0; line-height: 1.6; font-size: 13px;">"${html(info['Tiếng lòng nhân vật'] || 'Thâm cung tịch mịch...')}" ${changeTag}</p>
                </div>
            </div>`;
        }
        if (arr.length === 0) htmlStr += emptyLine('Tạm không có ghi chép.');
        doc.getElementById('list-harem').innerHTML = htmlStr;
    }

    // --- Tông thất ---
    function renderRoyal() {
        const panel = doc.getElementById('panel-royal');
        if (!panel.querySelector('.cwe-toolbar')) {
            panel.innerHTML = `
                <div class="cwe-section-head"><div><h2>Hoàng thất Tông thân</h2></div><div class="zjc-count" style="color:var(--faint); font-size:12px;"></div></div>
                <div class="cwe-toolbar" style="display:flex; gap:10px; margin-bottom:15px;">
                    <input type="text" class="zjc-search" data-type="royal" placeholder="Tìm kiếm tên/thân phận..." style="flex:1; padding:6px 10px; border:1px solid var(--line); border-radius:6px; background:rgba(0,0,0,0.3); color:var(--ink-bright); outline:none;" />
                    <select class="zjc-sort" data-type="royal" style="padding:6px 10px; border:1px solid var(--line); border-radius:6px; background:rgba(0,0,0,0.3); color:var(--ink-bright); outline:none;"><option value="default">Sắp xếp mặc định</option><option value="voice">Tiếng lòng ưu tiên</option></select>
                </div>
                <div class="cwe-list-container" id="list-royal"></div>
            `;
        }

        const data = getMvuData() || {};
        initVoiceChanges(data);
        const royals = data['Mạng lưới quan hệ']?.['Thân thuộc'] || {};
        const generals = data['Quân sự']?.['Tướng lĩnh'] || {};
        const searchInput = panel.querySelector('.zjc-search').value.toLowerCase();
        const sortMode = panel.querySelector('.zjc-sort').value;

        let arr = Object.entries(royals).map(([name, info]) => ({ name, info }));
        if (searchInput) {
            arr = arr.filter(item => item.name.toLowerCase().includes(searchInput) || (item.info['Thân phận'] || '').toLowerCase().includes(searchInput));
        }

        if (sortMode === 'voice') {
            arr.sort((a, b) => {
                const aChange = voiceChangeSet.has(a.name) ? 1 : 0;
                const bChange = voiceChangeSet.has(b.name) ? 1 : 0;
                if (aChange !== bChange) return bChange - aChange;
                return (b.info['Hảo cảm độ'] ?? 0) - (a.info['Hảo cảm độ'] ?? 0);
            });
        }

        panel.querySelector('.zjc-count').innerText = `Tại danh sách ${Object.keys(royals).length} người | Tìm được ${arr.length} người`;

        let htmlStr = '';
        for (const { name, info } of arr) {
            const hasChanged = (sortMode === 'voice') && voiceChangeSet.has(name);
            const voiceStyle = hasChanged ? 'color:var(--cinnabar-bright); font-weight:bold;' : 'color:var(--gold); font-style:italic;';
            const changeTag = hasChanged ? `<span style="font-size:10px; background:var(--cinnabar); color:#fff; padding:1px 4px; border-radius:3px; margin-left:6px; flex-shrink: 0;">Tiếng lòng thay đổi</span>` : '';
            const presenceTag = `<span style="font-size:10px; border:1px solid ${info['Có mặt hay không'] ? 'var(--jade)' : 'var(--line)'}; color:${info['Có mặt hay không'] ? 'var(--jade)' : 'var(--muted)'}; border-radius:3px; padding:1px 4px; display:inline-block;">${info['Có mặt hay không'] ? 'Có mặt' : 'Không có mặt'}</span>`;
            
            const g = generals[name];
            const statsHtml = g ? `<div style="font-size: 11px; color: var(--gold); border: 1px dashed rgba(199, 155, 93, 0.4); padding: 3px 6px; border-radius: 4px; display: inline-block; background: rgba(0,0,0,0.2); margin: 0;">Thống suất ${g['Thống suất'] ?? 0} | Võ lực ${g['Võ lực'] ?? 0} | Trí mưu ${g['Trí mưu'] ?? 0} | Chính trị ${g['Chính trị'] ?? 0} | Uy vọng ${g['Uy vọng'] ?? 0}</div>` : '';

            let avatarStr = avatarImage(name);
            if (avatarStr) avatarStr = avatarStr.replace('class="zjc-avatar"', 'class="zjc-avatar" style="margin: 0; flex-shrink: 0;"');

            htmlStr += `<div class="cwe-event-row" style="border-left: 3px solid var(--gold); display: flex; flex-direction: column; align-items: flex-start; gap: 8px; padding: 10px 14px;">
                <div style="display: flex; justify-content: space-between; width: 100%; align-items: flex-start; gap: 10px;">
                    <div style="display: flex; align-items: flex-start; gap: 8px; flex: 1; min-width: 0;">
                        <i style="background: var(--gold); box-shadow: 0 0 0 1px var(--gold); width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; margin-top: 6px;"></i>
                        ${avatarStr}
                        <strong style="font-size: 15px; color: var(--gold); margin: 0; flex-shrink: 0; white-space: nowrap; line-height: 1.3;">${html(name)}</strong>
                        <span class="cm-tag" style="color: var(--muted); margin: 0; text-align: left; white-space: normal; overflow-wrap: anywhere; word-break: break-word; line-height: 1.3; min-width: 0;">${html(info['Thân phận'] || 'Tông thất')}</span>
                        <span style="flex-shrink: 0; white-space: nowrap; line-height: 1.3; margin-top: 0;">${presenceTag}</span>
                    </div>
                    <div class="cwe-command-actions" style="flex-shrink: 0; display: flex; align-items: center; gap: 6px; white-space: nowrap; margin-top: 0;">
                        ${portraitButton(name)}
                        ${loreButton(name)}
                        <button class="danger" data-action="delete-item" data-path="Mạng lưới quan hệ.Thân thuộc" data-key="${html(name)}">Lãng quên</button>
                    </div>
                </div>
                <div class="cwe-event-story" style="width: 100%; padding-top: 8px; border-top: 1px dashed var(--line-strong);">
                    <div style="display: flex; align-items: center; flex-wrap: wrap; gap: 10px; margin-bottom: 6px;">
                        <h4 style="font-size: 14px; margin: 0; color: var(--ink-bright);">Hảo cảm độ: <span style="color:var(--gold);">${info['Hảo cảm độ'] ?? 0}</span></h4>
                        ${statsHtml}
                    </div>
                    <p style="${voiceStyle} margin: 0; line-height: 1.6; font-size: 13px;">"${html(info['Tiếng lòng nhân vật'] || 'Hoàng ân hạo đãng...')}" ${changeTag}</p>
                </div>
            </div>`;
        }
        if (arr.length === 0) htmlStr += emptyLine('Tạm không có ghi chép.');
        doc.getElementById('list-royal').innerHTML = htmlStr;
    }

    // --- 5.5 Quân sự (Thiết kế Imperial UI mới) ---
    function renderMilitaryCommandChoice(campName, actionId, description, options = {}) {
        try {
            const quote = buildMilitaryCommandQuote(statData, campName, actionId, options);
            const costs = [quote.silver ? `Bạc ${quote.silver}` : '', quote.grain ? `Lương ${quote.grain}` : ''].filter(Boolean).join(' · ') || 'Không tiêu thêm';
            return `<button class="cm-command-choice" data-action="military-quote" data-command="${html(actionId)}"><span><b>${html(quote.label)}</b><small>${html(description)}</small></span><em>${html(costs)}${quote.days ? ` · ${quote.days} ngày` : ''}</em></button>`;
        } catch (error) {
            const labels = { 'pay-arrears': 'Bổ phát khiếm nợ', reward: 'Khao thưởng sĩ tốt', feast: 'Gia xan khao quân', resupply: 'Bổ tề doanh vụ' };
            return `<button class="cm-command-choice" disabled><span><b>${html(labels[actionId] || actionId)}</b><small>${html(error?.message || 'Tạm không khả dụng')}</small></span></button>`;
        }
    }

    function renderMilitary() {
        const panel = doc.getElementById('panel-military');
        if (!panel.querySelector('.cwe-toolbar')) {
            panel.innerHTML = `
            <div id="military-stats-container"></div>
            <div class="cwe-toolbar" style="display:flex; gap:10px; margin-bottom:15px;">
                <input type="text" class="zjc-search" data-type="military" placeholder="Tìm kiếm tên doanh/trú địa/binh chủng/tướng lĩnh..." style="flex:1; padding:7px 12px; border:1px solid var(--line-strong); border-radius:8px; background:rgba(0,0,0,0.35); color:var(--ink-bright); outline:none;" />
            </div>
            <div id="list-military-camps"></div>
            <div id="military-orders-container"></div>
            `;
        }

        statData = getMvuData() || {};
        const camps = get(statData, 'Quân sự.Các doanh', {});
        const orders = get(statData, 'Quân sự.Quân lệnh', {});
        const logs = Array.isArray(get(statData, 'Quân sự.Ghi chép quân lệnh', [])) ? get(statData, 'Quân sự.Ghi chép quân lệnh', []) : [];
        const armySupply = estimateArmyMonthlySupply(statData);
        const grain = availableArmyGrain(statData);
        const activeOrders = entries(orders).filter(([, order]) => order?.['Trạng thái'] === 'Đang tiến hành');
        const runway = armySupply.grain > 0 ? roundMarketNumber(grain / armySupply.grain, 1) : 0;

        const searchInput = panel.querySelector('.zjc-search').value.toLowerCase();
        let arr = entries(camps).map(([name, rawCamp]) => ({ name, camp: ensureCampOperations(rawCamp) }));

        if (searchInput) {
            arr = arr.filter(item => {
                const c = item.camp;
                return item.name.toLowerCase().includes(searchInput) ||
                    (c['Trú địa'] || '').toLowerCase().includes(searchInput) ||
                    (c['Binh chủng'] || '').toLowerCase().includes(searchInput) ||
                    (c['Tướng lĩnh'] || '').toLowerCase().includes(searchInput);
            });
        }

        // Render Thống kê Header 3 Thẻ Box
        doc.getElementById('military-stats-container').innerHTML = `
            <div class="cwe-section-head">
                <div>
                    <p>THỐNG SOÁI ĐẠI QUÂN</p>
                    <h2>Quân vụ Trọng doanh</h2>
                </div>
                <div class="zjc-count" style="color:var(--faint); font-size:12px; text-align:right;">
                    Tại biên <b>${Object.keys(camps).length}</b> doanh · Binh lực <b style="color:var(--gold);">${armySupply.people.toLocaleString()}</b> người
                </div>
            </div>
            <div class="cm-stat-triad">
                <div class="cm-stat-box">
                    <div>
                        <p>Quân phí mỗi tháng</p>
                        <b>${armySupply.cost.toLocaleString()} <span style="font-size:12px; font-weight:normal; color:var(--muted);">lượng</span></b>
                    </div>
                    <div class="cm-stat-icon">🪙</div>
                </div>
                <div class="cm-stat-box">
                    <div>
                        <p>Quân lương tồn kho</p>
                        <b>${grain.toLocaleString()} <span style="font-size:12px; font-weight:normal; color:var(--muted);">thạch (${runway} tháng)</span></b>
                    </div>
                    <div class="cm-stat-icon">🌾</div>
                </div>
                <div class="cm-stat-box">
                    <div>
                        <p>Quân lệnh tại hành</p>
                        <b style="color:${activeOrders.length > 0 ? 'var(--gold)' : 'var(--muted)'};">${activeOrders.length} <span style="font-size:12px; font-weight:normal; color:var(--muted);">đạo lệnh</span></b>
                    </div>
                    <div class="cm-stat-icon">📜</div>
                </div>
            </div>
        `;

        // Render danh sách thẻ Doanh Trại Imperial
        let campHtml = '';
        if (arr.length === 0) {
            campHtml = `<p class="cm-empty">Tạm không có doanh ngũ nào khớp với tìm kiếm.</p>`;
        } else {
            for (const { name, camp } of arr) {
                const isReady = camp['Trạng thái'] === 'Đãi mệnh';
                const badgeClass = isReady ? 'ready' : 'danger';
                
                // Con dấu đại diện doanh
                const sealChars = name.slice(0, 2);

                // Thanh tiến trình 0-100
                const morale = clamp(number(camp['Sĩ khí'], 50), 0, 100);
                const train = clamp(number(camp['Huấn luyện'], 50), 0, 100);
                const logist = clamp(number(camp['Hậu cần'], 50), 0, 100);
                const fatigue = clamp(number(camp['Bì lao'], 0), 0, 100);

                const moraleTone = morale < 30 ? 'low' : morale > 70 ? 'high' : 'mid';
                const trainTone = train < 30 ? 'low' : train > 70 ? 'high' : 'mid';
                const logistTone = logist < 30 ? 'low' : logist > 70 ? 'high' : 'mid';
                const fatigueTone = fatigue > 70 ? 'low' : fatigue < 30 ? 'high' : 'mid'; // Mệt mỏi cao là nguy hiểm (low color = red)

                // Cảnh báo quân tình
                const warnPills = [];
                if (camp['Số tháng khiếm nợ'] > 0) warnPills.push(`<span class="cm-army-pill warn">Nợ lương ${camp['Số tháng khiếm nợ']} tháng</span>`);
                if (camp['Số ngày thiếu lương'] > 0) warnPills.push(`<span class="cm-army-pill warn">Đứt lương ${camp['Số ngày thiếu lương']} ngày</span>`);
                if (camp['Thương binh'] > 0) warnPills.push(`<span class="cm-army-pill warn">Thương binh ${camp['Thương binh']}</span>`);
                if (warnPills.length === 0) warnPills.push(`<span class="cm-army-pill good">Quân lương tề chỉnh</span>`);

                const equip = camp['Trang bị biên chế'] || {};
                const equipPills = [
                    equip['Chủ chiến binh khí'] && equip['Chủ chiến binh khí'] !== 'Không' ? `<span class="cm-army-pill">🗡️ ${html(equip['Chủ chiến binh khí'])}</span>` : '',
                    equip['Viễn xạ binh khí'] && equip['Viễn xạ binh khí'] !== 'Không' ? `<span class="cm-army-pill">🏹 ${html(equip['Viễn xạ binh khí'])}</span>` : '',
                    equip['Phòng cụ'] && equip['Phòng cụ'] !== 'Không' ? `<span class="cm-army-pill">🛡️ ${html(equip['Phòng cụ'])}</span>` : '',
                    equip['Hỏa khí'] && equip['Hỏa khí'] !== 'Không' ? `<span class="cm-army-pill">💥 ${html(equip['Hỏa khí'])}</span>` : '',
                    equip['Tọa kỵ'] && equip['Tọa kỵ'] !== 'Không' ? `<span class="cm-army-pill">🐎 ${html(equip['Tọa kỵ'])}</span>` : ''
                ].filter(Boolean).join('');

                campHtml += `
                <div class="cm-army-card">
                    <div class="cm-army-head">
                        <div class="cm-army-left">
                            <div class="cm-army-seal">${html(sealChars)}</div>
                            <div class="cm-army-info">
                                <div class="cm-army-title">
                                    <span class="cm-army-name">${html(name)}</span>
                                    <span class="cm-army-badge ${badgeClass}">● ${html(camp['Trạng thái'])}</span>
                                </div>
                                <div class="cm-army-subline">
                                    <span>Tướng lĩnh: <b>${html(camp['Tướng lĩnh'] || 'Chưa định')}</b></span>
                                    <span class="sep">|</span>
                                    <span>Trú địa: <b>${html(camp['Trú địa'] || 'Chưa rõ')}</b></span>
                                    <span class="sep">|</span>
                                    <span>Binh lực: <b>${number(camp['Nhân số'], 0).toLocaleString()}</b> người (${html(camp['Binh chủng'] || 'Bộ binh')})</span>
                                </div>
                            </div>
                        </div>
                        <div class="cwe-command-actions">
                            <button class="primary" data-action="open-military-command" data-camp-name="${html(name)}">Quân Phủ Thiêm Áp</button>
                        </div>
                    </div>

                    <div class="cm-army-bars">
                        <div class="cm-army-bar-col">
                            <div class="cm-army-bar-header"><span>Sĩ khí</span><b>${morale}</b></div>
                            <div class="cm-army-track"><div class="cm-army-fill ${moraleTone}" style="width:${morale}%"></div></div>
                        </div>
                        <div class="cm-army-bar-col">
                            <div class="cm-army-bar-header"><span>Huấn luyện</span><b>${train}</b></div>
                            <div class="cm-army-track"><div class="cm-army-fill ${trainTone}" style="width:${train}%"></div></div>
                        </div>
                        <div class="cm-army-bar-col">
                            <div class="cm-army-bar-header"><span>Hậu cần</span><b>${logist}</b></div>
                            <div class="cm-army-track"><div class="cm-army-fill ${logistTone}" style="width:${logist}%"></div></div>
                        </div>
                        <div class="cm-army-bar-col">
                            <div class="cm-army-bar-header"><span>Bì lao</span><b>${fatigue}</b></div>
                            <div class="cm-army-track"><div class="cm-army-fill ${fatigueTone}" style="width:${fatigue}%"></div></div>
                        </div>
                    </div>

                    <div class="cm-army-foot">
                        <div class="cm-army-tags">
                            <span style="color:var(--faint); margin-right:2px;">Trang bị (${html(camp['Trang bị'] || 'Phổ thông')}):</span>
                            ${equipPills || '<span class="cm-army-pill">Trang bị giản lược</span>'}
                            <span style="color:var(--faint); font-size:10px; margin-left:4px;">(Tề bị ${equip['Tề bị suất'] || 0}% · Hoàn hảo ${equip['Hoàn hảo suất'] || 0}%)</span>
                        </div>
                        <div class="cm-army-tags">
                            ${warnPills.join('')}
                        </div>
                    </div>
                </div>`;
            }
        }
        doc.getElementById('list-military-camps').innerHTML = campHtml;

        // Render quân lệnh đang thi hành
        let ordersHtml = '';
        if (activeOrders.length > 0) {
            ordersHtml += `<div class="cm-order-stack">`;
            for (const [id, order] of activeOrders) {
                const required = Math.max(1, number(order['Số ngày cần thiết'], 1));
                const elapsed = clamp(number(order['Số ngày đã tiến hành'], 0), 0, required);
                const progress = Math.round((elapsed / required) * 100);

                ordersHtml += `<article class="cm-order-slip">
                    <div class="cm-order-seal">${html(order['Trạng thái'] === 'Đang tiến hành' ? 'Hành' : order['Trạng thái'] === 'Hoàn thành' ? 'Thành' : 'Chỉ')}</div>
                    <div class="cm-order-copy">
                        <div style="display:flex; justify-content:space-between;">
                            <b style="color:var(--ink-bright); font-size:14px;">${html(order['Loại hình'] || 'Quân lệnh')}</b>
                            <span style="font-size:11px; color:var(--gold); border:1px solid var(--line); border-radius:4px; padding:1px 6px; background:rgba(0,0,0,0.3);">
                                ${html(order['Mục tiêu doanh'] || 'Chưa ghi doanh ngũ')} ${order['Thực thi tướng lĩnh'] ? `· ${html(order['Thực thi tướng lĩnh'])}` : ''}
                            </span>
                        </div>
                        <p>Khởi từ ${html(order['Ngày bắt đầu'] || '')} · Bạc ${order['Ngân lượng dự toán'] || 0} lượng · Lương ${order['Lương thực dự toán'] || 0} thạch</p>
                        <div class="cm-order-progress"><i style="width:${progress}%"></i><span>${elapsed} / ${required} ngày</span></div>
                        ${order['Ghi chú'] ? `<small>${html(order['Ghi chú'])}</small>` : ''}
                    </div>
                    ${order['Trạng thái'] === 'Đang tiến hành' ? `<button class="cm-order-cancel" data-action="cancel-military-order" data-order-id="${html(id)}">Đình chỉ</button>` : ''}
                </article>`;
            }
            ordersHtml += `</div>`;
        } else {
            ordersHtml = emptyLine('Tạm không có quân lệnh nào đang thi hành.');
        }

        // Render Quân lệnh bộ (Lịch sử)
        let logsHtml = '';
        if (logs.length > 0) {
            logsHtml += `<div class="cm-command-log">`;
            [...logs].reverse().forEach(log => {
                logsHtml += `<article><time>${html(log['Ngày tháng'])}</time><div class="cm-order-copy"><b>${html(log['Loại hình'])}</b><p>${html(log['Kết quả'])}</p></div><span>${html(log['Mục tiêu doanh'])}</span></article>`;
            });
            logsHtml += `</div>`;
        } else {
            logsHtml = emptyLine('Tạm không có ghi chép nhật ký quân sự.');
        }

        doc.getElementById('military-orders-container').innerHTML = `
            <details class="cm-fold" open style="margin-top: 20px;">
                <summary><span>Quân lệnh đang thi hành (${activeOrders.length})</span></summary>
                <div class="cm-fold-body">${ordersHtml}</div>
            </details>
            <details class="cm-fold">
                <summary><span>Quân lệnh bộ (Lịch sử thao tác)</span></summary>
                <div class="cm-fold-body">${logsHtml}</div>
            </details>
        `;
    }

    // --- Render Hộp thoại Modal ---
    function renderZjcModal() {
        const container = doc.getElementById('zjc-modal-container');
        if (!modalState) {
            container.innerHTML = '';
            return;
        }

        if (modalState.type === 'power') {
            const powerName = modalState.name || '';
            const power = get(statData, `Thời cục và nhiệm vụ.Quan hệ thế lực.${powerName}`, {});
            const generals = entries(get(power, 'Quân sự.Tướng lĩnh hạ thuộc', {}));
            const armies = entries(get(power, 'Quân sự.Quân đội', {}));
            const fav = power['Hảo cảm độ'] ?? 0;

            container.innerHTML = `
            <div class="zjc-modal-mask" data-action="close-modal">
                <div class="cm-command-modal cm-modal-power">
                    <header>
                        <div><p>Thế lực hồ sơ</p><h2>${html(powerName)}</h2></div>
                        <button data-action="close-modal">×</button>
                    </header>
                    <div class="cm-modal-body">
                        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px dashed var(--line); padding-bottom:8px; margin-bottom:12px;">
                            <span style="color:var(--muted); font-size:14px;">Hảo cảm độ</span>
                            <b style="color:${fav < 0 ? 'var(--cinnabar-bright)' : 'var(--jade)'}; font-size:16px;">${fav}</b>
                        </div>
                        ${meta('Trạng thái', power['Trạng thái'] || 'Chưa tiếp xúc')}
                        ${power['Miêu tả'] ? `<p style="color:var(--muted); font-style:italic; border-left:3px solid var(--line); padding-left:10px; margin:14px 0 6px; line-height:1.6;">${html(power['Miêu tả'])}</p>` : ''}

                        <section class="cm-command-section"><h3>Kinh tế khái huống</h3>
                        <div class="cm-info-grid">
                            ${meta('Tình trạng tài chính', get(power, 'Kinh tế.Tình trạng tài chính', 'Chưa rõ'))}
                            ${meta('Thu nhập chủ yếu', get(power, 'Kinh tế.Thu nhập chủ yếu', 'Chưa rõ'))}
                            ${meta('Chi tiêu chủ yếu', get(power, 'Kinh tế.Chi tiêu chủ yếu', 'Chưa rõ'))}
                            ${meta('Lương thảo', `${get(power, 'Kinh tế.Lương thảo.Trạng thái', 'Chưa rõ')} ${get(power, 'Kinh tế.Lương thảo.Số lượng', 0)}${get(power, 'Kinh tế.Lương thảo.Đơn vị', '')}`)}
                        </div>
                        ${get(power, 'Kinh tế.Miêu tả') ? `<p style="color:var(--muted); font-size:12px; margin-top:-6px;">${html(get(power, 'Kinh tế.Miêu tả'))}</p>` : ''}
                        </section>

                        <section class="cm-command-section"><h3>Quân lực thái thế</h3>
                        <div class="cm-info-grid">
                            ${meta('Tổng binh lực', get(power, 'Quân sự.Tổng binh lực', 0).toLocaleString())}
                            ${meta('Binh chủng chủ lực', get(power, 'Quân sự.Binh chủng chủ lực', 'Chưa rõ'))}
                        </div>
                        ${get(power, 'Quân sự.Miêu tả') ? `<p style="color:var(--muted); font-size:12px; margin-top:-6px;">${html(get(power, 'Quân sự.Miêu tả'))}</p>` : ''}
                        </section>

                        ${generals.length ? `
                        <section class="cm-command-section"><h3>Tướng lĩnh hạ thuộc</h3>
                        <div class="cm-list">${generals.map(([gName, g]) => `
                            <article class="cm-item">
                                <div class="cm-item-title"><b>${html(gName)}</b>${tag(g['Chức vị'] || '')}</div>
                                <div class="cm-info-grid" style="margin:8px 0; gap:4px 10px;">
                                    ${meta('Thống suất', g['Thống suất'] ?? 0)}${meta('Võ lực', g['Võ lực'] ?? 0)}
                                    ${meta('Trí mưu', g['Trí mưu'] ?? 0)}${meta('Trung thành', g['Trung thành'] ?? 0)}
                                </div>
                                <p style="margin:6px 0 0; font-size:11px; color:var(--muted); line-height:1.5; border-top:1px dashed var(--line); padding-top:6px;">Binh ${(g['Binh lực'] ?? 0).toLocaleString()} · ${g['Trú địa'] || 'Trú địa chưa rõ'}${g['Giới thiệu'] ? `<br>${html(g['Giới thiệu'])}` : ''}</p>
                            </article>`).join('')}
                        </div></section>` : ''}

                        ${armies.length ? `
                        <section class="cm-command-section"><h3>Quân đội</h3>
                        <div class="cm-list">${armies.map(([aName, a]) => `
                            <article class="cm-item">
                                <div class="cm-item-title"><b>${html(aName)}</b>${tag(`${a['Nhân số'] ?? 0} người`)}</div>
                                <div class="cm-info-grid" style="margin:8px 0; gap:4px 10px;">
                                    ${meta('Binh chủng', a['Binh chủng'] || 'Chưa rõ')}
                                    ${meta('Tướng lĩnh', a['Tướng lĩnh'] || 'Chưa định')}
                                    ${meta('Trang bị', a['Trang bị'] || 'Chưa ghi')}
                                    ${meta('Đẳng cấp', a['Đẳng cấp'] || 'Chưa ghi')}
                                    ${meta('Trú địa', a['Trú địa'] || 'Chưa ghi')}
                                    ${meta('Trạng thái', a['Trạng thái'] || '—')}
                                </div>
                                <div class="cm-info-grid" style="margin:8px 0 0 0; gap:4px 10px; border-top:1px dashed var(--line); padding-top:6px;">
                                    ${meta('Sĩ khí', a['Sĩ khí'] ?? 0)}
                                    ${meta('Huấn luyện', a['Huấn luyện'] ?? 0)}
                                    ${meta('Hậu cần', a['Hậu cần'] ?? 0)}
                                </div>
                            </article>`).join('')}
                        </div></section>` : ''}
                    </div>
                </div>
            </div>`;
        } else if (modalState.type === 'private') {
            const privateName = modalState.name || '';
            const person = get(statData, `Mạng lưới quan hệ.Tư duy.${privateName}`, {});
            const fav = person['Hảo cảm độ'] ?? 0;
            const loyalty = person['Trung tâm'] ?? 50;
            const isPresent = person['Có mặt hay không'] ? 'Có mặt' : 'Không có mặt';
            const presenceColor = person['Có mặt hay không'] ? 'var(--jade)' : 'var(--muted)';
            const birth = person['Sinh dục'] || {};

            container.innerHTML = `
            <div class="zjc-modal-mask" data-action="close-modal">
                <div class="cm-command-modal cm-modal-power">
                    <header>
                        <div><p>Hậu cung Đồng sử</p><h2>${html(privateName)}</h2></div>
                        <button data-action="close-modal">×</button>
                    </header>
                    <div class="cm-modal-body">
                        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px dashed var(--line); padding-bottom:8px; margin-bottom:12px;">
                            <span style="color:var(--muted); font-size:14px;">Hảo cảm độ / Trung tâm</span>
                            <div>
                                <b style="color:${fav < 0 ? 'var(--cinnabar-bright)' : 'var(--jade)'}; font-size:16px;">${fav}</b>
                                <span style="color:var(--line); margin:0 6px;">|</span>
                                <b style="color:var(--gold); font-size:16px;">${loyalty}</b>
                            </div>
                        </div>
                        
                        <div class="cm-info-grid">
                            ${meta('Thân phận', person['Thân phận'] || 'Chưa ghi')}
                            ${meta('Quan hệ', person['Quan hệ'] || 'Chưa ghi')}
                            <div class="cm-meta"><span>Trạng thái</span><b style="color:${presenceColor}; text-align:right;">${isPresent}</b></div>
                        </div>
                        ${person['Tiếng lòng nhân vật'] ? `<p style="color:#d46a8a; font-style:italic; border-left:3px solid var(--line); padding-left:10px; margin:14px 0 6px; line-height:1.6;">"${html(person['Tiếng lòng nhân vật'])}"</p>` : ''}

                        <section class="cm-command-section"><h3>Nguyệt tín và Thai sản</h3>
                        <div class="cm-info-grid">
                            ${meta('Chu kỳ', `Ngày thứ ${birth['Chu kỳ'] ?? 1}`)}
                            ${meta('Thời kỳ', birth['Thời kỳ'] || 'An toàn kỳ')}
                            <div class="cm-meta"><span>Trạng thái thai sản</span><b style="color:#d46a8a; text-align:right;">${html(birth['Trạng thái'] || 'Chưa mang thai')}</b></div>
                            ${birth['Dự sinh kỳ'] ? meta('Dự sinh kỳ', birth['Dự sinh kỳ']) : ''}
                        </div>
                        </section>

                        ${birth['Lần đồng phòng cuối']?.['Ngày tháng'] ? `
                        <section class="cm-command-section"><h3>Ghi chép lần đồng phòng cuối</h3>
                        <div class="cm-info-grid">
                            ${meta('Ngày tháng', birth['Lần đồng phòng cuối']['Ngày tháng'])}
                            ${meta('Xác suất thụ thai', `${birth['Lần đồng phòng cuối']['Xác suất phán định'] ?? 0}%`)}
                        </div>
                        </section>` : ''}
                        
                        <div style="margin-top:24px; padding-top:16px; border-top:1px dashed var(--line); display:flex; justify-content:center;">
                            <div class="cwe-command-actions">
                                ${portraitButton(privateName)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
        } else if (modalState.type === 'military-command') {
            const campName = modalState.campName || '';
            const camp = get(statData, `Quân sự.Các doanh.${campName}`);
            if (!camp) return;
            ensureCampOperations(camp);
            const generals = entries(get(statData, 'Quân sự.Tướng lĩnh', {}));
            const generalNames = [...new Set([camp['Tướng lĩnh'], ...generals.map(([name]) => name)].filter(Boolean))];
            const active = activeMilitaryOrders(statData).find(([, order]) => order['Mục tiêu doanh'] === campName);

            let alertHtml = '';
            const alerts = [];
            if (camp['Số tháng khiếm nợ'] > 0) alerts.push(`Khiếm nợ quân lương <b style="font-size:15px;">${camp['Số tháng khiếm nợ']}</b> tháng`);
            if (camp['Số ngày thiếu lương'] > 0) alerts.push(`Đứt lương <b style="font-size:15px;">${camp['Số ngày thiếu lương']}</b> ngày`);
            if (camp['Thương binh'] > 0) alerts.push(`Có thương binh <b style="font-size:15px;">${camp['Thương binh']}</b> người`);
            if (alerts.length > 0) {
                alertHtml = `<div style="padding:10px 12px; border:1px solid var(--cinnabar-bright); border-radius:8px; color:var(--cinnabar-bright); background:rgba(181, 77, 57, 0.1); margin-bottom:15px; font-size:13px; display:flex; gap:15px; justify-content:center; flex-wrap:wrap;">
                    ${alerts.join('<span style="color:var(--line);">|</span>')}
                </div>`;
            }

            const equip = camp['Trang bị biên chế'] || {};
            let equipDetailsHtml = `<div style="padding:10px 12px; border:1px solid var(--line); border-radius:8px; background:rgba(0,0,0,0.3); margin-bottom:15px; font-size:12px; color:var(--muted); display:flex; flex-wrap:wrap; gap:10px; justify-content:space-between;">
                <span>Chủ chiến: <b style="color:var(--ink-bright);">${html(equip['Chủ chiến binh khí'] || 'Không')}</b></span>
                <span>Viễn xạ: <b style="color:var(--ink-bright);">${html(equip['Viễn xạ binh khí'] || 'Không')}</b></span>
                <span>Phòng cụ: <b style="color:var(--ink-bright);">${html(equip['Phòng cụ'] || 'Không')}</b></span>
                <span>Hỏa khí: <b style="color:var(--ink-bright);">${html(equip['Hỏa khí'] || 'Không')}</b></span>
                <span>Tọa kỵ: <b style="color:var(--ink-bright);">${html(equip['Tọa kỵ'] || 'Không')}</b></span>
                <span>Tề bị suất: <b style="color:var(--gold);">${equip['Tề bị suất'] || 0}%</b></span>
                <span>Hoàn hảo suất: <b style="color:var(--gold);">${equip['Hoàn hảo suất'] || 0}%</b></span>
            </div>`;

            container.innerHTML = `
            <div class="zjc-modal-mask" data-action="close-modal">
                <div class="cm-command-modal">
                    <header>
                        <div><p>Quân phủ thiêm áp · ${html(camp['Trạng thái'])}</p><h2>${html(campName)}</h2></div>
                        <button data-action="close-modal">×</button>
                    </header>
                    <div class="cm-modal-body">
                        ${alertHtml}
                        <div class="cm-command-banner">
                            <span><small>Binh lực</small><b>${number(camp['Nhân số'], 0)}</b></span>
                            <span><small>Sĩ khí / Huấn luyện</small><b>${number(camp['Sĩ khí'], 0)} / ${number(camp['Huấn luyện'], 0)}</b></span>
                            <span><small>Hậu cần / Bì lao</small><b>${number(camp['Hậu cần'], 0)} / ${number(camp['Bì lao'], 0)}</b></span>
                            <span><small>Trang bị</small><b>${html(camp['Trang bị'] || 'Chưa ghi')}</b></span>
                        </div>
                        ${equipDetailsHtml}
                        ${active ? `<div class="cm-command-blocked">Doanh này đang chấp hành “${html(active[1]['Loại hình'])}”, không thể phát thêm quân lệnh thời gian; Khao thưởng, Bổ lương và Bổ cấp vẫn có thể thực thi ngay.</div>` : ''}
                        <div class="cm-command-general"><label>Chỉ định tướng lĩnh chủ trì:</label><select data-military-general>${generalNames.map(name => `<option value="${html(name)}"${name === camp['Tướng lĩnh'] ? ' selected' : ''}>${html(name)} · Thống suất ${number(get(statData, `Quân sự.Tướng lĩnh.${name}.Thống suất`, 35), 35)}</option>`).join('')}</select></div>
                        <section class="cm-command-section"><h3>Quân vụ tức thời</h3><div class="cm-command-options">
                            ${renderMilitaryCommandChoice(campName, 'reward', 'Khao thưởng sĩ tốt, khao nhiều lần trong tháng hiệu quả giảm dần')}
                            ${renderMilitaryCommandChoice(campName, 'pay-arrears', 'Bổ phát khiếm nợ lương hoặc thanh toán lương')}
                            ${renderMilitaryCommandChoice(campName, 'feast', 'Tiêu hao quân lương gia xan, đề chấn sĩ khí và hoãn giải bì lao')}
                            ${renderMilitaryCommandChoice(campName, 'resupply', 'Bổ sung dược liệu, doanh cụ và quân lương khẩn cấp')}
                        </div></section>
                        <section class="cm-command-section"><h3>Chỉnh huấn và Hưu dưỡng</h3><div class="cm-command-options">
                            ${renderMilitaryCommandChoice(campName, 'train-short', 'Năm ngày thao luyện cơ bản')}
                            ${renderMilitaryCommandChoice(campName, 'train-standard', 'Mười lăm ngày quân kỷ và trận liệt chỉnh huấn')}
                            ${renderMilitaryCommandChoice(campName, 'train-long', 'Bốn mươi ngày trường kỳ chỉnh huấn chuyên sâu')}
                            ${renderMilitaryCommandChoice(campName, 'rest', 'Bảy ngày hưu chỉnh, cứu chữa thương binh và giải tỏa bì lao')}
                        </div></section>
                        <section class="cm-command-section"><h3>Chỉnh doanh hoán trang</h3><div class="cm-refit-line"><select data-refit-tier>${EQUIPMENT_TIERS.map(tier => `<option value="${tier}"${tier === camp['Trang bị'] ? ' selected' : ''}>${tier} trang bị</option>`).join('')}</select><select data-refit-loadout>${EQUIPMENT_LOADOUTS.map(name => `<option value="${name}">${name}</option>`).join('')}</select><button data-action="military-quote" data-command="refit">Hạch toán hoán trang</button></div></section>
                    </div>
                </div>
            </div>`;
        } else if (modalState.type === 'confirm') {
            container.innerHTML = `
            <div class="zjc-modal-mask" data-action="close-modal">
                <div class="cm-confirm-modal">
                    <h2>${html(modalState.title || 'Xác nhận')}</h2>
                    <div class="cm-confirm-modal-body">
                        <p>${html(modalState.message || '').replaceAll('\n', '<br>')}</p>
                    </div>
                    <div class="btns">
                        <button class="btn-cancel" data-action="close-modal">Hủy bỏ</button>
                        <button class="btn-confirm" data-action="confirm-ok">Xác nhận</button>
                    </div>
                </div>
            </div>`;
        } else if (modalState.type === 'portrait') {
            const imgs = getAllPortraitData()[modalState.name];
            if (!imgs) {
                container.innerHTML = '';
                return;
            }
            const categories = Object.entries(imgs);
            const idx = modalState.catIdx ?? 0;
            const [cat, url] = categories[idx] || categories[0];

            container.innerHTML = `
            <div class="cm-portrait-overlay" data-action="close-modal">
              <div class="cm-portrait-frame">
                <div class="cm-portrait-stage">
                  <button class="cm-portrait-arrow" data-action="portrait-prev" aria-label="Tấm trước">◀</button>
                  <div class="cm-portrait-view">
                    <img src="${html(url)}" alt="${html(modalState.name)}-${html(cat)}" />
                    <div class="cm-portrait-caption">
                      <span class="cm-portrait-name">${html(modalState.name)}</span>
                      <span class="cm-portrait-cat">· ${html(cat)} ·</span>
                    </div>
                  </div>
                  <button class="cm-portrait-arrow" data-action="portrait-next" aria-label="Tấm sau">▶</button>
                </div>
                <div class="cm-portrait-dots">
                  ${categories.map((_, i) => `<span class="cm-portrait-dot${i === idx ? ' active' : ''}"></span>`).join('')}
                </div>
              </div>
              <div class="cm-portrait-hint">NHẤN VÀO KHOẢNG TRỐNG ĐỂ ĐÓNG</div>
            </div>`;
        } else if (modalState.type === 'lore') {
            const lore = PERSON_LORE[modalState.name];
            if (!lore) {
                container.innerHTML = '';
                return;
            }
            container.innerHTML = `
            <div class="zjc-modal-mask" data-action="close-modal">
                <div class="cm-command-modal cm-modal-power">
                    <header>
                        <div><p>Hồ sơ nhân vật</p><h2>${html(modalState.name)}</h2></div>
                        <button data-action="close-modal">×</button>
                    </header>
                    <div class="cm-modal-body">
                        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px dashed var(--line); padding-bottom:8px; margin-bottom:12px;">
                            <span style="color:var(--gold); font-size:15px; font-weight:bold; font-family:'Noto Serif SC', serif;">${html(lore.title)}</span>
                        </div>
                        <div style="color:var(--ink); font-size:13px; line-height:1.8; white-space:pre-line; padding:4px 0;">
                            ${html(lore.desc)}
                        </div>
                    </div>
                </div>
            </div>`;
        }
    }

    // --- Tổng lãm ---
    function renderOverview() {
        const container = doc.getElementById('panel-overview');
        const data = getMvuData();
        if (!data) { container.innerHTML = `<p class="cm-empty">Chưa có dữ liệu MVU.</p>`; return; }

        const world = data['Thế giới vận hành'] || {};
        const hero = data['Nhân vật chính'] || {};
        const economy = data['Kinh tế'] || {};

        let totalIncome = 0, totalOutcome = 0;
        const assets = economy['Tài sản'] || {};
        for (let k in assets) {
            const val = assets[k]?.['Nguyệt nhập'] || 0;
            if (val > 0) totalIncome += val; else totalOutcome += Math.abs(val);
        }
        const armyStats = estimateArmyMonthlySupply(data);
        const finalBalance = totalIncome - totalOutcome - armyStats.cost;

        let modernDate = '', modernTime = '';
        const dayStr = world['Ngày hiện tại'] || '';
        const parsedYear = dayStr.match(/Sùng Trinh năm thứ (\S{1,2})/);
        if (parsedYear) {
            const numMap = { 'Nguyên': 1, 'Nhất': 1, 'Nhị': 2, 'Tam': 3, 'Tứ': 4, 'Ngũ': 5, 'Lục': 6, 'Thất': 7, 'Bát': 8, 'Cửu': 9, 'Thập': 10 };
            const m = dayStr.match(/năm.*?(\d{1,2}|Sơ\S|Thập\S?|Nhị Thập\S?|Tam Thập)tháng.*?(\d{1,2}|Sơ\S|Thập\S?|Nhị Thập\S?|Tam Thập)ngày/);
            modernDate = '1634 (Sùng Trinh năm thứ bảy)';
        }

        const timeStr = world['Thời gian hiện tại'] || '';
        let shichen = '', ke = '';
        const tMatch = timeStr.match(/(Tý|Sửu|Dần|Mão|Thìn|Tỵ|Ngọ|Mùi|Thân|Dậu|Tuất|Hợi)\s*thời\s*(\S+)?/);
        if (tMatch) {
            shichen = tMatch[1] + ' thời'; ke = tMatch[2] || '';
            const SHICHEN_NAMES = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];
            const idx = SHICHEN_NAMES.indexOf(tMatch[1]);
            if (idx !== -1) {
                let baseHour = idx === 0 ? 23 : idx * 2 - 1, posIn120 = 0;
                if (ke.includes('Sơ')) posIn120 = 0; else if (ke.includes('Nhất')) posIn120 = 15; else if (ke.includes('Nhị')) posIn120 = 30; else if (ke.includes('Tam')) posIn120 = 45; else if (ke.includes('Tứ')) posIn120 = 60; else if (ke.includes('Ngũ')) posIn120 = 75; else if (ke.includes('Lục')) posIn120 = 90; else if (ke.includes('Thất')) posIn120 = 105;
                let h = baseHour + Math.floor(posIn120 / 60); if (h >= 24) h -= 24; let m = posIn120 % 60;
                modernTime = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
            }
        }

        const gold = hero['Tư khố']?.['Kim ngân đồng']?.['Hoàng kim'] || 0;
        const silver = hero['Tư khố']?.['Kim ngân đồng']?.['Bạch ngân'] || 0;
        const copper = hero['Tư khố']?.['Kim ngân đồng']?.['Tiền đồng'] || 0;

        const items = hero['Tư khố']?.['Vật phẩm quan trọng'] || {};
        let itemsHtml = '';
        for (const [itemName, itemInfo] of Object.entries(items)) {
            itemsHtml += `
            <div class="cm-item">
                <div class="cm-item-title" style="margin-bottom:6px; padding-bottom:6px; border-bottom-style:dashed;">
                    <b style="font-size:14px;">${html(itemName)}</b>
                    <span class="cm-tag" style="color:var(--ink-bright); border-color:var(--gold);">x${itemInfo['Số lượng'] || 1}</span>
                </div>
                <p style="margin:0; font-size:12px; line-height:1.5; color:var(--muted);">${html(itemInfo['Giới thiệu'] || '')}</p>
            </div>`;
        }
        if (!itemsHtml) itemsHtml = `<p class="cm-empty">Tạm không có vật phẩm quan trọng.</p>`;

        let invHtml = '';
        const storage = economy['Thương trữ'] || {};
        for (const [k, v] of Object.entries(storage)) {
            if (v?.['Số lượng'] > 0) {
                invHtml += `<span class="cm-tag" style="margin:3px 2px; padding: 4px 8px; border-color:var(--line-strong); color:var(--ink);">${html(k)}: <b style="color:var(--gold); font-weight:bold;">${v['Số lượng']}${html(v['Đơn vị'] || '')}</b></span>`;
            }
        }
        if (!invHtml) invHtml = `<p class="cm-empty" style="margin-top:10px;">Thương trữ trống rỗng, không có vật tư ghi chép.</p>`;

        container.innerHTML = `
            <div class="cwe-section-head">
                <div><h2>Giang sơn tổng lãm</h2></div>
            </div>
            
            <div class="cwe-ledger-column" style="margin-bottom:14px;">
                <header><span>📅 Thiên hạ đại thế</span></header>
                <div class="cwe-record">
                    <h3>Ngày tháng</h3>
                    <div style="display:flex; flex-direction:column; align-items:flex-end;">
                        <p>${world['Ngày hiện tại'] || 'Chưa rõ'}</p>
                        ${modernDate ? `<p style="font-size:11px; color:var(--faint); margin-top:2px;">${modernDate}</p>` : ''}
                    </div>
                </div>
                <div class="cwe-record">
                    <h3>Canh giờ</h3>
                    <div style="display:flex; flex-direction:column; align-items:flex-end;">
                        <p>${shichen} ${ke}</p>
                        ${modernTime ? `<p style="font-size:11px; color:var(--faint); margin-top:2px;">(${modernTime})</p>` : ''}
                    </div>
                </div>
                <div class="cwe-record"><h3>Vị trí</h3><p>${world['Địa điểm hiện tại'] || 'Tử Cấm Thành'}</p></div>
                <div class="cwe-record"><h3>Thời tiết</h3><p>${world['Thời tiết'] || 'Chưa rõ'}</p></div>
            </div>

            <div class="cwe-archive-grid">
                <div class="cwe-ledger-column">
                    <header><span>⚖️ Tài vụ triều đình</span></header>
                    <div class="cwe-record"><h3>Dự tính kết dư</h3><p style="color:${finalBalance >= 0 ? 'var(--jade)' : 'var(--cinnabar-bright)'}">${finalBalance > 0 ? '+' : ''}${finalBalance.toLocaleString()} lượng</p></div>
                    <div class="cwe-record"><h3>Dự tính quân phí</h3><p style="color:var(--cinnabar-bright);">${armyStats.cost.toLocaleString()} lượng</p></div>
                </div>

                <div class="cwe-ledger-column">
                    <header><span>💎 Nội noa hoàng gia (Tư khố)</span></header>
                    <div class="cwe-record"><h3>Hoàng kim</h3><p style="color:var(--gold); font-weight:bold;">${gold.toLocaleString()} lượng</p></div>
                    <div class="cwe-record"><h3>Bạch ngân</h3><p style="color:var(--ink-bright); font-weight:bold;">${silver.toLocaleString()} lượng</p></div>
                    <div class="cwe-record"><h3>Tiền đồng</h3><p style="color:var(--muted);">${copper.toLocaleString()} văn</p></div>
                </div>
            </div>

            <div class="cwe-ledger-column" style="margin-top:14px;">
                <header><span>🌾 Thương trữ vật tư</span></header>
                <div style="display:flex; flex-wrap:wrap; padding: 6px 0;">${invHtml}</div>
            </div>

            <div class="cwe-ledger-column" style="margin-top:14px;">
                <header><span>📦 Bảo vật ngự dụng & Trọng vật</span></header>
                <div class="cm-list" style="margin-top:10px; margin-bottom:0;">${itemsHtml}</div>
            </div>
        `;
    }

    // ==========================================
    // 6. Xử lý bản đồ Canvas Tử Cấm Thành
    // ==========================================
    const BUILDINGS = [
        { name: 'Ngọ Môn', zone: 'Ngoại triều trung khu', x: 0.50, y: 0.88, w: 0.22, h: 0.05, desc: 'Cổng chính phía nam của Tử Cấm Thành. Nơi Hoàng đế ban bố lịch thư (Nghi lễ Ban Sóc), hiến tù sau chiến thắng và cử hành Đình trượng (phạt trượng đại thần).' },
        { name: 'Thái Hòa Môn', zone: 'Ngoại triều trung khu', x: 0.50, y: 0.77, w: 0.16, h: 0.04, desc: 'Cửa ngõ dẫn vào Tiền tam điện, nơi tổ chức các nghi thức Thính chính thời đầu nhà Minh.' },
        { name: 'Hoàng Cực Điện', zone: 'Ngoại triều trung khu', x: 0.50, y: 0.70, w: 0.24, h: 0.06, desc: 'Chính điện tối cao của Tử Cấm Thành (sau đổi tên thành Thái Hòa Điện), nơi cử hành các đại điển quốc gia như Hoàng đế đăng cơ, đại hôn, sách phong, mệnh tướng xuất chinh.' },
        { name: 'Trung Cực Điện', zone: 'Ngoại triều trung khu', x: 0.50, y: 0.62, w: 0.08, h: 0.04, desc: 'Nơi Hoàng đế tạm nghỉ, đọc chúc văn, tiếp nhận quan viên chấp sự bái triều trước khi diễn ra đại điển.' },
        { name: 'Kiến Cực Điện', zone: 'Ngoại triều trung khu', x: 0.50, y: 0.55, w: 0.12, h: 0.04, desc: 'Hậu điện của ngoại triều. Nơi Hoàng đế thay y phục trước đại điển, cũng dùng để thiết yến các Các thần và ngoại phiên.' },
        { name: 'Càn Thanh Môn', zone: 'Nội đình chính tẩm', x: 0.50, y: 0.47, w: 0.10, h: 0.03, desc: 'Chính môn của nội đình, phân định ranh giới giữa tiền triều và hậu tẩm.' },
        { name: 'Càn Thanh Cung', zone: 'Nội đình chính tẩm', x: 0.50, y: 0.40, w: 0.14, h: 0.05, desc: 'Chính tẩm của Hoàng đế nhà Minh. Địa điểm cốt lõi nơi Hoàng đế sinh hoạt, xử lý chính vụ, phê duyệt tấu chương hằng ngày.' },
        { name: 'Giao Thái Điện', zone: 'Nội đình chính tẩm', x: 0.50, y: 0.33, w: 0.08, h: 0.04, desc: 'Nằm giữa hai cung, là nơi Hoàng hậu nhận lễ hạ thọ dịp Thiên Thu tiết, ngụ ý Càn Khôn giao thái.' },
        { name: 'Khôn Ninh Cung', zone: 'Nội đình chính tẩm', x: 0.50, y: 0.26, w: 0.14, h: 0.05, desc: 'Chính cung tẩm điện của Hoàng hậu Đại Minh, nơi thống lý nội chính, là động phòng khi Hoàng đế đại hôn.' },
        { name: 'Đông Lục Cung', zone: 'Đông Tây lục cung', x: 0.28, y: 0.33, w: 0.10, h: 0.12, desc: 'Đông lộ nội đình, quần thể tẩm cung của tần phi Hoàng đế.' },
        { name: 'Tây Lục Cung', zone: 'Đông Tây lục cung', x: 0.72, y: 0.33, w: 0.10, h: 0.12, desc: 'Tây lộ nội đình, quần thể tẩm cung của tần phi Hoàng đế.' },
        { name: 'Phụng Tiên Điện', zone: 'Đông Tây lục cung', x: 0.26, y: 0.445, w: 0.08, h: 0.055, desc: 'Gia miếu nội đình tế tự tổ tiên của hoàng thất nhà Minh, dịp sinh thần hay tiết khánh Hoàng đế tất đến đây tế bái.' },
        { name: 'Vũ Anh Điện', zone: 'Văn võ lưỡng dực', x: 0.76, y: 0.68, w: 0.10, h: 0.05, desc: 'Tiện điện nơi Hoàng đế trai cư, triệu kiến phụ thần. Cuối Minh cũng thường làm nơi san khắc lịch thư.' },
        { name: 'Văn Hoa Điện', zone: 'Văn võ lưỡng dực', x: 0.24, y: 0.68, w: 0.10, h: 0.05, desc: 'Nơi Hoàng đế cử hành Kinh diên giảng học (nghe nho thần giảng thụ kinh sử).' },
        { name: 'Văn Uyên Các', zone: 'Trọng địa/Nội Các', x: 0.24, y: 0.60, w: 0.08, h: 0.04, desc: 'Đại chính trung khu của nhà Minh! Trọng địa cốt lõi nơi Đại học sĩ (Nội Các phụ thần) đương trị biện công, tiến hành "Phiếu nghĩ".' },
        { name: 'Từ Khánh Cung', zone: 'Đông Cung/Thái hậu', x: 0.24, y: 0.535, w: 0.10, h: 0.06, desc: 'Còn gọi là Đoan Bản Cung, cuối Minh thường làm Đông Cung cư sở của Hoàng thái tử, Thái tử cư ngụ và tiếp nhận giáo dục tại đây.' },
        { name: 'Từ Ninh Cung', zone: 'Đông Cung/Thái hậu', x: 0.78, y: 0.46, w: 0.12, h: 0.08, desc: 'Cư sở chính quy dưỡng lão của các đời Hoàng thái hậu, Thái hoàng thái hậu nhà Minh.' },
        { name: 'Ngự Hoa Viên', zone: 'Vườn thượng uyển', x: 0.50, y: 0.18, w: 0.16, h: 0.05, desc: 'Khu lâm viên thư giãn bồi dưỡng tâm tính của hoàng thất, đình đài lầu các phong nhã thanh u.' },
        { name: 'Thần Vũ Môn', zone: 'Cổng thành/Tường bao', x: 0.50, y: 0.10, w: 0.18, h: 0.04, desc: 'Cửa bắc của Tử Cấm Thành (gọi là Huyền Vũ Môn thời Minh, thời Thanh kỵ húy đổi thành Thần Vũ Môn), thông thẳng ra Môi Sơn/Cảnh Sơn.' }
    ];

    let canvas, ctx;
    let transform = { x: 0, y: 0, scale: 1 };
    let isDragging = false;
    let dragStart = { x: 0, y: 0 };
    let hoveredBuilding = null;
    let userHasPannedOrZoomed = false;

    function initCanvas() {
        canvas = doc.getElementById('zjc-map-canvas');
        if (!canvas) return;
        ctx = canvas.getContext('2d');

        function resize() {
            const rect = canvas.getBoundingClientRect();
            if (rect.width === 0 || rect.height === 0) return;
            canvas.width = rect.width * (win.devicePixelRatio || 1);
            canvas.height = rect.height * (win.devicePixelRatio || 1);
            if (!userHasPannedOrZoomed) resetMapTransform();
            drawMap();
        }
        win.addEventListener('resize', resize);
        setTimeout(resize, 100);

        canvas.addEventListener('mousedown', (e) => {
            isDragging = true;
            dragStart = { x: e.clientX - transform.x, y: e.clientY - transform.y };
        });

        win.addEventListener('mousemove', (e) => {
            if (isDragging) {
                userHasPannedOrZoomed = true;
                transform.x = e.clientX - dragStart.x;
                transform.y = e.clientY - dragStart.y;
                drawMap();
            } else {
                handleHover(e);
            }
        });

        win.addEventListener('mouseup', () => { isDragging = false; });

        canvas.addEventListener('wheel', (e) => {
            e.preventDefault();
            userHasPannedOrZoomed = true;
            const rect = canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
            const newScale = clamp(transform.scale * zoomFactor, 0.5, 4.0);

            transform.x = mouseX - (mouseX - transform.x) * (newScale / transform.scale);
            transform.y = mouseY - (mouseY - transform.y) * (newScale / transform.scale);
            transform.scale = newScale;

            drawMap();
            handleHover(e);
        }, { passive: false });

        let touchStartDist = 0;
        canvas.addEventListener('touchstart', (e) => {
            if (e.touches.length === 1) {
                isDragging = true;
                dragStart = { x: e.touches[0].clientX - transform.x, y: e.touches[0].clientY - transform.y };
            } else if (e.touches.length === 2) {
                isDragging = false;
                touchStartDist = Math.hypot(
                    e.touches[0].clientX - e.touches[1].clientX,
                    e.touches[0].clientY - e.touches[1].clientY
                );
            }
        });

        canvas.addEventListener('touchmove', (e) => {
            if (isDragging && e.touches.length === 1) {
                userHasPannedOrZoomed = true;
                transform.x = e.touches[0].clientX - dragStart.x;
                transform.y = e.touches[0].clientY - dragStart.y;
                drawMap();
            } else if (e.touches.length === 2) {
                userHasPannedOrZoomed = true;
                const dist = Math.hypot(
                    e.touches[0].clientX - e.touches[1].clientX,
                    e.touches[0].clientY - e.touches[1].clientY
                );
                if (touchStartDist > 0) {
                    const factor = dist / touchStartDist;
                    transform.scale = clamp(transform.scale * factor, 0.5, 4.0);
                    drawMap();
                }
                touchStartDist = dist;
            }
        }, { passive: false });

        canvas.addEventListener('touchend', () => { isDragging = false; touchStartDist = 0; });

        doc.getElementById('zjc-btn-reset')?.addEventListener('click', () => {
            resetMapTransform();
            drawMap();
        });
    }

    function resetMapTransform() {
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        const baseW = 800, baseH = 1100;
        const scale = Math.min(rect.width / baseW, rect.height / baseH) * 0.95;
        transform = {
            scale: scale,
            x: (rect.width - baseW * scale) / 2,
            y: (rect.height - baseH * scale) / 2
        };
        userHasPannedOrZoomed = false;
    }

    function handleHover(e) {
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX - rect.left - transform.x) / transform.scale;
        const y = (e.clientY - rect.top - transform.y) / transform.scale;

        const baseW = 800, baseH = 1100;
        let found = null;

        for (const b of BUILDINGS) {
            const bx = b.x * baseW;
            const by = b.y * baseH;
            const bw = b.w * baseW;
            const bh = b.h * baseH;

            if (x >= bx - bw / 2 && x <= bx + bw / 2 && y >= by - bh / 2 && y <= by + bh / 2) {
                found = b;
                break;
            }
        }

        if (found !== hoveredBuilding) {
            hoveredBuilding = found;
            drawMap();

            const tooltip = doc.getElementById('zjc-tooltip');
            if (found) {
                doc.getElementById('zjc-tt-title').innerText = found.name;
                doc.getElementById('zjc-tt-desc').innerText = found.desc;
                tooltip.style.display = 'block';
                tooltip.style.left = `${e.clientX - rect.left}px`;
                tooltip.style.top = `${e.clientY - rect.top}px`;
            } else {
                tooltip.style.display = 'none';
            }
        } else if (found) {
            const tooltip = doc.getElementById('zjc-tooltip');
            tooltip.style.left = `${e.clientX - rect.left}px`;
            tooltip.style.top = `${e.clientY - rect.top}px`;
        }
    }

    function drawMap() {
        if (!ctx || !canvas) return;
        const dpr = win.devicePixelRatio || 1;
        ctx.save();
        ctx.scale(dpr, dpr);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.translate(transform.x, transform.y);
        ctx.scale(transform.scale, transform.scale);

        const baseW = 800, baseH = 1100;

        // Thành tường
        ctx.strokeStyle = 'rgba(205, 170, 111, 0.4)';
        ctx.lineWidth = 4;
        ctx.strokeRect(40, 40, baseW - 80, baseH - 80);

        // Hộ thành hà
        ctx.strokeStyle = 'rgba(78, 138, 117, 0.3)';
        ctx.lineWidth = 8;
        ctx.strokeRect(20, 20, baseW - 40, baseH - 40);

        // Trục trung tâm
        ctx.strokeStyle = 'rgba(181, 77, 57, 0.25)';
        ctx.lineWidth = 2;
        ctx.setLineDash([6, 6]);
        ctx.beginPath();
        ctx.moveTo(baseW / 2, 40);
        ctx.lineTo(baseW / 2, baseH - 40);
        ctx.stroke();
        ctx.setLineDash([]);

        // Vẽ các cung điện
        for (const b of BUILDINGS) {
            const bx = b.x * baseW;
            const by = b.y * baseH;
            const bw = b.w * baseW;
            const bh = b.h * baseH;

            const isHovered = (hoveredBuilding === b);

            ctx.fillStyle = isHovered ? 'rgba(199, 155, 93, 0.4)' : 'rgba(30, 20, 15, 0.7)';
            ctx.strokeStyle = isHovered ? '#fff0d2' : 'rgba(199, 155, 93, 0.6)';
            ctx.lineWidth = isHovered ? 2 : 1;

            ctx.beginPath();
            ctx.roundRect(bx - bw / 2, by - bh / 2, bw, bh, 4);
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = isHovered ? '#fff0d2' : '#ead9ba';
            ctx.font = `${isHovered ? 'bold ' : ''}12px 'Noto Serif SC', serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(b.name, bx, by);
        }

        ctx.restore();
    }

    // ==========================================
    // 7. Logic điều hướng và chuyển đổi Tab
    // ==========================================
    function switchTab(tabName) {
        doc.querySelectorAll('.zjc-nav button').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-tab') === tabName);
        });
        doc.querySelectorAll('.zjc-panel').forEach(p => {
            p.classList.toggle('active', p.id === `panel-${tabName}`);
        });

        if (tabName === 'overview') renderOverview();
        else if (tabName === 'government') renderGovernment();
        else if (tabName === 'assets') renderAssets();
        else if (tabName === 'tech') renderTech();
        else if (tabName === 'factions') renderFactions();
        else if (tabName === 'military') renderMilitary();
        else if (tabName === 'officials') renderOfficials();
        else if (tabName === 'enemies') renderEnemies();
        else if (tabName === 'harem') renderHarem();
        else if (tabName === 'royal') renderRoyal();

        win.localStorage.setItem(TAB_KEY, tabName);
    }

    // ==========================================
    // 8. Đăng ký sự kiện (Event Delegation)
    // ==========================================
    modal.addEventListener('click', async (e) => {
        const btn = e.target.closest('button, [data-action], [data-view], .cwe-event-row');
        if (!btn) return;

        // Chuyển view ở Sidebar Bản đồ / Quan chế
        const viewType = btn.getAttribute('data-view');
        if (viewType && btn.closest('.zjc-map-tabs:not(#zjc-assets-tabs)')) {
            doc.querySelectorAll('.zjc-map-tabs:not(#zjc-assets-tabs) button').forEach(b => b.classList.toggle('active', b === btn));
            doc.getElementById('zjc-canvas-container').classList.toggle('active', viewType === 'map');
            doc.getElementById('zjc-org-container').classList.toggle('active', viewType === 'org');
            if (viewType === 'org') renderOrgTree();
            else drawMap();
            return;
        }

        // Chuyển view Sản nghiệp / Lương thảo
        if (viewType && btn.closest('#zjc-assets-tabs')) {
            doc.querySelectorAll('#zjc-assets-tabs button').forEach(b => b.classList.toggle('active', b === btn));
            doc.querySelectorAll('.zjc-assets-view').forEach(v => v.style.display = 'none');
            const targetView = doc.getElementById(`view-${viewType}`);
            if (targetView) targetView.style.display = 'block';
            renderAssets();
            return;
        }

        // Chuyển Tab nội dung
        const tabName = btn.getAttribute('data-tab');
        if (tabName) {
            switchTab(tabName);
            return;
        }

        // Xem chân dung
        const portraitName = btn.getAttribute('data-portrait-name');
        if (portraitName) {
            e.stopPropagation();
            modalState = { type: 'portrait', name: portraitName, catIdx: 0 };
            renderZjcModal();
            return;
        }

        // Xem hồ sơ nhân vật (Lore)
        const loreName = btn.getAttribute('data-lore-name');
        if (loreName) {
            e.stopPropagation();
            modalState = { type: 'lore', name: loreName };
            renderZjcModal();
            return;
        }

        const action = btn.getAttribute('data-action');

        // Đóng modal chi tiết
        if (action === 'close-modal') {
            modalState = null;
            renderZjcModal();
            return;
        }

        // Chuyển ảnh chân dung trước/sau
        if (action === 'portrait-prev' || action === 'portrait-next') {
            e.stopPropagation();
            if (modalState?.type === 'portrait') {
                const imgs = getAllPortraitData()[modalState.name];
                if (imgs) {
                    const total = Object.keys(imgs).length;
                    if (action === 'portrait-prev') modalState.catIdx = (modalState.catIdx - 1 + total) % total;
                    else modalState.catIdx = (modalState.catIdx + 1) % total;
                    renderZjcModal();
                }
            }
            return;
        }

        // Mở popup Quân phủ thiêm áp
        if (action === 'open-military-command') {
            const campName = btn.getAttribute('data-camp-name');
            modalState = { type: 'military-command', campName };
            renderZjcModal();
            return;
        }

        // Thực thi quote lệnh quân vụ
        if (action === 'military-quote') {
            const command = btn.getAttribute('data-command');
            const modalBody = btn.closest('.cm-command-modal');
            const general = modalBody?.querySelector('[data-military-general]')?.value;
            const targetTier = modalBody?.querySelector('[data-refit-tier]')?.value;
            const loadout = modalBody?.querySelector('[data-refit-loadout]')?.value;

            try {
                const quote = buildMilitaryCommandQuote(statData, modalState.campName, command, { general, targetTier, loadout });
                const confirmMsg = militaryCommandPreview(quote);
                modalState = {
                    type: 'confirm',
                    title: `Quân vụ xác nhận · ${quote.label}`,
                    message: confirmMsg,
                    onOk: () => executeMilitaryCommand(quote)
                };
                renderZjcModal();
            } catch (err) {
                showToast(`✗ Không thể hạch toán: ${err?.message || 'Lỗi chưa rõ'}`);
            }
            return;
        }

        // Xác nhận OK trong confirm popup
        if (action === 'confirm-ok') {
            if (modalState?.onOk) await modalState.onOk();
            return;
        }

        // Đình chỉ quân lệnh
        if (action === 'cancel-military-order') {
            const orderId = btn.getAttribute('data-order-id');
            modalState = {
                type: 'confirm',
                title: 'Đình chỉ quân lệnh',
                message: 'Đình chỉ quân lệnh này sẽ khiến tiến độ bị hủy bỏ và quân nhu đã cấp phát sẽ không hoàn lại.\n\nBạn có chắc chắn muốn đình chỉ?',
                onOk: () => cancelMilitaryOrder(orderId)
            };
            renderZjcModal();
            return;
        }

        // Xóa một mục khỏi statData
        if (action === 'delete-item') {
            const path = btn.getAttribute('data-path');
            const key = btn.getAttribute('data-key');
            modalState = {
                type: 'confirm',
                title: 'Xác nhận xóa',
                message: `Bạn có chắc chắn muốn xóa bản ghi [${key}]? Thao tác này không thể hoàn tác.`,
                onOk: async () => {
                    statData = getMvuData() || {};
                    const parent = get(statData, path);
                    if (parent && parent[key]) {
                        delete parent[key];
                        await saveMvuData(statData);
                        showToast(`✓ Đã xóa [${key}]`);
                        modalState = null;
                        renderZjcModal();
                        const activeTab = doc.querySelector('.zjc-nav button.active')?.getAttribute('data-tab') || 'overview';
                        switchTab(activeTab);
                    }
                }
            };
            renderZjcModal();
            return;
        }

        // Click xem thế lực
        const powerName = btn.getAttribute('data-power-name');
        if (powerName) {
            modalState = { type: 'power', name: powerName };
            renderZjcModal();
            return;
        }

        // Click xem chi tiết tư duy hậu cung
        const privateName = btn.getAttribute('data-private-name');
        if (privateName && !btn.closest('.cwe-command-actions')) {
            modalState = { type: 'private', name: privateName };
            renderZjcModal();
            return;
        }
    });

    // Lắng nghe tìm kiếm & sắp xếp
    modal.addEventListener('input', (e) => {
        if (e.target.classList.contains('zjc-search')) {
            const type = e.target.getAttribute('data-type');
            if (type === 'officials') renderOfficials();
            else if (type === 'enemies') renderEnemies();
            else if (type === 'harem') renderHarem();
            else if (type === 'royal') renderRoyal();
            else if (type === 'government') renderGovernment();
            else if (type === 'assets') renderAssets();
            else if (type === 'tech') renderTech();
            else if (type === 'factions') renderFactions();
            else if (type === 'military') renderMilitary();
        }
    });

    modal.addEventListener('change', (e) => {
        if (e.target.classList.contains('zjc-sort')) {
            const type = e.target.getAttribute('data-type');
            if (type === 'officials') renderOfficials();
            else if (type === 'enemies') renderEnemies();
            else if (type === 'harem') renderHarem();
            else if (type === 'royal') renderRoyal();
        }
    });

    // Nút đóng
    doc.getElementById('zjc-btn-close')?.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    // Chuyển đổi Dark / Light Theme
    const THEME_KEY = 'zjc-map-theme';
    const btnTheme = doc.getElementById('zjc-btn-theme');
    let isLight = win.localStorage.getItem(THEME_KEY) === 'light';

    function applyTheme() {
        const panel = modal.querySelector('.cwe-panel');
        if (isLight) {
            panel?.classList.add('zjc-light-theme');
            lamp.classList.add('zjc-light-theme');
            if (btnTheme) btnTheme.innerText = '☀️ Ban ngày';
        } else {
            panel?.classList.remove('zjc-light-theme');
            lamp.classList.remove('zjc-light-theme');
            if (btnTheme) btnTheme.innerText = '🌙 Đêm tối';
        }
    }
    applyTheme();

    btnTheme?.addEventListener('click', () => {
        isLight = !isLight;
        win.localStorage.setItem(THEME_KEY, isLight ? 'light' : 'dark');
        applyTheme();
    });

    // Thu gọn / Mở rộng sidebar bản đồ trên mobile
    const mapSidebar = doc.getElementById('zjc-map-sidebar');
    const mapToggle = doc.getElementById('zjc-map-toggle');
    const mapToggleIcon = doc.getElementById('zjc-map-toggle-icon');

    mapToggle?.addEventListener('click', () => {
        const isExp = mapSidebar.classList.toggle('expanded');
        mapToggleIcon.innerText = isExp ? '▲ Thu gọn' : '▼ Nhấn để mở';
        if (isExp) {
            setTimeout(() => {
                const activeView = doc.querySelector('.zjc-map-tabs:not(#zjc-assets-tabs) button.active')?.getAttribute('data-view') || 'map';
                if (activeView === 'map') {
                    resetMapTransform();
                    drawMap();
                } else {
                    renderOrgTree();
                }
            }, 100);
        }
    });

    // ==========================================
    // 9. Đèn lồng trôi nổi & Khởi tạo (Floating Button)
    // ==========================================
    function initLampDrag() {
        let isDragging = false;
        let startX, startY;
        let origX, origY;
        let hasMoved = false;

        const size = 52;
        lamp.style.width = `${size}px`;
        lamp.style.height = `${size}px`;
        lamp.style.borderRadius = '50%';
        lamp.style.fontSize = '24px';

        const savedPos = win.localStorage.getItem(POS_KEY);
        if (savedPos) {
            try {
                const { x, y } = JSON.parse(savedPos);
                const maxX = win.innerWidth - size;
                const maxY = win.innerHeight - size;
                lamp.style.left = `${clamp(x, 0, maxX)}px`;
                lamp.style.top = `${clamp(y, 0, maxY)}px`;
            } catch (e) {
                setDefaultPos();
            }
        } else {
            setDefaultPos();
        }

        function setDefaultPos() {
            lamp.style.right = '24px';
            lamp.style.bottom = '80px';
            lamp.style.left = 'auto';
            lamp.style.top = 'auto';
        }

        function onStart(e) {
            isDragging = true;
            hasMoved = false;
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            startX = clientX;
            startY = clientY;
            const rect = lamp.getBoundingClientRect();
            origX = rect.left;
            origY = rect.top;
        }

        function onMove(e) {
            if (!isDragging) return;
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            const dx = clientX - startX;
            const dy = clientY - startY;

            if (Math.abs(dx) > 4 || Math.abs(dy) > 4) hasMoved = true;

            const maxX = win.innerWidth - size;
            const maxY = win.innerHeight - size;

            lamp.style.right = 'auto';
            lamp.style.bottom = 'auto';
            lamp.style.left = `${clamp(origX + dx, 0, maxX)}px`;
            lamp.style.top = `${clamp(origY + dy, 0, maxY)}px`;
        }

        function onEnd() {
            if (!isDragging) return;
            isDragging = false;
            if (hasMoved) {
                const rect = lamp.getBoundingClientRect();
                win.localStorage.setItem(POS_KEY, JSON.stringify({ x: rect.left, y: rect.top }));
            }
        }

        lamp.addEventListener('mousedown', onStart);
        win.addEventListener('mousemove', onMove);
        win.addEventListener('mouseup', onEnd);

        lamp.addEventListener('touchstart', onStart, { passive: true });
        win.addEventListener('touchmove', onMove, { passive: true });
        win.addEventListener('touchend', onEnd);

        lamp.addEventListener('click', () => {
            if (hasMoved) return;
            modal.classList.add('active');
            statData = getMvuData() || {};
            const lastTab = win.localStorage.getItem(TAB_KEY) || 'overview';
            switchTab(lastTab);
            setTimeout(() => {
                initCanvas();
                resetMapTransform();
                drawMap();
            }, 100);
        });
    }

    initLampDrag();
})();
