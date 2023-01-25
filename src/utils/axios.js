import axios from 'axios'
const userId = localStorage.getItem('userId')

const axiosInstance = axios.create({
    baseURL: 'https://mock-school-backend.onrender.com',
    headers: {userid: userId},
    withCredentials: true
  });
  
export default axiosInstance