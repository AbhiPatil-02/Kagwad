// src/pages/Auth.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import InputField from '../components/common/InputField';
import Button from '../components/common/Button';
// Correctly import getSecurityQuestions instead of the old securityQuestions array
import { getSecurityQuestions } from '../services/api';
import '../styles/components.css';

export default function Auth() {
  const { login, register } = useAuth();
  // Destructure i18n to get the current language
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  
  const [isLogin, setIsLogin] = useState(true);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    securityQuestion: '',
    securityAnswer: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetStep, setResetStep] = useState(1); // 1: Enter mobile, 2: Security question, 3: New password
  const [resetMobile, setResetMobile] = useState('');
  const [resetSecurityQuestion, setResetSecurityQuestion] = useState('');
  const [resetData, setResetData] = useState({
    securityAnswer: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  // Get security questions in current language
  const securityQuestions = getSecurityQuestions(i18n.language);
  const englishQuestions = getSecurityQuestions('en'); // Used for storing/comparing

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleResetInputChange = (e) => {
    const { name, value } = e.target;
    setResetData({ ...resetData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validation for registration
      if (!isLogin) {
        if (formData.password !== formData.confirmPassword) {
          // Fallback to a clear message if translation key is missing
          setError(t('auth.passwordsNotMatch') || 'Passwords do not match.'); 
          setLoading(false);
          return;
        }
        if (!formData.securityQuestion || !formData.securityAnswer) {
          // Fallback to a clear message if translation key is missing
          setError(t('auth.securityQuestionRequired') || 'Please select a security question and provide an answer.');
          setLoading(false);
          return;
        }
      }

      let result;
      if (isLogin) {
        result = await login({ mobile: formData.mobile, password: formData.password });
      } else {
        // --- LOGIC TO STORE ENGLISH QUESTION ---
        const selectedQuestionIndex = securityQuestions.indexOf(formData.securityQuestion);
        const englishQuestion = englishQuestions[selectedQuestionIndex]; // Get the English version to store

        const userData = {
          name: formData.name,
          mobile: formData.mobile,
          password: formData.password,
          securityQuestion: englishQuestion, // Store in English for consistency
          securityAnswer: formData.securityAnswer,
        };
        result = await register(userData);
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

  // Forgot Password Functions
  const handleForgotPassword = () => {
    setShowForgotPassword(true);
    setResetStep(1);
    setResetMobile('');
    setResetSecurityQuestion('');
    setResetData({ securityAnswer: '', newPassword: '', confirmNewPassword: '' });
    setError('');
  };

  const handleGetSecurityQuestion = async () => {
    if (!resetMobile) {
      setError(t('auth.enterMobileNumber') || t('auth.mobilePlaceholder'));
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const { getUserSecurityQuestion } = await import('../services/api');
      const result = await getUserSecurityQuestion(resetMobile);
      
      if (result.success) {
        // --- LOGIC TO TRANSLATE RETRIEVED QUESTION ---
        const storedEnglishQuestion = result.securityQuestion;
        
        // Find the index of the stored English question
        const questionIndex = englishQuestions.indexOf(storedEnglishQuestion);
        
        // Get the question in the current language using the index
        const currentLanguageQuestion = securityQuestions[questionIndex] || storedEnglishQuestion;

        setResetSecurityQuestion(currentLanguageQuestion);
        setResetStep(2);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError(t('auth.failedToRetrieveQuestion') || t('auth.loginFailed'));
    } finally {
      setLoading(false);
    }
  };

  const handleVerifySecurityAnswer = async () => {
    if (!resetData.securityAnswer) {
      setError(t('auth.enterSecurityAnswer') || t('auth.securityAnswerPlaceholder'));
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const { verifySecurityAnswer } = await import('../services/api');
      // The API verifies against the stored English question and answer
      const result = await verifySecurityAnswer(resetMobile, resetData.securityAnswer);
      
      if (result.success) {
        setResetStep(3);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError(t('auth.failedToVerifyAnswer') || t('auth.loginFailed'));
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!resetData.newPassword || !resetData.confirmNewPassword) {
      setError(t('auth.enterAndConfirmPassword') || t('auth.confirmPasswordPlaceholder'));
      return;
    }

    if (resetData.newPassword !== resetData.confirmNewPassword) {
      setError(t('auth.passwordsNotMatch') || t('auth.confirmPasswordPlaceholder'));
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const { resetPassword } = await import('../services/api');
      const result = await resetPassword(resetMobile, resetData.newPassword);
      
      if (result.success) {
        alert(t('auth.passwordResetSuccess') || 'Password reset successfully! You can now login with your new password.'); 
        setShowForgotPassword(false);
        setIsLogin(true);
        setFormData({ name: '', mobile: '', password: '', confirmPassword: '', securityQuestion: '', securityAnswer: '' });
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError(t('auth.failedToResetPassword') || t('auth.loginFailed'));
    } finally {
      setLoading(false);
    }
  };

  const cancelForgotPassword = () => {
    setShowForgotPassword(false);
    setError('');
    setLoading(false);
  };

  if (showForgotPassword) {
    return (
      <div className="page-wrapper auth-page">
        <div className="auth-container">
          <h1>{t('auth.resetPassword')}</h1>
          
          {resetStep === 1 && (
            <>
              <p>{t('auth.enterMobile')}</p>
              <div className="form-group">
                <label>{t('auth.mobile')}</label>
                <input
                  type="tel"
                  className="input-field"
                  value={resetMobile}
                  onChange={(e) => setResetMobile(e.target.value)}
                  placeholder={t('auth.mobilePlaceholder')}
                  required
                />
              </div>
              {error && <div className="error-message">{error}</div>}
              <div className="auth-actions">
                <Button onClick={handleGetSecurityQuestion} disabled={loading}>
                  {loading ? t('auth.checking') : t('auth.continue')}
                </Button>
                <Button type="button" variant="secondary" onClick={cancelForgotPassword}>
                  {t('auth.cancel')}
                </Button>
              </div>
            </>
          )}

          {resetStep === 2 && (
            <>
              <p>{t('auth.answerSecurityQuestion') || t('auth.securityQuestion')}</p>
              <div className="form-group">
                <label>{t('auth.securityQuestion')}</label>
                <p className="security-question">{resetSecurityQuestion}</p>
              </div>
              <div className="form-group">
                <label>{t('auth.yourAnswer')}</label>
                <input
                  type="text"
                  name="securityAnswer"
                  className="input-field"
                  value={resetData.securityAnswer}
                  onChange={handleResetInputChange}
                  placeholder={t('auth.securityAnswerPlaceholder')}
                  required
                />
              </div>
              {error && <div className="error-message">{error}</div>}
              <div className="auth-actions">
                <Button onClick={handleVerifySecurityAnswer} disabled={loading}>
                  {loading ? t('auth.verifying') : t('auth.verifyAnswer')}
                </Button>
                <Button type="button" variant="secondary" onClick={cancelForgotPassword}>
                  {t('auth.cancel')}
                </Button>
              </div>
            </>
          )}

          {resetStep === 3 && (
            <>
              <p>{t('auth.createNewPassword')}</p>
              <div className="form-group">
                <label>{t('auth.newPassword')}</label>
                <input
                  type="password"
                  name="newPassword"
                  className="input-field"
                  value={resetData.newPassword}
                  onChange={handleResetInputChange}
                  placeholder={t('auth.newPassword')}
                  required
                />
              </div>
              <div className="form-group">
                <label>{t('auth.confirmNewPassword')}</label>
                <input
                  type="password"
                  name="confirmNewPassword"
                  className="input-field"
                  value={resetData.confirmNewPassword}
                  onChange={handleResetInputChange}
                  placeholder={t('auth.confirmNewPassword')}
                  required
                />
              </div>
              {error && <div className="error-message">{error}</div>}
              <div className="auth-actions">
                <Button onClick={handleResetPassword} disabled={loading}>
                  {loading ? t('auth.resetting') : t('auth.resetPassword')}
                </Button>
                <Button type="button" variant="secondary" onClick={cancelForgotPassword}>
                  {t('auth.cancel')}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

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
              placeholder={t('auth.namePlaceholder')}
              required
            />
          )}
          
          <InputField
            label={t('auth.mobile')}
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleInputChange}
            placeholder={t('auth.mobilePlaceholder')}
            required
          />
          
          <InputField
            label={t('auth.password')}
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder={t('auth.passwordPlaceholder')}
            required
          />

          {!isLogin && (
            <>
              <InputField
                label={t('auth.confirmPassword')}
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder={t('auth.confirmPasswordPlaceholder')}
                required
              />

              <div className="form-group">
                <label>{t('auth.securityQuestion')}</label>
                <select
                  name="securityQuestion"
                  value={formData.securityQuestion}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                >
                  <option value="">{t('auth.selectQuestion')}</option>
                  {/* Map over the securityQuestions array which is now in the current language */}
                  {securityQuestions.map((question, index) => (
                    <option key={index} value={question}>
                      {question}
                    </option>
                  ))}
                </select>
              </div>

              <InputField
                label={t('auth.securityAnswer')}
                type="text"
                name="securityAnswer"
                value={formData.securityAnswer}
                onChange={handleInputChange}
                placeholder={t('auth.securityAnswerPlaceholder')}
                required
              />
            </>
          )}

          {error && <div className="error-message">{error}</div>}

          <Button type="submit" disabled={loading}>
            {loading ? t('auth.submitting') : (isLogin ? t('auth.loginBtn') : t('auth.registerBtn'))}
          </Button>

          {isLogin && (
            <div className="forgot-password-link">
              <button 
                type="button" 
                className="link-button"
                onClick={handleForgotPassword}
              >
                {t('auth.forgotPassword')}
              </button>
            </div>
          )}
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