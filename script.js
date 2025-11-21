document.addEventListener('DOMContentLoaded', function() {

    // --- Menú de Navegación Móvil (Hamburguesa) ---
    const hamburger = document.querySelector('.hamburger');
    const navbar = document.querySelector('.navbar');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navbar.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navbar.classList.remove('active');
    }));

    // --- Cambiar estilo del header al hacer scroll ---
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.style.height = '75px';
            header.style.boxShadow = '0 4px 30px rgba(0,0,0,0.12)';
        } else {
            header.style.height = '90px';
            header.style.boxShadow = '0 4px 30px rgba(0,0,0,0.08)';
        }
    });

    // --- Efecto Parallax en el Hero ---
    const heroBg = document.querySelector('.hero-bg-layer');
    window.addEventListener('scroll', () => {
        const scrollValue = window.scrollY;
        heroBg.style.transform = `translateY(${scrollValue * 0.5}px)`;
    });

    // --- Animaciones al hacer scroll con Intersection Observer ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Añadir animaciones específicas según la dirección
                const rect = entry.boundingClientRect;
                if (rect.top <= window.innerHeight && rect.bottom >= 0) {
                    if (rect.top < window.innerHeight / 2) {
                        entry.target.style.transform = 'translateY(0)';
                    } else {
                        entry.target.style.transform = 'translateY(0)';
                    }
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        // Asignar transform inicial para animar desde diferentes lados
        el.style.transform = 'translateY(50px)';
        observer.observe(el);
    });

    // --- Contadores Animados ---
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    const runCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(() => runCounter(counter), 10);
        } else {
            counter.innerText = target;
        }
    };
    
    const counterObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                runCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    // --- Slider de Testimonios ---
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentIndex = 0;

    const showTestimonial = (index) => {
        testimonialItems.forEach(item => item.classList.remove('active'));
        testimonialItems[index].classList.add('active');
    };

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % testimonialItems.length;
        showTestimonial(currentIndex);
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + testimonialItems.length) % testimonialItems.length;
        showTestimonial(currentIndex);
    });

    // --- Manejo del Formulario de Participación con Notificación ---
    const participationForm = document.querySelector('.participation-form');
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notification-text');
    
    participationForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const tema = document.getElementById('tema').value;

        notificationText.textContent = `¡Gracias, ${nombre}! Tu mensaje sobre "${tema}" ha sido recibido.`;
        notification.classList.add('show');

        participationForm.reset();

        setTimeout(() => {
            notification.classList.remove('show');
        }, 5000);
    });

});