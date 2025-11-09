require('dotenv').config();
const express = require('express');
const { ethers } = require('ethers');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Blockchain configuration
// TEMPORARY: Hardcoded for testing (move back to .env later)
const SEPOLIA_RPC = process.env.SEPOLIA_RPC_URL || 'https://eth-sepolia.g.alchemy.com/v2/w_pZXg7vRo8iaqptsJyH1';
const ARTIINA_NFT_ADDRESS = process.env.ARTIINA_NFT_ADDRESS || '0x68e00fC57974b9AeDd8f436E207BFf7B673132CC';

// Initialize provider
const provider = new ethers.JsonRpcProvider(SEPOLIA_RPC);

// ArtiinaNFT Contract ABI (minimal - only what we need to read)
const ARTIINA_NFT_ABI = [
  "function beads(string) view returns (string id, string sku, uint256 createdAt, bool validated, bool isValid, uint256 currentVersion, uint256 lastUpdate, string genesisCID)",
  "function exists(string) view returns (bool)",
  "function beadToToken(string) view returns (uint256)",
  "function getBeadMetadata(string) view returns (uint256 currentVersion, bool validated, bool isValid, uint256 lastUpdate, string genesisCID)",
  "function getTransferCount(string) view returns (uint256)",
  "function tokenURI(uint256) view returns (string)"
];

// Initialize contract
let artiinaNFT;
if (ARTIINA_NFT_ADDRESS) {
  artiinaNFT = new ethers.Contract(ARTIINA_NFT_ADDRESS, ARTIINA_NFT_ABI, provider);
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    contractConfigured: !!ARTIINA_NFT_ADDRESS 
  });
});

// Main endpoint: agld.me/{beadId}
app.get('/:beadId', async (req, res) => {
  try {
    const { beadId } = req.params;

    // Validate BeadId format (8 alphanumeric characters)
    if (!/^[A-Z0-9]{8}$/.test(beadId)) {
      return res.status(400).json({ 
        error: 'Invalid BeadId format',
        message: 'BeadId must be 8 alphanumeric characters'
      });
    }

    // Check if contract is configured
    if (!artiinaNFT) {
      return res.status(503).json({ 
        error: 'Service not configured',
        message: 'Contract address not set'
      });
    }

    // Check if bead exists
    const beadExists = await artiinaNFT.exists(beadId);
    if (!beadExists) {
      return res.status(404).json({ 
        error: 'Bead not found',
        beadId: beadId
      });
    }

    // Fetch bead data from blockchain
    const beadData = await artiinaNFT.beads(beadId);
    const metadata = await artiinaNFT.getBeadMetadata(beadId);
    const tokenId = await artiinaNFT.beadToToken(beadId);
    const transferCount = await artiinaNFT.getTransferCount(beadId);

    // Format response for oracle validation
    const response = {
      beadId: beadId,
      sku: beadData.sku,
      version: Number(metadata.currentVersion),
      genesisCID: metadata.genesisCID,
      tokenId: Number(tokenId),
      validated: metadata.validated,
      isValid: metadata.isValid,
      transfers: Number(transferCount),
      createdAt: new Date(Number(beadData.createdAt) * 1000).toISOString(),
      lastUpdate: new Date(Number(metadata.lastUpdate) * 1000).toISOString(),
      // Additional fields for user interface
      blockchainVerified: true,
      network: 'sepolia',
      contractAddress: ARTIINA_NFT_ADDRESS
    };

    // Add previousVersion if this is an evolved bead
    if (Number(metadata.currentVersion) > 0) {
      response.previousVersion = Number(metadata.currentVersion) - 1;
    }

    res.json(response);

  } catch (error) {
    console.error('Error fetching bead data:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    service: 'Artiina Gold Authentication API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      bead: '/{beadId}'
    },
    documentation: 'https://docs.artiina.com'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Artiina backend running on port ${PORT}`);
  console.log(`📡 Connected to: ${SEPOLIA_RPC}`);
  console.log(`📝 Contract: ${ARTIINA_NFT_ADDRESS || 'Not configured'}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  process.exit(0);
});
