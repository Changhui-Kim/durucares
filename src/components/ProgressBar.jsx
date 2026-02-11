import React from 'react';

const ProgressBar = ({ value, label }) => (
    <div className="w-full">
        <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-blue-700 dark:text-blue-400">{label}</span>
            <span className="text-sm font-medium text-blue-700 dark:text-blue-400">{value}%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
            <div className="bg-blue-600 dark:bg-blue-500 h-2.5 rounded-full transition-all duration-500" style={{ width: `${value}%` }}></div>
        </div>
    </div>
);

export default ProgressBar;
