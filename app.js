// const express = require('express');
// const mongoose = require('mongoose');
// const authRoutes = require('./routes/authRoutes');
// const cookieParser = require('cookie-parser');
// const { requireAuth, checkUser } = require('./middleware/authMiddleware');

// const app = express();

// // middleware
// app.use(express.static('public'));
// app.use(express.json()); // converts our json data that comes with request and chnages to javascript object
// app.use(cookieParser());


// // view engine
// app.set('view engine', 'ejs');

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//   next();
// })

// // convert form data to javascript object and put into request body
// app.use(express.urlencoded({extended: false}))


// // database connection
// //const dbURI = 'mongodb+srv://netninja:test1234@cluster0.del96.mongodb.net/node-auth';
// const dbURI = 'mongodb+srv://chidi:test1234@cluster0.wojwcap.mongodb.net/node-auth';
// mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
//   .then((result) => app.listen(3000), ()=>{
//     console.log("listening on port 3000")
//   })
//   .catch((err) => console.log(err));

// // routes
// app.get('*', checkUser); // * means apply to all routes
// app.get('/', (req, res) => res.render('home'));
// app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));

// app.use(authRoutes);

//cookies
// app.get('/set-cookies', (req, res)=>{
//   //res.setHeader('Set-Cookie', 'newUser=true');
//   res.cookie('newUser', false);
//   res.cookie('isEmployee', true, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true })

//   res.send('you got the cookies!');
// });

// app.get('/read-cookies', (req, res)=>{

//   const cookies = req.cookies;
//   console.log(cookies.newUser);
//   res.json(cookies);
// });

const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

const app = express();

// middleware
//app.use(express.static('public'));
app.use(express.json()); // converts our json data that comes with request and chnages to javascript object
app.use(cookieParser());





// view engine
//app.set('view engine', 'ejs');

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader('Content-Security-Policy', "default-src 'self'");
  next();
})

// convert form data to javascript object and put into request body
app.use(express.urlencoded({extended: false}))


// database connection
//const dbURI = 'mongodb+srv://netninja:test1234@cluster0.del96.mongodb.net/node-auth';
const dbURI = 'mongodb+srv://chidi:test1234@cluster0.wojwcap.mongodb.net/workspace-auth';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(7000), ()=>{
    console.log("listening on port 7000")
  })
  .catch((err) => console.log(err));

// routes
app.get('*', checkUser); // * means apply to all routes
//app.get('/', (req, res) => res.send("home"));
app.get('/', (req, res) => res.redirect('http://127.0.0.1:5500/index.html'));
//app.get('/signup', (req, res) => res.send("home"));
app.get('/coworker', requireAuth, (req, res) => res.redirect('http://127.0.0.1:5500/coworker.html'));
app.get('/owner', requireAuth, (req, res) => res.redirect('http://127.0.0.1:5500/headpage.html'));
app.use(authRoutes);


