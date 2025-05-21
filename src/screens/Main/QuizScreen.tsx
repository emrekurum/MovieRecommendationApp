// src/screens/Main/QuizScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
// quizService'den Question ve Answer tiplerini doğru import ettiğimizden emin olalım
import { fetchQuizQuestions, Question, Answer as QuizServiceAnswer } from '../../services/quizService';

interface UserAnswer {
  questionId: number;
  chosenAnswerId: number;
}

// QuizScreen için navigasyon props'larını da ekleyebiliriz (eğer gerekirse)
// import type { NativeStackScreenProps } from '@react-navigation/native-stack';
// import { MainAppStackParamList } from '../../navigation/MainAppNavigator';
// type Props = NativeStackScreenProps<MainAppStackParamList, 'Quiz'>;

const QuizScreen: React.FC = (/*props: Props*/) => { // Şimdilik props almıyor
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<UserAnswer[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const userId = 1; // Placeholder

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const fetchedQuestions = await fetchQuizQuestions();
        if (fetchedQuestions && fetchedQuestions.length > 0) {
          setQuestions(fetchedQuestions);
        } else {
          setError('Hiç test sorusu bulunamadı.');
        }
      } catch (e: any) {
        setError(e.message || 'Sorular yüklenirken bir sorun oluştu.');
        Alert.alert('Hata', e.message || 'Sorular yüklenirken bir sorun oluştu.');
      } finally {
        setIsLoading(false);
      }
    };
    loadQuestions();
  }, []);

  const handleAnswerSelect = (questionId: number, answerId: number) => {
    const newAnswers = selectedAnswers.filter(
      (ans) => ans.questionId !== questionId,
    );
    newAnswers.push({ questionId, chosenAnswerId: answerId });
    setSelectedAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    const currentQuestionId = questions[currentQuestionIndex]?.questionId;
    const hasAnsweredCurrent = selectedAnswers.some(
      (ans) => ans.questionId === currentQuestionId,
    );

    if (!hasAnsweredCurrent) {
      Alert.alert('Uyarı', 'Lütfen devam etmeden önce bu soruyu cevaplayın.');
      return;
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleSubmitQuiz();
    }
  };

  const handleSubmitQuiz = async () => {
    if (selectedAnswers.length !== questions.length) {
      Alert.alert('Uyarı', `Lütfen tüm soruları cevaplayın. (${selectedAnswers.length}/${questions.length} cevaplandı)`);
      return;
    }
    console.log('Gönderilecek Cevaplar:', { userId, answers: selectedAnswers });
    Alert.alert(
      'Test Tamamlandı!',
      'Cevaplarınız kaydedildi. Sonuçlar yakında gösterilecek.',
    );
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Sorular yükleniyor...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Hata: {error}</Text>
        <Button title="Tekrar Dene" onPress={() => { /* loadQuestions(); */ }} />
      </View>
    );
  }

  if (questions.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>Gösterilecek soru bulunamadı.</Text>
      </View>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const currentSelectedAnswerId = selectedAnswers.find(
    (ans) => ans.questionId === currentQuestion.questionId,
  )?.chosenAnswerId;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.progressText}>
        Soru {currentQuestionIndex + 1} / {questions.length}
      </Text>
      <View style={styles.card}>
        <Text style={styles.questionText}>{currentQuestion.questionText}</Text>
        {currentQuestion.answers.map((answer: QuizServiceAnswer) => ( // QuizServiceAnswer kullandık
          <TouchableOpacity
            key={answer.answerId}
            style={[
              styles.answerButton,
              currentSelectedAnswerId === answer.answerId && styles.selectedAnswerButton,
            ]}
            onPress={() => handleAnswerSelect(currentQuestion.questionId, answer.answerId)}
          >
            <Text style={styles.answerText}>{answer.answerText}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Button
        title={currentQuestionIndex < questions.length - 1 ? 'Sonraki Soru' : 'Testi Bitir'}
        onPress={handleNextQuestion}
        disabled={!currentSelectedAnswerId}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  progressText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 15,
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  questionText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  answerButton: {
    backgroundColor: '#e9e9e9',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedAnswerButton: {
    backgroundColor: '#c0e0ff',
    borderColor: '#007bff',
    borderWidth: 2,
  },
  answerText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 10,
  },
});

export default QuizScreen;