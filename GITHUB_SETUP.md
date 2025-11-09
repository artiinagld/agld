# GitHub Setup & Deployment Guide

## Step 1: Create GitHub Repository

1. Go to https://github.com/
2. Click "+" (top right) → "New repository"
3. Repository name: `artiina-backend`
4. Description: "Artiina Gold Authentication Backend API"
5. **Privacy:** Private (recommended for business code)
6. **DO NOT** initialize with README (we already have one)
7. Click "Create repository"

## Step 2: Get Repository URL

After creating, GitHub shows you the repository URL:
```
https://github.com/YOUR_USERNAME/artiina-backend.git
```

**Copy this URL** - you'll need it for Infomaniak!

## Step 3: Upload Code to GitHub

### Option A: Via GitHub Web Interface (Easiest)

1. On your repository page, click "uploading an existing file"
2. Drag and drop ALL files from the `artiina-backend` folder:
   - server.js
   - package.json
   - .env.example
   - .gitignore
   - ecosystem.config.js.example
   - README.md
3. Commit message: "Initial commit - Artiina backend"
4. Click "Commit changes"

### Option B: Via Git Command Line (If you have Git installed)

```bash
# Navigate to your artiina-backend folder
cd artiina-backend

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Artiina backend"

# Connect to GitHub
git remote add origin https://github.com/YOUR_USERNAME/artiina-backend.git

# Push
git branch -M main
git push -u origin main
```

## Step 4: Configure Infomaniak

Back in Infomaniak's Node.js setup:

**Installation method:** Git ✅ (already selected)

**Next parameter - Git Repository URL:**
```
https://github.com/YOUR_USERNAME/artiina-backend.git
```

**Branch:** `main`

**Authentication:** 
- If repository is **private**: You'll need to provide GitHub credentials or deploy key
- If repository is **public**: No authentication needed

## Step 5: Infomaniak Will Ask For:

**Application entry point:**
```
server.js
```

**Node.js version:**
```
18.x or 20.x (latest LTS)
```

**Install dependencies:**
```
Yes (run npm install)
```

**Environment variables:**
You'll need to add these in Infomaniak's panel:
```
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_KEY
ARTIINA_NFT_ADDRESS=0xYOUR_CONTRACT_ADDRESS
PORT=3000
NODE_ENV=production
```

**Process manager:**
```
PM2
```

**Auto-restart:**
```
Yes
```

**Domain:**
```
agld.me
```

## Step 6: After Deployment

**Test your endpoints:**

```bash
# Health check
curl https://agld.me/health

# Root
curl https://agld.me/

# Bead data (after you mint some beads)
curl https://agld.me/A7K9X2M1
```

## Step 7: Update Contract Address

**After you deploy your ArtiinaNFT contract:**

1. Go to Infomaniak panel
2. Find "Environment Variables" section
3. Add/Update:
   ```
   ARTIINA_NFT_ADDRESS=0xYOUR_DEPLOYED_CONTRACT_ADDRESS
   ```
4. Restart the application

## Quick Reference

**GitHub Repository Structure:**
```
artiina-backend/
├── server.js                    (main application)
├── package.json                 (dependencies)
├── .env.example                 (template for env vars)
├── .gitignore                   (what NOT to commit)
├── ecosystem.config.js.example  (PM2 config)
└── README.md                    (documentation)
```

**To update your backend later:**
```bash
# Make changes to code
git add .
git commit -m "Update description"
git push

# Infomaniak will auto-deploy
```

## Common Issues

**Issue: Infomaniak can't access private repository**
Solution: 
- Make repository public, OR
- Generate GitHub deploy key in Infomaniak and add to GitHub

**Issue: npm install fails**
Solution:
- Check package.json is valid
- Verify Node.js version is compatible

**Issue: Server won't start**
Solution:
- Check environment variables are set
- View logs in Infomaniak panel

## Need Help?

- GitHub Docs: https://docs.github.com/
- Infomaniak Support: https://www.infomaniak.com/support
- Node.js Docs: https://nodejs.org/docs/

---

**Next Steps:**
1. ✅ Create GitHub account
2. ✅ Create repository
3. ✅ Upload code files
4. ✅ Copy repository URL
5. ⏳ Continue Infomaniak setup with Git URL
