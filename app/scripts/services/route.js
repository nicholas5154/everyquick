'use strict'

/**
 * @ngdoc service
 * @name everyquickApp.Route
 * @description
 * # CarrierRoute
 * Factory in the everyquickApp.
 */
angular.module('everyquickApp')
.factory('CarrierRoute', ['$firebaseArray', 'EQSearch',
  function ($firebaseArray, EQSearch) {
    var routesRef = firebase.database().ref().child('routes')
    var routes = $firebaseArray(routesRef)

    var owner = function () {

    }

    var fetch = function (routeId) {
      return routes.$getRecord(routeId)
    }

    var post = function (dep, dest) {
// add this route to routesRef
      var routeId
      routes.$add({
        dep: dep,
        dest: dest
      }).then(function (ref) {
// add this route to my profile
        routeId = ref.key
        var routeRef = Auth.profile.$ref().child('routes')
        $firebaseArray(routeRef).$add(routeId)
        .then(function (ref) {
          EQSearch.registerRoute()
        })
      })
    }

    var remove = function () {

    }

    return {

    }
  }
])
