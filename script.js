// Configurando o ScrollReveal
ScrollReveal().reveal(".sr-element", {
  delay: 300,
  duration: 1000,
  easing: "ease-in",
  origin: "bottom",
  distance: "60px",
  reset: true, // Para animar somente uma vez
});

document.getElementById("logout-link").addEventListener("click", function (event) {
    // Impede o comportamento padrão do link
    event.preventDefault();
    
    // Remove o nome de usuário do localStorage
    localStorage.removeItem("username");
    
    // Redireciona para a página de registro
    window.location.href = "./index.html";
  });
  
  const username = localStorage.getItem("username");
  const loginLink = document.getElementById("login-link");
  const registerLink = document.getElementById("register-link");
  const logoutLink = document.getElementById("logout-link");
  
  if (username) {
    // Usuário está logado
    document.getElementById("username").textContent = username;
    loginLink.style.display = "none";
    registerLink.style.display = "none";
    logoutLink.style.display = "block";
  } else {
    // Usuário não está logado
    logoutLink.style.display = "none";
    loginLink.style.display = "block";
    registerLink.style.display = "block";
  }
  

// Fechar o dropdown se clicar fora
window.onclick = function (event) {
  if (!event.target.matches("#profile-icon")) {
    const dropdowns = document.getElementsByClassName("profile-dropdown");
    for (let i = 0; i < dropdowns.length; i++) {
      const openDropdown = dropdowns[i];
      if (openDropdown.style.display === "block") {
        openDropdown.style.display = "none";
      }
    }
  }
};

document.getElementById("mobile-menu").addEventListener("click", function () {
  var menuToggle = document.querySelector(".menu-toggle");
  menuToggle.classList.toggle("active");
  var navLinks = document.querySelector(".nav-links");
  navLinks.classList.toggle("active");

  // Bloqueia ou desbloqueia a rolagem do corpo da página
  if (menuToggle.classList.contains("active")) {
    document.body.classList.add("no-scroll");
  } else {
    document.body.classList.remove("no-scroll");
  }
});

let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const dotsContainer = document.querySelector(".dots-container");
const dots = [];

slides.forEach((_, index) => {
  const dot = document.createElement("span");
  dot.classList.add("dot");
  dot.addEventListener("click", () => {
    currentSlide = index;
    showSlide(currentSlide);
  });
  dotsContainer.appendChild(dot);
  dots.push(dot);
});

function updateDots() {
  dots.forEach((dot, index) => {
    if (index === currentSlide) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
}

function showSlide(index) {
  slides.forEach((slide, i) => {
    if (i === index) {
      slide.style.display = "block";
    } else {
      slide.style.display = "none";
    }
  });
  updateDots();
}

document.querySelector(".prev").addEventListener("click", () => {
  currentSlide--;
  if (currentSlide < 0) {
    currentSlide = slides.length - 1;
  }
  showSlide(currentSlide);
});

document.querySelector(".next").addEventListener("click", () => {
  currentSlide++;
  if (currentSlide >= slides.length) {
    currentSlide = 0;
  }
  showSlide(currentSlide);
});

// Mostrar o primeiro slide ao carregar a página
showSlide(currentSlide);

// Trocar de slide automaticamente a cada 5 segundos
setInterval(() => {
  currentSlide++;
  if (currentSlide >= slides.length) {
    currentSlide = 0;
  }
  showSlide(currentSlide);
}, 5000);

const daysValue = document.querySelector(".days .value");
const hoursValue = document.querySelector(".hours .value");
const minutesValue = document.querySelector(".minutes .value");
const secondsValue = document.querySelector(".seconds .value");

// Função para recuperar o tempo restante do localStorage
function getRemainingTime() {
  const savedTime = localStorage.getItem("remainingTime");
  return savedTime
    ? JSON.parse(savedTime)
    : { days: 27, hours: 10, minutes: 12, seconds: 20 };
}

let { days, hours, minutes, seconds } = getRemainingTime();

function updateTime() {
  if (seconds > 0) {
    seconds--;
  } else if (minutes > 0) {
    seconds = 59;
    minutes--;
  } else if (hours > 0) {
    seconds = 59;
    minutes = 59;
    hours--;
  } else if (days > 0) {
    seconds = 59;
    minutes = 59;
    hours = 23;
    days--;
  } else {
    // Reiniciar o tempo após atingir zero
    days = 27;
    hours = 10;
    minutes = 12;
    seconds = 20;
  }

  daysValue.textContent = days;
  hoursValue.textContent = formatTime(hours);
  minutesValue.textContent = formatTime(minutes);
  secondsValue.textContent = formatTime(seconds);

  // Armazenar o tempo restante no localStorage
  localStorage.setItem(
    "remainingTime",
    JSON.stringify({ days, hours, minutes, seconds })
  );
}

function formatTime(value) {
  return value < 10 ? `0${value}` : value;
}

const interval = setInterval(updateTime, 1000);
