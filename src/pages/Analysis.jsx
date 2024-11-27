import React from 'react';
import Analysis from '../components/Analysis';
import { Card } from "@/components/ui/card";

const AnalysisPage = () => {
  // Placeholder data - wird später durch echte Daten ersetzt
  const supplements = [
    { id: 1, name: "Vitamin D3", dose: "5000 IU" },
    { id: 2, name: "Magnesium", dose: "400mg" }
  ];
  
  const symptoms = [
    { id: 1, date: "2024-03-15", name: "Müdigkeit", intensity: 7 },
    { id: 2, date: "2024-03-16", name: "Müdigkeit", intensity: 5 },
    { id: 3, date: "2024-03-17", name: "Müdigkeit", intensity: 3 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Analyse</h1>
      </div>
      <Card className="p-6">
        <Analysis 
          supplements={supplements} 
          symptoms={symptoms} 
        />
      </Card>
    </div>
  );
};

export default AnalysisPage;