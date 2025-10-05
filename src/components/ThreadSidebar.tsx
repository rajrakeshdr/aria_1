import { Plus, MessageSquare } from "lucide-react";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";

interface Thread {
  id: string;
  title: string;
  updatedAt: string;
}

interface ThreadSidebarProps {
  threads: Thread[];
  activeThreadId: string | null;
  onSelectThread: (threadId: string) => void;
  onNewThread: () => void;
}

export function ThreadSidebar({
  threads,
  activeThreadId,
  onSelectThread,
  onNewThread,
}: ThreadSidebarProps) {
  return (
    <div className="w-64 border-r border-border bg-card flex flex-col h-screen">
      <div className="p-4 border-b border-border">
        <Button onClick={onNewThread} className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          New Chat
        </Button>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {threads.length === 0 ? (
            <div className="text-center py-8 px-4 text-muted-foreground">
              <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No chats yet</p>
            </div>
          ) : (
            threads.map((thread) => (
              <button
                key={thread.id}
                onClick={() => onSelectThread(thread.id)}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                  activeThreadId === thread.id
                    ? "bg-accent text-accent-foreground"
                    : "hover:bg-accent/50"
                }`}
              >
                <div className="truncate">{thread.title}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {new Date(thread.updatedAt).toLocaleDateString()}
                </div>
              </button>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
