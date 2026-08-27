const n = YAML,
  t = Object.freeze({
    "Sùng Trinh": { code: "CZ", offset: 1627 },
    "Hoằng Quang": { code: "HG", offset: 1644 },
    "Long Vũ": { code: "LW", offset: 1644 },
    "Thiệu Vũ": { code: "SW", offset: 1645 },
    "Vĩnh Lịch": { code: "YL", offset: 1646 },
    "Thuận Trị": { code: "SZ", offset: 1643 },
    "Lỗ Giám quốc": { code: "LJ", offset: 1645 },
    "Giám quốc Lỗ": { code: "LJ", offset: 1645 },
    "崇祯": { code: "CZ", offset: 1627 },
    "弘光": { code: "HG", offset: 1644 },
    "隆武": { code: "LW", offset: 1644 },
    "绍武": { code: "SW", offset: 1645 },
    "永历": { code: "YL", offset: 1646 },
    "顺治": { code: "SZ", offset: 1643 },
    "监国鲁": { code: "LJ", offset: 1645 },
    "鲁监国": { code: "LJ", offset: 1645 },
  }),
  e = {
    CZ: { name: "Sùng Trinh", offset: 1627 },
    HG: { name: "Hoằng Quang", offset: 1644 },
    LW: { name: "Long Vũ", offset: 1644 },
    SW: { name: "Thiệu Vũ", offset: 1645 },
    YL: { name: "Vĩnh Lịch", offset: 1646 },
    SZ: { name: "Thuận Trị", offset: 1643 },
    LJ: { name: "Lỗ Giám quốc", offset: 1645 },
  },
  numDict = {
    "0": 0, "1": 1, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "10": 10,
    "không": 0, "linh": 0, "nhất": 1, "mốt": 1, "một": 1, "nguyên": 1,
    "hai": 2, "nhị": 2,
    "ba": 3, "tam": 3,
    "bốn": 4, "tư": 4, "tứ": 4,
    "năm": 5, "lăm": 5, "ngũ": 5,
    "sáu": 6, "lục": 6,
    "bảy": 7, "bẩy": 7, "thất": 7,
    "tám": 8, "bát": 8,
    "chín": 9, "cửu": 9,
    "mười": 10, "thập": 10,
    "零": 0, "〇": 0, "一": 1, "二": 2, "两": 2, "三": 3, "四": 4, "五": 5,
    "六": 6, "七": 7, "八": 8, "九": 9, "十": 10, "元": 1
  };

function r(n) {
  if (!n) return NaN;
  let s = String(n).trim().toLowerCase();
  s = s.replace(/^(mùng|ngày|thứ|sơ|初|第)\s*/i, "");
  s = s.replace(/(?:ngày|nhật|日)$/i, "").trim();

  if (/^\d+$/.test(s)) return Number(s);
  if (numDict[s] !== undefined) return numDict[s];

  if (s.startsWith("廿")) return 20 + (numDict[s[1]] ?? 0);
  if (s.startsWith("卅")) return 30 + (numDict[s[1]] ?? 0);
  if (s.includes("十")) {
    const [ten, unit] = s.split("十");
    return 10 * (ten ? (numDict[ten] ?? 1) : 1) + (unit ? (numDict[unit] ?? 0) : 0);
  }

  if (/^hai\s*mươi/i.test(s)) {
    const rem = s.replace(/^hai\s*mươi\s*/i, "").trim();
    return 20 + (numDict[rem] ?? (rem ? r(rem) : 0));
  }
  if (/^ba\s*mươi/i.test(s)) {
    const rem = s.replace(/^ba\s*mươi\s*/i, "").trim();
    return 30 + (numDict[rem] ?? (rem ? r(rem) : 0));
  }
  if (/^mười/i.test(s)) {
    const rem = s.replace(/^mười\s*/i, "").trim();
    return 10 + (numDict[rem] ?? (rem ? r(rem) : 0));
  }

  if ([...s].every((c) => c in numDict)) {
    return Number([...s].map((c) => numDict[c]).join(""));
  }

  return NaN;
}

