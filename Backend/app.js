//Sabse Phela environment package configure hona chaiye isliya isa phela likh rah ha
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const connectToDb = require('./db/db');
const http = require('http');
const port = process.env.PORT || 3000;

const server = http.createServer(app);
const  userRoutes = require('./routes/user.routes')
const captainRoutes = require('./routes/captain.routes');

connectToDb();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.get('/', (req, res)=>{
    res.send("my name is Dhruv");
});

app.use('/users', userRoutes);
app.use('/captains', captainRoutes);

server.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});


module.exports = app;