import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/globals.css';
import { diagnostics } from './utils/startup-diagnostics';

// Runtime logging
console.log('🎬 Starting Security Platform');
console.log('⚛️ React version:', React.version);
console.log('🎨 CSS loaded from:', './styles/globals.css');
console.log('🌐 Environment:', import.meta.env?.MODE || 'development');
console.log('📍 Base URL:', import.meta.env?.BASE_URL || '/');

const root = document.getElementById('root');

if (!root) {
  console.error('❌ Root element not found in DOM');
  throw new Error('Root element not found');
}

console.log('✅ Root element found');
console.log('🔧 Creating React root...');

// Run comprehensive diagnostics
setTimeout(async () => {
  try {
    await diagnostics.runAll();
    const summary = diagnostics.getSummary();
    
    // Store diagnostics in window for debugging
    (window as any).__diagnostics = {
      results: diagnostics.getResults(),
      summary
    };
    
    console.log('💾 Diagnostics saved to window.__diagnostics');
  } catch (error) {
    console.error('❌ Error running diagnostics:', error);
  }
}, 500);

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

console.log('✅ React app mounted successfully');
