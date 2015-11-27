Template._enterRegister.events({
    'touchstart .button-submit, click .button-submit': function () {
        IonLoading.show({
            customTemplate: '<i class="spinner spinner-spiral"><svg viewBox="0 0 64 64"><g><defs><linearGradient id="sGD" gradientUnits="userSpaceOnUse" x1="55" y1="46" x2="2" y2="46"><stop offset="0.1" class="stop1"></stop><stop offset="1" class="stop2"></stop></linearGradient></defs><g stroke-width="4" stroke-linecap="round" fill="none" transform="rotate(196.349 32 32)"><path stroke="url(#sGD)" d="M4,32 c0,15,12,28,28,28c8,0,16-4,21-9"></path><path d="M60,32 C60,16,47.464,4,32,4S4,16,4,32"></path><animateTransform values="0,32,32;360,32,32" attributeName="transform" type="rotate" repeatCount="indefinite" dur="750ms"></animateTransform></g></g></svg></i>',
            backdrop: true
        });

        var name = document.querySelector("#accountPassword_registerName").value;
        var email = document.querySelector("#accountPassword_registerEmail").value;
        var password = document.querySelector("#accountPassword_registerPassword").value;

        // valida se todos os campos obrigatorios estao preenchidos
        if(name !== '' && email !== '' && password !== ''){
            password = CryptoJS.MD5(password).toString();
            var userId = User.findOne({
                name: name,
                email: email,
                password: password,
                facebook_id: null,
                google_id: null
            });

            // verifica se o usuario já foi cadastrado
            if(userId === undefined){
                Session.set('getupResetUserData', [name, email, password]);
                Session.set('getupCodeReset', Random.secret([5]));

                // envia o codigo de registro para o email do usuario, e abre a tela para ele adcionar o codigo para confirmacao
                Meteor.remote.call(
                    'sendEmail',
                    [email,
                    Meteor.smtpServerUsername,
                    'Código de confirmação app Sistema Meio Norte',
                    'Este é o seu código para confirmar o registro no app Sistema Meio Norte: <b>' + Session.get('getupCodeReset') + '</b>']
                );
                /*Meteor.remote.call(
                  'sendEmail',
                  email,
                  Meteor.smtpServerUsername,
                  'Código de confirmação app Sistema Meio Norte',
                  'Este é o seu código para confirmar o registro no app Sistema Meio Norte: ' + Session.get('getupCodeReset')
                );*/

                IonLoading.hide();
                toastr.info(
                  "O codigo para confirmação foi enviado para o email: " + email,
                  '',
                  {
                    "positionClass": "toast-top-center",
                    "tapToDismiss": true,
                    "timeOut": 3000
                  }
                );

            }else{
                IonLoading.hide();
                toastr.info(
                  "Rum, usuario já possui cadastro, volte e acesse a area de login.",
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