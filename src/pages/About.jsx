import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, Target, Shield, Award, Globe } from "lucide-react";

const stats = [
  { icon: Users, value: "1,200+", label: "Active Volunteers" },
  { icon: Heart, value: "350+", label: "Partner NGOs" },
  { icon: Target, value: "5,000+", label: "Events Completed" },
  { icon: Globe, value: "25+", label: "Cities Covered" }
];

const values = [
  {
    icon: Heart,
    title: "Community First",
    description: "We believe in the power of community-driven change. Every volunteer opportunity is designed to create meaningful impact at the local level."
  },
  {
    icon: Shield,
    title: "Trust & Safety",
    description: "All our partner organizations are thoroughly verified. We maintain the highest standards of safety and transparency for our volunteers."
  },
  {
    icon: Users,
    title: "Inclusive Impact",
    description: "Volunteer opportunities for everyone, regardless of age, background, or experience level. Everyone has something valuable to contribute."
  },
  {
    icon: Target,
    title: "Measurable Change",
    description: "We track and celebrate the real impact created through our platform, ensuring every hour volunteered makes a difference."
  }
];

const About = () => {
  return (
    <>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary/10 via-accent-light/20 to-highlight-light/10">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              krushna about 
              <span className="text-transparent bg-clip-text bg-gradient-hero ml-3">
                VolunteerConnect
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              We're on a mission to bridge the gap between passionate volunteers and impactful organizations, 
              creating stronger communities one connection at a time.
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-foreground mb-6">Our Story</h2>
                <div className="w-24 h-1 bg-gradient-hero mx-auto rounded-full"></div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    VolunteerConnect was born from a simple observation: there are countless people who want to make a difference, 
                    and countless organizations that need their help, but connecting them was unnecessarily complicated.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Founded in 2023, we set out to create a platform that makes volunteering accessible, transparent, and rewarding. 
                    Our team combines technology with deep community knowledge to ensure every match we facilitate creates lasting impact.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Today, we're proud to be the trusted bridge connecting passionate volunteers with verified organizations 
                    across 25+ cities, facilitating thousands of meaningful volunteer experiences every month.
                  </p>
                </div>
                
                <Card className="bg-gradient-card border-0 shadow-card">
                  <CardContent className="p-8">
                    <div className="grid grid-cols-2 gap-6">
                      {stats.map((stat, index) => (
                        <div key={index} className="text-center">
                          <div className="w-12 h-12 bg-gradient-hero rounded-xl flex items-center justify-center mx-auto mb-3">
                            <stat.icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                          <div className="text-sm text-muted-foreground">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 bg-gradient-to-br from-accent-light/30 to-highlight-light/20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <Card className="bg-gradient-card border-0 shadow-card">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-hero rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">Our Mission</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    To democratize volunteer opportunities by creating transparent, accessible connections between 
                    individuals who want to serve and organizations that need support, ultimately strengthening 
                    communities through collective action.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-0 shadow-card">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-hero rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">Our Vision</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    A world where every person can easily find meaningful ways to contribute to causes they care about, 
                    and every organization has access to the volunteers they need to achieve their mission.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-6">Our Values</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                These core principles guide everything we do and every decision we make.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {values.map((value, index) => (
                <Card key={index} className="group hover:shadow-card transition-all duration-300 border-0 bg-gradient-card">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-hero rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <value.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-3">{value.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-hero text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-3xl mx-auto">
              Join our community of changemakers and discover how your unique skills and passion 
              can create meaningful impact in your local community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 px-8">
                Start Volunteering
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8">
                Partner With Us
              </Button>
            </div>
          </div>
        </section>
    </>
  );
};

export default About;