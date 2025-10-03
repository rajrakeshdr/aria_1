import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Shield, Chrome, Mail } from 'lucide-react';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

interface AuthOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (provider: string) => void;
}

export function AuthOverlay({ isOpen, onClose, onLogin }: AuthOverlayProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          />
          
          {/* Overlay Panel */}
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-slate-900 shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-slate-700">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Shield className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h2 className="text-lg">SecureAI Platform</h2>
                  <p className="text-sm text-muted-foreground">Security Intelligence</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Content */}
            <div className="flex-1 p-6 space-y-6">
              {/* Welcome Message */}
              <div className="text-center space-y-2">
                <h3 className="text-xl">Welcome Back</h3>
                <p className="text-sm text-muted-foreground">
                  Sign in to access your security intelligence dashboard
                </p>
              </div>

              {/* Auth Options */}
              <div className="space-y-4">
                {/* Google Login */}
                <Button
                  onClick={() => onLogin('google')}
                  variant="outline"
                  className="w-full h-12 flex items-center justify-center space-x-3 border-2 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <Chrome className="h-5 w-5 text-blue-600" />
                  <span>Continue with Google</span>
                </Button>

                {/* Microsoft Login */}
                <Button
                  onClick={() => onLogin('microsoft')}
                  variant="outline"
                  className="w-full h-12 flex items-center justify-center space-x-3 border-2 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <div className="w-5 h-5 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 to-blue-500 rounded-sm flex items-center justify-center">
                    <div className="w-3 h-3 bg-white dark:bg-slate-900 rounded-sm" />
                  </div>
                  <span>Continue with Microsoft</span>
                </Button>

                <div className="relative">
                  <Separator />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-white dark:bg-slate-900 px-2 text-xs text-muted-foreground">
                      or
                    </span>
                  </div>
                </div>

                {/* Email Login */}
                <Button
                  onClick={() => onLogin('email')}
                  variant="outline"
                  className="w-full h-12 flex items-center justify-center space-x-3 border-2 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <Mail className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  <span>Continue with Email</span>
                </Button>

                {/* SSO Option */}
                <Button
                  onClick={() => onLogin('sso')}
                  variant="outline"
                  className="w-full h-12 flex items-center justify-center space-x-3 border-2 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <Shield className="h-5 w-5 text-purple-600" />
                  <span>Enterprise SSO</span>
                </Button>
              </div>

              {/* Navigation Menu */}
              <div className="space-y-2 pt-6 border-t border-gray-200 dark:border-slate-700">
                <h4 className="text-sm text-muted-foreground mb-3">Platform</h4>
                <Button variant="ghost" className="w-full justify-start h-10">
                  Home
                </Button>
                <Button variant="ghost" className="w-full justify-start h-10">
                  Documentation
                </Button>
                <Button variant="ghost" className="w-full justify-start h-10">
                  About
                </Button>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-200 dark:border-slate-700">
              <p className="text-xs text-muted-foreground text-center">
                By signing in, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}