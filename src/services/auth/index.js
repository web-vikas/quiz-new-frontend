/**
 * @version 0.0.1
 * Updated On : August 29, 2024
 * APIs related to Authentication
 */
import { axiosApi, responseHandler } from '../../config/axiosConfig';

export const AuthApi = {
    /**
     * Login API
     * @param {object} data object data.
     * @param {string|boolean} toast_success success message if provided. Default value false.
     * @param {string|boolean} toast_loading loading message if provided. Default value false.
     * @returns {json|null} json response or null.
    */
    Login: (data, toast_success = false, toast_loading = false) => {
        const api_call = axiosApi.post('/quiz_app/login/', data);
        return responseHandler(api_call, toast_success, toast_loading);
    },
    /**
     * SignUp API
     * @param {object} data object data.
     * @param {string|boolean} toast_success success message if provided. Default value false.
     * @param {string|boolean} toast_loading loading message if provided. Default value false.
     * @returns {json|null} json response or null.
     */
    SignUp: (data, toast_success = false, toast_loading = false) => {
        const api_call = axiosApi.post('/quiz_app/signup/', data);
        return responseHandler(api_call, toast_success, toast_loading);
    },
    /**
     * Otp verification  Auth API
     * @param {object} data object data.
     * @param {string|boolean} toast_success success message if provided. Default value false.
     * @param {string|boolean} toast_loading loading message if provided. Default value false.
     * */

    OtpVerification: (data, toast_success = false, toast_loading = false) => {
        const api_call = axiosApi.post('/quiz_app/verify-otp/', data);
        return responseHandler(api_call, toast_success, toast_loading);
    },
    /**
     * Resend otp  API
     * @param {object} data object data.
     * @param {string|boolean} toast_success success message if provided. Default value false.
     * @param {string|boolean} toast_loading loading message if provided. Default value false.
     * */

    ResendOtp: (data, toast_success = false, toast_loading = false) => {
        const api_call = axiosApi.post('/quiz_app/resend-otp/', data);
        return responseHandler(api_call, toast_success, toast_loading);
    }
};
