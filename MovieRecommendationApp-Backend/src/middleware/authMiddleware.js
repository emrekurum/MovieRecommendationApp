const jwt = require('jsonwebtoken');

// Basit JWT doğrulama middleware'i
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Yetkilendirme gerekiyor.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    return next();
  } catch (error) {
    console.error('JWT doğrulama hatası:', error);
    return res.status(401).json({ message: 'Geçersiz veya süresi dolmuş token.' });
  }
};

module.exports = authMiddleware;


