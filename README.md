# Real-Time Chat Application

A basic real-time chat application built with Node.js, Express.js, MongoDB and Socket.IO. Automated tests use Mocha and Chai with Supertest.

## Features

- Express.js web server
- MongoDB message storage using Mongoose
- Real-time messages using Socket.IO
- REST endpoint for chat history
- Health-check endpoint
- Automated API tests
- Responsive basic interface

## Requirements

- Node.js
- npm
- MongoDB running locally or a MongoDB connection string

## Installation

```bash
npm install
```

Create a `.env` file if needed using `.env.example` as a reference.

## Run

Start MongoDB and then run:

```bash
npm start
```

Open:

```text
http://localhost:3000
```

## Run tests

```bash
npm test
```

## Suggested Git workflow

```bash
git init
git add .
git commit -m "Initial real-time chat application"
git branch feature-chat
git checkout feature-chat
git add .
git commit -m "Add chat functionality"
git checkout main
git merge feature-chat
```

This demonstrates repository initialization, commits, branching and merging.
