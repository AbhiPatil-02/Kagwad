// src/pages/AddService.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from '../components/common/Button';
import InputField from '../components/common/InputField';
import '../styles/components.css';

export default function AddService() {
  const { user } = useAuth();
  const { categories, addService } = useData();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    address: '',
    phone: '',
    email: '',
    website: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const serviceData = {
        ...formData,
        submittedById: user.id,
        status: 'pending',
        images: ['/images/service_placeholder.jpg']
      };

      await addService(serviceData);
      // Use translation key for the alert message
      alert(t('addService.successMessage', 'Service submitted successfully! It will be visible after admin approval.'));
      navigate('/services');
    } catch (err) {
      // Use translation key for the error message
      setError(t('addService.errorMessage', 'Failed to submit service. Please try again.'));
    } finally {
      setLoading(false);
    }
  };

  // Helper function to get translated category names
  const getTranslatedCategory = (categorySlug) => {
    // This key structure assumes translations are stored like: common.categories.home-services
    return t(`common.categories.${categorySlug}`, categorySlug);
  };

  return (
    <div className="page-wrapper">
      <h1>{t('addService.title', 'Add New Service')}</h1>
      
      <form onSubmit={handleSubmit} className="add-service-form">
        <InputField
          label={t('addService.nameLabel', 'Service Name')}
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder={t('addService.namePlaceholder', 'Enter service or business name')}
          required
        />

        <div className="form-group">
          <label>{t('addService.descriptionLabel', 'Description')}</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder={t('addService.descriptionPlaceholder', 'Describe your service in detail')}
            className="input-field"
            rows="4"
            required
          />
        </div>

        <div className="form-group">
          <label>{t('addService.categoryLabel', 'Category')}</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="input-field"
            required
          >
            <option value="">{t('addService.selectCategory', 'Select a category')}</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.slug}>
                {getTranslatedCategory(cat.slug)}
              </option>
            ))}
          </select>
        </div>

        <InputField
          label={t('addService.addressLabel', 'Address')}
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder={t('addService.addressPlaceholder', 'Full address of your service')}
          required
        />

        <InputField
          label={t('addService.phoneLabel', 'Phone Number')}
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder={t('addService.phonePlaceholder', 'Contact phone number')}
          required
        />

        <InputField
          label={t('addService.emailLabel', 'Email (Optional)')}
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder={t('addService.emailPlaceholder', 'Contact email address')}
        />

        <InputField
          label={t('addService.websiteLabel', 'Website (Optional)')}
          type="url"
          name="website"
          value={formData.website}
          onChange={handleChange}
          placeholder={t('addService.websitePlaceholder', 'Website URL')}
        />

        {error && <div className="error-message">{error}</div>}

        <Button type="submit" disabled={loading}>
          {loading ? 
            t('addService.submitting', 'Submitting...') : 
            t('addService.submitButton', 'Submit Service')
          }
        </Button>
      </form>
    </div>
  );
}