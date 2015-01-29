var express = require('express');
var router = express.Router();

router.get("/", function(req, res){
  res.render("user_signup/index", {req: req});
});

router.post("/", function(req, res, next){
  req.getConnection(function(err, connection){
    if(err){ next(err); }
    connection.query("INSERT INTO users (email, password, name) VALUES (?)", [[req.body.email, req.body.password, req.body.name]], function(err, records){
      if(err){ next(err); }
      if(records.affectedRows == 1){
        res.redirect("/feed/login");
      } else {
        res.render("user_signup/index", {req: req});
      }
    });
  });
});

module.exports = router;