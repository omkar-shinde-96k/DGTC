const mongoose=require('mongoose')

mongoose.connect("mongodb+srv://omkarhanzla:dgtc@cluster0.lavvr.mongodb.net/dgtc?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true 
}).then(()=>{
    console.log("connection successful")
}).catch((err)=>{
    console.log("no connection")
})

// const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    lname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    gender: {
        type: String,
        required: true,
        trim: true
    },
    number: {
        type: Number,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    confpassword: {
        type: String,
        required: true,
        trim: true
    },
    tokens:[{
        token:{
            type: String ,
            required: true
        }
    }],
    role:{
        type:String,
        default:"student"
    },
    class:{
        type: String
    },
    faculty:{
        type:String
    }

    
});

// generating tokan 
studentSchema.methods.generateToken = async function () {  // we can't use here fat arrow coz we are using "this" keyword in this function
    try {
        const token = await jwt.sign({ _id:this._id}, "mynameisomkarpandurangshinde", { expiresIn: "999 days" })

        this.tokens = this.tokens.concat({token:token})
        await this.save();
 
        return token;
    } catch (error) {
        console.log(`tokan generating time error : ${error}`)
    }
}
 

const Register = new mongoose.model("Register", studentSchema)   // model 
module.exports = Register;
