// App.tsx
import 'react-native-gesture-handler';
import React, { useState, useEffect }
from 'react';

import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './src/navigation/AuthNavigator';
import MainAppNavigator from './src/navigation/MainAppNavigator';
import { ActivityIndicator, View, StyleSheet } from 'react-native'; // Yükleme göstergesi için

// Bu UserProvider veya AuthContext gibi bir yerden gelecek
// Şimdilik basit bir state ile simüle ediyoruz
const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // null: başlangıçta kontrol ediliyor

  // Uygulama açıldığında kullanıcının giriş durumunu kontrol et (örneğin AsyncStorage'dan token oku)
  // Bu useEffect şimdilik sadece bir gecikme ile durumu değiştiriyor
  useEffect(() => {
    const checkAuthStatus = async () => {
      // Gerçek uygulamada burada AsyncStorage'dan token okunur ve doğrulanır
      // Örneğin: const userToken = await AsyncStorage.getItem('userToken');
      // if (userToken) { setIsAuthenticated(true); } else { setIsAuthenticated(false); }
      setTimeout(() => {
        setIsAuthenticated(false); // Başlangıçta giriş yapılmamış olarak ayarla
      }, 1000); // 1 saniyelik yapay yükleme süresi
    };
    checkAuthStatus();
  }, []);

  // LoginScreen'den çağrılacak fonksiyon (şimdilik App.tsx içinde)
  // Daha sonra bunu bir AuthContext ile yöneteceğiz
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  // HomeScreen'den çağrılacak fonksiyon (şimdilik App.tsx içinde)
  const handleLogout = () => {
    setIsAuthenticated(false);
  };


  if (isAuthenticated === null) {
    // Giriş durumu henüz kontrol ediliyor, bir yükleme göstergesi göster
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <MainAppNavigator /* onLogout={handleLogout} // Prop olarak geçilebilir */ />
      ) : (
        <AuthNavigator /* onLoginSuccess={handleLoginSuccess} // Prop olarak geçilebilir */ />
      )}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;