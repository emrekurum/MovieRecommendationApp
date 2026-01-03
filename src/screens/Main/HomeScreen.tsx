// src/screens/Main/HomeScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainAppStackParamList } from '../../navigation/MainAppNavigator';
import { useAuth } from '../../context/AuthContext';

type Props = NativeStackScreenProps<MainAppStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { userData, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Çıkış Yap',
      'Çıkış yapmak istediğinize emin misiniz?',
      [
        { text: 'İptal', style: 'cancel' },
        {
          text: 'Çıkış Yap',
          style: 'destructive',
          onPress: async () => {
            await logout();
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ana Ekran</Text>
      {userData && (
        <Text style={styles.welcomeText}>Hoş geldiniz, {userData.username}!</Text>
      )}
      <View style={styles.buttonContainer}>
        <Button
          title="Quiz'e Git"
          onPress={() => navigation.navigate('Quiz')}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Çıkış Yap"
          onPress={handleLogout}
          color="#d32f2f"
        />
      </View>
    </View>
  );
};

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
    marginBottom: 10,
    color: '#333',
  },
  welcomeText: {
    fontSize: 16,
    marginBottom: 30,
    color: '#666',
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
    marginBottom: 15,
  },
});

export default HomeScreen;