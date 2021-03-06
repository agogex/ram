/// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../../typings/express/express.d.ts" />
/// <reference path="../../typings/mongoose/mongoose.d.ts" />
/// <reference path="../../typings/body-parser/body-parser.d.ts" />
var config = require('../../config');

var routes = function (News, express) {
    var newsRouter = express.Router();

    newsRouter.route('/')
        //.get(function(req, res) {
        //    News.find()
        //        .sort('-date')
        //        .exec(function(err, news) {
        //            if (err) {
        //                res.status(500).send(err);
        //            } else {
        //                res.json(news);
        //            }
        //        });
        //})
        .post(function (req, res) {
            var news = new News(req.body);
            news.date = Date.now();
            news.save();
            res.status(201).send(news);
        });

    newsRouter.route('/page/:page').get(function (req, res) {
        var skipPages = (req.params.page - 1) * config.newsPerPage;
        var pagesAmout = null;

        News
            .count()
            .exec(function (err, count) {
                if (err) {
                    console.log(err);
                    return;
                }
                pagesAmout = Math.ceil(count / config.newsPerPage);
            })
            .then(function () {
                News
                    .find()
                    .skip(skipPages)
                    .limit(config.newsPerPage)
                    .sort('-date')
                    .exec(function (err, news) {

                        if (err) {
                            res.status(500).send(err);
                        } else {
                            if (pagesAmout) {
                                news.push({pagesAmount: pagesAmout});
                            }
                            res.json(news);
                        }
                    });
            });
    });

    //    News
    //        .find()
    //        .skip(skipPages)
    //        .limit(config.newsPerPage)
    //        .sort('-date')
    //        .exec(function (err, news) {
    //
    //            if (err) {
    //                res.status(500).send(err);
    //            } else {
    //                if (pagesAmout) {
    //                    news.push({pagesAmount: pagesAmout});
    //                }
    //                res.json(news);
    //            }
    //        });
    //});

    newsRouter.use('/:id', function (req, res, next) {
        News.findById(req.params.id, function (err, news) {
            if (err) {
                res.status(500).send(err);
            } else if (news) {
                req.news = news;
                next();
            } else {
                res.status(404).send('no item found');
            }
        });
    });

    newsRouter.route('/:id')
        .get(function (req, res) {
            res.json(req.news);
        })
        .put(function (req, res) {
            if (req.body._id) delete req.body._id;
            for (var e in req.body) {
                req.news[e] = req.body[e];
            }
            req.news.date = Date.now();
            req.news.save(function (err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(req.news);
                }
            });
        })
        .delete(function (req, res) {
            req.news.remove(function (err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(204).send('Removed');
                }
            });
        });


    return newsRouter;
};

module.exports = routes;