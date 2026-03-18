import Hero from '../../components/userComponents/Hero';
import FeaturedCars from '../../components/userComponents/FeaturedCars';
import Features from '../../components/userComponents/Features';
import StorySection from '../../components/userComponents/StorySection';
// import EnhancedParallax from '../../components/userComponents/EnhancedParallax';
import TrustIndicators from '../../components/userComponents/TrustIndicators';
import B2BPartnership from '../../components/userComponents/B2BPartnership';
import GlobalBackground from '../../components/userComponents/GlobalBackground';
import ContactSection from '../../components/userComponents/ContactSection';
import ComparisonSection from '../../components/userComponents/ComparisonSection';
import TrustSlider from '../../components/userComponents/TrustSlider';

const Home = () => {
  return (
    <div className="w-full relative">
      <GlobalBackground />
      <Hero />
      {/* <TrustSlider /> */}
      {/* <StorySection /> */}
      <ComparisonSection />
      <Features />
      {/* <EnhancedParallax /> */}
      {/* <TechSpecs /> */}
      <FeaturedCars />
      <TrustIndicators />
      <B2BPartnership />
      {/* <ColorShowcase /> */}
      <ContactSection />
    </div>
  );
};

export default Home;
