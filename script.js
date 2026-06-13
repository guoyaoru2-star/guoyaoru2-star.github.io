const powerGate = document.querySelector("[data-power-gate]");
const powerStart = document.querySelector("[data-power-start]");
const signalGate = document.querySelector("[data-signal-gate]");
const screen = document.querySelector("[data-screen]");
const pages = Array.from(document.querySelectorAll("[data-channel]"));
const navButtons = Array.from(document.querySelectorAll("[data-target]"));
const channelLabel = document.querySelector("[data-channel-label]");
const dialNumber = document.querySelector("[data-dial-number]");
const nextChannel = document.querySelector("[data-next-channel]");
const volumeDial = document.querySelector("[data-volume-dial]");
const volumeLevel = document.querySelector("[data-volume-level]");
const clock = document.querySelector("[data-clock]");
const modal = document.querySelector("[data-wechat-modal]");
const openWechat = document.querySelector("[data-open-wechat]");
const closeWechat = document.querySelectorAll("[data-close-wechat]");
const interviewModal = document.querySelector("[data-interview-modal]");
const closeInterview = document.querySelectorAll("[data-close-interview]");
const startTour = document.querySelector("[data-start-tour]");
const tourCard = document.querySelector("[data-tour-card]");
const tourStep = document.querySelector("[data-tour-step]");
const tourTitle = document.querySelector("[data-tour-title]");
const tourText = document.querySelector("[data-tour-text]");
const tuningItems = Array.from(document.querySelectorAll("[data-tune-step]"));
const nextTuning = document.querySelector("[data-next-tuning]");
const tuningNeedle = document.querySelector("[data-tuning-needle]");
const tuningCopy = document.querySelector("[data-tuning-copy]");
const tourProgress = document.querySelector("[data-tour-progress]");
const tourCountdown = document.querySelector("[data-tour-countdown]");
const projectDeck = document.querySelector("[data-project-deck]");
const projectButtons = Array.from(document.querySelectorAll("[data-project]"));
const closeProject = document.querySelectorAll("[data-close-project]");
const projectCode = document.querySelector("[data-project-code]");
const projectRole = document.querySelector("[data-project-role]");
const projectTitle = document.querySelector("[data-project-title]");
const projectSummary = document.querySelector("[data-project-summary]");
const projectFacts = document.querySelector("[data-project-facts]");
const projectResult = document.querySelector("[data-project-result]");

const channelNames = {
  home: "CH 01 / 首页",
  profile: "CH 02 / 档案",
  learning: "CH 03 / 学习路径",
  projects: "CH 04 / 作品",
  resume: "CH 05 / 简历",
  contact: "CH 06 / 联系",
};

let currentIndex = 0;
let switching = false;
let volume = 2;
let tuningIndex = 0;
let tourTimer = 0;
let countdownTimer = 0;

const dialAngles = [-34, -10, 14, 38, 62, 86];
const tourSteps = [
  {
    channel: "home",
    step: "01 / 我是谁",
    title: "AI 训练师 / 多模态训练 / 模型评测",
    text: "从工程现场到多模态数据训练，持续把行业经验变成可靠交付。",
  },
  {
    channel: "profile",
    step: "02 / 我强在哪",
    title: "行业知识 + 数据质量管理",
    text: "熟悉规则校准、质检复盘、Badcase 分析和数据验收。",
  },
  {
    channel: "resume",
    step: "03 / 我做过什么",
    title: "4万 CoT / 12万图像 / 5.6万视频评测",
    text: "参与文本、图像、视频多模态数据项目，用量化成果证明交付能力。",
  },
  {
    channel: "projects",
    step: "04 / 我的项目",
    title: "CoT / 图像识别 / 图生视频评测",
    text: "从训练数据生产、质量管理到模型评测，覆盖完整数据链路。",
  },
  {
    channel: "contact",
    step: "05 / 保持联系",
    title: "已离职 / 周内到岗",
    text: "电话、邮箱、GitHub 和微信均可联系，完整简历可直接下载。",
  },
];

