import { Loader } from "components/shared";
import { Buffer } from "buffer";
import jwtWorker from "utils/jwt-worker";
import mobileViewPort from "assets/svg/mobile-viewport.svg";
import { ROUTES_PATH } from "components/navigation/routes";

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
    webStorage = localStorage;
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

    /**
     * capitalize first letter of given string
     * @param {string} str string to be capitalized
     * @returns capitalized string
     */
    capitalizeStr = (str) => {
        return `${str.charAt(0).toLocaleUpperCase()}${str.slice(1).toLocaleLowerCase()}`
    }

    NoItemsTemplate = (label) => {
        return (
            <div className="text-center m-3">
                <i className="bi bi-exclamation-circle" style={{ fontSize: "30px" }} /><br />
                <span>{label ? label : "No items yet"}</span>
            </div>
        )
    }

    NoMobileViewPortTemplate = () => {
        return <div className="mobile-viewport-content m-5 text-center">
            <img src={mobileViewPort} className="img-fluid mx-auto" alt="img" />
            <h6 className="mt-5">
                <i className="bi bi-exclamation-circle" style={{ fontSize: "35px" }} /> <br />
                Sorry, the viewport mobile version is not currently available
            </h6>
        </div>
    }

    BreadCrumbsTemplate = () => {
        return (<div class="w-100 text-end pt-2">
            <span className='me-4 '>
                {`${this.capitalizeStr(jwtWorker.getRolesFromToken()[0])} > ${this.capitalizeStr(window.location.pathname.split("/")[1])}`}
            </span>
        </div>)
    }

    redirectToLoginRoute = () => {
        window.history.pushState({}, {}, `${process.env.PUBLIC_URL}${ROUTES_PATH.LOGIN}`);
        window.location.reload();
    }

    CUSTOM_MESSAGES = {
        REQUIRED_FIELD: "This field is required!",
        OPERATION_SUCCESS: "Operation done successfully",
        NO_CHANGES_ISSUED: "No changes has been issued!",
        DELETE_CONTACT_CONRIMATION: "Are you sure you want to delete this contact ?",
        DELETE_COMPANY_CONRIMATION: "Are you sure you want to delete this company ?",
        ALREADY_ASSIGNED: "This contact is already assigned to the selected company",
        NO_ITEM_SELECTED: "No item has been selected!",
        LOGOUT_CONFIRMATION: "Are you sure you want to log out ?"
    }

    CONTACT_LIST_COLUMNS = [
        { label: "FIRST NAME", name: "firstName" },
        { label: "LAST NAME", name: "lastName" },
        { label: "CONTACT TYPE", name: "contactType" },
        { label: "CREATION DATE", name: "createdAt" },
        { label: "LAST UPDATE", name: "updatedAt" },
        { label: "ACTIONS", name: "actions" }
    ]

    COMPANY_LIST_COLUMNS = [
        { label: "COMPANY TVA NUMBER", name: "tvaNumber" },
        { label: "ADDRESS", name: "address" },
        { label: "CREATION DATE", name: "createdAt" },
        { label: "LAST UPDATE", name: "updatedAt" },
        { label: "ACTIONS", name: "actions" }
    ]

    CONTACT_TYPES = {
        Freelancer: "FREELANCER",
        Employee: "EMPLOYEE"
    }

    ROLES = {
        Admin: "ADMIN",
        User: "USER"
    }
}
export default new Utils();