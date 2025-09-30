import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Building, Phone, Globe, MapPin, Shield, Users, Target } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const NGORegister = () => {
  const [orgName, setOrgName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    // Step 1: Create auth user
    const { data: authData, error: authError } = await signUp(email, password, {
      organization_name: orgName
    });

    if (authError) {
      toast({
        title: "Registration failed",
        description: authError.message,
        variant: "destructive"
      });
      setLoading(false);
      return;
    }

    // Step 2: Create organization record
    const { error: orgError } = await supabase
      .from('organizations')
      .insert({
        name: orgName,
        email: email,
        phone: phone,
        website: website,
        address: address,
        description: description
      });

    setLoading(false);

    if (orgError) {
      toast({
        title: "Organization creation failed",
        description: orgError.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Success!",
        description: "Your organization has been registered. Please check your email to verify your account."
      });
      navigate("/ngo-signin");
    }
  };

  return (
    <div className="bg-gradient-to-br from-accent/5 via-primary/10 to-highlight/5">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Side - Information */}
          <div className="order-2 lg:order-1 lg:sticky lg:top-8">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Partner With Us
                <span className="block text-transparent bg-clip-text bg-gradient-hero mt-2">
                  Register Your NGO
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Join our network of verified organizations and connect with passionate volunteers 
                ready to support your mission. Expand your reach and amplify your impact.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 mb-8">
              <Card className="border-0 bg-gradient-card">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-hero rounded-xl flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-2">Verification Process</h3>
                    <p className="text-sm text-muted-foreground">
                      All organizations go through our verification process to ensure credibility and build trust with volunteers.
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-0 bg-gradient-card">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-hero rounded-xl flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-2">Access to Volunteers</h3>
                    <p className="text-sm text-muted-foreground">
                      Connect with over 1,200 active volunteers who are passionate about making a difference in their communities.
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-0 bg-gradient-card">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-hero rounded-xl flex items-center justify-center flex-shrink-0">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-2">Event Management</h3>
                    <p className="text-sm text-muted-foreground">
                      Use our platform to post opportunities, manage applications, and track the impact of your events.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Side - Registration Form */}
          <div className="order-1 lg:order-2">
            <Card className="border-0 shadow-glow bg-gradient-card">
              <CardHeader className="text-center pb-6">
                <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold">Register Your Organization</CardTitle>
                <p className="text-muted-foreground">Complete the form below to get started</p>
              </CardHeader>
              
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="orgName" className="text-base font-semibold">Organization Name</Label>
                    <div className="relative mt-2">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                      <Input 
                        id="orgName" 
                        type="text"
                        placeholder="Your Organization Name"
                        value={orgName}
                        onChange={(e) => setOrgName(e.target.value)}
                        required
                        className="pl-12 h-12 border-2 border-border/50 focus:border-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="orgEmail" className="text-base font-semibold">Official Email Address</Label>
                    <div className="relative mt-2">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                      <Input 
                        id="orgEmail" 
                        type="email"
                        placeholder="info@yourorganization.org"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="pl-12 h-12 border-2 border-border/50 focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone" className="text-base font-semibold">Phone Number</Label>
                      <div className="relative mt-2">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                        <Input 
                          id="phone" 
                          type="tel"
                          placeholder="+1 (555) 123-4567"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="pl-12 h-12 border-2 border-border/50 focus:border-primary"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="website" className="text-base font-semibold">Website</Label>
                      <div className="relative mt-2">
                        <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                        <Input 
                          id="website" 
                          type="url"
                          placeholder="www.yourorganization.org"
                          value={website}
                          onChange={(e) => setWebsite(e.target.value)}
                          className="pl-12 h-12 border-2 border-border/50 focus:border-primary"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address" className="text-base font-semibold">Address</Label>
                    <div className="relative mt-2">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                      <Input 
                        id="address" 
                        type="text"
                        placeholder="123 Main Street, City, State, ZIP"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="pl-12 h-12 border-2 border-border/50 focus:border-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description" className="text-base font-semibold">Organization Description</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Tell us about your organization's mission, vision, and the work you do..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="mt-2 border-2 border-border/50 focus:border-primary min-h-[120px]"
                    />
                  </div>

                  <div>
                    <Label htmlFor="password" className="text-base font-semibold">Password</Label>
                    <div className="relative mt-2">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                      <Input 
                        id="password" 
                        type="password"
                        placeholder="Create a strong password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                        className="pl-12 h-12 border-2 border-border/50 focus:border-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="confirmPassword" className="text-base font-semibold">Confirm Password</Label>
                    <div className="relative mt-2">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                      <Input 
                        id="confirmPassword" 
                        type="password"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        minLength={6}
                        className="pl-12 h-12 border-2 border-border/50 focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="flex items-start gap-2 text-sm">
                    <input type="checkbox" className="rounded border-border text-primary mt-1" />
                    <span className="text-muted-foreground">
                      I confirm that I am authorized to register this organization and agree to the{" "}
                      <Link to="#" className="text-primary hover:text-primary-hover font-medium">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link to="#" className="text-primary hover:text-primary-hover font-medium">
                        Privacy Policy
                      </Link>
                    </span>
                  </div>

                  <Button type="submit" size="lg" disabled={loading} className="w-full bg-gradient-hero hover:opacity-90 h-12">
                    <Building className="w-5 h-5 mr-2" />
                    {loading ? "Submitting..." : "Submit Registration"}
                  </Button>

                  <div className="text-center text-sm text-muted-foreground bg-muted/30 p-4 rounded-lg">
                    <Shield className="w-5 h-5 mx-auto mb-2 text-primary" />
                    <p>
                      Your application will be reviewed within 2-3 business days. 
                      We may contact you for additional verification documents.
                    </p>
                  </div>

                  <Separator className="my-6" />

                  <div className="text-center">
                    <p className="text-muted-foreground mb-4">Already registered?</p>
                    <Link to="/ngo-signin">
                      <Button variant="outline" size="lg" className="w-full h-12">
                        Sign In to Dashboard
                      </Button>
                    </Link>
                  </div>

                  <Separator className="my-6" />

                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-4">Looking to volunteer instead?</p>
                    <Link to="/register">
                      <Button variant="ghost" size="sm" className="text-primary hover:text-primary-hover">
                        Create Volunteer Account
                      </Button>
                    </Link>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NGORegister;