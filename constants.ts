import { MarketData, Strategy, StrategyStatus, AutoMLTask } from './types';

// Mock Market Data
export const MOCK_MARKET_DATA: MarketData[] = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: 189.45, change: 2.34, changePercent: 1.25, volume: 45000000, sector: 'Technology' },
    { symbol: 'MSFT', name: 'Microsoft Corp', price: 420.10, change: -1.20, changePercent: -0.28, volume: 22000000, sector: 'Technology' },
    { symbol: 'NVDA', name: 'NVIDIA Corp', price: 950.05, change: 15.40, changePercent: 1.65, volume: 38000000, sector: 'Technology' },
    { symbol: 'TSLA', name: 'Tesla Inc', price: 175.30, change: -5.60, changePercent: -3.10, volume: 89000000, sector: 'Consumer Cyclical' },
    { symbol: 'JPM', name: 'JPMorgan Chase', price: 195.20, change: 0.85, changePercent: 0.44, volume: 9000000, sector: 'Financial' },
    { symbol: 'UNH', name: 'UnitedHealth', price: 480.50, change: 1.20, changePercent: 0.25, volume: 3000000, sector: 'Healthcare' },
];

// Mock Strategies
export const MOCK_STRATEGIES: Strategy[] = [
    { id: '1', name: 'Alpha-X Momentum', author: 'QuantLab', type: 'Momentum', status: StrategyStatus.RUNNING, sharpe: 2.45, return: 35.2, maxDrawdown: -8.5, lastUpdated: '10 min ago' },
    { id: '2', name: 'LSTM Volatility', author: 'AI_Team', type: 'ML/AI', status: StrategyStatus.RUNNING, sharpe: 1.89, return: 22.1, maxDrawdown: -12.3, lastUpdated: '2 min ago' },
    { id: '3', name: 'Pairs Trading Bank', author: 'RiskDesk', type: 'Arbitrage', status: StrategyStatus.STOPPED, sharpe: 1.20, return: 8.5, maxDrawdown: -4.1, lastUpdated: '2 days ago' },
];

// Mock AutoML Tasks
export const MOCK_AUTOML_TASKS: AutoMLTask[] = [
    { id: '101', name: 'Genetic Alpha Search V3', status: 'Searching', progress: 45, bestIc: 0.045, generation: 124, formula: 'rank(close) / rank(volume)' },
    { id: '102', name: 'Transformer Factor Mining', status: 'Training', progress: 78, bestIc: 0.062, generation: 450, formula: 'ts_corr(close, 20)' },
    { id: '103', name: 'Risk Parity Optimizer', status: 'Completed', progress: 100, bestIc: 0.031, generation: 1000, formula: 'stddev(returns, 50)' },
];

// Generate synthetic historical data for charts
export const generateHistoricalData = (days: number) => {
    const data = [];
    let basePrice = 10000; // Starting Equity
    let benchPrice = 10000;
    const now = new Date();

    for (let i = days; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        
        // Random walk
        const change = (Math.random() - 0.48) * 200; // Slight upward bias
        const benchChange = (Math.random() - 0.49) * 150;

        basePrice += change;
        benchPrice += benchChange;

        data.push({
            date: date.toISOString().split('T')[0],
            equity: Math.round(basePrice),
            benchmark: Math.round(benchPrice)
        });
    }
    return data;
};

export const DEFAULT_PYTHON_CODE = `import quant_matrix as qm
from quant_matrix.factors import ma, rsi

class MyStrategy(qm.Strategy):
    def init(self):
        # Set up indicators
        self.ma_fast = self.I(ma, self.data.Close, 10)
        self.ma_slow = self.I(ma, self.data.Close, 50)
        self.rsi = self.I(rsi, self.data.Close, 14)

    def next(self):
        # Golden Cross Logic
        if self.crossover(self.ma_fast, self.ma_slow):
            if self.rsi < 70:
                self.buy(size=0.1)  # Buy 10% of portfolio
        
        # Exit Logic
        elif self.crossover(self.ma_slow, self.ma_fast):
            self.position.close()

# Configuration
config = {
    "capital": 1000000,
    "commission": 0.0003,
    "slippage": 0.0001
}
`;
