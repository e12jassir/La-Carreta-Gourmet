/* ========================================
   La Carreta Gourmet - Site scripts
   ======================================== */

(function () {
  "use strict";

  /* ---------- Scroll reveal ---------- */
  function initReveal() {
    const revealElements = document.querySelectorAll(".reveal, [data-reveal]");
    if (!revealElements.length) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      revealElements.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const target = entry.target;
          if (target.hasAttribute("data-stagger")) {
            const children = Array.from(target.children).filter(
              (child) => !child.hasAttribute("hidden")
            );
            children.forEach((child, index) => {
              child.style.setProperty("--stagger-index", String(index));
            });
          }

          target.classList.add("is-visible");
          obs.unobserve(target);
        });
      },
      {
        threshold: 0,
        rootMargin: "0px 0px 0px 0px",
      }
    );

    revealElements.forEach((el) => {
      // If already in viewport at load time, reveal immediately
      const rect = el.getBoundingClientRect();
      const inViewport =
        rect.top < window.innerHeight && rect.bottom > 0;
      if (inViewport) {
        if (el.hasAttribute("data-stagger")) {
          const children = Array.from(el.children).filter(
            (child) => !child.hasAttribute("hidden")
          );
          children.forEach((child, index) => {
            child.style.setProperty("--stagger-index", String(index));
          });
        }
        el.classList.add("is-visible");
      } else {
        observer.observe(el);
      }
    });
  }

  /* ---------- Mobile navigation ---------- */
  function initMobileNav() {
    const burger = document.querySelector("[data-burger]");
    const menu = document.querySelector("[data-mobile-menu]");

    if (!burger || !menu) return;

    const focusableSelector = "a[href], button:not([disabled])";
    let firstFocusable = null;
    let lastFocusable = null;

    function updateFocusables() {
      const focusables = Array.from(menu.querySelectorAll(focusableSelector)).filter(
        (el) => el.offsetParent !== null
      );
      firstFocusable = focusables[0] || burger;
      lastFocusable = focusables[focusables.length - 1] || burger;
    }

    function openMenu() {
      burger.setAttribute("aria-expanded", "true");
      menu.hidden = false;
      document.body.style.overflow = "hidden";
      updateFocusables();
      if (firstFocusable && firstFocusable !== burger) {
        firstFocusable.focus();
      }
      document.addEventListener("keydown", handleKeydown);
      document.addEventListener("pointerdown", handleClickOutside);
    }

    function closeMenu(returnFocus = true) {
      burger.setAttribute("aria-expanded", "false");
      menu.hidden = true;
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeydown);
      document.removeEventListener("pointerdown", handleClickOutside);
      if (returnFocus) {
        burger.focus();
      }
    }

    function handleKeydown(event) {
      if (event.key === "Escape") {
        closeMenu();
        return;
      }

      if (event.key !== "Tab") return;

      // Focus trap
      if (event.shiftKey && document.activeElement === firstFocusable) {
        event.preventDefault();
        lastFocusable.focus();
      } else if (!event.shiftKey && document.activeElement === lastFocusable) {
        event.preventDefault();
        firstFocusable.focus();
      }
    }

    function handleClickOutside(event) {
      const target = event.target;
      if (!menu.contains(target) && !burger.contains(target)) {
        closeMenu(false);
      }
    }

    burger.addEventListener("click", () => {
      const isExpanded = burger.getAttribute("aria-expanded") === "true";
      if (isExpanded) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    menu.querySelectorAll("a[href]").forEach((link) => {
      link.addEventListener("click", () => closeMenu());
    });

    // Ensure initial state is closed
    closeMenu(false);
  }

  /* ---------- Smooth scroll with nav offset ---------- */
  function initSmoothScroll() {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    document.addEventListener("click", (event) => {
      const anchor = event.target.closest('a[href^="#"]');
      if (!anchor) return;

      const targetId = anchor.getAttribute("href").slice(1);
      if (!targetId) return;

      const target = document.getElementById(targetId);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start",
      });
    });
  }

  /* ---------- Dynamic year ---------- */
  function initYear() {
    const yearEls = document.querySelectorAll("[data-year]");
    const year = new Date().getFullYear();
    yearEls.forEach((el) => {
      el.textContent = String(year);
    });
  }

  /* ---------- Menu filter ---------- */
  function initMenuFilter() {
    const filters = document.querySelectorAll("[data-filter]");
    const dishes = document.querySelectorAll("[data-section]");
    const note = document.querySelector("[data-menu-note]");

    if (!filters.length || !dishes.length) return;

    filters.forEach((button) => {
      button.addEventListener("click", () => {
        const filter = button.getAttribute("data-filter");

        filters.forEach((btn) => {
          const isSelected = btn === button;
          btn.setAttribute("aria-selected", String(isSelected));
          btn.classList.toggle("is-active", isSelected);
        });

        let visibleCount = 0;
        dishes.forEach((dish) => {
          const section = dish.getAttribute("data-section");
          const matches = filter === "all" || section === filter;
          dish.hidden = !matches;
          if (matches) visibleCount += 1;
        });

        // Update button text with count
        const originalText = button.textContent.replace(/\s*\(\d+\)/, '');
        button.textContent = `${originalText} (${visibleCount})`;

        if (note) {
          note.hidden = visibleCount > 0;
        }
      });
      
      // Initialize counts on load
      const filter = button.getAttribute("data-filter");
      let count = 0;
      if (filter === "all") {
        count = dishes.length;
      } else {
        dishes.forEach((dish) => {
          if (dish.getAttribute("data-section") === filter) count++;
        });
      }
      const originalText = button.textContent;
      button.textContent = `${originalText} (${count})`;
    });
  }

  /* ---------- Star ratings ---------- */
  function renderStarRatings() {
    const containers = document.querySelectorAll("[data-rating]");
    if (!containers.length) return;

    const starPath =
      "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z";

    containers.forEach((container, index) => {
      const rating = parseFloat(container.getAttribute("data-rating")) || 0;
      const fullStars = Math.floor(rating);
      const hasHalf = rating % 1 >= 0.5;
      const uniqueId = `star-gradient-${index}`;

      const svgParts = [
        `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">`,
        `<defs>`,
        `<linearGradient id="${uniqueId}">`,
        `<stop offset="50%" stop-color="#c9922a"/>`,
        `<stop offset="50%" stop-color="rgba(245,239,230,0.2)"/>`,
        `</linearGradient>`,
        `</defs>`,
      ];

      for (let i = 0; i < 5; i += 1) {
        let fill;
        if (i < fullStars) {
          fill = "#c9922a";
        } else if (i === fullStars && hasHalf) {
          fill = `url(#${uniqueId})`;
        } else {
          fill = "rgba(245,239,230,0.2)";
        }
        svgParts.push(`<path d="${starPath}" fill="${fill}"/>`);
      }

      svgParts.push("</svg>");
      container.innerHTML = svgParts.join("");
    });
  }

  /* ---------- Reviews carousel ---------- */
  function initReviewsCarousel() {
    const track = document.querySelector("[data-reviews]");
    const prevBtn = document.querySelector("[data-review-prev]");
    const nextBtn = document.querySelector("[data-review-next]");

    if (!track || !prevBtn || !nextBtn) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    function getCardWidth() {
      const card = track.querySelector(".review");
      if (!card) return track.clientWidth;
      const style = window.getComputedStyle(track);
      const gap = parseFloat(style.columnGap || style.gap) || 0;
      return card.offsetWidth + gap;
    }

    function updateButtons() {
      const atStart = track.scrollLeft <= 1;
      const atEnd =
        track.scrollLeft >= track.scrollWidth - track.clientWidth - 1;
      prevBtn.disabled = atStart;
      nextBtn.disabled = atEnd;
    }

    function scrollByCards(direction) {
      const distance = getCardWidth() * direction;
      track.scrollBy({
        left: distance,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    }

    prevBtn.addEventListener("click", () => scrollByCards(-1));
    nextBtn.addEventListener("click", () => scrollByCards(1));

    track.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollByCards(-1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollByCards(1);
      }
    });

    track.addEventListener("scrollend", updateButtons);
    window.addEventListener("resize", updateButtons);

    updateButtons();
  }

  /* ---------- Sticky nav scrolled state (glass effect) ---------- */
  function initNavScroll() {
    const nav = document.querySelector("[data-nav]");
    if (!nav) return;
    const onScroll = () => {
      nav.classList.toggle("nav--scrolled", window.scrollY > 50);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initReveal();
    initMobileNav();
    initSmoothScroll();
    initYear();
    initMenuFilter();
    renderStarRatings();
    initReviewsCarousel();
    initNavScroll();
    initScrollAnimations();
  });
})();


  /* ---------- Premium Scroll Animations ---------- */
  function initScrollAnimations() {
    const elements = document.querySelectorAll('.menu-preview__card, .menu-card, .bebida-card, .review, .about__text, .about__media');
    
    if (!elements.length) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      elements.forEach(el => el.style.opacity = '1');
      return;
    }

    // Set initial state
    elements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s cubic-bezier(0.23, 1, 0.32, 1), transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, index * 100); // Stagger effect
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(el => observer.observe(el));
  }
