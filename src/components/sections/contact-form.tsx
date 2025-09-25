"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

const ContactFormSection = () => {
  return (
    <section
      className="relative bg-cover bg-center py-20"
      style={{
        backgroundImage:
          'url("https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9fbcac95-e251-4e02-b45a-e4b7d5d7a542/generated_images/emotional-close-up-photograph-of-two-pro-58699227-20250925103222.jpg?")',
      }}
    >
      <div className="absolute inset-0 bg-black/60" aria-hidden="true"></div>
      <div className="container relative z-10 mx-auto px-4">
        <h2 className="text-center font-display text-4xl font-semibold text-white">
          Мы готовы ответить на ваш вопрос
        </h2>
        <p className="mt-4 text-center font-body text-xl text-white">
          Или заполните заявку:
        </p>

        <form className="mx-auto mt-12 max-w-4xl">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
            <div className="flex flex-col space-y-4">
              <Input
                type="text"
                placeholder="Имя*"
                className="h-14 rounded-lg border-none bg-white p-4 text-primary-text"
              />
              <Input
                type="tel"
                placeholder="Телефон*"
                className="h-14 rounded-lg border-none bg-white p-4 text-primary-text"
              />
              <Input
                type="email"
                placeholder="E-mail*"
                className="h-14 rounded-lg border-none bg-white p-4 text-primary-text"
              />
              <div className="space-y-3 pt-2">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="consent1"
                    className="mt-[3px] shrink-0 rounded-[4px] border-white data-[state=checked]:border-secondary data-[state=checked]:bg-secondary"
                  />
                  <label
                    htmlFor="consent1"
                    className="font-body text-xs text-white"
                  >
                    Я даю{" "}
                    <Link href="#" className="underline hover:no-underline">
                      согласие
                    </Link>{" "}
                    на обработку персональных данных
                  </label>
                </div>
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="consent2"
                    className="mt-[3px] shrink-0 rounded-[4px] border-white data-[state=checked]:border-secondary data-[state=checked]:bg-secondary"
                  />
                  <label
                    htmlFor="consent2"
                    className="font-body text-xs text-white"
                  >
                    Я ознакомлен с{" "}
                    <Link href="#" className="underline hover:no-underline">
                      политикой в отношении обработки персональных данных
                    </Link>
                  </label>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <Textarea
                placeholder="Опишите вашу ситуацию или вопрос"
                className="min-h-[190px] flex-grow rounded-lg border-none bg-white p-4 text-primary-text"
              />
              <Button
                type="submit"
                className="mt-4 h-14 w-full rounded-full bg-secondary text-base font-semibold text-secondary-foreground hover:bg-secondary/90"
              >
                Отправить
              </Button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactFormSection;