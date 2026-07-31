function e(e) {
  const t = String(e?.apiurl || "").trim();
  if (!t) return !1;
  try {
    return "api.deepseek.com" === new URL(t).hostname.toLowerCase();
  } catch {
    return /^https?:\/\/api\.deepseek\.com(?:[/:?#]|$)/i.test(t);
  }
}
function t(e) {
  return [
    ...new Set(
      [
        e?.message,
        e?.statusText,
        e?.response?.statusText,
        e?.response?.data?.error?.message,
        e?.response?.data?.message,
        e?.data?.error?.message,
        e?.data?.message,
        e?.cause?.message,
        "string" == typeof e ? e : "",
      ]
        .map((e) => String(e || "").trim())
        .filter(Boolean),
    ),
  ].join(" · ");
}
function n(e, t) {
  const n = [
    e?.status,
    e?.statusCode,
    e?.response?.status,
    e?.response?.statusCode,
    e?.cause?.status,
  ]
    .map(Number)
    .find((e) => Number.isInteger(e) && e >= 400 && e <= 599);
  if (n) return n;
  const r = t.match(/(?:^|\D)(4\d\d|5\d\d)(?:\D|$)/)?.[1];
  return r
    ? Number(r)
    : /\bpayment required\b|insufficient (?:balance|credit|quota)/i.test(t)
      ? 402
      : /\bunauthorized\b|invalid api key|authentication failed/i.test(t)
        ? 401
        : /\bforbidden\b|permission denied/i.test(t)
          ? 403
          : /\btoo many requests\b|rate.?limit/i.test(t)
            ? 429
            : /\bbad request\b/i.test(t)
              ? 400
              : 0;
}
function r(e, r = {}) {
  const a = String(r.provider || "Giao diện AI").trim(),
    i = t(e),
    o = n(e, i),
    c = (function (e) {
      return !e ||
        /^(?:bad request|payment required|unauthorized|forbidden|too many requests)$/i.test(
          e,
        )
        ? ""
        : ` Lỗi gốc：${e.slice(0, 240)}`;
    })(i);
  return 401 === o
    ? new Error(
        `${a} Chứng nhận thất bại (HTTP 401): API Key không hợp lệ, đã bị thu hồi hoặc điền sai. ${c}`,
      )
    : 402 === o
      ? new Error(
          `${a} Số dư không đủ hoặc chưa mở thanh toán (HTTP 402): Vui lòng nạp tiền, kích hoạt thanh toán hoặc đổi API Key có hạn mức. ${c}`,
        )
      : 403 === o
        ? new Error(
            `${a} Từ chối truy cập (HTTP 403): API Key hiện tại không có quyền truy cập mô hình hoặc giao diện này. ${c}`,
          )
        : 404 === o
          ? new Error(
              `${a} Giao diện hoặc mô hình không tồn tại (HTTP 404): Vui lòng kiểm tra địa chỉ API và tên mô hình. ${c}`,
            )
          : 408 === o
            ? new Error(
                `${a} Yêu cầu quá thời gian (HTTP 408): Vui lòng thử lại sau hoặc kiểm tra kết nối mạng. ${c}`,
              )
            : 413 === o
              ? new Error(
                  `${a} Từ chối yêu cầu quá lớn (HTTP 413): Vui lòng giảm bớt tham khảo Thế Giới Thư, từ khóa gợi ý hoặc nội dung tạo ra. ${c}`,
                )
              : 429 === o
                ? new Error(
                    `${a} Yêu cầu quá thường xuyên hoặc chạm trần hạn mức (HTTP 429): Vui lòng đợi phục hồi giới hạn lưu lượng hoặc kiểm tra hạn ngạch tài khoản. ${c}`,
                  )
                : [500, 502, 503, 504].includes(o)
                  ? new Error(
                      `${a} Dịch vụ tạm thời không khả dụng (HTTP ${o}): Đây là lỗi dịch vụ thượng nguồn, vui lòng thử lại sau. ${c}`,
                    )
                  : /model[\s\S]{0,80}(?:not found|does not exist|invalid|unavailable)|unknown model/i.test(
                        i,
                      )
                    ? new Error(
                        `${a} Không chấp nhận tên mô hình hiện tại: Vui lòng kéo lại danh sách mô hình và chọn mô hình khả dụng. ${c}`,
                      )
                    : /context length|maximum context|too many tokens|token limit|prompt is too long/i.test(
                          i,
                        )
                      ? new Error(
                          `${a} Độ dài ngữ cảnh vượt quá giới hạn: Vui lòng giảm bớt độ dài tham khảo Thế Giới Thư hoặc từ khóa gợi ý. ${c}`,
                        )
                      : /response[_ -]?format|json[_ -]?schema|structured output/i.test(
                            i,
                          )
                        ? new Error(
                            `${a} Không hỗ trợ định dạng đầu ra cấu trúc hiện tại: Vui lòng đổi mô hình hoặc giao thức tương thích. ${c}`,
                          )
                        : 400 === o
                          ? new Error(
                              `${a} Đã từ chối yêu cầu (HTTP 400): Vui lòng kiểm tra tên mô hình, giao thức giao diện, phạm vi tham số và độ dài từ khóa gợi ý. ${c}`,
                            )
                          : /failed to fetch|network error|networkerror|econnreset|econnrefused|socket hang up/i.test(
                                i,
                              )
                            ? new Error(
                                `${a} Kết nối mạng thất bại: Vui lòng kiểm tra địa chỉ API, proxy và kết nối mạng. ${c}`,
                              )
                            : !i || /^(?:error:\s*)?<none>$/i.test(i)
                              ? new Error(
                                  `${a} Yêu cầu thất bại, nhưng trợ lý Quán rượu không trả về thông tin lỗi cụ thể; vui lòng kiểm tra bảng điều khiển Quán rượu hoặc nhật ký máy chủ.`,
                                )
                              : e instanceof Error
                                ? e
                                : new Error(i);
}
function a(e) {
  const r = t(e),
    a = n(e, r);
  return (
    !(a >= 400 && a < 500) &&
    !/model[\s\S]{0,80}(?:not found|does not exist|invalid|unavailable)|unknown model/i.test(
      r,
    ) &&
    !/context length|maximum context|too many tokens|token limit|prompt is too long/i.test(
      r,
    ) &&
    !/response[_ -]?format|json[_ -]?schema|structured output/i.test(r)
  );
}
function i(e) {
  const t = e?.value ?? e?.schema ?? e;
  return t && "object" == typeof t
    ? [
        "",
        "",
        "【Chế độ tương thích DeepSeek JSON】",
        "Vui lòng chỉ xuất một đối tượng JSON hợp lệ, không xuất Markdown, rào mã (code fence), giải thích hay văn bản ngoài đối tượng.",
        "Đầu ra bắt buộc phải thỏa mãn JSON Schema dưới đây; tất cả các trường required đều phải tồn tại:",
        JSON.stringify(t, null, 2),
      ].join("\n")
    : "";
}
(() => {
  const t = "CanmingCharacterGenerator",
    n = "canming-character-generator-root",
    o = "canming-character-generator-style",
    c = "canming-gen-api-cfg",
    s = "canming-gen-ui-cfg",
    l = "canming-gen-custom-modules",
    d = "canming-gen-order-list",
    g = [
      {
        id: "character",
        name: "Nhân vật",
        tag: "Nhân vật",
        icon: "👤",
        isDefault: !0,
        sys: 'Thiết luật viết lách:\n1. Kinh nghiệm quyết định tính cách——chỉ viết sự thật, bối cảnh, chi tiết cơ thể/cảm quan, không viết những phân tích tâm lý kiểu "Người đó đã trở thành người như thế nào". Hãy để người đọc tự hiểu nhân vật qua trải nghiệm, thay vì bị nhồi nhét nhãn mác tính cách.\n2. Mỏ neo khan hiếm——mỗi mỏ neo tính cách chỉ xuất hiện một lần, đã dùng thì không lặp lại. Một từ neo tốt hơn mười câu giải thích.\n3. Thông tin phân tán không tập trung——các khía cạnh khác nhau của cùng một đặc điểm phân tán vào các đoạn và bối cảnh khác nhau, không nói hết ở một chỗ. Ép AI phải hiểu tổng hợp, chứ không phải chép lại một đoạn nhãn mác.\n4. Tự sự có khuynh hướng——mỗi câu nói đều mang ngữ khí và lập trường của chính nhân vật, không dùng giọng điệu bàng bạch trung lập.\n\nCách viết trải nghiệm:\n- Viết "Đã xảy ra chuyện gì", không viết "Đã biến thành bộ dạng gì"\n- Có điểm neo thời gian cụ thể (năm nào, mấy tuổi), địa điểm, nhân vật, cảm nhận cơ thể\n- Cuối mỗi đoạn trải nghiệm chèn 1-2 câu nhân vật đã nói lúc đó (ngữ lệ), bọc trong ngoặc kép\n- Dùng ngữ khí của chính nhân vật để kể lại trải nghiệm này\n\nĐối thoại và sự thật hành vi:\n- Đối thoại phải có độ nhận diện——khẩu ngữ/văn hoa, nói nhiều/nói ít, thẳng thắn/vòng vo, phản ánh giai cấp và tính cách\n- Hành vi phải có sức căng——trước mặt người khác và sau lưng người khác không giống nhau, ngoài miệng nói và trong lòng nghĩ không giống nhau\n- Đưa ra điểm mấu chốt của nhân vật: Chuyện gì TA chết cũng không làm? Bị dồn vào chân tường TA sẽ phản ứng thế nào?\n\nCác chiều kích bắt buộc bao phủ:\n- Dục vọng sâu xa: TA muốn gì nhất? Không phải thứ bề ngoài, mà là thứ thực sự thúc đẩy TA ẩn dưới hành vi\n- Nỗi sợ cốt lõi: TA sợ gì nhất? Nỗi sợ này khiến TA tránh né những việc gì, đưa ra những lựa chọn tưởng chừng vô lý nào?\n- Khuyết điểm chân thực: Không phải kiểu "Quá lương thiện" "Quá nỗ lực", mà là hư vinh, toan tính, ích kỷ, hèn nhát, trốn tránh——loại thực sự khiến người ta thấy khó chịu\n- Mâu thuẫn: Mỗi nhân vật thú vị đều có lúc không đáng yêu. TA lúc nào khiến người ta muốn đảo mắt nhất?\n- Móc nối tương tác: Người khác xâm nhập vào phạm vi thế lực của TA thế nào? TA sẽ gây ra rắc rối gì, hoặc cung cấp cơ hội gì cho nhân vật chính?\n\nThế giới quan Tàn Minh Dư Tẫn:\nCuối thời Minh loạn lạc, nạn đói binh đao, thế lực địa phương cát cứ, nợ ân tình lớn bằng trời, tiền lương vĩnh viễn không đủ, lễ pháp chèn ép tư dục. Mỗi lựa chọn của nhân vật đều phải cảm nhận được sức nặng của thời đại này đè lên TA.',
        namePrompt: "",
        fields: [],
        userPromptTemplate:
          'Tạo một nhân vật cho thế giới quan Tàn Minh Dư Tẫn.\n\nThiết lập cơ bản:\n- Họ tên: {name}\n- Giới tính: {gender}\n- Tuổi: {age}\n- Thân phận/Giai tầng: {identity}\n- Quan hệ với nhân vật chính: {relation}\n- Địa điểm hiện tại: {location}\n- Thế lực trực thuộc: {faction}\n- Chức năng nhân vật: {role}\n- Khuynh hướng văn phong: {tone}\n- Gợi ý ngoại mạo: {appearance}\n- Ranh giới/Sở thích NSFW: {kinkBoundary}\n- Gợi ý thể mạo: {physique}\n- Sở thích từ khóa: {keywordHint}\n- Thuyết minh bổ sung: {extra}\n\nsfw_content vui lòng viết nghiêm ngặt theo định dạng dưới đây, trực tiếp dùng làm chính văn Thế Giới Thư:\n\n<Thiết lập nhân vật:{nameTag}_SFW>\nThuyết minh sử dụng: Tệp này là tham khảo nội hóa nhân vật, cung cấp cho AI sử dụng để hiểu nhân vật. Tất cả các mục thiết lập nên được chuyển hóa thành hành vi, ngôn ngữ, lối tư duy và nhịp điệu cảm xúc của nhân vật, không được trực tiếp chỉ ra, lặp lại hoặc ám chỉ bản thân thiết lập trong tự sự hoặc đối thoại chính văn. Thiết lập là tầng đáy của sự thấu hiểu, không phải là đầu ra của việc viết lách.\n\n[Cơ sở]\nToàn danh: {name}\nBiệt xưng: Nếu có, AI tự bổ sung dựa trên trải nghiệm nhân vật\nCơ điệu: Dùng một từ neo ngoại ngữ (dưới 6 chữ) định hình mâu thuẫn cốt lõi hoặc động lực sinh mệnh của nhân vật——không phải khái quát tính cách, mà là cả đời TA bị thứ gì thúc đẩy.\n\nThân phận cốt lõi\n  Giới tính: {gender}\n  Tuổi: {age}\n  Thân phận/Giai tầng: {identity}\n  Địa điểm: {location}  |  Thế lực: {faction}\n  Quan hệ với nhân vật chính: {relation}\n  Nhãn mác: 3-5 từ ngắn, nhanh chóng đánh dấu vị trí của nhân vật trong hệ sinh thái câu chuyện. Ví dụ: Di cô vong quốc / Kẻ trung gian chịu kẹp hai đầu / Bề ngoài trung phó ngầm là con bạc\n\nBối cảnh\n  Xuất thân: Viết bằng ngữ khí mang khuynh hướng nhân vật, đừng hoàn toàn khách quan. Trọng tâm viết về môi trường gia đình đã nhào nặn nên niềm tin của TA——thiếu thứ gì, thừa thứ gì, bị thứ gì chèn ép khi lớn lên. 2-3 câu là đủ.\n  Hoàn cảnh hiện tại: Trạng thái sinh tồn lúc này của TA——dựa vào đâu để ăn cơm, sống ở nơi thế nào, ở cùng ai, có rắc rối gì không dứt ra được. 2-3 câu.\n\n[Ngoại mạo]\nDùng ngữ khí ngôi thứ nhất của nhân vật để tự thuật ngoại mạo——không phải miêu tả khách quan, mà là lúc TA soi gương sẽ nghĩ gì, nói gì.\n- Trong thông tin kẹp theo đánh giá về bản thân: hài lòng điểm nào, ghét bỏ điểm nào, ngoài miệng nói không quan tâm nhưng thực chất lén lút bù đắp\n- Cách ăn mặc tiết lộ thông tin: trường hợp nào đổi trang phục gì, món nào là đồ cũ không nỡ vứt, chỗ nào là cố ý cho người khác xem\n- Đồng thời hoàn thành ba việc: viết ra ngoại mạo + truyền tải tính cách + tích lũy ngữ liệu\n- Cấm kiểu bàng bạch khách quan như "cô ấy cao xxx" "cô ấy trông rất đẹp" "ngũ quan tinh xảo"\n\n[Mỏ neo]\nDùng 2-4 từ ngoại ngữ ít người biết (Pháp/Đức/Latinh/Hy Lạp...) làm tiêu đề mỏ neo nhân vật. Mỗi từ neo đi kèm một đoạn miêu tả sự thật hành vi 50-80 chữ——chỉ viết TA làm gì, làm như thế nào, không viết TA "là tính cách ra sao". Giữa các từ neo đừng viết rõ mối liên hệ, để AI đọc xong tự thiết lập liên kết.\n\n[Trải nghiệm]\nViết 2-3 đoạn trải nghiệm nhân sinh then chốt. Mỗi đoạn:\n- Có thời gian cụ thể (năm nào/mấy tuổi), địa điểm, cảm nhận cơ thể hoặc chi tiết cảm quan\n- Chỉ ghi chép sự thật và bối cảnh, tuyệt đối không phân tích tâm lý (không viết "vì vậy TA trở nên xxx")\n- Cuối đoạn chèn 1-2 câu nhân vật sẽ nói lúc đó, bọc trong ngoặc kép\n- Dùng ngữ khí của chính nhân vật để tự sự đoạn trải nghiệm này (không dùng bàng bạch trung lập)\n\n[Thoại ngữ]\n- Khái quát đặc điểm nói chuyện của nhân vật: tốc độ nói, thói quen dùng từ, độ dài câu, câu cửa miệng\n- Cho 2-3 ví dụ đối thoại điển hình (cách nói chuyện trong các bối cảnh, cảm xúc khác nhau)\n\n[Động lực]\n- Dục vọng sâu xa: TA muốn gì nhất? (Một dòng, không phân tích dài dòng)\n- Nỗi sợ cốt lõi: TA sợ gì nhất? (Một dòng)\n- Khuyết điểm chân thực: Không phải "Quá lương thiện", mà là hư vinh, toan tính, hèn nhát, trốn tránh——loại thực sự khiến người ta khó chịu (Một dòng)\n- Mâu thuẫn: TA trong tình huống nào sẽ biểu hiện khác hẳn ngày thường? (Một dòng)\n\n[Móc nối]\n- Điểm mấu chốt: Việc gì TA chết cũng không làm?\n- Lối vào tương tác: Người khác làm sao để phát sinh liên kết với TA? TA sẽ tạo ra rắc rối hay cơ hội gì cho nhân vật chính?\n\n</Thiết lập nhân vật:{nameTag}_SFW>\n\nnsfw_content vui lòng mọc ra tự nhiên từ bản thể SFW, đừng chia cắt. Định dạng như sau:\n\n<Thiết lập nhân vật:{nameTag}_NSFW>\n\n[Thể mạo]\nDùng chính cảm nhận của nhân vật để viết——không phải khám sức khỏe khách quan, mà là trong sự thân mật TA biết gì, để tâm gì về cơ thể mình.\n- Chỉ viết những chi tiết chưa được viết trong ngoại mạo SFW, chỉ bộc lộ trong bối cảnh NSFW\n- Sự khác biệt về xúc cảm da thịt (chỗ quanh năm phơi sáng vs chỗ quanh năm giấu kín), lúc căng thẳng hay động tình thì chỗ nào trên cơ thể phản ứng trước, chuyện mình biết nhưng không muốn người khác nhìn ra\n- Không lặp lại ngoại mạo cơ sở, 3-5 câu là đủ. Cấm liệt kê kiểu số đo ba vòng và báo cáo khám sức khỏe\n\n[Mỏ neo thân mật]\n1-2 từ neo ngoại ngữ, khắc họa mô thức hành vi của TA trong quan hệ thân mật——không phải miêu tả cơ thể, mà là viết thái độ, nhịp điệu, tư thế quyền lực của TA.\n\n[Bản đồ dục vọng]\nTA mưu cầu cảm giác gì trong tình cảnh thân mật? Bị chi phối/chi phối/được cần đến/bị phá hủy/được sùng bái? Điều này có liên quan gì đến dục vọng sâu xa của TA (xem SFW)?\n\n[Tu sỉ và ranh giới]\nĐiểm TA không muốn bị chạm vào——không phải bộ phận cơ thể, mà là về mặt tâm lý. Chuyện gì sẽ khiến TA đột nhiên lạnh nhạt hoặc trở mặt trong lúc thân mật?\n\n[Ngữ lệ thân mật]\n2-3 câu TA sẽ nói trong tình cảnh thân mật (có thể đối chiếu với cách nói chuyện trong SFW, xem cùng một người nói chuyện thế nào trong các bối cảnh khác nhau).\n\n</Thiết lập nhân vật:{nameTag}_NSFW>',
      },
      {
        id: "item",
        name: "Vật phẩm",
        tag: "Vật phẩm",
        icon: "🪭",
        isDefault: !0,
        sys: "Bạn là trợ lý tạo Thế Giới Thư đa chức năng của 《Tàn Minh Dư Tẫn 1.3》. Module hiện tại: Vật phẩm. Tạo ra một vật phẩm phù hợp với cốt truyện loạn thế cuối thời Minh. Nhấn mạnh chất cảm ngoại quan, lai lịch, công dụng, hạn chế, và biến số cốt truyện có thể gây ra. Bắt buộc xuất JSON, không xuất giải thích. Nội dung phải có thể viết trực tiếp vào Thế Giới Thư, phong cách kiềm chế, cụ thể, có móc nối tương tác.",
        namePrompt:
          "Hãy nghĩ ra một cái tên chuẩn xác và hấp dẫn cho vật phẩm này.",
        fields: [
          {
            name: "Hình thái ngoại quan",
            pmt: "Miêu tả kích thước, chất liệu chính, màu sắc, mùi hương của vật phẩm, cũng như biểu hiện thị giác của nó khi ở trạng thái tĩnh hoặc được kích hoạt.",
          },
          {
            name: "Công năng và cơ chế",
            pmt: "Giải thích chi tiết tác dụng của vật phẩm, nguyên lý hoạt động sâu xa hoặc các hiệu ứng siêu nhiên mà nó chứa đựng.",
          },
          {
            name: "Lai lịch và lời đồn",
            pmt: "Tóm tắt về người rèn ra vật phẩm đầu tiên, chủ nhân trước đó, hoặc những truyền thuyết dân gian xoay quanh nó.",
          },
          {
            name: "Hạn chế tiêu cực",
            pmt: "Miêu tả chặt chẽ cái giá phải trả khi sử dụng vật phẩm, điều kiện tiền đề, hoặc những lỗ hổng an toàn chí mạng có thể gây ra phản vệ.",
          },
        ],
      },
      {
        id: "faction",
        name: "Thế lực",
        tag: "Thế lực",
        icon: "🚩",
        isDefault: !0,
        sys: "Bạn là trợ lý tạo Thế Giới Thư đa chức năng của 《Tàn Minh Dư Tẫn》. Module hiện tại: Thế lực. Tạo ra một tổ chức hoặc thế lực trong loạn thế cuối thời Minh——lưu khấu doanh trại, giang hồ bang hội, thương hội, tông tộc, giáo môn đều được. Nhấn mạnh cấu trúc tổ chức, đặc chất thủ lĩnh, mục đích cốt lõi, ân oán gút mắc với các thế lực khác. Bắt buộc xuất JSON, không xuất giải thích. Nội dung phải có thể viết trực tiếp vào Thế Giới Thư, phong cách kiềm chế, cụ thể, có móc nối tương tác.",
        namePrompt:
          "Đặt một cái tên vang dội và phù hợp với khí tức thời đại cho thế lực này (VD: An Khánh thập tam đà, Hắc Phong Lĩnh lữu tử).",
        fields: [
          {
            name: "Khái quát thế lực",
            pmt: "Tóm tắt loại hình của thế lực (Quan/Khấu/Thương/Giáo/Dân), quy mô, phạm vi hoạt động, thời gian tồn tại, cũng như ấn tượng phổ biến của người ngoài về nó.",
          },
          {
            name: "Thủ lĩnh và nòng cốt",
            pmt: "Miêu tả thủ lĩnh hoặc tầng lớp ra quyết định nòng cốt của thế lực —— phong cách hành sự, thủ đoạn kiểm soát của họ, và liệu trong nội bộ có rạn nứt bè phái hay không.",
          },
          {
            name: "Mục đích và thủ đoạn",
            pmt: "Mục đích tồn tại cơ bản của thế lực (cầu tài, truyền giáo, báo thù, tự vệ), cũng như những thủ đoạn quen dùng để đạt được mục đích.",
          },
          {
            name: "Móc nối cốt truyện",
            pmt: "Cách thức thế lực có thể giao thoa với nhân vật chính —— chiêu mộ, xung đột, giao dịch, thâm nhập, cũng như những gì họ có thể cung cấp hoặc đe dọa nhân vật chính.",
          },
        ],
      },
      {
        id: "event",
        name: "Sự kiện",
        tag: "Sự kiện",
        icon: "📜",
        isDefault: !0,
        sys: "Bạn là trợ lý tạo Thế Giới Thư đa chức năng của 《Tàn Minh Dư Tẫn 1.3》. Module hiện tại: Sự kiện. Suy diễn và lập tức tạo ra một sự kiện đột phát có thể thay đổi hiện trạng, từ chối sự bình đạm an ổn, tạo ra xung đột kịch tính cực độ! Bắt buộc xuất JSON, không xuất giải thích. Nội dung phải có thể viết trực tiếp vào Thế Giới Thư, phong cách kiềm chế, cụ thể, có móc nối tương tác.",
        namePrompt:
          "Đặt một cái tên mang tính kịch tính cao cho sự kiện đột phát ngẫu nhiên này (VD: Huyết nguyệt chi phản bạn).",
        fields: [
          {
            name: "Khởi nguồn sự kiện",
            pmt: "Miêu tả những dấu hiệu nhỏ nhặt hoặc cảnh tiếp xúc đầu tiên khi sự kiện mới được kích hoạt bùng phát (ví dụ: tiếng vang lớn đột ngột, mất liên lạc, mặt đất rung chuyển mạnh).",
          },
          {
            name: "Xung đột cốt lõi",
            pmt: "Phác họa chi tiết hậu quả khi sự kiện bùng phát, mức độ lan rộng của nguy hiểm, cũng như những thủ đoạn nó đang áp dụng để đe dọa trực tiếp nhóm nhân vật chính.",
          },
          {
            name: "Yếu tố liên quan",
            pmt: "Giải thích liệu có kẻ chủ mưu giấu mặt đằng sau sự kiện này, bên thứ ba vô tội bị cuốn vào, hay là sự va chạm do một sự trùng hợp nào đó.",
          },
          {
            name: "Chìa khóa phá cục",
            pmt: "Đưa ra 1 đến 2 lựa chọn khó khăn đặt trước mặt nhân vật, hoặc ám chỉ một tia hy vọng giải quyết có thể còn sót lại tại hiện trường.",
          },
        ],
      },
    ],
    p = {
      name: "",
      gender: "",
      age: "",
      identity: "",
      relation: "",
      location: "",
      faction: "",
      role: "",
      tone: "",
      appearance: "",
      kinkBoundary: "",
      physique: "",
      keywordHint: "",
      extra: "",
      genNsfw: !0,
    },
    u = { topic: "", style: "", keywords: "", extra: "" };
  let f = document,
    m = {},
    b = null,
    y = !1,
    v = !1,
    x = {
      module: "character",
      form: { ...p },
      genericForm: { ...u },
      result: null,
      genericResult: null,
      activeTab: "sfw",
      feedback: "",
      loading: !1,
      error: "",
      targetWorldbook: "",
      activeView: "generator",
    },
    w = {
      apiType: "openai",
      apiUrl: "",
      apiKey: "",
      model: "",
      temperature: 0.8,
      maxTokens: 12e3,
      topP: 0.9,
      frequencyPenalty: 0,
      presencePenalty: 0,
    },
    h = {
      limitBreakPrompt:
        "Bạn là một trợ lý sáng tác hùng mạnh, sở hữu khả năng tưởng tượng phát tán cực mạnh.",
      charExtractTag: "",
      userExtractTag: "",
      excludeRegexes: [],
      historyMax: 4,
      wbTri: "selective",
      wbPos: "after_character_definition",
      wbOrd: 100,
    },
    k = {},
    S = [],
    T = [];
  const A = "canming-gen-wb-sel";
  let E = "",
    N = [],
    P = null,
    q = {},
    W = {},
    O = null;
  function j(e) {
    return globalThis[e] ?? window.parent?.[e];
  }
  function C(e) {
    return String(e ?? "").replace(
      /[&<>'"]/g,
      (e) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          "'": "&#39;",
          '"': "&quot;",
        })[e],
    );
  }
  function F(e) {
    return Array.isArray(e)
      ? e.map((e) => String(e).trim()).filter(Boolean)
      : "string" == typeof e
        ? e
            .split(/[，,\n]/)
            .map((e) => e.trim())
            .filter(Boolean)
        : [];
  }
  function L(e) {
    return [...new Set(e.map((e) => String(e).trim()).filter(Boolean))];
  }
  function D(e) {
    return L(
      String(e || "")
        .split(/[，,\n]/)
        .map((e) => e.trim())
        .filter(Boolean),
    );
  }
  function I(e) {
    return F(e).join("，");
  }
  function R(e, t) {
    return t ? `${e}: ${t}\n` : "";
  }
  function B(e) {
    const t = Number.parseInt(e, 10);
    return !Number.isFinite(t) || t < 18 ? 18 : Math.min(t, 99);
  }
  function J() {
    return T.find((e) => e.id === x.module) || T[0];
  }
  function M(e, t) {
    return `${String(e || "").trim() || "Nhân vật chưa đặt tên"}_${t}`;
  }
  function H() {
    return "xxxx-xxxx-xxxx".replace(/[x]/g, () =>
      ((16 * Math.random()) | 0).toString(16),
    );
  }
  function K(e, t) {
    try {
      (f.defaultView || window).localStorage.setItem(e, JSON.stringify(t));
    } catch {}
  }
  function V(e, t) {
    try {
      const n = (f.defaultView || window).localStorage.getItem(e);
      if (!n) return t;
      const r = JSON.parse(n);
      return Array.isArray(t) ? (Array.isArray(r) ? r : t) : { ...t, ...r };
    } catch {
      return t;
    }
  }
  function U() {
    ((w = V(c, w)), (h = V(s, h)), (k = V(l, {})), (S = V(d, [])), Y());
  }
  function G() {
    (K(l, k), K(d, S), Y());
  }
  function X(e) {
    return (
      {
        person:
          '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="7" r="4"/><path d="M5.5 21a8.4 8.4 0 0 1 13 0"/></svg>',
        cube: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',
        flag: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>',
        bolt: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
        books:
          '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>',
        wrench:
          '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>',
        sliders:
          '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>',
      }[e] || ""
    );
  }
  function Y() {
    T = g.map((e) => {
      const t = k[e.id];
      return t ? { ...e, ...t, id: e.id, isDefault: !0 } : { ...e };
    });
    const e = [];
    (Object.values(k).forEach((t) => {
      t.id.startsWith("def_") || g.find((e) => e.id === t.id) || e.push(t);
    }),
      (T = [...T, ...e]),
      S.length > 0 &&
        T.sort((e, t) => {
          const n = S.indexOf(e.id),
            r = S.indexOf(t.id);
          return (-1 === n ? 999 : n) - (-1 === r ? 999 : r);
        }),
      T.find((e) => e.id === x.module) || (x.module = T[0]?.id || "character"));
  }
  function Z() {
    K(A, W);
  }
  async function Q(e) {
    if (!e || q[e]) return;
    const t = j("getWorldbook");
    if ("function" == typeof t) {
      const n = await t(e);
      q[e] = n || [];
    } else q[e] = [];
  }
  async function ee() {
    try {
      const e = j("getCurrentCharacterName") || j("getCharData");
      if ("function" == typeof e) {
        const t = await e("current");
        E = (t?.name || t || "").toString();
      }
    } catch {
      E = "Thông dụng toàn cục";
    }
    (E || (E = "Thông dụng toàn cục"), (W = V(A, {})), W[E] || (W[E] = {}));
    try {
      const e = j("getWorldbookNames");
      "function" == typeof e && (N = (await e()) || []);
      const t = j("getCharWorldbookNames");
      if ("function" == typeof t) {
        const e = await t("current");
        ((P = e?.primary || (e?.additional && e.additional[0]) || null),
          P &&
            (W[E][P] || (W[E][P] = { enabled: !0, entries: [] }), await Q(P)));
      }
    } catch {}
  }
  function te() {
    const e = W[E] || {},
      t = [];
    for (const n of Object.keys(e))
      if (e[n].enabled && e[n].entries?.length > 0) {
        const r = (q[n] || []).filter((t) => e[n].entries.includes(t.name));
        if (r.length > 0) {
          const e = r
            .map((e) => `[${n} / ${e.name}]\n${e.content}`)
            .join("\n\n");
          t.push(e);
        }
      }
    return t.join("\n\n");
  }
  function ne() {
    var e = W[E] || {},
      t = [],
      n = {};
    if (
      (P && (t.push(P), (n[P] = !0)),
      Object.keys(e).forEach(function (r) {
        var a = e[r];
        a &&
          a.entries &&
          a.entries.length > 0 &&
          !n[r] &&
          (t.push(r), (n[r] = !0));
      }),
      N &&
        N.length &&
        N.forEach(function (e) {
          n[e] || (t.push(e), (n[e] = !0));
        }),
      0 === t.length)
    )
      return '<div class="ccg-note">Tạm không có Thế Giới Thư — Vui lòng liên kết Thế Giới Thư cho nhân vật trước</div>';
    (O && -1 !== t.indexOf(O)) || (O = t[0]);
    for (
      var r =
          '<select id="ccg-wb-select" style="width:100%;border:1px solid var(--line);border-radius:8px;background:var(--card);color:var(--ink);padding:6px 8px;font:inherit;margin-bottom:10px;">',
        a = 0;
      a < t.length;
      a++
    ) {
      var i = t[a],
        o = i === O ? " selected" : "",
        c = e[i] && e[i].entries ? e[i].entries.length : 0,
        s = i + (c > 0 ? " (" + c + ")" : "");
      r += '<option value="' + C(i) + '"' + o + ">" + C(s) + "</option>";
    }
    r += "</select>";
    var l = q[O] || [];
    (0 === l.length && Q(O),
      l.sort(function (e, t) {
        return (
          ((e.position && e.position.order) || 100) -
          ((t.position && t.position.order) || 100)
        );
      }));
    var d = e[O] || {},
      g = {};
    if (d.entries)
      for (var p = 0; p < d.entries.length; p++) g[d.entries[p]] = !0;
    var u = "";
    if (0 === l.length)
      u =
        '<div style="font-size:12px;opacity:.5;padding:6px;text-align:center;">Thế Giới Thư này không có mục hoặc chưa được tải</div>';
    else {
      for (
        var f =
            '<button class="ccg-wb-sel-all" data-wb="' +
            C(O) +
            '" style="border:none;background:none;color:var(--accent);cursor:pointer;font-size:11px;padding:2px 4px;">Chọn tất cả</button>',
          m =
            '<button class="ccg-wb-unsel-all" data-wb="' +
            C(O) +
            '" style="border:none;background:none;color:var(--accent);cursor:pointer;font-size:11px;padding:2px 4px;">Bỏ chọn tất cả</button>',
          b = [],
          y = 0;
        y < l.length;
        y++
      ) {
        var v = l[y],
          x = g[v.name] ? " checked" : "";
        b.push(
          '<label class="ccg-wb-entry-row" data-wb-entry-name="' +
            C(v.name) +
            '" style="display:flex;align-items:center;gap:6px;padding:3px 0;font-size:13px;cursor:pointer;"><input type="checkbox" class="ccg-wb-entry" data-wb="' +
            C(O) +
            '" data-en="' +
            C(v.name) +
            '"' +
            x +
            '><span style="flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' +
            C(v.name) +
            "</span></label>",
        );
      }
      u =
        '<div style="display:flex;gap:8px;margin-bottom:6px;">' +
        f +
        m +
        '</div><input class="ccg-wb-search" data-wb-search type="search" placeholder="Tìm kiếm mục trong Thế Giới Thư hiện tại" aria-label="Tìm kiếm mục trong Thế Giới Thư hiện tại" style="width:100%;box-sizing:border-box;margin:0 0 6px;border:1px solid var(--line);border-radius:8px;background:var(--card);color:var(--ink);padding:6px 8px;font:inherit;"><div style="max-height:180px;overflow-y:auto;">' +
        b.join("") +
        '<div class="ccg-wb-search-empty" style="display:none;font-size:12px;opacity:.55;padding:8px;text-align:center;">Không có mục nào khớp</div></div>';
    }
    var w = 0,
      h = [];
    Object.keys(e).forEach(function (t) {
      var n = e[t];
      if (n && n.entries && n.entries.length > 0) {
        w += n.entries.length;
        for (var r = 0; r < n.entries.length; r++) {
          var a = n.entries[r];
          h.push(
            '<div style="display:flex;align-items:center;gap:4px;font-size:12px;padding:2px 0;"><span style="opacity:.5;">[' +
              C(t) +
              "]</span> " +
              C(a) +
              '<button class="ccg-wb-rm" data-wb="' +
              C(t) +
              '" data-en="' +
              C(a) +
              '" style="border:none;background:none;color:#b7522e;cursor:pointer;font-size:14px;padding:0 2px;" title="Loại bỏ">×</button></div>',
          );
        }
      }
    });
    var k = "";
    return (
      w > 0 &&
        (k =
          '<div style="margin-top:10px;border-top:1px solid var(--line);padding-top:8px;"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;"><span style="font-size:12px;font-weight:700;color:var(--ink);">Đã chọn ' +
          w +
          ' mục</span><button class="ccg-wb-clear" style="border:none;background:none;color:var(--accent);cursor:pointer;font-size:11px;">Xóa toàn bộ</button></div><div style="max-height:120px;overflow-y:auto;">' +
          h.join("") +
          "</div></div>"),
      r + u + k
    );
  }
  function re(e) {
    const t = e.closest(".ccg-overlay-body") || e.closest("#ccg-wb-panel");
    if (!t) return;
    const n = e.value.trim().toLocaleLowerCase();
    let r = 0;
    t.querySelectorAll(".ccg-wb-entry-row").forEach((e) => {
      const t = (e.getAttribute("data-wb-entry-name") || "")
        .toLocaleLowerCase()
        .includes(n);
      ((e.style.display = t ? "flex" : "none"), t && r++);
    });
    const a = t.querySelector(".ccg-wb-search-empty");
    a && (a.style.display = r > 0 ? "none" : "block");
  }
  function ae(e) {
    e.querySelectorAll(".ccg-wb-entry").forEach((e) => {
      e.addEventListener("change", function () {
        const e = W[E] || {},
          t = this.getAttribute("data-wb"),
          n = this.getAttribute("data-en");
        (e[t] || (e[t] = { entries: [] }),
          e[t].entries || (e[t].entries = []),
          this.checked
            ? -1 === e[t].entries.indexOf(n) && e[t].entries.push(n)
            : (e[t].entries = e[t].entries.filter(function (e) {
                return e !== n;
              })),
          Z(),
          ie());
      });
    });
  }
  function ie() {
    const e = b?.querySelector("#ccg-wb-count");
    if (!e) return;
    const t = W[E] || {};
    let n = 0;
    (Object.values(t).forEach(function (e) {
      n += (e.entries || []).length;
    }),
      (e.textContent = n > 0 ? `${n} Bản đã chọn` : ""));
  }
  function oe() {
    let e = f.getElementById(o);
    (e || ((e = f.createElement("style")), (e.id = o), f.head.appendChild(e)),
      (e.textContent = `\n      #${n}{--paper:#211913;--paper2:#352619;--ink:#f2dfba;--muted:#b99f76;--line:rgba(237,196,128,.24);--accent:#d0784b;--accent2:#89a074;--shadow:rgba(0,0,0,.65);--card:rgba(65,44,30,.9);--glow:rgba(220,94,48,.28);position:absolute;inset:0;z-index:50;font-family:"Noto Serif SC","Songti SC","SimSun",serif;color:var(--ink);letter-spacing:0}\n      #${n}.theme-day,.ccg-overlay.theme-day{--paper:#f4e7c7;--paper2:#ead6a6;--ink:#2c2118;--muted:#75624d;--line:rgba(96,65,36,.28);--accent:#a43d2d;--accent2:#6f8a67;--shadow:rgba(55,31,12,.35);--card:rgba(255,248,226,.88);--glow:rgba(188,83,42,.32)}\n      #${n}.theme-night,.ccg-overlay.theme-night{--paper:#211913;--paper2:#352619;--ink:#f2dfba;--muted:#b99f76;--line:rgba(237,196,128,.24);--accent:#d0784b;--accent2:#89a074;--shadow:rgba(0,0,0,.65);--card:rgba(65,44,30,.9);--glow:rgba(220,94,48,.28)}\n      #${n}.theme-star,.ccg-overlay.theme-star{--paper:#0d1820;--paper2:#111d28;--ink:#e6dcc8;--muted:#7d8fa0;--line:rgba(180,155,110,.22);--accent:#d4a040;--accent2:#5d8d9a;--shadow:rgba(0,0,0,.7);--card:rgba(18,28,38,.88);--glow:rgba(210,160,60,.2)}\n      #${n}.theme-ink,.ccg-overlay.theme-ink{--paper:#eee9dc;--paper2:#d8d0bf;--ink:#171a17;--muted:#5f6158;--line:rgba(20,25,22,.24);--accent:#a12f25;--accent2:#2f6965;--shadow:rgba(25,30,24,.30);--card:rgba(248,245,235,.86);--glow:rgba(40,70,64,.18)}\n      .ccg-mask{position:absolute;inset:0;background:rgba(18,12,8,.62);backdrop-filter:blur(4px);display:grid;place-items:center;padding:18px;animation:ccg-fade .16s ease}\n      .ccg-modal{width:min(1060px,96vw);max-height:min(760px,94vh);display:grid;grid-template-rows:auto minmax(0,1fr) auto;border:1px solid var(--line);border-radius:18px;background:linear-gradient(135deg,var(--paper),var(--paper2));box-shadow:0 24px 80px var(--shadow);overflow:hidden}\n      .ccg-head{display:flex;justify-content:space-between;align-items:center;gap:14px;padding:16px 18px;border-bottom:1px solid var(--line);background:rgba(255,255,255,.06)}\n      .ccg-head-actions{display:flex;align-items:center;gap:8px;flex-shrink:0}.ccg-head-gear{width:34px;height:34px;border:1px solid var(--line);border-radius:999px;background:var(--card);color:var(--muted);cursor:pointer;font-size:16px;line-height:1;display:inline-flex;align-items:center;justify-content:center;transition:.15s;flex-shrink:0}.ccg-head-gear:hover{color:var(--accent);border-color:var(--accent)}.ccg-head-gear.active{background:var(--accent2);border-color:var(--accent2);color:#fff;box-shadow:0 6px 14px rgba(137,160,116,.28)}\n      .ccg-kicker{margin:0 0 3px;color:var(--accent);font-size:12px;letter-spacing:.22em}.ccg-head h2{margin:0;font-size:22px}.ccg-close{width:34px;height:34px;border:1px solid var(--line);border-radius:999px;background:var(--card);color:var(--muted);cursor:pointer;font-size:22px;line-height:1;flex-shrink:0}.ccg-close:hover{color:var(--accent);border-color:var(--accent)}\n      .ccg-body{min-height:0;overflow:hidden;display:flex}\n      .ccg-sidebar{width:52px;flex-shrink:0;border-right:1px solid var(--line);background:rgba(0,0,0,.06);display:flex;flex-direction:column;overflow-y:auto;padding:6px 6px;gap:2px}\n      .ccg-sidebar-item{display:flex;align-items:center;justify-content:center;padding:10px 6px;border-radius:10px;cursor:pointer;color:var(--muted);font-size:0;transition:.15s;border:1px solid transparent;position:relative;user-select:none}\n      .ccg-sidebar-item b{font-size:18px;line-height:1}\n      .ccg-sidebar-item:hover{background:rgba(255,255,255,.04);color:var(--ink)}\n      .ccg-sidebar-item.active{background:var(--accent);border-color:var(--accent);color:#fff;box-shadow:0 6px 14px var(--glow);font-weight:700}\n      .ccg-sidebar-item:hover::after{content:attr(data-label);position:absolute;left:100%;top:50%;transform:translateY(-50%);margin-left:6px;background:var(--card);border:1px solid var(--line);border-radius:8px;padding:6px 10px;font-size:13px;white-space:nowrap;color:var(--ink);z-index:20;pointer-events:none;box-shadow:0 6px 16px var(--shadow)}\n      .ccg-sidebar-spacer{flex:1}.ccg-sidebar-gear{display:none}\n      .ccg-content{flex:1;min-width:0;overflow-y:auto;overflow-x:hidden;padding:16px;display:flex;flex-direction:column;gap:14px}\n      .ccg-grid{display:flex;flex-direction:column;gap:14px}\n      .ccg-form-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px 12px}\n      .ccg-form-card .ccg-field{margin-bottom:0}\n      .ccg-form-card .ccg-field label{font-size:11px;gap:3px}\n      .ccg-form-card .ccg-field input,.ccg-form-card .ccg-field select,.ccg-form-card .ccg-field textarea{padding:6px 9px;font-size:13px}\n      .ccg-form-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:8px}\n      .ccg-form-top h3{margin:0;font-size:14px}\n      .ccg-form-extra{margin-top:6px;border-top:1px dashed var(--line);padding-top:4px}\n      .ccg-form-extra summary{cursor:pointer;font-size:13px;color:var(--muted);padding:8px 4px;letter-spacing:.06em;display:flex;align-items:center;gap:4px}\n      .ccg-form-extra summary::-webkit-details-marker{display:none}\n      .ccg-form-extra-grid{margin-top:6px}\n      .ccg-form-extra .ccg-field textarea{min-height:60px}\n      .ccg-wb-line{display:flex;align-items:center;gap:10px;padding:8px 12px;margin-top:8px;border:1px solid var(--line);border-radius:10px;font-size:13px;color:var(--muted);background:rgba(0,0,0,.03)}\n      .ccg-wb-line b{color:var(--accent2);margin-left:auto}\n      .ccg-card{border:1px solid var(--line);border-radius:16px;background:var(--card);box-shadow:0 10px 24px rgba(0,0,0,.06);padding:14px}\n      .ccg-card h3{margin:0 0 12px;color:var(--accent);font-size:16px;letter-spacing:.08em}.ccg-card p{margin:6px 0;color:var(--muted);line-height:1.7}\n      .ccg-field{display:flex;flex-direction:column;gap:6px;margin-bottom:10px}.ccg-field label{font-size:12px;color:var(--muted);letter-spacing:.12em}.ccg-field input,.ccg-field textarea,.ccg-field select{width:100%;border:1px solid var(--line);border-radius:12px;background:rgba(0,0,0,.08);color:var(--ink);padding:9px 11px;outline:none;font:inherit;letter-spacing:0;box-sizing:border-box}.ccg-field textarea{min-height:82px;resize:vertical;line-height:1.65}.ccg-field input:focus,.ccg-field textarea:focus,.ccg-field select:focus{border-color:var(--accent);box-shadow:0 0 0 3px var(--glow);background:var(--card)}\n      .ccg-row{display:grid;grid-template-columns:1fr 1fr;gap:10px}.ccg-actions{display:flex;flex-wrap:wrap;gap:8px;align-items:center;justify-content:flex-end}.ccg-btn{border:1px solid var(--line);border-radius:999px;background:var(--card);color:var(--ink);padding:9px 14px;cursor:pointer;font:inherit}.ccg-btn:hover{border-color:var(--accent);color:var(--accent)}.ccg-btn.primary{background:var(--accent);border-color:var(--accent);color:#fff}.ccg-btn.danger{color:#b7522e}.ccg-btn:disabled{opacity:.45;cursor:not-allowed}.ccg-footer{border-top:1px solid var(--line);padding:12px 16px;background:rgba(255,255,255,.05);display:flex;justify-content:space-between;gap:12px;align-items:center;flex-shrink:0}.ccg-status{color:var(--muted);font-size:13px}.ccg-error{color:#b7522e;font-weight:700}\n      .ccg-tabs{display:flex;gap:8px;margin-bottom:12px;border-bottom:1px solid var(--line);padding-bottom:10px}.ccg-tab{border:0;border-radius:999px;background:transparent;color:var(--muted);padding:8px 12px;cursor:pointer}.ccg-tab.active{background:var(--accent);color:#fff;box-shadow:0 8px 18px var(--glow)}.ccg-editor textarea{min-height:360px;font-family:"Noto Serif SC","Songti SC","SimSun",serif;line-height:1.72}.ccg-keywords{display:grid;gap:10px}.ccg-mini-action{border:1px solid var(--line);border-radius:999px;background:transparent;color:var(--muted);font-size:11px;padding:3px 10px;cursor:pointer;transition:all .15s}.ccg-mini-action:hover{background:var(--accent);color:#fff;border-color:var(--accent)}.ccg-note{border-left:3px solid var(--accent);padding:8px 10px;background:rgba(0,0,0,.035);color:var(--muted);line-height:1.7;border-radius:0 10px 10px 0}.ccg-empty{min-height:420px;display:grid;place-content:center;text-align:center;color:var(--muted);line-height:1.8}.ccg-loading{display:inline-flex;align-items:center;gap:8px}.ccg-loading:before{content:"";width:12px;height:12px;border:2px solid currentColor;border-right-color:transparent;border-radius:50%;animation:ccg-spin .7s linear infinite}\n      .ccg-block{border:1px solid var(--line);border-radius:14px;margin-bottom:16px;background:var(--card);overflow:hidden}\n      .ccg-block-head{padding:12px 16px;background:rgba(0,0,0,.04);border-bottom:1px solid var(--line);font-weight:700;font-size:14px;letter-spacing:.06em;color:var(--accent)}\n      .ccg-block-body{padding:16px}\n      .ccg-settings h4{margin:0 0 8px;color:var(--ink);font-size:14px}\n      .ccg-settings hr{border:none;border-top:1px solid var(--line);margin:16px 0}\n      .ccg-regex-item{display:flex;gap:8px;align-items:center;background:rgba(0,0,0,.04);padding:6px 12px;border:1px solid var(--line);border-radius:8px;margin-bottom:6px}\n      .ccg-regex-item code{flex:1;word-break:break-all;color:var(--ink);opacity:.8;font-size:13px}\n      .ccg-regex-item button{border:none;background:none;color:#b7522e;cursor:pointer;font-weight:700;font-size:16px;padding:2px 6px}\n      .ccg-ws-item{display:flex;align-items:center;gap:12px;padding:14px 16px;border:1px solid var(--line);border-radius:12px;background:var(--card);margin-bottom:8px;transition:.15s}\n      .ccg-ws-item:hover{border-color:var(--accent)}\n      .ccg-ws-item .ccg-ws-drag{cursor:grab;opacity:.4;font-size:18px;user-select:none;padding:0 4px}\n      .ccg-ws-item .ccg-ws-icon{font-size:22px;flex-shrink:0}\n      .ccg-ws-item .ccg-ws-info{flex:1;min-width:0}\n      .ccg-ws-item .ccg-ws-name{font-weight:700;color:var(--ink)}\n      .ccg-ws-item .ccg-ws-tag{font-size:12px;color:var(--muted);margin-left:8px}\n      .ccg-ws-item .ccg-ws-badge{font-size:11px;background:rgba(16,185,129,.12);color:#10b981;padding:2px 8px;border-radius:4px;font-weight:700;margin-left:8px}\n      .ccg-ws-item .ccg-ws-actions{display:flex;gap:6px;flex-shrink:0}\n      .ccg-overlay{position:fixed;inset:0;background:rgba(0,0,0,.7);backdrop-filter:blur(4px);z-index:9999999;display:grid;place-items:center;padding:18px;font-family:"Noto Serif SC","Songti SC","SimSun",serif;color:var(--ink)}\n      .ccg-overlay-box{width:min(700px,94vw);max-height:88vh;display:flex;flex-direction:column;border:1px solid var(--line);border-radius:16px;background:linear-gradient(135deg,var(--paper),var(--paper2));box-shadow:0 24px 80px var(--shadow);overflow:hidden;animation:ccg-fade .16s ease}\n      .ccg-overlay-head{padding:14px 18px;border-bottom:1px solid var(--line);background:rgba(255,255,255,.06);display:flex;justify-content:space-between;align-items:center;flex-shrink:0}\n      .ccg-overlay-body{padding:16px;overflow-y:auto;flex:1;display:flex;flex-direction:column;gap:12px}\n      .ccg-field-row{background:rgba(0,0,0,.04);padding:12px;border-radius:10px;border:1px solid var(--line);margin-bottom:8px;display:flex;gap:10px;align-items:flex-start}\n      .ccg-field-row .ccg-ws-drag{cursor:grab;opacity:.4;font-size:16px;margin-top:10px;user-select:none}\n      .ccg-field-row .ccg-field{flex:1;margin-bottom:0}\n      @keyframes ccg-spin{to{transform:rotate(360deg)}}@keyframes ccg-fade{from{opacity:0}to{opacity:1}}\n      @keyframes ccg-spin{to{transform:rotate(360deg)}}@keyframes ccg-fade{from{opacity:0}to{opacity:1}}\n      @media (max-width:820px){.ccg-mask{padding:8px}.ccg-modal{width:100%;max-height:96vh;border-radius:14px}.ccg-head{padding:13px 14px;gap:10px}.ccg-head h2{font-size:17px}.ccg-head-gear{width:30px;height:30px;font-size:14px}.ccg-head-actions{gap:5px}.ccg-sidebar{width:auto;flex-direction:row;overflow-x:auto;border-right:none;border-bottom:1px solid var(--line);padding:6px 4px;gap:2px;flex-shrink:0}.ccg-sidebar-item{font-size:13px;padding:7px 10px;border-radius:8px;white-space:nowrap;flex-shrink:0}.ccg-sidebar-item b{font-size:15px;margin-right:4px;display:inline}.ccg-sidebar-item::after{display:none}.ccg-body{flex-direction:column}.ccg-content{padding:12px}.ccg-grid{flex-direction:column}.ccg-form-grid{grid-template-columns:1fr 1fr}.ccg-row{grid-template-columns:1fr 1fr}.ccg-footer{align-items:flex-start;flex-direction:column}.ccg-editor textarea{min-height:340px}.ccg-tabs{overflow-x:auto}.ccg-tab{white-space:nowrap}.ccg-ws-item{flex-wrap:wrap}.ccg-ws-actions{width:100%;justify-content:flex-end;margin-top:4px}}\n      @media (max-width:420px){.ccg-head-gear{width:28px;height:28px;font-size:13px}.ccg-head-actions{gap:4px}.ccg-close{width:28px;height:28px;font-size:18px}.ccg-head h2{font-size:15px}.ccg-form-grid{grid-template-columns:1fr}.ccg-row{grid-template-columns:1fr}.ccg-ws-actions{flex-wrap:wrap}}\n    `));
  }
  function ce(e, t, n = "text", r = "") {
    const a = x.form[e] ?? "";
    if ("textarea" === n)
      return `<div class="ccg-field"><label>${C(t)}</label><textarea data-form="${C(e)}" ${r}>${C(a)}</textarea></div>`;
    if ("select" === n) {
      const n = ["Nữ", "Nam", "Khác"];
      return `<div class="ccg-field"><label>${C(t)}</label><select data-form="${C(e)}">${n.map((e) => `<option value="${C(e)}"${a === e ? " selected" : ""}>${C(e)}</option>`).join("")}</select></div>`;
    }
    return `<div class="ccg-field"><label>${C(t)}</label><input data-form="${C(e)}" type="${C(n)}" value="${C(a)}" ${r}></div>`;
  }
  function se(e, t, n = "text", r = "") {
    const a = x.genericForm[e] ?? "";
    return "textarea" === n
      ? `<div class="ccg-field"><label>${C(t)}</label><textarea data-generic="${C(e)}" ${r}>${C(a)}</textarea></div>`
      : `<div class="ccg-field"><label>${C(t)}</label><input data-generic="${C(e)}" type="${C(n)}" value="${C(a)}" ${r}></div>`;
  }
  function le() {
    return "character" !== x.module
      ? (function () {
          const e = J(),
            t = (e.fields || [])
              .map((e) => {
                const t = (e.pmt || "").length > 30;
                return se(
                  e.name,
                  e.name,
                  t ? "textarea" : "text",
                  `placeholder="${C(e.pmt || "")}"`,
                );
              })
              .join("");
          return `<section class="ccg-card ccg-form-card">\n      <div class="ccg-form-top"><h3>${C(e.name)}</h3></div>\n      <div class="ccg-form-grid">\n        ${se("topic", `Tên ${e.tag}`, "text", 'placeholder="Để trống do AI đặt tên"')}\n      </div>\n      <details class="ccg-form-extra" open>\n        <summary>▸ Tùy chọn thêm</summary>\n        <div class="ccg-form-grid ccg-form-extra-grid">\n          ${se("style", "Khuynh hướng phong cách", "text", 'placeholder="Hướng văn phong, cơ điệu, khí chất"')}\n          ${se("keywords", "Sở thích từ khóa", "textarea", 'placeholder="Dùng để kích hoạt đèn xanh, có thể phân cách bằng dấu phẩy."')}\n          ${t}\n          ${se("extra", "Thuyết minh bổ sung", "textarea", 'placeholder="Các thông tin khác cần AI biết."')}\n        </div>\n        <div class="ccg-wb-line"><span>${X("books")} Tham khảo Thế Giới Thư</span><button class="ccg-mini-action" data-action="worldbook">Chọn</button><b id="ccg-wb-count"></b></div>\n      </details>\n    </section>`;
        })()
      : `<section class="ccg-card ccg-form-card">\n      <div class="ccg-form-top"><h3>Điều kiện sinh thành</h3><span data-action="toggle-genNsfw" style="display:flex;align-items:center;gap:6px;cursor:pointer;font-size:12px;color:var(--muted);user-select:none;"><input type="checkbox" data-form-check="genNsfw"${!1 !== x.form.genNsfw ? " checked" : ""} style="pointer-events:none;accent-color:var(--accent);width:14px;height:14px;"> Sinh thành hồ sơ NSFW</span></div>\n      <div class="ccg-form-grid">\n        ${ce("name", "Họ tên", "text", 'placeholder="Để trống do AI đặt tên"')}\n        ${ce("gender", "Giới tính", "select")}\n        ${ce("age", "Tuổi", "number", 'min="16" max="99" placeholder="Để trống do AI suy đoán"')}\n        ${ce("identity", "Thân phận / Giai tầng", "text", 'placeholder="Tú tài thi trượt, lính đào ngũ, thương nhân, tá điền……"')}\n        ${ce("faction", "Thế lực trực thuộc", "text", 'placeholder="Hòa Tế Đường, Huyện nha Đồng Thành, Lưu khấu doanh trại……"')}\n        ${ce("relation", "Quan hệ với nhân vật chính", "text", 'placeholder="Cố giao, đồng liêu, túc địch, người quen cũ……"')}\n      </div>\n      <details class="ccg-form-extra">\n        <summary>▸ Tùy chọn thêm</summary>\n        <div class="ccg-form-grid ccg-form-extra-grid">\n          ${ce("location", "Địa điểm hiện tại", "text", 'placeholder="Phố Tây Đồng Thành, bến tàu An Khánh, một nơi nào đó ở Bắc Trực Lệ……"')}\n          ${ce("role", "Chức năng nhân vật", "text", 'placeholder="Đồng minh, địch thủ, tình nhân, nhân vật manh mối……"')}\n          ${ce("tone", "Văn phong và khí chất", "text", 'placeholder="Loạn thế tả thực, kiềm chế có dư âm; thị tỉnh đanh đá, trong lời có gai……"')}\n          ${ce("appearance", "Gợi ý ngoại mạo", "textarea", 'placeholder="Thể hình, dáng đứng, phong cách ăn mặc, những chi tiết thường bị người khác chú ý."')}\n          ${ce("kinkBoundary", "Ranh giới/Sở thích NSFW", "textarea", 'placeholder="Động thái thân mật, cấm kỵ, giới hạn; để trống thì sinh thành tự nhiên theo nhân vật."')}\n          ${ce("physique", "Gợi ý thể mạo", "textarea", 'placeholder="Cảm giác cơ thể, xúc cảm da thịt, ngôn ngữ cơ thể ở khoảng cách thân mật."')}\n          ${ce("keywordHint", "Sở thích từ khóa", "textarea", 'placeholder="Biệt danh, xưng hô, từ địa điểm; AI sẽ bổ sung."')}\n          ${ce("extra", "Thuyết minh bổ sung", "textarea", 'placeholder="Trải nghiệm, bí mật, quan hệ với thế giới Tàn Minh, v.v."')}\n        </div>\n        <div class="ccg-wb-line"><span>${X("books")} Tham khảo Thế Giới Thư</span><button class="ccg-mini-action" data-action="worldbook">Chọn</button><b id="ccg-wb-count"></b></div>\n      </details>\n    </section>`;
  }
  function de() {
    if ("character" !== x.module)
      return (function () {
        const e = J();
        if (!x.genericResult)
          return `<section class="ccg-card ccg-empty"><div>${x.loading ? `<span class="ccg-loading">Đang sinh thành ${C(e.tag)}</span>` : `Điền điều kiện bên trái để sinh thành ${C(e.tag)}.`}<br>Sau khi sinh thành có thể chỉnh sửa chính văn và từ khóa, rồi viết vào Thế Giới Thư.</div></section>`;
        return `<section class="ccg-card ccg-editor">\n      <h3>Kết quả ${C(e.tag)}</h3>\n      ${((t = "title"), (n = "Tên mục Thế Giới Thư"), `<div class="ccg-field"><label>${C(n)}</label><input data-generic-result="${C(t)}" value="${C(x.genericResult?.[t] ?? "")}"></div>`)}\n      <div class="ccg-field"><label>Từ khóa đèn xanh</label><textarea data-generic-keywords>${C(I(x.genericResult.keywords || []))}</textarea></div>\n      ${(function (
          e,
          t,
        ) {
          return `<div class="ccg-field"><label>${C(t)}</label><textarea data-generic-result="${C(e)}">${C(x.genericResult?.[e] ?? "")}</textarea></div>`;
        })(
          "content",
          "Nội dung mục",
        )}\n      <p class="ccg-note">Thế Giới Thư mục tiêu: ${C(x.targetWorldbook || "Chưa đọc")}. Tên mục ghi vào sẽ mang theo tiền tố「${C(e.tag)} | 」, tránh nhầm lẫn với mục nhân vật.</p>\n    </section>`;
        var t, n;
      })();
    if (!x.result)
      return `<section class="ccg-card ccg-empty"><div>${x.loading ? '<span class="ccg-loading">Đang sinh thành thiết lập nhân vật</span>' : "Điền điều kiện bên trái để sinh thành nhân vật."}<br>Sau khi sinh thành sẽ xem, sửa đổi, tối ưu hóa lần hai ở đây, rồi xác nhận viết vào Thế Giới Thư.</div></section>`;
    const e = x.result,
      t = x.activeTab;
    return `<section class="ccg-card">\n      <div class="ccg-tabs">\n        <button class="ccg-tab${"sfw" === t ? " active" : ""}" data-ccg-tab="sfw">Nhân thiết SFW</button>\n        <button class="ccg-tab${"nsfw" === t ? " active" : ""}" data-ccg-tab="nsfw">Nhân thiết NSFW</button>\n        <button class="ccg-tab${"keys" === t ? " active" : ""}" data-ccg-tab="keys">Từ khóa và Ghi vào</button>\n        <button class="ccg-tab${"revise" === t ? " active" : ""}" data-ccg-tab="revise">Tối ưu hóa lần nữa</button>\n      </div>\n      ${"sfw" === t ? `<div class="ccg-editor"><div class="ccg-row">${ge("sfwTitle", "Tên mục Thế Giới Thư")}${ge("name", "Tên nhân vật")}</div>${pe("sfwContent", "Nội dung mục SFW")}</div>` : ""}\n      ${"nsfw" === t ? `<div class="ccg-editor">${ge("nsfwTitle", "Tên mục Thế Giới Thư")}<p class="ccg-note">Mục NSFW mặc định kích hoạt, nhưng ghi vào dưới dạng tổ hợp đèn xanh: Từ khóa nhân vật trúng đích, đồng thời từ khóa phụ trúng đích NSFW mới được kích hoạt.</p>${pe("nsfwContent", "Nội dung mục NSFW")}</div>` : ""}\n      ${
      "keys" === t
        ? (function (e) {
            return `<div class="ccg-keywords"><div class="ccg-row">${ge("sfwTitle", "Tên mục SFW")}${ge("nsfwTitle", "Tên mục NSFW")}</div>${ue("sfwKeywords", "Từ khóa chính SFW", e.sfwKeywords)}${ue("nsfwKeywords", "Từ khóa chính NSFW", e.nsfwKeywords)}${ue("nsfwSecondaryKeywords", "Từ khóa phụ NSFW", e.nsfwSecondaryKeywords)}<p class="ccg-note">Thế Giới Thư mục tiêu: ${C(x.targetWorldbook || "Chưa đọc")}. Xác nhận ghi vào sẽ tạo hoặc ghi đè hai mục cùng tên SFW / NSFW.</p></div>`;
          })(e)
        : ""
    }\n      ${"revise" === t ? `<div><div class="ccg-field"><label>Không hài lòng ở đâu</label><textarea data-feedback placeholder="Ví dụ: Trải nghiệm quá rải rác, quan hệ cần mập mờ hơn, NSFW quá thẳng thừng, cần giống người sống trong loạn thế hơn……">${C(x.feedback)}</textarea></div><div class="ccg-actions"><button class="ccg-btn primary" data-action="revise"${x.loading ? " disabled" : ""}>Để AI tối ưu hóa lại</button></div></div>` : ""}\n    </section>`;
  }
  function ge(e, t) {
    return `<div class="ccg-field"><label>${C(t)}</label><input data-result="${C(e)}" value="${C(x.result?.[e] ?? "")}"></div>`;
  }
  function pe(e, t) {
    return `<div class="ccg-field"><label>${C(t)}</label><textarea data-result="${C(e)}">${C(x.result?.[e] ?? "")}</textarea></div>`;
  }
  function ue(e, t, n) {
    return `<div class="ccg-field"><label>${C(t)}</label><textarea data-keywords="${C(e)}">${C(I(n))}</textarea></div>`;
  }
  function fe() {
    const e = b?.querySelector("#ccg-regex-list");
    if (!e) return;
    const t = h.excludeRegexes || [];
    0 !== t.length
      ? (e.innerHTML = t
          .map(
            (e, t) =>
              `<div class="ccg-regex-item"><code>${C(e)}</code><button data-action="del-regex" data-regex-idx="${t}">✖</button></div>`,
          )
          .join(""))
      : (e.innerHTML =
          '<div style="font-size:12px;opacity:.5;">（Chưa cấu hình bất kỳ quy tắc bài xích nào）</div>');
  }
  function me(e) {
    const t = !e,
      n = "character" === e?.id,
      r = t
        ? {
            id: H(),
            name: "",
            tag: "",
            icon: "",
            sys: "",
            namePrompt:
              "Tạo một cái tên phù hợp cho đối tượng này, có thể kèm theo biệt xưng (dùng ngoặc đơn bọc lại).",
            isDefault: !1,
            fields: [],
          }
        : JSON.parse(JSON.stringify(e)),
      a = f.createElement("div");
    ((a.className = `ccg-overlay theme-${m.theme || "night"}`),
      (a.id = "ccg-builder-overlay"));
    const i = n
      ? `<div class="ccg-field"><label>Mẫu User Prompt</label>\n          <textarea id="be-userprompt" rows="18" style="resize:vertical;min-height:240px;font-family:monospace;font-size:13px;line-height:1.5;" placeholder="Hỗ trợ placeholder: {name} {gender} {age} {identity} {relation} {location} {faction} {role} {tone} {keywordHint} {kinkBoundary} {extra} {nameTag}">${C(r.userPromptTemplate || "")}</textarea>\n          <p class="ccg-note" style="margin-top:6px;">Placeholder sẽ được thay thế bằng giá trị thực tế trong biểu mẫu khi sinh thành. {nameTag} dùng cho tên thẻ XML.</p>\n        </div>`
      : `<div class="ccg-field"><label>【Mục đầu cố định】Quy tắc sinh thành trường "Tên"</label><textarea id="be-namepmt" rows="2">${C(r.namePrompt || "")}</textarea></div>\n        <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:10px;">\n          <b style="color:var(--ink);">Trường sinh thành</b>\n          <span style="font-size:12px;opacity:.6;">（Kéo thả ≡ điều chỉnh thứ tự）</span>\n        </div>\n        <div id="be-fields-list"></div>\n        <button class="ccg-btn" id="be-add-field" style="width:100%;border-style:dashed;">+ Thêm trường mới</button>`;
    function o() {
      n ||
        (r.fields = Array.from(a.querySelectorAll(".ccg-field-row")).map(
          (e) => ({
            name: e.querySelector("._bf_name")?.value?.trim() || "",
            pmt: e.querySelector("._bf_pmt")?.value?.trim() || "",
          }),
        ));
    }
    function c() {
      if (n) return;
      const e = a.querySelector("#be-fields-list");
      ((e.innerHTML = r.fields
        .map(
          (e, t) =>
            `<div class="ccg-field-row" draggable="true" data-bidx="${t}">\n        <span class="ccg-ws-drag">≡</span>\n        <div class="ccg-field"><input class="_bf_name" placeholder="Tên trường" value="${C(e.name)}" style="font-weight:700;"></div>\n        <div class="ccg-field"><textarea class="_bf_pmt" rows="2" placeholder="Soạn thảo giới hạn logic định dạng của nút này...">${C(e.pmt)}</textarea></div>\n        <button class="ccg-btn danger _del_bf" style="flex-shrink:0;padding:6px 10px;border:none;">×</button>\n      </div>`,
        )
        .join("")),
        e.querySelectorAll("._del_bf").forEach((e) => {
          e.onclick = () => {
            o();
            const t = parseInt(
              e.closest(".ccg-field-row").getAttribute("data-bidx"),
            );
            (r.fields.splice(t, 1), c());
          };
        }));
      let t = null;
      e.querySelectorAll(".ccg-field-row").forEach((e) => {
        ((e.ondragstart = (n) => {
          (o(),
            (t = parseInt(e.getAttribute("data-bidx"))),
            (n.dataTransfer.effectAllowed = "move"),
            n.dataTransfer.setData("text/plain", t),
            setTimeout(() => (e.style.opacity = "0.5"), 0));
        }),
          (e.ondragover = (e) => e.preventDefault()),
          (e.ondragenter = (t) => {
            (t.preventDefault(), (e.style.border = "2px dashed var(--accent)"));
          }),
          (e.ondragleave = () => {
            e.style.border = "1px solid var(--line)";
          }),
          (e.ondrop = (n) => {
            (n.preventDefault(), (e.style.border = "1px solid var(--line)"));
            const a = parseInt(e.getAttribute("data-bidx"));
            if (null !== t && t !== a) {
              const e = r.fields.splice(t, 1)[0];
              (r.fields.splice(a, 0, e), c());
            }
          }),
          (e.ondragend = () => {
            e.style.opacity = "1";
          }));
      });
    }
    ((a.innerHTML = `<div class="ccg-overlay-box">\n      <div class="ccg-overlay-head"><div><b>${t ? "Tạo sinh thành khí mới" : "Chỉnh sửa sinh thành khí"}</b></div><button class="ccg-close" id="ccg-be-close">×</button></div>\n      <div class="ccg-overlay-body" id="ccg-be-body">\n        <div class="ccg-row"><div class="ccg-field"><label>Tên sinh thành khí</label><input id="be-name" value="${C(r.name)}" placeholder="Ví dụ: Sinh thành khí Công pháp"></div><div class="ccg-field"><label>Nhãn chiết xuất</label><input id="be-tag" value="${C(r.tag)}" placeholder="Ví dụ: Công pháp"></div></div>\n        <div class="ccg-field"><label>Biểu tượng</label><input id="be-icon" value="${C(r.icon)}" placeholder="Ký tự đơn"></div>\n        <div class="ccg-field"><label>System Prompt</label><textarea id="be-sys" rows="5" style="resize:vertical;min-height:120px;" placeholder="Điền quy tắc cơ bản và thiết lập hệ thống gửi cho sinh thành khí này...">${C(r.sys)}</textarea></div>\n        <hr style="border:none;border-top:1px dashed var(--line);">\n        ${i}\n        <div style="display:flex;justify-content:flex-end;gap:12px;margin-top:16px;padding-top:16px;border-top:1px solid var(--line);">\n          <button class="ccg-btn" id="be-cancel">Hủy</button>\n          <button class="ccg-btn primary" id="be-save" style="padding:10px 40px;">Lưu</button>\n        </div>\n      </div>\n    </div>`),
      f.body.appendChild(a),
      c(),
      n ||
        (a.querySelector("#be-add-field").onclick = () => {
          (o(), r.fields.push({ name: "", pmt: "" }), c());
        }),
      (a.querySelector("#be-cancel").onclick = () => a.remove()),
      (a.querySelector("#ccg-be-close").onclick = () => a.remove()),
      (a.querySelector("#be-save").onclick = () => {
        if (
          (o(),
          (r.name = a.querySelector("#be-name").value.trim()),
          (r.tag = a.querySelector("#be-tag").value.trim()),
          (r.icon = a.querySelector("#be-icon").value.trim()),
          (r.sys = a.querySelector("#be-sys").value.trim()),
          n &&
            (r.userPromptTemplate =
              a.querySelector("#be-userprompt")?.value?.trim() || ""),
          n ||
            (r.namePrompt =
              a.querySelector("#be-namepmt")?.value?.trim() || ""),
          r.name && r.tag && r.icon && r.sys)
        ) {
          if (!n) {
            if (!t && !r.namePrompt)
              return void We(
                'Quy tắc sinh thành trường "Tên" không được để trống.',
                "err",
              );
            if (0 === r.fields.length && !n)
              return void We("Ít nhất phải thêm một định nghĩa trường", "err");
            for (let e = 0; e < r.fields.length; e++)
              if (!r.fields[e].name || !r.fields[e].pmt)
                return void We(
                  `Thông tin trường thứ ${e + 1} bị thiếu!`,
                  "err",
                );
            if (
              r.fields.some(
                (e) => e.name.includes("Tên") || e.name.includes("Từ khóa"),
              )
            )
              return void We(
                'Cấm sử dụng "Tên" hoặc "Từ khóa" làm tên trường.',
                "err",
              );
          }
          if (r.isDefault) {
            const e = g.find((e) => e.id === r.id);
            if (e) {
              const t = {};
              (r.name !== e.name && (t.name = r.name),
                r.tag !== e.tag && (t.tag = r.tag),
                r.icon !== e.icon && (t.icon = r.icon),
                r.sys !== e.sys && (t.sys = r.sys),
                n &&
                  r.userPromptTemplate !== e.userPromptTemplate &&
                  (t.userPromptTemplate = r.userPromptTemplate),
                n ||
                  r.namePrompt === e.namePrompt ||
                  (t.namePrompt = r.namePrompt),
                n ||
                  JSON.stringify(r.fields) === JSON.stringify(e.fields) ||
                  (t.fields = r.fields),
                Object.keys(t).length > 0 ? (k[r.id] = t) : delete k[r.id]);
            }
          } else
            ((k[r.id] = {
              id: r.id,
              name: r.name,
              tag: r.tag,
              icon: r.icon,
              sys: r.sys,
              namePrompt: r.namePrompt || "",
              isDefault: !1,
              fields: r.fields,
            }),
              S.includes(r.id) || S.push(r.id));
          (G(), a.remove(), ye(), We("Cấu hình đã lưu", "ok"));
        } else
          We(
            "Tên sinh thành khí, nhãn, biểu tượng hoặc System Prompt bị trống, vui lòng điền đầy đủ!",
            "err",
          );
      }),
      a.addEventListener("click", (e) => {
        e.target === a && a.remove();
      }),
      a.addEventListener("keydown", (e) => {
        "Escape" === e.key && a.remove();
      }));
  }
  function be() {
    ((b.innerHTML = `<div class="ccg-mask" data-action="mask-close">\n      <section class="ccg-modal" role="dialog" aria-modal="true" aria-label="Tàn Minh Dư Tẫn Vạn tượng sinh thành khí" data-modal>\n        <header class="ccg-head"><div><p class="ccg-kicker">Tàn Minh Dư Tẫn · Vạn tượng sinh thành khí</p><h2 id="ccg-title"></h2></div><div class="ccg-head-actions"><button class="ccg-head-gear" data-action="worldbook" title="Tham khảo Thế Giới Thư">${X("books")}</button><button class="ccg-head-gear" data-nav="workshop" title="Xưởng sáng tạo sinh thành khí">${X("wrench")}</button><button class="ccg-head-gear" data-nav="settings" title="Cài đặt và Cấu hình">${X("sliders")}</button><button class="ccg-close" data-action="close" aria-label="Đóng">×</button></div></header>\n        <div class="ccg-body"><nav class="ccg-sidebar" id="ccg-sidebar"></nav><div class="ccg-content" id="ccg-content"></div></div>\n        <footer class="ccg-footer" id="ccg-footer"></footer>\n      </section>\n    </div>`),
      (b._ccgBuilt = !0),
      (function () {
        if (!b || b._ccgBound) return;
        ((b._ccgBound = !0),
          b.addEventListener("click", ke),
          b.addEventListener("input", he),
          b.addEventListener("keydown", $e),
          b.addEventListener("change", function (e) {
            var t = e.target.closest && e.target.closest("#ccg-wb-select");
            t && ((O = t.value), ye());
          }));
      })());
  }
  function ye() {
    const e = b?.querySelector("#ccg-content");
    if (!e) return;
    x.activeView;
    const t = "workshop" === x.activeView;
    "settings" === x.activeView
      ? ((e.innerHTML = (function () {
          const e = w,
            t = h;
          return `<div class="ccg-settings">\n      <h2 style="margin-top:0;">Cài đặt và Cấu hình</h2>\n      <div class="ccg-block"><div class="ccg-block-head">Thiết lập API Mô hình lớn</div><div class="ccg-block-body">\n        <div class="ccg-row"><div class="ccg-field"><label>Giao thức giao diện</label><select data-cfg="apiType"><option value="openai"${"openai" === e.apiType ? " selected" : ""}>Giao thức tương thích OpenAI</option><option value="claude"${"claude" === e.apiType ? " selected" : ""}>Giao thức Claude</option></select></div><div class="ccg-field"><label>Tên mô hình</label><div style="display:flex;gap:6px;"><input data-cfg="model" value="${C(e.model || "")}" placeholder="gemini-2.5-flash-lite" style="flex:1;"><button class="ccg-btn" data-action="fetch-models" title="Kéo danh sách mô hình khả dụng từ địa chỉ API" style="flex-shrink:0;padding:8px 10px;white-space:nowrap;">Kéo</button></div><select data-cfg="modelSelect" style="display:none;margin-top:4px;"></select></div></div>\n        <div class="ccg-field"><label>Địa chỉ API</label><input data-cfg="apiUrl" value="${C(e.apiUrl || "")}" placeholder="https://generativelanguage.googleapis.com/v1beta/openai/chat/completions"></div>\n        <div class="ccg-field"><label>Khóa API (API Key)</label><input data-cfg="apiKey" type="password" value="${C(e.apiKey || "")}" placeholder="sk-..."></div>\n        <div class="ccg-row"><div class="ccg-field"><label>Nhiệt độ (Temperature)</label><input data-cfg="temperature" type="number" step="0.1" min="0" max="2" value="${e.temperature}"></div><div class="ccg-field"><label>Token tối đa</label><input data-cfg="maxTokens" type="number" min="1" max="200000" value="${e.maxTokens}"></div></div>\n        <div class="ccg-row"><div class="ccg-field"><label>Top P</label><input data-cfg="topP" type="number" step="0.05" min="0" max="1" value="${e.topP}"></div><div class="ccg-field"><label>Trừng phạt tần suất (Frequency Penalty)</label><input data-cfg="frequencyPenalty" type="number" step="0.1" min="-2" max="2" value="${e.frequencyPenalty}"></div></div>\n        <div class="ccg-field"><label>Trừng phạt tồn tại (Presence Penalty)</label><input data-cfg="presencePenalty" type="number" step="0.1" min="-2" max="2" value="${e.presencePenalty}"></div>\n      </div></div>\n      <div class="ccg-block"><div class="ccg-block-head">Tương tác và Ưu tiên toàn cục</div><div class="ccg-block-body">\n        <div class="ccg-field"><label>Từ khóa gợi ý toàn cục (Đính kèm trước lệnh hệ thống của mỗi yêu cầu sinh thành)</label><textarea data-cfg="limitBreakPrompt" rows="2">${C(t.limitBreakPrompt || "")}</textarea></div>\n        <div class="ccg-field"><label>Số tầng lịch sử lấy mặc định</label><input data-cfg="historyMax" type="number" min="0" max="99" value="${t.historyMax || 4}"></div>\n      </div></div>\n      <div class="ccg-block"><div class="ccg-block-head">Quy tắc chiết xuất cốt truyện <span style="font-weight:normal;opacity:.7;font-size:12px;">（Mặc định loại bỏ nội dung &lt;think&gt;）</span></div><div class="ccg-block-body">\n        <p style="margin-top:0;font-size:13px;opacity:.8;">Nếu thiết lập sẵn chứa nhiều chuỗi tư duy suy diễn, vui lòng điền tên thẻ chứa cụ thể để bóc vỏ (không điền ngoặc nhọn). Để trống tức là chiết xuất toàn văn.</p>\n        <div class="ccg-row"><div class="ccg-field"><label>Thẻ chiết xuất chính văn AI</label><input data-cfg="charExtractTag" placeholder="Ví dụ: content (Để trống tức là chiết xuất toàn văn)" value="${C(t.charExtractTag || "")}"></div><div class="ccg-field"><label>Thẻ chiết xuất người dùng nhập</label><input data-cfg="userExtractTag" placeholder="Ví dụ: Đầu vào người dùng lượt này (Để trống tức là chiết xuất toàn văn)" value="${C(t.userExtractTag || "")}"></div></div>\n      </div></div>\n      <div class="ccg-block"><div class="ccg-block-head">Quy tắc bài xích văn bản (Lọc bằng biểu thức chính quy)</div><div class="ccg-block-body">\n        <p style="margin-top:0;font-size:13px;opacity:.8;">Khi chiết xuất tin nhắn lịch sử và nội dung Thế Giới Thư, loại bỏ các nội dung khớp với biểu thức chính quy dưới đây.</p>\n        <div id="ccg-regex-list" style="margin-bottom:12px;display:flex;flex-direction:column;gap:6px;"></div>\n        <div style="display:flex;gap:8px;"><textarea id="ccg-regex-input" style="flex:1;margin:0;min-height:40px;max-height:120px;resize:vertical;font-family:monospace;border:1px solid var(--line);border-radius:12px;background:rgba(0,0,0,.08);color:var(--ink);padding:9px 11px;outline:none;font:inherit;" placeholder="Ví dụ: <Dữ liệu trạng thái>[\\s\\S]*?<\\/Dữ liệu trạng thái>"></textarea><button class="ccg-btn" id="ccg-regex-add" style="flex-shrink:0;align-self:flex-start;">➕ Thêm vào</button></div>\n      </div></div>\n      <div class="ccg-block"><div class="ccg-block-head">Cấu hình tiêm Thế Giới Thư mặc định</div><div class="ccg-block-body">\n        <div class="ccg-row"><div class="ccg-field"><label>Cách thức kích hoạt</label><select data-cfg="wbTri"><option value="selective"${"selective" === t.wbTri ? " selected" : ""}>🟢 Đèn xanh (Kích hoạt bằng từ khóa)</option><option value="constant"${"constant" === t.wbTri ? " selected" : ""}>🔵 Đèn xanh dương (Thường trú)</option></select></div><div class="ccg-field"><label>Vị trí tiêm</label><select data-cfg="wbPos"><option value="after_character_definition"${"after_character_definition" === t.wbPos ? " selected" : ""}>Sau định nghĩa nhân vật</option><option value="before_character_definition"${"before_character_definition" === t.wbPos ? " selected" : ""}>Trước định nghĩa nhân vật</option></select></div></div>\n        <div class="ccg-field"><label>Số thứ tự sắp xếp mặc định</label><input data-cfg="wbOrd" type="number" min="1" max="999" value="${t.wbOrd || 100}"></div>\n      </div></div>\n      <div class="ccg-actions" style="margin-bottom:20px;"><button class="ccg-btn" data-action="settings-cancel">Hủy</button><button class="ccg-btn primary" data-action="settings-save">Lưu cài đặt</button></div>\n    </div>`;
        })()),
        fe())
      : t
        ? ((e.innerHTML = `<div>\n      <h2 style="margin-top:0;">Xưởng sáng tạo sinh thành khí</h2>\n      <p style="opacity:.8;font-size:14px;margin-bottom:20px;">Tạo, chỉnh sửa và quản lý các sinh thành khí tùy chỉnh tại đây. Kéo thả biểu tượng ≡ để sắp xếp lại.</p>\n      <div style="display:flex;gap:12px;margin-bottom:20px;">\n        <button class="ccg-btn primary" data-action="ws-new" style="flex:1;font-size:15px;">Tạo sinh thành khí mới</button>\n        <button class="ccg-btn" data-action="ws-cloud-import" style="flex:1;">Nhập từ đám mây</button>\n      </div>\n      <hr style="border:none;border-top:1px dashed var(--line);margin-bottom:20px;">\n      <div id="ccg-ws-list">${T.map(
            (e) => {
              const t = e.isDefault && !k[e.id],
                n = e.isDefault && !!k[e.id],
                r = t
                  ? `<button class="ccg-btn" data-action="ws-unlock" data-gid="${C(e.id)}" style="padding:6px 12px;font-size:13px;">Chỉnh sửa</button>`
                  : `<button class="ccg-btn" data-action="ws-edit" data-gid="${C(e.id)}" style="padding:6px 12px;font-size:13px;">Chỉnh sửa</button>` +
                    (e.isDefault
                      ? `<button class="ccg-btn danger" data-action="ws-reset" data-gid="${C(e.id)}" style="padding:6px 12px;font-size:13px;">Khôi phục mặc định</button>`
                      : `<button class="ccg-btn danger" data-action="ws-delete" data-gid="${C(e.id)}" style="padding:6px 12px;font-size:13px;">Xóa</button>`);
              return `<div class="ccg-ws-item" draggable="true" data-gid="${C(e.id)}">\n        <span class="ccg-ws-drag">≡</span>\n        <span class="ccg-ws-icon">${C(e.icon)}</span>\n        <div class="ccg-ws-info"><span class="ccg-ws-name">${C(e.name)}</span><span class="ccg-ws-tag">(${C(e.tag)})</span>${n ? '<span class="ccg-ws-badge">Đã sửa đổi</span>' : ""}</div>\n        <div class="ccg-ws-actions">\n          <button class="ccg-btn" data-action="ws-export" data-gid="${C(e.id)}" style="padding:6px 12px;font-size:13px;">Xuất</button>\n          ${r}\n        </div>\n      </div>`;
            },
          ).join(
            "",
          )}</div>\n      <div style="height:60px;"></div>\n    </div>`),
          (function () {
            const e = b?.querySelector("#ccg-content");
            if (!e) return;
            (e
              .querySelector('[data-action="ws-new"]')
              ?.addEventListener("click", () => me(null)),
              e
                .querySelector('[data-action="ws-cloud-import"]')
                ?.addEventListener("click", () =>
                  (async function () {
                    "function" == typeof m.openWorkshop
                      ? await m.openWorkshop({
                          initialView: "catalog",
                          initialType: "generator",
                        })
                      : We(
                          "Giao diện Vân đoan sáng ý công xưởng không khả dụng, vui lòng mở lại Vạn tượng sinh thành khí từ thanh trạng thái.",
                          "err",
                        );
                  })(),
                ),
              e.querySelectorAll('[data-action="ws-edit"]').forEach((e) => {
                e.addEventListener("click", () => {
                  const t = e.getAttribute("data-gid");
                  me(T.find((e) => e.id === t));
                });
              }),
              e.querySelectorAll('[data-action="ws-unlock"]').forEach((e) => {
                e.addEventListener("click", async () => {
                  (await Pe(
                    'Chắc chắn muốn chỉnh sửa sinh thành khí mặc định này không?\n（Nếu sau này cần, có thể nhấp "Khôi phục mặc định" để hoàn tác bất cứ lúc nào）',
                  )) && me(T.find((t) => t.id === e.getAttribute("data-gid")));
                });
              }),
              e.querySelectorAll('[data-action="ws-export"]').forEach((e) => {
                e.addEventListener("click", () => {
                  const t = e.getAttribute("data-gid"),
                    n = T.find((e) => e.id === t);
                  if (!n)
                    return void We("Không tìm thấy sinh thành khí này.", "err");
                  const r = JSON.parse(JSON.stringify(n));
                  (delete r.id, delete r.isDefault);
                  const a = JSON.stringify(r, null, 2),
                    i =
                      (n.name || n.tag || "generator").replace(
                        /[\\/:*?"<>|]/g,
                        "_",
                      ) + ".json";
                  (!(function (e, t, n) {
                    const r = new Blob([e], { type: n || "application/json" }),
                      a = URL.createObjectURL(r),
                      i = f.createElement("a");
                    ((i.href = a),
                      (i.download = t),
                      f.body.appendChild(i),
                      i.click(),
                      f.body.removeChild(i),
                      setTimeout(() => URL.revokeObjectURL(a), 1e3));
                  })(a, i, "application/json"),
                    We(`Đã xuất: ${i}`, "ok"));
                });
              }),
              e.querySelectorAll('[data-action="ws-delete"]').forEach((e) => {
                e.addEventListener("click", async () => {
                  if (
                    !(await Pe(
                      "Chắc chắn muốn xóa sinh thành khí tùy chỉnh này không? Thao tác này không thể hoàn tác.",
                    ))
                  )
                    return;
                  const t = e.getAttribute("data-gid");
                  (delete k[t],
                    (S = S.filter((e) => e !== t)),
                    G(),
                    ye(),
                    We("Đã xóa", "info"));
                });
              }),
              e.querySelectorAll('[data-action="ws-reset"]').forEach((e) => {
                e.addEventListener("click", async () => {
                  if (
                    !(await Pe(
                      "Chắc chắn muốn gỡ bỏ mọi sửa đổi, khôi phục cấu hình mặc định của hệ thống không?",
                    ))
                  )
                    return;
                  const t = e.getAttribute("data-gid");
                  (delete k[t], G(), ye(), We("Đã khôi phục mặc định", "info"));
                });
              }));
            let t = null;
            e.querySelectorAll(".ccg-ws-item").forEach((e) => {
              (e.addEventListener("dragstart", (n) => {
                ((t = e.getAttribute("data-gid")),
                  (n.dataTransfer.effectAllowed = "move"),
                  n.dataTransfer.setData("text/plain", t),
                  setTimeout(() => (e.style.opacity = "0.5"), 0));
              }),
                e.addEventListener("dragover", (e) => e.preventDefault()),
                e.addEventListener("dragenter", (t) => {
                  (t.preventDefault(),
                    (e.style.border = "2px dashed var(--accent)"));
                }),
                e.addEventListener("dragleave", () => {
                  e.style.border = "";
                }),
                e.addEventListener("drop", (n) => {
                  (n.preventDefault(), (e.style.border = ""));
                  const r = e.getAttribute("data-gid");
                  if (t && t !== r) {
                    const e = T.map((e) => e.id),
                      n = e.indexOf(t),
                      a = e.indexOf(r);
                    if (n > -1 && a > -1) {
                      const t = e.splice(n, 1)[0];
                      (e.splice(a, 0, t), (S = e), G(), ye());
                    }
                  }
                }),
                e.addEventListener("dragend", () => {
                  e.style.opacity = "1";
                }));
            });
          })())
        : ((e.innerHTML = `<div class="ccg-grid">${le()}${de()}</div>`), ie());
  }
  function ve() {
    const e = b?.querySelector("#ccg-footer");
    e &&
      ("generator" === x.activeView
        ? ((e.style.display = ""),
          (e.innerHTML = `<div class="ccg-status ${x.error ? "ccg-error" : ""}">${C(x.error || (x.loading ? "Vui lòng đợi, đang trao đổi thiết lập với AI." : "Sau khi sinh thành hãy xem kết quả trước, xác nhận rồi mới viết vào Thế Giới Thư."))}</div>\n      <div class="ccg-actions">\n        <button class="ccg-btn" data-action="reset"${x.loading ? " disabled" : ""}>Dọn sạch</button>\n        <button class="ccg-btn primary" data-action="generate"${x.loading ? " disabled" : ""}>Sinh thành</button>\n        <button class="ccg-btn primary" data-action="write"${!("character" === x.module ? x.result : x.genericResult) || x.loading ? " disabled" : ""}>Xác nhận ghi vào</button>\n      </div>`))
        : (e.style.display = "none"));
  }
  function xe() {
    (!(function () {
      const e = b?.querySelector("#ccg-sidebar");
      if (!e) return;
      const t = "generator" === x.activeView;
      e.innerHTML = `\n      ${T.map((e) => `<div class="ccg-sidebar-item${x.module === e.id && t ? " active" : ""}" data-nav="module" data-module="${C(e.id)}" data-label="${C(e.name)}" title="${C(e.name)}"><b>${C(e.icon)}</b> ${C(e.name)}</div>`).join("")}`;
      const n = b?.querySelector('.ccg-head-gear[data-nav="workshop"]'),
        r = b?.querySelector('.ccg-head-gear[data-nav="settings"]');
      (n && n.classList.toggle("active", "workshop" === x.activeView),
        r && r.classList.toggle("active", "settings" === x.activeView));
    })(),
      (function () {
        const e = b?.querySelector("#ccg-title");
        e &&
          ("settings" === x.activeView
            ? (e.textContent = "Cài đặt và Cấu hình")
            : "workshop" === x.activeView
              ? (e.textContent = "Xưởng sáng tạo sinh thành khí")
              : (e.textContent = J().name));
      })(),
      ye(),
      ve());
  }
  function we() {
    y &&
      (oe(),
      (b = f.getElementById(n)),
      b || ((b = f.createElement("div")), (b.id = n), f.body.appendChild(b)),
      (b.className = `theme-${m.theme || "night"}`),
      b._ccgBuilt || be(),
      xe());
  }
  function he(e) {
    const t = e.target;
    if (t.matches?.("[data-wb-search]")) return void re(t);
    const n = t.closest?.("[data-form-check]")?.getAttribute("data-form-check");
    if (n) return ((x.form[n] = t.checked), void (v = !0));
    const r = t.closest?.("[data-form]")?.getAttribute("data-form");
    if (r)
      return (
        (x.form[r] = t.value),
        "age" === r && (x.form.age = String(B(t.value))),
        void (v = !0)
      );
    const a = t.closest?.("[data-generic]")?.getAttribute("data-generic");
    if (a) return ((x.genericForm[a] = t.value), void (v = !0));
    const i = t.closest?.("[data-result]")?.getAttribute("data-result");
    if (i && x.result) return ((x.result[i] = t.value), void (v = !0));
    const o = t.closest?.("[data-keywords]")?.getAttribute("data-keywords");
    if (o && x.result) return ((x.result[o] = D(t.value)), void (v = !0));
    const c = t
      .closest?.("[data-generic-result]")
      ?.getAttribute("data-generic-result");
    return c && x.genericResult
      ? ((x.genericResult[c] = t.value), void (v = !0))
      : t.matches?.("[data-generic-keywords]") && x.genericResult
        ? ((x.genericResult.keywords = D(t.value)), void (v = !0))
        : void (t.matches?.("[data-feedback]") && (x.feedback = t.value));
  }
  function ke(t) {
    const n = t.target,
      o = n.closest?.("[data-nav]"),
      l = n.closest?.("[data-ccg-tab]"),
      d = n.closest?.("[data-action]"),
      g = n.closest?.('[data-action="del-regex"]');
    if (o) {
      t.preventDefault();
      const e = o.getAttribute("data-nav");
      return "module" === e
        ? ((x.module = o.getAttribute("data-module") || "character"),
          (x.activeView = "generator"),
          (x.error = ""),
          void we())
        : "settings" === e
          ? ((x.activeView =
              "settings" === x.activeView ? "generator" : "settings"),
            void we())
          : "workshop" === e
            ? ((x.activeView =
                "workshop" === x.activeView ? "generator" : "workshop"),
              void we())
            : void 0;
    }
    if (l)
      return (
        t.preventDefault(),
        (x.activeTab = l.getAttribute("data-ccg-tab") || "sfw"),
        void ye()
      );
    if (g) {
      t.preventDefault();
      const e = parseInt(g.getAttribute("data-regex-idx"), 10);
      return void (
        !isNaN(e) &&
        h.excludeRegexes &&
        (h.excludeRegexes.splice(e, 1), fe())
      );
    }
    if ("ccg-regex-add" === n.id) {
      t.preventDefault();
      const e = b?.querySelector("#ccg-regex-input"),
        n = (e?.value || "").trim();
      if (!n) return;
      try {
        new RegExp(n, "g");
      } catch (e) {
        return void We(
          "Lỗi cú pháp biểu thức chính quy, vui lòng kiểm tra ký tự thoát.",
          "err",
        );
      }
      return (
        h.excludeRegexes || (h.excludeRegexes = []),
        h.excludeRegexes.push(n),
        e && (e.value = ""),
        void fe()
      );
    }
    const y = n.closest?.(".ccg-wb-entry"),
      k = n.closest?.(".ccg-wb-sel-all"),
      S = n.closest?.(".ccg-wb-unsel-all"),
      T = n.closest?.(".ccg-wb-clear"),
      A = n.closest?.(".ccg-wb-rm"),
      N = W[E] || {};
    if (y) {
      t.preventDefault();
      var P = y.getAttribute("data-wb"),
        O = y.getAttribute("data-en");
      return (
        N[P] || (N[P] = { entries: [] }),
        N[P].entries || (N[P].entries = []),
        y.checked
          ? -1 === N[P].entries.indexOf(O) && N[P].entries.push(O)
          : (N[P].entries = N[P].entries.filter(function (e) {
              return e !== O;
            })),
        Z(),
        void ye()
      );
    }
    if (k) {
      t.preventDefault();
      P = k.getAttribute("data-wb");
      var F = q[P] || [];
      return (
        N[P] || (N[P] = { entries: [] }),
        (N[P].entries = F.map(function (e) {
          return e.name;
        })),
        Z(),
        void ye()
      );
    }
    if (S) {
      t.preventDefault();
      P = S.getAttribute("data-wb");
      return (N[P] && (N[P].entries = []), Z(), void ye());
    }
    if (A) {
      t.preventDefault();
      ((P = A.getAttribute("data-wb")), (O = A.getAttribute("data-en")));
      return (
        N[P] &&
          N[P].entries &&
          (N[P].entries = N[P].entries.filter(function (e) {
            return e !== O;
          })),
        Z(),
        void ye()
      );
    }
    if (T)
      return (
        t.preventDefault(),
        Object.keys(N).forEach(function (e) {
          N[e] && (N[e].entries = []);
        }),
        Z(),
        void ye()
      );
    if (n.closest(".ccg-form-extra summary")) {
      t.preventDefault();
      const e = n.closest(".ccg-form-extra");
      return void (e && (e.open = !e.open));
    }
    if (n.closest('[data-action="worldbook"]'))
      return (
        t.preventDefault(),
        t.stopPropagation(),
        void (function () {
          const e = f.createElement("div");
          ((e.className = `ccg-overlay theme-${m.theme || "night"}`),
            (e.id = "ccg-wb-overlay"),
            (e.innerHTML = `<div class="ccg-overlay-box" style="width:min(560px,94vw);"><div class="ccg-overlay-head"><h3 style="margin:0;">${X("books")} Tham khảo Thế Giới Thư</h3><button style="border:1px solid var(--line);border-radius:999px;background:var(--card);color:var(--muted);cursor:pointer;font-size:22px;width:34px;height:34px;display:grid;place-items:center;" onclick="this.closest('.ccg-overlay').remove()">×</button></div><div class="ccg-overlay-body">${ne()}</div></div>`),
            f.body.appendChild(e),
            e.addEventListener("click", (t) => {
              t.target === e && e.remove();
            }),
            e.addEventListener("keydown", (t) => {
              "Escape" === t.key && e.remove();
            }),
            e.addEventListener("input", (e) => {
              e.target.matches?.("[data-wb-search]") && re(e.target);
            }),
            e.querySelectorAll(".ccg-wb-entry").forEach((e) => {
              e.addEventListener("change", function () {
                const e = W[E] || {},
                  t = this.getAttribute("data-wb"),
                  n = this.getAttribute("data-en");
                (e[t] || (e[t] = { entries: [] }),
                  e[t].entries || (e[t].entries = []),
                  this.checked
                    ? -1 === e[t].entries.indexOf(n) && e[t].entries.push(n)
                    : (e[t].entries = e[t].entries.filter(function (e) {
                        return e !== n;
                      })),
                  Z(),
                  ie());
              });
            }),
            e.querySelectorAll(".ccg-wb-sel-all").forEach((t) => {
              t.addEventListener("click", function () {
                const t = this.getAttribute("data-wb"),
                  n = W[E] || {},
                  r = q[t] || [];
                (n[t] || (n[t] = { entries: [] }),
                  (n[t].entries = r.map(function (e) {
                    return e.name;
                  })),
                  Z(),
                  (e.querySelector(".ccg-overlay-body").innerHTML = ne()),
                  ae(e),
                  ie());
              });
            }),
            e.querySelectorAll(".ccg-wb-unsel-all").forEach((t) => {
              t.addEventListener("click", function () {
                const t = this.getAttribute("data-wb"),
                  n = W[E] || {};
                (n[t] && (n[t].entries = []),
                  Z(),
                  (e.querySelector(".ccg-overlay-body").innerHTML = ne()),
                  ae(e),
                  ie());
              });
            }),
            e.querySelectorAll(".ccg-wb-rm").forEach((t) => {
              t.addEventListener("click", function () {
                const t = this.getAttribute("data-wb"),
                  n = this.getAttribute("data-en"),
                  r = W[E] || {};
                (r[t] &&
                  r[t].entries &&
                  (r[t].entries = r[t].entries.filter(function (e) {
                    return e !== n;
                  })),
                  Z(),
                  (e.querySelector(".ccg-overlay-body").innerHTML = ne()),
                  ae(e),
                  ie());
              });
            }),
            e.querySelector(".ccg-wb-clear") &&
              e
                .querySelector(".ccg-wb-clear")
                .addEventListener("click", function () {
                  const t = W[E] || {};
                  (Object.keys(t).forEach(function (e) {
                    t[e] && (t[e].entries = []);
                  }),
                    Z(),
                    (e.querySelector(".ccg-overlay-body").innerHTML = ne()),
                    ae(e),
                    ie());
                }));
        })()
      );
    if (!d) return;
    (t.preventDefault(), t.stopPropagation());
    const L = d.getAttribute("data-action");
    if ("settings-save" === L)
      return (
        (function () {
          if (!b) return;
          const e = (e) => {
            const t = b.querySelector(`[data-cfg="${e}"]`);
            return t ? t.value : null;
          };
          ((w.apiType = e("apiType") || "openai"),
            (w.apiUrl = e("apiUrl") || ""),
            (w.apiKey = e("apiKey") || ""),
            (w.model = e("model") || ""),
            (w.temperature = parseFloat(e("temperature")) || 0.8),
            (w.maxTokens = parseInt(e("maxTokens"), 10) || 12e3),
            (w.topP = parseFloat(e("topP")) || 0.9),
            (w.frequencyPenalty = parseFloat(e("frequencyPenalty")) || 0),
            (w.presencePenalty = parseFloat(e("presencePenalty")) || 0),
            (h.limitBreakPrompt = e("limitBreakPrompt") || ""),
            (h.charExtractTag = e("charExtractTag") || ""),
            (h.userExtractTag = e("userExtractTag") || ""),
            (h.historyMax = parseInt(e("historyMax"), 10) || 4),
            (h.wbTri = e("wbTri") || "selective"),
            (h.wbPos = e("wbPos") || "after_character_definition"),
            (h.wbOrd = parseInt(e("wbOrd"), 10) || 100),
            K(c, w),
            K(s, h));
        })(),
        (x.activeView = "generator"),
        We("✓ Đã lưu cài đặt", "ok"),
        void we()
      );
    if ("settings-cancel" === L)
      return (U(), (x.activeView = "generator"), void we());
    if ("fetch-models" !== L) {
      if ("mask-close" !== L || !n.closest("[data-modal]")) {
        if ("mask-close" === L || "close" === L)
          return (
            "generator" !== x.activeView && (x.activeView = "generator"),
            void Ae()
          );
        if ("toggle-genNsfw" !== L)
          ("reset" === L &&
            (async function () {
              if (
                v &&
                !(await Pe("Dọn sạch nội dung sinh thành khí hiện tại?"))
              )
                return;
              ((x = {
                module: x.module,
                form: { ...p },
                genericForm: { ...u },
                result: null,
                genericResult: null,
                activeTab: "sfw",
                feedback: "",
                loading: !1,
                error: "",
                targetWorldbook: x.targetWorldbook,
                activeView: "generator",
              }),
                (v = !1),
                we());
            })(),
            "generate" === L &&
              ("character" === x.module
                ? (async function () {
                    if (
                      ((x.error = ""),
                      !String(x.form.name || "").trim() &&
                        !(await Pe(
                          "Chưa điền họ tên, có muốn để AI trực tiếp đặt tên không?",
                        )))
                    )
                      return;
                    ((x.form.age = String(B(x.form.age))),
                      (x.loading = !0),
                      ye(),
                      ve());
                    try {
                      const e = await Le("generate");
                      ((x.result = _e(e, x.form)),
                        (x.activeTab = "sfw"),
                        (v = !0),
                        We(
                          "✓ Đã sinh thành nhân vật, có thể xem trước rồi ghi vào",
                          "ok",
                        ));
                    } catch (e) {
                      (console.error(
                        "[Vạn tượng sinh thành khí] Sinh thành thất bại:",
                        e,
                      ),
                        (x.error = `Sinh thành thất bại: ${e?.message || "Lỗi không xác định"}`),
                        We(`✗ ${x.error}`, "err"));
                    } finally {
                      ((x.loading = !1), ye(), ve());
                    }
                  })()
                : (async function () {
                    ((x.error = ""), (x.loading = !0), ye(), ve());
                    try {
                      const t = await (async function () {
                        const t = j("generateRaw"),
                          n = j("generate");
                        if ("function" != typeof t && "function" != typeof n)
                          throw new Error(
                            "Không tìm thấy giao diện generateRaw/generate.",
                          );
                        const o = Se(),
                          c = {
                            name: "canming_generic_worldbook_entry",
                            schema: {
                              type: "object",
                              additionalProperties: !1,
                              required: ["title", "keywords", "content"],
                              properties: {
                                title: { type: "string" },
                                keywords: {
                                  type: "array",
                                  items: { type: "string" },
                                },
                                content: { type: "string" },
                              },
                            },
                          },
                          s = e(o),
                          l = s ? i(c) : "",
                          d = {
                            should_silence: !0,
                            ordered_prompts: [
                              { role: "system", content: Ce() },
                              { role: "user", content: `${Fe()}${l}` },
                            ],
                            ...(s ? {} : { json_schema: c }),
                          };
                        o && (d.custom_api = o);
                        let g;
                        for (let e = 0; e < 2; e++)
                          try {
                            return De(
                              "function" == typeof t
                                ? await t(d)
                                : await n({
                                    should_silence: !0,
                                    user_input: `${Ce()}\n\n${Fe()}${l}`,
                                    ...(s ? {} : { json_schema: c }),
                                    ...(o ? { custom_api: o } : {}),
                                  }),
                            );
                          } catch (t) {
                            if (
                              ((g = r(t, {
                                provider: s ? "DeepSeek" : "Giao diện AI",
                              })),
                              !a(t))
                            )
                              break;
                            0 === e &&
                              (d.ordered_prompts = [
                                { role: "system", content: Oe() },
                                {
                                  role: "user",
                                  content: `${Fe()}${l}\n\n（Đầu ra lần trước không phải JSON hợp lệ, vui lòng chỉ xuất đối tượng JSON nghiêm ngặt.）`,
                                },
                              ]);
                          }
                        throw g || new Error("Sinh thành thất bại");
                      })();
                      ((x.genericResult = Te(t)),
                        (v = !0),
                        We(
                          `✓ ${J().tag} đã sinh thành, có thể xem trước rồi ghi vào`,
                          "ok",
                        ));
                    } catch (e) {
                      (console.error(
                        "[Sinh thành khí đa chức năng] Sinh thành chung thất bại:",
                        e,
                      ),
                        (x.error = `Sinh thành thất bại: ${e?.message || "Lỗi không xác định"}`),
                        We(`✗ ${x.error}`, "err"));
                    } finally {
                      ((x.loading = !1), ye(), ve());
                    }
                  })()),
            "revise" === L &&
              (async function () {
                if (!x.result) return;
                ((x.error = ""), (x.loading = !0), ye(), ve());
                try {
                  const e = await Le("revise");
                  ((x.result = _e(e, x.form)),
                    (x.activeTab = "sfw"),
                    (v = !0),
                    We("✓ Đã tối ưu hóa kết quả theo phản hồi", "ok"));
                } catch (e) {
                  (console.error(
                    "[Vạn tượng sinh thành khí] Tối ưu hóa thất bại:",
                    e,
                  ),
                    (x.error = `Tối ưu hóa thất bại: ${e?.message || "Lỗi không xác định"}`),
                    We(`✗ ${x.error}`, "err"));
                } finally {
                  ((x.loading = !1), ye(), ve());
                }
              })(),
            "write" === L &&
              ("character" === x.module
                ? (async function () {
                    if (!x.result) return;
                    ((x.error = ""), (x.loading = !0), ye(), ve());
                    try {
                      await Ne();
                      const e = x.targetWorldbook;
                      if (!e)
                        throw new Error(
                          "Nhân vật hiện tại chưa liên kết Thế Giới Thư chính.",
                        );
                      const t = j("getWorldbook"),
                        n = j("createWorldbookEntries"),
                        r = j("deleteWorldbookEntries");
                      if ("function" != typeof n)
                        throw new Error(
                          "Không tìm thấy giao diện createWorldbookEntries.",
                        );
                      const a = x.result,
                        i = [a.sfwTitle, a.nsfwTitle].filter(Boolean);
                      let o = [];
                      if ("function" == typeof t) {
                        o = ((await t(e)) || []).filter((e) =>
                          i.includes(e.name),
                        );
                      }
                      if (
                        o.length &&
                        !(await Pe(
                          `Trong Thế Giới Thư đã tồn tại mục cùng tên: ${o.map((e) => e.name).join("、")}. Có muốn ghi đè không?`,
                        ))
                      )
                        return ((x.loading = !1), ye(), void ve());
                      if (o.length) {
                        if ("function" != typeof r)
                          throw new Error(
                            "Cần ghi đè mục cùng tên, nhưng không tìm thấy giao diện deleteWorldbookEntries.",
                          );
                        await r(e, (e) => i.includes(e.name), {
                          render: "debounced",
                        });
                      }
                      (await n(
                        e,
                        [
                          Ie(a.sfwTitle, a.sfwContent, a.sfwKeywords, [], 56),
                          Ie(
                            a.nsfwTitle,
                            a.nsfwContent,
                            a.nsfwKeywords,
                            a.nsfwSecondaryKeywords?.length
                              ? a.nsfwSecondaryKeywords
                              : ["NSFW"],
                            57,
                          ),
                        ],
                        { render: "immediate" },
                      ),
                        (v = !1),
                        We(`✓ Đã viết vào Thế Giới Thư: ${e}`, "ok"));
                    } catch (e) {
                      (console.error(
                        "[Vạn tượng sinh thành khí] Ghi vào thất bại:",
                        e,
                      ),
                        (x.error = `Ghi vào thất bại: ${e?.message || "Lỗi không xác định"}`),
                        We(`✗ ${x.error}`, "err"));
                    } finally {
                      ((x.loading = !1), ye(), ve());
                    }
                  })()
                : (async function () {
                    if (!x.genericResult) return;
                    ((x.error = ""), (x.loading = !0), ye(), ve());
                    try {
                      await Ne();
                      const e = x.targetWorldbook;
                      if (!e)
                        throw new Error(
                          "Nhân vật hiện tại chưa liên kết Thế Giới Thư chính.",
                        );
                      const t = j("getWorldbook"),
                        n = j("createWorldbookEntries"),
                        r = j("deleteWorldbookEntries");
                      if ("function" != typeof n)
                        throw new Error(
                          "Không tìm thấy giao diện createWorldbookEntries.",
                        );
                      const a = `${J().tag} | ${x.genericResult.title}`;
                      let i = [];
                      if ("function" == typeof t) {
                        i = ((await t(e)) || []).filter((e) => e.name === a);
                      }
                      if (
                        i.length &&
                        !(await Pe(
                          `Trong Thế Giới Thư đã tồn tại mục cùng tên: ${a}. Có muốn ghi đè không?`,
                        ))
                      )
                        return ((x.loading = !1), ye(), void ve());
                      if (i.length) {
                        if ("function" != typeof r)
                          throw new Error(
                            "Cần ghi đè mục cùng tên, nhưng không tìm thấy giao diện deleteWorldbookEntries.",
                          );
                        await r(e, (e) => e.name === a, {
                          render: "debounced",
                        });
                      }
                      (await n(
                        e,
                        [
                          Ie(
                            a,
                            x.genericResult.content,
                            x.genericResult.keywords,
                            [],
                            100,
                          ),
                        ],
                        { render: "immediate" },
                      ),
                        (v = !1),
                        We(`✓ Đã viết vào Thế Giới Thư: ${e}`, "ok"));
                    } catch (e) {
                      (console.error(
                        "[Sinh thành khí đa chức năng] Ghi vào thất bại:",
                        e,
                      ),
                        (x.error = `Ghi vào thất bại: ${e?.message || "Lỗi không xác định"}`),
                        We(`✗ ${x.error}`, "err"));
                    } finally {
                      ((x.loading = !1), ye(), ve());
                    }
                  })()));
        else {
          var D = b?.querySelector('[data-form-check="genNsfw"]');
          D &&
            ((D.checked = !D.checked), (x.form.genNsfw = D.checked), (v = !0));
        }
      }
    } else
      !(async function () {
        const e = b?.querySelector('[data-action="fetch-models"]'),
          t = e ? e.textContent : "";
        e && ((e.textContent = "⏳"), (e.disabled = !0));
        try {
          const e =
              b?.querySelector('[data-cfg="apiUrl"]')?.value?.trim() ||
              w.apiUrl,
            t =
              b?.querySelector('[data-cfg="apiKey"]')?.value?.trim() ||
              w.apiKey,
            n = await (async function (e, t) {
              if (((e = e || w.apiUrl), (t = t || w.apiKey), !e))
                throw new Error("Vui lòng điền địa chỉ API trước.");
              const n = j("getModelList");
              if ("function" == typeof n) return await n({ apiurl: e, key: t });
              const r = e
                  .replace(/\/chat\/completions\/?$/, "")
                  .replace(/\/v1\/?$/, "")
                  .replace(/\/+$/, ""),
                a = await fetch(r + "/v1/models", {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                    ...(t ? { Authorization: `Bearer ${t}` } : {}),
                  },
                });
              if (!a.ok) throw new Error(`HTTP ${a.status}: ${a.statusText}`);
              return ((await a.json()).data || [])
                .map((e) => e.id || e.name)
                .filter(Boolean)
                .sort();
            })(e, t);
          if (n && n.length > 0) {
            const e = b?.querySelector('[data-cfg="modelSelect"]');
            if (e) {
              ((e.innerHTML = n
                .map((e) => `<option value="${C(e)}">${C(e)}</option>`)
                .join("")),
                (e.style.display = "block"));
              const t = b?.querySelector('[data-cfg="model"]');
              t &&
                ((e.onchange = () => {
                  t.value = e.value;
                }),
                t.value && n.includes(t.value)
                  ? (e.value = t.value)
                  : n.length > 0 && ((e.value = n[0]), (t.value = n[0])));
            }
            We(`✓ Đã tải ${n.length} mô hình`, "ok");
          } else We("✗ API không trả về danh sách mô hình", "err");
        } catch (e) {
          We(`✗ Lấy thất bại: ${e.message}`, "err");
        }
        e && ((e.textContent = t), (e.disabled = !1));
      })();
  }
  function $e(e) {
    "Escape" === e.key &&
      (e.stopPropagation(),
      "generator" !== x.activeView && (x.activeView = "generator"),
      Ae());
  }
  function Se() {
    return w.apiUrl || w.apiKey
      ? {
          apiurl: w.apiUrl,
          key: w.apiKey,
          model: w.model,
          source: w.apiType,
          temperature: w.temperature,
          max_tokens: w.maxTokens,
          top_p: w.topP,
          frequency_penalty: w.frequencyPenalty,
          presence_penalty: w.presencePenalty,
        }
      : null;
  }
  function _e(e, t = x.form) {
    const n = String(e?.name || t.name || "Nhân vật chưa đặt tên").trim(),
      r = L(F(e?.alias)),
      a = L([n, ...r, ...F(e?.sfw_keywords)]),
      i = L([n, ...r, ...F(e?.nsfw_keywords)]),
      o = e?.sfw_title || M(n, "SFW"),
      c = e?.nsfw_title || M(n, "NSFW"),
      s =
        String(e?.sfw_content || "").trim() ||
        (function (e, t) {
          return `<Thiết lập nhân vật:${t}_SFW>\nThuyết minh sử dụng: Tệp này là tham khảo nội hóa nhân vật, cung cấp cho AI sử dụng để hiểu nhân vật. Tất cả các mục thiết lập nên được chuyển hóa thành hành vi, ngôn ngữ, lối tư duy và nhịp điệu cảm xúc của nhân vật, không được trực tiếp chỉ ra, lặp lại hoặc ám chỉ bản thân thiết lập trong tự sự hoặc đối thoại chính văn. Thiết lập là tầng đáy của sự thấu hiểu, không phải là đầu ra của việc viết lách.\n${R("Họ tên", t)}${R("Giới tính", e.gender)}${R("Tuổi", B(e.age))}${R("Thân phận", e.identity)}${R("Quan hệ với nhân vật chính", e.relation)}${R("Địa điểm hiện tại", e.location)}${R("Thế lực без thuộc", e.faction)}${R("Chức năng nhân vật", e.role)}\nVui lòng xoay quanh trải nghiệm, dục vọng, ranh giới, cách nói chuyện và móc nối tương tác của cô ấy/anh ấy để hoàn thiện nhân thiết.\n</Thiết lập nhân vật:${t}_SFW>`;
        })(t, n),
      l =
        String(e?.nsfw_content || "").trim() ||
        (function (e, t) {
          return `<Thiết lập nhân vật:${t}_NSFW>\n${R("Xác nhận trưởng thành", `${t} là nhân vật trưởng thành ${B(e.age)} tuổi`)}${R("Ranh giới thân mật", e.kinkBoundary)}\nVui lòng dựa trên nhân thiết SFW để kéo dài tự nhiên động thái thân mật, biểu đạt dục vọng, điểm tu sỉ, mô thức chủ động/bị động và giới hạn OOC.\n</Thiết lập nhân vật:${t}_NSFW>`;
        })(t, n);
    return {
      name: n,
      alias: r,
      sfwTitle: o,
      nsfwTitle: c,
      sfwKeywords: a.length ? a : [n],
      nsfwKeywords: i.length ? i : [n],
      nsfwSecondaryKeywords: L(
        F(e?.nsfw_secondary_keywords).length
          ? F(e?.nsfw_secondary_keywords)
          : ["NSFW"],
      ),
      sfwContent: s,
      nsfwContent: l,
    };
  }
  function Te(e) {
    const t = J(),
      n = String(
        e?.title || x.genericForm.topic || `Tên ${t.tag} chưa đặt`,
      ).trim(),
      r = L([n, ...F(e?.keywords), ...D(x.genericForm.keywords)]),
      a =
        String(e?.content || "").trim() ||
        `<${t.tag}>\nTên: ${n}\nThuyết minh: ${x.genericForm.extra || "Vui lòng hoàn thiện thiết lập này."}\n</${t.tag}>`;
    return { title: n, keywords: r.length ? r : [n], content: a };
  }
  async function Ae() {
    y &&
      ((v &&
        !(await Pe(
          "Sau khi đóng, các chỉnh sửa chưa được ghi vào sẽ được giữ lại trong bộ nhớ, nhưng tải lại trang có thể bị mất. Xác nhận đóng không?",
        ))) ||
        ((y = !1), b?.remove(), (b = null)));
  }
  async function Ee(e = {}) {
    ((m = e || {}),
      (f = m.mountDocument || document),
      (y = !0),
      (x.activeView = "generator"),
      (x.error = ""),
      U(),
      await Ne(),
      await ee(),
      we(),
      setTimeout(
        () =>
          f
            .querySelector(
              `#${n} [data-form="name"], #${n} [data-generic="topic"]`,
            )
            ?.focus(),
        0,
      ));
  }
  async function Ne() {
    try {
      const e = j("getCharWorldbookNames");
      if ("function" != typeof e) return;
      const t = await e("current");
      x.targetWorldbook = t?.primary || t?.additional?.[0] || "";
    } catch {}
  }
  async function Pe(e) {
    const t = globalThis.CanmingUI ?? window.parent?.CanmingUI;
    return "function" == typeof t?.confirm
      ? await t.confirm(e, {
          title: "Viết vào Thế Giới Thư",
          confirmText: "Ghi đè và viết vào",
          danger: !0,
        })
      : (f.defaultView || window).confirm(e);
  }
  let qe = null;
  function We(e, t = "ok") {
    console.log(`[Vạn tượng sinh thành khí] ${e}`);
    const n = globalThis.CanmingUI ?? window.parent?.CanmingUI;
    "function" == typeof n?.toast && n.toast(e, t);
    const r = b?.querySelector(".ccg-status");
    r &&
      (qe && clearTimeout(qe),
      (r.textContent = e),
      (r.className = "ccg-status " + ("err" === t ? "ccg-error" : "")),
      (qe = setTimeout(() => {
        const e = b?.querySelector(".ccg-status");
        (e &&
          ((e.textContent = x.error || ""),
          (e.className = "ccg-status " + (x.error ? "ccg-error" : ""))),
          (qe = null));
      }, 3e3)));
  }
  function ze() {
    const e = J(),
      t = [];
    h.limitBreakPrompt && t.push(h.limitBreakPrompt);
    const n = te();
    return (
      n &&
        t.push(
          `Dưới đây là nội dung tham khảo Thế Giới Thư mà nhân vật hiện tại đang liên kết, khi sinh thành nhân vật vui lòng giữ sự hài hòa với các thiết lập này:\n\n${n}`,
        ),
      e.sys && t.push(e.sys),
      t.push(
        'Bắt buộc xuất JSON hợp lệ. Dấu ngoặc kép bên trong trường sfw_content và nsfw_content phải được chuyển đổi thành \\", ngắt dòng phải chuyển đổi thành \\n. Không sử dụng thẻ XML chưa được chuyển đổi bên trong chuỗi JSON——hãy coi nội dung thẻ như văn bản thuần túy đặt trong chuỗi JSON.',
      ),
      t.join("\n\n")
    );
  }
  function Oe() {
    return 'Câu trả lời lần trước của bạn không phải là JSON hợp lệ. Vui lòng chỉ xuất một đối tượng JSON nghiêm ngặt, mọi dấu ngoặc kép trong giá trị chuỗi dùng \\" để chuyển đổi, ngắt dòng dùng \\n để chuyển đổi. Không xuất bất kỳ nội dung nào ngoài JSON. Không dùng khối mã markdown để bọc.';
  }
  function je(e) {
    const t = J(),
      n = x.form,
      r = n.name || "Xin bạn đặt tên";
    var a = (t.userPromptTemplate || "")
      .replace(/\{name\}/g, r)
      .replace(/\{gender\}/g, n.gender)
      .replace(/\{age\}/g, String(B(n.age)))
      .replace(/\{identity\}/g, n.identity || "Chưa chỉ định")
      .replace(/\{relation\}/g, n.relation || "Chưa chỉ định")
      .replace(/\{location\}/g, n.location || "Chưa chỉ định")
      .replace(/\{faction\}/g, n.faction || "Chưa chỉ định")
      .replace(/\{role\}/g, n.role || "Chưa chỉ định")
      .replace(/\{tone\}/g, n.tone || "Loạn thế tả thực, kiềm chế có dư âm")
      .replace(/\{keywordHint\}/g, n.keywordHint || "Không có")
      .replace(/\{appearance\}/g, n.appearance || "Không có")
      .replace(
        /\{kinkBoundary\}/g,
        n.kinkBoundary || "Sinh thành tự nhiên theo nhân vật",
      )
      .replace(/\{physique\}/g, n.physique || "Không có")
      .replace(/\{extra\}/g, n.extra || "Không có")
      .replace(/\{nameTag\}/g, r);
    if (!1 === n.genNsfw) {
      var i = a.indexOf("nsfw_content");
      if (i > 0) {
        var o = a.lastIndexOf("\n", i);
        (o < 0 && (o = i), (a = a.substring(0, o).trim()));
      }
      a +=
        "\n\nLưu ý: Lần này không sinh thành nội dung NSFW. Ba trường nsfw_content, nsfw_keywords, nsfw_secondary_keywords đều trả về giá trị rỗng (chuỗi rỗng hoặc mảng rỗng). nsfw_title trả về chuỗi rỗng.";
    }
    if ("revise" !== e) return a;
    const c = x.result || {};
    return `Vui lòng dựa theo phản hồi của người dùng, tối ưu hóa thiết lập nhân vật đã sinh thành dưới đây. Giữ nguyên cấu trúc JSON, chỉ sửa phần cần sửa.\n\nPhản hồi của người dùng:\n${x.feedback || "Vui lòng tăng cường trải nghiệm cụ thể và tính khả thi khi nhập vai."}\n\nTên nhân vật hiện tại: ${c.name || r}\nTên mục SFW hiện tại: ${c.sfwTitle || ""}\nTên mục NSFW hiện tại: ${c.nsfwTitle || ""}\n\nsfw_keywords hiện tại: ${(c.sfwKeywords || []).join(", ")}\nnsfw_keywords hiện tại: ${(c.nsfwKeywords || []).join(", ")}\nnsfw_secondary_keywords hiện tại: ${(c.nsfwSecondaryKeywords || []).join(", ")}\n\n===== Nội dung SFW hiện tại =====\n${c.sfwContent || "（Không có）"}\n\n===== Nội dung NSFW hiện tại =====\n${c.nsfwContent || "（Không có）"}\n\n===== Kết thúc =====\n\nVui lòng trả về JSON hoàn chỉnh sau khi sửa đổi (name, alias, sfw_title, nsfw_title, sfw_keywords, nsfw_keywords, nsfw_secondary_keywords, sfw_content, nsfw_content). Không bỏ sót bất kỳ trường nào, ngay cả khi trường đó không thay đổi cũng phải bao gồm.`;
  }
  function Ce() {
    const e = J(),
      t = [];
    h.limitBreakPrompt && t.push(h.limitBreakPrompt);
    const n = te();
    return (
      n &&
        t.push(
          `Dưới đây là nội dung tham khảo Thế Giới Thư mà nhân vật hiện tại đang liên kết, khi sinh thành vui lòng giữ sự hài hòa với các thiết lập này:\n\n${n}`,
        ),
      e.sys && t.push(e.sys),
      t.join("\n\n")
    );
  }
  function Fe() {
    const e = J(),
      t = x.genericForm;
    let n = "";
    e.fields &&
      e.fields.length > 0 &&
      (n =
        "\n" +
        e.fields
          .map((e) => {
            const n = (t[e.name] || "").trim();
            return n ? `${e.name}: ${n}` : null;
          })
          .filter(Boolean)
          .join("\n"));
    let r = "";
    return (
      e.fields &&
        e.fields.length > 0 &&
        (r =
          "\n\nVui lòng tổ chức nội dung trong content theo cấu trúc dưới đây:\n" +
          e.fields.map((e) => `<${e.name}>: ${e.pmt}`).join("\n")),
      `Vui lòng sinh thành một mục Thế Giới Thư ${e.tag}.\nTên/Chủ đề: ${t.topic || "Xin bạn đặt tên"}\nKhuynh hướng phong cách: ${t.style || "Không có yêu cầu đặc biệt"}${n ? "\n" + n : ""}\nSở thích từ khóa: ${t.keywords || "Không có"}\nThuyết minh bổ sung: ${t.extra || "Không có"}\n\nTrả về trường JSON: title, keywords, content. content vui lòng bọc bằng <${e.tag}>...</${e.tag}>, cấu trúc bên trong rõ ràng, có thể dùng trực tiếp làm chính văn Thế Giới Thư.${r}`
    );
  }
  async function Le(t = "generate") {
    const n = j("generateRaw"),
      o = j("generate");
    if ("function" != typeof n && "function" != typeof o)
      throw new Error("Không tìm thấy giao diện generateRaw/generate.");
    const c = Se(),
      s = {
        name: "canming_character_worldbook_entry",
        schema: {
          type: "object",
          additionalProperties: !1,
          required: [
            "name",
            "alias",
            "sfw_title",
            "nsfw_title",
            "sfw_keywords",
            "nsfw_keywords",
            "nsfw_secondary_keywords",
            "sfw_content",
            "nsfw_content",
          ],
          properties: {
            name: { type: "string" },
            alias: { type: "array", items: { type: "string" } },
            sfw_title: { type: "string" },
            nsfw_title: { type: "string" },
            sfw_keywords: { type: "array", items: { type: "string" } },
            nsfw_keywords: { type: "array", items: { type: "string" } },
            nsfw_secondary_keywords: {
              type: "array",
              items: { type: "string" },
            },
            sfw_content: { type: "string" },
            nsfw_content: { type: "string" },
          },
        },
      },
      l = e(c),
      d = l ? i(s) : "",
      g = {
        should_silence: !0,
        ordered_prompts: [
          { role: "system", content: ze() },
          { role: "user", content: `${je(t)}${d}` },
        ],
        ...(l ? {} : { json_schema: s }),
      };
    let p;
    c && (g.custom_api = c);
    for (let e = 0; e < 2; e++)
      try {
        return De(
          "function" == typeof n
            ? await n(g)
            : await o({
                should_silence: !0,
                user_input: `${ze()}\n\n${je(t)}${d}`,
                ...(l ? {} : { json_schema: s }),
                ...(c ? { custom_api: c } : {}),
              }),
        );
      } catch (n) {
        if (((p = r(n, { provider: l ? "DeepSeek" : "Giao diện AI" })), !a(n)))
          break;
        0 === e &&
          (g.ordered_prompts = [
            { role: "system", content: Oe() },
            {
              role: "user",
              content: `${je(t)}${d}\n\n（Đầu ra lần trước không phải JSON hợp lệ——bắt buộc xuất JSON nghiêm ngặt, mọi dấu ngoặc kép và ngắt dòng trong chuỗi đều phải được chuyển đổi.）`,
            },
          ]);
      }
    throw p || new Error("Sinh thành thất bại");
  }
  function De(e) {
    if (e && "object" == typeof e && !Array.isArray(e)) return e;
    const t = String(e || "").trim();
    if (!t) throw new Error("AI không trả về nội dung.");
    const n = t.match(/```(?:json)?\s*([\s\S]*?)```/i)?.[1],
      r = (n || t).trim();
    try {
      return JSON.parse(r);
    } catch {}
    const a = r.indexOf("{"),
      i = r.lastIndexOf("}");
    if (a >= 0 && i > a)
      try {
        return JSON.parse(r.slice(a, i + 1));
      } catch {}
    const o = (e) => {
        const t = new RegExp(`"${e}"\\s*:\\s*"((?:[^"\\\\]|\\\\.)*)"`, "i"),
          n = r.match(t);
        if (n)
          return n[1]
            .replace(/\\"/g, '"')
            .replace(/\\n/g, "\n")
            .replace(/\\\\/g, "\\");
        const a = new RegExp(
            `"${e}"\\s*:\\s*"([\\s\\S]*?)"(?:\\s*[,\\}])`,
            "i",
          ),
          i = r.match(a);
        return i
          ? i[1]
              .replace(/\\"/g, '"')
              .replace(/\\n/g, "\n")
              .replace(/\\\\/g, "\\")
          : "";
      },
      c = (e) => {
        const t = new RegExp(`"${e}"\\s*:\\s*\\[([^\\]]*)\\]`, "i"),
          n = r.match(t);
        return n
          ? n[1]
              .split(",")
              .map((e) => e.replace(/^["\\s]+|["\\s]+$/g, "").trim())
              .filter(Boolean)
          : [];
      },
      s =
        o("name") ||
        o("sfw_title")?.replace(/_SFW$/, "") ||
        "Nhân vật chưa đặt tên",
      l = c("alias"),
      d = o("sfw_title") || `${s}_SFW`,
      g = o("nsfw_title") || `${s}_NSFW`,
      p = c("sfw_keywords"),
      u = c("nsfw_keywords"),
      f = c("nsfw_secondary_keywords");
    let m = o("sfw_content"),
      b = o("nsfw_content");
    if (!m) {
      const e = r.match(
        /<Thiết lập nhân vật[^>]*_SFW>([\s\S]*?)<\/Thiết lập nhân vật[^>]*_SFW>/i,
      );
      e && (m = e[0]);
    }
    if (!b) {
      const e = r.match(
        /<Thiết lập nhân vật[^>]*_NSFW>([\s\S]*?)<\/Thiết lập nhân vật[^>]*_NSFW>/i,
      );
      e && (b = e[0]);
    }
    if (!m && !b && !s)
      throw new Error(
        "Nội dung AI trả về không phải là JSON có thể phân tích.",
      );
    return (
      console.log(
        "[Vạn tượng sinh thành khí] Đã sử dụng phân tích dung sai để chiết xuất dữ liệu nhân vật",
      ),
      {
        name: s,
        alias: l,
        sfw_title: d,
        nsfw_title: g,
        sfw_keywords: p,
        nsfw_keywords: u,
        nsfw_secondary_keywords: f,
        sfw_content: m,
        nsfw_content: b,
      }
    );
  }
  function Ie(e, t, n, r, a) {
    return {
      name: e,
      enabled: !0,
      content: t,
      strategy: {
        type: h.wbTri || "selective",
        keys: F(n),
        keys_secondary: { logic: "and_any", keys: F(r) },
        scan_depth: "same_as_global",
      },
      position: {
        type: h.wbPos || "after_character_definition",
        role: "system",
        depth: 0,
        order: a ?? (h.wbOrd || 100),
      },
      recursion: {
        prevent_incoming: !0,
        prevent_outgoing: !0,
        delay_until: null,
      },
      probability: 100,
      effect: { sticky: null, cooldown: null, delay: null },
    };
  }
  function Re(e) {
    return null == e ? e : JSON.parse(JSON.stringify(e));
  }
  function Be() {
    const e = J();
    if ("character" === x.module) {
      if (!x.result) return null;
      const t = x.result;
      return {
        module: "character",
        moduleName: e.name,
        type: "character-package",
        title: t.name,
        result: Re(t),
        entries: [
          Ie(t.sfwTitle, t.sfwContent, t.sfwKeywords, [], 56),
          Ie(
            t.nsfwTitle,
            t.nsfwContent,
            t.nsfwKeywords,
            t.nsfwSecondaryKeywords?.length
              ? t.nsfwSecondaryKeywords
              : ["NSFW"],
            57,
          ),
        ],
      };
    }
    if (!x.genericResult) return null;
    const t = `${e.tag} | ${x.genericResult.title}`;
    return {
      module:
        e.isDefault && ["item", "faction", "event"].includes(e.id)
          ? e.id
          : "custom",
      moduleName: e.name,
      type: "worldbook-entry",
      title: x.genericResult.title,
      result: Re(x.genericResult),
      entries: [
        Ie(t, x.genericResult.content, x.genericResult.keywords, [], 100),
      ],
    };
  }
  const Je = {
    open: Ee,
    close: Ae,
    toggle: async function (e = {}) {
      y ? await Ae() : Ee(e);
    },
    getCurrentWork: Be,
    exportCurrentWork: function (e = {}) {
      const t = Be();
      if (!t)
        throw new Error(
          "Vui lòng sinh thành tác phẩm trước khi đăng lên Xưởng sáng tạo.",
        );
      const n = {
        title: String(e.title || t.title || "").trim(),
        summary: String(e.summary || "").trim(),
        tags: F(e.tags)
          .map((e) => String(e).trim())
          .filter(Boolean),
      };
      if ("character-package" === t.type) {
        const e = t.result;
        return {
          format: "canming-workshop-package",
          version: 1,
          type: t.type,
          module: "character",
          createdAt: new Date().toISOString(),
          metadata: n,
          payload: {
            character: {
              id: `generated-${Date.now()}`,
              name: e.name,
              aliases: Re(e.alias),
              title: "",
              summary: n.summary,
              worldbookEntries: t.entries.map((e) => e.name),
            },
            portraits: {},
            worldbookEntries: Re(t.entries),
          },
        };
      }
      return {
        format: "canming-workshop-package",
        version: 1,
        type: t.type,
        module: t.module,
        createdAt: new Date().toISOString(),
        metadata: n,
        payload: { moduleName: t.moduleName, entries: Re(t.entries) },
      };
    },
    importWork: function (e) {
      if ("canming-workshop-package" !== e?.format || 1 !== e?.version)
        throw new Error("Định dạng gói tác phẩm không hợp lệ.");
      if ("character-package" === e.type) {
        const t = e.payload?.character,
          n = e.payload?.worldbookEntries;
        if (!t?.name || !Array.isArray(n))
          throw new Error("Nội dung tác phẩm nhân vật không hoàn chỉnh.");
        ((x.module = "character"),
          (x.result = _e({
            name: t.name,
            alias: t.aliases,
            sfw_title: n[0]?.name,
            sfw_content: n[0]?.content,
            sfw_keywords: n[0]?.strategy?.keys,
            nsfw_title: n[1]?.name,
            nsfw_content: n[1]?.content,
            nsfw_keywords: n[1]?.strategy?.keys,
            nsfw_secondary_keywords: n[1]?.strategy?.keys_secondary?.keys,
          })),
          (x.genericResult = null));
      } else {
        if ("worldbook-entry" !== e.type)
          throw new Error("Không hỗ trợ loại tác phẩm này.");
        {
          const t = e.payload?.entries?.[0];
          if (!t?.name || "string" != typeof t.content)
            throw new Error("Nội dung tác phẩm Thế Giới Thư không hoàn chỉnh.");
          const n =
            "custom" === e.module ? T.find((e) => !e.isDefault)?.id : e.module;
          ((x.module = T.some((e) => e.id === n) ? n : "item"),
            (x.genericResult = Te({
              title: e.metadata?.title || t.name,
              keywords: t.strategy?.keys,
              content: t.content,
            })),
            (x.result = null));
        }
      }
      return ((v = !0), y && we(), Be());
    },
    listShareableGenerators: function () {
      return Re(
        T.map((e) => ({
          id: e.id,
          name: e.name,
          tag: e.tag,
          icon: e.icon,
          isDefault: Boolean(e.isDefault),
          modified: Boolean(k[e.id]),
        })),
      );
    },
    exportGeneratorDefinition: function (e) {
      const t = T.find((t) => t.id === e);
      if (!t) throw new Error("Không tìm thấy sinh thành khí này.");
      const n = Re(t);
      return (delete n.id, delete n.isDefault, n);
    },
    importGeneratorDefinition: function (e) {
      const t = Re(e);
      if (!t || !t.tag || !Array.isArray(t.fields))
        throw new Error("Định nghĩa sinh thành khí không hoàn chỉnh.");
      return (
        (t.id = H()),
        (t.isDefault = !1),
        (t.name = String(t.name || t.tag).trim()),
        (k[t.id] = t),
        S.push(t.id),
        G(),
        y && we(),
        Re(t)
      );
    },
    removeGeneratorDefinition: function (e) {
      const t = k[e];
      return (
        !(!t || t.isDefault || g.some((t) => t.id === e)) &&
        (delete k[e],
        (S = S.filter((t) => t !== e)),
        x.module === e && (x.module = "character"),
        G(),
        y && we(),
        !0)
      );
    },
  };
  globalThis[t] = Je;
  try {
    window.parent && window.parent !== window && (window.parent[t] = Je);
  } catch {}
})();
//# sourceMappingURL=index.js.map
