
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Play, Save, Settings, Layers, Terminal } from 'lucide-react';
import { DEFAULT_PYTHON_CODE } from '../constants';

const StrategyLab: React.FC = () => {
    const { t } = useLanguage();
    const [code, setCode] = useState(DEFAULT_PYTHON_CODE);
    const [activeTab, setActiveTab] = useState('editor');
    const [isRunning, setIsRunning] = useState(false);
    const [consoleOutput, setConsoleOutput] = useState<string[]>([t('ide.ready')]);

    const handleRun = () => {
        setIsRunning(true);
        setConsoleOutput(prev => [...prev, '> Compiling strategy...', '> Initializing backtest engine...', '> Loading market data for AAPL...', '> 0% ... 20% ... 50% ... 80% ...']);
        setTimeout(() => {
            setIsRunning(false);
            setConsoleOutput(prev => [...prev, '> Backtest Complete.', '> Sharpe: 2.14 | Return: 15.4% | MaxDD: -4.2%']);
        }, 1500);
    };

    return (
        <div className="flex flex-col h-[calc(100vh-8rem)]">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-4">
                    <h1 className="text-xl font-bold text-white">{t('ide.title')}</h1>
                    <div className="flex bg-gray-800 rounded-lg p-1 border border-gray-700">
                        <button 
                            className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${activeTab === 'editor' ? 'bg-gray-700 text-white shadow-sm' : 'text-gray-400 hover:text-white'}`}
                            onClick={() => setActiveTab('editor')}
                        >
                            {t('ide.tab.editor')}
                        </button>
                        <button 
                            className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${activeTab === 'config' ? 'bg-gray-700 text-white shadow-sm' : 'text-gray-400 hover:text-white'}`}
                            onClick={() => setActiveTab('config')}
                        >
                            {t('ide.tab.config')}
                        </button>
                    </div>
                </div>
                <div className="flex space-x-3">
                    <button className="flex items-center space-x-2 text-gray-400 hover:text-white px-3 py-2 rounded-lg text-sm transition-colors">
                        <Save size={16} />
                        <span>{t('ide.save')}</span>
                    </button>
                    <button 
                        onClick={handleRun}
                        disabled={isRunning}
                        className={`flex items-center space-x-2 ${isRunning ? 'bg-gray-600' : 'bg-success hover:bg-green-600'} text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-green-900/20`}
                    >
                        {isRunning ? (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            <Play size={16} />
                        )}
                        <span>{isRunning ? t('ide.running') : t('ide.run')}</span>
                    </button>
                </div>
            </div>

            <div className="flex-1 flex gap-4 min-h-0">
                {/* Editor Pane */}
                <div className="flex-1 flex flex-col bg-gray-950 border border-gray-800 rounded-xl overflow-hidden shadow-sm">
                    <div className="bg-gray-900 border-b border-gray-800 px-4 py-2 flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-sm text-gray-400">
                            <span className="text-brand-400">main.py</span>
                        </div>
                        <div className="text-xs text-gray-500">Python 3.11</div>
                    </div>
                    <textarea 
                        className="flex-1 w-full h-full bg-[#0d1117] text-gray-300 font-mono text-sm p-4 focus:outline-none resize-none"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        spellCheck={false}
                    />
                </div>

                {/* Side Panel (Context/Logs) */}
                <div className="w-80 flex flex-col gap-4">
                    {/* Data Panel */}
                    <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 flex-1 overflow-y-auto">
                        <div className="flex items-center space-x-2 text-white font-medium mb-3">
                            <Layers size={16} />
                            <span>{t('ide.dataSources')}</span>
                        </div>
                        <div className="space-y-2">
                            <div className="p-2 bg-gray-900/50 rounded border border-gray-700/50 text-sm">
                                <div className="text-gray-300">AAPL <span className="text-gray-500 text-xs">NASDAQ</span></div>
                                <div className="text-xs text-gray-500 mt-1">OHLCV • 1 Minute • 2023-2024</div>
                            </div>
                            <div className="p-2 bg-gray-900/50 rounded border border-gray-700/50 text-sm">
                                <div className="text-gray-300">SPY <span className="text-gray-500 text-xs">ETF</span></div>
                                <div className="text-xs text-gray-500 mt-1">OHLCV • 1 Minute • Benchmark</div>
                            </div>
                        </div>
                    </div>

                    {/* Console Output */}
                    <div className="h-64 bg-gray-950 border border-gray-800 rounded-xl flex flex-col">
                        <div className="bg-gray-900 border-b border-gray-800 px-4 py-2 flex items-center space-x-2">
                            <Terminal size={14} className="text-gray-400" />
                            <span className="text-xs font-medium text-gray-400 uppercase">{t('ide.console')}</span>
                        </div>
                        <div className="flex-1 p-3 font-mono text-xs overflow-y-auto space-y-1">
                            {consoleOutput.map((line, i) => (
                                <div key={i} className="text-gray-400">{line}</div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StrategyLab;
