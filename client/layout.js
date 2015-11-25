Tracker.autorun(function() {
    Meteor.remote.subscribe('program');
    Meteor.remote.subscribe('category');
    Meteor.remote.subscribe('content');
    Meteor.remote.subscribe('answer');
    Meteor.remote.subscribe('poll');
    Meteor.remote.subscribe('polluser');
    Meteor.remote.subscribe('vehicle');
    Meteor.remote.subscribe('user');
    Meteor.remote.subscribe('city');
    Meteor.subscribe('users');
});

Template.layout.events({
  'touchstart [data-activate="logout"], click [data-activate="logout"]' : function(){
    IonLoading.show({
      customTemplate: 'Aguarde...'
    });

    Meteor.logout();
    localStorage.clear();
    Router.go('authentication');

    IonLoading.hide();
  }
});

Template.layout.helpers({
    user: function(){
      if(Meteor.userId() && localStorage.getItem('Meteor.userServerId')){
        var user = User.findOne({_id:localStorage.getItem('Meteor.userServerId'), status:1});
        if(user !== undefined){
          return [user];
        }
      }else{
        return '';
      }
    }
});

