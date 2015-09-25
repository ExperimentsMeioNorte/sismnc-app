Template.addMessage.events({

  'focus #btn-show-add-image, click #btn-show-add-image': function () {
    document.querySelector('body').classList.add('add-image-buttons-television');
  },

  'focus #btn-show-add-video, click #btn-show-add-video': function () {
    document.querySelector('body').classList.add('add-video-buttons-television');
  }

});
