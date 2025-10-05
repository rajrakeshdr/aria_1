import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { MessageSquare } from "lucide-react";

interface LoginPageProps {
  onLogin: (accessToken: string) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const { projectId, publicAnonKey } = await import("../utils/supabase/info");
      
      // Create user via server
      const signupResponse = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-024db3b8/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify(signUpData),
        }
      );

      if (!signupResponse.ok) {
        const errorData = await signupResponse.json();
        throw new Error(errorData.error || "Signup failed");
      }

      // Now sign in
      const { createClient } = await import("@supabase/supabase-js");
      const supabase = createClient(
        `https://${projectId}.supabase.co`,
        publicAnonKey
      );

      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: signUpData.email,
        password: signUpData.password,
      });

      if (signInError) throw signInError;
      if (!data.session?.access_token) throw new Error("No access token received");

      onLogin(data.session.access_token);
    } catch (err: any) {
      setError(err.message || "Failed to sign up");
      console.error("Signup error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const { projectId, publicAnonKey } = await import("../utils/supabase/info");
      const { createClient } = await import("@supabase/supabase-js");
      
      const supabase = createClient(
        `https://${projectId}.supabase.co`,
        publicAnonKey
      );

      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: signInData.email,
        password: signInData.password,
      });

      if (signInError) throw signInError;
      if (!data.session?.access_token) throw new Error("No access token received");

      onLogin(data.session.access_token);
    } catch (err: any) {
      setError(err.message || "Failed to sign in");
      console.error("Sign in error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-primary-foreground" />
          </div>
          <CardTitle>AI Chat</CardTitle>
          <CardDescription>
            Sign in to start chatting with AI
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="signin">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email">Email</Label>
                  <Input
                    id="signin-email"
                    type="email"
                    placeholder="you@example.com"
                    value={signInData.email}
                    onChange={(e) =>
                      setSignInData({ ...signInData, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signin-password">Password</Label>
                  <Input
                    id="signin-password"
                    type="password"
                    value={signInData.password}
                    onChange={(e) =>
                      setSignInData({ ...signInData, password: e.target.value })
                    }
                    required
                  />
                </div>
                {error && (
                  <p className="text-destructive text-sm">{error}</p>
                )}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">Name</Label>
                  <Input
                    id="signup-name"
                    type="text"
                    placeholder="Your name"
                    value={signUpData.name}
                    onChange={(e) =>
                      setSignUpData({ ...signUpData, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="you@example.com"
                    value={signUpData.email}
                    onChange={(e) =>
                      setSignUpData({ ...signUpData, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    value={signUpData.password}
                    onChange={(e) =>
                      setSignUpData({ ...signUpData, password: e.target.value })
                    }
                    required
                  />
                </div>
                {error && (
                  <p className="text-destructive text-sm">{error}</p>
                )}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Sign Up"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
