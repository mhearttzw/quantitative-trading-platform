
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { MOCK_MARKET_DATA } from '../constants';
import { ArrowUp, ArrowDown, Download, Filter } from 'lucide-react';

const MarketData: React.FC = () => {
    const { t } = useLanguage();

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-white">{t('market.title')}</h1>
                    <p className="text-gray-400 text-sm mt-1">{t('market.desc')}</p>
                </div>
                <div className="flex space-x-3">
                    <button className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm border border-gray-700 transition-colors">
                        <Filter size={16} />
                        <span>{t('market.filter')}</span>
                    </button>
                    <button className="flex items-center space-x-2 bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg text-sm border border-transparent transition-colors">
                        <Download size={16} />
                        <span>{t('market.export')}</span>
                    </button>
                </div>
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden shadow-lg">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-900 border-b border-gray-700">
                                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">{t('market.col.symbol')}</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">{t('market.col.name')}</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">{t('market.col.price')}</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">{t('market.col.change')}</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">{t('market.col.volume')}</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">{t('market.col.sector')}</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">{t('market.col.action')}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {MOCK_MARKET_DATA.map((stock) => (
                                <tr key={stock.symbol} className="hover:bg-gray-700/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <span className="font-mono font-medium text-brand-400">{stock.symbol}</span>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-white">{stock.name}</td>
                                    <td className="px-6 py-4 font-mono text-sm text-white">${stock.price.toFixed(2)}</td>
                                    <td className="px-6 py-4">
                                        <div className={`flex items-center text-sm font-mono ${stock.change >= 0 ? 'text-success' : 'text-danger'}`}>
                                            {stock.change >= 0 ? <ArrowUp size={14} className="mr-1" /> : <ArrowDown size={14} className="mr-1" />}
                                            {stock.changePercent.toFixed(2)}%
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-400 font-mono">{(stock.volume / 1000000).toFixed(1)}M</td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 text-xs rounded-full bg-gray-700 text-gray-300 border border-gray-600">
                                            {stock.sector}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button className="text-brand-400 hover:text-brand-300 text-xs font-medium">{t('market.analyze')}</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MarketData;
