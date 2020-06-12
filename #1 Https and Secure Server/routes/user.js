const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport') 

const path = require('path')

const User = require('../model/user')
const authenticate = require('../authenticate')



app.post('/signup',(req,res,next)=>{

    User.register(new User({username:req.body.username}),req.body.password,(err,user)=>{
        if(err){
            res.statusCode=500
            res.json({err:err})
            return
        }

        passport.authenticate('local')(req,res,()=>{
            res.statusCode=200
            res.json({success:true,status:'Registration Successful',user:user})
        })
        
    })  

})



app.post('/login',passport.authenticate('local',{session:false}),(req,res,next)=>{

    const token = authenticate.getToken({_id:req.user._id})

    res.json({success:true, token:token})
})

app.get('/login',(req,res,next)=>{
res.sendFile(path.join(__dirname,'index.html'))
})


app.get('/logout',(req,res,next)=>{
    req.session.destroy()
    res.clearCookie('session-id')
    res.redirect('/user/login')
})

module.exports = app
