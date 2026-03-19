# 💬 ChatWave — Real-Time Chat Application

> **CodTech Internship | Full Stack Development | Task 2**

A real-time chat application built with **Node.js**, **Express**, and **Socket.IO**, featuring a modern dark-themed frontend with live messaging, typing indicators, and online user tracking.

---

## 🚀 Features

- **Real-time messaging** via WebSocket (Socket.IO)
- **Live typing indicators** — see when others are typing
- **Online users sidebar** — shows who's currently in the chat
- **Join/leave notifications** — system messages for user activity
- **Responsive UI** — works on desktop and mobile
- **No login required** — just enter a name and start chatting

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Node.js + Express |
| Real-time | Socket.IO (WebSocket) |
| Frontend | HTML5, CSS3, Vanilla JavaScript |

---

## 📁 Project Structure

```
chat-app/
├── public/
│   └── index.html      # Frontend (HTML + CSS + JS)
├── server.js           # Node.js + Socket.IO backend
├── package.json        # Dependencies
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js v16+ — https://nodejs.org

### Installation & Run

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/chat-app.git
cd chat-app

# 2. Install dependencies
npm install

# 3. Start the server
npm start
```

Open http://localhost:3000 in your browser.
To test multi-user chat, open multiple tabs or use different devices on the same network.

---

## 🔌 Socket Events

| Event | Direction | Description |
|-------|-----------|-------------|
| `user_join` | Client → Server | User enters with username |
| `chat_message` | Both | Send/receive messages |
| `typing` | Both | Typing indicator state |
| `user_list` | Server → Client | Updated online users list |
| `system_message` | Server → Client | Join/leave notifications |

---

## 🧠 Internship Details

- **Company:** CodTech IT Solutions
- **Task:** Task 2 — Chat Application
- **Deliverable:** Live chat app with frontend and backend integration (Socket.IO)

---

## 📝 License

MIT