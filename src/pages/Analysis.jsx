import Analysis from '../components/Analysis';

const AnalysisPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Analyse</h1>
      <Analysis supplements={[]} symptoms={[]} />
    </div>
  );
};

export default AnalysisPage;