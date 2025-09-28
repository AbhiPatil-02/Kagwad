// src/pages/Services.jsx
import React from 'react';
import { useData } from '../context/DataContext';
import { useTranslation } from 'react-i18next';
import ServiceCategoryCard from '../components/service/ServiceCategoryCard';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import '../styles/components.css';

export default function Services() {
  const { categories, services, loading } = useData();
  const { t } = useTranslation();
  // ✅ Import and use useAuth for checking authentication status
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (loading) return <div className="loading-message">{t('common.loading')}</div>;

  // Count services per category
  const getServiceCount = (categorySlug) => {
    return services.filter(service => 
      service.category === categorySlug && service.status === 'approved'
    ).length;
  };

  // ✅ Handle click logic: redirect to add-service if logged in, or auth page if not
  const handleAddService = () => {
    if (isAuthenticated) {
      navigate('/add-service');
    } else {
      navigate('/auth');
    }
  };

  return (
    <div className="page-wrapper services-page">
      <div className="page-header">
        {/* Using common.services for H1 translation, with a fallback */}
        <h1>{t('common.services', 'All Services')}</h1>
        <p>
          {t('servicesPage.description', 'Browse through {{count}} services across {{categories}} categories in Kagwad.', { 
            count: services.filter(s => s.status === 'approved').length,
            categories: categories.length 
          })}
        </p>
      </div>

      <div className="categories-section">
        <h2>{t('servicesPage.browseCategories', 'Browse by Category')}</h2>
        <p className="section-description">
          {t('servicesPage.sectionDescription', 'Explore local services, businesses, and places organized by category')}
        </p>
        
        <div className="categories-grid">
          {categories.map(category => {
            const serviceCount = getServiceCount(category.slug);
            return (
              <div key={category.id} className="category-card-wrapper">
                <ServiceCategoryCard category={category} />
                <div className="service-count">
                  {/* Using service/services pluralization translations */}
                  {serviceCount} {serviceCount === 1 ? t('servicesPage.service', 'service') : t('servicesPage.services', 'services')}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="services-stats">
        <div className="stat-item">
          <h3>{categories.length}</h3>
          <p>{t('servicesPage.categories', 'Categories')}</p>
        </div>
        <div className="stat-item">
          <h3>{services.filter(s => s.status === 'approved').length}</h3>
          <p>{t('servicesPage.approvedServices', 'Approved Services')}</p>
        </div>
        <div className="stat-item">
          <h3>{services.filter(s => s.status === 'pending').length}</h3>
          <p>{t('servicesPage.pendingApproval', 'Pending Approval')}</p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="services-cta">
        <h3>{t('servicesPage.ctaTitle', 'Can\'t find what you\'re looking for?')}</h3>
        <p>{t('servicesPage.ctaDescription', 'Help grow our community by adding a new service or business')}</p>
        
        {/* ✅ Updated to use the Button component and the handleAddService function */}
        <Button 
          onClick={handleAddService}
          className="add-service-btn"
        >
          {isAuthenticated ? t('servicesPage.addService', 'Add Your Service') : t('common.login', 'Login to Add Service')}
        </Button>
      </div>
    </div>
  );
}