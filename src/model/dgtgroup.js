const mongoose=require('mongoose')

mongoose.connect("mongodb://localhost:27017/dgtc",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true 
}).then(()=>{
    console.log("connection successful")
}).catch((err)=>{
    console.log("no connection")
})
 
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

const groupSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    msg: {
        type: String,
        trim: true
    }, 
    img: { 
        data: Buffer, 
        contentType: String 
     }
});

const dgtgroup = new mongoose.model("dgtgroup", groupSchema)   // model 
module.exports = dgtgroup;

