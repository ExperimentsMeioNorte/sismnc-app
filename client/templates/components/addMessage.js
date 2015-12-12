Template.addMessage.events({
  'tap [data-action="addMedia"]': function(event, template) {
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
          } else if (Meteor.isClient) {
            var cameraOptions = {
              width: 640,
              height: 480,
              quality:80,
              sourceType: Camera.PictureSourceType.PHOTOLIBRARY
            };

            MeteoricCamera.getPicture(cameraOptions, function (error, data) {
              Session.set("photo", data);

            });
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

          } else if (Meteor.isClient) {
            var cameraOptions = {
              width: 640,
              height: 480,
              quality:80
            };

            MeteoricCamera.getPicture(cameraOptions, function (error, data) {
              Session.set("photo", data);

            });
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

  'tap #btn-capture-image': function () {
    if (Meteor.isCordova) {

      var cameraOptions = {
        width: 640,
        height: 480,
        quality:80
      };

      MeteoricCamera.getPicture(cameraOptions, function (error, data) {
        Session.set("photo", data);

      });

    } else if (Meteor.isClient) {
      var cameraOptions = {
        width: 640,
        height: 480,
        quality:80
      };

      MeteoricCamera.getPicture(cameraOptions, function (error, data) {
        Session.set("photo", data);

      });
    }
  },

  'tap #btn-upload-image' : function(){
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
    } else if (Meteor.isClient) {
        var cameraOptions = {
          width: 640,
          height: 480,
          quality:80,
          sourceType: Camera.PictureSourceType.PHOTOLIBRARY
        };

        MeteoricCamera.getPicture(cameraOptions, function (error, data) {
          Session.set("photo", data);

        });
      }
  },

  // ENVIO DA MENSAGEM
  'tap .send-button': function(event){
        event.preventDefault();
        if(!document.querySelector('#message').value){
          toastr.info(
            "Precisa escrever uma mensagem",
            '',
            {
              "positionClass": "toast-top-center",
              "tapToDismiss": true,
              "timeOut": 3000
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
          if(Session.get('messageEditId') === undefined || Session.get('messageEditId') === null){
            Meteor.remote.call(
                'insertContent',
                [
                    111,
                    Router.current().params._id,
                    localStorage.getItem('Meteor.userServerId'),
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
                          "Algo deu errado, tente novamente",
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
            Meteor.remote.call(
                'updateContent',
                [
                    222,
                    Router.current().params._id,
                    localStorage.getItem('Meteor.userServerId'),
                    document.querySelector('#message').value, // texto
                    (Session.get("photo"))? Session.get("photo") : '', // imagem
                    null, // (videoData !== null)? videoData : '', // video
                    1,
                    Session.get('messageEditId') // id da mensagem
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
                          "Algo deu errado, tente novamente",
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
        }
    },

});