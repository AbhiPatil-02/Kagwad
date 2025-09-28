// src/pages/ContactUs.jsx
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";
import { submitContactForm } from "../services/api";
import InputField from "../components/common/InputField";
import Button from "../components/common/Button";
import "../styles/components.css";

export default function ContactUs() {
  const { user } = useAuth();
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    mobile: user?.mobile || "",
    inquiryType: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  // Pre-fill user data when component mounts or user changes
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
        mobile: user.mobile || "",
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(t("contactPage.sending"));

    try {
      const result = await submitContactForm(formData);
      if (result.success) {
        setStatus(t("contactPage.thanksMessage"));
        setFormData({
          name: user?.name || "",
          email: user?.email || "",
          mobile: user?.mobile || "",
          inquiryType: "",
          subject: "",
          message: "",
        });
      } else {
        setStatus(t("contactPage.errorMessage"));
      }
    } catch (err) {
      setStatus(t("contactPage.errorMessage"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <h1>{t("contactPage.title")}</h1>
        <p>{t("contactPage.description")}</p>
      </div>

      <div className="contact-form-container">
        <form onSubmit={handleSubmit} className="contact-form">
          <InputField
            label={t("contactPage.yourName")}
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={t("contactPage.namePlaceholder")}
            required
          />

          <InputField
            label={t("contactPage.yourEmail")}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={t("contactPage.emailPlaceholder")}
            required
          />

          <InputField
            label={t("contactPage.yourMobile")}
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder={t("contactPage.mobilePlaceholder")}
            required
          />

          <div className="form-group">
            <label>{t("contactPage.inquiryType")}</label>
            <select
              name="inquiryType"
              value={formData.inquiryType}
              onChange={handleChange}
              className="input-field"
              required
            >
              <option value="">{t("contactPage.selectOption")}</option>
              <option value="suggestion">{t("contactPage.suggestion")}</option>
              <option value="complaint">{t("contactPage.complaint")}</option>
              <option value="question">{t("contactPage.question")}</option>
              <option value="feedback">{t("contactPage.generalFeedback")}</option>
              <option value="other">{t("contactPage.other")}</option>
            </select>
          </div>

          <InputField
            label={t("contactPage.subject")}
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder={t("contactPage.subjectPlaceholder")}
            required
          />

          <div className="form-group">
            <label>{t("contactPage.yourMessage")}</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder={t("contactPage.messagePlaceholder")}
              className="input-field"
              rows="5"
              required
            />
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? t("contactPage.sending") : t("contactPage.send")}
          </Button>

          {status && (
            <div className={`status-message ${status.includes('✅') ? 'success' : 'error'}`}>
              {status}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}