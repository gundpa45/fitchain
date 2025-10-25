# 🏃‍♂️ FitChain - Decentralized Fitness Tracking Platform

A revolutionary blockchain-powered fitness tracking application that combines real-time GPS tracking with Ethereum blockchain technology to create a decentralized fitness ecosystem.

## 🌟 Features

### 🎯 Core Functionality
- **Real-Time GPS Tracking** - Professional-grade GPS accuracy with live path visualization
- **Blockchain Integration** - Store achievements permanently on Ethereum blockchain
- **MetaMask Integration** - Secure wallet connection for Web3 functionality
- **Interactive Maps** - Leaflet-powered maps with real-time tracking visualization
- **Achievement System** - Earn NFT rewards for completing fitness challenges

### 🎨 User Experience
- **Stunning Earth Background** - CSS-animated Earth with rotating sphere and starfield
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
- **Glassmorphism UI** - Modern glass-effect navbar with smooth animations
- **Professional Landing Page** - Complete with features showcase and statistics

### 🔧 Technical Features
- **React 19** - Latest React with modern hooks and components
- **Framer Motion** - Smooth animations and transitions
- **Leaflet Maps** - Interactive mapping with GPS integration
- **Ethers.js** - Ethereum blockchain interaction
- **Vite** - Fast development and build tooling

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MetaMask browser extension (for blockchain features)

### Installation

1. **Clone the repository**
   ```bash
   git clone git@github.com:gundpa45/fitchain.git
   cd fitchain
   ```

2. **Install dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your actual values:
   # VITE_PUBLIC_CONTRACT_ADDRESS=0x742d35Cc6634C0532925a3b8D4C9db96c4b5Da5A
   # VITE_PUBLIC_INFURA_API_KEY=your-infura-or-alchemy-key
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to `http://localhost:5173`

## 🌍 Earth Background Setup

The landing page features a stunning Earth background. To use a custom Earth image:

1. Save your Earth image as `earth.jpg`
2. Place it in `frontend/public/images/earth.jpg`
3. Refresh the page

**Note:** The app includes a beautiful CSS-generated Earth background as fallback.

## 🗺️ GPS Tracking

### Features
- Real-time location tracking with high accuracy
- Interactive map visualization with Leaflet
- Path recording and display
- Movement detection and speed calculation
- Loop validation for fitness challenges

### Usage
1. Click "Start Tracking" to begin GPS recording
2. Move around to see real-time path visualization
3. Click "Stop Tracking" to end the session
4. Submit valid loops to the blockchain

## 🔗 Blockchain Integration

### Environment Configuration
Before using blockchain features, configure your environment variables:

```env
# Required: Your deployed smart contract address
VITE_PUBLIC_CONTRACT_ADDRESS=0x742d35Cc6634C0532925a3b8D4C9db96c4b5Da5A

# Required: Infura/Alchemy API key for Ethereum connection
VITE_PUBLIC_INFURA_API_KEY=your-infura-or-alchemy-key
```

**Get API Key:**
1. **Infura:** Sign up at [infura.io](https://infura.io) → Create project → Copy Project ID
2. **Alchemy:** Sign up at [alchemy.com](https://alchemy.com) → Create app → Copy API key

### MetaMask Connection
- Connect your MetaMask wallet
- Switch to Ethereum mainnet
- Submit fitness achievements to blockchain
- Earn NFT rewards for completed challenges

### Smart Contract Features
- Permanent achievement storage
- NFT minting for milestones
- Decentralized fitness community
- Transparent and immutable records

## 📱 Responsive Design

The application is fully responsive and works on:
- **Desktop** - Full feature set with large maps
- **Tablet** - Optimized layout with touch controls
- **Mobile** - Mobile-first GPS tracking experience

## 🎨 UI Components

### Landing Page
- Hero section with Earth background
- Features showcase with animations
- Statistics display
- How it works section
- Professional footer

### Navigation
- Fixed glassmorphism navbar
- Smooth scroll navigation
- Mobile hamburger menu
- Responsive design

### Tracking Interface
- Real-time GPS map
- Statistics dashboard
- Control buttons
- Debug information panel

## 🛠️ Development

### Project Structure
```
frontend/
├── public/
│   └── images/          # Static images
├── src/
│   ├── components/      # React components
│   │   ├── LandingPage.jsx
│   │   ├── SimpleMap.jsx
│   │   └── ...
│   ├── App.jsx         # Main application
│   └── main.jsx        # Entry point
└── package.json
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Technologies Used
- **React 19** - UI framework
- **Vite** - Build tool
- **Framer Motion** - Animations
- **Leaflet** - Interactive maps
- **Ethers.js** - Ethereum integration
- **CSS3** - Styling with modern features

## 🌟 Key Features Showcase

### 🌍 Earth Background
- CSS-animated rotating Earth sphere
- Realistic continents and ice caps
- Atmospheric glow effects
- Twinkling starfield background

### 🧭 Navigation
- Glassmorphism navbar with blur effects
- Smooth scroll to sections
- Mobile-responsive hamburger menu
- Enhanced scrolled state with glossy effects

### 🗺️ GPS Tracking
- Real-time Leaflet map integration
- Live path visualization
- Movement detection algorithms
- Professional GPS accuracy display

## 📊 Statistics

- **1,247** Total Runs Recorded
- **89** Active Users
- **15.4K** KM Tracked
- **342** NFTs Minted

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔮 Future Roadmap

- [ ] Social features and friend challenges
- [ ] Advanced analytics dashboard
- [ ] Multi-chain blockchain support
- [ ] Wearable device integration
- [ ] Gamification and leaderboards
- [ ] Marketplace for fitness NFTs

## 📞 Support

For support, email support@fitchain.app or join our Discord community.

## 🙏 Acknowledgments

- OpenStreetMap for mapping data
- Ethereum community for blockchain infrastructure
- React team for the amazing framework
- All contributors and testers

---

**Built with ❤️ for the decentralized fitness community**

🌍 **Transform Your Fitness Journey with Blockchain** 🚀