const intro = document.getElementById("intro");
const main = document.getElementById("main");
const enterBtn = document.getElementById("enterBtn");

const musicBtn = document.getElementById("musicBtn");
const bgBtn = document.getElementById("bgBtn");


const bgm = document.getElementById("bgm");
const introTip = document.getElementById("introTip");

const bgLayer = document.getElementById("bgLayer");

let musicOn = true;
let starsOn = true;

/* ========= 背景切换（intro -> main） ========= */
function setBg(which) {
  if (!bgLayer) return;

  if (which === "main") {
    bgLayer.style.backgroundImage = "var(--main-bg)";
    bgLayer.style.opacity = "0.42";   // ✅ 主页面背景更清楚（你想更清晰就调大：0.45/0.5）
  } else {
    bgLayer.style.backgroundImage = "var(--intro-bg)";
    bgLayer.style.opacity = "0.30";   // ✅ 封面稍微更淡一点
  }
}

// 初始是intro背景
setBg("intro");

/* ========= 音乐 ========= */
async function tryPlayMusic() {
  try {
    await bgm.play();
    musicOn = true;
    musicBtn.textContent = "🎵 音乐：开";
    introTip.textContent = "";
  } catch (e) {
    musicOn = false;
    musicBtn.textContent = "🎵 音乐：关";
    introTip.textContent = "音乐没播起来也没关系：确认 audio/bulingbuling.mp3 是否存在，然后再试一次。";
  }
}

enterBtn.addEventListener("click", async () => {
  await tryPlayMusic();

  // 主页面显示
  main.classList.remove("hidden");
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });

  // 切换到 main 背景（无缝：因为背景是fixed底层）
  setBg("main");
  document.documentElement.style.setProperty("--photoOpacity", "0.55");

  // intro淡出并移除
  intro.classList.add("fade-out");
  setTimeout(() => intro.remove(), 550);

  bgm.volume = 0.6;
});

/* 音乐开关 */
musicBtn.addEventListener("click", async () => {
  if (!bgm.src) return;
  if (musicOn) {
    bgm.pause();
    musicOn = false;
    musicBtn.textContent = "🎵 音乐：关";
  } else {
    await tryPlayMusic();
  }
});

/* ========= 星空开关（不需要gif） ========= */
function setStars(on) {
  starsOn = on;
  document.documentElement.style.setProperty("--starsOpacity", on ? "1" : "0");
  bgBtn.textContent = on ? "🌌 星空：开" : "🌌 星空：关";
}
setStars(true);

bgBtn?.addEventListener("click", () => {
  setStars(!starsOn);
});

