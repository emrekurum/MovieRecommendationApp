// src/config/db.js

const { Pool } = require('pg'); // pg kütüphanesinden Pool'u import et

// .env dosyasından yüklenen ortam değişkenlerini kullanarak yeni bir Pool oluştur
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || "5432"), // Port numarasını integer'a çevir
});

// Bağlantıyı test etmek için basit bir sorgu (opsiyonel, ama başlangıçta iyi bir kontrol)
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('PostgreSQL veritabanına bağlanırken hata oluştu:', err);
  } else {
    console.log('PostgreSQL veritabanına başarıyla bağlanıldı. Saat:', res.rows[0].now);
  }
});

// Veritabanı sorguları için Pool'u veya direkt query fonksiyonunu export et
module.exports = {
  query: (text, params) => pool.query(text, params),
  getClient: () => pool.connect(), // Transaction yönetimi için client almak
  // pool: pool // Direkt pool'u da export edebilirsin
};