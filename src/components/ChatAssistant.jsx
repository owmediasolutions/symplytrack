import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { handleChatRequest } from "../api/chat";

const ChatAssistant = ({ supplements, symptoms }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await handleChatRequest(userMessage, supplements, symptoms);
      console.log('Chat response received:', response);
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
    } catch (error) {
      console.error('Chat error:', error);
      toast.error("Entschuldigung, es gab einen Fehler bei der Verarbeitung Ihrer Anfrage");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold mb-4">KI-Assistent</h2>
      
      <ScrollArea className="h-[400px] border rounded-lg p-4">
        <div className="space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-lg ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground ml-12"
                  : "bg-muted mr-12"
              }`}
            >
              {msg.content}
            </div>
          ))}
          {messages.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              Stellen Sie Fragen zu Ihren Supplements und Symptomen
            </p>
          )}
        </div>
      </ScrollArea>

      <form onSubmit={handleSubmit} className="space-y-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Stellen Sie Ihre Frage..."
          className="min-h-[100px]"
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Verarbeite..." : "Frage senden"}
        </Button>
      </form>
    </div>
  );
};

export default ChatAssistant;