import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import dotmacLogo from "@/assets/dotmac-logo.png";
import whatsappIcon from "@/assets/whatsapp-icon.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Plans", path: "/plans" },
    { name: "About", path: "/about" },
    { name: "Support", path: "/support" },
    { name: "Contact", path: "/contact" },
  ];

  const services = [
    "Cloud Solutions",
    "Cybersecurity",
    "Network Setup",
    "Government Digital Services",
    "Consulting Services",
    "Internet Services",
  ];

  return (
    <>
      <footer className="bg-background text-foreground relative border-t">
        <div className="container mx-auto px-4 pt-12 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Company Info with Mission/Vision */}
            <div className="space-y-4">
              <img src={dotmacLogo} alt="Dotmac Technologies" className="h-10 w-auto" />
              <div>
                <h4 className="font-bold text-foreground mb-2">Our Vision</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  To be the leading provider of innovative technology solutions that improve the quality of life.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-foreground mb-2">Our Mission</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  To design and deploy innovative and beneficial technology solutions, while creating value for all our stakeholders.
                </p>
              </div>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="font-bold text-lg mb-4 text-foreground">Company</h3>
              <ul className="space-y-2">
                {quickLinks.slice(0, 6).map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-bold text-lg mb-4 text-foreground">Services</h3>
              <ul className="space-y-2">
                {services.slice(0, 6).map((service) => (
                  <li key={service}>
                    <Link
                      to="/services"
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      {service}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-bold text-lg mb-4 text-foreground">Contact</h3>
              <div className="space-y-4 text-sm">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 text-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-1">Send us a message</p>
                    <a href="mailto:sales@dotmac.ng" className="text-muted-foreground hover:text-foreground transition-colors">
                      sales@dotmac.ng
                    </a>
                  </div>
                </div>
                
                <a 
                  href="https://wa.me/2348121179536"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start space-x-3 group"
                >
                  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 group-hover:scale-110 transition-transform">
                    <img src={whatsappIcon} alt="WhatsApp" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-1">Chat with us</p>
                    <p className="text-muted-foreground group-hover:text-foreground transition-colors">
                      +234 812 117 9536
                    </p>
                  </div>
                </a>
                
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-1">Where we are</p>
                    <p className="text-muted-foreground text-xs">
                      <strong>Abuja:</strong> 8 Ikot Ekpene Close, off Emeka Anyaokwu Street, Area 11, Garki, Abuja<br /><br />
                      <strong>Lagos:</strong> 2nd Floor Centage Plaza, 14 Allen Avenue, Ikeja, Lagos
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Social Media */}
        <div className="container mx-auto px-4 pb-8">
          <div className="flex justify-center space-x-4">
            <a
              href="https://www.facebook.com/dotmac.ng/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href="https://www.twitter.com/dotmac_ng/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href="https://www.instagram.com/dotmac_ng/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="https://www.linkedin.com/search/results/all/?keywords=dotmac%20broadband%20internet&origin=RICH_QUERY_SUGGESTION&position=0&searchId=3f708c79-a6a2-4aed-b9da-56c161b0935a&sid=Oi6"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="container mx-auto px-4 pt-8 border-t border-border">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Dotmac Technologies PLC. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;