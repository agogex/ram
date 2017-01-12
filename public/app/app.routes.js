/// <reference path="../../typings/angularjs/angular.d.ts" />

angular.module('appRouter', ['ngRoute'])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: '/app/views/pages/login.html',
                controller: 'loginController'
            })
            .when('/home', {
                templateUrl: '/app/views/pages/home.html',
                controller: 'homeController'
            })
            .when('/employees', {
                templateUrl: '/app/views/pages/employees.html',
                controller: 'employeesController'
            })
            .when('/news', {
                templateUrl: '/app/views/pages/news.html',
                controller: 'newsController'
            })
            .when('/news/:id', {
                templateUrl: '/app/views/pages/article.html',
                controller: 'articleController'
            })
            .when('/news/page/:page', {
                templateUrl: '/app/views/pages/news.html',
                controller: 'newsController'
            })
            .when('/contacts', {
                templateUrl: '/app/views/pages/contacts.html',
                controller: 'contactsController'
            })
            .otherwise({
                redirectTo: '/'
            });
        $locationProvider.html5Mode(true);
    });