// src/pages/AdminDashboard.jsx
import React from 'react';
import { useData } from '../context/DataContext';
import Button from '../components/common/Button';
import '../styles/components.css';

export default function AdminDashboard() {
  const { services, updateServiceStatus } = useData();

  const pendingServices = services.filter(s => s.status === 'pending');

  if (!pendingServices.length) return <div className="page-wrapper"><h2>No pending services.</h2></div>;

  return (
    <div className="page-wrapper">
      <h2>Admin Dashboard</h2>
      {pendingServices.map(service => (
        <div key={service.id} className="submitted-service-card">
          <h4>{service.name}</h4>
          <p>{service.description}</p>
          <div className="service-actions">
            <Button onClick={() => updateServiceStatus(service.id, 'approved')} variant="primary">Approve</Button>
            <Button onClick={() => updateServiceStatus(service.id, 'rejected')} variant="secondary">Reject</Button>
          </div>
        </div>
      ))}
    </div>
  );
}
