const photoFiles = [
  "微信图片_20260408150106_152_4.jpg",
  "微信图片_20260408150110_154_4.jpg",
  "微信图片_20260408150121_155_4.jpg",
  "微信图片_20260408150129_156_4.jpg",
  "微信图片_20260408150134_158_4.jpg",
  "微信图片_20260408150151_160_4.jpg",
  "微信图片_20260408150152_161_4.jpg",
  "微信图片_20260408150157_162_4.jpg",
  "微信图片_20260408150201_163_4.jpg",
  "微信图片_20260408150204_164_4.jpg",
  "微信图片_20260408150209_165_4.jpg",
  "微信图片_20260408150221_166_4.jpg",
  "微信图片_20260408150227_167_4.jpg",
  "微信图片_20260408150229_168_4.jpg",
  "微信图片_20260408150232_169_4.jpg",
  "微信图片_20260408150238_170_4.jpg",
  "微信图片_20260408150245_171_4.jpg"
];

const videoFiles = [
  "3e5747d3583b58ba3bb84b7e9981bf21.mp4",
  "48c5d9e7bd07fa286a4a884d90d82529.mp4",
  "b74df0680a7efef1f92c48a96cfedbcc.mp4"
];

const galleryCaptions = [
  "今天看你，还是会心动。",
  "你在镜头里，也在我的偏爱里。",
  "普通的一天，因为有你就变得特别。",
  "这张照片像是在替我说喜欢你。",
  "每次想到你，都是柔软的。",
  "有些回忆光是看着就会开心。",
  "今天把所有好看都留给你。",
  "想把你每个瞬间都认真珍藏。",
  "在我这里，你一直都很特别。",
  "一起走过的时间，怎么想都值得。",
  "喜欢你这件事，连回忆都带光。",
  "再看一遍，还是会觉得很幸福。",
  "这一张，也舍不得漏掉。",
  "你一笑，今天就够浪漫了。",
  "想把我们的回忆，一页页放给你看。",
  "这份偏爱，不想只停在今天。",
  "以后也想继续收集和你有关的瞬间。"
];

const videoCaptions = [
  "会动的回忆，比想念更直接一点。",
  "再点开一次，今天的惊喜就继续。",
  "想把这一段，也好好留给你。"
];

const config = {
  heroTitle: "生日快乐，我的特别的人",
  heroSubtitle: "今天的晚风、灯光和所有心动，都是为了把这一句“你很重要”认真送给你。",
  heroCardHeadline: "不是一句匆忙的“生日快乐”，而是一整页认认真真的偏爱。",
  finalTitle: "愿你一直被爱，也一直自由闪亮",
  finalMessage: "谢谢你来到我的生活里。今天是你的生日，但偏爱、认真和心动，我想不止今天都给你。",
  autoplayPreferred: true,
  bgm: {
    src: "./assets/bgm-special-person.aac",
    title: "《特别的人》"
  },
  storyCards: [
    {
      title: "今天的主角",
      text: "今天请把所有的偏爱都收下。你不需要特意闪耀，因为你本来就很珍贵。"
    },
    {
      title: "和你在一起",
      text: "很多平凡的瞬间，因为有你一起，就变成了我会反复想起的好日子。"
    },
    {
      title: "接下来的愿望",
      text: "希望你被认真爱着，也希望未来很多个重要的日子，我都还在你身边。"
    }
  ],
  photos: photoFiles.map((file, index) => ({
    title: `回忆 ${String(index + 1).padStart(2, "0")}`,
    text: galleryCaptions[index],
    image: `./assets/${file}`,
    alt: `生日页照片 ${index + 1}`
  })),
  videos: videoFiles.map((file, index) => ({
    title: `片段 ${String(index + 1).padStart(2, "0")}`,
    text: videoCaptions[index],
    src: `./assets/${file}`,
    poster: `./assets/${photoFiles[index + 4]}`
  }))
};

