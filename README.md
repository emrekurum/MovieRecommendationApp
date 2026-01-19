# 🎬 Movie Recommendation App

A modern React Native (Expo) mobile application with Node.js/Express backend for movie taste analysis and recommendation system.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Requirements](#-requirements)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Database Schema](#-database-schema)
- [Development](#-development)
- [Troubleshooting](#-troubleshooting)
- [License](#-license)

## ✨ Features

### Frontend (React Native + Expo)
- ✅ **User Authentication**: Secure registration and login system
- ✅ **Movie Taste Quiz**: Interactive quiz to analyze user preferences
- ✅ **Profile Management**: Automatically generated movie taste profile
- ✅ **Token-Based Security**: JWT-protected API calls
- ✅ **Offline Support**: Session persistence with AsyncStorage
- ✅ **Expo Go Support**: Quick testing and development via QR code

### Backend (Node.js + Express)
- ✅ **RESTful API**: Modern and scalable API architecture
- ✅ **JWT Authentication**: Secure token-based authentication
- ✅ **PostgreSQL Integration**: Robust and reliable database
- ✅ **CORS Support**: Cross-origin request configuration
- ✅ **Transaction Management**: Transaction support for data integrity
- ✅ **Profile Analysis**: Automatic movie taste profile calculation

## 🛠 Tech Stack

### Frontend
- **React Native** 0.74.3
- **Expo SDK** 51
- **TypeScript** 5.0.4
- **React Navigation** 7.x
- **AsyncStorage** - Local storage
- **Expo Constants** - Environment variables

### Backend
- **Node.js** 18+
- **Express** 5.1.0
- **PostgreSQL** - Database
- **JWT** (jsonwebtoken) - Token-based authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin support

## 📦 Requirements

- **Node.js** 18 or higher
- **npm** 9+ or **yarn**
- **PostgreSQL** 12+ (local or remote)
- **Expo Go** app (for mobile device testing)
- **Git** (for version control)

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/emrekurum/MovieRecommendationApp.git
cd MovieRecommendationApp
```

### 2. Install Frontend Dependencies

```bash
npm install
```

### 3. Install Backend Dependencies

```bash
cd MovieRecommendationApp-Backend
npm install
cd ..
```

### 4. Create the Database

Create a new database in PostgreSQL:

```sql
CREATE DATABASE movierecommendation;
```

Apply the schema:

```bash
psql -U postgres -d movierecommendation -f MovieRecommendationApp-Backend/database/schema.sql
```

Or run the `schema.sql` file using your PostgreSQL client.

## ⚙️ Configuration

### Backend Configuration

Create a `.env` file in the `MovieRecommendationApp-Backend` directory:

```bash
cd MovieRecommendationApp-Backend
cp .env.example .env
```

Edit the `.env` file:

```env
# PostgreSQL Database Settings
DB_USER=postgres
DB_PASSWORD=your_password_here
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=movierecommendation

# Server Port
PORT=3001

# JWT Secret Key (Use a strong key!)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

**⚠️ Important**: Use a strong and random key for `JWT_SECRET` in production!

### Frontend Configuration

#### Local Development (Emulator/Simulator)

By default:
- **iOS Simulator**: `http://localhost:3001`
- **Android Emulator**: `http://10.0.2.2:3001`

#### Physical Device or Over LAN

Find the local IP address of the machine running the backend server:

**Windows:**
```bash
ipconfig
```

**macOS/Linux:**
```bash
ifconfig
# or
ip addr
```

Then set the environment variable when starting Expo:

```bash
EXPO_PUBLIC_API_URL=http://192.168.1.100:3001 npm start
```

Or create a `.env` file (in the root directory):

```env
EXPO_PUBLIC_API_URL=http://192.168.1.100:3001
```

**Note**: Mobile device and computer must be on the same Wi-Fi network.

## 🎯 Usage

### Starting the Backend

```bash
cd MovieRecommendationApp-Backend
npm run dev  # Development mode (auto-restart with nodemon)
# or
npm start    # Production mode
```

If the backend is running successfully, you'll see:
```
Backend server running at http://localhost:3001
Successfully connected to PostgreSQL database.
```

### Starting the Frontend

```bash
npm start
```

When Expo CLI starts:
1. A QR code will appear in the terminal
2. Open the **Expo Go** app on your mobile device
3. Scan the QR code
4. The app will load and run

**Alternative Methods:**
- `npm run android` - Open in Android emulator
- `npm run ios` - Open in iOS simulator (macOS only)
- `npm run web` - Open in web browser

### Application Flow

1. **Register**: Create a new user account
2. **Login**: Sign in with your created account
3. **Take Quiz**: Complete the movie taste test
4. **View Profile**: See your automatically generated profile

## 📡 API Documentation

### Authentication Endpoints

#### `POST /api/auth/register`
Register a new user.

**Request Body:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (201):**
```json
{
  "message": "User successfully registered!",
  "user": {
    "user_id": 1,
    "username": "john_doe",
    "email": "john@example.com",
    "created_at": "2024-01-01T00:00:00.000Z"
  }
}
```

#### `POST /api/auth/login`
User login.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "message": "Login successful!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "user_id": 1,
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

### Quiz Endpoints

#### `GET /api/quiz/questions`
Get quiz questions. (Token optional)

**Headers:**
```
Authorization: Bearer <token>  (Optional)
```

**Response (200):**
```json
[
  {
    "questionId": 1,
    "questionText": "What type of movies do you prefer?",
    "questionOrder": 1,
    "answers": [
      {
        "answerId": 1,
        "answerText": "Action"
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
Submit quiz answers and update user profile. (Token required)

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
  "message": "Quiz answers successfully submitted and your profile has been updated!",
  "profile": {
    "summary": "Your movie taste generally includes: action, thriller, adventure.",
    "tags": ["action", "thriller", "adventure", "drama", "emotional"]
  },
  "user": {
    "user_id": 1,
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

## 🗄️ Database Schema

### Tables

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

See `MovieRecommendationApp-Backend/database/schema.sql` for detailed schema.

## 🔧 Development

### Project Structure

```
MovieRecommendationApp/
├── src/
│   ├── components/          # Reusable components
│   ├── config/              # Configuration files
│   │   └── apiConfig.ts     # API URL configuration
│   ├── context/             # React Contexts
│   │   └── AuthContext.tsx  # Authentication context
│   ├── navigation/          # Navigation configuration
│   │   ├── AuthNavigator.tsx
│   │   └── MainAppNavigator.tsx
│   ├── screens/             # Screen components
│   │   ├── Auth/
│   │   │   ├── LoginScreen.tsx
│   │   │   └── RegisterScreen.tsx
│   │   └── Main/
│   │       ├── HomeScreen.tsx
│   │       └── QuizScreen.tsx
│   └── services/            # API services
│       ├── authService.ts
│       ├── quizService.ts
│       └── httpClient.ts
├── MovieRecommendationApp-Backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js        # Database connection
│   │   ├── middleware/
│   │   │   └── authMiddleware.js  # JWT verification
│   │   └── routes/
│   │       ├── authRoutes.js
│   │       └── quizRoutes.js
│   ├── database/
│   │   └── schema.sql       # Database schema
│   └── server.js            # Express server
├── App.tsx                  # Main application component
├── app.json                 # Expo configuration
└── package.json
```

### Code Standards

- **TypeScript**: All frontend code is written in TypeScript
- **ESLint**: ESLint is used for code quality
- **Async/Await**: async/await is preferred for promises
- **Error Handling**: All API calls are protected with try-catch

### Adding New Features

1. **New Screen**: Create a new folder under `src/screens/`
2. **Navigation**: Add route in `src/navigation/`
3. **API Endpoint**: Create new route in backend
4. **Service**: Add new service function in frontend

## 🐛 Troubleshooting

### Backend Connection Issues

**Problem**: PostgreSQL connection error
```
Solution: Check database credentials in .env file. Ensure PostgreSQL service is running.
```

**Problem**: Port already in use
```
Solution: Change PORT value in .env file or terminate the process using the port.
```

### Frontend Connection Issues

**Problem**: API requests failing
```
Solution: 
1. Ensure backend is running
2. Check EXPO_PUBLIC_API_URL environment variable
3. Mobile device and computer must be on same Wi-Fi network
4. Check firewall settings
```

**Problem**: App not opening in Expo Go
```
Solution:
1. Ensure Expo Go app is up to date
2. Run npm start again
3. Rescan QR code
4. Ensure Metro bundler is running
```

### Database Issues

**Problem**: Table not found error
```
Solution: Run schema.sql file to create database schema.
```

## 📝 Legal Notice

### ⚠️ Important Legal Information

**English:**

The source code of this project is made publicly available solely for review and educational purposes.

⚠️ **Cannot be copied, distributed, or used for commercial purposes.**

If you wish to use or license this project commercially, please contact me: **emrekurum07@hotmail.com**

© 2026 Emre KURUM. All Rights Reserved.

---

**Türkçe:**

Bu projenin kaynak kodu yalnızca inceleme ve eğitim amaçlı olarak kamuya açılmıştır.

⚠️ **Kopyalanamaz, dağıtılamaz veya ticari amaçlarla kullanılamaz.**

Bu projeyi ticari olarak kullanmak veya lisanslamak isterseniz, lütfen benimle iletişime geçin: **emrekurum07@hotmail.com**

© 2026 Emre KURUM. Tüm Hakları Saklıdır.

For full legal notice, see the [LICENSE](LICENSE) file.

## 👥 Contributors

- **Emre Kurum** - Project owner and developer

## 🙏 Acknowledgments

- React Native and Expo community
- All open-source library developers

---

**Note**: This project is for educational and development purposes. Additional security measures should be taken for production use.
