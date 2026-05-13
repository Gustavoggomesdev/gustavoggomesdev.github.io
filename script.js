/* =========================================
   PORTFOLIO — GUSTAVO GOMES
   Redesigned script
   ========================================= */

// ─── DATA ───────────────────────────────
const projects = [
  {
    id: "weather",
    title: "Weather App",
    tag: "SwiftUI",
    categories: ["SwiftUI"],
    shortDescription: "Interface com alternância dia/noite e foco em composição visual declarativa.",
    fullDescription: "Aplicação desenvolvida em SwiftUI com foco em arquitetura de interface declarativa, componentização e consistência visual. Implementa alternância dinâmica entre modos diurno e noturno, ajustando cores, ícones e contraste de forma contextual. Aplicados princípios de hierarquia visual, espaçamento e reutilização de componentes para aproximar a experiência de padrões profissionais do ecossistema iOS.",
    image: "Images/WEATHER_CODE.jpeg",
    mediaType: "video",
    media: "Images/WEATHERVIDEO.mp4",
    repo: "https://github.com/Gustavoggomesdev/WeatherApp"
  },
  {
    id: "search-system",
    title: "Sistema de Pesquisa",
    tag: "Flask + MySQL",
    categories: ["Flask", "Python"],
    shortDescription: "Busca rápida em milhões de registros para uso corporativo diário.",
    fullDescription: "Solução web corporativa construída com Flask e MySQL para consulta de subpastas em ambientes com grande volume de dados. Estruturado para atender buscas por termos completos e parciais com baixa latência. Inclui rotina automatizada em Python para varredura e indexação periódica de diretórios, garantindo atualização contínua da base.",
    image: "Images/pesquisa_pro.PNG",
    mediaType: "image",
    media: "Images/pesquisa_pro.PNG",
    repo: "https://github.com/Gustavoggomesdev/Docseach"
  },
  {
    id: "mindflow",
    title: "MindFlow",
    tag: "UX/UI + Figma",
    categories: ["UX/UI"],
    shortDescription: "Protótipo para monitoramento de humor com histórico e apoio clínico.",
    fullDescription: "Protótipo de produto digital para monitoramento de saúde emocional, concebido com foco em UX e clareza de navegação. Permite registrar estado emocional, acompanhar histórico semanal e identificar padrões. Inclui fluxo de compartilhamento com profissionais e agendamento de atendimento.",
    image: "Images/Mindflow.PNG",
    mediaType: "video",
    media: "Images/MINDFLOWVIDEO.mp4",
    repo: null
  },
  {
    id: "automation",
    title: "Automações Python",
    tag: "Python",
    categories: ["Python"],
    shortDescription: "Rotinas automatizadas para reduzir tarefas repetitivas e elevar produtividade.",
    fullDescription: "Conjunto de automações voltadas para eficiência operacional, desenvolvido com Python e Shell Script. Entre as entregas: conversão de documentos para PDF pesquisável, indexação de diretórios e integração com rotinas corporativas. Objetivo: reduzir tarefas manuais e padronizar processos.",
    image: "Images/automation.PNG",
    mediaType: "image",
    media: "Images/automation.PNG",
    repo: null
  },
  {
    id: "spotify-clone",
    title: "Spotify Clone",
    tag: "SwiftUI",
    categories: ["SwiftUI"],
    shortDescription: "Clone visual com LazyVGrid, componentes reutilizáveis e navegação fluida.",
    fullDescription: "Interface inspirada no Spotify desenvolvida em SwiftUI. Explora LazyVGrid para composição responsiva, padrões de navegação fluida e hierarquia visual consistente. Laboratório prático para evolução em design declarativo e construção de UI com padrão de produto real.",
    image: "Images/spotify_img.PNG",
    mediaType: "video",
    media: "Images/spotify_video.mp4",
    repo: "https://github.com/Gustavoggomesdev/learningSwiftUI/blob/main/SpotifyView.swift"
  }
];

const roles = [
  "iOS Developer",
  "Software Engineer",
  "UX-driven Builder",
  "Python Developer"
];

// ─── STATE ──────────────────────────────
let activeFilter = "all";
let typingRoleIndex = 0;
let typingCharIndex = 0;
let typingDeleting = false;
let typingTimeout = null;

// ─── LOADER ─────────────────────────────
function initLoader() {
  const loader = document.getElementById("loader");
  if (!loader) return;
  window.addEventListener("load", () => {
    setTimeout(() => {
      loader.classList.add("hidden");
    }, 800);
  });
  setTimeout(() => loader.classList.add("hidden"), 3500);
}

