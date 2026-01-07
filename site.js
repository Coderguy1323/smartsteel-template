const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

async function loadConfig() {
  const res = await fetch("config.json", { cache: "no-store" });
  return res.json();
}

function bindText(cfg) {
  $$("[data-text]").forEach(el => {
    const key = el.getAttribute("data-text");
    if (cfg[key]) el.textContent = cfg[key];
  });

  $("#year").textContent = new Date().getFullYear();
}

function renderPills(items) {
  const wrap = $("#capabilities");
  wrap.innerHTML = "";
  (items || []).forEach(t => {
    const span = document.createElement("span");
    span.className = "pill";
    span.textContent = t;
    wrap.appendChild(span);
  });
}

function renderReasons(items) {
  const ul = $("#reasons");
  ul.innerHTML = "";
  (items || []).forEach(t => {
    const li = document.createElement("li");
    li.textContent = t;
    ul.appendChild(li);
  });
}

function renderServices(services) {
  const wrap = $("#servicesList");
  wrap.innerHTML = "";
  (services || []).forEach(s => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <h3>${s.title}</h3>
      <p>${s.desc}</p>
    `;
    wrap.appendChild(card);
  });

  // quick list on the contact card
  const quick = $("#quickServices");
  quick.innerHTML = "";
  (services || []).slice(0, 6).forEach(s => {
    const li = document.createElement("li");
    li.textContent = s.title;
    quick.appendChild(li);
  });
}

function renderGallery(items) {
  const wrap = $("#galleryGrid");
  wrap.innerHTML = "";
  (items || []).forEach(g => {
    const a = document.createElement("a");
    a.className = "gItem";
    a.href = g.src;
    a.target = "_blank";
    a.rel = "noopener";
    a.innerHTML = `<img src="${g.src}" alt="${g.alt || 'Steel work'}" loading="lazy" />`;
    wrap.appendChild(a);
  });
}

function mobileMenu() {
  const toggle = $(".navToggle");
  const nav = $(".nav");
  toggle?.addEventListener("click", () => {
    const open = nav.style.display === "flex";
    nav.style.display = open ? "none" : "flex";
    nav.style.flexDirection = "column";
    nav.style.gap = "14px";
    nav.style.padding = "12px";
    nav.style.border = "1px solid rgba(255,255,255,.10)";
    nav.style.borderRadius = "16px";
    nav.style.background = "rgba(11,15,20,.85)";
    toggle.setAttribute("aria-expanded", String(!open));
  });
}

(async function init(){
  const cfg = await loadConfig();
  bindText(cfg);
  renderPills(cfg.capabilities);
  renderReasons(cfg.reasons);
  renderServices(cfg.services);
  renderGallery(cfg.gallery);
  mobileMenu();
})();
