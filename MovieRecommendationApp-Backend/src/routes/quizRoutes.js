// src/routes/quizRoutes.js

const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Veritabanı bağlantı modülümüz
const authMiddleware = require('../middleware/authMiddleware');

// GET /api/quiz/questions (Bu zaten vardı)
router.get('/questions', async (req, res) => {
  // ... (mevcut /questions kodun)
  try {
    const questionsQuery = `
      SELECT q.question_id, q.question_text, q.question_order
      FROM QuizQuestions q
      ORDER BY q.question_order ASC;
    `;
    const { rows: questions } = await db.query(questionsQuery);

    if (questions.length === 0) {
      return res.status(404).json({ message: 'Hiç test sorusu bulunamadı.' });
    }
    const questionsWithAnswers = [];
    for (const q of questions) {
      const answersQuery = `
        SELECT a.answer_id, a.answer_text 
        FROM QuizAnswers a
        WHERE a.question_id = $1
        ORDER BY a.answer_id ASC; 
      `;
      const { rows: answers } = await db.query(answersQuery, [q.question_id]);
      questionsWithAnswers.push({
        questionId: q.question_id,
        questionText: q.question_text,
        questionOrder: q.question_order,
        answers: answers.map(a => ({ 
          answerId: a.answer_id, 
          answerText: a.answer_text 
        }))
      });
    }
    res.status(200).json(questionsWithAnswers);
  } catch (error) {
    console.error('API /questions endpoint hatası:', error);
    res.status(500).json({ error: 'Sorular alınırken sunucu taraflı bir hata oluştu.' });
  }
});


// <<--- YENİ BAŞLANGIÇ: QUIZ CEVAPLARINI GÖNDERME ENDPOINT'İ ---<<
// POST /api/quiz/submit
router.post('/submit', authMiddleware, async (req, res) => {
  // userId artık JWT içinden okunuyor
  const userId = req.user?.id;
  const { answers } = req.body; // answers: [{ questionId, chosenAnswerId }, ...]

  if (!userId) {
    return res.status(401).json({ message: 'Kullanıcı doğrulanamadı.' });
  }

  if (!answers || !Array.isArray(answers) || answers.length === 0) {
    return res.status(400).json({ message: 'Geçersiz istek: answers gereklidir.' });
  }

  const client = await db.getClient(); // Transaction için client al

  try {
    await client.query('BEGIN'); // Transaction başlat

    // 1. Kullanıcının cevaplarını UserQuizResponses tablosuna kaydet (veya güncelle)
    const allAnswerTags = [];
    for (const answer of answers) {
      if (!answer.questionId || !answer.chosenAnswerId) {
        throw new Error('Her cevap questionId ve chosenAnswerId içermelidir.');
      }
      // UPSERT (INSERT ... ON CONFLICT ... DO UPDATE) kullanarak bir kullanıcı bir soruya sadece bir cevap verebilsin
      // ve testi tekrar çözerse cevabı güncellensin.
      const upsertResponseQuery = `
        INSERT INTO UserQuizResponses (user_id, question_id, chosen_answer_id)
        VALUES ($1, $2, $3)
        ON CONFLICT (user_id, question_id) 
        DO UPDATE SET chosen_answer_id = EXCLUDED.chosen_answer_id, submitted_at = CURRENT_TIMESTAMP;
      `;
      await client.query(upsertResponseQuery, [userId, answer.questionId, answer.chosenAnswerId]);

      // Seçilen cevabın etiketlerini al
      const tagsQuery = 'SELECT answer_tags FROM QuizAnswers WHERE answer_id = $1';
      const { rows: tagRows } = await client.query(tagsQuery, [answer.chosenAnswerId]);
      if (tagRows.length > 0 && tagRows[0].answer_tags) {
        allAnswerTags.push(...tagRows[0].answer_tags);
      }
    }

    // 2. Film Zevki Profilini Hesapla
    const tagFrequencies = {};
    allAnswerTags.forEach(tag => {
      tagFrequencies[tag] = (tagFrequencies[tag] || 0) + 1;
    });

    // Etiketleri frekanslarına göre sırala (en çok geçen başa)
    const sortedTagsByFrequency = Object.entries(tagFrequencies)
      .sort(([, aCount], [, bCount]) => (bCount as number) - (aCount as number)) // Type assertion for count
      .map(([tag]) => tag);

    const dominantTags = sortedTagsByFrequency.slice(0, 5); // En baskın ilk 5 etiketi alalım

    let profileSummary = "Henüz bir profil özeti oluşturulamadı.";
    if (dominantTags.length > 0) {
      profileSummary = `Film zevkiniz genellikle şunları içeriyor: ${dominantTags.join(', ')}.`;
      // Daha sofistike bir özet oluşturma mantığı eklenebilir.
    }
    
    // 3. Hesaplanan profili Users tablosunda güncelle
    const updateUserProfileQuery = `
      UPDATE Users
      SET taste_profile_summary = $1, taste_profile_tags = $2
      WHERE user_id = $3
      RETURNING user_id, username, email, taste_profile_summary, taste_profile_tags;
    `;
    const { rows: updatedUser } = await client.query(updateUserProfileQuery, [
      profileSummary,
      dominantTags,
      userId
    ]);

    await client.query('COMMIT'); // Transaction'ı onayla

    if (updatedUser.length === 0) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı veya profil güncellenemedi.' });
    }

    res.status(200).json({
      message: 'Quiz cevapları başarıyla gönderildi ve profiliniz güncellendi!',
      profile: {
        summary: updatedUser[0].taste_profile_summary,
        tags: updatedUser[0].taste_profile_tags,
      },
      user: { // Güncellenmiş kullanıcı bilgilerini de döndürebiliriz
        user_id: updatedUser[0].user_id,
        username: updatedUser[0].username,
        email: updatedUser[0].email,
      }
    });

  } catch (error) {
    await client.query('ROLLBACK'); // Hata durumunda geri al
    console.error('API /submit endpoint hatası:', error);
    res.status(500).json({ message: 'Sunucu hatası, cevaplar gönderilemedi veya profil güncellenemedi.' });
  } finally {
    client.release(); // Veritabanı client'ını serbest bırak
  }
});
// <<--- YENİ BİTİŞ: QUIZ CEVAPLARINI GÖNDERME ENDPOINT'İ ---<<


module.exports = router;