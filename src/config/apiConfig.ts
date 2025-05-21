// src/config/apiConfig.ts
import { Platform } from 'react-native';

// Backend sunucun 3001 portunda çalışıyordu.
const P_PORT = 3001;

// iOS Simülatörü / Fiziksel Cihaz (localhost) için
const IOS_BASE_URL = `http://localhost:${P_PORT}`;
// Android Emülatörü için (geliştirme makinesinin localhost'una erişim)
const ANDROID_BASE_URL = `http://10.0.2.2:${P_PORT}`;

// Platforma göre doğru temel URL'yi seç
export const API_BASE_URL = Platform.OS === 'android' ? ANDROID_BASE_URL : IOS_BASE_URL;

// Diğer API yolları
export const QUIZ_API_URL = `${API_BASE_URL}/api/quiz`;
export const AUTH_API_URL = `${API_BASE_URL}/api/auth`;