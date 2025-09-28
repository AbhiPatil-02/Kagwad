import initialCategories from '../data/categories.js';
import initialServices from '../data/services.json';

export default function useData() {
  const categories = initialCategories;
  const services = initialServices.services;

  return {
    categories,
    services,
  };
}