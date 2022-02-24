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
}
export default new UserService();