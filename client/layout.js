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

Template.layout.rendered = function () {
  Meteor.verifyLogin();
};

Template.layout.events({
  'touchstart [data-activate="logout"], click [data-activate="logout"]' : function(){
    IonLoading.show({
      customTemplate: '<i class="spinner spinner-spiral"><svg viewBox="0 0 64 64"><g><defs><linearGradient id="sGD" gradientUnits="userSpaceOnUse" x1="55" y1="46" x2="2" y2="46"><stop offset="0.1" class="stop1"></stop><stop offset="1" class="stop2"></stop></linearGradient></defs><g stroke-width="4" stroke-linecap="round" fill="none" transform="rotate(196.349 32 32)"><path stroke="url(#sGD)" d="M4,32 c0,15,12,28,28,28c8,0,16-4,21-9"></path><path d="M60,32 C60,16,47.464,4,32,4S4,16,4,32"></path><animateTransform values="0,32,32;360,32,32" attributeName="transform" type="rotate" repeatCount="indefinite" dur="750ms"></animateTransform></g></g></svg></i>'
    });

    Meteor.logout();
    localStorage.clear();
    Router.go('authentication');

    IonLoading.hide();
  }
});

Template.layout.helpers({
    user: function(){
      if(Meteor.userId()
        && localStorage.getItem('Meteor.userServerId')
        && (localStorage.getItem('Meteor.facebookId') || localStorage.getItem('Meteor.googleId'))
        || (localStorage.getItem('Meteor.userServerId') === localStorage.getItem('Meteor.userId'))){
        var user = User.findOne({_id:localStorage.getItem('Meteor.userServerId'), status:1});
        if(user !== undefined){
          return [user];
        }
      }else{
        return '';
      }
    }
});

