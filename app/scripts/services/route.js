'use strict'

/**
 * @ngdoc service
 * @name everyquickApp.Route
 * @description
 * # CarrierRoute
 * Factory in the everyquickApp.
 */
angular.module('everyquickApp')
.factory('CarrierRoute', ['$firebaseArray', 'Auth', 'EQSearch',
  function ($firebaseArray, Auth, EQSearch) {
    var fetch = function (routeId) {
      return Auth.profile.routes
    }

    var post = function (dep, dest) {
      var route = {
        dep: dep,
        dest: dest
      }
      Auth.profile.addRoute(route)
      .then(function (ref) {
        EQSearch.registerRoute(route)
      })
    }

    var remove = function (route) {
      Auth.profile.removeRoute(route)
    }

    return {
      fetch: fetch,
      post: post,
      remove: remove
    }
  }
])
