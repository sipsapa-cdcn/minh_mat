function t(t) {
  return String(t ?? "")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/[。；;]+$/, "");
}
function e(e) {
  return t(e).replace(/[\s，,。；;：:、]/g, "");
}
function n(...n) {
  const o = [];
  for (const r of n) {
    const n = t(r),
      s = e(n);
    if (!s) continue;
    if (o.findIndex((t) => e(t).includes(s)) >= 0) continue;
    const c = o.findIndex((t) => s.includes(e(t)));
    c >= 0 ? (o[c] = n) : o.push(n);
  }
  return o.join("；");
}
const o = "_残明余烬旧档迁移版本",
  r = ["Thượng tư", "Cố hữu và đồng liêu", "Hạ thuộc và mạc liêu", "Tam giáo cửu lưu", "Cừu địch", "Thân thuộc", "Tư duy"],
  s = new Set(["Thê", "Thiếp", "Thông phòng", "Hồng nhan", "Nữ quyến", "妻", "妾", "通房", "红颜", "女眷"]),
  c = new Set(["Quân chính", "Kinh tế", "Nhân sự", "Ngoại giao", "Chiến dịch", "Kiến thiết", "Kỹ thuật", "Gia tộc", "军政", "经济", "人事", "外交", "战役", "建设", "技术", "家族"]),
  i = new Set(["Phe nhân vật chính", "Minh Đình", "Hậu Kim", "Lưu khấu", "Địa phương trung lập", "Chưa rõ", "主角方", "明廷", "后金", "流寇", "地方中立", "未知"]),
  f = { 
    "Nhân vật chính": "Phe nhân vật chính", 
    "Minh quân": "Minh Đình", 
    "Trung lập": "Địa phương trung lập",
    "主角": "Phe nhân vật chính", 
    "明军": "Minh Đình", 
    "中立": "Địa phương trung lập" 
  },
  u = new Set([
    "Chưa tiếp xúc", "Quan sát", "Hữu hảo", "Kết minh", "Địch đối", "Giao chiến", "Phụ dung", "Tông chủ", "Đã đầu hàng", "Đã diệt vong",
    "未接触", "观望", "友好", "结盟", "敌对", "交战", "附庸", "宗主", "已投降", "已覆灭"
  ]),
  a = new Set([
    "Mạc Bắc", "Triều Tiên", "Nhật Bản", "Đông Phiên", "An Nam", "Xiêm La", "Lan Thương - Chân Lạp", "Lữ Tống", "Trảo Nha", "Ô Tư Tạng", "Tây Vực", "Thanh Hải", "Mạc Ngọa Nhi", "Bất Đan", "Ni Bà La", "Úc Châu",
    "漠北", "朝鲜", "日本", "东番", "安南", "暹罗", "澜沧·真腊", "吕宋", "爪哇", "乌思藏", "西域", "青海", "莫卧儿", "不丹", "尼婆罗", "澳洲"
  ]);
