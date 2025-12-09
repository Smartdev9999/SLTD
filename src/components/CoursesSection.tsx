import { CourseCard } from "./CourseCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const courses = [
  {
    title: "OSHA 10-Hour General Industry",
    description: "Foundational safety training covering workplace hazards, PPE, and OSHA regulations for general industry workers.",
    duration: "10 Hours",
    participants: "Max 25 per class",
    certification: "OSHA DOL Card",
    featured: false,
  },
  {
    title: "OSHA 30-Hour Construction",
    description: "Comprehensive safety training for construction supervisors and managers covering all major safety topics.",
    duration: "30 Hours",
    participants: "Max 20 per class",
    certification: "OSHA DOL Card",
    featured: true,
  },
  {
    title: "Forklift Operator Certification",
    description: "Complete forklift training including theory, hands-on operation, and OSHA-compliant evaluation.",
    duration: "8 Hours",
    participants: "Max 12 per class",
    certification: "3-Year Certificate",
    featured: false,
  },
  {
    title: "Confined Space Entry",
    description: "Training on hazards of confined spaces, atmospheric testing, and rescue procedures.",
    duration: "8 Hours",
    participants: "Max 15 per class",
    certification: "1-Year Certificate",
    featured: false,
  },
  {
    title: "Fall Protection",
    description: "Comprehensive fall hazard awareness, equipment inspection, and proper use of fall arrest systems.",
    duration: "4 Hours",
    participants: "Max 20 per class",
    certification: "1-Year Certificate",
    featured: false,
  },
  {
    title: "Hazmat Awareness",
    description: "Initial training for employees who may encounter hazardous materials in the workplace.",
    duration: "4 Hours",
    participants: "Max 30 per class",
    certification: "Annual Refresher",
    featured: false,
  },
];

export const CoursesSection = () => {
  return (
    <section id="courses" className="py-24 bg-background">
      <div className="container">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <p className="text-primary font-medium text-sm uppercase tracking-wider mb-2">
              Our Training Programs
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-foreground">
              CERTIFIED SAFETY
              <br />
              <span className="text-primary">TRAINING COURSES</span>
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md">
            From basic safety awareness to advanced certifications, we offer comprehensive 
            training programs tailored to your industry needs.
          </p>
        </div>
        
        {/* Course grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {courses.map((course, index) => (
            <CourseCard
              key={course.title}
              {...course}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` } as React.CSSProperties}
            />
          ))}
        </div>
        
        {/* View all */}
        <div className="text-center">
          <Button size="lg" variant="outline" className="group">
            View All Courses
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};
