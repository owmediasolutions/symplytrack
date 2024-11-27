import { Card } from "@/components/ui/card";
import SupplementTracker from "@/components/SupplementTracker";
import SymptomTracker from "@/components/SymptomTracker";

const Index = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Supplements</h2>
          <SupplementTracker />
        </Card>
        
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Symptome</h2>
          <SymptomTracker />
        </Card>
      </div>
    </div>
  );
};

export default Index;