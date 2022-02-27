import httpService from "service/http-service";

class UserService {

    /**
     * login service
     * @param {Object} credentials user credentials
     * @returns {Promise<AxiosResponse>} http response
     */
    login = (credentials) => {
        return httpService.call({ url: "/auth/login", method: "POST", data: credentials });
    }

    /**
     * Logout service
     * @returns {Promise<AxiosResponse>} http response
     */
    logout = () => {
        return httpService.call({ url: "/auth/logout", method: "POST" });
    }
}
export default new UserService();