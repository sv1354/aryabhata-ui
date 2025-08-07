import React from 'react';
import { motion } from 'framer-motion';
import { InlineMath, BlockMath } from 'react-katex';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import 'katex/dist/katex.min.css';

interface EnhancedTextRendererProps {
  content: string;
}

const EnhancedTextRenderer: React.FC<EnhancedTextRendererProps> = ({ content }) => {
  console.log('EnhancedTextRenderer received content:', content);
  console.log('Content length:', content.length);
  
  // Function to detect and render LaTeX math expressions
  const renderMathExpressions = (text: string) => {
    console.log('Processing text:', text);
    console.log('Text length:', text.length);
    
    // Inline math: $...$ or \(...\)
    const inlineMathRegex = /\$([^$\n]+?)\$|\\\(([^)]+?)\\\)/g;
    
    // Block math: $$...$$ or \[...\]
    const blockMathRegex = /\$\$([\s\S]*?)\$\$|\\\[([\s\S]*?)\\\]/g;
    
    // Code blocks: ```language ... ```
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    
    // Inline code: `...`
    const inlineCodeRegex = /`([^`]+)`/g;
    
    const elements: React.ReactNode[] = [];
    let lastIndex = 0;
    let processedText = text;
    
    // Process block math first
    processedText = processedText.replace(blockMathRegex, (match, content1, content2, offset) => {
      const mathContent = content1 || content2;
      const beforeText = text.slice(lastIndex, offset);
      if (beforeText) {
        elements.push(<span key={`text-${offset}`}>{beforeText}</span>);
      }
      elements.push(
        <motion.div
          key={`math-${offset}`}
          className="my-4 p-4 bg-slate-800/50 rounded-lg border border-slate-600/30 overflow-x-auto"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <BlockMath math={mathContent} />
        </motion.div>
      );
      lastIndex = offset + match.length;
      return match; // Keep the original match for further processing
    });
    
    // Process code blocks
    processedText = processedText.replace(codeBlockRegex, (match, language, code, offset) => {
      const beforeText = text.slice(lastIndex, offset);
      if (beforeText) {
        elements.push(<span key={`text-${offset}`}>{beforeText}</span>);
      }
      elements.push(
        <motion.div
          key={`code-${offset}`}
          className="my-4 rounded-lg overflow-hidden border border-slate-600/30"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <SyntaxHighlighter
            language={language || 'text'}
            style={tomorrow}
            customStyle={{
              margin: 0,
              borderRadius: '8px',
              fontSize: '14px',
              lineHeight: '1.5'
            }}
          >
            {code}
          </SyntaxHighlighter>
        </motion.div>
      );
      lastIndex = offset + match.length;
      return match; // Keep the original match for further processing
    });
    
    // Process inline code
    processedText = processedText.replace(inlineCodeRegex, (match, code, offset) => {
      const beforeText = text.slice(lastIndex, offset);
      if (beforeText) {
        elements.push(<span key={`text-${offset}`}>{beforeText}</span>);
      }
      elements.push(
        <code
          key={`inline-code-${offset}`}
          className="bg-slate-700/50 text-emerald-300 px-2 py-1 rounded-md text-sm font-mono border border-slate-600/30"
        >
          {code}
        </code>
      );
      lastIndex = offset + match.length;
      return match; // Keep the original match for further processing
    });
    
    // Process inline math
    processedText = processedText.replace(inlineMathRegex, (match, content1, content2, offset) => {
      const mathContent = content1 || content2;
      const beforeText = text.slice(lastIndex, offset);
      if (beforeText) {
        elements.push(<span key={`text-${offset}`}>{beforeText}</span>);
      }
      elements.push(
        <span key={`inline-math-${offset}`} className="text-blue-300">
          <InlineMath math={mathContent} />
        </span>
      );
      lastIndex = offset + match.length;
      return match; // Keep the original match for further processing
    });
    
    // Add remaining text from the original text
    if (lastIndex < text.length) {
      elements.push(<span key="remaining-text">{text.slice(lastIndex)}</span>);
    }
    
    console.log('Final elements count:', elements.length);
    console.log('Last index:', lastIndex);
    console.log('Text length:', text.length);
    
    // Return the processed elements
    return elements.length > 0 ? elements : <span>{text}</span>;
  };

  return (
    <div className="space-y-2">
      {renderMathExpressions(content)}
    </div>
  );
};

export default EnhancedTextRenderer; 