'use strict'

/**
 * @ngdoc function
 * @name everyquickApp.controller:DeliveryexploreCtrl
 * @description
 * # DeliveryexploreCtrl
 * Controller of the everyquickApp
 */
angular.module('everyquickApp')
.controller('DeliveryExploreCtrl', ['$scope', '$firebaseArray',
  function ($scope, $firebaseArray) {
    var messagesRef = firebase.database().ref().child('deliveries')
      // download the data from a Firebase reference into a (pseudo read-only) array
      // all server changes are applied in realtime
    $scope.messages = $firebaseArray(messagesRef)
      // create a query for the most recent 25 messages on the server
    var query = messagesRef.orderByChild('state').equalTo('모집중')
      // the $firebaseArray service properly handles database queries as well
    $scope.deliveries = $firebaseArray(query)
    navigator.geolocation.getCurrentPosition(function(position) {
      var coords = position.coords
      $scope.coords = coords
      for(var idx=0; idx<$scope.deliveries.length; idx++) {
        $scope.deliveries[idx].dist = 
          (coords.latitude-$scope.deliveries[idx].dep.latitude) * (coords.latitude-$scope.deliveries[idx].dep.latitude) + 
          (coords.longitude-$scope.deliveries[idx].dep.longitude) * (coords.longitude-$scope.deliveries[idx].dep.longitude);
      }
      // calculate distance between me and departure
    }, function(error) {
      var uagent = navigator.userAgent.toLocaleLowerCase()
      if (uagent.search("android") > -1) {
      alert("위치 정보를 찾을 수 없습니다. <br> 현재 위치를 사용하시려면 설정에서 <br> 위치정보 사용을 승인해 주세요.")
      if (uagent.search("chrome") > -1)
        appdown.browser = "android+chrome"
      } else if (uagent.search("iphone") > -1
        || uagent.search("ipod") > -1
        || uagent.search("ipad") > -1) {
        alert("위치 정보를 찾을 수 없습니다. <br> 현재 위치를 사용하시려면 <br> [ios 설정 &gt; 개인정보보호 &gt; 위치서비스]를 켜주세요.")
      }
    })
      // get current geolocation
  }
])
