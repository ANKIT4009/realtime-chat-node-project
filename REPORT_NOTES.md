# Project Documentation Notes

## Project objective
Build a basic web-based real-time chat application using Node.js, Express.js, MongoDB and Socket.IO.

## Architecture
- Browser client: HTML, CSS and JavaScript
- Express: serves the web application and REST endpoints
- Socket.IO: provides real-time two-way communication
- Mongoose: connects the application to MongoDB and defines the message schema
- MongoDB: stores chat messages
- Mocha, Chai and Supertest: automated API testing

## Main flow
1. A user enters a name and message.
2. The browser sends the message through Socket.IO.
3. The Express/Socket.IO server validates the basic input.
4. The message is stored in MongoDB.
5. The server broadcasts the saved message to connected clients.
6. The browser displays the new message immediately.
7. Existing messages can be loaded through `/api/messages`.

## Testing
The test suite checks the health endpoint and the JSON response behavior of the messages endpoint.

## Version control demonstration
The README includes a sample Git workflow showing repository initialization, commits, branch creation, checkout and merging.
