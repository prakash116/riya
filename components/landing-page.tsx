"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import {
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Instagram,
  Sparkles,
} from "lucide-react";
import { useRef, useState } from "react";
import { HeroCarousel } from "@/components/hero-carousel";
import { ProductCarousel } from "@/components/product-carousel";
import { SiteHeader, Wordmark } from "@/components/site-header";
import { TestimonialCarousel } from "@/components/testimonial-carousel";
import {
  Counter,
  Magnetic,
  Marquee,
  Reveal,
  TextReveal,
} from "@/components/motion-primitives";
import { collections, imagePath, lookbook, promises, stats } from "@/lib/site-data";

function BackToTop() {
  const [visible, setVisible] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => setVisible(latest > 900));

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="#top"
          className="back-to-top"
          aria-label="Back to top"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.3 }}
        >
          <ArrowUp size={18} strokeWidth={1.7} />
        </motion.a>
      )}
    </AnimatePresence>
  );
}

export function LandingPage() {
  const reduceMotion = useReducedMotion();
  // Observe the *unclipped* column, not the clipped image itself: Chrome
  // applies an element's own clip-path when computing intersection, so a
  // fully clipped element reports ratio 0 forever and could never reveal.
  const storyColumnRef = useRef<HTMLDivElement>(null);
  const storyInView = useInView(storyColumnRef, { once: true, amount: 0.2 });

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <SiteHeader />

      <main id="main-content" tabIndex={-1}>
        <HeroCarousel />

        <div className="ticker" aria-label="Riya Closet highlights">
          <Marquee speed={30}>
            {[
              "Everyday ease",
              "Celebration ready",
              "Made for real plans",
              "Fresh drops weekly",
            ].map((label) => (
              <span className="ticker__item" key={label}>
                {label}
                <Sparkles size={15} />
              </span>
            ))}
          </Marquee>
        </div>

        <section id="collections" className="section collections-section">
          <Reveal className="section-heading section-heading--split">
            <div>
              <p className="eyebrow">Curated for every mood</p>
              <h2>
                <TextReveal text="Find your" />{" "}
                <em>
                  <TextReveal text="kind of beautiful." delay={0.12} />
                </em>
              </h2>
            </div>
            <p className="section-heading__copy">
              From soft everyday separates to the outfits that make an entrance—
              there is a Riya look for every version of the day.
            </p>
          </Reveal>

          <div className="collections-grid">
            {collections.map((item, index) => (
              <Reveal
                className={`collection-card ${item.className}`}
                delay={index * 0.1}
                key={item.title}
              >
                <a href="#new-arrivals" className="collection-card__link">
                  <div className="collection-card__image">
                    <Image
                      src={item.image}
                      alt={`${item.title} from Riya Closet`}
                      fill
                      sizes="(max-width: 860px) 100vw, 55vw"
                    />
                  </div>
                  <div className="collection-card__wash" />
                  <span className="collection-card__number">{item.number}</span>
                  <div className="collection-card__content">
                    <p>{item.note}</p>
                    <h3>{item.title}</h3>
                    <small>{item.count}</small>
                  </div>
                  <span className="collection-card__arrow" aria-hidden>
                    <ArrowUpRight size={20} strokeWidth={1.5} />
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="new-arrivals" className="section arrivals-section">
          <Reveal className="section-heading arrivals-heading">
            <div>
              <p className="eyebrow">Just landed</p>
              <h2>
                <TextReveal text="The" />{" "}
                <em>
                  <TextReveal text="new mood" delay={0.1} />
                </em>
              </h2>
            </div>
            <a href="#collections" className="text-link text-link--line">
              View the full edit <ArrowRight size={16} strokeWidth={1.5} />
            </a>
          </Reveal>

          <Reveal delay={0.1}>
            <ProductCarousel />
          </Reveal>
        </section>

        <section id="story" className="story-section">
          <div className="story-section__image-column" ref={storyColumnRef}>
            <motion.div
              className="story-section__image"
              initial={reduceMotion ? false : { clipPath: "inset(0 0 0 100%)" }}
              animate={
                storyInView || reduceMotion
                  ? { clipPath: "inset(0 0 0 0%)" }
                  : undefined
              }
              transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            >
              <Image
                src={imagePath("/images/look-one.png")}
                alt="Riya Closet campaign look outside the boutique"
                fill
                sizes="(max-width: 960px) 100vw, 50vw"
              />
            </motion.div>
            <div className="story-section__stamp">
              <span>RC</span>
              <small>Style with a story</small>
            </div>
          </div>

          <Reveal className="story-section__content">
            <p className="eyebrow eyebrow--light">The Riya way</p>
            <h2>
              Made for more than <em>one kind of day.</em>
            </h2>
            <p className="story-section__lead">
              Clothes should keep up with you—and still make the ordinary feel a
              little special. That is the heart of every Riya edit.
            </p>

            <div className="story-section__stats">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <strong>
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>

            <Magnetic>
              <a href="#collections" className="button button--light">
                Discover our world <ArrowUpRight size={17} strokeWidth={1.7} />
              </a>
            </Magnetic>
          </Reveal>
        </section>

        <section id="loved" className="section quotes-section">
          <Reveal className="section-heading section-heading--split">
            <div>
              <p className="eyebrow">Loved by you</p>
              <h2>
                <TextReveal text="Worn, tagged," />{" "}
                <em>
                  <TextReveal text="repeated." delay={0.12} />
                </em>
              </h2>
            </div>
            <p className="section-heading__copy">
              A few notes from the people who wear Riya on their best days—and
              their most ordinary ones.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <TestimonialCarousel />
          </Reveal>
        </section>

        <section className="promise-section">
          {promises.map((item, index) => (
            <Reveal className="promise-card" delay={index * 0.08} key={item.title}>
              <span>{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </Reveal>
          ))}
        </section>

        <section className="lookbook" aria-label="Lookbook">
          <Marquee speed={44} className="lookbook__marquee">
            {lookbook.map((item) => (
              <span className="lookbook__item" key={item.image + item.alt}>
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 760px) 46vw, 22vw"
                />
              </span>
            ))}
          </Marquee>
          <a
            className="lookbook__badge"
            href="#footer"
            aria-label="Follow Riya Closet on Instagram"
          >
            <Instagram size={17} strokeWidth={1.5} />
            @riyacloset
          </a>
        </section>

        <section className="closing-section">
          <Reveal className="closing-section__inner">
            <Sparkles className="closing-section__spark" strokeWidth={1.25} />
            <p className="eyebrow">See it first, wear it your way</p>
            <h2>
              Your closet called. It wants <em>something new.</em>
            </h2>

            <form className="signup" onSubmit={(event) => event.preventDefault()}>
              <label className="sr-only" htmlFor="signup-email">
                Email address
              </label>
              <input
                id="signup-email"
                type="email"
                inputMode="email"
                placeholder="Your email address"
                required
              />
              <button type="submit">
                Join the list <ArrowUpRight size={16} strokeWidth={1.7} />
              </button>
            </form>
            <p className="signup__note">
              Early access to drops. No spam, unsubscribe any time.
            </p>
          </Reveal>
        </section>
      </main>

      <footer id="footer" className="site-footer">
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <Wordmark light />
            <p>Your all day fashion hub.</p>
          </div>
          <div className="site-footer__links">
            <div>
              <p>Explore</p>
              <a href="#new-arrivals">New in</a>
              <a href="#collections">Suit sets</a>
              <a href="#collections">Co-ords</a>
              <a href="#collections">Occasion wear</a>
            </div>
            <div>
              <p>About</p>
              <a href="#story">Our world</a>
              <a href="#loved">Reviews</a>
              <a href="#footer">Shipping</a>
              <a href="#footer">Size guide</a>
            </div>
          </div>
          <div className="site-footer__social">
            <p>Follow the daily edit</p>
            <a href="#top" aria-label="Instagram">
              <Instagram size={19} strokeWidth={1.45} /> Instagram
            </a>
          </div>
        </div>
        <div className="site-footer__bottom">
          <span>© 2026 Riya Closet India</span>
          <span>Concept landing page</span>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>

      <BackToTop />
    </div>
  );
}
