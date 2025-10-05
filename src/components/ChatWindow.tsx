import { useEffect, useRef } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Bot, User } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
}

interface ChatWindowProps {
  messages: Message[];
  isLoading?: boolean;
}

export function ChatWindow({ messages, isLoading }: ChatWindowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <ScrollArea className="flex-1 p-4">
      <div className="max-w-3xl mx-auto space-y-6">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-center text-muted-foreground py-20">
            <div>
              <Bot className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <h3>Start a conversation</h3>
              <p className="text-sm mt-2">
                Send a message to begin chatting with AI
              </p>
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-4 ${
                message.role === "user" ? "justify-end" : ""
              }`}
            >
              {message.role === "assistant" && (
                <Avatar className="w-8 h-8 mt-1">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <Bot className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
              )}
              
              <div
                className={`flex-1 max-w-[80%] rounded-lg px-4 py-3 ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground ml-auto"
                    : "bg-muted"
                }`}
              >
                <p className="whitespace-pre-wrap break-words">{message.content}</p>
                <div
                  className={`text-xs mt-2 ${
                    message.role === "user"
                      ? "text-primary-foreground/70"
                      : "text-muted-foreground"
                  }`}
                >
                  {new Date(message.createdAt).toLocaleTimeString()}
                </div>
              </div>

              {message.role === "user" && (
                <Avatar className="w-8 h-8 mt-1">
                  <AvatarFallback className="bg-secondary">
                    <User className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))
        )}

        {isLoading && (
          <div className="flex gap-4">
            <Avatar className="w-8 h-8 mt-1">
              <AvatarFallback className="bg-primary text-primary-foreground">
                <Bot className="w-4 h-4" />
              </AvatarFallback>
            </Avatar>
            <div className="bg-muted rounded-lg px-4 py-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={scrollRef} />
      </div>
    </ScrollArea>
  );
}
