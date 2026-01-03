// src/config/apiConfig.ts
import Constants from 'expo-constants';
import { Platform } from 'react-native';

// Expo ortamında .env veya eas.json ile iletilen public değişken
const PUBLIC_API_URL = process.env.EXPO_PUBLIC_API_URL;

// Expo Go ile fiziksel cihazdan test ederken aynı ağa bağlı backend adresini buradan verebilirsin
// Örn: EXPO_PUBLIC_API_URL=http://192.168.1.10:3001
const P_PORT = 3001;

const IOS_BASE_URL = `http://localhost:${P_PORT}`;
const ANDROID_BASE_URL = `http://10.0.2.2:${P_PORT}`;

// Expo Go debug host bilgisinden ip çıkarımı (fallback olarak)
const debugHost = Constants.expoConfig?.hostUri?.split(':')[0];
const DEBUG_LAN_BASE_URL = debugHost ? `http://${debugHost}:${P_PORT}` : undefined;

export const API_BASE_URL =
  PUBLIC_API_URL ||
  DEBUG_LAN_BASE_URL ||
  (Platform.OS === 'android' ? ANDROID_BASE_URL : IOS_BASE_URL);

export const QUIZ_API_URL = `${API_BASE_URL}/api/quiz`;
export const AUTH_API_URL = `${API_BASE_URL}/api/auth`;