angular.module('project', ['ngRoute', 'firebase']).
  value('fbURL', 'https://angularjs-projects.firebaseio.com/').
  factory('Projects', function(angularFireCollection, fbURL) {
    return angularFireCollection(fbURL);
  }).config(function($routeProvider) {
    $routeProvider.
      when('/', {controller:ListCtrl, templateUrl:'lista.html'}).
      otherwise({redirectTo:'/'});
  });
 
function ListCtrl($scope, Projects) {
	console.log(Projects);
  $scope.projects = Projects;
}


/*Appnima.User.signup("peru_masc@msn.com", "12345678");
Appnima.User.login("peru_masc@msn.com", "12345678");

Appnima.User.info();
Appnima.User.subscribe("design.anguel@gmail.com");*/
	//var UserInfo = Appnima.User.info();
	//Appnima.User.subscribe("design.anguel@gmail.com");
	/*data = {
	    name: "Anguel Sirlopu C",
	}

	Appnima.User.info(data);*/
	//Appnima.User.logout();
	//console.log(UserInfo);
	//Appnima.User.ticket("[SUGGESTION] Botones más grandes");
//$('.user_thumb').html(UserInfo.result.thumb);
//console.log(Appnima.User.info());

//cambio
$('#login').submit(function(){
	var email = $('#email').val();
	var password = $('#password').val();
	Appnima.User.login(email, password).then(function(error, result){
	    if(error !== null){

	        $('#error').html('<header class="panel-heading text-center">'+ error.message +'</header>');
	    }else{

			console.log(Appnima.User.session());
	        //$('#data_user').append('<li>'+ result.mail +'</li>');
	        //console.log(Appnima.Network.follow("5245587ad334673228000c1b"));
	    }
	});
	return false;
});
$('#signup').submit(function(e){
	var email = $('#signup_email').val();
	var password = $('#signup_password').val();
	var signup = Appnima.User.signup(email, password);
	console.log(signup);
	e.preventDefault();
});

$('#subscribe').submit(function(e){
	var email = $('#subscribe_email').val();
	var subscribe = Appnima.User.subscribe(email);
	console.log(subscribe);
	e.preventDefault();
});

$('#message').submit(function(e){
	var user = $('#message_user').val();
	var asunto = $('#message_asunto').val();
	var message = $('#message_message').val();
	var send = Appnima.Messenger.message(user, message , asunto);
	console.log(send);
	var imbox = Appnima.Messenger.messageInbox();
	console.log("imbox",imbox);
	
	e.preventDefault();
});

$('#follow').submit(function(e){
	var user = $('#follow_user').val();
	var follow = Appnima.Network.follow(user);
	console.log(follow);
	console.log("following",Appnima.Network.following());
	console.log("followers",Appnima.Network.followers());
	e.preventDefault();
});

/*o.prototype.elements={
	"#signup-nickname":"signup_nickname",
	"#signup-mail":"signup_mail",
	"#signup-password":"signup_password",
	"#signup-error":"signup_error",
	"#remember_psw_mail":"remember_mail",
	"#remember-error":"remember_error",
	"#login-mail":"login_mail",
	"#login-password":"login_password",
	"#login-error":"login_error",
	"[data-action=signup]":"button_signup",
	"[data-action=login]":"button_login"
};
o.prototype.onSignup=function(){
	var t,e=this;
	t={
		nickname:this.signup_nickname.val(),
		mail:this.signup_mail.val(),
		password:this.signup_password.val()
	};
	if(t.mail&&t.password&&t.nickname){
		return App.proxy("POST","signup",t,function(t){
			e._setCookie(t);
			return window.location.reload()
		},function(t,n){
			var o;
			if(n.responseText.indexOf("{")>=0){
				o=JSON.parse(n.responseText).message
			}else{o=n.responseText}
			return e._showError(e.signup_error,o)
		},true)
	}
};
o.prototype.onLogin=function(t){
	var e,n,o,r=this;
	if(t.keyCode===13||t.type==="click"){
		n=this.login_mail.val();
		o=this.login_password.val();
		if(n&&o){
			e={
				mail:n,
				password:o
			};
			return App.proxy("POST","login",e,function(t){
				return r._setCookie(t)
			},function(t){
				return r._showError(r.login_error)
			},true)
		}
	}
};
o.prototype._setCookie=function(t){
	var e;
	e=new Date;
	e.setTime(e.getTime()+1e3*60*60*24*14);
	document.cookie="session="+escape(t.key)+";expires="+e.toGMTString();
	if(t.type==="admin"){
		return document.location.href=App.Domain+"/admin"
	}else{
		return window.location.reload()
	}
};
*/
