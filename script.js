const projects = [
  {
    id: "weather",
    title: "Tela de Clima",
    tag: "SwiftUI",
    categories: ["SwiftUI"],
    shortDescription: "Interface com alternância dia/noite e foco em composição visual no SwiftUI.",
    fullDescription:
      "Projeto desenvolvido em SwiftUI com troca dinâmica entre tema diurno e noturno. O objetivo principal foi praticar composição de interface, hierarquia visual e reutilização de componentes seguindo boas práticas de iOS.",
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
      "Aplicação web criada com Flask e MySQL para pesquisar subpastas em grandes servidores corporativos. Inclui processo de indexação automatizada em Python para manter a base atualizada e otimizada para buscas por termos completos e parciais.",
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
      "Protótipo acadêmico com foco em saúde emocional. O usuário registra sentimentos e motivos, visualiza histórico semanal/mensal e pode compartilhar informações com psicólogos para acompanhamento e agendamento de consultas.",
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
      "Conjunto de automações em Python e Shell para otimizar processos operacionais, incluindo transformação de PDF em PDF pesquisável, indexação de estruturas de diretórios e integração com fluxos corporativos.",
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
      "Interface inspirada no Spotify usando SwiftUI, explorando LazyVGrid, organização de componentes e consistência visual. Projeto voltado para evolução em design declarativo e experiência de navegação fluida.",
    image: "Images/spotify_img.PNG",
    mediaType: "video",
    media: "Images/spotify_video.mp4",
    repo: "https://github.com/Gustavoggomesdev/learningSwiftUI/blob/main/SpotifyView.swift"
  }
];

const typingText = "Olá, eu sou Gustavo";
let typingIndex = 0;
let isAudioPlaying = false;
let activeFilter = "all";

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

function setupAudioControl() {
  const audio = document.getElementById("bg-music");
  const playButton = document.getElementById("play-btn");
  if (!audio || !playButton) return;

  playButton.addEventListener("click", async () => {
    if (!isAudioPlaying) {
      try {
        await audio.play();
        playButton.innerHTML = '<i class="bi bi-pause-fill"></i>';
        isAudioPlaying = true;
      } catch (error) {
        playButton.innerHTML = '<i class="bi bi-play-fill"></i>';
      }
      return;
    }

    audio.pause();
    playButton.innerHTML = '<i class="bi bi-play-fill"></i>';
    isAudioPlaying = false;
  });
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
  runTypingEffect();
  setupAudioControl();
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
