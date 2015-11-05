Meteor.startup(function(){
  //Session.get('photo');
});

Template.fileMessage.events({
    'touchstart #btn-cancel-file' : function(){
      document.querySelector('body').classList.remove('show-file-message');
      document.querySelector('.file-message').classList.add('hide');

      Session.setDefault('photo', null);
      Session.setDefault('videoUrl', null);
    }
});

Template.fileMessage.helpers({
  'photo': function() {
    return Session.get('photo');
  },

  'video': function() {
    return Session.get('videoUrl');
  }
});
