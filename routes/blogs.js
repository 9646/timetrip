var express = require('express');
var time = require('../utilities');
var dynamic = require('../models/dynamic');
var router = express.Router();
// 添加博客
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
// 查询所有
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

// 删除博客
router.post('/deleteBlog', function(req,res) {
    dynamic.deleteDynamic(req.body.id, function(err) {
        if(err) {
            return res.send({success: false, message:'删除失败', data:null});
        }
        return res.send({success: true, message:'删除成功', data: null});
    })
})

// 添加评论
router.post('/addComment', function(req, res) {
    req.body.time = time(new Date());
    req.body.commentId = req.body.time.date.getTime() + '';
    console.log(req.body);
    dynamic.addComment(req.body.id, req.body, function(err, data) {
        if(err) {
            return res.send({success: false, message:'评论失败', data: null});
        }
        return res.send({success: true, message:'评论成功', data: data});        
    })
})

// 删除评论
router.post('/delComment', function(req, res) {
    console.log('delComment')
    console.log(req.body);
    dynamic.deleteComment(req.body.id, req.body.answerId, function(err) {
        if(err) {
            return res.send({success:false, message:'删除评论失败',data:null});
        }
        return res.send({success:true, message:'删除评论成功', data:null});
    })

})

// 更新博客
router.post('/amendBlog', function(req, res) {
    console.log('111111111111111111111111111')

    dynamic.update(req.body, req.body.id, function(err) {
        if(err) {
            return res.send({success: false, message: '更新失败', data: null});
        }
        return res.send({success: true, message: '更新成功', data: null});
    })
})
module.exports = router;
