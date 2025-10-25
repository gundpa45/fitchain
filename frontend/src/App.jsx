import { useState, useEffect, useRef } from 'react';
import { ethers } from 'ethers';
import { motion, AnimatePresence } from 'framer-motion';
import LandingPage from './components/LandingPage';
import LoadingScreen from './components/LoadingScreen';
import FloatingActions from './components/FloatingActions';
import ContestPage from './components/ContestPage';
import SimpleMap from './components/SimpleMap';
import BlockchainStatus from './components/BlockchainStatus';
import './App.css';
import { testBlockchainConfig, runBlockchainTests } from './utils/blockchainTest';

// Blockchain Configuration
const INFURA_API_KEY = import.meta.env.VITE_PUBLIC_INFURA_API_KEY;
const CONTRACT_ADDRESS = import.meta.env.VITE_PUBLIC_CONTRACT_ADDRESS;
const NETWORK_ID = import.meta.env.VITE_PUBLIC_NETWORK_ID || '1';

// Create Infura provider for fallback blockchain operations
const getInfuraProvider = () => {
  if (!INFURA_API_KEY) {
    console.warn('Infura API key not configured. Some blockchain features may not work.');
    return null;
  }

  const networkName = NETWORK_ID === '1' ? 'mainnet' :
    NETWORK_ID === '11155111' ? 'sepolia' :
      NETWORK_ID === '137' ? 'polygon' : 'mainnet';

  return new ethers.JsonRpcProvider(`https://${networkName}.infura.io/v3/${INFURA_API_KEY}`);
};



