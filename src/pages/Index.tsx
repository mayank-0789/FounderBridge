import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { RecommendationSection } from "@/components/RecommendationSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <RecommendationSection />
        <Footer />
      </main>
    </div>
  );
};

export default Index;
