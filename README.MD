# Murmur

COMPANY : CODTECH IT SOLUTIONS

NAME : SAHAYA VARSHINI M J

INTERN ID : CTIS7104

DOMAIN : FULL STAACK WEB DEVELOPMENT

DURATION : 6 WEEKS

MENTOR : NEELA SANTOSH

A real-time chat application built with Node.js, Express, and Socket.io — CodTech Full Stack Internship Task 2.

---

## Overview

Murmur is a browser-based group chat application that lets multiple users exchange messages in real time across named rooms. Built entirely without a frontend framework, the client is a single HTML file that connects to a Node.js server over WebSockets using Socket.io. There are no page refreshes, no polling, and no external state management libraries — just a persistent bidirectional connection that delivers messages the moment they are sent.

The server maintains active user sessions and message history for each room in memory. When a user joins a room, they immediately receive the last 50 messages so the conversation has context. As users send messages, type, join, or leave, every connected client in the same room receives an update in real time.

The name Murmur reflects the design intention — a quiet, intimate space for conversation, styled with a dark editorial aesthetic using warm cream typography and gold accents rather than the typical dark mode colour palette.

---

## Features

- Real-time messaging over WebSocket via Socket.io
- Multiple chat rooms — join preset rooms or create any custom room by typing its name
- Live user presence strip showing everyone currently in the room
- Fading pulse typing indicator that appears when another user is composing a message
- Message history — the last 50 messages per room are stored in memory and delivered on join
- System notifications for when users join or leave
- Collapsible sidebar with a toggle button for more writing space
- Fully responsive — sidebar hides automatically on smaller screens
- No build step required — the client runs directly in the browser from a local HTML file

---

## Project Structure

```
task2/
├── .gitignore
├── README.md
├── server/
│   ├── server.js        Express + Socket.io backend
│   └── package.json     Server dependencies
└── client/
    └── index.html       Complete frontend in a single file
```

The entire frontend — HTML structure, CSS styling, and JavaScript logic — lives in a single `index.html` file. This was a deliberate choice to keep the project simple to deploy and demonstrate without requiring a build pipeline or a separate dev server for the client.

---

## Prerequisites

- Node.js v16 or higher
- npm (included with Node.js)

---

## Setup

### 1. Start the server

```bash
cd server
npm install
npm start
```

The server runs at `http://localhost:3001`. You should see the following message in the terminal once it starts:

```
🚀 Murmur server running on http://localhost:3001
```

### 2. Open the client

Open `client/index.html` in your browser by double-clicking it or dragging it into a browser window. No additional setup, bundling, or local server is needed for the client.

---

## Usage

On the login screen, enter a display name and select or type a room name. Preset options include General, Tech, Random, Gaming, Music, and Study. Clicking Enter the Room connects to the server and opens the chat interface.

Any two users who enter the same room name will be placed in the same conversation. To test the real-time features, open the same `index.html` in two separate browser tabs, use different names, and join the same room. Messages sent from one tab appear instantly in the other, the typing indicator activates as you type, and the user list updates as users join and leave.

The sidebar shows the current room name, how many users are present, and a list of everyone in the room. It can be collapsed using the menu button in the chat header to give more horizontal space to the message area.

---

## How It Works

When a client connects, it emits a `join` event with the username and room name. The server places the socket into a Socket.io room, stores the user in an in-memory map, and sends back the message history for that room. It then broadcasts a system message to all other users in the room and emits an updated user list to everyone.

When a message is sent, the server receives it, adds it to the room's history buffer (capped at 50 entries), and broadcasts it to every socket in that room. Typing events are forwarded to all other users in the room without being stored. On disconnect, the server removes the user from the active map and notifies the room.

---

## Socket.io Events

| Event | Direction | Description |
|-------|-----------|-------------|
| `join` | Client → Server | Join a room with a username |
| `send_message` | Client → Server | Send a message to the room |
| `typing` | Client → Server | Broadcast typing state (true or false) |
| `receive_message` | Server → Client | New message from another user |
| `system_message` | Server → Client | Join and leave notifications |
| `room_users` | Server → Client | Updated list of active users in the room |
| `message_history` | Server → Client | Last 50 messages delivered on join |
| `user_typing` | Server → Client | Typing indicator broadcast to other users |

---

## Design Notes

The UI is intentionally distinct from typical dark mode interfaces. The background is true black rather than dark grey, with warm cream text and gold hairline accents. Typography uses Cormorant Garamond for the brand name and message body — a serif typeface that gives the interface a refined, editorial character — paired with Jost for labels and metadata.

The typing animation uses three gold dots that fade in and out sequentially rather than the standard bouncing dot pattern, which fits the quieter tone of the interface.

---

## Author

Built for CodTech Full Stack Internship — Task 2.

---

## License

MIT