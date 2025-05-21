// src/context/AuthContext.tsx
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser as apiLoginUser, LoginCredentials, User as ApiUser } from '../services/authService';
// User tipini authService'ten alıp AuthUser olarak yeniden adlandırabiliriz veya direkt kullanabiliriz.
// Şimdilik direkt ApiUser olarak kullanalım.

interface AuthContextType {
  userToken: string | null;
  userData: ApiUser | null;
  isAuthenticated: boolean;
  isLoading: boolean; // Genel yükleme durumu (örneğin, başlangıçtaki token kontrolü için)
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  // register fonksiyonunu da buraya ekleyebiliriz veya ayrı bir serviste kalabilir.
}

// Context oluşturma (başlangıç değeri undefined olabilir veya varsayılan bir nesne)
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true); // Başlangıçta token kontrolü için true
  const [userToken, setUserToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<ApiUser | null>(null);

  useEffect(() => {
    // Uygulama ilk açıldığında AsyncStorage'dan token'ı kontrol et
    const bootstrapAsync = async () => {
      let token: string | null = null;
      let user: ApiUser | null = null;
      try {
        token = await AsyncStorage.getItem('userToken');
        const userDataString = await AsyncStorage.getItem('userData');
        if (userDataString) {
          user = JSON.parse(userDataString);
        }
      } catch (e) {
        console.error('AsyncStorage dan token/user alınırken hata:', e);
        // Token'ı geri yükleme başarısız oldu
      }
      setUserToken(token);
      setUserData(user);
      setIsLoading(false); // Kontrol bitti
    };

    bootstrapAsync();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await apiLoginUser(credentials); // authService'deki loginUser fonksiyonu
      setUserToken(response.token);
      setUserData(response.user);
      await AsyncStorage.setItem('userToken', response.token);
      await AsyncStorage.setItem('userData', JSON.stringify(response.user));
      console.log('AuthContext: Giriş başarılı, token ve user kaydedildi.');
    } catch (error) {
      console.error('AuthContext: Giriş hatası:', error);
      // Hatanın LoginScreen'e de ulaşması için tekrar fırlat
      throw error;
    }
  };

  const logout = async () => {
    setUserToken(null);
    setUserData(null);
    try {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userData');
      console.log('AuthContext: Çıkış başarılı, token ve user silindi.');
    } catch (e) {
      console.error('AsyncStorage dan token/user silinirken hata:', e);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        userToken,
        userData,
        isAuthenticated: !!userToken, // userToken varsa true, yoksa false
        isLoading,
        login,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

// Context'i kullanmak için özel bir hook
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth hook\'u bir AuthProvider içinde kullanılmalıdır');
  }
  return context;
};