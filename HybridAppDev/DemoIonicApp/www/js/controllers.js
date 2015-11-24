//public variables
var glb_userName = "";



angular.module('starter.controllers', [])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    setTimeout(function() {
        navigator.splashscreen.hide();
    }, 300);
 });
})


// *** PC: Each route should have it's own controller and the controller can let you do many things
// The view files will interact with the controller and the controller will interact with the model.
.controller('DashCtrl', function($scope) {

  // *** PC: Define any variables you want with $scope. $scope is essentially the global variable for
  // this particular controller and this view (html file) but in the HTML, you don't have to write $scope.name
  // to access this variable, instead you just type 'name'. Check out tab-dash.html.
  $scope.settings = {
      showGreeting:  false,
      showreminder: true
    };
  var currentuser = Parse.User.current();
  if(currentuser){

    $scope.settings.showGreeting = true;
    $scope.settings.showreminder = false;


    console.log(currentuser.get("username"));
    $scope.name = currentuser.get("username");

    var requestlist = Parse.Object.extend("Request")
    var query = new Parse.Query(requestlist)
    query.equalTo("holderName",currentuser.get("username"))
    query.find({
      success:function(results){
        if (results.length == 0){
          var r = $("<div> You haven't posted any request yet!</div>");
           $("#c").append(r);
        }
        //alert(results.length);
        else{
          var a = $("<div> Here are your submitted requests: </div>");
           $("#c").append(a);
        for(var i = 0; i < results.length;i++){
          var object = results[i];
          var r = $("<div class='list card'> <div class='item item-divider'>Request " + (i + 1) + "<p> submission time: "+ object.get("createtime").substring(0,25) +"</p></div><div class='item item-body'><div> From: <br><center><b>"+ object.get("tradeClass") + " "+ object.get("from_s") + "</b></center> </div><div>To: <br><center><b>"+ object.get("tradeClass")+ " " + object.get("to_s") + "</b></center></p></div> <p>Request status: <b>" +object.get("status") +"</b></p> <p> Your matched person's name is: <b>"+ object.get("matchusername") + "</b></p>  <p>Contact email is: <b>"+ object.get("matchuseremail") + "</b></p></div></div>" );
          $("#c").append(r);
        }
      }
      }
    });
  }
  else{
    $scope.settings.showGreeting = false;
  }
  // *** PC: This is how you define functions and since $scope is accessible by the whole controler
  // $scope.hello = function() {
  //   alert("Hello. How are you " + $scope.name);
  // }
})

