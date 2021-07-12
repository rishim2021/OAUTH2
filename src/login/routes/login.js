
const express = require('express');

const router  = express.Router();

const db = require('../../../config/db');

const userModel = db.users;

const { validate } = require('../middleware/validation');
 
const auth = require('../middleware/authGuard');

const user = require('../../../common/models/user');

const jwt = require("jsonwebtoken");

const axios = require('axios');

const secretKey = {
    "gitSecret": process.env.GIT_SECRETKEY,
    "gitAcesstoken" : process.env.GIT_ACESSTOKEN
}


router.get('/',async(req,res)=>{
    
    let gitUrl = `https://github.com/login/oauth/authorize?client_id=${secretKey.gitSecret}&redirect_uri=http://localhost:3000/login/oauth/redirect`;

    console.log(gitUrl)

    res.status(200).render('login',{ layout:false,name:'Akashdeep',login:1,register:0 , gitUrl : gitUrl });
})

router.get('/oauth/redirect',async(req,res)=>{
    const requestToken = req.query.code;

    let fetchData = await axios({
        method:'post',
        url:`https://github.com/login/oauth/access_token?client_id=${secretKey.gitSecret}&client_secret=${secretKey.gitAcesstoken}&code=${requestToken}`,
        headers: {
            accept: 'application/json'
       }
    }).catch(e=>{
        if(e) throw e;
    })
    
    let fetchToken = fetchData.data.access_token;

    res.status(200).redirect(`/login/home/${fetchToken}`);
})


router.get('/home/:id',async(req,res)=>{

    let paramId = req.params.id;

    let fetchData = await axios({
        method:'get',
        url: 'https://api.github.com/user',
        headers: {
            Accept: "application/vnd.github.v3+json",
            Authorization: 'token ' + paramId
        }
    }).catch(e=>{
        res.status(404).send("Not found.")
    })

    let userData = fetchData.data;
    console.log(userData);
    // ,
    res.status(200).render('home',{ userData : userData })
})


router.get('/logout',async(req,res)=>{
    res.clearCookie('connect.sid')
    res.clearCookie('token')
    res.status(200).redirect('/login')

})












module.exports = router;