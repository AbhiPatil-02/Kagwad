// src/components/service/ServiceCategoryCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../../styles/components.css';

export default function ServiceCategoryCard({ category }) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleClick = () => {
    navigate(`/services/${category.slug}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick();
    }
  };

  // Get category icon based on slug
  const getCategoryIcon = (slug) => {
    const iconMap = {
      'home-services': '🏠',
      'health': '🏥',
      'school-colleges': '🏫',
      'govt-offices': '🏛️',
      'cafe-restr': '☕',
      'hotel-lodge': '🏨',
      'travel-transport': '🚗',
      'temple': '🛕',
      'stores': '🏪',
      'politics': '⚖️',
      'barber-parlor': '💇',
      'instagram-pages': '📱',
      'sound-decor': '🎵',
      'photography': '📷',
      'agriculture': '🌾'
    };
    return iconMap[slug] || '📋';
  };

  return (
    <div
      className="category-card hover-zoom animate-fade-in-up"
      onClick={handleClick}
      onKeyPress={handleKeyPress}
      tabIndex={0}
      role="button"
      aria-label={`Browse ${category.title} services`}
      title={`Browse ${category.title} services`}
    >
      <div className="category-icon-container">
        <span className="category-icon-emoji">
          {getCategoryIcon(category.slug)}
        </span>
        {category.image && (
          <img
            src={category.image}
            alt={category.title}
            className="category-icon-image"
            loading="lazy"
          />
        )}
      </div>
      <h3 className="category-title">{category.title}</h3>
      <p className="category-description">
        {t(`common.categories.${category.slug}`, category.title)}
      </p>
      <div className="category-arrow">→</div>
    </div>
  );
}