const bgm = document.getElementById("bgm");
const musicTip = document.getElementById("musicTip");
const musicToggle = document.getElementById("musicToggle");
const enterButton = document.getElementById("enterButton");
const confettiButton = document.getElementById("confettiButton");
const particleCanvas = document.getElementById("particleCanvas");

function applyContent() {
  document.getElementById("heroTitle").textContent = config.heroTitle;
  document.getElementById("heroSubtitle").textContent = config.heroSubtitle;
  document.getElementById("heroCardHeadline").textContent = config.heroCardHeadline;
  document.getElementById("finalTitle").textContent = config.finalTitle;
  document.getElementById("finalMessage").textContent = config.finalMessage;
  document.getElementById("photoCount").textContent = String(config.photos.length);
  document.getElementById("videoCount").textContent = String(config.videos.length);
  musicToggle.textContent = `播放${config.bgm.title}`;
}

function renderStoryCards() {
  const grid = document.getElementById("storyGrid");
  const template = document.getElementById("storyCardTemplate");

  config.storyCards.forEach((card, index) => {
    const node = template.content.firstElementChild.cloneNode(true);
    node.querySelector(".story-card__index").textContent = `0${index + 1}`;
    node.querySelector(".story-card__title").textContent = card.title;
    node.querySelector(".story-card__text").textContent = card.text;
    grid.appendChild(node);
  });
}

function createPlaceholder(label) {
  const placeholder = document.createElement("div");
  placeholder.className = "memory-card__placeholder";
  placeholder.innerHTML = `<div><strong>${label}</strong><p>这个位置会在素材可用时正常展示。</p></div>`;
  return placeholder;
}

function buildImageMedia(item) {
  const wrapper = document.createElement("div");
  wrapper.className = "gallery-card__media";

  const img = document.createElement("img");
  img.loading = "lazy";
  img.decoding = "async";
  img.alt = item.alt || item.title;
  img.src = item.image;
  img.addEventListener("error", () => {
    img.remove();
    wrapper.appendChild(createPlaceholder(item.title));
  });

  wrapper.appendChild(img);
  return wrapper;
}

function renderGallery() {
  const grid = document.getElementById("galleryGrid");
  const template = document.getElementById("galleryCardTemplate");

  config.photos.forEach((item) => {
    const node = template.content.firstElementChild.cloneNode(true);
    const mediaHost = node.querySelector(".gallery-card__media");
    mediaHost.replaceWith(buildImageMedia(item));
    node.querySelector(".gallery-card__title").textContent = item.title;
    node.querySelector(".gallery-card__text").textContent = item.text;
    grid.appendChild(node);
  });
}

function renderVideos() {
  const grid = document.getElementById("videoGrid");
  const template = document.getElementById("videoCardTemplate");

  config.videos.forEach((item) => {
    const node = template.content.firstElementChild.cloneNode(true);
    const frame = node.querySelector(".video-card__frame");
    const video = document.createElement("video");
    video.controls = true;
    video.preload = "metadata";
    video.src = item.src;
    video.poster = item.poster;
    video.addEventListener("error", () => {
      frame.innerHTML = "";
      if (item.poster) {
        const img = document.createElement("img");
        img.src = item.poster;
        img.alt = item.title;
        img.addEventListener("error", () => {
          frame.appendChild(createPlaceholder(item.title));
        });
        frame.appendChild(img);
        return;
      }
      frame.appendChild(createPlaceholder(item.title));
    });
    frame.appendChild(video);
    node.querySelector(".video-card__title").textContent = item.title;
    node.querySelector(".video-card__text").textContent = item.text;
    grid.appendChild(node);
  });
}

function syncMusicUI(isPlaying, message) {
  musicToggle.setAttribute("aria-pressed", String(isPlaying));
  musicToggle.textContent = isPlaying ? `暂停${config.bgm.title}` : `播放${config.bgm.title}`;
  musicTip.textContent = message;
}

