import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search,
  Database,
  Share,
  Download,
  Upload,
  Send,
  Settings,
  FileText,
  BarChart3,
  Network,
  Users,
  ChevronRight,
  ChevronLeft,
  X,
  Grid3x3,
  List,
  TrendingUp,
  GitBranch,
  Menu,
  Home
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ScrollArea } from './ui/scroll-area';
import { toast } from 'sonner@2.0.3';
import { useTheme } from './theme-provider';

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

export function WorkspaceCanvas({ workspace, user, onClose, onNavigateToDashboard }: WorkspaceCanvasProps) {
  const [query, setQuery] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(true);
  const [selectedTab, setSelectedTab] = useState('datasets');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { theme } = useTheme();

  const datasets = [
    { id: 'security-events', name: 'Security Events', size: '856 MB', active: true, icon: '🔒' },
    { id: 'network-traffic', name: 'Network Traffic', size: '1.2 GB', active: true, icon: '🌐' },
    { id: 'user-activity', name: 'User Activity', size: '324 MB', active: false, icon: '👤' },
    { id: 'financial-logs', name: 'Financial Logs', size: '2.4 GB', active: false, icon: '💰' },
  ];

  const teamMembers = [
    { name: 'Sarah Chen', status: 'online', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop&crop=face' },
    { name: 'Michael R', status: 'online', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face' },
    { name: 'Alex J', status: 'away', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face' },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      toast.success(`File "${file.name}" uploaded`);
    }
  };

  const handleSendQuery = () => {
    if (query.trim() || uploadedFile) {
      toast.success('Query executed successfully');
      setQuery('');
      setUploadedFile(null);
    }
  };

  const handleExport = (type: string) => {
    toast.success(`Exporting as ${type}...`);
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Compact Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-md px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onNavigateToDashboard}
              className="p-2"
            >
              <Home className="w-4 h-4" />
            </Button>
            
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <span className="font-medium text-sm">{workspace.name}</span>
            </div>

            {/* Team Avatars */}
            <div className="flex items-center -space-x-2">
              {teamMembers.map((member, i) => (
                <div key={i} className="relative">
                  <Avatar className="w-7 h-7 ring-2 ring-background">
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback>{member.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className={`absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border border-background ${
                    member.status === 'online' ? 'bg-green-500' : 'bg-yellow-500'
                  }`} />
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Quick Export Actions */}
            <div className="flex items-center space-x-1 px-3 py-1 bg-muted/50 rounded-lg">
              <button
                onClick={() => handleExport('Analytics')}
                className="p-1.5 hover:bg-background rounded transition-colors"
                title="Export Analytics"
              >
                <TrendingUp className="w-4 h-4 text-muted-foreground" />
              </button>
              <button
                onClick={() => handleExport('Workflow')}
                className="p-1.5 hover:bg-background rounded transition-colors"
                title="Export Workflow"
              >
                <GitBranch className="w-4 h-4 text-muted-foreground" />
              </button>
              <button
                onClick={() => handleExport('PDF')}
                className="p-1.5 hover:bg-background rounded transition-colors"
                title="Export PDF"
              >
                <FileText className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsRightPanelOpen(!isRightPanelOpen)}
              className="p-2"
            >
              {isRightPanelOpen ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Center Canvas */}
        <div className="flex-1 flex flex-col p-6 space-y-4 overflow-auto">
          {/* Query Input with File Upload */}
          <Card className="p-4 border-2 border-dashed border-muted-foreground/20 hover:border-primary/50 transition-colors">
            <div className="space-y-3">
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
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendQuery()}
                    placeholder="Ask anything about your security data..."
                    className="pl-10 h-11 bg-background"
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
                >
                  <Upload className="w-4 h-4" />
                </Button>

                <Button
                  onClick={handleSendQuery}
                  size="sm"
                  className="h-11 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Send className="w-4 h-4 mr-1" />
                  Execute
                </Button>
              </div>
            </div>
          </Card>

          {/* Canvas Area */}
          <div className="flex-1 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50 dark:from-blue-950/20 dark:via-transparent dark:to-purple-950/20 rounded-xl border-2 border-dashed border-muted-foreground/20 flex items-center justify-center min-h-[400px] relative overflow-hidden">
            {/* Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]" />
            
            <div className="relative text-center space-y-4 p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Visualization Canvas</h3>
                <p className="text-sm text-muted-foreground max-w-md">
                  Execute queries to visualize data. Results appear as interactive charts, graphs, and network diagrams.
                </p>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Button variant="outline" size="sm">
                  <Grid3x3 className="w-4 h-4 mr-1" />
                  Grid View
                </Button>
                <Button variant="outline" size="sm">
                  <Network className="w-4 h-4 mr-1" />
                  Network View
                </Button>
                <Button variant="outline" size="sm">
                  <List className="w-4 h-4 mr-1" />
                  Table View
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Minimal Right Panel */}
        <AnimatePresence>
          {isRightPanelOpen && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 280, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="border-l border-border bg-card/30 backdrop-blur-sm overflow-hidden"
            >
              <div className="h-full flex flex-col">
                {/* Panel Tabs */}
                <div className="border-b border-border p-3">
                  <div className="flex items-center space-x-1 bg-muted/50 rounded-lg p-1">
                    <button
                      onClick={() => setSelectedTab('datasets')}
                      className={`flex-1 px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                        selectedTab === 'datasets'
                          ? 'bg-background text-foreground shadow-sm'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <Database className="w-3 h-3 inline mr-1" />
                      Data
                    </button>
                    <button
                      onClick={() => setSelectedTab('team')}
                      className={`flex-1 px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                        selectedTab === 'team'
                          ? 'bg-background text-foreground shadow-sm'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <Users className="w-3 h-3 inline mr-1" />
                      Team
                    </button>
                    <button
                      onClick={() => setSelectedTab('settings')}
                      className={`flex-1 px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                        selectedTab === 'settings'
                          ? 'bg-background text-foreground shadow-sm'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <Settings className="w-3 h-3 inline mr-1" />
                      More
                    </button>
                  </div>
                </div>

                {/* Panel Content */}
                <ScrollArea className="flex-1 p-3">
                  {selectedTab === 'datasets' && (
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground mb-3">Active Datasets</p>
                      {datasets.map((dataset) => (
                        <button
                          key={dataset.id}
                          className={`w-full p-3 rounded-lg border text-left transition-all hover:shadow-sm ${
                            dataset.active
                              ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20'
                              : 'border-border bg-background/50 hover:border-muted-foreground'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center space-x-2">
                              <span>{dataset.icon}</span>
                              <span className="text-sm font-medium">{dataset.name}</span>
                            </div>
                            {dataset.active && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full" />
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">{dataset.size}</p>
                        </button>
                      ))}
                    </div>
                  )}

                  {selectedTab === 'team' && (
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground mb-3">Team Members</p>
                      {teamMembers.map((member, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-3 rounded-lg bg-background/50 hover:bg-background transition-colors"
                        >
                          <div className="flex items-center space-x-2">
                            <div className="relative">
                              <Avatar className="w-8 h-8">
                                <AvatarImage src={member.avatar} />
                                <AvatarFallback>{member.name[0]}</AvatarFallback>
                              </Avatar>
                              <div className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-background ${
                                member.status === 'online' ? 'bg-green-500' : 'bg-yellow-500'
                              }`} />
                            </div>
                            <div>
                              <p className="text-sm font-medium">{member.name}</p>
                              <p className="text-xs text-muted-foreground capitalize">{member.status}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {selectedTab === 'settings' && (
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground mb-3">Quick Actions</p>
                      <button
                        onClick={() => handleExport('Analytics')}
                        className="w-full p-3 rounded-lg bg-background/50 hover:bg-background transition-colors text-left"
                      >
                        <div className="flex items-center space-x-2">
                          <TrendingUp className="w-4 h-4 text-blue-500" />
                          <span className="text-sm">Export Analytics</span>
                        </div>
                      </button>
                      <button
                        onClick={() => handleExport('Workflow')}
                        className="w-full p-3 rounded-lg bg-background/50 hover:bg-background transition-colors text-left"
                      >
                        <div className="flex items-center space-x-2">
                          <GitBranch className="w-4 h-4 text-purple-500" />
                          <span className="text-sm">Export Workflow</span>
                        </div>
                      </button>
                      <button
                        onClick={() => toast.info('Sharing workspace...')}
                        className="w-full p-3 rounded-lg bg-background/50 hover:bg-background transition-colors text-left"
                      >
                        <div className="flex items-center space-x-2">
                          <Share className="w-4 h-4 text-green-500" />
                          <span className="text-sm">Share Workspace</span>
                        </div>
                      </button>
                      <button
                        onClick={onNavigateToDashboard}
                        className="w-full p-3 rounded-lg bg-background/50 hover:bg-background transition-colors text-left"
                      >
                        <div className="flex items-center space-x-2">
                          <Home className="w-4 h-4 text-orange-500" />
                          <span className="text-sm">Back to Dashboard</span>
                        </div>
                      </button>
                    </div>
                  )}
                </ScrollArea>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}