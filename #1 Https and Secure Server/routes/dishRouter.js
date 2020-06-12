const express = require('express')
const Dish = require('../model/Dish')

const app = express()

app.route('/(:id)?')
.get((req,res,next)=>{
    let query = {}

    if(req.params.id!=null) query._id=req.params.id

    Dish.find(query,(err,dishes)=>{
        if(err) return res.json({success:false, result:err})
        if(dishes.length==0) 
        {
            res.statusCode = 410
            return res.json({success:false,result:'Dish might be deleted'})
        }
        
        return res.json({success: true, result:dishes})
    })
})
.post((req,res,next)=>{

    if(req.params.id!=null){
        res.statusCode=405
        return res.json({success:false,result:'Method not Allowed Shouldn not include an id'})
    }

    Dish.create(
        {
            name:req.body.name,
            description:req.body.description,
        },
        (err,result)=>{
        if(err) return res.json({success:false, result:err})
        
        res.statusCode = 201
        return res.json({success:true,result:result})
    })

})
.put((req,res,next)=>{

    if(req.params.id==null) {
        res.statusCode=405
        res.json({success:false,result:'Method Not Valid Should Include Id'})
    }

    Dish.findByIdAndUpdate(req.params.id,{name:req.body.name,description:req.body.description},(err,result)=>{
        if(err) return res.json({success:false, result:err})
        return res.json({success:true,result:result})
    })
    
})
.delete((req,res,next)=>{
    if(req.params.id==null) {
        res.statusCode=405
        res.json({success:false,result:'Method Not Valid Should Include Id'})
    }   

    Dish.findByIdAndDelete(req.params.id,(err,result)=>{
        if(err) return res.json({success:false, result:err})
        return res.json({success:true,result:result})
    })
    
})

module.exports = app