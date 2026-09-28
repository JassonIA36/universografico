/**
 * UNIVERSO GRÁFICO — Script Principal ES6+
 * Interactividad, animaciones cósmicas, menú responsive, modo oscuro/claro y formulario
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. CAMPO DE ESTRELLAS TITILANTES
     ========================================================================== */
  const initStarField = () => {
    const field = document.getElementById('starField');
    if (!field) return;

    const count = window.innerWidth < 640 ? 36 : 68;
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < count; i++) {
      const star = document.createElement('span');
      const size = (Math.random() * 2 + 1).toFixed(1);
      const top = (Math.random() * 100).toFixed(2);
      const left = (Math.random() * 100).toFixed(2);
      const dur = (Math.random() * 3 + 2).toFixed(2);
      const delay = (Math.random() * 4).toFixed(2);

      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.top = `${top}%`;
      star.style.left = `${left}%`;
      star.style.animationDuration = `${dur}s`;
      star.style.animationDelay = `${delay}s`;

      fragment.appendChild(star);
    }

    field.innerHTML = '';
    field.appendChild(fragment);
  };

  initStarField();
  window.addEventListener('resize', debounce(initStarField, 250));

  /* ==========================================================================
     2. ESTRELLAS FUGACES ALEATORIAS (MEJORA #12)
     ========================================================================== */
  const initShootingStars = () => {
    const container = document.getElementById('shootingStars');
    if (!container || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const spawnStar = () => {
      const star = document.createElement('div');
      star.className = 'shooting-star-elem';

      // Parámetros aleatorios
      const startX = Math.random() * 70; // 0% a 70% del ancho
      const startY = Math.random() * 35; // tercio superior
      const length = Math.floor(Math.random() * 80 + 70); // 70px a 150px
      const angle = Math.floor(Math.random() * 20 + 25); // 25deg a 45deg
      const distance = Math.floor(Math.random() * 350 + 250); // distancia recorrida en px
      const duration = (Math.random() * 0.8 + 0.9).toFixed(2); // 0.9s a 1.7s

      star.style.left = `${startX}%`;
      star.style.top = `${startY}%`;
      star.style.width = `${length}px`;
      star.style.transform = `rotate(${angle}deg)`;

      container.appendChild(star);

      // Animar con Web Animations API para máxima fluidez
      const anim = star.animate([
        {
          transform: `rotate(${angle}deg) translateX(0)`,
          opacity: 0
        },
        {
          opacity: 1,
          offset: 0.15
        },
        {
          transform: `rotate(${angle}deg) translateX(${distance}px)`,
          opacity: 0
        }
      ], {
        duration: parseFloat(duration) * 1000,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      });

      anim.onfinish = () => {
        star.remove();
      };

      // Próxima estrella con retraso aleatorio entre 3.5 y 7.5 segundos
      const nextDelay = Math.random() * 4000 + 3500;
      setTimeout(spawnStar, nextDelay);
    };

    // Primera estrella después de 1.5s
    setTimeout(spawnStar, 1500);
  };

  initShootingStars();

  /* ==========================================================================
     3. SCROLL REVEAL (INTERSECTION OBSERVER)
     ========================================================================== */
  const initScrollReveal = () => {
    const targets = document.querySelectorAll('.reveal, .reveal-group, .step');
    if (!('IntersectionObserver' in window)) {
      targets.forEach(el => el.classList.add('in-view'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    targets.forEach(el => observer.observe(el));
  };

  initScrollReveal();

  /* ==========================================================================
     4. ORBE DE LUZ INTERACTIVO (CURSOR-FOLLOW DESKTOP)
     ========================================================================== */
  const initCursorOrb = () => {
    const orb = document.getElementById('cursorOrb');
    if (!orb || window.matchMedia('(pointer: coarse)').matches) return;

    let rafId = null;
    let targetX = 0;
    let targetY = 0;

    window.addEventListener('mousemove', (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      orb.style.opacity = '1';

      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          orb.style.transform = `translate(${targetX}px, ${targetY}px) translate(-50%, -50%)`;
          rafId = null;
        });
      }
    });

    window.addEventListener('mouseleave', () => {
      orb.style.opacity = '0';
    });
  };

  initCursorOrb();

  /* ==========================================================================
     5. ROTACIÓN DINÁMICA DE ETIQUETAS EN CTA
     ========================================================================== */
  const initTagCycle = () => {
    const tagEl = document.getElementById('tagCycle');
    if (!tagEl) return;

    const items = [
      '🎨 Logo e Identidad',
      '🖥️ Landing Page de Alto Impacto',
      '📱 Aplicación Web a la Medida',
      '✨ Rediseño y Modernización',
      '🚀 Sitios Rápidos y Optimizados'
    ];
    let currentIndex = 0;

    tagEl.style.transition = 'opacity 0.25s ease, transform 0.25s ease';

    setInterval(() => {
      currentIndex = (currentIndex + 1) % items.length;
      tagEl.style.opacity = '0';
      tagEl.style.transform = 'translateY(-4px)';

      setTimeout(() => {
        tagEl.textContent = items[currentIndex];
        tagEl.style.opacity = '1';
        tagEl.style.transform = 'translateY(0)';
      }, 250);
    }, 2400);
  };

  initTagCycle();

  /* ==========================================================================
     6. BOTÓN VOLVER ARRIBA (BACK TO TOP)
     ========================================================================== */
  const initBackToTop = () => {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 480) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }, { passive: true });
  };

  initBackToTop();

  /* ==========================================================================
     7. MENÚ HAMBURGUESA MÓVIL (MEJORA #1)
     ========================================================================== */
  const initMobileNav = () => {
    const toggleBtn = document.getElementById('menuToggle');
    const closeBtn = document.getElementById('menuClose');
    const overlay = document.getElementById('mobileNavOverlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a, .mobile-nav-footer a');

    if (!toggleBtn || !overlay) return;

    const openMenu = () => {
      toggleBtn.classList.add('open');
      toggleBtn.setAttribute('aria-expanded', 'true');
      overlay.classList.add('open');
      document.body.classList.add('menu-open');
    };

    const closeMenu = () => {
      toggleBtn.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      overlay.classList.remove('open');
      document.body.classList.remove('menu-open');
    };

    toggleBtn.addEventListener('click', () => {
      const isOpen = overlay.classList.contains('open');
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', closeMenu);
    }

    // Cerrar al hacer clic en el backdrop fuera del panel
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeMenu();
      }
    });

    // Cerrar al hacer clic en cualquier enlace
    mobileLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Cerrar con la tecla Escape
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('open')) {
        closeMenu();
      }
    });
  };

  initMobileNav();

  /* ==========================================================================
     8. MODO OSCURO / MODO CLARO (MEJORA #11)
     ========================================================================== */
  const initThemeToggle = () => {
    const themeButtons = document.querySelectorAll('.theme-toggle-btn');
    const root = document.documentElement;

    const savedTheme = localStorage.getItem('ug_theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'dark'); // Dark mode por defecto para Universo Gráfico

    const setTheme = (theme) => {
      root.setAttribute('data-theme', theme);
      localStorage.setItem('ug_theme', theme);

      themeButtons.forEach(btn => {
        btn.setAttribute('aria-label', theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
      });
    };

    setTheme(initialTheme);

    themeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const currentTheme = root.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
      });
    });
  };

  initThemeToggle();

  /* ==========================================================================
     9. ACTIVE NAV LINK ON SCROLL
     ========================================================================== */
  const initActiveLinks = () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav.links a[href^="#"], .mobile-nav-links a[href^="#"]');

    if (!sections.length || !navLinks.length) return;

    window.addEventListener('scroll', () => {
      let currentSectionId = '';
      const scrollPos = window.scrollY + 120;

      sections.forEach(sec => {
        const top = sec.offsetTop;
        const height = sec.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          currentSectionId = sec.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === `#${currentSectionId}`) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }, { passive: true });
  };

  initActiveLinks();

  /* ==========================================================================
     10. FORMULARIO DE CONTACTO FUNCIONAL CON FORMSPREE & WHATSAPP (MEJORA #2)
     ========================================================================== */
  const initContactForm = () => {
    const form = document.getElementById('contactForm');
    const feedback = document.getElementById('formFeedback');
    const submitBtn = document.getElementById('formSubmitBtn');
    const waDirectBtn = document.getElementById('formWaDirectBtn');

    if (!form) return;

    // Actualizar enlace directo a WhatsApp con los datos del formulario al escribir
    const updateWhatsAppLink = () => {
      if (!waDirectBtn) return;
      const name = form.querySelector('[name="name"]')?.value || '';
      const service = form.querySelector('[name="service"]')?.value || 'Proyecto General';
      const plan = form.querySelector('[name="plan"]')?.value || 'Por definir';
      const msg = form.querySelector('[name="message"]')?.value || '';

      const text = `¡Hola Jason! Mi nombre es ${name || '[Mi Nombre]'}. Me interesa cotizar: *${service}* (Plan: ${plan}). ${msg ? 'Detalle: ' + msg : ''}`;
      waDirectBtn.href = `https://wa.me/573224583276?text=${encodeURIComponent(text)}`;
    };

    form.addEventListener('input', updateWhatsAppLink);
    updateWhatsAppLink();

    // Procesar envío del formulario vía Formspree / fetch
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
          <path d="M12 2a10 10 0 0 1 10 10"></path>
        </svg> Enviando mensaje...
      `;

      feedback.className = 'form-feedback';
      feedback.style.display = 'none';

      const formData = new FormData(form);

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          feedback.className = 'form-feedback success';
          feedback.innerHTML = `
            <strong>✨ ¡Mensaje enviado con éxito!</strong><br>
            Gracias por escribir. He recibido tus datos y te responderé en menos de 24 horas con una propuesta a la medida.
          `;
          feedback.style.display = 'block';
          form.reset();
          updateWhatsAppLink();
        } else {
          const data = await response.json();
          throw new Error(data?.error || 'Hubo un inconveniente al enviar.');
        }
      } catch (err) {
        console.warn('Formspree submit fallback:', err);
        feedback.className = 'form-feedback error';
        feedback.innerHTML = `
          <strong>No se pudo enviar automáticamente.</strong><br>
          Puedes contactarme de inmediato por WhatsApp con un solo clic:
          <a href="${waDirectBtn ? waDirectBtn.href : 'https://wa.me/573224583276'}" target="_blank" rel="noopener" style="display:inline-block; margin-top:8px; font-weight:bold; color:var(--text); text-decoration:underline;">
            👉 Enviar propuesta por WhatsApp directo
          </a>
        `;
        feedback.style.display = 'block';
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }
    });
  };

  initContactForm();

  /* ==========================================================================
     UTILIDADES
     ========================================================================== */
  function debounce(fn, ms) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), ms);
    };
  }

});
