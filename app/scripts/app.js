// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('everyquickApp', ['ionic', 'firebase'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
      .state('landing', {
        url: "/landing",
        templateUrl: 'views/landing.html'
      })
      .state('signup', {
        url: "/signup",
        templateUrl: 'views/signup.html'
      })
      .state('tabs', {
          url: "/tab",
          abstract: true,
          templateUrl: 'views/tabs.html'
      })
      .state('tabs.send', {
          url: "/send",
          views: {
              'send-home': {
                  templateUrl: 'views/send.html',
                  reloadOnSearch: false
              }
          }
      })
      .state('tabs.delivery', {
          url: "/delivery",
          views: {
              'delivery-home': {
                  templateUrl: 'views/delivery.html',
                  reloadOnSearch: false
              }
          }
      })
      .state('tabs.mypage', {
          url: "/mypage",
          views: {
              'mypage-tab': {
                  templateUrl: 'views/mypage.html',
                  reloadOnSearch: false
              }
          }
      });
  $urlRouterProvider.otherwise('/landing');
})
