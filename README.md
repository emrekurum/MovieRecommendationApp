# 🎬 Movie Recommendation App

Modern bir React Native (Expo) mobil uygulaması ve Node.js/Express backend ile film zevki analizi ve öneri sistemi.

## 📋 İçindekiler

- [Özellikler](#-özellikler)
- [Teknoloji Stack](#-teknoloji-stack)
- [Gereksinimler](#-gereksinimler)
- [Kurulum](#-kurulum)
- [Yapılandırma](#-yapılandırma)
- [Kullanım](#-kullanım)
- [API Dokümantasyonu](#-api-dokümantasyonu)
- [Veritabanı Şeması](#-veritabanı-şeması)
- [Geliştirme](#-geliştirme)
- [Sorun Giderme](#-sorun-giderme)
- [Lisans](#-lisans)

## ✨ Özellikler

### Frontend (React Native + Expo)
- ✅ **Kullanıcı Kimlik Doğrulama**: Güvenli kayıt ve giriş sistemi
- ✅ **Film Zevki Testi**: İnteraktif quiz ile kullanıcı tercihlerini analiz etme
- ✅ **Profil Yönetimi**: Otomatik oluşturulan film zevki profili
- ✅ **Token Tabanlı Güvenlik**: JWT ile korumalı API çağrıları
- ✅ **Offline Destek**: AsyncStorage ile oturum kalıcılığı
- ✅ **Expo Go Desteği**: QR kod ile hızlı test ve geliştirme

### Backend (Node.js + Express)
- ✅ **RESTful API**: Modern ve ölçeklenebilir API yapısı
- ✅ **JWT Authentication**: Güvenli token tabanlı kimlik doğrulama
- ✅ **PostgreSQL Entegrasyonu**: Güçlü ve güvenilir veritabanı
- ✅ **CORS Desteği**: Cross-origin istekler için yapılandırma
- ✅ **Transaction Yönetimi**: Veri bütünlüğü için transaction desteği
- ✅ **Profil Analizi**: Otomatik film zevki profili hesaplama

## 🛠 Teknoloji Stack

### Frontend
- **React Native** 0.74.3
- **Expo SDK** 51
- **TypeScript** 5.0.4
- **React Navigation** 7.x
- **AsyncStorage** - Yerel depolama
- **Expo Constants** - Ortam değişkenleri

### Backend
- **Node.js** 18+
- **Express** 5.1.0
- **PostgreSQL** - Veritabanı
- **JWT** (jsonwebtoken) - Token tabanlı kimlik doğrulama
- **bcryptjs** - Şifre hashleme
- **CORS** - Cross-origin desteği

## 📦 Gereksinimler

- **Node.js** 18 veya üzeri
- **npm** 9+ veya **yarn**
- **PostgreSQL** 12+ (yerel veya uzak)
- **Expo Go** uygulaması (mobil cihazda test için)
- **Git** (versiyon kontrolü için)

## 🚀 Kurulum

### 1. Repository'yi Klonlayın

```bash
git clone https://github.com/emrekurum/MovieRecommendationApp.git
cd MovieRecommendationApp
```

### 2. Frontend Bağımlılıklarını Yükleyin

```bash
npm install
```

### 3. Backend Bağımlılıklarını Yükleyin

```bash
cd MovieRecommendationApp-Backend
npm install
cd ..
```

### 4. Veritabanını Oluşturun

PostgreSQL'de yeni bir veritabanı oluşturun:

```sql
CREATE DATABASE movierecommendation;
```

Şemayı uygulayın:

```bash
psql -U postgres -d movierecommendation -f MovieRecommendationApp-Backend/database/schema.sql
```

Veya PostgreSQL client'ınızla `schema.sql` dosyasını çalıştırın.

## ⚙️ Yapılandırma

### Backend Yapılandırması

`MovieRecommendationApp-Backend` dizininde `.env` dosyası oluşturun:

```bash
cd MovieRecommendationApp-Backend
cp .env.example .env
```

`.env` dosyasını düzenleyin:

```env
# PostgreSQL Veritabanı Ayarları
DB_USER=postgres
DB_PASSWORD=your_password_here
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=movierecommendation

# Sunucu Portu
PORT=3001

# JWT Gizli Anahtarı (Güçlü bir anahtar kullanın!)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

**⚠️ Önemli**: Production ortamında `JWT_SECRET` için güçlü ve rastgele bir anahtar kullanın!

### Frontend Yapılandırması

#### Yerel Geliştirme (Emülatör/Simülatör)

Varsayılan olarak:
- **iOS Simülatör**: `http://localhost:3001`
- **Android Emülatör**: `http://10.0.2.2:3001`

#### Fiziksel Cihaz veya LAN Üzerinden

Backend sunucusunun çalıştığı makinenin yerel IP adresini bulun:

**Windows:**
```bash
ipconfig
```

**macOS/Linux:**
```bash
ifconfig
# veya
ip addr
```

Ardından Expo'yu başlatırken ortam değişkenini ayarlayın:

```bash
EXPO_PUBLIC_API_URL=http://192.168.1.100:3001 npm start
```

Veya `.env` dosyası oluşturun (root dizinde):

```env
EXPO_PUBLIC_API_URL=http://192.168.1.100:3001
```

**Not**: Mobil cihaz ve bilgisayar aynı Wi-Fi ağında olmalıdır.

## 🎯 Kullanım

### Backend'i Başlatma

```bash
cd MovieRecommendationApp-Backend
npm run dev  # Geliştirme modu (nodemon ile otomatik yeniden başlatma)
# veya
npm start    # Production modu
```

Backend başarıyla çalışıyorsa şu mesajı göreceksiniz:
```
Backend sunucusu http://localhost:3001 adresinde çalışıyor.
PostgreSQL veritabanına başarıyla bağlanıldı.
```

### Frontend'i Başlatma

```bash
npm start
```

Expo CLI başlatıldığında:
1. Terminal'de bir QR kod görünecek
2. **Expo Go** uygulamasını mobil cihazınızda açın
3. QR kodu tarayın
4. Uygulama yüklenecek ve çalışacak

**Alternatif Yöntemler:**
- `npm run android` - Android emülatörde aç
- `npm run ios` - iOS simülatörde aç (sadece macOS)
- `npm run web` - Web tarayıcıda aç

### Uygulama Akışı

1. **Kayıt Ol**: Yeni kullanıcı hesabı oluşturun
2. **Giriş Yap**: Oluşturduğunuz hesap ile giriş yapın
3. **Quiz Çöz**: Film zevki testini tamamlayın
4. **Profil Görüntüle**: Otomatik oluşturulan profilinizi görün

## 📡 API Dokümantasyonu

### Authentication Endpoints

#### `POST /api/auth/register`
Yeni kullanıcı kaydı.

**Request Body:**
```json
{
  "username": "kullanici_adi",
  "email": "email@example.com",
  "password": "sifre123"
}
```

**Response (201):**
```json
{
  "message": "Kullanıcı başarıyla kaydedildi!",
  "user": {
    "user_id": 1,
    "username": "kullanici_adi",
    "email": "email@example.com",
    "created_at": "2024-01-01T00:00:00.000Z"
  }
}
```

#### `POST /api/auth/login`
Kullanıcı girişi.

**Request Body:**
```json
{
  "email": "email@example.com",
  "password": "sifre123"
}
```

**Response (200):**
```json
{
  "message": "Giriş başarılı!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "user_id": 1,
    "username": "kullanici_adi",
    "email": "email@example.com"
  }
}
```

### Quiz Endpoints

#### `GET /api/quiz/questions`
Quiz sorularını getirir. (Token opsiyonel)

**Headers:**
```
Authorization: Bearer <token>  (Opsiyonel)
```

**Response (200):**
```json
[
  {
    "questionId": 1,
    "questionText": "Hangi tür filmleri tercih edersiniz?",
    "questionOrder": 1,
    "answers": [
      {
        "answerId": 1,
        "answerText": "Aksiyon"
      },
      {
        "answerId": 2,
        "answerText": "Drama"
      }
    ]
  }
]
```

#### `POST /api/quiz/submit`
Quiz cevaplarını gönderir ve kullanıcı profilini günceller. (Token gerekli)

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "answers": [
    {
      "questionId": 1,
      "chosenAnswerId": 1
    },
    {
      "questionId": 2,
      "chosenAnswerId": 3
    }
  ]
}
```

**Response (200):**
```json
{
  "message": "Quiz cevapları başarıyla gönderildi ve profiliniz güncellendi!",
  "profile": {
    "summary": "Film zevkiniz genellikle şunları içeriyor: action, thriller, adventure.",
    "tags": ["action", "thriller", "adventure", "drama", "emotional"]
  },
  "user": {
    "user_id": 1,
    "username": "kullanici_adi",
    "email": "email@example.com"
  }
}
```

## 🗄️ Veritabanı Şeması

### Tablolar

#### `Users`
- `user_id` (SERIAL PRIMARY KEY)
- `username` (VARCHAR, UNIQUE)
- `email` (VARCHAR, UNIQUE)
- `password_hash` (VARCHAR)
- `taste_profile_summary` (TEXT)
- `taste_profile_tags` (TEXT[])
- `created_at` (TIMESTAMP)

#### `QuizQuestions`
- `question_id` (SERIAL PRIMARY KEY)
- `question_text` (TEXT)
- `question_order` (INTEGER)
- `created_at` (TIMESTAMP)

#### `QuizAnswers`
- `answer_id` (SERIAL PRIMARY KEY)
- `question_id` (INTEGER, FOREIGN KEY)
- `answer_text` (TEXT)
- `answer_tags` (TEXT[])
- `created_at` (TIMESTAMP)

#### `UserQuizResponses`
- `user_id` (INTEGER, FOREIGN KEY)
- `question_id` (INTEGER, FOREIGN KEY)
- `chosen_answer_id` (INTEGER, FOREIGN KEY)
- `submitted_at` (TIMESTAMP)
- PRIMARY KEY (user_id, question_id)

Detaylı şema için `MovieRecommendationApp-Backend/database/schema.sql` dosyasına bakın.

## 🔧 Geliştirme

### Proje Yapısı

```
MovieRecommendationApp/
├── src/
│   ├── components/          # Yeniden kullanılabilir bileşenler
│   ├── config/              # Yapılandırma dosyaları
│   │   └── apiConfig.ts     # API URL yapılandırması
│   ├── context/             # React Context'ler
│   │   └── AuthContext.tsx  # Kimlik doğrulama context'i
│   ├── navigation/          # Navigasyon yapılandırması
│   │   ├── AuthNavigator.tsx
│   │   └── MainAppNavigator.tsx
│   ├── screens/             # Ekran bileşenleri
│   │   ├── Auth/
│   │   │   ├── LoginScreen.tsx
│   │   │   └── RegisterScreen.tsx
│   │   └── Main/
│   │       ├── HomeScreen.tsx
│   │       └── QuizScreen.tsx
│   └── services/            # API servisleri
│       ├── authService.ts
│       ├── quizService.ts
│       └── httpClient.ts
├── MovieRecommendationApp-Backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js        # Veritabanı bağlantısı
│   │   ├── middleware/
│   │   │   └── authMiddleware.js  # JWT doğrulama
│   │   └── routes/
│   │       ├── authRoutes.js
│   │       └── quizRoutes.js
│   ├── database/
│   │   └── schema.sql       # Veritabanı şeması
│   └── server.js            # Express sunucusu
├── App.tsx                  # Ana uygulama bileşeni
├── app.json                 # Expo yapılandırması
└── package.json
```

### Kod Standartları

- **TypeScript**: Tüm frontend kodları TypeScript ile yazılmıştır
- **ESLint**: Kod kalitesi için ESLint kullanılmaktadır
- **Async/Await**: Promise'ler için async/await tercih edilir
- **Error Handling**: Tüm API çağrıları try-catch ile korunur

### Yeni Özellik Ekleme

1. **Yeni Ekran**: `src/screens/` altında yeni bir klasör oluşturun
2. **Navigasyon**: `src/navigation/` içinde route ekleyin
3. **API Endpoint**: Backend'de yeni route oluşturun
4. **Service**: Frontend'de yeni servis fonksiyonu ekleyin

## 🐛 Sorun Giderme

### Backend Bağlantı Sorunları

**Problem**: PostgreSQL bağlantı hatası
```
Çözüm: .env dosyasındaki veritabanı bilgilerini kontrol edin. PostgreSQL servisinin çalıştığından emin olun.
```

**Problem**: Port zaten kullanımda
```
Çözüm: .env dosyasında PORT değerini değiştirin veya kullanan işlemi sonlandırın.
```

### Frontend Bağlantı Sorunları

**Problem**: API istekleri başarısız oluyor
```
Çözüm: 
1. Backend'in çalıştığından emin olun
2. EXPO_PUBLIC_API_URL ortam değişkenini kontrol edin
3. Mobil cihaz ve bilgisayar aynı Wi-Fi ağında olmalı
4. Firewall ayarlarını kontrol edin
```

**Problem**: Expo Go'da uygulama açılmıyor
```
Çözüm:
1. Expo Go uygulamasının güncel olduğundan emin olun
2. npm start komutunu tekrar çalıştırın
3. QR kodu yeniden tarayın
4. Metro bundler'ın çalıştığından emin olun
```

### Veritabanı Sorunları

**Problem**: Tablo bulunamadı hatası
```
Çözüm: schema.sql dosyasını çalıştırarak veritabanı şemasını oluşturun.
```

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 👥 Katkıda Bulunanlar

- **Emre Kurum** - Proje sahibi ve geliştirici

## 🙏 Teşekkürler

- React Native ve Expo topluluğuna
- Tüm açık kaynak kütüphane geliştiricilerine

---

**Not**: Bu proje eğitim ve geliştirme amaçlıdır. Production kullanımı için ek güvenlik önlemleri alınmalıdır.
