"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Мария С.",
    review: "Адвокат Иванов помог с разводом и разделом имущества. Профессионально и оперативно. Рекомендую!",
    link: "/otzyvy/mariya-s"
  },
  {
    name: "Алексей К.",
    review: "Успешно оформили наследство через суд. Большое спасибо за компетентную помощь.",
    link: "/otzyvy/aleksei-k"
  },
  {
    name: "Ольга П.",
    review: "Защита прав потребителя от недобросовестного продавца. Дело выиграно.",
    link: "/otzyvy/olga-p"
  },
  {
    name: "Дмитрий В.",
    review: "Помощь в административном деле. Квалифицированная защита, результат превзошел ожидания.",
    link: "/otzyvy/dmitrii-v"
  }
];

export default function ClientReviews() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  const scrollPrev = React.useCallback(() => api?.scrollPrev(), [api]);
  const scrollNext = React.useCallback(() => api?.scrollNext(), [api]);
  const scrollTo = React.useCallback((index: number) => api?.scrollTo(index), [api]);

  React.useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    const onReInit = () => {
      setCount(api.scrollSnapList().length);
      setCurrent(api.selectedScrollSnap());
    }
    
    onReInit();
    api.on("select", onSelect);
    api.on("reInit", onReInit);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onReInit)
    };
  }, [api]);

  return (
    <section className="bg-background py-20">
      <div className="container mx-auto px-5">
        <div className="flex justify-between items-center mb-12">
          <h2 className="font-display text-[36px] leading-[1.3] font-semibold text-primary-text">
            Отзывы клиентов
          </h2>
          <div className="flex items-center gap-x-3">
            <button
              onClick={scrollPrev}
              className="w-12 h-12 rounded-full bg-gray-200/70 hover:bg-gray-300 flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous testimonial"
              disabled={current === 0}
            >
              <ChevronLeft className="w-6 h-6 text-primary-text" />
            </button>
            <button
              onClick={scrollNext}
              className="w-12 h-12 rounded-full bg-gray-200/70 hover:bg-gray-300 flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next testimonial"
              disabled={current === count - 1}
            >
              <ChevronRight className="w-6 h-6 text-primary-text" />
            </button>
          </div>
        </div>

        <Carousel setApi={setApi} opts={{ align: "start", slidesToScroll: 1 }} className="w-full">
          <CarouselContent className="-ml-6">
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="pl-6 basis-full md:basis-1/2">
                <Card className="bg-card rounded-xl border border-border h-full">
                  <CardContent className="p-8 flex flex-col justify-between h-full">
                    <div>
                      <h3 className="font-display text-2xl font-semibold text-card-foreground text-center mb-6">
                        {testimonial.name}
                      </h3>
                      <div className="border border-border rounded-lg p-6 w-full mb-6">
                        <p className="text-card-foreground text-base font-body leading-relaxed line-clamp-[9] text-left h-[240px]">
                          {testimonial.review}
                        </p>
                      </div>
                    </div>
                    <div className="text-center">
                      <a
                        href={testimonial.link}
                        className="inline-flex items-center justify-center rounded-full bg-secondary text-secondary-foreground h-12 px-8 text-base font-semibold font-body transition-colors hover:bg-secondary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        Подробнее
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="flex justify-center items-center gap-2 mt-10">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`h-2.5 w-2.5 rounded-full transition-colors ${
                current === index ? 'bg-primary-text' : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}