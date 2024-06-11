import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  runTransaction,
  get,
  onValue,
} from "https://www.gstatic.com/firebasejs/10.12.1/firebase-database.js";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD_czM4CzjX8EqMdluGslbR13UfTIOOOys",
  authDomain: "arthur-schultz.firebaseapp.com",
  projectId: "arthur-schultz",
  storageBucket: "arthur-schultz.appspot.com",
  messagingSenderId: "273634896292",
  appId: "1:273634896292:web:0654cd33669194ded4b931",
  measurementId: "G-C5G4446HG9",
};

// Inicializando o Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Função para atualizar os contadores
async function updateCounts() {
  const countsRef = ref(db, "counts");
  const snapshot = await get(countsRef);
  const data = snapshot.val();
  document.getElementById("political-count").innerText = data.political || 0;
  document.getElementById("members-count").innerText = data.members || 0;
  document.getElementById("donations-count").innerText = data.donations || 0;
  document.getElementById("voters-count").innerText = data.voters || 0;
}

// Atualizar contadores ao carregar a página
updateCounts();

// Função para incrementar o contador
function incrementCounter(counter) {
  const counterRef = ref(db, `counts/${counter}`);
  runTransaction(counterRef, (currentValue) => {
    return (currentValue || 0) + 1;
  }).then(updateCounts);
}

// Manipuladores de eventos para os botões
document.getElementById("become-member").addEventListener("click", () => {
  incrementCounter("members");
});

document.getElementById("make-donation").addEventListener("click", () => {
  incrementCounter("donations");
});

document
  .getElementById("mark-political-speech")
  .addEventListener("click", () => {
    incrementCounter("political");
  });

document.getElementById("become-active-voter").addEventListener("click", () => {
  incrementCounter("voters");
});

