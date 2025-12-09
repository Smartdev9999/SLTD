import { useState } from "react";
import { Menu, X, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Training Courses", href: "#courses" },
  { name: "About Us", href: "#about" },
  { name: "Resources", href: "#resources" },
  { name: "Contact", href: "#contact" },
];

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top bar */}
      <div className="bg-accent text-accent-foreground text-sm py-2">
        <div className="container flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a href="tel:+1234567890" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">(123) 456-7890</span>
            </a>
            <a href="mailto:info@lstd.com" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Mail className="w-4 h-4" />
              <span className="hidden sm:inline">info@lstd.com</span>
            </a>
          </div>
          <div className="text-muted-foreground">
            Certified Training Provider
          </div>
        </div>
      </div>
      
      {/* Main nav */}
      <nav className="bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between py-4">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary rounded-md flex items-center justify-center">
              <span className="font-display text-2xl text-primary-foreground">LS</span>
            </div>
            <div>
              <span className="font-display text-2xl text-foreground tracking-wider">LSTD</span>
              <p className="text-xs text-muted-foreground -mt-1">Industrial Training</p>
            </div>
          </a>

          {/* Desktop navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Button variant="outline" size="sm">
              Login
            </Button>
            <Button size="sm">
              Book Training
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-background border-t border-border">
            <div className="container py-4 space-y-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block text-foreground hover:text-primary transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="flex gap-4 pt-4 border-t border-border">
                <Button variant="outline" className="flex-1">Login</Button>
                <Button className="flex-1">Book Training</Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
