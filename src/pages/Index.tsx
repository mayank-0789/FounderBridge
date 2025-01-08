import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { RecommendationSection } from "@/components/RecommendationSection";
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    console.log('Navigating to:', path);
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <RecommendationSection />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Welcome to FounderBridge</CardTitle>
              <CardDescription className="text-center">
                Connect with the right talent or find your next startup opportunity
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                className="w-full"
                onClick={() => handleNavigation('/auth/developer')}
              >
                Join as Developer
              </Button>
              <Button
                className="w-full"
                variant="outline"
                onClick={() => handleNavigation('/auth/recruiter')}
              >
                Join as Recruiter
              </Button>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default Index;
