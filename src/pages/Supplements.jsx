import React from 'react';
import { Card } from "@/components/ui/card";

const Supplements = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Supplements</h1>
      </div>
      <Card className="p-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Meine Supplements</h2>
          <p className="text-muted-foreground">
            Hier können Sie Ihre Supplements verwalten und tracken.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Supplements;