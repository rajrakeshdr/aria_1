import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus,
  Search,
  Filter,
  MoreVertical,
  Pencil,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  Shield,
  Database,
  Mail,
  Cloud,
  Network,
  Settings,
  TestTube,
  Globe,
  Grid3x3,
  List,
  LayoutGrid,
  X,
  Download,
  Code,
  Box,
  Brain,
  Sparkles,
  MessageSquare,
  Save,
  Loader2
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ScrollArea } from './ui/scroll-area';
import { toast } from 'sonner@2.0.3';

interface ConnectorFrameworkProps {
  onClose: () => void;
}

interface Connector {
  id: string;
  name: string;
  type: 'webhook' | 'api' | 'custom' | 'docker' | 'ai-model';
  category: string;
  status: 'active' | 'disabled' | 'error';
  lastSync: string;
  description: string;
  endpoints?: number;
  icon?: any;
  config?: {
    apiKey?: string;
    systemPrompt?: string;
    model?: string;
    baseUrl?: string;
  };
}

export function ConnectorFramework({ onClose }: ConnectorFrameworkProps) {
  const [view, setView] = useState<'grid' | 'list' | 'compact'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [connectorType, setConnectorType] = useState<'api' | 'webhook' | 'docker' | 'ai-model'>('api');
  const [selectedConnector, setSelectedConnector] = useState<Connector | null>(null);
  const [isTesting, setIsTesting] = useState(false);

  // Form states for editing
  const [editForm, setEditForm] = useState({
    apiKey: '',
    systemPrompt: '',
    model: '',
    baseUrl: ''
  });

  const [connectors, setConnectors] = useState<Connector[]>([
    {
      id: 'groq-1',
      name: 'Groq AI',
      type: 'ai-model',
      category: 'AI Models',
      status: 'active',
      lastSync: '2 min ago',
      description: 'Fast AI inference with Llama models for security analysis and natural language queries',
      endpoints: 1,
      icon: Brain,
      config: {
        apiKey: '••••••••••••••••',
        systemPrompt: 'You are a security AI assistant helping with threat detection and analysis.',
        model: 'llama-3.3-70b-versatile',
        baseUrl: 'https://api.groq.com/openai/v1'
      }
    },
    {
      id: '1',
      name: 'CrowdStrike Falcon',
      type: 'api',
      category: 'Endpoint',
      status: 'active',
      lastSync: '5 min ago',
      description: 'Advanced endpoint protection and threat detection',
      endpoints: 3,
      icon: Shield
    },
    {
      id: '2',
      name: 'Microsoft 365',
      type: 'api',
      category: 'Productivity',
      status: 'active',
      lastSync: '1 hour ago',
      description: 'Office 365 security monitoring and compliance',
      endpoints: 5,
      icon: Mail
    },
    {
      id: '3',
      name: 'Slack Webhook',
      type: 'webhook',
      category: 'Notification',
      status: 'disabled',
      lastSync: '2 days ago',
      description: 'Send alerts and notifications to Slack channels',
      endpoints: 1,
      icon: Network
    },
    {
      id: '4',
      name: 'Splunk SIEM',
      type: 'api',
      category: 'SIEM',
      status: 'error',
      lastSync: 'Failed',
      description: 'Security information and event management platform',
      endpoints: 2,
      icon: Database
    },
    {
      id: '5',
      name: 'AWS CloudWatch',
      type: 'docker',
      category: 'Cloud',
      status: 'active',
      lastSync: '10 min ago',
      description: 'Monitor AWS resources and applications',
      endpoints: 4,
      icon: Cloud
    },
    {
      id: '6',
      name: 'Custom Python Connector',
      type: 'docker',
      category: 'Custom',
      status: 'active',
      lastSync: '30 min ago',
      description: 'Custom-built Python connector deployed as Docker',
      endpoints: 2,
      icon: Code
    }
  ]);

  const categories = ['all', 'AI Models', 'Endpoint', 'Productivity', 'Notification', 'SIEM', 'Cloud', 'Custom'];

  const filteredConnectors = connectors.filter(connector => {
    const matchesSearch = connector.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         connector.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || connector.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const statusColors = {
    active: { bg: 'bg-green-500/10', text: 'text-green-700 dark:text-green-400', border: 'border-green-200 dark:border-green-800' },
    disabled: { bg: 'bg-gray-500/10', text: 'text-gray-700 dark:text-gray-400', border: 'border-gray-200 dark:border-gray-800' },
    error: { bg: 'bg-red-500/10', text: 'text-red-700 dark:text-red-400', border: 'border-red-200 dark:border-red-800' }
  };

  const handleCreateConnector = () => {
    toast.success(`Creating ${connectorType} connector...`, {
      description: connectorType === 'docker' 
        ? 'Generating Python code and Docker configuration...'
        : connectorType === 'ai-model'
        ? 'Setting up AI model connector...'
        : 'Setting up connector configuration...'
    });
    setIsCreateOpen(false);
  };

  const handleEditConnector = (connector: Connector) => {
    setSelectedConnector(connector);
    if (connector.config) {
      setEditForm({
        apiKey: connector.config.apiKey || '',
        systemPrompt: connector.config.systemPrompt || '',
        model: connector.config.model || '',
        baseUrl: connector.config.baseUrl || ''
      });
    }
    setIsEditOpen(true);
  };

  const handleSaveConnector = () => {
    if (!selectedConnector) return;

    setConnectors(prev => prev.map(conn => 
      conn.id === selectedConnector.id 
        ? {
            ...conn,
            config: {
              ...conn.config,
              apiKey: editForm.apiKey,
              systemPrompt: editForm.systemPrompt,
              model: editForm.model,
              baseUrl: editForm.baseUrl
            }
          }
        : conn
    ));

    toast.success('Connector updated successfully', {
      description: `${selectedConnector.name} configuration has been saved.`
    });
    
    setIsEditOpen(false);
    setSelectedConnector(null);
  };

  const handleTestConnection = async (connector: Connector) => {
    setIsTesting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Random success/failure for demo
      const success = Math.random() > 0.3;
      
      if (success) {
        toast.success('Connection successful!', {
          description: `${connector.name} is responding correctly.`
        });
        
        // Update connector status to active
        setConnectors(prev => prev.map(conn => 
          conn.id === connector.id 
            ? { ...conn, status: 'active' as const, lastSync: 'Just now' }
            : conn
        ));
      } else {
        toast.error('Connection failed', {
          description: `Unable to connect to ${connector.name}. Please check your configuration.`
        });
        
        // Update connector status to error
        setConnectors(prev => prev.map(conn => 
          conn.id === connector.id 
            ? { ...conn, status: 'error' as const }
            : conn
        ));
      }
    } catch (error) {
      toast.error('Test failed', {
        description: 'An error occurred while testing the connection.'
      });
    } finally {
      setIsTesting(false);
    }
  };

  const handleDeleteConnector = (connector: Connector) => {
    setConnectors(prev => prev.filter(conn => conn.id !== connector.id));
    toast.success('Connector deleted', {
      description: `${connector.name} has been removed.`
    });
  };

  const renderGridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredConnectors.map((connector, i) => {
        const Icon = connector.icon || Box;
        return (
          <motion.div
            key={connector.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -4 }}
          >
            <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg h-full">
              <div className="p-5 space-y-4">
                <div className="flex items-start justify-between">
                  <div className={`w-12 h-12 ${
                    connector.status === 'active' 
                      ? connector.type === 'ai-model' 
                        ? 'bg-purple-500/10'
                        : 'bg-blue-500/10'
                      : connector.status === 'error'
                      ? 'bg-red-500/10'
                      : 'bg-gray-500/10'
                  } rounded-xl flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${
                      connector.status === 'active'
                        ? connector.type === 'ai-model'
                          ? 'text-purple-500'
                          : 'text-blue-500'
                        : connector.status === 'error'
                        ? 'text-red-500'
                        : 'text-gray-500'
                    }`} />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="p-1 h-auto">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEditConnector(connector)}>
                        <Pencil className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleTestConnection(connector)}>
                        <TestTube className="w-4 h-4 mr-2" />
                        Test Connection
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Settings className="w-4 h-4 mr-2" />
                        Configure
                      </DropdownMenuItem>
                      {connector.type === 'docker' && (
                        <DropdownMenuItem>
                          <Download className="w-4 h-4 mr-2" />
                          Export Docker Image
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem 
                        className="text-red-600"
                        onClick={() => handleDeleteConnector(connector)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div>
                  <h3 className="font-semibold mb-1">{connector.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{connector.description}</p>
                </div>

                <div className="flex items-center flex-wrap gap-2">
                  <Badge
                    variant="outline"
                    className={`${statusColors[connector.status].bg} ${statusColors[connector.status].text} ${statusColors[connector.status].border}`}
                  >
                    {connector.status}
                  </Badge>
                  <Badge variant="secondary">{connector.type}</Badge>
                  <Badge variant="outline">{connector.category}</Badge>
                </div>

                <div className="pt-3 border-t border-border space-y-2">
                  {connector.type === 'ai-model' && connector.config ? (
                    <>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Model:</span>
                        <span className="font-medium">{connector.config.model}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Last used:</span>
                        <span className="font-medium">{connector.lastSync}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Endpoints:</span>
                        <span className="font-medium">{connector.endpoints || 0}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Last sync:</span>
                        <span className="font-medium">{connector.lastSync}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );

  const renderListView = () => (
    <div className="space-y-2">
      {filteredConnectors.map((connector, i) => {
        const Icon = connector.icon || Box;
        return (
          <motion.div
            key={connector.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.03 }}
          >
            <Card className="border hover:border-primary/50 transition-all hover:shadow-md">
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className={`w-10 h-10 ${
                      connector.status === 'active' 
                        ? connector.type === 'ai-model' 
                          ? 'bg-purple-500/10'
                          : 'bg-blue-500/10'
                        : connector.status === 'error'
                        ? 'bg-red-500/10'
                        : 'bg-gray-500/10'
                    } rounded-lg flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${
                        connector.status === 'active'
                          ? connector.type === 'ai-model'
                            ? 'text-purple-500'
                            : 'text-blue-500'
                          : connector.status === 'error'
                          ? 'text-red-500'
                          : 'text-gray-500'
                      }`} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-medium">{connector.name}</h3>
                        <Badge variant="secondary" className="text-xs">{connector.type}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{connector.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right hidden md:block">
                      {connector.type === 'ai-model' && connector.config ? (
                        <>
                          <p className="text-sm font-medium">{connector.config.model}</p>
                          <p className="text-xs text-muted-foreground">{connector.lastSync}</p>
                        </>
                      ) : (
                        <>
                          <p className="text-sm font-medium">{connector.endpoints} endpoints</p>
                          <p className="text-xs text-muted-foreground">{connector.lastSync}</p>
                        </>
                      )}
                    </div>

                    <Badge
                      variant="outline"
                      className={`${statusColors[connector.status].bg} ${statusColors[connector.status].text} ${statusColors[connector.status].border}`}
                    >
                      {connector.status}
                    </Badge>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="p-2">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditConnector(connector)}>
                          <Pencil className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleTestConnection(connector)}>
                          <TestTube className="w-4 h-4 mr-2" />
                          Test Connection
                        </DropdownMenuItem>
                        {connector.type === 'docker' && (
                          <DropdownMenuItem>
                            <Download className="w-4 h-4 mr-2" />
                            Export Docker Image
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem 
                          className="text-red-600"
                          onClick={() => handleDeleteConnector(connector)}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );

  const renderCompactView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
      {filteredConnectors.map((connector, i) => {
        const Icon = connector.icon || Box;
        return (
          <motion.div
            key={connector.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.03 }}
            whileHover={{ scale: 1.02 }}
          >
            <Card className="border-2 hover:border-primary/50 transition-all cursor-pointer">
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <Icon className={`w-6 h-6 ${
                    connector.status === 'active'
                      ? connector.type === 'ai-model'
                        ? 'text-purple-500'
                        : 'text-blue-500'
                      : connector.status === 'error'
                      ? 'text-red-500'
                      : 'text-gray-500'
                  }`} />
                  <Badge
                    variant="outline"
                    className={`text-xs ${statusColors[connector.status].bg} ${statusColors[connector.status].text} ${statusColors[connector.status].border}`}
                  >
                    {connector.status === 'active' ? <CheckCircle className="w-3 h-3" /> : 
                     connector.status === 'error' ? <XCircle className="w-3 h-3" /> :
                     <Clock className="w-3 h-3" />}
                  </Badge>
                </div>
                <div>
                  <h4 className="font-medium text-sm mb-1">{connector.name}</h4>
                  <p className="text-xs text-muted-foreground">
                    {connector.type} • {connector.type === 'ai-model' ? connector.config?.model : `${connector.endpoints} endpoints`}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-md px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={onClose} className="p-2">
              <X className="w-4 h-4" />
            </Button>
            <div className="flex items-center space-x-2">
              <Database className="w-5 h-5 text-blue-500" />
              <span className="font-semibold">Apps & Connectors</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Plus className="w-4 h-4 mr-1" />
                  New Connector
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create New Connector</DialogTitle>
                </DialogHeader>
                <div className="space-y-6 py-4">
                  <div className="space-y-2">
                    <Label>Connector Type</Label>
                    <div className="grid grid-cols-4 gap-3">
                      {(['api', 'webhook', 'docker', 'ai-model'] as const).map((type) => (
                        <button
                          key={type}
                          onClick={() => setConnectorType(type)}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            connectorType === type
                              ? 'border-primary bg-primary/5'
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          <div className="space-y-2">
                            {type === 'api' && <Globe className="w-6 h-6 mx-auto text-blue-500" />}
                            {type === 'webhook' && <Network className="w-6 h-6 mx-auto text-green-500" />}
                            {type === 'docker' && <Code className="w-6 h-6 mx-auto text-purple-500" />}
                            {type === 'ai-model' && <Brain className="w-6 h-6 mx-auto text-purple-500" />}
                            <p className="text-sm font-medium capitalize">
                              {type === 'ai-model' ? 'AI Model' : type}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Connector Name</Label>
                    <Input placeholder="e.g., My Custom Connector" />
                  </div>

                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea placeholder="Describe what this connector does..." rows={3} />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Category</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ai-models">AI Models</SelectItem>
                          <SelectItem value="endpoint">Endpoint</SelectItem>
                          <SelectItem value="siem">SIEM</SelectItem>
                          <SelectItem value="cloud">Cloud</SelectItem>
                          <SelectItem value="notification">Notification</SelectItem>
                          <SelectItem value="custom">Custom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {connectorType === 'docker' && (
                      <div className="space-y-2">
                        <Label>Python Version</Label>
                        <Select defaultValue="3.11">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="3.9">Python 3.9</SelectItem>
                            <SelectItem value="3.10">Python 3.10</SelectItem>
                            <SelectItem value="3.11">Python 3.11</SelectItem>
                            <SelectItem value="3.12">Python 3.12</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>

                  {connectorType === 'docker' && (
                    <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                      <div className="flex items-start space-x-2">
                        <Code className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                            Docker Connector Generator
                          </p>
                          <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                            We'll generate a complete Python connector with Docker configuration, 
                            including requirements.txt, Dockerfile, and deployment scripts.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <Button className="w-full" onClick={handleCreateConnector}>
                    {connectorType === 'docker' ? 'Generate Docker Connector' : 'Create Connector'}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <div className="flex items-center space-x-1 bg-muted/50 rounded-lg p-1">
              <button
                onClick={() => setView('grid')}
                className={`p-2 rounded transition-colors ${
                  view === 'grid' ? 'bg-background shadow-sm' : 'hover:bg-background/50'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setView('list')}
                className={`p-2 rounded transition-colors ${
                  view === 'list' ? 'bg-background shadow-sm' : 'hover:bg-background/50'
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setView('compact')}
                className={`p-2 rounded transition-colors ${
                  view === 'compact' ? 'bg-background shadow-sm' : 'hover:bg-background/50'
                }`}
                title="Compact View"
              >
                <Grid3x3 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="border-b border-border bg-card/30 px-6 py-4">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search connectors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted hover:bg-muted/80'
                }`}
              >
                {category === 'all' ? 'All' : category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1">
        <div className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              {view === 'grid' && renderGridView()}
              {view === 'list' && renderListView()}
              {view === 'compact' && renderCompactView()}
            </motion.div>
          </AnimatePresence>
        </div>
      </ScrollArea>

      {/* Edit Dialog for AI Models */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              {selectedConnector?.type === 'ai-model' && <Brain className="w-5 h-5 text-purple-500" />}
              <span>Edit {selectedConnector?.name}</span>
            </DialogTitle>
          </DialogHeader>
          
          {selectedConnector?.type === 'ai-model' ? (
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <Label>API Key</Label>
                <div className="relative">
                  <Input
                    type="password"
                    placeholder="Enter your API key"
                    value={editForm.apiKey}
                    onChange={(e) => setEditForm({ ...editForm, apiKey: e.target.value })}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Your API key is encrypted and stored securely
                </p>
              </div>

              <div className="space-y-2">
                <Label>Model</Label>
                <Select 
                  value={editForm.model} 
                  onValueChange={(value) => setEditForm({ ...editForm, model: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="llama-3.3-70b-versatile">
                      <div className="flex items-center space-x-2">
                        <Sparkles className="w-4 h-4 text-purple-500" />
                        <span>Llama 3.3 70B (Versatile)</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="llama-3.1-70b-versatile">
                      Llama 3.1 70B (Versatile)
                    </SelectItem>
                    <SelectItem value="llama-3.1-8b-instant">
                      Llama 3.1 8B (Instant)
                    </SelectItem>
                    <SelectItem value="mixtral-8x7b-32768">
                      Mixtral 8x7B
                    </SelectItem>
                    <SelectItem value="gemma-7b-it">
                      Gemma 7B IT
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>System Prompt</Label>
                <Textarea
                  placeholder="Enter system prompt for AI behavior..."
                  rows={6}
                  value={editForm.systemPrompt}
                  onChange={(e) => setEditForm({ ...editForm, systemPrompt: e.target.value })}
                />
                <p className="text-xs text-muted-foreground">
                  Define how the AI should behave and respond to queries
                </p>
              </div>

              <div className="space-y-2">
                <Label>Base URL (Optional)</Label>
                <Input
                  placeholder="https://api.groq.com/openai/v1"
                  value={editForm.baseUrl}
                  onChange={(e) => setEditForm({ ...editForm, baseUrl: e.target.value })}
                />
              </div>

              <div className="flex items-center space-x-2 pt-4">
                <Button 
                  className="flex-1" 
                  variant="outline"
                  onClick={() => handleTestConnection(selectedConnector)}
                  disabled={isTesting}
                >
                  {isTesting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Testing...
                    </>
                  ) : (
                    <>
                      <TestTube className="w-4 h-4 mr-2" />
                      Test Connection
                    </>
                  )}
                </Button>
                <Button 
                  className="flex-1" 
                  onClick={handleSaveConnector}
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Configuration
                </Button>
              </div>

              <div className="p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-800">
                <div className="flex items-start space-x-2">
                  <MessageSquare className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-purple-900 dark:text-purple-100">
                      About {selectedConnector.name}
                    </p>
                    <p className="text-xs text-purple-700 dark:text-purple-300 mt-1">
                      {selectedConnector.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-4">
              <p className="text-muted-foreground">Edit configuration for non-AI connectors coming soon...</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
