const express= require('express');
const app= express()
const cors= require('cors')
const userRoutes = require('./routes/user.routes')
const cookieParser = require('cookie-parser');
const captainRoutes = require('./routes/captain.routes')

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/users', userRoutes)
app.use('/captain',captainRoutes)
app.use('/captains',captainRoutes)
app.get('/',(req,res) =>{
    res.status('Hello world')
})

module.exports= app;


