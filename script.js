/* ========================================
   La Carreta Gourmet - Site scripts
   ======================================== */

(function () {
  "use strict";

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

        if (note) {
          note.hidden = visibleCount > 0;
        }
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initMobileNav();
    initSmoothScroll();
    initYear();
    initMenuFilter();
  });
})();
