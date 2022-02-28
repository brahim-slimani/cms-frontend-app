import utils from "utils";

class JwtWorker {

    TOKEN_KEY = "CMS_AUTHORIZATION";
    APP_AUDIANCE = "poliscrypts_cms_api";

    /**
     * Retrieve token from web storage
     * @returns bearer token
     */
    getTokenFromStorage = () => {
        return utils.getItemFromLocalStorage(this.TOKEN_KEY);
    }

    /**
     * Decode the encoded token from base64 into clear mode
     * @returns claims data injected in bearer token
     */
    decodeJWT = () => {
        try {
            const authorization = this.getTokenFromStorage();
            const token = authorization.replace("Bearer ", "").split(".");
            const claims = JSON.parse(utils.bas64_decode(token[1]));
            return claims;
        } catch (e) {
            throw new Error(`Invalid Bearer token`);
        }
    }

    /**
     * Retrieve the user roles from token
     * @returns array of user authorities 
     */
    getRolesFromToken = () => {
        return this.decodeJWT()?.authorities.map(item => item.authority);
    }

    /**
     * Retrieve the username from token claims
     * @returns username
     */
    getSubFromToken = () => {
        return this.decodeJWT()?.sub;
    }

    /**
     * Check if user has given role
     * @param {string} role role to be checked
     * @returns {boolean} true | false
     */
    hasRole = (role) => {
        return this.getRolesFromToken().includes(role);
    }

    /**
     * Check if the user has already logged in
     * @returns {boolean} true | false
     */
    isAuthenticated = () => {
        try {
            return this.decodeJWT()?.aud === this.APP_AUDIANCE;
        } catch (err) {
            return false;
        }
    }

    /**
     * Persist the bearer token in web storage
     * @param {string} token to be stored
     */
    setTokenInStorage = (token) => {
        utils.setItemToStorage(this.TOKEN_KEY, token);
    }

    /**
     * Delete token from web storage
     */
    removeTokenFromStorage = () => {
        utils.deleteItemFromStorage(this.TOKEN_KEY);
    }

}

export default new JwtWorker();