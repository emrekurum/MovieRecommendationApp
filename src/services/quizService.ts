// src/services/quizService.ts

// Backend API'mızın adresini tanımlayalım
// Geliştirme sırasında kendi bilgisayarındaki backend'e bağlanıyorsan:
// Android emülatörü için genellikle 'http://10.0.2.2:PORT_NUMARASI' kullanılır.
// iOS simülatörü ve fiziksel cihazlar (aynı ağda ise) için 'http://localhost:PORT_NUMARASI' veya bilgisayarının ağdaki IP adresi kullanılabilir.
// Backend sunucun 3001 portunda çalışıyordu.
const API_BASE_URL = 'http://localhost:3001/api/quiz'; // iOS Simülatörü / Fiziksel Cihaz (localhost)
// const API_BASE_URL = 'http://10.0.2.2:3001/api/quiz'; // Android Emülatörü için


// API'den dönecek cevap verisi için bir arayüz (interface) tanımlayalım
export interface Answer {
  answerId: number;
  answerText: string;
}

// API'den dönecek soru verisi için bir arayüz tanımlayalım
export interface Question {
  questionId: number;
  questionText: string;
  questionOrder: number;
  answers: Answer[];
}

// Test sorularını getiren asenkron fonksiyon
export const fetchQuizQuestions = async (): Promise<Question[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/questions`);

    if (!response.ok) {
      // Eğer yanıt başarılı değilse (2xx durum kodu dışında bir kod ise)
      const errorData = await response.json().catch(() => ({ // Hata mesajını JSON olarak almayı dene
        message: `API isteği başarısız oldu. Durum Kodu: ${response.status}`,
      }));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data: Question[] = await response.json();
    return data;
  } catch (error) {
    console.error('Test soruları getirilirken hata oluştu:', error);
    // Hata durumunda, hatayı yakalayıp yeniden fırlatıyoruz ki çağıran bileşen de haberdar olsun.
    // Ya da burada kullanıcıya gösterilecek bir hata mesajı için özel bir nesne döndürebiliriz.
    throw error; 
  }
};