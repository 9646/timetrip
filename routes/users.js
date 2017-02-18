var express = require('express');
var User = require('../models/user.js');
var router = express.Router();

router.post('/signin', function(req, res, next) {
  console.log(req.body);
  console.log(req.body.name);
  console.log(req.body.password);
  console.log(req.body.email);

  var newUser = new User({
    name: req.body.name,
    password: req.body.password,
    email: req.body.email
  })
  User.get(req.body.name, function(err, user) {
    if(err) {
      res.send({success: false, message: '服务器出错', data:null});
    }
    if(user) {
      res.send({success: false, message: '用户名已存在', data:null});
    }
    newUser.save(function(err, db) {
      if(err) {
        res.send({success: false, message: '服务器出错', data:null});
      }
      res.send({success: true, message: '注册成功', data:null});
    })
  })
})

router.post('/login', function(req, res, next) {
  User.get(req.body.name, function(err, user) {
    if(err) {
      res.send({success: false, message:'服务器出错', data:null});
    }
    if(req.body.password == user.password) {
      req.session.user = user;
      res.send({success: true, message: '登录成功', data: user});
    }else{
      res.send({success: false, message:'用户名或密码错误', data:null});
    }
  })
})

router.get('/logout', function(req, res, next) {
  req.session.user = null;
  res.send({success: true, message:'登出成功', data: null});
}) 


module.exports = router;
