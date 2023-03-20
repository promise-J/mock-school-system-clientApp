import axios from 'axios'
const userId = localStorage.getItem('userId')

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {userid: userId},
    withCredentials: true
  });
  
export default axiosInstance