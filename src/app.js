const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
require("./db/conn");
const Register = require("./model/register.js");
const dgtgroup = require("./model/dgtgroup.js");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const auth = require("./middleware/auth.js");

const host = "127.0.0.1";
const port = process.env.PORT || 8000;

const public_path = path.join(__dirname, '../public');
const template_path = path.join(__dirname, '../template/views');
const partials_path = path.join(__dirname, '../template/partials');

app.use(express.static(public_path));
app.set('view engine', 'hbs');   // Set the template engine as hbs
app.set('views', template_path); // Set the views directory
hbs.registerPartials(partials_path);

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cookieParser());

app.get('/', async(req, res) => {
         
    const user = ('Cookies: ', req.cookies.jwt)
    console.log(user)
  
     res.render('index' ,{user} )
});

app.get('/register', (req, res) => {
    res.status(200).render('register.hbs', { "content": "welcome" });
});

app.post('/register', async (req, res) => {     // register post 
    try {
        const password = req.body.password;
        const confpassword = req.body.confpassword;

        if (password === confpassword) {
            const saveinfo = new Register({
                name: req.body.name,
                lname: req.body.lname,
                email: req.body.email,
                number: req.body.number,
                gender: req.body.gender,
                class: req.body.class,
                password: await bcrypt.hash(password, 10),
                confpassword: await bcrypt.hash(password, 10)
            })

            const token = await saveinfo.generateToken();
            console.log(`tokan part ${token}`)

            res.cookie("jwt", token, {
                expires: new Date(Date.now() + 60 * 60 * 24 * 60),
                httpOnly: true
            });

            await saveinfo.save();
            res.status(201).render("index.hbs");

        } else {
            res.send("password not match")
        }

    } catch (err) {
        res.status(400).send(` post register try catch err ${err}`)
    }
})

app.get('/login', (req, res) => {
    res.status(200).render('login.hbs', {
    });
});

app.post('/login', async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        console.log(`your enterd pasword is ${password} and email is ${email}`);
        const userid = await Register.findOne({ email })
        const isMatch = await bcrypt.compare(password, userid.password)
        console.log(userid)
        const token = await userid.generateToken();

        res.cookie("jwt", token, {
            expires: new Date(Date.now() + 60 * 60 * 60 * 24 * 30),
            httpOnly: true
        })

        if (isMatch) {
            res.status(200).render('index');
            console.log("login successfully")
        } else {
            res.status(200).render('login', { errormsg: "Invalid login details" })
            console.log(`login unsuccessful`)
        }

    } catch (err) {
        res.status(400).send(`login post try catch err - ${err}`)
        console.log(`login post login catch error - ${err}`)
    }
})

app.get('/logout', (req, res) => {
    try {
        res.clearCookie("jwt")
    } catch (err) {
        res.send("logout error " + error)
    }
    res.status(200).render('index');
});

app.get('/chat',auth, async(req, res) => {
    const massage = await dgtgroup.find()
    // console.log(massage)
     res.render('bottom-nav/chat.hbs', { massage: massage})
});

app.get('/chat', async(req, res) => {
    const _id= "5fe1b5c7cc1caa0d24245029"
    const massage = await dgtgroup.find({_id})
    // console.log(massage)
     res.render('bottom-nav/chat.hbs', { massage: massage})
});

app.post('/chat', async (req, res) => {      
    try {
        const msg =req.body.msg
        const img =req.body.img
      
        const token = req.cookies.jwt;   //get cookies
        const varifyuser=jwt.verify(token,"mynameisomkarpandurangshinde") 
        var user= await Register.findOne({_id:varifyuser._id})


        const savemsginfo = new dgtgroup({
            msg: req.body.msg,
            name: user.name,
            img:req.body.img
        })

        await savemsginfo.save();
        res.redirect('chat');
      
    } catch (err) {
        res.status(400).send(` group msg try catch err ${err}`)
    }
})

app.get('/departments/bscit', (req, res) => {
    res.status(200).render('departments/bscit.hbs');
});

app.get('/departments/chemistry', (req, res) => {
    res.status(200).render('departments/chemistry.hbs');
});

app.get('*', (req, res) => {
    res.status(200).render('404.hbs');
});

app.listen(port, () => {
    // console.log(`The application started successfully on port ${port}`);
});



// register the all filds to the database  ->  convert password to hash =>  login form => jwt token => create Cookie when register -> create cookie when login -> get cookie value (cookie parcer) => Authentication => logout 