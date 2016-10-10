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
	['Auth', '$state', '$ionicViewSwitcher', 
	function(Auth, $state, $ionicViewSwitcher) {
		var signup = this;

		this.createUser = function() {
			signup.message = null;
			signup.error = null;

			// Create a new user
			Auth.$createUserWithEmailAndPassword(signup.email, signup.password)
			.then(function(firebaseUser) {
				signup.message = "User created with uid: " + firebaseUser.uid;
				$ionicViewSwitcher.nextDirection("backward");
				$state.go('landing');
			}).catch(function(error) {
				signup.error = error;
			});
		};
	}
]);
