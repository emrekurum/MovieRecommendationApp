// src/services/authService.ts
import { AUTH_API_URL } from '../config/apiConfig';

// ... (LoginCredentials, User, LoginResponse arayüzleri burada zaten var) ...

// Kayıt için gönderilecek veri arayüzü
export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
}

// Kayıt işlemi için API'den dönebilecek yanıt (backend'inize göre uyarlayın)
export interface RegisterResponse {
  message: string;
  user?: User; // Backend'den kullanıcı bilgisi dönüyorsa
}

// ... (loginUser fonksiyonu burada zaten var) ...

// Yeni Kullanıcı Kayıt Servisi
export const registerUser = async (credentials: RegisterCredentials): Promise<RegisterResponse> => {
  try {
    const response = await fetch(`${AUTH_API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data: RegisterResponse = await response.json();

    if (!response.ok) {
      // API'den gelen hata mesajını kullan (eğer varsa)
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }
    
    return data;
  } catch (error: any) {
    console.error('Kayıt servisinde hata:', error.message);
    // Hatanın RegisterScreen tarafından yakalanması için tekrar fırlat
    // veya burada spesifik bir hata nesnesi döndür
    throw new Error(error.message || 'Kayıt sırasında bilinmeyen bir hata oluştu.');
  }
};