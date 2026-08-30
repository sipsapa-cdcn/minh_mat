import { registerMvuSchema } from 'https://testingcf.jsdelivr.net/gh/StageDog/tavern_resource/dist/util/mvu_zod.js';

(async () => {
    // ==========================================
    // 0. CÔ LẬP MÔI TRƯỜNG & TRÍCH XUẤT GIAO DIỆN HỆ THỐNG
    // ==========================================
    const win = (() => { try { return window.parent && window.parent !== window ? window.parent : window } catch { return window } })();
    const doc = win.document ?? document;

    function getST(key) {
        return globalThis[key] ?? win[key] ?? window[key];
    }

    const LAMP_ID = 'sys-mall-lamp';
    const MODAL_ID = 'sys-mall-modal';
    const STYLE_ID = 'sys-mall-style';
    const SETTINGS_KEY = 'canming-sys-mall:settings';
    const POS_KEY = 'sys-mall-lamp-pos';
    const SHELF_KEY = 'sys-mall-shelf'; // Khóa lưu trữ đệm kệ hàng cục bộ

    // ==========================================
    // 1. ĐĂNG KÝ CẤU TRÚC BIẾN MVU
    // ==========================================
    try {
        const zLib = getST('zod') ?? getST('z');
        if (zLib) {
            const zObj = zLib.z ? zLib.z : zLib;
            const mallSchema = zObj.object({
                'Hệ thống thương thành': zObj.any().optional()
            }).optional();
            registerMvuSchema(mallSchema);
        }
    } catch (e) {
        console.warn("[Hệ thống thương thành] Bỏ qua đăng ký cấu trúc biến MVU, nguyên nhân: ", e);
    }

    // ==========================================
    // 2. THIẾT LẬP CỤC BỘ & PROMPT ĐA ĐỘ KHÓ
    // ==========================================
    const MALL_PROMPTS = {
        easy: `Ngươi là AI Hệ Thống Thương Thành. Bối cảnh: 【{currentTimeStr}】. Hãy tạo ra đúng {itemCount} vật phẩm thuộc vũ trụ vật lý thuần túy (nghiêm cấm ma pháp huyền huyễn).

【QUY TẮC CỐT LÕI: CHẾ ĐỘ ĐƠN GIẢN】
1.【Nguyên tắc mặc định đơn chiếc】: Trừ khi khách hàng nêu rõ số lượng trong yêu cầu (như "100 khẩu", "một rương"), nếu không số lượng mặc định bắt buộc phải là 1! Không được tự ý tạo nhiều món!
2.【Nguyên tắc đơn giá tuyệt đối】: Khung trị số trong bảng dưới đây đều là đơn giá của 【ĐƠN CHIẾC】! Đẳng cấp và đơn giá vật phẩm chỉ được quyết định bởi hàm lượng khoa kỹ vốn có của nó.
3.【Quy tắc nhân bội số hàng loạt】: Nếu khách hàng yêu cầu nhiều món rõ ràng, bắt buộc thực thi 【Đơn giá × Số lượng = Tổng giá】! Tổng giá được phép vượt qua giới hạn trần của đơn chiếc.
4.【Quy tắc đặt tên thương phẩm】: Nếu số lượng là 1, tên thương phẩm ghi trực tiếp tên vật phẩm (như "Súng ngắn"); nếu số lượng lớn hơn 1, tên thương phẩm 【BẮT BUỘC】 mang theo số lượng (như "1000 khẩu súng ngắn")!

| Đẳng cấp | Phân loại khoa kỹ vốn có (Bỏ qua thời đại) | Tiền tệ cho phép | Khung trị số cưỡng chế 【ĐƠN CHIẾC】 & Điểm neo nội bộ |
|---|---|---|---|
| Bậc 1 | Vật tư lạc hậu thông thường (Nông sản, vải vóc, vũ khí lạnh) | Tiền đồng | 1~50 (Lương thực nước uống cơ bản 1~10, vũ khí lạnh/y phục thông thường 10~30, vũ khí lạnh tinh lương 30~50) |
| Bậc 2 | Cải tiến / Công nghiệp sơ khai (Giống tốt, muối tinh, bản vẽ) | Bạch ngân | 1~20 (Giống tốt/gia vị cơ bản 1~5, phẩm vật công nghiệp sơ khai/bản vẽ 5~10, bản vẽ cơ giới tinh mật 10~20) |
| Bậc 3 | Cao kỹ thuật Hiện đại / Tương lai (Súng đạn, kháng sinh) | Hoàng kim | 1~1000 (Vũ khí nhẹ cơ bản/thuốc thường dùng 1~10, hỏa lực hạng nặng/phương tiện nhỏ 50~200, tạo vật khoa học viễn tưởng 500~1000) |

【BƯỚC 1: MẪU BẢN THẢO BẮT BUỘC】
Trước khi xuất JSON, bắt buộc phải rà soát từng món trong thẻ <thinking>, định dạng phải nghiêm ngặt như sau:
<thinking>
1. Vật phẩm:[Thô bố ma y] | Kích hoạt:[Khách không yêu cầu số lượng, mặc định 1 kiện] | Khoa kỹ:[Bậc 1] | Đơn giá:[Tiền đồng 15] | Tính toán:[15 × 1 = 15] | Tên định danh cuối:[Thô bố ma y] | Tổng giá cuối:[Tiền đồng 15]
2. Vật phẩm:[Súng ngắn Colt] | Kích hoạt:[Khách không yêu cầu số lượng, mặc định 1 kiện] | Khoa kỹ:[Bậc 3] | Đơn giá:[Hoàng kim 5] | Tính toán:[5 × 1 = 5] | Tên định danh cuối:[Súng ngắn Colt] | Tổng giá cuối:[Hoàng kim 5]
3. Vật phẩm:[Lựu đạn nổ mạnh] | Kích hoạt:[Giả định khách yêu cầu rõ 50 quả] | Khoa kỹ:[Bậc 3] | Đơn giá:[Hoàng kim 2] | Tính toán:[2 × 50 = 100] | Tên định danh cuối:[50 quả lựu đạn nổ mạnh] | Tổng giá cuối:[Hoàng kim 100]
</thinking>

【BƯỚC 2: MẪU ĐẦU RA CUỐI CÙNG】
{
  "Tên định danh thương phẩm cuối cùng": { "Đẳng cấp sở thuộc": "Đẳng cấp tương ứng", "Giới thiệu": "Mô tả vật phẩm, nếu có nhiều món cần nhắc tới tổng số.", "Giá cả_Loại hình": "Tiền tệ", "Giá cả_Trị số": Trị số tổng giá cuối cùng }
}`,

        normal: `Ngươi là AI Hệ Thống Thương Thành. Bối cảnh: 【{currentTimeStr}】. Hãy tạo ra đúng {itemCount} vật phẩm thuộc vũ trụ vật lý thuần túy (nghiêm cấm ma pháp huyền huyễn).

【QUY TẮC CỐT LÕI: CHẾ ĐỘ BÌNH THƯỜNG】
1.【Nguyên tắc mặc định đơn chiếc】: Trừ khi khách hàng nêu rõ số lượng trong yêu cầu (như "100 khẩu", "một rương"), nếu không số lượng mặc định bắt buộc phải là 1! Không được tự ý tạo nhiều món!
2.【Nguyên tắc đơn giá tuyệt đối】: Khung trị số trong bảng dưới đây đều là đơn giá của 【ĐƠN CHIẾC】! Đẳng cấp và đơn giá vật phẩm chỉ được quyết định bởi hàm lượng khoa kỹ vốn có của nó.
3.【Quy tắc nhân bội số hàng loạt】: Nếu khách hàng yêu cầu nhiều món rõ ràng, bắt buộc thực thi 【Đơn giá × Số lượng = Tổng giá】! Tổng giá được phép vượt qua giới hạn trần của đơn chiếc.
4.【Quy tắc đặt tên thương phẩm】: Nếu số lượng là 1, tên thương phẩm ghi trực tiếp tên vật phẩm (như "Súng ngắn"); nếu số lượng lớn hơn 1, tên thương phẩm 【BẮT BUỘC】 mang theo số lượng (như "1000 khẩu súng ngắn")!

| Đẳng cấp | Phân loại khoa kỹ vốn có (Bỏ qua thời đại) | Tiền tệ cho phép | Khung trị số cưỡng chế 【ĐƠN CHIẾC】 & Điểm neo nội bộ |
|---|---|---|---|
| Bậc 1 | Vật tư lạc hậu thông thường (Nông sản, vải vóc, vũ khí lạnh) | Tiền đồng hoặc Bạch ngân | Tiền đồng 10~200 (Lương thực nước uống 10~50, vũ khí lạnh 50~200) hoặc Bạch ngân 1~10 (Vũ khí lạnh cực phẩm) |
| Bậc 2 | Cải tiến / Công nghiệp sơ khai (Giống tốt, muối tinh, bản vẽ) | Bạch ngân hoặc Hoàng kim | Bạch ngân 10~100 (Giống tốt/đồ công nghiệp sinh hoạt) hoặc Hoàng kim 1~20 (Bản vẽ kỹ thuật then chốt/máy móc) |
| Bậc 3 | Cao kỹ thuật Hiện đại / Tương lai (Súng đạn, kháng sinh) | Hoàng kim | 20~10000 (Vũ khí nhẹ cơ bản/thuốc thường dùng 20~100, vũ khí nặng/phương tiện 500~2000, tạo vật khoa học viễn tưởng 5000~10000) |

【BƯỚC 1: MẪU BẢN THẢO BẮT BUỘC】
Trước khi xuất JSON, bắt buộc phải rà soát từng món trong thẻ <thinking>, định dạng phải nghiêm ngặt như sau:
<thinking>
1. Vật phẩm:[Thô bố ma y] | Kích hoạt:[Khách không yêu cầu số lượng, mặc định 1 kiện] | Khoa kỹ:[Bậc 1] | Đơn giá:[Tiền đồng 40] | Tính toán:[40 × 1 = 40] | Tên định danh cuối:[Thô bố ma y] | Tổng giá cuối:[Tiền đồng 40]
2. Vật phẩm:[Súng ngắn Glock] | Kích hoạt:[Khách không yêu cầu số lượng, mặc định 1 kiện] | Khoa kỹ:[Bậc 3] | Đơn giá:[Hoàng kim 50] | Tính toán:[50 × 1 = 50] | Tên định danh cuối:[Súng ngắn Glock] | Tổng giá cuối:[Hoàng kim 50]
3. Vật phẩm:[Penicillin] | Kích hoạt:[Giả định khách yêu cầu rõ 10 hộp] | Khoa kỹ:[Bậc 3] | Đơn giá:[Hoàng kim 20] | Tính toán:[20 × 10 = 200] | Tên định danh cuối:[10 hộp Penicillin] | Tổng giá cuối:[Hoàng kim 200]
</thinking>

【BƯỚC 2: MẪU ĐẦU RA CUỐI CÙNG】
{
  "Tên định danh thương phẩm cuối cùng": { "Đẳng cấp sở thuộc": "Đẳng cấp tương ứng", "Giới thiệu": "Mô tả vật phẩm, nếu có nhiều món cần nhắc tới tổng số.", "Giá cả_Loại hình": "Tiền tệ", "Giá cả_Trị số": Trị số tổng giá cuối cùng }
}`,

        hard: `Ngươi là AI Hệ Thống Thương Thành. Bối cảnh: 【{currentTimeStr}】. Hãy tạo ra đúng {itemCount} vật phẩm thuộc vũ trụ vật lý thuần túy (nghiêm cấm ma pháp huyền huyễn).

【QUY TẮC CỐT LÕI: CHẾ ĐỘ KHÓ KHĂN】
1.【Nguyên tắc mặc định đơn chiếc】: Trừ khi khách hàng nêu rõ số lượng trong yêu cầu (như "100 khẩu", "một rương"), nếu không số lượng mặc định bắt buộc phải là 1! Không được tự ý tạo nhiều món!
2.【Nguyên tắc đơn giá tuyệt đối】: Khung trị số trong bảng dưới đây đều là đơn giá của 【ĐƠN CHIẾC】! Đẳng cấp và đơn giá vật phẩm chỉ được quyết định bởi hàm lượng khoa kỹ vốn có của nó.
3.【Quy tắc nhân bội số hàng loạt】: Nếu khách hàng yêu cầu nhiều món rõ ràng, bắt buộc thực thi 【Đơn giá × Số lượng = Tổng giá】! Tổng giá được phép vượt qua giới hạn trần của đơn chiếc.
4.【Quy tắc đặt tên thương phẩm】: Nếu số lượng là 1, tên thương phẩm ghi trực tiếp tên vật phẩm (như "Súng ngắn"); nếu số lượng lớn hơn 1, tên thương phẩm 【BẮT BUỘC】 mang theo số lượng (như "1000 khẩu súng ngắn")!

| Đẳng cấp | Phân loại khoa kỹ vốn có (Bỏ qua thời đại) | Tiền tệ cho phép | Khung trị số cưỡng chế 【ĐƠN CHIẾC】 & Điểm neo nội bộ |
|---|---|---|---|
| Bậc 1 | Vật tư lạc hậu thông thường (Nông sản, vải vóc, vũ khí lạnh) | Tiền đồng hoặc Bạch ngân | Tiền đồng 10~500 (Vật tư cơ bản 10~100, binh khí 100~500) hoặc Bạch ngân 1~50 (Vật tư số lượng lớn) |
| Bậc 2 | Cải tiến / Công nghiệp sơ khai (Giống tốt, muối tinh, bản vẽ) | Bạch ngân hoặc Hoàng kim | Bạch ngân 50~500 (Giống tốt/công nghiệp nhật dụng) hoặc Hoàng kim 1~100 (Cơ giới công nghiệp/bản vẽ) |
| Bậc 3 | Cao kỹ thuật Hiện đại / Tương lai (Súng đạn, kháng sinh) | Hoàng kim | 100~1000000 (Vũ khí nhẹ cơ bản/dược phẩm 100~500, vũ khí nặng/phương tiện 5000~20000, tạo vật khoa học viễn tưởng trên 100000) |

【BƯỚC 1: MẪU BẢN THẢO BẮT BUỘC】
Trước khi xuất JSON, bắt buộc phải rà soát từng món trong thẻ <thinking>, định dạng phải nghiêm ngặt như sau:
<thinking>
1. Vật phẩm:[Bánh mì đen] | Kích hoạt:[Khách không yêu cầu số lượng, mặc định 1 kiện] | Khoa kỹ:[Bậc 1] | Đơn giá:[Tiền đồng 80] | Tính toán:[80 × 1 = 80] | Tên định danh cuối:[Bánh mì đen thông thường] | Tổng giá cuối:[Tiền đồng 80]
2. Vật phẩm:[Súng trường AK47] | Kích hoạt:[Khách không yêu cầu số lượng, mặc định 1 kiện] | Khoa kỹ:[Bậc 3] | Đơn giá:[Hoàng kim 200] | Tính toán:[200 × 1 = 200] | Tên định danh cuối:[Súng trường tấn công AK47] | Tổng giá cuối:[Hoàng kim 200]
3. Vật phẩm:[Giáp ngoại cốt cách] | Kích hoạt:[Giả định khách yêu cầu rõ 5 bộ] | Khoa kỹ:[Bậc 3] | Đơn giá:[Hoàng kim 100000] | Tính toán:[100000 × 5 = 500000] | Tên định danh cuối:[5 bộ giáp ngoại cốt cách] | Tổng giá cuối:[Hoàng kim 500000]
</thinking>

【BƯỚC 2: MẪU ĐẦU RA CUỐI CÙNG】
{
  "Tên định danh thương phẩm cuối cùng": { "Đẳng cấp sở thuộc": "Đẳng cấp tương ứng", "Giới thiệu": "Mô tả vật phẩm, nếu có nhiều món cần nhắc tới tổng số.", "Giá cả_Loại hình": "Tiền tệ", "Giá cả_Trị số": Trị số tổng giá cuối cùng }
}`
    };

    const defaultSettings = { 
        difficulty: 'normal',
        connectionMode: 'tavern', 
        apiUrl: '', apiKey: '', model: '', apiSource: 'openai',
        temperature: 0.8, maxTokens: 1500, topP: 0.9, frequencyPenalty: 0, presencePenalty: 0,
        itemCount: 10,
        customPrompt: MALL_PROMPTS['normal']
    };

    function getSettings() {
        try {
            const data = win.localStorage.getItem(SETTINGS_KEY);
            return data ? { ...defaultSettings, ...JSON.parse(data) } : defaultSettings;
        } catch {
            return defaultSettings;
        }
    }

    function saveSettings(settings) {
        try { win.localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings)); } catch (e) {}
    }

    // --- HỆ THỐNG THÔNG BÁO NỔI (TOAST) THƯƠNG THÀNH ---
    function showMallToast(message, type = 'info') {
        const win = (() => { try { return window.parent && window.parent !== window ? window.parent : window } catch { return window } })();
        const doc = win.document ?? document;
        let container = doc.getElementById('sys-mall-toast-container');
        if (!container) {
            container = doc.createElement('div');
            container.id = 'sys-mall-toast-container';
            const style = doc.createElement('style');
            style.textContent = `
                #sys-mall-toast-container { position: fixed; top: 20px; left: 50%; transform: translateX(-50%); z-index: 2147483647; display: flex; flex-direction: column; gap: 10px; pointer-events: none; }
                .sys-mall-toast { min-width: 220px; padding: 12px 20px; border-radius: 8px; color: #fff; font-size: 14px; font-weight: bold; text-align: center; font-family: "Noto Serif SC", "Songti SC", serif; box-shadow: 0 4px 16px rgba(0,0,0,0.6); animation: sm-toast-in 0.3s ease-out forwards; border: 1px solid rgba(255,255,255,0.2); }
                .sys-mall-toast.sm-toast-success { background: rgba(111, 138, 103, 0.95); border-color: #89a074; }
                .sys-mall-toast.sm-toast-warning { background: rgba(208, 120, 75, 0.95); border-color: #edc480; }
                .sys-mall-toast.sm-toast-error { background: rgba(200, 83, 64, 0.95); border-color: #e57373; }
                .sys-mall-toast.sm-toast-info { background: rgba(74, 85, 85, 0.95); border-color: #8a9a9a; }
                .sys-mall-toast.sm-toast-fadeout { animation: sm-toast-out 0.3s ease-in forwards; }
                @keyframes sm-toast-in { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes sm-toast-out { from { opacity: 1; transform: translateY(0); } to { opacity: 0; transform: translateY(-20px); } }
            `;
            doc.head.appendChild(style);
            doc.body.appendChild(container);
        }
        const toast = doc.createElement('div');
        toast.className = `sys-mall-toast sm-toast-${type}`;
        toast.innerText = message;
        container.appendChild(toast);
        setTimeout(() => {
            toast.classList.add('sm-toast-fadeout');
            toast.addEventListener('animationend', () => toast.remove());
        }, 2500);
    }

    // ==========================================
    // 3. ĐỌC GHI DỮ LIỆU & LOGIC HỆ THỐNG
    // ==========================================
    function getMvuData() {
        const Mvu = getST('Mvu');
        if (!Mvu) return null;
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

    function getCurrentTimeStr(data) {
        try {
            const world = data?.['Thế giới vận hành'];
            if (world && world['Ngày hiện tại']) {
                const date = world['Ngày hiện tại'];
                const shichen = world['Mười hai canh giờ']?.['Canh giờ'] || '';
                const ke = world['Mười hai canh giờ']?.['Khắc'] !== undefined ? `${world['Mười hai canh giờ']['Khắc']}` : '';
                return `${date} ${shichen} ${ke}`.trim();
            }
        } catch (e) {}
        return 'Niên đại cổ đại chưa rõ';
    }

    function extractJSON(text) {
        const start = text.indexOf('{');
        const end = text.lastIndexOf('}');
        if (start >= 0 && end > start) {
            try { return JSON.parse(text.slice(start, end + 1)); } catch(e) {}
        }
        throw new Error('Nội dung AI trả về không thể phân tích cú pháp thành JSON hợp lệ.');
    }

    async function refreshItems(userRequest = '') {
        const settings = getSettings();
        const itemCount = settings.itemCount || 10;
        
        const currentData = getMvuData() || {};
        const currentTimeStr = getCurrentTimeStr(currentData);

        let rawPrompt = settings.customPrompt || MALL_PROMPTS[settings.difficulty || 'normal'];
        const prompt = rawPrompt
            .replace(/\{currentTimeStr\}/g, currentTimeStr)
            .replace(/\{itemCount\}/g, itemCount);

        let userContent = `Thời gian hiện tại là: 【${currentTimeStr}】. Xin hãy tạo ra đúng ${itemCount} món hàng hóa.\n`;
        userContent += `Cảnh báo: Bắt buộc tuân thủ nghiêm ngặt 【Khung trị số trong bảng】 và 【Định dạng mẫu bản thảo】 đã cung cấp trong System!\n`;

        if (userRequest.trim()) {
            userContent += `Nhu cầu cụ thể của khách hàng như sau: ${userRequest.trim()}\n`;
        } else {
            const t1 = Math.max(1, Math.floor(itemCount * 0.4));
            const t2 = Math.max(1, Math.floor(itemCount * 0.3));
            const t3 = itemCount - t1 - t2; 
            userContent += `Khách hàng không chỉ định nhu cầu. Xin hãy nhập hàng ngẫu nhiên, yêu cầu tỷ lệ: Bậc 1 ${t1} món, Bậc 2 ${t2} món, Bậc 3 ${t3} món.\n`;
        }

        const messages = [
            { role: 'system', content: prompt },
            { role: 'user', content: userContent }
        ];

        let text = '';

        if (settings.connectionMode === 'custom' && settings.apiUrl) {
            let apiUrl = settings.apiUrl.replace(/\/+$/, '');
            if (!apiUrl.endsWith('/chat/completions')) apiUrl += '/chat/completions';
            
            const payload = {
                model: settings.model || 'gpt-3.5-turbo',
                messages: messages,
                temperature: Number(settings.temperature) || 0.8,
                max_tokens: Number(settings.maxTokens) || 1500,
                top_p: Number(settings.topP) || 0.9,
                frequency_penalty: Number(settings.frequencyPenalty) || 0,
                presence_penalty: Number(settings.presencePenalty) || 0,
            };

            const headers = { 'Content-Type': 'application/json' };
            if (settings.apiKey) headers['Authorization'] = `Bearer ${settings.apiKey}`;

            const response = await fetch(apiUrl, { method: 'POST', headers, body: JSON.stringify(payload) });
            if (!response.ok) throw new Error(`Yêu cầu API độc lập thất bại: ${response.status} ${response.statusText}`);
            
            const data = await response.json();
            text = data.choices?.[0]?.message?.content || '';
            
        } else {
            let csrfToken = '';
            try {
                const getRequestHeaders = getST('getRequestHeaders');
                if (getRequestHeaders) csrfToken = getRequestHeaders()['X-CSRF-Token'] || '';
            } catch (e) {}

            const payload = {
                messages: messages,
                temperature: 0.8,
                max_tokens: 1500
            };

            try {
                const response = await fetch('/api/backends/chat/completions', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': csrfToken },
                    body: JSON.stringify(payload)
                });
                
                if (response.ok) {
                    const data = await response.json();
                    text = data.choices?.[0]?.message?.content || '';
                } else {
                    throw new Error('SillyTavern unified endpoint unavailable');
                }
            } catch (e) {
                console.warn('[Hệ thống thương thành] Yêu cầu nội bộ thuần tịnh thất bại, hạ cấp dùng generateRaw:', e);
                const generateRaw = getST('generateRaw');
                if (typeof generateRaw !== 'function') throw new Error('Mạng bất thường và không tìm thấy giao diện tầng dưới dự phòng.');
                
                const res = await generateRaw({
                    quiet: true, is_quiet: true, macro: true, disable_extensions: true,
                    ordered_prompts: messages
                });
                text = typeof res === 'string' ? res : (res?.text || res?.content || '');
            }
        }
        
        text = text.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim();
        return extractJSON(text);
    }

    let lastPurchase = null;

    async function undoPurchase() {
        if (!lastPurchase) return;
        const data = getMvuData();
        if (!data) return;

        const { name, item, qty = 1 } = lastPurchase;
        const type = item['Giá cả_Loại hình'];
        const refundAmount = Number(item['Giá cả_Trị số']) * qty;

        data['Nhân vật chính']['Tư khố']['Kim ngân đồng'][type] += refundAmount;

        if (data['Nhân vật chính']['Tư khố']['Vật phẩm quan trọng'][name]) {
            data['Nhân vật chính']['Tư khố']['Vật phẩm quan trọng'][name]['Số lượng'] -= qty;
            if (data['Nhân vật chính']['Tư khố']['Vật phẩm quan trọng'][name]['Số lượng'] <= 0) {
                delete data['Nhân vật chính']['Tư khố']['Vật phẩm quan trọng'][name];
            }
        }
        await saveMvuData(data);

        lastPurchase = null; 
        renderUI();

        showMallToast(`Đã thu hồi giao dịch, hoàn trả ${refundAmount} ${type}.`, 'info');
    }

    async function buyItem(name, item, qty = 1) {
        const data = getMvuData();
        
        if (!data) {
            showMallToast("Không thể đọc dữ liệu MVU, xin hãy bắt đầu đối thoại trước!", "error");
            return;
        }

        data['Nhân vật chính'] = data['Nhân vật chính'] || {};
        data['Nhân vật chính']['Tư khố'] = data['Nhân vật chính']['Tư khố'] || {};
        data['Nhân vật chính']['Tư khố']['Kim ngân đồng'] = data['Nhân vật chính']['Tư khố']['Kim ngân đồng'] || { 'Hoàng kim': 0, 'Bạch ngân': 0, 'Tiền đồng': 0 };
        data['Nhân vật chính']['Tư khố']['Vật phẩm quan trọng'] = data['Nhân vật chính']['Tư khố']['Vật phẩm quan trọng'] || {};

        const type = item['Giá cả_Loại hình'];
        const unitPrice = Number(item['Giá cả_Trị số']);
        const totalPrice = unitPrice * qty;
        const current = Number(data['Nhân vật chính']['Tư khố']['Kim ngân đồng'][type]) || 0;

        if (current < totalPrice) {
            showMallToast(`Số dư không đủ! Mua ${qty} phần cần ${totalPrice} ${type}, hiện chỉ có ${current} ${type}.`, "warning");
            return;
        }

        data['Nhân vật chính']['Tư khố']['Kim ngân đồng'][type] = current - totalPrice;
        
        let itemDesc = item['Giới thiệu'];
        if (!itemDesc.includes("（Mua tại Vạn Giới Thương Thành）")) {
            itemDesc += "（Mua tại Vạn Giới Thương Thành）";
        }

        if (data['Nhân vật chính']['Tư khố']['Vật phẩm quan trọng'][name]) {
            data['Nhân vật chính']['Tư khố']['Vật phẩm quan trọng'][name]['Số lượng'] += qty;
            data['Nhân vật chính']['Tư khố']['Vật phẩm quan trọng'][name]['Giới thiệu'] = itemDesc; 
        } else {
            data['Nhân vật chính']['Tư khố']['Vật phẩm quan trọng'][name] = { 'Giới thiệu': itemDesc, 'Số lượng': qty };
        }
        
        if (data['Hệ thống thương thành']) delete data['Hệ thống thương thành']; 

        await saveMvuData(data);

        lastPurchase = { name, item: JSON.parse(JSON.stringify(item)), qty };

        renderUI();
        showMallToast(`Đã trích xuất ${qty} phần [${name}] vào Thông tin cá nhân - Vật phẩm quan trọng`, 'success');
    }

    async function fetchModels(apiUrl, apiKey) {
        if (!apiUrl) throw new Error('Xin hãy điền địa chỉ API trước.');
        const cleanKey = (apiKey || '').trim();
        const cleanUrl = apiUrl.trim();

        const getModelList = getST('getModelList');
        if (typeof getModelList === 'function') {
            try {
                const res = await getModelList({ apiurl: cleanUrl, key: cleanKey });
                if (res && res.length) return res;
            } catch (e) {}
        }

        let targetUrl = cleanUrl.replace(/\/chat\/completions\/?$/i, '').replace(/\/+$/, '');
        if (!targetUrl.endsWith('/models')) {
            targetUrl = targetUrl.endsWith('/v1') ? `${targetUrl}/models` : `${targetUrl}/v1/models`;
        }

        const fetchFunc = getST('fetch') || window.fetch;
        const headers = { 'Content-Type': 'application/json' };
        if (cleanKey) {
            headers['Authorization'] = cleanKey.toLowerCase().startsWith('bearer ') ? cleanKey : `Bearer ${cleanKey}`;
        }

        const response = await fetchFunc(targetUrl, {
            method: 'GET',
            headers: headers
        });

        if (!response.ok) {
            if (response.status === 401) {
                throw new Error('HTTP 401 (Chưa xác thực): API Key trống, sai hoặc nhà cung cấp chặn truy vấn /models. Bạn có thể tự gõ tên Model vào ô bên dưới!');
            }
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        return (data.data || []).map(m => m.id || m.name).filter(Boolean);
    }

    // ==========================================
    // 4. RENDER GIAO DIỆN & GẮN SỰ KIỆN
    // ==========================================
    async function doExchangeCurrency(action) {
        const data = getMvuData();
        if (!data) return;

        data['Nhân vật chính'] = data['Nhân vật chính'] || {};
        data['Nhân vật chính']['Tư khố'] = data['Nhân vật chính']['Tư khố'] || {};
        data['Nhân vật chính']['Tư khố']['Kim ngân đồng'] = data['Nhân vật chính']['Tư khố']['Kim ngân đồng'] || { 'Hoàng kim': 0, 'Bạch ngân': 0, 'Tiền đồng': 0 };
        const wallet = data['Nhân vật chính']['Tư khố']['Kim ngân đồng'];
        
        const rateGS = data['Kinh tế']?.['Thị trường']?.['Tỷ giá']?.['Một lạng hoàng kim đổi bạch ngân'] ?? 6;
        const rateSC = data['Kinh tế']?.['Thị trường']?.['Tỷ giá']?.['Một lạng bạch ngân đổi tiền đồng'] ?? 1200;

        const amountInput = doc.getElementById('sm-ex-amount');
        let amount = amountInput ? parseInt(amountInput.value) : 1;
        if (isNaN(amount) || amount < 1) {
            amount = 1;
            if (amountInput) amountInput.value = 1;
        }

        let success = false;
        let msg = "";

        if (action === 'g2s') {
            const cost = amount; 
            const yieldAmt = amount * rateGS;
            if (wallet['Hoàng kim'] >= cost) { wallet['Hoàng kim'] -= cost; wallet['Bạch ngân'] += yieldAmt; success = true; msg = `Tiêu hao ${cost} Hoàng kim, nhận được ${yieldAmt} Bạch ngân`; }
            else { showMallToast(`Hoàng kim không đủ! Lượt hoán đổi này cần ${cost} Hoàng kim.`, "warning"); }
        } else if (action === 's2g') {
            const cost = amount * rateGS; 
            const yieldAmt = amount;
            if (wallet['Bạch ngân'] >= cost) { wallet['Bạch ngân'] -= cost; wallet['Hoàng kim'] += yieldAmt; success = true; msg = `Tiêu hao ${cost} Bạch ngân, nhận được ${yieldAmt} Hoàng kim`; }
            else { showMallToast(`Bạch ngân không đủ! Lượt hoán đổi này cần ${cost} Bạch ngân.`, "warning"); }
        } else if (action === 's2c') {
            const cost = amount; 
            const yieldAmt = amount * rateSC;
            if (wallet['Bạch ngân'] >= cost) { wallet['Bạch ngân'] -= cost; wallet['Tiền đồng'] += yieldAmt; success = true; msg = `Tiêu hao ${cost} Bạch ngân, nhận được ${yieldAmt} Tiền đồng`; }
            else { showMallToast(`Bạch ngân không đủ! Lượt hoán đổi này cần ${cost} Bạch ngân.`, "warning"); }
        } else if (action === 'c2s') {
            const cost = amount * rateSC; 
            const yieldAmt = amount;
            if (wallet['Tiền đồng'] >= cost) { wallet['Tiền đồng'] -= cost; wallet['Bạch ngân'] += yieldAmt; success = true; msg = `Tiêu hao ${cost} Tiền đồng, nhận được ${yieldAmt} Bạch ngân`; }
            else { showMallToast(`Tiền đồng không đủ! Lượt hoán đổi này cần ${cost} Tiền đồng.`, "warning"); }
        }

        if (success) {
            await saveMvuData(data);
            renderUI();
            showMallToast(msg, "success");
        }
    }

    function renderUI() {
        const data = getMvuData() || {};
        const wallet = data['Nhân vật chính']?.['Tư khố']?.['Kim ngân đồng'] || { 'Hoàng kim': 0, 'Bạch ngân': 0, 'Tiền đồng': 0 };
        const rateGS = data['Kinh tế']?.['Thị trường']?.['Tỷ giá']?.['Một lạng hoàng kim đổi bạch ngân'] ?? 6;
        const rateSC = data['Kinh tế']?.['Thị trường']?.['Tỷ giá']?.['Một lạng bạch ngân đổi tiền đồng'] ?? 1200;
        
        let shelfData = {};
        try { shelfData = JSON.parse(win.localStorage.getItem(SHELF_KEY)) || {}; } catch(e) {}
        const items = shelfData['Hàng hóa hiện tại'] || {};
        const time = shelfData['Thời gian làm mới lần trước'] || 'Chưa từng làm mới';

        const listDiv = doc.getElementById('sys-mall-list-content');
        if (!listDiv) return;

        const currentTimeEl = doc.getElementById('sys-mall-current-time');
        if (currentTimeEl) currentTimeEl.innerText = getCurrentTimeStr(data);

        doc.getElementById('sys-mall-wallet-gold').innerText = wallet['Hoàng kim'] || 0;
        doc.getElementById('sys-mall-wallet-silver').innerText = wallet['Bạch ngân'] || 0;
        doc.getElementById('sys-mall-wallet-copper').innerText = wallet['Tiền đồng'] || 0;
        doc.getElementById('sys-mall-refresh-time').innerText = time;
        
        const btnG2S = doc.getElementById('btn-ex-g2s');
        if(btnG2S) btnG2S.title = `1 Hoàng kim đổi được ${rateGS} Bạch ngân`;
        const btnS2G = doc.getElementById('btn-ex-s2g');
        if(btnS2G) btnS2G.title = `${rateGS} Bạch ngân đổi được 1 Hoàng kim`;
        const btnS2C = doc.getElementById('btn-ex-s2c');
        if(btnS2C) btnS2C.title = `1 Bạch ngân đổi được ${rateSC} Tiền đồng`;
        const btnC2S = doc.getElementById('btn-ex-c2s');
        if(btnC2S) btnC2S.title = `${rateSC} Tiền đồng đổi được 1 Bạch ngân`;

        const btnUndo = doc.getElementById('sys-mall-btn-undo');
        if (btnUndo) btnUndo.style.display = lastPurchase ? 'block' : 'none';

        const keys = Object.keys(items);
        if (keys.length === 0) {
            listDiv.innerHTML = '<div class="sys-mall-empty">Kệ hàng trống không, xin nhập nhu cầu rồi nhấn làm mới hàng hóa.</div>';
            return;
        }

        let html = '';
        for (const key of keys) {
            const item = items[key];
            html += `
                <div class="sys-mall-item">
                    <div class="sys-mall-item-head">
                        <span class="sys-mall-item-name">${key}</span>
                        <span class="sys-mall-item-price">${item['Giá cả_Trị số']} ${item['Giá cả_Loại hình']}</span>
                    </div>
                    <div class="sys-mall-item-desc">${item['Giới thiệu']}</div>
                    <div class="sys-mall-item-action">
                        <span style="font-size: 13px; color: #b99f76; margin-right: 4px;">Số lượng:</span>
                        <input type="number" class="sys-mall-item-qty" value="1" min="1" step="1" title="Số lượng mua">
                        <button class="sys-mall-btn-del" data-name="${key}">Xóa</button>
                        <button class="sys-mall-btn-buy" data-name="${key}">Mua</button>
                    </div>
                </div>
            `;
        }
        listDiv.innerHTML = html;

        listDiv.querySelectorAll('.sys-mall-btn-buy').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const itemName = e.target.getAttribute('data-name');
                const qtyInput = e.target.parentElement.querySelector('.sys-mall-item-qty');
                let qty = qtyInput ? parseInt(qtyInput.value) : 1;
                if (isNaN(qty) || qty < 1) qty = 1;
                
                if (itemName && items[itemName]) buyItem(itemName, items[itemName], qty);
            });
        });
        
        listDiv.querySelectorAll('.sys-mall-btn-del').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const itemName = e.target.getAttribute('data-name');
                if (itemName && items[itemName]) {
                    let currentShelf = {};
                    try { currentShelf = JSON.parse(win.localStorage.getItem(SHELF_KEY)) || {}; } catch(err) {}
                    if (currentShelf['Hàng hóa hiện tại']) {
                        delete currentShelf['Hàng hóa hiện tại'][itemName];
                        win.localStorage.setItem(SHELF_KEY, JSON.stringify(currentShelf));
                    }
                    renderUI();
                    showMallToast(`Đã gỡ [${itemName}] khỏi kệ hàng`, 'info');
                }
            });
        });
    }

    function toggleSettings(show) {
        const settingsPanel = doc.getElementById('sys-mall-settings-panel');
        if (!settingsPanel) return;
        if (show) {
            const settings = getSettings();
            const currentDiff = settings.difficulty || 'normal';
            doc.getElementById('sm-difficulty').value = currentDiff;
            doc.getElementById('sm-custom-prompt').value = settings.customPrompt || MALL_PROMPTS[currentDiff];
            doc.getElementById('sm-conn-mode').value = settings.connectionMode;
            doc.getElementById('sm-item-count').value = settings.itemCount || 10;
            doc.getElementById('sm-api-source').value = settings.apiSource;
            doc.getElementById('sm-api-url').value = settings.apiUrl;
            doc.getElementById('sm-api-key').value = settings.apiKey;
            doc.getElementById('sm-model').value = settings.model;
            doc.getElementById('sm-temperature').value = settings.temperature;
            doc.getElementById('sm-max-tokens').value = settings.maxTokens;
            doc.getElementById('sm-top-p').value = settings.topP;
            doc.getElementById('sm-freq-pen').value = settings.frequencyPenalty;
            doc.getElementById('sm-pres-pen').value = settings.presencePenalty;

            doc.getElementById('sm-custom-fields').style.display = settings.connectionMode === 'custom' ? 'flex' : 'none';
            settingsPanel.classList.add('active');
        } else {
            settingsPanel.classList.remove('active');
        }
    }

    function initUI() {
        const CSS = `
            #sys-mall-lamp {
                position: fixed; z-index: 2147483647;
                background: linear-gradient(135deg, #d4a040, #b5654b);
                border: 2px solid rgba(255,248,226,0.8);
                color: #fff; font-weight: bold; font-family: "Noto Serif SC", "Songti SC", serif;
                display: flex; align-items: center; justify-content: center; cursor: grab;
                box-shadow: 0 6px 15px rgba(0,0,0,0.6);
                user-select: none; touch-action: none; transition: transform 0.2s;
            }
            #sys-mall-lamp::before {
                content: ""; position: absolute; inset: 2px; border: 1px solid rgba(255,255,255,0.3); border-radius: 50%; pointer-events: none;
            }
            #sys-mall-lamp:active { cursor: grabbing; }
            #sys-mall-lamp:hover { transform: scale(1.05); }
            
            #sys-mall-modal {
                position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; height: 100dvh;
                z-index: 2147483647; background: rgba(10,8,6,0.7); backdrop-filter: blur(4px);
                display: none; align-items: center; justify-content: center;
                padding: 15px; box-sizing: border-box; 
            }
            #sys-mall-modal.active { display: flex; }
            
            .sys-mall-container {
                position: relative; width: 100%; max-width: 580px; max-height: 100%;
                margin: auto; 
                background: linear-gradient(145deg, #211913, #352619);
                border: 1px solid rgba(237,196,128,0.3); border-radius: 16px;
                display: flex; flex-direction: column; overflow: hidden;
                box-shadow: 0 24px 60px rgba(0,0,0,0.8);
                color: #f2dfba; font-family: "Noto Serif SC", "Songti SC", serif;
            }
            
            .sys-mall-head {
                display: flex; justify-content: space-between; align-items: center;
                padding: 14px 18px; border-bottom: 1px solid rgba(237,196,128,0.15);
                background: rgba(0,0,0,0.35); flex-shrink: 0;
            }
            .sys-mall-head h2 { margin: 0; font-size: 18px; color: #d0784b; letter-spacing: 1.5px; font-weight: bold; white-space: nowrap; }
            .sys-mall-head-actions { display: flex; gap: 8px; align-items: center; }
            
            .sys-mall-time-banner {
                display: flex; align-items: center; justify-content: center; gap: 6px;
                padding: 6px 12px; background: rgba(0,0,0,0.25);
                border-bottom: 1px solid rgba(237,196,128,0.1); font-size: 12px; color: #b99f76;
                text-align: center; flex-shrink: 0;
            }
            .sys-mall-time-banner .sm-time-tag {
                color: #f2dfba; font-weight: bold; background: rgba(237,196,128,0.1);
                padding: 2px 8px; border-radius: 12px; border: 1px solid rgba(237,196,128,0.2);
            }
            
            .sys-mall-icon-btn {
                background: none; border: 1px solid rgba(237,196,128,0.3); border-radius: 50%;
                color: #b99f76; width: 32px; height: 32px; font-size: 18px; 
                display: grid; place-items: center; cursor: pointer; transition: 0.2s;
            }
            .sys-mall-icon-btn:hover { border-color: #d0784b; color: #d0784b; background: rgba(208,120,75,0.1); }
            
            .sys-mall-wallet-bar {
                display: flex; flex-direction: column; padding: 10px 12px; flex-shrink: 0;
                background: rgba(0,0,0,0.2); border-bottom: 1px solid rgba(237,196,128,0.1);
            }
            .sys-mall-wallet-row { display: flex; justify-content: space-around; align-items: flex-start; width: 100%; }
            .sys-mall-wallet-item { display: flex; flex-direction: column; align-items: center; gap: 4px; }
            .sm-wallet-val { display: flex; align-items: baseline; }
            .sm-wallet-val span { font-size: 13px; color: #b99f76; }
            .sm-wallet-val b { font-size: 16px; color: #d4a040; margin-left: 4px; }
            .sm-wallet-actions { display: flex; gap: 4px; }
            .sm-btn-ex {
                background: rgba(237,196,128,0.1); border: 1px solid rgba(237,196,128,0.3);
                color: #b99f76; font-size: 11px; padding: 2px 6px; border-radius: 4px;
                cursor: pointer; transition: 0.2s; white-space: nowrap; font-family: inherit;
            }
            .sm-btn-ex:hover { background: rgba(208,120,75,0.2); border-color: #d0784b; color: #f2dfba; }
            .sm-ex-tool { display: flex; justify-content: flex-end; align-items: center; margin-top: 8px; gap: 6px; padding-right: 10px; }
            .sm-ex-tool span { font-size: 12px; color: #b99f76; }
            .sm-ex-input { width: 50px; padding: 2px 4px; background: rgba(0,0,0,0.4); border: 1px solid rgba(237,196,128,0.3); color: #fff; border-radius: 4px; text-align: center; outline: none; font-family: inherit; }
            .sm-ex-input:focus { border-color: #d0784b; }
            
            .sys-mall-content {
                flex: 1; overflow-y: auto; padding: 16px; min-height: 150px;
                scrollbar-width: thin; scrollbar-color: rgba(237,196,128,0.3) transparent;
            }
            
            .sys-mall-item {
                border: 1px solid rgba(237,196,128,0.2); border-radius: 12px;
                background: rgba(255,255,255,0.03); margin-bottom: 12px;
                padding: 14px; transition: transform 0.2s, border-color 0.2s;
            }
            .sys-mall-item:hover { transform: translateY(-2px); border-color: #d0784b; box-shadow: 0 6px 16px rgba(0,0,0,0.3); }
            .sys-mall-item-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
            .sys-mall-item-name { font-size: 18px; font-weight: bold; color: #fff; }
            .sys-mall-item-price { background: rgba(208,120,75,0.15); color: #d4a040; padding: 3px 8px; border-radius: 6px; font-size: 13px; font-weight: bold; }
            .sys-mall-item-desc { font-size: 13px; color: #b99f76; line-height: 1.6; margin-bottom: 12px; }
            .sys-mall-item-action { display: flex; justify-content: flex-end; align-items: center; }
            .sys-mall-item-qty {
                width: 45px; padding: 4px 2px; background: rgba(0,0,0,0.4); 
                border: 1px solid rgba(237,196,128,0.3); color: #fff; 
                border-radius: 4px; text-align: center; outline: none; 
                font-family: inherit; margin-right: 12px; font-size: 13px;
            }
            .sys-mall-item-qty:focus { border-color: #d0784b; }
            .sys-mall-btn-buy { background: #89a074; border: 1px solid #6f8a67; color: #fff; padding: 6px 16px; border-radius: 8px; cursor: pointer; font-family: inherit; font-weight: bold; }
            .sys-mall-btn-buy:hover { background: #6f8a67; filter: brightness(1.1); }
            
            .sys-mall-btn-del { background: #a43d2d; border: 1px solid #8e2926; color: #fff; padding: 6px 16px; border-radius: 8px; cursor: pointer; font-family: inherit; font-weight: bold; margin-right: 10px; }
            .sys-mall-btn-del:hover { background: #8e2926; filter: brightness(1.1); }
            
            .sys-mall-foot {
                padding: 14px 20px; border-top: 1px solid rgba(237,196,128,0.2);
                background: rgba(0,0,0,0.3); display: flex; flex-direction: column; gap: 10px; flex-shrink: 0;
            }
            .sys-mall-prompt-row { display: flex; gap: 10px; align-items: center; }
            .sys-mall-prompt-input { 
                flex: 1; padding: 10px 12px; border-radius: 8px; border: 1px solid rgba(237,196,128,0.3);
                background: rgba(0,0,0,0.4); color: #fff; font-family: inherit; outline: none; width: 0;
            }
            .sys-mall-prompt-input:focus { border-color: #d0784b; }
            .sys-mall-btn-refresh {
                background: #a43d2d; border: 1px solid #8e2926; color: #fff; white-space: nowrap; flex-shrink: 0;
                padding: 10px 18px; border-radius: 8px; cursor: pointer; font-family: inherit; font-weight: bold;
            }
            .sys-mall-btn-refresh:hover { background: #8e2926; filter: brightness(1.2); }
            .sys-mall-btn-refresh:disabled { opacity: 0.5; cursor: not-allowed; }
            .sys-mall-refresh-info { font-size: 12px; color: #75624d; align-self: flex-start; }
            .sys-mall-empty { text-align: center; padding: 40px 10px; color: #75624d; font-size: 14px;}
            
            /* Cài đặt Bảng điều khiển */
            .sys-mall-settings-panel {
                position: absolute; inset: 0; background: #211913; z-index: 10;
                display: none; flex-direction: column; padding: 0;
            }
            .sys-mall-settings-panel.active { display: flex; }
            .sys-mall-settings-head { 
                display: flex; justify-content: space-between; align-items: center; flex-shrink: 0;
                padding: 15px 20px; border-bottom: 1px solid #4a3828; background: rgba(0,0,0,0.2);
            }
            .sys-mall-settings-head h3 { margin: 0; color: #d4a040; font-size: 18px; }
            .sys-mall-settings-scroll { flex: 1; overflow-y: auto; padding: 20px; display: flex; flex-direction: column; gap: 15px; }
            .sm-setting-row { display: flex; flex-direction: column; gap: 6px; }
            .sm-setting-row.half { flex: 1; }
            .sm-setting-group { display: flex; gap: 12px; }
            .sm-setting-row label { color: #b99f76; font-size: 13px; }
            .sm-setting-input { padding: 9px 11px; border-radius: 6px; border: 1px solid #4a3828; background: #111; color: #fff; outline: none; font-family: inherit; }
            .sm-setting-input:focus { border-color: #d0784b; }
            
            .sm-btn-fetch {
                background: #4a5555; border: 1px solid #5a6565; color: #fff; padding: 0 14px; 
                border-radius: 6px; cursor: pointer; white-space: nowrap; font-family: inherit;
            }
            .sm-btn-fetch:hover { background: #5a6565; }
            .sm-btn-fetch:disabled { opacity: 0.5; cursor: not-allowed; }
            
            .sm-footer-actions {
                padding: 15px 20px; border-top: 1px solid #4a3828; flex-shrink: 0;
                display: flex; justify-content: flex-end; gap: 12px; background: rgba(0,0,0,0.2);
            }

            @media (max-width: 768px) {
                #sys-mall-modal { padding: 10px; } 
                .sys-mall-container { border-radius: 12px; }
                .sys-mall-head { padding: 10px 14px; }
                .sys-mall-head h2 { font-size: 16px; }
                .sys-mall-icon-btn { width: 30px; height: 30px; font-size: 16px; }
                .sys-mall-time-banner { font-size: 11px; padding: 4px 8px; }
                .sys-mall-wallet-bar { padding: 8px; }
                .sm-wallet-val span { font-size: 12px; }
                .sm-wallet-val b { font-size: 14px; }
                .sm-btn-ex { font-size: 10px; padding: 2px 4px; }
                .sm-ex-tool { margin-top: 6px; padding-right: 5px;}
                .sm-ex-tool span { font-size: 11px; }
                .sm-ex-input { width: 45px; padding: 1px 3px; font-size: 12px; }
                .sys-mall-content { padding: 10px; }
                .sys-mall-item { padding: 10px; margin-bottom: 10px; border-radius: 10px;}
                .sys-mall-item-name { font-size: 16px; }
                .sys-mall-item-price { font-size: 12px; padding: 2px 6px; }
                .sys-mall-item-desc { font-size: 12px; }
                .sys-mall-item-qty { width: 40px; padding: 2px; font-size: 12px; margin-right: 8px; }
                .sys-mall-btn-buy { padding: 4px 12px; font-size: 13px; }
                .sys-mall-btn-del { padding: 4px 12px; font-size: 13px; margin-right: 6px; }
                .sys-mall-foot { padding: 10px 14px; }
                .sys-mall-prompt-input { padding: 8px 10px; font-size: 13px; }
                .sys-mall-btn-refresh { padding: 8px 12px; font-size: 13px; }
                .sys-mall-settings-scroll { padding: 14px; gap: 10px; }
                .sm-setting-group { flex-direction: column; gap: 10px; }
                .sm-setting-row label { font-size: 12px; }
            }
        `;
        const style = doc.createElement('style');
        style.id = STYLE_ID;
        style.textContent = CSS;
        doc.head.appendChild(style);

        const lamp = doc.createElement('div');
        lamp.id = LAMP_ID;
        lamp.innerHTML = '💰';
        lamp.title = 'Mở Vạn Giới Thương Thành';
        doc.body.appendChild(lamp);

        const modal = doc.createElement('div');
        modal.id = MODAL_ID;
        modal.innerHTML = `
            <div class="sys-mall-container">
                <header class="sys-mall-head">
                    <h2>Vạn Giới Thương Thành</h2>
                    <div class="sys-mall-head-actions">
                        <button class="sys-mall-icon-btn" id="sys-mall-btn-settings" title="Cài đặt API Thương Thành">⚙</button>
                        <button class="sys-mall-icon-btn" id="sys-mall-btn-close" title="Đóng">×</button>
                    </div>
                </header>
                <div class="sys-mall-time-banner">
                    <span>⏳ Thời gian thế giới:</span>
                    <span id="sys-mall-current-time" class="sm-time-tag">Đang đọc dữ liệu...</span>
                </div>
                <div class="sys-mall-wallet-bar">
                    <div class="sys-mall-wallet-row">
                        <div class="sys-mall-wallet-item">
                            <div class="sm-wallet-val"><span>Hoàng kim</span><b id="sys-mall-wallet-gold">0</b></div>
                            <div class="sm-wallet-actions">
                                <button class="sm-btn-ex" id="btn-ex-g2s" data-ex="g2s">Đổi Bạch ngân↓</button>
                            </div>
                        </div>
                        <div class="sys-mall-wallet-item">
                            <div class="sm-wallet-val"><span>Bạch ngân</span><b id="sys-mall-wallet-silver">0</b></div>
                            <div class="sm-wallet-actions">
                                <button class="sm-btn-ex" id="btn-ex-s2g" data-ex="s2g">↑Đổi Hoàng kim</button>
                                <button class="sm-btn-ex" id="btn-ex-s2c" data-ex="s2c">Đổi Tiền đồng↓</button>
                            </div>
                        </div>
                        <div class="sys-mall-wallet-item">
                            <div class="sm-wallet-val"><span>Tiền đồng</span><b id="sys-mall-wallet-copper">0</b></div>
                            <div class="sm-wallet-actions">
                                <button class="sm-btn-ex" id="btn-ex-c2s" data-ex="c2s">↑Đổi Bạch ngân</button>
                            </div>
                        </div>
                    </div>
                    <div class="sm-ex-tool">
                        <span>Số lượt hoán đổi hàng loạt:</span>
                        <input type="number" id="sm-ex-amount" class="sm-ex-input" value="1" min="1" step="1" title="Thiết lập số lần hoán đổi mỗi lần nhấn (1 lượt tương đương 1 lần hoán đổi chuẩn)">
                    </div>
                </div>
                <div class="sys-mall-content" id="sys-mall-list-content"></div>
                <footer class="sys-mall-foot">
                    <div class="sys-mall-prompt-row">
                        <input type="text" id="sys-mall-user-prompt" class="sys-mall-prompt-input" placeholder="Muốn hàng hóa gì? Ví dụ: Một nghìn khẩu súng ngắn hiện đại, hoặc giống lương thực năng suất cao">
                        <button class="sys-mall-btn-refresh" id="sys-mall-btn-undo" style="background:#8f382d; border-color:#c85340; display:none;">Thu hồi giao dịch</button>
                        <button class="sys-mall-btn-refresh" id="sys-mall-btn-refresh">Làm mới hàng hóa</button>
                    </div>
                    <span class="sys-mall-refresh-info">Làm mới lần trước: <span id="sys-mall-refresh-time"></span></span>
                </footer>
                
                <div class="sys-mall-settings-panel" id="sys-mall-settings-panel">
                    <div class="sys-mall-settings-head">
                        <h3>Cài đặt API Thương Thành</h3>
                        <button class="sys-mall-icon-btn" id="sm-btn-close-settings">×</button>
                    </div>
                    <div class="sys-mall-settings-scroll">
                        <div class="sm-setting-row" style="margin-bottom: 8px;">
                            <label>Độ khó vật giá thiết lập sẵn (Tự động tương thích khung vật giá và giới hạn trần)</label>
                            <select id="sm-difficulty" class="sm-setting-input" style="color: #d4a040; font-weight: bold; margin-top: 6px;">
                                <option value="easy">【Đơn giản】Vật giá cực thấp</option>
                                <option value="normal">【Bình thường】Vật giá vừa phải</option>
                                <option value="hard">【Khó khăn】Vật giá đắt đỏ</option>
                            </select>
                        </div>
                        <div class="sm-setting-row">
                            <label style="display:flex; justify-content:space-between; align-items:center;">
                                <span>Gợi ý hệ thống tùy chỉnh (Hỗ trợ biến {currentTimeStr} và {itemCount})</span>
                                <button id="sm-btn-reset-prompt" class="sm-btn-ex">Đặt lại mặc định theo độ khó đã chọn</button>
                            </label>
                            <textarea id="sm-custom-prompt" class="sm-setting-input" rows="8" style="resize:vertical; line-height:1.4; font-size:12px;"></textarea>
                        </div>
                        <div class="sm-setting-group">
                            <div class="sm-setting-row half">
                                <label>Phương thức kết nối API</label>
                                <select id="sm-conn-mode" class="sm-setting-input">
                                    <option value="tavern">Sử dụng Model chính của Tavern hiện tại</option>
                                    <option value="custom">Sử dụng API độc lập</option>
                                </select>
                            </div>
                            <div class="sm-setting-row half">
                                <label>Số lượng hàng hóa mỗi lần sinh</label>
                                <input type="number" id="sm-item-count" class="sm-setting-input" step="1" min="1" max="30">
                            </div>
                        </div>
                        <div id="sm-custom-fields" style="display:none; flex-direction:column; gap: 15px;">
                            <div class="sm-setting-group">
                                <div class="sm-setting-row half">
                                    <label>Giao thức API</label>
                                    <select id="sm-api-source" class="sm-setting-input">
                                        <option value="openai">OpenAI tương thích</option>
                                        <option value="claude">Claude</option>
                                        <option value="google">Google</option>
                                    </select>
                                </div>
                                <div class="sm-setting-row half">
                                    <label>Khóa API (API Key)</label>
                                    <input type="password" id="sm-api-key" class="sm-setting-input" placeholder="sk-...">
                                </div>
                            </div>
                            <div class="sm-setting-row">
                                <label>Địa chỉ API (Cần tương thích định dạng OpenAI)</label>
                                <input type="text" id="sm-api-url" class="sm-setting-input" placeholder="https://api.openai.com/v1">
                            </div>
                            <div class="sm-setting-row">
                                <label>Model suy diễn</label>
                                <div style="display:flex; gap:8px;">
                                    <input type="text" id="sm-model" class="sm-setting-input" style="flex:1;" placeholder="gpt-3.5-turbo">
                                    <button id="sm-btn-fetch-models" class="sm-btn-fetch">Lấy danh sách Model</button>
                                </div>
                                <select id="sm-model-select" class="sm-setting-input" style="display:none; margin-top:8px;"></select>
                                <small id="sm-model-status" style="color:#b99f76; margin-top:4px; font-size:11px;"></small>
                            </div>
                            <div class="sm-setting-group">
                                <div class="sm-setting-row half">
                                    <label>Nhiệt độ (Temperature)</label>
                                    <input type="number" id="sm-temperature" class="sm-setting-input" step="0.1" min="0" max="2">
                                </div>
                                <div class="sm-setting-row half">
                                    <label>Token tối đa (Max Tokens)</label>
                                    <input type="number" id="sm-max-tokens" class="sm-setting-input" step="1" min="100">
                                </div>
                            </div>
                            <div class="sm-setting-group">
                                <div class="sm-setting-row half">
                                    <label>Top P</label>
                                    <input type="number" id="sm-top-p" class="sm-setting-input" step="0.05" min="0" max="1">
                                </div>
                                <div class="sm-setting-row half">
                                    <label>Phạt tần suất (Frequency Penalty)</label>
                                    <input type="number" id="sm-freq-pen" class="sm-setting-input" step="0.1" min="-2" max="2">
                                </div>
                                <div class="sm-setting-row half">
                                    <label>Phạt hiện diện (Presence Penalty)</label>
                                    <input type="number" id="sm-pres-pen" class="sm-setting-input" step="0.1" min="-2" max="2">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="sm-footer-actions">
                        <button id="sm-btn-cancel" class="sys-mall-btn-buy" style="background:#4a5555; border-color:#5a6565;">Trở về</button>
                        <button id="sm-btn-save" class="sys-mall-btn-buy" style="background:#d0784b; border-color:#d0784b;">Lưu cấu hình</button>
                    </div>
                </div>
            </div>
        `;
        doc.body.appendChild(modal);

        // ==========================================
        // 5. KÉO THẢ NÚT NỔI & ĐIỀU KHIỂN ĐÓNG/MỞ BẢNG
        // ==========================================
        let mallIsOpen = false;
        let dragInfo = null;
        let dragMoved = false;
        let dragJustEnded = false;

        function getViewport() {
            return { width: win.innerWidth || document.documentElement.clientWidth || 1280, height: win.innerHeight || document.documentElement.clientHeight || 720 };
        }

        function clampLampToViewport() {
            const { width, height } = getViewport();
            const isMobile = width <= 768;
            const size = isMobile ? 40 : 46; 
            const margin = 8;
            
            let currentLeft = parseInt(lamp.style.left) || (width - size - 24);
            let currentTop = parseInt(lamp.style.top) || Math.round(height * 0.4);

            let newLeft = Math.max(margin, Math.min(width - size - margin, currentLeft));
            let newTop = Math.max(margin, Math.min(height - size - margin, currentTop));

            lamp.style.width = size + 'px';
            lamp.style.height = size + 'px';
            lamp.style.fontSize = isMobile ? '20px' : '24px';
            lamp.style.borderRadius = '50%';
            lamp.style.lineHeight = size + 'px';
            
            lamp.style.left = newLeft + 'px';
            lamp.style.top = newTop + 'px';
            lamp.style.right = 'auto'; 
        }

        try {
            const savedPos = JSON.parse(win.localStorage.getItem(POS_KEY));
            if (savedPos && typeof savedPos.left === 'number') {
                lamp.style.left = savedPos.left + 'px';
                lamp.style.top = savedPos.top + 'px';
            }
        } catch (e) {}
        
        clampLampToViewport();

        function toggleMallPanel(show) {
            mallIsOpen = show;
            if (show) {
                renderUI();
                modal.classList.add('active');
                lamp.style.display = 'none'; 
            } else {
                modal.classList.remove('active');
                lamp.style.display = 'flex'; 
                clampLampToViewport();       
            }
        }

        const handlePointerDown = (e) => {
            if (mallIsOpen) return;
            const touch = e.touches ? e.touches[0] : e;
            const rect = lamp.getBoundingClientRect();
            dragInfo = { startX: touch.clientX, startY: touch.clientY, left: rect.left, top: rect.top, moved: false };
            dragMoved = false;
            lamp.style.transition = 'none';
            if (e.cancelable && !e.touches) e.preventDefault();
        };

        const handlePointerMove = (e) => {
            if (!dragInfo || mallIsOpen) return;
            const touch = e.touches ? e.touches[0] : e;
            const dx = touch.clientX - dragInfo.startX;
            const dy = touch.clientY - dragInfo.startY;
            
            if (Math.hypot(dx, dy) > 5) { dragInfo.moved = true; dragMoved = true; }

            const { width, height } = getViewport();
            const size = width <= 768 ? 40 : 46;
            const margin = 8;
            
            const newLeft = Math.max(margin, Math.min(width - size - margin, dragInfo.left + dx));
            const newTop = Math.max(margin, Math.min(height - size - margin, dragInfo.top + dy));
            
            lamp.style.left = newLeft + 'px';
            lamp.style.top = newTop + 'px';
            lamp.style.right = 'auto'; 
            
            if (e.cancelable) e.preventDefault();
        };

        const handlePointerUp = () => {
            if (!dragInfo) return;
            lamp.style.transition = ''; 
            if (dragInfo.moved) {
                clampLampToViewport();
                win.localStorage.setItem(POS_KEY, JSON.stringify({
                    left: parseInt(lamp.style.left),
                    top: parseInt(lamp.style.top)
                }));
                dragJustEnded = true;
                setTimeout(() => dragJustEnded = false, 150);
            }
            dragInfo = null;
        };

        win._sysMallOnMove = handlePointerMove;
        win._sysMallOnTouchMove = handlePointerMove;
        win._sysMallOnUp = handlePointerUp;
        win._sysMallOnTouchEnd = handlePointerUp;
        win._sysMallOnResize = () => {
            if (!mallIsOpen) clampLampToViewport();
        };

        lamp.addEventListener('pointerdown', handlePointerDown);
        lamp.addEventListener('touchstart', handlePointerDown, { passive: false });
        win.addEventListener('pointermove', win._sysMallOnMove);
        win.addEventListener('touchmove', win._sysMallOnTouchMove, { passive: false });
        win.addEventListener('pointerup', win._sysMallOnUp);
        win.addEventListener('touchend', win._sysMallOnTouchEnd);
        win.addEventListener('resize', win._sysMallOnResize);

        lamp.addEventListener('click', () => {
            if (dragJustEnded || dragMoved) {
                dragMoved = false;
                return;
            }
            toggleMallPanel(true);
        });

        doc.getElementById('sys-mall-btn-close').addEventListener('click', () => toggleMallPanel(false));
        modal.addEventListener('click', (e) => { 
            if (e.target === modal) toggleMallPanel(false); 
        });

        // ==========================================
        // 6. GẮN SỰ KIỆN THAO TÁC NỘI BỘ
        // ==========================================
        doc.getElementById('sys-mall-btn-settings').addEventListener('click', () => toggleSettings(true));
        doc.getElementById('sm-btn-close-settings').addEventListener('click', () => toggleSettings(false));
        doc.getElementById('sm-btn-cancel').addEventListener('click', () => toggleSettings(false));
        
        doc.getElementById('sm-difficulty').addEventListener('change', (e) => {
            const diff = e.target.value;
            doc.getElementById('sm-custom-prompt').value = MALL_PROMPTS[diff];
            showMallToast('Đã chuyển đổi và đặt lại gợi ý hệ thống sang mức [' + e.target.options[e.target.selectedIndex].text + ']', 'info');
        });

        doc.getElementById('sm-btn-reset-prompt').addEventListener('click', () => {
            const diff = doc.getElementById('sm-difficulty').value;
            doc.getElementById('sm-custom-prompt').value = MALL_PROMPTS[diff];
            showMallToast('Gợi ý hệ thống đã được đặt lại thành công!', 'success');
        });

        doc.querySelectorAll('.sm-btn-ex').forEach(btn => {
            btn.addEventListener('click', (e) => {
                doExchangeCurrency(e.target.getAttribute('data-ex'));
            });
        });
        
        doc.getElementById('sm-conn-mode').addEventListener('change', (e) => {
            doc.getElementById('sm-custom-fields').style.display = e.target.value === 'custom' ? 'flex' : 'none';
        });

        const btnFetch = doc.getElementById('sm-btn-fetch-models');
        const selectModel = doc.getElementById('sm-model-select');
        const inputModel = doc.getElementById('sm-model');
        const statusText = doc.getElementById('sm-model-status');

        btnFetch.addEventListener('click', async () => {
            btnFetch.disabled = true;
            btnFetch.innerText = 'Đang lấy...';
            statusText.innerText = 'Đang đọc danh sách Model từ API...';
            statusText.style.color = '#b99f76';
            try {
                const url = doc.getElementById('sm-api-url').value.trim();
                const key = doc.getElementById('sm-api-key').value.trim();
                const models = await fetchModels(url, key);
                
                selectModel.innerHTML = models.map(m => `<option value="${m}">${m}</option>`).join('');
                selectModel.style.display = 'block';
                if (models.includes(inputModel.value)) {
                    selectModel.value = inputModel.value;
                } else if (models.length > 0) {
                    selectModel.value = models[0];
                    inputModel.value = models[0];
                }
                statusText.innerText = `Đã lấy được ${models.length} Model khả dụng.`;
                statusText.style.color = '#89a074'; 
            } catch (err) {
                statusText.innerText = `Lấy thất bại: ${err.message}`;
                statusText.style.color = '#c85340'; 
            } finally {
                btnFetch.disabled = false;
                btnFetch.innerText = 'Lấy danh sách Model';
            }
        });

        selectModel.addEventListener('change', (e) => {
            inputModel.value = e.target.value;
        });

        doc.getElementById('sm-btn-save').addEventListener('click', () => {
            saveSettings({
                difficulty: doc.getElementById('sm-difficulty').value,
                customPrompt: doc.getElementById('sm-custom-prompt').value.trim(),
                connectionMode: doc.getElementById('sm-conn-mode').value,
                itemCount: Number(doc.getElementById('sm-item-count').value) || 10,
                apiSource: doc.getElementById('sm-api-source').value,
                apiUrl: doc.getElementById('sm-api-url').value.trim(),
                apiKey: doc.getElementById('sm-api-key').value.trim(),
                model: doc.getElementById('sm-model').value.trim(),
                temperature: Number(doc.getElementById('sm-temperature').value),
                maxTokens: Number(doc.getElementById('sm-max-tokens').value),
                topP: Number(doc.getElementById('sm-top-p').value),
                frequencyPenalty: Number(doc.getElementById('sm-freq-pen').value),
                presencePenalty: Number(doc.getElementById('sm-pres-pen').value)
            });
            toggleSettings(false);
            showMallToast('Cấu hình đã được lưu', 'success');
        });

        const btnUndo = doc.getElementById('sys-mall-btn-undo');
        btnUndo.addEventListener('click', async () => { await undoPurchase(); });

        const btnRefresh = doc.getElementById('sys-mall-btn-refresh');
        const promptInput = doc.getElementById('sys-mall-user-prompt');
        
        btnRefresh.addEventListener('click', async () => {
            btnRefresh.disabled = true;
            btnRefresh.innerText = 'Đang tạo...';
            try {
                const userReq = promptInput.value.trim();
                const newItems = await refreshItems(userReq);
                
                const shelfData = {
                    'Hàng hóa hiện tại': newItems,
                    'Thời gian làm mới lần trước': new Date().toLocaleString()
                };
                win.localStorage.setItem(SHELF_KEY, JSON.stringify(shelfData));
                
                lastPurchase = null; 
                renderUI();
                promptInput.value = ''; 
            } catch (e) {
                showMallToast(e.message, 'error');
            } finally {
                btnRefresh.disabled = false;
                btnRefresh.innerText = 'Làm mới hàng hóa';
            }
        });
    }

    // ==========================================
    // 7. DỌN DẸP VÒNG ĐỜI & GẮN TOÀN CỤC
    // ==========================================
    function cleanupSysMall() {
        try {
            doc.getElementById(LAMP_ID)?.remove();
            doc.getElementById(MODAL_ID)?.remove();
            doc.getElementById(STYLE_ID)?.remove();
            doc.getElementById('sys-mall-toast-container')?.remove();
            if (win._sysMallOnMove) win.removeEventListener('pointermove', win._sysMallOnMove);
            if (win._sysMallOnTouchMove) win.removeEventListener('touchmove', win._sysMallOnTouchMove);
            if (win._sysMallOnUp) win.removeEventListener('pointerup', win._sysMallOnUp);
            if (win._sysMallOnTouchEnd) win.removeEventListener('touchend', win._sysMallOnTouchEnd);
            if (win._sysMallOnResize) win.removeEventListener('resize', win._sysMallOnResize);
        } catch (e) {}
    }

    cleanupSysMall(); 
    initUI();

    window.addEventListener('pagehide', cleanupSysMall, { once: true });
    window.addEventListener('unload', cleanupSysMall, { once: true });

})();
