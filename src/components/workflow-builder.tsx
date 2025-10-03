import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search,
  Plus,
  Play,
  Save,
  Download,
  Trash2,
  Copy,
  Settings,
  Zap,
  Database,
  Filter,
  Mail,
  Shield,
  AlertTriangle,
  GitBranch,
  Lightbulb,
  Sparkles,
  Clock,
  MoreVertical,
  Grid3x3,
  List,
  ChevronRight,
  X,
  ArrowRight,
  Boxes
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { toast } from 'sonner@2.0.3';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

interface WorkflowBuilderProps {
  onClose: () => void;
}

interface Workflow {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'draft' | 'paused';
  lastRun?: string;
  runs: number;
  nodes: number;
}

interface WorkflowNode {
  id: string;
  type: string;
  name: string;
  position: { x: number; y: number };
  connections: string[];
}

export function WorkflowBuilder({ onClose }: WorkflowBuilderProps) {
  const [view, setView] = useState<'list' | 'canvas'>('list');
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null);
  const [nodes, setNodes] = useState<WorkflowNode[]>([]);
  const [isLeftPanelOpen, setIsLeftPanelOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isNewWorkflowOpen, setIsNewWorkflowOpen] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  const workflows: Workflow[] = [
    {
      id: '1',
      name: 'Threat Detection Pipeline',
      description: 'Real-time threat detection from multiple data sources',
      status: 'active',
      lastRun: '2 minutes ago',
      runs: 1247,
      nodes: 8
    },
    {
      id: '2',
      name: 'Security Alert Enrichment',
      description: 'Enrich security alerts with contextual information',
      status: 'active',
      lastRun: '5 minutes ago',
      runs: 892,
      nodes: 6
    },
    {
      id: '3',
      name: 'Compliance Monitoring',
      description: 'Monitor and report compliance violations',
      status: 'paused',
      lastRun: '2 hours ago',
      runs: 456,
      nodes: 10
    },
    {
      id: '4',
      name: 'Incident Response Automation',
      description: 'Automated incident response and remediation',
      status: 'draft',
      lastRun: 'Never',
      runs: 0,
      nodes: 4
    },
    {
      id: '5',
      name: 'User Behavior Analytics',
      description: 'Detect anomalous user behavior patterns',
      status: 'active',
      lastRun: '10 minutes ago',
      runs: 2341,
      nodes: 12
    }
  ];

  const moduleCategories = {
    integrations: [
      { id: 'crowdstrike', name: 'CrowdStrike', icon: Shield, color: 'text-red-500' },
      { id: 'microsoft365', name: 'Microsoft 365', icon: Mail, color: 'text-blue-500' },
      { id: 'splunk', name: 'Splunk', icon: Database, color: 'text-green-500' },
      { id: 'aws', name: 'AWS', icon: Database, color: 'text-orange-500' },
    ],
    agents: [
      { id: 'storyline', name: 'Storyline', icon: GitBranch, color: 'text-purple-500' },
      { id: 'enrichment', name: 'Enrichment', icon: Sparkles, color: 'text-yellow-500' },
      { id: 'detection', name: 'Detection', icon: AlertTriangle, color: 'text-red-500' },
      { id: 'notify', name: 'Notify', icon: Mail, color: 'text-blue-500' },
    ],
    logic: [
      { id: 'filter', name: 'Filter', icon: Filter, color: 'text-gray-500' },
      { id: 'condition', name: 'Condition', icon: GitBranch, color: 'text-green-500' },
      { id: 'scheduler', name: 'Scheduler', icon: Clock, color: 'text-blue-500' },
      { id: 'aggregator', name: 'Aggregator', icon: Database, color: 'text-purple-500' },
    ]
  };

  const handleWorkflowSelect = (workflow: Workflow) => {
    setSelectedWorkflow(workflow);
    setView('canvas');
    toast.info(`Opened workflow: ${workflow.name}`);
  };

  const handleDragStart = (e: React.DragEvent, module: any) => {
    e.dataTransfer.effectAllowed = 'copy';
    e.dataTransfer.setData('module', JSON.stringify(module));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const module = JSON.parse(e.dataTransfer.getData('module'));
    const newNode: WorkflowNode = {
      id: `${module.id}-${Date.now()}`,
      type: module.id,
      name: module.name,
      position: {
        x: e.clientX - rect.left - 60,
        y: e.clientY - rect.top - 30
      },
      connections: []
    };

    setNodes([...nodes, newNode]);
    toast.success(`Added ${module.name} node`);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-md px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={onClose} className="p-2">
              <X className="w-4 h-4" />
            </Button>
            
            <div className="flex items-center space-x-2">
              <GitBranch className="w-5 h-5 text-blue-500" />
              <span className="font-semibold">Workflow Builder</span>
            </div>

            {selectedWorkflow && view === 'canvas' && (
              <>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{selectedWorkflow.name}</span>
              </>
            )}
          </div>

          <div className="flex items-center space-x-2">
            {view === 'canvas' && (
              <>
                <Button variant="outline" size="sm">
                  <Save className="w-4 h-4 mr-1" />
                  Save
                </Button>
                <Button variant="outline" size="sm">
                  <Play className="w-4 h-4 mr-1" />
                  Test Run
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-1" />
                  Export
                </Button>
              </>
            )}

            <div className="flex items-center space-x-1 bg-muted/50 rounded-lg p-1">
              <button
                onClick={() => setView('list')}
                className={`px-3 py-1.5 rounded transition-colors ${
                  view === 'list' ? 'bg-background shadow-sm' : 'hover:bg-background/50'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  if (!selectedWorkflow) {
                    toast.error('Select a workflow first');
                    return;
                  }
                  setView('canvas');
                }}
                className={`px-3 py-1.5 rounded transition-colors ${
                  view === 'canvas' ? 'bg-background shadow-sm' : 'hover:bg-background/50'
                }`}
              >
                <Grid3x3 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* List View */}
        {view === 'list' && (
          <div className="flex-1 p-6">
            <div className="max-w-6xl mx-auto space-y-6">
              {/* Search and Create */}
              <div className="flex items-center space-x-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search workflows..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Dialog open={isNewWorkflowOpen} onOpenChange={setIsNewWorkflowOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      <Plus className="w-4 h-4 mr-1" />
                      New Workflow
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Workflow</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label>Workflow Name</Label>
                        <Input placeholder="Enter workflow name..." />
                      </div>
                      <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea placeholder="Describe what this workflow does..." rows={3} />
                      </div>
                      <Button
                        className="w-full"
                        onClick={() => {
                          setIsNewWorkflowOpen(false);
                          toast.success('Workflow created');
                        }}
                      >
                        Create Workflow
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Workflows Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {workflows.map((workflow) => (
                  <motion.div
                    key={workflow.id}
                    whileHover={{ y: -4 }}
                    className="cursor-pointer"
                    onClick={() => handleWorkflowSelect(workflow)}
                  >
                    <Card className="h-full border-2 hover:border-primary/50 transition-all hover:shadow-lg">
                      <div className="p-4 space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold mb-1">{workflow.name}</h3>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {workflow.description}
                            </p>
                          </div>
                          <Button variant="ghost" size="sm" className="p-1 h-auto">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between">
                          <Badge
                            variant={
                              workflow.status === 'active'
                                ? 'default'
                                : workflow.status === 'paused'
                                ? 'secondary'
                                : 'outline'
                            }
                            className={
                              workflow.status === 'active'
                                ? 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800'
                                : workflow.status === 'paused'
                                ? 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800'
                                : ''
                            }
                          >
                            {workflow.status}
                          </Badge>
                          <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Boxes className="w-3 h-3" />
                              <span>{workflow.nodes}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Zap className="w-3 h-3" />
                              <span>{workflow.runs}</span>
                            </div>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-border">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">Last run:</span>
                            <span className="font-medium">{workflow.lastRun}</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Canvas View */}
        {view === 'canvas' && (
          <>
            {/* Minimal Left Panel with Icons */}
            <AnimatePresence>
              {isLeftPanelOpen && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 64, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  className="border-r border-border bg-card/30"
                >
                  <ScrollArea className="h-full">
                    <div className="p-2 space-y-4">
                      {/* Integrations */}
                      <div className="space-y-1">
                        <div className="px-2 py-1">
                          <Database className="w-4 h-4 text-muted-foreground" />
                        </div>
                        {moduleCategories.integrations.map((module) => {
                          const Icon = module.icon;
                          return (
                            <button
                              key={module.id}
                              draggable
                              onDragStart={(e) => handleDragStart(e, module)}
                              className="w-full p-2 rounded-lg hover:bg-accent transition-colors group relative"
                              title={module.name}
                            >
                              <Icon className={`w-5 h-5 ${module.color}`} />
                              <div className="absolute left-full ml-2 px-2 py-1 bg-popover border border-border rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">
                                <span className="text-xs">{module.name}</span>
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      <div className="border-t border-border" />

                      {/* Agents */}
                      <div className="space-y-1">
                        <div className="px-2 py-1">
                          <Sparkles className="w-4 h-4 text-muted-foreground" />
                        </div>
                        {moduleCategories.agents.map((module) => {
                          const Icon = module.icon;
                          return (
                            <button
                              key={module.id}
                              draggable
                              onDragStart={(e) => handleDragStart(e, module)}
                              className="w-full p-2 rounded-lg hover:bg-accent transition-colors group relative"
                              title={module.name}
                            >
                              <Icon className={`w-5 h-5 ${module.color}`} />
                              <div className="absolute left-full ml-2 px-2 py-1 bg-popover border border-border rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">
                                <span className="text-xs">{module.name}</span>
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      <div className="border-t border-border" />

                      {/* Logic */}
                      <div className="space-y-1">
                        <div className="px-2 py-1">
                          <GitBranch className="w-4 h-4 text-muted-foreground" />
                        </div>
                        {moduleCategories.logic.map((module) => {
                          const Icon = module.icon;
                          return (
                            <button
                              key={module.id}
                              draggable
                              onDragStart={(e) => handleDragStart(e, module)}
                              className="w-full p-2 rounded-lg hover:bg-accent transition-colors group relative"
                              title={module.name}
                            >
                              <Icon className={`w-5 h-5 ${module.color}`} />
                              <div className="absolute left-full ml-2 px-2 py-1 bg-popover border border-border rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">
                                <span className="text-xs">{module.name}</span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </ScrollArea>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Canvas */}
            <div className="flex-1 relative">
              <div
                ref={canvasRef}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30 dark:from-blue-950/10 dark:via-transparent dark:to-purple-950/10"
              >
                {/* Grid Background */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]" />

                {/* Nodes */}
                {nodes.map((node) => {
                  const module = [...moduleCategories.integrations, ...moduleCategories.agents, ...moduleCategories.logic].find(
                    (m) => m.id === node.type
                  );
                  const Icon = module?.icon || Boxes;
                  const color = module?.color || 'text-gray-500';

                  return (
                    <motion.div
                      key={node.id}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      style={{
                        position: 'absolute',
                        left: node.position.x,
                        top: node.position.y,
                      }}
                      className="bg-card border-2 border-border rounded-lg p-4 shadow-lg cursor-move hover:shadow-xl transition-shadow"
                    >
                      <div className="flex items-center space-x-2">
                        <Icon className={`w-5 h-5 ${color}`} />
                        <span className="text-sm font-medium">{node.name}</span>
                      </div>
                      {/* Connection points */}
                      <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full border-2 border-background cursor-pointer" />
                      <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-green-500 rounded-full border-2 border-background cursor-pointer" />
                    </motion.div>
                  );
                })}

                {/* Empty State */}
                {nodes.length === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center space-y-4 p-8">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto">
                        <GitBranch className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-1">Build Your Workflow</h3>
                        <p className="text-sm text-muted-foreground max-w-md">
                          Drag and drop components from the left panel to create your workflow
                        </p>
                      </div>
                      <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                        <Lightbulb className="w-4 h-4 text-yellow-500" />
                        <span>Tip: Connect nodes by dragging between connection points</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Toggle Left Panel */}
              <button
                onClick={() => setIsLeftPanelOpen(!isLeftPanelOpen)}
                className="absolute left-2 top-2 p-2 bg-card border border-border rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                {isLeftPanelOpen ? <ChevronRight className="w-4 h-4" /> : <Boxes className="w-4 h-4" />}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}