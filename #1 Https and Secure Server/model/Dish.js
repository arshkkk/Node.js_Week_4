const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema= new Schema({
    author:{
        type:String,
        required:true,
    },
    rating:{
        type:Number,
        max:5,
        min:1,
        required:true
    }
},{
    timestamps:true
})


const dishSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    comments:{
        type: [commentSchema],
        default:[]
    }
},{
    timestamps:true
})

module.exports = mongoose.model('Dish',dishSchema)