import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    // Initialize state from localStorage. 
    // 'dark', 'light', or null (for system)
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || null;
    });

    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'dark') {
            root.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else if (theme === 'light') {
            root.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        } else {
            // System mode
            root.removeAttribute('data-theme');
            localStorage.removeItem('theme');
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme((current) => {
            // If currently dark (explicit), go light
            if (current === 'dark') {
                return 'light';
            }
            // If currently light (explicit), go dark
            if (current === 'light') {
                return 'dark';
            }
            // If system (null), default to dark
            return 'dark';
        });
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
