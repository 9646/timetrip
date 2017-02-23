var express = require('express');
var User = require('../models/user.js');
var router = express.Router();

router.post('/signin', function(req, res, next) {
  console.log(req.body);
  console.log(req.body.name);
  console.log(req.body.password);
  console.log(req.body.email);
  if(req.body.password != req.body.passwordRepeat) {
    return res.send({success: false, message: '两次密码输入的不一致', data:null});
  }

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
      return;
    }
    newUser.save(function(err, db) {
      if(err) {
        return res.send({success: false, message: '服务器出错', data:null});
      }
      return res.send({success: true, message: '注册成功', data:null});
    })
  })
})

// 登录
router.post('/login', function(req, res) {
  if(!req.body.name || !req.body.password) {
    return res.send({success:false, message:'用户名或密码不能为空', data:null});
  }
  User.get(req.body.name, function(err, user) {
    if(err) {
      return res.send({success: false, message:'服务器出错', data:null});
    }
    if(!user) {
      return res.send({success:false, message: '用户名不存在', data: null});
    }
    if(req.body.password == user.password) {
      req.session.user = user;
      return res.send({success: true, message: '登录成功', data: user});
    }else{
      return res.send({success: false, message:'用户名或密码错误', data:null});
    }
  })
})

router.post('/name', function(req, res) {
  if(!req.body.name) {
    res.send({success:false, message:'用户名不能为空', data:null});
    return;
  }
  User.get(req.body.name, function(err, user) {
    if(err) {
      res.send({success: false, message:'服务器出错', data:null});
      return;
    }
    if(user) {
      res.send({success: false, message: '用户名已存在',data: null});
      return;
    }
    return res.send({success: true, message: '可以注册', data: null});
  })
}) 
// 退出
router.get('/logout', function(req, res, next) {
  req.session.user = null;
  res.send({success: true, message:'登出成功', data: null});
}) 


module.exports = router;
