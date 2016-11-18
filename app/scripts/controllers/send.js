'use strict'

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
    var sentDeliveries = Delivery.getSent()
    sentDeliveries.$loaded().then(function () {
      $scope.sentDeliveries = sentDeliveries.map(x => Delivery.fetch(x.$value))
    })
  }
])
