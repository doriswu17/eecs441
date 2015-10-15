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

  $scope.showSignup = function() {
    $scope.settings.showSignup = true;
  }

  $scope.createUser = function(username,email,password) {
    console.log("createUser called");
    console.log("username: " + username)
    console.log("email: " + email)
    console.log("password: " + password)

    ParseLogin = Parse.Object.extend("User")
    // Add something to the user table


    var ParseUser = new Parse.User();
    ParseUser.set("username", username)
    ParseUser.set("password", password)
    ParseUser.set("email", email)

    ParseUser.signUp(null, {
      success: function() {
        alert("I finally worked");
      }
    });

    // var ParseLoginObject = new ParseLogin();
    // ParseLoginObject.set('username', 'username2')
    // ParseLoginObject.save(null, {
    //   success: function(object2){
    //     alert('successfully saved');
    //   },
    //   error: function(err) {
    //     console.log(err);
    //   }
    // });

    // QueryObject = new Parse.Query(ParseLogin);
    // QueryObject.first({
    //   success: function(object){

    //     // query the user table
    //     username1 = object.get('username')
    //     console.log(username1)
    //   }


    // });
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


.controller('AccountCtrl', function($scope) {

  $scope.Request = {
    from: 'from',
    to: 'to',
  };
$scope.submitRequest = function(from,to) {
    console.log(" called");
    console.log("username: " + from)
     console.log("email: " + to)
    // console.log("password: " + password)

    var ParseRequest = Parse.Object.extend("Request")
    // Add something to the user table


    var ParseRequest1 = new ParseRequest();
    ParseRequest1.set("from", from)
    ParseRequest1.set("to", to)

    ParseRequest1.save(null, {
      success: function() {
        alert("I finally worked");
      }
    });

}
})