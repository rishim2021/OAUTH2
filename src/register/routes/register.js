const express = require('express');

const db = require('../../../config/db');

const userModel = db.users;

const { Op } = require("sequelize");

const router  = express.Router();

const _ = require('lodash');

const bcrypt = require('bcrypt');


const { validate } = require('../middleware/validation');

router.get('/',async(req,res)=>{
    res.status(200).render('login',{register:1,login:0})
})

router.post('/',async(req,res)=>{
     let bodyData = req.body;
     console.log(bodyData)
     const { error }  = validate(bodyData)
     if(error) return res.status(400).send({Error:error.details[0].message})
     let User = await userModel.findOne({ where : {
         [Op.or]:[
        {UserEmail : bodyData.UserEmail },
        { UserPhone : bodyData.UserPhone }
     ]}
    })
     if(User) return res.status(302).send({msg:'Already Exists!!'})

     let userData = _.pick(bodyData,['UserName','UserEmail','UserPhone','UserPassword'])

     let salt = await bcrypt.genSalt(10);
     userData.UserPassword = await bcrypt.hash(userData.UserPassword,salt)


     let userFinalModel = await new userModel(userData);
     userFinalModel.save()
    
     console.log("sucessfully completed")
    res.status(200).render('login',{register:0,login:1,sucessMsg:1})
})


module.exports = router;