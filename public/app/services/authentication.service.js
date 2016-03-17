/// <reference path="../../../typings/angularjs/angular.d.ts" />

angular.module('app').service('authentication', authentication);

authentication.$inject = ['$http', '$window'];

function authentication($http, $window) {
	
	var saveToken = function (token) {
		$window.localStorage['auth'] = token;
    };

    var getToken = function () {
		return $window.localStorage['auth'];
    };

    var isLoggedIn = function () {
		var token = getToken();
		var payload;

		if (token) {
			payload = token.split('.')[1];
			payload = $window.atob(payload);
			payload = JSON.parse(payload);

			return payload.exp > Date.now() / 1000;
		} else {
			return false;
		}
    };

    // register = function (user) {
	// 	return $http.post('/api/register', user).success(function (data) {
	// 		saveToken(data.token);
	// 	});
    // };

    login = function (user) {
		return $http.post('/login', user).success(function (data) {
			saveToken(data.token);
		});
    };

    logout = function () {
		$window.localStorage.removeItem('auth');
    };

    return {
		saveToken: saveToken,
		getToken: getToken,
		isLoggedIn: isLoggedIn,
		// register: register,
		login: login,
		logout: logout
    };
}
