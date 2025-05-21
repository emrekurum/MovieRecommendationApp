// App.tsx
import React from 'react'; // useState ve useEffect artık AuthContext'te yönetiliyor
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './src/navigation/AuthNavigator';
import MainAppNavigator from './src/navigation/MainAppNavigator';
import { ActivityIndicator, View, StyleSheet, StatusBar } from 'react-native';
import { AuthProvider, useAuth } from './src/context/AuthContext'; // AuthProvider ve useAuth'u import et

// AppContent, AuthContext'e erişebilmek için ayrı bir bileşen
const AppContent: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth(); // Context'ten değerleri al

  if (isLoading) { // Başlangıçtaki token kontrolü için yükleme göstergesi
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <>
      <StatusBar barStyle={isAuthenticated ? "light-content" : "dark-content" } />
      {isAuthenticated ? (
        <MainAppNavigator /* onLogout={logout} // logout fonksiyonunu context'ten alıp prop olarak geçebiliriz */ />
      ) : (
        <AuthNavigator /* onLoginSuccess artık context üzerinden yönetilecek */ />
      )}
    </>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider> {/* Tüm uygulamayı AuthProvider ile sarmala */}
      <NavigationContainer>
        <AppContent />
      </NavigationContainer>
    </AuthProvider>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5'
  },
});

export default App;