import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './FloatingActions.css';

const FloatingActions = ({ onBackToLanding, onShowContests, isTracking }) => {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    { icon: '🏠', label: 'Home', action: onBackToLanding },
    { icon: '🏆', label: 'Contests', action: onShowContests },
    { icon: '📊', label: 'Stats', action: () => console.log('Stats') },
    { icon: '🎁', label: 'Rewards', action: () => console.log('Rewards') },
    { icon: '⚙️', label: 'Settings', action: () => console.log('Settings') }
  ];

  return (
    <div className="floating-actions">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="actions-menu"
          >
            {actions.map((action, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { delay: index * 0.1 }
                }}
                exit={{
                  opacity: 0,
                  y: 20,
                  scale: 0.8,
                  transition: { delay: (actions.length - index) * 0.05 }
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={action.action}
                className="action-button"
                title={action.label}
              >
                {action.icon}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`fab-main ${isOpen ? 'open' : ''} ${isTracking ? 'tracking' : ''}`}
      >
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isOpen ? '✕' : '⚡'}
        </motion.span>
      </motion.button>
    </div>
  );
};

export default FloatingActions;