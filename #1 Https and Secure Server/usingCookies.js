const express = require('express')
const morgan = require('morgan')
const bodyParser= require('body-parser')
const cookieParser = require('cookie-parser')

const app = express()



const dishRouter= require('./routes/dishRouter')
const promoRouter = require('./routes/promoRouter')
const leaderRouter= require('./routes/leaderRouter')

express.urlencoded()

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser('secret'))


const requestAuth = (req,res,next,message)=>{

    res.setHeader('www-Authenticate','Basic')
    res.statusCode=401
    next(new Error(message))

}


app.use((req,res,next)=>{

    console.log(req.headers)
    console.log(req.signedCookies)

    if(req.signedCookies.data){
        if(req.signedCookies.data.user==='username'&&req.signedCookies.data.pass==='password')
        next()
        else{
            res.clearCookie('data');
            requestAuth(req,res,next, 'cookies expired')
        }
    }
    else{

        if(req.headers.authorization){

            const authHeader = req.headers.authorization;
    
            const base64String = authHeader.split(' ')[1];
    
            const normalString = new Buffer.from(base64String,'base64').toString()
    
            console.log(normalString)
    
            const username = normalString.split(':')[0];
            const password = normalString.split(':')[1];
    
            if(username==='username'&&password==='password'){
    
                res.cookie('data',{user:username, pass:password},{signed:true})
    
                next()
    
            }
            else {
    
                requestAuth(req,res,next,'username or password is not correct')
    
            }
    
        }
        else
        {
            requestAuth(req,res,next,'please Authenticate yourself')
          
        }
      
    }
   

})


app.use('/dishes',dishRouter);
app.use('/promotions',promoRouter)
app.use('/leaders',leaderRouter)



app.listen(3000)