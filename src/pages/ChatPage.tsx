import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import ChatWindow from '../components/ChatWindow';
import ChatInput from '../components/ChatInput';
import MathematicalBackground from '../components/MathematicalBackground';
import { MathThinkingLoader } from '../components/MathematicalLoader';
import { Message } from '../types';
import { sendMessage } from '../services/api';
import { BarChart2, Calculator, Sparkles } from 'lucide-react';

const ChatPage: React.FC = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = async (content: string, image?: File) => {
    const messageId = uuidv4();
    
    // Add user message with animation
    const userMessage: Message = {
      id: messageId,
      role: 'user',
      content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setInputValue('');

    try {
      const response = await sendMessage(content, image);
      
      const assistantMessage: Message = {
        id: uuidv4(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      const errorMessage: Message = {
        id: uuidv4(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReloadMessage = async (messageId: string) => {
    const messageIndex = messages.findIndex(msg => msg.id === messageId);
    if (messageIndex === -1) return;

    const userMessage = messages[messageIndex - 1];
    if (!userMessage || userMessage.role !== 'user') return;

    setIsLoading(true);

    try {
      const response = await sendMessage(userMessage.content);
      
      setMessages(prev => 
        prev.map(msg => 
          msg.id === messageId 
            ? { ...msg, content: response, timestamp: new Date() }
            : msg
        )
      );
    } catch (error) {
      console.error('Error reloading message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExampleClick = (text: string) => {
    setInputValue(text);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white relative overflow-hidden">
      <MathematicalBackground variant="chat" />
      
      <motion.div 
        className="relative z-10 flex flex-col h-screen"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Enhanced Header */}
        <motion.header 
          className="bg-gradient-to-r from-slate-800/90 to-slate-900/90 backdrop-blur-xl border-b border-slate-700/50 text-white p-6 shadow-2xl"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between">
              <motion.div 
                className="flex items-center space-x-4 cursor-pointer"
                whileHover={{ scale: 1.02 }}
                onClick={() => navigate('/')}
              >
                <motion.div 
                  className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg border border-blue-400/30"
                  animate={{ 
                    boxShadow: [
                      '0 0 20px rgba(59, 130, 246, 0.3)',
                      '0 0 40px rgba(147, 51, 234, 0.3)',
                      '0 0 20px rgba(59, 130, 246, 0.3)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Calculator className="w-8 h-8 text-white" />
                </motion.div>
                <div>
                  <motion.h1 
                    className="text-3xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                    animate={{ 
                      backgroundPosition: ['0%', '100%', '0%']
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    Aryabhata 1.0
                  </motion.h1>
                  <div className="flex items-center space-x-3">
                    <p className="text-sm text-gray-300">Advanced Mathematics AI</p>
                    <div className="text-xs text-gray-400">•</div>
                    <motion.div 
                      className="text-xs text-orange-400 font-semibold"
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      PhysicsWallah
                    </motion.div>
                    <motion.div 
                      className="flex items-center space-x-1 bg-emerald-500/20 px-2 py-1 rounded-full"
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Sparkles className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400 text-xs font-semibold">Online</span>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
              
              <div className="flex items-center space-x-4">
                <motion.button
                  onClick={() => navigate('/')}
                  className="px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 rounded-xl text-sm text-white transition-colors border border-slate-600/50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  ← Back to Home
                </motion.button>
                
                {/* <motion.button 
                  onClick={() => navigate('/benchmarks')}
                  className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 hover:from-blue-600/30 hover:to-purple-600/30 rounded-xl text-sm text-white transition-all border border-blue-500/30"
                  whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(59, 130, 246, 0.2)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  <BarChart2 size={16} className="mr-2" />
                  Benchmarks
                </motion.button> */}
              </div>
            </div>
          </div>
        </motion.header>
        
        {/* Main Chat Area */}
        <motion.main 
          className="flex-1 flex flex-col max-w-6xl w-full mx-auto my-6 bg-slate-800/30 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-slate-700/50"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <ChatWindow 
            messages={messages} 
            onReloadMessage={handleReloadMessage}
            onExampleClick={handleExampleClick}
          />
          
          <AnimatePresence>
            {isLoading && (
              <motion.div 
                className="px-6 py-6 bg-slate-800/50 backdrop-blur-sm border-t border-slate-700/50"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <MathThinkingLoader />
              </motion.div>
            )}
          </AnimatePresence>
          
          <ChatInput 
            onSendMessage={handleSendMessage} 
            isLoading={isLoading}
            inputValue={inputValue}
            setInputValue={setInputValue}
          />
        </motion.main>
        
        {/* Enhanced Footer */}
        <motion.footer 
          className="text-center text-gray-500 text-xs py-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span className="text-orange-400 font-semibold">PhysicsWallah</span> • 
            Revolutionizing Mathematics Education with <span className="text-blue-400 font-semibold">Aryabhata 1.0</span>
          </motion.div>
          <motion.div 
            className="mt-2 text-gray-600 text-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <span className="text-white">⚠️</span> Aryabhata 1.0 is an open source research project and it is not robust enough for production usage yet.
          </motion.div>
        </motion.footer>
      </motion.div>
    </div>
  );
};

export default ChatPage; 