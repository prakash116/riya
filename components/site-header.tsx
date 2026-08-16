"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { Heart, Menu, Search, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";
import { announcements, navLinks } from "@/lib/site-data";

export function Wordmark({ light = false }: { light?: boolean }) {
  return (
    <span className={`wordmark ${light ? "wordmark--light" : ""}`}>
      <span className="wordmark__riya">RIYA</span>
      <span className="wordmark__closet">CLOSET</span>
    </span>
  );
}

function AnnouncementBar() {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(
      () => setIndex((current) => (current + 1) % announcements.length),
      4200,
    );
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  return (
    <div className="announcement">
      <span className="announcement__side">Worldwide shipping</span>
      <span className="announcement__center">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={index}
            initial={reduceMotion ? false : { y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduceMotion ? undefined : { y: "-100%", opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {announcements[index]}
          </motion.span>
        </AnimatePresence>
      </span>
      <span className="announcement__side announcement__side--end">
        3 day size exchange
      </span>
    </div>
  );
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 40);
  });

  // Stop the page behind the drawer from scrolling while it is open.
  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <>
      <AnnouncementBar />

      <header className={`site-header ${scrolled ? "site-header--pinned" : ""}`}>
        <div className="site-header__inner">
          <button
            type="button"
            className="menu-toggle"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={20} strokeWidth={1.6} />
          </button>

          <a href="#top" aria-label="Riya Closet home" className="site-header__logo">
            <Wordmark />
          </a>

          <nav className="desktop-nav" aria-label="Primary navigation">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href}>
                <span>{link.label}</span>
              </a>
            ))}
          </nav>

          <div className="header-actions" aria-label="Store shortcuts">
            <a href="#new-arrivals" aria-label="Search the store">
              <Search size={18} strokeWidth={1.6} />
            </a>
            <a href="#new-arrivals" aria-label="Saved items">
              <Heart size={18} strokeWidth={1.6} />
            </a>
            <a className="bag-link" href="#new-arrivals" aria-label="Shopping bag">
              <ShoppingBag size={18} strokeWidth={1.6} />
              <span>0</span>
            </a>
          </div>
        </div>

        <motion.span
          className="site-header__progress"
          style={{ scaleX: scrollYProgress }}
        />
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="mobile-menu__bar">
              <Wordmark light />
              <button
                type="button"
                className="menu-toggle menu-toggle--close"
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
              >
                <X size={22} strokeWidth={1.6} />
              </button>
            </div>

            <nav
              id="mobile-navigation"
              className="mobile-menu__nav"
              aria-label="Mobile navigation"
            >
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ y: 34, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: 0.18 + index * 0.07,
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <em>0{index + 1}</em>
                  {link.label}
                </motion.a>
              ))}
            </nav>

            <motion.div
              className="mobile-menu__foot"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.5 }}
            >
              <p>Your all day fashion hub.</p>
              <a href="#footer" onClick={() => setMenuOpen(false)}>
                Visit the store →
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
