// App.tsx
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './src/navigation/AuthNavigator';
import MainAppNavigator from './src/navigation/MainAppNavigator';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      setTimeout(() => {
        setIsAuthenticated(false); 
      }, 1000); 
    };
    checkAuthStatus();
  }, []);

  const handleLoginSuccess = () => {
    console.log('Giriş başarılı, isAuthenticated true olarak ayarlanıyor.');
    setIsAuthenticated(true);
    // TODO: Token'ı burada AsyncStorage'a kaydet
  };

  const handleLogout = () => { // Bu fonksiyonu MainAppNavigator'a prop olarak geçebiliriz
    setIsAuthenticated(false);
    // TODO: Token'ı AsyncStorage'dan sil
  };

  if (isAuthenticated === null) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
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
  },
});

export default App;