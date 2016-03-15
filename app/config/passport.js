/// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../../typings/mongoose/mongoose.d.ts" />

var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    mongoose = require('mongoose'),
    User = mongoose.model('User');

passport.use(new LocalStrategy(function (username, password, done) {
    User.findOne({ name: username }, function (err, user) {
        if (err) return done(err);
        if (!user) {
            return done(null, false, {
                message: 'Incorrect username'
            });
        }
        if (!user.validPassword(password)) {
            return done(null, false, {
                message: 'Incorrect password'
            });
        }
        return done(null, user);
    });
})
    );