import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import ProjectShowcase from "@/components/ProjectShowcase";
import ForBuilders from "@/components/ForBuilders";
import Testimonials from "@/components/Testimonials";
import WhyColabship from "@/components/WhyColabship";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <HowItWorks />
      <ProjectShowcase />
      <ForBuilders />
      <Testimonials />
      <WhyColabship />
      <Pricing />
      <Footer />
    </div>
  );
};

export default Index;
