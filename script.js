/* ========================================
   SK Aesthetics — Interactive Scripts
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // ===== Navigation Scroll Effect =====
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // ===== Scroll Reveal Animation =====
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Запускаем счётчик, если это статистика
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => animateCounter(stat));
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => revealObserver.observe(el));
    
    // ===== Counter Animation =====
    function animateCounter(element) {
        if (element.dataset.animated) return;
        element.dataset.animated = 'true';
        
        const target = parseInt(element.dataset.count);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + (target >= 1000 ? '+' : '+');
            }
        };
        
        updateCounter();
    }
    
    // ===== Mobile Menu =====
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');
    
    // Создаём мобильное меню и оверлей
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    mobileMenu.innerHTML = navLinks.innerHTML;
    document.body.appendChild(mobileMenu);
    
    const mobileOverlay = document.createElement('div');
    mobileOverlay.className = 'mobile-overlay';
    document.body.appendChild(mobileOverlay);
    
    function toggleMenu() {
        mobileMenu.classList.toggle('active');
        mobileOverlay.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    }
    
    mobileToggle.addEventListener('click', toggleMenu);
    mobileOverlay.addEventListener('click', toggleMenu);
    
    // Закрываем меню при клике на ссылку
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            toggleMenu();
        });
    });
    
    // ===== Smooth Scroll for Anchor Links =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== Scroll to Top Button =====
    const scrollTopBtn = document.getElementById('scrollTop');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 600) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ===== Parallax Effect for Hero =====
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.4;
        if (scrolled < window.innerHeight) {
            hero.style.backgroundPositionY = `${rate}px`;
        }
    });
    
    // ===== Service Card Hover Sound (optional visual feedback) =====
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        });
    });
    
    // ===== Gallery Lightbox Placeholder =====
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            // Здесь можно подключить полноценную галерею (Fancybox, Lightbox и т.д.)
            console.log(`Открыть изображение ${index + 1}`);
        });
    });
    
    // ===== Active Navigation Link on Scroll =====
    const sections = document.querySelectorAll('section[id]');
    const navLinkElements = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navLinkElements.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // ===== Preloader (simple fade out) =====
    const preloader = document.createElement('div');
    preloader.style.cssText = `
        position: fixed;
        inset: 0;
        background: var(--color-bg);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: opacity 0.6s ease;
    `;
    preloader.innerHTML = `
        <div style="text-align: center;">
            <div style="font-family: var(--font-heading); font-size: 2rem; color: var(--color-primary); margin-bottom: 16px;">
                ✦ SK Aesthetics
            </div>
            <div style="width: 120px; height: 2px; background: #e0e0e0; border-radius: 2px; overflow: hidden; margin: 0 auto;">
                <div style="width: 0%; height: 100%; background: var(--color-primary); animation: loadBar 1s ease forwards;"></div>
            </div>
        </div>
        <style>
            @keyframes loadBar {
                to { width: 100%; }
            }
        </style>
    `;
    document.body.appendChild(preloader);
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => preloader.remove(), 600);
        }, 800);
    });
    
    // ===== Typing Effect for Hero Badge =====
    const heroBadge = document.querySelector('.hero-badge');
    if (heroBadge) {
        const text = heroBadge.textContent;
        heroBadge.textContent = '';
        let i = 0;
        
        const typeWriter = () => {
            if (i < text.length) {
                heroBadge.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }
    
    console.log('✦ SK Aesthetics website loaded successfully!');
});
