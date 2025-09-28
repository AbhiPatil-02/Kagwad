// src/components/layout/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/components.css';

export default function Footer() {
  const { isAuthenticated } = useAuth();

  return (
    <footer className="footer animate-fade-in-up">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Namma Kagwad. All Rights Reserved.</p>
        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/services">Services</Link>
          {/* Only show Contact link if logged in */}
          {isAuthenticated && <Link to="/contact">Contact</Link>}
        </div>
        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover-zoom">FB</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover-zoom">TW</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover-zoom">IG</a>
        </div>
      </div>
    </footer>
  );
}