import axios from 'axios';

const axiosInstance = axios.create({
    // baseURL: 'http://localhost:8080/api',
    baseURL: 'https://rankmyworkout.herokuapp.com/api',
    withCredentials: true,
});

export default axiosInstance;
