Template.addMessage.events({
  'touchstart [data-action="addMedia"]': function(event, template) {
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

              });

            } else {
              alert('Roda apenas no cordova');
            }
          document.querySelector('body').classList.add('show-file-message');
          IonPopup.close();
        }
      },
      {
        text: '<i class="ion-ios-videocam"></i>',
        type: 'button-positive',
        onTap: function() {
          if (Meteor.isCordova){

            navigator.device.capture.captureVideo(captureSuccess, captureError, {limit:1, duration: 7});

              var captureError = function(error) {
                navigator.notification.alert('OPS!' + error.message, null, "Deu um probleminha");
              }

              var captureSuccess = function(mediaFiles) {
                var i, path, len;
                for (i=0, len = mediaFiles.length; i < len; i += 1) {
                  path = mediaFiles[i].fullPath;
                  // do something with this file... upload to S3 ?
                  console.log("path = " + path);
                }
              }

          } else {
            // do the standard mdg:camera thing here ??
            // because we're in a browser.....
          }
        }
      }]
    });
  },

  'touchstart #btn-capture-image': function () {
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
      document.querySelector('body').classList.add('show-file-message');
    }

  },

  'touchstart #btn-upload-image' : function(){
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
      document.querySelector('body').classList.add('show-file-message');
    }



  },

  // ENVIO DA MENSAGEM
  'touchstart .send-button, click .send-button': function(events){
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
    },

});