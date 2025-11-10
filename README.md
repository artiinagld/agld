# Artiina Backend - Secure Deployment Guide

## 🔒 Security First

This backend is designed with security best practices:
- ✅ No hardcoded API keys
- ✅ Environment variables for sensitive data
- ✅ .gitignore protects .env files
- ✅ Only safe files go to GitHub

## 📦 Files Overview

- `server.js` - Main application (safe to commit)
- `package.json` - Dependencies (safe to commit)
- `.gitignore` - Protects sensitive files (safe to commit)
- `.env.example` - Template only (safe to commit)
- `.env` - **NEVER COMMIT THIS!** (created on server only)

## 🚀 Deployment Steps

### Step 1: Upload to GitHub

Upload only these files:
- server.js
- package.json
- .gitignore
- .env.example
- README.md

**DO NOT upload .env file!**

### Step 2: Connect to Server via SSH

```bash
ssh your-username@your-server.infomaniak.com
```

### Step 3: Navigate to Application Directory

```bash
cd /sites/agld.me
# or wherever Infomaniak deployed your app
```

### Step 4: Create .env File on Server

```bash
nano .env
```

Paste this content (with YOUR real values):

```
PORT=3000
NODE_ENV=production
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_ACTUAL_KEY
ARTIINA_NFT_ADDRESS=0x68e00fC57974b9AeDd8f436E207BFf7B673132CC
ARTIINA_VALIDATOR_ADDRESS=0xFE1a6450D2E43881A53f03d7E218CCe252cCb874
```

**Save and exit:**
- Press `Ctrl + X`
- Press `Y`
- Press `Enter`

### Step 5: Install Dependencies

```bash
npm install
```

### Step 6: Test Locally

```bash
npm start
```

You should see:
```
🚀 Artiina backend running on port 3000
📡 Connected to RPC (hidden for security)
📝 Contract: 0x68e00fC57974b9AeDd8f436E207BFf7B673132CC
✅ All environment variables loaded successfully
```

### Step 7: Setup PM2 (Process Manager)

```bash
# Install PM2 globally (if not already installed)
npm install -g pm2

# Start application with PM2
pm2 start server.js --name artiina-backend

# Save PM2 configuration
pm2 save

# Setup auto-start on server reboot
pm2 startup
```

### Step 8: Verify It's Working

```bash
curl http://localhost:3000/health
```

Should return:
```json
{
  "status": "ok",
  "timestamp": "...",
  "contractConfigured": true,
  "network": "sepolia"
}
```

## 🔍 Checking Environment Variables

To verify your .env is loaded:

```bash
# View the file (but don't share this output!)
cat .env

# Check if variables are set
echo $SEPOLIA_RPC_URL
```

## 🛡️ Security Checklist

- [ ] .env file created only on server (not in GitHub)
- [ ] .gitignore includes .env
- [ ] No API keys in server.js
- [ ] GitHub repository is private (recommended)
- [ ] Alchemy API key is kept secret
- [ ] Server has firewall configured

## 🔄 Updating the Application

When you make changes:

1. Update code in GitHub (only safe files)
2. SSH into server
3. Pull latest code: `git pull origin main`
4. Restart PM2: `pm2 restart artiina-backend`

The .env file stays on the server and is never touched!

## 📊 Monitoring

```bash
# View logs
pm2 logs artiina-backend

# Check status
pm2 status

# Monitor in real-time
pm2 monit
```

## ❓ Troubleshooting

**"Environment variable not set" error:**
- Check .env file exists: `ls -la .env`
- Check .env content: `cat .env`
- Restart application: `pm2 restart artiina-backend`

**"Cannot connect to RPC" error:**
- Verify Alchemy URL is correct
- Check Alchemy dashboard for API status
- Test URL: `curl YOUR_ALCHEMY_URL`

**"Contract not configured" error:**
- Verify contract address in .env
- Check on Etherscan that contract exists

## 🎯 Endpoints

- `GET /` - API information
- `GET /health` - Health check
- `GET /{beadId}` - Get bead data (e.g., /4B68MAQH)

## 📝 Notes

- This setup works for both Infomaniak and any VPS
- Environment variables can also be set via hosting panel (if available)
- Keep .env file permissions restricted: `chmod 600 .env`

---

**Built with ❤️ for Artiina by Marina**
