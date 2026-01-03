// src/services/quizService.ts
import { QUIZ_API_URL } from '../config/apiConfig';
import { jsonFetch, withAuthHeader } from './httpClient';

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

export interface SubmitAnswerPayload {
  questionId: number;
  chosenAnswerId: number;
}

export interface SubmitResponse {
  message: string;
  profile?: {
    summary: string;
    tags: string[];
  };
  user?: {
    user_id: number;
    username: string;
    email: string;
  };
}

export const fetchQuizQuestions = async (token?: string): Promise<Question[]> =>
  jsonFetch<Question[]>(`${QUIZ_API_URL}/questions`, {
    headers: withAuthHeader(token),
  });

export const submitQuizAnswers = async (
  userId: number,
  answers: SubmitAnswerPayload[],
  token: string,
): Promise<SubmitResponse> =>
  jsonFetch<SubmitResponse>(`${QUIZ_API_URL}/submit`, {
    method: 'POST',
    headers: withAuthHeader(token),
    body: { userId, answers },
  });