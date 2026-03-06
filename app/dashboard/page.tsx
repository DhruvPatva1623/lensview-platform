"use client";

import Link from 'next/link';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, AreaChart, Area } from 'recharts';

const MOCK_DATA = [
    { name: 'May 01', views: 4000, likes: 2400 },
    { name: 'May 07', views: 3000, likes: 1398 },
    { name: 'May 14', views: 2000, likes: 9800 },
    { name: 'May 21', views: 2780, likes: 3908 },
    { name: 'May 28', views: 1890, likes: 4800 },
    { name: 'Jun 01', views: 2390, likes: 3800 },
];

export default function DashboardPage() {
    return (
        <div className="flex min-h-screen bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100">
            {/* Sidebar */}
            <aside className="w-64 border-r border-slate-200 dark:border-slate-800 flex flex-col fixed inset-y-0 bg-background-light dark:bg-background-dark z-50">
                <div className="p-6">
                    <div className="flex items-center gap-3 mb-8">
                        <Link href="/" className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white cursor-pointer hover:opacity-80 transition-opacity">
                            <span className="material-symbols-outlined">camera</span>
                        </Link>
                        <div>
                            <h1 className="text-base font-bold leading-tight">Studio Pro</h1>
                            <p className="text-slate-500 text-xs font-medium">Professional Plan</p>
                        </div>
                    </div>
                    <nav className="space-y-1">
                        <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 bg-primary/10 text-primary rounded-lg transition-colors">
                            <span className="material-symbols-outlined">analytics</span>
                            <span className="text-sm font-medium">Analytics</span>
                        </Link>
                        <Link href="/" className="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                            <span className="material-symbols-outlined">grid_view</span>
                            <span className="text-sm font-medium">Portfolio</span>
                        </Link>
                        <Link href="/library" className="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                            <span className="material-symbols-outlined">photo_library</span>
                            <span className="text-sm font-medium">Library</span>
                        </Link>
                        <Link href="/community" className="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                            <span className="material-symbols-outlined">group</span>
                            <span className="text-sm font-medium">Community</span>
                        </Link>
                    </nav>
                </div>
                <div className="mt-auto p-6">
                    <Link href="/upload" className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold py-2.5 rounded-lg text-sm transition-all shadow-lg shadow-primary/20">
                        <span className="material-symbols-outlined text-sm">cloud_upload</span> Upload Photo
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 min-h-screen">
                <header className="sticky top-0 z-40 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                        <div className="relative w-full max-w-md">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
                            <input className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary/50 placeholder:text-slate-500" placeholder="Search analytics..." type="text" />
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors relative">
                            <span className="material-symbols-outlined">notifications</span>
                            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full ring-2 ring-background-light dark:ring-background-dark"></span>
                        </button>
                        <div className="h-8 w-px bg-slate-200 dark:border-slate-800"></div>
                        <div className="flex items-center gap-3 pl-2">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold leading-none">Lens View.</p>
                                <p className="text-xs text-slate-500">Curator</p>
                            </div>
                            <img alt="User Avatar" className="h-10 w-10 rounded-full object-cover border-2 border-primary/20" src="https://ui-avatars.com/api/?name=Lens+View&background=161B22&color=F8FAFC" />
                        </div>
                    </div>
                </header>

                <div className="p-8">
                    <div className="mb-8">
                        <h2 className="text-3xl font-extrabold tracking-tight">Performance Overview</h2>
                        <p className="text-slate-500 mt-1 font-medium">Real-time insights for your photography portfolio</p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 p-6 rounded-xl relative overflow-hidden group">
                            <div className="flex justify-between items-start relative z-10">
                                <div>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold">Total Views</p>
                                    <h3 className="text-3xl font-bold mt-1">128.4K</h3>
                                    <p className="text-emerald-500 text-sm font-bold flex items-center gap-1 mt-2">
                                        <span className="material-symbols-outlined text-xs">trending_up</span> +12.5%
                                    </p>
                                </div>
                                <div className="p-2 bg-primary/10 rounded-lg">
                                    <span className="material-symbols-outlined text-primary">visibility</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 p-6 rounded-xl relative overflow-hidden group">
                            <div className="flex justify-between items-start relative z-10">
                                <div>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold">Engagement Rate</p>
                                    <h3 className="text-3xl font-bold mt-1">4.2%</h3>
                                    <p className="text-emerald-500 text-sm font-bold flex items-center gap-1 mt-2">
                                        <span className="material-symbols-outlined text-xs">trending_up</span> +0.8%
                                    </p>
                                </div>
                                <div className="p-2 bg-primary/10 rounded-lg">
                                    <span className="material-symbols-outlined text-primary">favorite</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 p-6 rounded-xl relative overflow-hidden group">
                            <div className="flex justify-between items-start relative z-10">
                                <div>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold">New Followers</p>
                                    <h3 className="text-3xl font-bold mt-1">1,240</h3>
                                    <p className="text-rose-500 text-sm font-bold flex items-center gap-1 mt-2">
                                        <span className="material-symbols-outlined text-xs">trending_down</span> -2.1%
                                    </p>
                                </div>
                                <div className="p-2 bg-primary/10 rounded-lg">
                                    <span className="material-symbols-outlined text-primary">person_add</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Chart */}
                    <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 p-8 rounded-xl mb-8">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                            <div>
                                <p className="text-sm font-semibold text-slate-500">Portfolio Performance Over Time</p>
                                <div className="flex items-baseline gap-2 mt-1">
                                    <h3 className="text-4xl font-black">842,000</h3>
                                    <span className="text-emerald-500 text-sm font-bold">+15.2% vs last month</span>
                                </div>
                            </div>
                            <div className="flex bg-slate-200 dark:bg-slate-700 p-1 rounded-lg">
                                <button className="px-4 py-1.5 text-xs font-bold bg-white dark:bg-slate-600 rounded-md shadow-sm">30 Days</button>
                                <button className="px-4 py-1.5 text-xs font-bold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">90 Days</button>
                                <button className="px-4 py-1.5 text-xs font-bold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">1 Year</button>
                            </div>
                        </div>

                        <div className="relative h-[300px] w-full mt-4 text-xs font-sans">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={MOCK_DATA}>
                                    <defs>
                                        <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#13a4ec" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#13a4ec" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tickMargin={10} stroke="#94A3B8" />
                                    <YAxis axisLine={false} tickLine={false} tickMargin={10} stroke="#94A3B8" />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#101c22', borderRadius: '8px', border: '1px solid #1e293b' }}
                                    />
                                    <Area type="monotone" dataKey="views" stroke="#13a4ec" strokeWidth={3} fillOpacity={1} fill="url(#colorViews)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Top Performing Photos */}
                    <div className="mb-12">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold">Top Performing Photos</h3>
                            <Link href="/library" className="text-sm font-bold text-primary hover:underline">View All Gallery</Link>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-all">
                                <img alt="Mountain" className="w-16 h-16 rounded-lg object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvcBUf8J5K80PD-5Uj2vEiwFGya9JbpXYgdHTyP8O_TCqlOMGNdfwsh7ZhhPPbbkSjR3v3kvjbjl_XUK2WoA0yTR5C17PiYPw62i5YICgqTucVeXQIae0W0H8XtowwQGP9RPbs1c4KOxZRZrLfR--0buF6XzrwCrAG7jtAeFk14lz1AO8RI0X0V2Wla-FSLEC9x6WPMegl3KcKfIvB8mBWKW-qPHymvovwMu79niOBdhtQce22Gg5YCD8eIGfZYofMk2J64Ac8jjU" />
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-bold truncate">Alpine Reflection at Dawn</h4>
                                    <p className="text-xs text-slate-500">Landscape Category</p>
                                </div>
                                <div className="flex items-center gap-6 px-4">
                                    <div className="text-center">
                                        <p className="text-xs text-slate-500 font-medium">Views</p>
                                        <p className="text-sm font-bold">42.1K</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-xs text-slate-500 font-medium">Saves</p>
                                        <p className="text-sm font-bold text-primary">8.4K</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-xs text-slate-500 font-medium">Rank</p>
                                        <p className="text-sm font-black text-amber-500">#1</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
