import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { 
  MessageSquare, 
  Sparkles, 
  Zap, 
  Lock, 
  Brain,
  ArrowRight,
  CheckCircle2,
  Users,
  BarChart3
} from "lucide-react";

interface LandingPageProps {
  onGetStarted?: () => void;
  onSignIn?: () => void;
}

export function LandingPage({ onGetStarted, onSignIn }: LandingPageProps) {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Conversations",
      description: "Chat with advanced AI that understands context and provides intelligent responses",
      color: "text-purple-500"
    },
    {
      icon: MessageSquare,
      title: "Thread Management",
      description: "Organize conversations into threads for better context and history tracking",
      color: "text-blue-500"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Get instant responses powered by state-of-the-art language models",
      color: "text-yellow-500"
    },
    {
      icon: Lock,
      title: "Secure & Private",
      description: "Your conversations are encrypted and stored securely with Supabase",
      color: "text-green-500"
    }
  ];

  const stats = [
    { label: "Active Users", value: "10K+", icon: Users },
    { label: "Messages Sent", value: "1M+", icon: MessageSquare },
    { label: "Response Time", value: "<2s", icon: Zap }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Header */}
      <header className="border-b border-border/40 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <span className="font-semibold text-xl">DeeplayerX</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">About</a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={onSignIn}>Sign In</Button>
            <Button 
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
              onClick={onGetStarted}
            >
              Get Started
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="text-center max-w-4xl mx-auto">
          <Badge className="mb-4 bg-purple-500/10 text-purple-600 border-purple-500/20 hover:bg-purple-500/20">
            <Sparkles className="w-3 h-3 mr-1" />
            Powered by Advanced AI
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
            Your Intelligent
            <br />
            Chat Companion
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Experience the future of conversations with AI. Get instant, intelligent responses 
            that understand context and help you accomplish more.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-lg px-8"
              onClick={onGetStarted}
            >
              Start Chatting Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8">
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {stats.map((stat, index) => (
              <Card key={index} className="border-border/50 bg-card/50 backdrop-blur">
                <CardContent className="pt-6 text-center">
                  <stat.icon className="w-8 h-8 mx-auto mb-2 text-purple-500" />
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20 bg-gradient-to-b from-transparent to-secondary/10">
        <div className="text-center mb-16">
          <Badge className="mb-4">Features</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Everything You Need</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed to make your conversations more productive and engaging
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <Card
              key={index}
              className={`border-border/50 transition-all duration-300 cursor-pointer ${
                hoveredFeature === index 
                  ? "shadow-lg scale-105 border-purple-500/50" 
                  : "hover:shadow-md"
              }`}
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/10 to-blue-500/10 flex items-center justify-center mb-4`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <Badge className="mb-4">Simple Process</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Get Started in Seconds</h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Create Account", desc: "Sign up with your email in seconds" },
              { step: "02", title: "Start Chatting", desc: "Begin your first conversation with AI" },
              { step: "03", title: "Get Insights", desc: "Receive intelligent, context-aware responses" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                  {item.step}
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="bg-gradient-to-r from-purple-500 to-blue-500 border-0 text-white">
          <CardContent className="py-16 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Join thousands of users who are already experiencing the power of AI-driven conversations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary" 
                className="text-lg px-8"
                onClick={onGetStarted}
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 border-white text-white hover:bg-white/10">
                Contact Sales
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-card/50 backdrop-blur">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <span className="font-semibold">DeeplayerX</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Intelligent conversations powered by advanced AI technology.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border/40 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2025 DeeplayerX. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
