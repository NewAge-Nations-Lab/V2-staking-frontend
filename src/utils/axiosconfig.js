// src/utils/axiosConfig.js

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://quiet-ravine-44147-35b8bde85fde.herokuapp.com/',
});

export default axiosInstance;
