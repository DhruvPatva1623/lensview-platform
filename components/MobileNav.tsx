"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "./AuthProvider";

export function MobileNav() {
    const pathname = usePathname();
    const { user, profile } = useAuth();

    // Do not show on auth or specific full-screen pages if we had them, 
    // but for now it's fine everywhere on mobile.

    // Check active states
    const isActive = (path: string) => pathname === path;

    return (
        <div className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-[#121212]/90 backdrop-blur-xl border-t border-white/10 pb-safe">
            <div className="flex items-center justify-around h-16 px-4">

                <Link href="/" className={`flex flex-col items-center justify-center w-16 h-full transition-colors ${isActive('/') ? 'text-white' : 'text-white/40 hover:text-white/70'}`}>
                    <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: isActive('/') ? "'FILL' 1" : "'FILL' 0" }}>home</span>
                </Link>

                <Link href="/explore" className={`flex flex-col items-center justify-center w-16 h-full transition-colors ${isActive('/explore') ? 'text-white' : 'text-white/40 hover:text-white/70'}`}>
                    <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: isActive('/explore') ? "'FILL' 1" : "'FILL' 0" }}>search</span>
                </Link>

                {/* Center Upload Button */}
                <Link href="/upload" className="flex flex-col items-center justify-center -mt-6">
                    <div className="size-12 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/40 text-white transform hover:scale-105 transition-transform">
                        <span className="material-symbols-outlined text-2xl">add</span>
                    </div>
                </Link>

                <Link href="/community" className={`flex flex-col items-center justify-center w-16 h-full transition-colors ${isActive('/community') ? 'text-white' : 'text-white/40 hover:text-white/70'}`}>
                    <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: isActive('/community') ? "'FILL' 1" : "'FILL' 0" }}>groups</span>
                </Link>

                <Link href="/profile" className={`flex flex-col items-center justify-center w-16 h-full transition-colors ${isActive('/profile') ? 'text-white' : 'text-white/40 hover:text-white/70'}`}>
                    {user ? (
                        <div className={`size-7 rounded-full overflow-hidden border-2 transition-colors ${isActive('/profile') ? 'border-primary' : 'border-transparent'}`}>
                            <img
                                src={profile?.avatar_url || `https://www.gravatar.com/avatar/${user.id}?d=retro`}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ) : (
                        <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: isActive('/profile') ? "'FILL' 1" : "'FILL' 0" }}>person</span>
                    )}
                </Link>
            </div>
        </div>
    );
}
