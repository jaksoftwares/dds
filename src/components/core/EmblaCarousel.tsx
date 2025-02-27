"use client";
import React, { useEffect, useState } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { Button } from "../ui/button";

const carouselOptions: EmblaOptionsType = { loop: true, dragFree: true };

interface EmblaCarouselProps {
  CardComponent: React.ComponentType<any>;
  items: any[];
}

const EmblaCarousel: React.FC<EmblaCarouselProps> = ({
  CardComponent,
  items,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const [emblaRef, emblaApi] = useEmblaCarousel(carouselOptions, [
    AutoScroll({
      playOnInit: true,
      stopOnFocusIn: true,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
      speed: 0.5,
    }),
  ]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    const onResize = () => {
      setScrollSnaps(emblaApi.scrollSnapList());
    };

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

    const autoScroll = emblaApi.plugins()?.autoScroll;
    if (autoScroll) {
      autoScroll.stop();
      setTimeout(() => autoScroll.play(), 5000);
    }
  };

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y ml-0">
          {items &&
            items.length > 0 &&
            items.map((item, index) => (
              <div key={index} className="flex-[0_0_33%] min-w-0 pl-4 md:pl-8 py-8">
                <CardComponent {...item} />
              </div>
            ))}
        </div>
      </div>

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
