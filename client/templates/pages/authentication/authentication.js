// Rota Autenticação
Router.route('/', function () {

  this.layout('ApplicationLayout');
  this.render('authentication');

}, {
  name: 'authentication',
  waitOn: function() {
    Meteor.remote.subscribe('user');
    Meteor.subscribe('users');
  }
});

// Ao Entrar
Template.authentication.onRendered(function(){

  $('.modal-trigger').leanModal({
      dismissible: true,
      opacity:1,
      in_duration: 300,
      out_duration: 200,
      ready: function() {

      },
      complete: function() {

      }
  });

});

//var loginButtonsSession = Accounts._loginButtonsSession;

Template.authentication.events({
    // executa o login da rede social facebook
    'click .bg-facebook': function (evento, tmp) {
      evento.preventDefault();

      // acessa o methodo das configuracoes para efetuar o login de uma determinada rede social
      Meteor.loginApp(evento);

      // atributos montados a partir do methodo loginApp, como as opcoes e qual servidor de login é para executar
      Meteor.loginAppService(Meteor.loginAppOptions, function(err){
        if (err){
          toastr.warning(
            "Não deu certo, tenta novamente mais tarde",
            '',
            {
                "positionClass": "toast-top-full-width",
                "progressBar": true,
                "newestOnTop": true,
                "showDuration": "100",
                "hideDuration": "100",
                "timeOut": "2000"
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
              toastr.warning(
                "Ops, Você fez algo ruim, não tem autorização para utilizar o aplicativo.",
                '',
                {
                  "progressBar": true,
                  "newestOnTop": true,
                  "showDuration": "100",
                  "hideDuration": "100",
                  "timeOut": "2000"
                }
              );
            }else{
              Meteor.remote.setUserId(userId._id);
              Router.go('home');
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
                  1
                ],
                function(error, result){
                  if(error){
                    toastr.warning(
                      "Ops, algo deu errado, desculpe o transtorno.",
                      '',
                      {
                        "progressBar": true,
                        "newestOnTop": true,
                        "showDuration": "100",
                        "hideDuration": "100",
                        "timeOut": "1000"
                      }
                    );
                  }else{
                    toastr.success(
                      "Aê, Seja bem vindo(a).",
                      '',
                      {
                        "progressBar": true,
                        "newestOnTop": true,
                        "showDuration": "100",
                        "hideDuration": "100",
                        "timeOut": "1000"
                      }
                    );

                    var userId = User.findOne(
                      {
                        facebook_id:usersSearch.services.facebook.id,
                        email:usersSearch.services.facebook.email
                      }
                    );

                    Meteor.remote.setUserId(userId._id);
                    Router.go('home');
                  }
                }
            );
          }
        }
      });

    },

    // desloga na rede social atual
    'click .logout-bg-facebook': function(evento, tmp){
        evento.preventDefault();
        Meteor.logout();
    }
});
