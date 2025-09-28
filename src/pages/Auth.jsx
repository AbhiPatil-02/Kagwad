import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import InputField from '../components/common/InputField';
import Button from '../components/common/Button';
import '../styles/components.css';

export default function Auth() {
  const { login, register } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let result;
      if (isLogin) {
        result = await login({ mobile: formData.mobile, password: formData.password });
      } else {
        result = await register(formData);
      }

      if (result.success) {
        navigate('/');
      } else {
        setError(result.message || t('auth.loginFailed'));
      }
    } catch (err) {
      setError(t('auth.loginFailed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper auth-page">
      <div className="auth-container">
        <h1>{isLogin ? t('auth.loginTitle') : t('auth.registerTitle')}</h1>
        <p>{t('auth.description')}</p>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <InputField
              label={t('auth.yourName')}
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder={t('auth.namePlaceholder')} // New placeholder
              required
            />
          )}
          <InputField
            label={t('auth.mobile')}
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleInputChange}
            placeholder={t('auth.mobilePlaceholder')} // New placeholder
            required
          />
          <InputField
            label={t('auth.password')}
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder={t('auth.passwordPlaceholder')} // New placeholder
            required
          />
          {error && <div className="error-message">{error}</div>}
          <Button type="submit" disabled={loading}>
            {loading ? t('auth.submitting') : (isLogin ? t('auth.loginBtn') : t('auth.registerBtn'))}
          </Button>
        </form>
        <div className="auth-switch">
          <p onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? t('auth.noAccount') : t('auth.haveAccount')}
          </p>
        </div>
      </div>
    </div>
  );
}