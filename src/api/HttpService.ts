import axios, { AxiosInstance, Method } from 'axios';

import { history } from '@constants/history';

interface IMethod {
  path: string;

  postData?: unknown;

  method?: Method;
}

const HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};
export class HttpService {
  axiosInstance: AxiosInstance | undefined;

  constructor() {
    this.setup();
  }

  setup = () => {
    this.axiosInstance = axios.create({
      baseURL: 'http://localhost:4007/',
    });

    axios.interceptors.response.use(
      (response) => response,

      (error) => {
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        if (error.response?.status === 401) {
          return history.push('/login');
        }
        return Promise.reject(error);
      }
    );
  };

  _request = async ({ method, path, postData }: IMethod) => {
    try {
      const response = await this.axiosInstance?.request({
        method,
        url: path,
        headers: HEADERS,
        data: postData,
      });
      return response?.data;
    } catch (e) {
      return Promise.reject(e);
    }
  };

  get = ({ path }: IMethod) => {
    const method = 'GET';
    return this._request({ method, path });
  };

  post = ({ path, postData }: IMethod) => {
    const method = 'POST';
    return this._request({ method, path, postData });
  };

  patch = ({ path, postData }: IMethod) => {
    const method = 'PATCH';
    return this._request({ method, path, postData });
  };

  delete = ({ path, postData }: IMethod) => {
    const method = 'DELETE';
    return this._request({ method, path, postData });
  };
}

export const httpService = new HttpService();
