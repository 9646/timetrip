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
// 查询所欲
router.get('/allBlogs', function(req, res) {
    dynamic.gitDynamic({type: 'blog'}, null, function(err, blogs) {
        if(err) {
            return res.send({success:false, message:'查询失败', data: null});
        }
        return res.send({success: true, message:'查询成功', data: blogs});
    })
})
// 查询一个
router.post('/getBlog', function(req, res) {
    dynamic.gitDynamic({type: 'blog'}, req.body.blogId, function(err, blogs) {
        if(err) {
            return res.send({success: false, message: '查询失败', data: null});
        }
        return res.send({success: true, message: '查询成功', data: blogs})
    })
})

// 删除
router.post('/deleteBlog', function(req,res) {
    console.log(1);
    console.log(req.body)
    dynamic.deleteDynamic(req.body.id, function(err) {
        if(err) {
            return res.send({success: false, message:'删除失败', data:null});
        }
        return res.send({success: true, message:'删除成功', data: null});
    })
})
module.exports = router;
