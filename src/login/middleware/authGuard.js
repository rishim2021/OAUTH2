const jwt = require("jsonwebtoken");
const jwtKey = "myJwtSecretKey";

const auth = (req,res,next)=>{
   const token = req.cookies.token;

   if(!token) return res.status(404).redirect('/login')

   let payload  = jwt.verify(token,jwtKey);

   if(!payload) return res.status(404).redirect('/login')

   return next();
}


module.exports = auth;