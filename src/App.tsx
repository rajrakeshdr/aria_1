import { useState } from "react";
import { LandingPage } from "./components/LandingPage";
import { ChatInterface } from "./components/ChatInterface";

export default function App() {
  const [currentView, setCurrentView] = useState<"landing" | "chat">("landing");
  const [initialQuery, setInitialQuery] = useState("");

  const handleSearch = (query: string) => {
    setInitialQuery(query);
    setCurrentView("chat");
  };

  const handleBack = () => {
    setCurrentView("landing");
    setInitialQuery("");
  };

  return (
    <>
      {currentView === "landing" ? (
        <LandingPage onSearch={handleSearch} />
      ) : (
        <ChatInterface initialQuery={initialQuery} onBack={handleBack} />
      )}
    </>
  );
}
