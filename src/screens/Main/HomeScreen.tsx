// src/screens/Main/HomeScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainAppStackParamList } from '../../navigation/MainAppNavigator';

type Props = NativeStackScreenProps<MainAppStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  // const { onLogout } = route.params; // Eğer App.tsx'ten prop olarak onLogout gelirse

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ana Ekran</Text>
      <Text>Giriş başarılı!</Text>
      <Button
        title="Quiz'e Git"
        onPress={() => navigation.navigate('Quiz')}
      />
      {/* <Button title="Çıkış Yap" onPress={onLogout} /> // Örnek çıkış butonu */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default HomeScreen;