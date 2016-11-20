'use strict'

/**
* @ngdoc function
* @name everyquickApp.controller:DeliveryDetailCtrl
* @description
* # DeliveryDetailCtrl
* Controller of the everyquickApp
* Possible delivery states are: 모집중, 픽업대기중, 배송중, 배송완료
*/
angular.module('everyquickApp')
.controller('DeliveryDetailCtrl', ['$stateParams', '$scope', 'Delivery', 'Profile',
  function ($stateParams, $scope, Delivery, Profile) {
    $scope.mode = $stateParams.mode
    $scope.deliveryId = $stateParams.id
    $scope.delivery = Delivery.fetch($scope.deliveryId)
    $scope.delivery.$getApplicants().then(function (result) {
      $scope.applicants = result
    })
    $scope.delivery.$loaded()
    .then(function () {
      if ($scope.delivery.state !== '모집중') {
        $scope.carrier = $scope.delivery.getCarrier()
      }
    })
    $scope.formData = {}
    $scope.formData.applicantChoice = null
  }
])
