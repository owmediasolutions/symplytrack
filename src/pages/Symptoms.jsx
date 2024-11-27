import React from 'react';
import { Card } from "@/components/ui/card";

const Symptoms = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Symptome</h1>
      </div>
      <Card className="p-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Symptom-Tracking</h2>
          <p className="text-muted-foreground">
            Hier können Sie Ihre Symptome aufzeichnen und überwachen.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Symptoms;