import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  Database, 
  Building2, 
  FileText, 
  Settings, 
  DollarSign,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Pencil,
  Trash2,
  Shield,
  CheckCircle,
  XCircle,
  Clock,
  Download,
  Upload
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';

interface AdminPanelProps {
  organization: {
    name: string;
    subdomain: string;
  };
  onClose: () => void;
}

export function AdminPanel({ organization, onClose }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState('users');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isDatasetModalOpen, setIsDatasetModalOpen] = useState(false);

  // Mock data
  const users = [
    {
      id: 1,
      name: 'Sarah Chen',
      email: 'sarah.chen@company.com',
      role: 'Admin',
      status: 'Active',
      lastLogin: '2 hours ago',
      datasets: ['Financial Logs', 'Network Traffic'],
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 2,
      name: 'Michael Rodriguez',
      email: 'michael.r@company.com',
      role: 'Analyst',
      status: 'Active',
      lastLogin: '1 day ago',
      datasets: ['Security Events'],
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 3,
      name: 'Alex Johnson',
      email: 'alex.j@company.com',
      role: 'Viewer',
      status: 'Inactive',
      lastLogin: '1 week ago',
      datasets: [],
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    }
  ];

  const datasets = [
    {
      id: 1,
      name: 'Financial Logs',
      workspace: 'Production',
      owner: 'Sarah Chen',
      size: '2.4 GB',
      tags: ['PII', 'Critical'],
      status: 'Active',
      assignedUsers: 2
    },
    {
      id: 2,
      name: 'Network Traffic',
      workspace: 'Security',
      owner: 'Michael Rodriguez',
      size: '856 MB',
      tags: ['Network', 'Monitoring'],
      status: 'Active',
      assignedUsers: 3
    },
    {
      id: 3,
      name: 'Security Events',
      workspace: 'SOC',
      owner: 'Alex Johnson',
      size: '1.2 GB',
      tags: ['SIEM', 'Alerts'],
      status: 'Processing',
      assignedUsers: 1
    }
  ];

  const integrations = [
    {
      name: 'CrowdStrike Falcon',
      status: 'Connected',
      type: 'Endpoint Protection',
      lastSync: '5 min ago'
    },
    {
      name: 'Microsoft 365',
      status: 'Connected',
      type: 'Productivity Suite',
      lastSync: '1 hour ago'
    },
    {
      name: 'Splunk',
      status: 'Disconnected',
      type: 'SIEM',
      lastSync: '2 days ago'
    }
  ];

  const auditLogs = [
    {
      timestamp: '2025-01-27 14:30:00',
      user: 'Sarah Chen',
      action: 'Dataset assigned to user',
      details: 'Financial Logs assigned to Michael Rodriguez',
      severity: 'Info'
    },
    {
      timestamp: '2025-01-27 13:15:00',
      user: 'System',
      action: 'Environment created',
      details: 'Production environment created',
      severity: 'Info'
    },
    {
      timestamp: '2025-01-27 12:45:00',
      user: 'Michael Rodriguez',
      action: 'Failed login attempt',
      details: 'Invalid credentials',
      severity: 'Warning'
    }
  ];

  const availableDatasets = ['Financial Logs', 'Network Traffic', 'Security Events', 'Compliance Data', 'User Activity'];

  const handleDatasetAssignment = (userId: number) => {
    const user = users.find(u => u.id === userId);
    setSelectedUser(user);
    setIsDatasetModalOpen(true);
  };

  const StatusBadge = ({ status }: { status: string }) => {
    const colors = {
      'Active': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      'Inactive': 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
      'Connected': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      'Disconnected': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
      'Processing': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
    };

    return (
      <Badge className={colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'}>
        {status}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col">
        {/* Header */}
        <div className="border-b border-border bg-card/50 backdrop-blur-sm">
          <div className="flex items-center justify-between p-6">
            <div>
              <h1 className="text-2xl">Administrative Panel</h1>
              <p className="text-muted-foreground">{organization.name} Settings</p>
            </div>
            <Button variant="outline" onClick={onClose}>
              Back to Dashboard
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="integrations" className="flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <span>Integrations</span>
              </TabsTrigger>
              <TabsTrigger value="users" className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>Users</span>
              </TabsTrigger>
              <TabsTrigger value="organization" className="flex items-center space-x-2">
                <Building2 className="h-4 w-4" />
                <span>Organization</span>
              </TabsTrigger>
              <TabsTrigger value="datasets" className="flex items-center space-x-2">
                <Database className="h-4 w-4" />
                <span>Datasets</span>
              </TabsTrigger>
              <TabsTrigger value="logs" className="flex items-center space-x-2">
                <FileText className="h-4 w-4" />
                <span>Audit Logs</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center space-x-2">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </TabsTrigger>
            </TabsList>

            {/* Integrations Tab */}
            <TabsContent value="integrations" className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg">Integrations</h3>
                  <p className="text-sm text-muted-foreground">Manage third-party integrations</p>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Integration
                </Button>
              </div>

              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Integration</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Sync</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {integrations.map((integration, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{integration.name}</TableCell>
                          <TableCell>{integration.type}</TableCell>
                          <TableCell>
                            <StatusBadge status={integration.status} />
                          </TableCell>
                          <TableCell>{integration.lastSync}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem>
                                  <Pencil className="h-4 w-4 mr-2" />
                                  Configure
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Shield className="h-4 w-4 mr-2" />
                                  Test Connection
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Remove
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Users Tab */}
            <TabsContent value="users" className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg">User Management</h3>
                  <p className="text-sm text-muted-foreground">Manage users and their access</p>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Invite User
                </Button>
              </div>

              <div className="flex items-center space-x-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[120px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="analyst">Analyst</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Login</TableHead>
                        <TableHead>Datasets</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={user.avatar} />
                                <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{user.name}</p>
                                <p className="text-sm text-muted-foreground">{user.email}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{user.role}</Badge>
                          </TableCell>
                          <TableCell>
                            <StatusBadge status={user.status} />
                          </TableCell>
                          <TableCell>{user.lastLogin}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm">{user.datasets.length} assigned</span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDatasetAssignment(user.id)}
                              >
                                <Database className="h-3 w-3 mr-1" />
                                Manage
                              </Button>
                            </div>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem>
                                  <Pencil className="h-4 w-4 mr-2" />
                                  Edit User
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Shield className="h-4 w-4 mr-2" />
                                  Reset Password
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Remove User
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Organization Tab */}
            <TabsContent value="organization" className="space-y-6">
              <div>
                <h3 className="text-lg">Organization Details</h3>
                <p className="text-sm text-muted-foreground">Manage your organization settings</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Organization Name</Label>
                      <Input value={organization.name} className="mt-1" />
                    </div>
                    <div>
                      <Label>Subdomain</Label>
                      <div className="flex items-center mt-1">
                        <Input value={organization.subdomain} className="rounded-r-none" />
                        <div className="px-3 py-2 bg-muted border border-l-0 rounded-r-md text-sm">
                          .platform.com
                        </div>
                      </div>
                    </div>
                    <div>
                      <Label>Industry</Label>
                      <Select defaultValue="technology">
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technology">Technology</SelectItem>
                          <SelectItem value="finance">Financial Services</SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button>Save Changes</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Organization Statistics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Users:</span>
                      <span>12</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Environments:</span>
                      <span>3</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Datasets:</span>
                      <span>28</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Storage Used:</span>
                      <span>24.5 GB</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Datasets Tab */}
            <TabsContent value="datasets" className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg">Dataset Management</h3>
                  <p className="text-sm text-muted-foreground">Manage datasets and user access</p>
                </div>
                <Button>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Dataset
                </Button>
              </div>

              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Dataset</TableHead>
                        <TableHead>Workspace</TableHead>
                        <TableHead>Owner</TableHead>
                        <TableHead>Size</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Assigned Users</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {datasets.map((dataset) => (
                        <TableRow key={dataset.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{dataset.name}</p>
                              <div className="flex space-x-1 mt-1">
                                {dataset.tags.map(tag => (
                                  <Badge key={tag} variant="secondary" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{dataset.workspace}</TableCell>
                          <TableCell>{dataset.owner}</TableCell>
                          <TableCell>{dataset.size}</TableCell>
                          <TableCell>
                            <StatusBadge status={dataset.status} />
                          </TableCell>
                          <TableCell>{dataset.assignedUsers} users</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem>
                                  <Users className="h-4 w-4 mr-2" />
                                  Assign to Users
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Download className="h-4 w-4 mr-2" />
                                  Export
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Pencil className="h-4 w-4 mr-2" />
                                  Edit Metadata
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Audit Logs Tab */}
            <TabsContent value="logs" className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg">Audit Logs</h3>
                  <p className="text-sm text-muted-foreground">View system and user activity</p>
                </div>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export Logs
                </Button>
              </div>

              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Timestamp</TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>Action</TableHead>
                        <TableHead>Details</TableHead>
                        <TableHead>Severity</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {auditLogs.map((log, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-mono text-sm">{log.timestamp}</TableCell>
                          <TableCell>{log.user}</TableCell>
                          <TableCell>{log.action}</TableCell>
                          <TableCell>{log.details}</TableCell>
                          <TableCell>
                            <StatusBadge status={log.severity} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <div>
                <h3 className="text-lg">Security Settings</h3>
                <p className="text-sm text-muted-foreground">Configure authentication and security policies</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Authentication</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Multi-Factor Authentication</Label>
                        <p className="text-sm text-muted-foreground">Require MFA for all users</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>SSO Integration</Label>
                        <p className="text-sm text-muted-foreground">Enable single sign-on</p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Session Timeout</Label>
                        <p className="text-sm text-muted-foreground">Auto-logout after inactivity</p>
                      </div>
                      <Select defaultValue="8h">
                        <SelectTrigger className="w-24">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1h">1h</SelectItem>
                          <SelectItem value="4h">4h</SelectItem>
                          <SelectItem value="8h">8h</SelectItem>
                          <SelectItem value="24h">24h</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Data Policies</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Data Retention</Label>
                        <p className="text-sm text-muted-foreground">Automatic data cleanup</p>
                      </div>
                      <Select defaultValue="90d">
                        <SelectTrigger className="w-24">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30d">30d</SelectItem>
                          <SelectItem value="90d">90d</SelectItem>
                          <SelectItem value="180d">180d</SelectItem>
                          <SelectItem value="365d">365d</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Export Restrictions</Label>
                        <p className="text-sm text-muted-foreground">Limit data exports</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Audit All Access</Label>
                        <p className="text-sm text-muted-foreground">Log all data access</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Dataset Assignment Modal */}
      <Dialog open={isDatasetModalOpen} onOpenChange={setIsDatasetModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Manage Datasets</DialogTitle>
            <DialogDescription>
              Assign datasets to {selectedUser?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {availableDatasets.map((dataset) => (
              <div key={dataset} className="flex items-center space-x-2">
                <Checkbox
                  id={dataset}
                  defaultChecked={selectedUser?.datasets.includes(dataset)}
                />
                <label htmlFor={dataset} className="text-sm cursor-pointer flex-1">
                  {dataset}
                </label>
              </div>
            ))}
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={() => setIsDatasetModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsDatasetModalOpen(false)}>
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}