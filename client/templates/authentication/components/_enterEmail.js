Template._enterEmail.events({
    'touchstart .btn-reset-pass, click .btn-reset-pass': function () {
        document.querySelector('body').classList.add('show-reset-password');
    },

    'touchstart .close-reset-password, click .close-reset-password': function () {
        document.querySelector('body').classList.add('show-reset-password');
    },

    'touchstart .bg-password, click .bg-password': function (event, tmp) {
        IonLoading.show({
            customTemplate: '<i class="spinner spinner-spiral"><svg viewBox="0 0 64 64"><g><defs><linearGradient id="sGD" gradientUnits="userSpaceOnUse" x1="55" y1="46" x2="2" y2="46"><stop offset="0.1" class="stop1"></stop><stop offset="1" class="stop2"></stop></linearGradient></defs><g stroke-width="4" stroke-linecap="round" fill="none" transform="rotate(196.349 32 32)"><path stroke="url(#sGD)" d="M4,32 c0,15,12,28,28,28c8,0,16-4,21-9"></path><path d="M60,32 C60,16,47.464,4,32,4S4,16,4,32"></path><animateTransform values="0,32,32;360,32,32" attributeName="transform" type="rotate" repeatCount="indefinite" dur="750ms"></animateTransform></g></g></svg></i>'
        });

        var email = document.querySelector("#accountPassword_email").value;
        var password = document.querySelector("#accountPassword_password").value;

        event.preventDefault();
        if(email !== '' && password !== ''){
            var userId = User.findOne({
                email:email,
                password:CryptoJS.MD5(password).toString(),
                facebook_id: null,
                google_id: null
            });

            // verifica se nao existe algum registro no banco para o email e senha solicitada
            if(userId === undefined){
                IonLoading.hide();
                toastr.info(
                  "Ops, email ou senha inválidos tente novamente.",
                  '',
                  {
                    "positionClass": "toast-top-center",
                    "tapToDismiss": true,
                    "timeOut": 3000
                  }
                );

            // verifica se o usuario foi bloqueado
            }else if(userId.status === 0){
                IonLoading.hide();
                toastr.info(
                  "Você não tem autorização, precisa de um login.",
                  '',
                  {
                    "positionClass": "toast-top-center",
                    "tapToDismiss": true,
                    "timeOut": 3000
                  }
                );

            // salva os ids no localstorage e abre a pagina index
            }else{
                localStorage.setItem('Meteor.userServerId', userId._id);
                localStorage.setItem('Meteor.userId', userId._id);

                IonLoading.hide();
                Router.go('index');
            }
        }else{
            IonLoading.hide();
            toastr.info(
              "Opaaa, preencha os campos obrigatórios.",
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