/* =========================
   照片墙数据：你只需要改这里
========================= */
const photos = [
  { src: "images/1.jpg", cap: "给宝宝买的第一束❀❀，喜欢+1" },
  { src: "images/2.jpg", cap: "通宵陪我做实验睡着了，心动+1" },
  { src: "images/3.jpg", cap: "漂亮宝宝起床的时候好漂亮，心动+1" },
  { src: "images/4.jpg", cap: "你给妈妈看过的合照" },
  { src: "images/5.jpg", cap: "不知道我们早期在哪里玩的珍贵合影" },
  { src: "images/6.jpg", cap: "在婺源的缆车上你很害怕，我很拘束" },
  { src: "images/7.jpg", cap: "宝宝你这张照片有点好笑" },
  { src: "images/8.jpg", cap: "勇敢宝宝参加会议可惜我已经毕业了不在现场" },
  { src: "images/9.jpg", cap: "我眼中的你真的很漂亮" },
  { src: "images/10.jpg", cap: "宝宝，你看起来像一只温顺的小狗" },
  { src: "images/11.jpg", cap: "这一张我们都很上镜" },
  { src: "images/12.jpg", cap: "我们一起去玩，你在调皮的记录生活" },
  { src: "images/13.jpg", cap: "闺蜜拍的我们，还挺有氛围感的" },
  { src: "images/14.jpg", cap: "忘了在哪拍的了，好好笑啊" },
  { src: "images/15.jpg", cap: "宝宝来复旦找我，但我看起来很沧桑，我真的会好好护肤好好睡觉的" },
  { src: "images/16.jpg", cap: "我是你的掌上明珠" },
  { src: "images/17.jpg", cap: "换了发型，我们真的有在好好的生活，记录了很多美好" },
  { src: "images/18.jpg", cap: "晚上消耗化妆品的臭美宝" },
  { src: "images/19.jpg", cap: "宝宝的漂亮裙裙，但是衣领好低呀，我喜欢你穿给我👀" },
  { src: "images/20.jpg", cap: "坐高铁的时候我的忧郁宝宝，也有点好笑" },
  { src: "images/21.jpg", cap: "不得不说，你闺蜜这一张拍的真的很好" },
  { src: "images/22.jpg", cap: "漂亮宝宝的汉服照片写真" },
  { src: "images/23.jpg", cap: "我喜欢的自由和凌乱的美，要是表情管理再到位一点就更好了" },
  { src: "images/24.jpg", cap: "真的超好吃的小龙虾，我会经常念叨的" },
  { src: "images/25.jpg", cap: "我们在摄影老师的指导下第一次摆这么专业的pose拍照" },
  { src: "images/26.jpg", cap: "我真的很喜欢这一张照片，我们都笑的很灿烂" },
  { src: "images/27.jpg", cap: "你画的淡妆我真的很喜欢，超心动啊烙铁" },
  { src: "images/28.jpg", cap: "喜欢你开怀大笑，你就是比我好看" },
  { src: "images/29.jpg", cap: "这个时候我们已经冷的不行了，接下来就回酒店点外卖了" },
  { src: "images/30.jpg", cap: "我最愧疚的时候，现在心里还是很愧疚" },
  { src: "images/31.jpg", cap: "我不在你身边的时候，你又偷偷化妆臭美" },
  { src: "images/32.jpg", cap: "你的这种大笑真的很治愈我" },
  { src: "images/33.jpg", cap: "谢老师拍的很一般呀，但是照片很珍贵" },
  { src: "images/34.jpg", cap: "很喜欢这张我们互相依赖的感觉" },
  { src: "images/35.jpg", cap: "我们在迪士尼买的漂亮头套" },
  { src: "images/36.jpg", cap: "宝宝，我们两个真的不会摆pose，哈哈哈哈" },
  { src: "images/37.jpg", cap: "你这种对我不屑一顾的表情让我想把你征服" },
  { src: "images/38.jpg", cap: "你开心我就开心" },
  { src: "images/39.jpg", cap: "仙女下凡了" },
  { src: "images/40.jpg", cap: "这是我的屏保，你就说漂不漂亮吧！！！" },

];

/* ====== 渲染照片墙 ====== */
const galleryEl = document.getElementById("gallery");
function renderGallery() {
  if (!galleryEl) return;
  if (!photos.length) {
    galleryEl.innerHTML = `<div class="placeholder">照片还没放进来～</div>`;
    return;
  }

  galleryEl.innerHTML = photos.map((p, i) => `
    <button class="g-item" type="button" data-idx="${i}" aria-label="打开图片 ${i+1}">
      <img src="${p.src}" alt="${p.cap || "照片"}" loading="lazy" />
      <div class="g-cap">${p.cap || ""}</div>
    </button>
  `).join("");
}
renderGallery();

/* ====== Lightbox：打开/关闭/切换/键盘/手机滑动 ====== */
const lb = document.getElementById("lightbox");
const lbImg = document.getElementById("lbImg");
const lbCap = document.getElementById("lbCap");
const lbClose = document.getElementById("lbClose");
const lbPrev = document.getElementById("lbPrev");
const lbNext = document.getElementById("lbNext");

let lbIndex = 0;

function openLB(i) {
  lbIndex = i;
  const p = photos[lbIndex];
  lbImg.src = p.src;
  lbCap.textContent = p.cap || "";
  lb.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}
function closeLB() {
  lb.classList.add("hidden");
  document.body.style.overflow = "";
  setTimeout(() => { lbImg.src = ""; }, 50);
}
function prevLB() {
  lbIndex = (lbIndex - 1 + photos.length) % photos.length;
  openLB(lbIndex);
}
function nextLB() {
  lbIndex = (lbIndex + 1) % photos.length;
  openLB(lbIndex);
}

galleryEl?.addEventListener("click", (e) => {
  const btn = e.target.closest(".g-item");
  if (!btn) return;
  const i = Number(btn.dataset.idx);
  if (!Number.isFinite(i)) return;
  openLB(i);
});

lb?.addEventListener("click", (e) => {
  if (e.target?.dataset?.close === "1") closeLB();
});
lbClose?.addEventListener("click", closeLB);
lbPrev?.addEventListener("click", prevLB);
lbNext?.addEventListener("click", nextLB);

document.addEventListener("keydown", (e) => {
  if (!lb || lb.classList.contains("hidden")) return;
  if (e.key === "Escape") closeLB();
  if (e.key === "ArrowLeft") prevLB();
  if (e.key === "ArrowRight") nextLB();
});

