/**
 * App.tsx
 * Test için QuizScreen'i gösterir.
 */

import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import QuizScreen from './src/screens/QuizScreen'; // QuizScreen'i import ediyoruz

function App(): React.JSX.Element {
  // Arka plan stilini basit tutalım
  const backgroundStyle = {
    flex: 1, // SafeAreaView'ın tüm alanı kaplaması için
    backgroundColor: '#f0f0f0', // QuizScreen'in arka planıyla uyumlu veya genel bir renk
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={'dark-content'} backgroundColor={backgroundStyle.backgroundColor} />
      <QuizScreen />
    </SafeAreaView>
  );
}

// Eğer QuizScreen kendi içinde SafeAreaView veya flex:1 kullanmıyorsa,
// App seviyesinde sarmalamak iyi olabilir. QuizScreen'imiz zaten ScrollView ile
// ve kendi container stiliyle geliyor, bu yüzden bu yeterli olacaktır.

export default App;