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

export const RecruiterSignup = () => {
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
          <CardContent className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john@example.com" />
              </div>

              {/* Company Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Company Details</h3>
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input id="companyName" placeholder="e.g., Tech Innovations Inc." />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companyWebsite">Company Website</Label>
                  <Input id="companyWebsite" placeholder="e.g., https://example.com" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companySize">Company Size</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select company size" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
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
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select funding stage" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="bootstrap">Bootstrapped</SelectItem>
                      <SelectItem value="seed">Seed</SelectItem>
                      <SelectItem value="seriesA">Series A</SelectItem>
                      <SelectItem value="seriesB">Series B</SelectItem>
                      <SelectItem value="seriesC">Series C+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Equity and Compensation */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Equity & Compensation</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="equityRange">Equity Range (%)</Label>
                    <Input id="equityRange" placeholder="e.g., 0.5-2.0" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="salaryRange">Salary Range ($)</Label>
                    <Input id="salaryRange" placeholder="e.g., 80k-120k" />
                  </div>
                </div>
              </div>

              {/* Role Details */}
              <div className="space-y-2">
                <Label htmlFor="roleDescription">Role Description</Label>
                <textarea 
                  id="roleDescription"
                  className="w-full min-h-[100px] p-3 border rounded-md"
                  placeholder="Describe the role, responsibilities, and what you're looking for in a candidate..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="techStack">Required Tech Stack</Label>
                <Input id="techStack" placeholder="e.g., React, Node.js, Python" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="experienceRequired">Experience Required</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select required experience" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
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
            <Button className="w-full">Create Profile</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default RecruiterSignup;
