import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Message } from '../types';
import ChatMessage from './ChatMessage';
import { Calculator, Sparkles, Zap, Target, Award, Database, WifiOff } from 'lucide-react';

interface ChatWindowProps {
  messages: Message[];
  onReloadMessage: (messageId: string) => void;
  onExampleClick?: (text: string) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, onReloadMessage, onExampleClick }) => {
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  
  const exampleQuestions: string[] = [
    "If the first term of an A.P. is 3 and the sum of its first four terms is equal to one-fifth of the sum of the next four terms, then the sum of the first 20 terms is equal to\nA. -1080\nB. -1020\nC. -1200\nD. -120",
    "One die has two faces marked 1, two faces marked 2, one face marked 3 and one face marked 4. Another die has one face marked 1, two faces marked 2, two faces marked 3 and one face marked 4. The probability of getting the sum of numbers to be 4 or 5, when both the dice are thrown together, is\nA. \\(\\frac{2}{3}\\)\nB. \\(\\frac{1}{2}\\)\nC. \\(\\frac{4}{9}\\)\nD. \\(\\frac{3}{5}\\)",
    "Marks obtained by all the students of class 12 are presented in a frequency distribution with classes of equal width. Let the median of this grouped data be 14 with median class interval 12-18 and median class frequency 12. If the number of students whose marks are less than 12 is 18, then the total number of students is\nA. 52\nB. 48\nC. 44\nD. 40",
    "Let the area of a \\(\\triangle PQR\\) with vertices \\(P(5, 4)\\), \\(Q(-2, 4)\\) and \\(R(a, b)\\) be 35 square units. If its orthocenter and centroid are \\(O\\left(2, \\frac{14}{5}\\right)\\) and \\(C(c, d)\\) respectively, then \\(c + 2d\\) is equal to\nA. \\(\\frac{8}{3}\\)\nB. \\(\\frac{7}{3}\\)\nC. 2\nD. 3"
  ];

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleExampleClick = (question: string) => {
    if (onExampleClick) {
      onExampleClick(question);
    }
  };

  return (
    <div className="flex-1 p-6 overflow-y-auto bg-gradient-to-b from-slate-800/20 to-slate-900/20 backdrop-blur-sm">
      {messages.length === 0 ? (
        <motion.div 
          className="h-full flex flex-col items-center justify-center text-gray-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Animated Calculator Icon */}
          <motion.div 
            className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-600/20 backdrop-blur-xl flex items-center justify-center mb-8 border border-blue-500/30"
            animate={{ 
              scale: [1, 1.05, 1],
              boxShadow: [
                '0 0 30px rgba(59, 130, 246, 0.2)',
                '0 0 50px rgba(147, 51, 234, 0.3)',
                '0 0 30px rgba(59, 130, 246, 0.2)'
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Calculator size={40} className="text-blue-400" />
          </motion.div>

          {/* Welcome Text */}
          <motion.h2 
            className="text-4xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Aryabhata 1.0
          </motion.h2>

          <motion.div 
            className="flex items-center space-x-2 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
          >
            <span className="text-orange-400 font-semibold text-lg">PhysicsWallah</span>
            <div className="text-gray-400">•</div>
            <span className="text-gray-300 text-lg">Advanced Mathematics AI</span>
          </motion.div>
          
          <motion.p 
            className="text-sm text-center text-gray-400 max-w-md mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            India's most advanced AI specialized in solving complex mathematical problems with superior accuracy. 
            Type a question or upload an image of a math problem.
          </motion.p>

          {/* Stats Cards */}
          <motion.div 
            className="flex items-center space-x-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {[
              { icon: Target, label: "JEE Mains Accuracy", value: "90.2%", color: "emerald" },
              { icon: Database, label: "Model Size", value: "7B Parameters", color: "blue" },
              { icon: Zap, label: "Responds within 2K context", value: "Fast", color: "purple" }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className={`text-center p-4 rounded-xl bg-${stat.color}-500/10 border border-${stat.color}-500/20`}
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <motion.div 
                  className={`w-8 h-8 mx-auto mb-2 bg-${stat.color}-500/20 rounded-lg flex items-center justify-center`}
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
                >
                  <stat.icon className={`w-4 h-4 text-${stat.color}-400`} />
                </motion.div>
                <div className={`text-lg font-bold text-${stat.color}-400`}>{stat.value}</div>
                <div className="text-xs text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Example Questions */}
          {exampleQuestions.length > 0 && (
            <motion.div 
              className="mt-6 w-full max-w-4xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <h3 className="text-lg font-semibold text-center text-gray-300 mb-4">
                Try these example problems:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {exampleQuestions.map((question, index) => (
                  <motion.div 
                    key={index}
                    onClick={() => handleExampleClick(question)}
                    className="p-4 border border-slate-600/50 rounded-xl bg-slate-800/30 backdrop-blur-sm hover:bg-slate-700/40 transition-all cursor-pointer group"
                    whileHover={{ 
                      scale: 1.02, 
                      boxShadow: '0 10px 25px rgba(59, 130, 246, 0.1)',
                      borderColor: 'rgba(59, 130, 246, 0.3)'
                    }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1, duration: 0.4 }}
                  >
                    <div className="flex items-start space-x-3">
                      <motion.div 
                        className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 flex items-center justify-center flex-shrink-0 border border-blue-500/30"
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
                      >
                        <span className="text-blue-400 font-mono font-bold text-sm">∫</span>
                      </motion.div>
                      <p className="font-mono text-gray-300 group-hover:text-white transition-colors text-sm">
                        {question}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Floating Mathematical Symbols */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {['π', '∑', '∫', '∞', '∂', '∇'].map((symbol, index) => (
              <motion.div
                key={symbol}
                className="absolute text-4xl text-blue-400/10 font-mono select-none"
                style={{
                  left: `${10 + (index * 15)}%`,
                  top: `${20 + (index % 3) * 20}%`,
                }}
                animate={{
                  y: [-20, 20, -20],
                  rotate: [-10, 10, -10],
                  opacity: [0.05, 0.15, 0.05]
                }}
                transition={{
                  duration: 8 + index,
                  repeat: Infinity,
                  delay: index * 0.7,
                  ease: "easeInOut" as const
                }}
              >
                {symbol}
              </motion.div>
            ))}
          </div>
        </motion.div>
      ) : (
        <div className="space-y-6">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 100, 
                  damping: 15,
                  duration: 0.4 
                }}
              >
                <ChatMessage 
                  message={message} 
                  onReload={message.role === 'assistant' ? () => onReloadMessage(message.id) : undefined}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatWindow;
