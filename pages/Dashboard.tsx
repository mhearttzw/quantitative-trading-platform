
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { 
    TrendingUp, 
    TrendingDown, 
    Activity, 
    DollarSign, 
    Clock, 
    AlertTriangle 
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { MOCK_STRATEGIES, generateHistoricalData } from '../constants';

const StatCard = ({ title, value, change, isPositive, labelVs, icon: Icon }: any) => (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-5 shadow-sm">
        <div className="flex justify-between items-start mb-4">
            <div>
                <p className="text-gray-400 text-sm font-medium mb-1">{title}</p>
                <h3 className="text-2xl font-bold text-white">{value}</h3>
            </div>
            <div className={`p-2 rounded-lg ${isPositive ? 'bg-success/10 text-success' : 'bg-brand-500/10 text-brand-500'}`}>
                <Icon size={20} />
            </div>
        </div>
        <div className="flex items-center text-xs">
            <span className={`font-medium ${change >= 0 ? 'text-success' : 'text-danger'}`}>
                {change > 0 ? '+' : ''}{change}%
            </span>
            <span className="text-gray-500 ml-2">{labelVs}</span>
        </div>
    </div>
);

const Dashboard: React.FC = () => {
    const { t } = useLanguage();
    const chartData = generateHistoricalData(30);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-white">{t('dash.title')}</h1>
                <div className="flex space-x-3">
                    <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm border border-gray-700 transition-colors">
                        {t('dash.export')}
                    </button>
                    <button className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-brand-500/20">
                        {t('dash.newStrategy')}
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title={t('dash.totalAum')} value="$2.4M" change={12.5} isPositive={true} labelVs={t('dash.vsLastMonth')} icon={DollarSign} />
                <StatCard title={t('dash.activeStrategies')} value="8" change={0} isPositive={true} labelVs={t('dash.vsLastMonth')} icon={Activity} />
                <StatCard title={t('dash.avgSharpe')} value="1.84" change={-2.1} isPositive={false} labelVs={t('dash.vsLastMonth')} icon={TrendingUp} />
                <StatCard title={t('dash.riskExposure')} value="45%" change={5.4} isPositive={false} labelVs={t('dash.vsLastMonth')} icon={AlertTriangle} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Chart */}
                <div className="lg:col-span-2 bg-gray-800 border border-gray-700 rounded-xl p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-semibold text-white">{t('dash.portfolioPerf')}</h3>
                        <div className="flex space-x-2">
                            {['1D', '1W', '1M', '3M', '1Y'].map((tf) => (
                                <button key={tf} className={`text-xs px-2 py-1 rounded ${tf === '1M' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white'}`}>
                                    {tf}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorEquity" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <XAxis 
                                    dataKey="date" 
                                    tickFormatter={(str) => new Date(str).getDate().toString()}
                                    stroke="#4b5563" 
                                    tick={{fill: '#9ca3af', fontSize: 12}}
                                />
                                <YAxis 
                                    domain={['auto', 'auto']}
                                    stroke="#4b5563" 
                                    tick={{fill: '#9ca3af', fontSize: 12}}
                                />
                                <Tooltip 
                                    contentStyle={{backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px'}}
                                    itemStyle={{color: '#e5e7eb'}}
                                />
                                <Area type="monotone" dataKey="equity" stroke="#3b82f6" fillOpacity={1} fill="url(#colorEquity)" strokeWidth={2} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Strategy List */}
                <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">{t('dash.topStrategies')}</h3>
                    <div className="space-y-4">
                        {MOCK_STRATEGIES.map((strategy) => (
                            <div key={strategy.id} className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg hover:bg-gray-700/50 transition-colors cursor-pointer border border-transparent hover:border-gray-600">
                                <div>
                                    <h4 className="font-medium text-sm text-white">{strategy.name}</h4>
                                    <div className="flex items-center text-xs text-gray-500 mt-1">
                                        <span className={`w-2 h-2 rounded-full mr-2 ${strategy.status === 'Running' ? 'bg-success' : 'bg-gray-500'}`}></span>
                                        {strategy.type}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-success font-mono text-sm">+{strategy.return}%</div>
                                    <div className="text-gray-500 text-xs">Sharpe: {strategy.sharpe}</div>
                                </div>
                            </div>
                        ))}
                        <button className="w-full mt-2 py-2 text-sm text-brand-400 hover:text-brand-300 font-medium border border-brand-500/30 rounded-lg hover:bg-brand-500/10 transition-colors">
                            {t('dash.viewAll')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
