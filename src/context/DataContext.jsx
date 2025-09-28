// src/context/DataContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAllCategories, getAllServices } from '../services/api';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const cats = await getAllCategories();
      const svcs = await getAllServices();
      setCategories(cats);
      setServices(svcs);
      setLoading(false);
    };
    fetchData();
  }, []);

  const addService = (service) => setServices(prev => [...prev, service]);

  const updateServiceStatus = (serviceId, status, comment) => {
    setServices(prev => prev.map(s => s.id === serviceId ? { ...s, status, adminComment: comment } : s));
  };

  return (
    <DataContext.Provider value={{ categories, services, loading, addService, updateServiceStatus }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
