import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { X, Activity, Info, AlertTriangle, CheckCircle, Bug } from 'lucide-react';

interface LogEntry {
  timestamp: string;
  level: 'info' | 'success' | 'warning' | 'error' | 'debug';
  message: string;
  component?: string;
  data?: any;
}

export function RuntimeDiagnostics() {
  const [isVisible, setIsVisible] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [filter, setFilter] = useState<'all' | 'info' | 'success' | 'warning' | 'error' | 'debug'>('all');

  useEffect(() => {
    // Intercept console methods
    const originalLog = console.log;
    const originalError = console.error;
    const originalWarn = console.warn;

    console.log = (...args) => {
      originalLog(...args);
      addLog('info', args.join(' '));
    };

    console.error = (...args) => {
      originalError(...args);
      addLog('error', args.join(' '));
    };

    console.warn = (...args) => {
      originalWarn(...args);
      addLog('warning', args.join(' '));
    };

    // Keyboard shortcut: Ctrl+Shift+D to toggle
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        setIsVisible(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      console.log = originalLog;
      console.error = originalError;
      console.warn = originalWarn;
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const addLog = (level: LogEntry['level'], message: string, component?: string, data?: any) => {
    const entry: LogEntry = {
      timestamp: new Date().toLocaleTimeString(),
      level,
      message,
      component,
      data
    };

    setLogs(prev => [entry, ...prev].slice(0, 100)); // Keep last 100 logs
  };

  const filteredLogs = logs.filter(log => filter === 'all' || log.level === filter);

  const getLevelIcon = (level: LogEntry['level']) => {
    switch (level) {
      case 'info': return <Info className="w-4 h-4 text-blue-500" />;
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'error': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'debug': return <Bug className="w-4 h-4 text-purple-500" />;
    }
  };

  const getLevelColor = (level: LogEntry['level']) => {
    switch (level) {
      case 'info': return 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400';
      case 'success': return 'bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400';
      case 'warning': return 'bg-yellow-100 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-400';
      case 'error': return 'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400';
      case 'debug': return 'bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-400';
    }
  };

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 z-50 w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
        title="Open Runtime Diagnostics (Ctrl+Shift+D)"
      >
        <Activity className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-[600px] h-[500px]">
      <Card className="w-full h-full flex flex-col shadow-2xl border-2 border-blue-500">
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between bg-muted/50">
          <div className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold">Runtime Diagnostics</h3>
            <Badge variant="outline" className="ml-2">
              {filteredLogs.length} logs
            </Badge>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLogs([])}
            >
              Clear
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsVisible(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="p-3 border-b flex items-center space-x-2 bg-muted/30">
          <span className="text-sm text-muted-foreground">Filter:</span>
          {(['all', 'info', 'success', 'warning', 'error', 'debug'] as const).map((f) => (
            <Button
              key={f}
              variant={filter === f ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(f)}
              className="capitalize"
            >
              {f}
            </Button>
          ))}
        </div>

        {/* System Info */}
        <div className="p-3 border-b bg-muted/20 text-xs">
          <div className="grid grid-cols-3 gap-2">
            <div>
              <span className="text-muted-foreground">Environment:</span>{' '}
              <span className="font-mono">
                {typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.MODE : 'development'}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">React:</span>{' '}
              <span className="font-mono">{React.version}</span>
            </div>
            <div>
              <span className="text-muted-foreground">User Agent:</span>{' '}
              <span className="font-mono truncate" title={navigator.userAgent}>
                {navigator.userAgent.split(' ').pop()}
              </span>
            </div>
          </div>
        </div>

        {/* Logs */}
        <ScrollArea className="flex-1">
          <div className="p-3 space-y-2">
            {filteredLogs.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Info className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>No logs to display</p>
                <p className="text-xs mt-1">Logs will appear here as the app runs</p>
              </div>
            ) : (
              filteredLogs.map((log, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-lg border ${getLevelColor(log.level)} border-current/20`}
                >
                  <div className="flex items-start space-x-2">
                    {getLevelIcon(log.level)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-mono opacity-70">
                            {log.timestamp}
                          </span>
                          {log.component && (
                            <Badge variant="outline" className="text-xs">
                              {log.component}
                            </Badge>
                          )}
                        </div>
                        <Badge variant="secondary" className="text-xs capitalize">
                          {log.level}
                        </Badge>
                      </div>
                      <p className="text-sm break-words">{log.message}</p>
                      {log.data && (
                        <details className="mt-2">
                          <summary className="text-xs cursor-pointer hover:underline">
                            View data
                          </summary>
                          <pre className="mt-2 p-2 bg-black/10 dark:bg-white/10 rounded text-xs overflow-x-auto">
                            {JSON.stringify(log.data, null, 2)}
                          </pre>
                        </details>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="p-2 border-t bg-muted/30 text-xs text-muted-foreground text-center">
          Press <kbd className="px-1 py-0.5 bg-muted rounded">Ctrl</kbd> +{' '}
          <kbd className="px-1 py-0.5 bg-muted rounded">Shift</kbd> +{' '}
          <kbd className="px-1 py-0.5 bg-muted rounded">D</kbd> to toggle
        </div>
      </Card>
    </div>
  );
}
