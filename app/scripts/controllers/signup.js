'use strict';

/**
* @ngdoc function
* @name everyquickApp.controller:SignupCtrl
* @description
* # SignupCtrl
* Controller of the everyquickApp
*/
angular.module('everyquickApp')
.controller('SignupCtrl', 
	['$scope', 'Auth', '$state', '$ionicViewSwitcher', 
	function($scope, Auth, $state, $ionicViewSwitcher) {
		$scope.signupData = {};
		$scope.createUser = function() {
			// Create a new user
			Auth.$createUserWithEmailAndPassword($scope.signupData.email, $scope.signupData.password)
			.then(function(firebaseUser) {
				$scope.signupData.message = 'User created with uid: ' + firebaseUser.uid;
				$ionicViewSwitcher.nextDirection('backward');
				$state.go('landing');
			}).catch(function(error) {
				$scope.signupData.error = error;
			});
		};
	}
]);
