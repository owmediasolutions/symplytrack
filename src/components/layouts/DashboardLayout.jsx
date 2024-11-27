import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MenuIcon, XIcon, UserIcon } from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import { navItems } from "@/nav-items";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const isCurrentPath = (path) => location.pathname === path;

  return (
    <div className="relative min-h-screen bg-background">
      {/* Sidebar */}
      <div
        className={cn(
          "fixed left-0 top-0 z-40 h-screen w-64 transform border-r bg-background transition-transform duration-200 ease-in-out lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo area */}
          <div className="flex h-16 items-center border-b px-4">
            <span className="text-xl font-semibold text-primary">SymplyTrack</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(false)}
              className="ml-auto lg:hidden"
            >
              <XIcon className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <ScrollArea className="flex-1 px-3 py-2">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                    isCurrentPath(item.to)
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                >
                  {item.icon}
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
        <header className="sticky top-0 z-30 flex h-16 items-center border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="mr-4 lg:hidden"
            >
              <MenuIcon className="h-5 w-5" />
            </Button>
            <div className="ml-auto">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <UserIcon className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="cursor-not-allowed opacity-50">
                    Profil (Coming Soon)
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="container py-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;