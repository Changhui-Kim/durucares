import React from 'react';

const Badge = ({ children, type = 'neutral' }) => {
    const styles = {
        neutral: "bg-gray-100 text-gray-800",
        primary: "bg-blue-100 text-blue-800",
        success: "bg-green-100 text-green-800",
        warning: "bg-yellow-100 text-yellow-800",
        danger: "bg-red-100 text-red-800",
        indigo: "bg-indigo-100 text-indigo-800",
    };
    return (
        <span className={`px-2 py-0.5 rounded text-xs font-medium ${styles[type]}`}>
            {children}
        </span>
    );
};

export default Badge;
