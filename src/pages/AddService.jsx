// src/pages/AddService.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import Button from '../components/common/Button';
import '../styles/components.css';

export default function AddService() {
  const { user } = useAuth();
  const { categories, addService } = useData();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    categoryId: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addService({ ...formData, userId: user.id, status: 'pending' });
    alert('Service submitted successfully! Pending approval.');
    setFormData({ name: '', description: '', categoryId: '', image: null });
  };

  return (
    <div className="page-wrapper">
      <h2>Add New Service</h2>
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-group">
          <label>Service Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Category</label>
          <select name="categoryId" value={formData.categoryId} onChange={handleChange} required>
            <option value="">Select Category</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Image</label>
          <input type="file" name="image" onChange={handleChange} accept="image/*" />
        </div>

        <Button type="submit">Submit Service</Button>
      </form>
    </div>
  );
}
