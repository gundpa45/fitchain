# 🔧 FitChain Environment Setup Guide

## 📋 Required Environment Variables

### 🔗 Smart Contract Configuration

**VITE_PUBLIC_CONTRACT_ADDRESS**
- **Purpose:** Your deployed FitChain smart contract address
- **Format:** `0x742d35Cc6634C0532925a3b8D4C9db96c4b5Da5A`
- **Where to get:** After deploying your smart contract to Ethereum

### 🌐 Blockchain RPC Configuration

**VITE_PUBLIC_INFURA_API_KEY**
- **Purpose:** API key for connecting to Ethereum network
- **Providers:** Infura, Alchemy, QuickNode, or Moralis
- **Format:** `your-infura-or-alchemy-api-key`

## 🚀 Quick Setup

### Step 1: Copy Environment File
```bash
cd frontend
cp .env.example .env
```

### Step 2: Get Infura API Key
1. Go to [Infura.io](https://infura.io)
2. Create a free account
3. Create a new project
4. Copy your Project ID (this is your API key)

### Step 3: Deploy Smart Contract (Optional)
If you haven't deployed a contract yet, you can use a test address:
```
VITE_PUBLIC_CONTRACT_ADDRESS=0x742d35Cc6634C0532925a3b8D4C9db96c4b5Da5A
```

### Step 4: Update .env File
```env
VITE_PUBLIC_CONTRACT_ADDRESS=0x742d35Cc6634C0532925a3b8D4C9db96c4b5Da5A
VITE_PUBLIC_INFURA_API_KEY=your-actual-infura-project-id
```

## 🔑 Getting API Keys

### Infura (Recommended)
1. Visit [infura.io](https://infura.io)
2. Sign up for free account
3. Create new project → Web3 API
4. Copy Project ID from dashboard
5. Use Project ID as your API key

### Alchemy (Alternative)
1. Visit [alchemy.com](https://alchemy.com)
2. Create free account
3. Create new app → Ethereum Mainnet
4. Copy API key from dashboard

### QuickNode (Alternative)
1. Visit [quicknode.com](https://quicknode.com)
2. Create free account
3. Create endpoint → Ethereum Mainnet
4. Copy HTTP Provider URL

## 🌍 Network Configuration

### Mainnet (Production)
```env
VITE_PUBLIC_NETWORK_ID=1
VITE_PUBLIC_NETWORK_NAME=mainnet
```

### Sepolia Testnet (Development)
```env
VITE_PUBLIC_NETWORK_ID=11155111
VITE_PUBLIC_NETWORK_NAME=sepolia
```

### Polygon (Alternative)
```env
VITE_PUBLIC_NETWORK_ID=137
VITE_PUBLIC_NETWORK_NAME=polygon
```

## 🔒 Security Best Practices

### Environment Variables
- ✅ **DO** use environment variables for configuration
- ✅ **DO** add `.env` to `.gitignore`
- ✅ **DO** use `VITE_PUBLIC_` prefix for client-side variables
- ❌ **DON'T** commit `.env` files to Git
- ❌ **DON'T** share API keys publicly

### API Key Security
- Use separate keys for development/production
- Rotate keys regularly
- Monitor usage in provider dashboard
- Set up usage alerts

## 🧪 Testing Configuration

### Verify Setup
```bash
npm run dev
```

### Check Console
Open browser console and look for:
- ✅ No environment variable errors
- ✅ Successful MetaMask connection
- ✅ Contract address loaded correctly

### Test Features
1. **MetaMask Connection** - Should connect without errors
2. **GPS Tracking** - Should work independently
3. **Blockchain Features** - Should show contract address

## 🚨 Troubleshooting

### Common Issues

**"Contract address not found"**
- Check `VITE_PUBLIC_CONTRACT_ADDRESS` is set
- Verify address format (starts with 0x)
- Ensure contract is deployed to correct network

**"RPC connection failed"**
- Verify `VITE_PUBLIC_INFURA_API_KEY` is correct
- Check API key hasn't exceeded rate limits
- Try different RPC provider

**"MetaMask connection issues"**
- Ensure MetaMask is installed
- Check network matches your configuration
- Verify contract exists on selected network

### Debug Commands
```bash
# Check environment variables are loaded
console.log(import.meta.env.VITE_PUBLIC_CONTRACT_ADDRESS)
console.log(import.meta.env.VITE_PUBLIC_INFURA_API_KEY)
```

## 📚 Additional Resources

- [Infura Documentation](https://docs.infura.io/)
- [Alchemy Documentation](https://docs.alchemy.com/)
- [MetaMask Developer Docs](https://docs.metamask.io/)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)

## ✅ Checklist

- [ ] Created `.env` file from `.env.example`
- [ ] Added Infura/Alchemy API key
- [ ] Set contract address (or test address)
- [ ] Verified `.env` is in `.gitignore`
- [ ] Tested MetaMask connection
- [ ] Confirmed GPS tracking works
- [ ] Verified no console errors

**Your FitChain environment is now configured! 🎉**