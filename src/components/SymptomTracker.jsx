import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";

const SymptomTracker = ({ symptoms, setSymptoms }) => {
  const [symptom, setSymptom] = useState("");
  const [intensity, setIntensity] = useState([5]);

  useEffect(() => {
    fetchSymptoms();
  }, []);

  const fetchSymptoms = async () => {
    try {
      const response = await fetch('/api/symptoms', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setSymptoms(data);
      }
    } catch (error) {
      console.error('Fehler beim Laden der Symptome:', error);
      toast.error('Symptome konnten nicht geladen werden');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!symptom) {
      toast.error("Bitte geben Sie ein Symptom ein");
      return;
    }

    const newSymptom = {
      name: symptom,
      intensity: intensity[0],
    };

    try {
      const response = await fetch('/api/symptoms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(newSymptom)
      });

      if (response.ok) {
        const savedSymptom = await response.json();
        setSymptoms([...symptoms, savedSymptom]);
        toast.success("Symptom hinzugefügt");
        setSymptom("");
        setIntensity([5]);
      } else {
        toast.error("Fehler beim Speichern des Symptoms");
      }
    } catch (error) {
      console.error('Fehler beim Speichern:', error);
      toast.error("Fehler beim Speichern des Symptoms");
    }
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