// src/screens/Auth/RegisterScreen.tsx
import React from 'react'; // useState, TextInput vb. eklenecek
import { View, Text, StyleSheet, Button } // TextInput, Alert eklenecek
from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/AuthNavigator';

type Props = NativeStackScreenProps<AuthStackParamList, 'Register'>;

const RegisterScreen: React.FC<Props> = ({ navigation, route }) => {
  const { onLoginSuccess } = route.params;

  // TODO: Kayıt için state'ler (username, email, password, loading, error) eklenecek
  // TODO: handleRegister fonksiyonu eklenecek (backend'e istek atacak)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kayıt Ol Ekranı</Text>
      {/* TODO: Kayıt formu (TextInput'lar) buraya eklenecek */}
      <Button
        title="Giriş Ekranına Git"
        onPress={() => navigation.navigate('Login', { onLoginSuccess: onLoginSuccess })}
      />
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