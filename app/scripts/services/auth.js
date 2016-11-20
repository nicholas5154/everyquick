'use strict'

/**
 * @ngdoc service
 * @name everyquickApp.Auth
 * @description
 * # Auth
 * Factory in the everyquickApp.
 */
angular.module('everyquickApp')
.factory('Auth', ['$firebaseAuth', 'Profile',
  function ($firebaseAuth, Profile) {
    var auth = $firebaseAuth()

    auth.signIn = function (email, password) {
      return auth
        .$signInWithEmailAndPassword(email, password)
        .then(function (firebaseUser) {
          auth.profile = Profile(firebaseUser.uid)
          return auth.profile.$loaded()
        })
    }

    auth.$onAuthStateChanged(function (firebaseUser) {
      if (firebaseUser) {
        auth.profile = Profile(firebaseUser.uid)
      }
    })

    return auth
  }
])
