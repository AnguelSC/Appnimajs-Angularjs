var SERVICE = angular.module('service', []);

SERVICE.factory('user', function() {

  return {
    login:function(datos) {
      Appnima.User.login(datos.user,datos.password).then(function(error,result){
        if (error !== null) {
          $('#login-error').html(error.message);
          return error;
        }else{
          localStorage.setItem(result.id,JSON.stringify(result));
          return window.location.reload();
          /*var e;e=new Date;e.setTime(e.getTime()+1e3*60*60*24*14);
          document.cookie="session="+escape(Appnima.key)+";expires="+e.toGMTString(); 
          */
        }
      });
    },
    info: function(callback) {
      var DataUser = [{mail:"test@test.com"}];
      if (Appnima.User.session()) {
        DataUser = JSON.parse(localStorage.getItem(Appnima.User.session().id));
      }
      Appnima.User.info().then(function(error,result){
        if (error !== null) {
          callback(error);
        }else{
          //console.log(result.mail);
          Appnima.Network.search(DataUser.mail).then(function(error,result){
            if (error !== null) {
              callback(error);
            }else{
              callback(result);
            }      
          });
        }
      });
    },
    infuser: function(datos,callback) {
      Appnima.Network.search(datos).then(function(error,result){
        if (error !== null) {
          callback(error);
        }else{
          callback(result);
        }     
      });
    },
    check: function(id,callback) {
      Appnima.Network.check(id).then(function(error,result){
        if (error !== null) {
          callback(error);
        }else{
          callback(result);
        }     
      });
    },
    update: function(datos) {
      console.log('datos recibidos:',datos);
      Appnima.User.info(datos).then(function(error,result){
        if (error !== null) {
          return error;
        }else{
          return result;
        }
      });
    },
    NetworkInfo:function(callback) {
      Appnima.Network.info().then(function(error,result){
        if (error !== null) {
          callback(error);
        }else{
          callback(result);
        }
      });
    },
    following: function(callback) {
      Appnima.Network.following().then(function(error,result){
        if (error !== null) {
          callback(error);
        }else{
          callback(result);
        }
      });
    },
    followers: function(callback) {
      Appnima.Network.followers().then(function(error,result){
        if (error !== null) {
          callback(error);
        }else{
          callback(result);
        }
      });
    },
    follow: function(id,callback) {
      Appnima.Network.follow(id).then(function(error,result){
        if (error !== null) {
          callback(error);
        }else{
          callback(result);
        }
      });
    },
    unfollow: function(id,callback) {
      Appnima.Network.unfollow(id).then(function(error,result){
        if (error !== null) {
          callback(error);
        }else{
          callback(result);
        }
      });
    },

  };

});