import { Header } from "./components/sections/Header/Header";
import { Hero } from "./components/sections/Hero/Hero";
import { PainPoints } from "./components/sections/PainPoints/PainPoints";
import { HowItWorks } from "./components/sections/HowItWorks/HowItWorks";
import { Differential } from "./components/sections/Differential/Differential";
import { Services } from "./components/sections/Services/Services";
import { Pricing } from "./components/sections/Pricing/Pricing";
import { Personalization } from "./components/sections/Personalization/Personalization";
import { Faq } from "./components/sections/Faq/Faq";
import { Contact } from "./components/sections/Contact/Contact";
import { Footer } from "./components/sections/Footer/Footer";
import { FloatingWhatsApp } from "./components/ui/FloatingWhatsApp/FloatingWhatsApp";

export default function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <PainPoints />
        <HowItWorks />
        <Differential />
        <Services />
        <Pricing />
        <Personalization />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
