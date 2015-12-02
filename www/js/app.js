// Ionic Starter App

angular.module('underscore', [])
.factory('_', function() {
  return window._; // assumes underscore has already been loaded on the page
});

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('me', [
  'ionic',
  'angularMoment',
  'your_app_name.controllers',
  'your_app_name.directives',
  'your_app_name.filters',
  'your_app_name.services',
  'your_app_name.factories',
  'your_app_name.config',
  'underscore',
  'ngMap',
  'ngResource',
  'ngCordova',
  'slugifier',
  'ionic.contrib.ui.tinderCards',
  'youtube-embed'
])

.run(function($ionicPlatform, PushNotificationsService, $rootScope, $ionicConfig, $timeout) {

  $ionicPlatform.on("deviceready", function(){
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    PushNotificationsService.register();
  });

  // This fixes transitions for transparent background views
  $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
    if(toState.name.indexOf('auth.walkthrough') > -1)
    {
      // set transitions to android to avoid weird visual effect in the walkthrough transitions
      $timeout(function(){
        $ionicConfig.views.transition('android');
        $ionicConfig.views.swipeBackEnabled(false);
      	console.log("setting transition to android and disabling swipe back");
      }, 0);
    }
  });
  $rootScope.$on("$stateChangeSuccess", function(event, toState, toParams, fromState, fromParams){
    if(toState.name.indexOf('app.feeds-categories') > -1)
    {
      // Restore platform default transition. We are just hardcoding android transitions to auth views.
      $ionicConfig.views.transition('platform');
      // If it's ios, then enable swipe back again
      if(ionic.Platform.isIOS())
      {
        $ionicConfig.views.swipeBackEnabled(true);
      }
    	console.log("enabling swipe back and restoring transition to platform default", $ionicConfig.views.transition());
    }
  });

  $ionicPlatform.on("resume", function(){
    PushNotificationsService.register();
  });

})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $stateProvider

  //INTRO
  .state('auth', {
    url: "/auth",
    templateUrl: "views/auth/auth.html",
    abstract: true,
    controller: 'AuthCtrl'
  })

  .state('auth.login', {
    url: '/login',
    templateUrl: "views/auth/login.html",
    controller: 'LoginCtrl'
  })

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "views/app/side-menu.html",
    controller: 'AppCtrl'
  })

  //properties
  .state('app.properties', {
    url: "/properties",
    views: {
      'menuContent': {
        templateUrl: "views/app/properties.html",
        controller: 'PropertiesCtrl'
      }
    }
  })

  //purchase and sale
  .state('app.PurchasesAndSales', {
    url: "/PurchasesAndSales",
    views: {
      'menuContent': {
        templateUrl: "views/app/purchaseAndSale.html",
        controller: 'PurchaseAndSaleCtrl'
      }
    }
  })
  
  //closing
  .state('app.Closing', {
    url: "/Closing",
    views: {
      'menuContent': {
        templateUrl: "views/app/closing.html",
        controller: 'ClosingCtrl'
      }
    }
  })
  
   //renovation
  .state('app.Renovations', {
    url: "/Renovations",
    views: {
      'menuContent': {
        templateUrl: "views/app/renovation.html",
        controller: 'RenovationCtrl'
      }
    }
  })
  
  //leasing
  .state('app.Leasing', {
    url: "/Leasing",
    views: {
      'menuContent': {
        templateUrl: "views/app/leasing.html",
        controller: 'LeasingCtrl'
      }
    }
  })
  
  //occupied
  .state('app.OccupiedProperty', {
    url: "/OccupiedProperty",
    views: {
      'menuContent': {
        templateUrl: "views/app/occupied.html",
        controller: 'OccupiedCtrl'
      }
    }
  })
  
  //eviction
  .state('app.Evictions', {
    url: "/Evictions",
    views: {
      'menuContent': {
        templateUrl: "views/app/eviction.html",
        controller: 'EvictionCtrl'
      }
    }
  })
;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/auth/login');
});
