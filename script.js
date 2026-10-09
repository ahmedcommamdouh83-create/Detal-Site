// ===== غيّر رقم الواتساب هنا (بالصيغة الدولية بدون + أو 00) =====
const WHATSAPP_NUMBER = "201289593323";
// ================================================================

const $ = id => document.getElementById(id);
const boxOf = k => k === "agree" ? $("agreeBox") : $(k);

document.querySelectorAll(".book-btn").forEach(b => b.addEventListener("click", () => {
  $("service").value = b.dataset.service;
  $("service").classList.remove("invalid");
  $("book").scrollIntoView({ behavior: "smooth", block: "start" });
}));

$("f").addEventListener("submit", e => {
  e.preventDefault();
  const phoneOk = /^(\+?20|0)?1[0125]\d{8}$/.test($("phone").value.replace(/[\s-]/g, ""));
  const checks = { name: $("name").value.trim().length > 1, phone: phoneOk, age: !!$("age").value, service: !!$("service").value, agree: $("agree").checked };
  let ok = true;
  for (const k in checks) {
    boxOf(k).classList.toggle("invalid", !checks[k]);
    if (!checks[k]) ok = false;
  }
  if (!ok) { document.querySelector(".invalid").scrollIntoView({ behavior: "smooth", block: "center" }); return; }

  const line = (t, v) => v && v.trim() ? `${t}: ${v.trim()}\n` : "";
  const msg =
    "🦷 *طلب حجز جديد - خدمة مجانية*\n\n" +
    line("👤 الاسم", $("name").value) +
    line("📱 الموبايل", $("phone").value) +
    line("🎂 السن", $("age").value) +
    line("🩺 الخدمة", $("service").value) +
    line("📍 الضرس", $("tooth").value) +
    line("⏳ حشو العصب اتعمل", $("when").value) +
    line("🕒 الوقت المناسب", $("day").value) +
    line("📝 ملاحظات", $("notes").value) +
    "✅ متعهد/ة بالالتزام بالمواعيد";

  window.location.href = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(msg);
});
["name","phone","age","service"].forEach(id => $(id).addEventListener("input", () => $(id).classList.remove("invalid")));
$("agree").addEventListener("change", () => $("agreeBox").classList.remove("invalid"));
