import axios from "axios";
import { CONFIG } from "./environmentVariable";
import { notification } from "antd";

export const axiosApi = axios.create({
    baseURL: CONFIG.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});





/**
 * Handles the API response
 * @param {promise} api_call
 * @param {string|boolean} toast_success
 * @param {string|boolean} toast_loading
 * @returns response data or null and show error / success alerts.
 */
export const responseHandler = async (api_call, toast_success, toast_loading) => {
    let response = null;
    const notificationKey = 'api_call_notification'; // Use a consistent key for updating notifications

    if (toast_loading) {
        notification.warning({
            message: 'Loading...',
            description: toast_loading,
            key: notificationKey,
            duration: 0,
            placement: 'bottomRight',
        });
    }

    try {
        response = await api_call;
        if (toast_success) {
            notification.success({
                message: 'Success',
                description: toast_success,
                key: notificationKey,
                duration: 4.5,
                placement: 'bottomRight',
            });
        } else if (toast_loading) {
            notification.destroy(notificationKey);
        }
    } catch (e) {
        response = e;
        if (toast_loading && !toast_success) {
            notification.destroy(notificationKey);
        }
    }

    if (response?.status === 200) {
        return response.data;
    } else {
        let errorMessage = 'Something went wrong. Please contact admin.';
        let errorTitle = 'Error';
        const responseData = response?.response?.data;

        if (response?.status === 400) {
            errorTitle = 'Bad Request (400)';
            errorMessage = responseData?.error || 'The request could not be understood.';
        } else if (response?.status === 401) {
            errorTitle = 'Unauthorized (401)';
            errorMessage = responseData?.message ? responseData.message : 'You are not authorized to perform this action.';
            window.location.href = '/';
        } else if (response?.status === 403) {
            errorTitle = 'Forbidden (403)';
            errorMessage = 'You do not have permission to access this resource.';
        } else if (response?.status === 500) {
            errorTitle = 'Server Error (500)';
            errorMessage = response?.message || 'An internal server error occurred.';
        } else if (response?.message) {
            errorMessage = response.message;
        }


        notification.error({
            message: errorTitle,
            description: errorMessage,
            key: notificationKey,
            duration: 4.5,
            placement: 'bottomRight',
        });
        return null;
    }
};