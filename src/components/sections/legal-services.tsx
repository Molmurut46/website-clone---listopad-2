"use client";

import * as React from "react";
import Image from "next/image";
import { type CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const services = [
  {
    title: "Семейные споры",
    href: "/uridicheskie-uslugi/semeinie-spori",
    imgSrc: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9fbcac95-e251-4e02-b45a-e4b7d5d7a542/generated_images/warm-professional-photograph-of-a-family-750235fe-20250925103120.jpg?",
    alt: "Семейные споры",
  },
  {
    title: "Жилищные споры",
    href: "/uridicheskie-uslugi/zhilischnie-spori",
    imgSrc: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9fbcac95-e251-4e02-b45a-e4b7d5d7a542/generated_images/professional-business-photograph-of-dive-f07bf385-20250925103112.jpg?",
    alt: "Жилищные споры",
  },
  {
    title: "Земельные споры",
    href: "/uridicheskie-uslugi/zemelnie-spori",
    imgSrc: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9fbcac95-e251-4e02-b45a-e4b7d5d7a542/generated_images/professional-photograph-of-clients-revie-bf46114b-20250925103130.jpg?",
    alt: "Земельные споры",
  },
  {
    title: "Оформление наследства",
    href: "/uridicheskie-uslugi/oformlenie-nasledstva",
    imgSrc: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9fbcac95-e251-4e02-b45a-e4b7d5d7a542/generated_images/professional-photograph-of-clients-revie-bf46114b-20250925103130.jpg?",
    alt: "Оформление наследства",
  },
  {
    title: "Защита прав потребителей",
    href: "/uridicheskie-uslugi/zachita-prav-potrebitelei",
    imgSrc: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9fbcac95-e251-4e02-b45a-e4b7d5d7a542/generated_images/professional-photograph-of-clients-revie-bf46114b-20250925103130.jpg?",
    alt: "Защита прав потребителей",
  },
  {
    title: "Административные дела",
    href: "/uridicheskie-uslugi/administrativnie-dela",
    imgSrc: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9fbcac95-e251-4e02-b45a-e4b7d5d7a542/generated_images/professional-photograph-of-clients-revie-bf46114b-20250925103130.jpg?",
    alt: "Административные дела",
  },
  {
    title: "Уголовные дела",
    href: "/uridicheskie-uslugi/ugolovnie-dela",
    imgSrc: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9fbcac95-e251-4e02-b45a-e4b7d5d7a542/generated_images/professional-photograph-of-clients-revie-bf46114b-20250925103130.jpg?",
    alt: "Уголовные дела",
  },
  {
    title: "Условно-досрочное освобождение",
    href: "/uridicheskie-uslugi/udo",
    imgSrc: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9fbcac95-e251-4e02-b45a-e4b7d5d7a542/generated_images/professional-photograph-of-clients-revie-bf46114b-20250925103130.jpg?",
    alt: "Условно-досрочное освобождение",
  },
];

const ServiceCard = ({ service }: { service: (typeof services)[0] }) => (
  <a href={service.href} className="block group">
    <div className="overflow-hidden rounded-l-2xl rounded-tr-[50px] rounded-br-[50px]">
      <Image
        src={service.imgSrc}
        alt={service.alt}
        width={380}
        height={253}
        className="object-cover w-full h-full transform transition-transform duration-300 group-hover:scale-105"
      />
    </div>
    <div className="mt-8">
      <h3 className="font-display text-[22px] text-primary-text leading-tight group-hover:text-primary transition-colors duration-300">
        {service.title}
      </h3>
      <div className="mt-4 w-[70px] h-[3px] bg-primary"></div>
    </div>
  </a>
);

const LegalServices = () => {
  const [api, setApi] = React.useState<CarouselApi>();

  return (
    <section className="bg-background py-20">
      <div className="container mx-auto px-5 max-w-[1200px]">
        <div className="flex justify-between items-center mb-16">
          <div className="flex gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full h-12 w-12 bg-gray-100 hover:bg-gray-200"
              onClick={() => api?.scrollPrev()}
            >
              <ChevronLeft className="h-6 w-6 text-gray-400" />
              <span className="sr-only">Previous slide</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full h-12 w-12 bg-gray-100 hover:bg-gray-200"
              onClick={() => api?.scrollNext()}
            >
              <ChevronRight className="h-6 w-6 text-gray-400" />
              <span className="sr-only">Next slide</span>
            </Button>
          </div>
        </div>

        <Carousel setApi={setApi} opts={{ align: "start", loop: true }} className="w-full">
          <CarouselContent className="-ml-6">
            {services.map((service, index) => (
              <CarouselItem
                key={index}
                className="pl-6 basis-full md:basis-1/2 lg:basis-1/3"
              >
                <ServiceCard service={service} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default LegalServices;