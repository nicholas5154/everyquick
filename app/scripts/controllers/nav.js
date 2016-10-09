'use strict';

/**
 * @ngdoc function
 * @name everyquickApp.controller:NavctrlCtrl
 * @description
 * # NavctrlCtrl
 * Controller of the everyquickApp
 */
angular.module('everyquickApp')
  .controller('ionNavBar', function ($ionicNavBarDelegate) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
