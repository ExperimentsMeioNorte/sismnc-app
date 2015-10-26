Tracker.autorun(function() {
    Meteor.remote.subscribe('program');
    Meteor.remote.subscribe('category');
    Meteor.remote.subscribe('content');
    Meteor.remote.subscribe('answer');
    Meteor.remote.subscribe('poll');
    Meteor.remote.subscribe('polluser');
    Meteor.remote.subscribe('vehicle');
    Meteor.remote.subscribe('user');
    Meteor.subscribe('users');
});

// var handle = LaunchScreen.hold();

Template.layout.rendered = function(){

  FastClick.attach('.ionic-body');
  IonSideMenu.snapper.settings({disable: 'left'});
  IonSideMenu.snapper.settings({disable: 'right'});
};

Template.layout.events({
  'touchstart [data-activate="logout"], click [data-activate="logout"]' : function(){
    Meteor.logout();
    localStorage.clear();
    Router.go('authentication');
  }
});

Template.layout.helpers({
    user: function(){
      if(Meteor.userId()){
        return [User.findOne({_id:localStorage.getItem('Meteor.userServerId'), status:1})];
      }else{
        return '';
      }
    }
});
