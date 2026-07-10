// =========================
// UMA HISTÓRIA ESCRITA POR DEUS
// script.js
// =========================

const envelope = document.getElementById("openEnvelope");
const intro = document.getElementById("intro");
const story = document.getElementById("story");
const pages = document.querySelectorAll(".page");
const nextButtons = document.querySelectorAll(".next");
const yesButton = document.getElementById("yes");
let currentPage = 0;
let isStoryActive = false; // Bloqueia o teclado até a carta abrir

// =========================
// ABRIR ENVELOPE
// =========================
envelope.addEventListener("click", () => {
    if (envelope.classList.contains("open")) return; // Evita cliques duplos
    
    envelope.classList.add("open");

    setTimeout(() => {
        intro.classList.add("hidden");
        story.classList.remove("hidden");
        isStoryActive = true; // Libera a navegação por teclado
    }, 1200);
});

// =========================
// PRÓXIMA PÁGINA
// =========================
nextButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (currentPage < pages.length - 1) {
            pages[currentPage].classList.remove("active");
            currentPage++;
            pages[currentPage].classList.add("active");
        }
    });
});

// =========================
// BOTÃO FINAL (ACEITAR)
// =========================
yesButton.addEventListener("click", () => {
    if (currentPage < pages.length - 1) {
        pages[currentPage].classList.remove("active");
        currentPage++;
        pages[currentPage].classList.add("active");
        criarConfetes();
    }
});

// =========================
// PARTÍCULAS DE FUNDO
// =========================
const particles = document.getElementById("particles");
if (particles) {
    for (let i = 0; i < 35; i++) {
        const p = document.createElement("div");
        p.classList.add("particle");
        p.style.left = Math.random() * 100 + "vw";
        p.style.animationDuration = (6 + Math.random() * 6) + "s";
        p.style.animationDelay = Math.random() * 5 + "s";
        particles.appendChild(p);
    }
}

// =========================
// CONFETES (EFEITO VITÓRIA)
// =========================
function criarConfetes() {
    for (let i = 0; i < 140; i++) {
        const confete = document.createElement("div");
        confete.classList.add("confete");
        confete.style.left = Math.random() * 100 + "vw";
        confete.style.background = corAleatoria();
        confete.style.animationDuration = (2 + Math.random() * 2) + "s";
        document.body.appendChild(confete);

        setTimeout(() => {
            confete.remove();
        }, 4000);
    }
}

function corAleatoria() {
    const cores = ["#D4AF37", "#F5E6A1", "#ffffff", "#C49B3D"];
    return cores[Math.floor(Math.random() * cores.length)];
}

// =========================
// TECLADO (APENAS COM A CARTA ABERTA)
// =========================
document.addEventListener("keydown", (e) => {
    if (!isStoryActive) return; // Ignora se o envelope estiver fechado

    // Avançar (Seta Direita), bloqueia avançar na página de Aceitar/Obrigada sem clicar
    if (e.key === "ArrowRight") {
        if (currentPage < pages.length - 2) { 
            pages[currentPage].classList.remove("active");
            currentPage++;
            pages[currentPage].classList.add("active");
        }
    }

    // Voltar (Seta Esquerda)
    if (e.key === "ArrowLeft") {
        if (currentPage > 0 && currentPage < pages.length - 1) { // Não volta da página de obrigado
            pages[currentPage].classList.remove("active");
            currentPage--;
            pages[currentPage].classList.add("active");
        }
    }
});
