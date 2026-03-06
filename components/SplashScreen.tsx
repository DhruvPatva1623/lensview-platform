"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function SplashScreen() {
    const [isVisible, setIsVisible] = useState(true);
    const [isFading, setIsFading] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        // Prevent splash from running everywhere if we don't want it to, 
        // but typically a splash runs once per browser session.
        const hasSeenSplash = sessionStorage.getItem("hasSeenSplash");
        if (hasSeenSplash) {
            setIsVisible(false);
            return;
        }

        // Start fading out slightly before exactly 2.2 seconds for a smooth transition
        const fadeTimer = setTimeout(() => {
            setIsFading(true);
        }, 1800);

        // Fully hide at 2.2 seconds
        const hideTimer = setTimeout(() => {
            setIsVisible(false);
            sessionStorage.setItem("hasSeenSplash", "true");
        }, 2200);

        return () => {
            clearTimeout(fadeTimer);
            clearTimeout(hideTimer);
        };
    }, []);

    if (!isVisible) return null;

    return (
        <div
            className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0b0f14] text-white transition-opacity duration-500 ease-in-out ${isFading ? 'opacity-0' : 'opacity-100'}`}
        >
            {/* The animated central icon */}
            <div className="relative mb-8 animate-float">
                <div className="absolute inset-0 bg-primary/30 blur-2xl rounded-full scale-150"></div>
                <div className="relative size-24 md:size-32 bg-primary/10 border border-primary/30 rounded-3xl flex items-center justify-center backdrop-blur-sm">
                    <span className="material-symbols-outlined text-5xl md:text-6xl text-primary animate-pulse w-auto h-auto" style={{ fontVariationSettings: "'FILL' 1" }}>
                        camera
                    </span>
                </div>
                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 size-4 bg-white/20 rounded-full animate-ping delay-75"></div>
                <div className="absolute -bottom-6 -left-2 size-6 bg-primary/40 rounded-full animate-pulse delay-200"></div>
            </div>

            {/* Title & Tagline */}
            <div className="text-center overflow-hidden h-24 mb-6">
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter animate-fade-in-up">
                    LensView
                </h1>
                <p className="text-sm md:text-base text-white/50 tracking-[0.2em] uppercase mt-2 animate-fade-in-up delay-100">
                    Discovery • Creation • Community
                </p>
            </div>

            {/* Developer Credit at bottom */}
            <div className="absolute bottom-10 inset-x-0 text-center animate-slide-in-right delay-200">
                <p className="text-xs md:text-sm text-white/30 font-medium tracking-wide">
                    Designed and Developed by
                </p>
                <p className="text-sm md:text-base text-primary/80 font-bold tracking-widest mt-1">
                    Dhruv Patva
                </p>
            </div>
        </div>
    );
}
