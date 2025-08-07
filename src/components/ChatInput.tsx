import React, { useState, FormEvent, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Image, X, Sparkles, Zap } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string, image?: File) => void;
  isLoading: boolean;
  inputValue?: string;
  setInputValue?: (value: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ 
  onSendMessage, 
  isLoading, 
  inputValue = '', 
  setInputValue 
}) => {
  const [input, setInput] = useState(inputValue);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Update local state when prop changes
  useEffect(() => {
    setInput(inputValue);
    // Focus the input when an example is clicked
    if (inputValue && inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputValue]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if ((input.trim() || selectedImage) && !isLoading) {
      onSendMessage(input, selectedImage || undefined);
      setInput('');
      if (setInputValue) {
        setInputValue('');
      }
      setSelectedImage(null);
      setImagePreview(null);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInput(newValue);
    if (setInputValue) {
      setInputValue(newValue);
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Determine if the submit button should be enabled
  const isSubmitEnabled = (input.trim().length > 0 || selectedImage !== null) && !isLoading;

  return (
    <div className="border-t border-slate-700/50 p-6 bg-slate-800/30 backdrop-blur-sm">
      <AnimatePresence>
        {selectedImage && imagePreview && (
          <motion.div 
            className="mb-4 p-4 bg-slate-800/50 rounded-xl border border-slate-600/50 backdrop-blur-sm"
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-start space-x-4">
              <motion.div 
                className="w-20 h-20 relative rounded-xl overflow-hidden flex-shrink-0 border border-slate-600/50"
                whileHover={{ scale: 1.05 }}
              >
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </motion.div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-white mb-1 truncate">{selectedImage.name}</div>
                <div className="text-xs text-gray-400 mb-2">
                  {(selectedImage.size / 1024).toFixed(1)} KB • Ready for analysis
                </div>
                <div className="flex items-center text-xs text-emerald-400">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Mathematical problem detected
                </div>
              </div>
              <motion.button 
                onClick={removeImage}
                className="p-2 text-gray-400 hover:text-red-400 rounded-lg hover:bg-red-500/10 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Remove image"
              >
                <X size={18} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <form onSubmit={handleSubmit}>
        <motion.div 
          className={`flex items-center gap-3 p-2 rounded-2xl border transition-all duration-300 ${
            isFocused 
              ? 'border-blue-500/50 bg-slate-800/60 shadow-lg shadow-blue-500/10' 
              : 'border-slate-600/50 bg-slate-800/40'
          }`}
          animate={{
            boxShadow: isFocused 
              ? '0 0 30px rgba(59, 130, 246, 0.1)' 
              : '0 0 0px rgba(59, 130, 246, 0)'
          }}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageSelect}
            accept="image/*"
            className="hidden"
          />
          
          <motion.button
            type="button"
            onClick={triggerFileInput}
            className="p-3 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-xl transition-colors group"
            disabled={isLoading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Upload mathematical problem image"
          >
            <motion.div
              animate={{ rotate: selectedImage ? [0, 10, -10, 0] : 0 }}
              transition={{ duration: 0.5 }}
            >
              <Image size={20} />
            </motion.div>
          </motion.button>
          
          <input
            type="text"
            ref={inputRef}
            value={input}
            onChange={handleInputChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Ask any mathematics question or upload an image..."
            className="flex-1 p-3 bg-transparent text-white placeholder-gray-400 focus:outline-none text-sm"
            disabled={isLoading}
          />
          
          <motion.button
            type="submit"
            disabled={!isSubmitEnabled}
            className={`p-3 rounded-xl font-semibold text-sm transition-all ${
              !isSubmitEnabled
                ? 'bg-slate-700/50 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl hover:shadow-blue-500/25'
            }`}
            whileHover={isSubmitEnabled ? { scale: 1.05 } : {}}
            whileTap={isSubmitEnabled ? { scale: 0.95 } : {}}
            title="Send message"
          >
            <motion.div
              animate={isLoading ? { rotate: 360 } : {}}
              transition={isLoading ? { duration: 1, repeat: Infinity, ease: "linear" } : {}}
            >
              {isLoading ? <Zap size={20} /> : <Send size={20} />}
            </motion.div>
          </motion.button>
        </motion.div>

        {/* Input Help Text */}
        <motion.div 
          className="mt-3 flex items-center justify-between text-xs text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center space-x-4">
            <span>💡 Try: derivatives, integrals, limits, equations</span>
            <motion.span 
              className="px-2 py-1 bg-purple-500/10 text-purple-400 rounded-md border border-purple-500/20"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              JEE Ready
            </motion.span>
          </div>
          <div className="text-right">
            <span>Press Enter to send</span>
          </div>
        </motion.div>
      </form>
    </div>
  );
};

export default ChatInput;
