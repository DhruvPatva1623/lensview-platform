import Link from 'next/link';
import { Aperture, Compass, Users, LayoutDashboard, Search, PlusCircle, Bookmark, Settings, Image as ImageIcon } from 'lucide-react';

export function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background-dark/80 backdrop-blur-md px-6 lg:px-20 py-3">
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">

                {/* Left Side: Logo & Search */}
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity">
                        <Aperture className="w-8 h-8" />
                        <h2 className="text-xl font-extrabold tracking-tight text-white">LensView</h2>
                    </Link>

                    <div className="hidden md:flex flex-1 min-w-[300px]">
                        <div className="relative w-full group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted group-focus-within:text-primary transition-colors">
                                <Search className="w-4 h-4" />
                            </div>
                            <input
                                className="block w-full pl-10 pr-3 py-2 border border-white/5 bg-surface rounded-lg text-sm text-white placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                placeholder="Search styles, inspiration, or photographers..."
                                type="text"
                            />
                        </div>
                    </div>
                </div>

                {/* Right Side: Links & Actions */}
                <div className="flex items-center gap-6">
                    <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-muted">
                        <Link href="/" className="hover:text-primary transition-colors hover:-translate-y-0.5 transform flex items-center gap-1">
                            <Compass className="w-4 h-4" /> Explore
                        </Link>
                        <Link href="/library" className="hover:text-primary transition-colors hover:-translate-y-0.5 transform flex items-center gap-1">
                            <ImageIcon className="w-4 h-4" /> Library
                        </Link>
                        <Link href="/boards" className="hover:text-primary transition-colors hover:-translate-y-0.5 transform flex items-center gap-1">
                            <Bookmark className="w-4 h-4" /> Boards
                        </Link>
                        <Link href="/community" className="hover:text-primary transition-colors hover:-translate-y-0.5 transform flex items-center gap-1">
                            <Users className="w-4 h-4" /> Community
                        </Link>
                        <Link href="/dashboard" className="hover:text-primary transition-colors hover:-translate-y-0.5 transform flex items-center gap-1">
                            <LayoutDashboard className="w-4 h-4" /> Analytics
                        </Link>
                    </nav>

                    <div className="flex items-center gap-4 border-l border-white/10 pl-6">
                        <Link href="/upload" className="bg-primary hover:bg-primary/90 text-background-dark px-5 py-2 rounded-lg text-sm font-bold transition-all shadow-[0_0_15px_rgba(0,163,255,0.4)] hover:shadow-[0_0_25px_rgba(0,163,255,0.6)] flex items-center gap-2">
                            <PlusCircle className="w-5 h-5" />
                            <span>Studio</span>
                        </Link>

                        <Link href="/profile" className="w-10 h-10 rounded-full border-2 border-primary/20 bg-surface flex items-center justify-center overflow-hidden hover:border-primary transition-colors cursor-pointer">
                            <img src="https://ui-avatars.com/api/?name=Lens+View&background=161B22&color=F8FAFC" alt="Avatar" className="w-full h-full object-cover" />
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
