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
    email: 'admin@kagwad.com',
    address: 'Kagwad Admin Office',
    securityQuestion: "What is your favorite color?", // Note: This stores the EN question text
    securityAnswer: 'blue'
  },
  {
    id: 'user1',
    name: 'User One',
    mobile: '9988776655',
    password: 'password123',
    role: 'user',
    email: 'user1@example.com',
    address: '123 Main St, Kagwad',
    securityQuestion: "What was the name of your first pet?", // Note: This stores the EN question text
    securityAnswer: 'max'
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

const initialServices = [
  {
    id: 'srv1',
    name: 'Kagwad Govt Hospital',
    category: 'health',
    description: 'Provides general medical care and emergency services.',
    address: 'Near Bus Stand, Kagwad',
    phone: '9876543210',
    images: ['/images/hospital.jpg'],
    status: 'approved',
    submittedById: 'user1',
    rating: 4.5,
  },
  {
    id: 'srv2',
    name: 'Pending Service Example',
    category: 'home-services',
    description: 'A service awaiting admin review and approval.',
    address: 'Town Square, Kagwad',
    phone: '9123456789',
    images: ['/images/pending.jpg'],
    status: 'pending',
    submittedById: 'user1',
  },
  // ...add more services as needed...
];

const getFromLocalStorage = (key, initialValue) => {
  const data = localStorage.getItem(key);
  if (data) return JSON.parse(data);
  localStorage.setItem(key, JSON.stringify(initialValue));
  return initialValue;
};


// === Bilingual security questions data ===
export const securityQuestions = [
  {
    en: "What is your mother's maiden name?",
    kn: "ನಿಮ್ಮ ತಾಯಿಯ ಹುಡುಗಿಕೆಯ ಹೆಸರೇನು?"
  },
  {
    en: "What was the name of your first pet?",
    kn: "ನಿಮ್ಮ ಮೊದಲ ಸಾಕುಪ್ರಾಣಿಯ ಹೆಸರೇನು?"
  },
  {
    en: "What is your favorite color?",
    kn: "ನಿಮ್ಮ ನೆಚ್ಚಿನ ಬಣ್ಣ ಯಾವುದು?"
  },
  {
    en: "What city were you born in?",
    kn: "ನೀವು ಜನಿಸಿದ ನಗರ ಯಾವುದು?"
  },
  {
    en: "What is your favorite book?",
    kn: "ನಿಮ್ಮ ನೆಚ್ಚಿನ ಪುಸ್ತಕ ಯಾವುದು?"
  },
  {
    en: "What was your childhood nickname?",
    kn: "ನಿಮ್ಮ ಬಾಲ್ಯದ ಅಡ್ಡಹೆಸರೇನು?"
  },
  {
    en: "What is the name of your elementary school?",
    kn: "ನಿಮ್ಮ ಪ್ರಾಥಮಿಕ ಶಾಲೆಯ ಹೆಸರೇನು?"
  },
  {
    en: "What is your favorite food?",
    kn: "ನಿಮ್ಮ ನೆಚ್ಚಿನ ಆಹಾರ ಯಾವುದು?"
  },
  {
    en: "What is your father's middle name?",
    kn: "ನಿಮ್ಮ ತಂದೆಯ ಮಧ್ಯದ ಹೆಸರೇನು?"
  },
  {
    en: "What is your dream job?",
    kn: "ನಿಮ್ಮ ಕನಸಿನ ಉದ್ಯೋಗ ಯಾವುದು?"
  }
];

// Helper function to get security questions in current language
export const getSecurityQuestions = (language = 'en') => {
  // Map over the bilingual array and return the question text for the requested language.
  // Fallback to 'en' if the requested language key doesn't exist for a question.
  return securityQuestions.map(q => q[language] || q.en);
};


// --- AUTH API ---
export const loginUser = async ({ mobile, password }) => {
  const users = getFromLocalStorage(usersKey, initialUsers);
  const user = users.find(u => u.mobile === mobile && u.password === password);
  if (user) {
    // Destructure to remove password and securityAnswer for security, and securityQuestion (as it's not needed in context)
    const { password, securityAnswer, securityQuestion, ...userWithoutSecrets } = user;
    return { success: true, user: { ...userWithoutSecrets, token: 'mock-token' } };
  }
  return { success: false, message: 'Invalid credentials.' };
};

export const adminLogin = async ({ mobile, password }) => {
  const users = getFromLocalStorage(usersKey, initialUsers);
  const user = users.find(u => u.mobile === mobile && u.password === password && u.role === 'admin');
  if (user) {
    const { password, securityAnswer, securityQuestion, ...userWithoutSecrets } = user;
    return { success: true, user: { ...userWithoutSecrets, token: 'mock-admin-token' } };
  }
  return { success: false, message: 'Invalid admin credentials.' };
};

export const registerUser = async (userData) => {
  const users = getFromLocalStorage(usersKey, initialUsers);
  if (users.some(u => u.mobile === userData.mobile)) {
    return { success: false, message: 'User with this mobile number already exists.' };
  }
  const newUser = { 
    id: Date.now().toString(), 
    ...userData, 
    role: 'user',
    email: userData.email || '',
    address: userData.address || '',
  };
  users.push(newUser);
  localStorage.setItem(usersKey, JSON.stringify(users));
  const { password, securityAnswer, securityQuestion, ...userWithoutSecrets } = newUser;
  return { success: true, user: { ...userWithoutSecrets, token: 'mock-token' } };
};

export const updateUserProfile = async (userId, userData) => {
  const users = getFromLocalStorage(usersKey, initialUsers);
  const updatedUsers = users.map(u => 
    u.id === userId ? { ...u, ...userData } : u
  );
  localStorage.setItem(usersKey, JSON.stringify(updatedUsers));
  const updatedUser = updatedUsers.find(u => u.id === userId);
  return { success: true, user: updatedUser };
};

// --- Password Reset API ---
export const getUserSecurityQuestion = async (mobile) => {
  const users = getFromLocalStorage(usersKey, initialUsers);
  const user = users.find(u => u.mobile === mobile);

  if (!user) {
    return { success: false, message: 'User not found with this mobile number.' };
  }

  return { 
    success: true, 
    // The security question is returned as the stored English string. The frontend handles translation.
    securityQuestion: user.securityQuestion 
  };
};

export const verifySecurityAnswer = async (mobile, securityAnswer) => {
  const users = getFromLocalStorage(usersKey, initialUsers);
  const user = users.find(u => u.mobile === mobile);

  if (!user) {
    return { success: false, message: 'User not found with this mobile number.' };
  }

  if (user.securityAnswer.toLowerCase().trim() === securityAnswer.toLowerCase().trim()) {
    // Return the essential info needed for the next step (resetPassword)
    return { 
      success: true, 
      user: { 
        mobile: user.mobile, 
        securityQuestion: user.securityQuestion // Stored English version
      } 
    };
  } else {
    return { success: false, message: 'Incorrect security answer.' };
  }
};

export const resetPassword = async (mobile, newPassword) => {
  const users = getFromLocalStorage(usersKey, initialUsers);
  const userIndex = users.findIndex(u => u.mobile === mobile);

  if (userIndex === -1) {
    return { success: false, message: 'User not found.' };
  }

  users[userIndex].password = newPassword;
  localStorage.setItem(usersKey, JSON.stringify(users));
  return { success: true, message: 'Password reset successfully.' };
};

// --- DATA API ---
export const getAllServices = async () => {
  return getFromLocalStorage(servicesKey, initialServices);
};

export const getAllCategories = async () => {
  return getFromLocalStorage(categoriesKey, initialCategories);
};

export const getServicesByCategory = async (categorySlug) => {
  const services = await getAllServices();
  return services.filter(s => s.category === categorySlug && s.status === 'approved');
};

export const getServiceById = async (serviceId) => {
  const services = await getAllServices();
  return services.find(s => s.id === serviceId);
};

export const submitService = async (serviceData) => {
  const services = getFromLocalStorage(servicesKey, initialServices);
  const newService = {
    ...serviceData,
    id: Date.now().toString(),
    status: 'pending',
    images: serviceData.images || ['/images/service_placeholder.jpg'],
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
  const newSubmission = { 
    id: Date.now().toString(), 
    ...formData, 
    timestamp: new Date().toISOString() 
  };
  contactForms.push(newSubmission);
  localStorage.setItem(contactFormsKey, JSON.stringify(contactForms));
  return { success: true, submission: newSubmission };
};