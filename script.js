(() => {
  const header = document.getElementById("header");
  const menuBtn = document.querySelector(".header__menu");
  const mobileNav = document.getElementById("mobile-nav");
  const hero = document.querySelector(".hero");
  const heroImage = document.querySelector(".hero__image");
  const year = document.getElementById("year");
  const cursorGlow = document.querySelector(".cursor-glow");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  if (year) year.textContent = String(new Date().getFullYear());
  if (hasFinePointer) document.body.classList.add("has-pointer");

  /* Header show/hide */
  let lastY = 0;
  const setHeaderState = () => {
    if (!header) return;
    const y = window.scrollY;
    header.classList.toggle("is-scrolled", y > 24);
    if (y > 180 && y > lastY && !header.classList.contains("is-open")) {
      header.classList.add("is-hidden");
    } else {
      header.classList.remove("is-hidden");
    }
    lastY = y;
  };

  const closeMenu = () => {
    if (!header || !menuBtn || !mobileNav) return;
    header.classList.remove("is-open");
    menuBtn.setAttribute("aria-expanded", "false");
    mobileNav.hidden = true;
    document.body.style.overflow = "";
  };

  const openMenu = () => {
    if (!header || !menuBtn || !mobileNav) return;
    header.classList.add("is-open");
    header.classList.remove("is-hidden");
    menuBtn.setAttribute("aria-expanded", "true");
    mobileNav.hidden = false;
    document.body.style.overflow = "hidden";
  };

  menuBtn?.addEventListener("click", () => {
    if (header?.classList.contains("is-open")) closeMenu();
    else openMenu();
  });

  mobileNav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("scroll", setHeaderState, { passive: true });
  setHeaderState();

  /* Hero ready + parallax */
  requestAnimationFrame(() => {
    hero?.classList.add("is-ready");
  });

  if (!prefersReducedMotion && heroImage) {
    let ticking = false;
    window.addEventListener(
      "scroll",
      () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          const offset = Math.min(window.scrollY * 0.22, 140);
          const scale = 1.08 + Math.min(window.scrollY * 0.00015, 0.04);
          heroImage.style.transform = `scale(${scale}) translate3d(0, ${offset}px, 0)`;
          ticking = false;
        });
      },
      { passive: true }
    );
  }

  /* Cursor glow */
  if (!prefersReducedMotion && hasFinePointer && cursorGlow) {
    let mx = 0;
    let my = 0;
    let cx = 0;
    let cy = 0;

    window.addEventListener(
      "pointermove",
      (e) => {
        mx = e.clientX;
        my = e.clientY;
        cursorGlow.classList.add("is-active");
      },
      { passive: true }
    );

    window.addEventListener("pointerleave", () => {
      cursorGlow.classList.remove("is-active");
    });

    const loopGlow = () => {
      cx += (mx - cx) * 0.12;
      cy += (my - cy) * 0.12;
      cursorGlow.style.left = `${cx}px`;
      cursorGlow.style.top = `${cy}px`;
      requestAnimationFrame(loopGlow);
    };
    requestAnimationFrame(loopGlow);
  }

  /* Magnetic buttons */
  if (!prefersReducedMotion && hasFinePointer) {
    document.querySelectorAll(".magnetic").forEach((el) => {
      const inner = el.querySelector(".magnetic__inner") || el;

      el.addEventListener("pointermove", (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate(${x * 0.08}px, ${y * 0.1}px)`;
        if (inner !== el) {
          inner.style.transform = `translate(${x * 0.05}px, ${y * 0.06}px)`;
        }
      });

      el.addEventListener("pointerleave", () => {
        el.style.transform = "";
        if (inner !== el) inner.style.transform = "";
      });
    });
  }

  /* Count-up */
  const animateCount = (el) => {
    const target = Number(el.dataset.target || "0");
    const duration = 1200;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = String(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  /* Scroll reveals */
  const revealItems = document.querySelectorAll(".reveal");

  if (prefersReducedMotion) {
    revealItems.forEach((el) => {
      el.classList.add("is-visible");
      el.querySelectorAll(".count-up").forEach((n) => {
        n.textContent = n.dataset.target || "0";
      });
    });
  } else if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          entry.target.querySelectorAll(".count-up").forEach(animateCount);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -10% 0px" }
    );

    revealItems.forEach((el) => observer.observe(el));
  } else {
    revealItems.forEach((el) => el.classList.add("is-visible"));
  }
})();
