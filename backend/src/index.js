require('dotenv').config();
const createServer = require('./createServer');
const db = require('./db');

const server = createServer(); 

//TODO - use express middleware to handle cookies with JWT
//TODO use express middleware to populate current user

server.start({
  cors: {
    credentials: true,
    origin: process.env.FRONTEND_URL
  },
}, deets => {
  console.log(`Server is now running on port http://localhost:${deets.port}`)
}); 