"use strict";
const email = "zqf980203@sjtu.edu.cn";
const toast = document.querySelector(".toast");
let toastTimeout;
function notify(message) {
  if (!toast) return;
  clearTimeout(toastTimeout);
  toast.textContent = message;
  toastTimeout = setTimeout(() => { toast.textContent = ""; }, 3000);
}
async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    notify("已复制到剪贴板");
  } catch {
    const field = document.createElement("textarea");
    field.value = text;
    field.style.position = "fixed";
    field.style.opacity = "0";
    document.body.append(field);
    field.select();
    const copied = document.execCommand("copy");
    field.remove();
    notify(copied ? "已复制到剪贴板" : "复制未完成，请手动复制");
  }
}
document.querySelectorAll("[data-copy-email]").forEach(button => {
  button.addEventListener("click", () => copyText(email));
});
const figureDialog = document.querySelector("#figure-dialog");
document.querySelectorAll("[data-figure]").forEach(button => {
  button.addEventListener("click", () => {
    const image = figureDialog.querySelector("img");
    image.src = button.dataset.figure;
    image.alt = button.querySelector("img").alt;
    figureDialog.querySelector("h2").textContent = button.dataset.title;
    figureDialog.showModal();
  });
});
const citations = {
  bppo: `@misc{zhao2026bppo,
  title = {BPPO: Binary Prefix Policy Optimization for Efficient GRPO-Style Reasoning RL with Concise Responses},
  author = {Qingfei Zhao and Huan Song and Shuyu Tian and Jiawei Shao and Xuelong Li},
  year = {2026},
  eprint = {2605.28028},
  archivePrefix = {arXiv},
  primaryClass = {cs.LG},
  url = {https://arxiv.org/abs/2605.28028}
}`,
  pgopd: `@misc{zhao2026prefixguided,
  title = {Prefix-Guided On-Policy Distillation: Mining Golden Trajectories from Rollouts},
  author = {Qingfei Zhao and Huan Song and Shuyu Tian and Jiawei Shao and Xuelong Li},
  year = {2026},
  eprint = {2606.21994},
  archivePrefix = {arXiv},
  primaryClass = {cs.LG},
  url = {https://arxiv.org/abs/2606.21994}
}`
};
const citationDialog = document.querySelector("#citation-dialog");
document.querySelectorAll("[data-cite]").forEach(button => {
  button.addEventListener("click", () => {
    citationDialog.querySelector("pre").textContent = citations[button.dataset.cite];
    citationDialog.showModal();
  });
});
document.querySelector("[data-copy-citation]")?.addEventListener("click", () => {
  copyText(citationDialog.querySelector("pre").textContent);
});
document.querySelectorAll("dialog").forEach(dialog => {
  dialog.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", event => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
  });
});
document.querySelectorAll(".video-shell").forEach(shell => {
  const video = shell.querySelector("video");
  const button = shell.querySelector(".video-play");
  button?.addEventListener("click", () => {
    video.play().catch(() => notify("视频暂时无法播放，可使用播放器控件重试"));
  });
  video.addEventListener("play", () => {
    if (button) button.hidden = true;
    document.querySelectorAll("video").forEach(other => { if (other !== video) other.pause(); });
  });
  video.addEventListener("ended", () => { if (button) button.hidden = false; });
  video.addEventListener("error", () => notify("视频加载失败，请检查网络后重试"));
});
document.querySelectorAll("[data-video-src]").forEach(button => {
  button.addEventListener("click", () => {
    const video = document.querySelector("#vending-video");
    video.pause();
    video.src = button.dataset.videoSrc;
    video.poster = button.dataset.poster;
    video.load();
    video.closest(".video-shell").querySelector(".video-play").hidden = false;
    document.querySelectorAll("[data-video-src]").forEach(other => other.setAttribute("aria-pressed", String(other === button)));
  });
});

const sectionLinks = [...document.querySelectorAll("[data-section-link]")];
function markSection(id) {
  sectionLinks.forEach(link => {
    if (link.hash === `#${id}`) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
}
sectionLinks.forEach(link => link.addEventListener("click", () => markSection(link.hash.slice(1))));
if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) markSection(entry.target.id); });
  }, { rootMargin: "-15% 0px -55% 0px" });
  sectionLinks.forEach(link => {
    const section = document.querySelector(link.hash);
    if (section) sectionObserver.observe(section);
  });
}
