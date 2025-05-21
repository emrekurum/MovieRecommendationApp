// App.tsx (veya src/App.tsx)

// Eğer 'react-native-gesture-handler' import'unu index.js'e eklediyseniz,
// burada tekrar eklemenize gerek yok. Ama zarar da vermez.
// Önemli olan en az bir yerde ve uygulamanın en başında olmasıdır.
// import 'react-native-gesture-handler'; 

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './src/navigation/AuthNavigator'; // './src/...' veya '../src/...' yolunu kendi yapınıza göre ayarlayın
import MainAppNavigator from './src/navigation/MainAppNavigator'; // './src/...' veya '../src/...'
import { ActivityIndicator, View, StyleSheet, StatusBar } from 'react-native';
import { AuthProvider, useAuth } from './src/context/AuthContext'; // './src/...' veya '../src/...'

const AppContent: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
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
        <MainAppNavigator />
      ) : (
        <AuthNavigator />
      )}
    </>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
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