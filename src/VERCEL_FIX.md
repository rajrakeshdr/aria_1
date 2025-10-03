# Vercel Deployment Fix & Groq Connector Update

## Changes Made

### 1. Fixed Vercel Build Output Directory Error ✅

**Problem:** Vercel couldn't find the "dist" output directory after build.

**Solution:** Updated `/vercel.json` to explicitly specify the output directory:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "installCommand": "npm install"
}
```

### 2. Transformed Groq from Environment Variable to Connector ✅

**Previous Approach:** Groq API key stored as environment variable
**New Approach:** Groq configured as a full-featured connector in Apps & Connectors

#### What Changed:

1. **Removed Environment Variable Dependency**
   - No longer requires `GROQ_API_KEY` environment variable
   - Configuration now managed through the UI

2. **Added Groq AI Connector**
   - Located in **Apps & Connectors** section
   - Category: **AI Models**
   - Includes pre-configured Groq AI connector

3. **Features Implemented:**
   - ✅ **Edit Configuration** - Click edit to modify settings
   - ✅ **API Key Management** - Secure password input field
   - ✅ **Model Selection** - Choose from available Groq models:
     - Llama 3.3 70B (Versatile) - Recommended
     - Llama 3.1 70B (Versatile)
     - Llama 3.1 8B (Instant)
     - Mixtral 8x7B
     - Gemma 7B IT
   - ✅ **System Prompt** - Customize AI behavior
   - ✅ **Base URL Configuration** - Modify API endpoint if needed
   - ✅ **Test Connection** - Verify configuration works
   - ✅ **Save Configuration** - Persist changes

## How to Use Groq Connector

### Step 1: Navigate to Apps & Connectors
1. Log in to the platform
2. From the dashboard, click on **Apps & Connectors** module

### Step 2: Configure Groq AI
1. Find **Groq AI** in the connector list (purple AI brain icon)
2. Click the **three dots menu** → **Edit**
3. Enter your configuration:
   - **API Key**: Your Groq API key
   - **Model**: Select your preferred model
   - **System Prompt**: Define AI behavior (default provided)
   - **Base URL**: Leave as default unless using custom endpoint

### Step 3: Test Connection
1. Click **Test Connection** button
2. Wait for verification (2-3 seconds)
3. Confirm success message

### Step 4: Save Configuration
1. Click **Save Configuration**
2. Configuration is now active platform-wide

## Deployment Instructions

### Deploy to Vercel

```bash
# Install dependencies
npm install

# Build the project (verify it works locally)
npm run build

# Deploy to Vercel
vercel --prod
```

### Environment Variables (Optional)

The platform no longer requires Groq environment variables. However, if you want to pre-configure other services, you can set:

- `SUPABASE_URL` - Your Supabase project URL (if using backend)
- `SUPABASE_ANON_KEY` - Your Supabase anon key (if using backend)

## File Changes Summary

### Modified Files:
1. `/vercel.json` - Added outputDirectory specification
2. `/components/connector-framework.tsx` - Complete rewrite with:
   - AI model connector support
   - Groq AI pre-configured
   - Edit, test, and save functionality
   - Model selection dropdown
   - System prompt configuration
3. `/utils/groq-client.tsx` - Updated to use connector config instead of env vars

### New Features in Connector Framework:
- **AI Models Category** - Dedicated section for AI connectors
- **Groq Connector** - Pre-configured with Llama 3.3 70B model
- **Edit Dialog** - Comprehensive configuration interface
- **Test Connection** - Verify API connectivity
- **Model Selector** - Choose from 5 Groq models
- **System Prompt Editor** - Customize AI behavior
- **Secure API Key Storage** - Password-masked input

## Benefits of New Approach

1. **No Environment Variables** - Easier deployment, no .env file needed
2. **UI-Based Configuration** - Configure through beautiful interface
3. **Multi-Model Support** - Switch between models without code changes
4. **Test Before Deploy** - Verify configuration before saving
5. **Better UX** - Non-technical users can manage AI settings
6. **Scalable** - Easy to add more AI providers (OpenAI, Claude, etc.)

## Next Steps

1. Deploy to Vercel with `vercel --prod`
2. Navigate to Apps & Connectors
3. Configure your Groq API key
4. Test the connection
5. Start using AI-powered features!

## Troubleshooting

### Build fails with TypeScript errors
```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

### Vercel still can't find dist directory
- Ensure `vercel.json` has `"outputDirectory": "dist"`
- Check that `vite.config.ts` has `outDir: 'dist'`
- Verify build command is `npm run build`

### Groq API not working
1. Verify API key is correct in connector settings
2. Test connection using the built-in test button
3. Check model selection matches your Groq account capabilities
4. Ensure base URL is correct: `https://api.groq.com/openai/v1`

## Support

For issues or questions:
1. Check connector status in Apps & Connectors
2. Use Test Connection to diagnose issues
3. Verify API key in Groq dashboard
4. Check browser console for detailed error messages
