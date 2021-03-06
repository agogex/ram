require('dotenv').load();

var express = require('express'),
    app = express(),
    morgan = require('morgan'),
    path = require('path'),
    mongoose = require('mongoose'),
    uriUtil = require('mongodb-uri'),
    mongooseUri = uriUtil.formatMongoose(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}`),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    Employee = require('./app/models/employee'),
    News = require('./app/models/news'),
    User = require('./app/models/user'),
    config = require('./config'),
    createUser = require('./utils').createUser;

require('./app/config/passport');

User.findOne({
    name: 'admin'
}, function (err, user) {
    if (err) {
        console.log(err);
    } else if (!user) {
        createUser('admin', 'password', User);
    }
});

//createUser('admin', 'password');

// app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));

// mongoose.connect(config.database);

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


app.use(passport.initialize());

var authRouter = require('./app/routes/authRoutes')(User, express);
var employeeRouter = require('./app/routes/employeeRoutes')(Employee, express);
var newsRouter = require('./app/routes/newsRoutes')(News, express);

app.use('/login', authRouter);
app.use('/api/news', newsRouter);
app.use('/api/employees', employeeRouter);

app.use('*', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

app.listen(process.env.PORT || config.port, function () {
    mongoose.connect(mongooseUri, {}, err => {
        if (err) {
            console.log(err);
        }
    });
    console.log('app is running...');
});