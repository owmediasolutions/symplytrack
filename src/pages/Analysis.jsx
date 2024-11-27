import React from 'react';
import Analysis from '../components/Analysis';

const AnalysisPage = () => {
  // Placeholder data - in a real app, this would come from state or props
  const supplements = [];
  const symptoms = [];

  return (
    <div className="container mx-auto p-4">
      <Analysis 
        supplements={supplements} 
        symptoms={symptoms} 
      />
    </div>
  );
};

export default AnalysisPage;