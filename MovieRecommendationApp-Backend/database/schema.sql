-- Movie Recommendation App - Veritabanı Şeması
-- PostgreSQL için hazırlanmıştır

-- Kullanıcılar Tablosu
CREATE TABLE IF NOT EXISTS Users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    taste_profile_summary TEXT,
    taste_profile_tags TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Quiz Soruları Tablosu
CREATE TABLE IF NOT EXISTS QuizQuestions (
    question_id SERIAL PRIMARY KEY,
    question_text TEXT NOT NULL,
    question_order INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Quiz Cevapları Tablosu
CREATE TABLE IF NOT EXISTS QuizAnswers (
    answer_id SERIAL PRIMARY KEY,
    question_id INTEGER NOT NULL REFERENCES QuizQuestions(question_id) ON DELETE CASCADE,
    answer_text TEXT NOT NULL,
    answer_tags TEXT[], -- Bu cevabın hangi film zevki etiketlerini temsil ettiği
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Kullanıcı Quiz Cevapları Tablosu
CREATE TABLE IF NOT EXISTS UserQuizResponses (
    user_id INTEGER NOT NULL REFERENCES Users(user_id) ON DELETE CASCADE,
    question_id INTEGER NOT NULL REFERENCES QuizQuestions(question_id) ON DELETE CASCADE,
    chosen_answer_id INTEGER NOT NULL REFERENCES QuizAnswers(answer_id) ON DELETE CASCADE,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, question_id) -- Bir kullanıcı bir soruya sadece bir cevap verebilir
);

-- İndeksler (Performans için)
CREATE INDEX IF NOT EXISTS idx_users_email ON Users(email);
CREATE INDEX IF NOT EXISTS idx_users_username ON Users(username);
CREATE INDEX IF NOT EXISTS idx_quiz_answers_question_id ON QuizAnswers(question_id);
CREATE INDEX IF NOT EXISTS idx_user_quiz_responses_user_id ON UserQuizResponses(user_id);
CREATE INDEX IF NOT EXISTS idx_user_quiz_responses_question_id ON UserQuizResponses(question_id);

-- Örnek Veri Ekleme (Opsiyonel - Test için)
-- INSERT INTO QuizQuestions (question_text, question_order) VALUES
-- ('Hangi tür filmleri tercih edersiniz?', 1),
-- ('Film izlerken en çok neye dikkat edersiniz?', 2);

-- INSERT INTO QuizAnswers (question_id, answer_text, answer_tags) VALUES
-- (1, 'Aksiyon', ARRAY['action', 'thriller', 'adventure']),
-- (1, 'Drama', ARRAY['drama', 'emotional', 'character-driven']),
-- (1, 'Komedi', ARRAY['comedy', 'light-hearted', 'fun']),
-- (1, 'Bilim Kurgu', ARRAY['sci-fi', 'futuristic', 'technology']);

