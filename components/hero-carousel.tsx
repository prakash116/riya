"use client";

import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import useEmblaCarousel from "embla-carousel-react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { heroSlides } from "@/lib/site-data";
import { Magnetic, TextReveal } from "@/components/motion-primitives";

const AUTOPLAY_MS = 6200;
const EASE = [0.22, 1, 0.36, 1] as const;

export function HeroCarousel() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [selected, setSelected] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 32 }, [
    Fade(),
    Autoplay({
      delay: AUTOPLAY_MS,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
  ]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? ["0%", "0%"] : ["0%", "12%"],
  );
  const copyY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [0, 58],
  );

  const slide = heroSlides[selected];

  return (
    <section ref={sectionRef} id="top" className="hero">
      <motion.div className="hero__copy" style={{ y: copyY }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            className="hero__copy-inner"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.45 }}
          >
            <motion.p
              className="eyebrow hero__eyebrow"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              {slide.eyebrow}
            </motion.p>

            <h1 className="hero__title">
              <span className="hero__title-line">
                <TextReveal text={slide.titleTop} play="mount" delay={0.05} />
              </span>
              <span className="hero__title-line hero__title-script">
                <TextReveal text={slide.titleScript} play="mount" delay={0.16} />
              </span>
            </h1>

            <motion.p
              className="hero__description"
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.34, duration: 0.65 }}
            >
              {slide.description}
            </motion.p>
          </motion.div>
        </AnimatePresence>

        <motion.div
          className="hero__cta-row"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          <Magnetic>
            <a href="#new-arrivals" className="button button--primary">
              Explore new arrivals
              <ArrowUpRight size={17} strokeWidth={1.7} />
            </a>
          </Magnetic>
          <a href="#collections" className="text-link">
            Shop the edit <ArrowRight size={16} strokeWidth={1.5} />
          </a>
        </motion.div>

        <div className="hero__controls">
          <div className="hero__arrows">
            <button type="button" onClick={scrollPrev} aria-label="Previous slide">
              <ArrowLeft size={16} strokeWidth={1.6} />
            </button>
            <button type="button" onClick={scrollNext} aria-label="Next slide">
              <ArrowRight size={16} strokeWidth={1.6} />
            </button>
          </div>

          <div className="hero__dots" role="tablist" aria-label="Hero slides">
            {heroSlides.map((item, index) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={index === selected}
                aria-label={`Go to slide ${index + 1}`}
                className={`hero__dot ${index === selected ? "is-active" : ""}`}
                onClick={() => scrollTo(index)}
              >
                <span className="hero__dot-rail">
                  {index === selected && (
                    <motion.span
                      className="hero__dot-fill"
                      key={`fill-${selected}`}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{
                        duration: reduceMotion ? 0 : AUTOPLAY_MS / 1000,
                        ease: "linear",
                      }}
                    />
                  )}
                </span>
              </button>
            ))}
          </div>

          <span className="hero__count">
            <strong>0{selected + 1}</strong> / 0{heroSlides.length}
          </span>
        </div>
      </motion.div>

      <div className="hero__visual-wrap">
        <motion.div
          className="hero__visual"
          initial={reduceMotion ? false : { clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 1.15, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="hero__embla" ref={emblaRef}>
            <div className="hero__embla-container">
              {heroSlides.map((item, index) => (
                <div className="hero__embla-slide" key={item.id}>
                  <motion.div className="hero__image" style={{ y: imageY }}>
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      priority={index === 0}
                      sizes="(max-width: 860px) 100vw, 56vw"
                      style={{ objectPosition: item.focus }}
                    />
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
          <div className="hero__image-shade" />

          <AnimatePresence mode="wait">
            <motion.span
              key={slide.id}
              className="hero__chip"
              initial={reduceMotion ? false : { y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={reduceMotion ? undefined : { y: -16, opacity: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              {slide.eyebrow}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        <motion.div
          className="hero__badge"
          initial={reduceMotion ? false : { scale: 0, rotate: -18 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.8, duration: 0.65, type: "spring", bounce: 0.25 }}
        >
          <Sparkles size={19} strokeWidth={1.35} />
          <span>Your all day</span>
          <em>fashion hub</em>
        </motion.div>

        <a className="hero__scroll" href="#collections">
          <span>Scroll to discover</span>
          <ArrowDown size={16} strokeWidth={1.4} />
        </a>
      </div>
    </section>
  );
}