function App() {
  const [currentPage, setCurrentPage] = useState('loading'); // 'loading', 'landing', 'app', or 'contests'
  const [walletAddress, setWalletAddress] = useState('');
  const [isTracking, setIsTracking] = useState(false);

  // Blockchain state
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [networkInfo, setNetworkInfo] = useState(null);

  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [path, setPath] = useState([]);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [distance, setDistance] = useState(0);
  const [message, setMessage] = useState('');
  const [speed, setSpeed] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [altitude, setAltitude] = useState(0);
  const [heading, setHeading] = useState(0);
  const [platformStats, setPlatformStats] = useState({
    totalRuns: 1247,
    activeUsers: 89,
    totalDistance: 15420
  });
  const [lastValidPosition, setLastValidPosition] = useState(null);
  const [isMoving, setIsMoving] = useState(false);

  const watchIdRef = useRef(null);

  // Calculate distance between two coordinates (Haversine formula)
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };

  // Connect MetaMask wallet
  const connectWallet = async () => {
    try {
      // Check if MetaMask is installed
      if (!window.ethereum) {
        if (window.confirm('MetaMask not found. MetaMask is required for Ethereum blockchain.\n\nWould you like to install it now?')) {
          window.open('https://metamask.io/download/', '_blank');
        }
        setMessage('⚠️ Please install MetaMask wallet');
        return;
      }

      setMessage('🔄 Requesting wallet connection...');

      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });

      if (accounts.length > 0) {
        const address = accounts[0];
        setWalletAddress(address);

        // Create MetaMask provider and signer
        const metamaskProvider = new ethers.BrowserProvider(window.ethereum);
        const metamaskSigner = await metamaskProvider.getSigner();

        setProvider(metamaskProvider);
        setSigner(metamaskSigner);

        // Get network information
        const network = await metamaskProvider.getNetwork();
        setNetworkInfo({
          name: network.name,
          chainId: network.chainId.toString()
        });

        setMessage(`✅ MetaMask Connected: ${address.slice(0, 6)}...${address.slice(-4)} (${network.name})`);

        // Optional: Switch to the configured network
        const targetChainId = `0x${parseInt(NETWORK_ID).toString(16)}`;
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: targetChainId }],
          });
        } catch (switchError) {
          console.log('Network switch failed or cancelled:', switchError);
        }
      }

    } catch (error) {
      console.error('Wallet connection error:', error);
      if (error.code === 4001) {
        setMessage('❌ Connection rejected. Please approve the connection request.');
      } else if (error.code === -32002) {
        setMessage('⏳ Connection request pending. Please check MetaMask.');
      } else {
        setMessage('❌ Error connecting wallet: ' + error.message);
      }
    }
  };



  // Update elapsed time
  useEffect(() => {
    let interval;
    if (isTracking && startTime) {
      interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTracking, startTime]);

  // Listen for MetaMask account changes
  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = (accounts) => {
        if (accounts.length === 0) {
          setWalletAddress('');
          setMessage('🔌 MetaMask disconnected');
        } else if (accounts[0] !== walletAddress) {
          setWalletAddress(accounts[0]);
          setMessage(`🔄 Account changed: ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`);
        }
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);

      return () => {
        if (window.ethereum.removeListener) {
          window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        }
      };
    }
  }, [walletAddress]);

  // Get initial location when app loads
  useEffect(() => {
    if (navigator.geolocation && !currentPosition) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = [position.coords.latitude, position.coords.longitude];
          setCurrentPosition(pos);
          setMessage('📍 Location found! Ready to start tracking.');
        },
        (error) => {
          console.log('Initial location error:', error);
          setMessage('📍 Click "Start Run" to begin GPS tracking');
        },
        { enableHighAccuracy: false, timeout: 5000, maximumAge: 300000 }
      );
    }
  }, [currentPosition]);

  // Initialize app with loading screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPage('landing');
    }, 3000); // Show loading for 3 seconds

    return () => clearTimeout(timer);
  }, []);

  // Initialize blockchain connection
  useEffect(() => {
    const initializeBlockchain = async () => {
      try {
        // Run blockchain configuration tests
        const configOk = testBlockchainConfig();

        if (!configOk) {
          console.warn('⚠️ Blockchain configuration incomplete. Check your .env file.');
          return;
        }

        // Initialize Infura provider for read-only operations
        const infuraProvider = getInfuraProvider();
        if (infuraProvider) {
          setProvider(infuraProvider);

          // Get network information
          const network = await infuraProvider.getNetwork();
          setNetworkInfo({
            name: network.name,
            chainId: network.chainId.toString()
          });

          console.log('✅ Blockchain initialized:', {
            network: network.name,
            chainId: network.chainId.toString(),
            contractAddress: CONTRACT_ADDRESS
          });
        }
      } catch (error) {
        console.warn('⚠️ Blockchain initialization failed:', error.message);
        console.log('💡 Run runBlockchainTests() in console for detailed diagnostics');
      }
    };

    initializeBlockchain();

    // Make test function available globally for debugging
    window.runBlockchainTests = runBlockchainTests;
  }, []);

  // Start tracking with enhanced GPS monitoring
  const startRun = () => {
    if (!navigator.geolocation) {
      setMessage('❌ Geolocation not supported on this device');
      return;
    }

    setIsTracking(true);
    setStartTime(Date.now());
    setPath([]);
    setDistance(0);
    setLastValidPosition(null);
    setIsMoving(false);
    setMessage('🛰️ GPS tracking started... Getting your location...');

    // Enhanced GPS options for real-time tracking (like Google Maps)
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,        // Faster timeout for responsiveness
      maximumAge: 1000      // Allow 1 second old positions for smoother tracking
    };

    watchIdRef.current = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude, accuracy, altitude, speed, heading } = position.coords;
        const newPos = [latitude, longitude];

        // Always update current position for map centering
        setCurrentPosition(newPos);
        setAccuracy(accuracy);
        setAltitude(altitude || 0);
        setHeading(heading || 0);

        // Always update path for real-time tracking (like Google Maps)
        setPath((prevPath) => [...prevPath, newPos]);

        // Enhanced movement detection for status and distance calculation
        let actualSpeed = speed || 0;
        let movementDetected = false;
        let distanceFromLast = 0;

        // Check if we have a previous position
        if (lastValidPosition) {
          distanceFromLast = calculateDistance(
            lastValidPosition[0],
            lastValidPosition[1],
            latitude,
            longitude
          );

          // More sensitive movement detection (like Google Maps)
          const baseThreshold = Math.min(accuracy * 0.3, 2); // Much more sensitive: 30% of accuracy or 2m max
          const speedBasedMovement = actualSpeed > 0.3; // 0.3 m/s = 1.08 km/h (walking speed)
          const distanceBasedMovement = distanceFromLast > baseThreshold;

          // Movement detected if:
          // 1. GPS reports speed > walking threshold OR
          // 2. Distance moved > sensitive threshold AND accuracy is reasonable (< 50m)
          movementDetected = speedBasedMovement || (distanceBasedMovement && accuracy < 50);

          // Only add to total distance if movement is detected and distance is reasonable
          if (movementDetected && distanceFromLast < 100) { // Prevent GPS jumps > 100m
            setDistance((prevDist) => prevDist + distanceFromLast);
          }

          setIsMoving(movementDetected);

          // Update last position more frequently for better tracking
          if (distanceFromLast > 1 || movementDetected) { // Update every 1m or when moving
            setLastValidPosition(newPos);
          }
        } else {
          // First position - always add to path
          setLastValidPosition(newPos);
          setIsMoving(false);
        }

        // Update speed (use calculated speed if GPS speed is unreliable)
        setSpeed(actualSpeed);

        // Update status message with movement detection
        const accuracyText = accuracy < 10 ? '🟢 Excellent' : accuracy < 20 ? '🟡 Good' : accuracy < 50 ? '🟠 Fair' : '🔴 Poor';
        const movementStatus = movementDetected ? '🏃‍♂️ Moving' : '⏸️ Stationary';
        const speedKmh = (actualSpeed * 3.6).toFixed(1);

        setMessage(`📍 ${movementStatus} | ${accuracyText} GPS (±${accuracy.toFixed(0)}m) | Speed: ${speedKmh} km/h | Points: ${path.length}`);
      },
      (error) => {
        let errorMsg = '❌ GPS Error: ';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMsg += 'Location access denied. Please enable location permissions.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMsg += 'Location unavailable. Check GPS/internet connection.';
            break;
          case error.TIMEOUT:
            errorMsg += 'Location request timed out. Trying again...';
            break;
          default:
            errorMsg += error.message;
        }
        setMessage(errorMsg);
      },
      options
    );
  };

  // Stop tracking
  const stopRun = () => {
    if (watchIdRef.current) {
      navigator.geolocation.clearWatch(watchIdRef.current);
    }
    setIsTracking(false);

    // Validate loop
    if (path.length > 2) {
      const start = path[0];
      const end = path[path.length - 1];
      const loopDistance = calculateDistance(start[0], start[1], end[0], end[1]);

      if (loopDistance > 50) {
        setMessage(`Invalid loop! Start and end are ${loopDistance.toFixed(0)}m apart (must be < 50m)`);
      } else {
        setMessage(`Valid loop! Time: ${elapsedTime}s, Distance: ${distance.toFixed(0)}m`);
      }
    }
  };

  // Submit to blockchain
  const submitToBlockchain = async () => {
    if (!walletAddress) {
      setMessage('Please connect wallet first');
      return;
    }

    if (path.length < 2) {
      setMessage('No valid run to submit');
      return;
    }

    const start = path[0];
    const end = path[path.length - 1];
    const loopDistance = calculateDistance(start[0], start[1], end[0], end[1]);

    if (loopDistance > 50) {
      setMessage('Cannot submit invalid loop');
      return;
    }

    try {
      if (!signer) {
        setMessage('❌ Please connect MetaMask wallet first');
        return;
      }

      // Generate loop ID from starting coordinates
      const loopId = `loop_${start[0].toFixed(4)}_${start[1].toFixed(4)}`;

      setMessage(`🔄 Submitting to ${networkInfo?.name || 'Ethereum'} blockchain... Loop ID: ${loopId}`);

      // Prepare fitness data for blockchain
      const fitnessData = {
        loopId,
        startCoords: [start[0], start[1]],
        endCoords: [end[0], end[1]],
        distance: Math.round(distance),
        time: elapsedTime,
        timestamp: Math.floor(Date.now() / 1000),
        pathLength: path.length
      };

      console.log('📊 Fitness Data:', fitnessData);

      // If contract address is configured, attempt contract interaction
      if (CONTRACT_ADDRESS && CONTRACT_ADDRESS !== '0x...Your...Deployed...Address...') {
        // TODO: Add actual smart contract interaction here
        // const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
        // const tx = await contract.submitFitnessData(fitnessData);
        // await tx.wait();

        setMessage(`✅ Ready to submit to blockchain! Contract: ${CONTRACT_ADDRESS.slice(0, 6)}...${CONTRACT_ADDRESS.slice(-4)}`);
      } else {
        setMessage(`✅ Fitness data prepared for blockchain! Loop: ${loopId}, Time: ${elapsedTime}s, Distance: ${distance.toFixed(0)}m`);
        console.log('ℹ️ Contract address not configured. Add VITE_PUBLIC_CONTRACT_ADDRESS to .env file');
      }

    } catch (error) {
      console.error('Blockchain submission error:', error);
      setMessage(`❌ Blockchain Error: ${error.message}`);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEnterApp = () => {
    setCurrentPage('app');
  };

  const handleBackToLanding = () => {
    setCurrentPage('landing');
  };

  const handleShowContests = () => {
    setCurrentPage('contests');
  };

  const handleBackToApp = () => {
    setCurrentPage('app');
  };



  if (currentPage === 'loading') {
    return <LoadingScreen isVisible={true} />;
  }

  if (currentPage === 'landing') {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="landing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <LandingPage onEnterApp={handleEnterApp} onShowContests={handleShowContests} />
        </motion.div>
      </AnimatePresence>
    );
  }

  if (currentPage === 'contests') {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="contests"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ContestPage onBack={handleBackToApp} />
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="app"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="app"
        data-barba="container"
        data-barba-namespace="app"
      >
        <div className="app-header glass">
          <div className="header-content">
            <button onClick={handleBackToLanding} className="back-button">
              ← Back to Landing
            </button>
            <div className="header-main">
              <h1>🏃‍♂️ FitChain</h1>
              <p className="header-subtitle">Decentralized Fitness Tracking on Blockchain</p>
            </div>
          </div>
          {walletAddress ? (
            <div className="wallet-connected glass">
              <div className="wallet-avatar">🦊</div>
              <div className="wallet-info">
                <div className="wallet-label">Connected</div>
                <div className="wallet-address">
                  {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                </div>
              </div>
            </div>
          ) : (
            <div className="wallet-buttons">
              <button onClick={connectWallet} className="wallet-btn">
                🦊 Connect MetaMask
              </button>
            </div>
          )}
        </div>

        {/* Platform Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="platform-stats"
        >
          <div className="stat-card glass">
            <div className="stat-icon">🏃‍♂️</div>
            <div className="stat-number">{platformStats.totalRuns.toLocaleString()}</div>
            <div className="stat-label">Total Runs Recorded</div>
          </div>
          <div className="stat-card glass">
            <div className="stat-icon">👥</div>
            <div className="stat-number">{platformStats.activeUsers}</div>
            <div className="stat-label">Active Runners</div>
          </div>
          <div className="stat-card glass">
            <div className="stat-icon">🌍</div>
            <div className="stat-number">{(platformStats.totalDistance / 1000).toFixed(1)}k</div>
            <div className="stat-label">Total KM Tracked</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="map-container glass"
        >
          <div className="map-header">
            <h3>🗺️ Fitness Tracking Map</h3>
            <div className="map-status">
              {isTracking ? (
                <span className={`status-indicator ${isMoving ? 'moving' : 'stationary'}`}>
                  {isMoving ? '🏃‍♂️ Moving' : '⏸️ Stationary'}
                </span>
              ) : (
                <span className="status-indicator ready">🟢 Ready to Track</span>
              )}
            </div>
          </div>

          <SimpleMap
            isTracking={isTracking}
            currentPosition={currentPosition}
            path={path}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="stats"
        >
          {[
            { label: '⏱️ Time', value: formatTime(elapsedTime) },
            { label: '📏 Distance', value: `${distance.toFixed(0)}m` },
            { label: '🚀 Speed', value: `${(speed * 3.6 || 0).toFixed(1)} km/h` },
            { label: '🎯 GPS Accuracy', value: `±${accuracy.toFixed(0)}m` },
            { label: isTracking ? (isMoving ? '🏃‍♂️ Moving' : '⏸️ Stationary') : '📍 Points Tracked', value: isTracking ? (isMoving ? 'Yes' : 'No') : path.length },
            { label: '⚡ Avg Pace', value: `${distance > 0 && elapsedTime > 0 ? ((elapsedTime / 60) / (distance / 1000)).toFixed(1) : '0.0'} min/km` }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
              className="stat glass"
            >
              <span className="label">{stat.label}</span>
              <span className="value">{stat.value}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="controls"
        >
          <AnimatePresence mode="wait">
            {!isTracking ? (
              <motion.button
                key="start"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startRun}
                className="btn btn-start"
              >
                Start Run
              </motion.button>
            ) : (
              <motion.button
                key="stop"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={stopRun}
                className="btn btn-stop"
              >
                Stop Run
              </motion.button>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {!isTracking && path.length > 0 && (
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={submitToBlockchain}
                className="btn btn-submit"
              >
                Submit to Blockchain
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="message glass"
            >
              <div className="message-icon">
                {message.includes('✅') ? '✅' :
                  message.includes('❌') ? '❌' :
                    message.includes('🔄') ? '🔄' :
                      message.includes('📍') ? '📍' : '💬'}
              </div>
              <div className="message-text">{message}</div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Debug Panel - Remove in production */}
        {isTracking && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.5 }}
            className="debug-panel glass"
          >
            <h4>🔧 GPS Debug Info</h4>
            <div className="debug-grid">
              <div className="debug-item">
                <span className="debug-label">GPS Accuracy:</span>
                <span className="debug-value">{accuracy.toFixed(1)}m</span>
              </div>
              <div className="debug-item">
                <span className="debug-label">Movement Threshold:</span>
                <span className="debug-value">{Math.min(accuracy * 0.3, 2).toFixed(1)}m</span>
              </div>
              <div className="debug-item">
                <span className="debug-label">Distance from Last:</span>
                <span className="debug-value">{lastValidPosition ? calculateDistance(lastValidPosition[0], lastValidPosition[1], currentPosition[0], currentPosition[1]).toFixed(1) : '0'}m</span>
              </div>
              <div className="debug-item">
                <span className="debug-label">GPS Speed:</span>
                <span className="debug-value">{(speed * 3.6).toFixed(1)} km/h</span>
              </div>
              <div className="debug-item">
                <span className="debug-label">Movement Status:</span>
                <span className={`debug-value ${isMoving ? 'moving' : 'stationary'}`}>
                  {isMoving ? '🏃‍♂️ Moving' : '⏸️ Stationary'}
                </span>
              </div>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="info"
        >
          <p>🏃 <strong>Simple Tracking:</strong> Clean and minimal fitness tracking with grid-based visualization!</p>
          <p>📍 <strong>Live Path Display:</strong> See your exact route with connected tracking points and smooth animations.</p>
          <p>🗺️ <strong>Grid Visualization:</strong> Easy-to-read grid system shows your movement patterns clearly.</p>
        </motion.div>

        {/* Floating Action Button */}
        <FloatingActions
          onBackToLanding={handleBackToLanding}
          onShowContests={handleShowContests}
          isTracking={isTracking}
        />

        {/* Blockchain Status Debug Panel */}
        <BlockchainStatus
          provider={provider}
          networkInfo={networkInfo}
          walletAddress={walletAddress}
        />
      </motion.div>
    </AnimatePresence>
  );
}

export default App;
