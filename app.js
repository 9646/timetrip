var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var settings = require('./settings');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var index = require('./routes/index');
var users = require('./routes/users');
var blogs = require('./routes/blogs');

var app = express();

// view engine setup
app.use(express.static('www'))

app.use(cookieParser());
app.use(session({
  secret: settings.cookieSecret,
  key: settings.db,
  cookie:{
    maxAge: 1000*60*60*2
  },
  store: new MongoStore({
    url: 'mongodb://localhost/timetrip'
  }),
  resave:false,
  saveUninitialized: true
}))

app.use(function(req, res, next) {
  res.locals.user = req.session.user;
  next();
})



// 加载模板ejs
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/blogs', blogs);

app.post('signin', function(req,res) {
  console.log(req);
  res.send({success: true, data:{name: 'signin'}})
})



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000, ()=>{
  console.log('项目运行中...')
})
module.exports = app;
