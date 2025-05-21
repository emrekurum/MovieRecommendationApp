// server.js

require('dotenv').config();
const express = require('express');
require('./src/config/db.js'); 

const app = express();
app.use(express.json()); 

// Rotaları Tanımla
const quizRoutes = require('./src/routes/quizRoutes.js');
app.use('/api/quiz', quizRoutes);

const authRoutes = require('./src/routes/authRoutes.js'); // <<--- YENİ SATIR ---<<
app.use('/api/auth', authRoutes);                        // <<--- YENİ SATIR ---<<

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Movie Recommendation App Backend çalışıyor! 🎉');
});

app.listen(PORT, () => {
  console.log(`Backend sunucusu http://localhost:${PORT} adresinde çalışıyor.`);
});