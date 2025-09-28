import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/kagwad_logo1.ico'; // Ensure this path is correct

export default function Logo() {
  return (
    <div className="logo-container">
      <Link to="/" className="logo-link">
        <img src={logo} alt="Namma Kagwad Portal Logo" className="logo-image" />
      </Link>
    </div>
  );
}