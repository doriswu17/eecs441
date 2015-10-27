//public variables
var glb_userName = "";

angular.module('starter.controllers', [])

// *** PC: Each route should have it's own controller and the controller can let you do many things
// The view files will interact with the controller and the controller will interact with the model.
.controller('DashCtrl', function($scope) {
  // *** PC: Define any variables you want with $scope. $scope is essentially the global variable for
  // this particular controller and this view (html file) but in the HTML, you don't have to write $scope.name
  // to access this variable, instead you just type 'name'. Check out tab-dash.html.
  $scope.name = "Prateek Sachdeva";

  // *** PC: This is how you define functions and since $scope is accessible by the whole controler
  $scope.hello = function() {
    alert("Hello. How are you " + $scope.name);
  }
})

.controller('ChatsCtrl', function($scope, Chats) {
  // *** PC: You can call class functions for any factory (check out services.js).
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})


.controller('LoginCtrl', function($scope) {
  $scope.settings = {
    showSignup: false,
    enableFriends: true
  };

  $scope.userInfo = {
    username: 'user',
    email: 'emai',
    password: 'pass'
  };

  $scope.loginUser = function(username,password) {
    console.log("Login called");
    console.log("username: " + username)
    console.log("password: " + password)

    Parse.User.logIn(username, password, {
      success: function(user) {
        alert("Log in success!");
        glb_userName = username;
        window.location.href="#/tab/dash"
      },
      error: function(user, error) {
        alert(":-( Try again!");
      }
    });
  }

  $scope.showSignup = function() {
    $scope.settings.showSignup = true;
  }

  $scope.createUser = function(username,email,password) {
    console.log("createUser called");
    console.log("username: " + username)
    console.log("email: " + email)
    console.log("password: " + password)
   // ParseLogin = Parse.Object.extend("User");
    // Add something to the user table
    var ParseUser = new Parse.User();
    ParseUser.set("username", username)
    ParseUser.set("password", password)
    ParseUser.set("email", email)

    ParseUser.signUp(null, {
      success: function(ParseUser) {
        alert("I finally worked");
      },
      error: function(ParseUser, error) {
        // Show the error message somewhere and let the user try again.
        alert("Error: " + error.code + " " + error.message);
      }
    });
  }


})

.controller('RegisterCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };

  $scope.createUser = function() {
    console.log("createUser called");
  }

})


.controller('newPostCtrl', function($scope) {

  $scope.Request = {
    holderName: 'holderName',
    tradeClass: 'tradeClass',
    from_s: 'from_s',
    to_s: 'to_s',
  };
  
  $scope.submitRequest = function(c, from, to) {
    console.log(" called");
    console.log("username: " + from)
    console.log("email: " + to)
    // console.log("password: " + password)

    var ParseRequest = Parse.Object.extend("Request")
    // Add something to the user table


    var ParseRequest1 = new ParseRequest();
    ParseRequest1.set("holderName", glb_userName);
    ParseRequest1.set("tradeClass", c)
    ParseRequest1.set("from_s", from)
    ParseRequest1.set("to_s", to)

    ParseRequest1.save(null, {
      success: function() {
        alert("Post success!");
        window.location.href="#/tab/dash"
      }
    });
  }

})




