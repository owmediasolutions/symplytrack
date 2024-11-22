import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";

const SymptomTracker = ({ symptoms, setSymptoms }) => {
  const [symptom, setSymptom] = useState("");
  const [intensity, setIntensity] = useState([5]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!symptom) {
      toast.error("Bitte geben Sie ein Symptom ein");
      return;
    }

    const newSymptom = {
      id: Date.now(),
      name: symptom,
      intensity: intensity[0],
      date: new Date().toISOString(),
    };

    setSymptoms([...symptoms, newSymptom]);
    toast.success("Symptom hinzugefügt");
    setSymptom("");
    setIntensity([5]);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Symptom erfassen</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="symptom">Symptom</Label>
            <Input
              id="symptom"
              value={symptom}
              onChange={(e) => setSymptom(e.target.value)}
              placeholder="z.B. Müdigkeit"
            />
          </div>
          <div className="space-y-2">
            <Label>Intensität (1-10)</Label>
            <Slider
              value={intensity}
              onValueChange={setIntensity}
              max={10}
              min={1}
              step={1}
              className="py-4"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Schwach</span>
              <span>Stark</span>
            </div>
          </div>
          <Button type="submit" className="w-full">Hinzufügen</Button>
        </form>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Heutige Symptome</h3>
        <div className="space-y-2">
          {symptoms.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">Noch keine Symptome für heute eingetragen</p>
          ) : (
            symptoms.map((symptom) => (
              <div
                key={symptom.id}
                className="flex justify-between items-center p-4 bg-secondary rounded-lg"
              >
                <span className="font-medium">{symptom.name}</span>
                <span>Intensität: {symptom.intensity}/10</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SymptomTracker;