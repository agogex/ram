/// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../../typings/express/express.d.ts" />
/// <reference path="../../typings/mongoose/mongoose.d.ts" />

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
var NewsSchema = new Schema({
    "title": String,
    "article": String,
    "date": Date,
});

module.exports = mongoose.model('News', NewsSchema);