/// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../../typings/express/express.d.ts" />
/// <reference path="../../typings/mongoose/mongoose.d.ts" />
/// <reference path="../../typings/body-parser/body-parser.d.ts" />
var jwt = require('express-jwt');
var auth = jwt({
    secret: process.env.JWT_SECRET
});

var routes = function (Employee, express) {
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
        .post(auth, function (req, res) {
            if (!req.user._id) {
                res.status(401).json({
                    "message": "UnauthorizedError: private profile"
                });
            } else {
                var employee = new Employee(req.body);
                employee.save();
                res.status(201).send(employee);
            }
        });

    employeeRouter.use('/:id', function (req, res, next) {
        Employee.findById(req.params.id, function (err, employee) {
            if (err) {
                res.status(500).send(err);
            } else if (employee) {
                req.employee = employee;
                next();
            } else {
                res.status(404).send('no item found');
            }
        });
    });

    employeeRouter.route('/:id')
        .get(function (req, res) {
            res.json(req.employee);
        })
        .put(function (req, res) {
            if (req.body._id) delete req.body._id;
            for (var e in req.body) {
                req.employee[e] = req.body[e];
            }
            req.employee.save(function (err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(req.employee);
                }
            });
        })
        .delete(function (req, res) {
            req.employee.remove(function (err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(204).send('Removed');
                }
            });
        });

    return employeeRouter;
};

module.exports = routes;