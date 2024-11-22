import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import SupplementTracker from "@/components/SupplementTracker";
import SymptomTracker from "@/components/SymptomTracker";
import Analysis from "@/components/Analysis";
import ChatAssistant from "@/components/ChatAssistant";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const STORAGE_KEY = "health-tracker-data";

const Index = () => {
  const [supplements, setSupplements] = useState([]);
  const [symptoms, setSymptoms] = useState([]);

  // Laden der gespeicherten Daten beim Start
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      const { supplements: savedSupplements, symptoms: savedSymptoms } = JSON.parse(savedData);
      setSupplements(savedSupplements);
      setSymptoms(savedSymptoms);
    }
  }, []);

  // Speichern der Daten bei Änderungen
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        supplements,
        symptoms,
      })
    );
  }, [supplements, symptoms]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
        <header className="text-center">
          <h1 className="text-4xl font-bold text-primary mb-2">Supplement Tracker</h1>
          <p className="text-muted-foreground">
            Verfolgen Sie Ihre Nahrungsergänzungsmittel und Symptome
          </p>
        </header>

        <Tabs defaultValue="supplements" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="supplements">Supplements</TabsTrigger>
            <TabsTrigger value="symptoms">Symptome</TabsTrigger>
            <TabsTrigger value="analysis">Analyse</TabsTrigger>
            <TabsTrigger value="assistant">KI-Assistent</TabsTrigger>
          </TabsList>

          <TabsContent value="supplements">
            <Card className="p-6">
              <SupplementTracker supplements={supplements} setSupplements={setSupplements} />
            </Card>
          </TabsContent>

          <TabsContent value="symptoms">
            <Card className="p-6">
              <SymptomTracker symptoms={symptoms} setSymptoms={setSymptoms} />
            </Card>
          </TabsContent>

          <TabsContent value="analysis">
            <Card className="p-6">
              <Analysis supplements={supplements} symptoms={symptoms} />
            </Card>
          </TabsContent>

          <TabsContent value="assistant">
            <Card className="p-6">
              <ChatAssistant supplements={supplements} symptoms={symptoms} />
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;