// src/services/authService.ts
import { AUTH_API_URL } from '../config/apiConfig';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  user_id: number;
  username: string;
  email: string;
  created_at?: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  user: User;
}

export const loginUser = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${AUTH_API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data: LoginResponse = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }
    
    return data;
  } catch (error: any) {
    console.error('Giriş servisinde hata:', error.message);
    throw error;
  }
};

// TODO: Register servisi de eklenecek
// export const registerUser = async (userData) => { ... };