let touchX = null;
lbImg?.addEventListener("touchstart", (e) => {
  touchX = e.touches[0].clientX;
}, { passive: true });
lbImg?.addEventListener("touchend", (e) => {
  if (touchX == null) return;
  const dx = e.changedTouches[0].clientX - touchX;
  touchX = null;
  if (Math.abs(dx) < 40) return;
  if (dx > 0) prevLB();
  else nextLB();
}, { passive: true });

/* ====== 星空：更明显 + 深度视差 + 微光粒子尾迹 ====== */
const starsCanvas = document.getElementById("stars");
const ctx = starsCanvas?.getContext("2d");

let stars = [];
let particles = [];
let w = 0, h = 0, dpr = 1;

let scrollY = 0;
let pointerX = 0.5;
let pointerY = 0.35;

window.addEventListener("scroll", () => {
  scrollY = window.scrollY || 0;
}, { passive: true });

function resizeStars() {
  if (!starsCanvas || !ctx) return;

  dpr = Math.min(window.devicePixelRatio || 1, 2);
  w = window.innerWidth;
  h = window.innerHeight;

  starsCanvas.width = Math.floor(w * dpr);
  starsCanvas.height = Math.floor(h * dpr);
  starsCanvas.style.width = w + "px";
  starsCanvas.style.height = h + "px";
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  // 数量克制但更亮：高级感来自“清晰”而不是“密麻”
  const n = Math.floor(Math.min(220, (w * h) / 8000));

  stars = Array.from({ length: n }, () => {
    const depth = Math.random(); // 0(远) -> 1(近)
    const big = Math.random() < 0.14; // 少数大星
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      depth,
      r: big ? (Math.random() * 2.2 + 2.0) : (Math.random() * 1.2 + 0.9),
      vx: (Math.random() - 0.5) * (0.02 + depth * 0.08),
      vy: (Math.random() - 0.5) * (0.02 + depth * 0.08),
      a: Math.random() * 0.55 + 0.35,
      tw: Math.random() * (0.02 + depth * 0.06) + 0.01,
    };
  });
}

function spawnParticles(x, y, count = 2) {
  for (let i = 0; i < count; i++) {
    particles.push({
      x,
      y,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      life: 1,
      r: Math.random() * 2.2 + 1.2,
    });
  }
  // 上限：控制性能
  if (particles.length > 90) particles.splice(0, particles.length - 90);
}

window.addEventListener("mousemove", (e) => {
  pointerX = e.clientX / window.innerWidth;
  pointerY = e.clientY / window.innerHeight;
  spawnParticles(e.clientX, e.clientY, 2);
});

window.addEventListener("touchmove", (e) => {
  if (!e.touches?.length) return;
  const t = e.touches[0];
  pointerX = t.clientX / window.innerWidth;
  pointerY = t.clientY / window.innerHeight;
  spawnParticles(t.clientX, t.clientY, 1);
}, { passive: true });

function drawStars() {
  if (!starsCanvas || !ctx) return;
  ctx.clearRect(0, 0, w, h);

  const px = (pointerX - 0.5) * w;
  const py = (pointerY - 0.5) * h;

  // 先画星星
  for (const s of stars) {
    s.x += s.vx;
    s.y += s.vy;

    if (s.x < -20) s.x = w + 20;
    if (s.x > w + 20) s.x = -20;
    if (s.y < -20) s.y = h + 20;
    if (s.y > h + 20) s.y = -20;

    // 更明显的闪烁
    s.a += (Math.random() - 0.5) * s.tw;
    s.a = Math.max(0.12, Math.min(0.95, s.a));

    // 深度视差：滚动/鼠标轻微影响位置（越近越明显）
    const sx = s.x + px * 0.03 * s.depth;
    const sy = s.y + (scrollY * 0.08 * s.depth) + py * 0.02 * s.depth;

    // 发光（更明显）
    ctx.beginPath();
    ctx.arc(sx, sy, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${s.a})`;
    ctx.shadowBlur = 14 + s.depth * 18;
    // ctx.shadowColor = "rgba(255,255,255,0.9)";
    ctx.shadowColor = "rgba(255,160,220,0.45)";

    ctx.fill();
  }
  ctx.shadowBlur = 0;

  // 再画微光粒子尾迹
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.life -= 0.03;

    if (p.life <= 0) {
      particles.splice(i, 1);
      continue;
    }

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${p.life * 0.35})`;
    ctx.shadowBlur = 18;
    ctx.shadowColor = "rgba(160,200,255,0.55)";
    ctx.fill();
    ctx.shadowBlur = 0;
  }

  requestAnimationFrame(drawStars);
}

