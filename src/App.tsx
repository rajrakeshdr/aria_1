import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './components/theme-provider';
import { LandingPage } from './components/landing-page-new';
import { AuthOverlay } from './components/auth-overlay';
import { SignIn } from './components/sign-in';
import { SignUp } from './components/sign-up';
import { OrganizationCreation } from './components/organization-creation';
import { Dashboard } from './components/dashboard';
import { EnvironmentCreation } from './components/environment-creation';
import { AdminPanel } from './components/admin-panel';
import { WorkspaceRedesigned } from './components/workspace-redesigned';
import { WorkflowBuilder } from './components/workflow-builder-improved';
import { ConnectorFramework } from './components/connector-framework';
import { Toaster } from './components/ui/sonner';
import { RuntimeDiagnostics } from './components/runtime-diagnostics';
import { logger } from './utils/logger';

type AppState = 'landing' | 'sign-in' | 'sign-up' | 'org-creation' | 'dashboard' | 'environment-creation' | 'admin-panel' | 'workspace-canvas' | 'workflow-builder' | 'connector-framework';

interface User {
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'user';
  accessToken?: string;
}

interface Organization {
  name: string;
  subdomain: string;
  industry?: string;
  size?: string;
}

export default function App() {
  const [currentState, setCurrentState] = useState<AppState>('landing');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [moduleData, setModuleData] = useState<any>(null);

  // Initial app load logging
  useEffect(() => {
    try {
      logger.group('App Initialization', () => {
        logger.success('Security Platform loaded successfully', undefined, 'App');
        logger.state('App', 'Initial state', { currentState });
        logger.info('Theme provider ready', undefined, 'Theme');
        logger.info('Router initialized', undefined, 'Router');
        logger.info('CSS loaded and Tailwind initialized', undefined, 'Styles');
      });
    } catch (error) {
      console.error('Error during app initialization logging:', error);
    }
  }, []);

  // State change logging
  useEffect(() => {
    try {
      logger.state('App', `State changed to: ${currentState}`, {
        user: user ? { name: user.name, email: user.email, role: user.role } : null,
        organization: organization ? { name: organization.name, subdomain: organization.subdomain } : null,
        hasModuleData: !!moduleData
      });
    } catch (error) {
      console.error('Error during state change logging:', error);
    }
  }, [currentState, user, organization, moduleData]);

  const handleOpenAuth = () => {
    logger.auth('Opening authentication');
    setCurrentState('sign-in');
  };

  const handleCloseAuth = () => {
    logger.auth('Closing authentication overlay');
    setIsAuthOpen(false);
  };

  const handleLoginSuccess = (userData: User) => {
    logger.success('Login successful', { name: userData.name, email: userData.email, role: userData.role }, 'Auth');
    setUser(userData);
    setCurrentState('dashboard');
    logger.navigation('Sign-in', 'Dashboard');
  };

  const handleLogin = async (provider: string) => {
    // Simulate authentication
    logger.auth(`Attempting login with provider: ${provider}`);
    
    // Mock user data based on provider
    const mockUsers = {
      google: {
        name: 'Sarah Chen',
        email: 'sarah.chen@company.com',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop&crop=face',
        role: 'admin' as const
      },
      microsoft: {
        name: 'Michael Rodriguez',
        email: 'michael.r@enterprise.com',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        role: 'user' as const
      },
      email: {
        name: 'Alex Johnson',
        email: 'alex.johnson@startup.io',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        role: 'admin' as const
      },
      sso: {
        name: 'Jennifer Park',
        email: 'j.park@corp.com',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
        role: 'admin' as const
      }
    };

    // Simulate API call delay
    const startTime = performance.now();
    logger.api('POST', `/auth/login/${provider}`, { provider });
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const endTime = performance.now();
    logger.performance(`Authentication with ${provider}`, endTime - startTime);

    const userData = mockUsers[provider as keyof typeof mockUsers];
    logger.success('Authentication successful', { name: userData.name, email: userData.email, role: userData.role }, 'Auth');
    setUser(userData);
    setIsAuthOpen(false);

    // Go to dashboard after login
    logger.navigation('Auth', 'Dashboard');
    setCurrentState('dashboard');
  };

  const handleOrganizationComplete = (orgData: Organization) => {
    logger.success('Organization created', { name: orgData.name, subdomain: orgData.subdomain }, 'Organization');
    setOrganization(orgData);
    logger.navigation('Organization Creation', 'Dashboard');
    setCurrentState('dashboard');
  };

  const handleLogout = () => {
    logger.auth(`Logging out user: ${user?.name}`);
    setUser(null);
    setOrganization(null);
    setModuleData(null);
    setCurrentState('landing');
    setIsAuthOpen(false);
    logger.success('Logout complete', undefined, 'Auth');
    logger.navigation('Dashboard', 'Landing');
  };

  const handleNavigateToModule = (module: string, data?: any) => {
    logger.navigation('Dashboard', module, data);
    setModuleData(data);
    setCurrentState(module as AppState);
  };

  const handleBackToDashboard = () => {
    logger.navigation(currentState, 'Dashboard');
    setModuleData(null);
    setCurrentState('dashboard');
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen">
        <Toaster />
        {(typeof import.meta !== 'undefined' && import.meta.env?.MODE === 'development') && <RuntimeDiagnostics />}
        
        {currentState === 'landing' && (
          <>
            <LandingPage onOpenAuth={handleOpenAuth} />
            <AuthOverlay
              isOpen={isAuthOpen}
              onClose={handleCloseAuth}
              onLogin={handleLogin}
            />
          </>
        )}

        {currentState === 'sign-in' && (
          <SignIn
            onSuccess={handleLoginSuccess}
            onSwitchToSignUp={() => setCurrentState('sign-up')}
          />
        )}

        {currentState === 'sign-up' && (
          <SignUp
            onSuccess={handleLoginSuccess}
            onSwitchToSignIn={() => setCurrentState('sign-in')}
          />
        )}

        {currentState === 'org-creation' && (
          <OrganizationCreation 
            onComplete={handleOrganizationComplete}
            showBackButton={!!user}
            onBack={() => user ? setCurrentState('dashboard') : setCurrentState('landing')}
          />
        )}

        {currentState === 'dashboard' && user && (
          <Dashboard
            user={user}
            organization={organization || { name: 'Personal Workspace', subdomain: 'personal' }}
            onLogout={handleLogout}
            onNavigateToModule={handleNavigateToModule}
          />
        )}

        {currentState === 'environment-creation' && (
          <EnvironmentCreation
            organization={organization || { name: 'Personal Workspace', subdomain: 'personal' }}
            onComplete={(envData) => {
              console.log('Environment created:', envData);
              handleBackToDashboard();
            }}
            onCancel={handleBackToDashboard}
          />
        )}

        {currentState === 'admin-panel' && (
          <AdminPanel
            organization={organization || { name: 'Personal Workspace', subdomain: 'personal' }}
            onClose={handleBackToDashboard}
          />
        )}

        {currentState === 'workspace-canvas' && user && (
          <WorkspaceRedesigned
            workspace={moduleData?.workspace || { name: 'Security Analysis Workspace', id: 'default' }}
            user={user}
            onClose={() => setCurrentState('dashboard')}
            onNavigateToDashboard={() => setCurrentState('dashboard')}
          />
        )}

        {currentState === 'workflow-builder' && (
          <WorkflowBuilder
            onClose={handleBackToDashboard}
          />
        )}

        {currentState === 'connector-framework' && (
          <ConnectorFramework
            onClose={handleBackToDashboard}
          />
        )}
      </div>
    </ThemeProvider>
  );
}