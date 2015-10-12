Meteor.startup(function(){
  Session.get('photo');
});

Template.fileMessage.events({
    'click #btn-cancel-file, focus #btn-cancel-file' : function(){
      document.querySelector('body').classList.remove('show-file-message-television');

      Session.setDefault('photo', null);

    }
});

Template.fileMessage.helpers({
  'photo': function() {
    return Session.get('photo');
  }
});
