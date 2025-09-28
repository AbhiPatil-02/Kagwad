// src/pages/ContactUs.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";
import "../styles/components.css";

export default function ContactPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  const [formData, setFormData] = useState({
    reason: "",
    name: user?.name || "",
    mobile: user?.mobile || "",
    email: user?.email || "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(t("contactPage.sending"));

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus(t("contactPage.thanksMessage"));
        setFormData({
          reason: "",
          name: user?.name || "",
          mobile: user?.mobile || "",
          email: user?.email || "",
          subject: "",
          message: "",
        });
      } else {
        setStatus("❌ " + t("contactPage.errorMessage"));
      }
    } catch (err) {
      setStatus("⚠️ " + t("contactPage.errorMessage"));
    }
  };

  return (
    <div className="page-container">
      <div className="form-card">
        <h2 className="form-title">{t("contactPage.title")}</h2>
        <p className="form-subtitle">{t("contactPage.description")}</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Reason */}
          <div>
            <label className="form-label">{t("contactPage.inquiryType")}</label>
            <select
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              required
              className="input-field"
            >
              <option value="">{t("contactPage.selectOption")}</option>
              <option value="suggestion">{t("contactPage.suggestion")}</option>
              <option value="complaint">{t("contactPage.complaint")}</option>
              <option value="question">{t("contactPage.question")}</option>
              <option value="generalFeedback">
                {t("contactPage.generalFeedback")}
              </option>
              <option value="other">{t("contactPage.other")}</option>
            </select>
          </div>

          {/* Name */}
          <div>
            <label className="form-label">{t("contactPage.yourName")}</label>
            <input
              type="text"
              name="name"
              placeholder={t("contactPage.namePlaceholder")}
              value={formData.name}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>

          {/* Mobile */}
          <div>
            <label className="form-label">{t("contactPage.yourMobile")}</label>
            <input
              type="tel"
              name="mobile"
              placeholder={t("contactPage.mobilePlaceholder")}
              value={formData.mobile}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>

          {/* Email */}
          <div>
            <label className="form-label">{t("contactPage.yourEmail")}</label>
            <input
              type="email"
              name="email"
              placeholder={t("contactPage.emailPlaceholder")}
              value={formData.email}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>

          {/* Subject */}
          <div>
            <label className="form-label">{t("contactPage.subject")}</label>
            <input
              type="text"
              name="subject"
              placeholder={t("contactPage.subjectPlaceholder")}
              value={formData.subject}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>

          {/* Message */}
          <div>
            <label className="form-label">{t("contactPage.yourMessage")}</label>
            <textarea
              name="message"
              placeholder={t("contactPage.messagePlaceholder")}
              value={formData.message}
              onChange={handleChange}
              rows="4"
              required
              className="input-field"
            />
          </div>

          {/* Submit */}
          <button type="submit" className="btn-primary w-full">
            {t("contactPage.send")}
          </button>
        </form>

        {status && <p className="mt-4 text-center">{status}</p>}
      </div>
    </div>
  );
}
