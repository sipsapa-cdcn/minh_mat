!(function () {
  const e = "canming-variable-editor",
    t = "canming-variable-editor-style",
    a = new Set(["stat_data"]),
    n = {
      doc: null,
      theme: "day",
      data: {},
      selectedPath: [],
      expanded: new Set([""]),
      query: "",
      dirty: !1,
      undo: null,
      onChanged: null,
      showToast: null,
    };
  function r(e) {
    return String(e ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }
  function o(e) {
    return e.map(String).join("");
  }
  function c(e) {
    return e.length ? e.map(String).join(".") : "Biến gốc";
  }
  function i(e) {
    return null !== e && "object" == typeof e;
  }
  function d(e) {
    return Array.isArray(e) || i(e);
  }
  function l(e) {
    return "function" == typeof structuredClone
      ? structuredClone(e)
      : JSON.parse(JSON.stringify(e));
  }
  function s() {
    return globalThis.Mvu ?? window.parent?.Mvu;
  }
  function v(e, t) {
    return t.reduce((e, t) => (null == e ? void 0 : e[t]), e);
  }
  function p(e, t, a) {
    if (!t.length) return void (n.data = i(a) ? a : {});
    const r = (function (e, t) {
      let a = e;
      for (const e of t) (i(a[e]) || (a[e] = {}), (a = a[e]));
      return a;
    })(e, t.slice(0, -1));
    r[t[t.length - 1]] = a;
  }
  function u(e, t) {
    if (!t.length) return !1;
    const a = v(e, t.slice(0, -1)),
      n = t[t.length - 1];
    return (
      !(!i(a) || !Object.prototype.hasOwnProperty.call(a, n)) &&
      (Array.isArray(a) ? a.splice(Number(n), 1) : delete a[n],
      (function (e, t) {
        for (let a = t.length; a > 0; a--) {
          const n = t.slice(0, a),
            r = n.slice(0, -1),
            o = n[n.length - 1],
            c = v(e, n),
            l = v(e, r);
          if (!d(c) || Object.keys(c).length > 0) break;
          if (!i(l)) break;
          Array.isArray(l) ? l.splice(Number(o), 1) : delete l[o];
        }
      })(e, t.slice(0, -1)),
      !0)
    );
  }
  function f(e) {
    if (!d(e)) return 1;
    const t = Object.values(e);
    return t.length ? t.reduce((e, t) => e + f(t), 0) : 0;
  }
  function g(e, t = "ok") {
    "function" == typeof n.showToast && n.showToast(e, t);
  }
  function h() {
    ((n.data = (function () {
      const e = s();
      if (!e?.getMvuData) throw new Error("MVU chưa được khởi tạo.");
      const t = (e.getMvuData({ type: "message", message_id: "latest" }) || {})
        .stat_data;
      return t && "object" == typeof t ? l(t) : {};
    })()),
      (n.selectedPath = []),
      (n.expanded = new Set([""])),
      (n.dirty = !1));
  }
  function b(e, t, a) {
    const r = n.query.trim().toLowerCase();
    if (!r) return !0;
    return (
      !(
        !c([...e, t])
          .toLowerCase()
          .includes(r) && !String(t).toLowerCase().includes(r)
      ) ||
      (d(a)
        ? Object.entries(a).some(([a, n]) => b([...e, t], a, n))
        : String(a ?? "")
            .toLowerCase()
            .includes(r))
    );
  }
  function m(e, t, a) {
    const c = [...a, e];
    if (!b(a, e, t)) return "";
    const i = o(c),
      l = Boolean(n.query) || n.expanded.has(i),
      s = o(n.selectedPath) === i,
      v = d(t);
    return `\n      <div class="cve-node">\n        <button class="cve-row${s ? " active" : ""}" data-cve-select="${r(i)}">\n          <span class="cve-twist" data-cve-toggle="${r(i)}">${v ? (l ? "⌄" : "›") : ""}</span>\n          <span class="cve-name">${r(e)}</span>\n          <span class="cve-kind">${r(
      (function (e) {
        return Array.isArray(e)
          ? "Mảng"
          : null === e
            ? "Rỗng"
            : "object" == typeof e
              ? "Nhánh"
              : "boolean" == typeof e
                ? "Boolean"
                : "number" == typeof e
                  ? "Số"
                  : "Văn bản";
      })(t),
    )}</span>\n        </button>\n        ${v && l ? `<div class="cve-children">${x(t, c)}</div>` : ""}\n      </div>`;
  }
  function x(e, t = []) {
    const a = Object.entries(e || {});
    return a.length
      ? a.map(([e, a]) => m(e, a, t)).join("")
      : '<div class="cve-empty">Tạm không có biến lượng</div>';
  }
  function y() {
    return (
      !!n.selectedPath.length &&
      (1 !== n.selectedPath.length || !a.has(n.selectedPath[0]))
    );
  }
  function w() {
    const e = v(n.data, n.selectedPath);
    if (!n.selectedPath.length)
      return '<div class="cve-detail-card"><div class="cve-path">Biến gốc</div><div class="cve-actions"><button class="cve-btn" data-cve-add-child>Thêm biến gốc mới</button></div><div class="cve-empty" style="min-height:220px">Chọn biến bên trái để bắt đầu chỉnh sửa<br>Có thể chọn trực tiếp nhánh để xóa toàn bộ nhánh</div></div>';
    const t =
      Array.isArray(e) || (null !== e && "object" == typeof e)
        ? "json"
        : typeof e;
    return `\n      <div class="cve-detail-card">\n        <div class="cve-path">${r(c(n.selectedPath))}</div>\n        <div class="cve-actions">\n          <button class="cve-btn" data-cve-add-child>Thêm mục con</button>\n          <button class="cve-btn danger" data-cve-delete ${y() ? "" : "disabled"}>Xóa ${d(e) ? "nhánh" : "biến"}</button>\n        </div>\n        <div class="cve-field"><label>Kiểu dữ liệu</label><select data-cve-type>${["string", "number", "boolean", "json"].map((e) => `<option value="${e}"${t === e ? " selected" : ""}>${e}</option>`).join("")}</select></div>\n        <div class="cve-field"><label>Giá trị</label>${
      "boolean" === t
        ? `<select data-cve-value><option value="true"${!0 === e ? " selected" : ""}>true</option><option value="false"${!1 === e ? " selected" : ""}>false</option></select>`
        : `<textarea data-cve-value spellcheck="false">${r(
            (function (e) {
              return "string" == typeof e
                ? e
                : "number" == typeof e || "boolean" == typeof e
                  ? String(e)
                  : null === e
                    ? "null"
                    : JSON.stringify(e, null, 2);
            })(e),
          )}</textarea>`
    }</div>\n        <div class="cve-actions"><button class="cve-btn primary" data-cve-apply>Áp dụng sửa đổi</button><button class="cve-btn" data-cve-refresh-selection>Đặt lại nhập liệu</button></div>\n      </div>`;
  }
  function k() {
    const t = n.doc?.getElementById(e);
    if (!t) return;
    const a = t.querySelector(".cve-tree"),
      o = t.querySelector(".cve-editor"),
      c = n.doc.activeElement?.matches?.("[data-cve-search]")
        ? n.doc.activeElement
        : null,
      i = c ? [c.selectionStart, c.selectionEnd] : null,
      d = {
        treeTop: a?.scrollTop ?? 0,
        treeLeft: a?.scrollLeft ?? 0,
        editorTop: o?.scrollTop ?? 0,
        editorLeft: o?.scrollLeft ?? 0,
      };
    ((t.className = `cve-mask theme-${n.theme}`),
      (t.innerHTML = `\n      <section class="cve-modal" role="dialog" aria-modal="true" aria-label="Biến lượng tu cải khí">\n        <header class="cve-head"><div class="cve-title"><p>Tàn Minh Dư Tẫn · MVU</p><h2>Biến lượng tu cải khí</h2></div><div class="cve-head-actions"><button class="cve-icon" data-cve-refresh title="Làm mới">↻</button><button class="cve-icon" data-cve-close title="Đóng">×</button></div></header>\n        <div class="cve-search"><input data-cve-search value="${r(n.query)}" placeholder="Tìm kiếm tên biến, đường dẫn hoặc giá trị"></div>\n        <div class="cve-body"><aside class="cve-tree">${x(n.data)}</aside><section class="cve-editor">${w()}</section></div>\n        <footer class="cve-footer"><span class="cve-badge">${n.dirty ? "Có sửa đổi chưa lưu" : "Đã đồng bộ latest"}</span><div class="cve-footer-right"><button class="cve-btn" data-cve-undo ${n.undo ? "" : "disabled"}>Hoàn tác xóa</button><button class="cve-btn primary" data-cve-save>Ghi lại biến lượng</button></div></footer>\n      </section>`));
    const l = t.querySelector(".cve-tree"),
      s = t.querySelector(".cve-editor");
    if (
      (l && ((l.scrollTop = d.treeTop), (l.scrollLeft = d.treeLeft)),
      s && ((s.scrollTop = d.editorTop), (s.scrollLeft = d.editorLeft)),
      i)
    ) {
      const e = t.querySelector("[data-cve-search]");
      (e?.focus(),
        e?.setSelectionRange(i[0] ?? e.value.length, i[1] ?? e.value.length));
    }
  }
  function S() {
    if (!y()) return;
    const e = v(n.data, n.selectedPath),
      t = c(n.selectedPath),
      a = d(e)
        ? `Xác nhận xóa toàn bộ nhánh 「${t}」? Sẽ loại bỏ ${f(e)} mục con và tự động dọn sạch cấp cha trống.`
        : `Xác nhận xóa 「${t}」? Sau khi xóa sẽ tự động dọn sạch cấp cha trống.`;
    confirm(a) &&
      ((n.undo = { path: [...n.selectedPath], dataBefore: l(n.data) }),
      u(n.data, n.selectedPath),
      (n.selectedPath = []),
      (n.dirty = !0),
      k());
  }
  function P() {
    const e = n.doc.querySelector("[data-cve-type]")?.value || "string",
      t = n.doc.querySelector("[data-cve-value]")?.value || "";
    try {
      (p(
        n.data,
        n.selectedPath,
        (function (e, t) {
          if ("string" === e) return String(t ?? "");
          if ("number" === e) {
            const e = Number(t);
            if (!Number.isFinite(e)) throw new Error("Định dạng số không chính xác.");
            return e;
          }
          if ("boolean" === e) return !0 === t || "true" === t;
          try {
            return JSON.parse(t);
          } catch (e) {
            throw new Error(`Định dạng JSON không chính xác: ${e.message}`);
          }
        })(e, t),
      ),
        (n.dirty = !0),
        k());
    } catch (e) {
      g(`✗ ${e.message}`, "err");
    }
  }
  async function E() {
    try {
      (await (async function () {
        const e = s();
        if (!e?.getMvuData || !e?.replaceMvuData)
          throw new Error("MVU chưa được khởi tạo, không thể ghi lại.");
        const t = e.getMvuData({ type: "message", message_id: "latest" }) || {};
        ((t.stat_data = l(n.data)),
          await e.replaceMvuData(t, { type: "message", message_id: "latest" }),
          (n.dirty = !1),
          "function" == typeof n.onChanged && n.onChanged());
      })(),
        g("✓ Biến lượng đã được ghi lại", "ok"),
        k());
    } catch (e) {
      g(`✗ Ghi lại thất bại: ${e.message || "Lỗi chưa rõ"}`, "err");
    }
  }
  function j() {
    if (
      !n.doc ||
      (n.dirty && !confirm("Vẫn còn sửa đổi chưa ghi lại, xác nhận đóng Biến lượng tu cải khí?"))
    )
      return;
    const t = n.doc.getElementById(e);
    (t?.remove(),
      n.doc.removeEventListener("keydown", A, !0),
      (n.doc = null),
      (n.undo = null));
  }
  function C(t) {
    const a = t.target;
    if (a === n.doc.getElementById(e)) return j();
    if (a.closest("[data-cve-close]")) return j();
    if (a.closest("[data-cve-refresh]")) {
      if (n.dirty && !confirm("Làm mới sẽ hủy bỏ các sửa đổi chưa ghi lại, xác nhận làm mới?")) return;
      return (h(), void k());
    }
    const r = a.closest("[data-cve-toggle]");
    if (r) {
      t.stopPropagation();
      const e = r.getAttribute("data-cve-toggle") || "";
      return (
        n.expanded.has(e) ? n.expanded.delete(e) : n.expanded.add(e),
        void k()
      );
    }
    const c = a.closest("[data-cve-select]");
    return c
      ? ((n.selectedPath = (d = c.getAttribute("data-cve-select") || "")
          ? d.split("")
          : []),
        void k())
      : a.closest("[data-cve-add-child]")
        ? (function () {
            const e = n.selectedPath.length ? n.selectedPath : [],
              t = v(n.data, e);
            if (!i(t)) return g("✗ Chỉ biến dạng nhánh mới có thể thêm mục con", "err");
            const a = prompt("Vui lòng nhập tên biến mới");
            if (a) {
              if (Object.prototype.hasOwnProperty.call(t, a))
                return g("✗ Biến trùng tên đã tồn tại", "err");
              ((t[a] = ""),
                (n.selectedPath = [...e, a]),
                n.expanded.add(o(e)),
                (n.dirty = !0),
                k());
            }
          })()
        : a.closest("[data-cve-delete]")
          ? S()
          : a.closest("[data-cve-apply]")
            ? P()
            : a.closest("[data-cve-refresh-selection]")
              ? k()
              : a.closest("[data-cve-undo]")
                ? (function () {
                    if (n.undo) {
                      ((n.data = l(n.undo.dataBefore)),
                        (n.selectedPath = [...n.undo.path]));
                      for (let e = 0; e < n.selectedPath.length; e++)
                        n.expanded.add(o(n.selectedPath.slice(0, e)));
                      ((n.undo = null), (n.dirty = !0), k());
                    }
                  })()
                : a.closest("[data-cve-save]")
                  ? E()
                  : void 0;
    var d;
  }
  function L(e) {
    const t = e.target.closest?.("[data-cve-search]");
    if (!t) return;
    ((n.query = t.value), k());
    const a = n.doc.querySelector("[data-cve-search]");
    (a?.focus(), a?.setSelectionRange(a.value.length, a.value.length));
  }
  function A(e) {
    "Escape" === e.key && (e.preventDefault(), j());
  }
  function T(a = {}) {
    ((n.doc = a.mountDocument || document),
      (n.theme = a.theme || n.theme || "day"),
      (n.onChanged = a.onChanged || null),
      (n.showToast = a.showToast || null),
      (function (e) {
        if (e.getElementById(t)) return;
        const a = e.createElement("style");
        ((a.id = t),
          (a.textContent =
            "\n      .cve-mask{position:absolute;inset:0;z-index:20;display:grid;place-items:center;padding:18px;background:rgba(20,12,7,.52);backdrop-filter:blur(3px)}\n      .cve-modal{width:min(920px,96%);height:min(680px,90%);display:flex;flex-direction:column;border:1px solid var(--line);border-radius:20px;background:linear-gradient(135deg,var(--paper),var(--paper2));box-shadow:0 22px 70px var(--shadow);overflow:hidden;color:var(--ink)}\n      .cve-head{display:flex;align-items:center;justify-content:space-between;gap:14px;padding:15px 18px;border-bottom:1px solid var(--line)}.cve-title{min-width:0}.cve-title p{margin:0 0 3px;color:var(--accent);font-size:12px;letter-spacing:.22em}.cve-title h2{margin:0;font-size:20px}\n      .cve-head-actions,.cve-footer{display:flex;align-items:center;gap:8px;flex-wrap:wrap}.cve-icon,.cve-btn{border:1px solid var(--line);border-radius:999px;background:var(--card);color:var(--muted);cursor:pointer;transition:all .15s}.cve-icon{width:32px;height:32px;display:grid;place-items:center;font-size:18px;line-height:1}.cve-icon:hover,.cve-btn:hover{border-color:var(--accent);color:var(--accent)}.cve-btn{padding:7px 12px}.cve-btn.primary{background:var(--accent);border-color:var(--accent);color:#fff}.cve-btn.danger{border-color:rgba(180,50,35,.45);color:rgba(180,50,35,.78)}.cve-btn.danger:hover{background:#b84835;color:#fff;border-color:#b84835}.cve-btn:disabled{opacity:.4;pointer-events:none}\n      .cve-search{padding:12px 18px;border-bottom:1px solid var(--line);display:flex;gap:10px;align-items:center}.cve-search input{width:100%;border:1px solid var(--line);border-radius:999px;background:var(--card);color:var(--ink);padding:10px 14px;outline:none}.cve-search input:focus{border-color:var(--accent);box-shadow:0 0 0 2px var(--glow)}\n      .cve-body{min-height:0;flex:1;display:grid;grid-template-columns:minmax(260px,360px) 1fr;gap:0}.cve-tree{border-right:1px solid var(--line);overflow:auto;padding:12px;background:rgba(0,0,0,.025)}.cve-editor{overflow:auto;padding:16px}\n      .cve-node{margin:2px 0}.cve-row{width:100%;display:grid;grid-template-columns:24px minmax(0,1fr) auto;align-items:center;gap:6px;border:1px solid transparent;border-radius:12px;background:transparent;color:var(--ink);padding:7px 8px;text-align:left;cursor:pointer}.cve-row:hover{background:var(--card);border-color:var(--line)}.cve-row.active{background:rgba(164,61,45,.10);border-color:var(--accent)}.cve-twist{color:var(--muted);font-size:16px;text-align:center}.cve-name{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.cve-kind{font-size:12px;color:var(--muted);border:1px solid var(--line);border-radius:999px;padding:1px 7px;background:rgba(0,0,0,.04)}.cve-children{margin-left:14px;border-left:1px dashed var(--line);padding-left:8px}\n      .cve-detail-card{border:1px solid var(--line);border-radius:16px;background:var(--card);padding:14px;box-shadow:0 10px 22px rgba(0,0,0,.06)}.cve-path{color:var(--muted);font-size:12px;line-height:1.7;word-break:break-all}.cve-field{margin-top:12px}.cve-field label{display:block;margin-bottom:6px;color:var(--accent);font-weight:700}.cve-field input,.cve-field textarea,.cve-field select{width:100%;border:1px solid var(--line);border-radius:12px;background:rgba(255,255,255,.08);color:var(--ink);padding:10px 12px;outline:none;font:inherit}.cve-field textarea{min-height:210px;resize:vertical;line-height:1.55;font-family:ui-monospace,SFMono-Regular,Consolas,monospace}.cve-field input:focus,.cve-field textarea:focus,.cve-field select:focus{border-color:var(--accent);box-shadow:0 0 0 2px var(--glow)}\n      .cve-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:14px}.cve-empty{height:100%;display:grid;place-content:center;text-align:center;color:var(--muted);line-height:1.8}.cve-footer{justify-content:space-between;padding:12px 18px;border-top:1px solid var(--line);color:var(--muted);font-size:12px}.cve-footer-right{display:flex;gap:8px;flex-wrap:wrap}.cve-badge{display:inline-flex;align-items:center;border:1px solid var(--line);border-radius:999px;padding:4px 9px;background:var(--card)}\n      @media (max-width:760px){.cve-modal{height:94%;width:98%;border-radius:16px}.cve-body{grid-template-columns:1fr;grid-template-rows:minmax(180px,42%) 1fr}.cve-tree{border-right:0;border-bottom:1px solid var(--line)}.cve-head{align-items:flex-start}.cve-title h2{font-size:18px}}\n    "),
          e.head.appendChild(a));
      })(n.doc),
      n.doc.removeEventListener("keydown", A, !0),
      n.doc.getElementById(e)?.remove(),
      h());
    const r = n.doc.createElement("div");
    ((r.id = e),
      n.doc.body.appendChild(r),
      (function (e) {
        (e.addEventListener("click", C),
          e.addEventListener("input", L),
          n.doc.addEventListener("keydown", A, !0));
      })(r),
      k());
    const o = n.doc.querySelector("[data-cve-search]");
    o?.focus();
  }
  ((globalThis.CanmingVariableEditor = {
    open: T,
    close: j,
    toggle: function (t = {}) {
      n.doc?.getElementById(e) ? j() : T(t);
    },
    refresh: function () {
      n.doc && (h(), k());
    },
  }),
    window.parent &&
      window.parent !== window &&
      (window.parent.CanmingVariableEditor = globalThis.CanmingVariableEditor));
})();
//# sourceMappingURL=index.js.map