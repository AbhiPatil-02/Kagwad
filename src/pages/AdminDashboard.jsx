// src/pages/AdminDashboard.jsx
import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import PendingService from '../components/admin/PendingService';
import '../styles/components.css';

export default function AdminDashboard() {
  const { services, updateServiceStatus } = useData();
  const [processingId, setProcessingId] = useState(null);

  const pendingServices = services.filter(s => s.status === 'pending');
  const approvedServices = services.filter(s => s.status === 'approved');
  const rejectedServices = services.filter(s => s.status === 'rejected');

  const handleApprove = async (serviceId) => {
    setProcessingId(serviceId);
    try {
      await updateServiceStatus(serviceId, 'approved', 'Service approved by admin');
    } catch (error) {
      console.error('Error approving service:', error);
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (serviceId) => {
    const comment = prompt('Please provide a reason for rejection:');
    if (comment !== null) {
      setProcessingId(serviceId);
      try {
        await updateServiceStatus(serviceId, 'rejected', comment);
      } catch (error) {
        console.error('Error rejecting service:', error);
      } finally {
        setProcessingId(null);
      }
    }
  };

  return (
    <div className="page-wrapper admin-dashboard">
      <h1>Admin Dashboard</h1>
      
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>{pendingServices.length}</h3>
          <p>Pending Review</p>
        </div>
        <div className="stat-card">
          <h3>{approvedServices.length}</h3>
          <p>Approved</p>
        </div>
        <div className="stat-card">
          <h3>{rejectedServices.length}</h3>
          <p>Rejected</p>
        </div>
      </div>

      <div className="pending-services-section">
        <h2>Pending Services ({pendingServices.length})</h2>
        
        {pendingServices.length === 0 ? (
          <p className="no-pending">No pending services for review.</p>
        ) : (
          <div className="pending-services-list">
            {pendingServices.map(service => (
              <PendingService
                key={service.id}
                service={service}
                onApprove={handleApprove}
                onReject={handleReject}
                isProcessing={processingId === service.id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}