// Domain entities based on PRD

export enum StrategyStatus {
    RUNNING = 'Running',
    STOPPED = 'Stopped',
    BACKTESTING = 'Backtesting',
    ERROR = 'Error'
}

export interface MarketData {
    symbol: string;
    name: string;
    price: number;
    change: number;
    changePercent: number;
    volume: number;
    sector: string;
}

export interface Strategy {
    id: string;
    name: string;
    author: string;
    type: 'Momentum' | 'MeanReversion' | 'ML/AI' | 'Arbitrage';
    status: StrategyStatus;
    sharpe: number;
    return: number;
    maxDrawdown: number;
    lastUpdated: string;
}

export interface BacktestResult {
    dates: string[];
    equity: number[];
    benchmark: number[];
    metrics: {
        totalReturn: number;
        annualizedReturn: number;
        sharpeRatio: number;
        maxDrawdown: number;
        volatility: number;
        winRate: number;
    };
    trades: Trade[];
}

export interface Trade {
    id: string;
    date: string;
    symbol: string;
    direction: 'BUY' | 'SELL';
    price: number;
    quantity: number;
    pnl: number;
}

export interface AutoMLTask {
    id: string;
    name: string;
    status: 'Searching' | 'Training' | 'Completed' | 'Idle';
    progress: number;
    bestIc: number;
    generation: number;
    formula: string;
}
