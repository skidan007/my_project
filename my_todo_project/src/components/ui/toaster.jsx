import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Toaster = ({ position }) => {
  const [toasts, setToasts] = useState([]);
  useEffect(() => {
    window.showToast = (message) => {
      const id = uuidv4();
      setToasts(prev => [...prev, { id, message, duration: 3000 }]);
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, 3000);
    };
  }, []);

  const toastPosition = {
    'top-center': 'top-4 left-1/2 -translate-x-1/2',
  };

  return (
    <div className={`fixed ${toastPosition[position]} z-50 flex flex-col items-center space-y-2`}>
      {toasts.map(t => (
        <div key={t.id} className="bg-gray-800 text-white px-4 py-2 rounded-full shadow-lg">
          {t.message}
        </div>
      ))}
    </div>
  );
};

const toast = {
  success: (message) => {
    if (window.showToast) {
      window.showToast(message);
    } else {
      console.log('Toast:', message);
    }
  },
  error: (message) => {
    if (window.showToast) {
      window.showToast(message);
    } else {
      console.error('Toast Error:', message);
    }
  }
};

export { Toaster, toast };
