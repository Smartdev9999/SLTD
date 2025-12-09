import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ReactNode } from "react";

interface PageLayoutProps {
  children: ReactNode;
}

export const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-32">
        {children}
      </main>
      <Footer />
    </div>
  );
};
