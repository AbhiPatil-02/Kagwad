// src/pages/ServiceDetail.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import '../styles/components.css';

export default function ServiceDetail() {
  const { serviceId } = useParams();
  const { services, loading } = useData();

  if (loading) return <div className="loading-message">Loading...</div>;

  const service = services.find(s => s.id === serviceId);

  if (!service) {
    return (
      <div className="page-wrapper">
        <h1>Service Not Found</h1>
        <p>The service you're looking for doesn't exist or may have been removed.</p>
        <Link to="/services" className="button button-primary">
          Back to Services
        </Link>
      </div>
    );
  }

  return (
    <div className="page-wrapper service-detail-page">
      <div className="service-detail-header">
        <Link to="/services" className="back-link">← Back to Services</Link>
        <h1>{service.name}</h1>
        <div className="service-meta">
          <span className={`service-status status-${service.status}`}>
            {service.status}
          </span>
          <span className="service-category">{service.category}</span>
        </div>
      </div>

      <div className="service-detail-content">
        <div className="service-images">
          {service.images && service.images.length > 0 ? (
            <img 
              src={service.images[0]} 
              alt={service.name}
              className="service-main-image"
            />
          ) : (
            <div className="service-image-placeholder">
              No Image Available
            </div>
          )}
        </div>

        <div className="service-info">
          <div className="info-section">
            <h3>Description</h3>
            <p>{service.description}</p>
          </div>

          <div className="info-section">
            <h3>Contact Information</h3>
            <div className="contact-details">
              {service.address && (
                <p><strong>Address:</strong> {service.address}</p>
              )}
              {service.phone && (
                <p><strong>Phone:</strong> {service.phone}</p>
              )}
              {service.email && (
                <p><strong>Email:</strong> {service.email}</p>
              )}
              {service.website && (
                <p><strong>Website:</strong> 
                  <a href={service.website} target="_blank" rel="noopener noreferrer">
                    {service.website}
                  </a>
                </p>
              )}
            </div>
          </div>

          {service.features && service.features.length > 0 && (
            <div className="info-section">
              <h3>Features</h3>
              <ul className="features-list">
                {service.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          {service.adminComment && (
            <div className="info-section admin-notes">
              <h3>Admin Notes</h3>
              <p>{service.adminComment}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}