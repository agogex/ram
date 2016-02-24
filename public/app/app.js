/// <reference path="../../typings/angularjs/angular.d.ts" />

angular.module('app', ['appRouter'])
    .controller('employeesController', function ($scope, $http) {
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
            $scope.formData = {};
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
    });

