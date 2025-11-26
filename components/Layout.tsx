
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { 
    LayoutDashboard, 
    LineChart, 
    Code2, 
    FlaskConical, 
    Cpu, 
    Settings, 
    Bell,
    UserCircle,
    Search,
    Book
} from 'lucide-react';

interface LayoutProps {
    children: React.ReactNode;
}

const SidebarItem = ({ to, icon: Icon, label }: { to: string, icon: any, label: string }) => (
    <NavLink 
        to={to} 
        className={({ isActive }) => 
            `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors mb-1 ${
                isActive 
                ? 'bg-brand-600 text-white shadow-lg shadow-brand-500/20' 
                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
            }`
        }
    >
        <Icon size={20} />
        <span className="font-medium">{label}</span>
    </NavLink>
);

const Layout = ({ children }: LayoutProps) => {
    const { t, language, setLanguage } = useLanguage();

    return (
        <div className="flex h-screen bg-gray-950 text-gray-100 overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 border-r border-gray-800 flex flex-col bg-gray-950">
                <div className="p-6 border-b border-gray-800 flex items-center space-x-2">
                    <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
                        <LineChart className="text-white" size={20} />
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                        QuantMatrix
                    </span>
                </div>

                <nav className="flex-1 p-4 overflow-y-auto">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-4">{t('nav.platform')}</div>
                    <SidebarItem to="/" icon={LayoutDashboard} label={t('nav.dashboard')} />
                    <SidebarItem to="/market" icon={LineChart} label={t('nav.dataHub')} />
                    <SidebarItem to="/ide" icon={Code2} label={t('nav.strategyIDE')} />
                    
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-4 mt-6">{t('nav.simulation')}</div>
                    <SidebarItem to="/backtest" icon={FlaskConical} label={t('nav.backtest')} />
                    <SidebarItem to="/automl" icon={Cpu} label={t('nav.automl')} />
                    
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-4 mt-6">{t('nav.system')}</div>
                    <SidebarItem to="/docs" icon={Book} label={t('nav.docs')} />
                    <SidebarItem to="/settings" icon={Settings} label={t('nav.settings')} />
                </nav>

                <div className="p-4 border-t border-gray-800">
                    <div className="flex items-center space-x-3 px-4 py-2 bg-gray-900 rounded-lg border border-gray-800">
                        <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                        <span className="text-xs text-gray-400">{t('nav.status')}: 99.95%</span>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top Header */}
                <header className="h-16 border-b border-gray-800 bg-gray-950 flex items-center justify-between px-6">
                    <div className="flex items-center flex-1 max-w-xl">
                        <div className="relative w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                            <input 
                                type="text" 
                                placeholder={t('header.search')}
                                className="w-full bg-gray-900 border border-gray-800 rounded-md py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-brand-500 text-gray-300"
                            />
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="flex bg-gray-800 rounded-lg p-1 border border-gray-700">
                            <button 
                                onClick={() => setLanguage('zh')}
                                className={`px-2 py-1 text-xs font-medium rounded ${language === 'zh' ? 'bg-gray-600 text-white' : 'text-gray-400 hover:text-white'}`}
                            >
                                中文
                            </button>
                            <button 
                                onClick={() => setLanguage('en')}
                                className={`px-2 py-1 text-xs font-medium rounded ${language === 'en' ? 'bg-gray-600 text-white' : 'text-gray-400 hover:text-white'}`}
                            >
                                EN
                            </button>
                        </div>

                        <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
                            <Bell size={20} />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-brand-500 rounded-full"></span>
                        </button>
                        <div className="h-6 w-px bg-gray-800"></div>
                        <div className="flex items-center space-x-3">
                            <div className="text-right hidden md:block">
                                <div className="text-sm font-medium text-white">Alex Quant</div>
                                <div className="text-xs text-gray-500">{t('header.role')}</div>
                            </div>
                            <UserCircle className="text-gray-400" size={32} />
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto bg-gray-900/50 p-6 scroll-smooth">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
