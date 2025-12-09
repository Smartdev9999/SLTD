import { MapPin, Phone, Mail, Clock } from "lucide-react";

const quickLinks = [
  { name: "Training Courses", href: "#courses" },
  { name: "About Us", href: "#about" },
  { name: "Contact", href: "#contact" },
  { name: "Resources", href: "#resources" },
  { name: "FAQs", href: "#faqs" },
];

const courses = [
  "OSHA 10-Hour",
  "OSHA 30-Hour",
  "Forklift Training",
  "Fall Protection",
  "Confined Space",
  "Hazmat Training",
];

export const Footer = () => {
  return (
    <footer id="contact" className="bg-accent text-accent-foreground">
      <div className="container py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company info */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center">
                <span className="font-display text-xl text-primary-foreground">LS</span>
              </div>
              <div>
                <span className="font-display text-xl text-accent-foreground">LSTD</span>
                <p className="text-xs text-muted-foreground">Industrial Training</p>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Professional industrial safety training and compliance solutions 
              for businesses of all sizes.
            </p>
            <div className="flex gap-4">
              {/* Social icons placeholder */}
              {["FB", "LI", "TW"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 bg-muted/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors text-sm font-medium"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick links */}
          <div>
            <h4 className="font-display text-lg text-accent-foreground mb-6">QUICK LINKS</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Courses */}
          <div>
            <h4 className="font-display text-lg text-accent-foreground mb-6">POPULAR COURSES</h4>
            <ul className="space-y-3">
              {courses.map((course) => (
                <li key={course}>
                  <a 
                    href="#courses"
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {course}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact info */}
          <div>
            <h4 className="font-display text-lg text-accent-foreground mb-6">CONTACT US</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground text-sm">
                  123 Industrial Parkway<br />
                  Suite 100<br />
                  Houston, TX 77001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <a href="tel:+1234567890" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  (123) 456-7890
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <a href="mailto:info@lstd.com" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  info@lstd.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground text-sm">
                  Mon - Fri: 7:00 AM - 5:00 PM<br />
                  Sat: By Appointment
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Bottom bar */}
      <div className="border-t border-muted/10">
        <div className="container py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} LSTD Industrial Training. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
