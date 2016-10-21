'use strict';

/**
* @ngdoc service
* @name everyquickApp.Profile
* @description
* # Profile
* Factory in the everyquickApp.
*/
angular.module('everyquickApp')
.factory('Profile', ['$firebaseObject', 
	function ($firebaseObject) {
		return function(username) {
			// create a reference to the database node where we will store our data
			var ref = firebase.database().ref("userData");
			var profileRef = ref.child(username);

			// return it as a synchronized object
			return $firebaseObject(profileRef);
		}
	}
]);
