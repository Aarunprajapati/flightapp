/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';    
const axiosInstance = axios.create({
  // baseURL:  `https://flightappbackend-k5rb.vercel.app/api/user`,
  // baseURL:  `${process.env.LOCAL_BACKEND_BASE_URL}/api/user`,
  baseURL:  `http://localhost:5000/api/user`,

  timeout:200000,
  withCredentials: true,
});

// axiosInstance.interceptors.request.use(
//   function (config) {
//     config.baseURL = 'http://localhost:5000/api/user';

//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );

export default {
  get: axiosInstance.get,
  post: axiosInstance.post,
  put: axiosInstance.put,
  delete: axiosInstance.delete,
}