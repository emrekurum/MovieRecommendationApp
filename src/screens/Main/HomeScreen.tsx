// src/screens/Main/HomeScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainAppStackParamList } from '../../navigation/MainAppNavigator'; // Bu tipi birazdan oluşturacağız

type Props = NativeStackScreenProps<MainAppStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ana Ekran</Text>
      <Text>Giriş başarılı!</Text>
      <Button
        title="Quiz'e Git"
        onPress={() => navigation.navigate('Quiz')} // QuizScreen'i MainAppNavigator'a ekleyeceğiz
      />
       {/* TODO: Çıkış yapma butonu ve mantığı */}
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