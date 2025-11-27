# AI Summarizer - Full Stack Application

A full-stack web application that leverages AI to automatically summarize long texts into concise, meaningful summaries. Built with React, Node.js, Express, MongoDB, and integrated with Cohere's AI API.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Workflow](#workflow)
- [Usage Guide](#usage-guide)
- [Troubleshooting](#troubleshooting)
- [Future Enhancements](#future-enhancements)

## ✨ Features

- **AI-Powered Summarization**: Uses Cohere API to generate intelligent summaries
- **Text History**: Keeps track of all summarized texts and their summaries
- **Delete Functionality**: Remove unwanted summaries from history
- **Fallback Mechanism**: Local summarization algorithm as backup if API fails
- **Responsive UI**: Dark-themed, modern interface built with React
- **Database Persistence**: All summaries stored in MongoDB
- **Real-time Processing**: Instant summarization with loading states

## 🛠️ Tech Stack

### Frontend
- **React 19.2** - UI library
- **Vite 7.2** - Build tool and dev server
- **CSS3** - Styling (inline styles for simplicity)

### Backend
- **Node.js** - Runtime environment
- **Express 5.1** - Web framework
- **MongoDB 9.0** - Database
- **Mongoose 9.0** - ODM for MongoDB
- **Cohere API** - AI summarization engine
- **node-fetch 3.3** - HTTP client

### DevTools
- **ESLint** - Code quality
- **CORS 2.8** - Cross-origin resource sharing

## 📁 Project Structure

```
AI Summarization Full Stack/
│
├── backend/
│   ├── package.json
│   ├── server.js                 # Express server entry point
│   ├── .env                      # Environment variables
│   ├── config/
│   │   └── db.js                 # Database connection (optional)
│   ├── models/
│   │   └── SummaryModel.js       # MongoDB schema
│   ├── routes/
│   │   └── summarizerRoutes.js   # API route definitions
│   └── utils/
│       └── summarizer.js         # Summarization logic & API calls
│
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html                # Entry HTML file
│   ├── eslint.config.js
│   ├── public/
│   │   └── [static assets]
│   └── src/
│       ├── main.jsx              # React entry point
│       ├── App.jsx               # Main component
│       ├── App.css               # Styles
│       ├── index.css             # Global styles
│       └── assets/               # Images and resources
│
└── README.md                     # This file
```

## 📦 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher)
- **npm** (v7 or higher)
- **MongoDB** (local or cloud instance - MongoDB Atlas recommended)
- **Cohere API Key** (free tier available)

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd "AI Summarization Full Stack"
```

### 2. Install Backend Dependencies
```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

## ⚙️ Configuration

### 1. Get a Cohere API Key
1. Visit [Cohere Dashboard](https://dashboard.cohere.com/)
2. Sign up for a free account
3. Navigate to **API Keys** section
4. Copy your API key

### 2. Create MongoDB Instance
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster
4. Get your connection string (format: `mongodb+srv://username:password@cluster.mongodb.net/dbname`)

### 3. Set Environment Variables
Create a `.env` file in the `backend/` directory:

```env
# Database Configuration
MONGO_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/ai-summarizer

# API Keys
COHERE_API_KEY=your_cohere_api_key_here
GEMINI_API_KEY=your_gemini_key_here (optional)
HUGGINGFACE_API_KEY=your_huggingface_key_here (optional)

# Server Configuration
PORT=5000
```

**Note:** Do not commit `.env` file to version control. Add it to `.gitignore`.

## ▶️ Running the Application

### Start Backend Server
```bash
cd backend
npm install
node server.js
```

Expected output:
```
[dotenv] injecting env from .env
Server running on 5000
MongoDB Connected
```

### Start Frontend Dev Server (in new terminal)
```bash
cd frontend
npm install
npm run dev
```

Expected output:
```
VITE v7.2.4 ready in 974 ms
➜ Local: http://localhost:5173/
```

### Access the Application
Open your browser and navigate to: **http://localhost:5173**

## 🔌 API Endpoints

### POST `/api/summarize`
Summarize a given text

**Request:**
```json
{
  "text": "Your long text here..."
}
```

**Response:**
```json
{
  "_id": "mongo_object_id",
  "text": "Your long text here...",
  "summary": "Condensed summary of the text",
  "createdAt": "2025-11-27T10:30:00.000Z"
}
```

### GET `/api/summarize`
Fetch all summarized texts and their summaries

**Response:**
```json
[
  {
    "_id": "mongo_object_id",
    "text": "Original text...",
    "summary": "Summary text...",
    "createdAt": "2025-11-27T10:30:00.000Z"
  }
]
```

### DELETE `/api/summarize/:id`
Delete a specific summary by ID

**Response:**
```json
{
  "success": true
}
```

## 🔄 Workflow

### Complete User Journey

1. **User Opens Application**
   - Frontend loads from `http://localhost:5173`
   - App makes GET request to fetch history from backend
   - MongoDB returns all previous summaries

2. **User Enters Text**
   - User pastes long text into textarea
   - Text is stored in React state

3. **User Clicks Summarize**
   - Frontend sends POST request with text to backend
   - Backend receives text via `/api/summarize` endpoint

4. **Backend Processing**
   - Validates text input
   - Attempts to call Cohere API with the text
   - Cohere processes and returns summary
   - If Cohere fails, fallback to local algorithm
   - Summary is saved to MongoDB

5. **Response to Frontend**
   - Backend returns saved document (with summary)
   - Frontend displays summary in UI
   - Frontend refreshes history automatically

6. **History Management**
   - All summaries appear in History section
   - User can delete any summary
   - Delete triggers MongoDB removal and UI update

### Data Flow Diagram

```
User Input (React)
       ↓
API Request (POST /api/summarize)
       ↓
Express Route Handler
       ↓
Summarizer Utility
       ├→ Cohere API Call
       └→ Local Fallback
       ↓
MongoDB Save
       ↓
JSON Response to Frontend
       ↓
Display in UI + History
```

## 💻 Usage Guide

### How to Summarize Text

1. **Paste Your Text**
   - Copy any long text (article, story, document, etc.)
   - Paste it into the textarea
   - Minimum text length: 3+ sentences recommended

2. **Click Summarize Button**
   - Button shows "Summarizing..." while processing
   - Wait for AI to process (typically 2-5 seconds)

3. **View Summary**
   - Summary appears below the input
   - Original gets added to History section

4. **Manage History**
   - Scroll down to see all previous summaries
   - Click "Delete" button to remove any summary
   - History persists in database

## 🐛 Troubleshooting

### Issue: "Failed to fetch" Error

**Solution:**
- Ensure backend is running on port 5000
- Check if MongoDB connection string is correct
- Verify .env file exists with correct variables

```bash
# Restart backend
cd backend
node server.js
```

### Issue: "Summarization failed" Error

**Solution:**
- Check if Cohere API key is valid
- App will automatically use local fallback
- Check backend console for error details

### Issue: MongoDB Connection Error

**Solution:**
- Verify MONGO_URI in .env file
- Ensure MongoDB cluster is active
- Check if IP whitelist allows your connection
- Test connection string with MongoDB Compass

### Issue: Port Already in Use

**Solution:**
```bash
# For Windows (find and kill process on port 5000)
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# For Mac/Linux
lsof -i :5000
kill -9 <PID>
```

### Issue: Frontend Not Connecting to Backend

**Solution:**
- Ensure both servers are running (separate terminals)
- Check CORS is enabled in Express (it is)
- Verify no firewall blocking localhost:5000
- Check browser console for specific error

## 📊 Database Schema

### Summary Collection

```javascript
{
  _id: ObjectId,
  text: String,           // Original input text
  summary: String,        // Generated summary
  createdAt: Date         // Timestamp
}
```

## 🎯 Future Enhancements

- [ ] User authentication and personal summary collections
- [ ] Multiple summarization lengths (short/medium/long)
- [ ] Export summaries as PDF/Word documents
- [ ] Share summaries via link
- [ ] Batch summarization for multiple files
- [ ] API rate limiting and usage analytics
- [ ] Dark/Light theme toggle
- [ ] Multiple language support
- [ ] Mobile app version
- [ ] Email digests of summarized content

## 📝 Notes

- **API Key Security**: Never commit `.env` to git. Add to `.gitignore`
- **Local Fallback**: If Cohere API is down, app uses local algorithm
- **Database Backup**: Regularly backup MongoDB data
- **Performance**: For texts > 5000 words, consider summarization in chunks

## 📄 License

This project is open source and available for educational purposes.

## 👥 Support

For issues or questions:
1. Check the Troubleshooting section
2. Review backend logs: `cd backend && node server.js`
3. Check browser console for frontend errors
4. Verify all environment variables are set correctly

---

**Happy Summarizing! 🚀**

Last Updated: November 27, 2025
