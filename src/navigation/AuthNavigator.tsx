// src/navigation/AuthNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';

export type AuthStackParamList = {
  Login: { onLoginSuccess: () => void };
  Register: { onLoginSuccess: () => void }; // RegisterScreen'in de Login'e geçerken bu prop'a ihtiyacı olacak
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

interface AuthNavigatorProps {
  onLoginSuccess: () => void;
}

const AuthNavigator: React.FC<AuthNavigatorProps> = ({ onLoginSuccess }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        initialParams={{ onLoginSuccess: onLoginSuccess }} // onLoginSuccess'ı initialParams olarak geçir
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        initialParams={{ onLoginSuccess: onLoginSuccess }} // RegisterScreen'e de initialParams olarak geçir
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;