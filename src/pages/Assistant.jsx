import ChatAssistant from "@/components/ChatAssistant";

const Assistant = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">KI-Assistent</h1>
      <ChatAssistant supplements={[]} symptoms={[]} />
    </div>
  );
};

export default Assistant;