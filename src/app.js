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
const multer = require('multer');
const eq = require('ember-truth-helpers')
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

app.get('/', async (req, res) => {

    const user = ('Cookies: ', req.cookies.jwt)
    console.log(user)

    res.render('index', { user })
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
                faculty: req.body.faculty,
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
});

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

var Storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/dgtcuploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
    }
})

var upload = multer({
    storage: Storage
}).single('file');

app.get('/chat', auth, async (req, res) => {
    const massage = await dgtgroup.find()

    const token = req.cookies.jwt;   //get cookies
    const varifyuser = jwt.verify(token, "mynameisomkarpandurangshinde")
    var user = await Register.findOne({ _id: varifyuser._id })
    res.render('bottom-nav/chat.hbs', { massage: massage, userhbs: user.id })
});

app.post('/chat', upload, async (req, res) => {
    try {
        const token = req.cookies.jwt;   //get cookies
        const varifyuser = jwt.verify(token, "mynameisomkarpandurangshinde")
        var user = await Register.findOne({ _id: varifyuser._id })
        if (req.file) {
            uploadit = req.file.filename;
        } else {
            uploadit = "";
        }
        const savemsginfo = new dgtgroup({
            msg: req.body.msg,
            name: user.name,
            file: uploadit
        })
        await savemsginfo.save();
        res.redirect('chat');
    } catch (err) {
        res.status(400).send(` group msg try catch err ${err}`)
    }
})

app.get('/chat/:id', async (req, res) => {
    try {
        console.log(req.params.id)
        const deletedmsg = await dgtgroup.findByIdAndDelete(req.params.id)
        if (!req.params.id) {
            return res.status(400).send();
        }
        console.log("this msg is deleted" + deletedmsg)
        res.redirect("/chat");
    } catch (error) {
    }
});


// Departments

app.get('/bscit', (req, res) => {
    res.status(200).render('departments/bscit.hbs');
});

app.get('/Bsc', (req, res) => {
    res.status(200).render('departments/chemistry.hbs');
});

app.get('/BA', (req, res) => {
    res.status(200).render('departments/arts.hbs');
});

app.get('/Bcom', (req, res) => {
    res.status(200).render('departments/Bcom.hbs');
});

app.get('/BMS', (req, res) => {
    res.status(200).render('departments/BMS.hbs');
});

app.get('/jr-science', (req, res) => {
    res.status(200).render('departments/jr-sci.hbs');
});

app.get('/jr-commerce', (req, res) => {
    res.status(200).render('departments/jr-com.hbs');
});

app.get('/hindi', (req, res) => {
    res.status(200).render('departments/hindi');
});

app.get('/omkar', (req, res) => {
    res.status(200).render('departments/hindi');
});

app.get('/ma-his', (req, res) => {
    res.status(200).render('departments/ma-hindi');
})

app.get('/ma-marathi', (req, res) => {
    res.status(200).render('departments/ma-hindi');
})

app.get('/msc-it', (req, res) => {
    res.status(200).render('departments/msc-it');
})

app.get('/msc-it', (req, res) => {
    res.status(200).render('departments/msc-it');
})

app.get('/msc-chemistry', (req, res) => {
    res.status(200).render('departments/msc-chemistry');
})


//teaching - non teaching staff

app.get('/teaching-staff', (req, res) => {
    res.status(200).render('staff/teach-staff');
})

app.get('/non-teaching-staff', (req, res) => {
    res.status(200).render('staff/non-teach-staff');
})


//  other pages

app.get('/admission', (req, res) => {
    res.status(200).render('otherpages/admission.hbs');
});

app.get('/features', (req, res) => {
    res.status(200).render('otherpages/features.hbs');
});

app.get('/executive', (req, res) => {
    res.status(200).render('otherpages/executive.hbs');
});

app.get('/vision', (req, res) => {
    res.status(200).render('otherpages/vision.hbs');
});

app.get('/naac', (req, res) => {
    res.status(200).render('otherpages/naac.hbs');
});

app.get('/features', (req, res) => {
    res.status(200).render('otherpages/features.hbs');
});

app.get('/features', (req, res) => {
    res.status(200).render('otherpages/features.hbs');
});

app.get('/cdcmember', (req, res) => {
    res.status(200).render('otherpages/cdcmember.hbs');
});

app.get('/courses', (req, res) => {
    res.status(200).render('otherpages/courses.hbs');
});

app.get('/certification', (req, res) => {
    res.status(200).render('otherpages/certification.hbs');
});

app.get('/facilities', (req, res) => {
    res.status(200).render('otherpages/facilities.hbs');
});

app.get('/library', (req, res) => {
    res.status(200).render('otherpages/library.hbs');
});



// ******************** dlle ********************

app.get('/faculty-member', (req, res) => {
    res.status(200).render('dlle/faculty-member.hbs');
});


// ******************** NSS ********************

app.get('/nss', (req, res) => {
    res.status(200).render('NSS/nss.hbs');
});












































































app.get('*', (req, res) => {
    res.status(404).render('404.hbs');
});

app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});











// register the all filds to the database  ->  convert password to hash =>  login form => jwt token => create Cookie when register -> create cookie when login -> get cookie value (cookie parcer) => Authentication => logout 

// register the all filds to the database  ->  convert password to hash =>  login form => jwt token => create Cookie when register -> create cookie when login -> get cookie value (cookie parcer) => Authentication => logout 
