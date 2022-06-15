import axios from 'axios';

const axiosInstance = axios.create({
  //baseURL: 'http://localhost:8080',
  // baseURL: 'https://kasbaik-v1.herokuapp.com/',
  baseURL: 'https://cc-app-vsnl2vtvja-et.a.run.app',
});

export default axiosInstance;