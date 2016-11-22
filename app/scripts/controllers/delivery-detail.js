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
.controller('DeliveryDetailCtrl', ['$stateParams', '$scope', 'Delivery', 'Auth', 'Profile',
  function ($stateParams, $scope, Delivery, Auth, Profile) {
    $scope.mode = $stateParams.mode
    $scope.rating = {
      rate: 0,
      max: 5
    }
    $scope.deliveryId = $stateParams.id
    $scope.delivery = Delivery.fetch($scope.deliveryId)
    $scope.delivery.$loaded()
    .then(function () {
      if ($scope.delivery.state !== '모집중') {
        $scope.carrier = $scope.delivery.getCarrier()
        return $scope.carrier.$loaded()
      }
      else {
        return $scope.delivery.$getApplicants().then(function (result) {
          $scope.applicants = result
        })
      }
    })
    .then(function() {
      $scope.alert = null
      if($stateParams.mode === 'send'){
        if($scope.delivery.state === '모집중'){
          if($scope.applicants.length>0)
            $scope.alert = '배송인 선택이 필요합니다.'
          else
            $scope.alert = '아직 이 퀵에 지원한 배송인이 없습니다. 잠시 후 다시 확인해 주세요.'
        }
        else if($scope.delivery.state === '배송완료'){
          $scope.alert = '퀵 배송인에 대한 리뷰를 남겨주세요.'
        }
      }
      else if($stateParams.mode === 'delivery-explore'){
        if(!Auth.$getAuth())
          $scope.alert = '로그인해야 이 퀵에 배송인으로 지원할 수 있습니다.'
      }
      else if($stateParams.mode === 'delivery-my'){
        if($scope.delivery.state === '픽업대기중'){
          $scope.alert = '배송인으로 선정되셨습니다. 화물을 픽업한 뒤 아래 픽업 완료 버튼을 눌러주세요.'
        }
        else if($scope.delivery.state === '배송중'){
          $scope.alert = '퀵 배송을 완료한 뒤 아래 배송완료 버튼을 눌러주세요.'
        }
        else if($scope.delivery.state === '배송완료'){
          $scope.alert = '퀵 발송인에 대한 리뷰를 남겨주세요.'
        }
      }
    })
    $scope.formData = {}
    $scope.formData.applicantChoice = null
  }
])
