// server.js

require('dotenv').config();
const express = require('express');
require('./src/config/db.js'); // Veritabanı bağlantısını test etmek için

const app = express();

// JSON body parser middleware'i (POST isteklerindeki JSON verisini okumak için ileride lazım olacak)
app.use(express.json()); 

// Rotaları Tanımla
const quizRoutes = require('./src/routes/quizRoutes.js'); // quizRoutes'u import et
app.use('/api/quiz', quizRoutes); // /api/quiz ön ekiyle quizRoutes'u kullan

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Movie Recommendation App Backend çalışıyor! 🎉');
});

app.listen(PORT, () => {
  console.log(`Backend sunucusu http://localhost:${PORT} adresinde çalışıyor.`);
});