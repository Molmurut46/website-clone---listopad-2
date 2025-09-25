import Image from 'next/image';
import { Phone, MapPin, Mail, Clock } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-secondary text-secondary-foreground font-body">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
                <div className="flex flex-col lg:flex-row lg:justify-between gap-12">
                    {/* Logo and Firm Info */}
                    <div className="flex-shrink-0 lg:w-1/4">
                        <a href="/" className="flex items-start gap-4">
                            <Image
                                src="/assets/svgs/logo.svg"
                                alt="Логотип компании"
                                width={70}
                                height={80}
                                className="w-auto h-20"
                            />
                            <div>
                                <span className="block text-sm leading-tight text-white/90">Адвокатская палата Курской области</span>
                                <span className="block text-sm leading-tight text-white/90">Адвокатский кабинет Иванова А.И.</span>
                            </div>
                        </a>
                    </div>

                    {/* Contact Info Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-16 flex-grow">
                        {/* Phones */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                                <div className="flex items-center gap-2">
                                    <a href="tel:+79103128800" className="text-sm hover:text-primary transition-colors">+7 (910) 312-88-00</a>
                                </div>
                            </div>
                        </div>

                        {/* Working Hours */}
                        <div className="flex gap-3">
                            <Clock className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                            <div>
                                <p className="text-sm">ПН-ЧТ: с 9:00 до 18:00</p>
                                <p className="text-sm">ПТ: с 9:00 до 17:00</p>
                                <p className="text-sm">СБ, ВС - выходной</p>
                                <p className="mt-3 text-sm font-semibold text-primary">По согласованию с клиентом адвокаты работают круглосуточно!</p>
                            </div>
                        </div>

                        {/* Address & Emails */}
                        <div className="space-y-4">
                             <div className="flex items-start gap-3">
                                 <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0"/>
                                 <div className="text-sm">
                                     <span>307200, Курская обл., Октябрьский р-н, п. Прямицыно, ул. Октябрьская, 120Б</span>
                                     <br />
                                     <span>307251, Курская обл., г. Курчатов, ул. Ленинградская, 31</span>
                                     <p className="mt-2 text-xs text-white/80">Прием граждан ведется по предварительной записи</p>
                                 </div>
                             </div>
                             <div className="flex items-center gap-3">
                                 <Mail className="w-5 h-5 text-primary flex-shrink-0"/>
                                 <a href="mailto:89103128800@mail.ru" className="text-sm hover:text-primary transition-colors">89103128800@mail.ru</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-center md:text-left text-xs text-white/60">
                        <span className="block">© Адвокат Иванов А. И.</span>
                        <span className="block">Регистрационный № 46/816</span>
                        <span className="block">2012-2025 Все права защищены.</span>
                    </div>
                    <div>
                        <a href="/politika-v-otnoshenii-obrabotki-personalnyh-dannyh" className="text-xs text-white/60 hover:text-primary underline transition-colors">
                            Политика в отношении обработки персональных данных
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;