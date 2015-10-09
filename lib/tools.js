Meteor.smtpServerUsername = 'alissonplus2@gmail.com'

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
          console.log('Ae deu certo');
        } else if (err instanceof Accounts.LoginCancelledError) {
          console.log('Não deu certo');
        } else if (err instanceof ServiceConfiguration.ConfigError) {
          console.log('Falta configurar algo');
        } else {
          console.log('Ixi vei');
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