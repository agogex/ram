/// <reference path="../../typings/angularjs/angular.d.ts" />

angular.module('app', ['appRouter'])
	.controller('employeesController', function($scope, $http){
		$scope.showCreateForm = false;
		$scope.formData = {};
		
		$scope.getEmployees = function(){
			$http.get('/api/employees')
				.then(function(data){
					$scope.employees = data.data;
				});
		};
		
		$scope.getEmployees();
			
		$scope.add = function(){
			$scope.showCreateForm = !$scope.showCreateForm;
		};
		
		$scope.createNewEpmloyee = function(){
			$http.post('/api/employees', $scope.formData)
				.success(function(){
					$scope.getEmployees();
					$scope.showCreateForm = false;
				});
		};
		
		angular.element(document).ready(function(){
			componentHandler.upgradeAllRegistered();
		});
    })
    .controller('homeController', function($scope){
        $scope.message = 'Home Page';
    });

