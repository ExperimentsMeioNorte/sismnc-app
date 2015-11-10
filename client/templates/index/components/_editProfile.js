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
                                    console.log('algo deu errado.');
                                }else{
                                    console.log('atualizado com sucesso.');
                                }
                            }
                        );
                    }else{
                        console.log('Deu erro a tirar uma foto.');
                    }
                });
              } else {
                console.log('Roda apenas no cordova');
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
                                    console.log('algo deu errado.');
                                }else{
                                    console.log('atualizado com sucesso.');
                                }
                            }
                        );
                    }else{
                        console.log('Deu erro a pegar uma foto.');
                    }
                });

              } else {
                console.log('Roda apenas no cordova');
              }
            }
          }]
        });
    },

  'touchstart .update-perfil, click .update-perfil' : function(){
    //form.preventDefault();
    var name = document.querySelector('#name').value;
    var email = document.querySelector('#mail').value;
    var phone = document.querySelector('#phone').value;
    var phone = (phone !== '')? phone : null;
    if(!name || !email){
        console.log('necessario preencher os campos obrigatorios');
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
                    console.log('algo deu errado.');
                }else{
                    console.log('atualizado com sucesso.');
                }
            }
        );
      }

      IonModal.close();
      Router.go('index');
  },
  'touchstart [data-dismiss="modal"], click [data-dismiss="modal"]' : function (){
    IonModal.close();
    Router.go('index');
  }
});

Template._editProfile.helpers({
    user: function(){
        if(localStorage.getItem('Meteor.userId')){
            return [User.findOne({_id:localStorage.getItem('Meteor.userId'), status:1})];
        }else{
            return '';
        }
    }
});