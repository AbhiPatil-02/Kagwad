// src/pages/CategoryList.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import ServiceCard from '../components/service/ServiceCard';
import '../styles/components.css';

export default function CategoryList() {
  const { categorySlug } = useParams();
  const navigate = useNavigate();
  const { services, categories, loading } = useData();

  if (loading) return <div className="loading-message">Loading...</div>;

  // Show all categories if no slug
  if (!categorySlug) {
    return (
      <div className="page-wrapper category-list-page">
        <h1>Browse Categories</h1>
        <div className="category-grid">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="category-card"
              onClick={() => navigate(`/services/${cat.slug}`)}
            >
              <span className="category-icon">{cat.icon}</span>
              <h3 className="category-name">{cat.title}</h3>
              <p>{cat.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Filter services by category
  const category = categories.find((cat) => cat.slug === categorySlug);
  const filteredServices = services.filter(
    (srv) => srv.category === categorySlug && srv.status === 'approved'
  );

  if (!category) {
    return (
      <div className="page-wrapper">
        <h1>Category Not Found</h1>
        <p>The category you are looking for does not exist.</p>
        <button onClick={() => navigate('/services')} className="back-btn">
          Back to All Categories
        </button>
      </div>
    );
  }

  return (
    <div className="page-wrapper category-list-page">
      <div className="page-header">
        <h1>Services in {category.title}</h1>
        <button onClick={() => navigate('/services')} className="back-btn">
          ← Back to Categories
        </button>
      </div>

      <div className="services-grid">
        {filteredServices.length > 0 ? (
          filteredServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              categorySlug={categorySlug}
            />
          ))
        ) : (
          <p>No services found in this category yet. Be the first to add one!</p>
        )}
      </div>
    </div>
  );
}
