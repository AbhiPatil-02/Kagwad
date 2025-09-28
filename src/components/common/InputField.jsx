import React from 'react';
import '../../styles/components.css';

export default function InputField({ label, type = 'text', ...props }) {
  return (
    <div className="form-group">
      <label>{label}</label>
      <input type={type} className="input-field" {...props} />
    </div>
  );
}