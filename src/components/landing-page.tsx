import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Search, Sparkles, Upload, FileText, Moon, Sun, Shield, Lock, Activity } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useTheme } from './theme-provider';
import { toast } from 'sonner@2.0.3';

interface LandingPageProps {
  onOpenAuth: () => void;
}

export function LandingPage({ onOpenAuth }: LandingPageProps) {
  const [query, setQuery] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { theme, toggleTheme } = useTheme();

  const suggestedPrompts = [
    "Show me all critical alerts in the past 24 hours",
    "Which endpoints are vulnerable to ransomware?",
    "List recent logins from unusual locations",
    "Analyze network traffic patterns for anomalies",
    "What are the latest security compliance gaps?"
  ];

  const handlePromptClick = (prompt: string) => {
    setQuery(prompt);
    handleGuestSearch(prompt);
  };

  const handleGuestSearch = (searchQuery?: string) => {
    const q = searchQuery || query;
    if (!q.trim() && !uploadedFile) {
      toast.error('Please enter a query or upload a file');
      return;
    }

    setIsSearching(true);
    
    // Simulate guest search
    setTimeout(() => {
      setIsSearching(false);
      toast.info('Sign in to view full results', {
        description: 'Guest searches are limited. Sign in for complete access.',
        action: {
          label: 'Sign In',
          onClick: onOpenAuth
        }
      });
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleGuestSearch();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      toast.success(`File "${file.name}" uploaded successfully`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-[#0a0e1a] dark:via-[#0f1419] dark:to-[#0a0e1a]">
      {/* Cyber Grid Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:64px_64px]" />
        
        {/* Animated gradients */}
        <motion.div
          className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Floating security icons */}
        {[Shield, Lock, Activity].map((Icon, i) => (
          <motion.div
            key={i}
            className="absolute opacity-5 dark:opacity-10"
            style={{
              left: `${20 + i * 30}%`,
              top: `${15 + i * 25}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            <Icon className="w-32 h-32 text-blue-600 dark:text-blue-400" />
          </motion.div>
        ))}
      </div>

      {/* Header */}
      <div className="w-full px-6 py-4 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-2"
        >
          <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          <span className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            SecureAI
          </span>
        </motion.div>

        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="rounded-lg"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenAuth}
            className="rounded-lg border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-950"
          >
            Sign In
          </Button>
        </div>
      </div>

      {/* Hero Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-5xl mx-auto text-center space-y-8"
        >
          {/* Title */}
          <div className="space-y-4">
            <motion.h1
              className="text-5xl md:text-7xl font-bold tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                Security Intelligence
              </span>
              <br />
              <span className="text-foreground/90">Powered by AI</span>
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Ask anything about your security data using natural language. Upload files, analyze threats, and get instant insights.
            </motion.p>
          </div>

          {/* Query Input with File Upload */}
          <motion.div
            className="relative max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="relative">
              <div className="relative group">
                {/* Uploaded File Indicator */}
                {uploadedFile && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -top-12 left-0 right-0 flex items-center justify-center"
                  >
                    <div className="flex items-center space-x-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/50 border border-blue-200 dark:border-blue-800 rounded-lg text-sm">
                      <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <span className="text-blue-900 dark:text-blue-100">{uploadedFile.name}</span>
                      <button
                        type="button"
                        onClick={() => setUploadedFile(null)}
                        className="ml-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
                      >
                        ×
                      </button>
                    </div>
                  </motion.div>
                )}

                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ask me anything about your security data..."
                  className="w-full h-16 pl-6 pr-32 text-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-2 border-gray-200 dark:border-slate-700 rounded-2xl shadow-xl focus:shadow-2xl focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-300"
                />
                
                {/* Action Buttons */}
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileUpload}
                    className="hidden"
                    accept=".csv,.json,.txt,.log,.pdf"
                  />
                  
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => fileInputRef.current?.click()}
                    className="h-10 w-10 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-950"
                    title="Upload file"
                  >
                    <Upload className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  </Button>
                  
                  <Button
                    type="submit"
                    size="sm"
                    disabled={isSearching}
                    className="h-10 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 shadow-lg hover:shadow-xl transition-all"
                  >
                    {isSearching ? (
                      <motion.div
                        className="flex space-x-1"
                        animate={{ opacity: 1 }}
                      >
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="w-1.5 h-1.5 bg-white rounded-full"
                            animate={{ y: [0, -4, 0] }}
                            transition={{
                              duration: 0.6,
                              repeat: Infinity,
                              delay: i * 0.1,
                            }}
                          />
                        ))}
                      </motion.div>
                    ) : (
                      <>
                        <Search className="h-4 w-4 mr-1" />
                        Search
                      </>
                    )}
                  </Button>
                </div>

                {/* Glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
              </div>
            </form>

            <p className="text-xs text-muted-foreground mt-3 text-center">
              Supported formats: CSV, JSON, TXT, LOG, PDF • Guest searches are limited
            </p>
          </motion.div>

          {/* Suggested Prompts */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
              <Sparkles className="h-4 w-4 text-blue-500" />
              <span>Try these examples</span>
            </div>
            
            <div className="flex flex-wrap gap-2 justify-center max-w-4xl mx-auto">
              {suggestedPrompts.map((prompt, index) => (
                <motion.button
                  key={index}
                  onClick={() => handlePromptClick(prompt)}
                  className="px-4 py-2 text-sm bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-gray-200 dark:border-slate-700 rounded-xl hover:bg-white dark:hover:bg-slate-700 hover:shadow-lg transition-all duration-200 hover:scale-105 hover:border-blue-300 dark:hover:border-blue-700"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                >
                  {prompt}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto pt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            {[
              { icon: Shield, title: 'Real-time Protection', desc: 'Monitor threats 24/7' },
              { icon: Activity, title: 'Smart Analytics', desc: 'AI-powered insights' },
              { icon: Lock, title: 'Secure by Default', desc: 'Enterprise-grade security' }
            ].map((feature, i) => (
              <motion.div
                key={i}
                className="p-6 bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm border border-gray-200 dark:border-slate-700 rounded-2xl hover:shadow-lg transition-all"
                whileHover={{ y: -4 }}
              >
                <feature.icon className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-3" />
                <h3 className="font-semibold mb-1">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}