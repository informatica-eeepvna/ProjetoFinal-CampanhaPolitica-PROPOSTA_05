document.addEventListener("DOMContentLoaded", function() {
  const restritoButton = document.getElementById('restrito');
  restritoButton.addEventListener("click", function() {
      window.location.href = "./form/index.html";
  });
});


document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const slides = document.querySelectorAll(".slide");
  const dotsContainer = document.querySelector(".dots-container");
  const prevButton = document.querySelector(".prev");
  const nextButton = document.querySelector(".next");
  const daysValue = document.querySelector(".days .value");
  const hoursValue = document.querySelector(".hours .value");
  const minutesValue = document.querySelector(".minutes .value");
  const secondsValue = document.querySelector(".seconds .value");

  let currentSlide = 0;
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
  function updateDots() {
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentSlide);
    });
  }

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.style.display = (i === index) ? "block" : "none";
    });
    updateDots();
  }

  prevButton.addEventListener("click", () => {
    currentSlide--;
    if (currentSlide < 0) {
      currentSlide = slides.length - 1;
    }
    showSlide(currentSlide);
  });

  nextButton.addEventListener("click", () => {
    currentSlide++;
    if (currentSlide >= slides.length) {
      currentSlide = 0;
    }
    showSlide(currentSlide);
  });

  showSlide(currentSlide);

  setInterval(() => {
    currentSlide++;
    if (currentSlide >= slides.length) {
      currentSlide = 0;
    }
    showSlide(currentSlide);
  }, 5000);

  function getRemainingTime() {
    const savedTime = localStorage.getItem("remainingTime");
    return savedTime ? JSON.parse(savedTime) : { days: 27, hours: 10, minutes: 12, seconds: 20 };
  }

  let { days, hours, minutes, seconds } = getRemainingTime();

  function updateCountdown() {
    if (seconds > 0) {
      seconds--;
    } else {
      seconds = 59;
      if (minutes > 0) {
        minutes--;
      } else {
        minutes = 59;
        if (hours > 0) {
          hours--;
        } else {
          hours = 23;
          if (days > 0) {
            days--;
          } else {
            days = 0;
          }
        }
      }
    }

    daysValue.textContent = days.toString().padStart(2, "0");
    hoursValue.textContent = hours.toString().padStart(2, "0");
    minutesValue.textContent = minutes.toString().padStart(2, "0");
    secondsValue.textContent = seconds.toString().padStart(2, "0");

    localStorage.setItem("remainingTime", JSON.stringify({ days, hours, minutes, seconds }));
  }



  setInterval(updateCountdown, 1000);

  const sr = ScrollReveal({
    origin: "bottom",
    distance: "50px",
    duration: 2000,
    reset: true
  });

  sr.reveal(".sr-element");
});
