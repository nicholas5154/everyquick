'use strict'

/**
* @ngdoc function
* @name everyquickApp.controller:SignupCtrl
* @description
* # SignupCtrl
* Controller of the everyquickApp
*/
angular.module('everyquickApp')
.controller('SidebarCtrl', ['$scope', '$ionicSideMenuDelegate', 'Auth',
  function ($scope, $ionicSideMenuDelegate, Auth) {
    $ionicSideMenuDelegate.edgeDragThreshold(1)
    $ionicSideMenuDelegate.canDragContent(false)
  }
])
