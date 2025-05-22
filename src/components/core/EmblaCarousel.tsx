/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";

interface EmblaCarouselProps {
  CardComponent: React.ComponentType<any>;
  items: any[];
  autoplay?: boolean;
  visibleSlides?: number;
}

const EmblaCarousel: React.FC<EmblaCarouselProps> = ({
  CardComponent,
  items,
  autoplay = true,
  visibleSlides = 1,
}) => {
  const carouselOptions: EmblaOptionsType = {
    loop: true,
    align: "start",
    containScroll: "trimSnaps",
    dragFree: true,
  };

  const plugins = autoplay
    ? [AutoScroll({ playOnInit: true, stopOnInteraction: false, speed: 0.5 })]
    : [];

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [emblaRef, emblaApi] = useEmblaCarousel(carouselOptions, plugins);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    const onResize = () => setScrollSnaps(emblaApi.scrollSnapList());

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("reInit", onResize);
    emblaApi.on("resize", onResize);

    onSelect();
    onResize();

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
      emblaApi.off("reInit", onResize);
      emblaApi.off("resize", onResize);
    };
  }, [emblaApi]);

  const scrollTo = (index: number) => {
    if (!emblaApi) return;
    emblaApi.scrollTo(index);
  };

  return (
    <div className="relative">
      {/* Embla Viewport */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex ml-0">
          {items.map((item, index) => (
            <div
              key={index}
              className="px-4 md:px-8 py-8"
              style={{ flex: `0 0 ${100 / visibleSlides}%` }}
            >
              <CardComponent {...item} />
            </div>
          ))}
        </div>
      </div>

      {/* Dots Navigation */}
      <div className="flex justify-center mt-4 gap-2">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === selectedIndex
                ? "bg-primary"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            onClick={() => scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default EmblaCarousel;
