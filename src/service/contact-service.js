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
     * @param {Object} payload: contact to be created 
     * @returns {Promise<AxiosResponse>} http response
     */
    addContact = (payload) => {
        return httpService.call({ url: "/api/contact", method: "POST", data: payload });
    }

    /**
    * Edit an existing contact
    * @param {Object} payload: contact to be updated 
    * @returns {Promise<AxiosResponse>} http response
    */
    editContact = (payload) => {
        return httpService.call({ url: "/api/contact", method: "PATCH", data: payload });
    }

    /**
     * Delete given contact
     * @param {string} uuid: contact uuid to be deleted
     * @returns {Promise<AxiosResponse>} http response
     */
    deleteContact = (uuid) => {
        return httpService.call({ url: "/api/contact", method: "DELETE", params: { uuid: uuid } });
    }

    /**
     * Assign contact into specific company
     * @param {string} contact: uuid of contact to be assigned
     * @param {string} company: uuid of company
     * @returns {Promise<AxiosResponse>} http response
     */
    assignContact2company = (contact, company) => {
        return httpService.call({ url: "/api/assign-contact2company", method: "PATCH", params: { 'contact-uuid': contact, 'company-uuid': company } });
    }

}
export default new ContactService();