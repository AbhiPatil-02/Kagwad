// src/components/layout/Navbar.jsx
import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";
import "../../styles/components.css";
import LanguageSwitcher from "../common/LanguageSwitcher";

export default function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar animate-fade-in-down">
      <div className="container flex justify-between items-center">
        {/* Logo */}
        <div className="navbar-brand-container flex items-center space-x-2">
          <Link to="/" className="logo-link flex items-center">
            <img
              src="../src/assets/kagwad_logo1.ico"
              alt="Logo"
              className="logo-image"
            />
            <span className="navbar-brand">Namma Kagwad</span>
          </Link>
        </div>

        {/* Navigation Links */}
        <ul className="navbar-nav flex space-x-4">
          {/* ✅ Language Switcher comes first */}
          <li>
            <LanguageSwitcher />
          </li>

          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? "active-link" : "")}>
              {t("common.home")}
            </NavLink>
          </li>
          <li>
            <NavLink to="/services" className={({ isActive }) => (isActive ? "active-link" : "")}>
              {t("common.services")}
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={({ isActive }) => (isActive ? "active-link" : "")}>
              {t("common.about")}
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={({ isActive }) => (isActive ? "active-link" : "")}>
              {t("common.contact")}
            </NavLink>
          </li>

          {isAuthenticated && (
            <>
              <li>
                <NavLink to="/profile">{t("common.profile")}</NavLink>
              </li>
              {user?.role === "admin" && (
                <li>
                  <NavLink to="/admin">{t("common.admin")}</NavLink>
                </li>
              )}
              <li>
                <button className="nav-btn hover-zoom" onClick={handleLogout}>
                  {t("common.logout")}
                </button>
              </li>
            </>
          )}

          {!isAuthenticated && (
            <li>
              <button className="nav-btn hover-zoom" onClick={() => navigate("/auth")}>
                {t("common.login")}
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
