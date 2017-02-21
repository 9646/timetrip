var express = require('express');
var time = require('../utilities');
var message = require('../models/message');
var router = express.Router();

router.get('/home', function(req, res, next) {
  var user = req.session.user;
  if(user) {
    return res.send({success: true, data:user});
  }
  return res.send({success:false, data:user});
})

router.post('/mess', function(req, res) {
  if(!req.body.name) {
    return res.send({success:false, message:'请先登录再回复'})
  }
  var data = {};
  data.message = req.body.message;
  data.name = req.body.name;
  data.time = time(new Date());
  data.answers = [];
  message.save(data, function(err, message) {
    if(err) {
      return res.send({success: false, message:'留言失败', data:null});
    }
    return res.send({success: true, message:'留言成功', data: null});
  })
})

router.get('/messages', function(req, res) {
  message.getAll(function(err, messages) {
    if(err) {
      return res.send({success: false, message:'请求数据失败', data: null});
    }
    return res.send({success: true, message:'获取数据成功', data: messages});
  })
})

router.post('/addReply', function(req, res) {
  req.body.time = time(new Date());
  req.body.replyId = req.body.time.date.getTime() + '';
  
  message.addReply(req.body, function(err) {
    if(err) {
      return res.send({success: false, message:'回复失败', data:null});
    }
    return res.send({success: true, message:'回复成功', data:null});
  })
})

router.post('/delMessage', function(req, res) {
  message.delMessage(req.body.messageId, function(err) {
    if(err) {
      return res.send({success: false, message:'删除失败', data: null});
    }
    return res.send({success: true, message:'删除成功', data: null});    
  })
})

router.post('/delAnswer', function(req, res) {
  message.delAnswer(req.body, function(err) {
    if(err) {
      return res.send({success: false, message:'删除失败', data: null});
    }
    return res.send({success: true, message:'删除成功', data: null});    
  })
})


module.exports = router;
