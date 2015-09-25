// Rota do Programa
Template.addVideo.events({

  'focus #btn-close-add-video, click #btn-close-add-video': function () {
    document.querySelector('body').classList.remove('add-video-buttons-television');
  },

  'focus #btn-upload-video, click #btn-upload-video' : function(){
    document.querySelector('body').classList.remove('add-video-buttons-television');
    document.querySelector('body').classList.add('show-file-message-television');
  }

});
