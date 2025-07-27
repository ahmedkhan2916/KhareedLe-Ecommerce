export const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:1000': "sorry";
    // : process.env.REACT_APP_BACKEND_URL || 'https://khareedle-ecommerce.onrender.com';
