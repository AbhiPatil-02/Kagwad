import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import '../styles/components.css';

export default function PageNotFound() {
  const navigate = useNavigate();
  
  return (
    <div className="page-wrapper" style={{ textAlign: 'center' }}>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Button onClick={() => navigate('/')}>Go to Home</Button>
    </div>
  );
}