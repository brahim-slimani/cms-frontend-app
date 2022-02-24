import axios from 'axios';

const defaultAxiosInstance = axios.create();
defaultAxiosInstance.interceptors.request.use(
    async (config) => {
        config.baseURL = process.env.REACT_APP_API_URL;
        config.timeout = 60000;
        return config;
    },
    error => Promise.reject(error)
);

export class HttpService {

    axiosInstance;
    constructor(instance) { this.axiosInstance = instance ? instance : defaultAxiosInstance; }

    /**
     * Custom http call
     * @param {*} object destruction of the passed object yield the below properties
     * @property {string} url suffix of the url e.g. /api/companies 
     * @property {string} method method of the request, e.g. get, post, put, delete
     * @property {Object} data: payload of the request
     * @property {string} params: parameters of the request
     * @return {Promise<AxiosResponse>}  return the response of the request
     */
    call = ({ url, method, data, params }) => new Promise((resolve, reject) => {
        this.axiosInstance.request({ url, method, data, params }).then(response => {
            response.data.code === 0 ? resolve(response.data) : reject(response.data.message);
        }, error => {
            reject(error.message);
        })
    });

}

export default new HttpService();