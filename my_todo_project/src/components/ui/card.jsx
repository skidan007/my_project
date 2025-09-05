import React from 'react';

const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-2xl shadow-lg border border-gray-200 p-6 dark:bg-gray-800 dark:border-gray-700 ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className = '' }) => (
  <div className={`flex items-center justify-between pb-2 dark:border-gray-700 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children, className = '' }) => (
  <h2 className={`text-xl font-bold dark:text-white ${className}`}>
    {children}
  </h2>
);

const CardContent = ({ children, className = '' }) => (
  <div className={`dark:text-gray-300 ${className}`}>
    {children}
  </div>
);

export { Card, CardHeader, CardTitle, CardContent };
