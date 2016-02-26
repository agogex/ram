/// <reference path="typings/node/node.d.ts" />
/// <reference path="typings/express/express.d.ts" />
/// <reference path="typings/mongoose/mongoose.d.ts" />
/// <reference path="typings/body-parser/body-parser.d.ts" />

var express = require('express'),
    app = express(),
    path = require('path'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    Employee = require('./app/models/employee'),
    News = require('./app/models/news'),
    config = require('./config');

app.use(express.static(__dirname + '/public'));

mongoose.connect(config.database);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var employeeRouter = require('./app/routes/employeeRoutes')(Employee, express);
var newsRouter = require('./app/routes/newsRoutes')(News, express);

app.use('/api/news', newsRouter);
app.use('/api/employees', employeeRouter);

app.use('*', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

app.listen(config.port, function(){
    console.log('Running on PORT: ' + config.port);
});