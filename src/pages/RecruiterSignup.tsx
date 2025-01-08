import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { BsBuilding, BsCurrencyDollar } from "react-icons/bs";
import { HiOutlineDocumentText } from "react-icons/hi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { saveUserData } from "@/lib/user";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

interface FormData {
  company: string;
  role: string;
  companySize: string;
  industry: string;
  companyWebsite: string;
  linkedinUrl: string;
  bio: string;
}

export const RecruiterSignup = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const authData = location.state || {};
  
  if (!authData.uid) {
    navigate('/auth/recruiter', { replace: true });
  }

  const [formData, setFormData] = useState<FormData>({
    company: '',
    role: '',
    companySize: '',
    industry: '',
    companyWebsite: '',
    linkedinUrl: '',
    bio: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const userData = {
        ...authData,
        userType: 'recruiter' as const,
        ...formData
      };

      console.log('Submitting user data:', userData);

      await saveUserData(userData);
      
      toast({
        title: "Profile Created",
        description: "Your recruiter profile has been created successfully!",
        variant: "default"
      });

      // Redirect to dashboard or home page
      setTimeout(() => {
        navigate('/', { replace: true });
      }, 2000);
      
    } catch (error) {
      console.error('Error saving profile:', error);
      
      let errorMessage = 'Failed to create profile. Please try again.';
      
      if (error instanceof Error) {
        if (error.message.includes('permission-denied') || error.message.includes('unauthenticated')) {
          errorMessage = error.message;
        }
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto mb-8">
        <Link 
          to="/" 
          className="inline-block text-2xl font-extrabold text-primary tracking-tight hover:opacity-80 transition-opacity"
        >
          FounderBridge
        </Link>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6 lg:pr-8"
        >
          <h1 className="text-4xl font-bold leading-tight lg:text-5xl bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Find Your Next Tech Co-founder
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Connect with talented developers who can bring your vision to life. FounderBridge helps you find the perfect technical match for your startup.
          </p>
          <div className="space-y-4 py-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-full">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-lg text-gray-700">Access a pool of pre-vetted developers</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-full">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-lg text-gray-700">Find developers who match your tech stack</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-full">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-lg text-gray-700">Fast-track your startup's technical growth</p>
            </div>
          </div>
         
        </motion.div>

        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="border-none shadow-xl">
            <CardHeader>
              <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                Recruiter Profile
              </h2>
              <p className="mt-2 text-center text-gray-600">
                Let's create your recruiter profile to find talented developers
              </p>
            </CardHeader>
            <form onSubmit={handleSubmit} className="space-y-8">
              <CardContent className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <span className="p-2 bg-primary/10 rounded-lg">
                      <BsBuilding className="text-primary" />
                    </span>
                    Company Details
                  </h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="company">Company Name</Label>
                      <Input 
                        id="company" 
                        placeholder="e.g., Tech Innovations Inc." 
                        value={formData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="role">Your Role</Label>
                      <Input 
                        id="role" 
                        placeholder="e.g., Founder, CTO, HR Manager" 
                        value={formData.role}
                        onChange={(e) => handleInputChange('role', e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="companySize">Company Size</Label>
                      <Select 
                        value={formData.companySize}
                        onValueChange={(value) => handleInputChange('companySize', value)}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select company size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-10">1-10 employees</SelectItem>
                          <SelectItem value="11-50">11-50 employees</SelectItem>
                          <SelectItem value="51-200">51-200 employees</SelectItem>
                          <SelectItem value="201-500">201-500 employees</SelectItem>
                          <SelectItem value="500+">500+ employees</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="industry">Industry</Label>
                      <Select
                        value={formData.industry}
                        onValueChange={(value) => handleInputChange('industry', value)}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technology">Technology</SelectItem>
                          <SelectItem value="fintech">Fintech</SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="ecommerce">E-commerce</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="companyWebsite">Company Website</Label>
                      <Input 
                        id="companyWebsite" 
                        placeholder="e.g., https://example.com" 
                        value={formData.companyWebsite}
                        onChange={(e) => handleInputChange('companyWebsite', e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="linkedinUrl">LinkedIn Profile</Label>
                      <Input 
                        id="linkedinUrl" 
                        placeholder="e.g., https://linkedin.com/in/yourprofile" 
                        value={formData.linkedinUrl}
                        onChange={(e) => handleInputChange('linkedinUrl', e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Company Description</Label>
                      <Input 
                        id="bio" 
                        placeholder="Tell us about your company and what you're building..." 
                        value={formData.bio}
                        onChange={(e) => handleInputChange('bio', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </motion.div>
              </CardContent>
              <CardFooter>
                <Button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-blue-600 hover:opacity-90 transition-opacity"
                >
                  Create Profile
                </Button>
              </CardFooter>
            </form>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default RecruiterSignup;
