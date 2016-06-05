angular.module('moocmates.controllers', [])


.controller('AppCtrl', function($window, $scope, $http, AuthService, Config, $ionicModal, $timeout) {
  $scope.loginData = {};

  $scope.username = AuthService.username;
  $scope.doLogin = function() {
    AuthService.doLogin($scope.loginData.username, $scope.loginData.password);
    $timeout(function() {
      $scope.closeLogin();
      $window.location.reload();
    }, 50);
  };
  $scope.logout = function() {
    AuthService.logout();
    $timeout(function() {
      $scope.auth = AuthService.auth();
      $window.location.reload();
    }, 50);
  };

  // // create the login modal
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then((modal) => {
    $scope.modal = modal;
  });
  //
  // // triggered in the login modal to close
  $scope.closeLogin = () => {
    $scope.modal.hide();
  };
  // // show the login view
  $scope.login = () => {
    $scope.modal.show();
  };
})


.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('PagesCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
