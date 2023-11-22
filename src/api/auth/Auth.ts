import axios, { AxiosResponse } from 'axios';
import { getEnvConfig } from '~/utils/env-config';

type BaseResponse<T> = Promise<AxiosResponse<T, any>>;

const getApiBasePath = () => {
    const { apiBasePath } = getEnvConfig();
    return apiBasePath;
};

export const forgotPasswordAPI = async (usernameOrEmail: string): BaseResponse<any> => {
    const url = `${getApiBasePath()}/forgot-password?username=${usernameOrEmail}`;
    return await axios.post<any>(url);
};