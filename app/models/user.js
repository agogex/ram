/// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../../typings/express/express.d.ts" />
/// <reference path="../../typings/mongoose/mongoose.d.ts" />

var mongoose = require('mongoose'),
    crypto = require('crypto'),
    jwt = require('jsonwebtoken'),
    Schema = mongoose.Schema;
    
var UserSchema = new Schema({
   "name": {
       type: String,
       unique: true,
       required: true
   },
   hash: String,
   salt: String
});

UserSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

UserSchema.methods.validPassword = function(password){
    return this.hash == crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

UserSchema.methods.generateJwt = function(){
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 1);
  
  return jwt.sign({
      _id: this._id,
      name: this.name,
      exp: parseInt(expiry.getTime() / 1000)
  }, process.env.JWT_SECRET);  
};

// function encryptPass(password){
//     return crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
// }

module.exports = mongoose.model('User', UserSchema);