function o(n) {
  if (!n) return NaN;
  let s = String(n).trim().toLowerCase();
  s = s.replace(/^(nhuận|閏|闰)\s*/i, "");
  s = s.replace(/^(tháng|tháng\s*thứ)\s*/i, "");
  s = s.replace(/月$/, "").trim();
  if (s === "giêng" || s === "chính" || s === "正") return 1;
  if (s === "đông" || s === "mười một" || s === "thập nhất" || s === "冬") return 11;
  if (s === "chạp" || s === "mười hai" || s === "thập nhị" || s === "腊") return 12;
  return r(s);
}

function i({ gregorianYear: n, month: t, day: e }) {
  return 31 * (13 * n + t) + e;
}

function a(n) {
  let raw = String(n ?? "").trim();
  if (!raw) return null;
  raw = raw.replace(/\s+/g, " ");

  // 1. Mã định danh tắt: CZ7-3-1, HG1-5-15
  const matchCode = raw.match(/^(CZ|HG|LW|SW|YL|SZ|LJ)(\d+)-(\d+)-(\d+)$/i);
  if (matchCode) {
    const [, code, y, m, d] = matchCode;
    const c = e[code.toUpperCase()];
    const res = {
      reign: c.name,
      year: Number(y),
      gregorianYear: c.offset + Number(y),
      month: Number(m),
      day: Number(d),
      raw: raw,
    };
    return { ...res, ordinal: i(res) };
  }

  // 2. Định dạng chuẩn CE: CE1634-3-1
  const matchCE = raw.match(/^CE(\d{4})-(\d{1,2})-(\d{1,2})$/i);
  if (matchCE) {
    const [, y, m, d] = matchCE;
    const res = {
      reign: "Công nguyên",
      year: Number(y),
      gregorianYear: Number(y),
      month: Number(m),
      day: Number(d),
      raw: raw,
    };
    return { ...res, ordinal: i(res) };
  }

  // 3. Công nguyên tiếng Việt / Hán: "Năm Công nguyên 1634 tháng 3 mùng 1" / "Công nguyên 1634 mùng 1 tháng 3"
  const matchCN = raw.match(
    /^(?:Công\s*nguyên|Năm\s*Công\s*nguyên|公元)\s*(?:năm\s*)?(\d{4})\s*(?:năm|年)?\s*(.*)$/i,
  );
  if (matchCN) {
    const gYear = Number(matchCN[1]);
    let rest = matchCN[2].trim();
    let month = NaN, day = 1;

    const dPos = rest.search(/(?:mùng|ngày|初)/i);
    const mPos = rest.search(/(?:tháng|月)/i);

    if (dPos !== -1 && mPos !== -1) {
      if (dPos < mPos) {
        const dPart = rest.slice(dPos, mPos).replace(/(?:mùng|ngày|初)/i, "").trim();
        const mPart = rest.slice(mPos).replace(/(?:tháng|月)/i, "").replace(/(?:ngày|nhật|日)$/i, "").trim();
        day = r(dPart);
        month = o(mPart);
      } else {
        const mPart = rest.slice(mPos, dPos).replace(/(?:tháng|月)/i, "").trim();
        const dPart = rest.slice(dPos).replace(/(?:mùng|ngày|初)/i, "").replace(/(?:ngày|nhật|日)$/i, "").trim();
        month = o(mPart);
        day = r(dPart);
      }
    } else if (mPos !== -1) {
      const mPart = rest.slice(mPos).replace(/(?:tháng|月)/i, "").trim();
      month = o(mPart);
    }

    if ([gYear, month, day].every(Number.isFinite)) {
      const res = { reign: "Công nguyên", year: gYear, gregorianYear: gYear, month, day, raw };
      return { ...res, ordinal: i(res) };
    }
  }

  // 4. Niên hiệu tiếng Việt / Hán: "Sùng Trinh năm thứ bảy mùng một tháng ba" / "崇祯七年三月初一日"
  const reignNames = Object.keys(t).sort((x, y) => y.length - x.length);
  const matchedReign = reignNames.find((rn) => raw.startsWith(rn));

  if (matchedReign) {
    const reignInfo = t[matchedReign];
    let sub = raw.slice(matchedReign.length).trim();
    let year = 1, month = NaN, day = 1;

    // Phân tích Hán văn: vd "七年三月初一日"
    const zhMatch = sub.match(
      /^([元一二两三四五六七八九十百〇零\d]+)年(?:(?:闰)?(正|冬|腊|[一二两三四五六七八九十〇零\d]+))月(?:(?:初)?([一二两三四五六七八九十廿卅〇零\d]+))?(?:日)?$/,
    );
    if (zhMatch) {
      year = r(zhMatch[1]);
      month = o(zhMatch[2]);
      day = zhMatch[3] ? r(zhMatch[3]) : 1;
    } else {
      // Phân tích Việt văn
      const yearMatch = sub.match(/^(?:năm\s*thứ|năm)\s*([^\s]+)/i);
      if (yearMatch) {
        year = r(yearMatch[1]);
        sub = sub.slice(yearMatch[0].length).trim();
      }

      const dPos = sub.search(/(?:mùng|ngày|初)/i);
      const mPos = sub.search(/(?:tháng|月)/i);

      if (dPos !== -1 && mPos !== -1) {
        if (dPos < mPos) {
          // "mùng một tháng ba"
          const dPart = sub.slice(dPos, mPos).replace(/(?:mùng|ngày|初)/i, "").trim();
          const mPart = sub.slice(mPos).replace(/(?:tháng|月)/i, "").trim();
          day = r(dPart);
          month = o(mPart);
        } else {
          // "tháng bảy mùng năm"
          const mPart = sub.slice(mPos, dPos).replace(/(?:tháng|月)/i, "").trim();
          const dPart = sub.slice(dPos).replace(/(?:mùng|ngày|初)/i, "").trim();
          month = o(mPart);
          day = r(dPart);
        }
      } else if (mPos !== -1) {
        // "tháng bảy"
        const mPart = sub.slice(mPos).replace(/(?:tháng|月)/i, "").trim();
        month = o(mPart);
        day = 1;
      }
    }

    if ([year, month, day].every(Number.isFinite)) {
      const res = {
        reign: matchedReign,
        year,
        gregorianYear: reignInfo.offset + year,
        month,
        day,
        raw,
      };
      return { ...res, ordinal: i(res) };
    }
  }

  return null;
}

