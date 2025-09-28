// src/pages/ServiceDetail.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { useData } from '../context/DataContext';
import ServiceCard from '../components/common/ServiceCard';
import '../styles/components.css';

export default function ServiceDetail() {
  const { id } = useParams();
  const { services, loading } = useData();

  if (loading) return <div className="loading-message">Loading...</div>;

  const categoryServices = services.filter(s => s.categoryId === id && s.status === 'approved');

  if (!categoryServices.length) {
    return (
      <div className="page-wrapper">
        <h2>No services found in this category.</h2>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <h1>Services</h1>
      <div className="featured-services-grid">
        {categoryServices.map(service => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
}
