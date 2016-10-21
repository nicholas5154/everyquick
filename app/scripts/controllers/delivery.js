'use strict';

/**
* @ngdoc function
* @name everyquickApp.controller:SignupCtrl
* @description
* # SignupCtrl
* Controller of the everyquickApp
*/
angular.module('everyquickApp')
.controller('DeliveryCtrl', 
	['$scope', '$firebaseArray',
	function($scope, $firebaseArray) {
	var messagesRef = firebase.database().ref().child('deliveries');
	// download the data from a Firebase reference into a (pseudo read-only) array
	// all server changes are applied in realtime
	$scope.messages = $firebaseArray(messagesRef);
	// create a query for the most recent 25 messages on the server
	var query = messagesRef.orderByChild('timestamp').limitToLast(25);
	// the $firebaseArray service properly handles database queries as well
	$scope.deliveries = $firebaseArray(query);

	}
]);