function c(n, t, e) {
  const val = n?.[t] ?? (
    "起始" === t ? (n?.["Bắt đầu"] ?? n?.起始) :
    "结束" === t ? (n?.["Kết thúc"] ?? n?.结束) :
    "余波至" === t ? (n?.["Dư ba chí"] ?? n?.余波至) : void 0
  );
  return a(val)?.ordinal ?? e;
}

function s(n, t) {
  const e = String(t ?? "").replace(/\s+/g, "");
  const locList = n?.["Địa khu"] ?? n?.地区 ?? [];
  return e &&
    locList.some((n) => {
      const t = String(n).replace(/\s+/g, "");
      return t && (e.includes(t) || t.includes(e));
    })
    ? 120
    : 0;
}

function u(n, t, e) {
  return n.sort((n, r) => {
    const nImportance = Number(n.event?.["Mức độ quan trọng"] ?? n.event?.重要度 ?? 1),
      rImportance = Number(r.event?.["Mức độ quan trọng"] ?? r.event?.重要度 ?? 1),
      o = 100 * nImportance + s(n.event, e);
    return (
      100 * rImportance + s(r.event, e) - o ||
      Math.abs(n.from - t) - Math.abs(r.from - t)
    );
  });
}

function f(n, t = !1) {
  const e = n.event,
    r = String(e?.["Sự kiện"] ?? e?.事件 ?? "")
      .trim()
      .replace(/[。；;]+$/, ""),
    o = String(e?.["Ảnh hưởng"] ?? e?.影响 ?? "")
      .trim()
      .replace(/[。；;]+$/, "");
  return t
    ? `- Nếu tiền đề không đổi, có thể xuất hiện: ${r}。Có thể ảnh hưởng: ${o}。`
    : `- ${r}${o ? `；${o}` : ""}。`;
}

