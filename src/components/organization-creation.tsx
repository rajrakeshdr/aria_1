import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Building2, Check, Globe, Users, Briefcase } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

interface OrganizationCreationProps {
  onComplete: (orgData: any) => void;
  showBackButton?: boolean;
  onBack?: () => void;
}

export function OrganizationCreation({ onComplete, showBackButton = false, onBack }: OrganizationCreationProps) {
  const [step, setStep] = useState(1);
  const [orgData, setOrgData] = useState({
    name: '',
    subdomain: '',
    industry: '',
    size: '',
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
    'Other'
  ];

  const companySizes = [
    '1-10 employees',
    '11-50 employees',
    '51-200 employees',
    '201-1000 employees',
    '1000+ employees'
  ];

  const handleNameChange = (name: string) => {
    const subdomain = name.toLowerCase().replace(/[^a-z0-9]/g, '').substring(0, 20);
    setOrgData({ ...orgData, name, subdomain });
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleCreate = async () => {
    setIsCreating(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsCreating(false);
    setStep(4);
    
    // Complete after showing success
    setTimeout(() => {
      onComplete(orgData);
    }, 2000);
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return orgData.name.trim() && orgData.subdomain.trim();
      case 2:
        return true; // Optional fields
      case 3:
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
        className="w-full max-w-2xl"
      >
        <Card className="shadow-xl border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Building2 className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Create Your Organization</CardTitle>
            <CardDescription>
              Set up your security intelligence workspace
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Progress Indicator */}
            <div className="flex items-center justify-center space-x-2 mb-8">
              {[1, 2, 3, 4].map((stepNum) => (
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
                  {stepNum < 4 && (
                    <div className={`w-8 h-1 rounded ${
                      stepNum < step ? 'bg-green-500' : 'bg-gray-200 dark:bg-slate-600'
                    }`} />
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Step 1: Organization Info */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="text-center">
                  <h3 className="text-lg mb-2">Organization Details</h3>
                  <p className="text-sm text-muted-foreground">
                    Tell us about your organization
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="orgName">Organization Name *</Label>
                    <Input
                      id="orgName"
                      value={orgData.name}
                      onChange={(e) => handleNameChange(e.target.value)}
                      placeholder="Acme Security Corp"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="subdomain">Subdomain *</Label>
                    <div className="flex items-center mt-1">
                      <Input
                        id="subdomain"
                        value={orgData.subdomain}
                        onChange={(e) => setOrgData({ ...orgData, subdomain: e.target.value })}
                        placeholder="acmesecurity"
                        className="rounded-r-none"
                      />
                      <div className="px-3 py-2 bg-muted border border-l-0 rounded-r-md text-sm text-muted-foreground">
                        .platform.com
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      This will be your organization's unique URL
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Additional Details */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="text-center">
                  <h3 className="text-lg mb-2">Additional Information</h3>
                  <p className="text-sm text-muted-foreground">
                    Help us tailor your experience (optional)
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="industry">Industry</Label>
                    <Select value={orgData.industry} onValueChange={(value) => setOrgData({ ...orgData, industry: value })}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select your industry" />
                      </SelectTrigger>
                      <SelectContent>
                        {industries.map((industry) => (
                          <SelectItem key={industry} value={industry}>
                            <div className="flex items-center space-x-2">
                              <Briefcase className="h-4 w-4" />
                              <span>{industry}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="size">Company Size</Label>
                    <Select value={orgData.size} onValueChange={(value) => setOrgData({ ...orgData, size: value })}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select company size" />
                      </SelectTrigger>
                      <SelectContent>
                        {companySizes.map((size) => (
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
              </motion.div>
            )}

            {/* Step 3: Review */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="text-center">
                  <h3 className="text-lg mb-2">Review & Confirm</h3>
                  <p className="text-sm text-muted-foreground">
                    Please review your organization details
                  </p>
                </div>

                <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Organization Name:</span>
                    <span>{orgData.name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">URL:</span>
                    <span className="flex items-center space-x-1">
                      <Globe className="h-4 w-4" />
                      <span>{orgData.subdomain}.platform.com</span>
                    </span>
                  </div>
                  {orgData.industry && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Industry:</span>
                      <span>{orgData.industry}</span>
                    </div>
                  )}
                  {orgData.size && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Size:</span>
                      <span>{orgData.size}</span>
                    </div>
                  )}
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    <strong>Note:</strong> You will be assigned as the administrator of this organization.
                    You can invite team members and configure settings after creation.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Step 4: Success */}
            {step === 4 && (
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
                  <h3 className="text-xl mb-2">Organization Created!</h3>
                  <p className="text-muted-foreground">
                    Welcome to {orgData.name}. Redirecting to your dashboard...
                  </p>
                </div>

                <motion.div
                  className="w-32 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 2 }}
                />
              </motion.div>
            )}

            {/* Actions */}
            {step < 4 && (
              <div className="flex justify-between pt-6">
                <Button
                  variant="outline"
                  onClick={() => {
                    if (step === 1 && showBackButton && onBack) {
                      onBack();
                    } else {
                      setStep(Math.max(1, step - 1));
                    }
                  }}
                  disabled={step === 1 && !showBackButton}
                >
                  {step === 1 && showBackButton ? 'Back to Dashboard' : 'Previous'}
                </Button>

                {step < 3 ? (
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
                    onClick={handleCreate}
                    disabled={isCreating}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    {isCreating ? 'Creating...' : 'Create Organization'}
                    {!isCreating && <ArrowRight className="h-4 w-4 ml-2" />}
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