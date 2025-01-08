import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { RecommendationSection } from "@/components/RecommendationSection";
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <RecommendationSection />
        <div className="flex items-center justify-center py-16 px-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Join FounderBridge Today</CardTitle>
              <CardDescription className="text-center">
                Start your journey to find the perfect match for your startup
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                className="w-full h-12 text-lg"
                onClick={() => navigate('/auth/developer')}
              >
                Join as Developer
              </Button>
              <Button
                className="w-full h-12 text-lg"
                variant="outline"
                onClick={() => navigate('/auth/recruiter')}
              >
                Join as Recruiter
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
