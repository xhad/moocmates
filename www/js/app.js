// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('moocmates', ['ionic', 'moocmates.controllers', 'moocmates.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
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
    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'AppCtrl'
    })
    .state('app.chat', {
      url: '/chat',
      views: {
        'chatContent': {
          templateUrl: 'templates/chat/chat.html'
        }
      }
    })

  // Each tab has its own nav history stack:

  .state('app.chat.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/chat/dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('app.chat.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat/chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('app.chat.detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat/detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('app.chat.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/chat/account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/chat/dash');

})

// put the nav tabs on the bottom for all platforms
.config(['$ionicConfigProvider', function($ionicConfigProvider) {

    $ionicConfigProvider.tabs.position('bottom'); // other values: top

}]);
