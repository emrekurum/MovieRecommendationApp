// src/services/authService.ts
import { AUTH_API_URL } from '../config/apiConfig';
import { jsonFetch } from './httpClient';

// Kullanıcı arayüzü - Diğer servis yanıtlarında da kullanılacak
export interface User {
  user_id: number;
  username: string;
  email: string;
  created_at?: string;
  // taste_profile_summary?: string; // İleride eklenebilir
  // taste_profile_tags?: string[];  // İleride eklenebilir
}

// Giriş için gönderilecek veri arayüzü
export interface LoginCredentials {
  email: string;
  password: string;
}

// Giriş API yanıtı için arayüz
export interface LoginResponse {
  message: string;
  token: string;
  user: User;
}

// Kayıt için gönderilecek veri arayüzü
export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
}

// Kayıt API yanıtı için arayüz
export interface RegisterResponse {
  message: string;
  user?: User; // Backend'den kullanıcı bilgisi dönüyorsa
}

// Kullanıcı Giriş Servisi
export const loginUser = async (credentials: LoginCredentials): Promise<LoginResponse> =>
  jsonFetch<LoginResponse>(`${AUTH_API_URL}/login`, {
    method: 'POST',
    body: credentials,
  });

// Yeni Kullanıcı Kayıt Servisi
export const registerUser = async (credentials: RegisterCredentials): Promise<RegisterResponse> =>
  jsonFetch<RegisterResponse>(`${AUTH_API_URL}/register`, {
    method: 'POST',
    body: credentials,
  });