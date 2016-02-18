/// <reference path="../../typings/angularjs/angular.d.ts" />

angular.module('app', [])
	.controller('mainController', function($http){
		var vm = this;
		$http.get('/api/employees')
			.then(function(data){
				vm.employees = data.data;
				console.log(vm.employees);
			});
	});