function l(t, e, n) {
  return Math.min(n, Math.max(e, t));
}
const y = Object.freeze({
  "Sùng Trinh": 1627,
  "Hoằng Quang": 1644,
  "Long Vũ": 1644,
  "Thiệu Vũ": 1645,
  "Vĩnh Lịch": 1646,
  "Thuận Trị": 1643,
  "Giám quốc Lỗ": 1645,
  "Lỗ Giám quốc": 1645,
  "崇祯": 1627,
  "弘光": 1644,
  "隆武": 1644,
  "绍武": 1645,
  "永历": 1646,
  "顺治": 1643,
  "监国鲁": 1645,
  "鲁监国": 1645
});
function b(t) {
  const e = String(t ?? "").match(
    /(崇祯|弘光|隆武|绍武|永历|顺治|监国鲁|鲁监国|Sùng Trinh|Hoằng Quang|Long Vũ|Thiệu Vũ|Vĩnh Lịch|Thuận Trị|Giám quốc Lỗ|Lỗ Giám quốc)\s*(?:năm thứ\s*)?([元一二两三四五六七八九十〇零\d]+|nhất|nhị|tam|tứ|ngũ|lục|thất|bát|cửu|thập|mười|\d+)\s*(?:năm|年)?/i
  );
  if (!e) return null;
  const n = (function (t) {
    const e = String(t ?? "").trim();
    if ("元" === e || "nhất" === e.toLowerCase()) return 1;
    if (/^\d+$/.test(e)) return Number(e);
    const n = {
      "零": 0, "〇": 0, "一": 1, "二": 2, "两": 2, "三": 3, "四": 4, "五": 5, "六": 6, "七": 7, "八": 8, "九": 9,
      "không": 0, "một": 1, "hai": 2, "ba": 3, "bốn": 4, "năm": 5, "sáu": 6, "bảy": 7, "tám": 8, "chín": 9,
      "nhất": 1, "nhị": 2, "tam": 3, "tứ": 4, "ngũ": 5, "lục": 6, "thất": 7, "bát": 8, "cửu": 9
    };
    if ("十" === e || "mười" === e.toLowerCase() || "thập" === e.toLowerCase()) return 10;
    if (e.includes("十")) {
      const [t, o] = e.split("十");
      return 10 * (t ? n[t] : 1) + (o ? n[o] : 0);
    }
    return [...e].every((t) => t in n)
      ? Number([...e].map((t) => n[t]).join(""))
      : NaN;
  })(e[2]);
  return Number.isFinite(n) ? y[e[1]] + n : null;
}
function p(t, e) {
  const n = _.get(t, "Mạng lưới quan hệ", {}) || _.get(t, "人际网络", {});
  for (const t of r) {
    const o = n?.[t]?.[e];
    if (o && "object" == typeof o) return { category: t, person: o };
  }
  return null;
}
function j(t) {
  const e = f[t] || t;
  return i.has(e) ? e : "Chưa rõ";
}
function g(t, e, n) {
  const o = String(t || "").trim();
  if (!o || /Chưa rõ|Không rõ|未知|不明/.test(o)) return "Chưa rõ";
  if (
    Object.keys(_.get(e, "Quân sự.Các doanh", {}) || _.get(e, "军事.各营", {}))
      .map((t) => String(t).trim())
      .filter((t) => t.length >= 2)
      .some((t) => o.includes(t)) ||
    /Phe nhân vật chính|Nhân vật chính|Quân ta|Bộ ta|Huy hạ|主角|我军|我部|麾下/.test(o)
  )
    return "Phe nhân vật chính";
  if (a.has(n) && !/^(Phe nhân vật chính|Nhân vật chính|Quân ta|Bộ ta|Minh Đình|Minh quân|Hậu Kim|Lưu khấu|主角|我军|我部|明廷|明军|后金|流寇)/.test(o))
    return "Địa phương trung lập";
  const r = [];
  if (
    (/Hậu Kim|Kiến nô|Nữ Chân|Bát Kỳ|Mãn Châu|后金|建奴|女真|八旗|满洲/.test(o) && r.push("Hậu Kim"),
    /Lưu khấu|Tặc doanh|Sấm quân|Hiến quân|Cách Tả|流寇|贼营|闯军|献军|革左/.test(o) && r.push("Lưu khấu"),
    /Minh Đình|Minh quân|Quan quân|Triều đình|Vệ sở|Tiêu doanh|明廷|明军|官军|朝廷|卫所|标营/.test(o) && r.push("Minh Đình"),
    1 === r.length)
  )
    return r[0];
  if (r.length > 1) {
    if (/Hậu Kim[^，。；;]*đại bộ|đại bộ[^，。；;]*Hậu Kim|后金[^，。；]*大部|大部[^，。；]*后金/i.test(o)) return "Hậu Kim";
    if (/Minh Đình[^，。；;]*đại bộ|đại bộ[^，。；;]*Minh Đình|明廷[^，。；]*大部|大部[^，。；]*明廷/i.test(o)) return "Minh Đình";
  }
  return "Chưa rõ";
}
function O(t) {
  const e = String(t || "").trim();
  return u.has(e)
    ? e
    : /Diệt vong|Tiêu vong|Giải thể|覆灭|消亡|瓦解/.test(e)
      ? "Đã diệt vong"
      : /Đầu hàng|Quy hàng|投降|归降/.test(e)
        ? "Đã đầu hàng"
        : /Giao chiến|Chiến tranh|Khai chiến|交战|战争|开战/.test(e)
          ? "Giao chiến"
          : /Địch đối|Đối lập|Minh hợp ám đấu|敌对|对立|明合暗斗/.test(e)
            ? "Địch đối"
            : /Kết minh|Minh hữu|Đồng minh|结盟|盟友/.test(e)
              ? "Kết minh"
              : /Hữu hảo|Ỷ trọng|Hợp tác|Liên hôn|友好|倚重|合作|联姻/.test(e)
                ? "Hữu hảo"
                : /Phụ dung|附庸/.test(e)
                  ? "Phụ dung"
                  : /Tông chủ|宗主/.test(e)
                    ? "Tông chủ"
                    : /Đã sáp nhập|Quy tịnh|Kiêm tịnh|Thôn tính|已合并|归并|兼并|吞并/.test(e)
                      ? "Đã diệt vong"
                      : /Chưa tiếp xúc|未接触/.test(e)
                        ? "Chưa tiếp xúc"
                        : "Quan sát";
}
function d(t, e) {
  const n = String(t || "").trim();
  if (["Chờ xử lý", "Đang tiến hành", "Đang chờ", "Tạm hoãn", "待处理", "推进中", "等待中", "暂缓"].includes(n)) {
    const map = { "待处理": "Chờ xử lý", "推进中": "Đang tiến hành", "等待中": "Đang chờ", "暂缓": "Tạm hoãn" };
    return map[n] || n;
  }
  const o = `${n} ${String(e || "")}`;
  return /Tạm hoãn|Gác lại|Tạm dừng|暂缓|搁置|暂停/i.test(o)
    ? "Tạm hoãn"
    : /Đang chờ|Chờ.*(?:hồi âm|đáp phúc|tin tức|thời cơ|kết quả|đến nơi)|Tĩnh hậu|等待|待.*(?:回信|答复|消息|时机|结果|抵达)|静候/i.test(o)
      ? "Đang chờ"
      : /(?:Chưa|chưa|Chưa từng|chưa từng) bắt đầu|Chưa bắt đầu|Chờ làm|Chờ xử lý|(?:尚未|还未|未曾)开始|未开始|待办|待处理/i.test(o)
        ? "Chờ xử lý"
        : o.trim()
          ? "Đang tiến hành"
          : "Chờ xử lý";
}
function h(t) {
  const e = t && "object" == typeof t ? t : {},
    n = e["Hiện trạng"] || e["Tiến triển"] || e["Tiến độ"] || e.现状 || e.进展 || e.进度 || "";
  return {
    "Trạng thái": d(e["Trạng thái"] || e.状态, n),
    "Khái yếu": e["Khái yếu"] || e["Mục tiêu"] || e["Thuyết minh"] || e.概要 || e.目标 || e.说明 || "",
    "Hiện trạng": n,
    "Nhắc nhở": e["Nhắc nhở"] || e.提醒 || "",
  };
}
function m(t, e) {
  let n = !1;
  n =
    (function (t) {
      const e = t["Kinh tế"]?.["Lưu thủy"] || t.经济?.流水;
      if (!e || "object" != typeof e) return !1;
      const n = e["Nguyệt nhập"] || e.月入 || {},
        o = e["Nguyệt xuất"] || e.月出 || {};
      if (!Object.keys(n).length && !Object.keys(o).length) return !1;
      (t["Thời cục và nhiệm vụ"] && "object" == typeof t["Thời cục và nhiệm vụ"]) || (t["Thời cục và nhiệm vụ"] = t.时局与任务 || {});
      const r =
        t["Thời cục và nhiệm vụ"]["Hạng mục chưa quyết"] && "object" == typeof t["Thời cục và nhiệm vụ"]["Hạng mục chưa quyết"]
          ? t["Thời cục và nhiệm vụ"]["Hạng mục chưa quyết"]
          : t["Thời cục và nhiệm vụ"].未决事项 || {};
      t["Thời cục và nhiệm vụ"]["Hạng mục chưa quyết"] = r;
      const s = (t) => {
          if (!Object.hasOwn(r, t)) return t;
          if (!Object.hasOwn(r, `${t} (Lưu thủy cũ)`)) return `${t} (Lưu thủy cũ)`;
          let e = 2;
          for (; Object.hasOwn(r, `${t} (Lưu thủy cũ ${e})`); ) e++;
          return `${t} (Lưu thủy cũ ${e})`;
        },
        c = (t, e) => {
          for (const [n, o] of Object.entries(t)) {
            const t = o && "object" == typeof o ? o : {},
              c = s(`${"income" === e ? "Chờ thu" : "Chờ chi"}：${n}`),
              i = Number(t["Ngân lượng"] || t.银两) || 0,
              f = String(t["Thuyết minh"] || t.说明 || "").trim();
            r[c] = {
              "Trạng thái": "Đang chờ",
              "Khái yếu": `${n} còn có ${i} lượng bạch ngân ${"income" === e ? "phải thu" : "phải trả"}, chưa thực tế bàn giao.${f ? ` Sự do: ${f}` : ""}`,
              "Hiện trạng": "Chuyển đổi từ lưu thủy bản lưu cũ 1.8, hiện vẫn chờ thanh toán.",
              "Nhắc nhở":
                "income" === e
                  ? "Sau khi thực nhận vào tài khoản cập nhật Tư khố nhân vật chính, và xóa hạng mục này."
                  : "Sau khi thực tế chi trả cập nhật Tư khố nhân vật chính, và xóa hạng mục này.",
            };
          }
        };
      return (c(n, "income"), c(o, "expense"), !0);
    })(t) || n;
  const o = t["Mạng lưới quan hệ"] || t.人际网络;
  if (o && "object" == typeof o) {
    const t = new Set(Array.isArray(o["Nhân vật có mặt"] || o.在场角色) ? (o["Nhân vật có mặt"] || o.在场角色) : []);
    for (const e of r)
      for (const [r, s] of Object.entries(o[e] || {}))
        s &&
          "object" == typeof s &&
          ((!0 === s["Có mặt hay không"] || !0 === s.是否在场) && t.add(r),
          Object.hasOwn(s, "Có mặt hay không") && (delete s["Có mặt hay không"], (n = !0)),
          Object.hasOwn(s, "是否在场") && (delete s.是否在场, (n = !0)),
          Object.hasOwn(s, "Tiếng lòng nhân vật") && (delete s["Tiếng lòng nhân vật"], (n = !0)),
          Object.hasOwn(s, "角色心声") && (delete s.角色心声, (n = !0)));
    const e = [...t].map((t) => String(t).trim()).filter(Boolean);
    JSON.stringify(o["Nhân vật có mặt"]) !== JSON.stringify(e) &&
      ((o["Nhân vật có mặt"] = e), (n = !0));
  }
  const fengyue = t["Phong nguyệt các"] || t.风月阁;
  if (fengyue && "object" == typeof fengyue) {
    Object.hasOwn(fengyue, "Lời chưởng quỹ") && (delete fengyue["Lời chưởng quỹ"], (n = !0));
    Object.hasOwn(fengyue, "掌柜絮语") && (delete fengyue.掌柜絮语, (n = !0));
  }
  const s = _.get(t, "Thời cục và nhiệm vụ.Quan hệ thế lực") || _.get(t, "时局与任务.势力关系");
  if (s && "object" == typeof s)
    for (const t of Object.values(s)) {
      if (!t || "object" != typeof t) continue;
      ((t["Tóm tắt quan hệ"] || t.关系摘要) || "string" != typeof (t["Miêu tả"] || t.描述) || (t["Tóm tắt quan hệ"] = t["Miêu tả"] || t.描述),
        Object.hasOwn(t, "Miêu tả") && delete t["Miêu tả"],
        Object.hasOwn(t, "描述") && delete t.描述);
      const e = O(t["Trạng thái"] || t.状态);
      t["Trạng thái"] !== e && (t["Trạng thái"] = e);
      const o = t["Kinh tế"] || t.经济;
      if (o && "object" == typeof o) {
        const t = o["Lương thảo"]?.["Trạng thái"] || o.粮草?.状态,
          e = o["Trạng thái lương thảo"] || o.粮草状态 || t || "Chưa rõ";
        o["Trạng thái lương thảo"] = "Khan hiếm" === e || "紧缺" === e ? "Thiếu hụt" : e;
        for (const t of ["Thu nhập chủ yếu", "Chi tiêu chủ yếu", "Lương thảo", "Miêu tả", "主要收入", "主要支出", "粮草", "描述"]) delete o[t];
      }
      const mil = t["Quân sự"] || t.军事;
      (mil && "object" == typeof mil && (delete mil["Miêu tả"], delete mil.描述), (n = !0));
    }
  const c = t["Thời cục và nhiệm vụ"] || t.时局与任务;
  if (c && "object" == typeof c) {
    const t = c["Nhiệm vụ hiện tại"] || c.当前任务 || {},
      e = c["Hạng mục chưa quyết"] || c.未决事项 || {},
      o = { ...t, ...e };
    if (Object.keys(o).length || Object.hasOwn(c, "Nhiệm vụ hiện tại") || Object.hasOwn(c, "当前任务")) {
      const t = Object.fromEntries(
        Object.entries(o).map(([t, e]) => [t, h(e)]),
      );
      (JSON.stringify(e) !== JSON.stringify(t) && ((c["Hạng mục chưa quyết"] = t), (n = !0)),
        Object.hasOwn(c, "Nhiệm vụ hiện tại") && (delete c["Nhiệm vụ hiện tại"], (n = !0)),
        Object.hasOwn(c, "当前任务") && (delete c.当前任务, (n = !0)));
    }
  }
  return (n && e.leanVariables++, n);
}
function w(t) {
  const e = `${t?.["Binh chủng"] || t?.兵种 || ""} ${t?.["Trang bị"] || t?.装备 || ""}`;
  return /[Kỵ|kỵ|Mã|mã|Lạc đà|lạc đà|骑马骆驼]/.test(e)
    ? {
        "Binh khí chủ chiến": "Mã đao",
        "Binh khí viễn xạ": "Kỵ cung",
        "Phòng cụ": "Khinh giáp",
        "Hỏa khí": "Không",
        "Tọa kỵ": "Chiến mã",
        "Tỷ lệ tề bị": 55,
        "Tỷ lệ hoàn hảo": 70,
      }
    : /[Hỏa khí|Điểu súng|Súng|Pháo|Xa doanh|火器鸟铳铳炮车营]/.test(e)
      ? {
          "Binh khí chủ chiến": "Yêu đao",
          "Binh khí viễn xạ": "Điểu súng",
          "Phòng cụ": "Miên giáp",
          "Hỏa khí": "Điểu súng",
          "Tọa kỵ": "Không",
          "Tỷ lệ tề bị": 50,
          "Tỷ lệ hoàn hảo": 65,
        }
      : /[Thủy sư|Thuyền|Chu|水师船舟]/.test(e)
        ? {
            "Binh khí chủ chiến": "Yêu đao",
            "Binh khí viễn xạ": "Cung nỏ",
            "Phòng cụ": "Miên giáp",
            "Hỏa khí": "Hỏa súng",
            "Tọa kỵ": "Chiến thuyền",
            "Tỷ lệ tề bị": 55,
            "Tỷ lệ hoàn hảo": 65,
          }
        : {
            "Binh khí chủ chiến": "Trường thương",
            "Binh khí viễn xạ": "Cung tiễn",
            "Phòng cụ": "Miên giáp",
            "Hỏa khí": "Không",
            "Tọa kỵ": "Không",
            "Tỷ lệ tề bị": 45,
            "Tỷ lệ hoàn hảo": 70,
          };
}
function S(t, e) {
  const o = (function (t) {
    if (!t || "object" != typeof t || Array.isArray(t)) return 0;
    let e = 0;
    for (const o of Object.values(t)) {
      if (!o || "object" != typeof o || Array.isArray(o)) continue;
      const t = n(o["Hiện trạng"] || o.现状, o["Miêu tả"] || o.描述, o["Hiệu quả"] || o.效果),
        r = Object.hasOwn(o, "Miêu tả") || Object.hasOwn(o, "Hiệu quả") || Object.hasOwn(o, "描述") || Object.hasOwn(o, "效果");
      ((o["Hiện trạng"] || o.现状) !== t || r) && ((o["Hiện trạng"] = t), delete o["Miêu tả"], delete o["Hiệu quả"], delete o.描述, delete o.效果, e++);
    }
    return e;
  })(t["Khoa kỹ"] || t.科技);
  return !!o && ((e.technologyStatus += o), !0);
}
function v(t, e) {
  if (!t || "object" != typeof t) return !1;
  let n = !1;
  return (
    (n =
      (function (t, e) {
        return !(
          (!t["Cục thế và nhiệm vụ"] && !t.局势与任务) ||
          "object" != typeof (t["Cục thế và nhiệm vụ"] || t.局势与任务) ||
          ((t["Thời cục và nhiệm vụ"] = _.merge({}, t["Cục thế và nhiệm vụ"] || t.局势与任务, t["Thời cục và nhiệm vụ"] || t.时局与任务 || {})),
          delete t["Cục thế và nhiệm vụ"],
          delete t.局势与任务,
          e.situation++,
          0)
        );
      })(t, e) || n),
    (n =
      (function (t, e) {
        const n = t["Mạng lưới quan hệ"] || t.人际网络;
        if (!n || "object" != typeof n) return !1;
        let o = !1;
        for (const t of r) {
          const r = n[t];
          if (r && "object" == typeof r)
            for (const n of Object.values(r))
              n &&
                "object" == typeof n &&
                ("Hạ thuộc và mạc liêu" === t &&
                  !(n["Thân phận"] || n.身份) &&
                  (n["Chức trách"] || n.职责) &&
                  ((n["Thân phận"] = n["Chức trách"] || n.职责), delete n["Chức trách"], delete n.职责, e.duty++, (o = !0)),
                "Tư duy" === t &&
                  (!(n["Quan hệ"] || n.关系) &&
                    s.has(n["Thân phận"] || n.身份) &&
                    ((n["Quan hệ"] = n["Thân phận"] || n.身份),
                    (n["Thân phận"] = ""),
                    e.privateRelation++,
                    (o = !0)),
                  (n["Quan hệ"] || n.关系) || ((n["Quan hệ"] = "Hồng nhan"), e.privateRelation++, (o = !0)),
                  null == n["Trung tâm"] && null == n.忠心 &&
                    ((n["Trung tâm"] = 50), e.privateLoyalty++, (o = !0))),
                "string" != typeof (n["Thân phận"] || n.身份) && ((n["Thân phận"] = ""), (o = !0)));
        }
        return o;
      })(t, e) || n),
    (n = m(t, e) || n),
    (n =
      (function (t, e) {
        const n = _.get(t, "Quân sự.Tướng lĩnh") || _.get(t, "军事.将领");
        if (!n || "object" != typeof n) return !1;
        let o = !1;
        for (const [r, s] of Object.entries(n)) {
          if (!s || "object" != typeof s || (null == s["Trung thành"] && null == s.忠诚)) continue;
          const n = p(t, r),
            c = l(Number(s["Trung thành"] ?? s.忠诚) || 0, 0, 100);
          (n
            ? (null != n.person["Trung tâm"] || null != n.person.忠心) ||
              ("Hạ thuộc và mạc liêu" !== n.category && "Tư duy" !== n.category) ||
              (n.person["Trung tâm"] = c)
            : ((t["Mạng lưới quan hệ"] && "object" == typeof t["Mạng lưới quan hệ"]) ||
                (t["Mạng lưới quan hệ"] = {}),
              (t["Mạng lưới quan hệ"]["Hạ thuộc và mạc liêu"] &&
                "object" == typeof t["Mạng lưới quan hệ"]["Hạ thuộc và mạc liêu"]) ||
                (t["Mạng lưới quan hệ"]["Hạ thuộc và mạc liêu"] = {}),
              (t["Mạng lưới quan hệ"]["Hạ thuộc và mạc liêu"][r] = {
                "Thân phận": "Tướng lĩnh dưới quyền nhân vật chính",
                "Hảo cảm độ": 0,
                "Trung tâm": c,
              })),
            delete s["Trung thành"],
            delete s.忠诚,
            e.generalLoyalty++,
            (o = !0));
        }
        return o;
      })(t, e) || n),
    (n =
      (function (t, e) {
        const n = _.get(t, "Cá nhân sử ký.Đại sự ký") || _.get(t, "个人史记.大事记");
        if (!n || "object" != typeof n) return !1;
        let o = !1;
        for (const t of Object.values(n))
          t &&
            "object" == typeof t &&
            !c.has(t["Loại hình"] || t.类型) &&
            ((t["Loại hình"] = "Quân chính"), e.historyType++, (o = !0));
        return o;
      })(t, e) || n),
    (n =
      (function (t, e) {
        const n = _.get(t, "Thiên hạ bản đồ.Thái thế khu vực") || _.get(t, "天下地图.地区态势");
        if (!n || "object" != typeof n) return !1;
        let o = !1;
        for (const [r, s] of Object.entries(n)) {
          if (!s || "object" != typeof s) continue;
          const n = s["Trận doanh thực khống"] || s.实控阵营,
            c = j(n);
          let i = c;
          ((n && "Chưa rõ" !== c && "未知" !== c) || (i = g(s["Thế lực thực khống"] || s.实控势力, t, r)),
            "Chưa rõ" !== i &&
              "未知" !== i &&
              n !== i &&
              ((s["Trận doanh thực khống"] = i), e.mapOwnership++, (o = !0)));
        }
        return o;
      })(t, e) || n),
    (n =
      (function (t, e) {
        const n = _.get(t, "Mạng lưới quan hệ.Tư duy") || _.get(t, "人际网络.私帷");
        if (!n || "object" != typeof n) return !1;
        let o = !1;
        for (const t of Object.values(n)) {
          const n = t?.["Sinh dục"] || t?.生育;
          if (!n || n["_Số ngày dự sinh"] || n._预产天数 || ("Đã mang thai" !== n["Trạng thái"] && "已孕" !== n.状态) || (!n["Dự sinh kỳ"] && !n.预产期)) continue;
          const r = Number(String(n["Dự sinh kỳ"] || n.预产期).match(/(?:ngày thứ|第)\s*(\d+)\s*(?:ngày|日)?/i)?.[1] || 0);
          r <= 0 || ((n["_Số ngày dự sinh"] = r), e.reproductive++, (o = !0));
        }
        return o;
      })(t, e) || n),
    (n =
      (function (t, e) {
        let n = !1;
        ((t["Quân sự"] && "object" == typeof t["Quân sự"]) || (t["Quân sự"] = {}),
          (t["Quân sự"]["Quân lệnh"] && "object" == typeof t["Quân sự"]["Quân lệnh"]) ||
            ((t["Quân sự"]["Quân lệnh"] = {}), (n = !0)),
          Array.isArray(t["Quân sự"]["Ghi chép quân lệnh"]) || ((t["Quân sự"]["Ghi chép quân lệnh"] = []), (n = !0)));
        for (const e of Object.values(t["Quân sự"]["Các doanh"] || t.军事?.各营 || {})) {
          if (!e || "object" != typeof e) continue;
          const t = {
            "Trạng thái": "Đợi lệnh",
            "Bì lao": 0,
            "Thương binh": 0,
            "Số tháng nợ lương": 0,
            "Số ngày thiếu lương": 0,
          };
          for (const [o, r] of Object.entries(t))
            null == e[o] && ((e[o] = r), (n = !0));
          (((e["Biên chế trang bị"] || e.装备编制) && "object" == typeof (e["Biên chế trang bị"] || e.装备编制)) ||
            ((e["Biên chế trang bị"] = w(e)), (n = !0)),
            ((e["Ghi chép quân vụ"] || e.军务记录) && "object" == typeof (e["Ghi chép quân vụ"] || e.军务记录)) ||
              ((e["Ghi chép quân vụ"] = { "Lần khao thưởng trước": "", "Tháng khao thưởng": "", "Số lần khao thưởng tháng này": 0 }),
              (n = !0)));
        }
        (t["Kinh tế"] && "object" == typeof t["Kinh tế"]) || (t["Kinh tế"] = {});
        for (const e of ["Lưu thủy", "Lưu thủy lương thảo", "流水", "粮秣流水"])
          Object.hasOwn(t["Kinh tế"], e) && (delete t["Kinh tế"][e], (n = !0));
        for (const e of Object.values(t["Mạng lưới quan hệ"]?.["Tư duy"] || t.人际网络?.私帷 || {})) {
          const repro = e?.["Sinh dục"] || e?.生育;
          repro &&
            "object" == typeof repro &&
            (null == repro["Phải xử nữ không"] && null == repro.是否处女 && ((repro["Phải xử nữ không"] = !0), (n = !0)),
            null == repro["Số lần đồng phòng"] && null == repro.同房次数 && ((repro["Số lần đồng phòng"] = 0), (n = !0)));
        }
        return (n && e.militaryOperations++, n);
      })(t, e) || n),
    (n =
      (function (t, e) {
        const n = t["Thế giới vận hành"] || t.世界运转;
        if (!n || "object" != typeof n) return !1;
        const o = b(n["Ngày hiện tại"] || n.当前日期);
        return !(
          !o ||
          n["Năm Công nguyên"] === o ||
          ((n["Năm Công nguyên"] = o), e.gregorianYear++, 0)
        );
      })(t, e) || n),
    (n = S(t, e) || n),
    n
  );
}
async function N() {
  "function" == typeof waitGlobalInitialized &&
    (await waitGlobalInitialized("Mvu"));
  const t = getVariables({ type: "chat" }) || {};
  if (Number(t[o]) >= 8) return;
  const e = (function () {
      const t = globalThis.getLastMessageId ?? window.parent?.getLastMessageId;
      if ("function" != typeof t) return null;
      try {
        return t();
      } catch {
        return null;
      }
    })(),
    n = Number.isFinite(e) ? e : null;
  if (null == n || n < 0) return;
  const r = {
    messages: 0,
    situation: 0,
    duty: 0,
    privateRelation: 0,
    privateLoyalty: 0,
    generalLoyalty: 0,
    historyType: 0,
    mapOwnership: 0,
    reproductive: 0,
    militaryOperations: 0,
    gregorianYear: 0,
    technologyStatus: 0,
    leanVariables: 0,
    failedMessages: 0,
  };
  for (let t = 0; t <= n; t++)
    try {
      const e = getVariables({ type: "message", message_id: t });
      if (!v(_.get(e, "stat_data"), r)) continue;
      (replaceVariables(e, { type: "message", message_id: t }), r.messages++);
    } catch (e) {
      (r.failedMessages++, console.warn(`[Tương thích bản lưu cũ] Chuyển đổi dữ liệu tầng tin nhắn thứ ${t} thất bại`, e));
    }
  0 === r.failedMessages
    ? (insertOrAssignVariables({ [o]: 8 }, { type: "chat" }),
      r.messages > 0 && console.info("[Tương thích bản lưu cũ] Hoàn tất chuyển đổi", r))
    : console.warn(
        `[Tương thích bản lưu cũ] Có ${r.failedMessages} tầng tin nhắn chuyển đổi thất bại, sẽ thử lại trong lần tải tiếp theo`,
        r,
      );
}
$(() => {
  N().catch((t) => console.error("[Tương thích bản lưu cũ] Chuyển đổi thất bại", t));
});