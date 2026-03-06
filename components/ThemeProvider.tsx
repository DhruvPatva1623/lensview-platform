"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

const ThemeCtx = createContext<{ theme: Theme; toggle: () => void }>({
    theme: "dark",
    toggle: () => { },
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>("dark");
    const [mounted, setMounted] = useState(false);

    // On mount, read saved preference
    useEffect(() => {
        const stored = localStorage.getItem("lv-theme") as Theme | null;
        const preferred = stored ?? "dark";
        setTheme(preferred);
        applyTheme(preferred);
        setMounted(true);
    }, []);

    // Apply theme class to <html>
    const applyTheme = (t: Theme) => {
        const root = document.documentElement;
        if (t === "light") {
            root.classList.add("light");
            root.classList.remove("dark");
        } else {
            root.classList.add("dark");
            root.classList.remove("light");
        }
    };

    const toggle = () => {
        const next: Theme = theme === "dark" ? "light" : "dark";
        setTheme(next);
        applyTheme(next);
        localStorage.setItem("lv-theme", next);
    };

    // Prevent flash — render children immediately (SSR uses dark by default)
    return (
        <ThemeCtx.Provider value={{ theme, toggle }}>
            {children}
        </ThemeCtx.Provider>
    );
}

export const useTheme = () => useContext(ThemeCtx);
