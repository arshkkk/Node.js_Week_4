
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const passport = require('passport')
const https = require('https')
const LocalStrategy = require('passport-local').Strategy
const fs = require('fs')

const app = express()

const User = require('./model/user')
const config = require('./config')


mongoose.connect(`${config.mongoUrl}/Users`)

const dishRouter= require('./routes/dishRouter')
const promoRouter = require('./routes/promoRouter')
const leaderRouter= require('./routes/leaderRouter')
const userRouter = require('./routes/user')

app.use((req,res,next)=>{
    console.log('in middleware')
    if(req.secure)  next()
    else{
        res.redirect(307,`https://${req.hostname}:${config.portNumber+443}${req.url}`)
    }
    
})

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))



passport.use(new LocalStrategy(User.authenticate()))
app.use(passport.initialize())


app.use('/user',userRouter)



app.use('/dishes',dishRouter);
app.use('/promotions',promoRouter)
app.use('/leaders',leaderRouter)


app.listen(config.portNumber)

//Secure Server
options={
	key: fs.readFileSync(__dirname+'/private.key'),
	cert:fs.readFileSync(__dirname+'/certificate.pem')
}

https.createServer(options,app).listen(config.portNumber+443)
