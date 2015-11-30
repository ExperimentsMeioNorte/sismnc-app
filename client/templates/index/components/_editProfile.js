Template._editProfile.events({
    'touchstart .upload-image': function(event, template) {
        IonPopup.show({
          buttons: [{
            text: '<i class="ion-paperclip"></i>',
            type: 'button-positive',
            onTap: function() {
              if (Meteor.isCordova) {
                var cameraOptions = {
                  width: 640,
                  height: 480,
                  quality:80,
                  sourceType: Camera.PictureSourceType.PHOTOLIBRARY
                };

                MeteoricCamera.getPicture(cameraOptions, function (error, data) {
                    if(data){
                        Meteor.remote.call('updatePerfilAvatar',
                            [
                                222,
                                data,
                                localStorage.getItem('Meteor.userId')
                            ],
                            function(error, result){
                                if(!result){
                                    toastr.info(
                                      "Opa, algo deu errado.. tente novamente",
                                      '',
                                      {
                                        "positionClass": "toast-top-center",
                                        "tapToDismiss": true,
                                        "timeOut": 3000
                                      }
                                    );
                                }else{
                                  toastr.info(
                                    "Foto atualizada",
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
                        toastr.info(
                          "Ocorreu algum problema ao tirar a foto, tente novamente",
                          '',
                          {
                            "positionClass": "toast-top-center",
                            "tapToDismiss": true,
                            "timeOut": 3000
                          }
                        );
                    }
                });
              } else {
                toastr.info(
                  "Você está em um celular?",
                  '',
                  {
                    "positionClass": "toast-top-center",
                    "tapToDismiss": true,
                    "timeOut": 3000
                  }
                );
              }
            }
          },
          {
            text: '<i class="ion-android-camera"></i>',
            type: 'button-positive',
            onTap: function() {
              if (Meteor.isCordova) {
                var cameraOptions = {
                  width: 640,
                  height: 480,
                  quality:80
                };

                MeteoricCamera.getPicture(cameraOptions, function (error, data) {
                    if(data){
                        Meteor.remote.call('updatePerfilAvatar',
                            [
                                222,
                                data,
                                localStorage.getItem('Meteor.userId')
                            ],
                            function(error, result){
                                if(!result){
                                   toastr.info(
                                      "Opa, algo deu errado.. tente novamente",
                                      '',
                                      {
                                        "positionClass": "toast-top-center",
                                        "tapToDismiss": true,
                                        "timeOut": 3000
                                      }
                                    );
                                }else{
                                   toastr.info(
                                    "Foto atualizada",
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
                        toastr.info(
                          "Ocorreu algum problema ao tirar a foto, tente novamente",
                          '',
                          {
                            "positionClass": "toast-top-center",
                            "tapToDismiss": true,
                            "timeOut": 3000
                          }
                        );
                    }
                });

              } else {
                toastr.info(
                  "Você está em um celular?",
                  '',
                  {
                    "positionClass": "toast-top-center",
                    "tapToDismiss": true,
                    "timeOut": 3000
                  }
                );
              }
            }
          }]
        });
    },

  'touchstart .update-perfil' : function(){
    //form.preventDefault();
    var name = document.querySelector('#name').value;
    var email = document.querySelector('#mail').value;
    var phone = document.querySelector('#phone').value;
    var phone = (phone !== '')? phone : null;
    if(!name || !email){
      toastr.info(
        "Opa, necessário preencher os campos obrigatórios.",
        '',
        {
          "positionClass": "toast-top-center",
          "tapToDismiss": true,
          "timeOut": 3000
        }
      );
    }else{
      Meteor.remote.call('updatePerfil',
            [
                222,
                name,
                email,
                phone,
                localStorage.getItem('Meteor.userId')
            ],
            function(error, result){
                if(!result){
                  toastr.info(
                    error,
                    '',
                    {
                      "positionClass": "toast-top-center",
                      "tapToDismiss": true,
                      "timeOut": 3000
                    }
                  );
                }else{
                  toastr.info(
                    result,
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

      IonModal.close();
      Router.go('index');
  },
  'touchstart [data-dismiss="modal"]' : function (){
    IonModal.close();
    Router.go('index');
  }
});

Template._editProfile.helpers({
    user: function(){
      if(Session.get('getupUserData')){
        return Session.get('getupUserData');
      }else{
        return '';
      }
    }
});