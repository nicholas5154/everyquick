'use strict'

/**
* @ngdoc function
* @name everyquickApp.controller:SignupCtrl
* @description
* # SignupCtrl
* Controller of the everyquickApp
*/
angular.module('everyquickApp')
.controller('SignupCtrl', ['$scope', 'Auth', 'Profile', '$state', '$ionicViewSwitcher',
  function ($scope, Auth, Profile, $state, $ionicViewSwitcher) {
    $scope.signupData = {}
    $scope.createUser = function () {
      // Create a new user
      Auth.$createUserWithEmailAndPassword($scope.signupData.email, $scope.signupData.password)
      .then(function (firebaseUser) {
        $scope.signupData.message = 'User created with uid: ' + firebaseUser.uid
        $scope.profile = Profile(firebaseUser.uid)
        $scope.profile.name = $scope.signupData.name
        $scope.profile.$save().then(function () {
          $ionicViewSwitcher.nextDirection('backward')
          $state.go('landing')
        }).catch(function (error) {
          $scope.signupData.error = error
        })
      }).catch(function (error) {
        $scope.signupData.error = error
      })
    }
  }
])
