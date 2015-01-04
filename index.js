var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', require('./lib/loadPage').loadPage);
app.post('/createStream', require('./lib/stream').createStream);
app.post('/stopStream', require('./lib/stream').stopStream);

exports.io = io;
exports.hello = 'hello';
exports.app = app;
http.listen(3000, function(){
  console.log('listening on *:3000');
});




