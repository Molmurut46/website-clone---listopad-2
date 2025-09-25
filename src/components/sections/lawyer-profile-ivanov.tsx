"use client";

import React from "react";
import Link from "next/link";

const LawyerProfileIvanov = () => {
  const biographyItems = [
    '<p><b class="font-semibold">Юридический стаж с 2000 года.</b> Работал до 2005 в правоохранительных органах.</p>',
    '<p><b class="font-semibold">С 2005 по 2011 год</b> работал в Прокуратуре Курской области.</p>',
    '<p><b class="font-semibold">В 2012 году</b> после сдачи квалификационного экзамена присвоен статус адвоката. Член Адвокатской палаты Курской области, № 46/816.</p>',
    '<p><b class="font-semibold">Специализируется</b> на гражданских делах: семейные, жилищные, земельные споры, оформление наследства, защита прав потребителей. Ведение административных, уголовных дел. УДО, замена по ст.80 УК РФ.</p>',
  ];

  return (
    <section className="bg-muted py-20">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground text-center mb-12 lg:mb-16">
            <Link
              href="/advokaty/ivanov-aleksei-ivanovich"
              className="hover:text-primary transition-colors duration-300"
            >
              Адвокат Иванов Алексей Иванович
            </Link>
          </h2>

          <div className="relative p-8 md:p-10">
            <div
              className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-primary"
              aria-hidden="true"
            />
            <div
              className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-primary"
              aria-hidden="true"
            />
            <div className="space-y-4 font-body text-base text-foreground leading-relaxed text-center">
              {biographyItems.map((item, index) => (
                <div key={index} dangerouslySetInnerHTML={{ __html: item }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LawyerProfileIvanov;