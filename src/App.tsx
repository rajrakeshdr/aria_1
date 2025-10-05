import { useState, useEffect } from "react";
import { LandingPage } from "./components/LandingPage";
import { SignIn } from "./components/SignIn";
import { ChatInterface } from "./components/ChatInterface";
import { createClient } from "@supabase/supabase-js";
import { projectId, publicAnonKey } from "./utils/supabase/info";

export default function App() {
  const [view, setView] = useState<"landing" | "signin" | "chat">("landing");
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const supabase = createClient(
        `https://${projectId}.supabase.co`,
        publicAnonKey
      );

      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.access_token) {
        setAccessToken(session.access_token);
        setView("chat");
      }
    } catch (error) {
      console.error("Error checking session:", error);
    } finally {
      setIsCheckingSession(false);
    }
  };

  const handleSignInSuccess = (token: string) => {
    setAccessToken(token);
    setView("chat");
  };

  const handleLogout = async () => {
    try {
      const supabase = createClient(
        `https://${projectId}.supabase.co`,
        publicAnonKey
      );

      await supabase.auth.signOut();
      setAccessToken(null);
      setView("landing");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  if (isCheckingSession) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading DeeplayerX...</p>
        </div>
      </div>
    );
  }

  if (view === "landing") {
    return (
      <LandingPage
        onGetStarted={() => setView("signin")}
        onSignIn={() => setView("signin")}
      />
    );
  }

  if (view === "signin") {
    return (
      <SignIn
        onSuccess={handleSignInSuccess}
        onBackToHome={() => setView("landing")}
      />
    );
  }

  if (view === "chat" && accessToken) {
    return <ChatInterface accessToken={accessToken} onLogout={handleLogout} />;
  }

  return <LandingPage onGetStarted={() => setView("signin")} onSignIn={() => setView("signin")} />;
}

