import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search,
  Plus,
  RefreshCw,
  UserPlus,
  ChevronDown,
  Database,
  Upload,
  Send,
  Shield,
  Cloud,
  AlertTriangle,
  Sparkles,
  Lightbulb,
  FileText,
  X,
  Home,
  Settings
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { toast } from 'sonner@2.0.3';
import { searchWithAI } from '../utils/groq-client';

interface WorkspaceCanvasProps {
  workspace: {
    name: string;
    id: string;
  };
  user: {
    name: string;
    avatar?: string;
  };
  onClose: () => void;
  onNavigateToDashboard?: () => void;
}

interface Canvas {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
}

export function WorkspaceCanvas({ workspace, user, onClose, onNavigateToDashboard }: WorkspaceCanvasProps) {
  const [query, setQuery] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [selectedTab, setSelectedTab] = useState('canvases');
  const [isSearching, setIsSearching] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'queries', label: 'Queries' },
    { id: 'canvases', label: 'Canvases' },
    { id: 'alerts', label: 'Alerts' },
    { id: 'workflows', label: 'Workflows' },
  ];

  const canvasSuggestions: Canvas[] = [
    {
      id: 'identity',
      title: 'Identity and Asset Inventory',
      description: 'Track users, roles, devices, and assets across your environment',
      icon: Database,
      color: 'text-blue-500'
    },
    {
      id: 'cloud',
      title: 'Cloud Posture and Configurations',
      description: 'Monitor misconfigurations, exposures, and security settings',
      icon: Cloud,
      color: 'text-cyan-500'
    },
    {
      id: 'threat',
      title: 'Threat and Activity Monitoring',
      description: 'Analyze sign-ins, events, and alerts to surface suspicious behavior',
      icon: AlertTriangle,
      color: 'text-yellow-500'
    },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      toast.success(`File "${file.name}" uploaded`);
    }
  };

  const handleSendQuery = async () => {
    if (!query.trim() && !uploadedFile) {
      toast.error('Please enter a query or upload a file');
      return;
    }

    setIsSearching(true);
    setAiResponse('');

    try {
      const context = uploadedFile ? `User uploaded file: ${uploadedFile.name}` : '';
      const response = await searchWithAI(query, context);
      setAiResponse(response);
      toast.success('Query executed successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to process query');
      // Show demo response on error
      setAiResponse('Demo AI Response: ' + query);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Top Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-md px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onNavigateToDashboard}
              className="p-2"
            >
              <Home className="w-4 h-4" />
            </Button>

            <div className="flex items-center space-x-2 px-3 py-1.5 bg-muted/50 rounded-lg hover:bg-muted transition-colors cursor-pointer">
              <Shield className="w-4 h-4 text-primary" />
              <span className="font-medium text-sm">{workspace.name}</span>
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="p-2"
              onClick={() => toast.info('Refreshing...')}
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
            >
              <Settings className="w-4 h-4 mr-1" />
              Settings
            </Button>
            <Button
              variant="default"
              size="sm"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <UserPlus className="w-4 h-4 mr-1" />
              Invite
            </Button>
          </div>
        </div>
      </div>

      {/* Sub Navigation Tabs */}
      <div className="border-b border-border bg-card/30 px-6">
        <div className="flex items-center space-x-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
                selectedTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-16 border-r border-border bg-card/30 flex flex-col items-center py-4">
          <button
            className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 flex items-center justify-center transition-all hover:scale-105"
            onClick={() => toast.info('Creating new canvas...')}
          >
            <Plus className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Center Content */}
        <div className="flex-1 flex flex-col overflow-auto">
          {/* Breadcrumb */}
          <div className="px-6 py-3 border-b border-border bg-card/20">
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-muted-foreground">Canvas Library</span>
              <span className="text-muted-foreground">/</span>
              <span className="font-medium">New Canvas (0)</span>
            </div>
          </div>

          {/* Main Canvas Area */}
          <div className="flex-1 p-8 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30 dark:from-blue-950/10 dark:via-transparent dark:to-purple-950/10">
            {/* Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

            <div className="max-w-3xl mx-auto space-y-6 relative">
              {/* Hero Section */}
              <div className="text-center space-y-4">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto"
                >
                  <Sparkles className="w-8 h-8 text-white" />
                </motion.div>
                <div>
                  <h1 className="text-2xl font-bold mb-2">Let's start building</h1>
                  <p className="text-sm text-muted-foreground max-w-xl mx-auto">
                    Type in the prompt which security canvas you want to build, or pick one of the suggestions below to get started.
                  </p>
                </div>
              </div>

              {/* Canvas Suggestions */}
              <div className="space-y-3">
                {canvasSuggestions.map((canvas) => {
                  const Icon = canvas.icon;
                  return (
                    <motion.button
                      key={canvas.id}
                      whileHover={{ x: 4 }}
                      onClick={() => {
                        setQuery(canvas.title);
                        toast.info(`Selected: ${canvas.title}`);
                      }}
                      className="w-full text-left"
                    >
                      <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg">
                        <div className="p-4 flex items-start space-x-3">
                          <div className={`w-10 h-10 bg-muted rounded-lg flex items-center justify-center flex-shrink-0`}>
                            <Icon className={`w-5 h-5 ${canvas.color}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold mb-1">{canvas.title}</h3>
                            <p className="text-sm text-muted-foreground">{canvas.description}</p>
                          </div>
                        </div>
                      </Card>
                    </motion.button>
                  );
                })}
              </div>

              {/* AI Response */}
              {aiResponse && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card className="border-2 border-primary/30 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20">
                    <div className="p-6 space-y-3">
                      <div className="flex items-center space-x-2">
                        <Sparkles className="w-5 h-5 text-primary" />
                        <h3 className="font-semibold">AI Analysis</h3>
                      </div>
                      <p className="text-sm whitespace-pre-wrap">{aiResponse}</p>
                    </div>
                  </Card>
                </motion.div>
              )}
            </div>
          </div>

          {/* Bottom Query Input */}
          <div className="border-t border-border bg-card/50 backdrop-blur-md p-4">
            <div className="max-w-3xl mx-auto">
              <Card className="border-2 hover:border-primary/50 transition-colors">
                <div className="p-4 space-y-3">
                  {uploadedFile && (
                    <div className="flex items-center justify-between p-2 bg-blue-50 dark:bg-blue-950/50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <span className="text-sm">{uploadedFile.name}</span>
                      </div>
                      <button
                        onClick={() => setUploadedFile(null)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  <div className="flex items-center space-x-2">
                    <div className="flex-1 relative">
                      <Sparkles className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                      <Input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && !isSearching && handleSendQuery()}
                        placeholder="Ask anything security..."
                        className="pl-10 h-11 bg-background border-muted-foreground/20"
                        disabled={isSearching}
                      />
                    </div>

                    <input
                      ref={fileInputRef}
                      type="file"
                      onChange={handleFileUpload}
                      className="hidden"
                      accept=".csv,.json,.txt,.log,.pdf"
                    />

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                      className="h-11 px-3"
                      disabled={isSearching}
                    >
                      <Upload className="w-4 h-4" />
                    </Button>

                    <Button
                      onClick={handleSendQuery}
                      size="sm"
                      className="h-11 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      disabled={isSearching}
                    >
                      {isSearching ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full mr-2"
                          />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-1" />
                          Execute
                        </>
                      )}
                    </Button>
                  </div>

                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <Lightbulb className="w-3 h-3" />
                    <span>Sola AI can make mistakes. Sola doesn't use your workspace data to train its models.</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}