# 🎬 PickFlick

Pick a movie by choosing an emoji that matches your mood.  
A fun, interactive React app built with **Vite** and **Tailwind CSS**, integrating the **Streaming Availability API** to surface real‑time movie info and where to watch it.

---

## 🚀 Features

### 🎭 Emoji‑based mood selection
Users tap an emoji that represents how they feel — happy, sad, romantic, chaotic, adventurous, etc.

### 🎯 Smart movie recommendations
Each mood maps to curated genres and themes, returning relevant movie suggestions.

### 📡 Real‑time streaming availability
Powered by the Streaming Availability API, showing:
- Movie title & poster  
- Overview  
- Ratings  
- Where it’s currently streaming  

### ⚡ Fast, modern frontend stack
Built with React, Vite, and Tailwind for a smooth developer experience.

### 📱 Responsive, clean UI
Mobile‑first layout with smooth transitions and emoji‑driven interactions.

---

## 🧰 Tech Stack

| Category | Tools |
|---------|--------|
| Framework | React |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| API | Streaming Availability API |
| State Management | React Hooks |
| Deployment | Vercel |

---

## 📦 Installation

### Clone the repo
```bash
git clone https://github.com/Sabeen44/Pick-Flick.git
cd pickflick
```

### Install dependencies
```bash
npm install
```

### Start the dev server
```bash
npm run dev
```

---

## 🔑 Environment Variables

Create a `.env` file in the project root:

```
VITE_STREAMING_API_KEY=your_api_key_here
```

You can get an API key from the Streaming Availability API provider.

---

## 🖼️ How It Works

1. User selects an emoji representing their mood  
2. App maps that mood to one or more genres  
3. A request is sent to the Streaming Availability API  
4. Movies are displayed with posters, descriptions, and streaming platforms  
5. User clicks a movie to view more details or jump to the streaming service  

---

## 🛠️ Future Enhancements

- Add TV show recommendations  
- Add user favorites list  
- Add mood intensity slider  
- Add dark/light theme toggle  
- Add AI‑generated recommendations based on user history  
