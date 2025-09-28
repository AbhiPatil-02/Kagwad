// src/services/api.js

const usersKey = 'mock-users';
const servicesKey = 'mock-services';
const categoriesKey = 'mock-categories';
const contactFormsKey = 'mock-contact-forms';

// === Mock Data ===
const initialUsers = [
  {
    id: 'admin1',
    name: 'Admin',
    mobile: '9876543210',
    password: 'password123',
    role: 'admin',
  },
  {
    id: 'user1',
    name: 'User One',
    mobile: '9988776655',
    password: 'password123',
    role: 'user',
  },
];

const initialServices = [
  {
    id: 'srv1',
    name: 'Kagwad Govt Hospital',
    category: 'health',
    description: 'Provides general medical care and emergency services.',
    address: 'Near Bus Stand',
    phone: '9876543210',
    images: ['/images/hospital.jpg'],
    status: 'approved',
    submittedById: 'user1',
  },
  {
    id: 'srv2',
    name: 'Pending Service',
    category: 'home-services',
    description: 'A service awaiting review.',
    address: 'Town Square',
    phone: '9123456789',
    images: ['/images/pending.jpg'],
    status: 'pending',
    submittedById: 'user1',
  },
  {
    id: 'srv3',
    name: 'Shree Durga Medical Store',
    category: 'health',
    description: 'Pharmacy with 24/7 service and home delivery.',
    address: 'Main Market Road',
    phone: '9012345678',
    images: ['/images/hospital.jpg'],
    status: 'approved',
    submittedById: 'user2',
  },
  {
    id: 'srv4',
    name: 'Government Primary School',
    category: 'school-colleges',
    description: 'State-run primary school with classes 1-7.',
    address: 'School Road',
    phone: '08253-234567',
    images: ['/images/school.png'],
    status: 'approved',
    submittedById: 'user3',
  },
  {
    id: 'srv5',
    name: 'Sri Sai Electrical Works',
    category: 'home-services',
    description: 'Electrician services for wiring, fans, lights & appliances.',
    address: 'Opposite Police Station',
    phone: '9988776655',
    images: ['/images/electrical.jpg'],
    status: 'approved',
    submittedById: 'user4',
  },
  {
    id: 'srv6',
    name: 'Cafe Delight',
    category: 'cafe-restr',
    description: 'Popular hangout spot for coffee, snacks, and desserts.',
    address: 'Bus Stand Circle',
    phone: '9876123450',
    images: ['/images/cafe.png'],
    status: 'approved',
    submittedById: 'user5',
  },
  {
    id: 'srv7',
    name: 'Om Travels',
    category: 'travel-transport',
    description: 'Bus booking, cab service, and tour packages.',
    address: 'Market Road',
    phone: '8899001122',
    images: ['/images/transport.png'],
    status: 'pending',
    submittedById: 'user6',
  },
  {
    id: 'srv8',
    name: 'Village Panchayat Office',
    category: 'govt-offices',
    description: 'Handles local governance and citizen services.',
    address: 'Gram Panchayat Road',
    phone: '08253-123456',
    images: ['/images/govt.png'],
    status: 'approved',
    submittedById: 'user10',
  },
  {
    id: 'srv9',
    name: 'Sri Hanuman Temple',
    category: 'temple',
    description: 'Famous temple with daily pooja and annual festival.',
    address: 'Temple Street',
    phone: '9998887770',
    images: ['/images/temple.png'],
    status: 'approved',
    submittedById: 'user11',
  },
  {
    id: 'srv10',
    name: 'City General Stores',
    category: 'stores',
    description: 'General store with groceries, stationery, and snacks.',
    address: 'Market Square',
    phone: '9765432109',
    images: ['/images/store.png'],
    status: 'approved',
    submittedById: 'user12',
  },
  {
    id: 'srv11',
    name: 'Ravi Water Supply',
    category: 'home-services',
    description: 'Tank water supply available for homes and events.',
    address: 'Near Temple',
    phone: '9700123456',
    images: ['/images/water-supply.jpg'],
    status: 'approved',
    submittedById: 'user8',
  },
  {
    id: 'srv12',
    name: 'Shree Basaveshwar Library',
    category: 'school-colleges',
    description: 'Public library with free book lending and reading hall.',
    address: 'Library Road',
    phone: '08253-456789',
    images: ['/images/library.jpg'],
    status: 'approved',
    submittedById: 'user9',
  },
  {
    id: 'srv13',
    name: 'Youth Club Political Wing',
    category: 'politics',
    description: 'Organizes village development meetings and campaigns.',
    address: 'Community Hall',
    phone: '9898989898',
    images: ['/images/politics.png'],
    status: 'approved',
    submittedById: 'user13',
  },
  {
    id: 'srv14',
    name: 'Salon & Beauty Care',
    category: 'barber-parlor',
    description: 'Haircuts, facials, and grooming services.',
    address: 'Main Road',
    phone: '8888777766',
    images: ['/images/barber.png'],
    status: 'approved',
    submittedById: 'user14',
  },
  {
    id: 'srv15',
    name: 'Instagram Foodies Page',
    category: 'instagram-pages',
    description: 'Local Instagram page sharing food reviews and offers.',
    address: 'Online Only',
    phone: '',
    images: ['/images/instagram.png'],
    status: 'approved',
    submittedById: 'user15',
  },
  {
    id: 'srv16',
    name: 'Sound & Light Decorators',
    category: 'sound-decor',
    description: 'DJ, lighting, and event decoration services.',
    address: 'Event Road',
    phone: '9090909090',
    images: ['/images/sound.png'],
    status: 'approved',
    submittedById: 'user16',
  },
  {
    id: 'srv17',
    name: 'Star Studio',
    category: 'photography',
    description: 'Photography & videography for weddings and events.',
    address: 'Market Lane',
    phone: '9877001234',
    images: ['/images/camera.png'],
    status: 'approved',
    submittedById: 'user17',
  },
  {
    id: 'srv18',
    name: 'Greenfield Agro Center',
    category: 'agriculture',
    description: 'Fertilizers, seeds, and farming equipment available.',
    address: 'Agri Market Yard',
    phone: '9753102468',
    images: ['/images/agriculture.png'],
    status: 'approved',
    submittedById: 'user18',
  },
];



