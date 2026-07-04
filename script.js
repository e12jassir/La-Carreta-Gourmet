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

  document.addEventListener("DOMContentLoaded", () => {
    initMobileNav();
  });
})();
