// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Custom Cursor
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

if (window.innerWidth > 768) {
  window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    cursorOutline.animate({
      left: `${posX}px`,
      top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
  });

  // Hover effects for cursor
  const interactiveElements = document.querySelectorAll('a, button, .service-card, .gallery-item');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
      cursorOutline.style.backgroundColor = 'rgba(200, 148, 62, 0.1)';
    });
    el.addEventListener('mouseleave', () => {
      cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
      cursorOutline.style.backgroundColor = 'transparent';
    });
  });
}

// Loading Animation Sequence
window.addEventListener('load', () => {
  const tl = gsap.timeline();

  tl.to('.loader-progress', {
    width: '100%',
    duration: 1.5,
    ease: 'power3.inOut'
  })
  .to('.loader', {
    yPercent: -100,
    duration: 0.8,
    ease: 'power4.inOut',
    delay: 0.2
  })
  .from('.hero-title', {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
  }, "-=0.2")
  .to('.hero-subtitle', {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power3.out'
  }, "-=0.6")
  .from('.hero-img-bg', {
    scale: 1.2,
    duration: 2,
    ease: 'power2.out'
  }, "-=1");

  // Ken Burns effect on Hero Image (applies to all slides)
  gsap.to('.hero-img-bg', {
    scale: 1.05,
    duration: 20,
    ease: 'none',
    repeat: -1,
    yoyo: true
  });

  // Hero Slideshow Crossfade
  const heroSlides = document.querySelectorAll('.hero-img-bg.slide');
  if (heroSlides.length > 1) {
    let currentSlide = 0;
    setInterval(() => {
      heroSlides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % heroSlides.length;
      heroSlides[currentSlide].classList.add('active');
    }, 4000);
  }
});

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Animate Sections on Scroll
gsap.utils.toArray('.section-title-wrap, .section-title, .section-subtitle').forEach(el => {
  gsap.from(el, {
    scrollTrigger: {
      trigger: el,
      start: "top 85%",
    },
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out"
  });
});

// Services Auto-Scroll Carousel — pause on touch/hold
const carousel = document.getElementById('services-carousel');
if (carousel) {
  // Pause on touch (mobile)
  carousel.addEventListener('touchstart', () => {
    carousel.classList.add('paused');
  }, { passive: true });

  carousel.addEventListener('touchend', () => {
    carousel.classList.remove('paused');
  }, { passive: true });

  // Pause on mousedown (desktop drag intent)
  carousel.addEventListener('mousedown', () => {
    carousel.classList.add('paused');
  });

  document.addEventListener('mouseup', () => {
    carousel.classList.remove('paused');
  });
}

// Number Counter Animation
const counters = document.querySelectorAll('.stat-number');
let hasCounted = false;

ScrollTrigger.create({
  trigger: '.experience',
  start: "top 75%",
  onEnter: () => {
    if (!hasCounted) {
      counters.forEach((counter, i) => {
        const target = +counter.getAttribute('data-target');
        gsap.to(counter, {
          innerHTML: target,
          duration: 2,
          delay: i * 0.2,
          snap: { innerHTML: 1 },
          ease: "power3.out",
          onUpdate: function() {
            if(target > 100) {
              counter.innerHTML = Math.ceil(this.targets()[0].innerHTML) + '+';
            } else {
               counter.innerHTML = Math.ceil(this.targets()[0].innerHTML);
            }
          }
        });
      });
      hasCounted = true;
    }
  }
});

// Pillars Stagger
gsap.from('.pillar-card', {
  scrollTrigger: {
    trigger: '.pillars-grid',
    start: "top 80%",
  },
  y: 40,
  opacity: 0,
  duration: 0.8,
  stagger: 0.2,
  ease: "power3.out"
});

// Gallery Stagger
gsap.from('.gallery-item', {
  scrollTrigger: {
    trigger: '.gallery-grid',
    start: "top 80%",
  },
  scale: 0.9,
  opacity: 0,
  duration: 0.8,
  stagger: 0.1,
  ease: "back.out(1.5)"
});

