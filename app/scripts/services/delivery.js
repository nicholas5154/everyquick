'use strict'

/**
 * @ngdoc service
 * @name everyquickApp.Delivery
 * @description
 * # Delivery
 * Factory in the everyquickApp.
 */
angular.module('everyquickApp')
.factory('Delivery', ['$firebaseArray', '$firebaseObject', 'Auth', 'Profile',
  function ($firebaseArray, $firebaseObject, Auth, Profile) {
    var deliveriesRef = firebase.database().ref().child('deliveries')
    var deliveries = $firebaseArray(deliveriesRef)

    var post = function (dep, dest, price) {
      return deliveries.$add({
        sender: Auth.$getAuth().uid,
        dep: dep,
        dest: dest,
        price: price,
        state: '모집중',
        posted: firebase.database.ServerValue.TIMESTAMP
      })
      .then(function (ref) {
      // if posted succesfully,
      // add this delivery to my sentDeliveries
        var sentRef = Auth.profile.$ref().child('sentDeliveries')
        $firebaseArray(sentRef).$add(ref.key)
      })
    }

    var fetch = function (deliveryId) {
      var dobj = $firebaseObject
        .$extend({
          applyAsCarrier: function () {
            var applyingCarriers = $firebaseArray(this.$ref().child('applyingCarriers'))
            applyingCarriers.$loaded().then(function () {
              if (applyingCarriers.map(x => x.$value).indexOf(Auth.$getAuth().uid) === -1) {
                applyingCarriers.$add(Auth.$getAuth().uid)
              }
            })
          },
          $getApplicants: function () {
            var applyingCarriers = $firebaseArray(this.$ref().child('applyingCarriers'))
            return applyingCarriers.$loaded().then(function () {
              return Promise.all(applyingCarriers.map(x => x.$value).map(x => Profile(x)))
            })
          },
          selectCarrier: function (carrierId) {
            var deObj = this
            this.selectedCarrier = carrierId
            var carrierProfile
            return this.$save()
              .then(function (ref) {
                carrierProfile = Profile(carrierId)
                return carrierProfile.addCarryDelivery(ref.key)
              })
              .then(function (ref) {
                return deObj.setState('픽업대기중')
              })
              .then(function (ref) {
                return carrierProfile.$loaded().then(function (ref){
                  return deObj.addLog('carrierSelected', '배송인으로 '+carrierProfile.name+'님이 선택되었습니다.')
                })
              })
          },
          getCarrier: function () {
            return Profile(this.selectedCarrier)
          },
          reportPickup: function () {
            var deObj = this
            return deObj.setState('배송중')
              .then(function (ref) {
                return deObj.addLog('pickedUp', '배송인이 화물을 수령하여 배송중입니다')
              })
          },
          reportDelivery: function () {
            var deObj = this
            return deObj.setState('배송완료')
              .then(function (ref) {
                return deObj.addLog('delivered', '배송인이 화물 배송을 완료하였습니다')
              })
          },
          $$updated: function (snap) {
            var changed = $firebaseObject.prototype.$$updated.apply(this, arguments)
            this.datetime = new Date(this.posted)
            return changed
          },
          setState: function (newState) {
            this.state = newState
            return this.$save()
          },
          addLog: function (type, message) {
            var logs = $firebaseArray(this.$ref().child('logs'))
            return logs.$add({
              type: type,
              message: message,
              datetime: firebase.database.ServerValue.TIMESTAMP
            })
          }
        })
      return dobj(deliveriesRef.child(deliveryId))
    }

    var getSent = function () {
      var sentRef = Auth.profile.$ref().child('sentDeliveries')
      return $firebaseArray(sentRef)
    }

    var getDelivering = function () {
      var carryRef = Auth.profile.$ref().child('carryDeliveries')
      return $firebaseArray(carryRef)
    }

    return {
      post: post,
      fetch: fetch,
      getSent: getSent,
      getDelivering: getDelivering
    }
  }
])
