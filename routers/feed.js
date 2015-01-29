var express = require('express');
var router = express.Router();
var fs = require('fs');
var signupRouter = require('./user_signup');
var filesPath = __dirname + "/../files/";
var mysql = require('mysql');

router.use("/signup", signupRouter);

router.route("/*").get(function(req, res, next){
  req.getConnection(function(err, connection){
    if(err){ next(err); }
    connection.query("SELECT * FROM users WHERE id = ?", [req.session.userId], function(err, records){
      if(err){ next(err); }
      res.locals.user = records[0];
      next();
    });
  });
});

router.use(function(req, res, next){
  res.locals.req = req;
  next();
});

router.get("/", function(req, res){
  fs.readdir(filesPath, function(err, files){
    res.locals.files = files;
    res.render("feed/index");
  });
});

router.get("/signout", function(req, res, next){
  req.session.destroy();
  res.redirect('/feed');
});

router.get("/login", function(req, res){
  var data = {
    req: req,
    error: null
  };
  res.render("feed/login", data);
});

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'sss-final'
});


router.get("/photo/:filename", function(req, res){
  var filePath = filesPath + req.params.filename;
  var filename = req.params.filename,
                 photoCaption,
                 photoId,
                 comments;

  connection.query('SELECT comment, created_at FROM comments WHERE photo_id = \'' + filename + '\'', function (err, match) {
    comments = match;
    res.render('feed/photo',{
      comments: comments
    });
  });
});

router.get("/file/:filename", function(req, res){
  var filePath2 = filesPath + req.params.filename;
  fs.exists(filePath2, function (exists) {
    if(exists){
      res.sendFile(req.params.filename, {root : filesPath});
    }else {
      res.send("No such file: " + req.params.filename);
    }
  });
});

router.get("/upload", function(req, res){
  if(!req.session.userId){
    res.redirect(req.baseUrl + "/login");
  } else {
  res.render("feed/upload");
  }
});

router.post("/comment", function(req, res){
  var date = new Date();
  var photofile = req.body.photo_id;

  req.getConnection(function(err, connection){
    if(err){ next(err); }
    connection.query("INSERT INTO comments (comment, photo_id, created_at) VALUES (?)", [[req.body.comment, req.body.photo_id, date]], function(err){
      if(err){ err; }
    });
  });
  res.redirect('/feed/photo/' + photofile);
});

router.post("/upload", function(req, res){
  var upload = req.files.upload;

  fs.rename(upload.path, filesPath + upload.originalname, function(err){
    if(err){
      res.send("Something went wrong!");
    }else {
      req.getConnection(function(err, connection){
        if(err){ next(err); }
        connection.query("INSERT INTO photos (filename, user_id, caption) VALUES (?)", [[upload.originalname, req.session.userId, req.body.caption]], function(err){
          if(err){ next(err); }
        });
      });
      res.redirect(req.baseUrl + "/");
    }
  });
});

router.post("/login", function(req, res, next){
  var email = req.body.email;
  var password = req.body.password;

  req.getConnection(function(err, connection){
    if(err){ next(err); }
    connection.query("SELECT * FROM users WHERE email = ? AND password = ?", [email, password], function(err, records){
      if(err){ next(err); }
      if(records.length > 0){
        req.session.userId = records[0].id;
        console.log("Logged in! HOORAY", records[0]);
        res.redirect(req.baseUrl + "/");
      }else {
        var data = {
          req: req,
          error: "Email or Password incorrect!"
        };
        res.render("feed/login", data);
      }
    });
  });
});

module.exports = router;