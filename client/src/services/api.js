import axios from 'axios';

// Automatically points to /api in production (Render) and localhost:5000 in development
const API_BASE_URL = import.meta.env.PROD ? '/api' : 'http://localhost:5000/api';

export const fetchData = async () => {
  const response = await axios.get(`${API_BASE_URL}/data`);
  return response.data;
};

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
