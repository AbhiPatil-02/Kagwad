// src/pages/Home.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext'; // ✅ Import useAuth
import Button from '../components/common/Button';
import ServiceCard from '../components/common/ServiceCard';
import '../styles/components.css';

const getFeaturedServices = (allServices) =>
  allServices.filter(s => s.status === 'approved').slice(0, 3);

export default function Home() {
  const { categories, services, loading } = useData();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth(); // ✅ Get isAuthenticated status

  const totalServices = services.filter(s => s.status === 'approved').length;
  const featuredServices = getFeaturedServices(services);

  if (loading) return <div className="loading-message">{t('common.loading')}</div>;

  // Function to handle redirection based on auth status
  const handleContributeClick = () => {
    if (isAuthenticated) {
      navigate('/add-service');
    } else {
      navigate('/auth');
    }
  };

  return (
    <div className="page-wrapper home-page">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1>{t('homePage.welcomeTitle', 'Welcome to Namma Kagwad')}</h1>
          <p>{t('homePage.welcomeDescription', 'Explore services, businesses, and local places')}</p>
          <div className="hero-actions">
            <Button onClick={() => navigate('/services')}>
              {t('homePage.exploreServices', 'Explore Services')}
            </Button>
            {/* ✅ Updated: Use handleContributeClick for the "Add Service" button */}
            <Button onClick={handleContributeClick} variant="secondary">
              {t('homePage.addService', 'Add Service')}
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-section">
        <div className="stat-card">
          <h3>{totalServices}+</h3>
          <p>{t('homePage.totalServices', 'Services')}</p>
        </div>
        <div className="stat-card">
          <h3>{categories.length}</h3>
          <p>{t('homePage.categories', 'Categories')}</p>
        </div>
      </div>

      {/* How It Works */}
      <div className="section how-it-works-section">
        <h2>{t('homePage.howItWorksTitle', 'How It Works')}</h2>
        <div className="how-it-works-steps">
          {['Step 1', 'Step 2', 'Step 3'].map((step, i) => (
            <div key={i} className="step-card">
              <img src={`https://dummyimage.com/100x100/e0e0e0/000&text=${i+1}`} alt={step} />
              <h4>{t(`homePage.step${i+1}Title`, step)}</h4>
              <p>{t(`homePage.step${i+1}Description`, 'Description')}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Services */}
      {featuredServices.length > 0 && (
        <div className="section featured-services-section">
          <h2>{t('homePage.featuredServicesTitle', 'Featured Services')}</h2>
          <div className="featured-services-grid">
            {featuredServices.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
          <div className="featured-services-cta">
            <Link to="/services">
              <Button variant="secondary">{t('homePage.viewAllServices', 'View All')}</Button>
            </Link>
          </div>
        </div>
      )}

      {/* About teaser */}
      <div className="section about-section">
        <h2>{t('aboutPage.title', 'About Kagwad')}</h2>
        <p>{t('aboutPage.teaserText', 'Learn about our village, culture, and history.')}</p>
        <Link to="/about">
          <Button>{t('aboutPage.readMore', 'Read More')}</Button>
        </Link>
      </div>

      {/* Call to Action */}
      <div className="section call-to-action">
        <h3>{t('homePage.ctaTitle', 'Contribute Now')}</h3>
        <p>{t('homePage.ctaDescription', 'Add your service and help the community grow.')}</p>
        {/* ✅ Updated: Use handleContributeClick and render a button instead of a Link wrapper */}
        <Button onClick={handleContributeClick}>
          {t('homePage.contributeNow', 'Contribute Now')}
        </Button>
      </div>

      {/* Contact teaser */}
      <div className="section contact-section">
        <h2>{t('contactPage.title', 'Contact Us')}</h2>
        <p>{t('contactPage.teaserText', 'Get in touch for support or queries.')}</p>
        {/* Contact is protected, so this link must also check auth status for redirect */}
        <Button onClick={() => navigate(isAuthenticated ? '/contact' : '/auth')}>
          {t('contactPage.contactUs', 'Contact')}
        </Button>
      </div>
    </div>
  );
}