// Redirecionar para área restrita
document.addEventListener("DOMContentLoaded", function () {
  const restritoButton = document.getElementById("restrito");
  restritoButton.addEventListener("click", function () {
    window.open("./area-admin/areaAdmin.html", "_blank");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const slidesDesktop = document.querySelectorAll(".slide.desktop");
  const slidesMobile = document.querySelectorAll(".slide.mobile");

  function replaceImages() {
      const windowWidth = window.innerWidth;
      if (windowWidth < 1240) {
          slidesDesktop.forEach((slide) => {
              slide.style.display = "none";
          });
          slidesMobile.forEach((slide) => {
              slide.style.display = "block";
          });
      } else {
          slidesDesktop.forEach((slide) => {
              slide.style.display = "block";
          });
          slidesMobile.forEach((slide) => {
              slide.style.display = "none";
          });
      }
  }

  // Inicializa os slides corretamente
  function initializeSlides() {
      const slides = window.innerWidth < 1240 ? slidesMobile : slidesDesktop;
      slides[0].style.display = "block";
  }

  // Função para mostrar o slide atual
  function showSlide(index) {
      const slides = window.innerWidth < 1240 ? slidesMobile : slidesDesktop;
      slides.forEach((slide, i) => {
          slide.style.display = i === index ? "block" : "none";
      });
  }

  // Inicializa a exibição das imagens ao carregar a página
  replaceImages();
  initializeSlides();

  // Atualiza a exibição das imagens quando a janela é redimensionada
  window.addEventListener("resize", () => {
      replaceImages();
      initializeSlides();
  });

  // Controles do slider
  let currentSlide = 0;
  const prevButton = document.querySelector(".prev");
  const nextButton = document.querySelector(".next");

  prevButton.addEventListener("click", () => {
      currentSlide = (currentSlide > 0) ? currentSlide - 1 : slidesDesktop.length - 1;
      showSlide(currentSlide);
  });

  nextButton.addEventListener("click", () => {
      currentSlide = (currentSlide < slidesDesktop.length - 1) ? currentSlide + 1 : 0;
      showSlide(currentSlide);
  });

  // Inicializa o primeiro slide
  showSlide(currentSlide);
});


// document.addEventListener("DOMContentLoaded", function () {
//   const slides = document.querySelectorAll(".slide");

//   function replaceImages() {
//     const windowWidth = window.innerWidth;
//     slides.forEach((slide) => {
//       const img = slide.querySelector("img");
//       if (windowWidth < 1240) {
//         const src = img.getAttribute("src");
//         const newSrc = src.replace(".png", "-mobile.png"); // Substitui a extensão do arquivo para uma versão móvel
//         img.setAttribute("src", newSrc);
//       } else {
//         const src = img.getAttribute("src");
//         const newSrc = src.replace("-mobile.png", ".png"); // Reverte para a versão original quando a largura da tela é maior que 1240px
//         img.setAttribute("src", newSrc);
//       }
//     });
//   }

//   // Chama a função inicialmente para garantir que as imagens corretas sejam exibidas ao carregar a página
//   replaceImages();

//   // Chama a função sempre que a largura da janela for alterada
//   window.addEventListener("resize", replaceImages);
// });

// // Controle do menu e slider
// document.addEventListener("DOMContentLoaded", function () {
//   const menuToggle = document.querySelector(".menu-toggle");
//   const navLinks = document.querySelector(".nav-links");
//   const slides = document.querySelectorAll(".slide");
//   const dotsContainer = document.querySelector(".dots-container");
//   const prevButton = document.querySelector(".prev");
//   const nextButton = document.querySelector(".next");

//   let currentSlide = 0;
//   const dots = [];

//   slides.forEach((_, index) => {
//     const dot = document.createElement("span");
//     dot.classList.add("dot");
//     dot.addEventListener("click", () => {
//       currentSlide = index;
//       showSlide(currentSlide);
//     });
//     dotsContainer.appendChild(dot);
//     dots.push(dot);
//   });

//   document.getElementById("mobile-menu").addEventListener("click", function () {
//     var menuToggle = document.querySelector(".menu-toggle");
//     menuToggle.classList.toggle("active");
//     var navLinks = document.querySelector(".nav-links");
//     navLinks.classList.toggle("active");

//     // Bloqueia ou desbloqueia a rolagem do corpo da página
//     if (menuToggle.classList.contains("active")) {
//       document.body.classList.add("no-scroll");
//     } else {
//       document.body.classList.remove("no-scroll");
//     }
//   });

//   function updateDots() {
//     dots.forEach((dot, index) => {
//       dot.classList.toggle("active", index === currentSlide);
//     });
//   }

//   function showSlide(index) {
//     slides.forEach((slide, i) => {
//       slide.style.display = i === index ? "block" : "none";
//     });
//     updateDots();
//   }

//   prevButton.addEventListener("click", () => {
//     currentSlide--;
//     if (currentSlide < 0) {
//       currentSlide = slides.length - 1;
//     }
//     showSlide(currentSlide);
//   });

//   nextButton.addEventListener("click", () => {
//     currentSlide++;
//     if (currentSlide >= slides.length) {
//       currentSlide = 0;
//     }
//     showSlide(currentSlide);
//   });

//   showSlide(currentSlide);

//   setInterval(() => {
//     currentSlide++;
//     if (currentSlide >= slides.length) {
//       currentSlide = 0;
//     }
//     showSlide(currentSlide);
//   }, 5000);

  const campanhaRef = ref(db, "campanha");
  let countdownTimeout; // Variável para armazenar o timeout

  // Função para adicionar um zero à esquerda se o valor for menor que 10
  function padValue(value) {
    return value < 10 ? `0${value}` : value;
  }

  // Função para iniciar a contagem regressiva
  function startCountdown(campanha) {
    // Convertendo os valores para números inteiros
    let dias = parseInt(campanha.dias);
    let horas = parseInt(campanha.horas);
    let minutos = parseInt(campanha.minutos);
    let segundos = parseInt(campanha.segundos);

    // Verificar se os valores são válidos, se não, definir como zero
    dias = isNaN(dias) ? 0 : dias;
    horas = isNaN(horas) ? 0 : horas;
    minutos = isNaN(minutos) ? 0 : minutos;
    segundos = isNaN(segundos) ? 0 : segundos;

    // Calculando o total de segundos
    let totalSeconds =
      dias * 24 * 60 * 60 + horas * 60 * 60 + minutos * 60 + segundos;

    let countdownInterval = setInterval(() => {
      if (totalSeconds > 0) {
        totalSeconds--;

        // Calcular os novos valores de dias, horas, minutos e segundos
        dias = Math.floor(totalSeconds / (24 * 60 * 60));
        horas = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
        minutos = Math.floor((totalSeconds % (60 * 60)) / 60);
        segundos = totalSeconds % 60;

        // Atualizar os elementos HTML com os novos valores
        document.getElementById("dias").innerText = padValue(dias);
        document.getElementById("horas").innerText = padValue(horas);
        document.getElementById("minutos").innerText = padValue(minutos);
        document.getElementById("segundos").innerText = padValue(segundos);
      } else {
        clearInterval(countdownInterval);
        // Lógica para quando a contagem chegar a zero
        alert("Contagem regressiva encerrada!");
      }
    }, 1000);
  }

  // Monitorando alterações no nó 'campanha'
  onValue(campanhaRef, (snapshot) => {
    const campanha = snapshot.val();
    if (campanha) {
      document.getElementById("campanha-local").innerText = campanha.rua;

      // Verificar se há valores válidos para iniciar a contagem regressiva
      if (
        campanha.dias !== undefined &&
        campanha.horas !== undefined &&
        campanha.minutos !== undefined &&
        campanha.segundos !== undefined
      ) {
        // Verificar se a contagem regressiva já foi iniciada
        if (!countdownTimeout) {
          // Iniciar a contagem regressiva
          startCountdown(campanha);
        }
      }
    } else {
      document.getElementById("campanha-local").innerText =
        "Nenhuma campanha configurada";
    }
  });

  const sr = ScrollReveal({
    origin: "bottom",
    distance: "50px",
    duration: 2000,
    reset: true,
  });

  sr.reveal(".sr-element");
