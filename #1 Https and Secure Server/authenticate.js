const jwt = require('jsonwebtoken')

const config = require('./config')


exports.getToken = (user)=>{

    return jwt.sign(user,config.secretKey,{expiresIn:360})
}



const getJwtTokenFromRequest= (req)=>{
  
    const token = req.headers.authorization.split(' ')[1]
    return token
    
}


exports.verifyUser = (req,res,next)=>{
    const token = getJwtTokenFromRequest(req)
    // console.log(token)
    jwt.verify(token,config.secretKey,(err,user)=>{
        if(err) return res.json({success:false, result: err})
        // console.log(user)
        next()

        
    })
}
