import { Loader } from "components/shared";
import { Buffer } from "buffer";

class Utils {

    webStorage = localStorage;
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
    * @param {any} template element to be rendered
    * @param {boolean} loading state of progress
    * @param {string} message loading message
    * @returns Loader in progress with custom message | template eleemnt
    */
    labelTemplate = (template, loading, message) => {
        return loading ? <Loader size={20} label={message} /> : template;
    }

    /**
     * persist an item in web storage
     * @param {string} key item key
     * @param {any} value item value 
     */
    setItemToStorage = (key, value) => {
        this.webStorage.setItem(key, JSON.stringify(value));
    }

    /**
     * delete an item from web storage
     * @param {string} key item key to be deleted
     */
    deleteItemFromStorage = (key) => {
        this.webStorage.removeItem(key);
    }

    /**
     * get an item value from web storage
     * @param {string} key item key to be retrieved
     * @returns item value
     */
    getItemFromLocalStorage = (key) => {
        return JSON.parse(this.webStorage.getItem(key));
    }

    /**
     * decode given base64 string
     * @param {string} str wrap to be decoded
     * @returns {string} decoded result
     */
    bas64_decode(str) {
        return Buffer.from(str, "base64");
    }

    labelIcon = (icon, label) => {
        return <><i className={icon} />&nbsp;{label}</>
    }

    CUSTOM_MESSAGES = {
        REQUIRED_FIELD: "This field is required!",
        OPERATION_SUCCESS: "Operation done successfully"
    }

    CONTACT_TYPES = {
        Freelancer: "FREELANCER",
        Employee: "EMPLOYEE"
    }
}
export default new Utils();