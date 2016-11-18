'use strict'

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('everyquickApp', ['ionic', 'firebase'])

.run(function ($ionicPlatform, $rootScope, $state, Auth) {
  $ionicPlatform.ready(function () {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true)

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true)
    }
    if (window.StatusBar) {
      StatusBar.styleDefault()
    }
  })
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
    var authData = Auth.$getAuth()
    if (toState.authRequired && !authData) {
      // User isn’t authRequiredd
      $state.go('login', {callback: toState.name})
      event.preventDefault()
    }
  })
})

// TODO: routing based on authentication
// https://github.com/firebase/angularfire/blob/master/docs/guide/user-auth.md#authenticating-with-routers
.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
   .state('landing', {
     url: '/landing',
     templateUrl: 'views/landing.html',
     controller: 'LandingCtrl',
     authRequired: false
   })
    .state('login', {
      url: '/login',
      templateUrl: 'views/login.html',
      controller: 'LoginCtrl',
      authRequired: false,
      params: {
        callback: null
      }
    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'views/signup.html',
      controller: 'SignupCtrl',
      authRequired: false
    })
    .state('send', {
      url: '/send',
      abstract: true,
      templateUrl: 'views/send.html'
    })
    .state('send.home', {
      url: '/home',
      views: {
        'send': {
          templateUrl: 'views/send-home.html',
          controller: 'SendCtrl'
        }
      },
      authRequired: true
    })
    .state('send.new', {
      url: '/new',
      views: {
        'send': {
          templateUrl: 'views/send-new.html',
          controller: 'SendNewCtrl'
        }
      },
      authRequired: true
    })
    .state('send.detail', {
      url: '/detail/:id',
      params: {
        id: null,
        mode: 'send'
      },
      views: {
        'send': {
          templateUrl: 'views/delivery-detail.html',
          controller: 'DeliveryDetailCtrl'
        }
      },
      authRequired: true
    })
    .state('delivery', {
      url: '/delivery',
      abstract: true,
      templateUrl: 'views/delivery.html'
    })
   .state('delivery.my', {
     url: '/my',
     views: {
       'delivery-my': {
         templateUrl: 'views/delivery-home.html',
         reloadOnSearch: false,
         controller: 'DeliveryCtrl'
       }
     },
     authRequired: true
   })
    .state('delivery.my-detail', {
      url: '/my/:id',
      params: {
        id: null,
        mode: 'delivery-my'
      },
      views: {
        'delivery-my': {
          templateUrl: 'views/delivery-detail.html',
          controller: 'DeliveryDetailCtrl'
        }
      },
      authRequired: true
    })
    .state('delivery.explore', {
      url: '/explore',
      views: {
        'delivery-explore': {
          templateUrl: 'views/delivery-explore.html',
          controller: 'DeliveryExploreCtrl'
        }
      },
      authRequired: false
    })
   .state('delivery.explore-detail', {
     url: '/explore/:id',
     params: {
       id: null,
       mode: 'delivery-explore'
     },
     views: {
       'delivery-explore': {
         templateUrl: 'views/delivery-detail.html',
         reloadOnSearch: false,
         controller: 'DeliveryDetailCtrl'
       }
     },
     authRequired: false
   })
   .state('mypage', {
     url: '/mypage',
     templateUrl: 'views/mypage.html',
     controller: 'MypageCtrl',
     reloadOnSearch: false
   })
  $urlRouterProvider.otherwise('/landing')
})

.config(function ($ionicConfigProvider) {
  $ionicConfigProvider.backButton.text('')
})
