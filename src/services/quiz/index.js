/**
 * @version 0.0.1
 * Updated On : July 15, 2025
 * APIs related Quiz
 */
import { getAccessToken } from '../../config';
import { axiosApi, responseHandler } from '../../config/axiosConfig';

export const QuizApi = {
    CreateQuiz: async (data, toast_success = false, toast_loading = false) => {
        const token = await getAccessToken()
        const api_call = axiosApi.post('/quiz-app/quiz/create/', data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return responseHandler(api_call, toast_success, toast_loading);
    },
    GetQuiz: async (toast_success = false, toast_loading = false) => {
        const token = await getAccessToken()
        const api_call = axiosApi.get('/quiz-app/quiz/', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return responseHandler(api_call, toast_success, toast_loading);
    },
    DeleteQuiz: async (id, toast_success = false, toast_loading = false) => {
        const token = await getAccessToken()
        const api_call = axiosApi.delete(`/quiz-app/quiz/delete/${id}/`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return responseHandler(api_call, toast_success, toast_loading);
    },

};
