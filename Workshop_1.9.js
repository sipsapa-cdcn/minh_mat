Vue;
(() => {
  const e = "https://cm-yj-workshop.canming-cloud.workers.dev",
    t = "canming-workshop-package",
    a = "canming-workshop-root",
    r = "canming-workshop:token",
    i = "canming-workshop:user",
    o = "canming-workshop-1.9:publish-v3",
    n = "canming-workshop:pending-auth",
    s = {
      character: ["Hồ sơ nhân vật", "Tư liệu nhân vật, lập hội và các mục liên kết"],
      worldbook: ["Mục Thế Giới Thư", "Bảo toàn hoàn chỉnh từ khóa, đèn xanh đỏ và cấu hình chèn"],
      generator: ["Vạn tượng sinh thành khí", "Chia sẻ định nghĩa bộ sinh tùy chỉnh, không còn phụ thuộc xuất nhập tệp"],
      scenario: ["Danh phận DLC", "Lời mở đầu, biến khởi đầu, danh phận nhân vật chính và Thế Giới Thư quan hệ"],
      regex: ["Quy tắc Regex", "Sau khi tải về có thể nhập vào thẻ nhân vật hiện tại"],
      script: ["Kịch bản thẻ nhân vật", "Mặc định tắt, cần người dùng xác nhận để kích hoạt"],
      "fengyue-item": ["Vật phẩm Phong Nguyệt Các", "Vật phẩm tùy chỉnh, sau khi tải về sẽ vào kệ Tàng phẩm đám mây"],
      collection: ["Hợp tập", "Nhiều tài nguyên được tập hợp cùng phát hành thành một tác phẩm"],
    },
    l = [
      "Nhân vật",
      "Thế lực",
      "Địa điểm",
      "Vật phẩm",
      "Sự kiện",
      "Thiết lập lịch sử",
      "Quy tắc thế giới",
      "Mở rộng cốt truyện",
      "Làm đẹp giao diện",
      "Công cụ chức năng",
    ];
  let d,
    c,
    p = {},
    u = document,
    m = "discover",
    g = 1,
    b = null,
    h = "",
    f = !1,
    x = "";
  const v = (e) =>
      String(e ?? "").replace(
        /[&<>"']/g,
        (e) =>
          ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;",
          })[e],
      ),
    w = () => {
      try {
        return (window.parent || window).localStorage;
      } catch {}
      try {
        return u.defaultView?.localStorage || localStorage;
      } catch {
        return localStorage;
      }
    },
    y = () => {
      try {
        let e = JSON.parse(w().getItem(i) || "null");
        return e?.verified ? e : null;
      } catch {
        return null;
      }
    },
    k = (e, t = "info") => p.toast?.(e, t),
    S = (e) => s[e]?.[0] || "Tài nguyên",
    C = () => w().setItem(o, JSON.stringify({ ...c, bundle: null }));
  async function I(t, a = {}) {
    let i = {
        ...(a.body ? { "content-type": "application/json" } : {}),
        ...(a.headers || {}),
      },
      o = w().getItem(r);
    o && (i.authorization = `Bearer ${o}`);
    let n = await fetch(e + t, { ...a, headers: i }),
      s = await n.json().catch(() => ({}));
    if (!n.ok) {
      let e = Object.assign(Error(s.error || `Yêu cầu thất bại (${n.status})`), {
        status: n.status,
      });
      throw (401 === n.status && o && !t.startsWith("/api/auth/") && qt(), e);
    }
    return s;
  }
  function E(e) {
    if (
      !e ||
      e.format !== t ||
      2 !== e.version ||
      !Array.isArray(e.resources) ||
      !e.resources.length
    )
      throw Error("Gói tác phẩm không hợp lệ.");
    return e;
  }
  function T(e) {
    let t = y(),
      r = t?.global_name || t?.username || "Đăng nhập Discord",
      i = t?.avatar_url ? `<img src="${v(t.avatar_url)}">` : v(r[0]);
    d.innerHTML = `<style>#${a}{position:absolute;inset:0;z-index:31;overflow:hidden;color:var(--ink);font:14px/1.65 "Noto Serif SC","Songti SC","STSong",serif;background:linear-gradient(145deg,var(--paper),var(--paper2))}#${a}*{box-sizing:border-box}#${a} button,#${a} input,#${a} textarea,#${a} select{font:inherit}.shell{height:100%;display:grid;grid-template-rows:68px minmax(0,1fr);background:radial-gradient(circle at 87% 7%,color-mix(in srgb,var(--accent) 14%,transparent),transparent 29%),linear-gradient(145deg,var(--paper),var(--paper2))}.head{z-index:2;display:grid;grid-template-columns:minmax(170px,1fr) auto minmax(170px,1fr);align-items:center;gap:14px;padding:0 20px;border-bottom:1px solid var(--line);background:color-mix(in srgb,var(--paper) 88%,transparent);backdrop-filter:blur(18px)}.brand{display:flex;align-items:center;gap:10px}.seal{display:grid;place-items:center;width:38px;height:38px;border-radius:9px;color:#fff4df;background:var(--accent);box-shadow:0 8px 24px color-mix(in srgb,var(--accent) 28%,transparent);font-style:normal;font-size:19px;font-weight:900;transform:rotate(-2deg)}.brand b{display:block;font-size:16px;letter-spacing:.08em}.muted,.brand small{color:var(--muted);font-size:10px;letter-spacing:.08em}.nav{display:flex;gap:3px;padding:5px;border:1px solid var(--line);border-radius:999px;background:color-mix(in srgb,var(--card) 62%,transparent)}.nav button{border:0;border-radius:999px;padding:8px 17px;color:var(--muted);background:transparent;cursor:pointer}.nav .on,.primary{color:#fff!important;background:var(--accent)!important;border-color:var(--accent)!important;box-shadow:0 7px 18px color-mix(in srgb,var(--accent) 25%,transparent)}.head-actions{display:flex;justify-content:flex-end;gap:8px}.account,.btn{border:1px solid var(--line);border-radius:11px;color:inherit;background:var(--card);cursor:pointer;transition:.18s}.account{display:flex;align-items:center;gap:8px;padding:3px 10px 3px 4px;border-radius:999px}.btn{padding:9px 12px}.account:hover,.btn:hover,.card:hover{transform:translateY(-2px);border-color:color-mix(in srgb,var(--accent) 62%,var(--line))}.avatar{display:grid;place-items:center;overflow:hidden;width:32px;height:32px;border-radius:50%;color:#fff4df;background:var(--accent);font-style:normal;font-weight:800}.avatar img{width:100%;height:100%;object-fit:cover}.main{overflow:auto;padding:28px clamp(16px,4vw,58px) 48px}.page{width:min(1180px,100%);margin:auto}.eyebrow{margin:0;color:var(--accent);font-size:10px;letter-spacing:.28em}.title{display:flex;justify-content:space-between;align-items:end;gap:18px;margin:0 0 16px}.title h1{margin:4px 0 0;font-size:clamp(25px,3vw,39px);line-height:1.2}.hero{position:relative;display:grid;grid-template-columns:1.05fr .95fr;overflow:hidden;min-height:300px;border:1px solid var(--line);border-radius:28px;background:linear-gradient(118deg,color-mix(in srgb,var(--card) 94%,transparent),color-mix(in srgb,var(--accent) 11%,var(--paper2)));box-shadow:0 26px 70px color-mix(in srgb,var(--ink) 14%,transparent)}.hero-copy{padding:42px}.hero h1{margin:12px 0 17px;font-size:clamp(38px,5.5vw,68px);line-height:1.08;letter-spacing:.08em}.hero em{color:var(--accent);font-style:normal}.hero p{max-width:590px;margin:0;color:var(--muted)}.hero-art{position:relative;background:linear-gradient(150deg,transparent 0 44%,color-mix(in srgb,var(--accent) 14%,var(--paper2)) 44% 61%,color-mix(in srgb,var(--muted) 35%,var(--paper2)) 61%)}.hero-art:before{content:"";position:absolute;right:18%;top:18%;width:105px;height:105px;border-radius:50%;background:radial-gradient(circle at 35% 28%,#fff2c8,var(--accent));box-shadow:0 0 55px color-mix(in srgb,var(--accent) 38%,transparent)}.hero-art:after{content:"Nhập tàng";position:absolute;right:12%;bottom:14%;padding:8px;border:3px solid var(--accent);color:var(--accent);font-weight:800;letter-spacing:.14em;transform:rotate(-8deg)}.row,.bar{display:flex;gap:8px;align-items:center;flex-wrap:wrap}.row{margin-top:20px}.bar{margin-bottom:15px}.input,.select,.area{border:1px solid var(--line);border-radius:11px;padding:9px 12px;color:var(--ink);background:var(--card)}.input{flex:1;min-width:170px}.select{min-width:130px}.area{width:100%;min-height:110px;resize:vertical}.grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px}.card{overflow:hidden;border:1px solid var(--line);border-radius:18px;background:var(--card);box-shadow:0 14px 36px color-mix(in srgb,var(--ink) 9%,transparent);cursor:pointer;transition:.18s}.cover{height:118px;background:linear-gradient(135deg,color-mix(in srgb,var(--accent) 20%,var(--paper2)),color-mix(in srgb,var(--ink) 25%,var(--paper2)))}.card-body{padding:15px}.card-top{display:flex;justify-content:space-between;color:var(--accent);font-size:10px}.card h3{margin:7px 0 6px;font-size:17px}.card p{height:44px;overflow:hidden;margin:0;color:var(--muted);font-size:12px}.tag{display:inline-flex;margin:9px 3px 0 0;padding:1px 7px;border:1px solid var(--line);border-radius:999px;color:var(--muted);font-size:10px}.publish{max-width:860px}.steps{display:flex;gap:7px;margin-bottom:20px}.step{display:grid;place-items:center;width:27px;height:27px;border:1px solid var(--line);border-radius:50%;color:var(--muted);font-size:11px}.step.on{color:#fff;background:var(--accent);border-color:var(--accent)}.sheet{padding:25px;border:1px solid var(--line);border-radius:20px;background:color-mix(in srgb,var(--card) 92%,transparent);box-shadow:0 18px 46px color-mix(in srgb,var(--ink) 8%,transparent)}.types{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:11px}.kind{position:relative;min-height:102px;padding:17px;text-align:left;border:1px solid var(--line);border-radius:14px;color:inherit;background:var(--paper2);cursor:pointer}.kind b{display:block;margin-bottom:7px;font-size:16px}.kind small{color:var(--muted);font-size:11px}.kind.on{border-color:var(--accent);background:color-mix(in srgb,var(--accent) 9%,var(--card))}.kind.on:after{content:"Đã chọn";position:absolute;right:12px;top:10px;color:var(--accent);font-size:10px}.choice{display:flex;gap:10px;padding:12px 3px;border-bottom:1px dashed var(--line)}.choice span{flex:1}.choice b{display:block}.choice small{color:var(--muted);font-size:11px}.config{display:flex;gap:4px;flex-wrap:wrap;margin-top:5px}.config i{padding:1px 5px;border-radius:4px;color:var(--muted);background:var(--paper2);font-size:9px;font-style:normal}.field{display:grid;gap:6px;margin-top:13px;color:var(--accent)}.field span{font-size:12px}.two{display:grid;grid-template-columns:1fr 130px;gap:10px}.manifest{margin:0;padding:0;list-style:none;border:1px solid var(--line);border-radius:12px;background:color-mix(in srgb,var(--paper2) 45%,transparent)}.manifest li{padding:10px 13px;border-bottom:1px solid var(--line)}.manifest li:last-child{border:0}.note{margin-top:14px;padding:12px;border-left:3px solid var(--accent);border-radius:7px;background:color-mix(in srgb,var(--accent) 7%,transparent);color:var(--muted);font-size:12px}.modal{position:absolute;inset:0;z-index:8;display:grid;place-items:center;padding:18px;background:color-mix(in srgb,var(--ink) 66%,transparent);backdrop-filter:blur(8px)}.modal section{width:min(560px,100%);max-height:100%;overflow:auto;padding:24px;border:1px solid color-mix(in srgb,var(--accent) 55%,var(--line));border-radius:20px;background:linear-gradient(145deg,var(--card),var(--paper2))}@media(max-width:980px){.head{grid-template-columns:1fr auto}.nav{position:fixed;left:50%;bottom:12px;z-index:9;transform:translateX(-50%);box-shadow:0 14px 42px color-mix(in srgb,var(--ink) 28%,transparent);backdrop-filter:blur(18px)}.main{padding-bottom:86px}.grid{grid-template-columns:repeat(3,minmax(0,1fr))}}@media(max-width:700px){.head{padding:0 11px}.brand small,.account span{display:none}.hero{grid-template-columns:1fr}.hero-copy{padding:29px}.hero-art{min-height:100px}.hero h1{font-size:39px}.grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.types{grid-template-columns:1fr}.two{grid-template-columns:1fr}.close{display:none}}</style><div class="shell"><header class="head"><div class="brand"><span><b>Vân Đoan Sáng Ý Công Xưởng</b><small>Tàn Minh Dư Tẫn · Loại Não Tàng Các</small></span></div><nav class="nav">${[
      ["discover", "Khám phá"],
      ["catalog", "Phân loại"],
      ["favorites", "Bộ sưu tập"],
      ["publish", "Phát hành"],
    ]
      .map(
        (e) =>
          `<button data-v="${e[0]}" class="${m === e[0] ? "on" : ""}">${e[1]}</button>`,
      )
      .join(
        "",
      )}</nav><div class="head-actions"><button class="account" data-v="account"><i class="avatar">${i}</i><span>${v(r)}</span></button><button class="btn close" data-a="close">×</button></div></header><main class="main">${e}</main></div>`;
  }
  function L(e) {
    return `<article class="card" data-a="detail" data-id="${v(e.id)}"><div class="cover"></div><div class="card-body"><div class="card-top"><span>${v(S(e.type))}</span><span>Tải xuống ${Number(e.downloads || 0)}</span></div><h3>${v(e.title)}</h3><p>${v(e.summary || "Chưa điền thuyết minh tác phẩm")}</p><div>${[
      ...(e.categories || []),
      ...(e.tags || []),
    ]
      .slice(0, 3)
      .map((e) => `<i class="tag">${v(e)}</i>`)
      .join(
        "",
      )}</div><small class="muted">${v(e.author || "Tác giả ẩn danh")}</small></div></article>`;
  }
  async function A() {
    T(
      '<section class="page"><section class="hero"><div class="hero-copy"><p class="eyebrow">CANMING COMMUNITY ARCHIVE</p><h1>Thu thiên hạ <em>dị văn</em><br>Nhập nhất quyển Tàn Minh</h1><p>Tại đây phát hành các nhân vật, điều mục, cấu hình và công cụ có thể tái sử dụng; Hợp tập chỉ phát hành như một tác phẩm duy nhất, khi cài đặt vẫn có thể tùy chọn từng mục.</p><div class="row"><button class="btn primary" data-v="catalog">Duyệt tàng phẩm</button><button class="btn" data-v="publish">Phát hành tác phẩm</button></div></div><div class="hero-art"></div></section><section style="margin-top:34px"><div class="title"><div><p class="eyebrow">NEW ARRIVALS</p><h1>Mới nhập tàng</h1></div></div><div class="grid" data-list>Đang tra duyệt…</div></section></section>',
    );
    try {
      let e = await I("/api/works?page=1&pageSize=8");
      d.querySelector("[data-list]").innerHTML =
        e.items.map(L).join("") || '<p class="muted">Tạm chưa có tác phẩm công khai</p>';
    } catch (e) {
      d.querySelector("[data-list]").textContent = e.message;
    }
  }
  async function j() {
    (T(
      `<section class="page"><div class="title"><div><p class="eyebrow">ARCHIVE INDEX</p><h1>Tra cứu phân loại</h1></div></div><div class="bar"><input class="input" data-q placeholder="Tìm kiếm tác phẩm, tác giả hoặc nhãn"><select class="select" data-t><option value="">Tất cả tài nguyên</option>${Object.keys(
        s,
      )
        .map(
          (e) =>
            `<option value="${e}"${h === e ? " selected" : ""}>${S(e)}</option>`,
        )
        .join(
          "",
        )}</select><select class="select" data-c><option value="">Tất cả phân loại</option>${l.map((e) => `<option>${e}</option>`).join("")}</select><button class="btn primary" data-a="search">Tìm kiếm</button></div><div class="grid" data-list>Đang tra duyệt…</div></section>`,
    ),
      q());
  }
  async function q() {
    try {
      let e = new URLSearchParams({
          page: 1,
          pageSize: 30,
          q: d.querySelector("[data-q]")?.value || "",
          type: d.querySelector("[data-t]")?.value || "",
          category: d.querySelector("[data-c]")?.value || "",
        }),
        t = await I("/api/works?" + e);
      d.querySelector("[data-list]").innerHTML =
        t.items.map(L).join("") || '<p class="muted">Không có tác phẩm phù hợp</p>';
    } catch (e) {
      d.querySelector("[data-list]").textContent = e.message;
    }
  }
  function N(e) {
    let t = e?.strategy?.keys || [];
    return `<span class="config"><i>${v(e?.strategy?.type || "selective")}</i><i>Từ khóa ${t.length}</i><i>${v(e?.position?.type || "Vị trí mặc định")}</i><i>${!1 === e?.enabled ? "Tắt" : "Bật"}</i></span>`;
  }
  async function O(e) {
    if ("fengyue-item" === e)
      return `<div class="note">Nơi này sẽ không đọc kệ hàng hiện có của bạn. Vui lòng tạo vật phẩm mới cần chia sẻ; sau khi người tải cài đặt, vật phẩm mới xuất hiện trên kệ 「Tàng phẩm đám mây」 của Phong Nguyệt Các.</div><label class="field"><span>Tên vật phẩm</span><input class="input" data-item="name" value="${v(c.item.name)}"></label><div class="two"><label class="field"><span>Giá cả</span><input class="input" type="number" min="0" data-item="price" value="${v(c.item.price)}"></label><label class="field"><span>Định danh vật phẩm (Tùy chọn)</span><input class="input" data-item="id" value="${v(c.item.id)}" placeholder="Tự động sinh"></label></div><label class="field"><span>Thuyết minh vật phẩm</span><textarea class="area" data-item="desc">${v(c.item.desc)}</textarea></label>`;
    if ("generator" === e) {
      let e = p.bridge?.getGeneratorWork?.();
      return e
        ? `<div class="note"><b>Hiện có thể phát hành:</b>${v(e.title || e.moduleName || "Kết quả tạo Vạn Tượng")}<br>Sẽ xuất kết quả tạo và toàn bộ cấu hình Thế Giới Thư hoàn chỉnh; không tự động ghi đè Thế Giới Thư của bạn.</div>`
        : '<div class="note">Vui lòng hoàn thành một lần tạo trong Vạn Tượng Sinh Thành Khí trước khi quay lại đây phát hành.</div>';
    }
    let t = await (async function (e) {
        let t = p.bridge || {};
        return "character" === e
          ? (t.listCharacterProfiles?.() || []).map((e) => ({
              id: e.id,
              n: e.name,
              d: `Liên kết ${e.worldbookEntries?.length || 0} mục Thế Giới Thư`,
            }))
          : "worldbook" === e
            ? ((await t.listWorldbookEntries?.()) || []).map((e) => ({
                id: e.name,
                n: e.name,
                d: String(e.content || "")
                  .replace(/\s+/g, " ")
                  .slice(0, 62),
                x: e,
              }))
            : "regex" === e
              ? (t.listRegexes?.() || []).map((e) => ({
                  id: e.id,
                  n: e.script_name,
                  d: e.find_regex || "Quy tắc Regex",
                }))
              : "script" === e
                ? (t.listScripts?.() || []).map((e) => ({
                    id: e.id,
                    n: e.name,
                    d: e.folder || "Thẻ nhân vật hiện tại",
                  }))
                : [];
      })(e),
      a = new Set(c.selected[e] || []),
      r =
        t
          .map(
            (t) =>
              `<label class="choice"><input type="checkbox" data-r="${e}" value="${v(t.id)}" ${a.has(t.id) ? "checked" : ""}><span><b>${v(t.n)}</b><small>${v(t.d)}</small>${"worldbook" === e ? N(t.x) : ""}</span></label>`,
          )
          .join("") || '<p class="muted">Không có nội dung tùy chọn</p>';
    return "worldbook" !== e
      ? r
      : r +
          `<details style="margin-top:16px"><summary>Hoặc tự tạo thủ công một mục Thế Giới Thư</summary><div class="note">Các mục đã chọn sẽ giữ nguyên toàn bộ cấu hình; mục thủ công cũng có thể điền từ khóa và vị trí chèn.</div><label class="field"><span>Tên mục</span><input class="input" data-w="name" value="${v(c.custom.name)}"></label><label class="field"><span>Từ khóa kích hoạt (Phân tách bằng dấu phẩy)</span><input class="input" data-w="keys" value="${v(c.custom.keys)}"></label><label class="field"><span>Vị trí chèn</span><select class="select" data-w="position"><option value="after_character_definition">Sau định nghĩa nhân vật</option><option value="before_character_definition">Trước định nghĩa nhân vật</option><option value="at_depth">Độ sâu chỉ định</option></select></label><label class="field"><span>Chính văn</span><textarea class="area" data-w="content">${v(c.custom.content)}</textarea></label></details>`;
  }
  async function R() {
    T(
      `<section class="page publish"><div class="title"><div><p class="eyebrow">SUBMIT TO THE ARCHIVE</p><h1>Phát hành tác phẩm</h1><span class="muted">${["Chọn hình thức phát hành", "Chọn nội dung", "Kiểm tra kết quả cài đặt", "Điền thông tin phát hành", "Danh mục cài đặt", "Xác nhận nộp"][g - 1]}</span></div><button class="btn" data-a="clear">Xóa bản nháp</button></div><div class="steps">${[1, 2, 3, 4, 5, 6].map((e) => `<i class="step ${e === g ? "on" : ""}">${e}</i>`).join("")}</div><div class="sheet" data-p>Đang chuẩn bị…</div><div class="row"><button class="btn" data-a="back" ${1 === g ? "disabled" : ""}>Bước trước</button><button class="btn primary" data-a="next">${6 === g ? "Xác nhận phát hành" : "Bước tiếp theo"}</button></div></section>`,
    );
    let e = d.querySelector("[data-p]");
    try {
      if (1 === g)
        e.innerHTML = `<div class="types">${Object.entries(s)
          .map(
            ([e, t]) =>
              `<button class="kind ${c.kind === e ? "on" : ""}" data-a="kind" data-kind="${e}"><b>${t[0]}</b><small>${t[1]}</small></button>`,
          )
          .join("")}</div>`;
      else if (2 === g) {
        if (!c.kind) throw Error("Vui lòng chọn hình thức phát hành.");
        let t =
          "collection" === c.kind
            ? ["character", "worldbook", "regex", "script", "fengyue-item"]
            : [c.kind];
        e.innerHTML = (
          await Promise.all(
            t.map(
              async (e) =>
                `<section><p class="eyebrow" style="margin-top:8px">${S(e)}</p>${await O(e)}</section>`,
            ),
          )
        ).join(
          '<hr style="border:0;border-top:1px solid var(--line);margin:22px 0">',
        );
      } else
        e.innerHTML =
          3 === g
            ? `<h2 style="margin-top:0">Kiểm tra trước khi phát hành</h2><ul class="manifest">${M().join("") || "<li>Chưa chọn tài nguyên</li>"}</ul><div class="note">Thế Giới Thư sẽ mang theo toàn bộ thiết lập mục nguyên bản; Kịch bản mặc định đóng và chuyển vào hàng đợi duyệt thủ công; Vật phẩm Phong Nguyệt Các sẽ được thêm mới vào kệ Tàng phẩm đám mây của người tải.</div>`
            : 4 === g
              ? `<label class="field"><span>Tiêu đề</span><input class="input" data-m="title" value="${v(c.meta.title)}"></label><label class="field"><span>Thuyết minh tác phẩm</span><textarea class="area" data-m="summary">${v(c.meta.summary)}</textarea></label><label class="field"><span>Nhãn (Phân tách bằng dấu phẩy)</span><input class="input" data-m="tags" value="${v(c.meta.tags)}"></label><label class="field"><span>Liên kết ảnh bìa (Tùy chọn, HTTP/HTTPS)</span><input class="input" data-m="coverUrl" value="${v(c.meta.coverUrl)}"></label><p>Phân loại nội dung (Tối đa 3 mục)</p>${l.map((e) => `<label class="tag"><input type="checkbox" data-cat="${e}" ${c.meta.categories.includes(e) ? "checked" : ""}>${e}</label>`).join("")}`
              : `<h2 style="margin-top:0">${5 === g ? "Người cài đặt sẽ nhận được" : "Xác nhận phát hành"}</h2><ul class="manifest">${M().join("")}</ul><div class="note">Hợp tập chỉ cần phát hành một lần, người cài đặt vẫn có thể bỏ chọn từng thành phần độc lập.</div>`;
    } catch (t) {
      e.textContent = t.message;
    }
  }
  function M() {
    return (c.bundle?.resources || []).map(
      (e) => `<li><b>${v(e.name)}</b> · ${v(S(e.kind))}</li>`,
    );
  }
  function H() {
    let e = c.custom;
    return e.name && e.content
      ? {
          name: e.name,
          content: e.content,
          enabled: !0,
          strategy: {
            type: "selective",
            keys: e.keys
              .split(/[,，]/)
              .map((e) => e.trim())
              .filter(Boolean),
            keys_secondary: { logic: "and_any", keys: [] },
          },
          position: { type: e.position, role: "system", depth: 0, order: 100 },
          recursion: {
            prevent_incoming: !0,
            prevent_outgoing: !0,
            delay_until: null,
          },
          probability: 100,
          effect: { sticky: null, cooldown: null, delay: null },
        }
      : null;
  }
  async function D(e, t, a) {
    let r = p.bridge || {};
    if ("character" === e) return r.buildCharacterPackage(t[0], a);
    if ("worldbook" === e)
      return H()
        ? r.buildCustomWorldbookPackage(H(), a)
        : r.buildWorldbookPackage(t, a);
    if ("generator" === e) return r.buildGeneratorDefinitionPackage(t, a);
    if ("regex" === e) return r.buildRegexPackage(t, a);
    if ("script" === e) return r.buildScriptPackage(t, a);
    if ("fengyue-item" === e) return r.buildCustomFengyuePackage(c.item, a);
    throw Error("Loại tài nguyên không được hỗ trợ.");
  }
  async function U() {
    let e = {
      ...c.meta,
      tags: c.meta.tags
        .split(/[,，]/)
        .map((e) => e.trim())
        .filter(Boolean),
    };
    if ("collection" !== c.kind)
      return E(await D(c.kind, c.selected[c.kind] || [], e));
    let a = [];
    for (let t of [
      "character",
      "worldbook",
      "scenario",
      "generator",
      "regex",
      "script",
      "fengyue-item",
    ])
      ("fengyue-item" === t
        ? c.item.name
        : "scenario" === t
          ? c.collectionScenarioBundle
          : (c.selected[t] || []).length) &&
        a.push(...(await D(t, c.selected[t] || [], e)).resources);
    if (!a.length) throw Error("Hợp tập cần có ít nhất một tài nguyên.");
    return E({
      format: t,
      version: 2,
      kind: "collection",
      createdAt: new Date().toISOString(),
      metadata: e,
      resources: a,
    });
  }
  async function P(e) {
    T('<p class="page muted">Đang đọc tác phẩm…</p>');
    try {
      b = await I("/api/works/" + encodeURIComponent(e));
      let t = E(b.payload);
      T(
        `<section class="page" style="max-width:900px"><button class="btn" data-v="catalog">← Quay lại phân loại</button><div class="title" style="margin-top:24px"><div><p class="eyebrow">${v(S(b.type))}</p><h1>${v(b.title)}</h1><p class="muted">${v(b.summary || "")}</p></div></div><ul class="manifest">${t.resources.map((e) => `<li><b>${v(e.name)}</b> · ${v(S(e.kind))}</li>`).join("")}</ul><div class="row"><button class="btn primary" data-a="install">Cài đặt tùy chọn</button><button class="btn" data-a="like">♥ ${Number(b.likes || 0)}</button><button class="btn" data-a="favorite">☆ Bộ sưu tập</button></div></section>`,
      );
    } catch (e) {
      T(`<p class="page">${v(e.message)}</p>`);
    }
  }
  function W() {
    let e = E(b.payload);
    d.insertAdjacentHTML(
      "beforeend",
      `<div class="modal"><section><p class="eyebrow">SELECTIVE INSTALL</p><h2>Chọn nội dung muốn cài đặt</h2>${e.resources.map((e, t) => `<label class="choice"><input type="checkbox" data-i="${t}" checked><span><b>${v(e.name)}</b><small>${v(S(e.kind))}</small>${"character" === e.kind ? `<select class="select" data-character-gallery="${t}" aria-label="Quy thuộc Nhân vật chí của ${v(e.name)}"><option value="none"${e.character?.gallery && "none" !== e.character.gallery ? "" : " selected"}>Không đưa vào Nhân vật chí</option><option value="beauties"${"beauties" === e.character?.gallery ? " selected" : ""}>Quần Phương</option><option value="heroes"${"heroes" === e.character?.gallery ? " selected" : ""}>Anh Kiệt</option><option value="beings"${"beings" === e.character?.gallery ? " selected" : ""}>Chúng Sinh</option></select>` : ""}</span></label>`).join("")}<div class="note">Việc nhân vật có đưa vào Nhân vật chí hay không hoàn toàn do bạn quyết định; không đưa vào cũng không ảnh hưởng hồ sơ nhân vật, lập hội hay ảnh minh họa chính văn.</div><div class="row"><button class="btn" data-a="cancel">Hủy bỏ</button><button class="btn primary" data-a="installok">Cài đặt mục đã chọn</button></div></section></div>`,
    );
  }
  async function J() {
    let e = E(b.payload),
      a = [...d.querySelectorAll("[data-i]:checked")].map(
        (t) => e.resources[+t.dataset.i],
      );
    for (let r of a) {
      let a = {
        format: t,
        version: 2,
        kind: r.kind,
        metadata: e.metadata,
        resources: [r],
      };
      "character" === r.kind
        ? await p.bridge.importCharacterPackage(a)
        : "worldbook" === r.kind
          ? await p.bridge.importWorldbookWork(a)
          : "regex" === r.kind
            ? await p.bridge.importRegexes(r.regexes)
            : "script" === r.kind
              ? await p.bridge.importScripts(r.scripts)
              : "fengyue-item" === r.kind &&
                (await p.bridge.importFengyueItems(r.items));
    }
    (d.querySelector(".modal")?.remove(), k(`Đã cài đặt ${a.length} mục`, "ok"));
  }
  function V() {
    let e = y();
    if (!e)
      return T(
        '<section class="page" style="max-width:450px;text-align:center;padding-top:72px"><h1>Vào Vân Đoan Sáng Ý Công Xưởng</h1><p class="muted">Chỉ dành cho người dùng Discord đã xác thực trong máy chủ Loại Não.</p><button class="btn primary" data-a="login">Đăng nhập bằng Discord</button></section>',
      );
    T(
      `<section class="page" style="max-width:540px"><p class="eyebrow">ACCOUNT</p><h1>${v(e.global_name || e.username)}</h1><p class="muted">Loại Não · Đã xác thực</p><button class="btn" data-a="logout">Đăng xuất</button></section>`,
    );
  }
  async function B() {
    return y() || "account" === m
      ? "discover" === m
        ? A()
        : "catalog" === m
          ? j()
          : "favorites" === m
            ? (async function () {
                T(
                  '<section class="page"><div class="title"><div><p class="eyebrow">MY COLLECTION</p><h1>Bộ sưu tập của tôi</h1></div></div><div class="grid" data-list>Đang đọc…</div></section>',
                );
                try {
                  let e = await I("/api/me/favorites?page=1");
                  d.querySelector("[data-list]").innerHTML =
                    e.items.map(L).join("") || '<p class="muted">Tạm chưa có bộ sưu tập</p>';
                } catch (e) {
                  d.querySelector("[data-list]").textContent = e.message;
                }
              })()
            : "publish" === m
              ? R()
              : V()
      : V();
  }
  async function F() {
    let t = u.defaultView || window,
      a = Nt(),
      o = new URL(e).origin,
      n =
        e +
        "/api/auth/discord/launch?origin=" +
        encodeURIComponent(o) +
        "&nonce=" +
        encodeURIComponent(a),
      s = t.parent?.open?.(n, "workshop_discord_auth", "width=500,height=700");
    if (!s) throw Error("Trình duyệt đã chặn cửa sổ ủy quyền.");
    for (let e = 0; e < 600; e++) {
      let e;
      await new Promise((e) => setTimeout(e, 900));
      try {
        e = await I("/api/auth/discord/status?nonce=" + encodeURIComponent(a));
      } catch (e) {
        if (/Phiên ủy quyền không tồn tại hoặc đã nhận|授权会话不存在或已领取/.test(e?.message || "")) continue;
        throw e;
      }
      if ("pending" !== e.status) {
        if (!e.token) throw Error(e.error || "Ủy quyền thất bại.");
        return (
          w().setItem(r, e.token),
          w().setItem(i, JSON.stringify(e.user)),
          (m = "discover"),
          B()
        );
      }
    }
    throw Error("Ủy quyền quá thời gian chờ.");
  }
  async function G() {
    if (!f) {
      x = "";
      try {
        if (1 === g && !c.kind) throw Error("Vui lòng chọn hình thức phát hành.");
        if ((2 === g && (c.bundle = await U()), 4 === g)) {
          if (
            (c.meta.title || (c.meta.title = c.bundle?.metadata?.title || ""),
            !c.meta.title)
          )
            throw Error("Vui lòng điền tiêu đề.");
          if (c.meta.coverUrl && !/^https?:\/\//i.test(c.meta.coverUrl))
            throw Error("Ảnh bìa chỉ hỗ trợ liên kết HTTP/HTTPS.");
          c.bundle = await U();
        }
        if (6 === g) {
          ((f = !0), await R());
          let e = c.bundle ? E(c.bundle) : await U();
          c.bundle = e;
          let t = await I("/api/works", {
            method: "POST",
            body: JSON.stringify({
              type: e.kind,
              module: "character" === e.kind ? "character" : "custom",
              title: c.meta.title || e.metadata.title,
              summary: c.meta.summary,
              tags: e.metadata.tags,
              categories: c.meta.categories,
              coverUrl: c.meta.coverUrl,
              payload: e,
            }),
          });
          return (
            w().removeItem(o),
            (c = {
              kind: "",
              selected: {},
              custom: {
                name: "",
                content: "",
                keys: "",
                position: "after_character_definition",
              },
              worldbookName: "",
              wbQuery: "",
              wbEdits: {},
              item: { name: "", price: 0, desc: "", id: "" },
              meta: {
                title: "",
                summary: "",
                tags: "",
                categories: [],
                coverUrl: "",
              },
              bundle: null,
              collectionScenarioBundle: null,
            }),
            (f = !1),
            k("pending" === t.status ? "Đã gửi phê duyệt" : "Phát hành thành công", "ok"),
            (m = "discover"),
            B()
          );
        }
        (g++, C(), R());
      } catch (e) {
        ((f = !1),
          (x = e?.message || "Gửi thất bại, vui lòng thử lại sau."),
          "publish" === m && (await R()),
          k(x, "err"));
      }
    }
  }
  async function Q(e) {
    let t = e.target.closest("[data-v]");
    if (t) return ((m = t.dataset.v), B());
    let a = e.target.closest("[data-a]");
    if (!a) return;
    let n = a.dataset.a;
    if ("close" === n) return ca();
    if ("search" === n) return q();
    if ("detail" === n) return P(a.dataset.id);
    if ("kind" === n)
      return ((c.kind = a.dataset.kind), (c.selected = {}), C(), R());
    if ("back" === n) return (g--, C(), R());
    if ("next" === n) return G();
    if ("clear" === n)
      return (
        (c = {
          kind: "",
          selected: {},
          custom: {
            name: "",
            content: "",
            keys: "",
            position: "after_character_definition",
          },
          worldbookName: "",
          wbQuery: "",
          wbEdits: {},
          item: { name: "", price: 0, desc: "", id: "" },
          meta: {
            title: "",
            summary: "",
            tags: "",
            categories: [],
            coverUrl: "",
          },
          bundle: null,
          collectionScenarioBundle: null,
        }),
        (g = 1),
        w().removeItem(o),
        R()
      );
    if ("install" === n) return W();
    if ("cancel" === n) return d.querySelector(".modal")?.remove();
    if ("installok" === n)
      try {
        await J();
      } catch (e) {
        k(e.message, "err");
      }
    if ("like" === n || "favorite" === n)
      return (await I(`/api/works/${b.id}/${n}`, { method: "POST" }), P(b.id));
    if ("logout" === n) {
      try {
        await I("/api/auth/logout", { method: "POST" });
      } catch {}
      return (w().removeItem(r), w().removeItem(i), (m = "account"), B());
    }
    if ("login" === n)
      try {
        await F();
      } catch (e) {
        k(e.message, "err");
      }
  }
  function Y(e) {
    let t = e.target;
    if (t.matches("[data-r]")) {
      let e = new Set(c.selected[t.dataset.r] || []);
      (t.checked ? e.add(t.value) : e.delete(t.value),
        (c.selected[t.dataset.r] = [...e]));
    }
    if (
      (t.matches("[data-m]") && (c.meta[t.dataset.m] = t.value),
      t.matches("[data-cat]"))
    ) {
      let e = new Set(c.meta.categories);
      (t.checked ? e.add(t.dataset.cat) : e.delete(t.dataset.cat),
        (c.meta.categories = [...e].slice(0, 3)));
    }
    (t.matches("[data-w]") && (c.custom[t.dataset.w] = t.value),
      t.matches("[data-item]") && (c.item[t.dataset.item] = t.value),
      C());
  }
  let K = new Map();
  async function X() {
    let e = await (p.bridge?.listWorldbooks?.() || []),
      t = p.bridge?.getPrimaryWorldbookName?.() || "",
      a = c.worldbookName || t || e[0] || "";
    a !== c.worldbookName && (c.worldbookName = a);
    let r = (a ? await (p.bridge?.listWorldbookEntries?.(a) || []) : []).map(
      (e) => ({
        id: `${e.__worldbook || a}\0${e.name}`,
        n: e.name,
        d: String(e.content || "")
          .replace(/\s+/g, " ")
          .slice(0, 62),
        x: e,
      }),
    );
    K = new Map(r.map((e) => [e.id, e.x]));
    let i = (c.wbQuery || "").trim().toLocaleLowerCase(),
      o = c.selected.worldbook || [],
      n = i
        ? r
            .filter((e) => `${e.n}\n${e.d}`.toLocaleLowerCase().includes(i))
            .slice(0, 30)
        : [],
      s = o.map((e) => ({ id: e, entry: c.wbEdits[e] })).filter((e) => e.entry);
    return `<div class="note">Hãy chọn Thế Giới Thư trước, sau đó nhập từ khóa để tra cứu điều mục. Khi chưa tìm kiếm sẽ không liệt kê điều mục nào; sau khi chọn mới hiển thị và cho phép sửa đổi cấu hình hoàn chỉnh.</div><div class="bar"><select class="select" data-wbbook>${e.map((e) => `<option value="${v(e)}" ${e === a ? "selected" : ""}>${v(e)}</option>`).join("") || "<option>Không tìm thấy Thế Giới Thư khả dụng</option>"}</select><input class="input" data-wbsearch value="${v(c.wbQuery)}" placeholder="Tìm kiếm tên mục hoặc chính văn trong Thế Giới Thư hiện tại"></div><div class="wb-results">${i ? n.map((e) => `<label class="choice"><input type="checkbox" data-r="worldbook" value="${v(e.id)}" ${o.includes(e.id) ? "checked" : ""}><span><b>${v(e.n)}</b><small>${v(e.d)}</small>${N(e.x)}</span></label>`).join("") || '<p class="muted">Trong Thế Giới Thư hiện tại không có mục phù hợp</p>' : '<p class="muted">Nhập từ khóa để bắt đầu tìm kiếm; hệ thống sẽ không tải trước toàn bộ điều mục.</p>'}</div>${s.length ? `<section class="wb-selected"><p class="eyebrow">Cấu hình mục đã chọn</p>${s.map(({ id: e, entry: t }) => `<details><summary>${v(t.name)} · Nhấp để xem và sửa đổi cấu hình hoàn chỉnh</summary><label class="field"><span>Cấu hình điều mục hoàn chỉnh (JSON)</span><textarea class="area" data-wbjson="${v(e)}">${v(JSON.stringify(t, null, 2))}</textarea></label></details>`).join("")}</section>` : ""}<details class="wb-manual"><summary>Thủ công tạo một mục Thế Giới Thư</summary><div class="note">Có thể dùng cho nội dung chưa có điều mục sẵn; chỉ được chọn phát hành mục đã chọn HOẶC mục thủ công.</div><label class="field"><span>Tên mục</span><input class="input" data-w="name" value="${v(c.custom.name)}"></label><label class="field"><span>Từ khóa kích hoạt (Phân tách bằng dấu phẩy)</span><input class="input" data-w="keys" value="${v(c.custom.keys)}"></label><label class="field"><span>Vị trí chèn</span><select class="select" data-w="position"><option value="after_character_definition">Sau định nghĩa nhân vật</option><option value="before_character_definition">Trước định nghĩa nhân vật</option><option value="at_depth">Độ sâu chỉ định</option></select></label><label class="field"><span>Chính văn</span><textarea class="area" data-w="content">${v(c.custom.content)}</textarea></label></details>`;
  }
  const Z = O,
    ee = (O = async function (e) {
      return "generator" === e
        ? (async function () {
            let e = p.bridge?.listGenerators?.() || [],
              t = new Set(c.selected.generator || []);
            return `<div class="note">Chia sẻ định nghĩa Vạn Tượng Sinh Thành Khí (trường dữ liệu, gợi ý từ và cấu hình), không chứa cài đặt API của bạn, cũng không cần xuất nhập tệp.</div><input class="input" data-gsearch placeholder="Tìm kiếm tên bộ sinh hoặc nhãn"><div data-glist>${
              e
                .slice(0, 30)
                .map(
                  (e) =>
                    `<label class="choice"><input type="checkbox" data-r="generator" value="${v(e.id)}" ${t.has(e.id) ? "checked" : ""}><span><b>${v(e.name || e.tag)}</b><small>${v(e.tag || "Bộ sinh tùy chỉnh")}${e.modified ? " · Đã sửa đổi" : ""}</small></span></label>`,
                )
                .join("") || '<p class="muted">Chưa tạo bộ sinh có thể chia sẻ</p>'
            }</div></div>`;
          })()
        : "worldbook" === e
          ? X()
          : Z(e);
    });
  J = async function () {
    let e = E(b.payload),
      a = [...d.querySelectorAll("[data-i]:checked")].map(
        (t) => e.resources[+t.dataset.i],
      );
    for (let r of a) {
      let a = {
        format: t,
        version: 2,
        kind: r.kind,
        metadata: e.metadata,
        resources: [r],
      };
      "character" === r.kind
        ? await p.bridge.importCharacterPackage(a)
        : "worldbook" === r.kind
          ? await p.bridge.importWorldbookWork(a)
          : "generator" === r.kind
            ? await p.bridge.importGenerators(r.definitions)
            : "regex" === r.kind
              ? await p.bridge.importRegexes(r.regexes)
              : "script" === r.kind
                ? await p.bridge.importScripts(r.scripts)
                : "fengyue-item" === r.kind &&
                  (await p.bridge.importFengyueItems(r.items));
    }
    (d.querySelector(".modal")?.remove(), k(`Đã cài đặt ${a.length} mục`, "ok"));
  };
  const te = D;
  D = async function (e, t, a) {
    if ("worldbook" === e) {
      let r = Object.values(c.wbEdits || {});
      return r.length ? p.bridge.buildWorldbookPackage(r, a) : te(e, t, a);
    }
    return te(e, t, a);
  };
  const ae = Y;
  ((Y = function (e) {
    let t = e.target;
    if (t.matches("[data-wbbook]"))
      return ((c.worldbookName = t.value), (c.wbQuery = ""), C(), R());
    if (t.matches("[data-wbsearch]")) return ((c.wbQuery = t.value), C(), R());
    if (t.matches('[data-r="worldbook"]')) {
      let a = K.get(t.value);
      return (
        t.checked && a && (c.wbEdits[t.value] = JSON.parse(JSON.stringify(a))),
        t.checked || delete c.wbEdits[t.value],
        ae(e),
        R()
      );
    }
    if (t.matches("[data-wbjson]"))
      try {
        let e = JSON.parse(t.value);
        if (!e?.name || "string" != typeof e.content) throw Error();
        ((c.wbEdits[t.dataset.wbjson] = e),
          C(),
          k("Đã lưu sửa đổi cấu hình của điều mục này", "ok"));
      } catch {
        k("JSON cấu hình Thế Giới Thư không hợp lệ, chưa lưu", "err");
      }
    else ae(e);
  }),
    (X = async function () {
      let e = await (p.bridge?.listWorldbooks?.() || []),
        t = p.bridge?.getPrimaryWorldbookName?.() || "",
        a = c.worldbookName || t || e[0] || "";
      a !== c.worldbookName && (c.worldbookName = a);
      let r = (a ? await (p.bridge?.listWorldbookEntries?.(a) || []) : []).map(
        (e) => ({
          id: `${e.__worldbook || a}\0${e.name}`,
          n: e.name,
          d: String(e.content || "")
            .replace(/\s+/g, " ")
            .slice(0, 62),
          x: e,
        }),
      );
      K = new Map(r.map((e) => [e.id, e.x]));
      let i = (c.wbQuery || "").trim().toLocaleLowerCase(),
        o = c.selected.worldbook || [],
        n = i
          ? r
              .filter((e) => `${e.n}\n${e.d}`.toLocaleLowerCase().includes(i))
              .slice(0, 30)
          : [],
        s = o
          .map((e) => ({ id: e, entry: c.wbEdits[e] }))
          .filter((e) => e.entry);
      return `<div class="note">Hãy chọn Thế Giới Thư trước, sau đó nhập từ khóa để tra cứu điều mục. Khi chưa tìm kiếm sẽ không liệt kê điều mục nào; sau khi chọn mới hiển thị và cho phép sửa đổi cấu hình hoàn chỉnh.</div><div class="bar"><select class="select" data-wbbook>${e.map((e) => `<option value="${v(e)}" ${e === a ? "selected" : ""}>${v(e)}</option>`).join("") || "<option>Không tìm thấy Thế Giới Thư khả dụng</option>"}</select><input class="input" data-wbsearch value="${v(c.wbQuery)}" placeholder="Tìm kiếm tên mục hoặc chính văn trong Thế Giới Thư hiện tại"></div><div class="wb-results">${i ? n.map((e) => `<label class="choice"><input type="checkbox" data-r="worldbook" value="${v(e.id)}" ${o.includes(e.id) ? "checked" : ""}><span><b>${v(e.n)}</b><small>${v(e.d)}</small>${N(e.x)}</span></label>`).join("") || '<p class="muted">Trong Thế Giới Thư hiện tại không có mục phù hợp</p>' : '<p class="muted">Nhập từ khóa để bắt đầu tìm kiếm; hệ thống sẽ không tải trước toàn bộ điều mục.</p>'}</div>${s.length ? `<section class="wb-selected"><p class="eyebrow">Cấu hình mục đã chọn</p>${s.map(({ id: e, entry: t }) => `<details><summary>${v(t.name)} · Nhấp để xem và sửa đổi cấu hình hoàn chỉnh</summary><label class="field"><span>Cấu hình điều mục hoàn chỉnh (JSON)</span><textarea class="area" data-wbjson="${v(e)}">${v(JSON.stringify(t, null, 2))}</textarea></label></details>`).join("")}</section>` : ""}`;
    }));
  const re = (O = async function (e) {
      let t = await ee(e);
      return "worldbook" === e
        ? t.replace(/<details class="wb-manual">[\s\S]*<\/details>$/, "")
        : t;
    }),
    ie = R;
  R = async function () {
    if (2 !== g || "collection" !== c.kind) return ie();
    T(
      `<section class="page publish"><div class="title"><div><p class="eyebrow">SUBMIT TO THE ARCHIVE</p><h1>Phát hành tác phẩm</h1><span class="muted">${["Chọn hình thức phát hành", "Chọn nội dung", "Kiểm tra kết quả cài đặt", "Điền thông tin phát hành", "Danh mục cài đặt", "Xác nhận nộp"][g - 1]}</span></div><button class="btn" data-a="clear">Xóa bản nháp</button></div><div class="steps">${[1, 2, 3, 4, 5, 6].map((e) => `<i class="step ${e === g ? "on" : ""}">${e}</i>`).join("")}</div><div class="sheet" data-p></div><div class="row"><button class="btn" data-a="back">Bước trước</button><button class="btn primary" data-a="next">Bước tiếp theo</button></div></section>`,
    );
    let e = d.querySelector("[data-p]"),
      t = [
        "character",
        "worldbook",
        "scenario",
        "generator",
        "regex",
        "script",
        "fengyue-item",
      ];
    try {
      e.innerHTML = (
        await Promise.all(
          t.map(async (e, t) => {
            let a =
              "scenario" === e
                ? c.collectionScenarioBundle
                  ? 1
                  : 0
                : (c.selected[e] || []).length;
            return `<details class="resource-group" ${0 === t ? "open" : ""}><summary><b>${S(e)}</b><small class="muted">　${a ? "Đã chọn " + a + " mục" : "Nhấp để mở rộng lựa chọn"}</small></summary><div>${await O(e)}</div></details>`;
          }),
        )
      ).join("");
    } catch (t) {
      e.textContent = t.message;
    }
  };
  const oe = Y;
  X = async function () {
    let e = await (p.bridge?.listWorldbooks?.() || []),
      t = p.bridge?.getPrimaryWorldbookName?.() || "",
      a = c.worldbookName || t || e[0] || "";
    a !== c.worldbookName && (c.worldbookName = a);
    let r = (a ? await (p.bridge?.listWorldbookEntries?.(a) || []) : []).map(
      (e) => ({
        id: encodeURIComponent(JSON.stringify([e.__worldbook || a, e.name])),
        n: e.name,
        d: String(e.content || "")
          .replace(/\s+/g, " ")
          .slice(0, 62),
        x: e,
      }),
    );
    K = new Map(r.map((e) => [e.id, e.x]));
    let i = (c.wbQuery || "").trim().toLocaleLowerCase(),
      o = c.selected.worldbook || [],
      n = i
        ? r
            .filter((e) => `${e.n}\n${e.d}`.toLocaleLowerCase().includes(i))
            .slice(0, 30)
        : [],
      s = o.map((e) => ({ id: e, entry: c.wbEdits[e] })).filter((e) => e.entry);
    return `<div class="note">Hãy chọn Thế Giới Thư trước, sau đó nhập từ khóa để tra cứu điều mục. Khi chưa tìm kiếm sẽ không liệt kê điều mục nào; sau khi chọn mới hiển thị và cho phép sửa đổi cấu hình hoàn chỉnh.</div><div class="bar"><select class="select" data-wbbook>${e.map((e) => `<option value="${v(e)}" ${e === a ? "selected" : ""}>${v(e)}</option>`).join("") || "<option>Không tìm thấy Thế Giới Thư khả dụng</option>"}</select><input class="input" data-wbsearch value="${v(c.wbQuery)}" placeholder="Tìm kiếm tên mục hoặc chính văn trong Thế Giới Thư hiện tại"></div><div class="wb-results">${i ? n.map((e) => `<label class="choice"><input type="checkbox" data-r="worldbook" value="${v(e.id)}" ${o.includes(e.id) ? "checked" : ""}><span><b>${v(e.n)}</b><small>${v(e.d)}</small>${N(e.x)}</span></label>`).join("") || '<p class="muted">Trong Thế Giới Thư hiện tại không có mục phù hợp</p>' : '<p class="muted">Nhập từ khóa để bắt đầu tìm kiếm; hệ thống sẽ không tải trước toàn bộ điều mục.</p>'}</div>${s.length ? `<section class="wb-selected"><p class="eyebrow">Cấu hình mục đã chọn</p>${s.map(({ id: e, entry: t }) => `<details><summary>${v(t.name)} · Nhấp để xem và sửa đổi cấu hình hoàn chỉnh</summary><label class="field"><span>Cấu hình điều mục hoàn chỉnh (JSON)</span><textarea class="area" data-wbjson="${v(e)}">${v(JSON.stringify(t, null, 2))}</textarea></label></details>`).join("")}</section>` : ""}`;
  };
  const ne = (O = async function (e) {
      return "fengyue-item" !== e
        ? re(e)
        : `<div class="note">Nơi này sẽ không đọc kệ hàng hiện có của bạn. Vui lòng tạo vật phẩm mới cần chia sẻ; sau khi người tải cài đặt, vật phẩm mới xuất hiện trên kệ 「Tàng phẩm đám mây」 của Phong Nguyệt Các.</div><label class="field"><span>Tên vật phẩm</span><input class="input" data-item="name" value="${v(c.item.name)}"></label><div class="two item-fields"><label class="field"><span>Định danh vật phẩm (Tùy chọn)</span><input class="input" data-item="id" value="${v(c.item.id)}" placeholder="Tự động sinh"></label><label class="field"><span>Giá cả</span><input class="input" type="number" min="0" data-item="price" value="${v(c.item.price)}"></label></div><label class="field"><span>Thuyết minh vật phẩm</span><textarea class="area" data-item="desc">${v(c.item.desc)}</textarea></label>`;
    }),
    se = R;
  async function le() {
    T(
      '<section class="page"><div class="title"><div><p class="eyebrow">MY WORKS</p><h1>Kho nội dung của tôi</h1></div></div><div class="grid" data-list>Đang đọc…</div></section>',
    );
    try {
      let e = await I("/api/me/works?page=1&pageSize=30");
      d.querySelector("[data-list]").innerHTML =
        e.items.map(L).join("") || '<p class="muted">Bạn chưa phát hành tác phẩm nào</p>';
    } catch (e) {
      d.querySelector("[data-list]").textContent = e.message;
    }
  }
  const de = T,
    ce = B;
  B = async function () {
    return "mine" === m ? (y() ? le() : V()) : ce();
  };
  const pe = (Y = function (e) {
      let t = e.target.matches(
          '[data-wbbook],[data-wbsearch],[data-r="worldbook"]',
        ),
        a = t ? d?.querySelector(".main")?.scrollTop : 0,
        r = oe(e);
      return (
        t &&
          r?.then &&
          r.then(() =>
            requestAnimationFrame(() => {
              let e = d?.querySelector(".main");
              e && (e.scrollTop = a);
            }),
          ),
        r
      );
    }),
    ue = Q,
    me = (Y = function (e) {
      let t = e.target.closest?.(".resource-group"),
        a = t ? [...d.querySelectorAll(".resource-group")].indexOf(t) : -1,
        r = pe(e);
      return (
        a >= 0 &&
          r?.then &&
          r.then(() =>
            requestAnimationFrame(() => {
              let e = d?.querySelectorAll(".resource-group");
              e?.[a] && (e[a].open = !0);
            }),
          ),
        r
      );
    });
  X = async function () {
    let e = await (p.bridge?.listWorldbooks?.() || []),
      t = p.bridge?.getPrimaryWorldbookName?.() || "",
      a = c.worldbookName || t || e[0] || "";
    a !== c.worldbookName && (c.worldbookName = a);
    let r = (a ? await (p.bridge?.listWorldbookEntries?.(a) || []) : []).map(
      (e) => ({
        id: encodeURIComponent(JSON.stringify([e.__worldbook || a, e.name])),
        n: e.name,
        d: String(e.content || "")
          .replace(/\s+/g, " ")
          .slice(0, 62),
        x: e,
      }),
    );
    K = new Map(r.map((e) => [e.id, e.x]));
    let i = (c.wbQuery || "").trim().toLocaleLowerCase(),
      o = c.selected.worldbook || [],
      n = i
        ? r
            .filter((e) => `${e.n}\n${e.d}`.toLocaleLowerCase().includes(i))
            .slice(0, 30)
        : [];
    return `<div class="note">Hãy chọn Thế Giới Thư trước, sau đó nhập từ khóa để tra cứu điều mục. Khi chưa tìm kiếm sẽ không liệt kê điều mục nào.</div><div class="bar"><select class="select" data-wbbook>${e.map((e) => `<option value="${v(e)}" ${e === a ? "selected" : ""}>${v(e)}</option>`).join("") || "<option>Không tìm thấy Thế Giới Thư khả dụng</option>"}</select><input class="input" data-wbsearch value="${v(c.wbQuery)}" placeholder="Tìm kiếm tên mục hoặc chính văn trong Thế Giới Thư hiện tại"></div><div class="wb-results">${i ? n.map((e) => `<label class="choice"><input type="checkbox" data-r="worldbook" value="${v(e.id)}" ${o.includes(e.id) ? "checked" : ""}><span><b>${v(e.n)}</b><small>${v(e.d)}</small>${N(e.x)}</span></label>`).join("") || '<p class="muted">Trong Thế Giới Thư hiện tại không có mục phù hợp</p>' : '<p class="muted">Nhập từ khóa để bắt đầu tìm kiếm; hệ thống sẽ không tải trước toàn bộ điều mục.</p>'}</div>`;
  };
  const ge = (O = async function (e) {
    return "fengyue-item" !== e
      ? ne(e)
      : `<div class="note">Nơi này sẽ không đọc kệ hàng hiện có của bạn. Vui lòng tạo vật phẩm mới cần chia sẻ; sau khi người tải cài đặt, vật phẩm mới xuất hiện trên kệ 「Tàng phẩm đám mây」 của Phong Nguyệt Các.</div><label class="field"><span>Tên vật phẩm</span><input class="input" data-item="name" value="${v(c.item.name)}"></label><div class="two item-fields" style="grid-template-columns:minmax(0,1fr) 112px"><label class="field"><span>Định danh vật phẩm (Tùy chọn)</span><input class="input" data-item="id" value="${v(c.item.id)}" placeholder="Tự động sinh"></label><label class="field"><span>Giá cả</span><input class="input" type="number" min="0" data-item="price" value="${v(c.item.price)}"></label></div><label class="field"><span>Thuyết minh vật phẩm</span><textarea class="area" data-item="desc">${v(c.item.desc)}</textarea></label>`;
  });
  O = async function (e) {
    return "fengyue-item" !== e
      ? ge(e)
      : `<div class="note">Nơi này sẽ không đọc kệ hàng hiện có của bạn. Vui lòng tạo vật phẩm mới cần chia sẻ; sau khi người tải cài đặt, vật phẩm mới xuất hiện trên kệ 「Tàng phẩm đám mây」 của Phong Nguyệt Các.</div><label class="field"><span>Tên vật phẩm</span><input class="input" data-item="name" value="${v(c.item.name)}"></label><div class="two item-fields" style="grid-template-columns:minmax(0,1fr) 112px"><label class="field"><span>Định danh vật phẩm (Tùy chọn)</span><input class="input" style="min-width:0" data-item="id" value="${v(c.item.id)}" placeholder="Tự động sinh"></label><label class="field"><span>Giá cả</span><input class="input" style="min-width:0" type="number" min="0" data-item="price" value="${v(c.item.price)}"></label></div><label class="field"><span>Thuyết minh vật phẩm</span><textarea class="area" data-item="desc">${v(c.item.desc)}</textarea></label>`;
  };
  const be = (e) => {
    try {
      return new Intl.DateTimeFormat("vi-VN", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }).format(new Date(e));
    } catch {
      return String(e || "");
    }
  };
  ((j = async function () {
    (T(
      `<section class="page"><div class="title"><div><p class="eyebrow">ARCHIVE INDEX</p><h1>Tất cả tác phẩm</h1></div></div><div class="bar"><input class="input" data-q placeholder="Tìm kiếm tác phẩm, tác giả hoặc nhãn"><select class="select" data-t><option value="">Tất cả tài nguyên</option>${Object.keys(
        s,
      )
        .filter((e) => "generator" !== e)
        .map((e) => `<option value="${e}">${S(e)}</option>`)
        .join(
          "",
        )}</select><select class="select" data-c><option value="">Tất cả phân loại</option>${l.map((e) => `<option>${e}</option>`).join("")}</select><select class="select" data-sort><option value="newest">Mới phát hành</option><option value="likes">Nhiều lượt thích nhất</option><option value="favorites">Nhiều bộ sưu tập nhất</option><option value="downloads">Nhiều lượt tải nhất</option></select><button class="btn primary" data-a="search">Tìm kiếm</button></div><div class="grid" data-list>Đang tra duyệt…</div></section>`,
    ),
      q());
  }),
    (q = async function () {
      try {
        let e = new URLSearchParams({
            page: 1,
            pageSize: 30,
            q: d.querySelector("[data-q]")?.value || "",
            type: d.querySelector("[data-t]")?.value || "",
            category: d.querySelector("[data-c]")?.value || "",
            sort: d.querySelector("[data-sort]")?.value || "newest",
          }),
          t = await I("/api/works?" + e);
        d.querySelector("[data-list]").innerHTML =
          t.items.map(L).join("") || '<p class="muted">Không có tác phẩm phù hợp</p>';
      } catch (e) {
        d.querySelector("[data-list]").textContent = e.message;
      }
    }),
    (le = async function (e = "works") {
      T(
        `<section class="page"><div class="title"><div><p class="eyebrow">MY ARCHIVE</p><h1>Của tôi</h1></div></div><div class="bar"><button class="btn ${"works" === e ? "primary" : ""}" data-my="works">Tôi đã phát hành</button><button class="btn ${"favorites" === e ? "primary" : ""}" data-my="favorites">Bộ sưu tập của tôi</button></div><div class="grid" data-list>Đang đọc…</div></section>`,
      );
      try {
        let t = await I(
          "works" === e
            ? "/api/me/works?page=1&pageSize=30"
            : "/api/me/favorites?page=1&pageSize=30",
        );
        d.querySelector("[data-list]").innerHTML =
          t.items
            .map(
              (t) =>
                `${L(t)}${"works" === e ? `<div class="work-actions"><button class="btn" data-own="edit" data-id="${v(t.id)}">Sửa đổi</button><button class="btn" data-own="${"published" === t.status ? "hide" : "publish"}" data-id="${v(t.id)}">${"published" === t.status ? "Gỡ xuống" : "Đăng lên"}</button><button class="btn" data-own="delete" data-id="${v(t.id)}">Xóa</button></div>` : ""}`,
            )
            .join("") ||
          `<p class="muted">${"works" === e ? "Bạn chưa phát hành tác phẩm nào" : "Tạm chưa có bộ sưu tập"}</p>`;
      } catch (e) {
        d.querySelector("[data-list]").textContent = e.message;
      }
    }));
  const he = J;
  J = async function () {
    if ((await he(), b?.id)) {
      let e = await I("/api/works/" + encodeURIComponent(b.id) + "/download", {
        method: "POST",
      });
      ((b.downloads = e.downloads), k("Cài đặt hoàn tất, đã ghi nhận lượt tải", "ok"));
    }
  };
  const fe = (T = function (e) {
      de(e);
      let t = d.querySelector(".nav");
      t &&
        !t.querySelector('[data-v="mine"]') &&
        t.insertAdjacentHTML(
          "beforeend",
          `<button data-v="mine" class="${"mine" === m ? "on" : ""}">Nội dung của tôi</button>`,
        );
    }),
    xe = (Q = async function (e) {
      let t = e.target.closest?.('[data-a="kind"]');
      return t
        ? ((c.kind = t.dataset.kind),
          (c.selected = {}),
          C(),
          void d
            .querySelectorAll('[data-a="kind"]')
            .forEach((e) => e.classList.toggle("on", e === t)))
        : ue(e);
    });
  Q = async function (e) {
    let t = e.target.closest?.("[data-own]"),
      a = e.target.closest?.("[data-my]"),
      r = e.target.closest?.('[data-a="installok"]');
    if (a) return le(a.dataset.my);
    if (r) {
      if (!confirm("Xác nhận cài đặt nội dung đã chọn?")) return;
      return xe(e);
    }
    if (t) {
      let e = t.dataset.id;
      if ("delete" === t.dataset.own)
        return confirm("Bạn có chắc muốn xóa tác phẩm đã phát hành này? Thao tác này không thể hoàn tác.")
          ? (await I("/api/works/" + encodeURIComponent(e), {
              method: "DELETE",
            }),
            le("works"))
          : void 0;
      if ("hide" === t.dataset.own || "publish" === t.dataset.own)
        return (
          await I("/api/works/" + encodeURIComponent(e), {
            method: "PATCH",
            body: JSON.stringify({ action: t.dataset.own }),
          }),
          le("works")
        );
      if ("edit" === t.dataset.own) {
        let t = await I("/api/works/" + encodeURIComponent(e)),
          a = prompt("Tiêu đề tác phẩm", t.title);
        if (null === a) return;
        let r = prompt("Thuyết minh tác phẩm", t.summary || "");
        if (null === r) return;
        let i = prompt("Liên kết ảnh bìa (Có thể để trống, hỗ trợ GIF/WebP)", t.cover_url || "");
        if (null === i) return;
        return (
          await I("/api/works/" + encodeURIComponent(e), {
            method: "PATCH",
            body: JSON.stringify({
              action: "update",
              title: a,
              summary: r,
              coverUrl: i,
              tags: t.tags || [],
              categories: t.categories || [],
            }),
          }),
          le("works")
        );
      }
    }
    return xe(e);
  };
  const ve = (L = function (e) {
    let t = e.cover_url || e.coverUrl || "",
      a = e.global_name || e.author || "Tác giả ẩn danh";
    return `<article class="card" data-a="detail" data-id="${v(e.id)}"><div class="cover">${t ? `<img src="${v(t)}" alt="${v(e.title)}" loading="lazy" referrerpolicy="no-referrer">` : ""}</div><div class="card-body"><div class="card-top"><span>${v(S(e.type))}</span><span>Tải xuống ${Number(e.downloads || 0)}</span></div><h3>${v(e.title)}</h3><p>${v(e.summary || "Chưa điền thuyết minh tác phẩm")}</p><div>${[
      ...(e.categories || []),
      ...(e.tags || []),
    ]
      .slice(0, 3)
      .map((e) => `<i class="tag">${v(e)}</i>`)
      .join(
        "",
      )}</div><small class="muted">${v(a)} · ${v(be(e.created_at))}</small></div></article>`;
  });
  ((L = function (e) {
    let t = ve(e),
      a = `<div class="work-signals"><span>♡ ${Number(e.likes || 0)}</span><span>☆ ${Number(e.favorites || 0)}</span></div>`;
    return t.replace("</article>", a + "</article>");
  }),
    (le = async function (e = "works") {
      T(
        `<section class="page"><div class="title"><div><p class="eyebrow">MY ARCHIVE</p><h1>Của tôi</h1></div></div><div class="bar"><button class="btn ${"works" === e ? "primary" : ""}" data-my="works">Tôi đã phát hành</button><button class="btn ${"favorites" === e ? "primary" : ""}" data-my="favorites">Bộ sưu tập của tôi</button></div><div class="grid" data-list>Đang đọc…</div></section>`,
      );
      try {
        let t = await I(
          "works" === e
            ? "/api/me/works?page=1&pageSize=30"
            : "/api/me/favorites?page=1&pageSize=30",
        );
        d.querySelector("[data-list]").innerHTML =
          t.items
            .map((t) => {
              let a =
                "works" === e
                  ? `<div class="card-actions"><button data-own="edit" data-id="${v(t.id)}">Sửa đổi</button><button data-own="${"published" === t.status ? "hide" : "publish"}" data-id="${v(t.id)}">${"published" === t.status ? "Gỡ xuống" : "Đăng lên"}</button><button class="danger" data-own="delete" data-id="${v(t.id)}">Xóa</button></div>`
                  : "";
              return L(t).replace("</article>", a + "</article>");
            })
            .join("") ||
          `<p class="muted">${"works" === e ? "Bạn chưa phát hành tác phẩm nào" : "Tạm chưa có bộ sưu tập"}</p>`;
      } catch (e) {
        d.querySelector("[data-list]").textContent = e.message;
      }
    }),
    (P = async function (e) {
      T('<p class="page muted">Đang đọc tác phẩm…</p>');
      try {
        b = await I("/api/works/" + encodeURIComponent(e));
        let t = String(b.cover_url || b.coverUrl || "")
          .split(/[\n,]/)
          .map((e) => e.trim())
          .filter((e) => /^https?:\/\//i.test(e));
        T(
          `<section class="page work-detail"><button class="btn" data-v="catalog">← Quay lại tất cả tác phẩm</button>${t.length ? `<div class="detail-covers">${t.map((e) => `<img src="${v(e)}" alt="${v(b.title)}" loading="lazy">`).join("")}</div>` : ""}<p class="eyebrow">${v(S(b.type))} · ${v(be(b.created_at))}</p><h1>${v(b.title)}</h1><p class="detail-author">Tác giả: ${v(b.global_name || b.author || "Tác giả ẩn danh")}</p><section class="detail-summary"><b>Giới thiệu tác phẩm</b><p>${v(b.summary || "Chưa điền thuyết minh tác phẩm")}</p></section><ul class="manifest">${E(
            b.payload,
          )
            .resources.map(
              (e) => `<li><b>${v(e.name)}</b> · ${v(S(e.kind))}</li>`,
            )
            .join(
              "",
            )}</ul><div class="row"><button class="btn primary" data-a="install">Cài đặt tùy chọn</button><button class="btn" data-a="like">♡ ${Number(b.likes || 0)}</button><button class="btn" data-a="favorite">☆ ${Number(b.favorites || 0)}</button></div></section>`,
        );
      } catch (e) {
        T(`<p class="page">${v(e.message)}</p>`);
      }
    }));
  const we = (T = function (e) {
    fe(e);
    let t = d.querySelector('[data-v="mine"]');
    t && (t.textContent = "Của tôi");
  });
  T = function (e) {
    (we(e),
      d.querySelector('[data-v="catalog"]')?.replaceChildren("Tất cả"),
      d.querySelector('[data-v="favorites"]')?.remove());
    let t = d.querySelector(".account");
    t && ((t.dataset.a = "accountmenu"), t.removeAttribute("data-v"));
  };
  const ye = Q;
  ((Q = async function (e) {
    let t = e.target.closest?.('[data-a="accountmenu"]'),
      a = e.target.closest?.('[data-a="quicklogout"]');
    if (a) {
      try {
        await I("/api/auth/logout", { method: "POST" });
      } catch {}
      return (w().removeItem(r), w().removeItem(i), (m = "account"), B());
    }
    return t
      ? (d.querySelector(".account-menu")?.remove(),
        void t.insertAdjacentHTML(
          "afterend",
          `<div class="account-menu"><b>${v(y()?.global_name || y()?.username || "")}</b><small>Đã xác thực Loại Não</small><button data-a="quicklogout">Đăng xuất</button></div>`,
        ))
      : ye(e);
  }),
    (A = async function () {
      T(
        '<section class="page"><section class="hero"><div class="hero-copy"><p class="eyebrow">FEATURED ARCHIVE</p><h1>Tàn Minh <em>Tinh Tuyển</em></h1><p>Các tác phẩm ưu tú do quản trị viên tuyển chọn. Lướt ngang để xem, nhấp vào để xem chi tiết.</p><div class="row"><button class="btn primary" data-v="catalog">Duyệt tất cả</button><button class="btn" data-v="publish">Phát hành tác phẩm</button></div></div><div class="featured-track" data-featured>Đang tải tinh tuyển…</div></section><section style="margin-top:30px"><div class="title"><div><p class="eyebrow">NEW ARRIVALS</p><h1>Mới nhập tàng</h1></div></div><div class="grid" data-list>Đang tra duyệt…</div></section></section>',
      );
      try {
        let [e, t] = await Promise.all([
          I("/api/works?page=1&pageSize=8&sort=newest"),
          I("/api/works?page=1&pageSize=8&sort=newest"),
        ]);
        ((d.querySelector("[data-featured]").innerHTML =
          e.items
            .filter((e) => Number(e.featured_order) > 0)
            .map(L)
            .join("") || '<p class="muted">Tạm chưa có tác phẩm tinh tuyển</p>'),
          (d.querySelector("[data-list]").innerHTML =
            t.items.map(L).join("") || '<p class="muted">Tạm chưa có tác phẩm công khai</p>'));
      } catch (e) {
        d.querySelector("[data-featured]").textContent = e.message;
      }
    }));
  const $e = Q;
  Q = async function (e) {
    let t = e.target.closest?.('[data-a="like"],[data-a="favorite"]');
    if (t && b) {
      let e = t.dataset.a,
        a = "like" === e ? "liked" : "favorited",
        r = "like" === e ? "likes" : "favorites",
        i = Boolean(b[a]),
        o = await I(`/api/works/${encodeURIComponent(b.id)}/${e}`, {
          method: i ? "DELETE" : "POST",
        });
      return (
        (b[a] = o.active),
        (b[r] = o.count),
        (t.textContent = `${"like" === e ? "♡" : "☆"} ${o.count}`),
        void t.classList.toggle("primary", o.active)
      );
    }
    let a = e.target.closest?.('[data-a="report"]');
    if (a && b) {
      let e = prompt("Vui lòng nhập lý do báo cáo (Ít nhất 10 ký tự)");
      return void (
        e &&
        e.trim().length >= 10 &&
        (await I(`/api/works/${encodeURIComponent(b.id)}/report`, {
          method: "POST",
          body: JSON.stringify({ category: "other", reason: e.trim() }),
        }),
        k("Đã gửi báo cáo", "ok"))
      );
    }
    let r = e.target.closest?.('[data-a="accountmenu"]');
    if (!r || !d.querySelector(".account-menu")) return $e(e);
    d.querySelector(".account-menu").remove();
  };
  const ke = P,
    Se = (R = async function () {
      let e = await se();
      return (
        "publish" === m &&
          2 === g &&
          d
            ?.querySelectorAll(".resource-group[open]")
            .forEach((e) => e.removeAttribute("open")),
        e
      );
    });
  A = async function () {
    T(
      '<section class="page"><section class="hero"><div class="hero-copy"><p class="eyebrow">FEATURED ARCHIVE</p><h1>Tàn Minh <em>Tinh Tuyển</em></h1><p>Các tác phẩm ưu tú do quản trị viên tuyển chọn. Lướt ngang để xem, nhấp vào để xem chi tiết.</p><div class="row"><button class="btn primary" data-v="catalog">Duyệt tất cả</button><button class="btn" data-v="publish">Phát hành tác phẩm</button></div></div><div class="featured-track" data-featured>Đang tải tinh tuyển…</div></section><section style="margin-top:30px"><div class="title"><div><p class="eyebrow">NEW ARRIVALS</p><h1>Mới nhập tàng</h1></div></div><div class="grid" data-list>Đang tra duyệt…</div></section></section>',
    );
    try {
      let [e, t] = await Promise.all([
        I("/api/works?page=1&pageSize=8&sort=newest"),
        I("/api/works?page=1&pageSize=8&sort=newest"),
      ]);
      ((d.querySelector("[data-featured]").innerHTML =
        e.items
          .filter((e) => Number(e.featured_order) > 0)
          .map(L)
          .join("") || '<p class="muted">Tạm chưa có tác phẩm tinh tuyển</p>'),
        (d.querySelector("[data-list]").innerHTML =
          t.items.map(L).join("") || '<p class="muted">Tạm chưa có tác phẩm công khai</p>'));
    } catch (e) {
      d.querySelector("[data-featured]").textContent = e.message;
    }
  };
  const Ce = T;
  T = function (e) {
    (Ce(e),
      d.insertAdjacentHTML(
        "afterbegin",
        `<style>#${a} .card-actions{display:flex;gap:6px;padding:0 14px 14px;margin-top:auto}#${a} .card-actions button{flex:1;border:1px solid var(--line);border-radius:9px;padding:8px;background:var(--paper2);color:var(--ink);cursor:pointer}#${a} .card-actions .danger{color:#c85f50}#${a} .account-menu{position:absolute;right:20px;top:76px;z-index:30;display:grid;gap:6px;min-width:190px;padding:14px;border:1px solid var(--line);border-radius:14px;background:var(--card);box-shadow:0 16px 38px color-mix(in srgb,#000 24%,transparent)}#${a} .account-menu small{color:var(--muted)}#${a} .account-menu button,#${a} .dialog-actions button{border:1px solid var(--line);border-radius:9px;padding:8px 12px;background:var(--paper2);color:var(--ink);cursor:pointer}#${a} .workshop-dialog{position:fixed;inset:0;z-index:50;display:grid;place-items:center;padding:18px;background:color-mix(in srgb,var(--ink) 64%,transparent);backdrop-filter:blur(5px)}#${a} .workshop-dialog section{width:min(560px,100%);max-height:calc(100dvh - 36px);overflow:auto;padding:22px;border:1px solid var(--line);border-radius:18px;background:linear-gradient(145deg,var(--card),var(--paper2));box-shadow:0 24px 65px color-mix(in srgb,#000 34%,transparent)}#${a} .workshop-dialog h2{margin:0 0 6px;color:var(--accent)}#${a} .dialog-actions{display:flex;justify-content:flex-end;gap:8px;margin-top:18px}#${a} .dialog-actions .primary{background:var(--accent);color:#fff;border-color:var(--accent)}</style>`,
      ));
    let t = d.querySelector(".account");
    t && ((t.dataset.a = "accountmenu"), t.removeAttribute("data-v"));
  };
  const Ie = Q;
  Q = async function (e) {
    let t = e.target.closest?.('[data-a="accountmenu"]'),
      a = e.target.closest?.('[data-a="dialog-close"]'),
      r = e.target.closest?.('[data-own="edit"]'),
      i = e.target.closest?.('[data-a="report"]'),
      o = e.target.closest?.('[data-a="dialog-save"]');
    if (a) return d.querySelector(".workshop-dialog")?.remove();
    if (t) {
      let e = d.querySelector(".account-menu");
      return e
        ? void e.remove()
        : void t.insertAdjacentHTML(
            "afterend",
            `<div class="account-menu"><b>${v(y()?.global_name || y()?.username || "")}</b><small>Đã xác thực Loại Não</small><button data-a="quicklogout">Đăng xuất</button></div>`,
          );
    }
    if (r) {
      let e = await I("/api/works/" + encodeURIComponent(r.dataset.id));
      return void d.insertAdjacentHTML(
        "beforeend",
        `<div class="workshop-dialog" data-dialog="edit"><section><p class="eyebrow">EDIT WORK</p><h2>Sửa đổi thông tin tác phẩm</h2><label class="field"><span>Tiêu đề</span><input class="input" data-dialog-title value="${v(e.title)}"></label><label class="field"><span>Giới thiệu</span><textarea class="area" data-dialog-summary>${v(e.summary || "")}</textarea></label><label class="field"><span>Liên kết ảnh bìa (Nhiều ảnh phân tách bằng dấu phẩy hoặc xuống dòng)</span><textarea class="area" data-dialog-cover>${v(e.cover_url || "")}</textarea></label><div class="dialog-actions"><button data-a="dialog-close">Hủy bỏ</button><button class="primary" data-a="dialog-save" data-id="${v(e.id)}">Lưu sửa đổi</button></div></section></div>`,
      );
    }
    if (!i || !b) {
      if (o) {
        if (o.dataset.report) {
          let e = d.querySelector("[data-dialog-reason]").value.trim(),
            t = d.querySelector("[data-dialog-category]").value;
          return e.length < 10
            ? k("Lý do báo cáo cần ít nhất 10 ký tự", "err")
            : (await I(
                "/api/works/" +
                  encodeURIComponent(o.dataset.report) +
                  "/report",
                {
                  method: "POST",
                  body: JSON.stringify({ category: t, reason: e }),
                },
              ),
              d.querySelector(".workshop-dialog")?.remove(),
              k("Đã gửi báo cáo", "ok"));
        }
        let e = o.dataset.id,
          t = d.querySelector("[data-dialog-title]").value.trim(),
          a = d.querySelector("[data-dialog-summary]").value,
          r = d.querySelector("[data-dialog-cover]").value.trim();
        return (
          await I("/api/works/" + encodeURIComponent(e), {
            method: "PATCH",
            body: JSON.stringify({
              action: "update",
              title: t,
              summary: a,
              coverUrl: r,
              tags: [],
              categories: [],
            }),
          }),
          d.querySelector(".workshop-dialog")?.remove(),
          le("works")
        );
      }
      return Ie(e);
    }
    d.insertAdjacentHTML(
      "beforeend",
      `<div class="workshop-dialog" data-dialog="report"><section><p class="eyebrow">REPORT WORK</p><h2>Báo cáo tác phẩm</h2><label class="field"><span>Loại báo cáo</span><select class="select" data-dialog-category><option value="other">Vấn đề khác</option><option value="copyright">Vấn đề bản quyền</option><option value="spam">Nội dung rác</option><option value="misleading">Nội dung gây hiểu lầm</option></select></label><label class="field"><span>Thuyết minh báo cáo (Ít nhất 10 ký tự)</span><textarea class="area" data-dialog-reason></textarea></label><div class="dialog-actions"><button data-a="dialog-close">Hủy bỏ</button><button class="primary" data-a="dialog-save" data-report="${v(b.id)}">Gửi báo cáo</button></div></section></div>`,
    );
  };
  const Ee = Q;
  Q = async function (e) {
    let t = e.target.closest?.('[data-own="edit"]'),
      a = e.target.closest?.('[data-a="package-save"]');
    if (t) {
      let e = await I("/api/works/" + encodeURIComponent(t.dataset.id));
      return void d.insertAdjacentHTML(
        "beforeend",
        `<div class="workshop-dialog"><section><p class="eyebrow">EDIT PACKAGE</p><h2>Sửa đổi nội dung tác phẩm</h2><div class="note">Nơi đây chỉnh sửa gói tác phẩm hoàn chỉnh; có thể thay thế nhân vật, điều mục Thế Giới Thư, liên kết lập hội, cấu hình Regex và Kịch bản. Sau khi lưu sẽ ghi đè nội dung gốc nhưng vẫn bảo tồn liên kết tác phẩm, lượt tải, lượt thích và bộ sưu tập.</div><label class="field"><span>Tiêu đề tác phẩm</span><input class="input" data-package-title value="${v(e.title)}"></label><label class="field"><span>Gói tác phẩm hoàn chỉnh (JSON)</span><textarea class="area" style="min-height:300px" data-package-json>${v(JSON.stringify(e.payload, null, 2))}</textarea></label><div class="dialog-actions"><button data-a="dialog-close">Hủy bỏ</button><button class="primary" data-a="package-save" data-id="${v(e.id)}">Lưu sửa đổi nội dung</button></div></section></div>`,
      );
    }
    if (a)
      try {
        let e = E(JSON.parse(d.querySelector("[data-package-json]").value)),
          t = d.querySelector("[data-package-title]").value.trim();
        return (
          await I("/api/works/" + encodeURIComponent(a.dataset.id), {
            method: "PATCH",
            body: JSON.stringify({
              action: "update",
              title: t,
              summary: e.metadata?.summary || "",
              tags: e.metadata?.tags || [],
              categories: e.metadata?.categories || [],
              coverUrl: e.metadata?.coverUrl || "",
              payload: e,
            }),
          }),
          d.querySelector(".workshop-dialog")?.remove(),
          k("Đã cập nhật nội dung tác phẩm", "ok"),
          le("works")
        );
      } catch (e) {
        return k(e.message || "Định dạng gói tác phẩm không hợp lệ", "err");
      }
    return Ee(e);
  };
  let Te = "";
  const Le = U;
  U = async function () {
    if (Te && !c._contentTouched) {
      let e = {
        ...c.bundle.metadata,
        ...c.meta,
        tags: String(c.meta.tags || "")
          .split(/[,，]/)
          .map((e) => e.trim())
          .filter(Boolean),
      };
      return E({ ...c.bundle, metadata: e });
    }
    return Le();
  };
  const Ae = (Y = function (e) {
      let t = e.target;
      if (t.matches('[data-r="worldbook"]')) {
        let e = new Set(c.selected.worldbook || []),
          a = K.get(t.value);
        return (
          t.checked
            ? (e.add(t.value),
              a && (c.wbEdits[t.value] = JSON.parse(JSON.stringify(a))))
            : (e.delete(t.value), delete c.wbEdits[t.value]),
          (c.selected.worldbook = [...e]),
          void C()
        );
      }
      return me(e);
    }),
    je = G;
  G = async function () {
    if (!Te || 6 !== g) return je();
    try {
      let e = await U(),
        t = {
          action: "update",
          payload: e,
          title: c.meta.title || e.metadata.title,
          summary: c.meta.summary || e.metadata.summary,
          tags: String(c.meta.tags || "")
            .split(/[,，]/)
            .map((e) => e.trim())
            .filter(Boolean),
          categories: c.meta.categories,
          coverUrl: c.meta.coverUrl || e.metadata.coverUrl || "",
        };
      return (
        await I("/api/works/" + encodeURIComponent(Te), {
          method: "PATCH",
          body: JSON.stringify(t),
        }),
        k("Đã cập nhật tác phẩm", "ok"),
        w().removeItem(o),
        (Te = ""),
        (c = {
          kind: "",
          selected: {},
          custom: {
            name: "",
            content: "",
            keys: "",
            position: "after_character_definition",
          },
          worldbookName: "",
          wbQuery: "",
          wbEdits: {},
          item: { name: "", price: 0, desc: "", id: "" },
          meta: {
            title: "",
            summary: "",
            tags: "",
            categories: [],
            coverUrl: "",
          },
          bundle: null,
          collectionScenarioBundle: null,
        }),
        (m = "mine"),
        B()
      );
    } catch (e) {
      k(e.message, "err");
    }
  };
  const qe = Q,
    Ne = (P = async function (e) {
      (await ke(e),
        b &&
          d.querySelector(".work-detail .row") &&
          d
            .querySelector(".work-detail .row")
            .insertAdjacentHTML(
              "beforeend",
              '<button class="btn" data-a="report">Báo cáo</button>',
            ));
    });
  P = async function (e) {
    (await Ne(e),
      b?.is_owner && d.querySelector('[data-a="report"]')?.remove());
  };
  const ze = (Q = async function (e) {
    let t = e.target.closest?.('[data-own="edit"]');
    if (t)
      try {
        let e = await I("/api/works/" + encodeURIComponent(t.dataset.id)),
          a = E(e.payload);
        return (
          (Te = e.id),
          (c = {
            kind: "",
            selected: {},
            custom: {
              name: "",
              content: "",
              keys: "",
              position: "after_character_definition",
            },
            worldbookName: "",
            wbQuery: "",
            wbEdits: {},
            item: { name: "", price: 0, desc: "", id: "" },
            meta: {
              title: "",
              summary: "",
              tags: "",
              categories: [],
              coverUrl: "",
            },
            bundle: null,
            collectionScenarioBundle: null,
          }),
          (c.kind = a.kind),
          (c.bundle = a),
          (c.meta = {
            title: e.title || a.metadata.title || "",
            summary: e.summary || a.metadata.summary || "",
            tags: (e.tags || a.metadata.tags || []).join(", "),
            categories: e.categories || a.metadata.categories || [],
            coverUrl: e.cover_url || a.metadata.coverUrl || "",
          }),
          (c._contentTouched = !1),
          (g = 2),
          (m = "publish"),
          R()
        );
      } catch (e) {
        return void k(e.message, "err");
      }
    return qe(e);
  });
  Q = async function (e) {
    let t = e.target.closest?.('[data-a="dialog-save"][data-report]');
    if (t)
      try {
        let e = d.querySelector("[data-dialog-reason]").value.trim(),
          a = d.querySelector("[data-dialog-category]").value;
        return e.length < 10
          ? k("Lý do báo cáo cần ít nhất 10 ký tự", "err")
          : (await I(
              "/api/works/" + encodeURIComponent(t.dataset.report) + "/report",
              {
                method: "POST",
                body: JSON.stringify({ category: a, reason: e }),
              },
            ),
            d.querySelector(".workshop-dialog")?.remove(),
            k("Đã gửi báo cáo", "ok"));
      } catch (e) {
        return k(e.message || "Gửi báo cáo thất bại", "err");
      }
    return ze(e);
  };
  const _e = Q;
  async function Oe(e) {
    let t = e.target.closest?.('[data-a="report-submit"]');
    if (!t) return;
    e.stopImmediatePropagation();
    let a = d.querySelector("[data-report-reason]"),
      r = a?.value.trim() || "",
      i = d.querySelector("[data-report-category]")?.value || "other",
      o = d.querySelector("[data-report-hint]");
    if (
      (!o &&
        a &&
        (a.insertAdjacentHTML(
          "afterend",
          '<small data-report-hint style="display:block;margin-top:6px;color:#c85f50"></small>',
        ),
        (o = d.querySelector("[data-report-hint]"))),
      r.length < 10)
    )
      o &&
        (o.textContent =
          "Lý do báo cáo cần ít nhất 10 ký tự (Hiện tại " + r.length + " ký tự)");
    else {
      (o && (o.textContent = ""),
        (t.disabled = !0),
        (t.textContent = "Đang gửi…"));
      try {
        (await I("/api/works/" + encodeURIComponent(b.id) + "/report", {
          method: "POST",
          body: JSON.stringify({ category: i, reason: r }),
        }),
          d.querySelector(".workshop-dialog")?.remove(),
          k("Đã gửi báo cáo", "ok"));
      } catch (e) {
        ((t.disabled = !1),
          (t.textContent = "Gửi báo cáo"),
          o && (o.textContent = e.message || "Gửi báo cáo thất bại"),
          k(e.message || "Gửi báo cáo thất bại", "err"));
      }
    }
  }
  let Re;
  const Me = T,
    He = B;
  B = async function () {
    return "notifications" === m ? Re() : He();
  };
  const De = { unread: 0, known: !1, fetchedAt: 0, promise: null };
  function Ue() {
    try {
      let e = window.parent || window;
      return (
        e.__canmingWorkshopNoticeState ||
        (e.__canmingWorkshopNoticeState = {
          unread: 0,
          known: !1,
          fetchedAt: 0,
          promise: null,
        })
      );
    } catch {
      return De;
    }
  }
  function Pe() {
    let e = d?.querySelector?.("[data-notice-dot]");
    if (!e) return;
    let t = Ue(),
      a = Math.max(0, Number(t.unread || 0));
    ((e.hidden = !t.known || a < 1),
      (e.textContent = a > 99 ? "99+" : String(a || "")));
  }
  function We(e, t = !0) {
    let a = Ue();
    return (
      (a.unread = Math.max(0, Number(e || 0))),
      (a.known = !0),
      t && (a.fetchedAt = Date.now()),
      Pe(),
      (function (e) {
        try {
          let t = window.parent || window;
          t.dispatchEvent(
            new t.CustomEvent("canming-workshop-notifications-changed", {
              detail: { unread: Math.max(0, Number(e || 0)) },
            }),
          );
        } catch {}
      })(a.unread),
      a.unread
    );
  }
  async function Je(e = !1) {
    let t = Ue();
    return y()
      ? !e && t.known && Date.now() - Number(t.fetchedAt || 0) < 3e5
        ? (Pe(), t.unread)
        : (t.promise ||
            (t.promise = I("/api/me/notifications?page=1&pageSize=20")
              .then((e) => We(e.unread))
              .finally(() => {
                t.promise = null;
              })),
          t.promise)
      : (We(0, !1), 0);
  }
  Re = async function () {
    T(
      '<section class="page"><div class="title"><div><p class="eyebrow">NOTIFICATIONS</p><h1>Thông báo</h1></div><div class="row"><button class="btn" data-note="readall">Đọc tất cả</button><button class="btn" data-note="deleteall">Xóa tất cả</button></div></div><div class="sheet notice-list" data-notice>Đang đọc…</div></section>',
    );
    try {
      let e = await I("/api/me/notifications?page=1");
      (We(e.unread),
        (d.querySelector("[data-notice]").innerHTML =
          e.items
            .map(
              (e) =>
                `<article class="notice-item ${e.is_read ? "" : "unread"}"><div><b>${v(e.title)}</b><p>${v(e.content || "")}</p><small>${v(be(e.created_at))}</small></div><div class="notice-actions"><button data-note="read" data-id="${v(e.id)}" ${e.is_read ? "disabled" : ""}>${e.is_read ? "Đã đọc" : "Đánh dấu đã đọc"}</button><button data-note="delete" data-id="${v(e.id)}">Xóa</button></div></article>`,
            )
            .join("") || '<p class="muted">Tạm chưa có thông báo</p>'));
    } catch (e) {
      d.querySelector("[data-notice]").textContent = e.message;
    }
  };
  const Ve = (Q = async function (e) {
      let t = e.target.closest?.('[data-a="report"]'),
        a = e.target.closest?.('[data-a="report-submit"]');
      if (t && b)
        return (
          d.querySelector(".workshop-dialog")?.remove(),
          void d.insertAdjacentHTML(
            "beforeend",
            '<div class="workshop-dialog"><section><p class="eyebrow">REPORT WORK</p><h2>Báo cáo tác phẩm</h2><label class="field"><span>Loại báo cáo</span><select class="select" data-report-category><option value="other">Vấn đề khác</option><option value="copyright">Vấn đề bản quyền</option><option value="spam">Nội dung rác</option><option value="misleading">Nội dung gây hiểu lầm</option></select></label><label class="field"><span>Thuyết minh báo cáo (Ít nhất 10 ký tự)</span><textarea class="area" data-report-reason></textarea></label><div class="dialog-actions"><button data-a="dialog-close">Hủy bỏ</button><button class="primary" data-a="report-submit">Gửi báo cáo</button></div></section></div>',
          )
        );
      if (a && b) {
        let e = d.querySelector("[data-report-reason]")?.value.trim() || "",
          t = d.querySelector("[data-report-category]")?.value || "other";
        if (e.length < 10) return k("Lý do báo cáo cần ít nhất 10 ký tự", "err");
        ((a.disabled = !0), (a.textContent = "Đang gửi…"));
        try {
          (await I("/api/works/" + encodeURIComponent(b.id) + "/report", {
            method: "POST",
            body: JSON.stringify({ category: t, reason: e }),
          }),
            d.querySelector(".workshop-dialog")?.remove(),
            k("Đã gửi báo cáo", "ok"));
        } catch (e) {
          ((a.disabled = !1),
            (a.textContent = "Gửi báo cáo"),
            k(e.message || "Gửi báo cáo thất bại", "err"));
        }
        return;
      }
      return _e(e);
    }),
    Be = (T = function (e) {
      Me(e);
      let t = d.querySelector(".head-actions");
      t &&
        !t.querySelector('[data-v="notifications"]') &&
        t.insertAdjacentHTML(
          "afterbegin",
          '<button class="btn" data-v="notifications" title="Thông báo">Thông báo<span class="notice-dot" data-notice-dot></span></button>',
        );
    }),
    Fe = (T = function (e) {
      Be(e);
      let t = d.querySelector('[data-v="notifications"]');
      t &&
        (t.innerHTML =
          '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><i data-notice-dot></i>');
    }),
    Ge = (Q = async function (e) {
      let t = e.target.closest?.("[data-note]");
      if (t) {
        let e = t.dataset.note,
          a = t.dataset.id;
        if ("readall" === e)
          await I("/api/me/notifications/read-all", { method: "POST" });
        else if ("deleteall" === e) {
          if (!confirm("Bạn có chắc muốn xóa toàn bộ thông báo cá nhân?")) return;
          await I("/api/me/notifications", { method: "DELETE" });
        } else
          "read" === e
            ? await I(
                "/api/me/notifications/" + encodeURIComponent(a) + "/read",
                { method: "POST" },
              )
            : "delete" === e &&
              (await I("/api/me/notifications/" + encodeURIComponent(a), {
                method: "DELETE",
              }));
        return Re();
      }
      return Ve(e);
    }),
    Qe = (T = function (e) {
      (Fe(e),
        d.insertAdjacentHTML(
          "afterbegin",
          `<style>#${a} [data-v="notifications"]{position:relative;width:38px;padding:8px!important}#${a} [data-v="notifications"] svg{width:19px;height:19px;display:block}#${a} [data-notice-dot]{position:absolute;right:-5px;top:-5px;min-width:17px;height:17px;padding:0 4px;border-radius:999px;background:var(--accent);color:#fff;font:10px/17px serif;font-style:normal}#${a} .notice-item{display:flex;justify-content:space-between;gap:18px;padding:16px 4px;border-bottom:1px solid var(--line);font-size:16px}#${a} .notice-item.unread b{color:var(--accent)}#${a} .notice-item p{margin:7px 0;color:var(--ink);font-size:15px;line-height:1.75}#${a} .notice-item small{font-size:13px;color:var(--muted)}#${a} .notice-actions{display:flex;align-items:start;gap:6px}.notice-actions button{border:1px solid var(--line);border-radius:8px;padding:7px 9px;background:var(--paper2);color:var(--ink);cursor:pointer;font:13px inherit}</style>`,
        ));
    }),
    Ye = "canming-workshop-1.9:installs-v1";
  function Ke() {
    try {
      let e = JSON.parse(w().getItem(Ye) || "[]");
      return Array.isArray(e) ? e : [];
    } catch {
      return [];
    }
  }
  function Xe(e) {
    w().setItem(Ye, JSON.stringify(e));
  }
  function Ze(e = {}, t = {}) {
    let a = {};
    for (let r of [
      "characters",
      "worldbooks",
      "regexes",
      "scripts",
      "fengyue",
      "generators",
      "scenarios",
    ]) {
      let i = new Set(e[r] || []);
      a[r] = (t[r] || []).filter((e) => !i.has(e));
    }
    return a;
  }
  const et = [
      "characters",
      "worldbooks",
      "regexes",
      "scripts",
      "fengyue",
      "generators",
      "scenarios",
    ],
    tt = "snapshots",
    at = "canming-workshop-1.9:snapshot:";
  function rt(e) {
    return JSON.parse(JSON.stringify(e));
  }
  async function it(e, t, a) {
    let r = await new Promise((e, t) => {
      let a = (window.parent || window).indexedDB;
      if (!a) return t(Error("IndexedDB không khả dụng"));
      let r = a.open("canming-workshop-1.9-installs", 1);
      ((r.onupgradeneeded = () => {
        r.result.objectStoreNames.contains(tt) ||
          r.result.createObjectStore(tt);
      }),
        (r.onsuccess = () => e(r.result)),
        (r.onerror = () => t(r.error || Error("Cơ sở dữ liệu Snapshot cài đặt không khả dụng"))));
    });
    return new Promise((i, o) => {
      let n = r.transaction(tt, "get" === e ? "readonly" : "readwrite"),
        s = n.objectStore(tt),
        l = "get" === e ? s.get(t) : "put" === e ? s.put(a, t) : s.delete(t);
      ((l.onsuccess = () => i(l.result)),
        (l.onerror = () => o(l.error || Error("Đọc/ghi Snapshot cài đặt thất bại"))),
        (n.oncomplete = () => r.close()),
        (n.onerror = () => {
          (r.close(), o(n.error || Error("Transaction Snapshot cài đặt thất bại")));
        }));
    });
  }
async function ot(e, t) {
    try {
      await it("put", e, t);
      try {
        w().removeItem(at + e);
      } catch {}
      return !0;
    } catch {
      try {
        return (w().setItem(at + e, JSON.stringify(t)), !0);
      } catch {
        return !1;
      }
    }
  }
  async function nt(e) {
    try {
      let t = await it("get", e);
      if (t) return t;
    } catch {}
    try {
      return JSON.parse(w().getItem(at + e) || "null");
    } catch {
      return null;
    }
  }
  async function st(e) {
    try {
      await it("delete", e);
    } catch {}
    try {
      w().removeItem(at + e);
    } catch {}
  }
  function lt(e, t = {}) {
    let a = {},
      r = { worldbooks: [] },
      i = 0;
    for (let r of et) {
      let o = e.delta?.[r] || [],
        n = new Set(t[r] || []);
      ((a[r] = o.filter((e) => !n.has(e))), (i += o.length));
    }
    let o = e.signatures?.worldbooks || {},
      n = t.worldbookSignatures || {};
    return (
      (r.worldbooks = Object.keys(o).filter(
        (e) => (t.worldbooks || []).includes(e) && n[e] && n[e] !== o[e],
      )),
      {
        missing: a,
        conflicts: r,
        total: i,
        missingCount: et.reduce((e, t) => e + a[t].length, 0),
        conflictCount: r.worldbooks.length,
      }
    );
  }
  async function dt(e, a) {
    let r = {
        format: t,
        version: 2,
        kind: e.kind,
        metadata: a,
        resources: [e],
      },
      i = !0 === e.__installOptions?.enabled;
    "character" === e.kind
      ? await p.bridge.importCharacterPackage(r)
      : "worldbook" === e.kind
        ? await p.bridge.importWorldbookWork(r)
        : "scenario" === e.kind
          ? await p.bridge.importScenarioPackage(r)
          : "generator" === e.kind
            ? await p.bridge.importGenerators(e.definitions)
            : "regex" === e.kind
              ? await p.bridge.importRegexes(e.regexes, { enabled: i })
              : "script" === e.kind
                ? await p.bridge.importScripts(e.scripts, { enabled: i })
                : "fengyue-item" === e.kind &&
                  (await p.bridge.importFengyueItems(e.items));
  }
  async function ct(e) {
    let a = await nt(e.id);
    if (a?.resources?.length) return a;
    if (!e.workId) throw Error("Bản ghi cài đặt cũ này thiếu mã tác phẩm, không thể tự động khôi phục.");
    let r = E((await I("/api/works/" + encodeURIComponent(e.workId))).payload),
      i = e.resources || [],
      o = r.resources.filter((e) =>
        i.some(
          (t) =>
            !(t.kind !== e.kind || (t.name && e.name && t.name !== e.name)),
        ),
      );
    if (!o.length) throw Error("Tác phẩm trên đám mây đã thay đổi, không thể khớp với nội dung cài đặt gốc.");
    let n = {
      format: t,
      version: 2,
      metadata: rt(r.metadata || {}),
      resources: rt(o),
      savedAt: new Date().toISOString(),
      source: "latest-compatible",
    };
    if (!(await ot(e.id, n))) throw Error("Môi trường hiện tại không thể lưu Snapshot khôi phục.");
    return n;
  }
  async function pt(e) {
    if (!p.bridge?.snapshotInstallState)
      throw Error("Môi trường hiện tại chưa kết nối giao diện kiểm tra cài đặt.");
    let t = await p.bridge.snapshotInstallState(),
      a = lt(e, t),
      r = rt(a.missing);
    if (
      ((r.worldbooks = [
        ...new Set([
          ...(r.worldbooks || []),
          ...(a.conflicts.worldbooks || []),
        ]),
      ]),
      !a.missingCount && !a.conflictCount)
    )
      return bt("Nội dung cài đặt hiện tại đã đầy đủ, không cần sửa chữa", "ok", "Kiểm tra hoàn tất");
    let i = await ct(e),
      o = i.resources
        .map((e) =>
          (function (e, t) {
            let a = rt(e),
              r =
                {
                  character: "characters",
                  worldbook: "worldbooks",
                  scenario: "scenarios",
                  regex: "regexes",
                  script: "scripts",
                  "fengyue-item": "fengyue",
                  generator: "generators",
                }[a.kind] || "",
              i = new Set(t[r] || []);
            if ("worldbook" === a.kind)
              a.entries = (a.entries || []).filter((e) => i.has(e.name));
            else if ("regex" === a.kind)
              a.regexes = (a.regexes || []).filter((e) => i.has(e.id));
            else if ("script" === a.kind)
              a.scripts = (a.scripts || []).filter((e) => i.has(e.id));
            else if ("fengyue-item" === a.kind)
              a.items = (a.items || []).filter((e) => i.has(e.id));
            else if ("generator" === a.kind)
              a.definitions = (a.definitions || []).filter((e) => i.has(e.id));
            else {
              if ("scenario" === a.kind && !i.has(a.scenario?.id)) return null;
              if ("character" === a.kind && !i.size) return null;
            }
            let o =
              a.entries || a.regexes || a.scripts || a.items || a.definitions;
            return Array.isArray(o) && !o.length ? null : a;
          })(e, r),
        )
        .filter(Boolean);
    if (!o.length) throw Error("Không tìm thấy nội dung bị thiếu tương ứng trong Snapshot.");
    let n = await p.bridge.snapshotInstallState();
    for (let e of o) await dt(e, i.metadata);
    let s = await p.bridge.snapshotInstallState(),
      l = (function (e = {}, t = {}) {
        return Object.fromEntries(
          et.map((a) => [a, [...new Set([...(e[a] || []), ...(t[a] || [])])]]),
        );
      })(e.delta, Ze(n, s));
    for (let t of et)
      l[t] = (l[t] || []).filter(
        (a) => (e.delta?.[t] || []).includes(a) || (s[t] || []).includes(a),
      );
    let d = {
      ...e,
      snapshotVersion: 2,
      delta: l,
      signatures: {
        worldbooks: Object.fromEntries(
          (l.worldbooks || [])
            .filter((e) => s.worldbookSignatures?.[e])
            .map((e) => [e, s.worldbookSignatures[e]]),
        ),
      },
    };
    (Xe(Ke().map((t) => (t.id === e.id ? d : t))),
      await le("downloads"),
      bt(
        `Đã khôi phục ${a.missingCount + a.conflictCount} mục nội dung`,
        "ok",
        "Sửa chữa hoàn tất",
      ));
  }
  function ut(e, t = !1) {
    let a = e.global_name || e.author || "Tác giả ẩn danh",
      r = (function (e) {
        return /^https:\/\//i.test(String(e.author_avatar_url || ""))
          ? e.author_avatar_url
          : "";
      })(e);
    return `<span class="work-author ${t ? "compact" : ""}">${r ? `<img src="${v(r)}" alt="" loading="lazy">` : `<i>${v(String(a).slice(0, 1))}</i>`}<span><b>${v(a)}</b>${t ? "" : `<small>${v(be(e.created_at))}</small>`}</span></span>`;
  }
  function mt(e) {
    let t =
      String(e.cover_url || "")
        .split(/[\n,]/)
        .map((e) => e.trim())
        .find((e) => /^https?:\/\//i.test(e)) || "";
    return `<article class="featured-entry" data-a="detail" data-id="${v(e.id)}"><div class="featured-media">${t ? `<img src="${v(t)}" alt="${v(e.title)}" loading="lazy" referrerpolicy="no-referrer">` : "<span>Tàng</span>"}</div><div class="featured-copy"><small>${v(S(e.type))}</small><b>${v(e.title)}</b>${ut(e, !0)}</div></article>`;
  }
  ((A = async function () {
    T(
      '<section class="page"><section class="featured-ribbon"><div class="featured-intro"><p class="eyebrow">FEATURED ARCHIVE</p><h1>Tuyển chọn</h1><p>Tác phẩm chất lượng cao do quản trị viên chọn lọc.</p></div><div class="featured-strip" data-featured>Đang tải tuyển chọn…</div></section><section class="new-arrivals"><div class="title"><div><p class="eyebrow">NEW ARRIVALS</p><h1>Mới nhập tàng</h1></div><button class="btn primary" data-v="publish">Phát hành tác phẩm</button></div><div class="grid" data-list>Đang tra duyệt…</div></section></section>',
    );
    try {
      let e = await I("/api/works?page=1&pageSize=12&sort=newest"),
        t = e.items.filter((e) => Number(e.featured_order) > 0);
      ((d.querySelector("[data-featured]").innerHTML =
        t.slice(0, 8).map(mt).join("") || '<p class="muted">Tạm chưa có tác phẩm tuyển chọn</p>'),
        (d.querySelector("[data-list]").innerHTML =
          e.items.slice(0, 8).map(L).join("") ||
          '<p class="muted">Tạm chưa có tác phẩm công khai</p>'));
    } catch (e) {
      d.querySelector("[data-featured]").textContent = e.message;
    }
  }),
    (j = async function () {
      (T(
        `<section class="page"><div class="title"><div><p class="eyebrow">ARCHIVE INDEX</p><h1>Tất cả tác phẩm</h1></div></div><div class="catalog-tools"><div class="catalog-search"><input class="input" data-q placeholder="Tìm kiếm tác phẩm, tác giả hoặc nhãn"><button class="btn primary" data-a="search">Tìm kiếm</button></div><div class="catalog-filters"><span>Phân loại và Sắp xếp</span><select class="select" data-t><option value="">Tất cả tài nguyên</option>${Object.keys(
          s,
        )
          .map((e) => `<option value="${e}">${S(e)}</option>`)
          .join(
            "",
          )}</select><select class="select" data-c><option value="">Tất cả phân loại</option>${l.map((e) => `<option>${e}</option>`).join("")}</select><select class="select" data-sort><option value="newest">Mới phát hành</option><option value="likes">Nhiều lượt thích nhất</option><option value="favorites">Nhiều bộ sưu tập nhất</option><option value="downloads">Nhiều lượt tải nhất</option></select></div></div><div class="grid" data-list>Đang tra duyệt…</div></section>`,
      ),
        q());
    }));
  const gt = (Y = function (e) {
    return (
      e.target.matches("[data-r],[data-item],[data-w],[data-wbjson]") &&
        (c._contentTouched = !0),
      Ae(e)
    );
  });
  function bt(e, t = "ok", a = "err" === t ? "Thao tác thất bại" : "Thao tác thành công") {
    if ((d?.querySelector(".workshop-toast")?.remove(), !d)) return;
    d.insertAdjacentHTML(
      "beforeend",
      `<div class="workshop-toast ${"err" === t ? "err" : "ok"}" role="status" aria-live="polite"><b>${v(a)}</b><span>${v(e)}</span></div>`,
    );
    let r = d.querySelector(".workshop-toast");
    setTimeout(() => r?.remove(), 5e3);
  }
  ((Y = function (e) {
    if (!e.target.matches("[data-t],[data-c],[data-sort]") || "catalog" !== m)
      return gt(e);
    q();
  }),
    (le = async function (e = "works") {
      if (
        (T(
          `<section class="page"><div class="title"><div><p class="eyebrow">MY ARCHIVE</p><h1>Của tôi</h1></div></div><div class="bar mine-tabs"><button class="btn ${"works" === e ? "primary" : ""}" data-my="works">Tôi đã phát hành</button><button class="btn ${"favorites" === e ? "primary" : ""}" data-my="favorites">Bộ sưu tập của tôi</button><button class="btn ${"downloads" === e ? "primary" : ""}" data-my="downloads">Lượt tải của tôi</button></div><div class="grid" data-list>Đang đọc…</div></section>`,
        ),
        "downloads" === e)
      ) {
        let e = Ke();
        return void (d.querySelector("[data-list]").innerHTML =
          e
            .map(
              (e) =>
                `<article class="installed-card"><div><p class="eyebrow">INSTALLED</p><h3>${v(e.title)}</h3><p>${v((e.resources || []).map((e) => e.name).join("、") || "Nội dung đã cài đặt")}</p><small>${v(be(e.installedAt))}</small></div><button class="btn" data-uninstall="${v(e.id)}">Gỡ cài đặt</button></article>`,
            )
            .join("") ||
          '<p class="muted">Tạm chưa có bản ghi cài đặt. Nơi này sẽ ghi lại các tác phẩm được cài đặt từ bây giờ.</p>');
      }
      try {
        let t = await I(
          "works" === e
            ? "/api/me/works?page=1&pageSize=30"
            : "/api/me/favorites?page=1&pageSize=30",
        );
        d.querySelector("[data-list]").innerHTML =
          t.items
            .map((t) => {
              let a =
                  "pending" === t.status
                    ? "<button disabled>Chờ phê duyệt</button>"
                    : `<button data-own="${"published" === t.status ? "hide" : "publish"}" data-id="${v(t.id)}">${"published" === t.status ? "Gỡ xuống" : "Đăng lên"}</button>`,
                r =
                  "works" === e
                    ? `<div class="card-actions"><button data-own="edit" data-id="${v(t.id)}">Sửa đổi</button>${a}<button class="danger" data-own="delete" data-id="${v(t.id)}">Xóa</button></div>`
                    : "";
              return L(t).replace("</article>", r + "</article>");
            })
            .join("") ||
          `<p class="muted">${"works" === e ? "Bạn chưa phát hành tác phẩm nào" : "Tạm chưa có bộ sưu tập"}</p>`;
      } catch (e) {
        d.querySelector("[data-list]").textContent = e.message;
      }
    }),
    (J = async function () {
      let e = E(b.payload);
      for (let t of d.querySelectorAll("[data-character-gallery]")) {
        let a = e.resources[+t.dataset.characterGallery];
        "character" === a?.kind &&
          a.character &&
          (a.character.gallery = t.value);
      }
      let a = [...d.querySelectorAll("[data-i]:checked")]
        .map((t) => e.resources[+t.dataset.i])
        .filter(Boolean);
      if (!a.length) throw Error("Vui lòng chọn ít nhất một mục nội dung.");
      if (!p.bridge)
        throw Error(
          "Môi trường hiện tại chưa kết nối giao diện cài đặt thanh trạng thái, vui lòng đóng Công Xưởng và mở lại từ biểu tượng đám mây trên thanh trạng thái.",
        );
      let r = (await p.bridge.snapshotInstallState?.()) || {};
      for (let r of a) {
        let a = {
          format: t,
          version: 2,
          kind: r.kind,
          metadata: e.metadata,
          resources: [r],
        };
        if ("character" === r.kind) {
          if ("function" != typeof p.bridge.importCharacterPackage)
            throw Error("Giao diện cài đặt gói nhân vật không khả dụng.");
          await p.bridge.importCharacterPackage(a);
        } else if ("worldbook" === r.kind) {
          if ("function" != typeof p.bridge.importWorldbookWork)
            throw Error("Giao diện cài đặt Thế Giới Thư không khả dụng.");
          await p.bridge.importWorldbookWork(a);
        } else if ("generator" === r.kind) {
          if ("function" != typeof p.bridge.importGenerators)
            throw Error("Giao diện cài đặt bộ sinh không khả dụng.");
          await p.bridge.importGenerators(r.definitions);
        } else if ("regex" === r.kind) {
          if ("function" != typeof p.bridge.importRegexes)
            throw Error("Giao diện cài đặt Regex không khả dụng.");
          await p.bridge.importRegexes(r.regexes);
        } else if ("script" === r.kind) {
          if ("function" != typeof p.bridge.importScripts)
            throw Error("Giao diện cài đặt kịch bản không khả dụng.");
          await p.bridge.importScripts(r.scripts);
        } else if ("scenario" === r.kind) {
          if ("function" != typeof p.bridge.importScenarioPackage)
            throw Error("Giao diện cài đặt Danh phận DLC không khả dụng.");
          await p.bridge.importScenarioPackage(a);
        } else if ("fengyue-item" === r.kind) {
          if ("function" != typeof p.bridge.importFengyueItems)
            throw Error("Giao diện cài đặt Phong Nguyệt Các không khả dụng.");
          await p.bridge.importFengyueItems(r.items);
        }
      }
      let i = (await p.bridge.snapshotInstallState?.()) || {};
      (Xe([
        {
          id: `${b.id}-${Date.now()}`,
          workId: b.id,
          title: b.title,
          installedAt: new Date().toISOString(),
          resources: a.map((e) => ({ kind: e.kind, name: e.name })),
          delta: Ze(r, i),
        },
        ...Ke(),
      ]),
        d.querySelector(".workshop-dialog")?.remove(),
        d.querySelector(".modal")?.remove());
      let o = await I("/api/works/" + encodeURIComponent(b.id) + "/download", {
        method: "POST",
      });
      ((b.downloads = o.downloads),
        bt(`Đã cài đặt ${a.length} mục nội dung, và thêm vào "Lượt tải của tôi"`, "ok", "Cài đặt hoàn tất"));
    }));
  const ht = J;
  J = async function () {
    let e = E(b.payload);
    for (let t of d.querySelectorAll("[data-character-gallery]")) {
      let a = e.resources[+t.dataset.characterGallery];
      "character" === a?.kind && a.character && (a.character.gallery = t.value);
    }
    let a = [...d.querySelectorAll("[data-i]:checked")]
        .map((t) => e.resources[+t.dataset.i])
        .filter(Boolean),
      r = {
        format: t,
        version: 2,
        metadata: rt(e.metadata || {}),
        resources: rt(a),
        savedAt: new Date().toISOString(),
        source: "installed",
      };
    await ht();
    let i = Ke(),
      o = i.find((e) => e.workId === b.id && e.id === i[0]?.id);
    if (!o) return;
    let n = await ot(o.id, r),
      s = (await p.bridge.snapshotInstallState?.()) || {};
    ((o.snapshotVersion = n ? 2 : 1),
      (o.signatures = {
        worldbooks: Object.fromEntries(
          (o.delta?.worldbooks || [])
            .filter((e) => s.worldbookSignatures?.[e])
            .map((e) => [e, s.worldbookSignatures[e]]),
        ),
      }),
      Xe(i),
      n ||
        bt(
          "Tác phẩm đã được cài đặt, nhưng môi trường hiện tại không thể lưu Snapshot khôi phục hoàn chỉnh",
          "err",
          "Lưu Snapshot thất bại",
        ));
  };
  const ft = (Q = async function (e) {
      let t = e.target.closest?.('[data-note="deleteall"]'),
        a = e.target.closest?.('[data-a="notice-delete-confirm"]');
      if (t)
        return (
          d.querySelector(".workshop-dialog")?.remove(),
          void d.insertAdjacentHTML(
            "beforeend",
            '<div class="workshop-dialog" data-dialog="notice-delete"><section><p class="eyebrow">CLEAR NOTIFICATIONS</p><h2>Xóa toàn bộ thông báo?</h2><p class="muted">Thao tác này sẽ dọn sạch danh sách thông báo của riêng bạn; thông báo công khai chỉ ẩn đối với bạn, không ảnh hưởng đến người dùng khác.</p><div class="dialog-actions"><button data-a="dialog-close">Hủy bỏ</button><button class="primary" data-a="notice-delete-confirm">Xóa toàn bộ</button></div></section></div>',
          )
        );
      if (a) {
        ((a.disabled = !0), (a.textContent = "Đang xóa…"));
        try {
          return (
            await I("/api/me/notifications", { method: "DELETE" }),
            d.querySelector(".workshop-dialog")?.remove(),
            Re()
          );
        } catch (e) {
          return (
            (a.disabled = !1),
            (a.textContent = "Xóa toàn bộ"),
            k(e.message || "Xóa thất bại", "err")
          );
        }
      }
      return Ge(e);
    }),
    xt = (T = function (e) {
      (Qe(e), Pe());
    }),
    vt = (T = function (e) {
      (xt(e),
        d.insertAdjacentHTML(
          "afterbegin",
          `<style>#${a} .featured-ribbon{display:grid;grid-template-columns:210px minmax(0,1fr);gap:18px;padding:18px;border:1px solid var(--line);border-radius:20px;background:linear-gradient(120deg,var(--card),color-mix(in srgb,var(--accent) 8%,var(--paper2)))}#${a} .featured-intro h1{margin:4px 0 5px;font-size:26px}#${a} .featured-intro p:not(.eyebrow){margin:0 0 12px;color:var(--muted);font-size:12px}#${a} .featured-strip{display:flex;gap:10px;min-width:0;overflow-x:auto;scroll-snap-type:x proximity;padding:2px 2px 7px}#${a} .featured-entry{display:grid;grid-template-columns:82px minmax(0,1fr);flex:0 0 250px;min-height:118px;overflow:hidden;border:1px solid var(--line);border-radius:14px;background:var(--card);cursor:pointer;scroll-snap-align:start}#${a} .featured-media{display:grid;place-items:center;overflow:hidden;background:var(--paper2);color:var(--accent);font-size:25px}#${a} .featured-media img{width:100%;height:100%;object-fit:contain}#${a} .featured-copy{align-self:center;min-width:0;padding:12px}#${a} .featured-copy small,#${a} .featured-copy p{color:var(--muted);font-size:10px}#${a} .featured-copy b{display:block;margin:5px 0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:14px}#${a} .featured-copy p{margin:0}#${a} .new-arrivals{margin-top:26px}#${a} .catalog-tools{display:grid;gap:10px;margin-bottom:18px}#${a} .catalog-search{display:flex;gap:8px}#${a} .catalog-search .input{min-width:0}#${a} .catalog-filters{display:flex;align-items:center;gap:8px;padding:10px 12px;border:1px solid var(--line);border-radius:14px;background:color-mix(in srgb,var(--card) 78%,transparent)}#${a} .catalog-filters>span{margin-right:auto;color:var(--muted);font-size:11px;letter-spacing:.1em}#${a} .installed-card{display:flex;align-items:center;justify-content:space-between;gap:14px;min-height:150px;padding:18px;border:1px solid var(--line);border-radius:16px;background:var(--card)}#${a} .installed-card h3{margin:5px 0}#${a} .installed-card p,#${a} .installed-card small{color:var(--muted)}#${a} .auth-assist a{display:inline-flex;align-items:center;text-decoration:none}@media(max-width:700px){#${a}{inset:4px!important;border-radius:15px!important}#${a} .shell{grid-template-rows:56px minmax(0,1fr)}#${a} .head{grid-template-columns:minmax(0,1fr) auto!important;gap:6px!important;padding:8px 9px!important}#${a} .brand{min-width:0}#${a} .brand b{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:13px}#${a} .brand small{display:none}#${a} .head-actions{gap:5px}#${a} .account{width:34px;height:34px;padding:0;border-radius:50%}#${a} .account .avatar{width:32px;height:32px}#${a} [data-v="notifications"],#${a} .close{display:inline-flex!important;width:34px;height:34px;align-items:center;justify-content:center;padding:7px!important}#${a} .main{padding:16px 10px 82px}#${a} .page{width:100%}#${a} .nav{left:8px;right:8px;bottom:8px;transform:none;width:auto;max-width:none;overflow-x:auto;justify-content:space-between;padding:4px}#${a} .nav button{flex:1 0 auto;padding:8px 12px;white-space:nowrap}#${a} .title{align-items:center;gap:10px}#${a} .title h1{font-size:25px}#${a} .grid{grid-template-columns:1fr!important;gap:12px}#${a} .card{min-height:0!important}#${a} .cover{height:auto!important;aspect-ratio:3/4}#${a} .card-body{padding:13px}#${a} .sheet{padding:14px;border-radius:15px}#${a} .featured-ribbon{grid-template-columns:1fr;gap:10px;padding:13px}#${a} .featured-intro{display:grid;grid-template-columns:1fr auto;align-items:end;gap:4px 8px}#${a} .featured-intro .eyebrow,#${a} .featured-intro p:not(.eyebrow){grid-column:1/-1}#${a} .featured-intro h1{font-size:22px}#${a} .featured-entry{flex-basis:225px;grid-template-columns:74px minmax(0,1fr);min-height:105px}#${a} .catalog-search{display:grid;grid-template-columns:minmax(0,1fr) auto}#${a} .catalog-filters{display:grid;grid-template-columns:1fr;gap:7px}#${a} .catalog-filters>span{margin:0}#${a} .select,#${a} .input{width:100%;min-width:0}#${a} .mine-tabs{display:grid;grid-template-columns:repeat(3,1fr);width:100%}#${a} .mine-tabs .btn{padding:8px 5px}#${a} .notice-item{display:grid;gap:10px}#${a} .notice-actions{justify-content:flex-end}#${a} .workshop-dialog{align-items:end;padding:8px}#${a} .workshop-dialog section{width:100%;max-height:88dvh;padding:18px;border-radius:18px 18px 12px 12px}#${a} .modal{align-items:end!important;padding:8px!important}#${a} .modal section{width:100%;max-height:88dvh!important;border-radius:18px 18px 12px 12px}#${a} .account-menu{right:8px;top:60px;max-width:calc(100vw - 16px)}#${a} .two,#${a} .item-fields{grid-template-columns:1fr!important}#${a} .installed-card{min-height:120px;padding:14px}}</style>`,
        ));
    });
  L = function (e) {
    let t =
      String(e.cover_url || e.coverUrl || "")
        .split(/[\n,]/)
        .map((e) => e.trim())
        .find((e) => /^https?:\/\//i.test(e)) || "";
    return `<article class="card" data-a="detail" data-id="${v(e.id)}"><div class="cover">${t ? `<img src="${v(t)}" alt="${v(e.title)}" loading="lazy" referrerpolicy="no-referrer">` : ""}</div><div class="card-body"><div class="card-top"><span>${v(S(e.type))}</span><span>Tải xuống ${Number(e.downloads || 0)}</span></div><h3>${v(e.title)}</h3><p>${v(e.summary || "Chưa điền thuyết minh tác phẩm")}</p><div>${[
      ...(e.categories || []),
      ...(e.tags || []),
    ]
      .slice(0, 3)
      .map((e) => `<i class="tag">${v(e)}</i>`)
      .join(
        "",
      )}</div>${ut(e)}</div><div class="work-signals"><span>♡ ${Number(e.likes || 0)}</span><span>☆ ${Number(e.favorites || 0)}</span></div></article>`;
  };
  const wt = (T = function (e) {
      (vt(e),
        d.insertAdjacentHTML(
          "afterbegin",
          `<style>@media(max-width:700px){#${a} .head{backdrop-filter:none!important}#${a} .featured-intro p:not(.eyebrow){display:none}#${a} .featured-ribbon{padding:10px}#${a} .featured-strip{padding-bottom:3px}#${a} .featured-entry{min-height:94px}#${a} .featured-intro h1{margin:0;font-size:21px}}</style>`,
        ));
    }),
    yt = (T = function (e) {
      (wt(e),
        d.insertAdjacentHTML(
          "afterbegin",
          `<style>#${a} .work-author{display:flex;align-items:center;gap:9px;margin-top:12px;color:var(--muted)}#${a} .work-author>img,#${a} .work-author>i{width:30px;height:30px;flex:0 0 30px;border:1px solid var(--line);border-radius:50%;object-fit:cover;background:var(--paper2)}#${a} .work-author>i{display:grid;place-items:center;color:var(--accent);font-style:normal}#${a} .work-author>span{min-width:0}#${a} .work-author b{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--ink);font-size:14px;font-weight:600}#${a} .work-author small{display:block;margin-top:2px;color:var(--muted);font-size:10px}#${a} .work-author.compact{margin-top:7px;gap:6px}#${a} .work-author.compact>img,#${a} .work-author.compact>i{width:23px;height:23px;flex-basis:23px}#${a} .work-author.compact b{font-size:12px}@media(max-width:700px){#${a} .grid{gap:9px}#${a} .card{display:grid!important;grid-template-columns:104px minmax(0,1fr);min-height:158px!important;overflow:hidden}#${a} .cover{width:104px;height:100%!important;min-height:158px;aspect-ratio:auto!important}#${a} .cover img{height:100%;object-fit:cover}#${a} .card-body{min-width:0;padding:10px!important}#${a} .card-body h3{margin:6px 0;font-size:16px}#${a} .card-body>p{display:-webkit-box;overflow:hidden;-webkit-line-clamp:2;-webkit-box-orient:vertical;margin:5px 0;font-size:11px}#${a} .work-author{margin-top:8px}#${a} .work-signals,#${a} .card-actions{grid-column:1/-1}#${a} .work-signals{padding:7px 10px}#${a} .card-actions button{padding:8px 6px}}</style>`,
        ));
    }),
    $t = (Q = async function (e) {
      let t = e.target.closest?.('[data-a="installok"]'),
        a = e.target.closest?.('[data-a="install-confirm"]'),
        r = e.target.closest?.("[data-uninstall]"),
        i = e.target.closest?.('[data-a="uninstall-confirm"]'),
        o = e.target.closest?.("[data-auth-copy]");
      if (!o) {
        if (t)
          return (
            d.querySelector(".workshop-dialog")?.remove(),
            void d.insertAdjacentHTML(
              "beforeend",
              '<div class="workshop-dialog"><section><p class="eyebrow">INSTALL WORK</p><h2>Xác nhận cài đặt nội dung đã chọn?</h2><p class="muted">Tài nguyên sau khi cài đặt sẽ được ghi vào "Lượt tải của tôi", sau này có thể gỡ bỏ các nội dung mới thêm từ đó.</p><div class="dialog-actions"><button data-a="dialog-close">Hủy bỏ</button><button class="primary" data-a="install-confirm">Xác nhận cài đặt</button></div></section></div>',
            )
          );
        if (a) {
          ((a.disabled = !0), (a.textContent = "Đang cài đặt…"));
          try {
            return await J();
          } catch (e) {
            return (
              (a.disabled = !1),
              (a.textContent = "Xác nhận cài đặt"),
              k(e.message || "Cài đặt thất bại", "err")
            );
          }
        }
        if (r) {
          let e = Ke().find((e) => e.id === r.dataset.uninstall);
          if (!e) return;
          return void d.insertAdjacentHTML(
            "beforeend",
            `<div class="workshop-dialog"><section><p class="eyebrow">UNINSTALL WORK</p><h2>Gỡ cài đặt 《${v(e.title)}》?</h2><p class="muted">Sẽ xóa các nhân vật, mục Thế Giới Thư, bộ sinh, Regex, kịch bản và vật phẩm Phong Nguyệt Các mới thêm trong lần cài đặt này; nội dung trùng tên bị ghi đè khi cài đặt sẽ không bị xóa.</p><div class="dialog-actions"><button data-a="dialog-close">Hủy bỏ</button><button class="primary" data-a="uninstall-confirm" data-id="${v(e.id)}">Xác nhận gỡ cài đặt</button></div></section></div>`,
          );
        }
        if (i) {
          let e = Ke().find((e) => e.id === i.dataset.id);
          if (!e) return;
          ((i.disabled = !0), (i.textContent = "Đang gỡ cài đặt…"));
          try {
            return (
              await p.bridge.uninstallInstall?.(e.delta),
              Xe(Ke().filter((t) => t.id !== e.id)),
              d.querySelector(".workshop-dialog")?.remove(),
              k("Gỡ cài đặt hoàn tất", "ok"),
              le("downloads")
            );
          } catch (e) {
            return (
              (i.disabled = !1),
              (i.textContent = "Xác nhận gỡ cài đặt"),
              k(e.message || "Gỡ cài đặt thất bại", "err")
            );
          }
        }
        return ft(e);
      }
      try {
        (await navigator.clipboard.writeText(o.dataset.authCopy),
          k("Đã sao chép liên kết ủy quyền", "ok"));
      } catch {
        k("Sao chép thất bại, vui lòng nhấn giữ nút ủy quyền để sao chép liên kết", "err");
      }
    });
  async function kt(e) {
    let t = e.target.closest?.('[data-own="delete"]'),
      a = e.target.closest?.('[data-a="work-delete-confirm"]');
    if (t || a) {
      if ((e.preventDefault(), e.stopImmediatePropagation(), t))
        return (
          d.querySelector(".workshop-dialog")?.remove(),
          void d.insertAdjacentHTML(
            "beforeend",
            `<div class="workshop-dialog" data-dialog="delete-work"><section><p class="eyebrow">DELETE WORK</p><h2>Xóa tác phẩm này?</h2><p class="muted">Tác phẩm sẽ bị xóa vĩnh viễn khỏi Sáng Ý Công Xưởng, bản ghi tải xuống, lượt thích và bộ sưu tập cũng không thể khôi phục.</p><div class="dialog-actions"><button data-a="dialog-close">Hủy bỏ</button><button class="danger" data-a="work-delete-confirm" data-id="${v(t.dataset.id)}">Xác nhận xóa</button></div></section></div>`,
          )
        );
      ((a.disabled = !0), (a.textContent = "Đang xóa…"));
      try {
        (await I("/api/works/" + encodeURIComponent(a.dataset.id), {
          method: "DELETE",
        }),
          d.querySelector(".workshop-dialog")?.remove(),
          await le("works"),
          bt("Tác phẩm đã bị xóa vĩnh viễn khỏi Sáng Ý Công Xưởng", "ok", "Xóa thành công"));
      } catch (e) {
        ((a.disabled = !1),
          (a.textContent = "Xác nhận xóa"),
          bt(e.message || "Xóa thất bại", "err", "Xóa thất bại"));
      }
    }
  }
  Q = async function (e) {
    let t = e.target.closest?.('[data-own="delete"]'),
      a = e.target.closest?.('[data-a="work-delete-confirm"]');
    if (t)
      return (
        e.preventDefault(),
        e.stopImmediatePropagation(),
        d.querySelector(".workshop-dialog")?.remove(),
        void d.insertAdjacentHTML(
          "beforeend",
          `<div class="workshop-dialog" data-dialog="delete-work"><section><p class="eyebrow">DELETE WORK</p><h2>Xóa tác phẩm này?</h2><p class="muted">Tác phẩm sẽ bị xóa vĩnh viễn khỏi Sáng Ý Công Xưởng, bản ghi tải xuống, lượt thích và bộ sưu tập cũng không thể khôi phục.</p><div class="dialog-actions"><button data-a="dialog-close">Hủy bỏ</button><button class="danger" data-a="work-delete-confirm" data-id="${v(t.dataset.id)}">Xác nhận xóa</button></div></section></div>`,
        )
      );
    if (a) {
      (e.preventDefault(),
        e.stopImmediatePropagation(),
        (a.disabled = !0),
        (a.textContent = "Đang xóa…"));
      try {
        return (
          await I("/api/works/" + encodeURIComponent(a.dataset.id), {
            method: "DELETE",
          }),
          d.querySelector(".workshop-dialog")?.remove(),
          await le("works"),
          bt("Tác phẩm đã bị xóa vĩnh viễn khỏi Sáng Ý Công Xưởng", "ok", "Xóa thành công")
        );
      } catch (e) {
        return (
          (a.disabled = !1),
          (a.textContent = "Xác nhận xóa"),
          bt(e.message || "Xóa thất bại", "err", "Xóa thất bại")
        );
      }
    }
    return $t(e);
  };
  let St = "all";
  const Ct = [
    ["all", "Tất cả"],
    ["pending", "Chờ phê duyệt"],
    ["published", "Đã phát hành"],
    ["hidden", "Đã gỡ xuống"],
  ];
  function It(e) {
    return "pending" === e.status
      ? ["Chờ phê duyệt", "pending"]
      : "published" === e.status
        ? ["Đã phát hành", "published"]
        : ["Đã gỡ xuống", "hidden"];
  }
  le = async function (e = "works") {
    if (
      (T(
        `<section class="page"><div class="title"><div><p class="eyebrow">MY ARCHIVE</p><h1>Của tôi</h1></div></div><div class="bar mine-tabs"><button class="btn ${"works" === e ? "primary" : ""}" data-my="works">Tôi đã phát hành</button><button class="btn ${"favorites" === e ? "primary" : ""}" data-my="favorites">Bộ sưu tập của tôi</button><button class="btn ${"downloads" === e ? "primary" : ""}" data-my="downloads">Lượt tải của tôi</button></div>${"works" === e ? '<div class="publish-status-tabs" data-publish-status-tabs></div>' : ""}<div class="grid ${"downloads" === e ? "installed-grid" : ""}" data-list>Đang đọc…</div></section>`,
      ),
      "downloads" === e)
    ) {
      let e = Ke(),
        t = null;
      try {
        t = await p.bridge?.snapshotInstallState?.();
      } catch {}
      return void (d.querySelector("[data-list]").innerHTML =
        e
          .map((e) => {
            let a = t ? lt(e, t) : null,
              r = Boolean(
                e.targetCharacterId &&
                t?.characterId &&
                e.targetCharacterId !== t.characterId,
              ),
              i = Boolean(a && (a.missingCount || a.conflictCount)),
              o = r
                ? ["Phát hiện thẻ mới", "broken"]
                : a
                  ? i
                    ? [
                        `Cần bổ sung ${a.missingCount + a.conflictCount} mục`,
                        "broken",
                      ]
                    : ["Cài đặt hoàn chỉnh", "healthy"]
                  : ["Không thể kiểm tra", "unknown"],
              n = r
                ? `Thẻ cài đặt gốc: ${e.targetCharacterName || e.targetCharacterId} · Thẻ hiện tại: ${t.characterName || t.characterId}`
                : a
                  ? (a.missingCount ? `Thiếu ${a.missingCount} mục` : "") +
                    (a.missingCount && a.conflictCount ? " · " : "") +
                    (a.conflictCount ? `Nội dung xung đột ${a.conflictCount} mục` : "")
                  : "Vui lòng mở lại Công Xưởng từ đám mây thanh trạng thái";
            return `<article class="installed-card install-health-card"><div class="installed-copy"><div class="install-state ${o[1]}"><i></i>${o[0]}</div><p class="eyebrow">INSTALL SNAPSHOT</p><h3>${v(e.title)}</h3><p>${v((e.resources || []).map((e) => e.name).join("、") || "Nội dung đã cài đặt")}</p><small>${v(be(e.installedAt))}${n ? " · " + v(n) : ""}</small></div><div class="installed-actions">${i && !r ? `<button class="btn primary" data-repair-install="${v(e.id)}">Bổ sung mục thiếu</button>` : ""}<button class="btn ${r ? "primary" : ""}" data-apply-install="${v(e.id)}">Áp dụng vào thẻ hiện tại</button><button class="btn" data-uninstall="${v(e.id)}">${r ? "Xóa bản ghi" : "Gỡ cài đặt"}</button></div></article>`;
          })
          .join("") ||
        '<p class="muted">Tạm chưa có bản ghi cài đặt. Nơi này sẽ ghi lại các tác phẩm được cài đặt từ bây giờ.</p>');
    }
    try {
      let t =
        (
          await I(
            "works" === e
              ? "/api/me/works?page=1&pageSize=50"
              : "/api/me/favorites?page=1&pageSize=50",
          )
        ).items || [];
      if ("works" === e) {
        let e = { all: t.length, pending: 0, published: 0, hidden: 0 };
        (t.forEach((t) => e[It(t)[1]]++),
          (d.querySelector("[data-publish-status-tabs]").innerHTML = Ct.map(
            ([t, a]) =>
              `<button class="publish-status ${St === t ? "on" : ""}" data-my-status="${t}"><span>${a}</span><b>${e[t]}</b></button>`,
          ).join("")),
          "all" !== St && (t = t.filter((e) => It(e)[1] === St)));
      }
      d.querySelector("[data-list]").innerHTML =
        t
          .map((t) => {
            let [a, r] = It(t),
              i =
                "pending" === t.status
                  ? "<button disabled>Chờ phê duyệt</button>"
                  : "hidden" === t.status && "code" === t.review_tier
                    ? '<button disabled title="Vui lòng nộp lại xét duyệt qua quy trình sửa đổi">Đăng lại cần xét duyệt</button>'
                    : `<button data-own="${"published" === t.status ? "hide" : "publish"}" data-id="${v(t.id)}">${"published" === t.status ? "Gỡ xuống" : "Đăng lên"}</button>`,
              o =
                "works" === e
                  ? `<div class="own-work-state ${r}"><i></i><span>${a}</span></div><div class="card-actions"><button data-own="edit" data-id="${v(t.id)}">Sửa đổi</button>${i}<button class="danger" data-own="delete" data-id="${v(t.id)}">Xóa</button></div>`
                  : "";
            return L(t).replace("</article>", o + "</article>");
          })
          .join("") ||
        `<p class="muted">${"works" === e ? ("all" === St ? "Bạn chưa phát hành tác phẩm nào" : "Chưa có tác phẩm trong phân loại này") : "Tạm chưa có bộ sưu tập"}</p>`;
    } catch (e) {
      d.querySelector("[data-list]").textContent = e.message;
    }
  };
  const Et = Q,
    Tt = (T = function (e) {
      (yt(e),
        d.insertAdjacentHTML(
          "afterbegin",
          `<style>#${a} .workshop-toast{position:absolute;left:50%;top:50%;z-index:30;display:grid;grid-template-columns:auto minmax(0,1fr);align-items:center;gap:5px 12px;width:min(390px,calc(100% - 36px));padding:16px 18px;transform:translate(-50%,-50%);border:1px solid color-mix(in srgb,#3f9b68 62%,var(--line));border-radius:16px;background:linear-gradient(135deg,var(--card),var(--paper2));box-shadow:0 22px 65px color-mix(in srgb,var(--ink) 34%,transparent);animation:workshop-toast-in .24s ease-out}.workshop-toast:before{content:'✓';grid-row:1/3;display:grid;width:34px;height:34px;place-items:center;border-radius:50%;color:#fff;background:#3f9b68;box-shadow:0 7px 18px rgba(63,155,104,.28);font-weight:800}.workshop-toast b{font-size:14px}.workshop-toast span{color:var(--muted);font-size:12px}.workshop-toast.err{border-color:color-mix(in srgb,#b65448 62%,var(--line))}.workshop-toast.err:before{content:'!';background:#b65448;box-shadow:0 7px 18px rgba(182,84,72,.28)}@keyframes workshop-toast-in{from{opacity:0;transform:translate(-50%,calc(-50% + 10px))}to{opacity:1;transform:translate(-50%,-50%)}}@media(max-width:700px){#${a} .workshop-toast{width:calc(100% - 28px);padding:15px 16px}}</style>`,
        ));
    });
  let Lt = 0,
    At = !1;
  function jt() {
    try {
      (w().removeItem(r), w().removeItem(i));
    } catch {}
  }
  function qt() {
    (jt(),
      !d ||
        At ||
        d.querySelector('[data-dialog="session-expired"]') ||
        ((At = !0),
        d.querySelector(".account-menu")?.remove(),
        d.insertAdjacentHTML(
          "beforeend",
          '<div class="workshop-dialog session-expired-dialog" data-dialog="session-expired" role="alertdialog" aria-modal="true" aria-labelledby="cmw-session-expired-title"><section><div class="session-expired-mark" aria-hidden="true">Thất</div><p class="eyebrow">AUTHORIZATION EXPIRED</p><h2 id="cmw-session-expired-title">Chứng chỉ Công Xưởng đã hết hạn</h2><p class="muted">Phiên đăng nhập hiện tại đã tự động dọn dẹp, không cần đăng xuất từ góc trên bên phải. Chỉ cần hoàn tất ủy quyền Discord lại để tiếp tục, chứng chỉ đăng nhập mới có hiệu lực trong <b>72 giờ</b>.</p><div class="session-expired-note">Bản nháp phát hành vẫn được lưu giữ tại máy này; sau khi đăng nhập lại có thể tiếp tục thao tác vừa rồi.</div><div class="dialog-actions"><button data-a="session-expired-dismiss">Tạm không đăng nhập</button><button class="primary" data-a="session-expired-login">Đăng nhập lại ngay</button></div></section></div>',
        )));
  }
  function Nt() {
    try {
      return crypto.randomUUID().replace(/-/g, "");
    } catch {
      let e = crypto.getRandomValues(new Uint8Array(24));
      return btoa(String.fromCharCode(...e))
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=/g, "");
    }
  }
  function zt() {
    try {
      let e = JSON.parse(w().getItem(n) || "null");
      return !e?.nonce || Date.now() - Number(e.createdAt || 0) > 66e4
        ? (w().removeItem(n), null)
        : e;
    } catch {
      return null;
    }
  }
  function _t(e = "") {
    try {
      let t = zt();
      (e && t?.nonce !== e) || w().removeItem(n);
    } catch {}
  }
  let Ot = null;
  async function Rt(t, a = !0) {
    if (Ot?.nonce === t) return Ot.promise;
    let o = (async () => {
      let o = await fetch(
          e + "/api/auth/discord/status?nonce=" + encodeURIComponent(t),
          { cache: "no-store", headers: { accept: "application/json" } },
        ),
        n = await o.json().catch(() => ({}));
      if (404 === o.status || "pending" === n.status) return null;
      if (!o.ok) {
        let e = Error(n.error || `Đọc trạng thái ủy quyền thất bại (${o.status})`);
        throw ((e.authTerminal = 400 === o.status || 410 === o.status), e);
      }
      if ("error" === n.status || !n.token || !n.user) {
        let e = Error(n.error || "Ủy quyền thất bại.");
        throw ((e.authTerminal = !0), e);
      }
      return (
        w().setItem(r, n.token),
        w().setItem(i, JSON.stringify(n.user)),
        _t(t),
        a &&
          d &&
          (d.querySelector(".workshop-dialog")?.remove(),
          (m = "discover"),
          await B(),
          Je(!0).catch(() => {})),
        n
      );
    })();
    Ot = { nonce: t, promise: o };
    try {
      return await o;
    } finally {
      Ot?.promise === o && (Ot = null);
    }
  }
  async function Mt(e = !0) {
    let t = zt();
    if (!t) return !1;
    try {
      return !!(await Rt(t.nonce, e));
    } catch (e) {
      return (
        e?.authTerminal &&
          (_t(t.nonce),
          d && bt(e.message || "Đăng nhập Discord thất bại", "err", "Đăng nhập thất bại")),
        !1
      );
    }
  }
  function Ht() {
    try {
      return window.parent || window;
    } catch {
      return window;
    }
  }
  async function Dt(e, t = Ht()) {
    let a = {};
    try {
      a = t.screen || globalThis.screen || {};
    } catch {}
    let r = Math.max(0, (Number(a.width || 500) - 500) / 2),
      i = Math.max(0, (Number(a.height || 700) - 700) / 2),
      o = null;
    try {
      o = t.open(
        e,
        "workshop_discord_auth",
        `popup=yes,width=500,height=700,left=${r},top=${i}`,
      );
    } catch {}
    if (o) return { mode: "popup", window: o };
    if (
      (function (e) {
        try {
          return Boolean(e?.__TAURITAVERN__ || window.__TAURITAVERN__);
        } catch {
          return !1;
        }
      })(t)
    ) {
      try {
        let a =
          t.__TAURI__?.opener?.openUrl || window.__TAURI__?.opener?.openUrl;
        if ("function" == typeof a)
          return (await a(e), { mode: "external", window: null });
      } catch {}
      try {
        return (t.open(e, "_blank"), { mode: "external", window: null });
      } catch {}
    }
    try {
      let a = t.open(e, "_blank");
      if (a) return { mode: "external", window: a };
    } catch {}
    return { mode: "blocked", window: null };
  }
  function Ut(e) {
    if (!d) return;
    let t = d.querySelector("[data-auth-title]"),
      a = d.querySelector("[data-auth-copy]"),
      r = d.querySelector("[data-auth-waiting]"),
      i = d.querySelector("[data-auth-footnote]"),
      o =
        "popup" === e
          ? [
              "Cửa sổ ủy quyền đã mở",
              "Sau khi hoàn tất ủy quyền Discord, cửa sổ ủy quyền sẽ tự động đóng, Sáng Ý Công Xưởng sẽ hoàn tất đăng nhập ngay sau đó.",
              "Đang chờ kết quả ủy quyền…",
              "Có thể tiếp tục ở lại trang này; kết quả ủy quyền sẽ tự động trả về.",
            ]
          : "external" === e
            ? [
                "Đã mở trong trình duyệt hệ thống",
                "Môi trường hiện tại cần ủy quyền trong trình duyệt hệ thống. Sau khi hoàn tất chuyển lại Quán Rượu, Công Xưởng sẽ tự động nhận kết quả.",
                "Đang chờ ủy quyền; hoàn tất vui lòng chuyển lại Quán Rượu…",
                "Dành cho các môi trường như TT bản cũ không hỗ trợ cửa sổ ủy quyền trong ứng dụng.",
              ]
            : [
                "Không thể tự động mở trang ủy quyền",
                "Môi trường hoặc trình duyệt hiện tại đã chặn cửa sổ pop-up, vui lòng mở lại, hoặc sao chép liên kết vào trình duyệt.",
                "Chưa mở trang ủy quyền",
                "Sáng Ý Công Xưởng sẽ giữ lại phiên đăng nhập này trong khoảng 10 phút.",
              ];
    (t && (t.textContent = o[0]),
      a && (a.textContent = o[1]),
      r && ((r.dataset.mode = e), (r.querySelector("span").textContent = o[2])),
      i && (i.textContent = o[3]));
  }
  F = function () {
    At = !1;
    let t = ++Lt,
      a = Ht(),
      o = null,
      s = Nt(),
      l = (function (t) {
        let a = new URL(e).origin;
        try {
          let e = t.location?.origin || window.location?.origin,
            r = new URL(e);
          if (r.origin === a) return a;
          if (
            ["http:", "https:"].includes(r.protocol) &&
            ["localhost", "127.0.0.1", "[::1]"].includes(r.hostname)
          )
            return r.origin;
        } catch {}
        return a;
      })(a),
      c =
        e +
        "/api/auth/discord/launch?origin=" +
        encodeURIComponent(l) +
        "&nonce=" +
        encodeURIComponent(s),
      p = !1,
      u = new URL(e).origin,
      g = () => {};
    !(function (e, t) {
      try {
        w().setItem(
          n,
          JSON.stringify({ nonce: e, launchUrl: t, createdAt: Date.now() }),
        );
      } catch {}
    })(s, c);
    let b = async (e) => {
        if (!p && t === Lt) {
          ((p = !0),
            (At = !1),
            g(),
            w().setItem(r, e.token),
            w().setItem(i, JSON.stringify(e.user)),
            _t(s));
          try {
            o?.close();
          } catch {}
          d &&
            (d.querySelector(".workshop-dialog")?.remove(),
            (m = "discover"),
            await B(),
            Je(!0).catch(() => {}));
        }
      },
      h = (e) => {
        let t = e.data;
        e.origin === u &&
          "canming-workshop-auth" === t?.type &&
          t.nonce === s &&
          t.token &&
          t.user &&
          b(t).catch((e) => k(e.message || "Đăng nhập thất bại", "err"));
      };
    try {
      a.addEventListener("message", h);
    } catch {}
    (d.querySelector(".workshop-dialog")?.remove(),
      d.insertAdjacentHTML(
        "beforeend",
        `<div class="workshop-dialog auth-assist" data-auth-attempt="${t}"><section><p class="eyebrow">DISCORD AUTHORIZATION</p><h2 data-auth-title>Đang mở ủy quyền Discord</h2><p class="muted" data-auth-copy>Đang chọn phương thức ủy quyền phù hợp cho môi trường hiện tại.</p><div class="auth-waiting" data-auth-waiting data-mode="opening"><i></i><span>Đang mở trang ủy quyền…</span></div><div class="dialog-actions auth-actions"><button data-auth-copy-url="${v(c)}">Sao chép liên kết</button><button class="primary" data-auth-open-url="${v(c)}">Mở lại trang ủy quyền</button></div><p class="auth-footnote" data-auth-footnote>Phiên ủy quyền đã được lưu giữ an toàn.</p></section></div>`,
      ));
    try {
      (a.__canmingWorkshopAuthPollCleanup?.(),
        a.__canmingWorkshopAuthPollTimer &&
          (a.clearTimeout(a.__canmingWorkshopAuthPollTimer),
          a.clearInterval(a.__canmingWorkshopAuthPollTimer)));
    } catch {}
    const f = [2e3, 3e3, 5e3, 8e3, 13e3, 21e3, 3e4, 45e3, 6e4];
    let x,
      S = !1,
      C = 0,
      I = !1,
      E = Date.now();
    g = () => {
      if (!I) {
        I = !0;
        try {
          (a.__canmingWorkshopAuthPollTimer &&
            (a.clearTimeout(a.__canmingWorkshopAuthPollTimer),
            a.clearInterval(a.__canmingWorkshopAuthPollTimer),
            (a.__canmingWorkshopAuthPollTimer = null)),
            a.removeEventListener("message", h),
            a.removeEventListener("focus", x),
            a.removeEventListener("pageshow", x),
            a.document?.removeEventListener("visibilitychange", x),
            a.__canmingWorkshopAuthPollCleanup === g &&
              (a.__canmingWorkshopAuthPollCleanup = null));
        } catch {}
      }
    };
    let T = async (e = "timer") => {
      if (S || I || p) return;
      if (t !== Lt) return void g();
      let r = zt();
      if (y() && !r) return ((p = !0), void g());
      if (!r || Date.now() - E >= 66e4)
        return (
          g(),
          void (d && bt("Chờ ủy quyền quá thời gian, vui lòng đăng nhập lại", "err", "Đăng nhập quá hạn"))
        );
      S = !0;
      try {
        let e = await Rt(s, !1);
        if (e) return void (await b(e));
      } catch (e) {
        if (e?.authTerminal)
          return (
            _t(s),
            g(),
            void (d && bt(e.message || "Đăng nhập Discord thất bại", "err", "Đăng nhập thất bại"))
          );
      } finally {
        S = !1;
      }
      if (!I && !p) {
        let e = f[Math.min(C, f.length - 1)];
        (C++,
          ((e) => {
            if (!I && !p)
              try {
                (a.__canmingWorkshopAuthPollTimer &&
                  a.clearTimeout(a.__canmingWorkshopAuthPollTimer),
                  (a.__canmingWorkshopAuthPollTimer = a.setTimeout(() => {
                    T("timer");
                  }, e)));
              } catch {}
          })(e));
      }
    };
    x = (e) => {
      if (
        !(
          I ||
          p ||
          ("visibilitychange" === e?.type &&
            "hidden" === a.document?.visibilityState)
        )
      ) {
        C = 0;
        try {
          a.__canmingWorkshopAuthPollTimer &&
            a.clearTimeout(a.__canmingWorkshopAuthPollTimer);
        } catch {}
        T("resume");
      }
    };
    try {
      ((a.__canmingWorkshopAuthPollCleanup = g),
        a.addEventListener("focus", x),
        a.addEventListener("pageshow", x),
        a.document?.addEventListener("visibilitychange", x),
        T("initial"));
    } catch {}
    Dt(c, a)
      .then((e) => {
        ((o = e.window), Ut(e.mode));
      })
      .catch(() => Ut("blocked"));
  };
  const Pt = (Q = async function (e) {
      let t = e.target.closest?.("[data-my-status]");
      return t ? ((St = t.dataset.myStatus), le("works")) : Et(e);
    }),
    Wt = (T = function (e) {
      (Tt(e),
        d.insertAdjacentHTML(
          "afterbegin",
          `<style>#${a} .publish-status-tabs{display:flex;flex-wrap:wrap;gap:7px;margin:12px 0 18px;padding:7px;border:1px solid var(--line);border-radius:15px;background:color-mix(in srgb,var(--card) 74%,transparent)}#${a} .publish-status{display:inline-flex;align-items:center;gap:8px;padding:8px 12px;border:1px solid transparent;border-radius:11px;color:var(--muted);background:transparent;cursor:pointer}#${a} .publish-status b{display:grid;min-width:20px;height:20px;place-items:center;padding:0 5px;border-radius:999px;background:var(--paper2);font-size:10px}#${a} .publish-status.on{border-color:color-mix(in srgb,var(--accent) 42%,var(--line));color:var(--ink);background:color-mix(in srgb,var(--accent) 12%,var(--card));box-shadow:0 7px 18px color-mix(in srgb,var(--ink) 8%,transparent)}#${a} .publish-status.on b{color:#fff;background:var(--accent)}#${a} .own-work-state{display:flex;align-items:center;gap:7px;padding:9px 14px 0;color:var(--muted);font-size:11px}#${a} .own-work-state i{width:7px;height:7px;border-radius:50%;background:#a69479;box-shadow:0 0 0 3px color-mix(in srgb,#a69479 14%,transparent)}#${a} .own-work-state.pending i{background:#d39855;box-shadow:0 0 0 3px color-mix(in srgb,#d39855 16%,transparent)}#${a} .own-work-state.published i{background:#4f9a6e;box-shadow:0 0 0 3px color-mix(in srgb,#4f9a6e 16%,transparent)}@media(max-width:700px){#${a} .publish-status-tabs{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:4px;padding:5px}#${a} .publish-status{justify-content:center;gap:4px;padding:7px 3px;font-size:11px}#${a} .publish-status b{min-width:18px;height:18px;padding:0 4px}}</style>`,
        ));
    }),
    Jt = (Q = async function (e) {
      let t = e.target.closest?.("[data-auth-open-url]"),
        a = e.target.closest?.("[data-auth-copy-url]");
      if (!t) {
        if (a) {
          e.preventDefault();
          let t = await (async function (e) {
            try {
              return (await navigator.clipboard.writeText(e), !0);
            } catch {}
            try {
              let t = u.createElement("textarea");
              ((t.value = e),
                t.setAttribute("readonly", ""),
                (t.style.cssText = "position:fixed;left:-9999px;top:0"),
                u.body.appendChild(t),
                t.select(),
                t.setSelectionRange(0, t.value.length));
              let a = u.execCommand("copy");
              return (t.remove(), a);
            } catch {
              return !1;
            }
          })(a.dataset.authCopyUrl);
          return bt(
            t ? "Đã sao chép liên kết ủy quyền" : "Sao chép thất bại, vui lòng nhấn giữ liên kết để sao chép thủ công",
            t ? "ok" : "err",
            t ? "Sao chép thành công" : "Sao chép thất bại",
          );
        }
        return Pt(e);
      }
      (e.preventDefault(), (t.disabled = !0));
      try {
        let e = await Dt(t.dataset.authOpenUrl);
        (Ut(e.mode),
          bt(
            "blocked" === e.mode ? "Vui lòng cho phép pop-up hoặc sao chép liên kết ủy quyền" : "Trang ủy quyền đã mở",
            "blocked" === e.mode ? "err" : "ok",
            "blocked" === e.mode ? "Không thể mở" : "Đang chờ ủy quyền",
          ));
      } finally {
        t.disabled = !1;
      }
    }),
    Vt = (T = function (e) {
      (Wt(e),
        d.insertAdjacentHTML(
          "afterbegin",
          `<style>#${a} .auth-assist section{width:min(520px,100%)}#${a} .auth-waiting{display:flex;align-items:center;gap:10px;margin:16px 0;padding:12px 14px;border:1px solid var(--line);border-radius:13px;background:color-mix(in srgb,var(--card) 78%,transparent);color:var(--muted);font-size:12px}#${a} .auth-waiting i{width:10px;height:10px;border-radius:50%;background:#d39855;box-shadow:0 0 0 4px color-mix(in srgb,#d39855 16%,transparent);animation:cmw-login-pulse 1.5s ease-in-out infinite}#${a} .auth-waiting[data-mode="popup"] i{background:#4f9a6e;box-shadow:0 0 0 4px color-mix(in srgb,#4f9a6e 16%,transparent)}#${a} .auth-waiting[data-mode="blocked"] i{background:#b84835;box-shadow:0 0 0 4px color-mix(in srgb,#b84835 16%,transparent);animation:none}#${a} .auth-actions{display:grid;grid-template-columns:1fr 1.25fr}#${a} .auth-footnote{margin:13px 0 0;color:var(--muted);font-size:10px;line-height:1.6}@keyframes cmw-login-pulse{50%{opacity:.45;transform:scale(.82)}}@media(max-width:700px){#${a} .auth-actions{grid-template-columns:1fr}#${a} .auth-actions button{width:100%;padding:11px 12px}}</style>`,
        ));
    });
  async function Bt(e) {
    let t = e.target.closest?.("[data-uninstall]"),
      a = e.target.closest?.('[data-a="uninstall-confirm"]');
    if (!t && !a) return;
    (e.preventDefault(), e.stopImmediatePropagation());
    let r = t?.dataset.uninstall || a?.dataset.id,
      i = Ke().find((e) => e.id === r);
    if (!i) return;
    let o = (await p.bridge?.snapshotInstallState?.()) || {},
      n = Boolean(
        i.targetCharacterId &&
        o.characterId &&
        i.targetCharacterId !== o.characterId,
      );
    if (t)
      return (
        d.querySelector(".workshop-dialog")?.remove(),
        void d.insertAdjacentHTML(
          "beforeend",
          `<div class="workshop-dialog" data-dialog="uninstall"><section><p class="eyebrow">${n ? "REMOVE RECORD" : "UNINSTALL WORK"}</p><h2>${n ? "Xóa bản ghi cài đặt của thẻ cũ?" : `Gỡ cài đặt 《${v(i.title)}》?`}</h2><p class="muted">${n ? "Hiện tại đã là thẻ nhân vật khác, lần này chỉ xóa bản ghi cài đặt và Snapshot của thẻ cũ, không xóa nhầm nội dung trùng tên trên thẻ hiện tại." : "Sẽ gỡ bỏ tài nguyên mới thêm trong lần cài đặt này và xóa Snapshot khôi phục cục bộ."}</p><div class="dialog-actions"><button data-a="dialog-close">Hủy bỏ</button><button class="${n ? "" : "danger"}" data-a="uninstall-confirm" data-id="${v(i.id)}">${n ? "Xóa bản ghi" : "Xác nhận gỡ cài đặt"}</button></div></section></div>`,
        )
      );
    ((a.disabled = !0), (a.textContent = n ? "Đang xóa…" : "Đang gỡ cài đặt…"));
    try {
      if (!n) {
        if ("function" != typeof p.bridge?.uninstallInstall)
          throw Error("Môi trường hiện tại chưa kết nối giao diện gỡ cài đặt.");
        await p.bridge.uninstallInstall(i.delta);
      }
      (await st(i.id),
        Xe(Ke().filter((e) => e.id !== i.id)),
        d.querySelector(".workshop-dialog")?.remove(),
        await le("downloads"),
        bt(
          n
            ? `Bản ghi thẻ cũ của 《${i.title}》 đã được xóa`
            : `Nội dung mới thêm của 《${i.title}》 đã được gỡ bỏ`,
          "ok",
          n ? "Bản ghi đã xóa" : "Gỡ cài đặt hoàn tất",
        ));
    } catch (e) {
      ((a.disabled = !1),
        (a.textContent = n ? "Xóa bản ghi" : "Xác nhận gỡ cài đặt"),
        bt(e.message || "Gỡ cài đặt thất bại", "err", "Gỡ cài đặt thất bại"));
    }
  }
  async function Ft(e) {
    let t = e.target.closest?.("[data-repair-install]"),
      a = e.target.closest?.("[data-apply-install]"),
      r = e.target.closest?.('[data-a="repair-install-confirm"]'),
      i = e.target.closest?.('[data-a="apply-install-confirm"]');
    if (!(t || a || r || i)) return;
    (e.preventDefault(), e.stopImmediatePropagation());
    let o =
        t?.dataset.repairInstall ||
        a?.dataset.applyInstall ||
        r?.dataset.id ||
        i?.dataset.id,
      n = Ke().find((e) => e.id === o);
    if (!n) return;
    if (t) {
      let e = lt(n, (await p.bridge?.snapshotInstallState?.()) || {}),
        t = [
          e.missingCount ? `Thiếu ${e.missingCount} mục` : "",
          e.conflictCount ? `Xung đột nội dung trùng tên ${e.conflictCount} mục` : "",
        ]
          .filter(Boolean)
          .join("，");
      return (
        d.querySelector(".workshop-dialog")?.remove(),
        void d.insertAdjacentHTML(
          "beforeend",
          `<div class="workshop-dialog" data-dialog="repair-install"><section><p class="eyebrow">REPAIR INSTALLATION</p><h2>Bổ sung 《${v(n.title)}》?</h2><p class="muted">Phát hiện ${v(t || "Nội dung cài đặt bất thường")}. Sẽ khôi phục nội dung bị thiếu từ Snapshot cài đặt cục bộ; Thế Giới Thư trùng tên nhưng khác nội dung sẽ hỏi lại có ghi đè hay không.</p><div class="install-repair-note">Chỉ bổ sung nội dung bị thiếu hoặc xung đột, không xử lý lặp lại các tài nguyên còn lại.</div><div class="dialog-actions"><button data-a="dialog-close">Hủy bỏ</button><button class="primary" data-a="repair-install-confirm" data-id="${v(n.id)}">Bắt đầu bổ sung</button></div></section></div>`,
        )
      );
    }
    if (a) {
      let e = (await p.bridge?.snapshotInstallState?.()) || {},
        t =
          [e.characterName, e.characterVersion].filter(Boolean).join(" · ") ||
          "Thẻ nhân vật hiện tại",
        a =
          n.targetCharacterId &&
          e.characterId &&
          n.targetCharacterId !== e.characterId;
      return (
        d.querySelector(".workshop-dialog")?.remove(),
        void d.insertAdjacentHTML(
          "beforeend",
          `<div class="workshop-dialog apply-current-card-dialog" data-dialog="apply-install"><section><p class="eyebrow">APPLY TO CURRENT CARD</p><h2>Áp dụng 《${v(n.title)}》 vào thẻ hiện tại?</h2><p class="muted">Mục tiêu: <b>${v(t)}</b>. Sẽ tái thiết lập nội dung từ Snapshot hoàn chỉnh lúc cài đặt, không cần gỡ bỏ bản ghi trên thẻ cũ trước.</p><div class="install-repair-note">${a ? "Đã phát hiện thẻ nhân vật đã được thay đổi." : "Nếu thẻ hiện tại đã có tài nguyên trùng tên, vẫn có thể hỏi có ghi đè hay không; vui lòng không thực hiện lặp lại khi chưa đổi thẻ."}</div><div class="dialog-actions"><button data-a="dialog-close">Hủy bỏ</button><button class="primary" data-a="apply-install-confirm" data-id="${v(n.id)}">Áp dụng vào thẻ hiện tại</button></div></section></div>`,
        )
      );
    }
    let s = r || i;
    ((s.disabled = !0), (s.textContent = i ? "Đang chuyển đổi…" : "Đang bổ sung…"));
    try {
      (i
        ? await (async function (e) {
            if (!p.bridge?.snapshotInstallState)
              throw Error("Môi trường hiện tại chưa kết nối giao diện chuyển đổi cài đặt.");
            let t = await ct(e);
            if (!t.resources?.length)
              throw Error("Trong Snapshot cài đặt không có nội dung có thể áp dụng.");
            let a = await p.bridge.snapshotInstallState();
            for (let e of t.resources) await dt(rt(e), t.metadata);
            let r = await p.bridge.snapshotInstallState(),
              i = Ze(a, r),
              o = {
                ...e,
                installedAt: new Date().toISOString(),
                targetCharacterId: r.characterId || "",
                targetCharacterName: r.characterName || "",
                targetCharacterVersion: r.characterVersion || "",
                delta: i,
                signatures: {
                  worldbooks: Object.fromEntries(
                    (i.worldbooks || [])
                      .filter((e) => r.worldbookSignatures?.[e])
                      .map((e) => [e, r.worldbookSignatures[e]]),
                  ),
                },
              };
            (Xe(Ke().map((t) => (t.id === e.id ? o : t))),
              await le("downloads"),
              bt(`《${e.title}》 đã áp dụng vào thẻ nhân vật hiện tại`, "ok", "Chuyển đổi hoàn tất"));
          })(n)
        : await pt(n),
        d.querySelector(".workshop-dialog")?.remove());
    } catch (e) {
      ((s.disabled = !1),
        (s.textContent = i ? "Áp dụng vào thẻ hiện tại" : "Bắt đầu bổ sung"),
        bt(
          e.message || (i ? "Chuyển đổi thất bại" : "Sửa chữa thất bại"),
          "err",
          i ? "Chuyển đổi thất bại" : "Sửa chữa thất bại",
        ));
    }
  }
  const Gt = (T = function (e) {
      (Vt(e),
        d.insertAdjacentHTML(
          "afterbegin",
          `<style>#${a} .session-expired-dialog section{position:relative;overflow:hidden;width:min(500px,100%);padding:30px 28px 24px;border-color:color-mix(in srgb,#b84835 58%,var(--line));background:radial-gradient(circle at 88% 12%,color-mix(in srgb,#b84835 13%,transparent),transparent 32%),linear-gradient(145deg,var(--card),var(--paper2))}#${a} .session-expired-mark{position:absolute;right:25px;top:22px;display:grid;width:58px;height:58px;place-items:center;border:3px double #b84835;border-radius:8px;color:#b84835;font-size:28px;font-weight:900;transform:rotate(7deg);opacity:.82}#${a} .session-expired-dialog h2{max-width:310px;margin:7px 0 12px;color:var(--ink);font-size:25px}#${a} .session-expired-dialog .muted{max-width:390px;line-height:1.85}#${a} .session-expired-dialog .muted b{color:var(--accent)}#${a} .session-expired-note{margin-top:17px;padding:11px 13px;border-left:3px solid #b84835;border-radius:8px;background:color-mix(in srgb,#b84835 8%,transparent);color:var(--muted);font-size:12px}@media(max-width:700px){#${a} .session-expired-dialog section{padding:24px 20px 19px}#${a} .session-expired-mark{right:18px;top:18px;width:48px;height:48px;font-size:23px}#${a} .session-expired-dialog h2{max-width:250px;font-size:22px}#${a} .session-expired-dialog .dialog-actions{display:grid;grid-template-columns:1fr}#${a} .session-expired-dialog .dialog-actions button{width:100%;padding:11px}}</style>`,
        ));
    }),
    Qt = (T = function (e) {
      (Gt(e),
        d.insertAdjacentHTML(
          "afterbegin",
          `<style>#${a} .install-health-card{position:relative;overflow:hidden}#${a} .installed-copy{min-width:0;flex:1}#${a} .installed-actions{display:flex;gap:8px;align-items:center;flex-wrap:wrap;justify-content:flex-end}#${a} .install-state{display:inline-flex;align-items:center;gap:7px;margin-bottom:9px;padding:4px 9px;border:1px solid var(--line);border-radius:999px;color:var(--muted);background:color-mix(in srgb,var(--paper2) 70%,transparent);font-size:10px}#${a} .install-state i{width:7px;height:7px;border-radius:50%;background:#9b8c76}#${a} .install-state.healthy{color:#4f9a6e;border-color:color-mix(in srgb,#4f9a6e 45%,var(--line))}#${a} .install-state.healthy i{background:#4f9a6e;box-shadow:0 0 0 3px color-mix(in srgb,#4f9a6e 15%,transparent)}#${a} .install-state.broken{color:#c36a4e;border-color:color-mix(in srgb,#c36a4e 48%,var(--line));background:color-mix(in srgb,#c36a4e 8%,var(--card))}#${a} .install-state.broken i{background:#c36a4e;box-shadow:0 0 0 3px color-mix(in srgb,#c36a4e 16%,transparent);animation:install-alert-pulse 1.7s ease-in-out infinite}#${a} .install-repair-note{margin:15px 0;padding:11px 13px;border-left:3px solid var(--accent);border-radius:8px;background:color-mix(in srgb,var(--accent) 8%,transparent);color:var(--muted);font-size:12px}@keyframes install-alert-pulse{50%{opacity:.45;transform:scale(.8)}}@media(max-width:700px){#${a} .install-health-card{display:grid!important;gap:13px}#${a} .installed-actions{justify-content:stretch}#${a} .installed-actions .btn{flex:1}}</style>`,
        ));
    });
  async function Yt(e = {}) {
    if (
      (ca(),
      (p = e),
      (u = e.mountDocument || document),
      u.querySelectorAll("#" + a).forEach((e) => e.remove()),
      u.getElementById("canming-workshop-statusbar-language")?.remove(),
      (function () {
        let e = "canming-workshop-statusbar-language",
          t = u.getElementById(e);
        t ||
          ((t = u.createElement("style")),
          (t.id = e),
          (t.textContent = `#${a}{inset:14px!important;overflow:hidden!important;border:1px solid var(--line)!important;border-radius:22px!important;background:linear-gradient(135deg,var(--paper),var(--paper2))!important}#${a} .head{margin:0!important;padding:18px 22px!important;border:0!important;border-bottom:1px solid var(--line)!important;border-radius:0!important;background:transparent!important}#${a} .grid{grid-template-columns:repeat(auto-fill,minmax(240px,270px));gap:18px}#${a} .card{display:flex;flex-direction:column;min-height:480px;border-radius:16px;background:var(--card)}#${a} .cover{height:290px;overflow:hidden;background:var(--paper2)}#${a} .cover img{width:100%;height:100%;object-fit:cover}#${a} .featured-track{display:flex;gap:15px;overflow:hidden;padding:24px;align-items:center}.featured-slide{flex:0 0 205px;overflow:hidden;border:1px solid var(--line);border-radius:14px;background:var(--card);cursor:pointer}.featured-slide img,.featured-slide>div{width:100%;height:225px;object-fit:cover;display:block;background:var(--paper2)}.featured-slide b{display:block;padding:11px 12px;font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.featured-track .featured-slide{animation:featured-roll 22s linear infinite}.featured-track:hover .featured-slide{animation-play-state:paused}@keyframes featured-roll{0%,15%{transform:translateX(0)}85%,100%{transform:translateX(-150px)}}#${a} .work-signals{display:flex;gap:12px;padding:0 15px 12px;color:var(--muted);font-size:12px}#${a} .detail-covers img{width:100%;max-height:520px;object-fit:contain;background:var(--paper2);border-radius:16px}#${a} .modal{position:fixed!important;inset:0!important;padding:14px!important}#${a} .modal section{max-height:calc(100dvh - 28px)!important;overflow:auto!important}@media(max-width:700px){#${a}{inset:8px!important;border-radius:18px!important}#${a} .grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}#${a} .card{min-height:0}#${a} .cover{height:240px}#${a} .featured-track{padding:14px;overflow-x:auto}.featured-slide{flex-basis:175px}.featured-slide img,.featured-slide>div{height:210px}.featured-track .featured-slide{animation:none}}`),
          u.head.appendChild(t));
      })(),
      (d = u.createElement("div")),
      (d.id = a),
      (d.className = `theme-${e.theme || "night"}`),
      d.addEventListener("click", Oe, !0),
      d.addEventListener("click", kt, !0),
      d.addEventListener("click", Ft, !0),
      d.addEventListener("click", Bt, !0),
      d.addEventListener("click", Q),
      d.addEventListener("change", Y),
      u.body.appendChild(d),
      (c = (() => {
        try {
          return {
            kind: "",
            selected: {},
            custom: {
              name: "",
              content: "",
              keys: "",
              position: "after_character_definition",
            },
            worldbookName: "",
            wbQuery: "",
            wbEdits: {},
            item: { name: "", price: 0, desc: "", id: "" },
            meta: {
              title: "",
              summary: "",
              tags: "",
              categories: [],
              coverUrl: "",
            },
            bundle: null,
            collectionScenarioBundle: null,
            ...JSON.parse(w().getItem(o) || "{}"),
          };
        } catch {
          return {
            kind: "",
            selected: {},
            custom: {
              name: "",
              content: "",
              keys: "",
              position: "after_character_definition",
            },
            worldbookName: "",
            wbQuery: "",
            wbEdits: {},
            item: { name: "", price: 0, desc: "", id: "" },
            meta: {
              title: "",
              summary: "",
              tags: "",
              categories: [],
              coverUrl: "",
            },
            bundle: null,
            collectionScenarioBundle: null,
          };
        }
      })()),
      (g = 1),
      (h = s[e.initialType] ? e.initialType : ""),
      e.initialBundle)
    ) {
      let t = ga(e.initialBundle);
      ((c = {
        kind: "",
        selected: {},
        custom: {
          name: "",
          content: "",
          keys: "",
          position: "after_character_definition",
        },
        worldbookName: "",
        wbQuery: "",
        wbEdits: {},
        item: { name: "", price: 0, desc: "", id: "" },
        meta: {
          title: "",
          summary: "",
          tags: "",
          categories: [],
          coverUrl: "",
        },
        bundle: null,
        collectionScenarioBundle: null,
      }),
        (c.kind = "scenario"),
        (c.bundle = t.bundle),
        (c.meta = {
          ...c.meta,
          title: t.bundle.metadata?.title || t.resource.name,
          summary: t.bundle.metadata?.summary || "",
          tags: (t.bundle.metadata?.tags || []).join("，"),
          categories: (t.bundle.metadata?.categories || []).slice(0, 3),
          coverUrl: t.bundle.metadata?.coverUrl || "",
        }),
        (g = 2),
        C());
    }
    (await Mt(!1),
      (m = y()
        ? e.initialBundle
          ? "publish"
          : e.initialView || "discover"
        : "account"),
      await B(),
      Je(!1).catch(() => {}));
  }
  ((W = function () {
    let e = E(b.payload);
    d.insertAdjacentHTML(
      "beforeend",
      `<div class="modal"><section><p class="eyebrow">SELECTIVE INSTALL</p><h2>Chọn nội dung muốn cài đặt</h2>${e.resources.map((e, t) => `<div class="install-choice"><label class="choice"><input type="checkbox" data-i="${t}" checked><span><b>${v(e.name)}</b><small>${v(S(e.kind))}</small>${"character" === e.kind ? `<select class="select" data-character-gallery="${t}" aria-label="Quy thuộc Nhân vật chí của ${v(e.name)}"><option value="none"${e.character?.gallery && "none" !== e.character.gallery ? "" : " selected"}>Không đưa vào Nhân vật chí</option><option value="beauties"${"beauties" === e.character?.gallery ? " selected" : ""}>Quần Phương</option><option value="heroes"${"heroes" === e.character?.gallery ? " selected" : ""}>Anh Kiệt</option><option value="beings"${"beings" === e.character?.gallery ? " selected" : ""}>Chúng Sinh</option></select>` : ""}</span></label>${"regex" === e.kind || "script" === e.kind ? `<label class="enable-after-install"><input type="checkbox" data-enable-after-install="${t}" checked><span>Kích hoạt ${"script" === e.kind ? "kịch bản" : "Regex"} ngay sau khi cài đặt</span></label>` : ""}</div>`).join("")}<div class="note">Kịch bản và Regex có thể tùy chọn từng mục có kích hoạt ngay sau khi cài đặt hay không; nếu bỏ chọn, hệ thống chỉ cài đặt và giữ ở trạng thái đóng.</div><div class="row"><button class="btn" data-a="cancel">Hủy bỏ</button><button class="btn primary" data-a="installok">Cài đặt mục đã chọn</button></div></section></div>`,
    );
  }),
    (J = async function () {
      let e = E(b.payload);
      for (let t of d.querySelectorAll("[data-character-gallery]")) {
        let a = e.resources[+t.dataset.characterGallery];
        "character" === a?.kind &&
          a.character &&
          (a.character.gallery = t.value);
      }
      let a = [...d.querySelectorAll("[data-i]:checked")]
        .map((t) => ({
          resource: e.resources[+t.dataset.i],
          index: +t.dataset.i,
        }))
        .filter((e) => e.resource);
      if (!a.length) throw Error("Vui lòng chọn ít nhất một mục nội dung.");
      if (!p.bridge)
        throw Error(
          "Môi trường hiện tại chưa kết nối giao diện cài đặt thanh trạng thái, vui lòng đóng Công Xưởng và mở lại từ biểu tượng đám mây trên thanh trạng thái.",
        );
      let r = a.map(({ resource: e, index: t }) => {
          let a = rt(e);
          return (
            ("regex" !== e.kind && "script" !== e.kind) ||
              (a.__installOptions = {
                enabled:
                  !0 ===
                  d.querySelector(`[data-enable-after-install="${t}"]`)
                    ?.checked,
              }),
            a
          );
        }),
        i = {
          format: t,
          version: 2,
          metadata: rt(e.metadata || {}),
          resources: r,
          savedAt: new Date().toISOString(),
          source: "installed",
        },
        o = (await p.bridge.snapshotInstallState?.()) || {};
      for (let { resource: r, index: i } of a) {
        let a = {
            format: t,
            version: 2,
            kind: r.kind,
            metadata: e.metadata,
            resources: [r],
          },
          o =
            !0 ===
            d.querySelector(`[data-enable-after-install="${i}"]`)?.checked;
        if ("character" === r.kind) await p.bridge.importCharacterPackage(a);
        else if ("worldbook" === r.kind) await p.bridge.importWorldbookWork(a);
        else if ("generator" === r.kind)
          await p.bridge.importGenerators(r.definitions);
        else if ("regex" === r.kind)
          await p.bridge.importRegexes(r.regexes, { enabled: o });
        else if ("script" === r.kind)
          await p.bridge.importScripts(r.scripts, { enabled: o });
        else if ("scenario" === r.kind) await p.bridge.importScenarioPackage(a);
        else {
          if ("fengyue-item" !== r.kind)
            throw Error(`Phiên bản hiện tại không hỗ trợ cài đặt tài nguyên ${r.kind}.`);
          await p.bridge.importFengyueItems(r.items);
        }
      }
      let n = (await p.bridge.snapshotInstallState?.()) || {},
        s = a.map((e) => ({ kind: e.resource.kind, name: e.resource.name })),
        l = {
          id: `${b.id}-${Date.now()}`,
          workId: b.id,
          title: b.title,
          installedAt: new Date().toISOString(),
          targetCharacterId: n.characterId || "",
          targetCharacterName: n.characterName || "",
          targetCharacterVersion: n.characterVersion || "",
          resources: s,
          delta: Ze(o, n),
        },
        c = await ot(l.id, i);
      ((l.snapshotVersion = c ? 2 : 1),
        (l.signatures = {
          worldbooks: Object.fromEntries(
            (l.delta.worldbooks || [])
              .filter((e) => n.worldbookSignatures?.[e])
              .map((e) => [e, n.worldbookSignatures[e]]),
          ),
        }),
        Xe([l, ...Ke().filter((e) => e.workId !== b.id)]),
        d.querySelector(".workshop-dialog")?.remove(),
        d.querySelector(".modal")?.remove());
      let u = await I("/api/works/" + encodeURIComponent(b.id) + "/download", {
        method: "POST",
      });
      b.downloads = u.downloads;
      let m = a.find((e) => "scenario" === e.resource.kind)?.resource;
      m
        ? d.insertAdjacentHTML(
            "beforeend",
            `<div class="workshop-dialog" data-dialog="scenario-installed"><section><p class="eyebrow">IDENTITY INSTALLED</p><h2>Danh phận văn điệp đã được ghi vào</h2><p>Đã thêm <b>${Number(m.openings?.length || 0)}</b> lời mở đầu, <b>${Number(m.worldbookEntries?.length || 0)}</b> điều mục Thế Giới Thư, và cập nhật quan hệ danh phận của thẻ nhân vật hiện tại.</p><div class="note">Vui lòng làm mới thanh trạng thái trước, sau đó tạo cuộc trò chuyện mới từ Quán Rượu cho 《Tàn Minh Dư Tẫn》 và chọn lời mở đầu mới. Cuộc trò chuyện hiện có sẽ không chuyển đổi danh phận giữa chừng.</div><div class="dialog-actions"><button data-a="dialog-close">Xử lý sau</button><button class="primary" data-a="scenario-refresh">Làm mới thanh trạng thái ngay</button></div></section></div>`,
          )
        : bt(
            c
              ? `Đã cài đặt ${a.length} mục nội dung, và lưu Snapshot khôi phục hoàn chỉnh`
              : `Đã cài đặt ${a.length} mục nội dung, nhưng lưu Snapshot khôi phục thất bại`,
            c ? "ok" : "err",
            c ? "Cài đặt hoàn tất" : "Lưu Snapshot thất bại",
          );
    }));
const Kt = (T = function (e) {
    (Qt(e),
      d.insertAdjacentHTML(
        "afterbegin",
        `<style>#${a} .installed-grid{grid-template-columns:minmax(0,1fr)!important}#${a} .installed-grid .installed-card{width:100%;min-width:0}#${a} .installed-grid .installed-copy h3,#${a} .installed-grid .installed-copy p,#${a} .installed-grid .installed-copy small{word-break:normal;overflow-wrap:anywhere}#${a} .installed-grid .installed-actions .btn{white-space:nowrap}@media(max-width:700px){#${a} .installed-grid .install-health-card{grid-template-columns:minmax(0,1fr)!important;align-items:stretch}#${a} .installed-grid .installed-actions{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));width:100%}#${a} .installed-grid .installed-actions .btn{width:100%;min-width:0;padding:8px 5px}}</style>`,
      ));
  });
  let Xt = 0;
  const Zt = (T = function (e) {
    (Kt(e),
      d.insertAdjacentHTML(
        "afterbegin",
        `<style>#${a} .install-choice{border-bottom:1px dashed var(--line)}#${a} .install-choice:last-of-type{border-bottom:0}#${a} .install-choice .choice{border-bottom:0}#${a} .enable-after-install{display:flex;align-items:center;gap:8px;margin:-4px 3px 11px 32px;color:var(--accent);font-size:12px;cursor:pointer}#${a} .enable-after-install input{accent-color:var(--accent)}</style>`,
      ));
  });
  ((j = async function () {
    (T(
      `<section class="page"><div class="title"><div><p class="eyebrow">ARCHIVE INDEX</p><h1>Tất cả tác phẩm</h1></div></div><div class="catalog-tools"><div class="catalog-search"><input class="input" data-q placeholder="Tìm kiếm tác phẩm, tác giả hoặc thẻ"><button class="btn primary" data-a="search">Tìm kiếm</button></div><div class="catalog-filters"><select class="select" data-t><option value="">Tất cả tài nguyên</option>${Object.keys(
        s,
      )
        .map((e) => `<option value="${e}">${S(e)}</option>`)
        .join(
          "",
        )}</select><select class="select" data-c><option value="">Tất cả phân loại</option>${l.map((e) => `<option>${e}</option>`).join("")}</select><select class="select" data-sort><option value="downloads" selected>Nhiều lượt tải nhất</option><option value="newest">Mới phát hành</option><option value="likes">Nhiều lượt thích nhất</option><option value="favorites">Nhiều bộ sưu tập nhất</option></select></div></div><div class="grid" data-list>Đang tra duyệt…</div></section>`,
    ),
      q());
  }),
    (q = async function () {
      try {
        let e = d.querySelector("[data-sort]")?.value || "downloads",
          t = new URLSearchParams({
            page: 1,
            pageSize: 100,
            q: d.querySelector("[data-q]")?.value || "",
            type: d.querySelector("[data-t]")?.value || "",
            category: d.querySelector("[data-c]")?.value || "",
            sort: e,
          }),
          a = await I("/api/works?" + t),
          r = (e, t) =>
            "newest" === t
              ? new Date(e.created_at || 0).getTime()
              : Number(e[t] || 0),
          i = [...(a.items || [])].sort(
            (t, a) => r(a, e) - r(t, e) || r(a, "newest") - r(t, "newest"),
          );
        d.querySelector("[data-list]").innerHTML =
          i.slice(0, 30).map(L).join("") ||
          '<p class="muted">Không có tác phẩm phù hợp</p>';
      } catch (e) {
        d.querySelector("[data-list]").textContent = e.message;
      }
    }),
    (A = async function () {
      T(
        '<section class="page"><section class="featured-ribbon"><div class="featured-intro"><p class="eyebrow">FEATURED ARCHIVE</p><h1>Tuyển chọn</h1><div class="featured-controls"><button class="btn" data-a="featured-prev" aria-label="Xem tuyển chọn sang trái">‹</button><button class="btn" data-a="featured-next" aria-label="Xem tuyển chọn sang phải">›</button></div></div><div class="featured-strip" data-featured>Đang tải tuyển chọn…</div></section><section class="new-arrivals"><div class="title"><div><p class="eyebrow">NEW ARRIVALS</p><h1>Mới nhập tàng</h1></div><button class="btn primary" data-v="publish">Phát hành tác phẩm</button></div><div class="grid" data-list>Đang tra duyệt…</div></section></section>',
      );
      try {
        let e =
            (await I("/api/works?page=1&pageSize=50&sort=newest")).items || [],
          t = e.filter((e) => Number(e.featured_order) > 0),
          a = [...e].sort(
            (e, t) => new Date(t.created_at || 0) - new Date(e.created_at || 0),
          ),
          r = d.querySelector("[data-featured]");
        ((r.innerHTML =
          t.slice(0, 8).map(mt).join("") ||
          '<p class="muted">Tạm chưa có tác phẩm tuyển chọn</p>'),
          (d.querySelector("[data-list]").innerHTML =
            a.slice(0, 8).map(L).join("") ||
            '<p class="muted">Tạm chưa có tác phẩm công khai</p>'),
          t.length > 2 &&
            (Xt = setInterval(() => {
              if (!d || r.matches(":hover")) return;
              let e = r.scrollLeft + r.clientWidth >= r.scrollWidth - 8;
              r.scrollTo({
                left: e ? 0 : r.scrollLeft + 260,
                behavior: "smooth",
              });
            }, 5e3)));
      } catch (e) {
        d.querySelector("[data-featured]").textContent = e.message;
      }
    }),
    (P = async function (e) {
      T('<p class="page muted">Đang đọc tác phẩm…</p>');
      try {
        b = await I("/api/works/" + encodeURIComponent(e));
        let t = String(b.cover_url || b.coverUrl || "")
          .split(/[\n,]/)
          .map((e) => e.trim())
          .filter((e) => /^https?:\/\//i.test(e));
        T(
          `<section class="page work-detail"><button class="btn" data-v="catalog">← Trở về tất cả tác phẩm</button>${t.length ? `<div class="detail-gallery" data-cover-index="0" data-cover-list="${v(JSON.stringify(t))}"><img data-cover-image src="${v(t[0])}" alt="${v(b.title)}" loading="lazy" referrerpolicy="no-referrer">${t.length > 1 ? `<button class="gallery-arrow prev" data-a="cover-prev" aria-label="Ảnh bìa trước">‹</button><button class="gallery-arrow next" data-a="cover-next" aria-label="Ảnh bìa kế tiếp">›</button><span class="gallery-count" data-cover-count>1 / ${t.length}</span>` : ""}</div>` : ""}<p class="eyebrow">${v(S(b.type))} · ${v(be(b.created_at))}</p><h1>${v(b.title)}</h1>${ut(b)}<section class="detail-summary"><p>${v(b.summary || "Chưa điền thuyết minh tác phẩm")}</p></section><ul class="manifest">${E(
            b.payload,
          )
            .resources.map(
              (e) => `<li><b>${v(e.name)}</b> · ${v(S(e.kind))}</li>`,
            )
            .join(
              "",
            )}</ul><div class="row"><button class="btn primary" data-a="install">Cài đặt tùy chọn</button><button class="btn ${b.liked ? "primary" : ""}" data-a="like">${b.liked ? "♥" : "♡"} ${Number(b.likes || 0)}</button><button class="btn ${b.favorited ? "primary" : ""}" data-a="favorite">${b.favorited ? "★" : "☆"} ${Number(b.favorites || 0)}</button>${b.is_owner ? "" : '<button class="btn" data-a="report">Báo cáo vi phạm</button>'}</div></section>`,
        );
      } catch (e) {
        T(`<p class="page">${v(e.message)}</p>`);
      }
    }));
  const ea = (Q = async function (e) {
      let t = e.target.closest?.('[data-a="session-expired-login"]'),
        a = e.target.closest?.('[data-a="session-expired-dismiss"]');
      return t
        ? (e.preventDefault(),
          (At = !1),
          d.querySelector('[data-dialog="session-expired"]')?.remove(),
          F())
        : a
          ? (e.preventDefault(),
            (At = !1),
            d.querySelector('[data-dialog="session-expired"]')?.remove(),
            (m = "account"),
            B())
          : Jt(e);
    }),
    ta = (T = function (e) {
      (clearInterval(Xt), (Xt = 0), Zt(e));
    });
  async function aa(e, t = 20) {
    let a = [];
    for (let r = 1; r <= t; r++) {
      let t = new URLSearchParams({ ...e, page: r, pageSize: 20 }),
        i = (await I("/api/works?" + t)).items || [];
      if ((a.push(...i), i.length < 20)) break;
    }
    return [...new Map(a.map((e) => [e.id, e])).values()];
  }
  let ra = 1,
    ia = [];
  function oa() {
    let e = d.querySelector("[data-list]"),
      t = d.querySelector("[data-catalog-pager]"),
      a = Math.max(1, Math.ceil(ia.length / 20));
    ((ra = Math.min(Math.max(1, ra), a)),
      (e.innerHTML =
        ia
          .slice(20 * (ra - 1), 20 * ra)
          .map(L)
          .join("") || '<p class="muted">Không có tác phẩm phù hợp</p>'),
      (t.innerHTML =
        ia.length > 20
          ? `<button class="btn" data-a="catalog-prev" ${1 === ra ? "disabled" : ""}>Trang trước</button><span>${ra} / ${a}</span><button class="btn" data-a="catalog-next" ${ra === a ? "disabled" : ""}>Trang sau</button>`
          : ""));
  }
  ((j = async function () {
    (T(
      `<section class="page"><div class="title"><div><p class="eyebrow">ARCHIVE INDEX</p><h1>Tất cả tác phẩm</h1></div></div><div class="catalog-tools"><div class="catalog-search"><input class="input" data-q placeholder="Tìm kiếm tác phẩm, tác giả hoặc thẻ"><button class="btn primary" data-a="search">Tìm kiếm</button></div><div class="catalog-filters"><select class="select" data-t><option value="">Tất cả tài nguyên</option>${Object.keys(
        s,
      )
        .map((e) => `<option value="${e}">${S(e)}</option>`)
        .join(
          "",
        )}</select><select class="select" data-c><option value="">Tất cả phân loại</option>${l.map((e) => `<option>${e}</option>`).join("")}</select><select class="select" data-sort><option value="downloads" selected>Nhiều lượt tải nhất</option><option value="newest">Mới phát hành</option><option value="likes">Nhiều lượt thích nhất</option><option value="favorites">Nhiều bộ sưu tập nhất</option></select></div></div><div class="grid" data-list>Đang tra duyệt…</div><div class="catalog-pager" data-catalog-pager></div></section>`,
    ),
      q());
  }),
    (q = async function () {
      try {
        ra = 1;
        let e = d.querySelector("[data-sort]")?.value || "downloads",
          t = (e, t) =>
            "newest" === t
              ? new Date(e.created_at || 0).getTime()
              : Number(e[t] || 0);
        ((ia = await aa({
          q: d.querySelector("[data-q]")?.value || "",
          type: d.querySelector("[data-t]")?.value || "",
          category: d.querySelector("[data-c]")?.value || "",
          sort: e,
        })),
          ia.sort(
            (a, r) => t(r, e) - t(a, e) || t(r, "newest") - t(a, "newest"),
          ),
          oa());
      } catch (e) {
        d.querySelector("[data-list]").textContent = e.message;
      }
    }),
    (A = async function () {
      T(
        '<section class="page"><section class="featured-ribbon"><div class="featured-intro"><p class="eyebrow">FEATURED ARCHIVE</p><h1>Tuyển chọn</h1></div><div class="featured-strip" data-featured>Đang tải tuyển chọn…</div></section><section class="new-arrivals"><div class="title"><div><p class="eyebrow">NEW ARRIVALS</p><h1>Mới nhập tàng</h1></div><button class="btn primary" data-v="publish">Phát hành tác phẩm</button></div><div class="grid" data-list>Đang tra duyệt…</div></section></section>',
      );
      try {
        let e = await aa({ sort: "newest" }, 4),
          t = e.filter((e) => Number(e.featured_order) > 0),
          a = [...e].sort(
            (e, t) => new Date(t.created_at || 0) - new Date(e.created_at || 0),
          ),
          r = d.querySelector("[data-featured]");
        ((r.innerHTML =
          t.slice(0, 8).map(mt).join("") ||
          '<p class="muted">Tạm chưa có tác phẩm tuyển chọn</p>'),
          (d.querySelector("[data-list]").innerHTML =
            a.slice(0, 8).map(L).join("") ||
            '<p class="muted">Tạm chưa có tác phẩm công khai</p>'),
          t.length > 2 &&
            (Xt = setInterval(() => {
              if (!d) return;
              let e = r.scrollLeft + r.clientWidth >= r.scrollWidth - 8;
              r.scrollTo({
                left: e ? 0 : r.scrollLeft + 260,
                behavior: "smooth",
              });
            }, 5e3)));
      } catch (e) {
        d.querySelector("[data-featured]").textContent = e.message;
      }
    }));
  const na = (Q = async function (e) {
      let t = e.target.closest?.(
          '[data-a="featured-prev"],[data-a="featured-next"]',
        ),
        a = e.target.closest?.('[data-a="cover-prev"],[data-a="cover-next"]'),
        r = e.target.closest?.('[data-a="like"],[data-a="favorite"]');
      if (t) {
        let e = d.querySelector("[data-featured]"),
          a = "featured-prev" === t.dataset.a ? -1 : 1;
        return void e?.scrollBy({ left: 260 * a, behavior: "smooth" });
      }
      if (a) {
        let e = a.closest(".detail-gallery"),
          t = JSON.parse(e.dataset.coverList),
          r = "cover-prev" === a.dataset.a ? -1 : 1,
          i = (Number(e.dataset.coverIndex) + r + t.length) % t.length;
        return (
          (e.dataset.coverIndex = i),
          (e.querySelector("[data-cover-image]").src = t[i]),
          void (e.querySelector("[data-cover-count]").textContent =
            `${i + 1} / ${t.length}`)
        );
      }
      if (r && b) {
        let e = r.dataset.a,
          t = "like" === e ? "liked" : "favorited",
          a = "like" === e ? "likes" : "favorites",
          i = await I(`/api/works/${encodeURIComponent(b.id)}/${e}`, {
            method: b[t] ? "DELETE" : "POST",
          });
        return (
          (b[t] = i.active),
          (b[a] = i.count),
          (r.textContent = `${"like" === e ? (i.active ? "♥" : "♡") : i.active ? "★" : "☆"} ${i.count}`),
          void r.classList.toggle("primary", i.active)
        );
      }
      return ea(e);
    }),
    sa = (T = function (e) {
      (ta(e),
        d.insertAdjacentHTML(
          "afterbegin",
          `<style>#${a} .featured-intro{position:relative}#${a} .featured-controls{display:flex;gap:7px;margin-top:12px}#${a} .featured-controls .btn{display:grid;width:36px;height:32px;place-items:center;padding:0;font-size:22px}#${a} .detail-gallery{position:relative;display:block;overflow:hidden;width:100%;height:min(56vh,520px);margin:18px 0;border:1px solid var(--line);border-radius:18px;background:var(--paper2)}#${a} .detail-gallery img{position:absolute!important;inset:0!important;display:block!important;width:100%!important;height:100%!important;max-width:none!important;max-height:none!important;margin:0!important;padding:0!important;object-fit:contain!important;object-position:center!important}#${a} .gallery-arrow{position:absolute;top:50%;z-index:2;display:grid;width:42px;height:54px;place-items:center;transform:translateY(-50%);border:1px solid color-mix(in srgb,var(--line) 70%,transparent);border-radius:12px;color:var(--ink);background:color-mix(in srgb,var(--card) 84%,transparent);box-shadow:0 8px 24px color-mix(in srgb,#000 20%,transparent);backdrop-filter:blur(8px);cursor:pointer;font-size:28px}#${a} .gallery-arrow:hover{color:#fff;background:var(--accent)}#${a} .gallery-arrow.prev{left:14px}#${a} .gallery-arrow.next{right:14px}#${a} .gallery-count{position:absolute;right:14px;bottom:12px;z-index:2;padding:4px 9px;border-radius:999px;color:#fff;background:rgba(0,0,0,.52);font-size:11px}#${a} .detail-summary p{margin:0}#${a} .work-detail>.work-author{margin:8px 0 16px}@media(max-width:700px){#${a} .featured-intro{display:flex!important;align-items:center;justify-content:space-between}#${a} .featured-intro .eyebrow{position:absolute;left:0;top:-2px}#${a} .featured-intro h1{padding-top:14px}#${a} .featured-controls{margin:12px 0 0}#${a} .detail-gallery{height:min(68vh,560px);min-height:320px;border-radius:14px}#${a} .gallery-arrow{width:38px;height:48px}#${a} .gallery-arrow.prev{left:8px}#${a} .gallery-arrow.next{right:8px}}</style>`,
        ));
    });
  T = function (e) {
    (sa(e),
      d.insertAdjacentHTML(
        "afterbegin",
        `<style>#${a} .featured-strip{overflow:hidden!important;scrollbar-width:none}#${a} .featured-strip::-webkit-scrollbar{display:none}#${a} .catalog-pager{display:flex;align-items:center;justify-content:center;gap:12px;margin-top:24px}#${a} .catalog-pager span{color:var(--muted);font-size:12px}</style>`,
      ));
  };
  const la = (R = async function () {
    let e = await Se();
    if ("publish" === m && 4 === g) {
      d.querySelectorAll('[data-m="coverUrl"]').forEach((e) =>
        e
          .closest("label")
          ?.querySelector("span")
          ?.replaceChildren(
            "Liên kết ảnh bìa (Tùy chọn; nhiều ảnh vui lòng phân tách bằng dấu phẩy hoặc xuống dòng, hỗ trợ GIF/WebP)",
          ),
      );
    }
    return e;
  });
  R = async function () {
    let e = await la();
    return (
      (function () {
        if (!d || "publish" !== m) return;
        d.querySelector("[data-publish-error]")?.remove();
        let e = d.querySelector(".publish>.row"),
          t = d.querySelector('[data-a="next"]');
        (x &&
          e &&
          e.insertAdjacentHTML(
            "beforebegin",
            `<div data-publish-error role="alert" style="margin-top:14px;padding:11px 13px;border:1px solid color-mix(in srgb,#b84835 55%,var(--line));border-left:4px solid #b84835;border-radius:10px;background:color-mix(in srgb,#b84835 9%,var(--card));color:var(--ink);line-height:1.65"><b style="display:block;color:#b84835">Nộp tác phẩm chưa hoàn thành</b><span>${v(x)}</span></div>`,
          ),
          t &&
            ((t.disabled = f),
            t.setAttribute("aria-busy", f ? "true" : "false"),
            (t.textContent = f
              ? "Đang nộp…"
              : 6 === g
                ? "Xác nhận phát hành"
                : "Bước tiếp theo")));
      })(),
      e
    );
  };
  const da = (Q = async function (e) {
    let t = e.target.closest?.(
      '[data-a="catalog-prev"],[data-a="catalog-next"]',
    );
    return t
      ? ((ra += "catalog-prev" === t.dataset.a ? -1 : 1),
        oa(),
        void d.querySelector(".main")?.scrollTo({ top: 0, behavior: "smooth" }))
      : na(e);
  });
  function ca() {
    Lt++;
    try {
      (window.parent || window).__canmingWorkshopAuthPollCleanup?.();
    } catch {}
    (d?.remove(), (d = null));
  }
  Q = async function (e) {
    let t = e.target.closest?.("[data-a]")?.dataset.a;
    return (("back" !== t && "kind" !== t && "clear" !== t) || (x = ""), da(e));
  };
  let pa = !1,
    ua = (e) => {
      let t = window.parent || window;
      ("visibilitychange" === e?.type &&
        "hidden" === t.document?.visibilityState) ||
        (!pa &&
          zt() &&
          ((pa = !0),
          Mt(!0)
            .catch(() => {})
            .finally(() => {
              pa = !1;
            })));
    };
  try {
    let e = window.parent || window,
      t = e.__canmingWorkshopAuthResume;
    (t &&
      (e.removeEventListener("focus", t),
      e.removeEventListener("pageshow", t),
      e.document?.removeEventListener("visibilitychange", t)),
      (e.__canmingWorkshopAuthResume = ua),
      e.addEventListener("focus", ua),
      e.addEventListener("pageshow", ua),
      e.document?.addEventListener("visibilitychange", ua));
  } catch {}
  const ma = 14e5;
  function ga(e, t = {}) {
    let a = E(e);
    if (
      "scenario" !== a.kind ||
      1 !== a.resources.length ||
      "scenario" !== a.resources[0]?.kind
    )
      throw Error("Vui lòng chọn gói tác phẩm Danh phận DLC (scenario).");
    let r = a.resources[0],
      i = r.scenario;
    if (!i || "object" != typeof i) throw Error("DLC thiếu danh sách kịch bản.");
    if ("player-origin" !== i.exclusiveGroup)
      throw Error("DLC bắt buộc phải thuộc nhóm loại trừ danh phận player-origin.");
    if (!0 === i.allowMidChatSwitch)
      throw Error("Danh phận DLC không cho phép chuyển đổi giữa chừng khi đang chat.");
    if (!1 === i.newChatRequired)
      throw Error("Danh phận DLC bắt buộc phải yêu cầu tạo cuộc trò chuyện mới để có hiệu lực.");
    if (!i.id || !i.version || !i.baseCard)
      throw Error("Thiếu mã định danh DLC, phiên bản hoặc mã định danh thẻ gốc.");
    let o = Array.isArray(r.openings) ? r.openings : [],
      n = Array.isArray(r.worldbookEntries) ? r.worldbookEntries : [],
      s = Array.isArray(r.initialRelationships) ? r.initialRelationships : [],
      l = Array.isArray(r.portraitProfiles) ? r.portraitProfiles : [];
    if (!o.length || o.length > 20)
      throw Error("Danh phận DLC bắt buộc phải chứa 1～20 lời mở đầu.");
    if (o.some((e) => !e?.id || !e?.name || !e?.content))
      throw Error("Ít nhất một lời mở đầu thiếu ID, tên hoặc nội dung chính văn.");
    if (!n.length || n.length > 200)
      throw Error("Danh phận DLC bắt buộc phải chứa 1～200 điều mục Thế Giới Thư.");
    if (l.length > 60) throw Error("Nhân vật chí DLC chỉ chứa tối đa 60 người.");
    if (l.some((e) => !e?.name)) throw Error("Trong Nhân vật chí DLC có nhân vật bị thiếu họ tên.");
    if (
      l.some(
        (e) =>
          Object.prototype.hasOwnProperty.call(e, "portraits") &&
          (!e.portraits ||
            "object" != typeof e.portraits ||
            !Object.keys(e.portraits).length),
      )
    )
      throw Error("Trong Nhân vật chí DLC có dữ liệu avatar tùy chỉnh bị rỗng.");
    let d =
      Number(t.size) || new TextEncoder().encode(JSON.stringify(a)).length;
    if (d > ma) throw Error("Gói tác phẩm DLC vượt quá giới hạn dung lượng 1.4MB.");
    return {
      bundle: a,
      resource: r,
      scenario: i,
      openings: o,
      entries: n,
      relationships: s,
      portraits: l,
      bytes: d,
      fileName: t.name || "",
    };
  }
  const ba = O;
  O = async function (e) {
    return "scenario" === e
      ? (function () {
          let e,
            t = "collection" === c.kind,
            a = t ? c.collectionScenarioBundle : c.bundle,
            r = t ? "data-collection-scenario-file" : "data-scenario-file";
          try {
            a && (e = ga(a));
          } catch {}
          if (!e)
            return `<section class="scenario-drop"><div class="scenario-seal">Tịch</div><div><p class="eyebrow">PLAYER ORIGIN DOCUMENT</p><h2>${t ? "Gộp toàn bộ DLC mở đầu" : "Nhập tệp Danh phận DLC"}</h2><p>Chọn gói tác phẩm hoàn chỉnh dạng <code>.json</code> được xuất từ bộ sinh DLC. Sẽ đồng thời mang theo lời mở đầu cùng các biến khởi tạo, quan hệ nhân vật, Thế Giới Thư, Nhân vật chí và tệp tương thích nhân vật.</p><label class="scenario-file"><input type="file" accept="application/json,.json" ${r}><span>Chọn JSON của DLC</span></label><small>Bắt buộc: Lời mở đầu, danh phận nhân vật chính, Thế Giới Thư quan hệ; chỉ hỗ trợ nhóm loại trừ player-origin.</small></div></section>`;
          let {
            scenario: i,
            resource: o,
            openings: n,
            entries: s,
            relationships: l,
            portraits: d,
            bytes: p,
            fileName: u,
          } = e;
          return `<section class="scenario-passport"><header><div><p class="eyebrow">DOCUMENT VERIFIED</p><h2>${v(a.metadata?.title || o.name)}</h2><p>${v(u || "Danh phận văn điệp đã tải")}</p></div><span class="scenario-approved">Đã kiểm</span></header><div class="scenario-facts"><span><small>Mã DLC</small><b>${v(i.id)}</b></span><span><small>Phiên bản</small><b>${v(i.version)}</b></span><span><small>Thẻ gốc</small><b>${v(i.baseCard)}</b></span><span><small>Bản tối thiểu</small><b>${v(i.minBaseVersion || "Không giới hạn")}</b></span><span><small>Mở đầu/Biến khởi đầu</small><b>${n.length} mục</b></span><span><small>Thế Giới Thư</small><b>${s.length} điều</b></span><span><small>Nhân vật chí</small><b>${d.length} người</b></span><span><small>Quan hệ khởi đầu</small><b>${l.length} điều</b></span><span><small>Tương thích nhân vật</small><b>${Number(o.characterAdaptations?.length || 0)} người</b></span><span><small>Dung lượng gói</small><b>${(function (
            e,
          ) {
            return e < 1024
              ? `${e} B`
              : `${(e / 1024).toFixed(e > 102400 ? 0 : 1)} KB`;
          })(
            p,
          )}</b></span></div><div class="scenario-opening-list">${n.map((e, t) => `<span><i>${String(t + 1).padStart(2, "0")}</i><b>${v(e.name)}</b><small>${v(e.subtitle || "")}</small></span>`).join("")}</div><div class="scenario-rules"><b>Đã vượt qua tiền kiểm tra tính toàn vẹn</b><span>Khi cài đặt hợp tập vẫn tuân thủ quy tắc mỗi ván một danh phận · Cấm đổi giữa chừng · Có hiệu lực khi tạo chat mới</span></div><label class="scenario-file compact"><input type="file" accept="application/json,.json" ${r}><span>Chọn lại tệp</span></label></section>`;
        })()
      : ba(e);
  };
  const ha = D;
  D = async function (e, t, a) {
    if ("scenario" !== e) return ha(e, t, a);
    let r = "collection" === c.kind ? c.collectionScenarioBundle : c.bundle;
    if (!r) throw Error("Vui lòng chọn tệp JSON Danh phận DLC trước.");
    let i = ga(r),
      o = JSON.parse(JSON.stringify(i.bundle));
    return (
      (o.metadata = { ...o.metadata, ...a }),
      (o.createdAt = new Date().toISOString()),
      o
    );
  };
  const fa = Y;
  async function xa() {
    T(
      '<section class="page scenario-hub"><section class="scenario-desk"><section class="scenario-current"><header><div><p class="eyebrow">CURRENT DOCUMENT</p><h2>Đang sử dụng</h2></div><span>Đã ghi vào thẻ nhân vật</span></header><div data-scenario-current>Đang đối chiếu Danh phận văn điệp…</div></section><aside class="scenario-maker"><p class="eyebrow">CREATE AN ORIGIN</p><h2>Lập một danh phận khác</h2><p>Tạo danh phận hoàn chỉnh thông qua Khai cục sinh thành khí, hoặc có thể nhập tệp DLC sẵn có.</p><div class="scenario-maker-actions"><button class="btn primary" data-a="scenario-create">Bắt đầu chế tác</button><button class="btn" data-a="scenario-publish">Nhập DLC có sẵn</button></div><small>Sẽ bao gồm mở đầu, biến khởi tạo, quan hệ nhân vật và Thế Giới Thư.</small></aside></section><section class="scenario-library"><div class="title"><div><p class="eyebrow">ORIGIN ARCHIVE</p><h1>Danh phận tùy chọn</h1></div><button class="btn" data-a="scenario-browse">Xem toàn bộ danh phận</button></div><div class="grid" data-scenario-list>Đang tra duyệt…</div></section></section>',
    );
    let e = Ke().filter((e) =>
        (e.resources || []).some((e) => "scenario" === e.kind),
      ),
      t = (await p.bridge?.snapshotInstallState?.().catch?.(() => null)) || {},
      a = (t.scenarios || [])[0],
      r = t.scenarioDetails || {},
      i = e.find((e) => (e.delta?.scenarios || []).includes(a)),
      o = i ? await nt(i.id).catch(() => null) : null,
      n = o?.resources?.find((e) => "scenario" === e.kind),
      s = d.querySelector("[data-scenario-current]");
    if (a) {
      let e = { "cmyj.original.tongcheng": "Nguyên bản · Đồng Thành tạo lệ thiên" },
        t = [
          ...new Set(
            Object.values(n?.characterOverviews || {})
              .flat()
              .map((e) => e?.name)
              .filter(Boolean),
          ),
        ],
        o =
          n?.name ||
          r.name ||
          (i?.resources || []).find((e) => "scenario" === e.kind)?.name ||
          i?.title ||
          e[a] ||
          "Danh phận văn điệp hiện tại",
        l = Number(n?.openings?.length || r.openingCount || 0),
        d = Number(n?.worldbookEntries?.length || r.worldbookCount || 0),
        c = Number(
          n?.characterAdaptations?.length ||
            r.peopleCount ||
            t.length ||
            n?.portraitProfiles?.length ||
            0,
        ),
        p = n?.openings?.[0]?.subtitle || r.subtitle || "Danh phận đã được ghi vào thẻ nhân vật hiện tại";
      s.innerHTML = `<article class="scenario-current-card"><span class="scenario-approved">Hiện tại</span><div class="scenario-document-copy"><small>${v(p)}</small><h3>${v(o)}</h3><p>${v(a)}</p><div class="scenario-document-facts"><span><b>${l || "—"}</b><small>Mở đầu</small></span><span><b>${d || "—"}</b><small>Thiết lập</small></span><span><b>${c || "—"}</b><small>Tương thích</small></span></div><div class="scenario-document-actions">${i?.workId ? `<button class="btn primary" data-a="detail" data-id="${v(i.workId)}">Xem văn điệp</button>` : ""}<button class="btn" data-my="downloads">Quản lý và Sửa chữa</button></div></div></article>`;
    } else
      s.innerHTML =
        '<article class="scenario-empty"><span>Chưa</span><div><b>Chưa chọn danh phận</b><p>Chọn một bản từ văn điệp bên dưới, hoặc tự tạo mở đầu cho riêng bạn. Sau khi cài đặt, tạo cuộc trò chuyện mới để có hiệu lực.</p><button class="btn primary" data-a="scenario-browse">Duyệt danh phận tùy chọn</button></div></article>';
    try {
      let e = await aa({ type: "scenario", sort: "downloads" }, 10);
      d.querySelector("[data-scenario-list]").innerHTML =
        e.map(L).join("") ||
        '<article class="scenario-empty"><span>Trống</span><div><b>Tạm thời chưa có Danh phận DLC công khai</b><p>Bạn có thể tải lên DLC tự tạo trên máy trước.</p></div></article>';
    } catch (e) {
      d.querySelector("[data-scenario-list]").innerHTML =
        `<p class="muted">${v(e.message)}</p>`;
    }
  }
  Y = async function (e) {
    let t = e.target,
      a = t.matches?.("[data-collection-scenario-file]");
    if (!a && !t.matches?.("[data-scenario-file]")) return fa(e);
    let r = t.files?.[0];
    if (r)
      try {
        if (r.size > ma) throw Error("Gói tác phẩm DLC vượt quá giới hạn dung lượng 1.4MB.");
        let e = ga(JSON.parse(await r.text()), r);
        (a
          ? ((c.collectionScenarioBundle = e.bundle), (c._contentTouched = !0))
          : ((c.bundle = e.bundle),
            (c.kind = "scenario"),
            (c.meta = {
              ...c.meta,
              title:
                c.meta.title || e.bundle.metadata?.title || e.resource.name,
              summary: c.meta.summary || e.bundle.metadata?.summary || "",
              tags: c.meta.tags || (e.bundle.metadata?.tags || []).join("，"),
              categories: c.meta.categories.length
                ? c.meta.categories
                : (e.bundle.metadata?.categories || []).slice(0, 3),
              coverUrl: c.meta.coverUrl || e.bundle.metadata?.coverUrl || "",
            })),
          C(),
          await R(),
          bt(
            `Đã đọc ${e.openings.length} lời mở đầu và ${e.entries.length} điều mục Thế Giới Thư`,
            "ok",
            "Tiền kiểm tra DLC thành công",
          ));
      } catch (e) {
        (a ? (c.collectionScenarioBundle = null) : (c.bundle = null),
          (x =
            e instanceof SyntaxError
              ? "Tệp JSON không thể phân tích, vui lòng xác nhận đây là gói tác phẩm hoàn chỉnh do Khai cục sinh thành khí xuất ra."
              : e.message),
          await R(),
          bt(x, "err", "Tiền kiểm tra DLC thất bại"));
      }
  };
  const va = B;
  B = async function () {
    return "scenarios" === m && y() ? xa() : va();
  };
  const wa = Q,
    ya = T,
    $a = (T = function (e) {
      ya(e);
      let t = d.querySelector(".nav"),
        r = t?.querySelector('[data-v="catalog"]');
      (t &&
        !t.querySelector('[data-v="scenarios"]') &&
        r?.insertAdjacentHTML(
          "beforebegin",
          `<button data-v="scenarios" class="${"scenarios" === m ? "on" : ""}">Danh phận DLC</button>`,
        ),
        d.insertAdjacentHTML(
          "afterbegin",
          `<style>#${a} .scenario-hero{position:relative;display:grid;grid-template-columns:minmax(0,1fr) 230px;overflow:hidden;min-height:340px;border:1px solid var(--line);border-radius:26px;background:linear-gradient(118deg,color-mix(in srgb,var(--card) 96%,transparent),color-mix(in srgb,var(--accent) 14%,var(--paper2)));box-shadow:0 26px 70px color-mix(in srgb,var(--ink) 14%,transparent)}#${a} .scenario-hero:before{content:"";position:absolute;inset:0;opacity:.14;background:repeating-linear-gradient(103deg,transparent 0 27px,var(--ink) 28px,transparent 29px 57px);pointer-events:none}#${a} .scenario-hero-copy{position:relative;padding:42px}#${a} .scenario-hero h1{margin:13px 0 16px;font-size:clamp(35px,5vw,61px);line-height:1.18;letter-spacing:.07em}#${a} .scenario-hero p{max-width:660px;color:var(--muted)}#${a} .scenario-required{display:inline-block;margin-top:10px;padding:3px 9px;border:1px solid var(--accent);color:var(--accent);font-size:11px;letter-spacing:.18em}#${a} .scenario-gate{position:relative;display:grid;place-content:center;justify-items:center;margin:26px;border-left:1px solid var(--line);color:var(--accent)}#${a} .scenario-gate span{font-size:96px;line-height:1;font-weight:900;opacity:.22}#${a} .scenario-gate b{margin-top:-18px;font-size:19px;letter-spacing:.22em}#${a} .scenario-gate small{margin-top:8px;letter-spacing:.25em}#${a} .scenario-current,#${a} .scenario-library{margin-top:28px}#${a} .scenario-current{display:grid;grid-template-columns:170px minmax(0,1fr);gap:18px;align-items:center}#${a} .scenario-current h2{margin:4px 0}#${a} .scenario-current-card,#${a} .scenario-empty{display:flex;align-items:center;gap:16px;padding:18px 20px;border:1px solid var(--line);border-radius:16px;background:var(--card)}#${a} .scenario-current-card>div,#${a} .scenario-empty>div{flex:1}#${a} .scenario-current-card p,#${a} .scenario-empty p{margin:3px 0;color:var(--muted)}#${a} .scenario-empty>span{display:grid;width:42px;height:42px;place-items:center;border:1px solid var(--accent);border-radius:50%;color:var(--accent);font-size:20px}#${a} .scenario-approved{display:grid;width:56px;height:56px;place-items:center;border:3px double var(--accent);border-radius:50%;color:var(--accent);font-weight:900;transform:rotate(-8deg)}#${a} .scenario-drop{display:grid;grid-template-columns:84px minmax(0,1fr);gap:20px;align-items:center;min-height:270px;padding:28px;border:1px dashed color-mix(in srgb,var(--accent) 65%,var(--line));border-radius:18px;background:linear-gradient(135deg,color-mix(in srgb,var(--accent) 7%,var(--card)),var(--card))}#${a} .scenario-drop h2{margin:5px 0}#${a} .scenario-drop p{color:var(--muted)}#${a} .scenario-drop code{color:var(--accent)}#${a} .scenario-seal{display:grid;width:78px;height:110px;place-items:center;border:3px double var(--accent);color:var(--accent);font-size:40px;font-weight:900}#${a} .scenario-file{display:inline-flex;margin:12px 0 5px;cursor:pointer}#${a} .scenario-file input{position:absolute;width:1px;height:1px;opacity:0}#${a} .scenario-file span{padding:10px 16px;border-radius:10px;color:#fff;background:var(--accent);box-shadow:0 8px 20px color-mix(in srgb,var(--accent) 24%,transparent)}#${a} .scenario-file.compact span{padding:7px 11px;font-size:12px}#${a} .scenario-passport{padding:24px;border:1px solid var(--line);border-radius:18px;background:linear-gradient(145deg,var(--card),color-mix(in srgb,var(--accent) 6%,var(--paper2)))}#${a} .scenario-passport header{display:flex;align-items:center;justify-content:space-between;gap:20px;padding-bottom:17px;border-bottom:1px solid var(--line)}#${a} .scenario-passport h2{margin:4px 0}#${a} .scenario-facts{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:1px;margin-top:18px;overflow:hidden;border:1px solid var(--line);border-radius:12px;background:var(--line)}#${a} .scenario-facts span{display:grid;gap:4px;min-width:0;padding:12px;background:var(--card)}#${a} .scenario-facts small{color:var(--muted);font-size:10px}#${a} .scenario-facts b{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:12px}#${a} .scenario-opening-list{display:grid;gap:7px;margin-top:14px}#${a} .scenario-opening-list span{display:grid;grid-template-columns:34px 150px minmax(0,1fr);gap:10px;align-items:center;padding:8px 10px;border-bottom:1px dashed var(--line)}#${a} .scenario-opening-list i{color:var(--accent);font-style:normal}#${a} .scenario-opening-list small{overflow:hidden;color:var(--muted);text-overflow:ellipsis;white-space:nowrap}#${a} .scenario-rules{display:flex;justify-content:space-between;gap:12px;margin-top:14px;padding:11px 13px;border-left:3px solid var(--accent);background:color-mix(in srgb,var(--accent) 7%,transparent)}#${a} .scenario-rules span{color:var(--muted);font-size:11px}@media(max-width:800px){#${a} .scenario-hero{grid-template-columns:1fr}#${a} .scenario-gate{display:none}#${a} .scenario-hero-copy{padding:28px 22px}#${a} .scenario-current{grid-template-columns:1fr}#${a} .scenario-facts{grid-template-columns:repeat(2,minmax(0,1fr))}#${a} .scenario-opening-list span{grid-template-columns:28px minmax(0,1fr)}#${a} .scenario-opening-list small{grid-column:2}#${a} .scenario-rules{display:grid}#${a} .scenario-drop{grid-template-columns:1fr}#${a} .scenario-seal{width:56px;height:70px;font-size:28px}#${a} .nav button{padding-inline:10px}}</style>`,
        ));
    }),
    ka = (T = function (e) {
      ($a(e),
        d.insertAdjacentHTML(
          "afterbegin",
          `<style>#${a} .scenario-hub{--scenario-rule:color-mix(in srgb,var(--accent) 78%,#8d2f22)}#${a} .scenario-hero{display:flex;min-height:0;align-items:center;justify-content:space-between;gap:26px;padding:26px 30px;border-radius:18px;background:radial-gradient(circle at 82% 12%,color-mix(in srgb,var(--scenario-rule) 13%,transparent),transparent 28%),linear-gradient(132deg,color-mix(in srgb,var(--card) 98%,transparent),color-mix(in srgb,var(--paper2) 92%,var(--accent)))}#${a} .scenario-hero:before{opacity:.08;background:linear-gradient(90deg,transparent 49.8%,var(--ink) 50%,transparent 50.2%),linear-gradient(0deg,transparent 49.8%,var(--ink) 50%,transparent 50.2%);background-size:44px 44px;mask-image:linear-gradient(90deg,#000,transparent 72%)}#${a} .scenario-hero-copy{padding:0}#${a} .scenario-hero h1{margin:5px 0 6px;font-size:clamp(29px,3.6vw,43px);line-height:1.12;letter-spacing:.09em}#${a} .scenario-hero p{margin:0;font-size:13px}#${a} .scenario-rule{position:relative;z-index:1;display:flex;flex:0 0 auto;align-items:center;gap:12px;padding:8px 0 8px 24px;border-left:1px solid var(--line)}#${a} .scenario-rule i{display:grid;width:42px;height:42px;place-items:center;border:2px solid var(--scenario-rule);color:var(--scenario-rule);font-size:21px;font-style:normal;font-weight:900;transform:rotate(-3deg)}#${a} .scenario-rule span{display:grid;gap:2px}#${a} .scenario-rule b{font-size:13px;letter-spacing:.16em}#${a} .scenario-rule small{color:var(--muted);font-size:10px}#${a} .scenario-desk{display:grid;grid-template-columns:minmax(0,1.45fr) minmax(280px,.55fr);gap:16px;margin-top:16px;animation:scenario-desk-in .42s ease-out both}#${a} .scenario-current{display:block;min-width:0;margin:0;padding:24px 26px;border:1px solid var(--line);border-radius:18px;background:linear-gradient(145deg,color-mix(in srgb,var(--card) 96%,transparent),color-mix(in srgb,var(--accent) 5%,var(--paper2)));box-shadow:0 18px 44px color-mix(in srgb,var(--ink) 9%,transparent)}#${a} .scenario-current>header{display:flex;align-items:center;justify-content:space-between;gap:18px;padding-bottom:14px;border-bottom:1px solid var(--line)}#${a} .scenario-current>header h2{margin:3px 0 0;font-size:23px}#${a} .scenario-current>header>span{padding:4px 9px;border:1px solid color-mix(in srgb,var(--scenario-rule) 42%,var(--line));border-radius:999px;color:var(--scenario-rule);font-size:10px;letter-spacing:.08em}#${a} [data-scenario-current]{min-height:188px}#${a} .scenario-current-card{display:flex;min-height:188px;align-items:center;gap:22px;padding:20px 0 0;border:0;border-radius:0;background:transparent}#${a} .scenario-approved{flex:0 0 66px;width:66px;height:66px;border-color:var(--scenario-rule);border-radius:6px;color:var(--scenario-rule);font-size:14px;letter-spacing:.12em;box-shadow:inset 0 0 0 4px color-mix(in srgb,var(--scenario-rule) 7%,transparent)}#${a} .scenario-document-copy{min-width:0;flex:1}#${a} .scenario-document-copy>small{display:block;color:var(--muted);font-size:11px;letter-spacing:.06em}#${a} .scenario-document-copy h3{margin:4px 0 1px;font-size:clamp(22px,2.7vw,32px);font-weight:600;letter-spacing:.05em}#${a} .scenario-document-copy>p{overflow:hidden;margin:0;color:var(--muted);font-family:ui-monospace,SFMono-Regular,Consolas,monospace;font-size:9px;opacity:.62;text-overflow:ellipsis;white-space:nowrap}#${a} .scenario-document-facts{display:flex;gap:0;margin-top:15px}#${a} .scenario-document-facts span{display:grid;min-width:82px;padding:0 18px;border-left:1px solid var(--line)}#${a} .scenario-document-facts span:first-child{padding-left:0;border-left:0}#${a} .scenario-document-facts b{font-size:18px;font-weight:600}#${a} .scenario-document-facts small{color:var(--muted);font-size:10px}#${a} .scenario-document-actions{display:flex;gap:8px;margin-top:17px;flex-wrap:wrap}#${a} .scenario-maker{position:relative;display:flex;overflow:hidden;min-height:286px;flex-direction:column;padding:25px;border:1px solid color-mix(in srgb,var(--scenario-rule) 40%,var(--line));border-radius:18px;background:linear-gradient(160deg,color-mix(in srgb,var(--scenario-rule) 10%,var(--card)),var(--card));box-shadow:0 18px 44px color-mix(in srgb,var(--ink) 9%,transparent)}#${a} .scenario-maker:after{content:'Tịch';position:absolute;right:-7px;bottom:-34px;color:var(--scenario-rule);font-size:130px;font-weight:900;line-height:1;opacity:.055;transform:rotate(-7deg);pointer-events:none}#${a} .scenario-maker h2{position:relative;margin:7px 0 9px;font-size:25px;letter-spacing:.08em}#${a} .scenario-maker>p:not(.eyebrow){position:relative;margin:0;color:var(--muted);font-size:12px;line-height:1.8}#${a} .scenario-maker-actions{position:relative;display:grid;grid-template-columns:1fr;gap:8px;margin-top:auto;padding-top:19px}#${a} .scenario-maker-actions .btn{width:100%}#${a} .scenario-maker>small{position:relative;margin-top:10px;color:var(--muted);font-size:9px;line-height:1.55}#${a} .scenario-library{margin-top:25px}#${a} .scenario-library .title{align-items:center;margin-bottom:13px;padding-bottom:11px;border-bottom:1px solid var(--line)}#${a} .scenario-library .title h1{font-size:28px}#${a} .scenario-library .grid{animation:scenario-desk-in .48s .06s ease-out both}#${a} .scenario-empty{min-height:166px;margin-top:0;padding:24px 4px;border:0;background:transparent}#${a} .scenario-empty>span{flex:0 0 54px;width:54px;height:54px;border-radius:5px;border:2px double var(--scenario-rule);color:var(--scenario-rule);font-size:14px;font-weight:800;transform:rotate(-3deg)}#${a} .scenario-empty p{max-width:560px;margin:5px 0 14px}@keyframes scenario-desk-in{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}@media(max-width:900px){#${a} .scenario-desk{grid-template-columns:1fr}#${a} .scenario-maker{min-height:220px}#${a} .scenario-maker-actions{grid-template-columns:1fr 1fr}}@media(max-width:700px){#${a} .scenario-hero{display:grid;gap:15px;padding:20px}#${a} .scenario-rule{padding:12px 0 0;border-top:1px solid var(--line);border-left:0}#${a} .scenario-current{padding:19px}#${a} .scenario-current-card{align-items:flex-start;gap:14px}#${a} .scenario-approved{width:52px;height:52px;flex-basis:52px;font-size:11px}#${a} .scenario-document-facts{display:grid;grid-template-columns:repeat(3,1fr)}#${a} .scenario-document-facts span{min-width:0;padding:0 10px}#${a} .scenario-document-actions{display:grid;grid-template-columns:1fr}#${a} .scenario-maker-actions{grid-template-columns:1fr}#${a} .scenario-library .title{display:flex}#${a} .scenario-library .title .btn{padding:8px 10px;font-size:11px}}@media(max-width:430px){#${a} .scenario-current-card{display:grid;grid-template-columns:52px minmax(0,1fr)}#${a} .scenario-document-facts,#${a} .scenario-document-actions{grid-column:1/-1}#${a} .scenario-document-copy h3{font-size:21px}}</style>`,
        ));
    }),
    Sa = (T = function (e) {
      (ka(e),
        d.insertAdjacentHTML(
          "afterbegin",
          `<style>#${a} .scenario-hero{min-height:0;padding:0 2px 14px;border:0;border-bottom:1px solid var(--line);border-radius:0;background:none;box-shadow:none;overflow:visible}#${a} .scenario-hero:before{display:none}#${a} .scenario-hero-copy{display:grid;grid-template-areas:'eyebrow eyebrow' 'title description';grid-template-columns:auto minmax(240px,1fr);align-items:baseline;column-gap:22px}#${a} .scenario-hero-copy .eyebrow{grid-area:eyebrow}#${a} .scenario-hero h1{grid-area:title;margin:3px 0 0;font-size:clamp(25px,2.8vw,34px);white-space:nowrap}#${a} .scenario-hero p{grid-area:description;max-width:none;margin:0;font-size:12px}#${a} .scenario-rule{gap:8px;padding:5px 10px;border:1px solid var(--line);border-radius:999px;background:color-mix(in srgb,var(--card) 68%,transparent)}#${a} .scenario-rule i{width:28px;height:28px;border-width:1px;font-size:14px}#${a} .scenario-rule b{font-size:11px}#${a} .scenario-rule small{display:none}#${a} .scenario-desk{margin-top:14px}@media(max-width:700px){#${a} .scenario-hero{display:flex;align-items:flex-end;gap:12px;padding:0 0 11px}#${a} .scenario-hero-copy{display:block;min-width:0;flex:1}#${a} .scenario-hero h1{font-size:25px;white-space:normal}#${a} .scenario-hero p{margin-top:3px;font-size:10px;line-height:1.55}#${a} .scenario-rule{flex:0 0 auto;padding:5px}#${a} .scenario-rule span{display:none}}</style>`,
        ));
    }),
    Ca = xa;
  xa = async function () {
    const e = await Ca(),
      t = d?.querySelector('[data-a="scenario-publish"]');
    return (
      t &&
        !d.querySelector('[data-a="scenario-create"]') &&
        ((t.textContent = "Tải lên DLC có sẵn"),
        t.insertAdjacentHTML(
          "beforebegin",
          '<button class="btn primary" data-a="scenario-create">Chế tác mở đầu của tôi</button>',
        ),
        t.classList.remove("primary")),
      e
    );
  };
  const Ia = (Q = async function (e) {
    let t = e.target.closest?.("[data-a]")?.dataset.a;
    if ("scenario-refresh" === t)
      return (ca(), p.bridge?.reloadAfterScenarioInstall?.());
    if ("scenario-publish" === t)
      return (
        (c = {
          kind: "",
          selected: {},
          custom: {
            name: "",
            content: "",
            keys: "",
            position: "after_character_definition",
          },
          worldbookName: "",
          wbQuery: "",
          wbEdits: {},
          item: { name: "", price: 0, desc: "", id: "" },
          meta: {
            title: "",
            summary: "",
            tags: "",
            categories: [],
            coverUrl: "",
          },
          bundle: null,
          collectionScenarioBundle: null,
        }),
        (c.kind = "scenario"),
        (g = 2),
        (m = "publish"),
        C(),
        R()
      );
    if ("scenario-browse" === t) {
      ((h = "scenario"), (m = "catalog"), await j());
      let e = d.querySelector("[data-t]");
      return e ? ((e.value = "scenario"), q()) : void 0;
    }
    return wa(e);
  });
  Q = async function (e) {
    if (e.target.closest?.('[data-a="scenario-create"]')) {
      if ("function" != typeof p.bridge?.openScenarioGenerator)
        throw Error("Môi trường hiện tại chưa kết nối Khai cục sinh thành khí.");
      return p.bridge.openScenarioGenerator();
    }
    return Ia(e);
  };
  const Ea = Yt;
  function Ta(e) {
    return (
      String(e?.cover_url || e?.coverUrl || "")
        .split(/[\n,]/)
        .map((e) => e.trim())
        .find((e) => /^https?:\/\//i.test(e)) || ""
    );
  }
  function La(e, t = "card") {
    const a = String(e?.title || "Tác phẩm chưa đặt tên").trim() || "Tác phẩm chưa đặt tên",
      r = String(e?.id || a);
    let i = 0;
    for (const e of r) i = (31 * i + e.codePointAt(0)) | 0;
    const o = Math.abs(i) % 5,
      n = a.length > 30 ? " is-very-long" : a.length > 16 ? " is-long" : "",
      s = Array.from(a.replace(/[\s·—－_「」『』《》【】]/g, ""))[0] || "Tàng";
    return `<div class="text-cover tone-${o} is-${t}" aria-hidden="true"><span class="text-cover-kicker">${v(S(e?.type))}</span><strong class="text-cover-title${n}">${v(a)}</strong><span class="text-cover-mark">${v(s)}</span><span class="text-cover-foot"><b>Tàn Minh Dư Tẫn</b><i>CMYJ ARCHIVE</i></span></div>`;
  }
  const Aa = L;
  ((L = function (e) {
    return Aa(e).replace(
      '<div class="cover">',
      `<div class="cover text-cover-host">${La(e)}`,
    );
  }),
    (mt = function (e) {
      const t = Ta(e);
      return `<article class="featured-entry" data-a="detail" data-id="${v(e.id)}"><div class="featured-media text-cover-host">${La(e, "compact")}${t ? `<img src="${v(t)}" alt="${v(e.title)}" loading="lazy" referrerpolicy="no-referrer" data-text-cover-image>` : ""}</div><div class="featured-copy"><small>${v(S(e.type))}</small><b>${v(e.title)}</b>${ut(e, !0)}</div></article>`;
    }));
  const ja = P;
  function qa(e) {
    const t = e.target;
    t?.matches?.(".text-cover-host>img") && t.remove();
  }
  P = async function (e) {
    const t = await ja(e);
    return (
      b &&
        !Ta(b) &&
        d
          ?.querySelector(".work-detail>.btn")
          ?.insertAdjacentHTML(
            "afterend",
            `<div class="detail-text-cover text-cover-host">${La(b, "detail")}</div>`,
          ),
      t
    );
  };
  const Na = (Yt = async function (e = {}) {
    let t = (function () {
      try {
        let e = w().getItem(r),
          t = e?.split(".")[1];
        if (!t) return !1;
        let a = t
            .replace(/-/g, "+")
            .replace(/_/g, "/")
            .padEnd(4 * Math.ceil(t.length / 4), "="),
          i = JSON.parse(atob(a));
        return 1e3 * Number(i.exp || 0) <= Date.now();
      } catch {
        return !1;
      }
    })();
    (t && jt(), await Ea(e), t && qt());
  });
  Yt = async function (e = {}) {
    const t = await Na(e);
    return (
      d?.addEventListener("error", qa, !0),
      d?.querySelectorAll(".text-cover-host>img").forEach((e) => {
        e.complete && !e.naturalWidth && e.remove();
      }),
      t
    );
  };
  const za = (T = function (e) {
    (Sa(e),
      d.insertAdjacentHTML(
        "beforeend",
        `<style>#${a} .scenario-desk{align-items:stretch;margin-top:0}#${a} .scenario-desk>.scenario-current,#${a} .scenario-desk>.scenario-maker{align-self:stretch;height:100%;margin-top:0}@media(max-width:900px){#${a} .scenario-desk>.scenario-current,#${a} .scenario-desk>.scenario-maker{height:auto}}</style>`,
      ));
  });
  ((T = function (e) {
    (za(e),
      d.insertAdjacentHTML(
        "afterbegin",
        `<style>\n    #${a} .text-cover-host{position:relative;isolation:isolate}\n    #${a} .text-cover-host>img{position:absolute;inset:0;z-index:2;width:100%;height:100%;object-fit:cover}\n    #${a} .text-cover{--tc-paper:#cdbb92;--tc-ink:#302920;--tc-accent:#833d32;position:absolute;inset:0;z-index:1;display:grid;grid-template-rows:auto 1fr auto;overflow:hidden;padding:22px;color:var(--tc-ink);background:\n      radial-gradient(circle at 82% 15%,color-mix(in srgb,var(--tc-accent) 14%,transparent),transparent 26%),\n      repeating-linear-gradient(0deg,transparent 0 22px,color-mix(in srgb,var(--tc-ink) 5%,transparent) 23px 24px),\n      linear-gradient(145deg,color-mix(in srgb,var(--tc-paper) 86%,#fff),var(--tc-paper))}\n    #${a} .text-cover:before{content:"";position:absolute;inset:11px;border:1px solid color-mix(in srgb,var(--tc-ink) 38%,transparent);box-shadow:inset 0 0 0 4px color-mix(in srgb,var(--tc-paper) 72%,transparent),inset 0 0 0 5px color-mix(in srgb,var(--tc-ink) 17%,transparent);pointer-events:none}\n    #${a} .text-cover:after{content:"";position:absolute;right:-24%;bottom:-11%;width:78%;aspect-ratio:1;border:1px solid color-mix(in srgb,var(--tc-accent) 19%,transparent);border-radius:50%;box-shadow:0 0 0 12px color-mix(in srgb,var(--tc-accent) 4%,transparent),0 0 0 13px color-mix(in srgb,var(--tc-accent) 12%,transparent);pointer-events:none}\n    #${a} .text-cover.tone-1{--tc-paper:#b9bea2;--tc-ink:#243027;--tc-accent:#526d50}\n    #${a} .text-cover.tone-2{--tc-paper:#b9b8ad;--tc-ink:#242b35;--tc-accent:#435c72}\n    #${a} .text-cover.tone-3{--tc-paper:#c4b1b0;--tc-ink:#35272f;--tc-accent:#765063}\n    #${a} .text-cover.tone-4{--tc-paper:#b5c1b9;--tc-ink:#21302d;--tc-accent:#3f6e69}\n    #${a} .text-cover-kicker{position:relative;z-index:1;justify-self:start;padding:3px 7px;border-left:3px solid var(--tc-accent);font-size:10px;font-weight:800;letter-spacing:.24em}\n    #${a} .text-cover-title{position:relative;z-index:1;align-self:center;max-width:90%;margin:18px auto;font-size:clamp(25px,2.25vw,36px);line-height:1.38;letter-spacing:.12em;text-align:center;text-wrap:balance;text-shadow:0 1px color-mix(in srgb,#fff 36%,transparent)}\n    #${a} .text-cover-title.is-long{font-size:clamp(21px,1.85vw,29px);letter-spacing:.07em}\n    #${a} .text-cover-title.is-very-long{font-size:clamp(18px,1.55vw,24px);line-height:1.45;letter-spacing:.035em}\n    #${a} .text-cover-mark{position:absolute;right:21px;bottom:24px;z-index:1;display:grid;width:42px;height:42px;place-items:center;border:2px solid var(--tc-accent);color:var(--tc-accent);font-size:22px;font-weight:900;line-height:1;transform:rotate(-5deg);opacity:.9}\n    #${a} .text-cover-foot{position:relative;z-index:1;display:grid;align-self:end;gap:1px;padding-right:54px}\n    #${a} .text-cover-foot b{font-size:11px;letter-spacing:.2em}\n    #${a} .text-cover-foot i{font-size:7px;font-style:normal;letter-spacing:.19em;opacity:.64}\n    #${a} .featured-media>.text-cover{padding:10px}\n    #${a} .text-cover.is-compact:before{inset:5px;box-shadow:none}\n    #${a} .text-cover.is-compact:after,#${a} .text-cover.is-compact .text-cover-foot{display:none}\n    #${a} .text-cover.is-compact .text-cover-kicker{max-width:100%;overflow:hidden;padding:2px 4px;font-size:7px;letter-spacing:.08em;text-overflow:ellipsis;white-space:nowrap}\n    #${a} .text-cover.is-compact .text-cover-title{max-width:100%;margin:7px 0 19px;font-size:12px;line-height:1.35;letter-spacing:.04em;display:-webkit-box;overflow:hidden;-webkit-box-orient:vertical;-webkit-line-clamp:3}\n    #${a} .text-cover.is-compact .text-cover-mark{right:9px;bottom:8px;width:23px;height:23px;font-size:12px}\n    #${a} .detail-text-cover{width:min(390px,100%);aspect-ratio:3/4;margin:18px auto 24px;overflow:hidden;border:1px solid var(--line);border-radius:18px;box-shadow:0 20px 50px color-mix(in srgb,var(--ink) 16%,transparent)}\n    #${a} .detail-text-cover .text-cover-title{font-size:clamp(28px,5vw,44px)}\n    #${a} .detail-text-cover .text-cover-title.is-long{font-size:clamp(23px,4vw,34px)}\n    #${a} .detail-text-cover .text-cover-title.is-very-long{font-size:clamp(19px,3.3vw,28px)}\n    @media(max-width:700px){\n      #${a} .cover>.text-cover{padding:12px}\n      #${a} .cover>.text-cover:before{inset:6px;box-shadow:none}\n      #${a} .cover .text-cover-kicker{padding:2px 5px;font-size:7px;letter-spacing:.1em}\n      #${a} .cover .text-cover-title{max-width:100%;margin:8px 0 30px;font-size:16px;line-height:1.35;letter-spacing:.04em}\n      #${a} .cover .text-cover-title.is-long,#${a} .cover .text-cover-title.is-very-long{font-size:13px}\n      #${a} .cover .text-cover-foot{padding-right:0}\n      #${a} .cover .text-cover-foot b{font-size:8px}\n      #${a} .cover .text-cover-foot i{font-size:5px}\n      #${a} .cover .text-cover-mark{right:10px;bottom:10px;width:28px;height:28px;font-size:15px}\n    }\n  </style>`,
      ));
  }),
    (globalThis.CanmingWorkshop = {
      apiVersion: 1,
      bridgeVersion: 1,
      runtimeVersion: "1.9-production-20260815",
      open: Yt,
      close: ca,
      destroy: ca,
      validatePackage: E,
      validateScenarioPackage: ga,
      forgetScenarioInstall: async function (e, t = {}) {
        let a = Ke().filter(
            (t) =>
              (t.delta?.scenarios || []).includes(e) ||
              (t.resources || []).some((e) => "scenario" === e.kind),
          ),
          r = t.bridge || p.bridge;
        if (t.cleanup && "function" == typeof r?.uninstallInstall)
          for (let t of a) {
            let a = rt(t.delta || {});
            ((a.scenarios = (a.scenarios || []).filter((t) => t !== e)),
              et.some((e) => (a[e] || []).length) &&
                (await r.uninstallInstall(a)));
          }
        for (let e of a) await st(e.id);
        return (
          a.length && Xe(Ke().filter((e) => !a.some((t) => t.id === e.id))),
          a.length
        );
      },
    }));
  try {
    window.parent.CanmingWorkshop = globalThis.CanmingWorkshop;
  } catch {}
})();
//# sourceMappingURL=index.js.map