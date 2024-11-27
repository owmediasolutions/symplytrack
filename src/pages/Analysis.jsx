import { useState, useEffect } from 'react';
import Analysis from '../components/Analysis';
import { Card } from "@/components/ui/card";

const AnalysisPage = () => {
  const [supplements, setSupplements] = useState([]);
  const [symptoms, setSymptoms] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [supplementsResponse, symptomsResponse] = await Promise.all([
          fetch('/api/supplements', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          }),
          fetch('/api/symptoms', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          })
        ]);

        if (supplementsResponse.ok && symptomsResponse.ok) {
          const [supplementsData, symptomsData] = await Promise.all([
            supplementsResponse.json(),
            symptomsResponse.json()
          ]);

          setSupplements(supplementsData);
          setSymptoms(symptomsData);
        }
      } catch (error) {
        console.error('Fehler beim Laden der Daten:', error);
      }
    };

    fetchData();
  }, []);

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