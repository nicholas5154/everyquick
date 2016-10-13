'use strict';

/**
* @ngdoc function
* @name everyquickApp.controller:LandingCtrl
* @description
* # LandingCtrl
* Controller of the everyquickApp
*/
angular.module('everyquickApp')
.controller('LandingCtrl', 
	['Auth', '$state', '$ionicViewSwitcher', 
	function(Auth, $state, $ionicViewSwitcher) {
		var landing = this;
		var authData = Auth.$getAuth();
		if(authData){
			$state.go('tabs.delivery');
		}
		landing.login = function(){
			firebase.auth().signInWithEmailAndPassword(landing.email, landing.password)
			.then(function(){
				$ionicViewSwitcher.nextDirection("forward");
				$state.go('tabs.delivery');
			})
			.catch(function(error) {
			// Handle Errors here.
			landing.error = error;
			landing.errorCode = error.code;
			landing.errorMessage = error.message;
			// ...
			});
		}
	}
]);