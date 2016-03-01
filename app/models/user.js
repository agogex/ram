/// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../../typings/express/express.d.ts" />
/// <reference path="../../typings/mongoose/mongoose.d.ts" />

var mongoose = require('mongoose'),
    crypto = require('crypto'),
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
    this.hash = encryptPass(password);  
};

UserSchema.methods.validPassword = function(password){
    return this.hash == encryptPass(password);
};

function encryptPass(password){
    return crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
}