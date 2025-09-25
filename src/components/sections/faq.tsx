"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Plus, Minus } from "lucide-react";

const faqItems = [
  {
    value: "item-1",
    question: "Как оформить наследство через суд",
    answer: "Оформление наследства через суд требует подачи искового заявления в течение 6 месяцев со дня смерти наследодателя. Необходимы документы, подтверждающие родство и права на наследство. Обратитесь за консультацией к адвокату.",
  },
  {
    value: "item-2",
    question: "Что делать при разводе с разделом имущества",
    answer: "При разводе имущество, нажитое в браке, делится поровну. Если есть споры, суд учитывает интересы детей и вклад каждого супруга. Рекомендуется предварительная нотариальная договоренность или судебный иск.",
  },
  {
    value: "item-3",
    question: "Как защитить права потребителя",
    answer: "Защита прав потребителей включает возврат товара, компенсацию ущерба и штрафы. Обращайтесь в Роспотребнадзор или суд с чеком и договором. Адвокат поможет собрать доказательства.",
  },
  {
    value: "item-4",
    question: "Условно-досрочное освобождение: условия",
    answer: "УДО возможно после отбытия не менее половины срока для мягких преступлений. Необходимо положительное характеристика и отсутствие нарушений. Заявление подается в суд через адвоката.",
  },
];

export default function Faq() {
  return (
    <section className="bg-background py-20">
      <div className="container mx-auto max-w-[1200px] px-5">
        <h2 className="text-center font-display text-4xl font-semibold text-primary-text mb-12">
          Часто задаваемые вопросы
        </h2>
        <Accordion type="single" collapsible className="w-full max-w-4xl mx-auto space-y-4">
          {faqItems.map((item) => (
            <AccordionItem
              key={item.value}
              value={item.value}
              className="border border-primary rounded-lg bg-transparent"
            >
              <AccordionTrigger className="group flex w-full items-center justify-between p-6 text-left hover:no-underline [&>svg]:hidden">
                <div className="flex flex-1 items-center gap-6">
                  <div className="relative h-6 w-6 flex-shrink-0">
                    <Plus className="h-6 w-6 text-secondary absolute transition-opacity duration-300 group-data-[state=open]:opacity-0" />
                    <Minus className="absolute top-0 left-0 h-6 w-6 text-secondary opacity-0 transition-opacity duration-300 group-data-[state=open]:opacity-100" />
                  </div>
                  <span className="text-lg font-normal text-primary-text">
                    {item.question}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground pt-0 pb-6 pr-6 pl-[72px]">
                <p>{item.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}