function l(n, t, e = {}) {
  const r = a(t),
    o = (function (n, t, e = {}) {
      const r = "string" == typeof t ? a(t) : t;
      if (!r?.ordinal) return { current: [], aftermath: [], upcoming: [] };
      const o = n?.["Tàn Minh lịch sử đương án"] ?? n?.残明历史档案 ?? n,
        i = Array.isArray(o?.["Sự kiện"]) ? o["Sự kiện"] : Array.isArray(o?.事件) ? o.事件 : [],
        s = Number(e.previewDays ?? 40),
        f = { current: [], aftermath: [], upcoming: [] };
      for (const n of i) {
        const t = c(n, "起始", NaN);
        if (!Number.isFinite(t)) continue;
        const e = c(n, "结束", t),
          o = c(n, "余波至", e),
          i = { event: n, from: t, until: e, aftermathUntil: o };
        t <= r.ordinal && r.ordinal <= e
          ? f.current.push(i)
          : e < r.ordinal && r.ordinal <= o
            ? f.aftermath.push(i)
            : r.ordinal < t && t - r.ordinal <= s && f.upcoming.push(i);
      }
      const l = e.location ?? "";
      return {
        current: u(f.current, r.ordinal, l).slice(0, 3),
        aftermath: u(f.aftermath, r.ordinal, l).slice(0, 2),
        upcoming: u(f.upcoming, r.ordinal, l).slice(0, 1),
      };
    })(n, t, e),
    i = [
      ["Thái thế hiện tại", o.current],
      ["Dư chấn gần đây", o.aftermath],
      ["Mốc sự kiện sắp tới", o.upcoming],
    ].filter(([, n]) => n.length > 0);
  if (0 === i.length) return "";
  const s = r?.gregorianYear || Number(e.gregorianYear) || "",
    l = [
      `【Tham khảo thái thế lịch sử｜${s ? `Năm Công nguyên ${s}` : "Chưa ghi năm Công nguyên"}｜${t}】`,
      "Chỉ dùng làm hướng phát triển mặc định khi chưa bị can thiệp; ưu tiên cốt truyện và biến số đã xác lập, không được cưỡng ép kéo về lịch sử thực. Mô hình biết chuyện không đồng nghĩa với NPC biết chuyện, nhân vật không được phép tiên tri các mốc sự kiện tương lai mà không có nguồn tin; sự kiện phương xa phải thông qua dịch trạm, công văn hoặc tin đồn truyền đến có độ trễ.",
    ],
    m = Number(e.maxChars ?? 460);
  let d = l.join("\n");
  for (const [n, t] of i) {
    const e = t.map((t) => f(t, "Mốc sự kiện sắp tới" === n || "临近节点" === n));
    let r = !1;
    for (const t of e) {
      const e = r ? "\n" : `\n${n}：\n`;
      (d + e + t).length > m || ((d += e + t), (r = !0));
    }
  }
  return d;
}

