// src/pages/Profile.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";
import { useTranslation } from "react-i18next";
import Button from "../components/common/Button";
import InputField from "../components/common/InputField";
import "../styles/components.css";

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const { services } = useData();
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    occupation: "",
    address: "",
    dob: "",
    gender: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        mobile: user.mobile || "",
        occupation: user.occupation || "",
        address: user.address || "",
        dob: user.dob || "",
        gender: user.gender || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const result = await updateProfile(user.id, formData);
      if (result.success) {
        setMessage(t("profilePage.successMessage"));
        setIsEditing(false);
      } else {
        setMessage(result.message || t("profilePage.errorMessage"));
      }
    } catch (err) {
      setMessage(t("profilePage.errorMessage"));
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setFormData({
      name: user.name || "",
      email: user.email || "",
      mobile: user.mobile || "",
      occupation: user.occupation || "",
      address: user.address || "",
      dob: user.dob || "",
      gender: user.gender || "",
    });
    setIsEditing(false);
    setMessage("");
  };

  const userServices = services.filter(s => s.submittedById === user?.id);
  const approvedServices = userServices.filter(s => s.status === 'approved');
  const pendingServices = userServices.filter(s => s.status === 'pending');

  // Helper function to get translated gender
  const getTranslatedGender = (gender) => {
    // Uses a default translation key 'notSpecified' for null/empty gender
    if (!gender) return t("profilePage.notSpecified", "Not specified"); 
    
    // Maps the stored key (e.g., 'male') to the translated value (e.g., 'Male' or 'ಪುರುಷ')
    const genderMap = {
      'male': t("profilePage.male"),
      'female': t("profilePage.female"), 
      'other': t("profilePage.other")
    };
    
    // Returns the translated gender or the original value as a fallback
    return genderMap[gender] || gender;
  };

  // Helper function to get translated status
  const getTranslatedStatus = (status) => {
    const statusMap = {
      'approved': t("profilePage.approved"),
      'pending': t("profilePage.pending"),
      'rejected': t("profilePage.rejected") || 'Rejected' // Assuming 'rejected' translation key exists or fallback
    };
    
    return statusMap[status] || status;
  };

  if (!user) return <div className="loading-message">{t("common.loading")}</div>;

  return (
    <div className="page-wrapper profile-page">
      {/* Header Section */}
      <div className="profile-header-section">
        <h1>{t("profilePage.title")}</h1>
        <p className="profile-subtitle">{t("profilePage.subtitle")}</p>
      </div>

      <div className="profile-content">
        {/* Personal Information Card */}
        <div className="profile-card personal-info-card">
          <div className="card-header">
            <h2>{t("profilePage.personalInfo")}</h2>
            {!isEditing && (
              <Button 
                variant="secondary" 
                onClick={() => setIsEditing(true)}
                className="edit-profile-btn"
              >
                {t("profilePage.editProfile")}
              </Button>
            )}
          </div>

          {isEditing ? (
            <form onSubmit={handleSubmit} className="profile-form">
              <div className="form-row">
                <InputField
                  label={t("profilePage.userName")}
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <InputField
                  label={t("profilePage.occupation")}
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  placeholder={t("profilePage.occupationPlaceholder", "e.g., Electrician, Teacher, Business Owner")}
                />
              </div>

              <div className="form-row">
                <InputField
                  label={t("profilePage.email")}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <InputField
                  label={t("profilePage.phone")}
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                />
              </div>

              <InputField
                label={t("profilePage.address")}
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder={t("profilePage.addressPlaceholder", "Enter your complete address")}
              />

              <div className="form-row">
                <InputField
                  label={t("profilePage.dob")}
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                />
                <div className="form-group">
                  <label>{t("profilePage.gender")}</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option value="">{t("profilePage.selectGender")}</option>
                    <option value="male">{t("profilePage.male")}</option>
                    <option value="female">{t("profilePage.female")}</option>
                    <option value="other">{t("profilePage.other")}</option>
                  </select>
                </div>
              </div>

              {message && (
                <div className={`message ${message.includes('successfully') ? 'success' : 'error'}`}>
                  {message}
                </div>
              )}

              <div className="form-actions">
                <Button type="submit" disabled={loading}>
                  {loading ? t("profilePage.saving", "Saving...") : t("profilePage.saveChanges")}
                </Button>
                <Button type="button" variant="secondary" onClick={handleCancelEdit}>
                  {t("profilePage.cancel")}
                </Button>
              </div>
            </form>
          ) : (
            <div className="profile-info-display">
              <div className="info-grid">
                <div className="info-item">
                  <label>{t("profilePage.userName")}</label>
                  <p className="info-value">{user.name || t("profilePage.notProvided", "Not provided")}</p>
                </div>
                <div className="info-item">
                  <label>{t("profilePage.occupation")}</label>
                  <p className="info-value">{user.occupation || t("profilePage.noOccupation", "No occupation specified")}</p>
                </div>
                <div className="info-item">
                  <label>{t("profilePage.email")}</label>
                  <p className="info-value">{user.email || t("profilePage.notProvided", "Not provided")}</p>
                </div>
                <div className="info-item">
                  <label>{t("profilePage.phone")}</label>
                  <p className="info-value">{user.mobile || t("profilePage.notProvided", "Not provided")}</p>
                </div>
                <div className="info-item">
                  <label>{t("profilePage.address")}</label>
                  <p className="info-value">{user.address || t("profilePage.notProvided", "Not provided")}</p>
                </div>
                <div className="info-item">
                  <label>{t("profilePage.dob")}</label>
                  <p className="info-value">
                    {user.dob ? new Date(user.dob).toLocaleDateString() : t("profilePage.notProvided", "Not provided")}
                  </p>
                </div>
                <div className="info-item">
                  <label>{t("profilePage.gender")}</label>
                  <p className="info-value">
                    {getTranslatedGender(user.gender)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* My Contributions Section */}
        <div className="profile-card contributions-card">
          <div className="card-header">
            <h2>{t("profilePage.myContributions")}</h2>
            <div className="contribution-stats">
              <span className="stat approved">
                {approvedServices.length} {t("profilePage.approved")}
              </span>
              <span className="stat pending">
                {pendingServices.length} {t("profilePage.pending")}
              </span>
              <span className="stat total">
                {userServices.length} {t("profilePage.total")}
              </span>
            </div>
          </div>

          {userServices.length === 0 ? (
            <div className="no-contributions">
              <p>{t("profilePage.noContributions")}</p>
              <Button onClick={() => window.location.href = '/add-service'}>
                {t("profilePage.addFirstService")}
              </Button>
            </div>
          ) : (
            <div className="contributions-list">
              {userServices.map(service => (
                <div key={service.id} className={`contribution-item status-${service.status}`}>
                  <div className="service-main-info">
                    <h4 className="service-name">{service.name}</h4>
                    <span className="service-category">{service.category}</span>
                  </div>
                  <div className="service-details">
                    <p className="service-description">{service.description}</p>
                    <div className="service-meta">
                      <span className={`status-badge status-${service.status}`}>
                        {getTranslatedStatus(service.status)}
                      </span>
                      {service.adminComment && (
                        <div className="admin-feedback">
                          <strong>{t("profilePage.adminFeedback")}:</strong> {service.adminComment}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}