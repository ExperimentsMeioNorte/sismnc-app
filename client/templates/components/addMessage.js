Template.addMessage.events({
  'click [data-action="addMedia"]': function(event, template) {
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
            });
          } else {
            console.log('Roda apenas no cordova');
          }
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
              });

            } else {
              alert('Roda apenas no cordova');
            }
          IonPopup.close();
        }
      },
      {
        text: '<i class="ion-ios-videocam"></i>',
        type: 'button-positive',
        onTap: function() {
          IonPopup.close();
        }
      }]
    });
  },

  'click .send-button': function(events){
        events.preventDefault();
        if(!document.querySelector('#message').value){
            console.log('Precisa de um texto');
        }else{
            Meteor.remote.call(
                'insertContent',
                [
                    111,
                    Router.current().params._id,
                    Meteor.remote.userId(),
                    document.querySelector('#message').value, // texto
                    (Session.get("photo"))? Session.get("photo") : '', // imagem
                    '', // video
                    1,
                ],
                function(error, result){
                    if(!error){
                        toastr.success(
                            result,
                            '',
                            {"progressBar": true}
                        );

                        //remove os dados dos campos do form para evitar a duplicidade do registro
                        document.querySelector('#message').value = '';
                        Session.set("photo", '');
                        Session.set("video", '');
                    }else{
                        console.log('Não deu Nova Mensagem');
                    }
                }
            );
        }
    },

    'focus #btn-capture-image, click #btn-capture-image': function () {
    if (Meteor.isClient) {

      var cameraOptions = {
        width: 640,
        height: 480,
        quality:70
      };

      MeteoricCamera.getPicture(cameraOptions, function (error, data) {
        Session.set("photo", data);
      });

    } else {
      alert('Roda apenas no cordova');
    }
  },

  'focus #btn-upload-image, click #btn-upload-image' : function(){
    if (Meteor.isCordova) {

      var cameraOptions = {
        width: 640,
        height: 480,
        quality:70,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY
      };

      MeteoricCamera.getPicture(cameraOptions, function (error, data) {
        Session.set("photo", data);
      });
    } else {
      console.log('Roda apenas no cordova');
    }

    document.querySelector('body').classList.remove('add-image-buttons-television');
    document.querySelector('body').classList.add('show-file-message-television');

  }
});