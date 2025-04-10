import axios from 'axios';

const API_URL = 'https://562z81q7bj.execute-api.us-east-1.amazonaws.com/pord/';

export const uploadResume = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return axios.post(`${API_URL}/upload`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const fetchCandidates = () => {
  return axios.get(`${API_URL}/candidates`);
};

export const fetchNotifications = () => {
  return axios.get(`${API_URL}/notifications`);
};