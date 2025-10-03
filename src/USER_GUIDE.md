# Security Platform User Guide

## 🚀 Getting Started

### Navigation Flow
```
Landing Page → Sign In/Sign Up → Dashboard → Modules
```

### Quick Access
- **Sign In**: Click "Sign In" button on landing page
- **Dashboard**: Central hub for all security modules
- **Modules**: Click any module card to access specific features

## 🔐 Authentication

### Demo Credentials
The app is currently in **demo mode**. You can:
- Enter any email and password to sign in
- Click "Google" or "GitHub" for instant demo login
- Create new account with any details

### Real Authentication (Production)
To enable real Supabase authentication, add environment variables and the system will automatically switch from demo mode.

## 🏠 Dashboard

### Quick Access Modules

1. **Environments** (Blue)
   - Set up security environments
   - Configure cloud integrations
   - 3 environments available

2. **Workspaces** (Purple)
   - Collaborative analysis canvas
   - AI-powered security queries
   - 7 workspaces available

3. **Workflows** (Green)
   - Automation builder with visual flow
   - Connect security tools
   - 12 workflows available

4. **Connectors** (Orange/Red)
   - Integration library
   - Docker support
   - 28 connectors available

5. **Data Inventory** (Yellow/Orange)
   - Security datasets
   - File upload and analysis
   - 45 datasets available

6. **AI Agents** (Violet/Purple) ✨
   - **AI-powered** automation
   - Smart threat detection
   - 8 agents available

### Security Metrics
- **Threat Level**: Current security posture
- **Active Incidents**: Real-time alerts
- **System Health**: Infrastructure status
- **Data Processed**: Volume analytics

## 🎨 Workspace Canvas

### Features
- **Tab Navigation**: Overview | Queries | Canvases | Alerts | Workflows
- **Canvas Library**: Pre-built security templates
- **AI Search**: Ask security questions in natural language
- **File Upload**: Upload logs, CSVs, JSON for analysis

### Using AI Search
1. Type your security question in the bottom input
2. Optionally upload a file using the upload button
3. Click "Execute" or press Enter
4. View AI-generated response above

### Pre-built Canvas Suggestions
- **Identity and Asset Inventory**: Track users, roles, devices
- **Cloud Posture**: Monitor configurations and exposures  
- **Threat Monitoring**: Analyze events and alerts

### Sample Queries
```
"Show me all failed login attempts in the last 24 hours"
"Analyze cloud security misconfigurations"
"Identify suspicious user behavior patterns"
"What are the current threat indicators?"
```

## ⚙️ Workflow Builder

### Views
- **List View**: See all workflows with stats
- **Canvas View**: Visual workflow editor

### Building a Workflow

#### 1. Create New Workflow
- Click "New Workflow" button
- Enter name and description
- Start with blank canvas

#### 2. Add Nodes
Drag modules from left panel:

**INTEGRATIONS**
- CrowdStrike (Red shield)
- Splunk (Green database)
- AWS Security (Orange database)

**AI AGENTS** ✨
- AI Storyline (Purple brain)
- AI Enrichment (Yellow sparkles)
- AI Detection (Red alert)
- Notify (Blue mail)

**LOGIC**
- Filter (Gray)
- Condition (Green branch)
- Scheduler (Blue clock)
- Aggregator (Purple database)

#### 3. Connect Nodes
- Nodes show connection points (circles)
- Blue circle on right = output
- Green circle on left = input
- Click sample workflow to see connections in action

#### 4. Visual Flow
- **Animated connections** show data flow
- **Curved lines** between connected nodes
- **Moving dots** indicate active processing
- **Status indicators** on each node

### Sample Workflows
The app includes pre-built workflows:
- Threat Detection Pipeline
- Security Alert Enrichment
- Compliance Monitoring
- Incident Response Automation
- User Behavior Analytics

## 🔌 Connectors

### Integration Categories
- **Cloud Platforms**: AWS, Azure, GCP
- **SIEM Tools**: Splunk, Sentinel, Chronicle
- **EDR Solutions**: CrowdStrike, Carbon Black
- **Custom**: Docker containers, APIs

### View Modes
- Grid View
- List View
- Category View

## 🎯 Best Practices

### Security Canvas
1. Start with pre-built templates
2. Customize based on your environment
3. Use AI suggestions for optimization
4. Upload relevant data files for context

### Workflow Automation
1. Begin with simple integrations
2. Add AI agents for enrichment
3. Connect nodes in logical sequence
4. Test before activating

### AI Features
- Always marked with ✨ Sparkles or 🧠 Brain icons
- Provide context in queries for better results
- Review AI suggestions before implementation

## 🎨 Theme & Customization

### Toggle Dark/Light Mode
- Click sun/moon icon in dashboard header
- Preference saved automatically

### Color Coding
- **Blue**: Primary actions, information
- **Purple**: AI features
- **Green**: Active, success, healthy
- **Yellow**: Warnings, moderate priority
- **Red**: Critical, high priority, errors
- **Orange**: Integrations, data

## 🔍 Tips & Tricks

### Dashboard
- Hover over module cards for preview
- Badge numbers show item counts
- Recent activity shows team actions
- Admin panel (admins only) shows org metrics

### Workspace
- Use keyboard shortcut Enter to execute queries
- Upload multiple file types: CSV, JSON, TXT, LOG, PDF
- Tab between different workspace views
- Invite team members for collaboration

### Workflows
- Drag nodes anywhere on canvas
- Zoom and pan for large workflows
- Click nodes to select and configure
- Use sample workflows as templates

## 🛟 Support

### Common Issues
- **No AI response**: Demo mode provides simulated responses
- **OAuth not working**: Configure providers in production
- **Upload fails**: Check file size and format

### Getting Help
- Check console for error messages
- Review IMPROVEMENTS.md for setup details
- Ensure all environment variables are set for production

## 🚀 Going to Production

1. Configure Supabase authentication
2. Add Groq API key for real AI
3. Set up OAuth providers
4. Configure backend endpoints
5. Test all integrations
6. Deploy server functions

See IMPROVEMENTS.md for detailed production setup instructions.