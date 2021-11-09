import axios from 'axios';
import Userfront from '@userfront/react';

let targetURL;

if (process.env.NODE_ENV !== 'production') {
    targetURL = 'http://localhost:8080/api';
} else if (process.env.NODE_ENV === 'production') {
    targetURL = 'https://rankmyworkout.herokuapp.com/api';
}

const axiosInstance = axios.create({
    baseURL: targetURL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Userfront.accessToken()}`,
    },
});

//Check to see if need axios interceptors

export default axiosInstance;
