// src/routes/authRoutes.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db'); // Veritabanı bağlantı modülümüz

// POST /api/auth/register - Kullanıcı Kayıt Endpoint'i
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  // 1. Girdi Doğrulaması (Basit)
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Lütfen tüm alanları doldurun (kullanıcı adı, e-posta, şifre).' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'Şifre en az 6 karakter olmalıdır.' });
  }

  try {
    // 2. Kullanıcının (e-posta veya kullanıcı adı) zaten var olup olmadığını kontrol et
    const userExistsQuery = 'SELECT * FROM Users WHERE email = $1 OR username = $2';
    const { rows: existingUsers } = await db.query(userExistsQuery, [email, username]);

    if (existingUsers.length > 0) {
      return res.status(400).json({ message: 'Bu e-posta veya kullanıcı adı zaten kayıtlı.' });
    }

    // 3. Şifreyi Hash'le
    const salt = await bcrypt.genSalt(10); // Şifreye tuz ekleyerek güvenliği artırır
    const password_hash = await bcrypt.hash(password, salt);

    // 4. Yeni Kullanıcıyı Veritabanına Kaydet
    const insertUserQuery = `
      INSERT INTO Users (username, email, password_hash) 
      VALUES ($1, $2, $3) 
      RETURNING user_id, username, email, created_at; 
    `; // RETURNING ile eklenen kullanıcı bilgilerini geri alıyoruz (şifre hariç)
    
    const { rows: newUser } = await db.query(insertUserQuery, [username, email, password_hash]);

    // TODO: JWT Oluşturma ve Döndürme (Kayıttan sonra otomatik giriş için)
    // Şimdilik sadece başarı mesajı ve kullanıcı bilgilerini döndürelim (şifre hash'i hariç)

    res.status(201).json({ 
      message: 'Kullanıcı başarıyla kaydedildi!', 
      user: newUser[0] 
    });

  } catch (error) {
    console.error('Kayıt sırasında hata:', error);
    res.status(500).json({ message: 'Sunucu hatası, kayıt işlemi başarısız oldu.' });
  }
});

// TODO: POST /api/auth/login - Kullanıcı Giriş Endpoint'i buraya eklenecek

module.exports = router;