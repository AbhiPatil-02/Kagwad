// src/pages/Services.jsx
import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import { useTranslation } from 'react-i18next';
import ServiceCategoryCard from '../components/service/ServiceCategoryCard';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import SearchBar from '../components/common/SearchBar';
import '../styles/components.css';

export default function Services() {
  const { categories, services, loading } = useData();
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // State for search and filter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  if (loading) return <div className="loading-message">{t('common.loading')}</div>;

  // Filter services based on search query and category
  const filteredServices = useMemo(() => {
    let filtered = services.filter(service => service.status === 'approved');

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(service =>
        service.name.toLowerCase().includes(query) ||
        service.description.toLowerCase().includes(query) ||
        service.category.toLowerCase().includes(query) ||
        service.address.toLowerCase().includes(query) ||
        (service.phone && service.phone.includes(query))
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(service => service.category === selectedCategory);
    }

    return filtered;
  }, [services, searchQuery, selectedCategory]);

  // Get unique categories from approved services for filter dropdown
  const availableCategories = useMemo(() => {
    const serviceCategories = [...new Set(services
      .filter(service => service.status === 'approved')
      .map(service => service.category)
    )];
    
    return serviceCategories.map(slug => {
      const category = categories.find(cat => cat.slug === slug);
      return category || { slug, title: slug };
    });
  }, [services, categories]);

  // Count services per category for the grid (uses all approved services)
  const getServiceCount = (categorySlug) => {
    return services.filter(service => 
      service.category === categorySlug && service.status === 'approved'
    ).length;
  };

  const handleAddService = () => {
    if (isAuthenticated) {
      navigate('/add-service');
    } else {
      navigate('/auth');
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
  };

  const hasActiveFilters = searchQuery.trim() || selectedCategory !== 'all';

  return (
    <div className="page-wrapper services-page">
      <div className="page-header">
        <h1>{t('common.services', 'All Services')}</h1>
        <p>
          {t('servicesPage.description', 'Browse through {{count}} services across {{categories}} categories in Kagwad.', { 
            count: services.filter(s => s.status === 'approved').length,
            categories: categories.length 
          })}
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="search-filter-section">
        <div className="search-container">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder={t('search.servicesPlaceholder', 'Search services by name, category, description...')}
          />
        </div>

        <div className="filter-controls">
          <div className="filter-group">
            <label htmlFor="category-filter">{t('search.filterByCategory', 'Filter by Category:')}</label>
            <select
              id="category-filter"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="filter-select"
            >
              <option value="all">{t('search.allCategories', 'All Categories')}</option>
              {availableCategories.map(category => (
                <option key={category.slug} value={category.slug}>
                  {t(`common.categories.${category.slug}`, category.title)}
                </option>
              ))}
            </select>
          </div>

          {hasActiveFilters && (
            <Button 
              variant="secondary" 
              onClick={clearFilters}
              className="clear-filters-btn"
            >
              {t('search.clearFilters', 'Clear Filters')}
            </Button>
          )}
        </div>

        {/* Search Results Info */}
        {hasActiveFilters && (
          <div className="search-results-info">
            <p>
              {filteredServices.length === 0 ? (
                t('search.noResults', 'No services found matching your search.')
              ) : (
                t('search.resultsCount', 'Found {{count}} services', { count: filteredServices.length })
              )}
            </p>
            {searchQuery && (
              <p className="search-query">
                {t('search.searchingFor', 'Searching for:')} "<strong>{searchQuery}</strong>"
              </p>
            )}
          </div>
        )}
      </div>

      {/* Services Grid or Search Results */}
      {hasActiveFilters ? (
        <div className="search-results-section">
          <h2>{t('search.searchResults', 'Search Results')}</h2>
          {filteredServices.length > 0 ? (
            <div className="services-grid search-results-grid">
              {filteredServices.map(service => (
                <div key={service.id} className="service-card search-result-card">
                  <div className="service-card-image-container">
                    <img
                      src={service.images?.[0] || '/images/no_image.png'}
                      alt={service.name}
                      className="service-card-image"
                    />
                  </div>
                  <div className="service-card-content">
                    <h3>{service.name}</h3>
                    <p className="service-category-badge">
                      {t(`common.categories.${service.category}`, service.category)}
                    </p>
                    <p className="service-description">{service.description}</p>
                    <p className="service-address">{service.address}</p>
                    {service.phone && (
                      <p className="service-phone">📞 {service.phone}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-results">
              <p>{t('search.noServicesFound', 'No services found. Try adjusting your search or filters.')}</p>
              <Button onClick={clearFilters}>
                {t('search.showAllServices', 'Show All Services')}
              </Button>
            </div>
          )}
        </div>
      ) : (
        /* Original Categories Grid */
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
                    {serviceCount} {serviceCount === 1 ? t('servicesPage.service', 'service') : t('servicesPage.services', 'services')}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

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