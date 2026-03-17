import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, Heart, Users, Building } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
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
    const { error } = await signUp(email, password, {
      first_name: firstName,
      last_name: lastName
    });

    setLoading(false);

    if (error) {
      toast({
        title: "Registration failed",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Success!",
        description: "Account created successfully. Please check your email to verify your account."
      });
      navigate("/");
    }
  };

  return (
    <div className="bg-gradient-to-br from-primary/5 via-accent-light/10 to-highlight-light/5">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Welcome Content */}
          <div className="order-2 lg:order-1">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Join the Movement
                <span className="block text-transparent bg-clip-text bg-gradient-hero mt-2">
                  VolunteerConnect
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Create your account and start making a difference today. Connect with meaningful 
                opportunities, track your impact, and be part of a community that cares.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="border-0 bg-gradient-card text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-hero rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">5,000+</div>
                  <div className="text-sm text-muted-foreground">Events Available</div>
                </CardContent>
              </Card>
              
              <Card className="border-0 bg-gradient-card text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-hero rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">1,200+</div>
                  <div className="text-sm text-muted-foreground">Active Volunteers</div>
                </CardContent>
              </Card>
              
              <Card className="border-0 bg-gradient-card text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-hero rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Building className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">350+</div>
                  <div className="text-sm text-muted-foreground">Partner NGOs</div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Side - Registration Form */}
          <div className="order-1 lg:order-2">
            <Card className="border-0 shadow-glow bg-gradient-card">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl font-bold">Create Your Account</CardTitle>
                <p className="text-muted-foreground">Join thousands of volunteers making an impact</p>
              </CardHeader>
              
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-base font-semibold">First Name</Label>
                      <div className="relative mt-2">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                        <Input 
                          id="firstName" 
                          type="text"
                          placeholder="John"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          required
                          className="pl-12 h-12 border-2 border-border/50 focus:border-primary"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="lastName" className="text-base font-semibold">Last Name</Label>
                      <div className="relative mt-2">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                        <Input 
                          id="lastName" 
                          type="text"
                          placeholder="Doe"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          required
                          className="pl-12 h-12 border-2 border-border/50 focus:border-primary"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-base font-semibold">Email Address</Label>
                    <div className="relative mt-2">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                      <Input 
                        id="email" 
                        type="email"
                        placeholder="john@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="pl-12 h-12 border-2 border-border/50 focus:border-primary"
                      />
                    </div>
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
                      I agree to the{" "}
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
                    {loading ? "Creating Account..." : "Create Account"}
                  </Button>

                  <Separator className="my-6" />

                  <div className="text-center">
                    <p className="text-muted-foreground mb-4">Already have an account?</p>
                    <Link to="/signin">
                      <Button variant="outline" size="lg" className="w-full h-12">
                        Sign In
                      </Button>
                    </Link>
                  </div>

                  <Separator className="my-6" />

                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-4">Are you an organization?</p>
                    <Link to="/ngo-register">
                      <Button variant="outline" size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground border-accent">
                        <Building className="w-4 h-4 mr-2" />
                        Register Your NGO
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

export default Register;