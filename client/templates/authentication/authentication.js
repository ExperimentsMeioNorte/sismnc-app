Template.authentication.rendered = function(){
  $('.pane').css('transform', 'translate3d(0, 0, 0)');
  document.querySelector('body').classList.remove('snapjs-left');

  setTimeout(function () {
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
    'tap .bg-facebook': function (evento, tmp) {

        // IonLoading.show({
        //   customTemplate: '<i class="spinner spinner-spiral"><svg viewBox="0 0 64 64"><g stroke-width="4" stroke-linecap="round"><line y1="17" y2="29" transform="translate(32,32) rotate(180)"><animate attributeName="stroke-opacity" dur="750ms" values="1;.85;.7;.65;.55;.45;.35;.25;.15;.1;0;1" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(210)"><animate attributeName="stroke-opacity" dur="750ms" values="0;1;.85;.7;.65;.55;.45;.35;.25;.15;.1;0" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(240)"><animate attributeName="stroke-opacity" dur="750ms" values=".1;0;1;.85;.7;.65;.55;.45;.35;.25;.15;.1" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(270)"><animate attributeName="stroke-opacity" dur="750ms" values=".15;.1;0;1;.85;.7;.65;.55;.45;.35;.25;.15" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(300)"><animate attributeName="stroke-opacity" dur="750ms" values=".25;.15;.1;0;1;.85;.7;.65;.55;.45;.35;.25" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(330)"><animate attributeName="stroke-opacity" dur="750ms" values=".35;.25;.15;.1;0;1;.85;.7;.65;.55;.45;.35" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(0)"><animate attributeName="stroke-opacity" dur="750ms" values=".45;.35;.25;.15;.1;0;1;.85;.7;.65;.55;.45" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(30)"><animate attributeName="stroke-opacity" dur="750ms" values=".55;.45;.35;.25;.15;.1;0;1;.85;.7;.65;.55" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(60)"><animate attributeName="stroke-opacity" dur="750ms" values=".65;.55;.45;.35;.25;.15;.1;0;1;.85;.7;.65" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(90)"><animate attributeName="stroke-opacity" dur="750ms" values=".7;.65;.55;.45;.35;.25;.15;.1;0;1;.85;.7" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(120)"><animate attributeName="stroke-opacity" dur="750ms" values=".85;.7;.65;.55;.45;.35;.25;.15;.1;0;1;.85" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(150)"><animate attributeName="stroke-opacity" dur="750ms" values="1;.85;.7;.65;.55;.45;.35;.25;.15;.1;0;1" repeatCount="indefinite"></animate></line></g></svg></i>'
        // });

        evento.preventDefault();

        Session.set('getupRemoveLoading', false);

        // acessa o methodo das configuracoes para efetuar o login de uma determinada rede social
        Meteor.loginApp(evento);

        // atributos montados a partir do methodo loginApp, como as opcoes e qual servidor de login é para executar
        Meteor.loginAppService(Meteor.loginAppOptions);


    },

    // login da rede social google
    'tap .bg-google': function (evento, tmp) {
      // IonLoading.show({
      //   customTemplate: '<i class="spinner spinner-spiral"><svg viewBox="0 0 64 64"><g stroke-width="4" stroke-linecap="round"><line y1="17" y2="29" transform="translate(32,32) rotate(180)"><animate attributeName="stroke-opacity" dur="750ms" values="1;.85;.7;.65;.55;.45;.35;.25;.15;.1;0;1" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(210)"><animate attributeName="stroke-opacity" dur="750ms" values="0;1;.85;.7;.65;.55;.45;.35;.25;.15;.1;0" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(240)"><animate attributeName="stroke-opacity" dur="750ms" values=".1;0;1;.85;.7;.65;.55;.45;.35;.25;.15;.1" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(270)"><animate attributeName="stroke-opacity" dur="750ms" values=".15;.1;0;1;.85;.7;.65;.55;.45;.35;.25;.15" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(300)"><animate attributeName="stroke-opacity" dur="750ms" values=".25;.15;.1;0;1;.85;.7;.65;.55;.45;.35;.25" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(330)"><animate attributeName="stroke-opacity" dur="750ms" values=".35;.25;.15;.1;0;1;.85;.7;.65;.55;.45;.35" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(0)"><animate attributeName="stroke-opacity" dur="750ms" values=".45;.35;.25;.15;.1;0;1;.85;.7;.65;.55;.45" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(30)"><animate attributeName="stroke-opacity" dur="750ms" values=".55;.45;.35;.25;.15;.1;0;1;.85;.7;.65;.55" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(60)"><animate attributeName="stroke-opacity" dur="750ms" values=".65;.55;.45;.35;.25;.15;.1;0;1;.85;.7;.65" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(90)"><animate attributeName="stroke-opacity" dur="750ms" values=".7;.65;.55;.45;.35;.25;.15;.1;0;1;.85;.7" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(120)"><animate attributeName="stroke-opacity" dur="750ms" values=".85;.7;.65;.55;.45;.35;.25;.15;.1;0;1;.85" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(150)"><animate attributeName="stroke-opacity" dur="750ms" values="1;.85;.7;.65;.55;.45;.35;.25;.15;.1;0;1" repeatCount="indefinite"></animate></line></g></svg></i>'

      // });

      evento.preventDefault();

      // acessa o methodo das configuracoes para efetuar o login de uma determinada rede social
      Meteor.loginApp(evento);

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
