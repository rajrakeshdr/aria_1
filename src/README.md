# Cybersecurity AI Search

A sophisticated AI-powered search application focused on cybersecurity, featuring a beautiful gradient UI and interactive chat interface powered by Groq API.

## Features

- 🔒 **Cybersecurity-Focused**: Specialized AI assistant trained on security topics
- 🎨 **Beautiful UI**: Dark gradient theme with purple/pink accents
- 💬 **Interactive Chat**: Real-time conversation interface
- 🔐 **Secure Backend**: API keys protected via Supabase Edge Functions
- ⚡ **Fast Responses**: Powered by Groq's Mixtral model

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Supabase Edge Functions (Deno)
- **AI**: Groq API (Mixtral-8x7b model)
- **Icons**: Lucide React

## Deployment to Vercel

### Prerequisites

1. A Groq API key (get one at https://console.groq.com)
2. A Supabase project (created via Figma Make)

### Environment Variables

When deploying to Vercel, you'll need to configure these environment variables in your Supabase project:

- `GROQ_API_KEY` - Your Groq API key

These are already configured in your Figma Make Supabase backend.

### Deployment Steps

1. **Push to GitHub**: Push this repository to GitHub

2. **Import to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

3. **Configure Build Settings**:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`

4. **Deploy**: Click "Deploy" and Vercel will build and deploy your application

### Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

## Project Structure

```
/
├── components/
│   ├── LandingPage.tsx      # Initial search page
│   ├── ChatInterface.tsx    # Interactive chat view
│   ├── SearchBar.tsx        # Reusable search input
│   └── ChatMessage.tsx      # Message bubble component
├── imports/
│   ├── svg-qxfoti4d98.ts    # SVG path definitions
│   └── Thumbnail.tsx        # Original Figma import
├── supabase/
│   └── functions/
│       └── server/
│           └── index.tsx    # Backend API endpoints
├── styles/
│   └── globals.css          # Global styles and theme
├── utils/
│   └── supabase/
│       └── info.tsx         # Supabase connection config
└── App.tsx                  # Main application component
```

## API Endpoints

### POST /make-server-f8eac8da/search

Searches using the Groq AI model with cybersecurity context.

**Request:**
```json
{
  "query": "What is a zero-day vulnerability?"
}
```

**Response:**
```json
{
  "response": "A zero-day vulnerability is...",
  "model": "mixtral-8x7b-32768",
  "usage": { ... }
}
```

### GET /make-server-f8eac8da/health

Health check endpoint.

## Color Schema

The application uses a consistent color scheme across all pages:

- **Background Gradient**: `#0e0719` → `#100c23` → `#181c49`
- **Primary Accent**: `#de55de` (Purple)
- **Secondary Accent**: `#ec83bb` (Pink)
- **Surface**: `#1c1f28` (Dark gray)
- **Text**: White with varying opacity

## Security Notes

- API keys are never exposed to the frontend
- All AI requests are proxied through Supabase Edge Functions
- CORS is properly configured for secure communication
- Environment variables are managed securely via Supabase

## License

MIT
