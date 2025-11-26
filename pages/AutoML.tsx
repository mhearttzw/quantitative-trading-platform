
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { MOCK_AUTOML_TASKS } from '../constants';
import { Cpu, Zap, GitBranch, PlayCircle, StopCircle } from 'lucide-react';

const AutoML: React.FC = () => {
    const { t } = useLanguage();

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center">
                        <Cpu className="mr-3 text-brand-500" />
                        {t('ai.title')}
                    </h1>
                    <p className="text-gray-400 text-sm mt-1">{t('ai.desc')}</p>
                </div>
                <button className="bg-brand-600 hover:bg-brand-700 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-lg shadow-brand-500/20 flex items-center">
                    <Zap size={18} className="mr-2" />
                    {t('ai.start')}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Active Tasks */}
                <div className="lg:col-span-2 space-y-4">
                    <h2 className="text-lg font-semibold text-white">{t('ai.activeTasks')}</h2>
                    
                    {MOCK_AUTOML_TASKS.map((task) => (
                        <div key={task.id} className="bg-gray-800 border border-gray-700 rounded-xl p-5 shadow-sm">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <div className="flex items-center space-x-3">
                                        <h3 className="font-bold text-white">{task.name}</h3>
                                        <span className={`px-2 py-0.5 rounded text-xs font-medium border ${
                                            task.status === 'Searching' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                            task.status === 'Training' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                                            'bg-green-500/10 text-green-400 border-green-500/20'
                                        }`}>
                                            {t(`common.${task.status.toLowerCase()}`)}
                                        </span>
                                    </div>
                                    <div className="text-xs text-gray-400 font-mono mt-2 bg-gray-900 px-2 py-1 rounded inline-block">
                                        {t('ai.bestFormula')}: {task.formula}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-white font-mono">{task.bestIc.toFixed(3)}</div>
                                    <div className="text-xs text-gray-500">Information Coeff (IC)</div>
                                </div>
                            </div>
                            
                            {/* Progress Bar */}
                            <div className="space-y-1">
                                <div className="flex justify-between text-xs text-gray-400">
                                    <span>{t('ai.generation')} {task.generation}</span>
                                    <span>{task.progress}%</span>
                                </div>
                                <div className="w-full bg-gray-700 rounded-full h-2">
                                    <div 
                                        className="bg-gradient-to-r from-brand-600 to-purple-500 h-2 rounded-full transition-all duration-500 relative" 
                                        style={{width: `${task.progress}%`}}
                                    >
                                        {task.status === 'Searching' && (
                                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-lg animate-ping"></div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end mt-4 space-x-3">
                                <button className="text-xs text-gray-400 hover:text-white flex items-center">
                                    <StopCircle size={14} className="mr-1" /> {t('ai.stop')}
                                </button>
                                <button className="text-xs text-brand-400 hover:text-brand-300 font-medium">
                                    {t('ai.view')} &rarr;
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Control Panel */}
                <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">{t('ai.config')}</h3>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-medium text-gray-400 mb-1">{t('ai.method')}</label>
                            <select className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-500">
                                <option>Genetic Programming (GP)</option>
                                <option>Reinforcement Learning (PPO)</option>
                                <option>Symbolic Regression</option>
                            </select>
                        </div>
                        
                        <div>
                            <label className="block text-xs font-medium text-gray-400 mb-1">{t('ai.objective')}</label>
                            <select className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-500">
                                <option>Rank IC</option>
                                <option>Sharpe Ratio</option>
                                <option>Calmar Ratio</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-400 mb-1">{t('ai.compute')}</label>
                            <div className="grid grid-cols-2 gap-2">
                                <div className="bg-gray-900 border border-brand-500/50 rounded-lg p-2 cursor-pointer">
                                    <div className="text-xs text-brand-400 font-medium">{t('ai.gpuCluster')}</div>
                                    <div className="text-[10px] text-gray-500">8x A100 Available</div>
                                </div>
                                <div className="bg-gray-900 border border-gray-700 rounded-lg p-2 cursor-pointer opacity-60">
                                    <div className="text-xs text-gray-400 font-medium">{t('ai.localCpu')}</div>
                                    <div className="text-[10px] text-gray-500">32 Cores</div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-gray-700">
                            <div className="flex items-start space-x-2 p-3 bg-brand-900/20 rounded border border-brand-500/20">
                                <GitBranch size={16} className="text-brand-400 mt-0.5" />
                                <div className="text-xs text-gray-300">
                                    {t('ai.gitCommit')} <span className="font-mono text-brand-400">/factors/candidate</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AutoML;
