// src/components/Footer.jsx
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaFacebook, FaEnvelope, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-primary/90 via-primary/70 to-accent/80 text-white py-12 mt-10">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-0">
        
        {/* Left - Brand */}
        <div className="text-center md:text-left flex-1">
          <h1 className="text-2xl font-bold mb-2">VolunteerConnect</h1>
          <p className="text-sm text-white/80">
            Connecting volunteers with opportunities and creating impact together.
          </p>
        </div>

        {/* Middle - Links */}
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 flex-1 text-center md:text-left">
          {["About", "Contact", "Opportunities", "Organizations", "Blog", "FAQ"].map((link, idx) => (
            <a 
              key={idx} 
              href={`/${link.toLowerCase()}`} 
              className="hover:text-yellow-300 transition-colors duration-300 relative group"
            >
              {link}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-yellow-300 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* Right - Socials / Connect More */}
        <div className="flex flex-col items-center md:items-end space-y-4 flex-1">
          <p className="text-sm font-medium">Connect with us</p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-end">
            {[FaGithub, FaLinkedin, FaTwitter, FaFacebook, FaInstagram, FaYoutube, FaEnvelope].map((Icon, idx) => (
              <a 
                key={idx} 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white hover:text-yellow-300 transition-colors duration-300 transform hover:scale-110 motion-safe:animate-bounce"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter / Signup */}
      <div className="mt-10 text-center">
        <p className="mb-4 text-sm text-white/80">Subscribe to our newsletter for latest volunteer opportunities</p>
        <form className="flex flex-col sm:flex-row justify-center gap-2">
          <input 
            type="email" 
            placeholder="Your email" 
            className="px-4 py-2 rounded-md text-black focus:outline-none w-full sm:w-auto"
          />
          <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-2 rounded-md font-semibold transition-colors duration-300 transform hover:scale-105">
            Subscribe
          </button>
        </form>
      </div>

      {/* Bottom - Copyright */}
      <div className="mt-10 text-center text-sm text-white/60 border-t border-white/30 pt-6">
        © {new Date().getFullYear()} VolunteerConnect. All rights reserved.
      </div>
    </footer>
  );
}
