'use client'

import { useContext } from "react";
import { ThemeContext } from "@/contexts/ThemeContextProvider";
import { SunIcon, MoonIcon } from "@radix-ui/react-icons";

export default function ThemeToggle() {
    const { isDark, setIsDark } = useContext(ThemeContext);

    return (
        <button
            aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
            onClick={() => setIsDark(!isDark)}
            className="inline-flex items-center gap-2 rounded-full border border-gray-300/30 px-3 py-2 text-sm transition-colors hover:bg-gray-200/20 dark:border-gray-600/40"
        >
            {isDark ? <SunIcon /> : <MoonIcon />}
            <span className="hidden sm:inline">{isDark ? 'Light' : 'Dark'}</span>
        </button>
    )
}


