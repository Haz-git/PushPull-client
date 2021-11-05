import axios from 'axios';
import Userfront from '@userfront/react';

//Or LIVE key:
const API_KEY = process.env.USERFRONT_TEST_API_KEY;
console.log(API_KEY);

const axiosInstance = axios.create({
    // baseURL: 'http://localhost:8080/api',
    baseURL: 'https://api.userfront.com',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${API_KEY}`,
    },
});

//Check to see if need axios interceptors

export default axiosInstance;
