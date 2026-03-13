import Hero from '../../components/userComponents/Hero';
import FeaturedCars from '../../components/userComponents/FeaturedCars';
import Features from '../../components/userComponents/Features';
import StorySection from '../../components/userComponents/StorySection';
import EnhancedParallax from '../../components/userComponents/EnhancedParallax';
import TrustIndicators from '../../components/userComponents/TrustIndicators';
import B2BPartnership from '../../components/userComponents/B2BPartnership';
import GlobalBackground from '../../components/userComponents/GlobalBackground';
import ContactSection from '../../components/userComponents/ContactSection';

const Home = () => {
  return (
    <div className="w-full relative">
      <GlobalBackground />
      <Hero />
      <StorySection />
      <Features />
      <EnhancedParallax />
      {/* <TechSpecs /> */}
      <FeaturedCars />
      <B2BPartnership />
      {/* <ColorShowcase /> */}
      <TrustIndicators />
      <ContactSection />
    </div>
  );
};

export default Home;
