import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Mail, User, MapPin, Heart, Clock, Users, Building, Check } from "lucide-react";

const skills = [
  "Teaching", "Healthcare", "Technology", "Marketing", "Event Planning",
  "Fundraising", "Social Media", "Photography", "Translation", "Counseling",
  "Construction", "Environment", "Sports Coaching", "Art & Crafts", "Music"
];

const interests = [
  "Education", "Healthcare", "Environment", "Animal Welfare", "Poverty Relief",
  "Youth Development", "Elderly Care", "Disability Support", "Food Security",
  "Mental Health", "Community Development", "Arts & Culture", "Sports & Recreation"
];

const GetStarted = () => {
  return (
    <div className="bg-gradient-to-br from-primary/5 via-accent-light/10 to-highlight-light/5">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Start Your
            <span className="block text-transparent bg-clip-text bg-gradient-hero mt-2">
              Volunteer Journey
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Join thousands of passionate volunteers making a real difference. 
            Create your profile and discover opportunities that match your interests and skills.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left Side - Registration Form */}
          <div>
            <Card className="border-0 shadow-glow bg-gradient-card">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Create Your Volunteer Profile</CardTitle>
                <p className="text-muted-foreground text-center">Tell us about yourself to get personalized opportunities</p>
              </CardHeader>
              
              <CardContent className="p-8">
                <form className="space-y-6">
                  {/* Account Info */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">Account Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="first-name" className="text-sm font-semibold">First Name</Label>
                        <div className="relative mt-2">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                          <Input 
                            id="first-name" 
                            placeholder="Your first name"
                            className="pl-10 h-10 border-2 border-border/50 focus:border-primary"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="last-name" className="text-sm font-semibold">Last Name</Label>
                        <div className="relative mt-2">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                          <Input 
                            id="last-name" 
                            placeholder="Your last name"
                            className="pl-10 h-10 border-2 border-border/50 focus:border-primary"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-sm font-semibold">Email Address</Label>
                      <div className="relative mt-2">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input 
                          id="email" 
                          type="email"
                          placeholder="your@email.com"
                          className="pl-10 h-10 border-2 border-border/50 focus:border-primary"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="location" className="text-sm font-semibold">Location</Label>
                      <div className="relative mt-2">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input 
                          id="location" 
                          placeholder="City, State"
                          className="pl-10 h-10 border-2 border-border/50 focus:border-primary"
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Skills */}
                  <div>
                    <Label className="text-sm font-semibold">Your Skills & Expertise</Label>
                    <p className="text-sm text-muted-foreground mb-3">Select skills you'd like to use in volunteer work</p>
                    <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                      {skills.map((skill) => (
                        <Badge 
                          key={skill} 
                          variant="outline" 
                          className="cursor-pointer hover:bg-primary hover:text-primary-foreground text-xs"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Interests */}
                  <div>
                    <Label className="text-sm font-semibold">Causes You Care About</Label>
                    <p className="text-sm text-muted-foreground mb-3">Choose areas where you want to make impact</p>
                    <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                      {interests.map((interest) => (
                        <Badge 
                          key={interest} 
                          variant="outline" 
                          className="cursor-pointer hover:bg-accent hover:text-accent-foreground text-xs"
                        >
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Availability */}
                  <div>
                    <Label className="text-sm font-semibold">Time Availability</Label>
                    <p className="text-sm text-muted-foreground mb-3">When are you typically available to volunteer?</p>
                    <div className="grid grid-cols-2 gap-2">
                      {["Weekday Mornings", "Weekday Afternoons", "Weekday Evenings", "Weekend Mornings", "Weekend Afternoons", "Weekend Evenings"].map((time) => (
                        <label key={time} className="flex items-center gap-2 text-sm cursor-pointer">
                          <input type="checkbox" className="rounded border-border text-primary" />
                          <span>{time}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Bio */}
                  <div>
                    <Label htmlFor="bio" className="text-sm font-semibold">Tell Us About Yourself (Optional)</Label>
                    <Textarea 
                      id="bio" 
                      placeholder="Share your volunteer experience, motivation, or anything else you'd like organizations to know..."
                      rows={3}
                      className="mt-2 border-2 border-border/50 focus:border-primary resize-none"
                    />
                  </div>

                  <Button size="lg" className="w-full bg-gradient-hero hover:opacity-90 h-12">
                    <Heart className="w-5 h-5 mr-2" />
                    Create My Profile
                  </Button>

                  <div className="text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link to="/signin" className="text-primary hover:text-primary-hover font-medium">
                      Sign in here
                    </Link>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Benefits & Process */}
          <div className="space-y-8">
            {/* What You'll Get */}
            <Card className="border-0 bg-gradient-card">
              <CardHeader>
                <CardTitle className="text-xl">What You'll Get</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-gradient-hero rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Personalized Matches</h4>
                      <p className="text-sm text-muted-foreground">Get opportunities tailored to your skills and interests</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-gradient-hero rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Verified Organizations</h4>
                      <p className="text-sm text-muted-foreground">Connect only with trusted, vetted NGOs and nonprofits</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-gradient-hero rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Impact Tracking</h4>
                      <p className="text-sm text-muted-foreground">See the real difference your volunteer work makes</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-gradient-hero rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Community Support</h4>
                      <p className="text-sm text-muted-foreground">Join a network of like-minded changemakers</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Join Stats */}
            <Card className="border-0 bg-gradient-hero text-white">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-6">Join Our Growing Community</h3>
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <div className="flex items-center justify-center mb-2">
                      <Users className="w-6 h-6" />
                    </div>
                    <div className="text-2xl font-bold">1,200+</div>
                    <div className="text-sm text-white/90">Volunteers</div>
                  </div>
                  <div>
                    <div className="flex items-center justify-center mb-2">
                      <Building className="w-6 h-6" />
                    </div>
                    <div className="text-2xl font-bold">350+</div>
                    <div className="text-sm text-white/90">Organizations</div>
                  </div>
                  <div>
                    <div className="flex items-center justify-center mb-2">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div className="text-2xl font-bold">15K+</div>
                    <div className="text-sm text-white/90">Hours Volunteered</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Organizations Option */}
            <Card className="border-0 bg-gradient-card border-2 border-accent/20">
              <CardContent className="p-6 text-center">
                <Building className="w-12 h-12 mx-auto mb-4 text-accent" />
                <h3 className="text-lg font-bold text-foreground mb-2">Are you an organization?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Register your NGO to connect with passionate volunteers
                </p>
                <Link to="/ngo-register">
                  <Button variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                    Register Your NGO
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;