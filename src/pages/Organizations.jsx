// src/pages/Organizations.jsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Search, MapPin, Users, Heart, Mail, Phone, Globe, Star } from "lucide-react";

const mockOrganizations = [
  {
    id: 1,
    name: "Pune Food Bank",
    mission: "Providing nutritious meals and essential resources to underprivileged families across Pune.",
    location: "Shivajinagar, Pune",
    founded: 2000,
    volunteers: 200,
    activeEvents: 10,
    rating: 4.9,
    categories: ["Food Security", "Community Support"],
    contact: {
      email: "info@punefoodbank.org",
      phone: "(020) 1234-5678",
      website: "punefoodbank.org"
    },
    description: "Serving over 12,000 meals monthly, Pune Food Bank has been a lifeline for Pune's communities for over 20 years."
  },
  {
    id: 2,
    name: "Green Pune Initiative",
    mission: "Promoting sustainability and environmental awareness through tree plantations and community programs.",
    location: "Kothrud, Pune",
    founded: 2012,
    volunteers: 120,
    activeEvents: 7,
    rating: 4.8,
    categories: ["Environment", "Sustainability"],
    contact: {
      email: "hello@greenpune.org",
      phone: "(020) 8765-4321",
      website: "greenpune.org"
    },
    description: "Engaging local communities in eco-friendly projects, Green Pune Initiative has planted over 50,000 trees since inception."
  },
  {
    id: 3,
    name: "Pune Youth Empowerment",
    mission: "Empowering Pune's youth with skills, education, and leadership programs for holistic development.",
    location: "Baner, Pune",
    founded: 2008,
    volunteers: 90,
    activeEvents: 9,
    rating: 4.7,
    categories: ["Education", "Youth Development"],
    contact: {
      email: "contact@pune-youth.org",
      phone: "(020) 5678-1234",
      website: "pune-youth.org"
    },
    description: "Focused on mentoring and skill development, Pune Youth Empowerment has reached over 5,000 young individuals."
  }
];

const Organizations = () => {
  return (
    <div className="bg-gradient-to-br from-background via-accent-light/20 to-highlight-light/10">
      <div className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Partner 
            <span className="text-transparent bg-clip-text bg-gradient-hero ml-3">
              Organizations in Pune
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore verified NGOs and nonprofits making a difference in Pune. Connect with causes that match your passion.
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-card rounded-2xl shadow-card p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input 
                placeholder="Search organizations by name, cause, or mission..."
                className="pl-12 h-12 text-lg border-2 border-border/50 focus:border-primary"
              />
            </div>
            <Button size="lg" className="bg-gradient-hero hover:opacity-90 h-12">
              <Search className="w-5 h-5 mr-2" />
              Search
            </Button>
          </div>
        </div>

        {/* Organizations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {mockOrganizations.map((org) => (
            <Card key={org.id} className="group hover:shadow-glow transition-all duration-300 border-0 bg-gradient-card overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-hero rounded-xl flex items-center justify-center">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {org.name}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="ml-1 text-sm font-medium">{org.rating}</span>
                        </div>
                        <span className="text-muted-foreground text-sm">•</span>
                        <span className="text-sm text-muted-foreground">Since {org.founded}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {org.categories.map((category) => (
                    <Badge key={category} className="bg-gradient-accent text-highlight-foreground">
                      {category}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-foreground font-medium mb-3 leading-relaxed">
                  "{org.mission}"
                </p>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {org.description}
                </p>
                <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-accent-light rounded-lg">
                  <div className="text-center">
                    <Users className="w-4 h-4 text-accent mx-auto mb-1" />
                    <div className="text-2xl font-bold text-accent">{org.volunteers}</div>
                    <div className="text-sm text-muted-foreground">Active Volunteers</div>
                  </div>
                  <div className="text-center">
                    <Heart className="w-4 h-4 text-accent mx-auto mb-1" />
                    <div className="text-2xl font-bold text-accent">{org.activeEvents}</div>
                    <div className="text-sm text-muted-foreground">Active Events</div>
                  </div>
                </div>
                
                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-2 text-accent" />
                    {org.location}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Mail className="w-4 h-4 mr-2 text-accent" />
                    {org.contact.email}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Phone className="w-4 h-4 mr-2 text-accent" />
                    {org.contact.phone}
                  </div>
                </div>
                
                <div className="flex gap-2 flex-wrap">
                  <Button className="flex-1 bg-gradient-hero hover:opacity-90">
                    View Profile
                  </Button>
                  <Button variant="outline" size="sm" className="px-3">
                    <Globe className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="bg-highlight hover:bg-highlight/90 text-highlight-foreground border-highlight">
                    Contact to Donate
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="px-8">
            Load More Organizations
          </Button>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-hero rounded-2xl p-12 mt-16 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Is Your Organization Missing?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Join our network of verified NGOs and connect with passionate volunteers in Pune.
          </p>
          <Link to="/ngo-register">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 px-8">
              Register Your NGO
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Organizations;
