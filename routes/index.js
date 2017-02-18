var express = require('express');
var router = express.Router();
console.log('index');

router.get('/home', function(req, res, next) {
  var user = req.session.user;
  console.log(user);
  if(user) {
    res.send({success: true, data:user});
  }
  res.send({success:false, data:user});
})



module.exports = router;
