Meteor.smtpServerUsername = 'alissonplus2@gmail.com' // senha: amor0512

Meteor.anwersResult = function(){
  var poll = Poll.find(
    {
      status: 1,
      program_id: Router.current().params._id
    }
  ).map(
    function(p){
      return {
        _id: p._id,
        description: p.description,
        img: p.img
      }
    }
  );
  if(poll && poll[0] !== undefined){
    var answered = PollUser.findOne(
      {
        status: 1,
        poll_id: poll[0]._id
        //user_id: localStorage.getItem('Meteor.userServerId')
      }
    );

    if(answered === undefined){
      return null;
    }else{
      var answersResult = total = [];
      var i = porcent = calculoTotal = voto = answerUser = 0;
      beforePorcent = 100;

      // gera o grupo de respostas da enquete
      var group = PollUser.find(
        {
          status: 1,
          poll_id: poll[0]._id
        }
      ).fetch();
      // pega a resposta que o usuario logado respondeu
      for(var x in group){
        if(group[x]['user_id'] === localStorage.getItem('Meteor.userServerId')){
          answerUser = group[x]['answer_id'];
          break;
        }
      }

      // gera o array das quantidades das respostas
      var groupedAnswerId = _.groupBy(_.pluck(group, 'answer_id'));
      _.each(_.values(groupedAnswerId), function(data) {
        total[i] = data.length;
        i++;

      });

      // pega o total da quantidade das respostas
      for(var x in total){
        calculoTotal += total[x];
      }

      // gera o array da porcentagem de cada resposta e mostra qual o usuario respondeu
      i = 0;
      _.each(_.values(groupedAnswerId), function(data) {
        voto = '';
        if(answerUser === data[0]){
          voto = 'checked';
        }

        porcent = ((data.length * 100) / calculoTotal);
        answersResult[i] = {
          _id: data[0],
          porcent: porcent.toFixed(2),
          description: Answer.findOne(
              {
                status: 1,
                _id: data[0]
            },
              {
                fields: {
                  description: 1
                }
              }
          ).description,
          voto:voto
        };
        i++;

      });

      return answersResult
    }
  }else{
    return '';
  }
}

// remove o loading ou fecha o app quando clicado no botao voltar do device
Meteor.removeLoadingBackButton = function(){
  document.addEventListener("deviceready", onDeviceReady, false);

  function onDeviceReady(){
      document.addEventListener("backbutton", function(e){
         if(document.getElementsByClassName('box-index')){
             e.preventDefault();
             navigator.app.exitApp();
         }else{
            IonLoading.hide();
            navigator.app.backHistory();
         }
      }, false);
  }
}

// remove o bug do cordova facebook, sempre no primeiro acesso o cordova no funciona, entao tem que fechar o app e reabrir novamente pra funcionar
Meteor.removeBugCordovaFacebook = function(){
  var bugFacebook = BugFacebook.find({});
  if(bugFacebook && bugFacebook[0] === undefined){
    IonLoading.show({
      customTemplate: 'Aguarde o fechamento do app pra concluir a configuração, e reabra-o novamente.'
    });

    Meteor.setTimeout(function () {
      Meteor.call('insertBugFacebook');
      IonLoading.hide();
      navigator.app.exitApp();
    }, 6000);
  }
}

