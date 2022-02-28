import { HttpService } from "service/http-service";
import axios from "axios";

const customAxiosInstance = axios.create();
customAxiosInstance.interceptors.request.use(
    async (config) => {
        config.baseURL = process.env.REACT_APP_API_URL;
        config.timeout = 60000;
        return config;
    },
    error => Promise.reject(error)
);

class UserService {

    httpService = new HttpService(customAxiosInstance);
    /**
     * Login service
     * @param {Object} credentials: user credentials
     * @returns {Promise<AxiosResponse>} http response
     */
    login = (credentials) => {
        return this.httpService.call({ url: "/auth/login", method: "POST", data: credentials });
    }

   
    /**
     * Logout service
     * @param {string} token: bearer token to be invalidated
     * @returns {Promise<AxiosResponse>} http response
     */
    logout = (token) => {
        return this.httpService.call({ url: "/auth/logout", method: "POST", params: { "Authorization": token } });
    }
}
export default new UserService();