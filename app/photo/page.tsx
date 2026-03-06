"use client";

import Link from 'next/link';

export default function PhotoPage() {
    return (
        <div className="bg-[#101c22] text-slate-100 min-h-screen font-display">
            <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-slate-800 bg-[#101c22] px-6 py-3 lg:px-10">
                <div className="flex items-center gap-6 md:gap-8">
                    <Link href="/" className="flex items-center gap-3 text-primary hover:opacity-80 transition-opacity">
                        <span className="material-symbols-outlined text-3xl">filter_tilt_shift</span>
                        <h2 className="text-white text-lg md:text-xl font-bold leading-tight tracking-tight hidden sm:block">LensPro</h2>
                    </Link>
                    <label className="hidden md:flex flex-col min-w-40 lg:min-w-64 h-10">
                        <div className="flex w-full flex-1 items-stretch rounded-lg h-full bg-slate-800">
                            <div className="text-slate-500 flex items-center justify-center pl-4 rounded-l-lg border border-transparent">
                                <span className="material-symbols-outlined text-xl">search</span>
                            </div>
                            <input className="flex w-full min-w-0 flex-1 border-none bg-transparent text-white focus:outline-none focus:ring-0 h-full placeholder:text-slate-500 px-4 text-sm font-normal" placeholder="Search creators, equipment, or locations" />
                        </div>
                    </label>
                </div>
                <div className="flex flex-1 justify-end gap-4 lg:gap-6 items-center">
                    <nav className="hidden lg:flex items-center gap-8">
                        <Link className="text-slate-300 text-sm font-semibold hover:text-primary transition-colors" href="/">Explore</Link>
                        <Link className="text-slate-300 text-sm font-semibold hover:text-primary transition-colors" href="/community">Community</Link>
                        <Link className="text-slate-300 text-sm font-semibold hover:text-primary transition-colors" href="/boards">Boards</Link>
                    </nav>
                    <div className="flex items-center gap-3 sm:gap-4">
                        <Link href="/upload" className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 sm:px-5 bg-primary text-white text-sm font-bold tracking-tight hover:opacity-90 transition-all">
                            <span>Upload</span>
                        </Link>
                        <Link href="/profile" className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 ring-2 ring-primary/20 hover:ring-primary/60 transition-all shrink-0" style={{ backgroundImage: "url('https://ui-avatars.com/api/?name=Lens+View&background=161B22&color=F8FAFC')" }}></Link>
                    </div>
                </div>
            </header>

            <main className="max-w-[1440px] mx-auto p-4 lg:p-6 pb-20">
                {/* Breadcrumbs */}
                <div className="flex flex-wrap items-center gap-2 mb-6 px-2 truncate min-w-0">
                    <Link className="text-slate-500 text-xs sm:text-sm font-medium hover:text-primary transition-colors" href="/">Home</Link>
                    <span className="material-symbols-outlined text-slate-400 text-xs sm:text-sm">chevron_right</span>
                    <Link className="text-slate-500 text-xs sm:text-sm font-medium hover:text-primary transition-colors" href="/library">Nature</Link>
                    <span className="material-symbols-outlined text-slate-400 text-xs sm:text-sm">chevron_right</span>
                    <span className="text-white text-xs sm:text-sm font-semibold truncate">Vibrant Highlands of Iceland</span>
                </div>

                <div className="flex flex-col xl:flex-row gap-8">
                    {/* Left Side: Large Photo View */}
                    <div className="flex-1 space-y-4 min-w-0 flex flex-col items-center">
                        <div className="relative group bg-slate-900 rounded-xl overflow-hidden aspect-[4/3] md:aspect-[16/10] w-full flex flex-col items-center justify-center">
                            <img className="w-full h-full object-cover" alt="Cinematic landscape of Iceland mountains during sunset" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZVkDvpzEX6KJnnaf5xHTiC8UoothYXhJ3Q7gZEeXdyGQoC8AsH-MW3fHzptXLsV2-UGHfAdBZjBrTuliH5MCGwqjEvmPa99mV1mouJenSjtuamDN1S5Lp1_r7EBBlomzTlzZ0SNnLEC_P5H-SOHJNmdXzOdXbtin0OOfl4otdTTRV_BhvnId5ofksyMjZwqgErLTS0Uh75RN8_x-cDkQ6Y_0fPz9bLJwLjKwSazVRHtJuYcIUydM8vrSKk8v706jIGZbXt1xfbOs" />

                            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="p-2 bg-black/50 backdrop-blur-md rounded-lg text-white hover:bg-black/70 transition-all flex items-center justify-center h-10 w-10">
                                    <span className="material-symbols-outlined shrink-0 text-xl leading-none">zoom_in</span>
                                </button>
                                <button className="p-2 bg-black/50 backdrop-blur-md rounded-lg text-white hover:bg-black/70 transition-all flex items-center justify-center h-10 w-10">
                                    <span className="material-symbols-outlined shrink-0 text-xl leading-none">fullscreen</span>
                                </button>
                            </div>

                            <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                                <div className="px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-white text-[10px] font-bold uppercase tracking-widest">Featured</div>
                                <div className="px-3 py-1 bg-primary/80 backdrop-blur-md rounded-full text-white text-[10px] font-bold uppercase tracking-widest">Exclusive</div>
                            </div>
                        </div>

                        {/* Interaction Bar */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-2 w-full mt-2">
                            <div className="flex items-center gap-6">
                                <button className="flex items-center gap-2 text-slate-300 hover:text-red-500 transition-colors">
                                    <span className="material-symbols-outlined">favorite</span>
                                    <span className="text-sm font-bold">1.2k</span>
                                </button>
                                <button className="flex items-center gap-2 text-slate-300 hover:text-primary transition-colors">
                                    <span className="material-symbols-outlined">chat_bubble</span>
                                    <span className="text-sm font-bold">48</span>
                                </button>
                                <button className="flex items-center gap-2 text-slate-300 hover:text-primary transition-colors">
                                    <span className="material-symbols-outlined">share</span>
                                    <span className="text-sm font-bold">Share</span>
                                </button>
                            </div>
                            <div className="flex items-center justify-end gap-3 w-full sm:w-auto">
                                <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 rounded-lg text-sm font-bold text-white hover:bg-slate-700 transition-all whitespace-nowrap">
                                    <span className="material-symbols-outlined text-xl shrink-0">folder_special</span>
                                    Save to Board
                                    <span className="material-symbols-outlined shrink-0">expand_more</span>
                                </button>
                                <button className="p-2.5 bg-slate-800 rounded-lg text-white hover:bg-slate-700 transition-all flex items-center justify-center shrink-0">
                                    <span className="material-symbols-outlined leading-none text-[20px]">download</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Side Details */}
                    <aside className="w-full xl:w-[400px] flex flex-col gap-8 shrink-0 pb-10">
                        <div className="p-5 bg-slate-800/50 rounded-xl border border-slate-800">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex gap-4 items-center">
                                    <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12 ring-2 ring-primary" style={{ backgroundImage: "url('https://ui-avatars.com/api/?name=Alex+Rivers&background=161B22&color=F8FAFC')" }}></div>
                                    <div className="flex flex-col justify-center">
                                        <Link href="/profile" className="text-white text-base font-bold leading-tight hover:underline">Alex Rivers</Link>
                                        <p className="text-slate-500 text-xs font-medium">@arivers_photo • 12.4k followers</p>
                                    </div>
                                </div>
                                <button className="flex items-center justify-center rounded-lg h-9 px-4 bg-primary text-white text-sm font-bold tracking-tight hover:shadow-lg hover:shadow-primary/20 transition-all shrink-0">
                                    Follow
                                </button>
                            </div>
                            <p className="text-slate-400 text-sm leading-relaxed italic">
                                "Capturing the raw essence of Iceland's untamed landscapes. Shot during the midsummer midnight sun."
                            </p>
                        </div>

                        {/* EXIF */}
                        <div>
                            <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary text-lg">info</span>
                                Technical Details
                            </h3>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="p-3 bg-slate-800 rounded-lg flex flex-col items-center text-center">
                                    <span className="text-slate-500 text-[10px] font-bold uppercase tracking-tight">ISO</span>
                                    <span className="text-white font-bold text-sm">100</span>
                                </div>
                                <div className="p-3 bg-slate-800 rounded-lg flex flex-col items-center text-center">
                                    <span className="text-slate-500 text-[10px] font-bold uppercase tracking-tight">Shutter</span>
                                    <span className="text-white font-bold text-sm">1/250s</span>
                                </div>
                                <div className="p-3 bg-slate-800 rounded-lg flex flex-col items-center text-center">
                                    <span className="text-slate-500 text-[10px] font-bold uppercase tracking-tight">Aperture</span>
                                    <span className="text-white font-bold text-sm">f/8.0</span>
                                </div>
                                <div className="p-3 bg-slate-800 rounded-lg flex flex-col items-center text-center">
                                    <span className="text-slate-500 text-[10px] font-bold uppercase tracking-tight">Focal Length</span>
                                    <span className="text-white font-bold text-sm">35mm</span>
                                </div>
                            </div>
                            <div className="mt-3 p-3 bg-slate-800 rounded-lg flex items-center gap-3">
                                <span className="material-symbols-outlined text-slate-500 shrink-0">camera</span>
                                <div className="flex flex-col min-w-0">
                                    <span className="text-slate-500 text-[10px] font-bold uppercase tracking-tight leading-none mb-1">Camera & Lens</span>
                                    <span className="text-white text-xs font-bold truncate">Sony A7R IV • 24-70mm G-Master</span>
                                </div>
                            </div>
                        </div>

                        {/* Palette */}
                        <div>
                            <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary text-lg">palette</span>
                                Color Palette
                            </h3>
                            <div className="flex h-12 w-full rounded-lg overflow-hidden border border-slate-800">
                                <div className="flex-1 bg-[#1a3644]" title="#1a3644"></div>
                                <div className="flex-1 bg-[#4d6a79]" title="#4d6a79"></div>
                                <div className="flex-1 bg-[#8fa4ae]" title="#8fa4ae"></div>
                                <div className="flex-1 bg-[#c9d1d3]" title="#c9d1d3"></div>
                                <div className="flex-1 bg-[#5c4033]" title="#5c4033"></div>
                                <div className="flex-1 bg-[#221c1a]" title="#221c1a"></div>
                            </div>
                        </div>

                        {/* Tags */}
                        <div>
                            <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary text-lg">sell</span>
                                Tags
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {['Iceland', 'Landscape', 'Golden Hour', 'Highlands', 'Mountains', 'Sony Alpha'].map(tag => (
                                    <span key={tag} className="px-3 py-1.5 bg-slate-800 rounded-full text-xs font-semibold text-slate-300 hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer">{tag}</span>
                                ))}
                            </div>
                        </div>

                        {/* Map Snippet */}
                        <div className="rounded-xl overflow-hidden border border-slate-800 h-32 relative group cursor-pointer mt-2">
                            <img className="w-full h-full object-cover" alt="Map" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMqSHzq_NfrRBZ2Lc5YhIkXJ3s5pbAkIxfSiqAgVphlFTeu80XgD7jUR_QjYXGgy_fW9oynmYEF5TOaFcB7wBs09qdhc7yq-iHEUplw1X8Y3OZLo-VKHx12E8ILVPnukp_eJBM5-HWiEr1MbCUlpT5nlJYwA_mLU_NZAB-jjig0db6REtgO6VAGd6oiklfxAHnQFz9wfu5ZdzWzhn2AxR1ZfLhfYNRP0reXMWG5rGUlM98Wno3-bwFVLKvJt_l77tw6LDkHRR7aYk" />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="text-white text-xs font-bold uppercase tracking-widest">Open in Maps</span>
                            </div>
                            <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-[10px] text-white font-bold flex items-center gap-1">
                                <span className="material-symbols-outlined text-[14px] shrink-0">location_on</span>
                                Landmannalaugar, Iceland
                            </div>
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    );
}
