import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUpIcon, UsersIcon, DollarSignIcon, FolderIcon, ZapIcon, BrainIcon, RocketIcon, ClockIcon } from "lucide-react";

const Index = () => {
  const stats = [
    {
      title: "Total Revenue",
      value: "$54,321",
      icon: <TrendingUpIcon className="h-4 w-4 text-green-500" />,
    },
    {
      title: "New Users",
      value: "1,234",
      icon: <UsersIcon className="h-4 w-4 text-blue-500" />,
    },
    {
      title: "Profit Margin",
      value: "23.5%",
      icon: <DollarSignIcon className="h-4 w-4 text-yellow-500" />,
    },
    {
      title: "Active Projects",
      value: "42",
      icon: <FolderIcon className="h-4 w-4 text-purple-500" />,
    },
  ];

  const features = [
    {
      title: "AI-powered content generation",
      description: "Create high-quality content automatically with our advanced AI algorithms",
      icon: <ZapIcon className="h-5 w-5" />,
    },
    {
      title: "Intelligent data analysis",
      description: "Get deep insights from your data with machine learning",
      icon: <BrainIcon className="h-5 w-5" />,
    },
    {
      title: "Personalized recommendations",
      description: "Receive tailored suggestions based on your usage patterns",
      icon: <RocketIcon className="h-5 w-5" />,
    },
    {
      title: "Automated task scheduling",
      description: "Let AI handle your routine tasks and save time",
      icon: <ClockIcon className="h-5 w-5" />,
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <h1 className="text-3xl font-bold text-[#1A73E8] dark:text-[#60A5FA]">
        Welcome back, John!
      </h1>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
              {stat.icon}
            </div>
          </Card>
        ))}
      </div>

      {/* Features Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-[#F97316]">Upcoming AI Features</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-all hover:scale-[1.02]">
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-primary/10 p-3">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {feature.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Integration Cards */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-[#F97316]">Available Integrations</h2>
          <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
            + Neue Integration hinzufügen
          </Button>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            { name: "OpenAI", status: "Nicht verbunden", url: "https://api.openai.com" },
            { name: "Leonardo AI", status: "Nicht verbunden", url: "https://cloud.leonardo.ai/api" },
            { name: "Eleven Labs", status: "Nicht verbunden", url: "https://api.elevenlabs.io" },
          ].map((integration, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-all">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{integration.name}</h3>
                  <Button variant="ghost" size="icon">
                    <SettingsIcon className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-red-500">{integration.status}</p>
                <p className="text-sm text-muted-foreground">{integration.url}</p>
                <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                  Verbinden
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;