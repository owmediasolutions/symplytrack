import { useState } from "react";
import { Card } from "@/components/ui/card";
import SymptomTracker from "@/components/SymptomTracker";

const Symptoms = () => {
  const [symptoms, setSymptoms] = useState([]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Symptome</h1>
      </div>
      <Card className="p-6">
        <SymptomTracker 
          symptoms={symptoms} 
          setSymptoms={setSymptoms} 
        />
      </Card>
    </div>
  );
};

export default Symptoms;