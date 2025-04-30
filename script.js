
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

