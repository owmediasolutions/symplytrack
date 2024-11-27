import { useState } from "react";
import { Card } from "@/components/ui/card";
import ChatAssistant from "@/components/ChatAssistant";

const Assistant = () => {
  const [supplements, setSupplements] = useState([]);
  const [symptoms, setSymptoms] = useState([]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">KI-Assistent</h1>
      </div>
      <Card className="p-6">
        <ChatAssistant 
          supplements={supplements} 
          symptoms={symptoms} 
        />
      </Card>
    </div>
  );
};

export default Assistant;