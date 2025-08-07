import React from 'react';
import { motion } from 'framer-motion';

interface MathematicalLoaderProps {
  variant?: 'thinking' | 'calculating' | 'processing';
  size?: 'sm' | 'md' | 'lg';
}

const MathematicalLoader: React.FC<MathematicalLoaderProps> = ({ 
  variant = 'thinking', 
  size = 'md' 
}) => {
  const symbols = {
    thinking: ['∫', '∑', '∂', '∇', '∞', 'π'],
    calculating: ['×', '÷', '+', '−', '=', '≈'],
    processing: ['∮', '∏', '∆', '√', '∝', '∴']
  };

  const equations = {
    thinking: [
      'f(x) = ?',
      '∫ dx = ?',
      'lim → ?',
      'Σ = ?'
    ],
    calculating: [
      '2 + 2 = ?',
      'x² = ?',
      'a/b = ?',
      '√x = ?'
    ],
    processing: [
      'Processing...',
      'Computing...',
      'Analyzing...',
      'Solving...'
    ]
  };

  const sizeClasses = {
    sm: 'w-6 h-6 text-sm',
    md: 'w-8 h-8 text-base',
    lg: 'w-12 h-12 text-lg'
  };

  const currentSymbols = symbols[variant];
  const currentEquations = equations[variant];

  return (
    <div className="flex items-center space-x-4">
      {/* Rotating Mathematical Symbols */}
      <div className="flex items-center space-x-2">
        {currentSymbols.map((symbol, index) => (
          <motion.div
            key={`${variant}-${symbol}-${index}`}
            className={`${sizeClasses[size]} flex items-center justify-center text-blue-400 font-mono font-bold`}
            animate={{
              rotate: [0, 360],
              scale: [0.8, 1.2, 0.8],
              opacity: [0.4, 1, 0.4]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: index * 0.2,
              ease: "easeInOut" as const
            }}
          >
            {symbol}
          </motion.div>
        ))}
      </div>

      {/* Animated Equation */}
      <motion.div
        className="text-gray-300 font-mono text-sm"
        key={variant}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.span
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {currentEquations[Math.floor(Date.now() / 2000) % currentEquations.length]}
        </motion.span>
      </motion.div>

      {/* Progress Dots */}
      <div className="flex space-x-1">
        {[0, 1, 2].map((dot) => (
          <motion.div
            key={dot}
            className="w-1.5 h-1.5 bg-purple-400 rounded-full"
            animate={{
              scale: [0.5, 1, 0.5],
              opacity: [0.3, 1, 0.3]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: dot * 0.2
            }}
          />
        ))}
      </div>
    </div>
  );
};

// Comprehensive Mathematical Thinking Loader
export const MathThinkingLoader: React.FC = () => {
  return (
    <div className="flex flex-col items-center space-y-4 py-8">
      {/* Main Equation Animation */}
      <motion.div
        className="text-3xl font-mono text-blue-400 text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          animate={{ 
            rotateY: [0, 180, 360],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          ∫ f(x)dx = F(x) + C
        </motion.div>
      </motion.div>

      {/* Animated Mathematical Grid */}
      <div className="grid grid-cols-4 gap-3">
        {['∂', '∇', '∑', '∏', '∞', 'π', '∮', '∆'].map((symbol, index) => (
          <motion.div
            key={symbol}
            className="w-12 h-12 bg-slate-800/50 rounded-lg flex items-center justify-center text-purple-400 font-mono text-xl border border-slate-700/50"
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0],
              borderColor: ['rgba(148, 163, 184, 0.5)', 'rgba(139, 92, 246, 0.5)', 'rgba(148, 163, 184, 0.5)']
            }}
            transition={{
              duration: 2 + (index * 0.1),
              repeat: Infinity,
              delay: index * 0.1,
              ease: "easeInOut" as const
            }}
          >
            {symbol}
          </motion.div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="w-64 h-2 bg-slate-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
          animate={{
            width: ['0%', '70%', '100%', '0%']
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut" as const
          }}
        />
      </div>

      {/* Status Text */}
      <motion.div
        className="text-center text-gray-400 text-sm"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="font-semibold text-blue-400 mb-1">
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-black">
            Aryabhata 1.0
          </span> is thinking...
        </div>
        <div className="text-xs">
                          <span className="text-orange-400 font-semibold">PhysicsWallah</span> • Analyzing mathematical patterns
        </div>
      </motion.div>
    </div>
  );
};

export default MathematicalLoader; 