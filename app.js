const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose=require('mongoose');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const directorsRouter=require('./routes/directors');
const actorsRouter=require('./routes/actors');
const genresRouter = require('./routes/genres');
const moviesRouter = require('./routes/movies');
const membersRouter = require('./routes/members');
const copiesRouter = require('./routes/copies');
const bookingsRouter = require('./routes/bookings');

//Protocolo "mongodb://<dbUser>?:<dbPassword>?@?<direction>:<port>/<dbName>"

const uri="mongodb://localhost:27017/video-club";
mongoose.connect(uri);
const db = mongoose.connection;

const app = express();

db.on('error',()=>{
  console.log("No se ha podido conectar a la base de datos");
});
db.on('open',()=>{
  console.log("Se ha conectado correctamente");
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/directors',directorsRouter);
app.use('/actors',actorsRouter);
app.use('/genres', genresRouter);
app.use('/movies', moviesRouter);
app.use('/members', membersRouter);
app.use('/copies', copiesRouter);
app.use('/bookings', bookingsRouter);



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

module.exports = app;
