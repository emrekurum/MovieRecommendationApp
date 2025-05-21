// src/navigation/MainAppNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/Main/HomeScreen';
import QuizScreen from '../screens/Main/QuizScreen'; // QuizScreen'i import et

// Rota parametre tiplerini tanımla
export type MainAppStackParamList = {
  Home: undefined;
  Quiz: undefined; // Quiz ekranı şimdilik parametre almasın
  // Profile: { userId: string }; // Örnek: Profil ekranı userId parametresi alabilir
};

const Stack = createNativeStackNavigator<MainAppStackParamList>();

const MainAppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Ana Sayfa' }}/>
      <Stack.Screen name="Quiz" component={QuizScreen} options={{ title: 'Film Zevki Testi' }}/>
      {/* Diğer ana uygulama ekranları buraya eklenecek (Profil vb.) */}
    </Stack.Navigator>
  );
};

export default MainAppNavigator;