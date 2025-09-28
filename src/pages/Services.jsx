// src/pages/Services.jsx
import React from 'react';
import { useData } from '../context/DataContext';
import ServiceCategoryCard from '../components/service/ServiceCategoryCard';
import '../styles/components.css';

export default function Services() {
  const { categories, loading } = useData();

  if (loading) return <div className="loading-message">Loading...</div>;

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <h1>All Categories</h1>
        <p>Browse through services, businesses, and places of interest in Kagwad.</p>
      </div>
      <div className="categories-grid">
        {categories.map(category => (
          <ServiceCategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}
