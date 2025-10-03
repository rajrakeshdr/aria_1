/**
 * Startup Diagnostics
 * Comprehensive checks to ensure the application is properly configured
 */

export interface DiagnosticResult {
  category: string;
  name: string;
  status: 'pass' | 'fail' | 'warning';
  message: string;
  details?: any;
}

export class StartupDiagnostics {
  private results: DiagnosticResult[] = [];

  async runAll(): Promise<DiagnosticResult[]> {
    console.group('🔍 Running Startup Diagnostics');
    
    this.checkEnvironment();
    this.checkDOM();
    this.checkStyles();
    this.checkBrowser();
    this.checkDependencies();
    
    console.groupEnd();
    
    this.printReport();
    return this.results;
  }

  private checkEnvironment() {
    console.log('📦 Checking Environment...');
    
    // Check import.meta.env
    if (typeof import.meta !== 'undefined' && import.meta.env) {
      this.addResult({
        category: 'Environment',
        name: 'import.meta.env',
        status: 'pass',
        message: 'Environment variables available',
        details: {
          MODE: import.meta.env.MODE,
          BASE_URL: import.meta.env.BASE_URL,
          DEV: import.meta.env.DEV,
          PROD: import.meta.env.PROD
        }
      });
    } else {
      this.addResult({
        category: 'Environment',
        name: 'import.meta.env',
        status: 'warning',
        message: 'Environment variables not available (may be running outside Vite)'
      });
    }

    // Check window object
    if (typeof window !== 'undefined') {
      this.addResult({
        category: 'Environment',
        name: 'window',
        status: 'pass',
        message: 'Running in browser environment',
        details: {
          userAgent: navigator.userAgent,
          platform: navigator.platform
        }
      });
    } else {
      this.addResult({
        category: 'Environment',
        name: 'window',
        status: 'fail',
        message: 'Not running in browser environment'
      });
    }
  }

  private checkDOM() {
    console.log('🌐 Checking DOM...');
    
    // Check root element
    const root = document.getElementById('root');
    if (root) {
      this.addResult({
        category: 'DOM',
        name: 'Root Element',
        status: 'pass',
        message: 'Root element (#root) found',
        details: {
          tagName: root.tagName,
          children: root.children.length
        }
      });
    } else {
      this.addResult({
        category: 'DOM',
        name: 'Root Element',
        status: 'fail',
        message: 'Root element (#root) not found'
      });
    }

    // Check HTML element
    if (document.documentElement) {
      this.addResult({
        category: 'DOM',
        name: 'Document Element',
        status: 'pass',
        message: 'Document element available'
      });
    }
  }

  private checkStyles() {
    console.log('🎨 Checking Styles...');
    
    const html = document.documentElement;
    const computedStyle = window.getComputedStyle(html);
    
    // Check CSS custom properties
    const cssVars = [
      '--background',
      '--foreground',
      '--primary',
      '--border'
    ];
    
    const missingVars: string[] = [];
    const foundVars: Record<string, string> = {};
    
    cssVars.forEach(varName => {
      const value = computedStyle.getPropertyValue(varName).trim();
      if (value) {
        foundVars[varName] = value;
      } else {
        missingVars.push(varName);
      }
    });

    if (missingVars.length === 0) {
      this.addResult({
        category: 'Styles',
        name: 'CSS Variables',
        status: 'pass',
        message: 'All critical CSS variables loaded',
        details: foundVars
      });
    } else if (missingVars.length < cssVars.length) {
      this.addResult({
        category: 'Styles',
        name: 'CSS Variables',
        status: 'warning',
        message: `Some CSS variables missing: ${missingVars.join(', ')}`,
        details: { found: foundVars, missing: missingVars }
      });
    } else {
      this.addResult({
        category: 'Styles',
        name: 'CSS Variables',
        status: 'fail',
        message: 'No CSS variables found - styles may not be loaded',
        details: { missing: missingVars }
      });
    }

    // Check if Tailwind classes are working
    const testDiv = document.createElement('div');
    testDiv.className = 'bg-primary';
    document.body.appendChild(testDiv);
    const bgColor = window.getComputedStyle(testDiv).backgroundColor;
    document.body.removeChild(testDiv);

    if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
      this.addResult({
        category: 'Styles',
        name: 'Tailwind CSS',
        status: 'pass',
        message: 'Tailwind classes are working',
        details: { testColor: bgColor }
      });
    } else {
      this.addResult({
        category: 'Styles',
        name: 'Tailwind CSS',
        status: 'warning',
        message: 'Tailwind classes may not be working properly',
        details: { testColor: bgColor }
      });
    }
  }

  private checkBrowser() {
    console.log('🌍 Checking Browser Compatibility...');
    
    // Check for required APIs
    const requiredAPIs = [
      'fetch',
      'Promise',
      'localStorage',
      'sessionStorage',
      'requestAnimationFrame'
    ];

    const missingAPIs: string[] = [];
    
    requiredAPIs.forEach(api => {
      if (!(api in window)) {
        missingAPIs.push(api);
      }
    });

    if (missingAPIs.length === 0) {
      this.addResult({
        category: 'Browser',
        name: 'Required APIs',
        status: 'pass',
        message: 'All required browser APIs available'
      });
    } else {
      this.addResult({
        category: 'Browser',
        name: 'Required APIs',
        status: 'fail',
        message: `Missing APIs: ${missingAPIs.join(', ')}`,
        details: { missing: missingAPIs }
      });
    }
  }

  private checkDependencies() {
    console.log('📚 Checking Dependencies...');
    
    // Check React
    try {
      const React = require('react');
      this.addResult({
        category: 'Dependencies',
        name: 'React',
        status: 'pass',
        message: `React ${React.version} loaded`
      });
    } catch {
      this.addResult({
        category: 'Dependencies',
        name: 'React',
        status: 'fail',
        message: 'React not available'
      });
    }
  }

  private addResult(result: DiagnosticResult) {
    this.results.push(result);
    
    const icon = result.status === 'pass' ? '✅' : result.status === 'warning' ? '⚠️' : '❌';
    console.log(`${icon} ${result.category}: ${result.name} - ${result.message}`);
    
    if (result.details) {
      console.log('  Details:', result.details);
    }
  }

  private printReport() {
    const passed = this.results.filter(r => r.status === 'pass').length;
    const warnings = this.results.filter(r => r.status === 'warning').length;
    const failed = this.results.filter(r => r.status === 'fail').length;
    const total = this.results.length;

    console.log('\n' + '='.repeat(50));
    console.log('📊 Diagnostic Report');
    console.log('='.repeat(50));
    console.log(`✅ Passed:   ${passed}/${total}`);
    console.log(`⚠️  Warnings: ${warnings}/${total}`);
    console.log(`❌ Failed:   ${failed}/${total}`);
    console.log('='.repeat(50) + '\n');

    if (failed > 0) {
      console.warn('⚠️ Some critical checks failed. The app may not work correctly.');
    } else if (warnings > 0) {
      console.warn('⚠️ Some checks have warnings. The app should work but may have issues.');
    } else {
      console.log('✅ All diagnostics passed! App is ready.');
    }
  }

  getResults() {
    return this.results;
  }

  getSummary() {
    return {
      total: this.results.length,
      passed: this.results.filter(r => r.status === 'pass').length,
      warnings: this.results.filter(r => r.status === 'warning').length,
      failed: this.results.filter(r => r.status === 'fail').length
    };
  }
}

// Export singleton
export const diagnostics = new StartupDiagnostics();
