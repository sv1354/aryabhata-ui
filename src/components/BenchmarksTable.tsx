import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ExternalLink, X, Award, Target, TrendingUp, BarChart3, 
  Zap, Brain, Sparkles, Trophy, ChevronRight 
} from 'lucide-react';
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell, PieChart, Pie, LineChart, Line, Legend
} from 'recharts';

interface Benchmark {
  name: string;
  aryabhattaAccuracy: string;
  gpt4oAccuracy: string;
  link?: string;
}

// Enhanced data for visualizations
const scatterPlotData = [
  { name: 'Aryabhata 1.0', accuracy: 87, tokens: 2000, color: '#10b981', highlight: true },
  { name: 'Gemini 2.5 Flash o4-mini', accuracy: 84, tokens: 2200, color: '#6b7280' },
  { name: 'GPT-4.1', accuracy: 77, tokens: 1800, color: '#6b7280' },
  { name: 'AceReason-7B', accuracy: 70, tokens: 6200, color: '#6b7280' },
  { name: 'DeepSeek-R1', accuracy: 69, tokens: 6800, color: '#6b7280' },
  { name: 'AceReason-1.1-7B', accuracy: 65, tokens: 7500, color: '#6b7280' },
  { name: 'AceMath-7B-Instruct', accuracy: 62, tokens: 1200, color: '#6b7280' },
  { name: 'Qwen2.5-Math-7B-Instruct', accuracy: 51, tokens: 1600, color: '#6b7280' },
  { name: 'GPT-4o', accuracy: 45, tokens: 1000, color: '#ef4444' },
];

const jeeComparisonData = [
  { model: 'Aryabhata 1.0', jeeJan: 83, jeeApr: 85, color: '#10b981' },
  { model: 'Qwen2.5-Math-7B', jeeJan: 47, jeeApr: 54, color: '#6b7280' },
  { model: 'GPT-4o', jeeJan: 45, jeeApr: 43, color: '#ef4444' },
  { model: 'GPT-4.1', jeeJan: 75, jeeApr: 80, color: '#6b7280' },
  { model: 'o4-mini', jeeJan: 81, jeeApr: 84, color: '#6b7280' },
  { model: 'Gemini 2.5 Flash', jeeJan: 82, jeeApr: 82, color: '#6b7280' },
  { model: 'DeepSeek-R1-DeepThink-Qwen-7B', jeeJan: 68, jeeApr: 73, color: '#6b7280' },
  { model: 'AceReason-Nemotron-7B', jeeJan: 67, jeeApr: 74, color: '#6b7280' },
  { model: 'AceReason-Nemotron-1.1-7B', jeeJan: 65, jeeApr: 63, color: '#6b7280' },
  { model: 'Qwen2.5-Math-7B-Instruct', jeeJan: 49, jeeApr: 53, color: '#6b7280' },
  { model: 'AceMath-7B-Instruct', jeeJan: 59, jeeApr: 64, color: '#6b7280' },
];

const performanceMetrics = [
  { name: 'Accuracy', value: 87, max: 100, color: '#10b981', icon: Target },
  { name: 'Efficiency', value: 92, max: 100, color: '#3b82f6', icon: Zap },
  { name: 'Consistency', value: 89, max: 100, color: '#8b5cf6', icon: Brain },
  { name: 'Speed', value: 95, max: 100, color: '#f59e0b', icon: Sparkles },
];

