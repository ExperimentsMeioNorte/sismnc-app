Template._enterRegister.helpers({
    confirmDataEmail: function(){
        return Session.get('getupConfirmUserData')[1];
    }
});

Template._enterRegister.events({
    'touchstart .button-submit-confirm, click .button-submit-confirm': function () {
        IonLoading.show({
            customTemplate: '<i class="spinner spinner-spiral"><svg viewBox="0 0 64 64"><g><defs><linearGradient id="sGD" gradientUnits="userSpaceOnUse" x1="55" y1="46" x2="2" y2="46"><stop offset="0.1" class="stop1"></stop><stop offset="1" class="stop2"></stop></linearGradient></defs><g stroke-width="4" stroke-linecap="round" fill="none" transform="rotate(196.349 32 32)"><path stroke="url(#sGD)" d="M4,32 c0,15,12,28,28,28c8,0,16-4,21-9"></path><path d="M60,32 C60,16,47.464,4,32,4S4,16,4,32"></path><animateTransform values="0,32,32;360,32,32" attributeName="transform" type="rotate" repeatCount="indefinite" dur="750ms"></animateTransform></g></g></svg></i>',
            backdrop: true
        });

        var cod = document.querySelector("#enterConfirm_cod").value;;

        // valida os campos obrigatorios
        if(cod !== ''){

            // valida se o codigo é válido
            if(cod === Session.get('getupConfirmUserData')[0]){
                Meteor.remote.call(
                    'insertUser',
                    [
                        111,
                        '0',
                        Session.get('getupConfirmUserData')[2],
                        '/images/avatar.jpg',
                        Session.get('getupConfirmUserData')[3],
                        CryptoJS.MD5(Session.get('getupConfirmUserData')[4] + password).toString(),
                        null,
                        null,
                        null,
                        1,
                        1
                    ],
                    function(error, result){
                        IonLoading.hide();
                        if(result){
                            toastr.info(
                              result,
                              '',
                              {
                                "positionClass": "toast-top-center",
                                "tapToDismiss": true,
                                "timeOut": 3000
                              }
                            );
                            IonModal.close();
                        }else{
                            toastr.info(
                              "Ops, " + error,
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
            }else{
                IonLoading.hide();
                toastr.info(
                  "Oia, o código digitado não é válido.",
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