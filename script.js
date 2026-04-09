const projects = [
  {
    id: "weather",
    title: "Tela de Clima",
    tag: "SwiftUI",
    categories: ["SwiftUI"],
    shortDescription: "Interface com alternância dia/noite e foco em composição visual no SwiftUI.",
    fullDescription:
      "Aplicação desenvolvida em SwiftUI com foco em arquitetura de interface declarativa, componentização e consistência visual. O projeto implementa alternância dinâmica entre modos diurno e noturno, ajustando cores, ícones e contraste de forma contextual para melhorar usabilidade. Também foram aplicados princípios de hierarquia visual, espaçamento e reutilização de componentes para aproximar a experiência de padrões profissionais do ecossistema iOS.",
    image: "Images/WEATHER_CODE.jpeg",
    mediaType: "video",
    media: "Images/WEATHERVIDEO.mp4",
    repo: "https://github.com/Gustavoggomesdev/WeatherApp"
  },
  {
    id: "search-system",
    title: "Sistema de Pesquisa de Subpastas",
    tag: "Flask + MySQL",
    categories: ["Flask", "Python"],
    shortDescription: "Busca rápida em milhões de registros para uso diário em ambiente corporativo.",
    fullDescription:
      "Solução web corporativa construída com Flask e MySQL para consulta de subpastas em ambientes com grande volume de dados. O sistema foi estruturado para atender buscas por termos completos e parciais com baixa latência, mesmo em bases extensas. Inclui rotina automatizada em Python para varredura e indexação periódica de diretórios, garantindo atualização contínua da base e maior confiabilidade operacional para uso diário das equipes.",
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
    fullDescription:
      "Protótipo de produto digital idealizado para monitoramento de saúde emocional, concebido com foco em experiência do usuário e clareza de navegação. A solução permite registrar estado emocional e contexto, acompanhar histórico semanal e mensal e identificar padrões de comportamento. A proposta inclui fluxo de compartilhamento com profissionais de psicologia para suporte especializado e possibilidade de agendamento de atendimento, conectando acompanhamento pessoal e cuidado clínico.",
    image: "Images/Mindflow.PNG",
    mediaType: "video",
    media: "Images/MINDFLOWVIDEO.mp4",
    repo: null
  },
  {
    id: "automation",
    title: "Automações em Python",
    tag: "Python",
    categories: ["Python"],
    shortDescription: "Rotinas automatizadas para reduzir tarefas repetitivas e elevar produtividade.",
    fullDescription:
      "Conjunto de automações voltadas para eficiência operacional, desenvolvido principalmente com Python e Shell Script. Entre as entregas estão conversão de documentos para PDF pesquisável, indexação de estruturas de diretórios e integração com rotinas corporativas recorrentes. O objetivo central foi reduzir tarefas manuais, padronizar processos e aumentar produtividade com soluções robustas, reaproveitáveis e de fácil manutenção.",
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
    shortDescription: "Clone visual com grid responsivo e componentes reutilizáveis.",
    fullDescription:
      "Interface inspirada no Spotify desenvolvida em SwiftUI com foco em fidelidade visual, organização de layout e escalabilidade de componentes. O projeto explora LazyVGrid para composição responsiva de conteúdo, além de padrões de navegação fluida e hierarquia visual consistente. Foi utilizado como laboratório prático para evolução em design declarativo, refinamento de microinterações e construção de UI com padrão de produto real.",
    image: "Images/spotify_img.PNG",
    mediaType: "video",
    media: "Images/spotify_video.mp4",
    repo: "https://github.com/Gustavoggomesdev/learningSwiftUI/blob/main/SpotifyView.swift"
  }
];

const typingText = "Olá, eu sou Gustavo";
let typingIndex = 0;
let activeFilter = "all";

const carouselIndicators = [
  {
    containerSelector: ".highlights-strip .row",
    dotsSelector: "#highlightsDots"
  },
  {
    containerSelector: "#projectsGrid",
    dotsSelector: "#projectsDots"
  }
];

function getCarouselCards(container) {
  return Array.from(container.children).filter((child) => child.offsetWidth > 0);
}

function getCenteredCardIndex(container, cards) {
  const containerCenter = container.scrollLeft + container.clientWidth / 2;
  let closestIndex = 0;
  let closestDistance = Number.POSITIVE_INFINITY;

  cards.forEach((card, index) => {
    const cardCenter = card.offsetLeft + card.offsetWidth / 2;
    const distance = Math.abs(cardCenter - containerCenter);

    if (distance < closestDistance) {
      closestDistance = distance;
      closestIndex = index;
    }
  });

  return closestIndex;
}

