import { useState } from "react";
import { Candidate, ChatMessage } from "@/data/mockCandidates";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

interface NeuralLinkProps {
  candidate: Candidate;
}

const NeuralLink = ({ candidate }: NeuralLinkProps) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>(candidate.conversation_history);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg: ChatMessage = {
      id: String(messages.length + 1),
      sender: "agent",
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");
  };

  // Reset messages when candidate changes
  if (messages !== candidate.conversation_history && messages.length === candidate.conversation_history.length) {
    // Only reset if it looks like a different candidate
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-white/5">
        <h2 className="heading-display text-xs text-muted-foreground">Neural Link</h2>
        <p className="text-xs text-muted-foreground/60 mt-1">{candidate.name}</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {candidate.conversation_history.map((msg, i) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.25 }}
            className={`flex ${msg.sender === "agent" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] px-4 py-2.5 text-sm ${
                msg.sender === "agent" ? "chat-bubble-agent" : "chat-bubble-candidate"
              }`}
            >
              <p className="text-foreground/90">{msg.text}</p>
              <p className="text-[10px] text-muted-foreground/50 mt-1.5">{msg.timestamp}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Input */}
      <div className="p-3 border-t border-white/5">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Manual override..."
            className="glass-input flex-1 px-4 py-2.5 text-sm"
          />
          <button
            onClick={handleSend}
            className="btn-magma ripple p-2.5 rounded-lg flex-shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NeuralLink;
