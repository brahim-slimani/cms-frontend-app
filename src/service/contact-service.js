import httpService from "service/http-service";

class ContactService {

    /**
     * Get list of conatcts
     * @returns {Promise<AxiosResponse>} http response
     */
    getContacts = () => {
        return httpService.call({ url: "/api/contacts", method: "GET" });
    }

    /**
     * Add a new contact
     * @param {Object} payload contact to be created 
     * @returns {Promise<AxiosResponse>} http response
     */
    addContact = (payload) => {
        return httpService.call({ url: "/api/contact", method: "POST", data: payload });
    }

    /**
    * Edit an existing contact
    * @param {Object} payload contact to be updated 
    * @returns {Promise<AxiosResponse>} http response
    */
    editContact = (payload) => {
        return httpService.call({ url: "/api/contact", method: "PATCH", data: payload });
    }

}
export default new ContactService();