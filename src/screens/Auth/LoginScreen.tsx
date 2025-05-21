// src/screens/Auth/LoginScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput, Alert, ActivityIndicator } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/AuthNavigator'; // Bu hala doğru
import { useAuth } from '../../context/AuthContext'; // useAuth hook'unu import et
// loginUser servisini artık doğrudan burada kullanmayacağız, AuthContext yönetecek
// import { loginUser } from '../../services/authService'; 

// Props tipi artık onLoginSuccess'ı route.params'ta beklemiyor
type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation /*, route*/ }) => { // route'u artık onLoginSuccess için kullanmıyoruz
  const { login } = useAuth(); // AuthContext'ten login fonksiyonunu al

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Hata', 'Lütfen e-posta ve şifrenizi girin.');
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      await login({ email, password }); // AuthContext'teki login fonksiyonunu çağır
      // Başarılı giriş sonrası App.tsx'teki isAuthenticated durumu context tarafından güncellenecek
      // ve otomatik olarak MainAppNavigator'a geçiş yapılacak.
      // Burada ek bir navigasyon veya onLoginSuccess çağırmaya gerek yok.
      console.log('LoginScreen: Giriş başarılı, context güncellendi.');
    } catch (err: any) {
      setError(err.message || 'Giriş sırasında bir hata oluştu.');
      Alert.alert('Giriş Başarısız', err.message || 'Giriş sırasında bir hata oluştu.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Giriş Ekranı</Text>
      {error && <Text style={styles.errorText}>{error}</Text>}
      <TextInput
        style={styles.input}
        placeholder="E-posta"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Şifre"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title="Giriş Yap" onPress={handleLogin} />
      )}
      <View style={styles.spacer} />
      <Button
        title="Hesabın yok mu? Kayıt Ol"
        onPress={() => navigation.navigate('Register')} // Artık parametre geçmiyoruz
        color="#841584"
      />
    </View>
  );
};

// Stiller aynı kalabilir...
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  spacer: {
    height: 15,
  }
});

export default LoginScreen;