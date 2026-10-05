// Seitenübergänge für Browser ohne native View Transitions: kurz ausblenden, dann wechseln.
(() => {
  if ("onpagereveal" in window) return;                       // Browser kann es selbst (siehe style.css)
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  document.documentElement.classList.add("no-vt");
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[href]");
    if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (a.target && a.target !== "_self") return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin || (url.pathname === location.pathname && url.hash)) return;
    e.preventDefault();
    document.body.classList.add("leaving");
    setTimeout(() => { location.href = url.href; }, 290);
  });
  // Zurück-Taste (Seite aus dem Zwischenspeicher): wieder sichtbar machen
  addEventListener("pageshow", (e) => { if (e.persisted) document.body.classList.remove("leaving"); });
})();
// Statistik (nur in der Homescreen-App): siehe statistik.js
import("./statistik.js").catch(() => {});
