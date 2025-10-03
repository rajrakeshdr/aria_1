# 🛡️ AI-Powered Security Platform

A comprehensive, modern security operations platform featuring AI-powered threat detection, workflow automation, and intelligent analytics. Built with React, TypeScript, Tailwind CSS v4, and Supabase.

![Security Platform](https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&h=400&fit=crop)

## ✨ Features

### 🎯 Core Features
- **AI-Powered Search** - Natural language security data queries powered by Groq AI
- **OAuth Authentication** - Google, Microsoft, and SSO integration via Supabase
- **Role-Based Access Control** - Admin and regular user permissions
- **Real-time Dashboard** - Live security metrics and threat monitoring
- **Workflow Builder** - Visual workflow automation with drag-and-drop
- **Workspace Canvas** - Interactive security analysis workspace
- **Dark/Light Theme** - Fully themed UI with smooth transitions

### 🔐 Security Features
- **Multi-factor Authentication** - Secure login flows
- **Session Management** - Automatic timeout and renewal
- **Encrypted Storage** - Secure data handling with Supabase
- **Audit Logging** - Complete activity tracking
- **Role-based Permissions** - Granular access control

### 🎨 User Experience
- **Responsive Design** - Mobile, tablet, and desktop optimized
- **Smooth Animations** - Motion-powered transitions
- **Particle Backgrounds** - Dynamic visual effects
- **Guest Mode** - Try features before signing in
- **File Upload** - Drag-and-drop security file analysis

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn
- Git
- Supabase account (for authentication and backend)
- Groq API key (optional, for real AI responses)

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd security-platform
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**
```bash
cp .env.example .env
```

4. **Start development server**
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## 📦 Deployment

### Deploy to Vercel (Recommended)

1. **Push to Git**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Deploy to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your repository
   - Vercel will auto-detect settings
   - Click "Deploy"

3. **Configure Environment Variables** (Optional)
   - Add `GROQ_API_KEY` in Vercel project settings for real AI responses
   - Supabase variables are pre-configured

4. **Deploy Supabase Functions**
```bash
npm install -g supabase
supabase login
supabase link --project-ref ahslronvfhprpanrvozy
supabase functions deploy server
```

For detailed deployment instructions, see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

## 🏗️ Tech Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- **Motion** - Animations
- **Shadcn/ui** - Component library
- **Lucide React** - Icons
- **Recharts** - Data visualization
- **React Hook Form** - Form management
- **Zod** - Schema validation

### Backend
- **Supabase** - Authentication, database, and edge functions
- **Hono** - Web server framework (Supabase Edge Functions)
- **Groq API** - AI-powered search

### Build Tools
- **Vite** - Build tool and dev server
- **PostCSS** - CSS processing
- **ESLint** - Code linting
- **TypeScript** - Type checking

## 📁 Project Structure

```
security-platform/
├── components/              # React components
│   ├── ui/                 # Shadcn UI components
│   ├── figma/              # Figma integration components
│   ├── landing-page.tsx    # Landing page
│   ├── dashboard.tsx       # Main dashboard
│   ├── sign-in.tsx         # Authentication
│   ├── sign-up.tsx         # User registration
│   ├── workspace-canvas-improved.tsx
│   ├── workflow-builder-improved.tsx
│   └── ...
├── styles/
│   └── globals.css         # Global styles and Tailwind config
├── utils/
│   ├── groq-client.tsx     # AI search client
│   └── supabase/           # Supabase utilities
├── supabase/
│   └── functions/
│       └── server/         # Edge functions
│           ├── index.tsx   # API routes
│           └── kv_store.tsx # Key-value storage
├── App.tsx                 # Main app component
├── main.tsx               # App entry point
├── index.html             # HTML template
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # TypeScript config
├── tailwind.config.js     # Tailwind config
└── package.json           # Dependencies
```

## 🎯 Key Components

### Landing Page
- AI-powered search input with suggestions
- Guest search capability
- File upload for security analysis
- Animated particle background
- Theme toggle

### Authentication
- Sign in/Sign up flows
- OAuth integration (Google, Microsoft, SSO)
- Session management
- Role assignment

### Dashboard
- Quick stats cards (admin only)
- Recent activity feed
- Security alerts
- Module navigation
- User profile management

### Workspace Canvas
- Interactive security analysis
- AI-powered insights
- Tab-based organization
- Real-time collaboration ready

### Workflow Builder
- Visual node editor
- Drag-and-drop interface
- Node connections
- Template library

## 🔧 Configuration

### Theme Customization
Edit `styles/globals.css` to customize colors and design tokens:

```css
:root {
  --primary: #3b82f6;
  --background: #f8f9fa;
  --foreground: #1a1d29;
  /* ... more variables */
}

.dark {
  --background: #0a0e1a;
  --foreground: #e5e7eb;
  /* ... dark theme variables */
}
```

### API Configuration
The Supabase backend is pre-configured. To add custom API routes:

1. Edit `/supabase/functions/server/index.tsx`
2. Add new routes with prefix `/make-server-448e58af/`
3. Deploy with `supabase functions deploy server`

## 📊 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 🔐 Security Best Practices

- ✅ All sensitive keys kept in environment variables
- ✅ SUPABASE_SERVICE_ROLE_KEY never exposed to frontend
- ✅ CORS properly configured on API endpoints
- ✅ Input validation with Zod schemas
- ✅ XSS protection with React's built-in escaping
- ✅ HTTPS enforced in production

## 🐛 Troubleshooting

### Build Issues
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Supabase Connection Issues
- Verify project ID in `utils/supabase/info.tsx`
- Check Supabase project is active
- Ensure edge functions are deployed

### AI Search Not Working
- Works in demo mode without GROQ_API_KEY
- For real AI: Add GROQ_API_KEY to Supabase environment variables
- Check backend logs in Supabase dashboard

## 📚 Documentation

- [Deployment Guide](./DEPLOYMENT_GUIDE.md) - Complete deployment instructions
- [User Guide](./USER_GUIDE.md) - End-user documentation
- [Improvements Log](./IMPROVEMENTS.md) - Changelog and updates
- [Fixed Errors](./FIXED_ERRORS.md) - Bug fix history

## 🤝 Contributing

This is a production application. For bug reports or feature requests, please follow these steps:

1. Check existing issues
2. Create a detailed bug report or feature request
3. Include screenshots and reproduction steps
4. Reference any error logs

## 📄 License

Copyright © 2025. All rights reserved.

## 🙏 Acknowledgments

- **Shadcn/ui** - Beautiful component library
- **Supabase** - Backend infrastructure
- **Groq** - AI capabilities
- **Lucide** - Icon set
- **Tailwind CSS** - Styling framework
- **Motion** - Animation library

## 📞 Support

For support or questions:
- Check the [User Guide](./USER_GUIDE.md)
- Review the [Deployment Guide](./DEPLOYMENT_GUIDE.md)
- Check Supabase function logs for backend issues
- Check browser console for frontend errors

---

**Built with ❤️ for security professionals**

🚀 **Ready to deploy on Vercel!**
