import React from 'react';

const Button = ({ children, onClick, className = '', size = 'md', variant = 'default', ...props }) => {
  let sizeClass = 'px-4 py-2';
  if (size === 'lg') sizeClass = 'px-6 py-3';
  if (size === 'sm') sizeClass = 'px-2 py-1';
  
  let variantClass = 'bg-gray-800 text-white hover:bg-gray-700';
  if (variant === 'outline') variantClass = 'border border-gray-300 text-gray-800 hover:bg-gray-100';
  if (variant === 'destructive') variantClass = 'bg-red-500 text-white hover:bg-red-600';
  
  return (
    <button onClick={onClick} className={`rounded-full font-medium transition-colors ${sizeClass} ${variantClass} ${className}`} {...props}>
      {children}
    </button>
  );
};

export { Button };