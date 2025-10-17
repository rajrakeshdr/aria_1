import { useState, useRef, useEffect } from "react";
import { SearchBar } from "./SearchBar";
import { ChatMessage } from "./ChatMessage";
import { Shield, ArrowLeft, Loader2 } from "lucide-react";
import imgFlares from "figma:asset/99d9597f0f7819bf1ea492a390459a0a767e0e63.png";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatInterfaceProps {
  initialQuery: string;
  onBack: () => void;
}

export function ChatInterface({ initialQuery, onBack }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (initialQuery) {
      handleSearch(initialQuery);
    }
  }, []);

  const handleSearch = async (query: string) => {
    // Add user message
    const userMessage: Message = { role: "user", content: query };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const { projectId, publicAnonKey } = await import("../utils/supabase/info");
      
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-f8eac8da/search`,
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${publicAnonKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Search API error:", errorData);
        throw new Error(errorData.error || "Failed to get response from AI");
      }

      const data = await response.json();
      
      // Add assistant message
      const assistantMessage: Message = { 
        role: "assistant", 
        content: data.response 
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error during search:", error);
      const errorMessage: Message = {
        role: "assistant",
        content: "I apologize, but I encountered an error processing your request. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#0e0719] min-h-screen relative to-[#181c49] via-[#100c23] via-[59.273%] flex flex-col">
      {/* Flares Background */}
      <div className="absolute h-[654.188px] left-1/2 top-0 w-[1030.35px] -translate-x-1/2 pointer-events-none">
        <div className="absolute inset-0 opacity-5 overflow-hidden">
          <img 
            alt="" 
            className="absolute h-[157.62%] left-0 max-w-none top-[17.28%] w-full" 
            src={imgFlares} 
          />
        </div>
      </div>

      {/* Header */}
      <div className="relative z-10 border-b border-[#ec83bb]/20 bg-[#0e0719]/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-8 py-6 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-['Poppins',_sans-serif] text-[18px]">Back</span>
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#de55de] to-[#ec83bb] flex items-center justify-center shadow-lg shadow-[#de55de]/50">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <h2 className="font-['Poppins',_sans-serif] text-[24px] text-white">
              Cybersecurity <span className="text-[#de55de]">AI Search</span>
            </h2>
          </div>
          
          <div className="w-20" /> {/* Spacer for centering */}
        </div>
      </div>

      {/* Messages Area */}
      <div className="relative z-10 flex-1 overflow-y-auto px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {messages.length === 0 && !isLoading && (
            <div className="text-center text-white/40 font-['Poppins',_sans-serif] mt-20">
              <Shield className="w-16 h-16 mx-auto mb-4 text-[#de55de]/50" />
              <p className="text-[20px]">Ask me anything about cybersecurity</p>
            </div>
          )}
          
          {messages.map((message, index) => (
            <ChatMessage key={index} role={message.role} content={message.content} />
          ))}
          
          {isLoading && (
            <div className="flex gap-4 justify-start mb-6">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#de55de] to-[#ec83bb] flex items-center justify-center shadow-lg shadow-[#de55de]/50">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div className="bg-[#1c1f28] rounded-2xl px-6 py-4 border border-[#ec83bb]/20 shadow-lg flex items-center gap-3">
                <Loader2 className="w-5 h-5 text-[#ec83bb] animate-spin" />
                <span className="font-['Poppins',_sans-serif] text-white/70">Analyzing...</span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Search Bar at Bottom */}
      <div className="relative z-10 border-t border-[#ec83bb]/20 bg-[#0e0719]/50 backdrop-blur-sm px-8 py-6">
        <SearchBar onSearch={handleSearch} isLoading={isLoading} />
      </div>
    </div>
  );
}
