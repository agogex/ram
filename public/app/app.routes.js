/// <reference path="../../typings/angularjs/angular.d.ts" />

angular.module('appRouter', ['ngRoute'])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
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
            .when('/contacts', {
                templateUrl: '/app/views/pages/contacts.html',
                controller: 'contactsController'
            });
        $locationProvider.html5Mode(true);
    });