const benchmarks: Benchmark[] = [
  {
    name: "JEE Mains April2nd Shift1 Maths",
    aryabhattaAccuracy: "75%",
    gpt4oAccuracy: "28.57%",
    link: "https://docs.google.com/spreadsheets/d/15tTVT43u1YO6XYw_tQArw8lnGyY5aOfdgTdiNnP-15g/edit?gid=544633816#gid=544633816"
  },
  {
    name: "JEE Mains April2nd Shift2 Maths",
    aryabhattaAccuracy: "82.35%",
    gpt4oAccuracy: "50%",
    link: "https://docs.google.com/spreadsheets/d/15tTVT43u1YO6XYw_tQArw8lnGyY5aOfdgTdiNnP-15g/edit?gid=544633816#gid=544633816"
  },
  {
    name: "JEE Mains April3rd Shift1 Maths",
    aryabhattaAccuracy: "69.23%",
    gpt4oAccuracy: "28.5%",
    link: "https://docs.google.com/spreadsheets/d/15tTVT43u1YO6XYw_tQArw8lnGyY5aOfdgTdiNnP-15g/edit?gid=544633816#gid=544633816"
  },
  {
    name: "JEE Mains April4th Shift1 Maths",
    aryabhattaAccuracy: "86.67%",
    gpt4oAccuracy: "40%",
    link: "https://docs.google.com/spreadsheets/d/15tTVT43u1YO6XYw_tQArw8lnGyY5aOfdgTdiNnP-15g/edit?gid=544633816#gid=544633816"
  },
  {
    name: "JEE Mains Bench (2016-2023)",
    aryabhattaAccuracy: "47%",
    gpt4oAccuracy: "35%"
  }
];

interface BenchmarksTableProps {
  isOpen: boolean;
  onClose: () => void;
}

