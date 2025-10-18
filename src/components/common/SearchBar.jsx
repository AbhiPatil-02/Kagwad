// src/components/common/SearchBar.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import '../../styles/components.css';

export default function SearchBar({ value, onChange, placeholder }) {
  const { t } = useTranslation();

  return (
    <div className="search-bar-container">
      <div className="search-bar">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || t('search.placeholder', 'Search services...')}
          className="search-input"
        />
        <span className="search-icon">🔍</span>
      </div>
    </div>
  );
}