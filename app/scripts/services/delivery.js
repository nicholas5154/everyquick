'use strict';

/**
 * @ngdoc service
 * @name everyquickApp.Delivery
 * @description
 * # Delivery
 * Factory in the everyquickApp.
 */
angular.module('everyquickApp')
.factory('Delivery', ['$firebaseArray', 'Auth',
	function ($firebaseArray, Auth) {
		var deliveriesRef = firebase.database().ref().child('deliveries');
		var deliveries = $firebaseArray(deliveriesRef);

		var post = function(dep, dest, price){
			return deliveries.$add({
				sender: Auth.$getAuth().uid,
				dep: dep,
				dest: dest,
				price: price,
				posted: firebase.database.ServerValue.TIMESTAMP
			})
			.then(function(ref){
				//if posted succesfully, 
				//add this delivery to my sentDeliveries
				var sentRef = Auth.profile.$ref().child('sentDeliveries');
				$firebaseArray(sentRef).$add(ref.key);
			});
		};

		var fetch = function(deliveryId){
			return deliveries.$getRecord(deliveryId);
		};

		return {
			post: post,
		};
	}
]);
