// src/routes/authRoutes.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

// POST /api/auth/register - Kullanıcı Kayıt Endpoint'i
// ... (önceki /register kodun burada)
router.post('/register', async (req, res) => {
  // ... (mevcut register kodun)
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Lütfen tüm alanları doldurun (kullanıcı adı, e-posta, şifre).' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'Şifre en az 6 karakter olmalıdır.' });
  }

  try {
    const userExistsQuery = 'SELECT * FROM Users WHERE email = $1 OR username = $2';
    const { rows: existingUsers } = await db.query(userExistsQuery, [email, username]);

    if (existingUsers.length > 0) {
      return res.status(400).json({ message: 'Bu e-posta veya kullanıcı adı zaten kayıtlı.' });
    }

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);
    
    const insertUserQuery = `
      INSERT INTO Users (username, email, password_hash) 
      VALUES ($1, $2, $3) 
      RETURNING user_id, username, email, created_at; 
    `;
    const { rows: newUser } = await db.query(insertUserQuery, [username, email, password_hash]);

    // Kayıttan sonra otomatik giriş için JWT oluşturabiliriz veya sadece başarı mesajı dönebiliriz.
    // Şimdilik sadece başarı mesajı ve kullanıcı bilgilerini (şifre hash'i hariç) döndürüyoruz.
    // İstersen burada da bir token oluşturup döndürebilirsin.
    res.status(201).json({ 
      message: 'Kullanıcı başarıyla kaydedildi!', 
      user: newUser[0] 
    });

  } catch (error) {
    console.error('Kayıt sırasında hata:', error);
    res.status(500).json({ message: 'Sunucu hatası, kayıt işlemi başarısız oldu.' });
  }
});


// <<--- YENİ BAŞLANGIÇ: KULLANICI GİRİŞ ENDPOINT'İ ---<<
// POST /api/auth/login - Kullanıcı Giriş Endpoint'i
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // 1. Girdi Doğrulaması
  if (!email || !password) {
    return res.status(400).json({ message: 'Lütfen e-posta ve şifrenizi girin.' });
  }

  try {
    // 2. Kullanıcıyı E-posta ile Veritabanında Bul
    const findUserQuery = 'SELECT * FROM Users WHERE email = $1';
    const { rows: users } = await db.query(findUserQuery, [email]);

    if (users.length === 0) {
      // Kullanıcı bulunamadıysa (güvenlik için hangi alanın yanlış olduğunu belirtme)
      return res.status(401).json({ message: 'Geçersiz e-posta veya şifre.' });
    }

    const user = users[0];

    // 3. Girilen Şifre ile Veritabanındaki Hash'lenmiş Şifreyi Karşılaştır
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      // Şifreler eşleşmiyorsa
      return res.status(401).json({ message: 'Geçersiz e-posta veya şifre.' });
    }

    // 4. Şifreler Eşleşiyorsa JWT Oluştur
    const payload = {
      user: {
        id: user.user_id,
        username: user.username,
        email: user.email
        // Role gibi başka bilgiler de eklenebilir
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET, // .env dosyasından gizli anahtarı al
      { expiresIn: '1h' }, // Token'ın geçerlilik süresi (örneğin 1 saat)
      (err, token) => {
        if (err) throw err;
        res.json({
          message: 'Giriş başarılı!',
          token, // Oluşturulan token'ı frontend'e gönder
          user: { // Kullanıcı bilgilerini de (şifre hariç) gönderebiliriz
            user_id: user.user_id,
            username: user.username,
            email: user.email
          }
        });
      }
    );

  } catch (error) {
    console.error('Giriş sırasında hata:', error);
    res.status(500).json({ message: 'Sunucu hatası, giriş işlemi başarısız oldu.' });
  }
});
// <<--- YENİ BİTİŞ: KULLANICI GİRİŞ ENDPOINT'İ ---<<


module.exports = router;