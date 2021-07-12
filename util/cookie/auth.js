function auth(req, res, next) {
  let cookie_Stuff=req.signedCookies.user
  console.log(cookie_Stuff)

  if(!cookie_Stuff)//True for our case
      {
          let auth_Stuff=req.headers.authorization
          console.log(auth_Stuff)
          if(!auth_Stuff)//No authentication info given
          {
              res.setHeader("WWW-Authenticate", "Basic")
              res.sendStatus(401).send('Unauthorized !')
          }
          else
        {
            step1=new Buffer.from(auth_Stuff.split(" ")[1], 'base64')

            step2=step1.toString().split(":")

            if(step2[0]=='admin' && step2[1]=='admin')
            {

                console.log("WELCOME ADMIN")
                res.cookie('user', 'admin', {signed: true})
                next()
            }
            else
            {

                res.setHeader("WWW-Authenticate", "Basic")
                res.sendStatus(401).send('Unauthorized !')
            }
        }
    }
    else
    {//Signed cookie already stored
        if(req.signedCookies.user=='admin')
        {
            console.log("next stage")
            next();
        }
        else
        {
     //Wrong info, user asked to authenticate again
            res.setHeader("WWW-Authenticate", "Basic")
            res.sendStatus(401).send('Unauthorized !')
        }
    }

}

module.exports = auth;