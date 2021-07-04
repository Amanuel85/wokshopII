var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const fs = require('fs');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


app.get('/books',(req,res)=>{
  let file = fs.readFileSync('./book.json','utf-8')
  console.log(file)
  res.send(file) // if it is json file we don't need to chang into json
})

app.post('/books',(req,res)=>{
  //const newbook = {"id":req.body.id,"title":req.body.title,"ISBNreq":req.body.ISBN,"publishedDate":req.body.publishedDate,"author":req.body.author}
  const newbook = req.body
  console.log(newbook)
  const fileread = fs.readFileSync('./book.json')
  newfile = fileread.toString()
  const file = fs.writeFileSync('./book.json',JSON.stringify(newbook),{'flag':'a'})
  console.log(newfile)
  //console.log(req.body.id,req.body.title,req.body.ISBN,req.body.publishedDate,req.body.author)
  // const writestream = fs.createWriteStream('./book')
  // writestream.write(newbook)
  // writestream.end()
  //console.log(writestream)
  res.send(newbook)
})

app.put('/books/:id',(req,res)=>{
  file = fs.readFileSync('/book.txt')
  const newfile = file.split('\n')
  console.log(newfile)
res.send("hello")
})


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

app.listen(3000);
