import express from "express";
// import handlebars from 'hbs';
import exphbs from "express-handlebars";
import path from "path";
import session from "express-session";
import alert from 'alert';


import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import {findUser,newUser} from './model/model_lite.js'; 

console.log(newUser);


// Δημιουργία εξυπηρετητή Express
const app = express();


//Διαμόρφωση του εξυπηρετητή
app.engine('hbs', exphbs.engine({extname: 'hbs', defaultLayout: 'main', layoutsDir:__dirname + '/views/layouts'}));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));




// Προσθήκη του express-session middleware
app.use(session({
    name: process.env.SESS_NAME,
    secret: process.env.SESSION_SECRET || "PynOjAuHetAuWawtinAytVunar", // κλειδί για κρυπτογράφηση του cookie
    resave: false, // δεν χρειάζεται να αποθηκεύεται αν δεν αλλάξει
    saveUninitialized: false, // όχι αποθήκευση αν δεν έχει αρχικοποιηθεί
    cookie: {
      maxAge: 2*60*60*1000, //TWO_HOURS χρόνος ζωής του cookie σε ms
      sameSite: true
    }
  }));

const redirectHome = (req, res, next) => {
console.log('redirect...', req.session)
if (!req.session.userID) {
res.redirect('/');
} else {
next();
} };

console.log(process.env.PORT)
// Εκκίνηση του εξυπηρετητή
const PORT = process.env.PORT || 3003
app.listen(PORT, ()=> {
    console.log(`Συνδεθείτε στη σελίδα: http://localhost:${PORT}`);
});


app.get("/", (req, res) => {
  console.log("GET / session=", req.session);
  res.render("menu");
});


app.get("/aboutus", (req, res) => {
    console.log("GET /aboutus session=", req.session);
    res.render("aboutus");
  });
  
app.get('/menu', function(req, res) {
  
  console.log("GET /menu session=", req.session);
  res.render("menu");
});
app.get("/restaurant", (req, res) => {
    console.log("GET /restaurant session=", req.session);
    res.render("restaurant");
});

app.get("/contact", (req, res) => {
    console.log("GET /contact session=", req.session);
    res.render("contact");
});
    
app.get("/reserve", (req, res) => {
    console.log("GET /reserve session=", req.session);
    res.render("reserve");
});

app.get("/register", (req, res) => {
    console.log("GET /register session=", req.session);
    res.render("register");
});
app.get("/logout", (req, res) => {
  // console.log("GET /logout session=", req.session);
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
  console.log(req.session)
  alert("Αποσυνδεθήκατε");
  res.render("menu");
});

app.get("/salads", (req, res) => {
    console.log("GET /salads session=", req.session);
    res.render("salads");
});
app.get("/maindish", (req, res) => {
    console.log("GET /maindish session=", req.session);
    res.render("maindish");
});

app.get("/dessert", (req, res) => {
    console.log("GET /dessert session=", req.session);
    res.render("dessert");
});
app.get("/drink", (req, res) => {
    console.log("GET /drink session=", req.session);
    res.render("drink");
});
app.get("/wine", (req, res) => {
    console.log("GET /wine session=", req.session);
    res.render("wine");
});
app.get('/login', (req, res) =>  {
  console.log("GET /login session=", req.session);
    res.render("login");
});
//LOGIN
app.post('/auth', function(req, res) {
  
	let email = req.body.email;
	let password = req.body.password;
	if (email && password) {
    function myDisplayer(err,row){
      const final= [err,row];
      // console.log(final);
      
      if(final[0]==="err"){
       cc
        res.render("register");
      }
      else if (final[0]){
        console.error(final[0]);
      } 
      else{
        // console.log("email",final[1][0].email)
        req.session.email = final[1][0].email;

        req.session.loggedin = true;
        res.render("menu");
        // console.log("new session", req.session)
    }
    
   }
  const result=findUser(email,password,myDisplayer) ;}

});
// app.get('/resister', (req, res) =>  {
//   console.log("GET /resister session=", req.session);
//     res.render("resister");
// });
//REGISTER
app.post("/Newregister", (req, res) => {
  
	// Capture the input fields
	let email = req.body.email;
	let password = req.body.password;
	// Ensure the input fields exists and are not empty
	if (email && password) {
		// Execute SL query that'll select the account from the database based on the specified username and password
    
    function myDisplayer(err,row){
      const final= [err,row];
      console.log(final);
      
      if (final[0]){
        console.error(final[0]);
      } 
      else{
        console.log(final[1])
        res.render("login");
    }
    
   }
  const result = newUser(email,password,myDisplayer) ;}
});

app.get('/sessionData', (req, res) => {
  console.log("GET /sessionData session=", req.session);
  if (req.session.email) {
    console.log(req.session)
      res.json(req.session.email);
  } else {
      res.json({});  // Empty object if no session data is available
  }
});




app.get("/checkout", (req, res) => {
  console.log("GET /checkout session=", req.session);
  // If the user is loggedin
  if (req.session.loggedin) {
    
    // console.log(req.session);
    res.render("checkout",{email:req.session.email})
    
  } else {
    // Not logged in
    res.send('Please login to view this page!');
  }
  
});


app.post('/submitOrder', function (req, res) {
  try {
    console.log("GET /sumbitOrder session=", req.session);
    res.render("menu");
  } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Error saving order!' });
  }});