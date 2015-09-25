Meteor.smtpServerUsername = 'alissonplus2@gmail.com'

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
             toastr.success(
                 "Oba, sejá bem vindo.",
                 '',
                 {
                     "progressBar": true,
                     "newestOnTop": true,
                     "showDuration": "100",
                    "hideDuration": "100",
                    "timeOut": "1000"
                }
            );
        } else if (err instanceof Accounts.LoginCancelledError) {
            toastr.warning(
                "Ops, Não pode efetuar o login.",
                '',
                {
                    "progressBar": true,
                    "newestOnTop": true,
                    "showDuration": "100",
                    "hideDuration": "100",
                    "timeOut": "1000"
                }
            );
        } else if (err instanceof ServiceConfiguration.ConfigError) {
            toastr.warning(
                "Ops, Erro de configuração.",
                '',
                {
                    "progressBar": true,
                    "newestOnTop": true,
                    "showDuration": "100",
                    "hideDuration": "100",
                    "timeOut": "1000"
                }
            );
        } else {
            toastr.warning(
                "Ixi, Algo de ruim ocorreu inesperadamente.",
                '',
                {
                    "progressBar": true,
                    "newestOnTop": true,
                    "showDuration": "100",
                    "hideDuration": "100",
                    "timeOut": "1000"
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