const projectData = {
  cot: {
    code: "VHS / 001 · COT",
    role: "标注专员 / 2025.06 - 2025.10",
    title: "智能楼宇全域设备故障诊断",
    summary: "将真实工程排障经验转化为结构清晰、逻辑可靠的 CoT 思维链训练数据。",
    facts: ["修订故障现象、原因分析与排查路径", "整理设备混淆、推理跳步与安全提醒缺失", "建设 Badcase 案例库并反馈规则优化"],
    result: "5 万条候选样本 · 4 万条高质量数据 · 验收准确率 98%+ · 高风险提醒漏标率 0",
  },
  vision: {
    code: "VHS / 002 · VISION",
    role: "项目助理 / 2025.11 - 2026.02",
    title: "多模态图像识别",
    summary: "协调任务、跟踪进度并管理质量问题，让大规模图像训练数据稳定交付。",
    facts: ["跟踪标注量、质检量、返修量与完成率", "整理主体识别、场景分类与空间关系争议样本", "推动质量复盘、问题闭环和规则迭代"],
    result: "15 万张候选图片 · 12 万张有效训练数据 · 项目验收准确率 97%+",
  },
  video: {
    code: "VHS / 003 · VIDEO",
    role: "AI 训练师 / 2026.03 - 至今",
    title: "图生视频模型评测与业务选型",
    summary: "建立统一评测维度，分析典型 Badcase，支持候选模型横向对比与业务选型。",
    facts: ["评测清晰度、主体稳定性与 Prompt 一致性", "识别主体漂移、人脸崩坏、Logo 变形等问题", "统计模型问题分布、业务可用率并形成选型依据"],
    result: "7000 张图片 · 4 个候选模型 · 5.6 万条视频结果 · 评测一致性 95%+",
  },
};

const tuningCopies = [
  "信号稳定：纪律、责任感与稳定执行力",
  "信号增强：设备系统、故障链路与业务理解",
  "信号转码：CoT、图像识别与图生视频多模态训练",
  "信号输出：规则校准、Badcase 分析与模型评测",
];

const turnDial = (dial, position) => {
  if (!dial) return;
  const angle = dialAngles[position] ?? 0;
  dial.dataset.pos = String(position + 1);
  dial.style.setProperty("--dial-label-rotate", `${-angle}deg`);
  dial.classList.remove("is-turning");
  void dial.offsetWidth;
  dial.classList.add("is-turning");
  window.setTimeout(() => dial.classList.remove("is-turning"), 280);
};

const setClock = () => {
  if (!clock) return;
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  const ss = String(now.getSeconds()).padStart(2, "0");
  clock.textContent = `${hh}:${mm}:${ss}`;
};

setClock();
window.setInterval(setClock, 1000);

const switchChannel = (target, force = false) => {
  const index = pages.findIndex((page) => page.dataset.channel === target);
  if (index < 0 || (index === currentIndex && !force) || switching) return;

  switching = true;
  screen?.classList.add("switching");
  const channelFlash = document.createElement("strong");
  channelFlash.className = "channel-flash";
  channelFlash.textContent = `CH ${String(index + 1).padStart(2, "0")}`;
  screen?.append(channelFlash);
  window.setTimeout(() => channelFlash.remove(), 520);

  window.setTimeout(() => {
    pages.forEach((page) => page.classList.toggle("active", page.dataset.channel === target));
    navButtons.forEach((button) => button.classList.toggle("active", button.dataset.target === target));
    currentIndex = index;
    if (channelLabel) channelLabel.textContent = channelNames[target];
    if (dialNumber) dialNumber.textContent = String(index + 1).padStart(2, "0");
    turnDial(nextChannel, index);
  }, 155);

  window.setTimeout(() => {
    screen?.classList.remove("switching");
    switching = false;
  }, 380);
};

const updateTuning = (index) => {
  if (!tuningItems.length) return;
  tuningIndex = index % tuningItems.length;
  tuningItems.forEach((item, itemIndex) => item.classList.toggle("active", itemIndex === tuningIndex));
  if (tuningNeedle) tuningNeedle.style.setProperty("--tune-position", `${8 + tuningIndex * 28}%`);
  if (tuningCopy) tuningCopy.textContent = tuningCopies[tuningIndex];
};

navButtons.forEach((button) => {
  button.addEventListener("click", () => switchChannel(button.dataset.target));
});

if (nextChannel) {
  nextChannel.addEventListener("click", () => {
    const next = pages[(currentIndex + 1) % pages.length].dataset.channel;
    switchChannel(next);
  });
}

