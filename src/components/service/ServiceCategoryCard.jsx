// src/components/service/ServiceCategoryCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/components.css';

export default function ServiceCategoryCard({ category }) {
  const navigate = useNavigate();

  return (
    <div
      className="category-card hover-zoom animate-fade-in-up"
      onClick={() => navigate(`/services/${category.slug}`)}
      title={`View services under ${category.title}`}
    >
      <img
        src={category.image || '/images/category_placeholder.png'}
        alt={category.title}
        className="category-icon"
      />
      <h3>{category.title}</h3>
    </div>
  );
}
