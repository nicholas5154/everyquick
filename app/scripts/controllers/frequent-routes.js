'use strict'

/**
 * @ngdoc function
 * @name everyquickApp.controller:FrequentRoutesCtrl
 * @description
 * # FrequentRoutesCtrl
 * Controller of the everyquickApp
 */
angular.module('everyquickApp')
.controller('FrequentRoutesCtrl', ['$scope', 'Auth', 'CarrierRoute',
  function ($scope, Auth, CarrierRoute) {
    $scope.routes = Auth.profile.getRoutes()
    $scope.removeRoute = function (route) {
      CarrierRoute.remove(route)
    }
  }
])
