/**
 * Comprehensive logging utility for the Security Platform
 * Provides structured logging with emoji icons and color coding
 */

type LogLevel = 'info' | 'success' | 'warning' | 'error' | 'debug';

interface LogOptions {
  level?: LogLevel;
  data?: any;
  component?: string;
}

const LOG_STYLES = {
  info: 'color: #3b82f6; font-weight: bold',
  success: 'color: #10b981; font-weight: bold',
  warning: 'color: #f59e0b; font-weight: bold',
  error: 'color: #ef4444; font-weight: bold',
  debug: 'color: #8b5cf6; font-weight: bold',
};

const LOG_ICONS = {
  info: 'ℹ️',
  success: '✅',
  warning: '⚠️',
  error: '❌',
  debug: '🔍',
};

class Logger {
  private get isDevelopment(): boolean {
    // Safely check if import.meta.env exists and default to true if unavailable
    return typeof import.meta !== 'undefined' && 
           typeof import.meta.env !== 'undefined' 
           ? import.meta.env.MODE === 'development' 
           : true;
  }

  private formatMessage(message: string, options?: LogOptions): string {
    const icon = LOG_ICONS[options?.level || 'info'];
    const component = options?.component ? `[${options.component}]` : '';
    return `${icon} ${component} ${message}`;
  }

  private log(message: string, options?: LogOptions) {
    if (!this.isDevelopment && options?.level !== 'error') {
      return; // Only log errors in production
    }

    const level = options?.level || 'info';
    const formattedMessage = this.formatMessage(message, options);

    console.log(`%c${formattedMessage}`, LOG_STYLES[level]);

    if (options?.data) {
      console.log('📦 Data:', options.data);
    }
  }

  // Public methods
  info(message: string, data?: any, component?: string) {
    this.log(message, { level: 'info', data, component });
  }

  success(message: string, data?: any, component?: string) {
    this.log(message, { level: 'success', data, component });
  }

  warning(message: string, data?: any, component?: string) {
    this.log(message, { level: 'warning', data, component });
  }

  error(message: string, data?: any, component?: string) {
    this.log(message, { level: 'error', data, component });
    console.trace(); // Always include stack trace for errors
  }

  debug(message: string, data?: any, component?: string) {
    this.log(message, { level: 'debug', data, component });
  }

  // Specialized logging methods
  navigation(from: string, to: string, data?: any) {
    this.info(`🧭 Navigation: ${from} → ${to}`, data, 'Navigation');
  }

  auth(action: string, data?: any) {
    this.info(`🔐 Auth: ${action}`, data, 'Authentication');
  }

  api(method: string, endpoint: string, data?: any) {
    this.info(`🌐 API: ${method} ${endpoint}`, data, 'API');
  }

  state(component: string, state: string, data?: any) {
    this.debug(`📊 State: ${component} - ${state}`, data, 'State');
  }

  render(component: string, props?: any) {
    this.debug(`🎨 Render: ${component}`, props, 'Render');
  }

  effect(component: string, description: string, data?: any) {
    this.debug(`⚡ Effect: ${component} - ${description}`, data, 'Effect');
  }

  performance(label: string, duration?: number) {
    const msg = duration 
      ? `⏱️ Performance: ${label} took ${duration}ms`
      : `⏱️ Performance: ${label}`;
    this.info(msg, undefined, 'Performance');
  }

  // Group logging for complex operations
  group(label: string, callback: () => void) {
    if (this.isDevelopment) {
      console.group(`🔷 ${label}`);
      callback();
      console.groupEnd();
    }
  }

  // Table logging for structured data
  table(data: any[], label?: string) {
    if (this.isDevelopment) {
      if (label) {
        console.log(`📊 ${label}`);
      }
      console.table(data);
    }
  }
}

// Export singleton instance
export const logger = new Logger();

// Export for testing
export { Logger };
