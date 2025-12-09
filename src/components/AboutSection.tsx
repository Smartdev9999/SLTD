import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  "OSHA-Authorized Training Provider",
  "Certified Instructors with Field Experience",
  "Flexible Scheduling & On-Site Training",
  "Customized Programs for Your Industry",
  "Bilingual Training Available",
  "Digital Certificates & Records Management",
];

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-muted">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image side */}
          <div className="relative">
            <div className="aspect-[4/3] bg-accent rounded-lg overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-accent to-foreground/80 flex items-center justify-center">
                <span className="font-display text-6xl text-primary opacity-20">LSTD</span>
              </div>
            </div>
            {/* Floating stats card */}
            <div className="absolute -bottom-8 -right-8 bg-primary text-primary-foreground p-6 rounded-lg shadow-xl">
              <div className="font-display text-5xl">25+</div>
              <div className="text-primary-foreground/80 text-sm">Years of Excellence</div>
            </div>
          </div>
          
          {/* Content side */}
          <div>
            <p className="text-primary font-medium text-sm uppercase tracking-wider mb-2">
              About LSTD
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-foreground mb-6">
              YOUR TRUSTED
              <br />
              <span className="text-primary">TRAINING PARTNER</span>
            </h2>
            
            <p className="text-muted-foreground mb-8 leading-relaxed">
              For over two decades, LSTD has been the premier provider of industrial safety 
              training and compliance solutions. Our mission is to create safer workplaces 
              through education, practical training, and ongoing support.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {features.map((feature) => (
                <div key={feature} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground text-sm">{feature}</span>
                </div>
              ))}
            </div>
            
            <Button size="lg">
              Learn More About Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
