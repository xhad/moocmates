angular.module('moocmates.services', [])

// store global app configurations
.factory('Config', function() {
  var all = {
    api: 'http://localhost:8101/api',
    server: 'https://bankchat.info'
  }
  return all;
})

.service('AuthService', function($http, $timeout, $location, $window, Config) {
  var auth;
  var loginData = {};
  var name = '';


  function isAuth() {
    var token = localStorage.getItem('AUTH_TOKEN');


    return $http.get(Config.api + '/check' + '?token=' + token)
      .then(function(result) {
        console.log('authentication is ' + result.data.success);
        if (result.data.success === false) {
          $location.path('/app/landing');
        }
        return auth = result.data.success;
      });
  };

  function doLogin(username, password) {
    $http.post(Config.api + '/auth', {
      name: username,
      password: password
    }).then(function(result) {
      localStorage.setItem('AUTH_TOKEN', result.data.token);
      localStorage.setItem('username', username);
      if (isAuth()) {
        $location.path('/app/chat');
      } else {
        $location.path('/app/chat');
      }
    });
  };

  function logout() {
    localStorage.setItem('AUTH_TOKEN', 'no_token');
    console.log(localStorage.getItem('AUTH_TOKEN'));
    $location.path('/app/landing');
  };

  return {
    auth: function() {
      return isAuth()
    },
    username: localStorage.getItem('username'),
    logout: logout,
    doLogin: doLogin,
    AUTH_TOKEN: localStorage.getItem('AUTH_TOKEN')
  }
})

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'xhad',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Nate',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Marissa',
    lastText: 'Look at my mukluks!',
    face: 'img/girl.jpg'
  }, {
    id: 4,
    name: 'Hong Man',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

.config(['$httpProvider', function($httpProvider) {
  // Intercept POST requests, convert to standard form encoding
  // $httpProvider.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
}]);
