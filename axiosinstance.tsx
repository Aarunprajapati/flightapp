/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
const axiosInstance = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
  // baseURL: "https://flightappbackend-k5rb.vercel.app/api/user",
  baseURL:"https://flightappbackend-1.onrender.com/api/user",
  // baseURL: process.env.local.NEXT_PUBLIC_LOCALBACKEND_URL,
  timeout: 200000,
  withCredentials: true,
});
export default {
  get: axiosInstance.get,
  post: axiosInstance.post,
  put: axiosInstance.put,
  delete: axiosInstance.delete,
};
