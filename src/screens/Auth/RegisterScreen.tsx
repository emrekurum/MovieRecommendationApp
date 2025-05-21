// src/screens/Auth/RegisterScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/AuthNavigator';

type Props = NativeStackScreenProps<AuthStackParamList, 'Register'>;

const RegisterScreen: React.FC<Props> = ({ navigation, route }) => { // route'u props'a ekle
  const { onLoginSuccess } = route.params; // onLoginSuccess'ı route.params'tan al

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kayıt Ol Ekranı</Text>
      <Button
        title="Giriş Ekranına Git"
        // Login'e navigate ederken onLoginSuccess parametresini de gönder
        onPress={() => navigation.navigate('Login', { onLoginSuccess: onLoginSuccess })}
      />
      {/* TODO: Kayıt formu ve mantığı buraya eklenecek */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default RegisterScreen;