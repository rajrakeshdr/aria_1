import { useState, useEffect } from "react";
import { ThreadSidebar } from "./ThreadSidebar";
import { ChatWindow } from "./ChatWindow";
import { MessageInput } from "./MessageInput";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

interface Thread {
  id: string;
  userId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

interface Message {
  id: string;
  threadId: string;
  userId: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
}

interface ChatInterfaceProps {
  accessToken: string;
  onLogout: () => void;
}

export function ChatInterface({ accessToken, onLogout }: ChatInterfaceProps) {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    loadThreads();
  }, []);

  useEffect(() => {
    if (activeThreadId) {
      loadMessages(activeThreadId);
    } else {
      setMessages([]);
    }
  }, [activeThreadId]);

  const loadThreads = async () => {
    try {
      const { projectId, publicAnonKey } = await import("../utils/supabase/info");
      
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-024db3b8/threads`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        console.error("Failed to load threads:", await response.text());
        return;
      }

      const data = await response.json();
      setThreads(data.threads || []);
    } catch (error) {
      console.error("Error loading threads:", error);
    }
  };

  const loadMessages = async (threadId: string) => {
    setIsLoading(true);
    try {
      const { projectId } = await import("../utils/supabase/info");
      
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-024db3b8/threads/${threadId}/messages`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        console.error("Failed to load messages:", await response.text());
        return;
      }

      const data = await response.json();
      setMessages(data.messages || []);
    } catch (error) {
      console.error("Error loading messages:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewThread = async () => {
    try {
      const { projectId } = await import("../utils/supabase/info");
      
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-024db3b8/threads`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ title: "New Chat" }),
        }
      );

      if (!response.ok) {
        console.error("Failed to create thread:", await response.text());
        return;
      }

      const data = await response.json();
      setThreads([data.thread, ...threads]);
      setActiveThreadId(data.thread.id);
    } catch (error) {
      console.error("Error creating thread:", error);
    }
  };

  const handleSendMessage = async (message: string) => {
    if (!activeThreadId) {
      // Create new thread first
      await handleNewThread();
      // Wait a bit for the thread to be created
      await new Promise(resolve => setTimeout(resolve, 500));
      // The activeThreadId should now be set, but we need to get it
      return;
    }

    setIsSending(true);

    // Optimistically add user message
    const tempUserMessage: Message = {
      id: `temp-${Date.now()}`,
      threadId: activeThreadId,
      userId: "",
      role: "user",
      content: message,
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, tempUserMessage]);

    try {
      const { projectId } = await import("../utils/supabase/info");
      
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-024db3b8/chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            threadId: activeThreadId,
            message,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Failed to send message:", errorText);
        // Remove optimistic message on error
        setMessages((prev) => prev.filter((m) => m.id !== tempUserMessage.id));
        return;
      }

      const data = await response.json();

      // Replace temp message with real messages
      setMessages((prev) => {
        const filtered = prev.filter((m) => m.id !== tempUserMessage.id);
        return [...filtered, data.userMessage, data.aiMessage];
      });

      // Update thread in list if title changed
      if (data.thread) {
        setThreads((prev) =>
          prev.map((t) => (t.id === data.thread.id ? data.thread : t))
        );
      }
    } catch (error) {
      console.error("Error sending message:", error);
      // Remove optimistic message on error
      setMessages((prev) => prev.filter((m) => m.id !== tempUserMessage.id));
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex h-screen">
      <ThreadSidebar
        threads={threads}
        activeThreadId={activeThreadId}
        onSelectThread={setActiveThreadId}
        onNewThread={handleNewThread}
      />
      
      <div className="flex-1 flex flex-col">
        <div className="border-b border-border bg-card px-4 py-3 flex justify-between items-center">
          <h2>
            {activeThreadId
              ? threads.find((t) => t.id === activeThreadId)?.title || "Chat"
              : "Select or create a chat"}
          </h2>
          <Button variant="ghost" size="sm" onClick={onLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
        
        <ChatWindow messages={messages} isLoading={isLoading || isSending} />
        
        <MessageInput
          onSend={handleSendMessage}
          disabled={isSending}
        />
      </div>
    </div>
  );
}
