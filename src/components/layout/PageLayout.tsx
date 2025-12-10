import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FrontEditToggle } from "@/components/front-edit/FrontEditToggle";
import { ReactNode } from "react";

interface PageLayoutProps {
  children: ReactNode;
}

export const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        {children}
      </main>
      <Footer />
      <FrontEditToggle />
    </div>
  );
};
