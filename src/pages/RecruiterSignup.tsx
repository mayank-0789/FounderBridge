import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useNavigate } from 'react-router-dom';

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  companyName: z.string().min(1, "Company name is required"),
  role: z.string().min(1, "Role is required"),
  companySize: z.string().min(1, "Company size is required"),
  fundingStage: z.string().min(1, "Funding stage is required"),
  website: z.string().url("Invalid website URL").optional(),
  linkedIn: z.string().optional(),
  equityRange: z.string().min(1, "Equity range is required"),
  salaryRange: z.string().min(1, "Salary range is required"),
  roleDescription: z.string().min(50, "Please provide a detailed role description (minimum 50 characters)"),
  techStack: z.string().min(1, "Tech stack is required"),
  experienceRequired: z.string().min(1, "Experience requirement is required"),
  industry: z.string().min(1, "Industry is required")
});

const RecruiterSignup = () => {
  const location = useLocation();
  const authData = location.state || {};
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isProfileCreated, setIsProfileCreated] = useState(false);
  const navigate = useNavigate();

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
      companyName: "",
      role: "",
      industry: "",
      companySize: "",
      fundingStage: "",
      website: "",
      linkedIn: "",
      equityRange: "",
      salaryRange: "",
      roleDescription: "",
      techStack: "",
      experienceRequired: ""
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      console.log('Form data:', data);
      // TODO: Add your API call here to save the recruiter profile
      // await saveRecruiterProfile(data);
      setIsProfileCreated(true);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isProfileCreated) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-6">Profile Created Successfully!</h2>
          <p className="text-gray-600 mb-4">
            Your recruiter profile has been created. You can now start posting jobs and connecting with developers.
          </p>
          <Button onClick={() => navigate('/dashboard')}>
            Go to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold text-center text-gray-900">
              Recruiter Profile
            </h2>
            <p className="mt-2 text-center text-gray-600">
              Let's create your recruiter profile to find talented developers
            </p>
          </CardHeader>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input 
                      {...form.register("firstName")}
                      placeholder="John"
                      error={form.formState.errors.firstName?.message}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input 
                      {...form.register("lastName")}
                      placeholder="Doe"
                      error={form.formState.errors.lastName?.message}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    {...form.register("email")}
                    type="email"
                    placeholder="john@example.com"
                    error={form.formState.errors.email?.message}
                  />
                </div>
              </div>

              {/* Company Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Company Details</h3>
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input 
                    {...form.register("companyName")}
                    placeholder="Tech Innovations Inc."
                    error={form.formState.errors.companyName?.message}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Your Role</Label>
                  <Input 
                    {...form.register("role")}
                    placeholder="e.g., Founder, CTO, HR Manager"
                    error={form.formState.errors.role?.message}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Select 
                    onValueChange={(value) => form.setValue("industry", value)}
                    defaultValue={form.getValues("industry")}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tech">Technology</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="ecommerce">E-commerce</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Company Website</Label>
                  <Input 
                    {...form.register("website")}
                    placeholder="https://example.com"
                    error={form.formState.errors.website?.message}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companySize">Company Size</Label>
                  <Select 
                    onValueChange={(value) => form.setValue("companySize", value)}
                    defaultValue={form.getValues("companySize")}
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
                  <Label htmlFor="fundingStage">Funding Stage</Label>
                  <Select 
                    onValueChange={(value) => form.setValue("fundingStage", value)}
                    defaultValue={form.getValues("fundingStage")}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select funding stage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bootstrap">Bootstrapped</SelectItem>
                      <SelectItem value="seed">Seed</SelectItem>
                      <SelectItem value="seriesA">Series A</SelectItem>
                      <SelectItem value="seriesB">Series B</SelectItem>
                      <SelectItem value="seriesC">Series C+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Role Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Role Requirements</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="equityRange">Equity Range (%)</Label>
                    <Input 
                      {...form.register("equityRange")}
                      placeholder="e.g., 0.5-2.0"
                      error={form.formState.errors.equityRange?.message}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="salaryRange">Salary Range ($)</Label>
                    <Input 
                      {...form.register("salaryRange")}
                      placeholder="e.g., 80k-120k"
                      error={form.formState.errors.salaryRange?.message}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="roleDescription">Role Description</Label>
                  <textarea 
                    {...form.register("roleDescription")}
                    className="w-full min-h-[100px] p-3 border rounded-md"
                    placeholder="Describe the role, responsibilities, and what you're looking for in a candidate..."
                    error={form.formState.errors.roleDescription?.message}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="techStack">Required Tech Stack</Label>
                  <Input 
                    {...form.register("techStack")}
                    placeholder="e.g., React, Node.js, Python"
                    error={form.formState.errors.techStack?.message}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experienceRequired">Experience Required</Label>
                  <Select 
                    onValueChange={(value) => form.setValue("experienceRequired", value)}
                    defaultValue={form.getValues("experienceRequired")}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select required experience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-1">0-1 years</SelectItem>
                      <SelectItem value="1-3">1-3 years</SelectItem>
                      <SelectItem value="3-5">3-5 years</SelectItem>
                      <SelectItem value="5+">5+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isSubmitting || !form.formState.isValid}
              >
                {isSubmitting ? 'Creating Profile...' : 'Create Profile'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default RecruiterSignup;
