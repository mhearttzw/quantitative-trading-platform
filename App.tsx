
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import MarketData from './pages/MarketData';
import StrategyLab from './pages/StrategyLab';
import Backtest from './pages/Backtest';
import AutoML from './pages/AutoML';
import Docs from './pages/Docs';
import { LanguageProvider } from './contexts/LanguageContext';

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <HashRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/market" element={<MarketData />} />
            <Route path="/ide" element={<StrategyLab />} />
            <Route path="/backtest" element={<Backtest />} />
            <Route path="/automl" element={<AutoML />} />
            <Route path="/docs" element={<Docs />} />
            {/* Fallback routes for demos not yet implemented */}
            <Route path="/settings" element={<div className="text-gray-400 text-center mt-20">Settings Module coming in Phase 2</div>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </HashRouter>
    </LanguageProvider>
  );
};

export default App;
