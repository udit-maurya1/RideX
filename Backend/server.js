require('dotenv').config();
const http= require ('http');
const app = require ('./src/app')
const port = process.env.PORT || 3000
const connectToDb = require('./src/db/db')

connectToDb();
const server = http.createServer(app);

server.listen(port , () =>{
    console.log(`seerver is running on port ${port}`);
});
