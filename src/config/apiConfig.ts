// src/config/apiConfig.ts
import { Platform } from 'react-native';

const P_PORT = 3001; // Backend portun

const IOS_BASE_URL = `http://localhost:${P_PORT}`;
const ANDROID_BASE_URL = `http://10.0.2.2:${P_PORT}`;

export const API_BASE_URL = Platform.OS === 'android' ? ANDROID_BASE_URL : IOS_BASE_URL;

export const QUIZ_API_URL = `${API_BASE_URL}/api/quiz`;
export const AUTH_API_URL = `${API_BASE_URL}/api/auth`;