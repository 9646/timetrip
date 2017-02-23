var express = require('express');
var time = require('../utilities');
var dynamic = require('../models/dynamic');
var router = express.Router();


// 添加心情
router.post('/addMood', function(req, res) {
    console.log(req.body);
    req.body.answers = [];
    req.body.time = time(new Date());
    dynamic.addDynamic(req.body, function(err, data) {
        if(err) {
            return res.send({success: false, message: '发表失败', data: null});
        }
        return res.send({success: true, message: '发表成功', data: data})
    }) 
})
// 查询数据
router.get('/allMood', function(req, res) {
    console.log('查询数据');
    dynamic.gitDynamic({type:'mood'}, null, function(err, data) {
        if(err) {
            return res.send({success:false, message:'获取数据失败', data: null})
        }
        return res.send({success:true, message:'成功获取到数据', data:data});
    })
})

// 添加评论
router.post('/addComment', function(req,res) {
    req.body.time = time(new Date());
    dynamic.addComment(req.body.id, req.body, function(err) {
        if(err) {
            return res.send({success:false, message:'评论失败', data: null});
        }
        return res.send({success:true, message:'评论成功', data: null});        
    })
})

// 删除心情
router.post('/deleteMood', function(req, res) {
    console.log(req.body.id)
    dynamic.deleteDynamic(req.body.id, function(err) {
        if(err) {
            return res.send({success:false, message:'删除失败', data:null});
        }
        return res.send({success:true, message:'删除成功', data:null});
    })
})


// 删除评论
router.post('/deleteComment', function(req, res) {
    console.log(req.body);
    dynamic.deleteComment(req.body.id, req.body.commentId, function(err) {
        if(err) {
            return res.send({success:false, message: '删除回复失败', data: null});
        }
        return res.send({success:true, message: '删除回复成功', data: null});        
    })
})
module.exports = router;
