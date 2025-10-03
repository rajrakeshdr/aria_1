# ⚡ Quick Deploy Guide

## 🚀 Deploy in 5 Minutes

### Step 1: Verify Build (30 seconds)
```bash
npm install
npm run build
```
✅ Should complete without errors

### Step 2: Test Locally (30 seconds)
```bash
npm run preview
```
✅ Visit http://localhost:4173 and verify it works

### Step 3: Push to Git (1 minute)
```bash
git add .
git commit -m "Ready for production deployment"
git push origin main
```

### Step 4: Deploy to Vercel (2 minutes)

**Option A: Vercel CLI**
```bash
npm i -g vercel
vercel login
vercel --prod
```

**Option B: Vercel Dashboard** (Recommended for first deploy)
1. Go to https://vercel.com/new
2. Click "Import Project"
3. Select your repository
4. Click "Deploy"
5. ✅ Done!

### Step 5: Deploy Backend (1 minute)
```bash
npm install -g supabase
supabase login
supabase link --project-ref ahslronvfhprpanrvozy
supabase functions deploy server
```

---

## 🎯 That's It!

Your app is now live at: `https://your-project.vercel.app`

---

## 🔧 Optional: Add Groq API

For real AI responses (optional - demo mode works fine):

1. Get API key from https://console.groq.com
2. In Supabase Dashboard:
   - Go to Project Settings
   - Edge Functions
   - Add secret: `GROQ_API_KEY`
3. Redeploy functions: `supabase functions deploy server`

---

## ✅ Verify Deployment

Visit your Vercel URL and test:
- [ ] Landing page loads
- [ ] Theme toggle works
- [ ] Sign in works
- [ ] Dashboard loads
- [ ] Navigation works

---

## 📊 Deployment Info

- **Build Time**: ~2-3 minutes
- **Framework**: Auto-detected (Vite)
- **Node Version**: 18.x or later
- **Output**: `dist/` directory

---

## 🆘 Quick Fixes

**Build fails?**
```bash
rm -rf node_modules dist
npm install
npm run build
```

**Can't push to Git?**
```bash
git status
git add .
git commit -m "Deploy fix"
git push
```

**Vercel not deploying?**
- Check build logs in Vercel dashboard
- Ensure repository is connected
- Verify branch is `main` (or your default)

---

## 📞 Need Help?

See complete guides:
- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - Full instructions
- [VERCEL_DEPLOYMENT_CHECKLIST.md](./VERCEL_DEPLOYMENT_CHECKLIST.md) - Detailed checklist
- [PRODUCTION_READY.md](./PRODUCTION_READY.md) - Verification status

---

**Ready to deploy? Just run:**
```bash
vercel --prod
```

🎉 **Happy Deploying!**
