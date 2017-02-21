var express = require('express');
var time = require('../utilities');
var dynamic = require('../models/dynamic');
var router = express.Router();

router.post('/addblog', function(req, res) {
    req.body.time = time(new Date());
    req.body.answers = [];
    dynamic.addDynamic(req.body, function(err, data) {
        if(err) {
            return res.send({success: false, message:'添加失败',data: null});            
        }
        return res.send({success: true, message:'添加成功',data: req.body});
    })
})

router.get('/allBlogs', function(req, res) {
    dynamic.gitDynamic({type: 'blog'}, null, function(err, blogs) {
        if(err) {
            return res.send({success:false, message:'查询失败', data: null});
        }
        return res.send({success: true, message:'查询成功', data: blogs});
    })
})

router.post('/getBlog', function(req, res) {
    dynamic.gitDynamic({type: 'blog'}, req.body.blogId, function(err, blogs) {
        if(err) {
            return res.send({success: false, message: '查询失败', data: null});
        }
        return res.send({success: true, message: '查询成功', data: blogs})
    })
})
module.exports = router;
