import Hero from '../../components/userComponents/Hero';
import FeaturedCars from '../../components/userComponents/FeaturedCars';
import Features from '../../components/userComponents/Features';
import VerificationTimeline from '../../components/userComponents/VerificationTimeline';  
import B2BPartnership from '../../components/userComponents/B2BPartnership';
import GlobalBackground from '../../components/userComponents/GlobalBackground';
import ContactSection from '../../components/userComponents/ContactSection';
import ComparisonSection from '../../components/userComponents/ComparisonSection';


const Home = () => {
  return (
    <div className="w-full relative">
      <GlobalBackground />
      <Hero />
      {/* <TrustIndicators /> */}
      <ComparisonSection />
      <Features />
      <FeaturedCars />
      <VerificationTimeline />
      <B2BPartnership />
      {/* <ColorShowcase /> */}
      <ContactSection />
    </div>
  );
};

export default Home;
