// Configurando o ScrollReveal
ScrollReveal().reveal('.sr-element', {
    delay: 300,
    duration: 1000,
    easing: 'ease-in',
    origin: 'bottom',
    distance: '60px',
    reset: true // Para animar somente uma vez
});


document.getElementById('mobile-menu').addEventListener('click', function() {
    var menuToggle = document.querySelector('.menu-toggle');
    menuToggle.classList.toggle('active');
    var navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
});



let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.querySelector('.dots-container');
const dots = [];

slides.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
    });
    dotsContainer.appendChild(dot);
    dots.push(dot);
});

function updateDots() {
    dots.forEach((dot, index) => {
        if (index === currentSlide) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function showSlide(index) {
    slides.forEach((slide, i) => {
        if (i === index) {
            slide.style.display = 'block';
        } else {
            slide.style.display = 'none';
        }
    });
    updateDots();
}

document.querySelector('.prev').addEventListener('click', () => {
    currentSlide--;
    if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    }
    showSlide(currentSlide);
});

document.querySelector('.next').addEventListener('click', () => {
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

const daysValue = document.querySelector('.days .value');
const hoursValue = document.querySelector('.hours .value');
const minutesValue = document.querySelector('.minutes .value');
const secondsValue = document.querySelector('.seconds .value');

// Função para recuperar o tempo restante do localStorage
function getRemainingTime() {
    const savedTime = localStorage.getItem('remainingTime');
    return savedTime ? JSON.parse(savedTime) : { days: 27, hours: 10, minutes: 12, seconds: 20 };
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
    localStorage.setItem('remainingTime', JSON.stringify({ days, hours, minutes, seconds }));
}

function formatTime(value) {
    return value < 10 ? `0${value}` : value;
}

const interval = setInterval(updateTime, 1000);
