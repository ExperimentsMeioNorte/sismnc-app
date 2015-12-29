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
  IonLoading.hide();
};

Template.authentication.events({
    // executa o login da rede social facebook
    'tap .bg-facebook': function (events, tmp) {
      events.preventDefault();

      Session.set('getupRemoveLoading', false);

      var serviceName = $(evento.currentTarget).attr('data-service');
      var callback = function (err) {
           if (!err) {
            toastr.info(
              "Seja bem-vindo",
              '',
              {
                "positionClass": "toast-top-center",
                "tapToDismiss": true,
                "timeOut": 3000
              }
            );
          } else if (err instanceof Accounts.LoginCancelledError) {
            toastr.info(
              "Ocorreu um problema",
              '',
              {
                "positionClass": "toast-top-center",
                "tapToDismiss": true,
                "timeOut": 3000
              }
            );
          } else if (err instanceof ServiceConfiguration.ConfigError) {
            toastr.info(
              "Algumas informações incompletas",
              '',
              {
                "positionClass": "toast-top-center",
                "tapToDismiss": true,
                "timeOut": 3000
              }
            );
          } else {
            toastr.info(
              "Ops.. o que houve?",
              '',
              {
                "positionClass": "toast-top-center",
                "tapToDismiss": true,
                "timeOut": 3000
              }
            );
          }
      };

      var str = (serviceName === null)? '' : String(serviceName);
      var serviceNameMethod = str.charAt(0).toUpperCase() + str.slice(1);
      var loginAppService = Meteor["loginWith" + serviceNameMethod];

      var loginAppOptions = {};
      if (Accounts.ui._options.requestPermissions[serviceName]){
          loginAppOptions.requestPermissions = Accounts.ui._options.requestPermissions[serviceName];
      }

      if (Accounts.ui._options.requestOfflineToken[serviceName]){
          loginAppOptions.requestOfflineToken = Accounts.ui._options.requestOfflineToken[serviceName];
      }

      // atributos montados a partir do methodo loginApp, como as opcoes e qual servidor de login é para executar
      loginAppService(loginAppOptions, function(err){
        if(err){
          //IonLoading.hide();
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
              //IonLoading.hide();
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

              //IonLoading.hide();
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
                function(error, result){
                  if(result){
                    localStorage.setItem('Meteor.facebookId', usersSearch.services.facebook.id);
                    localStorage.setItem('Meteor.emailId', usersSearch.services.facebook.email);
                    localStorage.setItem('Meteor.userServerId', result[1]);
                    localStorage.setItem('Meteor.userId', result[1]);

                    //IonLoading.hide();
                    Router.go('index');
                  }else{
                    //IonLoading.hide();
                    toastr.info(
                      "Estranho, " + error,
                      '',
                      {
                        "positionClass": "toast-top-center",
                        "tapToDismiss": true,
                        "timeOut": 3000
                      }
                    );
                  }
                }
            );
          }
        }
      });
    },

    // login da rede social google
    'tap .bg-google': function (events, tmp) {

      events.preventDefault();

      // acessa o methodo das configuracoes para efetuar o login de uma determinada rede social
      Meteor.loginApp(events);

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
                google_id:usersSearch.services.google.id,
                email:usersSearch.services.google.email
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

              localStorage.setItem('Meteor.googleId', usersSearch.services.google.id);
              localStorage.setItem('Meteor.emailId', usersSearch.services.google.email);
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
                  if(result){
                    localStorage.setItem('Meteor.googleId', usersSearch.services.google.id);
                    localStorage.setItem('Meteor.emailId', usersSearch.services.google.email);
                    localStorage.setItem('Meteor.userServerId', result[1]);
                    localStorage.setItem('Meteor.userId', result[1]);

                    IonLoading.hide();
                    Router.go('index');
                  }else{
                    IonLoading.hide();
                    toastr.info(
                      "Estranho, " + error,
                      '',
                      {
                        "positionClass": "toast-top-center",
                        "tapToDismiss": true,
                        "timeOut": 3000
                      }
                    );
                  }
                }
            );
          }
        }
      });
    }
});
