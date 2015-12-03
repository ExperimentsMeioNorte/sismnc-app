Template._resetPassword.rendered = function () {
    document.querySelector('body').classList.add('new-password');
    document.querySelector('body').classList.remove('show-confirm-code');
};

Template._resetPassword.events({
   'tap .button-cancel': function () {
        document.querySelector('body').classList.remove('show-reset-password');
    },
    'tap .reset-password': function (event) {
        event.preventDefault();
        IonLoading.show({
            customTemplate: '<i class="spinner spinner-spiral"><svg viewBox="0 0 64 64"><g><defs><linearGradient id="sGD" gradientUnits="userSpaceOnUse" x1="55" y1="46" x2="2" y2="46"><stop offset="0.1" class="stop1"></stop><stop offset="1" class="stop2"></stop></linearGradient></defs><g stroke-width="4" stroke-linecap="round" fill="none" transform="rotate(196.349 32 32)"><path stroke="url(#sGD)" d="M4,32 c0,15,12,28,28,28c8,0,16-4,21-9"></path><path d="M60,32 C60,16,47.464,4,32,4S4,16,4,32"></path><animateTransform values="0,32,32;360,32,32" attributeName="transform" type="rotate" repeatCount="indefinite" dur="750ms"></animateTransform></g></g></svg></i>'
        });

        //document.querySelector('body').classList.add('show-confirm-code');

        var email = document.querySelector("#resetPassword_email").value;

        // valida se todos os campos obrigatorios estao preenchidos
        if(email !== ''){
            var userId = User.findOne({
                email: email,
                facebook_id: null,
                google_id: null
            });

            // verifica se o usuario já foi cadastrado
            if(userId !== undefined){
                Session.set(
                    'getupConfirmUserData',
                    [
                        Random.secret([5]),
                        'O codigo para confirmação foi enviado para o email (' + email + ') e ao preencher abaixo use da forma que foi gerada, pois o codigo usa case sensitive.',
                        email,
                        userId._id
                    ]
                );

                // envia o codigo de registro para o email do usuario, e abre a tela para ele adcionar o codigo para confirmacao
                Meteor.remote.call(
                    'sendEmail',
                    [
                        email,
                        Meteor.smtpServerUsername,
                        'Código de confirmação app Sistema Meio Norte',
                        'Este é o seu código para confirmar o registro no app Sistema Meio Norte: <b>' + Session.get('getupConfirmUserData')[0] + '</b>'
                    ]
                );

                IonLoading.hide();
                    document.querySelector('body').classList.remove('new-password');
                    document.querySelector('body').classList.add('show-confirm-code');
            }else{
                IonLoading.hide();
                toastr.info(
                  "Rum, email não cadastrado.",
                  '',
                  {
                    "positionClass": "toast-top-center",
                    "tapToDismiss": true,
                    "timeOut": 3000
                  }
                );
            }
        }else{
            IonLoading.hide();
            toastr.info(
              "Opaaa, preencha todos os campos obrigatorios.",
              '',
              {
                "positionClass": "toast-top-center",
                "tapToDismiss": true,
                "timeOut": 3000
              }
            );
        }
    }
});