// ─── CANVAS GRID ────────────────────────
function initGrid() {
  const canvas = document.getElementById("grid-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawGrid();
  }

  function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const size = 60;
    ctx.strokeStyle = "rgba(0,200,255,0.04)";
    ctx.lineWidth = 1;

    for (let x = 0; x < canvas.width; x += size) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += size) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
  }

  window.addEventListener("resize", resize);
  resize();
}

// ─── CURSOR ─────────────────────────────
function initCursor() {
  const cursor = document.getElementById("cursor");
  const follower = document.getElementById("cursor-follower");
  if (!cursor || !follower) return;

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener("mousemove", e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + "px";
    cursor.style.top = mouseY + "px";
  });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.left = followerX + "px";
    follower.style.top = followerY + "px";
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  document.querySelectorAll("a, button, .project-row, .contact-card").forEach(el => {
    el.addEventListener("mouseenter", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(2)";
      follower.style.transform = "translate(-50%, -50%) scale(1.5)";
      follower.style.opacity = "0.3";
    });
    el.addEventListener("mouseleave", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1)";
      follower.style.transform = "translate(-50%, -50%) scale(1)";
      follower.style.opacity = "0.5";
    });
  });
}

// ─── NAVBAR ─────────────────────────────
function initNavbar() {
  const navbar = document.getElementById("navbar");
  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  if (!navbar) return;

  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  });

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      menuBtn.classList.toggle("open");
      mobileMenu.classList.toggle("open");
    });

    mobileMenu.querySelectorAll(".mobile-link").forEach(link => {
      link.addEventListener("click", () => {
        menuBtn.classList.remove("open");
        mobileMenu.classList.remove("open");
      });
    });
  }
}

// ─── TYPING EFFECT ──────────────────────
function initTyping() {
  const el = document.getElementById("typed-role");
  if (!el) return;

  function type() {
    const currentRole = roles[typingRoleIndex];

    if (!typingDeleting) {
      el.textContent = currentRole.slice(0, ++typingCharIndex);
      if (typingCharIndex === currentRole.length) {
        typingDeleting = true;
        typingTimeout = setTimeout(type, 1800);
        return;
      }
    } else {
      el.textContent = currentRole.slice(0, --typingCharIndex);
      if (typingCharIndex === 0) {
        typingDeleting = false;
        typingRoleIndex = (typingRoleIndex + 1) % roles.length;
      }
    }

    const speed = typingDeleting ? 50 : 90;
    typingTimeout = setTimeout(type, speed);
  }

  type();
}

// ─── COUNTER ANIMATION ──────────────────
function animateCounter(el) {
  const target = parseInt(el.dataset.count);
  const duration = 1200;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

// ─── REVEAL ANIMATIONS ──────────────────
function initReveal() {
  const els = document.querySelectorAll(".reveal-up");

  // Hero elements — animate on load
  setTimeout(() => {
    document.querySelectorAll("#hero .reveal-up").forEach((el, i) => {
      const delay = parseInt(el.dataset.delay || 0);
      setTimeout(() => el.classList.add("visible"), delay);
    });
  }, 900);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        // Counters
        entry.target.querySelectorAll(".stat-num").forEach(animateCounter);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll(".section .reveal-up, .hero-stats").forEach(el => observer.observe(el));
}

// ─── PROJECTS ───────────────────────────
function renderProjects() {
  const showcase = document.getElementById("projects-showcase");
  if (!showcase) return;

  const filtered = projects.filter(p =>
    activeFilter === "all" || p.categories.includes(activeFilter)
  );

  if (!filtered.length) {
    showcase.innerHTML = `<p style="text-align:center;color:var(--text-muted);padding:40px 0">Nenhum projeto encontrado.</p>`;
    return;
  }

  showcase.innerHTML = filtered.map((project, i) => {
    const isReverse = i % 2 !== 0;
    const mediaHtml = project.mediaType === "video"
      ? `<video src="${project.media}" muted loop playsinline preload="none" class="proj-video-el"></video>`
      : `<img src="${project.image}" alt="${project.title}" loading="lazy" />`;

    return `
      <div class="project-row${isReverse ? " reverse" : ""}" data-project-id="${project.id}">
        <div class="proj-media">
          ${mediaHtml}
          <div class="proj-media-overlay"></div>
          ${project.mediaType === "video" ? `<div class="proj-play-btn"><i class="bi bi-play-fill"></i></div>` : ""}
        </div>
        <div class="proj-info">
          <div class="proj-number">${String(i + 1).padStart(2, "0")}</div>
          <div class="proj-tag">${project.tag}</div>
          <h3 class="proj-title">${project.title}</h3>
          <p class="proj-desc">${project.shortDescription}</p>
          <div class="proj-actions">
            <button class="proj-btn-detail js-open-project" data-project-id="${project.id}">
              Ver detalhes <i class="bi bi-arrow-up-right"></i>
            </button>
            ${project.repo ? `<a href="${project.repo}" target="_blank" rel="noopener" class="proj-btn-repo"><i class="bi bi-github"></i> Repositório</a>` : ""}
          </div>
        </div>
      </div>
    `;
  }).join("");

  // Hover video play — add class to hide play button while playing
  showcase.querySelectorAll(".project-row").forEach(row => {
    const video = row.querySelector(".proj-video-el");
    if (video) {
      row.addEventListener("mouseenter", () => {
        video.play()
          .then(() => row.classList.add("video-playing"))
          .catch(() => {});
      });
      row.addEventListener("mouseleave", () => {
        row.classList.remove("video-playing");
        video.pause();
        video.currentTime = 0;
      });
    }
  });
}

function setupProjectEvents() {
  const showcase = document.getElementById("projects-showcase");
  if (!showcase) return;

  showcase.addEventListener("click", e => {
    const btn = e.target.closest(".js-open-project");
    if (!btn) return;
    openModal(btn.dataset.projectId);
  });
}

function setupFilters() {
  document.querySelectorAll(".pf-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      activeFilter = btn.dataset.filter;
      document.querySelectorAll(".pf-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderProjects();
    });
  });
}