(() => {
  const t = "__CMYJTimelineV18",
    e = "cmyj-timeline-context-v1",
    rPrimary = "[timeline_archive]Tàn Minh lịch sử đương án",
    rFallback = "[timeline_archive]残明历史档案",
    o = (() => {
      try {
        return window.parent && window.parent !== window
          ? window.parent
          : window;
      } catch {
        return window;
      }
    })();
  if (o[t]?.mounted) return;
  const i = { mounted: !0, archive: null, worldbookName: "", lastWarning: "" };

  function a(n) {
    return globalThis[n] ?? o?.[n];
  }

  function c() {
    try {
      a("uninjectPrompts")?.([e]);
    } catch {}
  }

  async function s() {
    const t = (function () {
        const n = a("getChatMessages");
        if ("function" != typeof n) return null;
        const t =
          n("0-{{lastMessageId}}", { role: "assistant", include_swipes: !1 }) ??
          [];
        for (let n = t.length - 1; n >= 0; n -= 1) {
          const e = t[n];
          try {
            const n = a("Mvu")?.getMvuData?.({
              type: "message",
              message_id: Number(e.message_id),
            });
            if (n?.stat_data) return n.stat_data;
          } catch {}
          if (e?.data?.stat_data) return e.data.stat_data;
        }
        return null;
      })(),
      curDate = t?.["Thế giới vận hành"]?.["Ngày hiện tại"] ?? t?.世界运转?.当前日期,
      curYear = t?.["Thế giới vận hành"]?.["Năm Công nguyên"] ?? t?.世界运转?.公元年份,
      curLoc = t?.["Thế giới vận hành"]?.["Địa điểm hiện tại"] ?? t?.世界运转?.当前地点,
      o = String(curDate ?? "").trim();
    if (o)
      try {
        const s = l(
          await (async function () {
            if (i.archive) return i.archive;
            const t = a("getCharWorldbookNames"),
              e = a("getWorldbook");
            if ("function" != typeof t || "function" != typeof e)
              throw new Error("Giao diện Sách thế giới không khả dụng.");
            const o = t("current"),
              c = [o?.primary, ...(o?.additional ?? [])].filter(Boolean);
            for (const t of c) {
              const bookEntries = (await e(t)) ?? [],
                found = bookEntries.find((n) => n?.name === rPrimary || n?.name === rFallback);
              if (!found?.content) continue;
              const a = n.parse(found.content);
              const events = a?.["Tàn Minh lịch sử đương án"]?.["Sự kiện"] ?? a?.残明历史档案?.事件;
              if (!Array.isArray(events))
                throw new Error("Định dạng hồ sơ lịch sử không chính xác.");
              return ((i.archive = a), (i.worldbookName = t), a);
            }
            throw new Error(`Không tìm thấy mục「${rPrimary}」hoặc「${rFallback}」.`);
          })(),
          o,
          {
            gregorianYear: curYear,
            location: curLoc ?? "",
            previewDays: 40,
            maxChars: 460,
          },
        );
        if ((c(), !s)) return;
        const u = a("injectPrompts");
        if ("function" != typeof u) throw new Error("Giao diện tiêm prompt không khả dụng.");
        (u([
          {
            id: e,
            position: "in_chat",
            depth: 0,
            role: "system",
            content: s,
            should_scan: !1,
          },
        ]),
          (i.lastWarning = ""));
      } catch (n) {
        (c(),
          (function (n, t) {
            i.lastWarning !== n &&
              ((i.lastWarning = n),
              console.warn(`[Tàn Minh Dư Tẫn 1.9 Dòng thời gian] ${n}`, t ?? ""));
          })(n?.message || "Tiêm dòng thời gian thất bại.", n));
      }
    else c();
  }

  function u() {
    ((i.archive = null), (i.worldbookName = ""));
  }

  ((o[t] = i),
    $(() => {
      (!(function () {
        const n = a("eventOn"),
          t = globalThis.tavern_events ?? o.tavern_events;
        if ("function" != typeof n || !t) return;
        (n(t.GENERATION_AFTER_COMMANDS, (n, t, e) => (e ? void 0 : s())),
          n(t.CHAT_CHANGED, () => {
            (c(),
              u(),
              setTimeout(() => {
                s();
              }, 150));
          }),
          n(t.MESSAGE_SWIPED, () => {
            s();
          }),
          n(t.MESSAGE_EDITED, () => {
            s();
          }),
          n(t.MESSAGE_DELETED, () => {
            s();
          }),
          n(t.WORLDINFO_UPDATED, (n) => {
            (i.worldbookName && n !== i.worldbookName) || (u(), s());
          }));
        const e = a("Mvu");
        e?.events?.VARIABLE_UPDATE_ENDED &&
          n(e.events.VARIABLE_UPDATE_ENDED, () => {
            s();
          });
      })(),
        s(),
        console.info("[Tàn Minh Dư Tẫn 1.9 Dòng thời gian] Đã kích hoạt tiêm thái thế lịch sử theo ngày tháng."));
    }),
    $(window).on("pagehide", c));
})();
//# sourceMappingURL=index.js.map