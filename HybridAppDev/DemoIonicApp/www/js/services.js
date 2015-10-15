angular.module('starter.services', [])

// *** PC: This is where you defin the Models and access them like classes in C++
// Each 'factory' can be initialized and if there are class functions, you can use them
// without initialization.
.factory('Chats', function ($q) {
  // Some fake testing data
  var sampleData = [{
    id: 0,
    name: 'EECS 441',
    lastText: 'You got a match!',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'EECS 425',
    lastText: 'You got a match!!',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'EECS 500',
    lastText: 'You got a match!',
    face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
  }];

  var Chats = Parse.Object.extend("Chats", {
    // Instance methods
    initialize: function(attrs, options) {

    }
  }, {
    // Class methods
    all: function() {
      return sampleData;
    },
    remove: function(chat) {
      sampleData.splice(sampleData.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < sampleData.length; i++) {
        if (sampleData[i].id === parseInt(chatId)) {
          return sampleData[i];
        }
      }
      return null;
    }
  });

  return Chats;
});
