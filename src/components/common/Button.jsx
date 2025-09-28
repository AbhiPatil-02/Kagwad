import React from 'react';
import '../../styles/components.css';

export default function Button({ children, type = 'button', onClick, variant = 'primary', ...props }) {
  const className = `btn btn-${variant}`;
  return (
    <button type={type} onClick={onClick} className={className} {...props}>
      {children}
    </button>
  );
}