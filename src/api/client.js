import axios from 'axios';

const urlBase = 'http://localhost:5000/api/';

const getToken = () => {
  return localStorage['token'];
};

const setToken = (token) => {
  localStorage['token'] = token;
};

const client = {
  get: async (url) => await axios.get(urlBase + url),
  post: async (url, data) => await axios.post(urlBase + url, data),
  put: async (url, data) => await axios.put(urlBase + url, data),
  delete: async (url) => await axios.delete(urlBase + url),
};

axios.interceptors.request.use((config) => {
  const token = getToken();
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

export { client, getToken, setToken };
