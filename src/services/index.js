import { AuthApi } from "./auth";
import { QuizApi } from "./quiz";

export const API = {
    ...AuthApi,
    ...QuizApi
}