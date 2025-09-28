// src/components/common/LanguageSwitcher.jsx
import React from "react";
import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const handleChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <select
      onChange={handleChange}
      value={i18n.language}
      className="px-2 py-1 rounded border border-gray-300 text-sm"
    >
      <option value="en">English</option>
      <option value="kn">ಕನ್ನಡ</option>
    </select>
  );
}
