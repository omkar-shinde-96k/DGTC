 
const jwt = require("jsonwebtoken");
const Register = require("../model/register.js")
var user="";
var auth = async (req, res, next) => {
      try {
            const token = req.cookies.jwt;   //get cookies
            const varifyuser=jwt.verify(token,"mynameisomkarpandurangshinde") 
        
            var user= await Register.findOne({_id:varifyuser._id})
            // console.log("show user detail "+user);
            next() ;
  
      } catch (error) {
            // res.status(401).send(` plz register or log in first  <br> <br>   ${error}`)
            res.redirect('login');
      }
}
 
 
module.exports =auth;
 