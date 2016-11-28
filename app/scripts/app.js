'use strict'

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('everyquickApp', ['ionic', 'firebase', 'ionic.rating'])

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
      window.StatusBar.styleDefault()
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
      cache: false,
      url: '/',
      templateUrl: 'views/landing.html',
      controller: 'LandingCtrl',
      authRequired: false
    })
    .state('login', {
      cache: false,
      url: '/login',
      templateUrl: 'views/login.html',
      controller: 'LoginCtrl',
      authRequired: false,
      params: {
        callback: null
      }
    })
    .state('signup', {
      cache: false,
      url: '/signup',
      templateUrl: 'views/signup.html',
      controller: 'SignupCtrl',
      authRequired: false
    })
    .state('sidebar', {
      cache: false,
      abstract: true,
      templateUrl: 'views/sidebar.html',
      controller: 'SidebarCtrl'
    })
    .state('send', {
      cache: false,
      url: '/send',
      parent: 'sidebar',
      abstract: true,
      templateUrl: 'views/send.html'
    })
    .state('send.home', {
      cache: false,
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
      cache: false,
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
      cache: false,
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
      cache: false,
      url: '/delivery',
      abstract: true,
      parent: 'sidebar',
      templateUrl: 'views/delivery.html'
    })
    .state('delivery.my', {
      cache: false,
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
      cache: false,
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
      cache: false,
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
      cache: false,
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
    .state('delivery.froutes', {
      cache: false,
      url: '/route/',
      views: {
        'delivery-explore': {
          templateUrl: 'views/frequent-routes.html',
          reloadOnSearch: false,
          controller: 'FrequentRoutesCtrl'
        }
      },
      authRequired: true
    })
    .state('delivery.froute-new', {
      cache: false,
      url: '/route/new',
      views: {
        'delivery-explore': {
          templateUrl: 'views/frequent-route-new.html',
          reloadOnSearch: false,
          controller: 'FrequentRouteCtrl'
        }
      },
      authRequired: true
    })
    .state('mypage', {
      cache: false,
      url: '/mypage',
      templateUrl: 'views/mypage.html',
      controller: 'MypageCtrl',
      reloadOnSearch: false
    })
  $urlRouterProvider.otherwise('/')
})

.config(function ($ionicConfigProvider) {
  $ionicConfigProvider.backButton.text('')
  // $ionicConfigProvider.views.maxCache(0)
})
