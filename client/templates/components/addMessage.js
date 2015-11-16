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
              quality:80,
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
          if (Meteor.isCordova) {
            var cameraOptions = {
              width: 640,
              height: 480,
              quality:80
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
      // },
      // {
      //   text: '<i class="ion-ios-videocam"></i>',
      //   type: 'button-positive',
      //   onTap: function() {
      //     if (Meteor.isCordova){
      //         var captureError = function(error) {
      //           navigator.notification.alert('OPS!' + error.message, null, "Deu um probleminha");
      //         }

      //         var captureSuccess = function(mediaFiles) {
      //           Session.set("videoUrl", mediaFiles[0].fullPath);
      //         }

      //         navigator.device.capture.captureVideo(captureSuccess, captureError, {limit:1, duration: 5});
      //     } else {
      //       console.log('Roda apenas no cordova');
      //     }

      //     document.querySelector('body').classList.add('show-file-message');
      //     IonPopup.close();
      //   }
      // },
      // {
      //   text: '<i class="ion-ios-videocam"></i>',
      //   type: 'button-positive',
      //   onTap: function() {
      //     IonPopup.close();
      //   }
      }]
    });
  },

  'touchstart #btn-capture-image': function () {
    if (Meteor.isCordova) {

      var cameraOptions = {
        width: 640,
        height: 480,
        quality:80
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
        quality:80,
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
            toastr.info(
                "Você precisa digitar uma mensagem.",
                '',
                {
                    "progressBar": true,
                    "positionClass": "toast-top-center",
                    "showDuration": "100"
                }
            );
        }else{
            // var videoData = null;
            // if(Session.get("videoUrl")){
            //   // create a canvas element
            //   var canvas = document.createElement('canvas'),     // canvas
            //       ctx = canvas.getContext('2d'),                 // context
            //       video = document.getElementById('video-file');  // get video element somehow

            //   // setup canvas dimension
            //   canvas.width = video.videoWidth || video.width;
            //   canvas.height = video.videoHeight || video.height;

            //   // draw in current video frame
            //   ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

            //   // extract data-uri
            //   videoData = canvas.toDataURL();  // PNG is default, use image/jpeg for JPEG
            //   Session.setDefault("videoUrl", null);
            // }

            Meteor.remote.call(
                'insertContent',
                [
                    111,
                    Router.current().params._id,
                    localStorage.getItem('Meteor.userId'),
                    document.querySelector('#message').value, // texto
                    (Session.get("photo"))? Session.get("photo") : '', // imagem
                    null, // (videoData !== null)? videoData : '', // video
                    1
                ],
                function(error, result){
                    if(!error){

                        // remove o foco
                        document.querySelector('#message').blur();

                        //remove os dados dos campos do form para evitar a duplicidade do registro
                        document.querySelector('#message').value = '';
                        Session.set("photo", '');
                        //Session.set("video", '');
                        document.querySelector('body').classList.remove('show-file-message');
                    }else{
                        toastr.info(
                            "Ocorreu um problema, tente novamente.",
                            '',
                            {
                                "progressBar": true,
                                "positionClass": "toast-top-center",
                                "showDuration": "100"
                            }
                        );
                    }
                }
            );
        }
    },

});