// ─── MODAL ──────────────────────────────
function openModal(projectId) {
  const project = projects.find(p => p.id === projectId);
  if (!project) return;

  const overlay = document.getElementById("project-modal");
  document.getElementById("pmodal-tag").textContent = project.tag;
  document.getElementById("pmodal-title").textContent = project.title;
  document.getElementById("pmodal-desc").textContent = project.fullDescription;

  const media = document.getElementById("pmodal-media");
  if (project.mediaType === "video") {
    media.innerHTML = `<video src="${project.media}" controls autoplay muted loop playsinline></video>`;
  } else {
    media.innerHTML = `<img src="${project.media}" alt="${project.title}" />`;
  }

  const actions = document.getElementById("pmodal-actions");
  actions.innerHTML = project.repo
    ? `<a href="${project.repo}" target="_blank" rel="noopener" class="proj-btn-detail"><i class="bi bi-github"></i> Ver Repositório</a>`
    : "";

  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  const overlay = document.getElementById("project-modal");
  overlay.classList.remove("open");
  document.body.style.overflow = "";
  const media = document.getElementById("pmodal-media");
  const video = media.querySelector("video");
  if (video) { video.pause(); video.src = ""; }
}

function setupModal() {
  document.getElementById("pmodal-close")?.addEventListener("click", closeModal);
  document.getElementById("project-modal")?.addEventListener("click", e => {
    if (e.target.id === "project-modal") closeModal();
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeModal();
  });
}

// ─── YEAR ───────────────────────────────
function setYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
}

// ─── SECTION OBSERVER ───────────────────
function initSectionReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll(".skill-block, .exp-item, .contact-card, .about-photo-frame, .about-text-block, .about-lead, .about-body, .experience-timeline").forEach((el, i) => {
          setTimeout(() => {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          }, i * 80);
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".section").forEach(section => {
    section.querySelectorAll(".skill-block, .exp-item, .contact-card, .about-photo-frame, .about-text-block, .about-lead, .about-body, .experience-timeline").forEach(el => {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    });
    observer.observe(section);
  });

  // Project rows observer
  const projObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        projObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  const observeProjects = () => {
    document.querySelectorAll(".project-row").forEach((row, i) => {
      row.style.opacity = "0";
      row.style.transform = "translateY(30px)";
      row.style.transition = `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`;
      projObserver.observe(row);
    });
  };

  // Re-observe after filter
  const origRender = window._renderProjects;
  setTimeout(observeProjects, 100);

  return observeProjects;
}

// ─── INIT ────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  initLoader();
  initGrid();
  initCursor();
  initNavbar();
  initTyping();
  renderProjects();
  setupProjectEvents();
  setupFilters();
  setupModal();
  setYear();
  initReveal();

  const observeProjects = initSectionReveal();

  // Re-observe project rows after filter change
  document.querySelectorAll(".pf-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      setTimeout(observeProjects, 50);
    });
  });
});
