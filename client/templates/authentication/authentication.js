// Ao Entrar
Template.authentication.rendered = function(){
  document.querySelector('body').classList.add('authentication-page');
};


// Ao sair
Template.authentication.destroyed = function(){

  document.querySelector('body').classList.remove('authentication-page');

};


Template.authentication.events({
    // executa o login da rede social facebook
    'click .bg-facebook': function (event, tmp) {
      event.preventDefault();

      // acessa o methodo das configuracoes para efetuar o login de uma determinada rede social
      Meteor.loginApp(event);

      // atributos montados a partir do methodo loginApp, como as opcoes e qual servidor de login é para executar
      Meteor.loginAppService(Meteor.loginAppOptions, function(err){
        if (err){
          console.log('Não deu certo, tenta novamente mais tarde');
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
              console.log('Sem autorizacão');
            }else{
              Meteor.remote.setUserId(userId._id);
              Router.go('index');
            }
          }else{
            Meteor.remote.call(
                'insertUser',
                [
                  111,
                  '0',
                  usersSearch.services.facebook.name,
                  'http://graph.facebook.com/' + usersSearch.services.facebook.id + '/picture/?type=large',
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
                    IonNavigation.skipTransitions = false; return true;
                    Meteor.remote.setUserId(userId._id);
                    Router.go('index');
                }
            );
          }
        }
      });
    },
    'click .bg-google': function (event, tmp) {
      event.preventDefault();

      // acessa o methodo das configuracoes para efetuar o login de uma determinada rede social
      Meteor.loginApp(event);

      // atributos montados a partir do methodo loginApp, como as opcoes e qual servidor de login é para executar
      Meteor.loginAppService(Meteor.loginAppOptions, function(err){
        if (err){
          console.log('Não deu certo, tenta novamente mais tarde');
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
              console.log('Sem autorizacão');
            }else{
              Meteor.remote.setUserId(userId._id);
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
                    IonLoading.show({
                      customTemplate: '<i class="spinner"><svg viewBox="0 0 64 64"><g><defs><linearGradient id="sGD" gradientUnits="userSpaceOnUse" x1="55" y1="46" x2="2" y2="46"><stop offset="0.1" class="stop1"></stop><stop offset="1" class="stop2"></stop></linearGradient></defs><g stroke-width="4" stroke-linecap="round" fill="none" transform="rotate(38.2755 32 32)"><path stroke="url(#sGD)" d="M4,32 c0,15,12,28,28,28c8,0,16-4,21-9"></path><path d="M60,32 C60,16,47.464,4,32,4S4,16,4,32"></path><animateTransform values="0,32,32;360,32,32" attributeName="transform" type="rotate" repeatCount="indefinite" dur="750ms"></animateTransform></g></g></svg></i>',
                      duration: 1000
                    });
                    Meteor.remote.setUserId(userId._id);
                    Router.go('index');
                }
            );
          }
        }
      });
    }
});
