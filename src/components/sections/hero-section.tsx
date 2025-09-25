import React from 'react';
import Image from 'next/image';
import { Phone, Mail } from 'lucide-react';

interface LawyerProfileProps {
  name: [string, string];
  phone: string;
  bracketColor: 'primary' | 'secondary';
  buttonColor: 'primary' | 'secondary';
}

const LawyerProfile: React.FC<LawyerProfileProps> = ({ name, phone, bracketColor, buttonColor }) => {
  const bracketColorClass = bracketColor === 'primary' ? 'bg-primary' : 'bg-secondary';
  const buttonBG = buttonColor === 'primary' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground';

  return (
    <div className="flex flex-col items-center space-y-8">
      <div className="relative p-8 w-full flex items-center justify-center">
        {/* Bracket lines */}
        <div className={`absolute top-0 left-8 right-8 h-[2px] ${bracketColorClass}`} />
        <div className={`absolute bottom-0 left-8 right-8 h-[2px] ${bracketColorClass}`} />
        <div className={`absolute left-0 top-8 bottom-8 w-[2px] ${bracketColorClass}`} />
        <div className={`absolute right-0 top-8 bottom-8 w-[2px] ${bracketColorClass}`} />

        <div className="flex flex-col items-center gap-y-4 text-center min-h-[180px] justify-center">
          <span className="font-display text-sm uppercase tracking-wider text-white/90">адвокат</span>
          <h2 className="font-display text-3xl lg:text-4xl font-semibold leading-tight text-white">
            {name[0]}<br/>{name[1]}
          </h2>
          <div className="flex items-center justify-center">
            <a href={`tel:${phone.replace(/[()-\s]/g, '')}`} className="font-body text-xl text-white hover:opacity-80 transition-opacity">
              {phone}
            </a>
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-4 text-center">
        <div className="text-base font-bold text-white">Контакты</div>
        <div className="flex items-center justify-center space-x-4 text-sm text-white">
          <Phone className="h-5 w-5 text-white" />
          <a href="tel:+79103128800" className="hover:text-primary transition-colors">
            +7 (910) 312-88-00
          </a>
        </div>
        <div className="flex items-center justify-center space-x-4 text-sm text-white">
          <Mail className="h-5 w-5 text-white" />
          <a href="mailto:89103128800@mail.ru" className="hover:text-primary transition-colors">
            89103128800@mail.ru
          </a>
        </div>
        <p className="text-xs text-white/90">
          Прием по предварительной записи
        </p>
      </div>
      <a href="#ai-chat" className={`font-semibold py-4 px-12 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:brightness-95 transform hover:scale-105 text-base ${buttonBG}`}>
        Задать вопрос AI
      </a>
    </div>
  );
};

const HeroSection = () => {
  return (
    <section 
      className="relative bg-center bg-cover bg-no-repeat py-16 md:py-24"
      style={{ 
        backgroundImage: "linear-gradient(rgba(20,20,20,0.5), rgba(20,20,20,0.3), rgba(20,20,20,0.5)), url('https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9fbcac95-e251-4e02-b45a-e4b7d5d7a542/generated_images/high-quality-professional-photograph-of--05a525da-20250925103102.jpg?')",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="container mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-x-8 gap-y-12 max-w-5xl mx-auto">
          <LawyerProfile 
            name={['Иванов', 'Алексей Иванович']}
            phone="+7 (910) 312-88-00"
            bracketColor="primary"
            buttonColor="primary"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;