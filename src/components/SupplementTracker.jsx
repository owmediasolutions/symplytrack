import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const SupplementTracker = () => {
  const [supplements, setSupplements] = useState([]);
  const [name, setName] = useState("");
  const [dose, setDose] = useState("");
  const [unit, setUnit] = useState("mg");

  useEffect(() => {
    fetchSupplements();
  }, []);

  const fetchSupplements = async () => {
    try {
      const response = await fetch('/api/supplements', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setSupplements(data);
      }
    } catch (error) {
      console.error('Fehler beim Laden der Supplements:', error);
      toast.error('Supplements konnten nicht geladen werden');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !dose) {
      toast.error("Bitte füllen Sie alle Felder aus");
      return;
    }

    const newSupplement = {
      name,
      dose: `${dose}${unit}`,
    };

    try {
      const response = await fetch('/api/supplements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(newSupplement)
      });

      if (response.ok) {
        const savedSupplement = await response.json();
        setSupplements([...supplements, savedSupplement]);
        toast.success("Supplement hinzugefügt");
        setName("");
        setDose("");
      } else {
        toast.error("Fehler beim Speichern des Supplements");
      }
    } catch (error) {
      console.error('Fehler beim Speichern:', error);
      toast.error("Fehler beim Speichern des Supplements");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Supplement hinzufügen</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="z.B. Vitamin D3"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dose">Dosis</Label>
              <div className="flex gap-2">
                <Input
                  id="dose"
                  type="number"
                  value={dose}
                  onChange={(e) => setDose(e.target.value)}
                  placeholder="z.B. 1000"
                />
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="w-24 rounded-md border border-input bg-background px-3"
                >
                  <option value="mg">mg</option>
                  <option value="mcg">mcg</option>
                  <option value="g">g</option>
                  <option value="ml">ml</option>
                </select>
              </div>
            </div>
          </div>
          <Button type="submit" className="w-full">Hinzufügen</Button>
        </form>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Heutige Einnahmen</h3>
        <div className="space-y-2">
          {supplements.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">Noch keine Supplements für heute eingetragen</p>
          ) : (
            supplements.map((supplement) => (
              <div
                key={supplement.id}
                className="flex justify-between items-center p-4 bg-secondary rounded-lg"
              >
                <span className="font-medium">{supplement.name}</span>
                <span>{supplement.dose}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SupplementTracker;