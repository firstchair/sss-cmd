var express = require('express');
var router = express.Router();
var fs = require('fs');
var signupRouter = require('./user_signup');
var filesPath = __dirname + "/../files/";

router.use("/signup", signupRouter);

router.route("/*").get(function(req, res, next){

    req.getConnection(function(err, connection){
      if(err){ next(err); }
      connection.query("SELECT * FROM users WHERE id = ?", [req.session.userId], function(err, records){
        if(err){ next(err); }

        res.locals.user = records[0];
        next();
      })
    })

});

router.use(function(req, res, next){
  res.locals.req = req;
  next();
});

router.get("/", function(req, res){
  fs.readdir(filesPath, function(err, files){
    res.locals.files = files;
    res.render("feed/index");
  })
});

router.get("/signout", function(req, res, next){
  req.session.destroy();
  res.redirect('/feed');
});

router.get("/login", function(req, res){
  var data = {
    req: req,
    error: null
  }
  res.render("feed/login", data);
})

router.get("/welcome", function(req, res, next){
  res.render("feed/welcome");
});

router.get("/download/:filename", function(req, res){
  var filePath = filesPath + req.params.filename;
  fs.exists(filePath, function (exists) {
    if(exists){
      res.sendFile(req.params.filename, {root : filesPath});
      res.render("feed/photo")
    } else {
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

router.post("/upload", function(req, res){
  var upload = req.files.upload;

  fs.rename(upload.path, filesPath + upload.originalname, function(err){
    if(err){
      res.send("Something went wrong!");
    } else {
      req.getConnection(function(err, connection){
        if(err){ next(err); }
        connection.query("INSERT INTO photos (filename, user_id, caption) VALUES (?)", [[upload.originalname, req.session.userId, req.body.caption]], function(err){
        if(err){ err; }
    });
        });

      res.redirect(req.baseUrl + "/");
    }
  })
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
      } else {
        var data = {
          req: req,
          error: "Oh noes!"
        }
        res.render("feed/login", data);
      }
    });

  });

})

module.exports = router;