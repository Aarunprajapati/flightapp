import axios from 'axios';    
const axiosInstance = axios.create({
  baseURL: `${process.env.BACKEND_BASE_URL}/api/user`,
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