resizeStars();
window.addEventListener("resize", resizeStars);
drawStars();


// ⭐ 滚动视差：让星空“有深度”
window.addEventListener("scroll", () => {
  const y = window.scrollY || 0;
  // 轻微就高级：别太夸张
  starsCanvas.style.transform = `translateY(${y * 0.08}px)`;
}, { passive: true });

/* ====== 滚动渐入：电影感 ====== */
function setupReveal() {
  const targets = document.querySelectorAll(".section, .hero, .footer");
  targets.forEach(el => el.classList.add("reveal"));

  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) e.target.classList.add("is-in");
    }
  }, { threshold: 0.12 });

  targets.forEach(el => io.observe(el));
}
setupReveal();

/* ====== 读信模式：信封开合 + 信纸展开 ====== */
/* ====== 读信弹层：打开/关闭 + 锁滚动 + 动画重启 ====== */
const letterModal = document.getElementById("letterModal");
const letterClose = document.getElementById("letterClose");
const letterBack = document.getElementById("letterBack");
const letterSheet = document.getElementById("letterSheet");

// 你页面的“情书入口卡片”
const letterBtn = document.getElementById("letterBtn");

// 锁滚动：避免弹层打开时背景还能滚；并补偿滚动条宽度避免页面抖动
function lockBodyScroll() {
  const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
  document.body.style.overflow = "hidden";
  document.body.style.paddingRight = scrollBarWidth > 0 ? `${scrollBarWidth}px` : "";
}
function unlockBodyScroll() {
  document.body.style.overflow = "";
  document.body.style.paddingRight = "";
}

// 给每个段落设置延迟，并“重启动画”
// 适合 1000+ 字（很多段）场景：无需手写 nth-child
function restartLetterAnimations() {
  if (!letterSheet) return;

  const ps = letterSheet.querySelectorAll("p");
  ps.forEach((p, i) => {
    // 0ms, 90ms, 180ms... 最大延迟上限，避免太长
    p.style.setProperty("--d", `${Math.min(i * 90, 2600)}ms`);
  });

  // 重启动画：移除 run -> 强制回流 -> 再加 run
  letterSheet.classList.remove("run");
  void letterSheet.offsetWidth;
  letterSheet.classList.add("run");
}

function openLetter() {
  if (!letterModal) return;

  // 先显示（从 display:none 变为可见）
  letterModal.classList.remove("hidden");
  document.documentElement.classList.add("letter-open");

  // 锁滚动
  lockBodyScroll();

  // 重置并准备段落渐显
  restartLetterAnimations();

  // 下一帧再加 open，确保 transition/animation 能触发
  requestAnimationFrame(() => {
    letterModal.classList.add("open");
    letterClose?.focus?.();
  });
}

// 关闭：先去掉 open 触发收起动画，再 hidden
function closeLetter() {
  if (!letterModal) return;

  letterModal.classList.remove("open");

  // 等 CSS 动画完成后再隐藏（时间需与 CSS transition 匹配）
  setTimeout(() => {
    letterModal.classList.add("hidden");
    unlockBodyScroll();
    document.documentElement.classList.remove("letter-open");
  }, 420);
}

// 绑定入口
letterBtn?.addEventListener("click", openLetter);

// 返回/关闭
letterClose?.addEventListener("click", closeLetter);
letterBack?.addEventListener("click", closeLetter);

// 点遮罩关闭
letterModal?.addEventListener("click", (e) => {
  if (e.target?.dataset?.close === "1") closeLetter();
});

// ESC 关闭
document.addEventListener("keydown", (e) => {
  if (!letterModal || letterModal.classList.contains("hidden")) return;
  if (e.key === "Escape") closeLetter();
});



const backHomeBtn = document.getElementById("backHomeBtn");
backHomeBtn?.addEventListener("click", () => {
  // 因为你 intro 进入后会 remove()，最干净的返回方式就是 reload
  location.reload();
});

// ⭐ 鼠标/手指微光跟随
function setPointerGlow(x, y){
  document.documentElement.style.setProperty("--mx", x + "px");
  document.documentElement.style.setProperty("--my", y + "px");
}

window.addEventListener("mousemove", (e) => {
  setPointerGlow(e.clientX, e.clientY);
});

window.addEventListener("touchmove", (e) => {
  if (!e.touches?.length) return;
  setPointerGlow(e.touches[0].clientX, e.touches[0].clientY);
}, { passive: true });



