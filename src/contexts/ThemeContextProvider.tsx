'use client'

import {createContext, useState} from "react";
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

    return (
        <ThemeContext.Provider value = {{isDark, setIsDark}}>
            <Theme appearance={isDark ? "dark" : "light"}>
                {children}
            </Theme>
        </ThemeContext.Provider>
    )
}