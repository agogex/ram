/// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../../typings/express/express.d.ts" />
/// <reference path="../../typings/mongoose/mongoose.d.ts" />

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
var EmployeeSchema = new Schema({
    "department": String,
    "position": String,
    "lastname": String,
    "name": String,
    "surname": String,
    "phone number": String,
    "email": String,
    "office": String
});

module.exports = mongoose.model('Employee', EmployeeSchema);