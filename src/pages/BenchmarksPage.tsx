import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calculator, Sparkles } from 'lucide-react';
import BenchmarksTable from '../components/BenchmarksTable';
import MathematicalBackground from '../components/MathematicalBackground';

const BenchmarksPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-900 text-white relative overflow-hidden">
      <MathematicalBackground variant="landing" />
      
      <motion.div 
        className="relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <motion.header 
          className="p-6 flex justify-between items-center border-b border-slate-700/50 bg-slate-800/30 backdrop-blur-xl"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="flex items-center space-x-4">
            <motion.div 
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg border border-blue-400/30 cursor-pointer"
              animate={{ 
                boxShadow: [
                  '0 0 30px rgba(59, 130, 246, 0.3)',
                  '0 0 50px rgba(147, 51, 234, 0.4)',
                  '0 0 30px rgba(59, 130, 246, 0.3)'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate('/')}
            >
              <Calculator className="w-8 h-8 text-white" />
            </motion.div>
            <div>
              <motion.h1 
                className="text-3xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent cursor-pointer"
                onClick={() => navigate('/')}
              >
                Aryabhata 1.0 Benchmarks
              </motion.h1>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-orange-400 text-lg font-semibold">PhysicsWallah</span>
                <div className="text-gray-400">•</div>
                <span className="text-gray-400 text-lg">Performance Analysis</span>
                <motion.div 
                  className="flex items-center space-x-1 bg-emerald-500/20 px-2 py-1 rounded-full ml-3"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400 text-xs font-semibold">Live Data</span>
                </motion.div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <motion.button
              onClick={() => navigate('/')}
              className="flex items-center px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 rounded-xl text-sm text-white transition-colors border border-slate-600/50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft size={16} className="mr-2" />
              Home
            </motion.button>
            
            <motion.button
              onClick={() => navigate('/chat')}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl text-sm text-white transition-all shadow-lg"
              whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(59, 130, 246, 0.3)' }}
              whileTap={{ scale: 0.95 }}
            >
              Try Aryabhata
            </motion.button>
          </div>
        </motion.header>

        {/* Benchmarks Content - Always Open */}
        <motion.div
          className="p-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <BenchmarksTable 
            isOpen={true} 
            onClose={() => navigate('/')} 
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default BenchmarksPage; 