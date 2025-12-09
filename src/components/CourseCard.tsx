import { Clock, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CourseCardProps {
  title: string;
  description: string;
  duration: string;
  participants: string;
  certification: string;
  featured?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const CourseCard = ({
  title,
  description,
  duration,
  participants,
  certification,
  featured = false,
  className,
  style,
}: CourseCardProps) => {
  return (
    <div
      className={cn(
        "group relative bg-card rounded-lg p-6 card-shadow transition-all duration-300 hover:card-shadow-hover hover:-translate-y-1",
        featured && "border-2 border-primary",
        className
      )}
      style={style}
    >
      {featured && (
        <div className="absolute -top-3 left-6 bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
          Most Popular
        </div>
      )}
      
      <h3 className="font-display text-2xl text-foreground mb-3 group-hover:text-primary transition-colors">
        {title}
      </h3>
      
      <p className="text-muted-foreground text-sm mb-6 line-clamp-2">
        {description}
      </p>
      
      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-3 text-sm">
          <Clock className="w-4 h-4 text-primary" />
          <span className="text-foreground">{duration}</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Users className="w-4 h-4 text-primary" />
          <span className="text-foreground">{participants}</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Award className="w-4 h-4 text-primary" />
          <span className="text-foreground">{certification}</span>
        </div>
      </div>
      
      <Button className="w-full" variant={featured ? "default" : "outline"}>
        Learn More
      </Button>
    </div>
  );
};
