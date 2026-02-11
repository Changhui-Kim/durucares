import React from 'react';

const Badge = ({ children, type = 'neutral' }) => {
    const styles = {
        neutral: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
        primary: "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300",
        success: "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300",
        warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300",
        danger: "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300",
        indigo: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300",
    };
    return (
        <span className={`px-2 py-0.5 rounded text-xs font-medium ${styles[type]}`}>
            {children}
        </span>
    );
};

export default Badge;
