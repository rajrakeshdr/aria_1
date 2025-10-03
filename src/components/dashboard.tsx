import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  ChevronRight, 
  Plus, 
  Workflow, 
  Database, 
  Bot, 
  Settings, 
  User,
  LogOut,
  Activity,
  Users,
  TrendingUp,
  Server,
  Building2,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  Lock,
  Eye,
  GitBranch,
  BarChart3,
  Moon,
  Sun,
  Grid3x3,
  Home,
  Sparkles,
  Brain
} from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from './ui/dropdown-menu';
import { ScrollArea } from './ui/scroll-area';
import { useTheme } from './theme-provider';

interface DashboardProps {
  user: {
    name: string;
    email: string;
    avatar?: string;
    role: 'admin' | 'user';
  };
  organization: {
    name: string;
    subdomain: string;
  };
  onLogout: () => void;
  onNavigateToModule: (module: string, data?: any) => void;
}

export function Dashboard({ user, organization, onLogout, onNavigateToModule }: DashboardProps) {
  const { theme, toggleTheme } = useTheme();

  const navigationModules = [
    { 
      id: 'environment-creation', 
      label: 'Environments', 
      icon: Server, 
      description: 'Set up security environments',
      color: 'from-blue-500 to-cyan-500',
      count: 3
    },
    { 
      id: 'workspace-canvas', 
      label: 'Workspaces', 
      icon: Grid3x3, 
      description: 'Collaborative analysis',
      color: 'from-purple-500 to-pink-500',
      count: 7
    },
    { 
      id: 'workflow-builder', 
      label: 'Workflows', 
      icon: GitBranch, 
      description: 'Automation builder',
      color: 'from-green-500 to-emerald-500',
      count: 12
    },
    { 
      id: 'connector-framework', 
      label: 'Connectors', 
      icon: Database, 
      description: 'Integration library',
      color: 'from-orange-500 to-red-500',
      count: 28
    },
    { 
      id: 'data', 
      label: 'Data Inventory', 
      icon: Database, 
      description: 'Security datasets',
      color: 'from-yellow-500 to-orange-500',
      count: 45
    },
    { 
      id: 'agents', 
      label: 'AI Agents', 
      icon: Brain, 
      description: 'Smart automation',
      color: 'from-violet-500 to-purple-500',
      count: 8
    },
  ];

  const securityMetrics = [
    { 
      title: 'Threat Level', 
      value: 'Medium', 
      icon: Shield,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10',
      trend: '↓ 12% from last week',
      trendColor: 'text-green-500'
    },
    { 
      title: 'Active Incidents', 
      value: '3', 
      icon: AlertTriangle,
      color: 'text-red-500',
      bgColor: 'bg-red-500/10',
      trend: '2 resolved today',
      trendColor: 'text-green-500'
    },
    { 
      title: 'System Health', 
      value: '98%', 
      icon: Activity,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      trend: 'All systems operational',
      trendColor: 'text-green-500'
    },
    { 
      title: 'Data Processed', 
      value: '2.4TB', 
      icon: Database,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      trend: '+18% this month',
      trendColor: 'text-blue-500'
    },
  ];

  const recentActivity = [
    { 
      action: 'Created workspace "Threat Analysis"', 
      user: 'Sarah Chen', 
      time: '2 hours ago',
      icon: Grid3x3,
      color: 'text-purple-500'
    },
    { 
      action: 'Deployed security workflow', 
      user: 'Mike Rodriguez', 
      time: '4 hours ago',
      icon: GitBranch,
      color: 'text-green-500'
    },
    { 
      action: 'Connected Splunk integration', 
      user: 'Alex Johnson', 
      time: '1 day ago',
      icon: Database,
      color: 'text-orange-500'
    },
    { 
      action: 'Environment "Production" updated', 
      user: 'You', 
      time: '2 days ago',
      icon: Server,
      color: 'text-blue-500'
    },
  ];

  const upcomingTasks = [
    { task: 'Review security alerts', priority: 'high', due: 'Today' },
    { task: 'Update compliance report', priority: 'medium', due: 'Tomorrow' },
    { task: 'Team sync meeting', priority: 'low', due: 'Friday' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-[#0a0e1a] dark:via-[#0f1419] dark:to-[#0a0e1a]">
      {/* Cyber Grid Background */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

      {/* Header */}
      <div className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-xl">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="font-semibold">{organization.name}</h1>
                  <p className="text-xs text-muted-foreground">{user.role === 'admin' ? 'Administrator' : 'User'}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="rounded-lg"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="space-x-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <span className="hidden md:inline text-sm">{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  {user.role === 'admin' && (
                    <DropdownMenuItem onClick={() => onNavigateToModule('admin-panel')}>
                      <Shield className="w-4 h-4 mr-2" />
                      Admin Panel
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onLogout} className="text-red-600 dark:text-red-400">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative">
        <ScrollArea className="h-[calc(100vh-80px)]">
          <div className="p-6 space-y-6 max-w-7xl mx-auto">
            {/* Welcome Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-2"
            >
              <h2 className="text-3xl font-bold">Welcome back, {user.name.split(' ')[0]} 👋</h2>
              <p className="text-muted-foreground">Here's what's happening with your security platform today</p>
            </motion.div>

            {/* Security Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {securityMetrics.map((metric, i) => {
                  const Icon = metric.icon;
                  return (
                    <motion.div
                      key={i}
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg">
                        <div className="p-5 space-y-3">
                          <div className="flex items-center justify-between">
                            <div className={`w-12 h-12 ${metric.bgColor} rounded-xl flex items-center justify-center`}>
                              <Icon className={`w-6 h-6 ${metric.color}`} />
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">{metric.title}</p>
                            <p className="text-2xl font-bold">{metric.value}</p>
                          </div>
                          <p className={`text-xs ${metric.trendColor}`}>{metric.trend}</p>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Quick Access Modules */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-lg font-semibold mb-4">Quick Access</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {navigationModules.map((module, i) => {
                  const Icon = module.icon;
                  return (
                    <motion.div
                      key={module.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + i * 0.05 }}
                      whileHover={{ y: -4 }}
                    >
                      <button
                        onClick={() => onNavigateToModule(module.id)}
                        className="w-full text-left"
                      >
                        <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-xl group">
                          <div className="p-5 space-y-4">
                            <div className="flex items-center justify-between">
                              <div className={`w-12 h-12 bg-gradient-to-br ${module.color} rounded-xl flex items-center justify-center relative`}>
                                <Icon className="w-6 h-6 text-white" />
                                {module.id === 'agents' && (
                                  <Sparkles className="w-3 h-3 text-yellow-300 absolute -top-1 -right-1" />
                                )}
                              </div>
                              {module.count && (
                                <Badge variant="secondary" className="font-semibold">
                                  {module.count}
                                </Badge>
                              )}
                            </div>
                            <div>
                              <h4 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                                {module.label}
                              </h4>
                              <p className="text-sm text-muted-foreground">{module.description}</p>
                            </div>
                            <div className="flex items-center text-sm text-primary">
                              <span>Open</span>
                              <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </Card>
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Workspaces Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="space-y-6"
            >
              {/* My Workspaces */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold flex items-center">
                    <Grid3x3 className="w-5 h-5 mr-2 text-purple-500" />
                    My Workspaces
                  </h3>
                  <Button size="sm" onClick={() => onNavigateToModule('workspace-canvas')}>
                    <Plus className="w-4 h-4 mr-2" />
                    New Workspace
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { 
                      name: 'Security Analysis Workspace',
                      description: 'Threat hunting and incident investigation',
                      datasets: 4,
                      lastAccessed: '5 min ago',
                      owner: 'You',
                      color: 'from-blue-500 to-cyan-500'
                    },
                    { 
                      name: 'Compliance Monitoring',
                      description: 'Audit logs and compliance reports',
                      datasets: 3,
                      lastAccessed: '2 hours ago',
                      owner: 'You',
                      color: 'from-green-500 to-emerald-500'
                    },
                    { 
                      name: 'Cloud Security Posture',
                      description: 'AWS and Azure security configuration',
                      datasets: 5,
                      lastAccessed: '1 day ago',
                      owner: 'You',
                      color: 'from-orange-500 to-red-500'
                    }
                  ].map((workspace, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <button
                        onClick={() => onNavigateToModule('workspace-canvas', { workspace })}
                        className="w-full text-left"
                      >
                        <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg group">
                          <div className="p-5 space-y-3">
                            <div className={`w-full h-2 bg-gradient-to-r ${workspace.color} rounded-full`} />
                            <div>
                              <h4 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                                {workspace.name}
                              </h4>
                              <p className="text-sm text-muted-foreground mb-2">
                                {workspace.description}
                              </p>
                            </div>
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <span className="flex items-center">
                                <Database className="w-3 h-3 mr-1" />
                                {workspace.datasets} datasets
                              </span>
                              <span className="flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                {workspace.lastAccessed}
                              </span>
                            </div>
                          </div>
                        </Card>
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Shared with Me */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold flex items-center">
                    <Users className="w-5 h-5 mr-2 text-blue-500" />
                    Shared with Me
                  </h3>
                  <Button variant="ghost" size="sm">View All</Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { 
                      name: 'Incident Response Q1 2024',
                      description: 'Shared incident analysis and remediation',
                      datasets: 6,
                      sharedBy: 'Sarah Chen',
                      sharedByAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop&crop=face',
                      lastModified: '30 min ago',
                      permissions: 'Can edit',
                      color: 'from-purple-500 to-pink-500'
                    },
                    { 
                      name: 'Vulnerability Assessment',
                      description: 'Network and endpoint vulnerability scan results',
                      datasets: 8,
                      sharedBy: 'Mike Rodriguez',
                      sharedByAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
                      lastModified: '3 hours ago',
                      permissions: 'View only',
                      color: 'from-yellow-500 to-orange-500'
                    },
                    { 
                      name: 'SOC Team Workspace',
                      description: 'Daily security operations and monitoring',
                      datasets: 12,
                      sharedBy: 'Alex Johnson',
                      sharedByAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
                      lastModified: '1 day ago',
                      permissions: 'Can edit',
                      color: 'from-red-500 to-pink-500'
                    }
                  ].map((workspace, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <button
                        onClick={() => onNavigateToModule('workspace-canvas', { workspace })}
                        className="w-full text-left"
                      >
                        <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg group">
                          <div className="p-5 space-y-3">
                            <div className={`w-full h-2 bg-gradient-to-r ${workspace.color} rounded-full`} />
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h4 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                                  {workspace.name}
                                </h4>
                                <p className="text-sm text-muted-foreground mb-2">
                                  {workspace.description}
                                </p>
                              </div>
                              <Badge 
                                variant="secondary" 
                                className={workspace.permissions === 'Can edit' ? 'bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400' : 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400'}
                              >
                                {workspace.permissions}
                              </Badge>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Avatar className="w-6 h-6">
                                <AvatarImage src={workspace.sharedByAvatar} />
                                <AvatarFallback>{workspace.sharedBy.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <span className="text-xs text-muted-foreground">
                                Shared by {workspace.sharedBy}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <span className="flex items-center">
                                <Database className="w-3 h-3 mr-1" />
                                {workspace.datasets} datasets
                              </span>
                              <span className="flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                {workspace.lastModified}
                              </span>
                            </div>
                          </div>
                        </Card>
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Recent Activity & Upcoming Tasks */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="border-2">
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">Recent Activity</h3>
                      <Button variant="ghost" size="sm">View All</Button>
                    </div>
                    <div className="space-y-3">
                      {recentActivity.map((activity, i) => {
                        const Icon = activity.icon;
                        return (
                          <div
                            key={i}
                            className="flex items-start space-x-3 p-3 rounded-lg hover:bg-accent/50 transition-colors"
                          >
                            <div className={`w-8 h-8 bg-muted rounded-lg flex items-center justify-center flex-shrink-0`}>
                              <Icon className={`w-4 h-4 ${activity.color}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm">{activity.action}</p>
                              <p className="text-xs text-muted-foreground">{activity.user} • {activity.time}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Upcoming Tasks */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="border-2">
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">Upcoming Tasks</h3>
                      <Button variant="ghost" size="sm">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="space-y-3">
                      {upcomingTasks.map((task, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/50 transition-colors"
                        >
                          <div className="flex items-center space-x-3">
                            <input
                              type="checkbox"
                              className="w-4 h-4 rounded border-muted-foreground/30"
                            />
                            <div>
                              <p className="text-sm">{task.task}</p>
                              <p className="text-xs text-muted-foreground">Due: {task.due}</p>
                            </div>
                          </div>
                          <Badge
                            variant={
                              task.priority === 'high'
                                ? 'destructive'
                                : task.priority === 'medium'
                                ? 'default'
                                : 'secondary'
                            }
                            className={
                              task.priority === 'high'
                                ? 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800'
                                : task.priority === 'medium'
                                ? 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800'
                                : ''
                            }
                          >
                            {task.priority}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>

            {/* Admin Quick Stats (only for admins) */}
            {user.role === 'admin' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Card className="border-2 border-blue-200 dark:border-blue-800 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20">
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        <h3 className="font-semibold">Admin Overview</h3>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onNavigateToModule('admin-panel')}
                      >
                        Open Admin Panel
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="p-4 bg-background/80 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <Users className="w-4 h-4 text-blue-500" />
                          <p className="text-sm text-muted-foreground">Team Members</p>
                        </div>
                        <p className="text-2xl font-bold">24</p>
                      </div>
                      <div className="p-4 bg-background/80 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <Database className="w-4 h-4 text-green-500" />
                          <p className="text-sm text-muted-foreground">Integrations</p>
                        </div>
                        <p className="text-2xl font-bold">18</p>
                      </div>
                      <div className="p-4 bg-background/80 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <Activity className="w-4 h-4 text-purple-500" />
                          <p className="text-sm text-muted-foreground">API Calls (24h)</p>
                        </div>
                        <p className="text-2xl font-bold">142K</p>
                      </div>
                      <div className="p-4 bg-background/80 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <TrendingUp className="w-4 h-4 text-orange-500" />
                          <p className="text-sm text-muted-foreground">Success Rate</p>
                        </div>
                        <p className="text-2xl font-bold">99.8%</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}