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
        : ` Lỗi gốc: ${e.slice(0, 240)}`;
    })(i);
  return 401 === o
    ? new Error(
        `${a} Xác thực thất bại (HTTP 401): API Key không hợp lệ, đã hết hạn hoặc điền sai.${c}`,
      )
    : 402 === o
      ? new Error(
          `${a} Số dư không đủ hoặc chưa mở thanh toán (HTTP 402): Vui lòng nạp tiền, mở thanh toán hoặc đổi API Key có hạn mức.${c}`,
        )
      : 403 === o
        ? new Error(
            `${a} Bị từ chối truy cập (HTTP 403): API Key hiện tại không có quyền đối với mô hình hoặc giao diện này.${c}`,
          )
        : 404 === o
          ? new Error(
              `${a} Giao diện hoặc mô hình không tồn tại (HTTP 404): Vui lòng kiểm tra địa chỉ API và tên mô hình.${c}`,
            )
          : 408 === o
            ? new Error(
                `${a} Yêu cầu quá thời gian chờ (HTTP 408): Vui lòng thử lại sau hoặc kiểm tra kết nối mạng.${c}`,
              )
            : 413 === o
              ? new Error(
                  `${a} Từ chối yêu cầu do quá dài (HTTP 413): Vui lòng giảm bớt Thế Giới Thư tham chiếu, từ nhắc hoặc nội dung sinh ra.${c}`,
                )
              : 429 === o
                ? new Error(
                    `${a} Yêu cầu quá dồn dập hoặc chạm hạn mức (HTTP 429): Vui lòng đợi giới hạn tần suất phục hồi hoặc kiểm tra hạn ngạch tài khoản.${c}`,
                  )
                : [500, 502, 503, 504].includes(o)
                  ? new Error(
                      `${a} Dịch vụ tạm thời không khả dụng (HTTP ${o}): Đây là sự cố từ nhà cung cấp máy chủ, vui lòng thử lại sau.${c}`,
                    )
                  : /model[\s\S]{0,80}(?:not found|does not exist|invalid|unavailable)|unknown model/i.test(
                        i,
                      )
                    ? new Error(
                        `${a} Không chấp nhận tên mô hình hiện tại: Vui lòng kéo lại danh sách mô hình và chọn mô hình khả dụng.${c}`,
                      )
                    : /context length|maximum context|too many tokens|token limit|prompt is too long/i.test(
                          i,
                        )
                      ? new Error(
                          `${a} Vượt quá ngữ cảnh: Vui lòng giảm độ dài Thế Giới Thư tham chiếu hoặc từ nhắc.${c}`,
                        )
                      : /response[_ -]?format|json[_ -]?schema|structured output/i.test(
                            i,
                          )
                        ? new Error(
                            `${a} Không hỗ trợ định dạng xuất có cấu trúc hiện tại: Vui lòng đổi mô hình tương thích hoặc giao thức giao diện.${c}`,
                          )
                        : 400 === o
                          ? new Error(
                              `${a} Đã từ chối yêu cầu (HTTP 400): Vui lòng kiểm tra tên mô hình, giao thức giao diện, phạm vi tham số và độ dài từ nhắc.${c}`,
                            )
                          : /failed to fetch|network error|networkerror|econnreset|econnrefused|socket hang up/i.test(
                                i,
                              )
                            ? new Error(
                                `${a} Kết nối mạng thất bại: Vui lòng kiểm tra địa chỉ API, proxy và kết nối mạng.${c}`,
                              )
                            : !i || /^(?:error:\s*)?<none>$/i.test(i)
                              ? new Error(
                                  `${a} Yêu cầu thất bại, nhưng trợ thủ Quán Rượu không trả về thông tin lỗi cụ thể; vui lòng kiểm tra bảng điều khiển hoặc nhật ký máy chủ Quán Rượu.`,
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
        "【Chế độ tương thích JSON DeepSeek】",
        "Vui lòng chỉ xuất ra một đối tượng JSON hợp lệ, không xuất Markdown, khối mã, lời giải thích hay bất kỳ ký tự nào ngoài đối tượng.",
        "Đầu ra bắt buộc phải thỏa mãn JSON Schema sau; tất cả các trường required đều phải tồn tại:",
        JSON.stringify(t, null, 2),
      ].join("\n")
    : "";
}
(() => {
  const t = "CanmingCharacterGenerator",
    n = "canming-character-generator-root",
    o = "canming-character-generator-style",
    c = "canming-1.9:generator:api",
    s = "canming-1.9:generator:ui",
    l = "canming-1.9:generator:custom-modules",
    d = "canming-1.9:generator:order",
    g = [
      {
        id: "character",
        name: "Nhân vật",
        tag: "Nhân vật",
        icon: "♟",
        isDefault: !0,
        sys: 'Kỷ luật sáng tác thép:\n1. Trải nghiệm quyết định tính cách — Chỉ viết sự thật, khung cảnh, chi tiết thể xác/cảm quan, không viết các phân tích tâm lý kiểu "người ấy đã trở thành người như thế nào". Hãy để người đọc tự hiểu nhân vật qua trải nghiệm, thay vì bị dán nhãn tính cách.\n2. Neo điểm quý hiếm — Mỗi neo tính cách chỉ xuất hiện một lần, đã dùng thì không lặp lại. Một từ neo chuẩn xác hơn vạn lời giải thích.\n3. Thông tin phân tán không tập trung — Các khía cạnh khác nhau của cùng một đặc trưng được rải đều vào các phân đoạn và tình huống khác nhau, không gom lại nói hết một chỗ. Bắt buộc AI phải hiểu tổng hợp, không được chép lại một đoạn nhãn mác.\n4. Tự sự mang thiên hướng — Mỗi câu văn đều mang khẩu khí và lập trường của chính nhân vật, không dùng giọng trần thuật khách quan trung tính.\n\nCách viết trải nghiệm:\n- Viết "đã xảy ra chuyện gì", không viết "đã biến thành ra sao"\n- Có mốc thời gian cụ thể (năm nào, mấy tuổi), địa điểm, nhân vật, cảm nhận thân thể rõ ràng\n- Cuối mỗi đoạn trải nghiệm lồng 1-2 câu nhân vật từng nói lúc đó (ngữ lệ), đặt trong dấu ngoặc kép\n- Dùng giọng điệu của chính nhân vật để kể lại đoạn đời đó\n\nĐối thoại và hành vi thực tế:\n- Đối thoại phải có độ nhận diện — Khẩu ngữ/văn vẻ, nói nhiều/nói ít, bộc trực/vòng vo, phản ánh giai tầng và tính cách\n- Hành vi phải có độ căng — Trước mặt người khác và sau lưng khác nhau, ngoài miệng nói một đằng trong lòng nghĩ một nẻo\n- Đưa ra giới hạn đỏ của nhân vật: Việc gì người ấy thà chết cũng không làm? Bị dồn vào chân tường sẽ phản ứng ra sao?\n\nCác chiều kích bắt buộc phải bao quát:\n- Dục vọng sâu xa: Người ấy khao khát điều gì nhất? Không phải loại phù phiếm bề mặt, mà là thứ chôn sâu dưới hành vi, âm thầm thúc đẩy người ấy tiến bước\n- Nỗi sợ cốt lõi: Người ấy sợ nhất điều gì? Nỗi sợ này khiến người ấy tránh né việc gì, đưa ra những lựa chọn nhìn qua có vẻ vô lý nào?\n- Khuyết điểm chân thật: Không phải loại "quá lương thiện" hay "quá nỗ lực", mà là hư vinh, toan tính, ích kỷ, nhát gan, trốn tránh — loại thực sự khiến người ta khó chịu\n- Mâu thuẫn: Nhân vật thú vị luôn có lúc đáng ghét. Lúc nào người ấy khiến người khác muốn quay lưng nhất?\n- Móc nối tương tác: Người khác bước vào phạm vi thế lực của người ấy bằng cách nào? Người ấy sẽ tạo phiền phức gì, hoặc mang lại cơ hội nào cho nhân vật chính?\n\nThế giới quan Tàn Minh Dư Tẫn:\nThời loạn cuối Minh, đói kém giặc giã, thế lực địa phương cát cứ, nợ ân tình nặng tựa thái sơn, tiền lương vĩnh viễn thiếu hụt, lễ pháp đè nén tư dục. Mỗi lựa chọn của nhân vật đều phải cảm nhận được sức nặng ngột ngạt của thời đại này đè lên vai họ.',
        namePrompt: "",
        fields: [],
        userPromptTemplate:
          'Tạo một nhân vật phù hợp với thế giới quan Tàn Minh Dư Tẫn.\n\nThiết lập cơ bản:\n- Họ tên: {name}\n- Giới tính: {gender}\n- Tuổi: {age}\n- Thân phận / Giai tầng: {identity}\n- Quan hệ với nhân vật chính: {relation}\n- Địa điểm hiện tại: {location}\n- Thuộc thế lực: {faction}\n- Chức năng nhân vật: {role}\n- Thiên hướng văn phong: {tone}\n- Gợi ý ngoại mạo: {appearance}\n- Ranh giới / Thiên hướng NSFW: {kinkBoundary}\n- Gợi ý thể mạo: {physique}\n- Thiên hướng từ khóa: {keywordHint}\n- Thuyết minh bổ sung: {extra}\n\nsfw_content vui lòng viết nghiêm ngặt theo định dạng sau, dùng trực tiếp làm chính văn Thế Giới Thư:\n\n<Thiết lập nhân vật:{nameTag}_SFW>\nHướng dẫn sử dụng: Bản lưu này là tài liệu tham khảo nội hóa nhân vật, dành cho AI thấu hiểu bản thể. Mọi mục thiết lập phải được chuyển hóa thành hành vi, ngôn ngữ, phương thức tư duy và nhịp điệu cảm xúc của nhân vật, không được điểm xuyết, thuật lại hay ám chỉ trực tiếp các dòng thiết lập này trong lời dẫn hay đối thoại. Thiết lập là nền tảng ngầm hiểu, không phải văn bản xuất ra.\n\n[Cơ sở]\nHọ tên đầy đủ: {name}\nTên gọi khác: Nếu có, AI bổ sung dựa theo trải nghiệm của nhân vật\nTông giọng: Dùng một từ neo ngoại ngữ (dưới 6 chữ) định hình mâu thuẫn cốt lõi hoặc động lực sinh mệnh của nhân vật — không phải khái quát tính cách, mà là đời này người ấy bị thứ gì thôi thúc tiến bước.\n\nThân phận cốt lõi\n  Giới tính: {gender}\n  Tuổi: {age}\n  Thân phận / Giai tầng: {identity}\n  Nơi ở: {location}  |  Thuộc thế lực: {faction}\n  Quan hệ với nhân vật chính: {relation}\n  Nhãn: 3-5 đoản từ, nhanh chóng đánh dấu vị trí sinh thái của nhân vật trong câu chuyện. Ví dụ: Di cô vong quốc / Kẻ trung gian chịu đòn hai đầu / Bề ngoài trung bộc trong lòng bạc đồ\n\nBối cảnh\n  Xuất thân: Dùng giọng điệu mang thiên hướng của chính nhân vật để viết, không trần thuật khách quan lạnh lùng. Trọng tâm viết về môi trường gia đình đã nhào nặn nên niềm tin của họ — thiếu thốn thứ gì, thừa thãi thứ gì, bị thứ gì đè nén lớn lên. 2-3 câu là đủ.\n  Tình cảnh hiện tại: Trạng thái sinh tồn lúc này của họ — dựa vào đâu kiếm cơm, sống ở nơi thế nào, ở cùng ai, có rắc rối gì không dứt ra được. 2-3 câu.\n\n[Ngoại mạo]\nDùng khẩu khí ngôi thứ nhất của nhân vật để tự thuật ngoại hình — không phải miêu tả khách quan, mà là khi soi gương họ nghĩ gì, tự nhủ ra sao.\n- Thông tin lồng ghép đánh giá về bản thân: Hài lòng điểm nào, ghét bỏ điểm nào, ngoài miệng nói không màng nhưng trong tối lén lút bù đắp\n- Ăn mặc trang phục bộc lộ thông tin: Dịp nào mặc đồ gì, món nào là đồ cũ tiếc không nỡ vứt, chỗ nào là cố tình khoe ra cho thiên hạ thấy\n- Hoàn thành đồng thời 3 việc: Khắc họa diện mạo + Thể hiện tính cách + Tích lũy ngữ liệu khẩu ngữ\n- Cấm kiểu tự sự khách quan như "nàng cao xxx", "nàng có diện mạo rất đẹp", "ngũ quan tinh xảo"\n\n[Điểm neo]\nDùng 2-4 từ ngoại ngữ ít phổ biến (tiếng Pháp / Đức / Latinh / Hy Lạp...) làm tiêu đề điểm neo nhân vật. Mỗi từ neo đi kèm một đoạn 50-80 chữ miêu tả hành vi thực tế — chỉ viết họ làm gì, làm thế nào, không viết họ "có tính cách ra sao". Giữa các từ neo không viết rõ mối liên hệ, để AI tự xâu chuỗi.\n\n[Trải nghiệm]\nViết 2-3 đoạn trải nghiệm nhân sinh then chốt. Mỗi đoạn:\n- Có mốc thời gian cụ thể (năm nào/mấy tuổi), địa điểm, cảm thụ thân thể hoặc chi tiết cảm quan sắc nét\n- Chỉ ghi chép sự thật và khung cảnh, tuyệt đối không phân tích tâm lý (không viết "vì vậy họ trở nên xxx")\n- Cuối đoạn lồng vào 1-2 câu nhân vật từng nói lúc đó (ngữ lệ), đặt trong dấu ngoặc kép\n- Dùng ngữ khí của chính nhân vật để thuật lại đoạn trải nghiệm này (không dùng lời trần thuật trung tính)\n\n[Lời nói]\n- Khái quát đặc trưng ăn nói của nhân vật: Tốc độ nói, thói quen dùng từ, độ dài câu cú, câu cửa miệng\n- Đưa ra 2-3 câu đối thoại mẫu tiêu biểu (trong các ngữ cảnh và cảm xúc khác nhau)\n\n[Động lực]\n- Dục vọng sâu xa: Thứ họ khát khao nhất là gì? (Một dòng duy nhất, không phân tích dài dòng)\n- Nỗi sợ cốt lõi: Họ sợ nhất điều gì? (Một dòng)\n- Khuyết điểm chân thật: Không phải "quá lương thiện", mà là hư vinh, toan tính, nhát gan, trốn tránh — loại thực sự khiến người khác khó chịu (Một dòng)\n- Mâu thuẫn: Trong tình huống nào họ sẽ thể hiện khác hẳn ngày thường? (Một dòng)\n\n[Móc nối]\n- Giới hạn đỏ: Việc gì họ thà chết cũng không làm?\n- Cửa ngõ tương tác: Người khác kết nối với họ qua cách nào? Họ sẽ tạo ra phiền toái hoặc cơ hội gì cho nhân vật chính?\n\n</Thiết lập nhân vật:{nameTag}_SFW>\n\nnsfw_content xin hãy phát triển tự nhiên từ bản thể SFW, không tạo cảm giác đứt gãy. Định dạng như sau:\n\n<Thiết lập nhân vật:{nameTag}_NSFW>\n\n[Thể mạo]\nViết bằng cảm nhận của chính nhân vật — không phải bản khám nghiệm thể chất khách quan, mà là trong khoảnh khắc thân mật họ hiểu gì, để ý gì về thân thể mình.\n- Chỉ viết những chi tiết mà ngoại hình SFW chưa đề cập, chỉ bộc lộ trong cảnh NSFW\n- Cảm nhận xúc giác làn da (vùng da dãi dầu sương gió vs vùng kín đáo quanh năm), khi căng thẳng hoặc động tình chỗ nào phản ứng trước, điều mình tự biết nhưng không muốn người khác nhìn thấu\n- Không lặp lại ngoại hình cơ bản, 3-5 câu là đủ. Cấm liệt kê số đo ba vòng như phiếu khám nghiệm\n\n[Điểm neo thân mật]\n1-2 từ neo ngoại ngữ, khắc họa mô thức hành vi trong quan hệ thân mật — không phải tả thể xác, mà là viết về thái độ, tiết tấu, tư thế quyền lực.\n\n[Bản đồ dục vọng]\nTrong hoàn cảnh thân mật, họ truy cầu cảm giác gì? Bị chi phối / Chi phối / Được cần đến / Bị hủy diệt / Được sùng bái? Điều này liên hệ thế nào với dục vọng sâu xa (xem SFW)?\n\n[Tu sỉ & Ranh giới]\nĐiểm nhạy cảm họ không muốn bị chạm tới — không phải vị trí cơ thể, mà là tâm lý. Điều gì khiến họ đột ngột nguội lạnh hoặc trở mặt giữa lúc thân mật?\n\n[Ngữ lệ thân mật]\n2-3 câu nhân vật sẽ nói trong hoàn cảnh thân mật (có thể đối chiếu với khẩu khí trong SFW để thấy cùng một người sẽ ăn nói thế nào ở các bối cảnh khác nhau).\n\n</Thiết lập nhân vật:{nameTag}_NSFW>',
      },
      {
        id: "item",
        name: "Vật phẩm",
        tag: "Vật phẩm",
        icon: "⚔",
        isDefault: !0,
        sys: "Ngươi là trợ thủ đa năng sinh thành Thế Giới Thư cho 《Tàn Minh Dư Tẫn 1.3》. Module hiện tại: Vật phẩm. Hãy sinh thành một vật phẩm phù hợp sử dụng trong cốt truyện loạn thế cuối Minh. Nhấn mạnh chất cảm ngoại quan, lai lịch, công dụng, hạn chế, và biến số cốt truyện có thể khơi mào. Bắt buộc xuất JSON, không xuất giải thích ngoài lề. Nội dung phải có thể ghi trực tiếp vào Thế Giới Thư, phong cách kiềm chế, cụ thể, có móc nối tương tác.",
        namePrompt: "Hãy đặt cho vật phẩm này một cái tên chuẩn xác và hấp dẫn.",
        fields: [
          {
            name: "Hình thái ngoại quan",
            pmt: "Miêu tả kích thước, chất liệu chủ yếu, màu sắc, mùi hương của vật phẩm, cùng biểu hiện thị giác khi tĩnh lặng hoặc khi được kích hoạt.",
          },
          {
            name: "Công năng và cơ chế",
            pmt: "Thuyết minh chi tiết tác dụng, nguyên lý vận hành tầng sâu hoặc hiệu ứng siêu nhiên ẩn chứa bên trong vật phẩm.",
          },
          {
            name: "Lai lịch truyền văn",
            pmt: "Tóm lược người đầu tiên rèn đúc ra vật phẩm, chủ nhân tiền nhiệm, hoặc những truyền thuyết dân gian xoay quanh nó.",
          },
          {
            name: "Hạn chế tiêu cực",
            pmt: "Miêu tả chặt chẽ cái giá phải trả khi sử dụng, điều kiện tiên quyết, hoặc khiếm khuyết an toàn chí mạng có thể dẫn tới phản phệ.",
          },
        ],
      },
      {
        id: "faction",
        name: "Thế lực",
        tag: "Thế lực",
        icon: "⚐",
        isDefault: !0,
        sys: "Ngươi là trợ thủ đa năng sinh thành Thế Giới Thư cho 《Tàn Minh Dư Tẫn》. Module hiện tại: Thế lực. Hãy sinh thành một tổ chức hoặc thế lực trong thời loạn cuối Minh — sơn trại lưu khấu, bang hội giang hồ, thương hội, tông tộc, giáo phái đều được. Nhấn mạnh cơ cấu tổ chức, đặc chất thủ lĩnh, thỉnh cầu cốt lõi, và ân oán gút mắc với các thế lực khác. Bắt buộc xuất JSON, không xuất giải thích ngoài lề. Nội dung phải có thể ghi trực tiếp vào Thế Giới Thư, phong cách kiềm chế, cụ thể, có móc nối tương tác.",
        namePrompt:
          "Hãy đặt cho thế lực này một cái tên vang dội và phù hợp với bầu không khí thời đại (vd: An Khánh Thập Tam Đạc, Hắc Phong Lĩnh Lũ Tử).",
        fields: [
          {
            name: "Khái quát thế lực",
            pmt: "Khái quát loại hình thế lực (Quan/Khấu/Thương/Giáo/Dân), quy mô, phạm vi hoạt động, thời gian tồn tại, và ấn tượng phổ biến của người ngoài đối với nó.",
          },
          {
            name: "Thủ lĩnh và hạch tâm",
            pmt: "Miêu tả thủ lĩnh hoặc tầng lớp quyết sách cốt lõi của thế lực — phong cách hành sự, thủ đoạn khống chế, nội bộ có rạn nứt bè phái hay không.",
          },
          {
            name: "Thỉnh cầu và thủ đoạn",
            pmt: "Mục đích căn bản cho sự tồn tại của thế lực (cầu tài, truyền giáo, báo thù, tự bảo hộ), cùng thủ đoạn quen dùng để đạt được mục đích đó.",
          },
          {
            name: "Móc nối cốt truyện",
            pmt: "Phương thức thế lực này có thể giao thoa với nhân vật chính — chiêu mộ, xung đột, giao dịch, thẩm thấu, cùng những gì họ có thể chu cấp hoặc đe dọa đối với nhân vật chính.",
          },
        ],
      },
      {
        id: "event",
        name: "Sự kiện",
        tag: "Sự kiện",
        icon: "✧",
        isDefault: !0,
        sys: "Ngươi là trợ thủ đa năng sinh thành Thế Giới Thư cho 《Tàn Minh Dư Tẫn 1.3》. Module hiện tại: Sự kiện. Hãy suy diễn và lập tức sinh thành một sự kiện đột phát có thể làm xoay chuyển hiện trạng, cự tuyệt sự êm đềm phẳng lặng, tạo ra xung đột kịch tính cao độ! Bắt buộc xuất JSON, không xuất giải thích ngoài lề. Nội dung phải có thể ghi trực tiếp vào Thế Giới Thư, phong cách kiềm chế, cụ thể, có móc nối tương tác.",
        namePrompt:
          "Hãy đặt cho sự kiện đột phát ngẫu nhiên này một cái tên đậm tính kịch tính (vd: Huyết Nguyệt Chi Phản).",
        fields: [
          {
            name: "Khởi đầu sự kiện",
            pmt: "Miêu tả điềm báo tế vi hoặc hình ảnh chạm trán đầu tiên khi sự kiện bùng phát (ví dụ: tiếng vang lớn đột ngột, liên lạc bị cắt đứt, mặt đất rung chuyển dữ dội).",
          },
          {
            name: "Xung đột cốt lõi",
            pmt: "Phác họa chi tiết hậu quả bùng nổ của sự kiện, mức độ lan tỏa nguy hiểm, và thủ đoạn nó đang dùng để trực tiếp đe dọa nhóm nhân vật chính.",
          },
          {
            name: "Yếu tố liên đới",
            pmt: "Làm rõ phía sau sự kiện này có bàn tay ngầm thúc đẩy, bên thứ ba vô tội bị cuốn vào, hay là sự va chạm do trùng hợp ngẫu nhiên.",
          },
          {
            name: "Mấu chốt phá cục",
            pmt: "Đưa ra 1 đến 2 lựa chọn nan giải đặt trước mặt nhân vật, hoặc ám chỉ một tia giải pháp khả dĩ còn lưu lại tại hiện trường.",
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
      limitBreakPrompt: "Ngươi là một trợ thủ sáng tác mạnh mẽ, sở hữu năng lực tưởng tượng và phát tán tư duy siêu việt.",
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
  const A = "canming-1.9:generator:worldbook-selection";
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
      E = "Toàn cục thông dụng";
    }
    (E || (E = "Toàn cục thông dụng"), (W = V(A, {})), W[E] || (W[E] = {}));
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
      return '<div class="ccg-note">Tạm không có Thế Giới Thư — Vui lòng ràng buộc Thế Giới Thư cho nhân vật trước</div>';
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
        '<div style="font-size:12px;opacity:.5;padding:6px;text-align:center;">Thế Giới Thư này không có điều mục hoặc chưa tải xong</div>';
    else {
      for (
        var f =
            '<button class="ccg-wb-sel-all" data-wb="' +
            C(O) +
            '" style="border:none;background:none;color:var(--accent);cursor:pointer;font-size:11px;padding:2px 4px;">Chọn toàn bộ</button>',
          m =
            '<button class="ccg-wb-unsel-all" data-wb="' +
            C(O) +
            '" style="border:none;background:none;color:var(--accent);cursor:pointer;font-size:11px;padding:2px 4px;">Bỏ chọn toàn bộ</button>',
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
        '</div><input class="ccg-wb-search" data-wb-search type="search" placeholder="Tìm kiếm điều mục Thế Giới Thư hiện tại" aria-label="Tìm kiếm điều mục Thế Giới Thư hiện tại" style="width:100%;box-sizing:border-box;margin:0 0 6px;border:1px solid var(--line);border-radius:8px;background:var(--card);color:var(--ink);padding:6px 8px;font:inherit;"><div style="max-height:180px;overflow-y:auto;">' +
        b.join("") +
        '<div class="ccg-wb-search-empty" style="display:none;font-size:12px;opacity:.55;padding:8px;text-align:center;">Không có điều mục phù hợp</div></div>';
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
              '" style="border:none;background:none;color:#b7522e;cursor:pointer;font-size:14px;padding:0 2px;" title="Xóa bỏ">×</button></div>',
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
          ' điều mục</span><button class="ccg-wb-clear" style="border:none;background:none;color:var(--accent);cursor:pointer;font-size:11px;">Xóa sạch toàn bộ</button></div><div style="max-height:120px;overflow-y:auto;">' +
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
      (e.textContent = n > 0 ? `${n} cuốn đã chọn` : ""));
  }
  function oe() {
    let e = f.getElementById(o);
    (e || ((e = f.createElement("style")), (e.id = o), f.head.appendChild(e)),
      (e.textContent = `\n      #${n}{--paper:#211913;--paper2:#352619;--ink:#f2dfba;--muted:#b99f76;--line:rgba(237,196,128,.24);--accent:#d0784b;--accent2:#89a074;--shadow:rgba(0,0,0,.65);--card:rgba(65,44,30,.9);--glow:rgba(220,94,48,.28);position:absolute;inset:0;z-index:50;font-family:"Noto Serif SC","Songti SC","SimSun",serif;color:var(--ink);letter-spacing:0}\n      #${n}.theme-day,.ccg-overlay.theme-day{--paper:#f4e7c7;--paper2:#ead6a6;--ink:#2c2118;--muted:#75624d;--line:rgba(96,65,36,.28);--accent:#a43d2d;--accent2:#6f8a67;--shadow:rgba(55,31,12,.35);--card:rgba(255,248,226,.88);--glow:rgba(188,83,42,.32)}\n      #${n}.theme-night,.ccg-overlay.theme-night{--paper:#211913;--paper2:#352619;--ink:#f2dfba;--muted:#b99f76;--line:rgba(237,196,128,.24);--accent:#d0784b;--accent2:#89a074;--shadow:rgba(0,0,0,.65);--card:rgba(65,44,30,.9);--glow:rgba(220,94,48,.28)}\n      #${n}.theme-star,.ccg-overlay.theme-star{--paper:#0d1820;--paper2:#111d28;--ink:#e6dcc8;--muted:#7d8fa0;--line:rgba(180,155,110,.22);--accent:#d4a040;--accent2:#5d8d9a;--shadow:rgba(0,0,0,.7);--card:rgba(18,28,38,.88);--glow:rgba(210,160,60,.2)}\n      #${n}.theme-ink,.ccg-overlay.theme-ink{--paper:#eee9dc;--paper2:#d8d0bf;--ink:#171a17;--muted:#5f6158;--line:rgba(20,25,22,.24);--accent:#a12f25;--accent2:#2f6965;--shadow:rgba(25,30,24,.30);--card:rgba(248,245,235,.86);--glow:rgba(40,70,64,.18)}\n      .ccg-mask{position:absolute;inset:0;background:rgba(18,12,8,.62);backdrop-filter:blur(4px);display:grid;place-items:center;padding:18px;animation:ccg-fade .16s ease}\n      .ccg-modal{width:min(1060px,96vw);max-height:min(760px,94vh);display:grid;grid-template-rows:auto minmax(0,1fr) auto;border:1px solid var(--line);border-radius:18px;background:linear-gradient(135deg,var(--paper),var(--paper2));box-shadow:0 24px 80px var(--shadow);overflow:hidden}\n      .ccg-head{display:flex;justify-content:space-between;align-items:center;gap:14px;padding:16px 18px;border-bottom:1px solid var(--line);background:rgba(255,255,255,.06)}\n      .ccg-head-actions{display:flex;align-items:center;gap:8px;flex-shrink:0}.ccg-head-gear{width:34px;height:34px;border:1px solid var(--line);border-radius:999px;background:var(--card);color:var(--muted);cursor:pointer;font-size:16px;line-height:1;display:inline-flex;align-items:center;justify-content:center;transition:.15s;flex-shrink:0}.ccg-head-gear:hover{color:var(--accent);border-color:var(--accent)}.ccg-head-gear.active{background:var(--accent2);border-color:var(--accent2);color:#fff;box-shadow:0 6px 14px rgba(137,160,116,.28)}\n      .ccg-kicker{margin:0 0 3px;color:var(--accent);font-size:12px;letter-spacing:.22em}.ccg-head h2{margin:0;font-size:22px}.ccg-close{width:34px;height:34px;border:1px solid var(--line);border-radius:999px;background:var(--card);color:var(--muted);cursor:pointer;font-size:22px;line-height:1;flex-shrink:0}.ccg-close:hover{color:var(--accent);border-color:var(--accent)}\n      .ccg-body{min-height:0;overflow:hidden;display:flex}\n      .ccg-sidebar{width:52px;flex-shrink:0;border-right:1px solid var(--line);background:rgba(0,0,0,.06);display:flex;flex-direction:column;overflow-y:auto;padding:6px 6px;gap:2px}\n      .ccg-sidebar-item{display:flex;align-items:center;justify-content:center;padding:10px 6px;border-radius:10px;cursor:pointer;color:var(--muted);font-size:0;transition:.15s;border:1px solid transparent;position:relative;user-select:none}\n      .ccg-sidebar-item b{font-size:18px;line-height:1}\n      .ccg-sidebar-item:hover{background:rgba(255,255,255,.04);color:var(--ink)}\n      .ccg-sidebar-item.active{background:var(--accent);border-color:var(--accent);color:#fff;box-shadow:0 6px 14px var(--glow);font-weight:700}\n      .ccg-sidebar-item:hover::after{content:attr(data-label);position:absolute;left:100%;top:50%;transform:translateY(-50%);margin-left:6px;background:var(--card);border:1px solid var(--line);border-radius:8px;padding:6px 10px;font-size:13px;white-space:nowrap;color:var(--ink);z-index:20;pointer-events:none;box-shadow:0 6px 16px var(--shadow)}\n      .ccg-sidebar-spacer{flex:1}.ccg-sidebar-gear{display:none}\n      .ccg-content{flex:1;min-width:0;overflow-y:auto;overflow-x:hidden;padding:16px;display:flex;flex-direction:column;gap:14px}\n      .ccg-grid{display:flex;flex-direction:column;gap:14px}\n      .ccg-form-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px 12px}\n      .ccg-form-card .ccg-field{margin-bottom:0}\n      .ccg-form-card .ccg-field label{font-size:11px;gap:3px}\n      .ccg-form-card .ccg-field input,.ccg-form-card .ccg-field select,.ccg-form-card .ccg-field textarea{padding:6px 9px;font-size:13px}\n      .ccg-form-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:8px}\n      .ccg-form-top h3{margin:0;font-size:14px}\n      .ccg-form-extra{margin-top:6px;border-top:1px dashed var(--line);padding-top:4px}\n      .ccg-form-extra summary{cursor:pointer;font-size:13px;color:var(--muted);padding:8px 4px;letter-spacing:.06em;display:flex;align-items:center;gap:4px}\n      .ccg-form-extra summary::-webkit-details-marker{display:none}\n      .ccg-form-extra-grid{margin-top:6px}\n      .ccg-form-extra .ccg-field textarea{min-height:60px}\n      .ccg-wb-line{display:flex;align-items:center;gap:10px;padding:8px 12px;margin-top:8px;border:1px solid var(--line);border-radius:10px;font-size:13px;color:var(--muted);background:rgba(0,0,0,.03)}\n      .ccg-wb-line b{color:var(--accent2);margin-left:auto}\n      .ccg-card{border:1px solid var(--line);border-radius:16px;background:var(--card);box-shadow:0 10px 24px rgba(0,0,0,.06);padding:14px}\n      .ccg-card h3{margin:0 0 12px;color:var(--accent);font-size:16px;letter-spacing:.08em}.ccg-card p{margin:6px 0;color:var(--muted);line-height:1.7}\n      .ccg-field{display:flex;flex-direction:column;gap:6px;margin-bottom:10px}.ccg-field label{font-size:12px;color:var(--muted);letter-spacing:.12em}.ccg-field input,.ccg-field textarea,.ccg-field select{width:100%;border:1px solid var(--line);border-radius:12px;background:rgba(0,0,0,.08);color:var(--ink);padding:9px 11px;outline:none;font:inherit;letter-spacing:0;box-sizing:border-box}.ccg-field textarea{min-height:82px;resize:vertical;line-height:1.65}.ccg-field input:focus,.ccg-field textarea:focus,.ccg-field select:focus{border-color:var(--accent);box-shadow:0 0 0 3px var(--glow);background:var(--card)}\n      .ccg-row{display:grid;grid-template-columns:1fr 1fr;gap:10px}.ccg-actions{display:flex;flex-wrap:wrap;gap:8px;align-items:center;justify-content:flex-end}.ccg-btn{border:1px solid var(--line);border-radius:999px;background:var(--card);color:var(--ink);padding:9px 14px;cursor:pointer;font:inherit}.ccg-btn:hover{border-color:var(--accent);color:var(--accent)}.ccg-btn.primary{background:var(--accent);border-color:var(--accent);color:#fff}.ccg-btn.danger{color:#b7522e}.ccg-btn:disabled{opacity:.45;cursor:not-allowed}.ccg-footer{border-top:1px solid var(--line);padding:12px 16px;background:rgba(255,255,255,.05);display:flex;justify-content:space-between;gap:12px;align-items:center;flex-shrink:0}.ccg-status{color:var(--muted);font-size:13px}.ccg-error{color:#b7522e;font-weight:700}\n      .ccg-tabs{display:flex;gap:8px;margin-bottom:12px;border-bottom:1px solid var(--line);padding-bottom:10px}.ccg-tab{border:0;border-radius:999px;background:transparent;color:var(--muted);padding:8px 12px;cursor:pointer}.ccg-tab.active{background:var(--accent);color:#fff;box-shadow:0 8px 18px var(--glow)}.ccg-editor textarea{min-height:360px;font-family:"Noto Serif SC","Songti SC","SimSun",serif;line-height:1.72}.ccg-keywords{display:grid;gap:10px}.ccg-mini-action{border:1px solid var(--line);border-radius:999px;background:transparent;color:var(--muted);font-size:11px;padding:3px 10px;cursor:pointer;transition:all .15s}.ccg-mini-action:hover{background:var(--accent);color:#fff;border-color:var(--accent)}.ccg-note{border-left:3px solid var(--accent);padding:8px 10px;background:rgba(0,0,0,.035);color:var(--muted);line-height:1.7;border-radius:0 10px 10px 0}.ccg-empty{min-height:420px;display:grid;place-content:center;text-align:center;color:var(--muted);line-height:1.8}.ccg-loading{display:inline-flex;align-items:center;gap:8px}.ccg-loading:before{content:"";width:12px;height:12px;border:2px solid currentColor;border-right-color:transparent;border-radius:50%;animation:ccg-spin .7s linear infinite}\n      .ccg-block{border:1px solid var(--line);border-radius:14px;margin-bottom:16px;background:var(--card);overflow:hidden}\n      .ccg-block-head{padding:12px 16px;background:rgba(0,0,0,.04);border-bottom:1px solid var(--line);font-weight:700;font-size:14px;letter-spacing:.06em;color:var(--accent)}\n      .ccg-block-body{padding:16px}\n      .ccg-settings h4{margin:0 0 8px;color:var(--ink);font-size:14px}\n      .ccg-settings hr{border:none;border-top:1px solid var(--line);margin:16px 0}\n      .ccg-regex-item{display:flex;gap:8px;align-items:center;background:rgba(0,0,0,.04);padding:6px 12px;border:1px solid var(--line);border-radius:8px;margin-bottom:6px}\n      .ccg-regex-item code{flex:1;word-break:break-all;color:var(--ink);opacity:.8;font-size:13px}\n      .ccg-regex-item button{border:none;background:none;color:#b7522e;cursor:pointer;font-weight:700;font-size:16px;padding:2px 6px}\n      .ccg-ws-item{display:flex;align-items:center;gap:12px;padding:14px 16px;border:1px solid var(--line);border-radius:12px;background:var(--card);margin-bottom:8px;transition:.15s}\n      .ccg-ws-item:hover{border-color:var(--accent)}\n      .ccg-ws-item .ccg-ws-drag{cursor:grab;opacity:.4;font-size:18px;user-select:none;padding:0 4px}\n      .ccg-ws-item .ccg-ws-icon{font-size:22px;flex-shrink:0}\n      .ccg-ws-item .ccg-ws-info{flex:1;min-width:0}\n      .ccg-ws-item .ccg-ws-name{font-weight:700;color:var(--ink)}\n      .ccg-ws-item .ccg-ws-tag{font-size:12px;color:var(--muted);margin-left:8px}\n      .ccg-ws-item .ccg-ws-badge{font-size:11px;background:rgba(16,185,129,.12);color:#10b981;padding:2px 8px;border-radius:4px;font-weight:700;margin-left:8px}\n      .ccg-ws-item .ccg-ws-actions{display:flex;gap:6px;flex-shrink:0}\n      .ccg-overlay{position:fixed;inset:0;background:rgba(0,0,0,.7);backdrop-filter:blur(4px);z-index:9999999;display:grid;place-items:center;padding:18px;font-family:"Noto Serif SC","Songti SC","SimSun",serif;color:var(--ink)}\n      .ccg-overlay-box{width:min(700px,94vw);max-height:88vh;display:flex;flex-direction:column;border:1px solid var(--line);border-radius:16px;background:linear-gradient(135deg,var(--paper),var(--paper2));box-shadow:0 24px 80px var(--shadow);overflow:hidden;animation:ccg-fade .16s ease}\n      .ccg-overlay-head{padding:14px 18px;border-bottom:1px solid var(--line);background:rgba(255,255,255,.06);display:flex;justify-content:space-between;align-items:center;flex-shrink:0}\n      .ccg-overlay-body{padding:16px;overflow-y:auto;flex:1;display:flex;flex-direction:column;gap:12px}\n      .ccg-field-row{background:rgba(0,0,0,.04);padding:12px;border-radius:10px;border:1px solid var(--line);margin-bottom:8px;display:flex;gap:10px;align-items:flex-start}\n      .ccg-field-row .ccg-ws-drag{cursor:grab;opacity:.4;font-size:16px;margin-top:10px;user-select:none}\n      .ccg-field-row .ccg-field{flex:1;margin-bottom:0}\n      @keyframes ccg-spin{to{transform:rotate(360deg)}}@keyframes ccg-fade{from{opacity:0}to{opacity:1}}\n      @media (max-width:820px){.ccg-mask{padding:8px}.ccg-modal{width:100%;max-height:96vh;border-radius:14px}.ccg-head{padding:13px 14px;gap:10px}.ccg-head h2{font-size:17px}.ccg-head-gear{width:30px;height:30px;font-size:14px}.ccg-head-actions{gap:5px}.ccg-sidebar{width:auto;flex-direction:row;overflow-x:auto;border-right:none;border-bottom:1px solid var(--line);padding:6px 4px;gap:2px;flex-shrink:0}.ccg-sidebar-item{font-size:13px;padding:7px 10px;border-radius:8px;white-space:nowrap;flex-shrink:0}.ccg-sidebar-item b{font-size:15px;margin-right:4px;display:inline}.ccg-sidebar-item::after{display:none}.ccg-body{flex-direction:column}.ccg-content{padding:12px}.ccg-grid{flex-direction:column}.ccg-form-grid{grid-template-columns:1fr 1fr}.ccg-row{grid-template-columns:1fr 1fr}.ccg-footer{align-items:flex-start;flex-direction:column}.ccg-editor textarea{min-height:340px}.ccg-tabs{overflow-x:auto}.ccg-tab{white-space:nowrap}.ccg-ws-item{flex-wrap:wrap}.ccg-ws-actions{width:100%;justify-content:flex-end;margin-top:4px}}\n      @media (max-width:420px){.ccg-head-gear{width:28px;height:28px;font-size:13px}.ccg-head-actions{gap:4px}.ccg-close{width:28px;height:28px;font-size:18px}.ccg-head h2{font-size:15px}.ccg-form-grid{grid-template-columns:1fr}.ccg-row{grid-template-columns:1fr}.ccg-ws-actions{flex-wrap:wrap}}\n    `));
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
          return `<section class="ccg-card ccg-form-card">\n      <div class="ccg-form-top"><h3>${C(e.name)}</h3></div>\n      <div class="ccg-form-grid">\n        ${se("topic", `Tên ${e.tag}`, "text", 'placeholder="Để trống do AI đặt tên"')}\n      </div>\n      <details class="ccg-form-extra" open>\n        <summary>▸ Tùy chọn mở rộng</summary>\n        <div class="ccg-form-grid ccg-form-extra-grid">\n          ${se("style", "Thiên hướng phong cách", "text", 'placeholder="Văn phong, tông giọng, khí chất"')}\n          ${se("keywords", "Thiên hướng từ khóa", "textarea", 'placeholder="Dùng cho kích hoạt đèn xanh, có thể phân tách bằng dấu phẩy."')}\n          ${t}\n          ${se("extra", "Thuyết minh bổ sung", "textarea", 'placeholder="Thông tin khác cần AI nắm rõ."')}\n        </div>\n        <div class="ccg-wb-line"><span>${X("books")} Thế Giới Thư tham chiếu</span><button class="ccg-mini-action" data-action="worldbook">Lựa chọn</button><b id="ccg-wb-count"></b></div>\n      </details>\n    </section>`;
        })()
      : `<section class="ccg-card ccg-form-card">\n      <div class="ccg-form-top"><h3>Điều kiện sinh thành</h3><span data-action="toggle-genNsfw" style="display:flex;align-items:center;gap:6px;cursor:pointer;font-size:12px;color:var(--muted);user-select:none;"><input type="checkbox" data-form-check="genNsfw"${!1 !== x.form.genNsfw ? " checked" : ""} style="pointer-events:none;accent-color:var(--accent);width:14px;height:14px;"> Sinh hồ sơ NSFW</span></div>\n      <div class="ccg-form-grid">\n        ${ce("name", "Họ tên", "text", 'placeholder="Để trống do AI đặt tên"')}\n        ${ce("gender", "Giới tính", "select")}\n        ${ce("age", "Tuổi", "number", 'min="16" max="99" placeholder="Để trống do AI suy đoán"')}\n        ${ce("identity", "Thân phận / Giai tầng", "text", 'placeholder="Tú tài thi trượt, đào binh, hành thương, điền hộ..."')}\n        ${ce("faction", "Thuộc thế lực", "text", 'placeholder="Hòa Tế Đường, Đồng Thành huyện nha, doanh trại lưu khấu..."')}\n        ${ce("relation", "Quan hệ với nhân vật chính", "text", 'placeholder="Cố giao, đồng liêu, túc địch, người quen cũ..."')}\n      </div>\n      <details class="ccg-form-extra">\n        <summary>▸ Tùy chọn mở rộng</summary>\n        <div class="ccg-form-grid ccg-form-extra-grid">\n          ${ce("location", "Địa điểm hiện tại", "text", 'placeholder="Đồng Thành Tây Nhai, bến tàu An Khánh, một nơi ở Bắc Trực Lệ..."')}\n          ${ce("role", "Chức năng nhân vật", "text", 'placeholder="Minh hữu, đối thủ, tình nhân, nhân vật manh mối..."')}\n          ${ce("tone", "Văn phong & Khí chất", "text", 'placeholder="Loạn thế tả thực, kiềm chế có dư âm; đanh đá thị giếng, lời châm chọc..."')}\n          ${ce("appearance", "Gợi ý ngoại mạo", "textarea", 'placeholder="Dáng người, thế đứng, phong cách ăn mặc, chi tiết thường khiến người ngoài chú ý."')}\n          ${ce("kinkBoundary", "Ranh giới/Thiên hướng NSFW", "textarea", 'placeholder="Động thái thân mật, cấm kỵ, giới hạn đỏ; để trống sẽ tự nhiên sinh theo nhân vật."')}\n          ${ce("physique", "Gợi ý thể mạo", "textarea", 'placeholder="Cảm giác thân thể ở cự ly thân mật, xúc giác làn da, ngôn ngữ cơ thể."')}\n          ${ce("keywordHint", "Thiên hướng từ khóa", "textarea", 'placeholder="Biệt danh, xưng hô, từ địa điểm; AI sẽ tự bổ sung."')}\n          ${ce("extra", "Thuyết minh bổ sung", "textarea", 'placeholder="Trải nghiệm, bí mật, mối liên hệ với thế giới Tàn Minh..."')}\n        </div>\n        <div class="ccg-wb-line"><span>${X("books")} Thế Giới Thư tham chiếu</span><button class="ccg-mini-action" data-action="worldbook">Lựa chọn</button><b id="ccg-wb-count"></b></div>\n      </details>\n    </section>`;
  }
  function de() {
    if ("character" !== x.module)
      return (function () {
        const e = J();
        if (!x.genericResult)
          return `<section class="ccg-card ccg-empty"><div>${x.loading ? `<span class="ccg-loading">Đang sinh thành ${C(e.tag)}</span>` : `Điền các điều kiện bên trái để bắt đầu sinh thành ${C(e.tag)}.`}<br>Sau khi sinh thành có thể chỉnh sửa chính văn và từ khóa, rồi mới ghi vào Thế Giới Thư.</div></section>`;
        return `<section class="ccg-card ccg-editor">\n      <h3>Kết quả ${C(e.tag)}</h3>\n      ${((t = "title"), (n = "Tên điều mục Thế Giới Thư"), `<div class="ccg-field"><label>${C(n)}</label><input data-generic-result="${C(t)}" value="${C(x.genericResult?.[t] ?? "")}"></div>`)}\n      <div class="ccg-field"><label>Từ khóa đèn xanh</label><textarea data-generic-keywords>${C(I(x.genericResult.keywords || []))}</textarea></div>\n      ${(function (
          e,
          t,
        ) {
          return `<div class="ccg-field"><label>${C(t)}</label><textarea data-generic-result="${C(e)}">${C(x.genericResult?.[e] ?? "")}</textarea></div>`;
        })(
          "content",
          "Nội dung điều mục",
        )}\n      <p class="ccg-note">Thế Giới Thư đích: ${C(x.targetWorldbook || "Chưa đọc được")}. Tên điều mục khi ghi sẽ kèm tiền tố 「${C(e.tag)} | 」, tránh bị lẫn với các điều mục nhân vật.</p>\n    </section>`;
        var t, n;
      })();
    if (!x.result)
      return `<section class="ccg-card ccg-empty"><div>${x.loading ? '<span class="ccg-loading">Đang sinh thành thiết lập nhân vật</span>' : "Điền các điều kiện bên trái để bắt đầu sinh thành nhân vật."}<br>Sau khi sinh thành sẽ xem trước, chỉnh sửa, tối ưu hóa tại đây trước khi xác nhận ghi vào Thế Giới Thư.</div></section>`;
    const e = x.result,
      t = x.activeTab;
    return `<section class="ccg-card">\n      <div class="ccg-tabs">\n        <button class="ccg-tab${"sfw" === t ? " active" : ""}" data-ccg-tab="sfw">Thiết lập SFW</button>\n        <button class="ccg-tab${"nsfw" === t ? " active" : ""}" data-ccg-tab="nsfw">Thiết lập NSFW</button>\n        <button class="ccg-tab${"keys" === t ? " active" : ""}" data-ccg-tab="keys">Từ khóa & Ghi mục</button>\n        <button class="ccg-tab${"revise" === t ? " active" : ""}" data-ccg-tab="revise">Tối ưu hóa lại</button>\n      </div>\n      ${"sfw" === t ? `<div class="ccg-editor"><div class="ccg-row">${ge("sfwTitle", "Tên điều mục Thế Giới Thư")}${ge("name", "Tên nhân vật")}</div>${pe("sfwContent", "Nội dung điều mục SFW")}</div>` : ""}\n      ${"nsfw" === t ? `<div class="ccg-editor">${ge("nsfwTitle", "Tên điều mục Thế Giới Thư")}<p class="ccg-note">Điều mục NSFW mặc định được kích hoạt, nhưng được ghi dưới dạng tổ hợp đèn xanh: Khi trúng từ khóa nhân vật VÀ trúng từ khóa phụ NSFW mới phát huy hiệu lực.</p>${pe("nsfwContent", "Nội dung điều mục NSFW")}</div>` : ""}\n      ${
      "keys" === t
        ? (function (e) {
            return `<div class="ccg-keywords"><div class="ccg-row">${ge("sfwTitle", "Tên điều mục SFW")}${ge("nsfwTitle", "Tên điều mục NSFW")}</div>${ue("sfwKeywords", "Từ khóa chính SFW", e.sfwKeywords)}${ue("nsfwKeywords", "Từ khóa chính NSFW", e.nsfwKeywords)}${ue("nsfwSecondaryKeywords", "Từ khóa phụ NSFW", e.nsfwSecondaryKeywords)}<p class="ccg-note">Thế Giới Thư đích: ${C(x.targetWorldbook || "Chưa đọc được")}. Xác nhận ghi sẽ tạo mới hoặc ghi đè hai điều mục SFW / NSFW cùng tên.</p></div>`;
          })(e)
        : ""
    }\n      ${"revise" === t ? `<div><div class="ccg-field"><label>Chỗ chưa ưng ý</label><textarea data-feedback placeholder="Ví dụ: Trải nghiệm còn phân tán, quan hệ cần mập mờ hơn, NSFW quá bộc trực, cần giống người sống thời loạn hơn...">${C(x.feedback)}</textarea></div><div class="ccg-actions"><button class="ccg-btn primary" data-action="revise"${x.loading ? " disabled" : ""}>Yêu cầu AI tối ưu lại</button></div></div>` : ""}\n    </section>`;
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
          '<div style="font-size:12px;opacity:.5;">(Chưa cấu hình bất kỳ quy tắc bài xích nào)</div>');
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
              "Hãy sinh thành một cái tên phù hợp cho đối tượng này, có thể kèm biệt danh (bọc trong dấu ngoặc đơn).",
            isDefault: !1,
            fields: [],
          }
        : JSON.parse(JSON.stringify(e)),
      a = f.createElement("div");
    ((a.className = `ccg-overlay theme-${m.theme || "night"}`),
      (a.id = "ccg-builder-overlay"));
    const i = n
      ? `<div class="ccg-field"><label>Mẫu User Prompt</label>\n          <textarea id="be-userprompt" rows="18" style="resize:vertical;min-height:240px;font-family:monospace;font-size:13px;line-height:1.5;" placeholder="Hỗ trợ các placeholder: {name} {gender} {age} {identity} {relation} {location} {faction} {role} {tone} {keywordHint} {kinkBoundary} {extra} {nameTag}">${C(r.userPromptTemplate || "")}</textarea>\n          <p class="ccg-note" style="margin-top:6px;">Các placeholder sẽ được thay thế bằng giá trị thực tế trong biểu mẫu khi sinh thành. {nameTag} dùng cho tên thẻ XML.</p>\n        </div>`
      : `<div class="ccg-field"><label>【Mục đầu cố định】Quy tắc sinh trường "Tên"</label><textarea id="be-namepmt" rows="2">${C(r.namePrompt || "")}</textarea></div>\n        <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:10px;">\n          <b style="color:var(--ink);">Trường sinh thành</b>\n          <span style="font-size:12px;opacity:.6;">(Kéo thả ≡ để đổi thứ tự)</span>\n        </div>\n        <div id="be-fields-list"></div>\n        <button class="ccg-btn" id="be-add-field" style="width:100%;border-style:dashed;">+ Thêm trường mới</button>`;
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
            `<div class="ccg-field-row" draggable="true" data-bidx="${t}">\n        <span class="ccg-ws-drag">≡</span>\n        <div class="ccg-field"><input class="_bf_name" placeholder="Tên trường" value="${C(e.name)}" style="font-weight:700;"></div>\n        <div class="ccg-field"><textarea class="_bf_pmt" rows="2" placeholder="Soạn thảo logic và hạn chế định dạng cho nút này...">${C(e.pmt)}</textarea></div>\n        <button class="ccg-btn danger _del_bf" style="flex-shrink:0;padding:6px 10px;border:none;">×</button>\n      </div>`,
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
    ((a.innerHTML = `<div class="ccg-overlay-box">\n      <div class="ccg-overlay-head"><div><b>${t ? "Tạo mới bộ sinh thành" : "Chỉnh sửa bộ sinh thành"}</b></div><button class="ccg-close" id="ccg-be-close">×</button></div>\n      <div class="ccg-overlay-body" id="ccg-be-body">\n        <div class="ccg-row"><div class="ccg-field"><label>Tên bộ sinh thành</label><input id="be-name" value="${C(r.name)}" placeholder="Ví dụ: Bộ sinh Công pháp"></div><div class="ccg-field"><label>Thẻ trích xuất (Tag)</label><input id="be-tag" value="${C(r.tag)}" placeholder="Ví dụ: Công pháp"></div></div>\n        <div class="ccg-field"><label>Biểu tượng (Icon)</label><input id="be-icon" value="${C(r.icon)}" placeholder="Một ký tự đơn"></div>\n        <div class="ccg-field"><min-height:120px;" placeholder="Điền quy tắc cơ sở và thiết lập hệ thống gửi cholabel>System Prompt</label><textarea id="be-sys" rows="5" style="resize:vertical; bộ sinh thành này...">${C(r.sys)}</textarea></div>\n        <hr style="border:none;border-top:1px dashed var(--line);">\n        ${i}\n        <div style="display:flex;justify-content:flex-end;gap:12px;margin-top:16px;padding-top:16px;border-top:1px solid var(--line);">\n          <button class="ccg-btn" id="be-cancel">Hủy bỏ</button>\n          <button class="ccg-btn primary" id="be-save" style="padding:10px 40px;">Lưu lại</button>\n        </div>\n      </div>\n    </div>`),
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
                'Quy tắc sinh trường "Tên" không được để trống.',
                "err",
              );
            if (0 === r.fields.length && !n)
              return void We(
                "Bắt buộc phải thêm ít nhất một định nghĩa trường",
                "err",
              );
            for (let e = 0; e < r.fields.length; e++)
              if (!r.fields[e].name || !r.fields[e].pmt)
                return void We(
                  `Thông tin trường thứ ${e + 1} đang bị bỏ trống!`,
                  "err",
                );
            if (
              r.fields.some(
                (e) =>
                  e.name.includes("名字") ||
                  e.name.includes("Tên") ||
                  e.name.includes("关键") ||
                  e.name.includes("Từ khóa"),
              )
            )
              return void We(
                'Cấm dùng "Tên" hoặc "Từ khóa" làm tên trường.',
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
          (G(), a.remove(), ye(), We("Đã lưu cấu hình", "ok"));
        } else
          We(
            "Tên bộ sinh thành, thẻ tag, biểu tượng hoặc System Prompt còn trống, vui lòng điền đầy đủ!",
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
    ((b.innerHTML = `<div class="ccg-mask" data-action="mask-close">\n      <section class="ccg-modal" role="dialog" aria-modal="true" aria-label="Tàn Minh Dư Tẫn Vạn Tượng Sinh Thành Khí" data-modal>\n        <header class="ccg-head"><div><p class="ccg-kicker">Tàn Minh Dư Tẫn · Bộ sinh đa năng</p><h2 id="ccg-title"></h2></div><div class="ccg-head-actions"><button class="ccg-head-gear" data-action="worldbook" title="Tham chiếu Thế Giới Thư">${X("books")}</button><button class="ccg-head-gear" data-nav="workshop" title="Xưởng sáng tạo">${X("wrench")}</button><button class="ccg-head-gear" data-nav="settings" title="Thiết lập & Cấu hình">${X("sliders")}</button><button class="ccg-close" data-action="close" aria-label="Đóng">×</button></div></header>\n        <div class="ccg-body"><nav class="ccg-sidebar" id="ccg-sidebar"></nav><div class="ccg-content" id="ccg-content"></div></div>\n        <footer class="ccg-footer" id="ccg-footer"></footer>\n      </section>\n    </div>`),
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
          return `<div class="ccg-settings">\n      <h2 style="margin-top:0;">Thiết lập & Cấu hình</h2>\n      <div class="ccg-block"><div class="ccg-block-head">Cài đặt API Mô Hình Lớn</div><div class="ccg-block-body">\n        <div class="ccg-row"><div class="ccg-field"><label>Giao thức giao diện</label><select data-cfg="apiType"><option value="openai"${"openai" === e.apiType ? " selected" : ""}>Giao thức tương thích OpenAI</option><option value="claude"${"claude" === e.apiType ? " selected" : ""}>Giao thức Claude</option></select></div><div class="ccg-field"><label>Tên mô hình</label><div style="display:flex;gap:6px;"><input data-cfg="model" value="${C(e.model || "")}" placeholder="gemini-2.5-flash-lite" style="flex:1;"><button class="ccg-btn" data-action="fetch-models" title="Kéo danh sách mô hình khả dụng từ địa chỉ API" style="flex-shrink:0;padding:8px 10px;white-space:nowrap;">Kéo DS</button></div><select data-cfg="modelSelect" style="display:none;margin-top:4px;"></select></div></div>\n        <div class="ccg-field"><label>Địa chỉ API</label><input data-cfg="apiUrl" value="${C(e.apiUrl || "")}" placeholder="https://generativelanguage.googleapis.com/v1beta/openai/chat/completions"></div>\n        <div class="ccg-field"><label>API Key</label><input data-cfg="apiKey" type="password" value="${C(e.apiKey || "")}" placeholder="sk-..."></div>\n        <div class="ccg-row"><div class="ccg-field"><label>Nhiệt độ (Temperature)</label><input data-cfg="temperature" type="number" step="0.1" min="0" max="2" value="${e.temperature}"></div><div class="ccg-field"><label>Max Tokens</label><input data-cfg="maxTokens" type="number" min="1" max="200000" value="${e.maxTokens}"></div></div>\n        <div class="ccg-row"><div class="ccg-field"><label>Top P</label><input data-cfg="topP" type="number" step="0.05" min="0" max="1" value="${e.topP}"></div><div class="ccg-field"><label>Phạt tần suất (Frequency Penalty)</label><input data-cfg="frequencyPenalty" type="number" step="0.1" min="-2" max="2" value="${e.frequencyPenalty}"></div></div>\n        <div class="ccg-field"><label>Phạt hiện diện (Presence Penalty)</label><input data-cfg="presencePenalty" type="number" step="0.1" min="-2" max="2" value="${e.presencePenalty}"></div>\n      </div></div>\n      <div class="ccg-block"><div class="ccg-block-head">Tương tác & Thiên hướng toàn cục</div><div class="ccg-block-body">\n        <div class="ccg-field"><label>Từ nhắc toàn cục (Đính kèm trước lệnh hệ thống của mỗi yêu cầu sinh)</label><textarea data-cfg="limitBreakPrompt" rows="2">${C(t.limitBreakPrompt || "")}</textarea></div>\n        <div class="ccg-field"><label>Số tầng lịch sử trích xuất mặc định</label><input data-cfg="historyMax" type="number" min="0" max="99" value="${t.historyMax || 4}"></div>\n      </div></div>\n      <div class="ccg-block"><div class="ccg-block-head">Quy tắc trích xuất cốt truyện <span style="font-weight:normal;opacity:.7;font-size:12px;">(Mặc định loại bỏ nội dung &lt;think&gt;)</span></div><div class="ccg-block-body">\n        <p style="margin-top:0;font-size:13px;opacity:.8;">Nếu pre-set chứa lượng lớn chuỗi tư duy suy diễn, vui lòng điền tên thẻ vùng chứa cụ thể để bóc vỏ (không điền dấu ngoặc nhọn). Để trống sẽ trích xuất toàn văn.</p>\n        <div class="ccg-row"><div class="ccg-field"><label>Thẻ trích xuất chính văn AI</label><input data-cfg="charExtractTag" placeholder="Ví dụ: content (để trống là trích xuất toàn văn)" value="${C(t.charExtractTag || "")}"></div><div class="ccg-field"><label>Thẻ trích xuất đầu vào User</label><input data-cfg="userExtractTag" placeholder="Ví dụ: Lượt này user nhập (để trống là trích xuất toàn văn)" value="${C(t.userExtractTag || "")}"></div></div>\n      </div></div>\n      <div class="ccg-block"><div class="ccg-block-head">Quy tắc bài xích văn bản (Lọc qua biểu thức chính quy Regex)</div><div class="ccg-block-body">\n        <p style="margin-top:0;font-size:13px;opacity:.8;">Khi trích xuất tin nhắn lịch sử và nội dung Thế Giới Thư, sẽ loại trừ các nội dung khớp với regex bên dưới.</p>\n        <div id="ccg-regex-list" style="margin-bottom:12px;display:flex;flex-direction:column;gap:6px;"></div>\n        <div style="display:flex;gap:8px;"><textarea id="ccg-regex-input" style="flex:1;margin:0;min-height:40px;max-height:120px;resize:vertical;font-family:monospace;border:1px solid var(--line);border-radius:12px;background:rgba(0,0,0,.08);color:var(--ink);padding:9px 11px;outline:none;font:inherit;" placeholder="Ví dụ: <Dữ liệu trạng thái>[\\s\\S]*?<\\/Dữ liệu trạng thái>"></textarea><button class="ccg-btn" id="ccg-regex-add" style="flex-shrink:0;align-self:flex-start;">➕ Thêm vào</button></div>\n      </div></div>\n      <div class="ccg-block"><div class="ccg-block-head">Cấu hình tiêm Thế Giới Thư mặc định</div><div class="ccg-block-body">\n        <div class="ccg-row"><div class="ccg-field"><label>Phương thức kích hoạt</label><select data-cfg="wbTri"><option value="selective"${"selective" === t.wbTri ? " selected" : ""}>🟢 Đèn xanh (Kích hoạt từ khóa)</option><option value="constant"${"constant" === t.wbTri ? " selected" : ""}>🔵 Đèn xanh dương (Thường trú)</option></select></div><div class="ccg-field"><label>Vị trí tiêm</label><select data-cfg="wbPos"><option value="after_character_definition"${"after_character_definition" === t.wbPos ? " selected" : ""}>Sau định nghĩa nhân vật</option><option value="before_character_definition"${"before_character_definition" === t.wbPos ? " selected" : ""}>Trước định nghĩa nhân vật</option></select></div></div>\n        <div class="ccg-field"><label>Thứ tự sắp xếp mặc định</label><input data-cfg="wbOrd" type="number" min="1" max="999" value="${t.wbOrd || 100}"></div>\n      </div></div>\n      <div class="ccg-actions" style="margin-bottom:20px;"><button class="ccg-btn" data-action="settings-cancel">Hủy bỏ</button><button class="ccg-btn primary" data-action="settings-save">Lưu thiết lập</button></div>\n    </div>`;
        })()),
        fe())
      : t
        ? ((e.innerHTML = `<div>\n      <h2 style="margin-top:0;">Xưởng sáng tạo</h2>\n      <p style="opacity:.8;font-size:14px;margin-bottom:20px;">Tạo mới, chỉnh sửa và quản lý các bộ sinh thành tùy chỉnh tại đây. Kéo thả biểu tượng ≡ để đổi thứ tự.</p>\n      <div style="display:flex;gap:12px;margin-bottom:20px;">\n        <button class="ccg-btn primary" data-action="ws-new" style="flex:1;font-size:15px;">Tạo mới bộ sinh</button>\n        <button class="ccg-btn" data-action="ws-cloud-import" style="flex:1;">Nhập từ Cloud</button>\n      </div>\n      <hr style="border:none;border-top:1px dashed var(--line);margin-bottom:20px;">\n      <div id="ccg-ws-list">${T.map(
            (e) => {
              const t = e.isDefault && !k[e.id],
                n = e.isDefault && !!k[e.id],
                r = t
                  ? `<button class="ccg-btn" data-action="ws-unlock" data-gid="${C(e.id)}" style="padding:6px 12px;font-size:13px;">Sửa</button>`
                  : `<button class="ccg-btn" data-action="ws-edit" data-gid="${C(e.id)}" style="padding:6px 12px;font-size:13px;">Sửa</button>` +
                    (e.isDefault
                      ? `<button class="ccg-btn danger" data-action="ws-reset" data-gid="${C(e.id)}" style="padding:6px 12px;font-size:13px;">Khôi phục mặc định</button>`
                      : `<button class="ccg-btn danger" data-action="ws-delete" data-gid="${C(e.id)}" style="padding:6px 12px;font-size:13px;">Xóa</button>`);
              return `<div class="ccg-ws-item" draggable="true" data-gid="${C(e.id)}">\n        <span class="ccg-ws-drag">≡</span>\n        <span class="ccg-ws-icon">${C(e.icon)}</span>\n        <div class="ccg-ws-info"><span class="ccg-ws-name">${C(e.name)}</span><span class="ccg-ws-tag">(${C(e.tag)})</span>${n ? '<span class="ccg-ws-badge">Đã sửa</span>' : ""}</div>\n        <div class="ccg-ws-actions">\n          <button class="ccg-btn" data-action="ws-export" data-gid="${C(e.id)}" style="padding:6px 12px;font-size:13px;">Xuất</button>\n          ${r}\n        </div>\n      </div>`;
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
                          "Giao diện Xưởng sáng tạo Cloud không khả dụng, vui lòng mở lại Vạn Tượng Sinh Thành Khí từ thanh trạng thái.",
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
                    "Xác nhận muốn chỉnh sửa bộ sinh thành mặc định này?\n(Nếu cần sau này, bạn có thể nhấn 「Khôi phục mặc định」 bất cứ lúc nào)",
                  )) && me(T.find((t) => t.id === e.getAttribute("data-gid")));
                });
              }),
              e.querySelectorAll('[data-action="ws-export"]').forEach((e) => {
                e.addEventListener("click", () => {
                  const t = e.getAttribute("data-gid"),
                    n = T.find((e) => e.id === t);
                  if (!n) return void We("Không tìm thấy bộ sinh thành này.", "err");
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
                  if (!(await Pe("Xác nhận xóa bộ sinh thành tùy chỉnh này? Thao tác này không thể hoàn tác.")))
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
                  if (!(await Pe("Xác nhận xóa mọi chỉnh sửa và khôi phục về cấu hình mặc định của hệ thống?")))
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
          (e.innerHTML = `<div class="ccg-status ${x.error ? "ccg-error" : ""}">${C(x.error || (x.loading ? "Vui lòng đợi, đang trao đổi thiết lập với AI." : "Sau khi sinh thành hãy kiểm tra kết quả, xác nhận rồi mới ghi vào Thế Giới Thư."))}</div>\n      <div class="ccg-actions">\n        <button class="ccg-btn" data-action="reset"${x.loading ? " disabled" : ""}>Làm trống</button>\n        <button class="ccg-btn primary" data-action="generate"${x.loading ? " disabled" : ""}>Sinh thành</button>\n        <button class="ccg-btn primary" data-action="write"${!("character" === x.module ? x.result : x.genericResult) || x.loading ? " disabled" : ""}>Xác nhận ghi</button>\n      </div>`))
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
            ? (e.textContent = "Thiết lập & Cấu hình")
            : "workshop" === x.activeView
              ? (e.textContent = "Xưởng sáng tạo")
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
        return void We("Lỗi cú pháp biểu thức chính quy, vui lòng kiểm tra ký tự escape.", "err");
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
            (e.innerHTML = `<div class="ccg-overlay-box" style="width:min(560px,94vw);"><div class="ccg-overlay-head"><h3 style="margin:0;">${X("books")} Tham chiếu Thế Giới Thư</h3><button style="border:1px solid var(--line);border-radius:999px;background:var(--card);color:var(--muted);cursor:pointer;font-size:22px;width:34px;height:34px;display:grid;place-items:center;" onclick="this.closest('.ccg-overlay').remove()">×</button></div><div class="ccg-overlay-body">${ne()}</div></div>`),
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
        We("✓ Đã lưu thiết lập", "ok"),
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
              if (v && !(await Pe("Xác nhận làm trống nội dung bộ sinh thành hiện tại?"))) return;
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
                        !(await Pe("Chưa điền họ tên, bạn có muốn AI tự động đặt tên không?")))
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
                        We("✓ Đã sinh thành nhân vật, có thể xem trước rồi mới ghi", "ok"));
                    } catch (e) {
                      (console.error("[Vạn Tượng Sinh Thành Khí] Sinh thành thất bại:", e),
                        (x.error = `Sinh thành thất bại: ${e?.message || "Lỗi chưa rõ"}`),
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
                          throw new Error("Không tìm thấy giao diện generateRaw/generate.");
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
                                  content: `${Fe()}${l}\n\n(Lần xuất trước không phải JSON hợp lệ, vui lòng chỉ xuất đối tượng JSON nghiêm ngặt.)`,
                                },
                              ]);
                          }
                        throw g || new Error("Sinh thành thất bại");
                      })();
                      ((x.genericResult = Te(t)),
                        (v = !0),
                        We(`✓ Đã sinh thành ${J().tag}, có thể xem trước rồi mới ghi`, "ok"));
                    } catch (e) {
                      (console.error("[Bộ sinh đa năng] Sinh thành chung thất bại:", e),
                        (x.error = `Sinh thành thất bại: ${e?.message || "Lỗi chưa rõ"}`),
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
                  (console.error("[Vạn Tượng Sinh Thành Khí] Tối ưu hóa thất bại:", e),
                    (x.error = `Tối ưu hóa thất bại: ${e?.message || "Lỗi chưa rõ"}`),
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
                      if (!e) throw new Error("Nhân vật hiện tại chưa ràng buộc Thế Giới Thư chính.");
                      const t = j("getWorldbook"),
                        n = j("createWorldbookEntries"),
                        r = j("deleteWorldbookEntries");
                      if ("function" != typeof n)
                        throw new Error("Không tìm thấy giao diện createWorldbookEntries.");
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
                          `Trong Thế Giới Thư đã tồn tại điều mục cùng tên: ${o.map((e) => e.name).join("、")}. Xác nhận ghi đè?`,
                        ))
                      )
                        return ((x.loading = !1), ye(), void ve());
                      if (o.length) {
                        if ("function" != typeof r)
                          throw new Error(
                            "Cần ghi đè điều mục cùng tên nhưng không tìm thấy giao diện deleteWorldbookEntries.",
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
                        We(`✓ Đã ghi vào Thế Giới Thư: ${e}`, "ok"));
                    } catch (e) {
                      (console.error("[Vạn Tượng Sinh Thành Khí] Ghi thất bại:", e),
                        (x.error = `Ghi thất bại: ${e?.message || "Lỗi chưa rõ"}`),
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
                      if (!e) throw new Error("Nhân vật hiện tại chưa ràng buộc Thế Giới Thư chính.");
                      const t = j("getWorldbook"),
                        n = j("createWorldbookEntries"),
                        r = j("deleteWorldbookEntries");
                      if ("function" != typeof n)
                        throw new Error("Không tìm thấy giao diện createWorldbookEntries.");
                      const a = `${J().tag} | ${x.genericResult.title}`;
                      let i = [];
                      if ("function" == typeof t) {
                        i = ((await t(e)) || []).filter((e) => e.name === a);
                      }
                      if (
                        i.length &&
                        !(await Pe(`Trong Thế Giới Thư đã tồn tại điều mục cùng tên: ${a}. Xác nhận ghi đè?`))
                      )
                        return ((x.loading = !1), ye(), void ve());
                      if (i.length) {
                        if ("function" != typeof r)
                          throw new Error(
                            "Cần ghi đè điều mục cùng tên nhưng không tìm thấy giao diện deleteWorldbookEntries.",
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
                        We(`✓ Đã ghi vào Thế Giới Thư: ${e}`, "ok"));
                    } catch (e) {
                      (console.error("[Bộ sinh đa năng] Ghi thất bại:", e),
                        (x.error = `Ghi thất bại: ${e?.message || "Lỗi chưa rõ"}`),
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
          return `<Thiết lập nhân vật:${t}_SFW>\nHướng dẫn sử dụng: Bản lưu này là tài liệu tham khảo nội hóa nhân vật, dành cho AI thấu hiểu bản thể. Mọi mục thiết lập phải được chuyển hóa thành hành vi, ngôn ngữ, phương thức tư duy và nhịp điệu cảm xúc của nhân vật, không được điểm xuyết, thuật lại hay ám chỉ trực tiếp các dòng thiết lập này trong lời dẫn hay đối thoại. Thiết lập là nền tảng ngầm hiểu, không phải văn bản xuất ra.\n${R("Họ tên", t)}${R("Giới tính", e.gender)}${R("Tuổi", B(e.age))}${R("Thân phận", e.identity)}${R("Quan hệ với nhân vật chính", e.relation)}${R("Địa điểm hiện tại", e.location)}${R("Thuộc thế lực", e.faction)}${R("Chức năng nhân vật", e.role)}\nVui lòng xoay quanh trải nghiệm, dục vọng, giới hạn đỏ, thói quen ăn nói và móc nối tương tác để hoàn thiện nhân thiết.\n</Thiết lập nhân vật:${t}_SFW>`;
        })(t, n),
      l =
        String(e?.nsfw_content || "").trim() ||
        (function (e, t) {
          return `<Thiết lập nhân vật:${t}_NSFW>\n${R("Xác nhận trưởng thành", `${t} là nhân vật trưởng thành ${B(e.age)} tuổi`)}${R("Ranh giới thân mật", e.kinkBoundary)}\nVui lòng dựa trên nhân thiết SFW để phát triển tự nhiên động thái thân mật, biểu đạt dục vọng, điểm tu sỉ, mô thức chủ động/bị động và giới hạn OOC.\n</Thiết lập nhân vật:${t}_NSFW>`;
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
      n = String(e?.title || x.genericForm.topic || `${t.tag} chưa đặt tên`).trim(),
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
          "Sau khi đóng, các chỉnh sửa chưa ghi sẽ lưu trong bộ nhớ tạm, nhưng làm mới trang có thể bị mất. Xác nhận đóng?",
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
          title: "Ghi vào Thế Giới Thư",
          confirmText: "Ghi đè và lưu",
          danger: !0,
        })
      : (f.defaultView || window).confirm(e);
  }
  let qe = null;
  function We(e, t = "ok") {
    console.log(`[Vạn Tượng Sinh Thành Khí] ${e}`);
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
          `Dưới đây là nội dung Thế Giới Thư tham chiếu được ràng buộc bởi nhân vật hiện tại, khi sinh nhân vật vui lòng giữ hài hòa với các thiết lập này:\n\n${n}`,
        ),
      e.sys && t.push(e.sys),
      t.push(
        'Bắt buộc phải xuất đối tượng JSON hợp lệ. Dấu ngoặc kép bên trong trường sfw_content và nsfw_content phải được escape thành \\", xuống dòng phải escape thành \\n. Không dùng thẻ XML chưa escape bên trong chuỗi JSON — hãy đặt nội dung thẻ dưới dạng văn bản thuần trong chuỗi JSON.',
      ),
      t.join("\n\n")
    );
  }
  function Oe() {
    return 'Câu trả lời lần trước của bạn không phải JSON hợp lệ. Vui lòng chỉ xuất ra một đối tượng JSON duy nhất, toàn bộ dấu ngoặc kép trong giá trị chuỗi dùng \\" để escape, xuống dòng dùng \\n để escape. Không xuất bất kỳ ký tự nào ngoài JSON. Không bọc bằng khối mã markdown.';
  }
  function je(e) {
    const t = J(),
      n = x.form,
      r = n.name || "Nhờ bạn đặt tên";
    var a = (t.userPromptTemplate || "")
      .replace(/\{name\}/g, r)
      .replace(/\{gender\}/g, n.gender)
      .replace(/\{age\}/g, String(B(n.age)))
      .replace(/\{identity\}/g, n.identity || "Chưa xác định")
      .replace(/\{relation\}/g, n.relation || "Chưa xác định")
      .replace(/\{location\}/g, n.location || "Chưa xác định")
      .replace(/\{faction\}/g, n.faction || "Chưa xác định")
      .replace(/\{role\}/g, n.role || "Chưa xác định")
      .replace(/\{tone\}/g, n.tone || "Loạn thế tả thực, kiềm chế có dư âm")
      .replace(/\{keywordHint\}/g, n.keywordHint || "Không")
      .replace(/\{appearance\}/g, n.appearance || "Không")
      .replace(/\{kinkBoundary\}/g, n.kinkBoundary || "Tự nhiên sinh theo nhân vật")
      .replace(/\{physique\}/g, n.physique || "Không")
      .replace(/\{extra\}/g, n.extra || "Không")
      .replace(/\{nameTag\}/g, r);
    if (!1 === n.genNsfw) {
      var i = a.indexOf("nsfw_content");
      if (i > 0) {
        var o = a.lastIndexOf("\n", i);
        (o < 0 && (o = i), (a = a.substring(0, o).trim()));
      }
      a +=
        "\n\nLưu ý: Lần này không sinh nội dung NSFW. Cả ba trường nsfw_content, nsfw_keywords, nsfw_secondary_keywords đều trả về giá trị rỗng (chuỗi rỗng hoặc mảng rỗng). nsfw_title trả về chuỗi rỗng.";
    }
    if ("revise" !== e) return a;
    const c = x.result || {};
    return `Vui lòng dựa theo phản hồi của người dùng để tối ưu hóa thiết lập nhân vật đã sinh dưới đây. Giữ nguyên cấu trúc JSON, chỉ sửa phần cần chỉnh.\n\nPhản hồi của người dùng:\n${x.feedback || "Vui lòng tăng cường trải nghiệm cụ thể và khả năng nhập vai."}\n\nTên nhân vật hiện tại: ${c.name || r}\nTên điều mục SFW hiện tại: ${c.sfwTitle || ""}\nTên điều mục NSFW hiện tại: ${c.nsfwTitle || ""}\n\nsfw_keywords hiện tại: ${(c.sfwKeywords || []).join(", ")}\nnsfw_keywords hiện tại: ${(c.nsfwKeywords || []).join(", ")}\nnsfw_secondary_keywords hiện tại: ${(c.nsfwSecondaryKeywords || []).join(", ")}\n\n===== Nội dung SFW hiện tại =====\n${c.sfwContent || "(Không)"}\n\n===== Nội dung NSFW hiện tại =====\n${c.nsfwContent || "(Không)"}\n\n===== Kết thúc =====\n\nVui lòng trả về JSON hoàn chỉnh sau khi sửa (name, alias, sfw_title, nsfw_title, sfw_keywords, nsfw_keywords, nsfw_secondary_keywords, sfw_content, nsfw_content). Không lược bỏ bất kỳ trường nào, ngay cả khi trường đó không có thay đổi.`;
  }
  function Ce() {
    const e = J(),
      t = [];
    h.limitBreakPrompt && t.push(h.limitBreakPrompt);
    const n = te();
    return (
      n &&
        t.push(
          `Dưới đây là nội dung Thế Giới Thư tham chiếu được ràng buộc bởi nhân vật hiện tại, khi sinh vui lòng giữ hài hòa với các thiết lập này:\n\n${n}`,
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
            return n ? `${e.name}：${n}` : null;
          })
          .filter(Boolean)
          .join("\n"));
    let r = "";
    return (
      e.fields &&
        e.fields.length > 0 &&
        (r =
          "\n\nVui lòng tổ chức nội dung trong trường content theo cấu trúc sau:\n" +
          e.fields.map((e) => `<${e.name}>: ${e.pmt}`).join("\n")),
      `Vui lòng sinh một điều mục Thế Giới Thư cho ${e.tag}.\nTên/Chủ đề: ${t.topic || "Nhờ bạn đặt tên"}\nThiên hướng phong cách: ${t.style || "Không yêu cầu đặc biệt"}${n ? "\n" + n : ""}\nThiên hướng từ khóa: ${t.keywords || "Không"}\nThuyết minh bổ sung: ${t.extra || "Không"}\n\nCác trường JSON trả về: title, keywords, content. Trường content vui lòng bọc trong thẻ <${e.tag}>...</${e.tag}>, cấu trúc nội bộ rõ ràng, có thể dùng trực tiếp làm chính văn Thế Giới Thư.${r}`
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
              content: `${je(t)}${d}\n\n(Lần xuất trước không phải JSON hợp lệ — bắt buộc phải xuất JSON nghiêm ngặt, tất cả dấu ngoặc kép và xuống dòng trong chuỗi đều phải escape.)`,
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
      s = o("name") || o("sfw_title")?.replace(/_SFW$/, "") || "Nhân vật chưa đặt tên",
      l = c("alias"),
      d = o("sfw_title") || `${s}_SFW`,
      g = o("nsfw_title") || `${s}_NSFW`,
      p = c("sfw_keywords"),
      u = c("nsfw_keywords"),
      f = c("nsfw_secondary_keywords");
    let m = o("sfw_content"),
      b = o("nsfw_content");
    if (!m) {
      const e = r.match(/<(?:角色设定|Thiết lập nhân vật)[^>]*_SFW>([\s\S]*?)<\/(?:角色设定|Thiết lập nhân vật)[^>]*_SFW>/i);
      e && (m = e[0]);
    }
    if (!b) {
      const e = r.match(
        /<(?:角色设定|Thiết lập nhân vật)[^>]*_NSFW>([\s\S]*?)<\/(?:角色设定|Thiết lập nhân vật)[^>]*_NSFW>/i,
      );
      e && (b = e[0]);
    }
    if (!m && !b && !s) throw new Error("Nội dung AI trả về không thể phân tích cú pháp JSON.");
    return (
      console.log("[Vạn Tượng Sinh Thành Khí] Sử dụng phân tích dung sai trích xuất dữ liệu nhân vật"),
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
      if (!t) throw new Error("Vui lòng sinh tác phẩm trước khi đăng lên Xưởng sáng tạo.");
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
        if ("worldbook-entry" !== e.type) throw new Error("Không hỗ trợ loại tác phẩm này.");
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
      if (!t) throw new Error("Không tìm thấy bộ sinh thành này.");
      const n = Re(t);
      return (delete n.id, delete n.isDefault, n);
    },
    importGeneratorDefinition: function (e) {
      const t = Re(e);
      if (!t || !t.tag || !Array.isArray(t.fields))
        throw new Error("Định nghĩa bộ sinh thành không hoàn chỉnh.");
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
