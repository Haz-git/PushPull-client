import axios from 'axios';
import Userfront from '@userfront/react';

const axiosInstance = axios.create({
    // baseURL: 'http://localhost:8080/api',
    baseURL: 'https://rankmyworkout.herokuapp.com/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Userfront.accessToken()}`,
    },
});

//Check to see if need axios interceptors

export default axiosInstance;
