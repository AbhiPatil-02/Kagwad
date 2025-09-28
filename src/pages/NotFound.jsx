// src/pages/NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../styles/components.css";

export default function NotFound() {
  return (
    <div className="page-wrapper not-found-page">
      <div className="not-found-content">
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <Link to="/" className="button button-primary">
          Go back to Home
        </Link>
      </div>
    </div>
  );
}