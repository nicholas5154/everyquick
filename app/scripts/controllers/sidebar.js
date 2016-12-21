'use strict'

/**
* @ngdoc function
* @name everyquickApp.controller:SignupCtrl
* @description
* # SignupCtrl
* Controller of the everyquickApp
*/
angular.module('everyquickApp')
.controller('SidebarCtrl', ['$scope', '$ionicSideMenuDelegate',
  function ($scope, $ionicSideMenuDelegate) {
    $ionicSideMenuDelegate.edgeDragThreshold(1)
    $ionicSideMenuDelegate.canDragContent(false)
  }
])
