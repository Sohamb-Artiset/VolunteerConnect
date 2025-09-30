import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Building, Shield, Users, Target } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const NGOSignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);

    if (error) {
      toast({
        title: "Sign in failed",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Success!",
        description: "Signed in successfully"
      });
      navigate("/dashboard");
    }
  };

  return (
    <div className="bg-gradient-to-br from-accent/5 via-primary/10 to-highlight/5">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Welcome Content for NGOs */}
          <div className="order-2 lg:order-1">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Welcome Back
                <span className="block text-transparent bg-clip-text bg-gradient-hero mt-2">
                  Partner Organizations
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Access your organization dashboard to manage volunteer opportunities, 
                connect with volunteers, and track your impact in the community.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="border-0 bg-gradient-card text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-hero rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">15,000+</div>
                  <div className="text-sm text-muted-foreground">Volunteer Connections</div>
                </CardContent>
              </Card>
              
              <Card className="border-0 bg-gradient-card text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-hero rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">2,800+</div>
                  <div className="text-sm text-muted-foreground">Events Posted</div>
                </CardContent>
              </Card>
              
              <Card className="border-0 bg-gradient-card text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-hero rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">100%</div>
                  <div className="text-sm text-muted-foreground">Verified NGOs</div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Side - NGO Sign In Form */}
          <div className="order-1 lg:order-2">
            <Card className="border-0 shadow-glow bg-gradient-card">
              <CardHeader className="text-center pb-6">
                <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold">NGO Partner Sign In</CardTitle>
                <p className="text-muted-foreground">Access your organization dashboard</p>
              </CardHeader>
              
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="org-email" className="text-base font-semibold">Organization Email</Label>
                    <div className="relative mt-2">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                      <Input 
                        id="org-email" 
                        type="email"
                        placeholder="organization@ngo.org"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="pl-12 h-12 border-2 border-border/50 focus:border-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="org-password" className="text-base font-semibold">Password</Label>
                    <div className="relative mt-2">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                      <Input 
                        id="org-password" 
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="pl-12 h-12 border-2 border-border/50 focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded border-border text-primary" />
                      <span className="text-muted-foreground">Remember me</span>
                    </label>
                    <Link to="#" className="text-primary hover:text-primary-hover font-medium">
                      Forgot password?
                    </Link>
                  </div>

                  <Button type="submit" size="lg" disabled={loading} className="w-full bg-gradient-hero hover:opacity-90 h-12">
                    <Building className="w-5 h-5 mr-2" />
                    {loading ? "Signing In..." : "Sign In to Dashboard"}
                  </Button>

                  <Separator className="my-6" />

                  <div className="text-center">
                    <p className="text-muted-foreground mb-4">New organization?</p>
                    <Link to="/ngo-register">
                      <Button variant="outline" size="lg" className="w-full h-12">
                        Register Your NGO
                      </Button>
                    </Link>
                  </div>

                  <Separator className="my-6" />

                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-4">Looking to volunteer instead?</p>
                    <Link to="/signin">
                      <Button variant="ghost" size="sm" className="text-primary hover:text-primary-hover">
                        Volunteer Sign In
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

export default NGOSignIn;