import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { HowItWorks } from '../components/HowItWorks';
import { Features } from '../components/Features';
import { ChatbotPreview } from '../components/ChatbotPreview';
import { ConsultDoctor } from '../components/ConsultDoctor';
import { SecurityBadges } from '../components/SecurityBadges';
import { Disclaimer } from '../components/Disclaimer';
import { Footer } from '../components/Footer';

export function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F0F4F1] via-[#F8F9FA] to-[#E8F0E8]">
      <Navbar />
      <Hero />
      <HowItWorks />
      <Features />
      <ChatbotPreview />
      <ConsultDoctor />
      <SecurityBadges />
      <Disclaimer />
      <Footer />
    </div>
  );
}