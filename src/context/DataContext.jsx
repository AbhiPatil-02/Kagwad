// src/context/DataContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAllCategories, getAllServices, submitService, updateServiceStatus } from '../services/api';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [cats, svcs] = await Promise.all([
          getAllCategories(),
          getAllServices()
        ]);
        setCategories(cats);
        setServices(svcs);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const addService = async (serviceData) => {
    const newService = await submitService(serviceData);
    setServices(prev => [...prev, newService]);
    return newService;
  };

  const updateServiceStatus = async (serviceId, status, comment) => {
    const updatedService = await updateServiceStatus(serviceId, status, comment);
    setServices(prev => prev.map(s => 
      s.id === serviceId ? { ...s, status, adminComment: comment } : s
    ));
    return updatedService;
  };

  return (
    <DataContext.Provider value={{ 
      categories, 
      services, 
      loading, 
      addService, 
      updateServiceStatus 
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);