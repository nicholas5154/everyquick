'use strict';

/**
 * @ngdoc function
 * @name everyquickApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the everyquickApp
 */
angular.module('everyquickApp')
.controller('LoginCtrl', 
	['$scope', 'Auth', '$state', '$stateParams', '$ionicHistory', 
	function($scope, Auth, $state, $stateParams, $ionicHistory) {
		$scope.loginData = {
			email: '',
			password: ''
		};
		$scope.login = function(){
			firebase.auth().signInWithEmailAndPassword($scope.loginData.email, $scope.loginData.password)
			.then(function(){
	       		$state.go($stateParams.callback);
			})
			.catch(function(error) {
				// Handle Errors here.
				$scope.error = error;
				$scope.errorCode = error.code;
				$scope.errorMessage = error.message;
			// ...
			});
		};
	}
]);
