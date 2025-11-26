
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { generateHistoricalData } from '../constants';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { Calendar, DollarSign, Activity, Percent } from 'lucide-react';

const MetricCard = ({ label, value, subtext }: any) => (
    <div className="bg-gray-800 border border-gray-700 p-4 rounded-lg">
        <div className="text-gray-400 text-xs uppercase tracking-wider font-semibold mb-1">{label}</div>
        <div className="text-xl font-bold text-white font-mono">{value}</div>
        {subtext && <div className="text-xs text-gray-500 mt-1">{subtext}</div>}
    </div>
);

const Backtest: React.FC = () => {
    const { t } = useLanguage();
    // Generate 365 days of data for a "Year" backtest
    const data = generateHistoricalData(180);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center">
                        {t('bt.title')} 
                        <span className="ml-3 text-sm bg-success/20 text-success px-2 py-1 rounded border border-success/30 font-medium">{t('bt.pass')}</span>
                    </h1>
                    <p className="text-gray-400 text-sm mt-1">Strategy: <span className="text-white font-medium">Golden Cross v2</span> • Period: Jan 2024 - Jun 2024</p>
                </div>
                <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm border border-gray-700 transition-colors">
                    {t('bt.download')}
                </button>
            </div>

            {/* Key Metrics Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <MetricCard label={t('bt.totalReturn')} value="+42.8%" subtext="Benchmark: +12.4%" />
                <MetricCard label={t('bt.sharpe')} value="2.14" subtext="Top 5%" />
                <MetricCard label={t('bt.maxDD')} value="-8.4%" subtext="Recovery: 14 days" />
                <MetricCard label={t('bt.winRate')} value="64.2%" subtext="Total Trades: 142" />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Equity Curve */}
                <div className="lg:col-span-2 bg-gray-800 border border-gray-700 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-6">{t('bt.cumulative')}</h3>
                    <div className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="equityGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="date" hide />
                                <YAxis domain={['auto', 'auto']} stroke="#4b5563" />
                                <Tooltip 
                                    contentStyle={{backgroundColor: '#1f2937', border: '1px solid #374151'}}
                                    itemStyle={{color: '#e5e7eb'}}
                                    labelStyle={{color: '#9ca3af'}}
                                />
                                <Legend />
                                <Area name="Strategy" type="monotone" dataKey="equity" stroke="#3b82f6" fill="url(#equityGradient)" strokeWidth={2} />
                                <Area name="Benchmark" type="monotone" dataKey="benchmark" stroke="#6b7280" fillOpacity={0} strokeDasharray="5 5" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Stats / Distribution */}
                <div className="space-y-6">
                    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 h-full flex flex-col">
                        <h3 className="text-lg font-semibold text-white mb-4">{t('bt.riskAnalysis')}</h3>
                        <div className="space-y-4 flex-1">
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-400">{t('bt.volatility')}</span>
                                    <span className="text-white">14.2%</span>
                                </div>
                                <div className="w-full bg-gray-700 rounded-full h-2">
                                    <div className="bg-yellow-500 h-2 rounded-full" style={{width: '45%'}}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-400">Beta</span>
                                    <span className="text-white">0.85</span>
                                </div>
                                <div className="w-full bg-gray-700 rounded-full h-2">
                                    <div className="bg-blue-500 h-2 rounded-full" style={{width: '85%'}}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-400">Alpha</span>
                                    <span className="text-white">0.12</span>
                                </div>
                                <div className="w-full bg-gray-700 rounded-full h-2">
                                    <div className="bg-green-500 h-2 rounded-full" style={{width: '60%'}}></div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="mt-8 pt-6 border-t border-gray-700">
                             <h4 className="text-sm font-semibold text-white mb-3">{t('bt.monthly')}</h4>
                             <div className="grid grid-cols-6 gap-1">
                                {[2.1, -1.2, 3.4, 0.5, -0.8, 4.2, 1.1, 2.3, -0.5, 1.8, 2.9, 0.4].map((val, i) => (
                                    <div 
                                        key={i} 
                                        className={`h-8 rounded text-[10px] flex items-center justify-center font-mono ${val > 0 ? 'bg-success/20 text-success' : 'bg-danger/20 text-danger'}`}
                                    >
                                        {val > 0 ? '+' : ''}{val}
                                    </div>
                                ))}
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Backtest;
