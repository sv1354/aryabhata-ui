import React, { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

interface MathematicalBackgroundProps {
  variant?: 'landing' | 'chat';
}

const MathematicalBackground: React.FC<MathematicalBackgroundProps> = ({ variant = 'landing' }) => {
  const mathSymbols = useMemo(() => [
    '∫', '∑', '∏', '√', '∞', '∂', '∇', '∆', '∮', '∰',
    'π', 'θ', 'α', 'β', 'γ', 'δ', 'ε', 'λ', 'μ', 'σ',
    '≈', '≠', '≤', '≥', '±', '∓', '∝', '∴', '∵', '∀',
    '∃', '∈', '∉', '⊂', '⊃', '∪', '∩', '∅', '→', '←',
    '↑', '↓', '↔', '⇒', '⇐', '⟨', '⟩', '⟦', '⟧', '⟪'
  ], []);

  const mathFormulas = useMemo(() => [
    'e^{iπ} + 1 = 0',
    '∫_{-∞}^{∞} e^{-x²} dx = √π',
    'f(x) = Σ_{n=0}^{∞} \\frac{f^{(n)}(a)}{n!}(x-a)^n',
    '∇²φ = 0',
    'E = mc²',
    'F = ma',
    'a² + b² = c²',
    '\\frac{d}{dx}∫_{a}^{x} f(t)dt = f(x)',
    'lim_{x→∞} (1 + \\frac{1}{x})^x = e',
    '∮_C F⋅dr = ∬_S (∇×F)⋅n dS'
  ], []);

  const generateElements = (count: number) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      symbol: Math.random() < 0.7 ? mathSymbols[Math.floor(Math.random() * mathSymbols.length)] : mathFormulas[Math.floor(Math.random() * mathFormulas.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      scale: 0.5 + Math.random() * 1.5,
      rotation: Math.random() * 360,
      opacity: 0.1 + Math.random() * 0.3,
      duration: 20 + Math.random() * 40,
      delay: Math.random() * 10,
    }));
  };

  const elements = useMemo(() => generateElements(variant === 'landing' ? 80 : 40), [variant]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 opacity-80" />
      
      {/* Animated Mathematical Elements */}
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute text-blue-400/20 font-mono select-none"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            fontSize: element.symbol.length > 5 ? '12px' : '24px',
            opacity: element.opacity,
          }}
          initial={{ 
            scale: 0,
            rotate: element.rotation,
            opacity: 0
          }}
          animate={{ 
            scale: element.scale,
            rotate: element.rotation + 360,
            opacity: element.opacity,
            x: [-20, 20, -20],
            y: [-20, 20, -20],
          }}
          transition={{
            duration: element.duration,
            delay: element.delay,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        >
          {element.symbol}
        </motion.div>
      ))}

      {/* Floating Geometric Shapes */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`shape-${i}`}
          className="absolute border border-cyan-400/10"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${30 + Math.random() * 50}px`,
            height: `${30 + Math.random() * 50}px`,
          }}
          initial={{ rotate: 0, scale: 0 }}
          animate={{ 
            rotate: 360,
            scale: [0.5, 1, 0.5],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5
          }}
        />
      ))}

      {/* Mathematical Grid */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="cyan" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
    </div>
  );
};

export default MathematicalBackground; 