function centerCard(container, card) {
  const targetLeft = card.offsetLeft - (container.clientWidth - card.offsetWidth) / 2;
  const maxScrollLeft = Math.max(0, container.scrollWidth - container.clientWidth);
  const clampedLeft = Math.max(0, Math.min(targetLeft, maxScrollLeft));

  container.scrollTo({ left: clampedLeft, behavior: "smooth" });
}

function updateCarouselIndicators() {
  carouselIndicators.forEach((config) => {
    const container = document.querySelector(config.containerSelector);
    const dotsContainer = document.querySelector(config.dotsSelector);

    if (!container || !dotsContainer) return;

    const cards = getCarouselCards(container);
    const currentCount = String(cards.length);

    if (dotsContainer.dataset.count !== currentCount) {
      dotsContainer.dataset.count = currentCount;
      dotsContainer.innerHTML = "";

      cards.forEach((card, index) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "carousel-dot";
        dot.setAttribute("aria-label", `Card ${index + 1} de ${cards.length}`);
        dot.addEventListener("click", () => centerCard(container, card));
        dotsContainer.appendChild(dot);
      });
    }

    const dots = Array.from(dotsContainer.children);
    if (!dots.length) return;

    const activeIndex = getCenteredCardIndex(container, cards);
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === activeIndex);
    });
  });
}

function renderProjects() {
  const grid = document.getElementById("projectsGrid");
  if (!grid) return;

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === "all") return true;
    return project.categories.includes(activeFilter);
  });

  const cards = filteredProjects
    .map(
      (project) => `
        <div class="col-md-6 col-xl-4" data-aos="fade-up">
          <article class="card project-card h-100">
            <div class="project-media">
              <img src="${project.image}" alt="Projeto ${project.title}" loading="lazy" />
            </div>
            <div class="card-body d-flex flex-column">
              <span class="project-tag">${project.tag}</span>
              <h3 class="h5">${project.title}</h3>
              <p class="mb-3">${project.shortDescription}</p>
              <button class="btn project-cta mt-auto js-open-project" data-project-id="${project.id}" type="button">
                Ver detalhes
                <i class="bi bi-arrow-up-right ms-2"></i>
              </button>
            </div>
          </article>
        </div>
      `
    )
    .join("");

  grid.innerHTML = cards || '<div class="col-12"><p class="text-center text-secondary mb-0">Nenhum projeto encontrado para este filtro.</p></div>';

  if (window.AOS) {
    AOS.refreshHard();
  }

  updateCarouselIndicators();
}

function openProjectModal(projectId) {
  const project = projects.find((item) => item.id === projectId);
  if (!project) return;

  const modalElement = document.getElementById("projectModal");
  const titleElement = document.getElementById("projectModalLabel");
  const textElement = document.getElementById("projectModalText");
  const mediaElement = document.getElementById("projectModalMedia");
  const linkElement = document.getElementById("projectModalLink");

  titleElement.textContent = project.title;
  textElement.textContent = project.fullDescription;

  if (project.mediaType === "video") {
    mediaElement.innerHTML = `
      <video class="project-modal-media" controls autoplay muted loop playsinline>
        <source src="${project.media}" type="video/mp4" />
        Seu navegador não suporta vídeo.
      </video>
    `;
  } else {
    mediaElement.innerHTML = `<img class="project-modal-media" src="${project.media}" alt="Mídia do projeto ${project.title}" loading="lazy" />`;
  }

  if (project.repo) {
    linkElement.href = project.repo;
    linkElement.classList.remove("d-none");
  } else {
    linkElement.classList.add("d-none");
  }

  const modalInstance = bootstrap.Modal.getOrCreateInstance(modalElement);
  modalInstance.show();
}

function setupProjectEvents() {
  const grid = document.getElementById("projectsGrid");
  if (!grid) return;

  grid.addEventListener("click", (event) => {
    const button = event.target.closest(".js-open-project");
    if (!button) return;
    openProjectModal(button.dataset.projectId);
  });
}

function setupProjectFilters() {
  const filterButtons = document.querySelectorAll(".btn-filter");
  if (!filterButtons.length) return;

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.filter;

      filterButtons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");

      renderProjects();
    });
  });
}

