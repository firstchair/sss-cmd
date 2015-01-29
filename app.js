//           88                     88                              
//            88                     88                              
//            88                     88                              
//            88         88       88 88   ,d8  ,adPPYYba, ,adPPYba,  
//            88         88       88 88 ,a8"   ""     `Y8 I8[    ""  
//            88         88       88 8888[     ,adPPPPP88  `"Y8ba,   
//            88         "8a,   ,a88 88`"Yba,  88,    ,88 aa    ]8I  
//            88888888888 `"YbbdP'Y8 88   `Y8a `"8bbdP"Y8 `"YbbdP"'  
//                                                                   
//                                                                   
//                                                                           
//    88888888888        88                                                  
//    88                 ""   ,d                                             
//    88                      88                                             
//    88aaaaa  ,adPPYba, 88 MM88MMM ,adPPYba, 88,dPYba,,adPYba,  ,adPPYYba,  
//    88""""" a8P_____88 88   88    I8[    "" 88P'   "88"    "8a ""     `Y8  
//    88      8PP""""""" 88   88     `"Y8ba,  88      88      88 ,adPPPPP88  
//    88      "8b,   ,aa 88   88,   aa    ]8I 88      88      88 88,    ,88  
//    88       `"Ybbd8"' 88   "Y888 `"YbbdP"' 88      88      88 `"8bbdP"Y8  
//                                                                           
//                                                                           
//                                                             
//                   ad88888ba                                 
//                  d8"     "8b                                
//                  Y8,                                        
//                  `Y8aaaaa,    ,adPPYba, 88,dPYba,,adPYba,   
//                    `"""""8b, a8P_____88 88P'   "88"    "8a  
//                          `8b 8PP""""""" 88      88      88  
//                  Y8a     a8P "8b,   ,aa 88      88      88  
//                   "Y88888P"   `"Ybbd8"' 88      88      88  
//                                                             
//                                                             
//                                                                               
//        db                                                                     
//       d88b                                                                    
//      d8'`8b                                                                   
//     d8'  `8b     88,dPYba,,adPYba,  88,dPYba,,adPYba,   ,adPPYba, 8b,dPPYba,  
//    d8YaaaaY8b    88P'   "88"    "8a 88P'   "88"    "8a a8P_____88 88P'   "Y8  
//   d8""""""""8b   88      88      88 88      88      88 8PP""""""" 88          
//  d8'        `8b  88      88      88 88      88      88 "8b,   ,aa 88          
// d8'          `8b 88      88      88 88      88      88  `"Ybbd8"' 88          
//                                                                               
//                                                                               
//                                                           
//                     88                                    
//                     88                                    
//                     88                                    
//                     88 ,adPPYYba, ,adPPYYba, 8b,dPPYba,   
//                     88 ""     `Y8 ""     `Y8 88P'   `"8a  
//                     88 ,adPPPPP88 ,adPPPPP88 88       88  
//                     88 88,    ,88 88,    ,88 88       88  
//                     88 `"8bbdP"Y8 `"8bbdP"Y8 88       88  
                                                           
// Eindopdracht SSS by Sem Ammerlaan & Lukas Feitsma

var express = require('express');
var path = require('path');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var bodyParser = require('body-parser');
var multer = require('multer');
var mysql = require('mysql');
var myConnection = require('express-myconnection');


//  =================
//  = Setup the app =
//  =================

// The app itself
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//  ============================
//  = Middleware configuration =
//  ============================

// Setup serving static assets
app.use(express.static(path.join(__dirname, 'public')));

// Add session support
app.use(session({
  secret: '...', // CHANGE THIS!!!
  store: new FileStore(),
  saveUninitialized: true,
  resave: false
}));

// Setup bodyparser
app.use(bodyParser.urlencoded({extended: true}));

// Setup Multer
app.use(multer({
  dest: './files/'
}));

// Setup MySQL

// Database configuration
var dbOptions = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'sss-final'
};

// Add connection middleware
app.use(myConnection(mysql, dbOptions, 'single'));

//  ===========
//  = Routers =
//  ===========

var feedRouter = require('./routers/feed');

app.use("/feed", feedRouter);

// This should be the ONLY route in this file!
app.get('/', function(req, res){
  res.redirect('/feed/');
});

//  =================
//  = Start the app =
//  =================

app.listen(3000, function(){
  console.log('App listening at http://localhost:3000');
});