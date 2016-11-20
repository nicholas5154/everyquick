'use strict'

/**
* @ngdoc service
* @name everyquickApp.Profile
* @description
* # Profile
* Factory in the everyquickApp.
*/
angular.module('everyquickApp')
.factory('Profile', ['$firebaseObject', '$firebaseArray',
  function ($firebaseObject, $firebaseArray) {
    return function (username) {
      var ref = firebase.database().ref('userData')
      var profileRef = ref.child(username)
      var pobj = $firebaseObject.$extend({
        addSentDelivery: function (deliveryId) {
          return $firebaseArray(this.$ref().child('sentDeliveries')).$add(deliveryId)
        },
        addCarryDelivery: function (deliveryId) {
          return $firebaseArray(this.$ref().child('carryDeliveries')).$add(deliveryId)
        }
      })
      return pobj(profileRef)
    }
  }
])
