import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CTASection = () => {
  return (
    <section className="py-24 hero-gradient relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute right-0 top-0 w-1/3 h-full bg-primary/10 skew-x-12 translate-x-1/4" />
      
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-4xl md:text-6xl text-background mb-6">
            READY TO ELEVATE
            <br />
            <span className="text-primary">YOUR TEAM'S SAFETY?</span>
          </h2>
          
          <p className="text-background/70 text-lg mb-10 max-w-xl mx-auto">
            Get in touch with our training specialists to discuss your needs 
            and build a customized training program for your organization.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-base px-8">
              Schedule Consultation
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-base px-8 bg-transparent border-background/30 text-background hover:bg-background/10 hover:text-background"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call (123) 456-7890
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
