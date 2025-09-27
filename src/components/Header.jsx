import { Button } from "@/components/ui/button";
import { Heart, Menu, User } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <div className="w-10 h-10 bg-gradient-hero rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">MCS-Project</h1>
              <p className="text-xs text-muted-foreground">Making impact together</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/opportunities" className="text-foreground hover:text-primary transition-colors">
              Find Opportunities
            </Link>
            <Link to="/organizations" className="text-foreground hover:text-primary transition-colors">
              Organizations
            </Link>
            <Link to="/about" className="text-foreground hover:text-primary transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-foreground hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/signin">
              <Button variant="ghost" size="sm">
                <User className="w-4 h-4 mr-2" />
                Sign In
              </Button>
            </Link>
            <Link to="/get-started">
              <Button variant="default" size="sm" className="bg-gradient-hero hover:opacity-90">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border">
            <nav className="flex flex-col gap-4 pt-4">
              <Link to="/opportunities" className="text-foreground hover:text-primary transition-colors">
                Find Opportunities
              </Link>
              <Link to="/organizations" className="text-foreground hover:text-primary transition-colors">
                Organizations
              </Link>
              <Link to="/about" className="text-foreground hover:text-primary transition-colors">
                About
              </Link>
              <Link to="/contact" className="text-foreground hover:text-primary transition-colors">
                Contact
              </Link>
              <div className="flex flex-col gap-2 mt-4">
                <Link to="/signin">
                  <Button variant="ghost" size="sm" className="justify-start w-full">
                    <User className="w-4 h-4 mr-2" />
                    Sign In
                  </Button>
                </Link>
                <Link to="/get-started">
                  <Button variant="default" size="sm" className="bg-gradient-hero hover:opacity-90 w-full">
                    Get Started
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;