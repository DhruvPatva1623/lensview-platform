"use client";

import Link from 'next/link';

export default function CommunityPage() {
    return (
        <div className="bg-background-dark text-slate-100 font-display min-h-screen flex flex-col antialiased">
            {/* Navigation */}
            <header className="sticky top-0 z-50 px-6 py-4 flex items-center justify-between border-b border-white/10 bg-background-dark/80 backdrop-blur-md">
                <div className="flex items-center gap-4">
                    <Link href="/" className="p-2 hover:bg-white/5 rounded-full transition-colors group cursor-pointer bg-white/5 border border-white/10">
                        <span className="material-symbols-outlined text-slate-400 group-hover:text-white transition-colors text-sm">arrow_back</span>
                    </Link>
                    <div className="h-6 w-px bg-white/10"></div>
                    <h1 className="font-bold tracking-tight text-lg">Community</h1>
                </div>

                <div className="flex gap-3">
                    <button className="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-full font-bold transition-all shadow-lg flex items-center gap-2 text-sm">
                        <span className="material-symbols-outlined text-[16px]">edit_square</span>
                        New Post
                    </button>
                </div>
            </header>

            {/* Main Social Feed */}
            <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-8 space-y-8">
                {/* Post 1 */}
                <article className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl shadow-black/20">
                    <div className="p-5 flex items-center justify-between border-b border-white/5">
                        <div className="flex items-center gap-3">
                            <Link href="/profile" className="size-10 rounded-full bg-slate-800 overflow-hidden cursor-pointer">
                                <img className="w-full h-full object-cover" src="https://ui-avatars.com/api/?name=Lens+View&background=161B22&color=F8FAFC" alt="Author" />
                            </Link>
                            <div>
                                <Link href="/profile" className="font-bold text-sm hover:underline hover:text-primary transition-colors cursor-pointer">Lens View</Link>
                                <p className="text-xs text-slate-500 font-medium tracking-wide">2 hours ago</p>
                            </div>
                        </div>
                        <button className="text-slate-500 hover:text-white transition-colors p-2">
                            <span className="material-symbols-outlined">more_horiz</span>
                        </button>
                    </div>

                    <div className="p-5 text-sm md:text-base text-slate-300 leading-relaxed font-medium">
                        <p>Just wrapped up a surreal 48-hour architectural shoot in Downtown Neo-Tokyo. The new 18-35mm glass handled the challenging led lighting beautifully.</p>
                        <p className="mt-3 text-primary cursor-pointer hover:underline">#architecture #urban #sonyalpha #midnight</p>
                    </div>

                    <div className="w-full aspect-[4/3] bg-black">
                        <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1542051812-ba32e18ce6a3?q=80&w=2000&auto=format&fit=crop" alt="Feed post" />
                    </div>

                    <div className="p-4 bg-slate-800/50 flex items-center justify-between">
                        <div className="flex gap-4">
                            <button className="flex items-center gap-1.5 text-slate-400 hover:text-red-500 transition-colors group">
                                <span className="material-symbols-outlined text-[20px] group-hover:fill-current">favorite</span>
                                <span className="text-sm font-bold">128</span>
                            </button>
                            <button className="flex items-center gap-1.5 text-slate-400 hover:text-primary transition-colors">
                                <span className="material-symbols-outlined text-[20px]">chat_bubble</span>
                                <span className="text-sm font-bold">34</span>
                            </button>
                        </div>
                        <button className="text-slate-400 hover:text-white transition-colors">
                            <span className="material-symbols-outlined text-[20px]">share</span>
                        </button>
                    </div>
                </article>
            </main>
        </div>
    );
}
