import React, { useEffect } from 'react';
import '../styles/components.css';

export default function Toast({ message, type = 'success', duration = 3000, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={`toast toast-${type} animate-fade-in`}>
      {message}
    </div>
  );
}
