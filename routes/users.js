var express = require('express');
var User = require('../models/user.js');
var router = express.Router();

// 注册
router.post('/signin', function(req, res, next) {
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
// 用户名验证
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
  return res.send({success: true, message:'登出成功', data: null});
}) 

// 查询用户
router.post('/user', function(req, res) {
  // console.log(req.body);
  User.get(req.body.name, function(err, user) {
    if(err) {
      return res.send({success: false, message:'用户不存在', data: null});
    }
    return res.send({success:true, message:'查询成功', data:user})
  })
})


// console.log(user);
// 上传配置
const multer = require('multer');
const storage = multer.diskStorage({
      destination: 'www/picture/portrait',
      filename: function(req, file, callback){
        console.log(req.session.user.name);
        var petname = req.session.user.name;
        callback(null, `${petname}.${file.originalname.split('.').pop()}`);
      }
  })

// 上传
router.post('/upload', multer({storage}).single('photo'), (req, res) => {
    // console.log(req.session)
    var id = req.session.user._id;
    var data = {
      'portrait': '../picture/portrait/' + req.file.filename
    }
    User.update(id, data, function(err){
      return res.redirect('/#/my')
    })

})

// 修改
router.post('/updateUser', function(req, res) {
  var id = req.body._id;
  var data = {
    'email': req.body.email,
    'age' : req.body.age,
    'site' : req.body.site,
    'birthday' : req.body.birthday,
    'gender' : req.body.gender
  };

  User.update(id, data, function(err) {
    if(err) {
      return res.send({success:false, message:'修改失败', data: null});
    }
    return res.send({success:true, message:'修改成功', data: null});    
  })
})


module.exports = router;
