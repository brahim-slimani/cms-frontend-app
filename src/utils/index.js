import { Loader } from "components/shared";

class Utils {

    /**
     * this method is used to handle the error response within http request
     * @param {Axios<Error>} error Axios error response
     * @return {string} error message
     */
    handleErrorResponse = (error) => {
        return error.response ? (
            error.response?.data.message ? `${error.response.data.message}` : error.message) :
            error.message;
    }

    /**
    * custom template with loading state for submit actions
    * @param {*} template element to be rendered
    * @param {boolean} loading state of progress
    * @param {*} message loading message
    * @returns Loader in progress with custom message | template eleemnt
    */
    labelTemplate = (template, loading, message) => {
        return loading ? <Loader size={20} label={message} /> : template;
    }

}
export default new Utils();