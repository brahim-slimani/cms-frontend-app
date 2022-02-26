import httpService from "service/http-service";

class CompanyService {

    /**
     * Get company list of companies
     * @returns {Promise<AxiosResponse>} http response
     */
    getCompanies = () => {
        return httpService.call({ url: "/api/companies", method: "GET" });
    }

    /**
     * Add a new comapny
     * @param {Object} payload company to be created 
     * @returns {Promise<AxiosResponse>} http response
     */
    addCompany = (payload) => {
        return httpService.call({ url: "/api/company", method: "POST", data: payload });
    }

    /**
    * Edit an existing company
    * @param {Object} payload company to be updated 
    * @returns {Promise<AxiosResponse>} http response
    */
    editCompany = (payload) => {
        return httpService.call({ url: "/api/company", method: "PATCH", data: payload });
    }

    /**
     * Delete given company
     * @param {string} uuid company uuid to be deleted
     * @returns {Promise<AxiosResponse>} http response
     */
    deleteCompany = (uuid) => {
        return httpService.call({ url: "/api/company", method: "DELETE", params: { uuid: uuid } });
    }

}
export default new CompanyService();