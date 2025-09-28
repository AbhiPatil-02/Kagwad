// src/pages/About.jsx
import React from "react";
import { useTranslation } from "react-i18next";
import "../styles/components.css";

export default function About() {
  const { t } = useTranslation();

  return (
    <div className="page-wrapper about-page-wrapper">
      {/* Hero Section */}
      <div className="hero-carousel-container">
        <div
          className="hero-carousel-slide active"
          style={{ backgroundImage: "url(/images/home_hero2.jpg)" }}
        >
          <h2>{t("aboutPage.title")}</h2>
        </div>
      </div>

      {/* Content */}
      <div className="about-content-section">
        {/* History Section */}
        <div className="village-history-section">
          <h2>{t("aboutPage.historyTitle")}</h2>
          <p>{t("aboutPage.paragraph1")}</p>
          <p>{t("aboutPage.paragraph2")}</p>
          <p>{t("aboutPage.paragraph3")}</p>
          <p>{t("aboutPage.paragraph4")}</p>
          <p>{t("aboutPage.historyParagraph1")}</p>
          <p>{t("aboutPage.historyParagraph2")}</p>
        </div>

        {/* Culture Section */}
        <div className="village-culture-section">
          <h2>{t("aboutPage.cultureTitle")}</h2>
          <p>{t("aboutPage.cultureParagraph1")}</p>
        </div>
      </div>
    </div>
  );
}
