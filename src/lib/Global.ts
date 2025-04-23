import axios from 'axios';
import { apiBaseUrl } from '../constants/constants';


export const apiCall = async <T>(endpoint: string, params?: any): Promise<T> => {
  const options = {
    method: 'GET',
    baseURL:apiBaseUrl,
    url: endpoint,
    params: params || {},
  };

  try {
    const response = await axios.request<T>(options);
    return response.data;
  } catch (err) {
    console.error("error: ", err);
    return {} as T;
  }
};
