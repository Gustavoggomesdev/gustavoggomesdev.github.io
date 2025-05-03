
function toggleMenu() {
  document.getElementById("navLinks").classList.toggle("show");
}

// Modal
function abrirModal(id) {
  document.getElementById(id).style.display = "block";
}

function fecharModal(id) {
  document.getElementById(id).style.display = "none";
}

window.onclick = function(event) {
  const modais = document.querySelectorAll('.modal');
  modais.forEach(modal => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
};

// Animações ao rolar (fade-in)
const animElements = document.querySelectorAll('.fade-in, .fade-in-up');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, {
  threshold: 0.1
});

animElements.forEach(el => observer.observe(el));

//Aqui tira o  player

let playing = false;

function toggleAudio() {
  const audio = document.getElementById("bg-music");
  const btn = document.getElementById("play-btn");

  if (!playing) {
    audio.play();
    btn.textContent = "❚❚"; // ícone de pausa
  } else {
    audio.pause();
    btn.textContent = "▶"; // ícone de play
  }

  playing = !playing;
}


window.addEventListener('scroll', function () {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});


// No script.js, adicione este código no início:

document.addEventListener('DOMContentLoaded', function() {
  const video = document.querySelector('.hero-bg-video');
  const loading = document.getElementById('loading');
  
  // Verifica se o vídeo já está carregado
  if (video.readyState >= 3) { // 3 = HAVE_FUTURE_DATA
    hideLoading();
  } else {
    video.addEventListener('canplaythrough', hideLoading);
    video.addEventListener('error', hideLoading); // Caso ocorra erro no carregamento
    
    // Timeout de fallback caso o evento não dispare
    setTimeout(hideLoading, 5000);
  }
  
  function hideLoading() {
    loading.style.opacity = '0';
    setTimeout(() => {
      loading.style.display = 'none';
    }, 500); // Tempo para a animação de fade out
  }
});
