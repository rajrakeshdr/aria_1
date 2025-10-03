import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search,
  Plus,
  Play,
  Save,
  Download,
  Shield,
  Filter,
  Mail,
  AlertTriangle,
  GitBranch,
  Sparkles,
  Clock,
  Database,
  Grid3x3,
  List,
  ChevronRight,
  X,
  Boxes,
  Zap,
  MoreVertical,
  Brain,
  Network,
  ArrowRight
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
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
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
  ];

  const moduleCategories = {
    integrations: [
      { id: 'crowdstrike', name: 'CrowdStrike', icon: Shield, color: 'text-red-500' },
      { id: 'splunk', name: 'Splunk', icon: Database, color: 'text-green-500' },
      { id: 'aws', name: 'AWS Security', icon: Database, color: 'text-orange-500' },
    ],
    agents: [
      { id: 'ai-storyline', name: 'AI Storyline', icon: Brain, color: 'text-purple-500' },
      { id: 'enrichment', name: 'AI Enrichment', icon: Sparkles, color: 'text-yellow-500' },
      { id: 'detection', name: 'AI Detection', icon: AlertTriangle, color: 'text-red-500' },
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
    
    // Create sample nodes for demonstration
    const sampleNodes: WorkflowNode[] = [
      {
        id: 'node-1',
        type: 'crowdstrike',
        name: 'CrowdStrike',
        position: { x: 100, y: 100 },
        connections: ['node-2']
      },
      {
        id: 'node-2',
        type: 'ai-enrichment',
        name: 'AI Enrichment',
        position: { x: 350, y: 100 },
        connections: ['node-3']
      },
      {
        id: 'node-3',
        type: 'filter',
        name: 'Filter',
        position: { x: 600, y: 100 },
        connections: ['node-4']
      },
      {
        id: 'node-4',
        type: 'notify',
        name: 'Notify',
        position: { x: 850, y: 100 },
        connections: []
      },
    ];
    
    setNodes(sampleNodes);
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
      id: `node-${Date.now()}`,
      type: module.id,
      name: module.name,
      position: {
        x: e.clientX - rect.left - 75,
        y: e.clientY - rect.top - 40
      },
      connections: []
    };

    setNodes([...nodes, newNode]);
    toast.success(`Added ${module.name} node`);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleNodeClick = (nodeId: string) => {
    setSelectedNode(selectedNode === nodeId ? null : nodeId);
  };

  const handleConnectNodes = (sourceId: string, targetId: string) => {
    setNodes(nodes.map(node => 
      node.id === sourceId 
        ? { ...node, connections: [...node.connections, targetId] }
        : node
    ));
    toast.success('Nodes connected');
  };

  // Draw SVG connections between nodes
  const renderConnections = () => {
    return nodes.map((node) => {
      return node.connections.map((targetId) => {
        const targetNode = nodes.find(n => n.id === targetId);
        if (!targetNode) return null;

        const startX = node.position.x + 150; // Node width
        const startY = node.position.y + 40; // Half node height
        const endX = targetNode.position.x;
        const endY = targetNode.position.y + 40;

        // Calculate control points for curved line
        const midX = (startX + endX) / 2;

        return (
          <g key={`${node.id}-${targetId}`}>
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5 }}
              d={`M ${startX} ${startY} Q ${midX} ${startY}, ${midX} ${(startY + endY) / 2} T ${endX} ${endY}`}
              stroke="url(#gradient)"
              strokeWidth="2"
              fill="none"
              markerEnd="url(#arrowhead)"
            />
            {/* Animated flow */}
            <motion.circle
              r="4"
              fill="#3b82f6"
              initial={{ offsetDistance: '0%' }}
              animate={{ offsetDistance: '100%' }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <animateMotion
                dur="2s"
                repeatCount="indefinite"
                path={`M ${startX} ${startY} Q ${midX} ${startY}, ${midX} ${(startY + endY) / 2} T ${endX} ${endY}`}
              />
            </motion.circle>
          </g>
        );
      });
    });
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

                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Plus className="w-4 h-4 mr-1" />
                  New Workflow
                </Button>
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
                        </div>

                        <div className="flex items-center justify-between">
                          <Badge
                            variant={workflow.status === 'active' ? 'default' : 'secondary'}
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
                              <Network className="w-3 h-3" />
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
            {/* Left Panel with Icons and Names */}
            <AnimatePresence>
              {isLeftPanelOpen && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 200, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  className="border-r border-border bg-card/30"
                >
                  <ScrollArea className="h-full">
                    <div className="p-3 space-y-4">
                      {/* Integrations */}
                      <div className="space-y-2">
                        <h4 className="text-xs font-semibold text-muted-foreground px-2">INTEGRATIONS</h4>
                        {moduleCategories.integrations.map((module) => {
                          const Icon = module.icon;
                          return (
                            <button
                              key={module.id}
                              draggable
                              onDragStart={(e) => handleDragStart(e, module)}
                              className="w-full p-2 rounded-lg hover:bg-accent transition-colors flex items-center space-x-2"
                            >
                              <Icon className={`w-4 h-4 ${module.color}`} />
                              <span className="text-sm">{module.name}</span>
                            </button>
                          );
                        })}</div>

                      <div className="border-t border-border" />

                      {/* AI Agents */}
                      <div className="space-y-2">
                        <h4 className="text-xs font-semibold text-muted-foreground px-2 flex items-center">
                          <Brain className="w-3 h-3 mr-1" />
                          AI AGENTS
                        </h4>
                        {moduleCategories.agents.map((module) => {
                          const Icon = module.icon;
                          return (
                            <button
                              key={module.id}
                              draggable
                              onDragStart={(e) => handleDragStart(e, module)}
                              className="w-full p-2 rounded-lg hover:bg-accent transition-colors flex items-center space-x-2"
                            >
                              <Icon className={`w-4 h-4 ${module.color}`} />
                              <span className="text-sm">{module.name}</span>
                            </button>
                          );
                        })}
                      </div>

                      <div className="border-t border-border" />

                      {/* Logic */}
                      <div className="space-y-2">
                        <h4 className="text-xs font-semibold text-muted-foreground px-2">LOGIC</h4>
                        {moduleCategories.logic.map((module) => {
                          const Icon = module.icon;
                          return (
                            <button
                              key={module.id}
                              draggable
                              onDragStart={(e) => handleDragStart(e, module)}
                              className="w-full p-2 rounded-lg hover:bg-accent transition-colors flex items-center space-x-2"
                            >
                              <Icon className={`w-4 h-4 ${module.color}`} />
                              <span className="text-sm">{module.name}</span>
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
                className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30 dark:from-blue-950/10 dark:via-transparent dark:to-purple-950/10 overflow-auto"
              >
                {/* Grid Background */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]" />

                {/* SVG Layer for Connections */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                    <marker
                      id="arrowhead"
                      markerWidth="10"
                      markerHeight="10"
                      refX="9"
                      refY="3"
                      orient="auto"
                    >
                      <polygon points="0 0, 10 3, 0 6" fill="#3b82f6" />
                    </marker>
                  </defs>
                  {renderConnections()}
                </svg>

                {/* Nodes */}
                <div className="relative" style={{ zIndex: 2, minWidth: '1200px', minHeight: '800px' }}>
                  {nodes.map((node) => {
                    const module = [...moduleCategories.integrations, ...moduleCategories.agents, ...moduleCategories.logic].find(
                      (m) => m.id === node.type
                    );
                    const Icon = module?.icon || Boxes;
                    const color = module?.color || 'text-gray-500';
                    const isAI = node.type.startsWith('ai-');

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
                        onClick={() => handleNodeClick(node.id)}
                        className={`bg-card border-2 rounded-lg p-3 shadow-lg cursor-pointer hover:shadow-xl transition-all ${
                          selectedNode === node.id ? 'border-primary' : 'border-border'
                        }`}
                      >
                        <div className="flex items-center space-x-2" style={{ width: '150px' }}>
                          <div className="relative">
                            <Icon className={`w-5 h-5 ${color}`} />
                            {isAI && (
                              <Sparkles className="w-3 h-3 text-purple-500 absolute -top-1 -right-1" />
                            )}
                          </div>
                          <span className="text-sm font-medium flex-1 truncate">{node.name}</span>
                        </div>
                        
                        {/* Connection points */}
                        <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full border-2 border-background cursor-pointer hover:scale-125 transition-transform" />
                        <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-green-500 rounded-full border-2 border-background cursor-pointer hover:scale-125 transition-transform" />
                        
                        {/* Node status indicator */}
                        <div className="absolute -top-1 -right-1">
                          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

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
                    </div>
                  </div>
                )}
              </div>

              {/* Toggle Left Panel */}
              <button
                onClick={() => setIsLeftPanelOpen(!isLeftPanelOpen)}
                className="absolute left-2 top-2 p-2 bg-card border border-border rounded-lg shadow-lg hover:shadow-xl transition-shadow z-10"
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