function setupCarouselIndicators() {
  const refreshIndicators = () => updateCarouselIndicators();

  carouselIndicators.forEach((config) => {
    const container = document.querySelector(config.containerSelector);
    if (!container || container.dataset.indicatorBound === "true") return;

    container.dataset.indicatorBound = "true";
    container.addEventListener(
      "scroll",
      () => {
        window.requestAnimationFrame(refreshIndicators);
      },
      { passive: true }
    );
  });

  window.addEventListener("resize", refreshIndicators);
  refreshIndicators();
}

function setupInteractiveMotion() {
  const finePointer = window.matchMedia("(pointer: fine)");
  if (!finePointer.matches) return;

  const tiltTargets = document.querySelectorAll(
    ".project-card, .highlight-card, .skill-card, .about-card:not(.experience-card), .hero-panel"
  );

  tiltTargets.forEach((element) => {
    let frameId = null;

    const resetTransform = () => {
      element.style.transform = "";
      element.style.setProperty("--tilt-x", "0deg");
      element.style.setProperty("--tilt-y", "0deg");
    };

    element.addEventListener("pointermove", (event) => {
      const bounds = element.getBoundingClientRect();
      const centerX = bounds.left + bounds.width / 2;
      const centerY = bounds.top + bounds.height / 2;
      const offsetX = (event.clientX - centerX) / bounds.width;
      const offsetY = (event.clientY - centerY) / bounds.height;
      const rotateY = Math.max(-7, Math.min(7, offsetX * 14));
      const rotateX = Math.max(-7, Math.min(7, offsetY * -14));

      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }

      frameId = window.requestAnimationFrame(() => {
        element.style.transform = `translateY(-4px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });
    });

    element.addEventListener("pointerleave", resetTransform);
    element.addEventListener("blur", resetTransform);
  });

  const hero = document.querySelector(".hero-section");
  const leftGlow = document.querySelector(".hero-glow-left");
  const rightGlow = document.querySelector(".hero-glow-right");

  if (hero && leftGlow && rightGlow) {
    hero.addEventListener("pointermove", (event) => {
      const bounds = hero.getBoundingClientRect();
      const pointerX = (event.clientX - bounds.left) / bounds.width - 0.5;
      const pointerY = (event.clientY - bounds.top) / bounds.height - 0.5;

      leftGlow.style.transform = `translate3d(${pointerX * 26}px, ${pointerY * 18}px, 0) scale(1.04)`;
      rightGlow.style.transform = `translate3d(${-pointerX * 26}px, ${-pointerY * 18}px, 0) scale(1.04)`;
    });

    hero.addEventListener("pointerleave", () => {
      leftGlow.style.transform = "";
      rightGlow.style.transform = "";
    });
  }
}

function runTypingEffect() {
  const target = document.getElementById("digitando");
  if (!target) return;

  target.textContent = "";

  const interval = setInterval(() => {
    target.textContent += typingText.charAt(typingIndex);
    typingIndex += 1;

    if (typingIndex >= typingText.length) {
      clearInterval(interval);
    }
  }, 60);
}

function setupNavbarScrollEffect() {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  const updateNavbar = () => {
    if (window.scrollY > 30) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };

  updateNavbar();
  window.addEventListener("scroll", updateNavbar);
}

function setupLoader() {
  const loader = document.getElementById("loading");
  const video = document.querySelector(".hero-bg-video");
  if (!loader || !video) return;

  const hideLoader = () => {
    loader.style.opacity = "0";
    setTimeout(() => {
      loader.style.display = "none";
    }, 400);
  };

  if (video.readyState >= 3) {
    hideLoader();
  } else {
    video.addEventListener("canplaythrough", hideLoader, { once: true });
    video.addEventListener("error", hideLoader, { once: true });
    setTimeout(hideLoader, 4500);
  }
}

function setupNavbarCollapseOnClick() {
  const nav = document.getElementById("mainNav");
  if (!nav) return;

  nav.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      const collapse = bootstrap.Collapse.getInstance(nav);
      if (collapse) {
        collapse.hide();
      }
    });
  });
}

function setCurrentYear() {
  const year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  setupProjectEvents();
  setupProjectFilters();
  setupCarouselIndicators();
  setupInteractiveMotion();
  runTypingEffect();
  setupNavbarScrollEffect();
  setupLoader();
  setupNavbarCollapseOnClick();
  setCurrentYear();

  AOS.init({
    once: true,
    duration: 700,
    easing: "ease-out-cubic"
  });
});
