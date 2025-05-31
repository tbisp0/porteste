import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// Tipos para as respostas da API
export interface ApiResponse<T> {
  data: T;
  status: number;
}

export interface ApiError {
  message: string;
  code?: string;
  status: number;
}

class ApiService {
  private api: AxiosInstance;
  private baseURL: string;

  constructor() {
    this.baseURL = import.meta.env.VITE_API_URL || '/api';
    this.api = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      timeout: 30000, // 30 segundos
    });
    
    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Interceptor de requisição
    this.api.interceptors.request.use(
      (config) => {
        // Obter token de autenticação do storage
        const token = localStorage.getItem('authToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        // Adicionar CSRF token se disponível
        const csrfToken = localStorage.getItem('csrfToken');
        if (csrfToken) {
          config.headers['X-CSRF-Token'] = csrfToken;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );
      
    // Interceptor de resposta
    this.api.interceptors.response.use(
      (response) => response,
      (error: unknown) => this.handleError(error)
    );
  }

  private handleError(error: unknown): never {
    if (import.meta.env.DEV) {
      console.warn('[API] Error intercepted by handleError:', error);
    }

    if (axios.isAxiosError(error)) {
      const status = error.response?.status || 500;
      const message = error.response?.data?.message || error.message || 'Ocorreu um erro na requisição';
      const code = error.response?.data?.code;
      
      // Handle specific errors
      if (status === 401) {
        console.warn('Não autorizado - redirecionando para login');
        // window.location.href = '/login';
      }
      
      // For 404 errors in development, log but don't throw
      if (import.meta.env.DEV && status === 404) {
        console.warn(`[API] Endpoint not found: ${error.config?.url}`);
        // Return empty response to prevent unhandled promise rejections
        throw { message, code, status, isHandled: true };
      }
      
      throw { message, code, status };
    }
    
    // If not an Axios error, just rethrow
    const errorMessage = error instanceof Error ? error.message : 'Ocorreu um erro desconhecido';
    throw {
      message: errorMessage,
      status: 500,
      isHandled: error && typeof error === 'object' ? (error as any).isHandled : false
    };
  }
    
  // Métodos genéricos para chamadas HTTP
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response: AxiosResponse = await this.api.get(url, config);
    return { data: response.data, status: response.status };
  }

  async post<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response: AxiosResponse = await this.api.post(url, data, config);
    return { data: response.data, status: response.status };
  }

  async put<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response: AxiosResponse = await this.api.put(url, data, config);
    return { data: response.data, status: response.status };
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response: AxiosResponse = await this.api.delete(url, config);
    return { data: response.data, status: response.status };
  }

  // Métodos específicos
  async uploadMedia(file: File, options?: { thumbnail?: boolean, compress?: boolean }): Promise<ApiResponse<{ url: string, thumbnailUrl?: string }>> {
    const formData = new FormData();
    formData.append('file', file);

    if (options) {
      formData.append('options', JSON.stringify(options));
    }

    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    return this.post<{ url: string, thumbnailUrl?: string }>('/media/upload', formData, config);
  }

  public async getTranslations(language: string): Promise<ApiResponse<Record<string, any>>> {
    try {
      return await this.get<Record<string, any>>(`/translations/${language}`);
    } catch (error) {
      // Fallback to local translations if API is not available
      console.warn('Failed to fetch translations from API, falling back to local files');
      try {
        // Import local translations
        const module = await import(`../../public/locales/${language}/translation.json`);
        return { data: module.default, status: 200 };
      } catch (e) {
        console.error('Failed to load local translations:', e);
        return { data: {}, status: 200 }; // Return empty translations to prevent errors
      }
    }
  }

  async getAnimations(category?: string, device?: string): Promise<ApiResponse<any[]>> {
    const params: Record<string, string> = {};
    if (category) params.category = category;
    if (device) params.device = device;

    return this.get<any[]>('/animations', { params });
  }
}

// Exportar instância única do serviço
export const apiService = new ApiService();
