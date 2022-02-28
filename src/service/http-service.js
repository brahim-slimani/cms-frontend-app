import axios from 'axios';
import Utils from "utils";
import jwtWorker from 'utils/jwt-worker';

/**
 * Intercept all http requests that will be made using the default instance
 */
const defaultAxiosInstance = axios.create();
defaultAxiosInstance.interceptors.request.use(
    async (config) => {
        config.baseURL = process.env.REACT_APP_API_URL;
        config.timeout = 60000;
        config.headers.Authorization = jwtWorker.getTokenFromStorage();
        return config;
    },
    error => Promise.reject(error)
);
/**
 * Intercept all http responses to check the http status, 
 * if the code is 401 remove the token from web storage and redirect user to the login page
 */
defaultAxiosInstance.interceptors.response.use((response) => {
    return response;
}, error => {
    if (error.response.status === 401) {
        Promise.resolve(jwtWorker.removeTokenFromStorage()).finally(() => {
            Utils.redirectToLoginRoute();
        });
    }
    return Promise.reject(error);
})

export class HttpService {

    axiosInstance;
    constructor(instance) { this.axiosInstance = instance ? instance : defaultAxiosInstance; }

    /**
     * Custom http call
     * @param {object} object: destruction of the passed object yield the below properties
     * @property {string} url: suffix of the url e.g. /api/companies 
     * @property {string} method: method of the request, e.g. get, post, put, delete
     * @property {Object} data: payload of the request
     * @property {string} params: parameters of the request
     * @return {Promise<AxiosResponse>} http response
     */
    call = ({ url, method, data, params }) => new Promise((resolve, reject) => {
        this.axiosInstance.request({ url, method, data, params }).then(response => {
            response.data.code === 0 ? resolve(response.data) : reject(response.data.message);
        }, error => {
            reject(Utils.handleErrorResponse(error));
        });
    });

}

export default new HttpService();