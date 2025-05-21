// src/screens/Auth/LoginScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/AuthNavigator'; // Bu tipi birazdan oluşturacağız

// Navigasyon tiplerini tanımla
type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Giriş Ekranı</Text>
      <Button
        title="Kayıt Ol Ekranına Git"
        onPress={() => navigation.navigate('Register')}
      />
      {/* TODO: Giriş formu ve mantığı buraya eklenecek */}
      <Button
        title="Giriş Yap (Simüle)"
        onPress={() => {
          // Şimdilik ana uygulamaya geçişi simüle et
          // Gerçekte burada token alıp global state'i güncelleyeceğiz
          console.log('Giriş yapıldı, ana uygulamaya yönlendiriliyor (simülasyon)...');
          // Bu kısım App.tsx'teki state'i değiştirecek bir fonksiyonla yönetilecek
        }}
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

export default LoginScreen;