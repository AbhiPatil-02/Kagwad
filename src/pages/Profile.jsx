// src/pages/Profile.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Button from "../components/common/Button";
import { useTranslation } from "react-i18next";
import "../styles/components.css";

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    occupation: "",
    address: "",
    dob: "",
    gender: "",
    profilePic: null,
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        occupation: user.occupation || "",
        address: user.address || "",
        dob: user.dob || "",
        gender: user.gender || "",
        profilePic: null,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProfile(user.id, formData);
    alert(t("profilePage.successMessage"));
  };

  if (!user) return <div className="loading-message">{t("common.loading")}</div>;

  return (
    <div className="page-wrapper profile-page">
      <h2>{t("profilePage.title")}</h2>
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="profile-header">
          <img
            src={
              user.profilePic ||
              "https://dummyimage.com/100x100/e0e0e0/000&text=User"
            }
            alt="Profile"
            className="profile-pic"
          />
          <input
            type="file"
            name="profilePic"
            onChange={handleChange}
            accept="image/*"
          />
        </div>

        <div className="form-group">
          <label>{t("profilePage.name")}</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>{t("profilePage.email")}</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>{t("profilePage.occupation")}</label>
          <input
            type="text"
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>{t("profilePage.address")}</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="form-group">
          <label>{t("profilePage.dob")}</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>{t("profilePage.gender")}</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">{t("profilePage.selectGender")}</option>
            <option value="male">{t("profilePage.male")}</option>
            <option value="female">{t("profilePage.female")}</option>
            <option value="other">{t("profilePage.other")}</option>
          </select>
        </div>

        <Button type="submit">{t("profilePage.updateProfile")}</Button>
      </form>
    </div>
  );
}
