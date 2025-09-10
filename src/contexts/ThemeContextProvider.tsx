'use client'

import {createContext, useEffect, useState} from "react";
import { Theme } from "@radix-ui/themes";

export const ThemeContext = createContext<{
    isDark: boolean;
    setIsDark: (isDark: boolean) => void;
}>({
    isDark: true,
    setIsDark: () => {},
});


export default function ThemeContextProvider ({children} : {children : React.ReactNode}) {
    const [isDark, setIsDark] = useState(true)

    // Initialize from localStorage or system preference
    useEffect(() => {
        const stored = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
        if (stored === 'dark' || stored === 'light') {
            const dark = stored === 'dark';
            setIsDark(dark);
            document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
            return;
        }
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        setIsDark(prefersDark);
        document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    }, [])

    // Persist and apply attribute on change
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
        try { localStorage.setItem('theme', isDark ? 'dark' : 'light'); } catch {}
    }, [isDark])

    return (
        <ThemeContext.Provider value = {{isDark, setIsDark}}>
            <Theme appearance={isDark ? "dark" : "light"} accentColor="indigo">
                {children}
            </Theme>
        </ThemeContext.Provider>
    )
}