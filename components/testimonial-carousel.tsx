"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { testimonials } from "@/lib/site-data";

export function TestimonialCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { align: "start", loop: true, containScroll: false },
    [Autoplay({ delay: 5200, stopOnInteraction: false, stopOnMouseEnter: true })],
  );

  const [selected, setSelected] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);

  useEffect(() => {
    if (!emblaApi) return;
    const update = () => {
      setSelected(emblaApi.selectedScrollSnap());
      setSnaps(emblaApi.scrollSnapList());
    };
    update();
    emblaApi.on("select", update);
    emblaApi.on("reInit", update);
    return () => {
      emblaApi.off("select", update);
      emblaApi.off("reInit", update);
    };
  }, [emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className="quotes">
      <div className="quotes__viewport" ref={emblaRef}>
        <div className="quotes__container">
          {testimonials.map((item) => (
            <figure className="quote-card" key={item.name}>
              <Quote size={26} strokeWidth={1.3} className="quote-card__mark" />
              <blockquote>{item.quote}</blockquote>
              <figcaption>
                <strong>{item.name}</strong>
                <span>
                  {item.location} · {item.detail}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div className="quotes__controls">
        <div className="quotes__dots">
          {snaps.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to review ${index + 1}`}
              aria-current={index === selected}
              className={index === selected ? "is-active" : ""}
              onClick={() => emblaApi?.scrollTo(index)}
            />
          ))}
        </div>

        <div className="rail__arrows rail__arrows--light">
          <button type="button" onClick={scrollPrev} aria-label="Previous review">
            <ArrowLeft size={17} strokeWidth={1.6} />
          </button>
          <button type="button" onClick={scrollNext} aria-label="Next review">
            <ArrowRight size={17} strokeWidth={1.6} />
          </button>
        </div>
      </div>
    </div>
  );
}
