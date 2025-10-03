import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search,
  Database,
  AlertTriangle,
  Workflow,
  BarChart3,
  ChevronLeft,
  Plus,
  Filter,
  Settings,
  Download,
  Share2,
  Sparkles,
  TrendingUp,
  TrendingDown,
  Activity,
  Shield,
  Users,
  Cloud,
  Server,
  CheckCircle,
  XCircle,
  Clock,
  ArrowUpRight,
  Eye,
  Send,
  Loader2,
  Info,
  GitBranch,
  Play,
  Pause
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { toast } from 'sonner@2.0.3';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Area,
  AreaChart 
} from 'recharts';

interface WorkspaceRedesignedProps {
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

// Mock datasets
const mockDatasets = [
  {
    id: 'ds1',
    name: 'Azure AD Sign-ins',
    type: 'Identity',
    records: 125000,
    lastUpdated: '5 min ago',
    status: 'active',
    icon: Users
  },
  {
    id: 'ds2',
    name: 'AWS CloudTrail',
    type: 'Cloud',
    records: 450000,
    lastUpdated: '2 min ago',
    status: 'active',
    icon: Cloud
  },
  {
    id: 'ds3',
    name: 'CrowdStrike EDR',
    type: 'Endpoint',
    records: 89000,
    lastUpdated: '10 min ago',
    status: 'active',
    icon: Shield
  },
  {
    id: 'ds4',
    name: 'Splunk SIEM',
    type: 'SIEM',
    records: 2100000,
    lastUpdated: '1 min ago',
    status: 'active',
    icon: Server
  }
];

// Mock alerts data
const mockAlerts = [
  {
    id: 'a1',
    title: 'Suspicious Login from Unusual Location',
    description: 'User account accessed from IP in Russia, outside normal geolocation pattern',
    severity: 'critical',
    dataset: 'Azure AD Sign-ins',
    timestamp: '2 minutes ago',
    status: 'open'
  },
  {
    id: 'a2',
    title: 'Multiple Failed Authentication Attempts',
    description: '15 failed login attempts detected for admin account in last 5 minutes',
    severity: 'high',
    dataset: 'Azure AD Sign-ins',
    timestamp: '5 minutes ago',
    status: 'investigating'
  },
  {
    id: 'a3',
    title: 'Unusual Data Exfiltration Pattern',
    description: 'Large volume of data transferred to external S3 bucket outside business hours',
    severity: 'critical',
    dataset: 'AWS CloudTrail',
    timestamp: '8 minutes ago',
    status: 'open'
  },
  {
    id: 'a4',
    title: 'Privilege Escalation Attempt',
    description: 'Standard user attempting to execute commands with elevated privileges',
    severity: 'high',
    dataset: 'CrowdStrike EDR',
    timestamp: '12 minutes ago',
    status: 'resolved'
  },
  {
    id: 'a5',
    title: 'Malware Signature Detected',
    description: 'Known malware hash detected on endpoint DESKTOP-WIN10-42',
    severity: 'medium',
    dataset: 'CrowdStrike EDR',
    timestamp: '15 minutes ago',
    status: 'resolved'
  }
];

// Mock analytics data
const securityEventsData = [
  { date: 'Mon', events: 4200, threats: 12 },
  { date: 'Tue', events: 3800, threats: 8 },
  { date: 'Wed', events: 5100, threats: 15 },
  { date: 'Thu', events: 4700, threats: 10 },
  { date: 'Fri', events: 5500, threats: 18 },
  { date: 'Sat', events: 2900, threats: 5 },
  { date: 'Sun', events: 3200, threats: 7 }
];

const threatDistribution = [
  { name: 'Unauthorized Access', value: 35, color: '#ef4444' },
  { name: 'Malware', value: 25, color: '#f59e0b' },
  { name: 'Phishing', value: 20, color: '#eab308' },
  { name: 'Data Exfiltration', value: 15, color: '#8b5cf6' },
  { name: 'Other', value: 5, color: '#6b7280' }
];

const assetsByType = [
  { type: 'Users', count: 1250 },
  { type: 'Devices', count: 890 },
  { type: 'Applications', count: 145 },
  { type: 'Cloud Resources', count: 2340 }
];

export function WorkspaceRedesigned({ workspace, user, onClose, onNavigateToDashboard }: WorkspaceRedesignedProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any>(null);
  const [selectedDatasets, setSelectedDatasets] = useState<string[]>([]);
  const [queryHistory, setQueryHistory] = useState<Array<{query: string; response: any; timestamp: string}>>([]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast.error('Please enter a search query');
      return;
    }

    setIsSearching(true);
    
    // Simulate AI search
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const response = {
      summary: `Found 127 security events matching your query across ${selectedDatasets.length || 'all'} datasets.`,
      insights: [
        'Detected unusual access pattern from 3 IP addresses',
        'Average authentication success rate: 94.2%',
        'Peak activity observed between 2-4 PM EST'
      ],
      recommendations: [
        'Review failed login attempts for user accounts ending in @contractor.com',
        'Consider implementing geo-fencing for critical admin accounts',
        'Enable MFA for all users with elevated privileges'
      ],
      data: [
        { timestamp: '2024-01-15 14:23:45', user: 'john.doe@company.com', ip: '192.168.1.100', event: 'Failed Login', severity: 'Medium' },
        { timestamp: '2024-01-15 14:25:12', user: 'sarah.smith@company.com', ip: '10.0.0.45', event: 'Successful Login', severity: 'Low' },
        { timestamp: '2024-01-15 14:27:33', user: 'admin@company.com', ip: '203.0.113.5', event: 'Failed Login', severity: 'High' },
        { timestamp: '2024-01-15 14:30:18', user: 'mike.jones@company.com', ip: '192.168.1.105', event: 'Password Reset', severity: 'Medium' },
        { timestamp: '2024-01-15 14:32:45', user: 'admin@company.com', ip: '203.0.113.5', event: 'Failed Login', severity: 'Critical' },
      ]
    };
    
    setSearchResults(response);
    
    // Add to history
    setQueryHistory(prev => [{
      query: searchQuery,
      response,
      timestamp: new Date().toLocaleTimeString()
    }, ...prev]);
    
    setIsSearching(false);
    toast.success('Search completed');
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800';
      case 'high': return 'bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800';
      case 'medium': return 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800';
      case 'low': return 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800';
      default: return 'bg-gray-500/10 text-gray-700 dark:text-gray-400 border-gray-200 dark:border-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open': return <AlertTriangle className="w-4 h-4" />;
      case 'investigating': return <Eye className="w-4 h-4" />;
      case 'resolved': return <CheckCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-md px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClose}
              className="p-2"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-xl font-semibold">{workspace.name}</h1>
              <p className="text-sm text-muted-foreground">
                {mockDatasets.length} datasets connected • Last updated 1 min ago
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button variant="ghost" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <div className="border-b border-border bg-card/30 px-6">
          <TabsList className="bg-transparent border-b-0 h-auto p-0">
            <TabsTrigger 
              value="overview" 
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none bg-transparent px-6 py-3"
            >
              <Search className="w-4 h-4 mr-2" />
              Overview (Natural Language Search)
            </TabsTrigger>
            <TabsTrigger 
              value="canvas"
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none bg-transparent px-6 py-3"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Canvas (Analytics & Reports)
            </TabsTrigger>
            <TabsTrigger 
              value="alerts"
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none bg-transparent px-6 py-3"
            >
              <AlertTriangle className="w-4 h-4 mr-2" />
              Alerts ({mockAlerts.filter(a => a.status !== 'resolved').length})
            </TabsTrigger>
            <TabsTrigger 
              value="workflows"
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none bg-transparent px-6 py-3"
            >
              <Workflow className="w-4 h-4 mr-2" />
              Workflows
            </TabsTrigger>
            <TabsTrigger 
              value="datasets"
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none bg-transparent px-6 py-3"
            >
              <Database className="w-4 h-4 mr-2" />
              Datasets ({mockDatasets.length})
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Overview Tab - Natural Language Search */}
        <TabsContent value="overview" className="flex-1 m-0 overflow-hidden">
          <div className="h-full flex">{searchResults ? (
              /* Split Screen View */
              <div className="flex-1 grid grid-cols-2 gap-4 p-6">
                {/* Left Side - Query */}
                <Card className="p-6 flex flex-col h-full overflow-hidden">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold flex items-center">
                      <Search className="w-5 h-5 mr-2 text-blue-500" />
                      Your Query
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSearchResults(null)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="space-y-4 flex-1 overflow-auto">
                    {/* Current Query */}
                    <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border-2 border-blue-200 dark:border-blue-800 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Query submitted at {queryHistory[0]?.timestamp}</p>
                      <p className="font-medium">{queryHistory[0]?.query}</p>
                      
                      {selectedDatasets.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          <span className="text-xs text-muted-foreground">Searched in:</span>
                          {selectedDatasets.map(dsId => {
                            const ds = mockDatasets.find(d => d.id === dsId);
                            return (
                              <Badge key={dsId} variant="secondary" className="text-xs">
                                {ds?.name}
                              </Badge>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* Query History */}
                    {queryHistory.length > 1 && (
                      <div>
                        <h4 className="text-sm font-medium mb-2">Recent Queries</h4>
                        <div className="space-y-2">
                          {queryHistory.slice(1, 5).map((item, i) => (
                            <button
                              key={i}
                              onClick={() => {
                                setSearchQuery(item.query);
                                setSearchResults(item.response);
                              }}
                              className="w-full p-3 text-left border border-border rounded-lg hover:border-primary/50 transition-all text-sm"
                            >
                              <p className="text-xs text-muted-foreground mb-1">{item.timestamp}</p>
                              <p className="line-clamp-2">{item.query}</p>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* New Query Button */}
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        setSearchResults(null);
                        setSearchQuery('');
                      }}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      New Query
                    </Button>
                  </div>
                </Card>

                {/* Right Side - Response */}
                <Card className="p-6 flex flex-col h-full overflow-hidden">
                  <h3 className="font-semibold mb-4 flex items-center">
                    <Sparkles className="w-5 h-5 mr-2 text-purple-500" />
                    AI Response
                  </h3>
                  
                  <ScrollArea className="flex-1">
                    <div className="space-y-4 pr-4">
                      {/* Summary */}
                      <div className="p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-green-900 dark:text-green-100 mb-1">
                              Summary
                            </h4>
                            <p className="text-sm text-green-800 dark:text-green-200">
                              {searchResults.summary}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Key Insights */}
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center">
                          <TrendingUp className="w-4 h-4 mr-2 text-blue-500" />
                          Key Insights
                        </h4>
                        <ul className="space-y-2">
                          {searchResults.insights.map((insight: string, i: number) => (
                            <li key={i} className="flex items-start space-x-2 p-3 bg-muted/50 rounded-lg">
                              <ArrowUpRight className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{insight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Data Table */}
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center">
                          <Database className="w-4 h-4 mr-2 text-purple-500" />
                          Sample Data ({searchResults.data?.length} of 127 results)
                        </h4>
                        <div className="border rounded-lg overflow-hidden">
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                              <thead className="bg-muted">
                                <tr>
                                  <th className="px-3 py-2 text-left font-medium">Timestamp</th>
                                  <th className="px-3 py-2 text-left font-medium">User</th>
                                  <th className="px-3 py-2 text-left font-medium">Event</th>
                                  <th className="px-3 py-2 text-left font-medium">Severity</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-border">
                                {searchResults.data?.map((row: any, i: number) => (
                                  <tr key={i} className="hover:bg-muted/50">
                                    <td className="px-3 py-2 text-xs font-mono">{row.timestamp}</td>
                                    <td className="px-3 py-2 text-xs">{row.user}</td>
                                    <td className="px-3 py-2 text-xs">{row.event}</td>
                                    <td className="px-3 py-2">
                                      <Badge 
                                        variant="outline" 
                                        className={getSeverityColor(row.severity.toLowerCase())}
                                      >
                                        {row.severity}
                                      </Badge>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="w-full mt-2">
                          <Download className="w-3 h-3 mr-2" />
                          Download Full Results (127 rows)
                        </Button>
                      </div>

                      {/* AI Recommendations */}
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center">
                          <Sparkles className="w-4 h-4 mr-2 text-purple-500" />
                          AI Recommendations
                        </h4>
                        <ul className="space-y-2">
                          {searchResults.recommendations.map((rec: string, i: number) => (
                            <li key={i} className="flex items-start space-x-2 p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                              <Info className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 pt-4 border-t">
                        <Button variant="outline" className="flex-1">
                          <Share2 className="w-4 h-4 mr-2" />
                          Share Results
                        </Button>
                        <Button variant="outline" className="flex-1">
                          <Download className="w-4 h-4 mr-2" />
                          Export Report
                        </Button>
                      </div>
                    </div>
                  </ScrollArea>
                </Card>
              </div>
            ) : (
              /* Search Interface */
              <ScrollArea className="flex-1">
            <div className="p-6 space-y-6">
              {/* Search Interface */}
              <Card className="p-6 border-2 border-primary/20">
                <div className="flex items-start space-x-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">AI-Powered Security Search</h3>
                    <p className="text-sm text-muted-foreground">
                      Ask questions in natural language about your security data
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="relative">
                    <Input
                      placeholder="e.g., Show me all failed login attempts from external IPs in the last 24 hours..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                      className="pr-12 h-12"
                    />
                    <Button
                      size="sm"
                      onClick={handleSearch}
                      disabled={isSearching}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-600 to-purple-600"
                    >
                      {isSearching ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                    </Button>
                  </div>

                  {/* Dataset Selector */}
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">Search in:</span>
                    <div className="flex flex-wrap gap-2">
                      <Badge
                        variant={selectedDatasets.length === 0 ? 'default' : 'outline'}
                        className="cursor-pointer"
                        onClick={() => setSelectedDatasets([])}
                      >
                        All Datasets
                      </Badge>
                      {mockDatasets.map((ds) => (
                        <Badge
                          key={ds.id}
                          variant={selectedDatasets.includes(ds.id) ? 'default' : 'outline'}
                          className="cursor-pointer"
                          onClick={() => {
                            setSelectedDatasets(prev =>
                              prev.includes(ds.id)
                                ? prev.filter(id => id !== ds.id)
                                : [...prev, ds.id]
                            );
                          }}
                        >
                          {ds.name}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Example Queries */}
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Try asking:</p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        'Show authentication failures by user',
                        'What are the top threat indicators this week?',
                        'List all admin privilege escalations',
                        'Find unusual data access patterns'
                      ].map((example, i) => (
                        <Button
                          key={i}
                          variant="outline"
                          size="sm"
                          onClick={() => setSearchQuery(example)}
                          className="text-xs"
                        >
                          {example}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

            </div>
          </ScrollArea>
            )}
          </div>
        </TabsContent>

        {/* Canvas Tab - Analytics & Reports */}
        <TabsContent value="canvas" className="flex-1 m-0">
          <ScrollArea className="h-full">
            <div className="p-6 space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-muted-foreground">Total Events</p>
                    <Activity className="w-4 h-4 text-blue-500" />
                  </div>
                  <p className="text-2xl font-bold">32,457</p>
                  <p className="text-xs text-green-600 dark:text-green-400 flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +12.5% from last week
                  </p>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-muted-foreground">Active Threats</p>
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                  </div>
                  <p className="text-2xl font-bold">18</p>
                  <p className="text-xs text-red-600 dark:text-red-400 flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +3 from yesterday
                  </p>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-muted-foreground">Assets Monitored</p>
                    <Shield className="w-4 h-4 text-green-500" />
                  </div>
                  <p className="text-2xl font-bold">4,625</p>
                  <p className="text-xs text-green-600 dark:text-green-400 flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +145 new this month
                  </p>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-muted-foreground">Avg Response Time</p>
                    <Clock className="w-4 h-4 text-purple-500" />
                  </div>
                  <p className="text-2xl font-bold">4.2m</p>
                  <p className="text-xs text-green-600 dark:text-green-400 flex items-center mt-1">
                    <TrendingDown className="w-3 h-3 mr-1" />
                    -15% improvement
                  </p>
                </Card>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="font-semibold mb-4">Security Events Trend</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <AreaChart data={securityEventsData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="date" className="text-xs" />
                      <YAxis className="text-xs" />
                      <Tooltip />
                      <Legend />
                      <Area 
                        type="monotone" 
                        dataKey="events" 
                        stroke="#3b82f6" 
                        fill="#3b82f6" 
                        fillOpacity={0.2}
                        name="Total Events"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="threats" 
                        stroke="#ef4444" 
                        fill="#ef4444" 
                        fillOpacity={0.2}
                        name="Threats Detected"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </Card>

                <Card className="p-6">
                  <h3 className="font-semibold mb-4">Threat Distribution</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={threatDistribution}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label
                      >
                        {threatDistribution.map((entry, index) => (
                          <Cell key={index} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </Card>

                <Card className="p-6">
                  <h3 className="font-semibold mb-4">Assets by Type</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={assetsByType}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="type" className="text-xs" />
                      <YAxis className="text-xs" />
                      <Tooltip />
                      <Bar dataKey="count" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </Card>

                <Card className="p-6">
                  <h3 className="font-semibold mb-4">Top Security Events</h3>
                  <div className="space-y-3">
                    {[
                      { event: 'Failed Authentication', count: 1247, change: '+23%' },
                      { event: 'Privilege Escalation', count: 342, change: '+8%' },
                      { event: 'Data Access', count: 2156, change: '-5%' },
                      { event: 'Configuration Change', count: 89, change: '+45%' },
                      { event: 'Network Anomaly', count: 456, change: '+12%' }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                        <span className="text-sm">{item.event}</span>
                        <div className="flex items-center space-x-3">
                          <span className="font-semibold">{item.count}</span>
                          <span className={`text-xs ${
                            item.change.startsWith('+') ? 'text-red-600' : 'text-green-600'
                          }`}>
                            {item.change}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </ScrollArea>
        </TabsContent>

        {/* Alerts Tab */}
        <TabsContent value="alerts" className="flex-1 m-0">
          <ScrollArea className="h-full">
            <div className="p-6 space-y-4">
              {/* Filters */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                  <Badge variant="outline">All ({mockAlerts.length})</Badge>
                  <Badge variant="outline" className="bg-red-500/10 text-red-700 dark:text-red-400">
                    Critical ({mockAlerts.filter(a => a.severity === 'critical').length})
                  </Badge>
                  <Badge variant="outline">
                    Open ({mockAlerts.filter(a => a.status === 'open').length})
                  </Badge>
                </div>
                <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Alert Rule
                </Button>
              </div>

              {/* Alerts List */}
              <div className="space-y-3">
                {mockAlerts.map((alert) => (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.01 }}
                  >
                    <Card className="p-5 border-2 hover:border-primary/50 transition-all cursor-pointer">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <Badge 
                              variant="outline" 
                              className={getSeverityColor(alert.severity)}
                            >
                              {alert.severity.toUpperCase()}
                            </Badge>
                            <Badge variant="secondary" className="flex items-center space-x-1">
                              {getStatusIcon(alert.status)}
                              <span>{alert.status}</span>
                            </Badge>
                            <span className="text-xs text-muted-foreground">{alert.timestamp}</span>
                          </div>
                          
                          <h4 className="font-semibold mb-1">{alert.title}</h4>
                          <p className="text-sm text-muted-foreground mb-3">{alert.description}</p>
                          
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                            <span className="flex items-center">
                              <Database className="w-3 h-3 mr-1" />
                              {alert.dataset}
                            </span>
                          </div>
                        </div>
                        
                        <Button variant="ghost" size="sm">
                          <ArrowUpRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollArea>
        </TabsContent>

        {/* Workflows Tab */}
        <TabsContent value="workflows" className="flex-1 m-0">
          <ScrollArea className="h-full">
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold">Security Workflows</h3>
                  <p className="text-sm text-muted-foreground">
                    Automate security operations with visual workflow builder
                  </p>
                </div>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Workflow
                </Button>
              </div>

              {/* Workflow Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    name: 'Incident Response Automation',
                    description: 'Automatically investigate and respond to security incidents',
                    status: 'active',
                    triggers: 'Critical alerts',
                    actions: 5,
                    runs: 142
                  },
                  {
                    name: 'User Provisioning & Deprovisioning',
                    description: 'Manage user lifecycle across all connected systems',
                    status: 'active',
                    triggers: 'HR system events',
                    actions: 8,
                    runs: 89
                  },
                  {
                    name: 'Threat Intelligence Enrichment',
                    description: 'Enrich alerts with threat intelligence from multiple sources',
                    status: 'paused',
                    triggers: 'New IOCs detected',
                    actions: 3,
                    runs: 256
                  },
                  {
                    name: 'Compliance Audit Workflow',
                    description: 'Automated compliance checks and reporting',
                    status: 'active',
                    triggers: 'Daily schedule',
                    actions: 6,
                    runs: 34
                  }
                ].map((workflow, i) => (
                  <Card key={i} className="p-6 hover:border-primary/50 transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">{workflow.name}</h4>
                        <p className="text-sm text-muted-foreground">{workflow.description}</p>
                      </div>
                      <Badge 
                        variant={workflow.status === 'active' ? 'default' : 'secondary'}
                        className="ml-2"
                      >
                        {workflow.status === 'active' ? (
                          <Play className="w-3 h-3 mr-1" />
                        ) : (
                          <Pause className="w-3 h-3 mr-1" />
                        )}
                        {workflow.status}
                      </Badge>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Triggers:</span>
                        <span className="font-medium">{workflow.triggers}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Actions:</span>
                        <span className="font-medium">{workflow.actions} steps</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Total Runs:</span>
                        <span className="font-medium">{workflow.runs}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <GitBranch className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Activity className="w-3 h-3 mr-1" />
                        View Runs
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </ScrollArea>
        </TabsContent>

        {/* Datasets Tab */}
        <TabsContent value="datasets" className="flex-1 m-0">
          <ScrollArea className="h-full">
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold">Connected Datasets</h3>
                  <p className="text-sm text-muted-foreground">
                    Data sources feeding into this workspace
                  </p>
                </div>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Dataset
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockDatasets.map((dataset) => {
                  const Icon = dataset.icon;
                  return (
                    <Card key={dataset.id} className="p-6 hover:border-primary/50 transition-all">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start space-x-3">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center flex-shrink-0">
                            <Icon className="w-6 h-6 text-blue-500" />
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1">{dataset.name}</h4>
                            <Badge variant="secondary" className="text-xs">
                              {dataset.type}
                            </Badge>
                          </div>
                        </div>
                        <Badge 
                          variant="outline"
                          className="bg-green-500/10 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800"
                        >
                          <Activity className="w-3 h-3 mr-1" />
                          {dataset.status}
                        </Badge>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Total Records:</span>
                          <span className="font-medium">{dataset.records.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Last Updated:</span>
                          <span className="font-medium">{dataset.lastUpdated}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Settings className="w-3 h-3 mr-1" />
                          Configure
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="w-3 h-3 mr-1" />
                          View Data
                        </Button>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}