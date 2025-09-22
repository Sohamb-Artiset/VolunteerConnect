import { Button } from "@/components/ui/button";
import { Search, Heart, Users, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-volunteers.jpg";

const Hero = () => {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-accent/80"></div>
      </div>
      
      {/* Content */}
      <div className="relative container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-8">
            <Heart className="w-4 h-4 text-highlight" />
            <span className="text-sm font-medium">Connecting Hearts, Creating Impact</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Find Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-highlight to-yellow-300">
              Perfect Volunteer
            </span>
            Opportunity
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-white/90 leading-relaxed">
            Connect with verified NGOs and make a real difference in your community. 
            Discover meaningful volunteer opportunities that match your skills and passion.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link to="/opportunities">
              <Button 
                size="lg" 
                className="bg-highlight hover:bg-highlight/90 text-highlight-foreground px-8 py-6 text-lg font-semibold shadow-glow"
              >
                <Search className="w-5 h-5 mr-3" />
                Find Opportunities
              </Button>
            </Link>
            <Link to="/ngo-register">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold backdrop-blur-sm"
              >
                Register Your NGO
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="flex items-center justify-center mb-3">
                <Users className="w-8 h-8 text-highlight" />
              </div>
              <div className="text-3xl font-bold">1,200+</div>
              <div className="text-white/80">Active Volunteers</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-3">
                <Heart className="w-8 h-8 text-highlight" />
              </div>
              <div className="text-3xl font-bold">350+</div>
              <div className="text-white/80">Partner NGOs</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-3">
                <Calendar className="w-8 h-8 text-highlight" />
              </div>
              <div className="text-3xl font-bold">5,000+</div>
              <div className="text-white/80">Events Completed</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;