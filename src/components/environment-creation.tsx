import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ArrowLeft, Server, Check, Globe, Shield, Puzzle, Target, Database, Users, Building2, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

interface EnvironmentCreationProps {
  organization: {
    name: string;
    subdomain: string;
  };
  onComplete: (envData: any) => void;
  onCancel: () => void;
}

export function EnvironmentCreation({ organization, onComplete, onCancel }: EnvironmentCreationProps) {
  const [step, setStep] = useState(1);
  const [envData, setEnvData] = useState({
    name: '',
    orgName: organization.name,
    subdomain: '',
    industry: '',
    orgSize: '',
    securityGoals: [] as string[],
    dataSources: [] as string[],
    priorityUseCase: '',
    selectedIntegrations: [] as string[],
  });
  const [isCreating, setIsCreating] = useState(false);

  const industries = [
    'Technology',
    'Financial Services', 
    'Healthcare',
    'Government',
    'Education',
    'Manufacturing',
    'Retail',
    'Energy',
    'Other'
  ];

  const orgSizes = [
    'Small (1-50 employees)',
    'Mid-size (51-500 employees)', 
    'Enterprise (500+ employees)'
  ];

  const securityGoals = [
    'Threat Detection',
    'Incident Response',
    'Identity & Access Management',
    'Vulnerability Management',
    'Compliance / Audit',
    'Data Loss Prevention',
    'Security Monitoring',
    'Risk Assessment'
  ];

  const dataSources = [
    'Endpoints (Windows, Mac, Linux)',
    'Cloud Logs (AWS, Azure, GCP)',
    'Network Telemetry',
    'Identity (AD, Azure AD, Okta)',
    'Email Security (Proofpoint, Mimecast)',
    'SIEM (Splunk, QRadar)',
    'Vulnerability Scanners',
    'Web Proxies'
  ];

  const availableIntegrations = [
    { name: 'CrowdStrike Falcon', category: 'Endpoint', description: 'Advanced endpoint protection' },
    { name: 'Microsoft 365', category: 'Productivity', description: 'Office 365 security monitoring' },
    { name: 'Proofpoint', category: 'Email', description: 'Email threat protection' },
    { name: 'Splunk', category: 'SIEM', description: 'Security information and event management' },
    { name: 'Okta', category: 'Identity', description: 'Identity and access management' },
    { name: 'AWS CloudTrail', category: 'Cloud', description: 'AWS API logging and monitoring' },
    { name: 'Palo Alto Networks', category: 'Network', description: 'Next-generation firewall' },
    { name: 'Tenable', category: 'Vulnerability', description: 'Vulnerability management' }
  ];

  const handleNameChange = (name: string) => {
    const subdomain = name.toLowerCase().replace(/[^a-z0-9]/g, '').substring(0, 20);
    setEnvData({ ...envData, name, subdomain });
  };

  const handleSecurityGoalToggle = (goal: string) => {
    const updated = envData.securityGoals.includes(goal)
      ? envData.securityGoals.filter(g => g !== goal)
      : [...envData.securityGoals, goal];
    setEnvData({ ...envData, securityGoals: updated });
  };

  const handleDataSourceToggle = (source: string) => {
    const updated = envData.dataSources.includes(source)
      ? envData.dataSources.filter(s => s !== source)
      : [...envData.dataSources, source];
    setEnvData({ ...envData, dataSources: updated });
  };

  const handleIntegrationToggle = (integration: string) => {
    const updated = envData.selectedIntegrations.includes(integration)
      ? envData.selectedIntegrations.filter(i => i !== integration)
      : [...envData.selectedIntegrations, integration];
    setEnvData({ ...envData, selectedIntegrations: updated });
  };

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleCreate = async () => {
    setIsCreating(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsCreating(false);
    setStep(6);
    
    // Complete after showing success
    setTimeout(() => {
      onComplete(envData);
    }, 2000);
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return envData.name.trim() && envData.subdomain.trim();
      case 2:
        return true; // Optional fields
      case 3:
        return true; // Optional integrations
      case 4:
        return true; // Review step
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl"
      >
        <Card className="shadow-xl border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Server className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Create Environment</CardTitle>
            <CardDescription>
              Set up your security intelligence environment
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Progress Indicator */}
            <div className="flex items-center justify-center space-x-2 mb-8">
              {[1, 2, 3, 4, 5, 6].map((stepNum) => (
                <React.Fragment key={stepNum}>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                      stepNum < step
                        ? 'bg-green-500 text-white'
                        : stepNum === step
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 dark:bg-slate-600 text-gray-400'
                    }`}
                  >
                    {stepNum < step ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      stepNum
                    )}
                  </div>
                  {stepNum < 6 && (
                    <div className={`w-8 h-1 rounded ${
                      stepNum < step ? 'bg-green-500' : 'bg-gray-200 dark:bg-slate-600'
                    }`} />
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Step 1: Basic Details */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="text-center">
                  <h3 className="text-lg mb-2">Basic Details</h3>
                  <p className="text-sm text-muted-foreground">
                    Configure your environment basics
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="envName">Environment Name *</Label>
                    <Input
                      id="envName"
                      value={envData.name}
                      onChange={(e) => handleNameChange(e.target.value)}
                      placeholder="Production Security Environment"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="orgName">Organization Name</Label>
                    <Input
                      id="orgName"
                      value={envData.orgName}
                      onChange={(e) => setEnvData({ ...envData, orgName: e.target.value })}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="subdomain">Environment Subdomain *</Label>
                    <div className="flex items-center mt-1">
                      <Input
                        id="subdomain"
                        value={envData.subdomain}
                        onChange={(e) => setEnvData({ ...envData, subdomain: e.target.value })}
                        placeholder="production"
                        className="rounded-r-none"
                      />
                      <div className="px-3 py-2 bg-muted border border-l-0 rounded-r-md text-sm text-muted-foreground">
                        .{organization.subdomain}.platform.com
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      This will be your environment's unique URL
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Organization Context */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="text-center">
                  <h3 className="text-lg mb-2">Organization Context</h3>
                  <p className="text-sm text-muted-foreground">
                    Help us understand your security requirements
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="industry">Industry</Label>
                    <Select value={envData.industry} onValueChange={(value) => setEnvData({ ...envData, industry: value })}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select your industry" />
                      </SelectTrigger>
                      <SelectContent>
                        {industries.map((industry) => (
                          <SelectItem key={industry} value={industry}>
                            <div className="flex items-center space-x-2">
                              <Building2 className="h-4 w-4" />
                              <span>{industry}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="orgSize">Organization Size</Label>
                    <Select value={envData.orgSize} onValueChange={(value) => setEnvData({ ...envData, orgSize: value })}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select organization size" />
                      </SelectTrigger>
                      <SelectContent>
                        {orgSizes.map((size) => (
                          <SelectItem key={size} value={size}>
                            <div className="flex items-center space-x-2">
                              <Users className="h-4 w-4" />
                              <span>{size}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label className="text-base mb-3 block">Primary Security Goals</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {securityGoals.map((goal) => (
                      <div key={goal} className="flex items-center space-x-2">
                        <Checkbox
                          id={goal}
                          checked={envData.securityGoals.includes(goal)}
                          onCheckedChange={() => handleSecurityGoalToggle(goal)}
                        />
                        <label htmlFor={goal} className="text-sm cursor-pointer">
                          {goal}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-base mb-3 block">Expected Data Sources</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {dataSources.map((source) => (
                      <div key={source} className="flex items-center space-x-2">
                        <Checkbox
                          id={source}
                          checked={envData.dataSources.includes(source)}
                          onCheckedChange={() => handleDataSourceToggle(source)}
                        />
                        <label htmlFor={source} className="text-sm cursor-pointer">
                          {source}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="priorityUseCase">Priority Use Case</Label>
                  <Textarea
                    id="priorityUseCase"
                    value={envData.priorityUseCase}
                    onChange={(e) => setEnvData({ ...envData, priorityUseCase: e.target.value })}
                    placeholder="e.g., Detect Business Email Compromise attempts"
                    className="mt-1"
                    rows={3}
                  />
                </div>
              </motion.div>
            )}

            {/* Step 3: Integrations Preview */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="text-center">
                  <h3 className="text-lg mb-2">Available Integrations</h3>
                  <p className="text-sm text-muted-foreground">
                    Select integrations to configure later (optional)
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {availableIntegrations.map((integration) => (
                    <Card 
                      key={integration.name}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        envData.selectedIntegrations.includes(integration.name)
                          ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : ''
                      }`}
                      onClick={() => handleIntegrationToggle(integration.name)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <Checkbox
                            checked={envData.selectedIntegrations.includes(integration.name)}
                            onChange={() => handleIntegrationToggle(integration.name)}
                          />
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className="font-medium">{integration.name}</h4>
                              <Badge variant="secondary" className="text-xs">
                                {integration.category}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {integration.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    <strong>Note:</strong> You can always add or configure integrations later from the environment dashboard.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Step 4: Review & Confirmation */}
            {step === 4 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="text-center">
                  <h3 className="text-lg mb-2">Review & Confirm</h3>
                  <p className="text-sm text-muted-foreground">
                    Please review your environment configuration
                  </p>
                </div>

                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Environment Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Name:</span>
                        <span>{envData.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Organization:</span>
                        <span>{envData.orgName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">URL:</span>
                        <span className="flex items-center space-x-1">
                          <Globe className="h-4 w-4" />
                          <span>{envData.subdomain}.{organization.subdomain}.platform.com</span>
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  {(envData.industry || envData.orgSize) && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Organization Context</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {envData.industry && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Industry:</span>
                            <span>{envData.industry}</span>
                          </div>
                        )}
                        {envData.orgSize && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Size:</span>
                            <span>{envData.orgSize}</span>
                          </div>
                        )}
                        {envData.securityGoals.length > 0 && (
                          <div>
                            <span className="text-muted-foreground">Security Goals:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {envData.securityGoals.map(goal => (
                                <Badge key={goal} variant="secondary" className="text-xs">
                                  {goal}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                        {envData.priorityUseCase && (
                          <div>
                            <span className="text-muted-foreground">Priority Use Case:</span>
                            <p className="text-sm mt-1">{envData.priorityUseCase}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )}

                  {envData.selectedIntegrations.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Selected Integrations</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {envData.selectedIntegrations.map(integration => (
                            <Badge key={integration} variant="outline" className="text-xs">
                              <Puzzle className="h-3 w-3 mr-1" />
                              {integration}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </motion.div>
            )}

            {/* Step 5: Creating */}
            {step === 5 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-center space-y-6 py-8"
              >
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Zap className="h-8 w-8 text-blue-600" />
                  </motion.div>
                </div>

                <div>
                  <h3 className="text-xl mb-2">Creating Environment...</h3>
                  <p className="text-muted-foreground">
                    Setting up your security intelligence environment
                  </p>
                </div>

                <motion.div
                  className="w-64 h-2 bg-muted rounded-full mx-auto overflow-hidden"
                >
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 2 }}
                  />
                </motion.div>
              </motion.div>
            )}

            {/* Step 6: Success */}
            {step === 6 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-6 py-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto"
                >
                  <Check className="h-10 w-10 text-white" />
                </motion.div>

                <div>
                  <h3 className="text-xl mb-2">Environment Created!</h3>
                  <p className="text-muted-foreground">
                    {envData.name} is ready. Redirecting to environment dashboard...
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Go to Environment Dashboard
                  </Button>
                  <Button variant="outline">
                    Configure Integrations Now
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Actions */}
            {step < 5 && (
              <div className="flex justify-between pt-6">
                <Button
                  variant="outline"
                  onClick={step === 1 ? onCancel : handlePrevious}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  {step === 1 ? 'Cancel' : 'Previous'}
                </Button>

                {step < 4 ? (
                  <Button
                    onClick={handleNext}
                    disabled={!isStepValid()}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    Next
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    onClick={() => setStep(5)}
                    disabled={isCreating}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    Create Environment
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}