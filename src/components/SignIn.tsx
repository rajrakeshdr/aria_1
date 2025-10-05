import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { MessageSquare, ArrowLeft, Mail, Building2 } from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import { projectId, publicAnonKey } from "../utils/supabase/info";
import { Alert, AlertDescription } from "./ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface SignInProps {
  onSuccess: (accessToken: string) => void;
  onBackToHome?: () => void;
}

export function SignIn({ onSuccess, onBackToHome }: SignInProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("signin");
  const [name, setName] = useState("");
  const [ssoEmail, setSsoEmail] = useState("");

  const supabase = createClient(
    `https://${projectId}.supabase.co`,
    publicAnonKey
  );

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;

      if (data.session?.access_token) {
        onSuccess(data.session.access_token);
      } else {
        throw new Error("No access token received");
      }
    } catch (err: any) {
      console.error("Sign in error:", err);
      setError(err.message || "Failed to sign in. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Call the server to create user with admin API
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-024db3b8/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ email, password, name }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to create account");
      }

      // Now sign in with the created credentials
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;

      if (data.session?.access_token) {
        onSuccess(data.session.access_token);
      } else {
        throw new Error("No access token received");
      }
    } catch (err: any) {
      console.error("Sign up error:", err);
      setError(err.message || "Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: signInError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin,
        },
      });

      if (signInError) throw signInError;
    } catch (err: any) {
      console.error("Google sign in error:", err);
      setError(err.message || "Failed to sign in with Google. Make sure Google OAuth is configured in Supabase.");
    } finally {
      setLoading(false);
    }
  };

  const handleMicrosoftSignIn = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: signInError } = await supabase.auth.signInWithOAuth({
        provider: "azure",
        options: {
          redirectTo: window.location.origin,
          scopes: "email",
        },
      });

      if (signInError) throw signInError;
    } catch (err: any) {
      console.error("Microsoft sign in error:", err);
      setError(err.message || "Failed to sign in with Microsoft. Make sure Azure OAuth is configured in Supabase.");
    } finally {
      setLoading(false);
    }
  };

  const handleSSOSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Extract domain from email
      const domain = ssoEmail.split("@")[1];
      
      if (!domain) {
        throw new Error("Invalid email address");
      }

      // Use SAML SSO
      const { data, error: ssoError } = await supabase.auth.signInWithSSO({
        domain,
        options: {
          redirectTo: window.location.origin,
        },
      });

      if (ssoError) throw ssoError;

      // If we get here, redirect to SSO provider
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (err: any) {
      console.error("SSO sign in error:", err);
      setError(err.message || "Failed to initiate SSO. Make sure your organization's SSO is configured.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {onBackToHome && (
          <Button
            variant="ghost"
            className="mb-4"
            onClick={onBackToHome}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        )}

        <Card className="border-border/50 shadow-xl">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-3xl">Welcome to DeeplayerX</CardTitle>
            <CardDescription>
              Sign in to continue to your account
            </CardDescription>
          </CardHeader>

          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="signin">
                <form onSubmit={handleEmailSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={loading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={loading}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                    disabled={loading}
                  >
                    {loading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleEmailSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Full Name</Label>
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      disabled={loading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={loading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="Create a strong password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={loading}
                      minLength={6}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                    disabled={loading}
                  >
                    {loading ? "Creating account..." : "Create Account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="relative my-6">
              <Separator />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
                OR CONTINUE WITH
              </span>
            </div>

            <div className="space-y-3">
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleGoogleSignIn}
                disabled={loading}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleMicrosoftSignIn}
                disabled={loading}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="#f25022" d="M1 1h10v10H1z" />
                  <path fill="#00a4ef" d="M13 1h10v10H13z" />
                  <path fill="#7fba00" d="M1 13h10v10H1z" />
                  <path fill="#ffb900" d="M13 13h10v10H13z" />
                </svg>
                Continue with Microsoft
              </Button>

              <Separator className="my-4" />

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Building2 className="w-4 h-4" />
                  <span>Enterprise SSO</span>
                </div>
                
                <form onSubmit={handleSSOSignIn} className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="sso-email">Work Email</Label>
                    <Input
                      id="sso-email"
                      type="email"
                      placeholder="you@yourcompany.com"
                      value={ssoEmail}
                      onChange={(e) => setSsoEmail(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    variant="outline"
                    className="w-full"
                    disabled={loading || !ssoEmail}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Sign in with SSO
                  </Button>
                </form>
              </div>
            </div>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              <p>
                By continuing, you agree to our{" "}
                <a href="#" className="text-primary hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-primary hover:underline">
                  Privacy Policy
                </a>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-4 text-center text-sm text-muted-foreground">
          <p>
            Need help? Contact{" "}
            <a href="mailto:support@deeplayerx.com" className="text-primary hover:underline">
              support@deeplayerx.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
