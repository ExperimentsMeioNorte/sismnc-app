Session.setDefault('img', null);

var getPicture = function(opts) {
  MeteorCamera.getPicture(opts, function(err, data) {
    if (err) {
      console.log('error', err);
    }
    if (data) {
      Session.set('img', data)
    }
  });
};


Template.addImage.events({
    'focus #btn-close-add-image, click #btn-close-add-image': function () {
      document.querySelector('body').classList.remove('add-image-buttons-television');
    },
   'focus #btn-capture-image, click #btn-capture-image': function () {
    if (Meteor.isClient) {
      getPicture({
        width: 640,
        height: 480,
        quality: 70
      });
    } else {
      alert('Cordova only feature.');
    }
  },
  'focus #btn-upload-image, click #btn-upload-image' : function(){
    if (Meteor.isCordova) {
      getPicture({
        width: 640,
        height: 480,
        quality: 70,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY
      });
    } else {
      console.log('Roda apenas no cordova');
    }

    document.querySelector('body').classList.remove('add-image-buttons-television');
    document.querySelector('body').classList.add('show-file-message-television');

  }

});









