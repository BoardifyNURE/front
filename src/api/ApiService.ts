import axios, { AxiosRequestConfig } from 'axios';

import { config } from '../config';
import { LoginDto, LoginResponse, SignUpDto, RequestResult, UserSanitizedResponse } from './types';

class ApiService {
  private readonly defaultRequestConfig: AxiosRequestConfig = {
    baseURL: config.serverURL,
    headers: {
      'Content-Type': 'application/json',
    },
    validateStatus: (status) => status < 500,
  };

  setAccessToken(accessToken: string): void {
    this.defaultRequestConfig.headers.Authorization = `Bearer ${accessToken}`;
  }

  unsetAccessToken(): void {
    delete this.defaultRequestConfig.headers.Authorization;
  }

  private extractErrorMessage(error: any): string {
    if (error.message) {
      return Array.isArray(error.message) ? error.message[0] : error.message;
    }

    return error.error || 'Something went wrong';
  }

  private async get<T = any>(
    path: string,
    requestConfig?: AxiosRequestConfig
  ): Promise<RequestResult<T>> {
    const { data } = await axios.get(path, {
      ...this.defaultRequestConfig,
      ...requestConfig,
    });

    if (data?.error) {
      return {
        error: this.extractErrorMessage(data),
      };
    }

    return { data };
  }

  private async post<T = any>(
    path: string,
    body?: any,
    requestConfig?: AxiosRequestConfig
  ): Promise<RequestResult<T>> {
    const { data } = await axios.post(path, body, {
      ...this.defaultRequestConfig,
      ...requestConfig,
    });

    if (data?.error) {
      return {
        error: this.extractErrorMessage(data),
      };
    }

    return { data };
  }

  private async put<T = any>(
    path: string,
    body?: any,
    requestConfig?: AxiosRequestConfig
  ): Promise<RequestResult<T>> {
    const { data } = await axios.put(path, body, {
      ...this.defaultRequestConfig,
      ...requestConfig,
    });

    if (data?.error) {
      return {
        error: this.extractErrorMessage(data),
      };
    }

    return { data };
  }

  private async delete<T = any>(
    path: string,
    requestConfig?: AxiosRequestConfig
  ): Promise<RequestResult<T>> {
    const { data } = await axios.delete(path, {
      ...this.defaultRequestConfig,
      ...requestConfig,
    });

    if (data?.error) {
      return {
        error: this.extractErrorMessage(data),
      };
    }

    return { data };
  }

  async login(dto: LoginDto) {
    return this.post<LoginResponse>('/auth/login', dto);
  }

  async signUp(dto: SignUpDto) {
    return this.post<UserSanitizedResponse>('/auth/signup', dto);
  }

  async getUser() {
    return this.get<UserSanitizedResponse>('/auth/user');
  }
}

export const apiService = new ApiService();
