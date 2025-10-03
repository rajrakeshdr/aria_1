import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Shield, 
  Zap, 
  Brain, 
  Network, 
  Lock,
  BarChart3,
  AlertTriangle,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Database,
  Workflow,
  Eye,
  GitBranch,
  Activity
} from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface LandingPageProps {
  onOpenAuth: () => void;
}

export function LandingPage({ onOpenAuth }: LandingPageProps) {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Threat Detection',
      description: 'Natural language queries transform into actionable security insights instantly',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: BarChart3,
      title: 'Real-Time Analytics',
      description: 'Visualize security posture across your entire infrastructure in one unified view',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Workflow,
      title: 'Automated Workflows',
      description: 'Build sophisticated security workflows without writing a single line of code',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Network,
      title: 'Universal Connectors',
      description: 'Integrate with 100+ security tools and platforms seamlessly',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const stats = [
    { value: '10M+', label: 'Security Events Analyzed Daily', icon: Activity },
    { value: '99.9%', label: 'Threat Detection Accuracy', icon: Eye },
    { value: '<1s', label: 'Average Query Response Time', icon: Zap },
    { value: '150+', label: 'Enterprise Customers', icon: Shield }
  ];

  const useCases = [
    {
      icon: AlertTriangle,
      title: 'Threat Hunting',
      description: 'Proactively search for threats across your environment using AI-assisted queries'
    },
    {
      icon: Database,
      title: 'Data Inventory',
      description: 'Maintain complete visibility into your identity, assets, and cloud resources'
    },
    {
      icon: GitBranch,
      title: 'Incident Response',
      description: 'Automate triage, investigation, and remediation workflows'
    },
    {
      icon: Lock,
      title: 'Compliance Monitoring',
      description: 'Track security controls and compliance requirements in real-time'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0.3
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              opacity: [0.3, 0.1, 0.3]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className="relative z-10 border-b border-white/10 backdrop-blur-xl bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold">SecureOps AI</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                className="text-white hover:text-blue-400 hover:bg-white/10"
              >
                Documentation
              </Button>
              <Button 
                variant="ghost" 
                className="text-white hover:text-blue-400 hover:bg-white/10"
              >
                Pricing
              </Button>
              <Button 
                onClick={onOpenAuth}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6"
              >
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full mb-6">
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-blue-300">AI-Powered Security Platform</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent leading-tight">
                Security Operations at the Speed of Thought
              </h1>
              
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                Transform complex security data into actionable insights with natural language queries. 
                Build sophisticated workflows, monitor threats, and maintain compliance—all from one unified platform.
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <Button 
                  onClick={onOpenAuth}
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8"
                >
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  Watch Demo
                </Button>
              </div>

              <div className="flex items-center space-x-6 text-sm text-slate-400">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>14-day free trial</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-3xl"></div>
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYW5hbHl0aWNzJTIwZGFzaGJvYXJkfGVufDF8fHx8MTc1OTM5MDIyMXww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Security Dashboard"
                  className="w-full h-auto relative z-10"
                />
              </div>
              
              {/* Floating Feature Cards */}
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className={`absolute ${
                    index === 0 ? '-left-4 top-1/4' :
                    index === 1 ? '-right-4 top-1/3' :
                    index === 2 ? '-left-4 bottom-1/4' :
                    '-right-4 bottom-1/3'
                  }`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: activeFeature === index ? 1 : 0.5,
                    scale: activeFeature === index ? 1 : 0.9
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className={`p-4 border-white/20 bg-slate-900/90 backdrop-blur-xl w-48 ${
                    activeFeature === index ? 'shadow-2xl shadow-blue-500/20' : ''
                  }`}>
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-2`}>
                      <feature.icon className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="font-semibold text-sm mb-1 text-white">{feature.title}</h4>
                    <p className="text-xs text-slate-400 line-clamp-2">{feature.description}</p>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 py-16 border-y border-white/10 bg-slate-950/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-blue-400" />
                  </div>
                </div>
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Everything You Need for Modern Security Operations</h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Purpose-built for security teams who need speed, accuracy, and comprehensive visibility
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="p-6 border-white/10 bg-slate-900/50 backdrop-blur-xl hover:border-blue-500/50 transition-all h-full">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-4">
                    <useCase.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="font-semibold mb-2 text-white">{useCase.title}</h3>
                  <p className="text-sm text-slate-400">{useCase.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <Card className="p-12 border-white/10 bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-xl text-center">
            <h2 className="text-4xl font-bold mb-4 text-white">Ready to Transform Your Security Operations?</h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Join hundreds of security teams using AI to stay ahead of threats
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                onClick={onOpenAuth}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8"
              >
                Start Your Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
              >
                Schedule a Demo
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-slate-950/50 backdrop-blur-xl py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-4 text-white">Product</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-blue-400">Features</a></li>
                <li><a href="#" className="hover:text-blue-400">Integrations</a></li>
                <li><a href="#" className="hover:text-blue-400">Pricing</a></li>
                <li><a href="#" className="hover:text-blue-400">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Company</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-blue-400">About</a></li>
                <li><a href="#" className="hover:text-blue-400">Blog</a></li>
                <li><a href="#" className="hover:text-blue-400">Careers</a></li>
                <li><a href="#" className="hover:text-blue-400">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Resources</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-blue-400">Documentation</a></li>
                <li><a href="#" className="hover:text-blue-400">API Reference</a></li>
                <li><a href="#" className="hover:text-blue-400">Community</a></li>
                <li><a href="#" className="hover:text-blue-400">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-blue-400">Privacy</a></li>
                <li><a href="#" className="hover:text-blue-400">Terms</a></li>
                <li><a href="#" className="hover:text-blue-400">Compliance</a></li>
                <li><a href="#" className="hover:text-blue-400">Licenses</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <span className="font-semibold text-white">SecureOps AI</span>
            </div>
            <p className="text-sm text-slate-400">
              © 2025 SecureOps AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}