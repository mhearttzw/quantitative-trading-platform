
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { BookOpen, Code, Cpu, LineChart, FlaskConical } from 'lucide-react';

const Docs: React.FC = () => {
    const { language } = useLanguage();

    const isZh = language === 'zh';

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-12">
            <div className="border-b border-gray-700 pb-6">
                <h1 className="text-3xl font-bold text-white mb-2">
                    {isZh ? '平台使用手册' : 'Platform User Manual'}
                </h1>
                <p className="text-gray-400">
                    {isZh 
                        ? 'QuantMatrix AI 量化投研平台操作指南 v1.0' 
                        : 'QuantMatrix AI Quantitative Research Platform Guide v1.0'}
                </p>
            </div>

            {/* Introduction */}
            <section className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                    <BookOpen className="mr-2 text-brand-500" />
                    {isZh ? '1. 平台概览' : '1. Platform Overview'}
                </h2>
                <div className="text-gray-300 space-y-2 leading-relaxed">
                    <p>
                        {isZh 
                            ? 'QuantMatrix 是一个集成了传统量化与前沿 AI 技术的生产级投研平台。平台覆盖了从数据获取、策略开发、回测验证到实盘仿真的全生命周期。' 
                            : 'QuantMatrix is a production-grade investment research platform integrating traditional quantitative methods with cutting-edge AI. It covers the full lifecycle from data acquisition and strategy development to backtesting and simulation.'}
                    </p>
                </div>
            </section>

            {/* Workflow */}
            <section className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                    <LineChart className="mr-2 text-brand-500" />
                    {isZh ? '2. 建议工作流' : '2. Recommended Workflow'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[
                        { step: '01', title: isZh ? '数据分析' : 'Data Analysis', desc: isZh ? '在“数据中心”筛选标的，查看行情与另类数据。' : 'Screen assets in Data Hub.' },
                        { step: '02', title: isZh ? '策略研发' : 'Development', desc: isZh ? '在“策略实验室”编写 Python 策略代码或使用 AI 生成。' : 'Write Python code in Strategy IDE.' },
                        { step: '03', title: isZh ? '回测验证' : 'Backtesting', desc: isZh ? '运行历史回测，分析夏普比、回撤与归因。' : 'Run historical tests and analyze risks.' },
                        { step: '04', title: isZh ? 'AI 优化' : 'AI Optimization', desc: isZh ? '使用“AI 实验室”自动挖掘更优的 Alpha 因子。' : 'Mine alpha factors using AutoML.' }
                    ].map((item, idx) => (
                        <div key={idx} className="bg-gray-900 p-4 rounded-lg border border-gray-800">
                            <div className="text-brand-500 font-mono text-xl font-bold mb-2">{item.step}</div>
                            <h3 className="text-white font-medium mb-1">{item.title}</h3>
                            <p className="text-gray-500 text-xs">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Module Guides */}
            <div className="space-y-6">
                <h2 className="text-xl font-bold text-white pt-4">
                    {isZh ? '3. 核心功能指南' : '3. Module Guides'}
                </h2>

                <div className="border-l-4 border-brand-500 pl-6 py-2">
                    <h3 className="text-lg font-semibold text-white flex items-center">
                        <Code size={20} className="mr-2" />
                        {isZh ? '策略实验室 (IDE)' : 'Strategy Lab (IDE)'}
                    </h3>
                    <ul className="list-disc list-inside text-gray-400 mt-2 space-y-1 text-sm">
                        <li>{isZh ? '支持 Python 3.11 环境，内置 pandas, numpy, talib。' : 'Supports Python 3.11 with pandas, numpy, talib.'}</li>
                        <li>{isZh ? '点击 "运行回测" 按钮可立即在右侧控制台查看编译与回测进度。' : 'Click "Run Backtest" to see compilation and progress in the console.'}</li>
                        <li>{isZh ? '使用 "参数配置" 选项卡调整资金、滑点与手续费。' : 'Use "Configuration" tab to adjust capital, slippage, and fees.'}</li>
                    </ul>
                </div>

                <div className="border-l-4 border-purple-500 pl-6 py-2">
                    <h3 className="text-lg font-semibold text-white flex items-center">
                        <Cpu size={20} className="mr-2" />
                        {isZh ? 'AI 实验室 (AutoML)' : 'AI Lab (AutoML)'}
                    </h3>
                    <ul className="list-disc list-inside text-gray-400 mt-2 space-y-1 text-sm">
                        <li>{isZh ? '用于挖掘非线性 Alpha 因子。' : 'Used for mining non-linear Alpha factors.'}</li>
                        <li>{isZh ? '选择 "搜索算法" (如遗传规划 GP) 和 "目标函数" (如 IC 或 Sharpe)。' : 'Select "Search Method" (e.g., GP) and "Objective Function".'}</li>
                        <li>{isZh ? '任务完成后，系统会自动提取表现最好的公式。' : 'The system automatically extracts the best formulas upon completion.'}</li>
                    </ul>
                </div>

                <div className="border-l-4 border-success pl-6 py-2">
                    <h3 className="text-lg font-semibold text-white flex items-center">
                        <FlaskConical size={20} className="mr-2" />
                        {isZh ? '回测报告' : 'Backtest Report'}
                    </h3>
                    <ul className="list-disc list-inside text-gray-400 mt-2 space-y-1 text-sm">
                        <li>{isZh ? '查看累计收益曲线对比 (策略 vs 基准)。' : 'View cumulative return curves (Strategy vs Benchmark).'}</li>
                        <li>{isZh ? '分析月度热力图以识别季节性风险。' : 'Analyze monthly heatmaps to identify seasonal risks.'}</li>
                        <li>{isZh ? '关注 "最大回撤" 指标，评估极端市场下的生存能力。' : 'Monitor "Max Drawdown" to assess viability in extreme markets.'}</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Docs;
