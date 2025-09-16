# Mars Rover Challenge

This repository contains a solution for the **Mars Rover coding challenge**.  
The implementation is done in **JavaScript** with **Jest** for unit testing.

---

## 🚀 Features

- **Part I**: Rover movement and direction handling (`NORTH`, `EAST`, `SOUTH`, `WEST`).  
- **Part II**: Obstacle detection and stopping the rover on collision.  
- **Part III**: Path planning – compute a sequence of commands to reach a target while avoiding obstacles.  

---

## 🛠️ Tech Stack

- JavaScript  
- Jest (unit testing)


## 📂 Project Structure
```bash

├── src
│   ├── rover.js         # Core rover logic (movement + obstacles) (Part I & Part II)
│   └── pathPlanner.js   # Path planning logic (Part III)
│
├── test
│   ├── rover.test.js        # Tests for movement & obstacles
│   └── pathPlanner.test.js  # Tests for path planning
│
├── package.json
├── package-lock.json
└── README.md
```

## ▶️ How to Run
```bash
npm install
npm test
```
