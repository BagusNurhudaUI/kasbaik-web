import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://kasbaik-v1.herokuapp.com/',
  /* other custom settings */
});

export default axiosInstance;