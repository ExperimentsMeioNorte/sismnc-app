Template.addMessage.events({
  'touchstart [data-action="addMedia"]': function(event, template) {
    IonLoading.show();
    IonPopup.show({
      buttons: [{
        text: '<i class="ion-paperclip"></i>',
        type: 'button-positive',
        onTap: function() {
          if (Meteor.isCordova) {
            var cameraOptions = {
              width: 640,
              height: 480,
              quality:70,
              sourceType: Camera.PictureSourceType.PHOTOLIBRARY
            };

            MeteoricCamera.getPicture(cameraOptions, function (error, data) {
              Session.set("photo", data);
              IonLoading.show();
            });
          } else {
            console.log('Roda apenas no cordova');
          }
          document.querySelector('body').classList.add('show-file-message');
          IonPopup.close();
        }
      },
      {
        text: '<i class="ion-android-camera"></i>',
        type: 'button-positive',
        onTap: function() {
          if (Meteor.isClient) {

              var cameraOptions = {
                width: 640,
                height: 480,
                quality:70
              };

              MeteoricCamera.getPicture(cameraOptions, function (error, data) {
                Session.set("photo", data);
                IonLoading.show();
              });

            } else {
              alert('Roda apenas no cordova');
            }
          document.querySelector('body').classList.add('show-file-message');
          IonPopup.close();
        }
      }]
    });
    IonLoading.hide();
  },

  'touchstart #btn-capture-image': function () {
    IonLoading.show();
    if (Meteor.isClient) {

      var cameraOptions = {
        width: 640,
        height: 480,
        quality:70
      };

      MeteoricCamera.getPicture(cameraOptions, function (error, data) {
        Session.set("photo", data);
        IonLoading.show();
      });

    } else {
      alert('Roda apenas no cordova');
      document.querySelector('body').classList.add('show-file-message');
    }
    IonLoading.hide();
  },

  'touchstart #btn-upload-image' : function(){
    if (Meteor.isCordova) {
      IonLoading.show();
      var cameraOptions = {
        width: 640,
        height: 480,
        quality:70,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY
      };

      MeteoricCamera.getPicture(cameraOptions, function (error, data) {
        Session.set("photo", data);
        IonLoading.show();
      });
      IonLoading.hide();
    } else {
      console.log('Roda apenas no cordova');
      document.querySelector('body').classList.add('show-file-message');
    }



  },

  // ENVIO DA MENSAGEM
  'touchstart .send-button': function(events){
        IonLoading.show();
        events.preventDefault();
        if(!document.querySelector('#message').value){
            console.log('Precisa de um texto');
        }else{
            Meteor.remote.call(
                'insertContent',
                [
                    111,
                    Router.current().params._id,
                    localStorage.getItem('Meteor.userId'),
                    document.querySelector('#message').value, // texto
                    (Session.get("photo"))? Session.get("photo") : '', // imagem
                    '', // video
                    1
                ],
                function(error, result){
                    if(!error){
                        // remove o foco
                        document.querySelector('#message').blur();

                        //remove os dados dos campos do form para evitar a duplicidade do registro
                        document.querySelector('#message').value = '';
                        Session.set("photo", '');
                        Session.set("video", '');
                        document.querySelector('body').classList.remove('show-file-message');
                    }else{
                        console.log('Não deu Nova Mensagem');
                    }
                }
            );
        }
        IonLoading.hide();
    },

});