const initialCategories = [
  { id: 'cat1', title: 'Home Services', slug: 'home-services', image: '/images/home.png' },
  { id: 'cat2', title: 'Health', slug: 'health', image: '/images/health.png' },
  { id: 'cat3', title: 'School / College', slug: 'school-colleges', image: '/images/school.png' },
  { id: 'cat4', title: 'Government Office', slug: 'govt-offices', image: '/images/govt.png' },
  { id: 'cat5', title: 'Cafe / Restaurant', slug: 'cafe-restr', image: '/images/cafe.png' },
  { id: 'cat6', title: 'Hotel / Lodge', slug: 'hotel-lodge', image: '/images/hotel.png' },
  { id: 'cat7', title: 'Transport', slug: 'travel-transport', image: '/images/transport.png' },
  { id: 'cat8', title: 'Temple', slug: 'temple', image: '/images/temple.png' },
  { id: 'cat9', title: 'Stores', slug: 'stores', image: '/images/store.png' },
  { id: 'cat10', title: 'Politics', slug: 'politics', image: '/images/politics.png' },
  { id: 'cat11', title: 'Barber / Parlor', slug: 'barber-parlor', image: '/images/barber.png' },
  { id: 'cat12', title: 'Instagram Pages', slug: 'instagram-pages', image: '/images/instagram.png' },
  { id: 'cat13', title: 'Sound & Decorators', slug: 'sound-decor', image: '/images/sound.png' },
  { id: 'cat14', title: 'Photography', slug: 'photography', image: '/images/camera.png' },
  { id: 'cat15', title: 'Agriculture', slug: 'agriculture', image: '/images/agriculture.png' },
];

const getFromLocalStorage = (key, initialValue) => {
  // const data = localStorage.getItem(key);
  // if (data) return JSON.parse(data);
  localStorage.setItem(key, JSON.stringify(initialValue));
  return initialValue;
};

// --- AUTH API ---
export const loginUser = async ({ mobile, password }) => {
  const users = getFromLocalStorage(usersKey, initialUsers);
  const user = users.find(u => u.mobile === mobile && u.password === password);
  if (user) {
    return { success: true, user: { ...user, token: 'mock-token' } };
  }
  return { success: false, message: 'Invalid credentials.' };
};

export const adminLogin = async ({ email, password }) => {
  const users = getFromLocalStorage(usersKey, initialUsers);
  const user = users.find(u => u.email === email && u.password === password && u.role === 'admin');
  if (user) {
    return { success: true, user: { ...user, token: 'mock-admin-token' } };
  }
  return { success: false, message: 'Invalid admin credentials.' };
};

export const registerUser = async (userData) => {
  const users = getFromLocalStorage(usersKey, initialUsers);
  if (users.some(u => u.mobile === userData.mobile)) {
    return { success: false, message: 'User with this mobile number already exists.' };
  }
  const newUser = { id: Date.now().toString(), ...userData, role: 'user' };
  users.push(newUser);
  localStorage.setItem(usersKey, JSON.stringify(users));
  return { success: true, user: { ...newUser, token: 'mock-token' } };
};

// --- DATA API ---
export const getAllServices = async () => {
  return getFromLocalStorage(servicesKey, initialServices);
};

export const getAllCategories = async () => {
  return getFromLocalStorage(categoriesKey, initialCategories);
};

export const submitService = async (serviceData) => {
  const services = getFromLocalStorage(servicesKey, initialServices);
  const newService = {
    ...serviceData,
    id: Date.now().toString(),
    status: 'pending',
  };
  services.push(newService);
  localStorage.setItem(servicesKey, JSON.stringify(services));
  return newService;
};

export const updateServiceStatus = async (serviceId, status, comment) => {
  const services = getFromLocalStorage(servicesKey, initialServices);
  const updatedServices = services.map(s =>
    s.id === serviceId ? { ...s, status, adminComment: comment } : s
  );
  localStorage.setItem(servicesKey, JSON.stringify(updatedServices));
  return updatedServices.find(s => s.id === serviceId);
};

export const submitContactForm = async (formData) => {
  const contactForms = getFromLocalStorage(contactFormsKey, []);
  const newSubmission = { id: Date.now().toString(), ...formData, timestamp: new Date().toISOString() };
  contactForms.push(newSubmission);
  localStorage.setItem(contactFormsKey, JSON.stringify(contactForms));
  return { success: true, submission: newSubmission };
};
