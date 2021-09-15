const dotenv = require('dotenv')
const mongoose = require('mongoose')
const express = require('express')



const cookieParser = require('cookie-parser')
const myParser = require('body-parser')
const app = express();

dotenv.config({path:'./config.env'});
require('./db/conn');

// app.use(express.json());
app.use(cookieParser());
app.use(myParser.json({limit: '200mb'}));
app.use(myParser.urlencoded({limit: '200mb', extended: true}));
app.use(myParser.text({ limit: '200mb' }));




app.use(require('./router/auth'));

const User = require('./model/userSchema')
const PORT = process.env.PORT;


app.listen(PORT, ()=>{
    console.log(`server is running at port no ${PORT}`);
})