// JustThink Landing Page - Interacciones Elegantes

// ========================================
// Cursor personalizado
// ========================================
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

let mouseX = 0;
let mouseY = 0;
let outlineX = 0;
let outlineY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
});

// Efecto suave para el outline del cursor
function animateOutline() {
    outlineX += (mouseX - outlineX) * 0.15;
    outlineY += (mouseY - outlineY) * 0.15;

    cursorOutline.style.left = outlineX + 'px';
    cursorOutline.style.top = outlineY + 'px';

    requestAnimationFrame(animateOutline);
}
animateOutline();

// Expandir cursor en hover de elementos interactivos
const interactiveElements = document.querySelectorAll('a, button, .service-card, .package-card');

interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorDot.style.transform = 'translate(-50%, -50%) scale(2)';
        cursorOutline.style.width = '60px';
        cursorOutline.style.height = '60px';
        cursorOutline.style.opacity = '0.3';
    });

    el.addEventListener('mouseleave', () => {
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorOutline.style.width = '40px';
        cursorOutline.style.height = '40px';
        cursorOutline.style.opacity = '0.5';
    });
});

// ========================================
// Smooth scroll con efecto
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// Sistema avanzado de animaciones al hacer scroll
// ========================================
const revealObserverOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Agregar clase revealed con un pequeño delay
            setTimeout(() => {
                entry.target.classList.add('revealed');
            }, 100);

            // Dejar de observar una vez revelado (animacion solo una vez)
            revealObserver.unobserve(entry.target);
        }
    });
}, revealObserverOptions);

// Observar todos los elementos con la clase reveal-on-scroll
document.querySelectorAll('.reveal-on-scroll').forEach(element => {
    revealObserver.observe(element);
});

// Observer especial para imagenes con fade-in suave
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.style.opacity = '1';
            imageObserver.unobserve(img);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.hero-main-image, .image-wrapper img').forEach(img => {
    img.style.opacity = '0';
    img.style.transition = 'opacity 1s ease';
    imageObserver.observe(img);
});

// ========================================
// Navbar con efecto al hacer scroll
// ========================================
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.padding = '0.8rem 0';
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.4)';
    } else {
        navbar.style.padding = '1.2rem 0';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    }

    lastScroll = currentScroll;
});

// ========================================
// Animacion de numeros en estadisticas
// ========================================
function animateNumber(element, target) {
    const duration = 2000;
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            const h3 = entry.target.querySelector('h3');
            const value = parseInt(h3.textContent);
            h3.textContent = '0+';
            animateNumber(h3, value);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat').forEach(stat => {
    statsObserver.observe(stat);
});

// ========================================
// Parallax suave en hero (sin desvanecimiento)
// ========================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.floating-shape');

    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.5;
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ========================================
// Efecto de escritura en el hero (opcional)
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    const hero = document.querySelector('.hero-content');
    if (hero) {
        hero.style.opacity = '0';
        setTimeout(() => {
            hero.style.transition = 'opacity 1s ease';
            hero.style.opacity = '1';
        }, 100);
    }
});

// ========================================
// Prevenir flash del cursor en mobile
// ========================================
if (window.innerWidth <= 968) {
    cursorDot.style.display = 'none';
    cursorOutline.style.display = 'none';
    document.body.style.cursor = 'auto';
}

// ========================================
// Formulario de contacto (validacion basica)
// ========================================
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Animacion de envio
        const button = contactForm.querySelector('button');
        const originalText = button.textContent;
        button.textContent = 'Enviando...';
        button.style.opacity = '0.7';

        // Simular envio
        setTimeout(() => {
            button.textContent = 'Mensaje enviado';
            button.style.backgroundColor = '#00C853';

            setTimeout(() => {
                button.textContent = originalText;
                button.style.backgroundColor = '';
                button.style.opacity = '1';
                contactForm.reset();
            }, 2000);
        }, 1500);
    });
}

// ========================================
// FAQ Accordion
// ========================================
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const faqItem = button.parentElement;
        const isActive = faqItem.classList.contains('active');

        // Cerrar todos los FAQs
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });

        // Abrir el clickeado si no estaba activo
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

console.log('%c JustThink Agency ', 'background: #D22F7D; color: white; font-size: 20px; padding: 10px;');
console.log('%c Website by JustThink - Marketing Digital ', 'color: #262626; font-size: 12px;');
