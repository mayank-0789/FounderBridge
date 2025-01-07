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


export const DeveloperSignup = () => {
  
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
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

              <div className="space-y-2">
                <Label htmlFor="experience">Years of Experience</Label>
                <Select>
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
                <Input id="skills" placeholder="e.g., React, Node.js, Python" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">About You</Label>
                <textarea 
                  id="bio"
                  className="w-full min-h-[100px] p-3 border rounded-md"
                  placeholder="Tell us about yourself, your experience, and what you're looking for..."
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
                    placeholder="Profile URL" 
                  />
                </div>
              </div>

              {/* Education Section */}
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Education</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="university">College/University</Label>
                    <Input id="university" placeholder="e.g., Stanford University" />
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="degree">Degree & Major</Label>
                      <Input id="degree" placeholder="e.g., BS Computer Science" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="graduation">Graduation Year</Label>
                      <Select>
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
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-4">
            <Button variant="outline">Cancel</Button>
            <Button>Create Profile</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};