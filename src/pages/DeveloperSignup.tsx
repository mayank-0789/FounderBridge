import { useState } from "react";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation } from "react-router-dom";
import { z } from "zod";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  experience: string;
  skills: string;
  bio: string;
  github: string;
  university: string;
  degree: string;
  graduationYear: string;
}

const formSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  experience: z.string(),
  skills: z.string(),
  bio: z.string(),
  github: z.string(),
  university: z.string(),
  degree: z.string(),
  graduationYear: z.string(),
});

const DeveloperSignup = () => {
  const location = useLocation();
  const authData = location.state || {};
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isProfileCreated, setIsProfileCreated] = useState(false);

  // Split the name from auth data
  const nameParts = authData.name?.split(' ') || ['', ''];
  const defaultFirstName = nameParts[0];
  const defaultLastName = nameParts.slice(1).join(' ');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: defaultFirstName,
      lastName: defaultLastName,
      email: authData.email || "",
      experience: "",
      skills: "",
      bio: "",
      github: "",
      university: "",
      degree: "",
      graduationYear: ""
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    form.setValue(e.target.id, e.target.value);
  };

  const handleSelectChange = (value: string, field: keyof FormData) => {
    form.setValue(field, value);
  };

  const isFormValid = () => {
    return form.formState.isValid;
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      console.log('Form data:', data);
      // TODO: Add your API call here to save the developer profile
      // await saveDeveloperProfile(data);
      setIsProfileCreated(true);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Mock opportunities data
  const mockOpportunities = [
    {
      id: 1,
      companyName: "TechStart Innovation",
      role: "Lead Full Stack Developer",
      equity: "3-5%",
      description: "Looking for a technical co-founder to build our MVP. We're disrupting the EdTech space.",
      requirements: ["5+ years experience", "React/Node.js", "System Architecture"],
      terms: "3-month trial period, full-time commitment required",
      funding: "Seed funded - $500K"
    },
    {
      id: 2,
      companyName: "AI Solutions Co",
      role: "Senior AI Engineer",
      equity: "2-4%",
      description: "Building next-gen AI tools for enterprise customers. Series A startup.",
      requirements: ["ML/AI experience", "Python", "Cloud Architecture"],
      terms: "Immediate start, flexible hours",
      funding: "Series A - $2M raised"
    }
  ];

  if (isProfileCreated) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Matching Opportunities</h2>
          <div className="space-y-6">
            {mockOpportunities.map((opportunity) => (
              <Card key={opportunity.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-primary">
                        {opportunity.companyName}
                      </h3>
                      <p className="text-lg font-medium mt-1">{opportunity.role}</p>
                    </div>
                    <div className="text-right">
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        {opportunity.equity} Equity
                      </span>
                    </div>
                  </div>
                  
                  <p className="mt-4 text-gray-600">{opportunity.description}</p>
                  
                  <div className="mt-4">
                    <h4 className="font-medium">Requirements:</h4>
                    <ul className="list-disc list-inside mt-2 text-gray-600">
                      {opportunity.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium">Terms:</h4>
                      <p className="text-gray-600">{opportunity.terms}</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Funding Status:</h4>
                      <p className="text-gray-600">{opportunity.funding}</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <Button>Apply Now</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold text-center text-gray-900">
              Developer Profile
            </h2>
            <p className="mt-2 text-center text-gray-600">
              Let's create your developer profile to find the perfect opportunity
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input 
                    id="firstName" 
                    placeholder="John" 
                    {...form.register("firstName")}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input 
                    id="lastName" 
                    placeholder="Doe" 
                    {...form.register("lastName")}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="john@example.com" 
                  {...form.register("email")}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Years of Experience</Label>
                <Select onValueChange={(value) => handleSelectChange(value, 'experience')} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="0-1">0-1 years</SelectItem>
                    <SelectItem value="1-3">1-3 years</SelectItem>
                    <SelectItem value="3-5">3-5 years</SelectItem>
                    <SelectItem value="5+">5+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="skills">Primary Skills</Label>
                <Input 
                  id="skills" 
                  placeholder="e.g., React, Node.js, Python" 
                  {...form.register("skills")}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">About You</Label>
                <textarea 
                  id="bio"
                  className="w-full min-h-[100px] p-3 border rounded-md"
                  placeholder="Tell us about yourself..."
                  {...form.register("bio")}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="github">GitHub Profile</Label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    github.com/
                  </span>
                  <Input 
                    id="github" 
                    className="rounded-l-none" 
                    placeholder="username" 
                    {...form.register("github")}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="university">College/University</Label>
                <Input 
                  id="university" 
                  placeholder="e.g., Stanford University" 
                  {...form.register("university")}
                  required
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="degree">Degree & Major</Label>
                  <Input 
                    id="degree" 
                    placeholder="e.g., BS Computer Science" 
                    {...form.register("degree")}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="graduationYear">Graduation Year</Label>
                  <Select onValueChange={(value) => handleSelectChange(value, 'graduationYear')} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {Array.from({ length: 10 }, (_, i) => {
                        const year = new Date().getFullYear() - i;
                        return (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-4">
            <Button type="button" variant="outline">Cancel</Button>
            <Button type="submit" disabled={!isFormValid() || isSubmitting}>Create Profile</Button>
          </CardFooter>
        </Card>
      </div>
    </form>
  );
};

export default DeveloperSignup;