// apos login do facebook verificar os dados no banco e encaminhar para o index.js
Meteor.validateLoginFacebook = function(){
  if(localStorage.getItem('Meteor.userId')){
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
          function(error, result){
            if(result){
              localStorage.setItem('Meteor.facebookId', usersSearch.services.facebook.id);
              localStorage.setItem('Meteor.emailId', usersSearch.services.facebook.email);
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
}

// verifica de tempo em tempo se o usuario normal está logado no app
Meteor.verifyLogin = function(){
    setTimeout(function(){
      if(!localStorage.getItem('Meteor.userServerId')){
        /*if(localStorage.getItem('Meteor.userId')){ // somente com loginStyle redirect ativo
          //Meteor.validateLoginFacebook();
        }else{*/
          Meteor.logout();
          localStorage.clear();
          Router.go('authentication');
        //}
      }else{
          var user = User.findOne({_id:localStorage.getItem('Meteor.userServerId'), status:1});
          if(user !== undefined){
            Session.set('getupUserData', [user]);
          }else{
            Meteor.logout();
            localStorage.clear();
            Router.go('authentication');
          }
      }
      Meteor.verifyLogin();
    }, 3000);
}

// limite da hora inicial e final para mostrar as mensagens na timeline
Meteor.getDateHour = function(){
    Meteor.remote.call(
    'dateNow',
        function(error, result){
            Session.set('getupDateBegin', result['dateBegin']);
            Session.set('getupDateEnd', result['dateEnd']);
        }
    );
}

// adiciona o zero a esquerda
Meteor.addZeroHour = function(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

// Metodo para mostrar ou nao a tv no programa
Meteor.playTv = {
    dateObj: undefined,
    hour: undefined,
    minutes: undefined,
    hourMinutes: undefined,
    hourMinutesBegin: undefined,
    hourMinutesEnd: undefined,
    programId: 0,

    // gera os atributos de tempo para uso no playTv
    getTime: function(){
        Meteor.playTv.dateObj = new Date();
        Meteor.playTv.hour = Meteor.addZeroHour(Meteor.playTv.dateObj.getHours());
        Meteor.playTv.minutes = Meteor.addZeroHour(Meteor.playTv.dateObj.getMinutes());
        Meteor.playTv.hourMinutes = (Meteor.playTv.hour + ':' + Meteor.playTv.minutes);
    },

    // verifica se é para mostrar a tv ou nao
    playValidate: function(hourBegin, hourEnd){
        Meteor.playTv.getTime();
        if(Meteor.playTv.hourMinutes >= hourBegin && Meteor.playTv.hourMinutes <= hourEnd){
            return true;
        }else{
            return false;
        }
    },

    // verifica se é para mostrar o botao do programa que está passando a tv ou nao
    buttonPlayTv: function(){
        Meteor.playTv.getTime();
        var categoryId = Category.find(
          {
            description: 'Radio'
          }
        ).map(
          function(c){
            return {
              _id: c._id
            }
          }
        );

        var programs = Program.find(
            {
                status: 1,
                category_id: { $not: categoryId[0]._id }
            },
            {
                fields: {
                    _id: 1,
                    hour_begin: 1,
                    hour_end: 1
                }
            }
        ).map(
          function(p) {
            return {
              _id: p._id,
              hour_begin: p.hour_begin,
              hour_end: p.hour_end
            };
          }
        );

        for(x in programs){
            if(Meteor.playTv.hourMinutes >= programs[x].hour_begin
                && Meteor.playTv.hourMinutes <= programs[x].hour_end){
                Meteor.playTv.programId = programs[x]._id;
                break;
            }
        }

        if(Meteor.playTv.programId){
            return true;
        }else{
            return false;
        }
    }
};

// para aumentar o limit da paginacao
Meteor.incrementLimit = function(inc) {
    Session.set(
        'limit',
        (Session.get('limit') + ((inc === undefined)? 5 : inc))
    );
};

// Metodo para deixar a primeira letra da string em Maiusculo
Meteor.capitalize = function(str){
    str = (str === null)? '' : String(str);
    return str.charAt(0).toUpperCase() + str.slice(1);
};

 // Metodo de configuracao para logar-se nas redes sociais
 Meteor.loginApp = function(evento){
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

    Meteor.loginAppService = Meteor["loginWith" + Meteor.capitalize(serviceName)];

    Meteor.loginAppOptions = {};
    if (Accounts.ui._options.requestPermissions[serviceName]){
        Meteor.loginAppOptions.requestPermissions = Accounts.ui._options.requestPermissions[serviceName];
    }

    if (Accounts.ui._options.requestOfflineToken[serviceName]){
        Meteor.loginAppOptions.requestOfflineToken = Accounts.ui._options.requestOfflineToken[serviceName];
    }
};