#!/bin/env node
var express = require('express')
  , stylus = require('stylus')
  , nib = require('nib')
var util = require('util')
var fs = require("fs")
var server = express()


function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib());
}

server.set('views', __dirname + '/views')
server.set('view engine', 'jade')
server.use(express.logger('dev'))
server.use(stylus.middleware(
  { src: __dirname + '/public'
  , compile: compile
  }
))
server.use(express.static(__dirname + '/public'))
server.use(express.bodyParser());


server.get('/', function (req, res) {
  var cp = require("child_process");
  res.render('alfgui',
  { title : 'Alfresco GUI' }
  )
})


var port = process.env.OPENSHIFT_NODEJS_PORT || 8080  
, ip = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
server.listen(port, ip);
