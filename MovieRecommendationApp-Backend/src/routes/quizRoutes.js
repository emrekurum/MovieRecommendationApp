// src/routes/quizRoutes.js

const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Veritabanı bağlantı modülümüz

/**
 * @route   GET /api/quiz/questions
 * @desc    Test için tüm soruları ve cevap seçeneklerini getirir
 * @access  Public
 */
router.get('/questions', async (req, res) => {
  try {
    // Soruları sıralı bir şekilde çek
    const questionsQuery = `
      SELECT 
        q.question_id, 
        q.question_text, 
        q.question_order
      FROM QuizQuestions q
      ORDER BY q.question_order ASC;
    `;
    const { rows: questions } = await db.query(questionsQuery);

    if (questions.length === 0) {
      return res.status(404).json({ message: 'Hiç test sorusu bulunamadı.' });
    }

    const questionsWithAnswers = [];

    // Her bir soru için cevap seçeneklerini çek
    for (const q of questions) {
      const answersQuery = `
        SELECT 
          a.answer_id, 
          a.answer_text 
        FROM QuizAnswers a
        WHERE a.question_id = $1
        ORDER BY a.answer_id ASC; 
      `;
      // $1, questionsQuery'den gelen q.question_id'ye karşılık gelir.
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

module.exports = router; // Bu router'ı export et