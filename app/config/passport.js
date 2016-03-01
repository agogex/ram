/// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../../typings/mongoose/mongoose.d.ts" />

var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    mongoose = require('mongoose'),
    User = mongoose.model('User');
    
passport.use(function(username, password, done){
    
});