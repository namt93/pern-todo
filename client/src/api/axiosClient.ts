import axios, { AxiosResponse, AxiosError } from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
        'Content-Type': 'application/json',
    },
})

axiosClient.interceptors.response.use(
    (response: AxiosResponse) => response?.data ?? response,
    (error: AxiosError) => Promise.reject(error),
)

export default axiosClient;