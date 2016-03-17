/// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../../typings/express/express.d.ts" />
/// <reference path="../../typings/mongoose/mongoose.d.ts" />
/// <reference path="../../typings/body-parser/body-parser.d.ts" />

var ctrlAuth = require('../controllers/authentication');

var routes = function (User, express) {
	var authRouter = express.Router();

	authRouter.route('/')
		.post(ctrlAuth.login);
	
	return authRouter;
};

module.exports = routes;