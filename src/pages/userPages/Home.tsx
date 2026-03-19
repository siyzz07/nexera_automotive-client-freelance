import Hero from '../../components/userComponents/Hero';
import FeaturedCars from '../../components/userComponents/FeaturedCars';
import VerificationTimeline from '../../components/userComponents/VerificationTimeline';  
import B2BPartnership from '../../components/userComponents/B2BPartnership';
import GlobalBackground from '../../components/userComponents/GlobalBackground';
import ContactSection from '../../components/userComponents/ContactSection';
import ComparisonSection from '../../components/userComponents/ComparisonSection';

// HOME
const Home = () => {
  return (
    <div className="w-full relative">
      <GlobalBackground />
      <Hero />
      {/* <TrustIndicators /> */}
      <ComparisonSection />
      {/* <Features /> */}
      <FeaturedCars />
      <VerificationTimeline />
      <B2BPartnership />
      {/* <TrustSlider /> */}
      {/* <ColorShowcase /> */}
      <ContactSection />
    </div>
  );
};

export default Home;
