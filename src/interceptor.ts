import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://cerulean-marlin-wig.cyclic.app'
});

axiosInstance.interceptors.response.use(res => res, console.error);

export default axiosInstance;
