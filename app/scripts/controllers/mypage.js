'use strict';

/**
* @ngdoc function
* @name everyquickApp.controller:MypageCtrl
* @description
* # MypageCtrl
* Controller of the everyquickApp
*/
angular.module('everyquickApp')
.controller('MypageCtrl', ['$scope', 'Auth', 
	function ($scope, Auth) {
		$scope.auth = Auth.$getAuth();
		$scope.profile = Auth.profile;
	}
]);
