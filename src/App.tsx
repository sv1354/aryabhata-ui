import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import BenchmarksPage from './pages/BenchmarksPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/benchmarks" element={<BenchmarksPage />} />
    </Routes>
  );
}

export default App;
