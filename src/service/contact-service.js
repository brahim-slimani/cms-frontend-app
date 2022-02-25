import httpService from "service/http-service";

class ContactService {

    /**
     * Get list of conatcts
     * @returns {Promise<AxiosResponse>} http response
     */
    getContacts = () => {
        return httpService.call({ url: "/api/contacts", method: "GET" });
    }

}
export default new ContactService();