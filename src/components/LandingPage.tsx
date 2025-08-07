import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Calculator, Zap, Target, Award, ChevronRight, Play, Database, WifiOff, Clock, Globe, Flag } from 'lucide-react';
import MathematicalBackground from './MathematicalBackground';

interface LandingPageProps {
  onEnter: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnter }) => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-20, 20, -20],
      rotate: [-5, 5, -5],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white relative overflow-hidden">
      <MathematicalBackground variant="landing" />
      
      <motion.div 
        className="relative z-10 min-h-screen flex flex-col"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.header 
          className="p-6 flex justify-between items-center"
          variants={itemVariants}
        >
          <div className="flex items-center space-x-3">
            <motion.div 
              className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center border border-blue-400/30"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Calculator className="w-7 h-7 text-white" />
            </motion.div>
            <div>
              <h1 className="text-2xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Aryabhata 1.0
              </h1>
              <div className="flex items-center space-x-2 text-sm">
                <span className="text-orange-400 font-semibold">PhysicsWallah</span>
                <div className="text-gray-400">•</div>
                <span className="text-gray-400">Mathematics AI</span>
              </div>
            </div>
          </div>
          
          <motion.div 
            className="flex items-center space-x-2 bg-emerald-500/20 px-4 py-2 rounded-full border border-emerald-500/30"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-emerald-400 text-sm font-semibold">AI Online</span>
          </motion.div>
        </motion.header>

        {/* Hero Section */}
        <div className="flex-1 flex items-center justify-center px-4 md:px-8 xl:px-24">
          <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div className="space-y-8 min-w-0" variants={itemVariants}>
              <motion.div 
                className="inline-block px-4 py-2 bg-gradient-to-r from-orange-500/20 to-blue-500/20 rounded-full border border-orange-500/30"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-orange-300 text-sm font-semibold">🚀 PhysicsWallah's Advanced Mathematics AI</span>
              </motion.div>

              <motion.h1 
                className="text-5xl sm:text-6xl lg:text-8xl font-black leading-tight"
                variants={itemVariants}
              >
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent whitespace-nowrap">
                  Aryabhata 1.0
                </span>
                <br />
                <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent text-4xl lg:text-5xl">
                  Mathematics AI
                </span>
              </motion.h1>

              <motion.p 
                className="text-xl text-gray-300 leading-relaxed max-w-lg"
                variants={itemVariants}
              >
                India's First Exam-Specific Math model, designed to revolutionize competitive exam preparation with advanced mathematical reasoning and problem-solving capabilities.
              </motion.p>

              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                variants={itemVariants}
              >
                <motion.button
                  onClick={onEnter}
                  className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold text-lg flex items-center justify-center space-x-3 shadow-2xl shadow-blue-500/25"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.5)"
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Play className="w-5 h-5" />
                  <span>Start Solving</span>
                  <motion.div
                    className="w-5 h-5"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </motion.div>
                </motion.button>

                <motion.a
                  href="https://huggingface.co/PhysicsWallahAI/Aryabhata-1.0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 border-2 border-yellow-500 hover:border-yellow-400 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 hover:text-yellow-300 rounded-xl font-semibold text-lg transition-colors inline-block"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  View on Hugging Face
                </motion.a>
              </motion.div>

            </motion.div>

            {/* Right Visual */}
            <motion.div 
              className="relative min-w-0"
              variants={itemVariants}
            >
              <motion.div 
                className="relative z-10"
                variants={floatingVariants}
                animate="animate"
              >
                {/* Main Mathematical Display */}
                <motion.div 
                  className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50 shadow-2xl"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="text-center space-y-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-sm text-orange-400 font-semibold">PhysicsWallah AI</div>
                      <div className="text-sm text-blue-400 font-mono">Aryabhata 1.0</div>
                    </div>
                    
                    <motion.div 
                      className="text-4xl font-mono text-blue-400"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      ∫ f(x)dx = F(x) + C
                    </motion.div>
                    
                    <motion.div 
                      className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                      animate={{ scaleX: [0, 1, 0] }}
                      transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                    />
                    
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="bg-emerald-500/20 rounded-lg p-3 border border-emerald-500/30">
                        <div className="text-emerald-400 font-bold">Solution</div>
                        <div className="text-emerald-300 text-sm">Found ✓</div>
                      </div>
                      <div className="bg-blue-500/20 rounded-lg p-3 border border-blue-500/30">
                        <div className="text-blue-400 font-bold">Accuracy</div>
                        <div className="text-blue-300 text-sm">87%</div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Floating Mathematical Elements */}
                {[
                  { symbol: "π", position: { top: "10%", left: "10%" } },
                  { symbol: "∑", position: { top: "20%", right: "15%" } },
                  { symbol: "∞", position: { bottom: "20%", left: "5%" } },
                  { symbol: "∂", position: { bottom: "10%", right: "10%" } },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="absolute text-3xl text-purple-400/60 font-mono"
                    style={item.position}
                    animate={{
                      y: [-10, 10, -10],
                      rotate: [-10, 10, -10],
                      opacity: [0.4, 0.8, 0.4]
                    }}
                    transition={{
                      duration: 4 + index,
                      repeat: Infinity,
                      delay: index * 0.5,
                      ease: "easeInOut"
                    }}
                  >
                    {item.symbol}
                  </motion.div>
                ))}
              </motion.div>

              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-3xl scale-110" />
            </motion.div>
          </div>
        </div>

        {/* Stats Section - Full Width */}
        <motion.div 
          className="px-6 py-12"
          variants={itemVariants}
        >
          <div className="max-w-7xl mx-auto">
            <motion.div 
              className="grid grid-cols-5 gap-6"
              variants={itemVariants}
            >
              {[
                { icon: Target, label: "JEE Mains Apr Accuracy", value: "90.2%" },
                { icon: Database, label: "Model Size", value: "7B Parameters" },
                { icon: WifiOff, label: "Runs Offline", value: "No Internet" },
                { icon: Zap, label: "Responds within 2K context", value: "Fast" },
                { icon: Flag, label: "Built for bharat", value: "India First" }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  className="text-center"
                  whileHover={{ scale: 1.1 }}
                >
                  <motion.div 
                    className="w-12 h-12 mx-auto mb-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center border border-blue-500/30"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
                  >
                    <stat.icon className="w-6 h-6 text-blue-400" />
                  </motion.div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Call to Action */}
        <motion.div 
          className="p-6 text-center"
          variants={itemVariants}
        >
          <motion.button
            onClick={onEnter}
            className="inline-flex items-center space-x-2 text-gray-400 text-sm hover:text-gray-300 transition-colors cursor-pointer"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Ready to experience India's most advanced Mathematics AI?</span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ↓
            </motion.div>
          </motion.button>
        </motion.div>
      </motion.div>


    </div>
  );
};

export default LandingPage; 