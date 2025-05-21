// src/screens/Auth/RegisterScreen.tsx
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Button, 
  TextInput, 
  Alert, 
  ActivityIndicator,
  ScrollView 
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/AuthNavigator'; // Bu hala doğru
import { registerUser } from '../../services/authService';
// useAuth'u import etmeye gerek yok, çünkü kayıt sonrası sadece Login'e yönlendiriyoruz.
// Login ekranı kendi context'ini kullanarak giriş yapacak.

// Props tipi artık onLoginSuccess'ı route.params'ta beklemiyor
type Props = NativeStackScreenProps<AuthStackParamList, 'Register'>;

const RegisterScreen: React.FC<Props> = ({ navigation /*, route*/ }) => { // route'u artık onLoginSuccess için kullanmıyoruz

  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async () => {
    if (!username || !email || !password) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Hata', 'Şifre en az 6 karakter olmalıdır.');
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const response = await registerUser({ username, email, password });
      console.log('Kayıt yanıtı:', response);
      Alert.alert('Kayıt Başarılı!', response.message || 'Kullanıcı başarıyla kaydedildi. Lütfen giriş yapın.');
      navigation.navigate('Login'); // Artık parametre geçmiyoruz
    } catch (err: any) {
      setError(err.message || 'Kayıt sırasında bir hata oluştu.');
      Alert.alert('Kayıt Başarısız', err.message || 'Kayıt sırasında bir hata oluştu.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Kayıt Ol</Text>
        {error && <Text style={styles.errorText}>{error}</Text>}
        <TextInput
          style={styles.input}
          placeholder="Kullanıcı Adı"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
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
          placeholder="Şifre (en az 6 karakter)"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <Button title="Kayıt Ol" onPress={handleRegister} />
        )}
        <View style={styles.spacer} />
        <Button
          title="Zaten hesabın var mı? Giriş Yap"
          onPress={() => navigation.navigate('Login')} // Artık parametre geçmiyoruz
          color="#841584"
        />
      </View>
    </ScrollView>
  );
};

// Stiller aynı kalabilir...
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
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

export default RegisterScreen;