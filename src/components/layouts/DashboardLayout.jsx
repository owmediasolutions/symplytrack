import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  HomeIcon, UsersIcon, FileTextIcon, BarChart3Icon, MessageCircleIcon,
  SettingsIcon, HelpCircleIcon, FolderIcon, Zap, DatabaseIcon, GlobeIcon,
  ShieldIcon, SunIcon, MoonIcon, GlobeIcon as LanguageIcon, UserIcon
} from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navItems = [
  { title: "Dashboard", icon: <HomeIcon className="h-5 w-5" />, to: "/" },
  { title: "Users", icon: <UsersIcon className="h-5 w-5" />, to: "/users" },
  { title: "Documents", icon: <FileTextIcon className="h-5 w-5" />, to: "/documents" },
  { title: "Analytics", icon: <BarChart3Icon className="h-5 w-5" />, to: "/analytics" },
  { title: "Chat", icon: <MessageCircleIcon className="h-5 w-5" />, to: "/chat" },
  { title: "Settings", icon: <SettingsIcon className="h-5 w-5" />, to: "/settings" },
  { title: "Help", icon: <HelpCircleIcon className="h-5 w-5" />, to: "/help" },
  { title: "Projects", icon: <FolderIcon className="h-5 w-5" />, to: "/projects" },
  { title: "AI Assistant", icon: <Zap className="h-5 w-5" />, to: "/ai-assistant" },
  { title: "Data Management", icon: <DatabaseIcon className="h-5 w-5" />, to: "/data" },
  { title: "Integrations", icon: <GlobeIcon className="h-5 w-5" />, to: "/integrations" },
  { title: "Security", icon: <ShieldIcon className="h-5 w-5" />, to: "/security" },
];

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className={cn(
      "min-h-screen bg-[#F8F9FC] dark:bg-[#0B101B] transition-colors duration-300",
      isDarkMode ? "dark" : ""
    )}>
      {/* Sidebar */}
      <div className={cn(
        "fixed left-0 top-0 z-40 h-screen w-64 transform border-r bg-white dark:bg-[#111827] transition-all duration-300 ease-in-out lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center gap-2 border-b px-6">
            <span className="text-2xl font-bold text-primary">MyApp</span>
          </div>

          <ScrollArea className="flex-1 px-4 py-3">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                    location.pathname === item.to
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
      <div className={cn("transition-all duration-300", sidebarOpen ? "lg:pl-64" : "")}>
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center border-b bg-white/95 dark:bg-[#111827]/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
          <div className="container flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden"
              >
                <MenuIcon className="h-5 w-5" />
              </Button>
              <Input
                type="search"
                placeholder="Suchen..."
                className="w-[300px] bg-secondary"
              />
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={toggleTheme}>
                {isDarkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
              </Button>
              
              <Button variant="ghost" size="icon">
                <LanguageIcon className="h-5 w-5" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-full">
                    <UserIcon className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Profil</DropdownMenuItem>
                  <DropdownMenuItem>Einstellungen</DropdownMenuItem>
                  <DropdownMenuItem>Abmelden</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="container py-6">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t bg-white dark:bg-[#111827] py-6">
          <div className="container">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-muted-foreground">
                © 2024 MyApp. All rights reserved.
              </p>
              <div className="flex gap-6 text-sm text-muted-foreground">
                <Link to="/privacy" className="hover:text-foreground">Privacy Policy</Link>
                <Link to="/terms" className="hover:text-foreground">Terms of Service</Link>
                <Link to="/contact" className="hover:text-foreground">Contact Us</Link>
                <Link to="/faq" className="hover:text-foreground">FAQ</Link>
                <Link to="/blog" className="hover:text-foreground">Blog</Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default DashboardLayout;