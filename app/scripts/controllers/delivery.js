'use strict'

/**
* @ngdoc function
* @name everyquickApp.controller:SignupCtrl
* @description
* # SignupCtrl
* Controller of the everyquickApp
*/
angular.module('everyquickApp')
.controller('DeliveryCtrl', ['$scope', 'Delivery',
  function ($scope, Delivery) {
    var delivering = Delivery.getDelivering()
    delivering.$loaded().then(function () {
      $scope.delivering = delivering.map(x => Delivery.fetch(x.$value))
    })
  }
])
