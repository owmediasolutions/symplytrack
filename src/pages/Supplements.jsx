import { useState } from "react";
import { Card } from "@/components/ui/card";
import SupplementTracker from "@/components/SupplementTracker";

const Supplements = () => {
  const [supplements, setSupplements] = useState([]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Supplements</h1>
      </div>
      <Card className="p-6">
        <SupplementTracker 
          supplements={supplements} 
          setSupplements={setSupplements} 
        />
      </Card>
    </div>
  );
};

export default Supplements;