import React from 'react';
import { motion } from 'framer-motion';
import { RotateCw, User, Bot, Copy, Check, Sparkles } from 'lucide-react';
import { Message } from '../types';

interface ChatMessageProps {
  message: Message;
  onReload?: () => void;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, onReload }) => {
  const isUser = message.role === 'user';
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <motion.div 
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} group relative`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`flex ${isUser ? 'flex-row-reverse' : 'flex-row'} max-w-[85%] items-start space-x-0 ${isUser ? 'space-x-reverse' : ''}`}>
        {/* Avatar */}
        <motion.div 
          className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg ${
            isUser ? 'ml-3 bg-gradient-to-br from-emerald-500 to-emerald-600' : 'mr-3 bg-gradient-to-br from-blue-500 to-purple-600'
          }`}
          whileHover={{ scale: 1.05 }}
          animate={{
            boxShadow: isUser 
              ? ['0 0 10px rgba(16, 185, 129, 0.3)', '0 0 20px rgba(16, 185, 129, 0.4)', '0 0 10px rgba(16, 185, 129, 0.3)']
              : ['0 0 10px rgba(59, 130, 246, 0.3)', '0 0 20px rgba(147, 51, 234, 0.4)', '0 0 10px rgba(59, 130, 246, 0.3)']
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          {isUser ? <User size={18} className="text-white" /> : <Bot size={18} className="text-white" />}
        </motion.div>
        
        {/* Message Content */}
        <motion.div 
          className={`relative rounded-2xl px-6 py-4 shadow-lg backdrop-blur-sm border ${
            isUser 
              ? 'bg-gradient-to-br from-emerald-600/90 to-emerald-700/90 text-white border-emerald-500/30 rounded-tr-md' 
              : 'bg-slate-800/90 text-gray-100 border-slate-600/30 rounded-tl-md'
          }`}
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          {/* Image Display */}
          {message.image && (
            <motion.div 
              className="mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="relative rounded-xl overflow-hidden border border-slate-600/30 shadow-lg">
                <img 
                  src={URL.createObjectURL(message.image)} 
                  alt="Uploaded mathematical problem" 
                  className="max-w-full rounded-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
              </div>
            </motion.div>
          )}
          
          {/* Text Content */}
          <div className="whitespace-pre-wrap">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {message.content}
            </motion.div>
          </div>
          
          {/* Message Meta */}
          <motion.div 
            className={`flex items-center justify-between mt-3 pt-2 border-t ${
              isUser ? 'border-emerald-400/20' : 'border-slate-600/30'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className={`text-xs ${isUser ? 'text-emerald-200' : 'text-gray-400'}`}>
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
            
            {!isUser && (
              <div className="flex items-center space-x-2">
                <motion.div 
                  className="flex items-center space-x-1"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full border border-blue-500/30 font-mono font-semibold">
                    Aryabhata 1.0
                  </span>
                  <span className="text-xs text-orange-400/80 font-semibold">PW</span>
                </motion.div>
                <motion.div
                  className="flex items-center space-x-1"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.6, 1, 0.6]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles size={12} className="text-purple-400" />
                  <span className="text-xs text-purple-400/80 font-semibold">LaTeX</span>
                </motion.div>
              </div>
            )}
          </motion.div>

          {/* Mathematical Decorative Elements for AI messages */}
          {!isUser && (
            <div className="absolute -right-1 -top-1 pointer-events-none">
              <motion.div
                className="text-blue-400/20 text-lg font-mono"
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                ∫
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Action Buttons */}
      <motion.div 
        className={`absolute ${isUser ? 'left-0' : 'right-0'} top-2 flex flex-col space-y-1 opacity-0 group-hover:opacity-100 transition-opacity`}
        initial={{ x: isUser ? 10 : -10 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {/* Copy Button */}
        <motion.button 
          onClick={handleCopy}
          className="p-2 text-gray-400 hover:text-blue-400 bg-slate-800/80 hover:bg-slate-700/80 rounded-lg backdrop-blur-sm border border-slate-600/50 shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title="Copy message"
        >
          <motion.div
            animate={copied ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
          </motion.div>
        </motion.button>

        {/* Reload Button for AI messages */}
        {!isUser && onReload && (
          <motion.button 
            onClick={onReload}
            className="p-2 text-gray-400 hover:text-purple-400 bg-slate-800/80 hover:bg-slate-700/80 rounded-lg backdrop-blur-sm border border-slate-600/50 shadow-lg"
            whileHover={{ scale: 1.05, rotate: 180 }}
            whileTap={{ scale: 0.95 }}
            title="Regenerate response"
          >
            <RotateCw size={14} />
          </motion.button>
        )}
      </motion.div>

      {/* Message Glow Effect */}
      <div className={`absolute inset-0 rounded-2xl blur-xl opacity-20 pointer-events-none ${
        isUser ? 'bg-emerald-500' : 'bg-blue-500'
      }`} style={{ zIndex: -1 }} />
    </motion.div>
  );
};

export default ChatMessage;
