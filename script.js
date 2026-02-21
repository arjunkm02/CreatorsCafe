/* ═══════════════════════════════════════════════════════════
   CREATORS CAFÉ v2 — MAIN.JS
   GSAP + ScrollTrigger motion system
   Motion philosophy: Luxury · Controlled · Intentional
═══════════════════════════════════════════════════════════ */

"use strict";

// ── Wait for GSAP + ScrollTrigger to load ─────────────────
window.addEventListener("load", () => {
  gsap.registerPlugin(ScrollTrigger);

  // ─────────────────────────────────────────────────────────
  // UTILITIES
  // ─────────────────────────────────────────────────────────
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
  const isMobile = () => window.innerWidth < 768;


  // ─────────────────────────────────────────────────────────
  // MAGNETIC BUTTON EFFECT
  // ─────────────────────────────────────────────────────────
  if (!isMobile()) {
    $$(".js-magnetic").forEach((btn) => {
      const strength = 0.35;
      btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = (e.clientX - centerX) * strength;
        const dy = (e.clientY - centerY) * strength;
        gsap.to(btn, { x: dx, y: dy, duration: 0.5, ease: "power3.out" });
      });
      btn.addEventListener("mouseleave", () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.7,
          ease: "elastic.out(1, 0.5)",
        });
      });
    });
  }

  // ─────────────────────────────────────────────────────────
  // 3D TILT ON FEATURE BLOCKS
  // ─────────────────────────────────────────────────────────
  if (!isMobile()) {
    $$(".js-tilt").forEach((card) => {
      const MAX = 5; // max degrees
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const rx = ((e.clientY - rect.top) / rect.height - 0.5) * -MAX * 2;
        const ry = ((e.clientX - rect.left) / rect.width - 0.5) * MAX * 2;
        gsap.to(card, {
          rotateX: rx,
          rotateY: ry,
          transformPerspective: 1000,
          duration: 0.5,
          ease: "power2.out",
        });
      });
      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.8,
          ease: "power3.out",
        });
      });
    });
  }

  // ─────────────────────────────────────────────────────────
  // BUTTON MICRO-INTERACTIONS
  // ─────────────────────────────────────────────────────────
  $$(".btn").forEach((btn) => {
    btn.addEventListener("mouseenter", () =>
      gsap.to(btn, { scale: 1.04, duration: 0.25, ease: "power2.out" }),
    );
    btn.addEventListener("mouseleave", () =>
      gsap.to(btn, { scale: 1, duration: 0.4, ease: "power3.out" }),
    );
    btn.addEventListener("mousedown", () =>
      gsap.to(btn, { scale: 0.97, duration: 0.1, ease: "power2.in" }),
    );
    btn.addEventListener("mouseup", () =>
      gsap.to(btn, { scale: 1.04, duration: 0.15, ease: "power2.out" }),
    );
  });

  // ─────────────────────────────────────────────────────────
  // NAV SCROLL STATE
  // ─────────────────────────────────────────────────────────
  const nav = $("#js-nav");
  ScrollTrigger.create({
    start: "top -60px",
    onToggle: ({ isActive }) => nav.classList.toggle("is-scrolled", isActive),
  });

  // ─────────────────────────────────────────────────────────
  // HERO INTRO MASTER TIMELINE
  // ─────────────────────────────────────────────────────────
  const heroTL = gsap.timeline({
    defaults: { ease: "power4.out" },
    delay: 0.2,
  });

  // 0. Nav elements
  heroTL
    .to(".nav__brand", { opacity: 1, y: 0, duration: 0.8 }, 0)
    .to(".nav__menu", { opacity: 1, y: 0, duration: 0.8 }, 0.1)
    .to(".nav .btn--sm", { opacity: 1, y: 0, duration: 0.8 }, 0.18);

  // 1. Grid fade in
  heroTL.to(".hero__grid", { opacity: 0.4, duration: 1.6 }, 0.1);

  // 2. Eyebrow
  heroTL.to(".hero__eyebrow", { opacity: 1, y: 0, duration: 0.8 }, 0.5);

  // 3. Headline lines — stagger clip-path from bottom
  const hlInners = $$(
    ".js-hero-hl .hero__hl-inner, .js-hero-hl .hero__hl-accent",
  );
  heroTL.to(
    hlInners,
    {
      y: 0,
      duration: 0.9,
      stagger: 0.12,
      ease: "power4.out",
    },
    0.75,
  );

  // 4. Sub text
  heroTL.to(
    ".hero__sub",
    { opacity: 1, y: 0, duration: 0.75, ease: "power3.out" },
    1.4,
  );

  // 5. CTAs
  heroTL.to(
    ".hero__cta",
    { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
    1.6,
  );

  // 6. Stats
  heroTL.to(
    ".hero__stats",
    { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
    1.8,
  );

  // ─────────────────────────────────────────────────────────
  // COUNTER ANIMATION (hero stats)
  // ─────────────────────────────────────────────────────────
  function animateCounter(el) {
    const target = parseInt(el.dataset.count, 10);
    const obj = { val: 0 };
    gsap.to(obj, {
      val: target,
      duration: 1.8,
      ease: "power3.out",
      delay: 1.9,
      onUpdate: () => {
        el.textContent = Math.round(obj.val);
      },
    });
  }
  $$(".hero__stat-num[data-count]").forEach(animateCounter);

  // ─────────────────────────────────────────────────────────
  // SMOOTH SCROLL (anchor links)
  // ─────────────────────────────────────────────────────────
  $$('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const id = link.getAttribute("href").slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });

  // ─────────────────────────────────────────────────────────
  // HERO BACKGROUND PARALLAX
  // ─────────────────────────────────────────────────────────
  gsap.to(".hero__ring--1", {
    yPercent: -20,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 2,
    },
  });
  gsap.to(".hero__ring--2", {
    yPercent: -12,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 1.5,
    },
  });

  // ─────────────────────────────────────────────────────────
  // GENERAL SCROLL REVEAL
  // using ScrollTrigger.batch for performance
  // ─────────────────────────────────────────────────────────
  ScrollTrigger.batch(".js-reveal", {
    start: "top 88%",
    onEnter: (batch) =>
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        duration: 0.85,
        stagger: 0.06,
        ease: "power3.out",
      }),
  });

  ScrollTrigger.batch(".js-reveal-left", {
    start: "top 88%",
    onEnter: (batch) =>
      gsap.to(batch, {
        opacity: 1,
        x: 0,
        duration: 0.85,
        stagger: { each: 0.12, from: "start" },
        ease: "power3.out",
      }),
  });

  // ─────────────────────────────────────────────────────────
  // VISION QUOTE — word-by-word reveal
  // ─────────────────────────────────────────────────────────
  gsap.to(".js-vision-line", {
    opacity: 1,
    y: 0,
    duration: 0.85,
    stagger: 0.18,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".vision__quote",
      start: "top 82%",
    },
  });

  // ─────────────────────────────────────────────────────────
  // HOW IT WORKS — SVG connector line draw
  // ─────────────────────────────────────────────────────────
  const svgLine = $(".how__svg line");
  if (svgLine) {
    const length = 1100;
    svgLine.style.strokeDasharray = `${length}`;
    svgLine.style.strokeDashoffset = `${length}`;
    gsap.to(svgLine, {
      strokeDashoffset: 0,
      duration: 1.6,
      ease: "power3.inOut",
      scrollTrigger: {
        trigger: ".how__flow",
        start: "top 75%",
      },
    });
  }

  // Step badge highlight on scroll
  $$(".how__step").forEach((step, i) => {
    const badge = step.querySelector(".how__step-badge");
    ScrollTrigger.create({
      trigger: step,
      start: "top 70%",
      onEnter: () => {
        gsap.to(badge, {
          borderColor: "var(--purple)",
          duration: 0.5,
          ease: "power2.out",
          delay: i * 0.12,
        });
      },
    });
  });

  // ─────────────────────────────────────────────────────────
  // PRICING — clip-path entry for pro plan
  // ─────────────────────────────────────────────────────────
  gsap.from(".plan--pro", {
    clipPath: "inset(8% 5% 8% 5% round 10px)",
    opacity: 0.3,
    duration: 0.5,
    ease: "power4.out",
    scrollTrigger: {
      trigger: ".pricing__grid",
      start: "top 78%",
    },
  });

  // ─────────────────────────────────────────────────────────
  // PRICING COUNTERS (count up on scroll entry)
  // ─────────────────────────────────────────────────────────
  $$(".js-count").forEach((el) => {
    const target = parseInt(el.dataset.target, 10);
    let triggered = false;
    ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      onEnter: () => {
        if (triggered) return;
        triggered = true;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 1,
          ease: "power3.out",
          onUpdate: () => {
            el.textContent = Math.round(obj.val).toLocaleString("en-IN");
          },
        });
      },
    });
  });

  // ─────────────────────────────────────────────────────────
  // FOOTER RULE REVEAL (scaleX draw)
  // ─────────────────────────────────────────────────────────
  gsap.from(".footer__rule", {
    scaleX: 0,
    transformOrigin: "left center",
    duration: 1.4,
    ease: "power4.inOut",
    scrollTrigger: {
      trigger: ".footer",
      start: "top 90%",
    },
  });

  // ─────────────────────────────────────────────────────────
  // SECTION HORIZONTAL DIVIDERS (fade in)
  // ─────────────────────────────────────────────────────────
  $$(
    ".problem::before, .how::before, .pricing::before, .final-cta::before",
  ).forEach((el) => {
    gsap.from(el, {
      scaleX: 0,
      transformOrigin: "center",
      duration: 1.2,
      ease: "power3.inOut",
      scrollTrigger: { trigger: el, start: "top 95%" },
    });
  });

  // ─────────────────────────────────────────────────────────
  // VISION ORB PARALLAX
  // ─────────────────────────────────────────────────────────
  gsap.to(".vision__orb", {
    yPercent: -30,
    ease: "none",
    scrollTrigger: {
      trigger: ".vision",
      start: "top bottom",
      end: "bottom top",
      scrub: 2,
    },
  });

  // ─────────────────────────────────────────────────────────
  // FINAL CTA WATERMARK PARALLAX
  // ─────────────────────────────────────────────────────────
  gsap.to(".final-cta__watermark", {
    yPercent: -20,
    ease: "none",
    scrollTrigger: {
      trigger: ".final-cta",
      start: "top bottom",
      end: "bottom top",
      scrub: 1.5,
    },
  });

  // ─────────────────────────────────────────────────────────
  // GSAP ScrollTo polyfill (if plugin missing)
  // ─────────────────────────────────────────────────────────
  // If gsap.to(window, { scrollTo }) fails without ScrollToPlugin,
  // fallback to native smooth scroll
  if (typeof ScrollToPlugin === "undefined") {
    $$('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (e) => {
        const id = link.getAttribute("href").slice(1);
        const el = document.getElementById(id);
        if (!el) return;
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  // ─────────────────────────────────────────────────────────
  // REFRESH ScrollTrigger after all images loaded
  // ─────────────────────────────────────────────────────────
  window.addEventListener("load", () => ScrollTrigger.refresh());

  console.log("✦ Creators Café — Motion system active");
}); // end window load
