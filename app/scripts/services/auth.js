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
      var loaded = new Promise(
        function (resolve, reject) {
          auth.$signInWithEmailAndPassword(email, password).then(function (firebaseUser) {
            auth.profile = Profile(firebaseUser.uid)
            auth.profile.$loaded()
            .then(function (profile) {
              resolve(auth)
            })
            .catch(function (reason) {
              reject(reason)
            })
          })
        }
      )
      return loaded
    }

    auth.$onAuthStateChanged(function (firebaseUser) {
      if (firebaseUser) {
        auth.profile = Profile(firebaseUser.uid)
      }
    })

    return auth
  }
])
