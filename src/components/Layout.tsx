
import { Link, Outlet, useLocation } from "react-router-dom";
import { Home, Image, ImagePlus, History } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Layout = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-border/40 backdrop-blur-sm bg-background/80 sticky top-0 z-10">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src="/lovable-uploads/58e8c24b-2bbf-4fb4-b298-eb1f3f05a61c.png" 
                alt="Artifex AI Logo" 
                className="h-10 w-auto transition-all duration-300 hover:animate-pulse hover:drop-shadow-[0_0_10px_rgba(155,135,245,0.5)] animate-[wiggle_1s_ease-in-out]" 
              />
            </Link>
          </div>
          <nav className="flex gap-4 sm:gap-6">
            <Link 
              to="/generate" 
              className={`text-sm font-medium transition-colors flex items-center gap-2 hover:text-primary ${
                location.pathname === "/generate" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <ImagePlus className="h-4 w-4" />
              <span className={isMobile ? "hidden" : "inline"}>Generate</span>
            </Link>
            <Link 
              to="/gallery" 
              className={`text-sm font-medium transition-colors flex items-center gap-2 hover:text-primary ${
                location.pathname === "/gallery" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Image className="h-4 w-4" />
              <span className={isMobile ? "hidden" : "inline"}>Gallery</span>
            </Link>
            <Link 
              to="/history" 
              className={`text-sm font-medium transition-colors flex items-center gap-2 hover:text-primary ${
                location.pathname === "/history" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <History className="h-4 w-4" />
              <span className={isMobile ? "hidden" : "inline"}>History</span>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 container px-4 py-6 md:px-6 md:py-8">
        <Outlet />
      </main>
      <footer className="border-t border-border/40 py-4 bg-background">
        <div className="container flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} Pollination AI. All rights reserved.
          </p>
          <p className="text-center text-sm text-muted-foreground md:text-right">
            Powered by Pollination AI
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
