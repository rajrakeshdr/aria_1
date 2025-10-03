# Runtime Logging & Diagnostics Guide

## Overview

The Security Platform now includes comprehensive runtime logging and diagnostics to help debug issues and monitor application behavior.

## Features Added

### 1. **Comprehensive Logger (`/utils/logger.ts`)**

A structured logging utility with multiple log levels and specialized methods:

```typescript
import { logger } from './utils/logger';

// Basic logging
logger.info('Information message');
logger.success('Success message');
logger.warning('Warning message');
logger.error('Error message');
logger.debug('Debug message');

// Specialized logging
logger.navigation('from', 'to', optionalData);
logger.auth('action', optionalData);
logger.api('GET', '/api/endpoint', optionalData);
logger.state('Component', 'state description', optionalData);
logger.render('Component', props);
logger.effect('Component', 'effect description', optionalData);
logger.performance('operation', durationMs);

// Grouped logging
logger.group('Group Label', () => {
  logger.info('Log inside group');
});

// Table logging
logger.table(arrayOfObjects, 'Optional label');
```

### 2. **Runtime Diagnostics Panel (`/components/runtime-diagnostics.tsx`)**

A floating diagnostics panel that appears in development mode:

- **Toggle**: Click the blue floating button in bottom-right corner OR press `Ctrl+Shift+D`
- **Features**:
  - Real-time log viewer
  - Filter logs by level (info, success, warning, error, debug)
  - System information display
  - Clear logs button
  - Expandable data details

### 3. **Startup Diagnostics (`/utils/startup-diagnostics.ts`)**

Automatically runs comprehensive checks on app startup:

- **Environment checks**: Verifies import.meta.env availability
- **DOM checks**: Ensures root element exists
- **Style checks**: Validates CSS variables and Tailwind classes
- **Browser checks**: Confirms required APIs are available
- **Dependency checks**: Verifies React and other critical libraries

Access diagnostics results in the browser console:
```javascript
window.__diagnostics
// Returns: { results: [...], summary: {...} }
```

## Console Output

The app now logs detailed information to the console:

### Startup Logs
```
🎬 Starting Security Platform
⚛️ React version: 18.3.1
🎨 CSS loaded from: ./styles/globals.css
🌐 Environment: development
📍 Base URL: /
✅ Root element found
🔧 Creating React root...
✅ React app mounted successfully
```

### App Initialization
```
🔍 Running Startup Diagnostics
📦 Checking Environment...
✅ Environment: import.meta.env - Environment variables available
🌐 Checking DOM...
✅ DOM: Root Element - Root element (#root) found
🎨 Checking Styles...
✅ Styles: CSS Variables - All critical CSS variables loaded
✅ Styles: Tailwind CSS - Tailwind classes are working
🌍 Checking Browser Compatibility...
✅ Browser: Required APIs - All required browser APIs available
```

### Navigation Logs
```
🧭 Navigation: Landing → Dashboard
```

### Authentication Logs
```
🔐 Auth: Attempting login with provider: google
🌐 API: POST /auth/login/google
⏱️ Performance: Authentication with google took 1002ms
✅ Auth: Authentication successful
```

### State Changes
```
📊 State: App - State changed to: dashboard
```

## Debugging Tips

### 1. View All Logs
Open browser DevTools (F12) and check the Console tab for detailed logs.

### 2. Use the Diagnostics Panel
- Press `Ctrl+Shift+D` to open the floating diagnostics panel
- Filter by log level to focus on specific types of messages
- Expand "View data" sections to see detailed information

### 3. Check Startup Diagnostics
```javascript
// In browser console
window.__diagnostics.summary
// Shows: { total: X, passed: Y, warnings: Z, failed: W }

window.__diagnostics.results
// Shows detailed results for each check
```

### 4. Check CSS Loading
Look for these logs to confirm CSS is working:
```
✅ CSS variables loaded successfully
🎨 Background color: #f8f9fa
✅ Styles: CSS Variables - All critical CSS variables loaded
```

### 5. Monitor Performance
Performance logs show how long operations take:
```
⏱️ Performance: Authentication with google took 1002ms
```

## Production Behavior

In production mode (`NODE_ENV=production`):
- Only error logs are shown
- Diagnostics panel is hidden
- Startup diagnostics still run but with minimal output
- Logger automatically reduces verbosity

## Troubleshooting

### CSS Not Loading
Check console for:
```
⚠️ CSS variables may not be loaded yet
❌ Styles: CSS Variables - No CSS variables found
```

**Fix**: 
1. Check that `/styles/globals.css` is imported in `main.tsx`
2. Verify PostCSS config is correct
3. Check that `@tailwindcss/postcss` is installed

### Environment Variables Not Available
Check console for:
```
⚠️ Environment: import.meta.env - Environment variables not available
```

**Fix**: This is usually fine - the app will use fallback values.

### React Not Mounting
Check console for:
```
❌ Root element not found in DOM
```

**Fix**: Ensure `index.html` contains `<div id="root"></div>`

## Configuration

### Enable/Disable Diagnostics Panel

Edit `/App.tsx`:
```typescript
// Show only in development
{import.meta.env?.MODE === 'development' && <RuntimeDiagnostics />}

// Always show
<RuntimeDiagnostics />

// Never show
{false && <RuntimeDiagnostics />}
```

### Adjust Log Levels

Edit `/utils/logger.ts`:
```typescript
// Change isDevelopment getter to control when logs are shown
private get isDevelopment(): boolean {
  return true; // Always log
  // OR
  return false; // Never log (except errors)
}
```

## API Reference

### Logger Methods

| Method | Description | Example |
|--------|-------------|---------|
| `info()` | Informational messages | `logger.info('App started')` |
| `success()` | Success messages | `logger.success('Login successful')` |
| `warning()` | Warning messages | `logger.warning('Deprecated API')` |
| `error()` | Error messages (always shown) | `logger.error('API failed')` |
| `debug()` | Debug messages | `logger.debug('State:', data)` |
| `navigation()` | Navigation events | `logger.navigation('Home', 'Settings')` |
| `auth()` | Authentication events | `logger.auth('User logged in')` |
| `api()` | API calls | `logger.api('GET', '/api/users')` |
| `state()` | State changes | `logger.state('App', 'loading')` |
| `performance()` | Performance metrics | `logger.performance('Render', 123)` |
| `group()` | Grouped logs | `logger.group('Label', () => {})` |
| `table()` | Tabular data | `logger.table(arrayData)` |

### Diagnostic Categories

| Category | Checks |
|----------|--------|
| Environment | import.meta.env, window object |
| DOM | Root element, document element |
| Styles | CSS variables, Tailwind classes |
| Browser | Required APIs (fetch, Promise, etc.) |
| Dependencies | React and other libraries |

## Support

For issues or questions about logging and diagnostics:
1. Check the console for error messages
2. Review `window.__diagnostics` for detailed startup information
3. Use the Runtime Diagnostics panel (`Ctrl+Shift+D`) to monitor real-time logs
4. Check this guide for troubleshooting tips
