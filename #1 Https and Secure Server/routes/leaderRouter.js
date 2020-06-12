const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())


app.route('/(:id)?')
.all((req,res,next)=>{

    res.setHeader('Content-Type','text/plain')
    res.statusCode=200

    next()
})
.get((req,res)=>{
    if(req.params.id){
        res.send(`Getting leader with Id: ${req.params.id}`)
    }
    else
    res.send("Getting all leaders")
})
.post((req,res)=>{
    if(req.params.id){
        req.statusCode=403
        res.send(`Post method not Allowed having some ID=== name: ${req.body.name} and description: ${req.body.description}`)
    }
    else
    res.send(`Saving leader with name: ${req.body.name} and description: ${req.body.description}`)
})
.put((req,res)=>{
    if(req.params.id){
        res.send(`Updating leader with Id: ${req.params.id} with new name: ${req.body.name} and new description: ${req.body.description}`)
    }
    else{
        res.statusCode=403
        res.send(`Put Method not allowed for updating new name: ${req.body.name} and new description: ${req.body.description}`)

    }
})
.delete((req,res)=>{
    if(req.params.id){
        res.end(`Deleting leader with ID: ${req.params.id}`)
    }
    else
    res.send('Deleting all leaders')
})

module.exports = app