/// <reference path="typings/node/node.d.ts" />
/// <reference path="typings/express/express.d.ts" />
/// <reference path="typings/mongoose/mongoose.d.ts" />
/// <reference path="typings/body-parser/body-parser.d.ts" />

// var http = require('http'),
//     fs = require('fs');
    
// http.createServer(function (req, res) {
    
//     res.writeHead(200, {
//         'Content-Type': 'text/html',
//         'Access-Control-Allow-Origin' : '*'
//     });
    
//     var readStream = fs.createReadStream(__dirname + '/index.html');
//     readStream.pipe(res);
// }).listen(80);


var express = require('express'),
    app = express(),
    path = require('path'),
    mongoose = require('mongoose'),
    Employee = require('./models/employee'),
    bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/peoples');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var employeeRouter = require('./routes/employeeRoutes')(Employee);

app.use('/api/employees', employeeRouter);
app.listen(80, function(){
    console.log('Running on PORT: 80');
});