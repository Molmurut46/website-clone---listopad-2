import HeroSection from '@/components/sections/hero-section';
import LegalServices from '@/components/sections/legal-services';
import LawyerProfileIvanov from '@/components/sections/lawyer-profile-ivanov';
import CourtPractice from '@/components/sections/court-practice';
import ClientReviews from '@/components/sections/client-reviews';
import Faq from '@/components/sections/faq';
import ContactFormSection from '@/components/sections/contact-form';
import Footer from '@/components/sections/footer';
import AILegalChat from '@/components/ai-legal-chat';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <LegalServices />
      <LawyerProfileIvanov />
      <CourtPractice />
      <ClientReviews />
      <Faq />
      <ContactFormSection />
      <Footer />
    </main>
  );
}