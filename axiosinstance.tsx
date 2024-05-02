/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
const axiosInstance = axios.create({
  // baseURL:  process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
  baseURL: process.env.NEXT_PUBLIC_LOCALBACKEND_URL,

  timeout: 200000,
  withCredentials: true,
});
export default {
  get: axiosInstance.get,
  post: axiosInstance.post,
  put: axiosInstance.put,
  delete: axiosInstance.delete,
};
