'use strict';

/**
 * @ngdoc service
 * @name everyquickApp.Auth
 * @description
 * # Auth
 * Factory in the everyquickApp.
 */
angular.module('everyquickApp')
  .factory('Auth', ["$firebaseAuth",
  function($firebaseAuth) {
    return $firebaseAuth();
  }
]);
