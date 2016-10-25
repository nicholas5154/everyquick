'use strict';

/**
 * @ngdoc service
 * @name everyquickApp.Delivery
 * @description
 * # Delivery
 * Factory in the everyquickApp.
 */
angular.module('everyquickApp')
.factory('Delivery', ['$firebaseArray', '$firebaseObject', 'Auth',
	function ($firebaseArray, $firebaseObject, Auth) {
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
			return $firebaseObject(deliveriesRef.child(deliveryId));
		};

		var getSent = function(){
			var sentRef = Auth.profile.$ref().child('sentDeliveries');
			return $firebaseArray(sentRef);
		};

		return {
			post: post,
			fetch: fetch,
			getSent: getSent
		};
	}
]);
