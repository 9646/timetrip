var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
router.post('/signin', function(req, res, next) {
  console.log(req.data);
  res.send({success: true, data:{name: 'zhangsan'}})
})

module.exports = router;