// About Section Parallax
gsap.to('.about-img', {
  scrollTrigger: {
    trigger: '.about',
    start: "top bottom",
    end: "bottom top",
    scrub: true
  },
  y: -30,
  ease: "none"
});

// Gallery Lightbox
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.querySelector('.lightbox-close');

galleryItems.forEach(item => {
  item.addEventListener('click', () => {
    const imgSrc = item.querySelector('.gallery-img').getAttribute('src');
    lightboxImg.setAttribute('src', imgSrc);
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

const closeLightbox = () => {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
};

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
  if(e.target === lightbox) {
    closeLightbox();
  }
});

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');
let isMenuOpen = false;

mobileMenuBtn.addEventListener('click', () => {
  isMenuOpen = !isMenuOpen;
  if(isMenuOpen) {
    mobileMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
    // Transform hamburger to X
    mobileMenuBtn.innerHTML = '<i data-lucide="x"></i>';
    lucide.createIcons();
  } else {
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
    // Transform X to hamburger
    mobileMenuBtn.innerHTML = '<i data-lucide="menu"></i>';
    lucide.createIcons();
  }
});

// Close mobile menu on link click
mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    isMenuOpen = false;
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
    mobileMenuBtn.innerHTML = '<i data-lucide="menu"></i>';
    lucide.createIcons();
  });
});

// Magnetic Buttons
const magneticEls = document.querySelectorAll('.magnetic-btn, .social-icon, .nav-links a');
if (window.innerWidth > 768) {
  magneticEls.forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const position = el.getBoundingClientRect();
      const x = e.clientX - position.left - position.width / 2;
      const y = e.clientY - position.top - position.height / 2;
      
      gsap.to(el, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.5,
        ease: 'power3.out'
      });
    });

    el.addEventListener('mouseleave', () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)'
      });
    });
  });

  // Gallery Parallax
  gsap.utils.toArray('.gallery-item').forEach(item => {
    const speed = item.getAttribute('data-speed') || 1;
    gsap.to(item, {
      y: -50 * speed,
      ease: "none",
      scrollTrigger: {
        trigger: '.gallery-grid',
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  });

  // Floating Emoji Background in CTA
  gsap.to('.cta', {
    backgroundPosition: `50% 100%`,
    ease: "none",
    scrollTrigger: {
      trigger: '.cta',
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  });
}
const testimCards = document.querySelectorAll('.testim-card');
let currentTestim = 0;

setInterval(() => {
  testimCards[currentTestim].classList.remove('active');
  currentTestim = (currentTestim + 1) % testimCards.length;
  testimCards[currentTestim].classList.add('active');
}, 5000);

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const isOpen = item.classList.contains('open');
    
    // Close all others
    document.querySelectorAll('.faq-item.open').forEach(openItem => {
      openItem.classList.remove('open');
    });
    
    // Toggle current
    if (!isOpen) {
      item.classList.add('open');
    }
  });
});

// Animate How It Works Steps
gsap.from('.step-card', {
  scrollTrigger: {
    trigger: '.how-it-works',
    start: "top 75%",
  },
  y: 40,
  opacity: 0,
  duration: 0.8,
  stagger: 0.2,
  ease: "back.out(1.2)"
});

gsap.from('.step-connector', {
  scrollTrigger: {
    trigger: '.how-it-works',
    start: "top 75%",
  },
  scale: 0,
  opacity: 0,
  duration: 0.4,
  stagger: 0.2,
  delay: 0.4,
  ease: "back.out(2)"
});

// Animate Instagram Feed
gsap.from('.ig-item', {
  scrollTrigger: {
    trigger: '.ig-feed',
    start: "top 80%",
  },
  scale: 0.8,
  opacity: 0,
  duration: 0.5,
  stagger: 0.08,
  ease: "power3.out"
});

// Animate FAQ items
gsap.from('.faq-item', {
  scrollTrigger: {
    trigger: '.faq',
    start: "top 80%",
  },
  y: 20,
  opacity: 0,
  duration: 0.5,
  stagger: 0.1,
  ease: "power3.out"
});
