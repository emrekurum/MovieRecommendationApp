// App.tsx
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './src/navigation/AuthNavigator';
import MainAppNavigator from './src/navigation/MainAppNavigator';
import { ActivityIndicator, View, StyleSheet, StatusBar } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage'; // Daha sonra eklenecek

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  // Uygulama açıldığında kullanıcının giriş durumunu kontrol et
  useEffect(() => {
    const checkAuthStatus = async () => {
      // Gerçek uygulamada burada AsyncStorage'dan token okunur ve doğrulanır
      // const userToken = await AsyncStorage.getItem('userToken');
      // if (userToken) { setIsAuthenticated(true); } else { setIsAuthenticated(false); }
      setTimeout(() => { // Simülasyon için
        setIsAuthenticated(false); // Başlangıçta giriş yapılmamış olarak ayarla
      }, 1000);
    };
    checkAuthStatus();
  }, []);

  const handleLoginSuccess = () => {
    console.log('Giriş başarılı App.tsx, isAuthenticated true olarak ayarlanıyor.');
    setIsAuthenticated(true);
    // TODO: Token'ı burada AsyncStorage'a kaydet
    // try { await AsyncStorage.setItem('userToken', token); } catch (e) { ... }
  };

  const handleLogout = () => { // Bu fonksiyon MainAppNavigator'a prop olarak geçilebilir
    console.log('Çıkış yapıldı App.tsx, isAuthenticated false olarak ayarlanıyor.');
    setIsAuthenticated(false);
    // TODO: Token'ı AsyncStorage'dan sil
    // try { await AsyncStorage.removeItem('userToken'); } catch (e) { ... }
  };

  if (isAuthenticated === null) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar barStyle={isAuthenticated ? "light-content" : "dark-content" } />
      {isAuthenticated ? (
        <MainAppNavigator /* onLogout={handleLogout} */ />
      ) : (
        <AuthNavigator onLoginSuccess={handleLoginSuccess} />
      )}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5' // Yükleme ekranı için arka plan
  },
});

export default App;