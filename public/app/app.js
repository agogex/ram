/// <reference path="../../typings/angularjs/angular.d.ts" />

angular.module('app', ['appRouter'])
	.controller('employeesController', function($scope, $http){
		$http.get('/api/employees')
			.then(function(data){
				$scope.employees = data.data;
			});
    })
    .controller('homeController', function($scope){
        $scope.message = 'Home Page';
    });

