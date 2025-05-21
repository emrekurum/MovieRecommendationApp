// src/navigation/AuthNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';

// Rota parametre tiplerini güncelle: Artık onLoginSuccess parametresine ihtiyaçları yok.
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

// AuthNavigator artık onLoginSuccess prop'unu almıyor.
const AuthNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        // initialParams artık gerekli değil, LoginScreen context'i kullanacak
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        // initialParams artık gerekli değil
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;