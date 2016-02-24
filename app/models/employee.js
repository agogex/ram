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
    "phoneNumber": String,
    "phoneNumber2": String,
    "email": String,
    "office": String
});

module.exports = mongoose.model('Employee', EmployeeSchema);