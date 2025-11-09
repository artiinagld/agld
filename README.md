# Artiina Gold Authentication Backend

Node.js backend API for Artiina luxury jewelry authentication system. Provides dynamic JSON endpoints for blockchain-based NFT verification.

## 🎯 Purpose

This backend serves the `agld.me/{BeadId}` endpoints that:
- Read authentication data from Ethereum blockchain
- Provide JSON responses for Chainlink oracle validation
- Support the Artiina NFT authentication system

## 🏗️ Architecture

```
User/Oracle Request → agld.me/A7K9X2M1
                         ↓
                    Node.js Server
                         ↓
                  Ethereum Blockchain
                         ↓
                    JSON Response
```

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Ethereum RPC endpoint (Alchemy, Infura, or similar)
- Deployed ArtiinaNFT contract address

## 🚀 Quick Start

### 1. Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/artiina-backend.git
cd artiina-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` with your values:
```env
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_KEY
ARTIINA_NFT_ADDRESS=0xYOUR_CONTRACT_ADDRESS
PORT=3000
```

### 4. Run Server

Development:
```bash
npm run dev
```

Production:
```bash
npm start
```

## 📡 API Endpoints

### Health Check
```
GET /health
```

Response:
```json
{
  "status": "ok",
  "timestamp": "2025-11-09T10:30:00.000Z",
  "contractConfigured": true
}
```

### Get Bead Data
```
GET /{beadId}
```

Example: `GET /A7K9X2M1`

Response:
```json
{
  "beadId": "A7K9X2M1",
  "sku": "AGLD-001-24K",
  "version": 0,
  "genesisCID": "QmXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXx",
  "tokenId": 1,
  "validated": true,
  "isValid": true,
  "transfers": 0,
  "createdAt": "2025-11-09T10:30:00.000Z",
  "lastUpdate": "2025-11-09T10:30:00.000Z",
  "blockchainVerified": true,
  "network": "sepolia",
  "contractAddress": "0x..."
}
```

### Root Endpoint
```
GET /
```

Returns API information and available endpoints.

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port (default: 3000) | No |
| `NODE_ENV` | Environment (production/development) | No |
| `SEPOLIA_RPC_URL` | Ethereum Sepolia RPC endpoint | Yes |
| `ARTIINA_NFT_ADDRESS` | ArtiinaNFT contract address | Yes |

### Getting an RPC Endpoint

**Alchemy (Recommended):**
1. Sign up at https://www.alchemy.com/
2. Create new app (Ethereum → Sepolia)
3. Copy HTTPS URL

**Infura:**
1. Sign up at https://infura.io/
2. Create new project
3. Select Sepolia network
4. Copy endpoint URL

## 🔒 Security Notes

- Never commit `.env` file (already in `.gitignore`)
- Use environment variables for all sensitive data
- Keep RPC URLs private
- Rotate API keys regularly

## 📦 Deployment

### With PM2 (Recommended)

```bash
# Install PM2 globally
npm install -g pm2

# Start application
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Setup auto-start on boot
pm2 startup
```

### With Infomaniak

1. Push code to GitHub
2. Configure Infomaniak to pull from Git repository
3. Set environment variables in Infomaniak panel
4. Deploy!

## 🧪 Testing

Test the API locally:

```bash
# Health check
curl http://localhost:3000/health

# Get bead data (replace with real BeadId after minting)
curl http://localhost:3000/A7K9X2M1
```

## 📝 Oracle Validation

This API is designed to work with Chainlink oracles. The oracle validates:

✅ BeadId matches
✅ SKU matches blockchain data
✅ Version is correct
✅ GenesisCID matches blockchain
✅ Data consistency with IPFS

## 🔄 Update Workflow

```bash
# Make changes to code
git add .
git commit -m "Your update message"
git push origin main

# Infomaniak auto-deploys from Git
# Or manually restart: pm2 restart artiina-backend
```

## 📊 Monitoring

View logs with PM2:
```bash
pm2 logs artiina-backend
pm2 monit
```

## 🆘 Troubleshooting

**Error: Contract address not set**
- Check `.env` file has `ARTIINA_NFT_ADDRESS`

**Error: Cannot connect to RPC**
- Verify `SEPOLIA_RPC_URL` is correct
- Check Alchemy/Infura API key is valid

**Error: Bead not found**
- BeadId doesn't exist on blockchain
- Check contract is deployed and accessible

## 📞 Support

- Email: [email protected]
- Documentation: https://docs.artiina.com

## 📄 License

Proprietary - Üppick GmbH (Artiina Brand)

---

**Built with ❤️ in Switzerland 🇨🇭**
