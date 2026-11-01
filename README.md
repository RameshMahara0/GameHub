# 🎮 GameHub - Web Mini-Game Portal

A clean, responsive, multi-page web application featuring a collection of classic browser games. This project was built strictly for **learning and practice purposes** to demonstrate core fundamentals of web development using vanilla HTML, CSS, and JavaScript without external libraries or frameworks.

---

## 🌐 Live Demo

You can try the live version of **GameHub** here:
**[https://RameshMahara0.github.io/GameHub/](https://RameshMahara0.github.io/GameHub/)**

---

## ✨ Features & Games Included

- **🎮 Multi-Page Navigation:** Modular design where each game exists in its own dedicated folder with separate HTML, CSS, and JS files.
- **❌ Tic-Tac-Toe (`/games/tictactoe/`):** 3x3 strategy grid supporting 2-player pass-and-play and single-player vs AI mode, complete with winning line animations and end-game banners.
- **🧠 Memory Card Match (`/games/memory/`):** Interactive card-matching game featuring colorful animal emojis, move trackers, and pair counters.
- **✂️ Rock Paper Scissors (`/games/rps/`):** Animated Best-of-3 hand game against the computer with round shaking animations, score tracking, and auto-reset rounds.
- **❓ Trivia Quiz (`/games/quiz/`):** Multiple-choice trivia quiz with real-time feedback, score tallies, and final performance summaries.
- **🔒 Upcoming Features:** Styled placeholder cards for future mini-game additions.

---

## 🛠️ Built With

* **HTML5:** Semantic structural layout and multi-page linking.
* **CSS3:** Custom flexbox/grid layouts, responsive media queries, CSS animations, and theme styling.
* **JavaScript (Vanilla ES6):** DOM manipulation, state management, array logic, timer/interval functions, and simple AI turn logic.

---

## 📁 Project Folder Structure

```text
GameHub/
├── index.html          # Main Portal Homepage
├── style.css           # Global Homepage Styles
├── script.js          # Homepage Logic
└── games/
    ├── tictactoe/
    │   ├── index.html  # Tic-Tac-Toe Game Page
    │   ├── style.css   # Blue Theme Styles
    │   └── script.js   # Game & Win Logic
    ├── memory/
    │   ├── index.html  # Memory Match Game Page
    │   ├── style.css   # Green Theme Styles
    │   └── script.js   # Card Shuffle & Match Logic
    ├── rps/
    │   ├── index.html  # Rock Paper Scissors Game Page
    │   ├── style.css   # Orange Theme Styles
    │   └── script.js   # Round Shake & Best-of-3 Logic
    └── quiz/
        ├── index.html  # Trivia Quiz Game Page
        ├── style.css   # Purple Theme Styles
        └── script.js   # Question Array & Quiz Logic
