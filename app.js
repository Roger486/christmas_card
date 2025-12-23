// ---------- Helpers ----------
function setReadonlyMode(readonly) {
  const card = document.querySelector(".card");
  if (!card) return;

  card.classList.toggle("card--readonly", readonly);
}

function qs(id) {
  const el = document.getElementById(id);
  if (!el) throw new Error(`Missing element: #${id}`);
  return el;
}

function setHint(text) {
  qs("hint").textContent = text;
  if (!text) return;
  window.clearTimeout(setHint._t);
  setHint._t = window.setTimeout(() => (qs("hint").textContent = ""), 2200);
}

function sanitize(str) {
  return String(str ?? "").trim().slice(0, 200);
}

function buildUrlWithParams(params) {
  const url = new URL(window.location.href);
  Object.entries(params).forEach(([k, v]) => {
    if (v) url.searchParams.set(k, v);
    else url.searchParams.delete(k);
  });
  return url.toString();
}

function applyToCard({ title, subtitle, to, from, msg }) {
  qs("titleText").textContent = title || "¡Feliz Navidad!";
  qs("subtitleText").textContent = subtitle || "y un 2026 lleno de buenas cosas ✨";

  qs("toValue").textContent = to || "—";
  qs("fromValue").textContent = from || "—";
  qs("message").textContent =
    msg || "Que estas fiestas te traigan calma, risas y tiempo para lo importante.";
}

// ---------- Read URL params on load ----------
const params = new URLSearchParams(window.location.search);
const initial = {
  title: sanitize(params.get("title")),
  subtitle: sanitize(params.get("subtitle")),
  to: sanitize(params.get("to")),
  from: sanitize(params.get("from")),
  msg: sanitize(params.get("msg")),
};

applyToCard(initial);

qs("titleInput").value = initial.title;
qs("subtitleInput").value = initial.subtitle;
qs("toInput").value = initial.to;
qs("fromInput").value = initial.from;
qs("msgInput").value = initial.msg;

const hasContentToShow = Boolean(
  initial.title || initial.subtitle || initial.to || initial.from || initial.msg
);

if (hasContentToShow) setReadonlyMode(true);

// ---------- Form behavior ----------
qs("form").addEventListener("submit", (e) => {
  e.preventDefault();

  const title = sanitize(qs("titleInput").value);
  const subtitle = sanitize(qs("subtitleInput").value);
  const to = sanitize(qs("toInput").value);
  const from = sanitize(qs("fromInput").value);
  const msg = sanitize(qs("msgInput").value);

  applyToCard({ title, subtitle, to, from, msg });

  // Update URL without reloading
  const newUrl = buildUrlWithParams({ title, subtitle, to, from, msg });
  window.history.replaceState({}, "", newUrl);

  setReadonlyMode(true);
  setHint("🎄 Postal lista para compartir");
});

qs("copyBtn").addEventListener("click", async () => {
  const title = sanitize(qs("titleInput").value);
  const subtitle = sanitize(qs("subtitleInput").value);
  const to = sanitize(qs("toInput").value);
  const from = sanitize(qs("fromInput").value);
  const msg = sanitize(qs("msgInput").value);

  const url = buildUrlWithParams({ title, subtitle, to, from, msg });

  try {
    await navigator.clipboard.writeText(url);
    setHint("🔗 Enlace copiado al portapapeles");
  } catch (err) {
    console.error("Clipboard API failed", err);
    setHint("❌ No se pudo copiar el enlace");
  }
});



// ---------- Snow canvas ----------
const canvas = qs("snow");
const ctx = canvas.getContext("2d");

let w = 0;
let h = 0;

function resize() {
  const dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));
  w = Math.floor(window.innerWidth);
  h = Math.floor(window.innerHeight);

  canvas.width = Math.floor(w * dpr);
  canvas.height = Math.floor(h * dpr);
  canvas.style.width = `${w}px`;
  canvas.style.height = `${h}px`;

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
window.addEventListener("resize", resize);
resize();

function rand(min, max) {
  return min + Math.random() * (max - min);
}

const flakes = [];
const FLAKE_COUNT = 160;

function initFlakes() {
  flakes.length = 0;
  for (let i = 0; i < FLAKE_COUNT; i++) {
    flakes.push({
      x: rand(0, w),
      y: rand(0, h),
      r: rand(0.8, 2.4),
      vx: rand(-0.25, 0.25),
      vy: rand(0.6, 1.6),
      wobble: rand(0, Math.PI * 2),
    });
  }
}
initFlakes();

let snowOn = true;

function step() {
  if (!snowOn) return;

  ctx.clearRect(0, 0, w, h);

  // Soft vignette
  ctx.globalAlpha = 0.35;
  const g = ctx.createRadialGradient(w * 0.5, h * 0.35, 120, w * 0.5, h * 0.5, Math.max(w, h));
  g.addColorStop(0, "rgba(0,0,0,0)");
  g.addColorStop(1, "rgba(0,0,0,0.55)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
  ctx.globalAlpha = 1;

  // Flakes
  ctx.fillStyle = "rgba(255,255,255,0.9)";
  for (const f of flakes) {
    f.wobble += 0.02;
    f.x += f.vx + Math.sin(f.wobble) * 0.15;
    f.y += f.vy;

    if (f.y - f.r > h) {
      f.y = -f.r;
      f.x = rand(0, w);
    }
    if (f.x < -10) f.x = w + 10;
    if (f.x > w + 10) f.x = -10;

    ctx.beginPath();
    ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
    ctx.fill();
  }

  requestAnimationFrame(step);
}

requestAnimationFrame(step);

qs("toggleSnowBtn").addEventListener("click", () => {
  snowOn = !snowOn;
  qs("toggleSnowBtn").textContent = `Nieve: ${snowOn ? "ON" : "OFF"}`;

  if (snowOn) {
    // Restart animation cleanly
    requestAnimationFrame(step);
    setHint("❄️ Nieve activada");
  } else {
    ctx.clearRect(0, 0, w, h);
    setHint("🌙 Nieve desactivada");
  }
});

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());