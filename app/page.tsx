import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProblemSection from '@/components/ProblemSection';
import CredibilitySection from '@/components/CredibilitySection';
import OfferSection from '@/components/OfferSection';
import GuaranteeSection from '@/components/GuaranteeSection';
import ProcessSection from '@/components/ProcessSection';
import FeaturesSection from '@/components/FeaturesSection';
import PricingSection from '@/components/PricingSection';
import QualifierSection from '@/components/QualifierSection';
import ComparisonTable from '@/components/ComparisonTable';
import ApplicationForm from '@/components/ApplicationForm';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/ui/AnimatedSection';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <AnimatedSection>
        <ProblemSection />
      </AnimatedSection>
      <AnimatedSection>
        <CredibilitySection />
      </AnimatedSection>
      <AnimatedSection>
        <OfferSection />
      </AnimatedSection>
      <AnimatedSection>
        <GuaranteeSection />
      </AnimatedSection>
      <AnimatedSection>
        <ProcessSection />
      </AnimatedSection>
      <AnimatedSection>
        <FeaturesSection />
      </AnimatedSection>
      <AnimatedSection>
        <PricingSection />
      </AnimatedSection>
      <AnimatedSection>
        <QualifierSection />
      </AnimatedSection>
      <AnimatedSection>
        <ComparisonTable />
      </AnimatedSection>
      <AnimatedSection>
        <ApplicationForm />
      </AnimatedSection>
      <Footer />
    </main>
  );
}
