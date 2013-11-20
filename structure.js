Parse.initialize("TaK6cColvW8LEtAkxoTRaOjIyhcqEtdniM0aU9HG", "n7lBrzj3dYf96vqwTKlmBrxxP32WGFluJHnuDnWe");
$('#click').click(function(){
	Parse.User.logIn("admin", "12345678", {
	  success: function(user) {
	  	
	    $('#username').html(user.attributes.username);
    	$('#email').html(user.attributes.email);
	  },
	  error: function(user, error) {
	    console.log(error);
	  }
	});

});
var currentUser = Parse.User.current();
if (currentUser) {
    console.log(currentUser);
    $('#username').html(currentUser.attributes.username);
    $('#email').html(currentUser.attributes.email);
} else {
    console.log('sin session');
}
$('#logout').click(function(){
	Parse.User.logOut();
	var currentUser = Parse.User.current();
});
/*var user = {
    "username": "admin",
    "password": "12345678",
    "grant_type": "password"
}

	$.ajax({
	    type: "POST",
	    url: 'http://api.everlive.com/v1/3MOhd4wGRWRCwiwg/oauth/token',
	    contentType: "application/json",
	    data: JSON.stringify(user),
	    success: function(data){
	        console.log(data);
	    },
	    error: function(error){
	        console.log(error);
	    }
	});

*/