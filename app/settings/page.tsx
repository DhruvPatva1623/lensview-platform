"use client";

import Link from 'next/link';
import { clsx } from 'clsx';

export default function SettingsPage() {
    return (
        <div className="bg-[#0a0f12] font-display text-slate-100 antialiased min-h-screen">
            <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
                {/* Header */}
                <header className="sticky top-0 z-50 flex items-center justify-between border-b border-slate-800 bg-[#0a0f12]/90 backdrop-blur-md px-6 lg:px-10 py-3">
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-4">
                            <Link href="/" className="text-primary size-8 hover:opacity-80 transition-opacity">
                                <span className="material-symbols-outlined text-3xl">filter_tilt_shift</span>
                            </Link>
                            <h2 className="text-white text-lg sm:text-xl font-bold tracking-tight">LensPro</h2>
                        </div>
                        <div className="hidden md:flex items-center gap-6 border-l border-slate-800 pl-8">
                            <Link href="/" className="text-slate-400 hover:text-primary text-sm font-medium transition-colors">Explore</Link>
                            <Link href="/community" className="text-slate-400 hover:text-primary text-sm font-medium transition-colors">Community</Link>
                            <Link href="/dashboard" className="text-slate-400 hover:text-primary text-sm font-medium transition-colors">Analytics</Link>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <label className="hidden md:flex flex-col min-w-40 h-10 max-w-64">
                            <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                                <div className="text-slate-500 flex bg-slate-900 items-center justify-center pl-4 rounded-l-lg border-y border-l border-slate-800">
                                    <span className="material-symbols-outlined text-xl">search</span>
                                </div>
                                <input className="flex w-full min-w-0 flex-1 rounded-r-lg border-y border-r border-slate-800 bg-slate-900 focus:ring-1 focus:ring-primary px-4 pl-2 text-sm font-normal text-white placeholder:text-slate-500 outline-none" placeholder="Search parameters..." />
                            </div>
                        </label>
                        <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-slate-900 border border-slate-800 text-slate-400 hover:text-primary transition-colors shrink-0">
                            <span className="material-symbols-outlined">notifications</span>
                        </button>
                        <Link href="/profile" className="h-10 w-10 rounded-full bg-primary/20 border-2 border-primary/40 overflow-hidden shrink-0">
                            <img className="h-full w-full object-cover" alt="User" src="https://ui-avatars.com/api/?name=Lens+View&background=161B22&color=F8FAFC" />
                        </Link>
                    </div>
                </header>

                <div className="flex flex-1 w-full relative">
                    <aside className="hidden lg:block w-72 bg-[#121a21] border-r border-slate-800 min-h-[calc(100vh-65px)] xl:shrink-0">
                        <div className="sticky top-[65px] flex flex-col gap-8 py-8 px-6">
                            <div>
                                <h1 className="text-2xl font-bold tracking-tight text-white">Settings</h1>
                                <p className="text-sm text-slate-500 mt-1">Manage your account and preferences.</p>
                            </div>
                            <nav className="flex flex-col gap-1">
                                <a className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary text-white font-semibold shadow-lg shadow-primary/20" href="#">
                                    <span className="material-symbols-outlined shrink-0">person</span> Public Profile
                                </a>
                                <a className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/50 transition-colors" href="#">
                                    <span className="material-symbols-outlined shrink-0">security</span> Security
                                </a>
                                <a className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/50 transition-colors" href="#">
                                    <span className="material-symbols-outlined shrink-0">payments</span> Billing
                                </a>
                                <a className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/50 transition-colors" href="#">
                                    <span className="material-symbols-outlined shrink-0">notifications</span> Notifications
                                </a>
                                <div className="h-px bg-slate-800 my-4"></div>
                                <a className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/50 transition-colors" href="#">
                                    <span className="material-symbols-outlined shrink-0">monitoring</span> Analytics Privacy
                                </a>
                            </nav>
                        </div>
                    </aside>

                    <main className="flex-1 py-12 px-6 lg:px-10 min-w-0">
                        <div className="max-w-3xl mx-auto pb-32">
                            <section className="space-y-12">
                                <div>
                                    <h2 className="text-xl font-bold text-white mb-8">Public Profile</h2>
                                    <div className="bg-slate-900/40 rounded-3xl p-6 md:p-8 border border-slate-800">
                                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 mb-10 text-center sm:text-left">
                                            <div className="relative group shrink-0">
                                                <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-slate-800 shadow-2xl bg-slate-800">
                                                    <img className="h-full w-full object-cover" alt="User" src="https://ui-avatars.com/api/?name=Lens+View&background=161B22&color=F8FAFC" />
                                                </div>
                                                <button className="absolute bottom-0 right-0 h-10 w-10 bg-primary text-white rounded-full flex items-center justify-center shadow-lg border-4 border-slate-900 hover:scale-110 transition-transform">
                                                    <span className="material-symbols-outlined text-lg">edit</span>
                                                </button>
                                            </div>
                                            <div className="space-y-1 pt-2">
                                                <h3 className="text-2xl font-bold text-white">Lens View</h3>
                                                <p className="text-slate-400 font-medium">Portrait & Landscape Photographer</p>
                                                <p className="text-slate-500 text-sm flex items-center justify-center sm:justify-start gap-1 pt-1">
                                                    <span className="material-symbols-outlined text-base">location_on</span>
                                                    San Francisco, CA
                                                </p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 gap-8">
                                            <div className="space-y-2.5">
                                                <label className="text-sm font-semibold text-slate-300">Display Name</label>
                                                <input className="w-full rounded-xl px-4 py-3 bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#38bdf8]" type="text" defaultValue="Lens View" />
                                            </div>
                                            <div className="space-y-2.5">
                                                <label className="text-sm font-semibold text-slate-300">Bio</label>
                                                <textarea className="w-full rounded-xl px-4 py-3 bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#38bdf8]" rows={4} defaultValue="I'm a professional photographer with over 10 years of experience capturing the raw beauty of natural landscapes and the complex emotions of human portraits. Exploring the world one shutter click at a time." />
                                                <p className="text-xs text-slate-500 italic">Brief description for your profile. URLs are automatically hyperlinked.</p>
                                            </div>
                                            <div className="space-y-2.5">
                                                <label className="text-sm font-semibold text-slate-300">Website URL</label>
                                                <div className="flex">
                                                    <span className="inline-flex items-center px-4 rounded-l-xl border border-r-0 border-slate-700 bg-slate-800 text-slate-400 text-sm font-medium shrink-0">https://</span>
                                                    <input className="w-full rounded-r-xl px-4 py-3 bg-slate-900 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-[#38bdf8] min-w-0" type="text" defaultValue="lensview.photography" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h2 className="text-xl font-bold text-white mb-6">Social Accounts</h2>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between p-4 sm:p-5 rounded-2xl border border-slate-800 bg-slate-900/30 hover:bg-slate-900/50 transition-colors group">
                                            <div className="flex items-center gap-4">
                                                <div className="h-10 w-10 sm:h-12 sm:w-12 shrink-0 flex items-center justify-center bg-slate-800 rounded-xl group-hover:bg-slate-700 transition-colors">
                                                    <span className="material-symbols-outlined text-slate-400 text-lg sm:text-2xl">camera</span>
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-sm font-bold text-white truncate">Instagram</p>
                                                    <p className="text-xs text-slate-500 truncate">@lensview_captures</p>
                                                </div>
                                            </div>
                                            <button className="text-xs sm:text-sm font-bold text-primary hover:text-white transition-colors px-3 sm:px-4 py-2 bg-primary/10 rounded-lg shrink-0">Edit</button>
                                        </div>
                                        <div className="flex items-center justify-between p-4 sm:p-5 rounded-2xl border border-slate-800 bg-slate-900/30 hover:bg-slate-900/50 transition-colors group">
                                            <div className="flex items-center gap-4">
                                                <div className="h-10 w-10 sm:h-12 sm:w-12 shrink-0 flex items-center justify-center bg-slate-800 rounded-xl group-hover:bg-slate-700 transition-colors">
                                                    <span className="material-symbols-outlined text-slate-400 text-lg sm:text-2xl">share</span>
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-sm font-bold text-white truncate">Twitter / X</p>
                                                    <p className="text-xs text-slate-500 truncate">Not connected</p>
                                                </div>
                                            </div>
                                            <button className="text-xs sm:text-sm font-bold text-primary hover:text-white transition-colors px-3 sm:px-4 py-2 bg-primary/10 rounded-lg shrink-0">Connect</button>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h2 className="text-xl font-bold text-white mb-6">Professional Verification</h2>
                                    <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-primary/20 to-transparent border border-primary/20 flex flex-col sm:flex-row gap-6 sm:gap-4 items-start sm:items-center justify-between shadow-2xl shadow-primary/5">
                                        <div className="flex gap-4 sm:gap-5">
                                            <div className="h-12 w-12 sm:h-14 sm:w-14 shrink-0 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/30">
                                                <span className="material-symbols-outlined text-2xl sm:text-3xl">verified</span>
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-base sm:text-lg text-white">Display Professional Badge</h3>
                                                <p className="text-sm text-slate-400 mt-1 max-w-sm">Show a verified photographer badge on your profile and shots to build client trust.</p>
                                            </div>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer shrink-0">
                                            <input type="checkbox" className="sr-only peer" defaultChecked />
                                            <div className="w-14 h-7 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[24px] after:w-[26px] after:transition-all peer-checked:bg-primary"></div>
                                        </label>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </main>
                </div>

                {/* Floating Save Bar */}
                <div className="fixed bottom-0 left-0 right-0 bg-[#0a0f12]/80 backdrop-blur-xl border-t border-slate-800 py-4 px-6 lg:px-10 z-[60]">
                    <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3 text-slate-500 text-sm">
                            <span className="material-symbols-outlined text-base">cloud_done</span>
                            <span className="font-medium hidden sm:inline">All changes drafted. Last saved 2m ago.</span>
                            <span className="font-medium sm:hidden">Drafted.</span>
                        </div>
                        <div className="flex gap-3 w-full sm:w-auto">
                            <button className="flex-1 sm:flex-none px-4 sm:px-6 py-2.5 rounded-xl border border-slate-700 text-slate-300 font-bold hover:bg-slate-800 hover:text-white transition-all text-sm sm:text-base">Discard</button>
                            <button className="flex-1 sm:flex-none px-6 sm:px-10 py-2.5 rounded-xl bg-primary text-white font-extrabold shadow-xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all text-sm sm:text-base">Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
