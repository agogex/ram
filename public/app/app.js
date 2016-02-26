/// <reference path="../../typings/angularjs/angular.d.ts" />

angular.module('app', ['appRouter', 'ngAnimate'])
    .controller('mainMenuController', function ($scope) {
        $scope.getCurrentPage = function (page) {
            var currentPage = window.location.pathname.split('/')[1] || 'home';
            return page == currentPage;
        };
    })
    .controller('employeesController', function ($scope, $http) {
        $scope.currentPage = true;
        $scope.showCreateForm = false;
        $scope.formData = {};

        $scope.getEmployees = function () {
            $http.get('/api/employees')
                .then(function (data) {
                    $scope.employees = data.data;
                });
        };

        $scope.getEmployees();

        $scope.add = function () {
            $scope.showCreateForm = !$scope.showCreateForm;
        };

        $scope.createNewEpmloyee = function () {
            $http.post('/api/employees', $scope.formData)
                .success(function () {
                    $scope.getEmployees();
                    $scope.showCreateForm = false;
                    Materialize.toast('Запис успішно створено!', 4000, 'teal lighten-2');
                })
                .error(function (data, status) {
                    console.error('Status: ' + status + '. Data: ' + data);
                    Materialize.toast('При створенні запису виникла помилка!', 4000, 'red lighten-2');
                });
            // $scope.formData = {};
        };

        $scope.showEditForm = function (showEdit) {
            showEdit = !showEdit;
        };

        $scope.editEmployee = function (employee) {
            $http.put('/api/employees/' + employee._id, employee)
                .success(function () {
                    $scope.getEmployees();
                    Materialize.toast('Запис успішно збережено!', 4000, 'teal lighten-2');
                })
                .error(function (data, status) {
                    console.error('Status: ' + status + '. Data: ' + data);
                    Materialize.toast('При збереженні запису виникла помилка!', 4000, 'red lighten-2');
                });
        };

        $scope.deleteEmployee = function (employeeId) {
            $http.delete('/api/employees/' + employeeId)
                .success(function () {
                    $scope.getEmployees();
                    Materialize.toast('Запис успішно видалено!', 4000, 'teal lighten-2');
                })
                .error(function (data, status) {
                    console.error('Status: ' + status + '. Data: ' + data);
                    Materialize.toast('При видаленні запису виникла помилка!', 4000, 'red lighten-2');
                });
        }
        
        // angular.element(document).ready(function(){
        // 	componentHandler.upgradeAllRegistered();
        // });
    })
    .controller('homeController', function ($scope) {
        $scope.message = 'Home Page';
    })
    .controller('newsController', function ($scope, $http) {
        $scope.currentPage = true;
        $scope.showCreateForm = false;
        $scope.formData = {};

        $scope.getNews = function () {
            $http.get('/api/news')
                .then(function (data) {
                    $scope.news = data.data;
                });
        };

        $scope.getNews();

        $scope.add = function () {
            $scope.showCreateForm = !$scope.showCreateForm;
        };

        $scope.createNews = function () {
            $http.post('/api/news', $scope.formData)
                .success(function () {
                    $scope.getNews();
                    $scope.showCreateForm = false;
                    Materialize.toast('Запис успішно створено!', 4000, 'teal lighten-2');
                })
                .error(function (data, status) {
                    console.error('Status: ' + status + '. Data: ' + data);
                    Materialize.toast('При створенні запису виникла помилка!', 4000, 'red lighten-2');
                });
            // $scope.formData = {};
        };
        
        $scope.editNews = function (news) {
            $http.put('/api/news/' + news._id, news)
                .success(function () {
                    $scope.getNews();
                    Materialize.toast('Запис успішно збережено!', 4000, 'teal lighten-2');
                })
                .error(function (data, status) {
                    console.error('Status: ' + status + '. Data: ' + data);
                    Materialize.toast('При збереженні запису виникла помилка!', 4000, 'red lighten-2');
                });
        };

        $scope.deleteNews = function (newsId) {
            $http.delete('/api/news/' + newsId)
                .success(function () {
                    $scope.getNews();
                    Materialize.toast('Запис успішно видалено!', 4000, 'teal lighten-2');
                })
                .error(function (data, status) {
                    console.error('Status: ' + status + '. Data: ' + data);
                    Materialize.toast('При видаленні запису виникла помилка!', 4000, 'red lighten-2');
                });
        }
    })
    .controller('articleController', function($scope, $http, $routeParams){
        $http.get('/api/news/' + $routeParams.id)
            .success(function(data){
                $scope.news = data;
            })
            .error(function(data){
                console.error(data);
            });
    });

