'use strict';

/**
* @ngdoc function
* @name everyquickApp.controller:SendCtrl
* @description
* # SendCtrl
* Controller of the everyquickApp
*/
angular.module('everyquickApp')
.controller('SendCtrl', ['$scope', 'Delivery',
	function ($scope, Delivery) {
		$scope.sentDeliveriesRef = Delivery.getSent();
		$scope.sentDeliveriesRef.$loaded().then(function(){
			$scope.sentDeliveries = $scope.sentDeliveriesRef.map(function(x){
				return Delivery.fetch(x.$value);
			});
		});
	}
]);
