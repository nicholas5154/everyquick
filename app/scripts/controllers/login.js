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
	['$scope', 'Auth', '$state', '$ionicViewSwitcher', 
	function($scope, Auth, $state, $ionicViewSwitcher) {
		$scope.loginData = {
			email: '',
			password: ''
		};
		var authData = Auth.$getAuth();
		if(authData){
			$state.go('tabs.delivery');
		}
		$scope.login = function(){
			firebase.auth().signInWithEmailAndPassword($scope.loginData.email, $scope.loginData.password)
			.then(function(){
				$ionicViewSwitcher.nextDirection('forward');
				$state.go('tabs.delivery');
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
