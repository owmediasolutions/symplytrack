import { useState } from "react";
import { Card } from "@/components/ui/card";
import SupplementTracker from "@/components/SupplementTracker";
import SymptomTracker from "@/components/SymptomTracker";
import Analysis from "@/components/Analysis";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const [supplements, setSupplements] = useState([]);
  const [symptoms, setSymptoms] = useState([]);

  console.log("Supplements updated:", supplements);
  console.log("Symptoms updated:", symptoms);

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
        <header className="text-center">
          <h1 className="text-4xl font-bold text-primary mb-2">Supplement Tracker</h1>
          <p className="text-muted-foreground">Verfolgen Sie Ihre Nahrungsergänzungsmittel und Symptome</p>
        </header>

        <Tabs defaultValue="supplements" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="supplements">Supplements</TabsTrigger>
            <TabsTrigger value="symptoms">Symptome</TabsTrigger>
            <TabsTrigger value="analysis">Analyse</TabsTrigger>
          </TabsList>

          <TabsContent value="supplements">
            <Card className="p-6">
              <SupplementTracker 
                supplements={supplements} 
                setSupplements={setSupplements} 
              />
            </Card>
          </TabsContent>

          <TabsContent value="symptoms">
            <Card className="p-6">
              <SymptomTracker 
                symptoms={symptoms} 
                setSymptoms={setSymptoms} 
              />
            </Card>
          </TabsContent>

          <TabsContent value="analysis">
            <Card className="p-6">
              <Analysis 
                supplements={supplements} 
                symptoms={symptoms} 
              />
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;