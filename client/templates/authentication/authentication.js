Template.authentication.rendered = function(){
  $('.pane').css('transform', 'translate3d(0, 0, 0)');
  document.querySelector('body').classList.remove('snapjs-left');

  Meteor.setTimeout(function () {
    document.querySelector('.auth-box').classList.remove('auth-hide');
  }, 2000);

}

// Ao sair
Template.authentication.destroyed = function(){
  document.querySelector('body').classList.remove('authentication-page');
};

Template.authentication.events({
    // executa o login da rede social facebook
    'touchstart .bg-facebook, click .bg-facebook': function (event, tmp) {
      IonLoading.show({
        customTemplate: 'Aguarde...'
      });

      event.preventDefault();

      Session.set('getupRemoveLoading', false);

        // acessa o methodo das configuracoes para efetuar o login de uma determinada rede social
        Meteor.loginApp(event);

        // atributos montados a partir do methodo loginApp, como as opcoes e qual servidor de login é para executar
        Meteor.loginAppService(Meteor.loginAppOptions, function(err){
          if (err){
            IonLoading.hide();
            toastr.info(
              "Estranho, mas ocorreu um problema.. tente novamente mais tarde",
              '',
              {
                "positionClass": "toast-top-center",
                "tapToDismiss": true,
                "timeOut": 3000
              }
            );
          }else{
            var usersSearch = Meteor.users.findOne({_id:Meteor.userId()});
            var userId = User.findOne(
                {
                  facebook_id:usersSearch.services.facebook.id,
                  email:usersSearch.services.facebook.email
                }
            );

            if(userId !== undefined){
              if(userId.status === 0){
                IonLoading.hide();
                toastr.info(
                  "Você não tem autorização, precisa de um login",
                  '',
                  {
                    "positionClass": "toast-top-center",
                    "tapToDismiss": true,
                    "timeOut": 3000
                  }
                );
              }else{
                localStorage.setItem('Meteor.facebookId', usersSearch.services.facebook.id);
                localStorage.setItem('Meteor.emailId', usersSearch.services.facebook.email);
                localStorage.setItem('Meteor.userServerId', userId._id);
                localStorage.setItem('Meteor.userId', userId._id);

                IonLoading.hide();
                Router.go('index');
              }
            }else{
              Meteor.remote.call(
                  'insertUser',
                  [
                    111,
                    '0',
                    usersSearch.services.facebook.name,
                    'http://graph.facebook.com/' + usersSearch.services.facebook.id + '/picture/?type=small',
                    usersSearch.services.facebook.email,
                    null,
                    usersSearch.services.facebook.id,
                    null,
                    null,
                    1,
                    1
                  ],
                  function(result){
                      var userId = User.findOne(
                        {
                          facebook_id:usersSearch.services.facebook.id,
                          email:usersSearch.services.facebook.email
                        }
                      );
                      localStorage.setItem('Meteor.facebookId', usersSearch.services.facebook.id);
                      localStorage.setItem('Meteor.emailId', usersSearch.services.facebook.email);
                      localStorage.setItem('Meteor.userServerId', userId._id);
                      localStorage.setItem('Meteor.userId', userId._id);

                      IonLoading.hide();
                      Router.go('index');
                  }
              );
            }
          }
        });
    }/*,
    'touchstart .bg-google, click .bg-google': function (event, tmp) {
      event.preventDefault();

        // acessa o methodo das configuracoes para efetuar o login de uma determinada rede social
        Meteor.loginApp(event);

        // atributos montados a partir do methodo loginApp, como as opcoes e qual servidor de login é para executar
        Meteor.loginAppService(Meteor.loginAppOptions, function(err){
          if (err){
            toastr.info(
              "Estranho, mas ocorreu um problema.. tente novamente mais tarde",
              '',
              {
                "positionClass": "toast-top-center",
                "tapToDismiss": true,
                "timeOut": 3000
              }
            );
          }else{
            var usersSearch = Meteor.users.findOne({_id:Meteor.userId()});
            var userId = User.findOne(
                {
                  google_id:usersSearch.services.google.id,
                  email:usersSearch.services.google.email
                }
            );

            if(userId !== undefined){
              if(userId.status === 0){
                toastr.info(
                  "Você não tem autorização, precisa de um login",
                  '',
                  {
                    "positionClass": "toast-top-center",
                    "tapToDismiss": true,
                    "timeOut": 3000
                  }
                );
              }else{

                localStorage.setItem('Meteor.googleId', usersSearch.services.google.id);
                localStorage.setItem('Meteor.emailId', usersSearch.services.google.email);
                localStorage.setItem('Meteor.userServerId', userId._id);
                localStorage.setItem('Meteor.userId', userId._id);
                Router.go('index');
              }
            }else{
              Meteor.remote.call(
                  'insertUser',
                  [
                    111,
                    '0',
                    usersSearch.services.google.name,
                    usersSearch.services.google.picture,
                    usersSearch.services.google.email,
                    null,
                    null,
                    usersSearch.services.google.id,
                    null,
                    1,
                    1
                  ],
                  function(error, result){
                      var userId = User.findOne(
                        {
                          google_id:usersSearch.services.google.id,
                          email:usersSearch.services.google.email
                        }
                      );

                      localStorage.setItem('Meteor.googleId', usersSearch.services.google.id);
                      localStorage.setItem('Meteor.emailId', usersSearch.services.google.email);
                      localStorage.setItem('Meteor.userServerId', userId._id);
                      localStorage.setItem('Meteor.userId', userId._id);
                      Router.go('index');
                  }
              );
            }
          }
        });
    }*/
});
