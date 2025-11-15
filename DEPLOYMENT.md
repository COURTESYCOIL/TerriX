# TerriX - Vercel Deployment Guide

## Quick Start (5 minutes)

### Step 1: Prepare Files
All files are ready in the Downloads folder:
- `terrix.html` (main app)
- `package.json` (metadata)
- `vercel.json` (config)
- `README.md` (docs)
- `.gitignore` (git config)

### Step 2: Create GitHub Repository
1. Go to https://github.com/new
2. Create repository: `terrix`
3. Clone locally
4. Copy all files from Downloads folder
5. Commit and push:
```bash
git add .
git commit -m "Initial commit: Territorial.io with TriX Executor v5.8.6"
git push origin main
```

### Step 3: Deploy to Vercel
1. Go to https://vercel.com
2. Click "New Project"
3. Import GitHub repository
4. Configure:
   - **Framework Preset**: `Other`
   - **Build Command**: Leave empty
   - **Output Directory**: `.`
   - **Install Command**: Leave empty
5. Click "Deploy"

### Step 4: Access Your Deployment
- Live URL provided by Vercel
- Share the link to access the application
- Game loads with TriX Executor panel

## File Structure
```
territorial-trix-executor/
├── territorial-trix-combined.html  (main app - 60KB)
├── package.json                     (metadata)
├── vercel.json                      (routing config)
├── README.md                        (documentation)
├── .gitignore                       (git config)
└── DEPLOYMENT.md                    (this file)
```

## Testing Before Deployment

### Local Test
```bash
# Start local server
python -m http.server 8000

# Open in browser
http://localhost:8000/territorial-trix-combined.html
```

Expected behavior:
- [ ] Canvas renders (black background)
- [ ] TriX Executor panel appears bottom-right
- [ ] Notification shows "TriX Executor v5.8.6 Loaded"
- [ ] Tabs can be clicked (Home, Main, Network, Cloud, Settings)
- [ ] Panel can be minimized/maximized/closed

### Vercel Staging
After deployment on Vercel:
- [ ] Visit preview URL
- [ ] Verify all features work
- [ ] Check browser console (no errors)
- [ ] Test all sidebar tabs

## Performance Notes

- **File Size**: ~60KB HTML (contains all code)
- **Load Time**: <2 seconds on typical connection
- **WebSocket**: Direct to territorial.io servers (official)
- **CDN**: Vercel's global CDN (automatic)
- **Caching**: HTML cached, update on redeploy

## Troubleshooting

### Issue: Panel doesn't appear
**Solution**: 
- Check browser console (F12 → Console)
- Ensure JavaScript is enabled
- Try refreshing page

### Issue: Page is blank
**Solution**:
- Verify file is uploaded correctly
- Check Vercel deployment status
- Try different browser

### Issue: WebSocket connection fails
**Solution**:
- This is expected (game server not responding in offline mode)
- Real territorial.io servers will respond when played
- Check browser console for specific errors

## Configuration

### Customize TriX Executor Panel
Edit `territorial-trix-combined.html`:

**Change position**:
```css
.trix-executor {
  bottom: 20px;  /* Change these values */
  right: 20px;
}
```

**Change color scheme**:
```css
.trix-header {
  background: linear-gradient(90deg, #4f46e5, #7c3aed); /* Modify gradient */
}
```

**Change panel size**:
```css
.trix-executor {
  width: 400px;   /* Modify width */
  height: 600px;  /* Modify height */
}
```

## Security

✓ **Clean UI with TerriX sidebar**
✓ **No server backend needed** (static deployment)
✓ **No API keys** required
✓ **HTTPS automatic** (Vercel provides SSL)
✓ **Clean code** (no malware/cheats)

## Updates

To update the application:

1. Edit `territorial-trix-combined.html` locally
2. Update version number in package.json
3. Commit and push to GitHub
4. Vercel auto-redeploys (usually <30 seconds)

## Support

**For Vercel issues**:
- Visit https://vercel.com/support
- Check deployment logs in Vercel dashboard

**For application issues**:
- Check browser console (F12)
- Verify all files are deployed
- Test locally first

**For territorial.io issues**:
- Visit https://territorial.io
- Check game server status

## Next Steps

1. ✅ Files created
2. → Create GitHub repository
3. → Deploy to Vercel
4. → Share live URL
5. → Monitor performance

## Deployment Checklist

- [ ] All files copied to repo
- [ ] GitHub repository created
- [ ] Vercel project linked
- [ ] Deployment successful
- [ ] Live URL working
- [ ] TriX Executor panel visible
- [ ] All tabs functional
- [ ] No console errors
- [ ] Share URL with others

---

**Deployment time**: ~5-10 minutes
**Skill level**: Beginner-friendly
**Costs**: Free (Vercel free tier included)
