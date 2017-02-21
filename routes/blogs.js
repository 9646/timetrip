var express = require('express');
var time = require('../utilities');
var dynamic = require('../models/dynamic');
var router = express.Router();

router.post('/addblog', function(req, res) {
    req.body.time = time(new Date());
    console.log(req.body);
    dynamic.addDynamic(req.body, function(err, data) {
        if(err) {
            return res.send({success: false, message:'添加失败',data: null});            
        }
        return res.send({success: true, message:'添加成功',data: req.body});
    })
})

module.exports = router;
