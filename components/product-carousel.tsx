"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Heart } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { products } from "@/lib/site-data";

export function ProductCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: false,
  });

  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    const update = () => {
      setCanPrev(emblaApi.canScrollPrev());
      setCanNext(emblaApi.canScrollNext());
      setProgress(Math.max(0, Math.min(1, emblaApi.scrollProgress())));
    };

    update();
    emblaApi.on("select", update);
    emblaApi.on("scroll", update);
    emblaApi.on("reInit", update);
    return () => {
      emblaApi.off("select", update);
      emblaApi.off("scroll", update);
      emblaApi.off("reInit", update);
    };
  }, [emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className="rail">
      <div className="rail__viewport" ref={emblaRef}>
        <div className="rail__container">
          {products.map((product) => (
            <article className="product-card" key={product.name}>
              <div className="product-card__image-wrap">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 560px) 78vw, (max-width: 1024px) 42vw, 24vw"
                />
                <span className="product-card__tag">{product.tag}</span>
                <button
                  type="button"
                  className="product-card__heart"
                  aria-label={`Save ${product.name}`}
                >
                  <Heart size={17} strokeWidth={1.45} />
                </button>
                <span className="product-card__peek">
                  Quick look <ArrowUpRight size={15} />
                </span>
              </div>

              <div className="product-card__info">
                <div className="product-card__meta">
                  <h3>{product.name}</h3>
                  <p>{product.type}</p>
                </div>
                <div className="product-card__price">
                  <span
                    className="product-card__swatch"
                    style={{ backgroundColor: product.color }}
                  />
                  <span>
                    {product.price}
                    {product.was && <del>{product.was}</del>}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="rail__controls">
        <div className="rail__progress" aria-hidden>
          <motion.span
            className="rail__progress-fill"
            style={{ transform: `scaleX(${Math.max(progress, 0.08)})` }}
          />
        </div>

        <div className="rail__arrows">
          <button
            type="button"
            onClick={scrollPrev}
            disabled={!canPrev}
            aria-label="Previous products"
          >
            <ArrowLeft size={17} strokeWidth={1.6} />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            disabled={!canNext}
            aria-label="Next products"
          >
            <ArrowRight size={17} strokeWidth={1.6} />
          </button>
        </div>
      </div>
    </div>
  );
}
