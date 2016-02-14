/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/express/express.d.ts" />
/// <reference path="../typings/mongoose/mongoose.d.ts" />
/// <reference path="../typings/body-parser/body-parser.d.ts" />

var express = require('express');

var routes = function (Employee) {
    var employeeRouter = express.Router();

    employeeRouter.route('/')
        .get(function (req, res) {
            Employee.find(function (err, employee) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(employee);
                }
            });
        })
        .post(function (req, res) {
            var employee = new Employee(req.body);
            employee.save();
            res.status(201).send(employee);
        });

    employeeRouter.route('/:id')
        .get()
        .post()
        .put()
        .delete();
        
        return employeeRouter;
};

module.exports = routes;