.controller('InsiderCtrl', function($scope) {
  var currentuser = Parse.User.current();
  $scope.select = {
    classname: ''
  }
  $scope.settings = {
      showreminder: true,
      showGreeting: false
    };
  if(currentuser){
    $scope.settings.showreminder = false;
    $scope.settings.showGreeting = true;
  }
  else{
    $scope.settings.showreminder = true;
    $scope.settings.showGreeting = false;
  }

  $scope.showinfo = function(classname){
    $( "#c1" ).empty();
    var name = $scope.select.classname;

    var r = $("<p style = 'margin-left: 20px'>Class Name: <b>" + name+ "</b></p><p></p>");
    $("#c1").append(r);
    var requestlist = Parse.Object.extend("Request")
    var query = new Parse.Query(requestlist)
    query.equalTo("tradeClass",name)
    query.equalTo("status","requesting")
    query.find({
      success:function(results){
        var totalnum = results.length;
        var r = $("<p> Number of people looking for match: " + totalnum + "</p>")
        $("#c1").append(r);       
      }
    });
    
  }
  // *** PC: You can call class functions for any factory (check out services.js).
  // $scope.chats = Chats.all();
  // $scope.remove = function(chat) {
  //   Chats.remove(chat);
  // };

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
      showLogin:  true,
      showLogout: false,
      showSignup: false
      };
  var currentuser1 = Parse.User.current();
  if(currentuser1){
    $scope.settings.showSignup = false;
    $scope.settings.showLogin = false;
    $scope.settings.showLogout = true;
  }
  else {
    $scope.settings.showSignup = false;
    $scope.settings.showLogin = true;
    $scope.settings.showLogout = false;
  }

  $scope.userInfo = {
    username: '',
    email: '',
    password: '',
    verifypassword: ''
  };

  $scope.loginUser = function(username,password) {
    console.log("Login called");
    console.log("username: " + username)
    console.log("password: " + password)

    Parse.User.logIn(username, password, {
      success: function(user) {
        alert("Log in success!");
        glb_userName = username;
        window.location.href="#/tab/dash";

        window.location.reload(true);

        $scope.settings.showSignup = false;
        $scope.settings.showLogin = false;
        $scope.settings.showLogout = true;
      },
      error: function(user, error) {
        alert(":-( Try again!");
      }
    });
  }

  $scope.logoutUser = function(){
    alert("You have logged out!")
    Parse.User.logOut();
    window.location.href="#/tab/dash";

    window.location.reload(true);


    $scope.settings.showSignup = false;
    $scope.settings.showLogin = true;
    $scope.settings.showLogout = false;

  }



  $scope.showSignup = function() {
    $scope.settings.showSignup = true;
  }

  $scope.createUser = function(username,email,password,verifypassword) {
    console.log("createUser called");
    console.log("username: " + username)
    console.log("email: " + email)
    console.log("password: " + password)
   // ParseLogin = Parse.Object.extend("User");
    // Add something to the user table
    if (username.length < 3){
      alert("Please pick a longer username.");
      return;
    }
    if (password.length < 7){
      alert("Password is too short, should be longer than 8 chars.");
      return;
    }
    if(password != verifypassword){
      alert("Verify Password is different from Password.");
    }
    var ParseUser = new Parse.User();
    ParseUser.set("username", username)
    ParseUser.set("password", password)
    ParseUser.set("email", email)

    var q = new Parse.Query(Parse.User);
    var n = username;
    q.equalTo("username", n);
    var q1 = new Parse.Query(Parse.User);
    q1.equalTo("email",email);

    var mainq = Parse.Query.or(q,q1);
    mainq.find({
      success: function(results){
        if (results.length){
          alert("The username/email has been used. Please try another one.");
        }
        else{
          ParseUser.signUp(null, {
             success: function(ParseUser) {
              alert("Congratulations! You signed up successfully! ");
              window.location.href="#/tab/dash";

              window.location.reload(true);
               },
              error: function(ParseUser, error) {
        // Show the error message somewhere and let the user try again.
              alert("Error: " + error.code + " " + error.message);
          }
          });
        }
      }
    })


    // ParseUser.signUp(null, {
    //   success: function(ParseUser) {
    //     alert("Congratulations! You signed up successfully! ");
    //     window.location.href="#/tab/dash";

    //     window.location.reload(true);
    //   },
    //   error: function(ParseUser, error) {
    //     // Show the error message somewhere and let the user try again.
    //     alert("Error: " + error.code + " " + error.message);
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


.controller('newPostCtrl', function($scope) {

  $scope.Request = {
    holderName: 'holderName',
    tradeClass: 'tradeClass',
    from_s: 'from_s',
    to_s: 'to_s',
    createdAt: 'createtime',
    matchusername: 'matchusername',
    matchuseremail: 'matchuseremail'
  };

  $scope.settings = {
      showRequest:  false,
      showwarning: true
  };

  var currentuser = Parse.User.current();
  if(currentuser){
    $scope.settings.showRequest = true;

    $scope.settings.showwarning = false;//


  }
  //window.location.reload(true);

  $scope.submitRequest = function(c, from, to) {
    $scope.before = false;
    console.log(" called");
    console.log("username: " + from)
    console.log("email: " + to)
    // console.log("password: " + password)

    var ParseRequest = Parse.Object.extend("Request")
    // Add something to the user table


    var ParseRequest1 = new ParseRequest();
    var currentuser = Parse.User.current();
    var now = Date().toString();
    glb_userName = currentuser.get("username");

    ParseRequest1.set("holderName", glb_userName);
    ParseRequest1.set("tradeClass", c);
    ParseRequest1.set("from_s", from);
    ParseRequest1.set("to_s", to);
    ParseRequest1.set("status", "requesting");
    ParseRequest1.set("createtime", now);

    //test if the same section has been submitted
    if (from == to){
      alert("You cannot switch between the same section");
      return;
    }
    //test if the same request has been submitted
    //var same = Parse.Object.extend("Request");
    var q = new Parse.Query(ParseRequest);
    q.equalTo("tradeClass",c);
    q.equalTo("from_s",from);
    q.equalTo("to_s",to);
    q.equalTo("holderName",glb_userName);
    q.find({

      success:function(results){
        console.log(results.length)
        if(results.length > 0){
        alert("You have submitted the request before");
          $scope.before = true;
          return;   
        }
        var match = Parse.Object.extend("Request");
    var query = new Parse.Query(match);
    query.equalTo("tradeClass",c);
    query.equalTo("from_s",to);
    query.equalTo("to_s",from);
    //console.log( query);
    
    query.find({
    success:function(results){
      if (results.length > 0){
        for (var i = 0; i < results.length;i++){
          if (results[i].get("status") == "requesting"){
            console.log(query);
      //query.descending("createdAt");
            console.log(ParseRequest1);
            ParseRequest1.set("status", "matched");
            ParseRequest1.set("matchusername",results[i].get("holderName"))
            
            var query1 = new Parse.Query(Parse.User);
            var n = String(results[i].get("holderName"));
            console.log(n);
            query1.equalTo("username", n);
           
            query1.find({
              success:function(musers){
                console.log(musers.length);
                console.log(musers[0].get("email"));
                  //alert("length:", musers.length);
                  //alert("what we have here: ",musers[0].get("username"),musers[0].get("email"));
                  var object = musers[0];
                  ParseRequest1.set("matchuseremail",object.get("email"))
                  ParseRequest1.save(null, {});
              }
            });

            console.log(ParseRequest1);
            results[i].set("status", "matched");
            results[i].set("matchusername",glb_userName);
            var cuser = Parse.User.current();
            results[i].set("matchuseremail",cuser.get("email"))
            results[i].save(null,{});

            break;
          }
        }
      }
      ParseRequest1.save(null, {
      success: function() {
        alert("Post success!");
        window.location.href="#/tab/dash";
                window.location.reload(true);

      }
    });
    },
    error: function(){
      console.log(query);
      alert("No Match");
      ParseRequest1.save(null, {
      success: function() {
        alert("Post success!");
        window.location.href="#/tab/dash";
                window.location.reload(true);
      }
    });
    }
  }); // query find
      }
    });

  }

})




