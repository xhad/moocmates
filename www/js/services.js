angular.module('moocmates.services', [])

// store global app configurations
.factory('Config', function() {
  var all = {
    api: 'https://bankchat.info/api',
    server: 'https://bankchat.info'
  }
  return all;
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

.config(['$httpProvider', function ($httpProvider) {
  // Intercept POST requests, convert to standard form encoding
  // $httpProvider.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
}]);
