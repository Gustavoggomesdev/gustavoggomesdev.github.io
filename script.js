function toggleMenu() {
    document.getElementById("navLinks").classList.toggle("show");
  }
function abrirModal(id) {
    document.getElementById(id).style.display = "block";
}

function fecharModal(id) {
    document.getElementById(id).style.display = "none";
}

  // Fecha o modal se clicar fora do conteúdo
window.onclick = function(event) {
    const modais = document.querySelectorAll('.modal');
    modais.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
}