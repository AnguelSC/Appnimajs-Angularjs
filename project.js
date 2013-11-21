
function NewDate(timestamp) {
    var date = (timestamp) ? new Date(timestamp) : new Date(),
        hours = date.getHours() || 12,
        minutes = '' + date.getMinutes(),
        ampm = (date.getHours() >= 12) ? 'pm' : 'am'; 

    hours = (hours > 12) ? hours - 12 : hours;
    minutes = (minutes.length < 2) ? '0' + minutes : minutes;
    return '' + hours + ':' + minutes + ampm;
  };

var APP = angular.module('app', ['service','firebase']);
APP.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/',{
    templateUrl : 'templates/home.html',
    controller:'home'
  })
  .when('/follow',{
    templateUrl : 'templates/follow.html',
    controller:'followCtrl'
  })
  .when('/user/:userId',{
    templateUrl : 'templates/profile.html',
    controller:'profileCtrl'
  })
  .otherwise({
    redirectTo: '/'
  });
}]);
//follow
APP.controller('followCtrl', ['$scope', 'user', function($scope, user) {
    user.following(function(response) {
      $scope.$apply(function() {
        $scope.following = response;
      });
     });

    user.followers(function(response) {
      $scope.$apply(function() {
        $scope.followers = response;
      });
    });
}]);
//profile
APP.controller('profileCtrl', ['$scope', '$routeParams', 'user', function($scope, $routeParams, user) {
  var b = $routeParams.userId;
  user.infuser(b,function(response) {
    $scope.$apply(function() {
      $scope.user = response[0];
    });
    user.check(response[0].id,function(result) {
      $scope.$apply(function() {
        $scope.check = result.following;
      });
    }); 
    if (Appnima.User.session().id == response[0].id) {
      $scope.$apply(function() {
        $scope.isUser = true;
      });
    };
  });
  $scope.follow = function(){
    user.follow($scope.user.id,function(response) {
      if (response.status = "Ok") {
        $scope.$apply(function() {
          $scope.check = !$scope.check;
          var cont = $('#count_following').text(),r = parseInt(cont)+1;
          $('#count_following').text(r);
        });
      }
    });
  }
  $scope.unfollow = function(){
    user.unfollow($scope.user.id,function(response) {
      if (response.status = "Ok") {
        $scope.$apply(function() {
          $scope.check = !$scope.check;
          var cont = $('#count_following').text(),r = parseInt(cont)-1;
          $('#count_following').text(r);
        });
      }
    });
  }
}]);
APP.controller('home', function($scope) {
  $scope.message = 'This is Add new order screen';
});
//<a href="#purchases" data-role="purchases" class="active"><span class="icon credit-card"></span>Purchases<small>(1)</small></a>
APP.controller('userCtrl', ['$scope', 'user', function($scope, user) {
  $scope.loader  = function(){
    user.info(function(response) {
    $scope.$apply(function() {
      $scope.data = response[0];
      console.log(response[0]);
      $('#update_nickname').val($scope.data.username);
      $('#update_name').val($scope.data.name);
      $('#update_bio').val($scope.data.bio);
      $('#update_avatar').val($scope.data.avatar);
      $('#update_address').val($scope.data.address);
      $('#update_site').val($scope.data.site);
      $('#update_twitter').val($scope.data.twitter);
      TukTuk.Modal.show("edit-profile");
    });
   });
  };
  $scope.$on('changefollow', function(event, message) {
      $scope.count_followers = message;
  });    
  $scope.logout = function(){
    localStorage.clear();
    Appnima.User.logout();
    return window.location.reload();
  };
  user.following(function(response) {
      $scope.$apply(function() {
        $scope.count_following = response.length;
      });
     });
    user.followers(function(response) {
      $scope.$apply(function() {
        $scope.count_followers = response.length;
      });
     });
  user.info(function(response) {
    $scope.$apply(function() {
      $scope.data = response[0];
    });
  });
}]);
APP.controller('LoginCtrl', ['$scope', 'user', function($scope, user) {
 $scope.login = function(){
    user.login({user:$scope.mail,password:$scope.password});
  };
}]);
//update profile
APP.controller('updateCtrl', ['$scope', 'user', function($scope, user) {
  $scope.updateProfile = function(){
  
  var datos = {
    username  : $('#update_nickname').val(),
    name      : $('#update_name').val(),
    bio       : $('#update_bio').val(),
    avatar    : $('#update_avatar').val(),
    //address   : $('#update_address').val(),
    //site      : $('#update_site').val(),
    //twitter   : $('#update_twitter').val()
  };
  /*if (datos.avatar == null) {
    datos.avatar = "http://appnima.com/img/avatar.jpg";
  }*/
  var up = user.update(datos);
  //user.update(datos);
 };
}]);
APP.controller('chatCtrl', ['$scope', 'user','angularFire', function($scope, user,angularFire) {
  /*for (var i = 0; i < $scope.messages.length; i++) {
    t = moment($scope.messages[i].date,"YYYY-MM-DD hh:mm:ss").fromNow();
    console.log(t);
    $(".moment").html(t);
  }*/
  
  var ref = new Firebase("https://anguelsc.firebaseio.com/");
  $scope.messages = [];
  angularFire(ref, $scope, "messages");
  $scope.addMessage = function() {
    var e = $scope.msg;
    user.info(function(response) {
      $scope.$apply(function() {
        var t;
        $scope.messages.push({user: response[0], body: $scope.msg,date:NewDate()});

        $scope.msg = "";
      });
    });
  }
}]);

/*
var imbox = new Appnima.Socket.Inbox();
APP.controller('imboxCtrl', ['$scope', 'user', function($scope, user) {
  $scope.send = function(){
    var envio = new Appnima.Socket.User($scope.user);
    console.log(envio.send($scope.message));
  };
  imbox.onMessage(function(result){
    console.log(result);
  });
}]);*/

/*function followCtrl($scope) {
  Appnima.Network.following().then(function(error,result){
    if (error !== null) {
    }else{
      $scope.$apply(function() {
          $scope.following = result;
        });
    }
  });// console.log($scope.content  = [{id:'hola'}]);
}*/
