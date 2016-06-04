angular.module('moocmates.controllers', [])


.controller('AppCtrl', function($scope, $window, Config, $http, $ionicModal, $timeout) {

    //form data for the login modal
  $scope.loginData = {};

  // check auth
  $scope.isAuth = function () {
    $http.get(Config.api + '/check' + '?token=' + sessionStorage.getItem('mmToken'))
    .then(function(result) {
      console.log(result.data);
      if (result.data.success === true ) {
        $scope.auth = true;
      } else {
        $scope.auth = false;
      }
    })
  }

  $scope.isAuth();

  $scope.mmToken = sessionStorage.getItem('mmToken');
  //console.log($scope.mmToken);
  // create the login modal
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // triggered in the login modal to close
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  $scope.login = function() {
    $scope.modal.show();
  };

  $scope.logout = function() {
    console.log($scope.auth);
    $scope.auth = false;
    sessionStorage.setItem('mmToken', 'empty');
  }

  $scope.doLogin = function(username, password) {
    // call the api for auth
    console.log($scope.loginData.username);


    $http.post(Config.api + '/auth', {
      name: $scope.loginData.username,
      password: $scope.loginData.password
    }).then(function(result) {
      $window.sessionStorage.setItem('mmToken', result.data.token);
      $scope.auth = true;
      $scope.name = $scope.loginData.username;
    });

    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
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

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
