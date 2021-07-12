const express = require('express');
const winston = require('winston');
const app = new express();

require('./startup/routes')(app);


const port = process.env.PORT || 3000;

app.listen(port,()=>{
    winston.info(`Connected with port number ${port}`)
})


