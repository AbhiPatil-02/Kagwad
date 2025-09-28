import React from 'react';
import Button from '../common/Button';
import '../../styles/components.css';

export default function PendingService({ service, onApprove, onReject }) {
  return (
    <div className="pending-service-card">
      <h3>{service.name}</h3>
      <p>Category: {service.category}</p>
      <div className="card-actions">
        <Button onClick={() => onApprove(service.id)}>Approve</Button>
        <Button onClick={() => onReject(service.id)} variant="danger">Reject</Button>
      </div>
    </div>
  );
}