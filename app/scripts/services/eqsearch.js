'use strict'

/**
 * @ngdoc service
 * @name everyquickApp.EQSearch
 * @description
 * # EQSearch
 * Factory in the everyquickApp.
 */
angular.module('everyquickApp')
.factory('EQSearch', ['$firebaseObject', '$firebaseArray',
  function () {
    var ref = firebase.database().ref()
    var carrierDepsRef = ref.child('geofire').child('carrierDeps')
    var carrierDestsRef = ref.child('geofire').child('carrierDests')
    var deliveryDepsRef = ref.child('geofire').child('deliveryDeps')
    var deliveryDestsRef = ref.child('geofire').child('deliveryDests')

    var carrierDeps = new GeoFire(carrierDepsRef)
    var carrierDests = new GeoFire(carrierDestsRef)
    var deliveryDeps = new GeoFire(deliveryDepsRef)
    var deliveryDests = new GeoFire(deliveryDestsRef)

    var registerRoute = function (dep, dest) {

    }

    var deregisterRoute = function () {

    }

    var registerDelivery = function () {

    }

    var deregisterDelivery = function () {

    }

    var findDeliveryForRoute = function (routeId) {
    }

    var findRouteForDelivery = function (deliveryId) {
    }

    return {
      registerRoute: registerRoute,
      deregisterRoute: deregisterRoute,
      registerDelivery: registerDelivery,
      deregisterDelivery: deregisterDelivery,
      findRouteForDelivery: findRouteForDelivery,
      findDeliveryForRoute: findDeliveryForRoute
    }
  }
])
