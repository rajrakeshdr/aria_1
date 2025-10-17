import { Shield, Bot } from "lucide-react";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
}

export function ChatMessage({ role, content }: ChatMessageProps) {
  const isUser = role === "user";

  return (
    <div className={`flex gap-4 ${isUser ? "justify-end" : "justify-start"} mb-6 animate-in slide-in-from-bottom-4 duration-500`}>
      {!isUser && (
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#de55de] to-[#ec83bb] flex items-center justify-center shadow-lg shadow-[#de55de]/50">
          <Shield className="w-5 h-5 text-white" />
        </div>
      )}
      
      <div 
        className={`max-w-[70%] rounded-2xl px-6 py-4 ${
          isUser 
            ? "bg-gradient-to-br from-[#de55de] to-[#ec83bb] text-white shadow-lg shadow-[#de55de]/30" 
            : "bg-[#1c1f28] text-white border border-[#ec83bb]/20 shadow-lg"
        }`}
      >
        <p className="font-['Poppins',_sans-serif] text-[16px] leading-relaxed whitespace-pre-wrap">
          {content}
        </p>
      </div>

      {isUser && (
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#272B34] flex items-center justify-center border border-[#ec83bb]/30">
          <Bot className="w-5 h-5 text-[#ec83bb]" />
        </div>
      )}
    </div>
  );
}