if (volumeDial) {
  if (volumeLevel) volumeLevel.textContent = String(volume + 1).padStart(2, "0");
  turnDial(volumeDial, volume);
  volumeDial.addEventListener("click", () => {
    volume = (volume + 1) % 4;
    if (volumeLevel) volumeLevel.textContent = String(volume + 1).padStart(2, "0");
    turnDial(volumeDial, volume);
    screen?.animate(
      [
        { filter: "brightness(1)" },
        { filter: `brightness(${1.08 + volume * 0.04})` },
        { filter: "brightness(1)" },
      ],
      { duration: 260, easing: "ease-out" }
    );
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "i" || event.key === "I") {
    toggleInterview(true);
    return;
  }
  if (modal?.classList.contains("is-open") || interviewModal?.classList.contains("is-open")) return;
  const numeric = Number(event.key);
  if (numeric >= 1 && numeric <= pages.length) {
    switchChannel(pages[numeric - 1].dataset.channel);
  }
  if (event.key === "ArrowRight" || event.key === "ArrowDown") {
    switchChannel(pages[(currentIndex + 1) % pages.length].dataset.channel);
  }
  if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
    switchChannel(pages[(currentIndex - 1 + pages.length) % pages.length].dataset.channel);
  }
});

if (nextTuning) {
  nextTuning.addEventListener("click", () => updateTuning(tuningIndex + 1));
}

if (startTour) {
  startTour.addEventListener("click", () => {
    window.clearInterval(tourTimer);
    window.clearInterval(countdownTimer);
    let index = 0;
    let seconds = 60;
    const showStep = () => {
      const step = tourSteps[index];
      switchChannel(step.channel, index === 0);
      if (tourStep) tourStep.textContent = step.step;
      if (tourTitle) tourTitle.textContent = step.title;
      if (tourText) tourText.textContent = step.text;
      tourCard?.classList.add("is-open");
      if (tourProgress) tourProgress.style.width = `${((index + 1) / tourSteps.length) * 100}%`;
      index += 1;
      if (index >= tourSteps.length) {
        window.clearInterval(tourTimer);
        window.setTimeout(() => {
          tourCard?.classList.remove("is-open");
          window.clearInterval(countdownTimer);
          if (tourCountdown) tourCountdown.textContent = "00 SEC";
        }, 12000);
      }
    };
    showStep();
    tourTimer = window.setInterval(showStep, 12000);
    if (tourCountdown) tourCountdown.textContent = `${seconds} SEC`;
    countdownTimer = window.setInterval(() => {
      seconds -= 1;
      if (tourCountdown) tourCountdown.textContent = `${Math.max(0, seconds)} SEC`;
    }, 1000);
  });
}

const openProject = (key) => {
  const project = projectData[key];
  if (!project || !projectDeck) return;
  projectCode.textContent = project.code;
  projectRole.textContent = project.role;
  projectTitle.textContent = project.title;
  projectSummary.textContent = project.summary;
  projectFacts.innerHTML = project.facts.map((fact, index) => `<span>${String(index + 1).padStart(2, "0")} / ${fact}</span>`).join("");
  projectResult.textContent = project.result;
  projectDeck.classList.add("is-open");
  projectDeck.setAttribute("aria-hidden", "false");
};

const closeProjectDeck = () => {
  projectDeck?.classList.remove("is-open");
  projectDeck?.setAttribute("aria-hidden", "true");
};

projectButtons.forEach((button) => button.addEventListener("click", () => openProject(button.dataset.project)));
closeProject.forEach((button) => button.addEventListener("click", closeProjectDeck));

if (powerStart) {
  powerStart.addEventListener("click", () => {
    powerGate?.classList.add("gone");
    signalGate?.classList.add("active");
    window.setTimeout(() => signalGate?.classList.remove("active"), 920);
    window.setTimeout(() => switchChannel("home", true), 360);
  });
}

if (new URLSearchParams(window.location.search).has("preview")) {
  powerGate?.classList.add("gone");
}

const toggleWechat = (show) => {
  if (!modal) return;
  modal.classList.toggle("is-open", show);
  modal.setAttribute("aria-hidden", String(!show));
};

const toggleInterview = (show) => {
  if (!interviewModal) return;
  interviewModal.classList.toggle("is-open", show);
  interviewModal.setAttribute("aria-hidden", String(!show));
};

if (openWechat) {
  openWechat.addEventListener("click", () => toggleWechat(true));
}

closeWechat.forEach((button) => {
  button.addEventListener("click", () => toggleWechat(false));
});

closeInterview.forEach((button) => {
  button.addEventListener("click", () => toggleInterview(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    toggleWechat(false);
    toggleInterview(false);
    tourCard?.classList.remove("is-open");
    closeProjectDeck();
    window.clearInterval(tourTimer);
    window.clearInterval(countdownTimer);
  }
});

updateTuning(0);
