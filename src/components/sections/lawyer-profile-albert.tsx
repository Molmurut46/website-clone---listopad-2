import Image from "next/image";
import Link from "next/link";

const LawyerProfileAlbert = () => {
  const biographyItems = [
    '<p><b class="font-semibold">С 2000 года</b> юридический стаж.</p>',
    '<p><b class="font-semibold">До 2005 года</b> работал в правоохранительных органах.</p>',
    '<p><b class="font-semibold">С 2005 по 2011 год</b> работал в Прокуратуре Курской области.</p>',
    '<p><b class="font-semibold">В 2012 году</b> после сдачи квалификационного экзамена присвоен статус адвоката.</p>',
    '<p><b class="font-semibold">В настоящее время</b> осуществляет деятельность индивидуально в адвокатском кабинете, член Адвокатской палаты Курской области, № 46/816.</p>',
    '<p><b class="font-semibold">Специализация:</b> Гражданские дела (семейные, жилищные, земельные споры, оформление наследства, защита прав потребителей); Ведение административных, уголовных дел. УДО, замена по ст.80 УК РФ.</p>',
    '<p className="text-xs text-muted-foreground">Адреса: 307200, Курская обл., Октябрьский р-н, п. Прямицыно, ул. Октябрьская, 120Б / 307251, Курская обл., г. Курчатов, ул. Ленинградская, 31. Прием по предварительной записи.</p>',
  ];

  return (
    <section className="bg-muted py-20">
      <div className="container">
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground text-center mb-12 lg:mb-16">
          <Link
            href="/advokaty/ivanov-aleksei-ivanovich"
            className="hover:text-primary transition-colors duration-300"
          >
            Адвокат Иванов Алексей Иванович
          </Link>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-7">
            <div className="relative p-8 md:p-10">
              <div
                className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-primary"
                aria-hidden="true"
              />
              <div
                className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-primary"
                aria-hidden="true"
              />
              <div className="space-y-4 font-body text-base text-foreground leading-relaxed">
                {biographyItems.map((item, index) => (
                  <div key={index} dangerouslySetInnerHTML={{ __html: item }} />
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col items-center text-center">
            <div className="w-full max-w-sm mx-auto">
              <Image
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9fbcac95-e251-4e02-b45a-e4b7d5d7a542/generated_images/professional-headshot-portrait-of-a-midd-4cd62cf7-20250925103139.jpg?"
                alt="Адвокат Иванов Алексей Иванович"
                width={380}
                height={480}
                className="rounded-xl shadow-lg object-cover w-full"
              />
            </div>
            <div className="mt-8 space-y-4 w-full">
              <div className="flex items-center justify-center gap-3">
                <a
                  href="tel:+79103128800"
                  className="font-semibold text-xl text-foreground hover:text-primary transition-colors"
                >
                  +7 (910) 312-88-00
                </a>
              </div>
              <a
                href="mailto:89103128800@mail.ru"
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                89103128800@mail.ru
              </a>
              <div className="pt-2">
                <a
                  href="#popup"
                  className="inline-block bg-primary text-primary-foreground font-semibold px-10 py-3 rounded-full hover:opacity-90 transition-opacity text-base"
                >
                  Задать вопрос
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LawyerProfileAlbert;