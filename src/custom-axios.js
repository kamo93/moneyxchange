import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    common: {
      'Content-Type': 'application/json'
    }
  }
});

axiosInstance.interceptors.request.use(
  request => {
    request.params = {
      ...request.params,
      access_key: process.env.REACT_APP_ACCESS_KEY
    };
    return request;
  },
  error => Promise.reject(error)
);

export default axiosInstance;
