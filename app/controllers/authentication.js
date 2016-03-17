/// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../../typings/mongoose/mongoose.d.ts" />
/// <reference path="../../typings/passport/passport.d.ts" />

var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.login = function (req, res) {
	
	passport.authenticate('local', function (err, user, info) {
		console.log(user);
		var token;
		if (err) {
			res.status(404).json(err);
			return;
		}

		if (user) {
			token = user.generateJwt();
			res.status(200);
			res.json({
				"token": token
			});
		} else {
			res.status(401).json(info);
		}
	})(req, res);
};