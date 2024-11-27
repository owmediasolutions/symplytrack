import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MenuIcon, XIcon } from "lucide-react";
import { useLocation, Link } from "react-router-dom";

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const isCurrentPath = (path) => location.pathname === path;

  const navItems = [
    { title: "Dashboard", path: "/" },
    { title: "Supplements", path: "/supplements" },
    { title: "Symptome", path: "/symptoms" },
    { title: "Analyse", path: "/analysis" },
    { title: "KI-Assistent", path: "/assistant" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <div
        className={cn(
          "fixed left-0 top-0 z-40 h-full w-64 transform bg-card shadow-lg transition-transform duration-200 ease-in-out",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo area */}
          <div className="flex h-16 items-center justify-between px-4">
            <span className="text-xl font-semibold text-primary">SymplyTrack</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden"
            >
              <XIcon className="h-6 w-6" />
            </Button>
          </div>

          {/* Navigation */}
          <ScrollArea className="flex-1 px-3 py-2">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center rounded-lg px-3 py-2 text-sm transition-colors",
                    isCurrentPath(item.path)
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          </ScrollArea>
        </div>
      </div>

      {/* Main content */}
      <div
        className={cn(
          "min-h-screen transition-all duration-200 ease-in-out",
          sidebarOpen ? "lg:pl-64" : ""
        )}
      >
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center border-b bg-background/95 backdrop-blur">
          <div className="container flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden"
            >
              <MenuIcon className="h-6 w-6" />
            </Button>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                Profil
              </Button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="container py-6">
          <div className="animate-fade-in">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;