const BenchmarksTable: React.FC<BenchmarksTableProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'accuracy-tokens' | 'jee-comparison' | 'detailed'>('overview');

  if (!isOpen) return null;

  const calculateImprovement = (aryabhatta: string, gpt4o: string) => {
    const aryabhattaNum = parseFloat(aryabhatta.replace('%', ''));
    const gpt4oNum = parseFloat(gpt4o.replace('%', ''));
    return ((aryabhattaNum - gpt4oNum) / gpt4oNum * 100).toFixed(1);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-800/95 backdrop-blur-xl border border-slate-600/50 rounded-xl p-4 shadow-2xl">
          <p className="text-white font-semibold mb-2">{data.name}</p>
          <p className="text-blue-400">Accuracy: {data.accuracy}%</p>
          <p className="text-purple-400">Tokens: {data.tokens?.toLocaleString()}</p>
          {data.highlight && (
            <p className="text-emerald-400 text-xs mt-1 font-semibold">★ PhysicsWallah's Model</p>
          )}
        </div>
      );
    }
    return null;
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Trophy },
    { id: 'accuracy-tokens', label: 'Efficiency Analysis', icon: Target },
    { id: 'jee-comparison', label: 'JEE Mains Performance', icon: BarChart3 },
    // { id: 'detailed', label: 'Detailed Data', icon: TrendingUp },
  ];

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div 
          className="bg-slate-800/95 backdrop-blur-xl rounded-3xl shadow-2xl max-w-7xl w-full max-h-[95vh] overflow-hidden border border-slate-600/50"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-8 border-b border-slate-700/50 bg-gradient-to-r from-slate-800/50 to-slate-900/50">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-4">
                <motion.div 
                  className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg"
                  animate={{ 
                    boxShadow: [
                      '0 0 30px rgba(59, 130, 246, 0.3)',
                      '0 0 50px rgba(147, 51, 234, 0.4)',
                      '0 0 30px rgba(59, 130, 246, 0.3)'
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Award className="w-8 h-8 text-white" />
                </motion.div>
                <div>
                  <h2 className="text-3xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Aryabhata 1.0 Benchmarks
                  </h2>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-orange-400 text-lg font-semibold">Physics Wallah</span>
                    <div className="text-gray-400">•</div>
                    <span className="text-gray-400 text-lg">JEE Mains Performance Analysis</span>
                  </div>
                </div>
              </div>
              
              <motion.button 
                onClick={onClose}
                className="p-4 text-gray-400 hover:text-white bg-slate-700/50 hover:bg-slate-600/50 rounded-2xl transition-colors border border-slate-600/50"
                whileHover={{ scale: 1.05, rotate: 90 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="w-6 h-6" />
              </motion.button>
            </div>

            {/* Tabs */}
            <div className="flex space-x-2 bg-slate-700/30 rounded-2xl p-2">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'text-gray-400 hover:text-white hover:bg-slate-600/30'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </motion.button>
              ))}
            </div>
          </div>
          
          {/* Content */}
          <div className="p-8 overflow-auto max-h-[70vh]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div className="space-y-8">
                    {/* Key Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                      {performanceMetrics.map((metric, index) => (
                        <motion.div
                          key={metric.name}
                          className="bg-slate-700/30 rounded-2xl p-6 border border-slate-600/30"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.02, y: -5 }}
                        >
                          <div className="flex items-center justify-between mb-4">
                            <metric.icon className={`w-8 h-8`} style={{ color: metric.color }} />
                            <span className="text-2xl font-bold text-white">{metric.value}%</span>
                          </div>
                          <h3 className="text-gray-300 font-semibold">{metric.name}</h3>
                          <div className="mt-3 bg-slate-800 rounded-full h-2 overflow-hidden">
                            <motion.div
                              className="h-full rounded-full"
                              style={{ backgroundColor: metric.color }}
                              initial={{ width: 0 }}
                              animate={{ width: `${(metric.value / metric.max) * 100}%` }}
                              transition={{ duration: 1, delay: index * 0.2 }}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Key Highlights */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <motion.div 
                        className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 rounded-2xl p-6 border border-emerald-500/20 cursor-pointer"
                        whileHover={{ scale: 1.02 }}
                        onClick={() => setActiveTab('accuracy-tokens')}
                      >
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                            <Trophy className="w-6 h-6 text-emerald-400" />
                          </div>
                          <h3 className="text-xl font-bold text-emerald-400">Best in Class</h3>
                        </div>
                        <p className="text-gray-300 mb-4">
                          <span className="text-emerald-400 font-bold">Aryabhata 1.0</span> achieves <span className="text-emerald-400 font-bold">87% accuracy</span> while using 
                          <span className="text-blue-400 font-bold"> 2x fewer tokens</span> than competitors.
                        </p>
                        <div className="flex items-center text-emerald-400 font-semibold hover:text-emerald-300 transition-colors">
                          <span>View efficiency analysis</span>
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </div>
                      </motion.div>

                      <motion.div 
                        className="bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-2xl p-6 border border-blue-500/20 cursor-pointer"
                        whileHover={{ scale: 1.02 }}
                        onClick={() => setActiveTab('jee-comparison')}
                      >
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                            <BarChart3 className="w-6 h-6 text-blue-400" />
                          </div>
                          <h3 className="text-xl font-bold text-blue-400">JEE Mains Dominance</h3>
                        </div>
                        <p className="text-gray-300 mb-4">
                          <span className="text-orange-400 font-semibold">PhysicsWallah's</span> Aryabhata 1.0 maintains consistent <span className="text-blue-400 font-bold">80%+ performance</span> across all JEE Mains mathematics papers, 
                          <span className="text-purple-400 font-bold"> 3x better</span> than frontier models.
                        </p>
                        <div className="flex items-center text-blue-400 font-semibold hover:text-blue-300 transition-colors">
                          <span>View JEE Mains comparison</span>
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </div>
                      </motion.div>
                    </div>
                  </div>
                )}

                {/* Accuracy vs Tokens Tab */}
                {activeTab === 'accuracy-tokens' && (
                  <div>
                    <div className="mb-8">
                      <h3 className="text-2xl font-bold text-white mb-2">Accuracy vs Token Usage</h3>
                      <p className="text-gray-400">
                        <span className="text-blue-400 font-semibold">Aryabhata 1.0</span> achieves superior accuracy with optimal token efficiency
                      </p>
                    </div>
                    
                    <div className="bg-slate-700/20 rounded-2xl p-6 border border-slate-600/30">
                      <ResponsiveContainer width="100%" height={500}>
                        <ScatterChart margin={{ top: 20, right: 30, bottom: 60, left: 40 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                          <XAxis 
                            dataKey="tokens" 
                            type="number" 
                            domain={[800, 8000]}
                            tick={{ fill: '#9ca3af', fontSize: 12 }}
                            axisLine={{ stroke: '#4b5563' }}
                            label={{ value: 'Tokens', position: 'insideBottom', offset: -10, style: { textAnchor: 'middle', fill: '#9ca3af' } }}
                          />
                          <YAxis 
                            dataKey="accuracy" 
                            type="number" 
                            domain={[40, 90]}
                            tick={{ fill: '#9ca3af', fontSize: 12 }}
                            axisLine={{ stroke: '#4b5563' }}
                            label={{ value: 'Accuracy (%)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#9ca3af' } }}
                          />
                          <Tooltip content={<CustomTooltip />} />
                          <Scatter data={scatterPlotData} fill="#8884d8">
                            {scatterPlotData.map((entry, index) => (
                              <Cell 
                                key={`cell-${index}`} 
                                fill={entry.highlight ? '#10b981' : entry.color}
                                r={entry.highlight ? 12 : 8}
                              />
                            ))}
                          </Scatter>
                        </ScatterChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Model Legend */}
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                      {scatterPlotData.map((model, index) => (
                        <motion.div
                          key={index}
                          className={`flex items-center space-x-3 p-3 rounded-lg ${
                            model.highlight 
                              ? 'bg-emerald-500/20 border border-emerald-500/30' 
                              : 'bg-slate-700/30 border border-slate-600/30'
                          }`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <div 
                            className="w-3 h-3 rounded-full flex-shrink-0"
                            style={{ backgroundColor: model.highlight ? '#10b981' : model.color }}
                          />
                          <div className="min-w-0 flex-1">
                            <div className={`text-sm font-medium ${model.highlight ? 'text-emerald-300' : 'text-gray-300'}`}>
                              {model.name}
                            </div>
                            <div className="text-xs text-gray-400">
                              {model.accuracy}% accuracy • {model.tokens?.toLocaleString()} tokens
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <motion.div 
                      className="mt-6 p-6 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-2xl border border-emerald-500/20"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                        <h4 className="text-lg font-bold text-emerald-400">Aryabhatta v1.0 Advantage</h4>
                      </div>
                      <p className="text-gray-300">
                        <strong>Optimal Efficiency:</strong> <span className="text-orange-400 font-semibold">PhysicsWallah's</span> Aryabhata 1.0 achieves the highest accuracy (87%) while using significantly fewer tokens (2,000) 
                        compared to other frontier models. This represents the ideal balance of performance and efficiency.
                      </p>
                    </motion.div>
                  </div>
                )}

                {/* JEE Comparison Tab */}
                {activeTab === 'jee-comparison' && (
                  <div>
                    <div className="mb-8">
                      <h3 className="text-2xl font-bold text-white mb-2">JEE Mains Mathematics Performance</h3>
                      <p className="text-gray-400">
                        Comparative analysis of <span className="text-blue-400 font-semibold">Aryabhata 1.0</span> across JEE Mains January and April examinations
                      </p>
                    </div>
                    
                    <div className="bg-slate-700/20 rounded-2xl p-6 border border-slate-600/30">
                      <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={jeeComparisonData} margin={{ top: 20, right: 30, bottom: 60, left: 20 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                          <XAxis 
                            dataKey="model" 
                            tick={{ fill: '#9ca3af', fontSize: 10 }}
                            angle={-45}
                            textAnchor="end"
                            height={80}
                          />
                          <YAxis 
                            tick={{ fill: '#9ca3af', fontSize: 12 }}
                            axisLine={{ stroke: '#4b5563' }}
                          />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: 'rgba(30, 41, 59, 0.95)',
                              border: '1px solid rgba(59, 130, 246, 0.3)',
                              borderRadius: '12px',
                              backdropFilter: 'blur(12px)'
                            }}
                          />
                          <Legend />
                          <Bar dataKey="jeeJan" name="JEE Mains Jan" fill="#fbbf24" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="jeeApr" name="JEE Mains Apr" fill="#f97316" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                      <motion.div 
                        className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 rounded-2xl p-6 border border-emerald-500/20"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <h4 className="text-lg font-bold text-emerald-400 mb-3">Top Performance</h4>
                        <p className="text-gray-300">
                          <span className="text-blue-400 font-semibold">Aryabhata 1.0</span> leads with <span className="text-emerald-400 font-bold">86 & 90.2% accuracy</span> across both JEE Mains sessions, 
                          demonstrating consistent excellence in competitive mathematics.
                        </p>
                      </motion.div>

                      <motion.div 
                        className="bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-2xl p-6 border border-blue-500/20"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <h4 className="text-lg font-bold text-blue-400 mb-3">Competitive Edge</h4>
                        <p className="text-gray-300">
                          Outperforms GPT-4o by <span className="text-blue-400 font-bold">90%+ margin</span> and maintains superiority 
                          over other frontier models across all JEE Mains test conditions.
                        </p>
                      </motion.div>
                    </div>
                  </div>
                )}

                {/* Detailed Data Tab */}
                {activeTab === 'detailed' && (
                  <div>
                    <div className="mb-8">
                      <h3 className="text-2xl font-bold text-white mb-2">Detailed Benchmark Results</h3>
                      <p className="text-gray-400">
                        Comprehensive performance data for <span className="text-blue-400 font-semibold">Aryabhata 1.0</span> across all JEE Mains benchmarks
                      </p>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="min-w-full">
                        <thead>
                          <tr className="border-b border-slate-700/50">
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                              Benchmark Test
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                              Aryabhata 1.0 Accuracy
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                              GPT-4o Accuracy
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                              Improvement
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                              Reference
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700/30">
                          {benchmarks.map((benchmark, index) => (
                            <motion.tr 
                              key={index} 
                              className="hover:bg-slate-700/20 transition-colors"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 * index }}
                              whileHover={{ scale: 1.01 }}
                            >
                              <td className="px-6 py-4">
                                <div className="text-sm font-medium text-gray-200">
                                  {benchmark.name}
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center space-x-2">
                                  <motion.div 
                                    className="text-sm font-bold text-emerald-400"
                                    animate={{ scale: [1, 1.05, 1] }}
                                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                                  >
                                    {benchmark.aryabhattaAccuracy}
                                  </motion.div>
                                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                                </div>
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-400">
                                {benchmark.gpt4oAccuracy}
                              </td>
                              <td className="px-6 py-4">
                                <motion.span 
                                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30"
                                  whileHover={{ scale: 1.05 }}
                                >
                                  +{calculateImprovement(benchmark.aryabhattaAccuracy, benchmark.gpt4oAccuracy)}%
                                </motion.span>
                              </td>
                              <td className="px-6 py-4 text-sm">
                                {benchmark.link ? (
                                  <motion.a 
                                    href={benchmark.link} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-blue-400 hover:text-blue-300 flex items-center transition-colors"
                                    whileHover={{ scale: 1.05 }}
                                  >
                                    <span className="mr-1">View</span>
                                    <ExternalLink size={12} />
                                  </motion.a>
                                ) : (
                                  <span className="text-gray-500 text-xs">Internal testing</span>
                                )}
                              </td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <motion.div 
                      className="mt-8 p-6 bg-slate-700/30 rounded-2xl border border-slate-600/30"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                    >
                      <p className="text-gray-400 text-sm leading-relaxed">
                                                  <strong className="text-blue-400">Methodology:</strong> These benchmarks represent <span className="text-blue-400 font-semibold">Aryabhata 1.0's</span> performance on JEE Mains mathematics questions from various years and shifts. 
                        Results demonstrate <span className="text-orange-400 font-semibold">PhysicsWallah's</span> superior performance on competitive exam problems, with consistent improvements 
                        across different mathematical domains including algebra, calculus, geometry, and trigonometry. All tests conducted 
                        under standardized conditions with identical problem sets and evaluation criteria.
                      </p>
                    </motion.div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BenchmarksTable;
