const loginService = require("../src/login/routes/login");

const express = require('express');

const path = require('path');

const db = require('../config/db');

const registerService = require('../src/register/routes/register');

const cookieParser = require("cookie-parser")

module.exports = (app) =>{
    require('dotenv').config({path:__dirname +'./config/.env'})
    db.sequelize.sync()
    app.use(express.json())
    app.use(express.urlencoded({extended:false}))
    app.use(cookieParser())
    app.use(express.static('assets'));
    app.set('view engine', 'ejs');
    app.use('/login',loginService)
    app.use('/register',registerService)
    app.get('/',async(req,res)=>{
        res.status(200).send('Welcome home !');
    })
  
}