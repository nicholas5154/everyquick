'use strict';

/**
* @ngdoc function
* @name everyquickApp.controller:DeliveryDetailCtrl
* @description
* # DeliveryDetailCtrl
* Controller of the everyquickApp
*/
angular.module('everyquickApp')
.controller('DeliveryDetailCtrl', ['$stateParams', '$scope', 'Delivery',
	function ($stateParams, $scope, Delivery) {
		$scope.deliveryId = $stateParams.id;
		$scope.delivery = Delivery.fetch($scope.deliveryId);
		$scope.delivery.$loaded().then(function(){
			$scope.delivery.datetime = new Date($scope.delivery.posted);
			$scope.applyAsCarrier = function(){
				$scope.delivery.applyAsCarrier();
			};
		});
	}
]);
