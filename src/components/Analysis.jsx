import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Analysis = ({ supplements, symptoms }) => {
  // Einfache Analyse der Daten
  const analyzeData = () => {
    if (symptoms.length === 0) return "Noch keine Daten für eine Analyse verfügbar";

    const avgIntensity = symptoms.reduce((acc, curr) => acc + curr.intensity, 0) / symptoms.length;
    
    return `Durchschnittliche Symptomintensität: ${avgIntensity.toFixed(1)}/10`;
  };

  // Daten für das Chart vorbereiten
  const chartData = symptoms.map(symptom => ({
    date: new Date(symptom.date).toLocaleDateString(),
    intensity: symptom.intensity,
    name: symptom.name
  }));

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Analyse</h2>
      
      <div className="p-4 bg-secondary rounded-lg">
        <p className="text-lg">{analyzeData()}</p>
      </div>

      {symptoms.length > 0 && (
        <div className="h-[400px] mt-8">
          <h3 className="text-xl font-semibold mb-4">Symptomverlauf</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[0, 10]} />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="intensity" 
                stroke="#9b87f5" 
                name="Intensität"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Eingenommene Supplements</h3>
        <div className="space-y-2">
          {supplements.length === 0 ? (
            <p className="text-muted-foreground">Noch keine Supplements eingetragen</p>
          ) : (
            supplements.map(supplement => (
              <div 
                key={supplement.id}
                className="p-4 bg-secondary rounded-lg flex justify-between"
              >
                <span>{supplement.name}</span>
                <span>{supplement.dose}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Analysis;