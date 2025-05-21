// src/services/quizService.ts
import { QUIZ_API_URL } from '../config/apiConfig';

export interface Answer {
  answerId: number;
  answerText: string;
}

export interface Question {
  questionId: number;
  questionText: string;
  questionOrder: number;
  answers: Answer[];
}

export const fetchQuizQuestions = async (): Promise<Question[]> => {
  try {
    const response = await fetch(`${QUIZ_API_URL}/questions`);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        message: `API isteği başarısız oldu. Durum Kodu: ${response.status}`,
      }));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data: Question[] = await response.json();
    return data;
  } catch (error) {
    console.error('Test soruları getirilirken hata oluştu:', error);
    throw error;
  }
};