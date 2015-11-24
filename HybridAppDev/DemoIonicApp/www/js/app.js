// *** PC (Prateek's Comments):
// This file runs first when your app loads so all initialization code should go inside the
// `.run` segment. The `.config` segment is for initializing routes (urls) and what controller/view
// corresponds to each route. 

// PS: My future comments will be tagged with '*** PC'


// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

var PARSE_APP_ID = 'q0bqmwvIJblKB6MWfbqFfwn9DNMLzHOsGNxG8wqi';
var PARSE_JAVASCRIPT_KEY = '6jwYMqyVNi5P600JVAw1w4y5393jJYg4IZArDIXn';

Parse.initialize(PARSE_APP_ID, PARSE_JAVASCRIPT_KEY); 

angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  // *** PC: This function is called when the app and its plugins have loaded. Ionic
  // components are unavailable in app.js until this function is called so if you need to use
  // a plugin or Ionic, put it inside here.


   


  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
      cordova.plugins.Keyboard.disableScroll(false);

    }

    // Set the style for statusbar (org.apache.cordova.statusbar) required
    if (window.StatusBar) {
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.insider', {
      url: '/insider',
      views: {
        'tab-insider': {
          templateUrl: 'templates/tab-insider.html',
          controller: 'InsiderCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.newPost', {
    url: '/newPost',
    views: {
      'tab-newPost': {
        templateUrl: 'templates/tab-newPost.html',
        controller: 'newPostCtrl'
      }
    }
  })

  .state('tab.login', {
    url: '/login',
    views: {
      'tab-login': {
        templateUrl: 'templates/tab-login.html',
        controller: 'LoginCtrl'
      }
    }
  });

  // .state('tab.register', {
  //   url: '/register',
  //   views: {
  //     'register': {
  //       templateUrl: 'templates/register.html',
  //       controller: 'RegisterCtrl'
  //     }
  //   }
  // });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/login');

});
