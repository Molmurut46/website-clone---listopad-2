import Image from "next/image";
import Link from "next/link";

const cases = [
  {
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9fbcac95-e251-4e02-b45a-e4b7d5d7a542/generated_images/dramatic-high-quality-photograph-of-lady-fecb334e-20250925103155.jpg?",
    description: "В Арбитражном суде Курской области удовлетворены исковые требования по семейному спору о разделе имущества супругов.",
    alt: "Статуя богини правосудия Фемиды с весами",
    href: "/praktika/semeinyi-spor"
  },
  {
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9fbcac95-e251-4e02-b45a-e4b7d5d7a542/generated_images/close-up-professional-photograph-of-a-br-5fe5025d-20250925103203.jpg?",
    description: "Успешное оформление наследства через суд в Курском областном суде.",
    alt: "Бронзовая статуэтка Фемиды на фоне книг",
    href: "/praktika/nasledstvo"
  },
  {
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9fbcac95-e251-4e02-b45a-e4b7d5d7a542/generated_images/majestic-photograph-of-lady-justice-stat-5ae9fd35-20250925103213.jpg?",
    description: "Взыскание ущерба за нарушение прав потребителей в районном суде Курска.",
    alt: "Статуя правосудия с мечом и весами на фоне неба",
    href: "/praktika/potrebiteli"
  }
];

const CourtPractice = () => {
  return (
    <section className="bg-[#DEE4E6] py-20">
      <div className="container">
        <h2 className="text-center font-display text-[36px] font-semibold text-primary-text mb-16">
          Судебная практика
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {cases.map((caseItem, index) => (
            <div key={index} className="flex flex-col text-left">
              <div className="relative w-full aspect-[3/2]">
                <Image
                  src={caseItem.image}
                  alt={caseItem.alt}
                  fill
                  className="object-cover rounded-xl"
                />
              </div>

              <div className="flex flex-col flex-grow mt-6">
                <div className="border-y border-primary/80 py-6 flex-grow">
                  <p className="text-primary-text leading-relaxed">
                    {caseItem.description}
                  </p>
                </div>
                <div className="mt-8 text-center">
                  <Link 
                    href={caseItem.href} 
                    className="inline-block border border-primary bg-white text-primary-text px-8 py-1.5 rounded-full text-sm font-normal transition-colors duration-300 hover:bg-primary/10"
                  >
                    Подробнее
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link 
            href="/praktika" 
            className="inline-block bg-primary text-primary-foreground font-semibold py-3 px-10 rounded-full transition-opacity hover:opacity-90 text-base"
          >
            Все дела практики
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CourtPractice;