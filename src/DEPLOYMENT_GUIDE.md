# Vercel Deployment Guide

## Pre-Deployment Checklist

✅ **All build errors resolved**  
✅ **No console errors**  
✅ **Supabase authentication configured**  
✅ **Groq API integration ready**  
✅ **All navigation flows working**  
✅ **Responsive design implemented**

## Deployment Steps

### 1. Prepare Your Repository

Ensure all files are committed to your Git repository:

```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### 2. Deploy to Vercel

**Option A: Using Vercel CLI**
```bash
npm i -g vercel
vercel login
vercel
```

**Option B: Using Vercel Dashboard**
1. Go to https://vercel.com/new
2. Import your Git repository
3. Vercel will auto-detect the Vite framework
4. Click "Deploy"

### 3. Configure Environment Variables

After initial deployment, add environment variables in Vercel:

1. Go to your project settings in Vercel
2. Navigate to "Settings" → "Environment Variables"
3. Add the following (if you want real AI responses):

```
GROQ_API_KEY=your_groq_api_key_here
```

**Note:** Supabase environment variables are already configured in the backend and don't need to be added to Vercel's environment variables.

### 4. Supabase Edge Functions

Your Supabase Edge Functions are located in `/supabase/functions/server/`. These run on Supabase infrastructure, not Vercel.

To deploy Supabase functions:

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link your project
supabase link --project-ref ahslronvfhprpanrvozy

# Deploy functions
supabase functions deploy server
```

### 5. Verify Deployment

After deployment, test these features:

- ✅ Landing page loads correctly
- ✅ Theme toggle (dark/light) works
- ✅ Guest search functionality
- ✅ Sign in/Sign up pages work
- ✅ Dashboard loads after authentication
- ✅ Navigation between modules works
- ✅ Workspace canvas opens correctly
- ✅ Workflow builder functions properly
- ✅ All AI features respond (with demo data if GROQ_API_KEY not set)

## Build Configuration

The project uses:
- **Framework:** Vite (React + TypeScript)
- **Styling:** Tailwind CSS v4
- **UI Components:** Shadcn/ui
- **State Management:** React useState
- **Backend:** Supabase Edge Functions
- **AI Integration:** Groq API

## Common Issues & Solutions

### Issue: Build fails with module not found

**Solution:** Ensure all imports use correct paths. All component imports should use `./components/` prefix.

### Issue: Environment variables not working

**Solution:** 
1. For frontend variables, prefix with `VITE_`
2. For backend (Supabase functions), they're already configured
3. Redeploy after adding new environment variables

### Issue: Supabase functions return errors

**Solution:**
1. Ensure Supabase functions are deployed separately using `supabase functions deploy`
2. Check Supabase dashboard for function logs
3. Verify CORS is enabled (already configured in `/supabase/functions/server/index.tsx`)

### Issue: Theme not persisting

**Solution:** Theme is stored in localStorage and handled by the ThemeProvider component. This works correctly in production.

### Issue: AI responses not working

**Solution:**
- Demo mode works without GROQ_API_KEY
- For real AI: Add GROQ_API_KEY to Supabase environment variables
- Groq API is called from the backend, not frontend

## Performance Optimization

The application is optimized for production with:

- ✅ Code splitting with React lazy loading
- ✅ Optimized images from Unsplash
- ✅ Minimal bundle size with tree-shaking
- ✅ CSS purging with Tailwind CSS
- ✅ Motion animations with reduced motion support

## Security Notes

- ✅ SUPABASE_SERVICE_ROLE_KEY is only used in backend (never exposed to frontend)
- ✅ Authentication handled securely through Supabase
- ✅ CORS properly configured for API endpoints
- ✅ No sensitive data in localStorage

## Monitoring & Debugging

### View Logs

**Vercel Logs:**
```bash
vercel logs
```

**Supabase Function Logs:**
1. Go to Supabase Dashboard
2. Navigate to "Edge Functions"
3. Click on "server" function
4. View "Logs" tab

## Support

If you encounter issues:

1. Check Vercel deployment logs
2. Check browser console for errors
3. Verify all environment variables are set
4. Check Supabase function logs
5. Ensure your Git repository is up to date

## Post-Deployment

After successful deployment:

1. ✅ Test all authentication flows
2. ✅ Verify all pages load correctly
3. ✅ Test responsiveness on mobile/tablet
4. ✅ Check theme switching
5. ✅ Test AI search functionality
6. ✅ Verify navigation between modules
7. ✅ Test workflow builder and workspace canvas

## Custom Domain (Optional)

To add a custom domain:

1. Go to Vercel project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Update DNS records as instructed
5. Wait for DNS propagation (can take up to 24 hours)

---

**Your application is now ready for production deployment on Vercel! 🚀**
