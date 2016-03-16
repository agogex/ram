/// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../../typings/express/express.d.ts" />
/// <reference path="../../typings/mongoose/mongoose.d.ts" />
/// <reference path="../../typings/body-parser/body-parser.d.ts" />

var routes = function (User, express) {
	var authRouter = express.Router();

	authRouter.route('/')
		.post(function (req, res) {
			
		});
};

module.exports = routes;