async function tryAutoplay() {
  bgm.src = config.bgm.src;
  bgm.volume = 0.72;

  if (!config.autoplayPreferred) {
    syncMusicUI(false, "点一下按钮就可以播放音乐。");
    return;
  }

  try {
    await bgm.play();
    syncMusicUI(true, "音乐已经悄悄开始了。");
  } catch {
    syncMusicUI(false, "浏览器拦截了自动播放，点一下按钮就能继续。音频文件如果还没加载完，稍等一下也可以。");
  }
}

async function toggleMusic() {
  if (bgm.paused) {
    try {
      await bgm.play();
      syncMusicUI(true, "这首歌现在属于你。");
    } catch {
      syncMusicUI(false, "如果还是没有声音，可能是浏览器限制了自动播放，重新点一次通常就可以。");
    }
    return;
  }

  bgm.pause();
  syncMusicUI(false, "音乐先暂停了，想听的时候再点一下。");
}

function setupScrollButtons() {
  document.querySelectorAll("[data-scroll-target]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.querySelector(button.dataset.scrollTarget);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  enterButton.addEventListener("click", () => {
    document.getElementById("story").scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

function setupRevealObserver() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
}

function launchHeartBurst(count = 18) {
  for (let index = 0; index < count; index += 1) {
    const heart = document.createElement("span");
    heart.className = "burst-heart";
    heart.textContent = Math.random() > 0.4 ? "❤" : "✦";
    heart.style.setProperty("--x", `${(Math.random() - 0.5) * 65}vw`);
    heart.style.setProperty("--y", `${(Math.random() - 0.5) * 65}vh`);
    document.body.appendChild(heart);
    window.setTimeout(() => heart.remove(), 1500);
  }
}

function setupBurstButton() {
  confettiButton.addEventListener("click", () => {
    launchHeartBurst(22);
  });
}

function setupMusicButton() {
  musicToggle.addEventListener("click", toggleMusic);
}

function setupCanvas() {
  const context = particleCanvas.getContext("2d");
  const particles = [];
  let width = 0;
  let height = 0;

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    particleCanvas.width = width * window.devicePixelRatio;
    particleCanvas.height = height * window.devicePixelRatio;
    particleCanvas.style.width = `${width}px`;
    particleCanvas.style.height = `${height}px`;
    context.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
  }

  function createParticle() {
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      size: 6 + Math.random() * 8,
      speedY: 0.15 + Math.random() * 0.45,
      speedX: -0.25 + Math.random() * 0.5,
      opacity: 0.18 + Math.random() * 0.42,
      hue: Math.random() > 0.55 ? "rgba(216, 133, 146," : "rgba(232, 188, 128,"
    };
  }

  function drawHeart(x, y, size, fill) {
    context.save();
    context.translate(x, y);
    context.scale(size / 18, size / 18);
    context.beginPath();
    context.moveTo(0, 6);
    context.bezierCurveTo(0, 0, -8, 0, -8, 6);
    context.bezierCurveTo(-8, 10, -4, 14, 0, 17);
    context.bezierCurveTo(4, 14, 8, 10, 8, 6);
    context.bezierCurveTo(8, 0, 0, 0, 0, 6);
    context.closePath();
    context.fillStyle = fill;
    context.fill();
    context.restore();
  }

  function animate() {
    context.clearRect(0, 0, width, height);

    particles.forEach((particle) => {
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      if (particle.y > height + 18) {
        particle.y = -18;
      }
      if (particle.x < -18) {
        particle.x = width + 18;
      } else if (particle.x > width + 18) {
        particle.x = -18;
      }
      drawHeart(particle.x, particle.y, particle.size, `${particle.hue} ${particle.opacity})`);
    });

    window.requestAnimationFrame(animate);
  }

  resize();
  const count = Math.min(36, Math.max(18, Math.floor(window.innerWidth / 36)));
  for (let index = 0; index < count; index += 1) {
    particles.push(createParticle());
  }
  animate();
  window.addEventListener("resize", resize);
}

function init() {
  applyContent();
  renderStoryCards();
  renderGallery();
  renderVideos();
  setupScrollButtons();
  setupRevealObserver();
  setupMusicButton();
  setupBurstButton();
  setupCanvas();
  tryAutoplay();
}

init();

